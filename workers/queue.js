const { Queue } = require('bullmq');
const redisConnection = require('../config/redis');

class QueueManager {
  constructor() {
    this.queues = {};
  }

  createQueue(name) {
    if (!this.queues[name]) {
      this.queues[name] = new Queue(name, { connection: redisConnection });
      console.log(`✅ Cola creada: ${name}`);
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
      id: job.id,
      name: job.name,
      data: job.data,
      state: await job.getState(),
      returnvalue: job.returnvalue,
      failedReason: job.failedReason,
      shortId: job.data.shortId || null
    })));
  }
}

module.exports = new QueueManager();
