// Controlador CRUD para Pre_requisito
const { Pre_requisito } = require('../models');

exports.createPreRequisito = async (req, res) => {
  try {
    const pre = await Pre_requisito.create(req.body);
    res.status(201).json(pre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPreRequisitos = async (req, res) => {
  try {
    const pres = await Pre_requisito.findAll();
    res.json(pres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPreRequisitoById = async (req, res) => {
  try {
    const pre = await Pre_requisito.findByPk(req.params.id);
    if (!pre) return res.status(404).json({ error: 'No encontrado' });
    res.json(pre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePreRequisito = async (req, res) => {
  try {
    const [updated] = await Pre_requisito.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    const pre = await Pre_requisito.findByPk(req.params.id);
    res.json(pre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePreRequisito = async (req, res) => {
  try {
    const deleted = await Pre_requisito.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Pre-requisito eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
