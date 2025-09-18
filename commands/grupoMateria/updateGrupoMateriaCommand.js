const BaseCommand = require('../baseCommand');
const { GrupoMateria } = require('../../models');

class UpdateGrupoMateriaCommand extends BaseCommand {
  async execute() {
    const [updated] = await GrupoMateria.update(this.data, { where: { id: this.data.id } });
    if (!updated) throw new Error('GrupoMateria no encontrado');
    const grupoMateria = await GrupoMateria.findByPk(this.data.id);
    return { success: true, grupoMateria };
  }
}

module.exports = UpdateGrupoMateriaCommand;
