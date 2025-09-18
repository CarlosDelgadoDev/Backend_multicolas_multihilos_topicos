const BaseCommand = require('../baseCommand');
const { Horario } = require('../../models');

class CreateHorarioCommand extends BaseCommand {
  async execute() {
    const horario = await Horario.create(this.data);
    return { success: true, horario };
  }
}

module.exports = CreateHorarioCommand;
