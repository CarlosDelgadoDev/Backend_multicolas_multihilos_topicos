// Controlador CRUD para Gestion
const { Gestion } = require('../models');

exports.createGestion = async (req, res) => {
  try {
    const gestion = await Gestion.create(req.body);
    res.status(201).json(gestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getGestiones = async (req, res) => {
  try {
    const gestiones = await Gestion.findAll();
    res.json(gestiones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGestionById = async (req, res) => {
  try {
    const gestion = await Gestion.findByPk(req.params.id);
    if (!gestion) return res.status(404).json({ error: 'No encontrado' });
    res.json(gestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateGestion = async (req, res) => {
  try {
    const [updated] = await Gestion.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    const gestion = await Gestion.findByPk(req.params.id);
    res.json(gestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteGestion = async (req, res) => {
  try {
    const deleted = await Gestion.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Gestion eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
