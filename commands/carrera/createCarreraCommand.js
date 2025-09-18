const BaseCommand = require('../baseCommand');
const { Carrera } = require('../../models');

class CreateCarreraCommand extends BaseCommand {
  async execute() {
    const carrera = await Carrera.create(this.data);
    return { success: true, carrera };
  }
}

module.exports = CreateCarreraCommand;
