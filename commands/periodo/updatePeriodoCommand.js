const BaseCommand = require('../baseCommand');
const { Periodo } = require('../../models');

class UpdatePeriodoCommand extends BaseCommand {
  async execute() {
    const [updated] = await Periodo.update(this.data, { where: { id: this.data.id } });
    if (!updated) throw new Error('Periodo no encontrado');
    const periodo = await Periodo.findByPk(this.data.id);
    return { success: true, periodo };
  }
}

module.exports = UpdatePeriodoCommand;
