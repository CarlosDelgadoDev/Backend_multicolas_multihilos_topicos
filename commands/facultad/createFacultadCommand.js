const BaseCommand = require('../baseCommand');
const { Facultad } = require('../../models');

class CreateFacultadCommand extends BaseCommand {
  async execute() {
    const facultad = await Facultad.create(this.data);
    return { success: true, facultad }; // Retorna el objeto creado

    //aqui falta hacer el callback para confirmar al cliente
    console.log({ success: true, facultadId: facultad.id });
  }
}

module.exports = CreateFacultadCommand;