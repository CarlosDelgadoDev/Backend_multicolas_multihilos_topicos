const BaseCommand = require('../baseCommand');
const { Docente } = require('../../models');

class DeleteDocenteCommand extends BaseCommand {
  async execute() {
    const deleted = await Docente.destroy({ where: { id: this.data.id } });
    if (!deleted) throw new Error('Docente no encontrado');
    return { success: true, deletedId: this.data.id };
  }
}

module.exports = DeleteDocenteCommand;
