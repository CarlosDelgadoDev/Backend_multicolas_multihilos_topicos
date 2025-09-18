const BaseCommand = require('../baseCommand');
const { Periodo } = require('../../models');

class GetPeriodoCommand extends BaseCommand {
  async execute() {
    const periodos = await Periodo.findAll();
    return { success: true, periodos };
  }
}

module.exports = GetPeriodoCommand;
