// Controlador CRUD para Detalle_Inscripcion
const { Detalle_Inscripcion } = require('../models');

exports.createDetalleInscripcion = async (req, res) => {
  try {
    const detalle = await Detalle_Inscripcion.create(req.body);
    res.status(201).json(detalle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDetallesInscripcion = async (req, res) => {
  try {
    const detalles = await Detalle_Inscripcion.findAll();
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDetalleInscripcionById = async (req, res) => {
  try {
    const detalle = await Detalle_Inscripcion.findByPk(req.params.id);
    if (!detalle) return res.status(404).json({ error: 'No encontrado' });
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDetalleInscripcion = async (req, res) => {
  try {
    const [updated] = await Detalle_Inscripcion.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    const detalle = await Detalle_Inscripcion.findByPk(req.params.id);
    res.json(detalle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDetalleInscripcion = async (req, res) => {
  try {
    const deleted = await Detalle_Inscripcion.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Detalle de inscripción eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
