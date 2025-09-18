// Controlador CRUD para Modulo
const { Modulo } = require('../models');

exports.createModulo = async (req, res) => {
  try {
    const modulo = await Modulo.create(req.body);
    res.status(201).json(modulo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getModulos = async (req, res) => {
  try {
    const modulos = await Modulo.findAll();
    res.json(modulos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getModuloById = async (req, res) => {
  try {
    const modulo = await Modulo.findByPk(req.params.id);
    if (!modulo) return res.status(404).json({ error: 'No encontrado' });
    res.json(modulo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateModulo = async (req, res) => {
  try {
    const [updated] = await Modulo.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    const modulo = await Modulo.findByPk(req.params.id);
    res.json(modulo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteModulo = async (req, res) => {
  try {
    const deleted = await Modulo.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Modulo eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
