const BaseCommand = require('../baseCommand');
const { Modulo } = require('../../models');

class UpdateModuloCommand extends BaseCommand {
  async execute() {
    const [updated] = await Modulo.update(this.data, { where: { id: this.data.id } });
    if (!updated) throw new Error('Modulo no encontrado');
    const modulo = await Modulo.findByPk(this.data.id);
    return { success: true, modulo };
  }
}

module.exports = UpdateModuloCommand;
