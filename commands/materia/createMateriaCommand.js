const BaseCommand = require('../baseCommand');
const { Materia } = require('../../models');

class CreateMateriaCommand extends BaseCommand {
  async execute() {
    const materia = await Materia.create(this.data);
    return { success: true, materia };
  }
}

module.exports = CreateMateriaCommand;
