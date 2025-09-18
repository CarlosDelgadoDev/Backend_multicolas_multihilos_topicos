const BaseCommand = require('../baseCommand');
const { Aula } = require('../../models');

class GetAulaCommand extends BaseCommand {
  async execute() {
    const aulas = await Aula.findAll();
    return { success: true, aulas };
  }
}

module.exports = GetAulaCommand;
