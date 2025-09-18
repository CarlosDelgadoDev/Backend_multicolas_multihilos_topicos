const express = require('express');
const router = express.Router();
const workerManager = require('../workers/workerManager');
const { addTask } = require('../workers/queue');

// Iniciar/reiniciar worker de una cola específica
router.get('/start/:queue/:concurrency', async (req, res) => {
  try {
    const { queue, concurrency } = req.params;
    await workerManager.startWorker(queue, parseInt(concurrency) || 1);
    res.status(200).json({ status: `Worker iniciado/reiniciado en cola ${queue} con ${concurrency} hilos` });
  } catch (error) {
    console.error("Error al iniciar el worker:", error);
    res.status(500).json({ status: 'Error al iniciar el worker', error: error.message });
  }
});

// Detener worker de una cola específica
router.get('/stop/:queue', async (req, res) => {
  try {
    const { queue } = req.params;
    await workerManager.stopWorker(queue);
    res.status(200).json({ status: `Worker detenido en cola ${queue}` });
  } catch (error) {
    console.error("Error al detener el worker:", error);
    res.status(500).json({ status: 'Error al detener el worker', error: error.message });
  }
});

// Estado de worker de una cola
router.get('/status/:queue', (req, res) => {
  try {
    const { queue } = req.params;
    const status = workerManager.getStatus(queue);
    res.json(status);
  } catch (error) {
    console.error("Error al obtener estado del worker:", error);
    res.status(500).json({ status: 'Error al obtener estado del worker', error: error.message });
  }
});

// Jobs de una cola
router.get('/jobs/:queue', async (req, res) => {
  try {
    const { queue } = req.params;
    const jobs = await workerManager.getJobs(queue);
    res.json(jobs);
  } catch (error) {
    console.error("Error al obtener los jobs:", error);
    res.status(500).json({ status: 'Error al obtener los jobs', error: error.message });
  }
});

// Página principal con vista de manager
router.get('/manager', (req, res) => {
  res.render('workers_views/index.ejs', { title: 'Worker Manager' });
});

// Ruta para enviar tareas sin especificar cola
router.post('/task', async (req, res) => {
  try {
    const jobData = req.body; // { task: "create_materia", data: {...}, callback: "..." }
    const job = await workerManager.addJobToAnyQueue(jobData);
    res.json({ message: "Solicitud aceptada y en procesamiento", taskId: job.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
