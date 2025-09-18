const BaseCommand = require('../baseCommand');
const { Modulo } = require('../../models');

class DeleteModuloCommand extends BaseCommand {
  async execute() {
    const deleted = await Modulo.destroy({ where: { id: this.data.id } });
    if (!deleted) throw new Error('Modulo no encontrado');
    return { success: true, deletedId: this.data.id };
  }
}

module.exports = DeleteModuloCommand;
