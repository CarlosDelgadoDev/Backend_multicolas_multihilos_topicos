const BaseCommand = require('../baseCommand');
const { Aula } = require('../../models');

class UpdateAulaCommand extends BaseCommand {
  async execute() {
    const [updated] = await Aula.update(this.data, { where: { id: this.data.id } });
    if (!updated) throw new Error('Aula no encontrada');
    const aula = await Aula.findByPk(this.data.id);
    return { success: true, aula };
  }
}

module.exports = UpdateAulaCommand;
