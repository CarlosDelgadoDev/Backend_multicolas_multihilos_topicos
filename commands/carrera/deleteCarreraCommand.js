const BaseCommand = require('../baseCommand');
const { Carrera } = require('../../models');

class DeleteCarreraCommand extends BaseCommand {
  async execute() {
    const deleted = await Carrera.destroy({ where: { id: this.data.id } });
    if (!deleted) throw new Error('Carrera no encontrada');
    return { success: true, deletedId: this.data.id };
  }
}

module.exports = DeleteCarreraCommand;
