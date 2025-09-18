const BaseCommand = require('../baseCommand');
const { Facultad } = require('../../models');

class UpdateFacultadCommand extends BaseCommand {
  async execute() {
    // 1. Primero, encuentra el registro. Esto nos permite verificar si existe.
    const facultadExistente = await Facultad.findByPk(this.data.id);
    if (!facultadExistente) {
      throw new Error('Facultad no encontrada.');
    }

    // 2. Realiza la actualización directamente sobre la instancia que encontraste.
    const facultadActualizada = await facultadExistente.update(this.data);

    // 3. ¡Ya tienes la instancia actualizada! No necesitas otra consulta a la base de datos.
    console.log({ success: true, facultad: facultadActualizada });
    return { success: true, facultad: facultadActualizada }; // Es buena idea retornar el valor
  }
}

module.exports = UpdateFacultadCommand;