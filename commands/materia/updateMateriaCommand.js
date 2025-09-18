const BaseCommand = require('../baseCommand');
const { Materia } = require('../../models');

class UpdateMateriaCommand extends BaseCommand {
  async execute() {
    const [updated] = await Materia.update(this.data, { where: { id: this.data.id } });
    if (!updated) throw new Error('Materia no encontrada');
    const materia = await Materia.findByPk(this.data.id);
    return { success: true, materia };
  }
}

module.exports = UpdateMateriaCommand;
