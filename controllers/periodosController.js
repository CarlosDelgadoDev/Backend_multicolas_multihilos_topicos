// Controlador CRUD para Periodo
const { Periodo } = require('../models');

exports.createPeriodo = async (req, res) => {
  try {
    const periodo = await Periodo.create(req.body);
    res.status(201).json(periodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPeriodos = async (req, res) => {
  try {
    const periodos = await Periodo.findAll();
    res.json(periodos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPeriodoById = async (req, res) => {
  try {
    const periodo = await Periodo.findByPk(req.params.id);
    if (!periodo) return res.status(404).json({ error: 'No encontrado' });
    res.json(periodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePeriodo = async (req, res) => {
  try {
    const [updated] = await Periodo.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    const periodo = await Periodo.findByPk(req.params.id);
    res.json(periodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePeriodo = async (req, res) => {
  try {
    const deleted = await Periodo.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Periodo eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
