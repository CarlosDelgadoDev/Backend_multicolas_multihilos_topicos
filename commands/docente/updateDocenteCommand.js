const BaseCommand = require('../baseCommand');
const { Docente } = require('../../models');

class UpdateDocenteCommand extends BaseCommand {
  async execute() {
    const [updated] = await Docente.update(this.data, { where: { id: this.data.id } });
    if (!updated) throw new Error('Docente no encontrado');
    const docente = await Docente.findByPk(this.data.id);
    return { success: true, docente };
  }
}

module.exports = UpdateDocenteCommand;
