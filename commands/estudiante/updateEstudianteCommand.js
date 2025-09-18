const BaseCommand = require('../baseCommand');
const { Estudiante } = require('../../models');

class UpdateEstudianteCommand extends BaseCommand {
  async execute() {
    const [updated] = await Estudiante.update(this.data, { where: { id: this.data.id } });
    if (!updated) throw new Error('Estudiante no encontrado');
    const estudiante = await Estudiante.findByPk(this.data.id);
    return { success: true, estudiante };
  }
}

module.exports = UpdateEstudianteCommand;
