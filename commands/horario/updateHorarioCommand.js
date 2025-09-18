const BaseCommand = require('../baseCommand');
const { Horario } = require('../../models');

class UpdateHorarioCommand extends BaseCommand {
  async execute() {
    const [updated] = await Horario.update(this.data, { where: { id: this.data.id } });
    if (!updated) throw new Error('Horario no encontrado');
    const horario = await Horario.findByPk(this.data.id);
    return { success: true, horario };
  }
}

module.exports = UpdateHorarioCommand;
