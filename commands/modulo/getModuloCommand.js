const BaseCommand = require('../baseCommand');
const { Modulo } = require('../../models');

class GetModuloCommand extends BaseCommand {
  async execute() {
    const modulos = await Modulo.findAll();
    return { success: true, modulos };
  }
}

module.exports = GetModuloCommand;
