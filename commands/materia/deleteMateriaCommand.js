const BaseCommand = require('../baseCommand');
const { Materia } = require('../../models');

class DeleteMateriaCommand extends BaseCommand {
  async execute() {
    const deleted = await Materia.destroy({ where: { id: this.data.id } });
    if (!deleted) throw new Error('Materia no encontrada');
    return { success: true, deletedId: this.data.id };
  }
}

module.exports = DeleteMateriaCommand;
