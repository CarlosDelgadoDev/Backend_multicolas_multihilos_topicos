const BaseCommand = require('../baseCommand');
const { GrupoMateria } = require('../../models');

class CreateGrupoMateriaCommand extends BaseCommand {
  async execute() {
    const grupoMateria = await GrupoMateria.create(this.data);
    return { success: true, grupoMateria };
  }
}

module.exports = CreateGrupoMateriaCommand;
