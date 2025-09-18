const BaseCommand = require('../baseCommand');
const { ActaDeNotas } = require('../../models');

class GetActaDeNotasCommand extends BaseCommand {
  async execute() {
    const actasDeNotas = await ActaDeNotas.findAll();
    return { success: true, actasDeNotas };
  }
}

module.exports = GetActaDeNotasCommand;
