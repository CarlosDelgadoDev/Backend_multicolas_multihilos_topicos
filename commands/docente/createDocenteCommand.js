const BaseCommand = require('../baseCommand');
const { Docente } = require('../../models');

class CreateDocenteCommand extends BaseCommand {
  async execute() {
    const docente = await Docente.create(this.data);
    return { success: true, docente };
  }
}

module.exports = CreateDocenteCommand;
