const BaseCommand = require('../baseCommand');
const { Modulo } = require('../../models');

class CreateModuloCommand extends BaseCommand {
  async execute() {
    const modulo = await Modulo.create(this.data);
    return { success: true, modulo };
  }
}

module.exports = CreateModuloCommand;
