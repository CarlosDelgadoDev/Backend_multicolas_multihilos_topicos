const BaseCommand = require('../baseCommand');
const { Facultad, Carrera } = require('../../models');

class GetFacultadCommand extends BaseCommand {
	async execute() {

		// Extraer page y pageSize de this.data (con valores por defecto)
		const page = Math.max(1, parseInt(this.data.page) || 1);
		const pageSize = Math.min(100, Math.max(1, parseInt(this.data.pageSize) || 10));

		// Consulta paginada
		const { count, rows: facultades } = await Facultad.findAndCountAll({
			include: [Carrera], // Aquí puedes incluir asociaciones si es necesario
			limit: pageSize,
			offset: (page - 1) * pageSize,
			order: [['createdAt', 'DESC']] // opcional: puedes cambiar el campo de orden
		});

		//console.log("facultades::::::::::::::::",facultades);

		// Calcular total de páginas
		const totalPages = Math.ceil(count / pageSize);

		// Devolver éxito + datos + paginación
		return {
			success: true,
			facultades,
			pagination: {
				total: count,
				page: page,
				pageSize: pageSize,
				totalPages: totalPages
			}
		};
	}
}

module.exports = GetFacultadCommand;
