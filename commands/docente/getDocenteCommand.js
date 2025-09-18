const BaseCommand = require('../baseCommand');
const { Docente, Acta_de_notas, Grupo_Materia } = require('../../models');

class GetDocenteCommand extends BaseCommand {
  async execute() {
    // Extraer 'page' y 'pageSize' de los datos, con valores por defecto.
    const page = Math.max(1, parseInt(this.data.page) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(this.data.pageSize) || 10));

    // Consulta paginada y con conteo total.
    const { count, rows: docentes } = await Docente.findAndCountAll({
      include: [
        {
          model: Acta_de_notas
        },
        {
          model: Grupo_Materia
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
      docentes,
      pagination: {
        total: count,
        page: page,
        pageSize: pageSize,
        totalPages: totalPages
      }
    };
  }
}

module.exports = GetDocenteCommand;
