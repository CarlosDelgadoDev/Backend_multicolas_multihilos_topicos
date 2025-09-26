const { Queue } = require('bullmq');
const redisConnection = require('../config/redis');

class QueueManager {
  constructor() {
    this.queues = {};
    this.createQueue('buffer');
    this.createQueue('duplicate');
  }

  createQueue(name) {
    if (!this.queues[name]) {
      this.queues[name] = new Queue(name, { connection: redisConnection });
      console.log(`Cola creada: ${name}`);
    }
    return this.queues[name];
  }

  async addJob(queueName, jobData) {
    const queue = this.createQueue(queueName);
    return queue.add(queueName, jobData);
  }

  async getJobs(queueName) {
    if (!this.queues[queueName]) return [];
    const jobs = await this.queues[queueName].getJobs(['waiting','active','completed','failed']);
    return Promise.all(jobs.map(async job => ({
      id: job.data.shortId || job.id,
      name: job.name,
      data: job.data,
      state: await job.getState(),
      returnvalue: job.returnvalue,
      failedReason: job.failedReason,
      shortId: job.data.shortId || null
    })));
  }

  async drainQueue(queueName) {
    if (!this.queues[queueName]) return;
    await this.queues[queueName].obliterate({ force: true });
    console.log(`🧹 Cola ${queueName} limpiada`);
  }

  async deleteQueue(queueName) {
    if (!this.queues[queueName]) return false;
    await this.queues[queueName].close();
    delete this.queues[queueName];
    console.log(`❌ Cola ${queueName} eliminada`);
    return true;
  }
}

module.exports = new QueueManager();
