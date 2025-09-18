const BaseCommand = require('../baseCommand');
const { Carrera } = require('../../models');

class UpdateCarreraCommand extends BaseCommand {
  async execute() {
    const [updated] = await Carrera.update(this.data, { where: { id: this.data.id } });
    if (!updated) throw new Error('Carrera no encontrada');
    const carrera = await Carrera.findByPk(this.data.id);
    return { success: true, carrera };
  }
}

module.exports = UpdateCarreraCommand;
