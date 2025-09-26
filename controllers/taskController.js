const workerManager = require('../workers/workerManager');

// 👉 Crear nueva tarea
exports.createTask = async (req, res) => {
  try {
    const { task, data, callback } = req.body;

    const job = await workerManager.addJobToAnyQueue({ task, data, callback });

    res.status(202).json({
      message: "Tarea aceptada",
      shortId: job.shortId,
      queue: job.queue,
      estado: job.queue === 'duplicate' ? 'duplicate' : 'waiting'
    });
  } catch (err) {
    console.error("❌ Error en createTask:", err);
    res.status(500).json({ error: err.message });
  }
};

// 👉 Obtener estado de la tarea por shortId
exports.getStatus = async (req, res) => {
  try {
    const shortId = parseInt(req.params.id);

    if (isNaN(shortId)) {
      return res.status(400).json({ error: "El ID debe ser un número" });
    }

    const job = await workerManager.getJobById(shortId);

    if (!job) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json({
      shortId,
      estado: job.state,            // completed, failed, waiting, active, duplicate
      queue: job.queue,
    });
  } catch (err) {
    console.error("❌ Error en getStatus:", err);
    res.status(500).json({ error: err.message });
  }
};
