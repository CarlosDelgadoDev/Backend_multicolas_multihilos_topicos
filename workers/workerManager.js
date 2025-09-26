const { Worker } = require('bullmq');
const redisConnection = require('../config/redis');
const QueueManager = require('./queue');
const CommandInvoker = require('../commands/commandInvoker');
const { saveUnique } = require('../helpers/redisHelper');
const taskMap = require('../helpers/taskMap');

class WorkerManager {
  constructor() {
    this.workers = {};          // { queueName: { worker, concurrency } }
    this.lastQueueIndex = -1;   // Round-Robin
    this.shortIdCounter = 1;    // shortId simple
    this.duplicates = {};       // Para registrar duplicados
  }

  async reserveIfNeeded(jobData) {
    const taskName = jobData.task || jobData.data?.task;
    const payload = jobData.data || jobData;
    if (!taskName) return { success: true };
    const taskInfo = taskMap[taskName];
    if (!taskInfo) return { success: true };

    const { tabla, idField } = taskInfo;
    const uniqueId = payload?.[idField];
    if (!uniqueId || jobData._reserved) return { success: true };

    const result = await saveUnique(tabla, uniqueId, payload);
    if (result && result.success) jobData._reserved = true;
    return result;
  }

  async startWorker(queueName, concurrency = 1) {
    if (this.workers[queueName]) await this.stopWorker(queueName);
    QueueManager.createQueue(queueName);

    const worker = new Worker(
      queueName,
      async job => {
        let task, data;
        if (job.data.task) task = job.data.task, data = job.data.data;
        else if (job.data.data?.task) task = job.data.data.task, data = job.data.data.data;
        else throw new Error("Tarea inválida: task no definido");

        try {
          const taskInfo = taskMap[task];
          if (taskInfo && !job.data._reserved) {
            const reserve = await this.reserveIfNeeded(job.data);
            if (!reserve.success) {
              this.duplicates[job.data.shortId] = {
                queue: 'duplicate',
                originalQueue: job.data.originalQueue || 'buffer',
                message: reserve.message || 'duplicado',
                result: null
              };
              return { success: false, message: reserve.message || 'duplicado' };
            }
          }

          const command = CommandInvoker.createCommand(task, data);
          const result = await command.execute();
          return { success: true, result };
        } catch (err) {
          console.error('❌ Error en task:', err.message);
          throw err;
        }
      },
      { connection: redisConnection, concurrency }
    );

    worker.on('completed', async job => {
      console.log(`✅ Job ${job.data.shortId} completado en ${queueName}`);
    });

    worker.on('failed', (job, err) => {
      console.error(`❌ Job ${job.data.shortId} falló en ${queueName}:`, err.message);
    });

    this.workers[queueName] = { worker, concurrency };
    console.log(`🟢 Worker iniciado para cola ${queueName} con ${concurrency} hilos`);

    await this.processBuffer();
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
    if (queueName === 'duplicate') {
      return Object.entries(this.duplicates).map(([shortId, data]) => ({
        id: shortId,
        name: 'duplicate',
        data,
        state: 'duplicate',
        returnvalue: data.result || null,
        failedReason: data.message || null,
        shortId
      }));
    }
    return QueueManager.getJobs(queueName);
  }

  async addJobToAnyQueue(jobData) {
    const activeQueues = Object.keys(this.workers);
    jobData.shortId = jobData.shortId || this.shortIdCounter++;

    const reserve = await this.reserveIfNeeded(jobData);
    if (!reserve.success) {
      this.duplicates[jobData.shortId] = {
        queue: 'duplicate',
        originalQueue: jobData.originalQueue || 'buffer',
        message: reserve.message || 'duplicado',
        result: null
      };
      return { id: null, shortId: jobData.shortId, queue: 'duplicate', error: reserve.message || 'duplicado' };
    }

    if (!activeQueues.length) {
      jobData.originalQueue = 'buffer';
      jobData.currentQueue = 'buffer';
      await QueueManager.addJob('buffer', jobData);
      return { id: null, shortId: jobData.shortId, queue: 'buffer' };
    }

    this.lastQueueIndex = (this.lastQueueIndex + 1) % activeQueues.length;
    const selectedQueue = activeQueues[this.lastQueueIndex];
    jobData.currentQueue = selectedQueue;
    if (!jobData.originalQueue) jobData.originalQueue = selectedQueue;

    const job = await QueueManager.addJob(selectedQueue, jobData);
    return { id: job.id, shortId: jobData.shortId, queue: selectedQueue };
  }

  async processBuffer() {
    const bufferJobs = await QueueManager.getJobs('buffer');
    if (!bufferJobs.length) return;

    console.log(`📦 Reprocesando ${bufferJobs.length} jobs del buffer...`);
    for (const job of bufferJobs) {
      const data = job.data;
      const moved = await this.addJobToAnyQueue({
        ...data,
        shortId: data.shortId,
        originalQueue: data.originalQueue || 'buffer'
      });
      console.log(`📤 Job ${data.shortId} movido de buffer a ${moved.queue}`);
    }
    await QueueManager.drainQueue('buffer');
  }

  // ✅ Nuevo: Buscar job por shortId en todas las colas
  async getJobById(shortId) {
    if (this.duplicates[shortId]) {
      return { ...this.duplicates[shortId], shortId, state: 'duplicate' };
    }

    const allQueues = Object.keys(QueueManager.queues);
    for (const queueName of allQueues) {
      const queue = QueueManager.queues[queueName];
      const jobs = await queue.getJobs(['waiting', 'active', 'completed', 'failed']);

      for (const job of jobs) {
        if (job.data.shortId === shortId) {
          const state = await job.getState();
          return {
            id: job.id,
            state,
            queue: job.data.currentQueue || queueName,
            shortId: job.data.shortId,
          };
        }
      }
    }
    return null;
  }
}

module.exports = new WorkerManager();
