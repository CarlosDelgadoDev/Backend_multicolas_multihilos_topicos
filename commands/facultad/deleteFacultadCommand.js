const BaseCommand = require('../baseCommand');
const { Facultad } = require('../../models');

class DeleteFacultadCommand extends BaseCommand {
  async execute() {
    const deleted = await Facultad.destroy({ where: { id: this.data.id } });
    if (!deleted) throw new Error('Facultad no encontrada');
    return { success: true, deletedId: this.data.id };
  }
}

module.exports = DeleteFacultadCommand;
