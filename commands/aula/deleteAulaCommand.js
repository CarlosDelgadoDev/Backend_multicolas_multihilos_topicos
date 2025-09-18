const BaseCommand = require('../baseCommand');
const { Aula } = require('../../models');

class DeleteAulaCommand extends BaseCommand {
  async execute() {
    const deleted = await Aula.destroy({ where: { id: this.data.id } });
    if (!deleted) throw new Error('Aula no encontrada');
    return { success: true, deletedId: this.data.id };
  }
}

module.exports = DeleteAulaCommand;
