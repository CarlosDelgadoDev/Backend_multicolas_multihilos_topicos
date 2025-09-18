// Controlador CRUD para Docente
const { Docente } = require('../models');
const { saveUnique } = require('../helpers/redisHelper'); // <- Importamos Redis helper

// Crear docente
exports.createDocente = async (req, res) => {
  try {
    const data = req.body;

    // ✅ Validación de duplicados usando Redis
    const resultUnique = await saveUnique('docentes', data.ci, data);
    if (!resultUnique.success) {
      return res.status(400).json({ error: 'Docente ya existe' });
    }

    const docente = await Docente.create(data);
    res.status(201).json(docente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los docentes
exports.getDocentes = async (req, res) => {
  try {
    const docentes = await Docente.findAll();
    res.json(docentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener docente por ID
exports.getDocenteById = async (req, res) => {
  try {
    const docente = await Docente.findByPk(req.params.id);
    if (!docente) return res.status(404).json({ error: 'No encontrado' });
    res.json(docente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar docente
exports.updateDocente = async (req, res) => {
  try {
    const [updated] = await Docente.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    const docente = await Docente.findByPk(req.params.id);
    res.json(docente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar docente
exports.deleteDocente = async (req, res) => {
  try {
    const deleted = await Docente.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'No encontrado' });

    // 🔹 También eliminar de Redis para mantener consistencia
    const data = req.body;
    if (data?.ci) {
      const redis = require('../helpers/redisHelper');
      redis.deleteUnique('docentes', data.ci);
    }

    res.json({ mensaje: 'Docente eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
