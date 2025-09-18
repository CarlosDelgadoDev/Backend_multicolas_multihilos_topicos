const BaseCommand = require('../baseCommand');
const { Periodo } = require('../../models');

class DeletePeriodoCommand extends BaseCommand {
  async execute() {
    const deleted = await Periodo.destroy({ where: { id: this.data.id } });
    if (!deleted) throw new Error('Periodo no encontrado');
    return { success: true, deletedId: this.data.id };
  }
}

module.exports = DeletePeriodoCommand;
