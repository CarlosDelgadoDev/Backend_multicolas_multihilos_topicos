// Controlador CRUD para Horario
const { Horario } = require('../models');

exports.createHorario = async (req, res) => {
  try {
    const horario = await Horario.create(req.body);
    res.status(201).json(horario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getHorarios = async (req, res) => {
  try {
    const horarios = await Horario.findAll();
    res.json(horarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHorarioById = async (req, res) => {
  try {
    const horario = await Horario.findByPk(req.params.id);
    if (!horario) return res.status(404).json({ error: 'No encontrado' });
    res.json(horario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateHorario = async (req, res) => {
  try {
    const [updated] = await Horario.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    const horario = await Horario.findByPk(req.params.id);
    res.json(horario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteHorario = async (req, res) => {
  try {
    const deleted = await Horario.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Horario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
