const BaseCommand = require('../baseCommand');
const { GrupoMateria } = require('../../models');

class DeleteGrupoMateriaCommand extends BaseCommand {
  async execute() {
    const deleted = await GrupoMateria.destroy({ where: { id: this.data.id } });
    if (!deleted) throw new Error('GrupoMateria no encontrado');
    return { success: true, deletedId: this.data.id };
  }
}

module.exports = DeleteGrupoMateriaCommand;
