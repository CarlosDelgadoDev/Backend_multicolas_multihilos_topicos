const BaseCommand = require('../baseCommand');
const { Periodo } = require('../../models');

class CreatePeriodoCommand extends BaseCommand {
  async execute() {
    const periodo = await Periodo.create(this.data);
    return { success: true, periodo };
  }
}

module.exports = CreatePeriodoCommand;
