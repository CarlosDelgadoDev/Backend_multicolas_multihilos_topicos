const Redis = require('ioredis');
require('dotenv').config();

const connection = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6380,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null,   // ✅ Esto es obligatorio para BullMQ
  enableOfflineQueue: false     // Opcional, recomendado
});

module.exports = connection;
