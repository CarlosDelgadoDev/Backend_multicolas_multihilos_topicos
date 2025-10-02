const express = require('express');
const router = express.Router();
const workerManager = require('../workers/workerManager');
const QueueManager = require('../workers/queue');

// 🔹 Iniciar/reiniciar worker
router.get('/start/:queue/:concurrency', async (req, res) => {
  try {
    const { queue, concurrency } = req.params;
    await workerManager.startWorker(queue, parseInt(concurrency) || 1);
    res.json({ status: `Worker iniciado/reiniciado en cola ${queue} con ${concurrency} hilos` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Detener worker
router.get('/stop/:queue', async (req, res) => {
  try {
    const { queue } = req.params;
    await workerManager.stopWorker(queue);
    res.json({ status: `Worker detenido en cola ${queue}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Estado de un worker
router.get('/status/:queue', (req, res) => {
  try {
    const { queue } = req.params;
    res.json(workerManager.getStatus(queue));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Obtener jobs de una cola
router.get('/jobs/:queue', async (req, res) => {
  try {
    const { queue } = req.params;
    const jobs = await workerManager.getJobs(queue);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Listar todas las colas existentes
router.get('/allQueues', (req, res) => {
  try {
    const workerQueues = Object.keys(workerManager.workers);
    const allQueues = Object.keys(QueueManager.queues);

    // incluir siempre buffer y duplicate
    const uniqueQueues = Array.from(new Set([...workerQueues, ...allQueues, 'buffer', 'duplicate']));
    res.json(uniqueQueues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Render página principal
router.get('/manager', (req, res) => {
  res.render('workers_views/index.ejs', { title: 'Worker Manager' });
});

// 🔹 Enviar tarea a una cola
router.post('/task', async (req, res) => {
  try {
    const jobData = req.body;
    const job = await workerManager.addJobToAnyQueue(jobData);
    res.json({
      message: "Solicitud aceptada",
      taskId: job.id,
      shortId: job.shortId,
      queue: job.queue
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Eliminar cola
router.delete('/delete/:queue', async (req, res) => {
  try {
    const { queue } = req.params;
    await workerManager.stopWorker(queue);
    const success = await QueueManager.deleteQueue(queue);

    if (success) {
      res.json({ success: true, message: `Cola ${queue} eliminada` });
    } else {
      res.json({ success: false, error: 'No se encontró la cola' });
    }
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// 🔹 Buscar una tarea por shortId
router.get('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const job = await workerManager.getJobById(parseInt(id));
    if (!job) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(job);
  } catch (err) {
    console.error("Error al obtener la tarea:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
