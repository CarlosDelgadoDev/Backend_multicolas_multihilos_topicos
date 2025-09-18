const BaseCommand = require('../baseCommand');
const { ActaDeNotas } = require('../../models');

class DeleteActaDeNotasCommand extends BaseCommand {
  async execute() {
    const deleted = await ActaDeNotas.destroy({ where: { id: this.data.id } });
    if (!deleted) throw new Error('ActaDeNotas no encontrada');
    return { success: true, deletedId: this.data.id };
  }
}

module.exports = DeleteActaDeNotasCommand;
