// Controlador CRUD para Detalle_carrera_cursadas
const { Detalle_carrera_cursadas } = require('../models');

exports.createDetalleCarreraCursadas = async (req, res) => {
  try {
    const detalle = await Detalle_carrera_cursadas.create(req.body);
    res.status(201).json(detalle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDetallesCarreraCursadas = async (req, res) => {
  try {
    const detalles = await Detalle_carrera_cursadas.findAll();
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDetalleCarreraCursadasById = async (req, res) => {
  try {
    const detalle = await Detalle_carrera_cursadas.findByPk(req.params.id);
    if (!detalle) return res.status(404).json({ error: 'No encontrado' });
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDetalleCarreraCursadas = async (req, res) => {
  try {
    const [updated] = await Detalle_carrera_cursadas.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    const detalle = await Detalle_carrera_cursadas.findByPk(req.params.id);
    res.json(detalle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDetalleCarreraCursadas = async (req, res) => {
  try {
    const deleted = await Detalle_carrera_cursadas.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Detalle carrera cursadas eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
