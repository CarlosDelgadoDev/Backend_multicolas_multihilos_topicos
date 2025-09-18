// Controlador CRUD para Acta_de_notas
const { Acta_de_notas } = require('../models');

exports.createActaDeNotas = async (req, res) => {
  try {
    const acta = await Acta_de_notas.create(req.body);
    res.status(201).json(acta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getActasDeNotas = async (req, res) => {
  try {
    const actas = await Acta_de_notas.findAll();
    res.json(actas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getActaDeNotasById = async (req, res) => {
  try {
    const acta = await Acta_de_notas.findByPk(req.params.id);
    if (!acta) return res.status(404).json({ error: 'No encontrado' });
    res.json(acta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateActaDeNotas = async (req, res) => {
  try {
    const [updated] = await Acta_de_notas.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    const acta = await Acta_de_notas.findByPk(req.params.id);
    res.json(acta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteActaDeNotas = async (req, res) => {
  try {
    const deleted = await Acta_de_notas.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Acta de notas eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
