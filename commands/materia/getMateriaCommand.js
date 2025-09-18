const BaseCommand = require('../baseCommand');
const { Materia } = require('../../models');

class GetMateriaCommand extends BaseCommand {
  async execute() {
    const materias = await Materia.findAll();
    return { success: true, materias };
  }
}

module.exports = GetMateriaCommand;
