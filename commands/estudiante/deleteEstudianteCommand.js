const BaseCommand = require('../baseCommand');
const { Estudiante } = require('../../models');

class DeleteEstudianteCommand extends BaseCommand {
  async execute() {
    const deleted = await Estudiante.destroy({ where: { id: this.data.id } });
    if (!deleted) throw new Error('Estudiante no encontrado');
    return { success: true, deletedId: this.data.id };
  }
}

module.exports = DeleteEstudianteCommand;
