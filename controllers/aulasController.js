// Controlador CRUD para Aula
const { Aula } = require('../models');

exports.createAula = async (req, res) => {
  try {
    const aula = await Aula.create(req.body);
    res.status(201).json(aula);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAulas = async (req, res) => {
  try {
    const aulas = await Aula.findAll();
    res.json(aulas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAulaById = async (req, res) => {
  try {
    const aula = await Aula.findByPk(req.params.id);
    if (!aula) return res.status(404).json({ error: 'No encontrado' });
    res.json(aula);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAula = async (req, res) => {
  try {
    const [updated] = await Aula.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    const aula = await Aula.findByPk(req.params.id);
    res.json(aula);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAula = async (req, res) => {
  try {
    const deleted = await Aula.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Aula eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
