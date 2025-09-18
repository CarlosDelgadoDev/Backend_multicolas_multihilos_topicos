// Controlador CRUD para Detalle_de_notas
const { Detalle_de_notas } = require('../models');

exports.createDetalleNotas = async (req, res) => {
  try {
    const detalle = await Detalle_de_notas.create(req.body);
    res.status(201).json(detalle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDetallesNotas = async (req, res) => {
  try {
    const detalles = await Detalle_de_notas.findAll();
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDetalleNotasById = async (req, res) => {
  try {
    const detalle = await Detalle_de_notas.findByPk(req.params.id);
    if (!detalle) return res.status(404).json({ error: 'No encontrado' });
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDetalleNotas = async (req, res) => {
  try {
    const [updated] = await Detalle_de_notas.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    const detalle = await Detalle_de_notas.findByPk(req.params.id);
    res.json(detalle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDetalleNotas = async (req, res) => {
  try {
    const deleted = await Detalle_de_notas.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Detalle de notas eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
