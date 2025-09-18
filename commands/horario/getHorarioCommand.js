const BaseCommand = require('../baseCommand');
const { Horario } = require('../../models');

class GetHorarioCommand extends BaseCommand {
  async execute() {
    const horarios = await Horario.findAll();
    return { success: true, horarios };
  }
}

module.exports = GetHorarioCommand;
