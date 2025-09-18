const workerManager = require('../workers/workerManager');

exports.createTask = async (req, res) => {
  try {
    const { task, data, callback } = req.body;

    // Añadir job a cualquier cola activa (Round-Robin)
    const job = await workerManager.addJobToAnyQueue({ task, data, callback });

    if (!job.id) {
      // Job quedó pendiente porque no hay colas activas
      return res.status(202).json({
        message: "No hay colas activas, job pendiente",
        shortId: job.shortId
      });
    }

    res.status(202).json({
      message: "Solicitud aceptada y en procesamiento",
      shortId: job.shortId,
      queue: job.queue
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getStatus = async (req, res) => {
  try {
    const shortId = parseInt(req.params.id);

    const job = await workerManager.getJobById(shortId);

    if (!job) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json({
      shortId: job.shortId,
      estado: job.state,
      queue: job.queue
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
