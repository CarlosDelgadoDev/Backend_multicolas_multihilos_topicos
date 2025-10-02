const { Queue } = require('bullmq');
const redisConnection = require('../config/redis');
const IORedis = require('ioredis');

class QueueManager {
  constructor() {
    this.queues = {};
    this.redis = new IORedis(redisConnection);

    // Colas fijas que siempre deben existir
    this.fixedQueues = ['buffer', 'duplicate'];

    // Iniciar
    this.init();
  }

  async init() {
    try {
      // Crear colas fijas siempre
      for (const fixed of this.fixedQueues) {
        await this.createQueue(fixed, true);
      }

      // Restaurar colas dinámicas desde Redis
      const queueNames = await this.redis.smembers("colas_registradas");
      for (const name of queueNames) {
        if (!this.fixedQueues.includes(name)) {
          await this.createQueue(name, false);
        }
      }

      console.log("✅ Colas restauradas desde Redis:", queueNames);
    } catch (err) {
      console.error("❌ Error restaurando colas:", err);
    }
  }

  async createQueue(name, isFixed = false) {
    if (!this.queues[name]) {
      this.queues[name] = new Queue(name, { connection: redisConnection });

      // Solo guardamos en Redis las dinámicas
      if (!isFixed) {
        await this.redis.sadd("colas_registradas", name);
      }

      console.log(`📌 Cola creada: ${name}`);
    }
    return this.queues[name];
  }

  async addJob(queueName, jobData) {
    const queue = await this.createQueue(queueName);
    return queue.add(queueName, jobData);
  }

  async getJobs(queueName) {
    if (!this.queues[queueName]) return [];
    const jobs = await this.queues[queueName].getJobs([
      "waiting",
      "active",
      "completed",
      "failed"
    ]);

    return Promise.all(
      jobs.map(async (job) => ({
        id: job.data.shortId || job.id,
        name: job.name,
        data: job.data,
        state: await job.getState(),
        returnvalue: job.returnvalue,
        failedReason: job.failedReason,
        shortId: job.data.shortId || null
      }))
    );
  }

  async drainQueue(queueName) {
    if (!this.queues[queueName]) return;
    await this.queues[queueName].obliterate({ force: true });
    console.log(`🧹 Cola ${queueName} limpiada`);
  }

  async deleteQueue(queueName) {
    if (!this.queues[queueName]) return false;

    // No se permite borrar colas fijas
    if (this.fixedQueues.includes(queueName)) {
      console.log(`⚠️ La cola fija "${queueName}" no puede eliminarse`);
      return false;
    }

    await this.queues[queueName].close();

    // Eliminar de memoria y de Redis
    delete this.queues[queueName];
    await this.redis.srem("colas_registradas", queueName);

    console.log(`❌ Cola ${queueName} eliminada`);
    return true;
  }

  async listQueues() {
    return Object.keys(this.queues);
  }
}

module.exports = new QueueManager();
