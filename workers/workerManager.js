const { Worker, Queue } = require('bullmq');
const redisConnection = require('../config/redis');
const QueueManager = require('./queue');
const CommandInvoker = require('../commands/commandInvoker');
const { saveUnique } = require('../helpers/redisHelper');
const taskMap = require('../helpers/taskMap');
// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

class WorkerManager {
  constructor() {
    this.workers = {};          // { queueName: { worker, concurrency } }
    this.lastQueueIndex = -1;   // Para Round-Robin
    this.shortIdCounter = 1;    // Para ids cortos de tareas
    this.pendingJobs = [];      // Jobs pendientes si no hay colas activas
  }

  async startWorker(queueName, concurrency = 1) {
    if (this.workers[queueName]) {
      await this.stopWorker(queueName);
    }

    QueueManager.createQueue(queueName);

    const worker = new Worker(
      queueName,
      async job => {
        let task, data;
        if (job.data.task) {
          task = job.data.task;
          data = job.data.data;
        } else if (job.data.data?.task) {
          task = job.data.data.task;
          data = job.data.data.data;
        } else {
          throw new Error("Tarea inválida: task no definido");
        }

        try {
          const taskInfo = taskMap[task];
          if (taskInfo) {
            const { tabla, idField } = taskInfo;
            const uniqueId = data[idField];
            const resultUnique = await saveUnique(tabla, uniqueId, data);
            if (!resultUnique.success) return { error: resultUnique.message };
          }

          const command = CommandInvoker.createCommand(task, data);
          const result = await command.execute();
          return result;
        } catch (err) {
          console.error('❌ Error en task:', err.message);
          throw err;
        }
      },
      { connection: redisConnection, concurrency }
    );

    // Callback al completar
    worker.on('completed', async job => {
      const callbackUrl = job.data.callback;
      if (callbackUrl) {
        try {
          await fetch(callbackUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobId: job.id, result: job.returnvalue })
          });
        } catch (err) {
          console.error('Error callback:', err);
        }
      }
    });

    worker.on('failed', (job, err) => {
      console.error(`❌ Job ${job.id} falló:`, err.message);
    });

    this.workers[queueName] = { worker, concurrency };
    console.log(`🟢 Worker iniciado para cola ${queueName} con ${concurrency} hilos`);

    // Procesar jobs pendientes si los hay
    if (this.pendingJobs.length) {
      const jobsToProcess = [...this.pendingJobs];
      this.pendingJobs = [];
      for (const jobData of jobsToProcess) {
        this.addJobToAnyQueue(jobData).catch(console.error);
      }
    }
  }

  async stopWorker(queueName) {
    if (this.workers[queueName]) {
      await this.workers[queueName].worker.close();
      delete this.workers[queueName];
      console.log(`🔴 Worker detenido de cola ${queueName}`);
    }
  }

  getStatus(queueName) {
    if (this.workers[queueName]) {
      return { running: true, concurrency: this.workers[queueName].concurrency };
    }
    return { running: false, concurrency: 0 };
  }

  async getJobs(queueName) {
    return QueueManager.getJobs(queueName);
  }

  async addJobToAnyQueue(jobData) {
    const activeQueues = Object.keys(this.workers).filter(q => this.workers[q]);
    if (!activeQueues.length) {
      console.warn('⚠️ No hay colas activas, guardando job pendiente');
      this.pendingJobs.push(jobData);
      return { id: null, shortId: this.shortIdCounter }; // Pendiente
    }

    // Round-Robin
    this.lastQueueIndex = (this.lastQueueIndex + 1) % activeQueues.length;
    const selectedQueue = activeQueues[this.lastQueueIndex];

    // Asignar shortId fácil de consultar
    jobData.shortId = this.shortIdCounter++;
    const job = await QueueManager.addJob(selectedQueue, jobData);

    return { id: job.id, shortId: jobData.shortId, queue: selectedQueue };
  }

  async getJobById(shortId) {
    const allQueues = Object.keys(QueueManager.queues);
    for (const queueName of allQueues) {
      const jobs = await QueueManager.getJobs(queueName);
      const job = jobs.find(j => j.data.shortId === shortId);
      if (job) {
        return { id: job.id, state: job.state, queue: queueName, shortId: job.data.shortId };
      }
    }
    return null;
  }
}

module.exports = new WorkerManager();
