const BaseCommand = require('../baseCommand');
const { ActaDeNotas } = require('../../models');

class CreateActaDeNotasCommand extends BaseCommand {
  async execute() {
    const actaDeNotas = await ActaDeNotas.create(this.data);
    return { success: true, actaDeNotas };
  }
}

module.exports = CreateActaDeNotasCommand;
