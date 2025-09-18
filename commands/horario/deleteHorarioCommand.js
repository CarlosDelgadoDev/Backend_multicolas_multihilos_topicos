const BaseCommand = require('../baseCommand');
const { Horario } = require('../../models');

class DeleteHorarioCommand extends BaseCommand {
  async execute() {
    const deleted = await Horario.destroy({ where: { id: this.data.id } });
    if (!deleted) throw new Error('Horario no encontrado');
    return { success: true, deletedId: this.data.id };
  }
}

module.exports = DeleteHorarioCommand;
