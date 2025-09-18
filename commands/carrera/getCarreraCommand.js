const BaseCommand = require('../baseCommand');
const { Carrera, Facultad, Plan_de_estudio } = require('../../models');

class GetCarreraCommand extends BaseCommand {
  async execute() {
    // Extraer 'page' y 'pageSize' de los datos, con valores por defecto.
    const page = Math.max(1, parseInt(this.data.page) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(this.data.pageSize) || 10));

    // Consulta paginada y con conteo total.
    const { count, rows: carreras } = await Carrera.findAndCountAll({
      include: [{
        model: Facultad
      },
      {
        model: Plan_de_estudio
      }],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [['createdAt', 'DESC']]
    });

    // Calcular el total de páginas.
    const totalPages = Math.ceil(count / pageSize);

    // Devolver la respuesta con los datos, el éxito y la información de paginación.
    return {
      success: true,
      carreras,
      pagination: {
        total: count,
        page: page,
        pageSize: pageSize,
        totalPages: totalPages
      }
    };
  }
}

module.exports = GetCarreraCommand;