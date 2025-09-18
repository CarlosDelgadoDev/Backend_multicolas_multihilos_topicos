const BaseCommand = require('../baseCommand');
const { GrupoMateria } = require('../../models');

class GetGrupoMateriaCommand extends BaseCommand {
  async execute() {
    const grupoMaterias = await GrupoMateria.findAll();
    return { success: true, grupoMaterias };
  }
}

module.exports = GetGrupoMateriaCommand;
