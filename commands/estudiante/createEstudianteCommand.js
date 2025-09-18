const BaseCommand = require('../baseCommand');
const { Estudiante } = require('../../models');

class CreateEstudianteCommand extends BaseCommand {
  async execute() {
    const estudiante = await Estudiante.create(this.data);
    return { success: true, estudiante };
  }
}

module.exports = CreateEstudianteCommand;
