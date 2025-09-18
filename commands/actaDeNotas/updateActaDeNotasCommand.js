const BaseCommand = require('../baseCommand');
const { ActaDeNotas } = require('../../models');

class UpdateActaDeNotasCommand extends BaseCommand {
  async execute() {
    const [updated] = await ActaDeNotas.update(this.data, { where: { id: this.data.id } });
    if (!updated) throw new Error('ActaDeNotas no encontrada');
    const actaDeNotas = await ActaDeNotas.findByPk(this.data.id);
    return { success: true, actaDeNotas };
  }
}

module.exports = UpdateActaDeNotasCommand;
