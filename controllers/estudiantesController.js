
const { sequelize, Estudiante, Boleta_Inscripcion, Detalle_carrera_cursadas, Periodo, Plan_de_estudio } = require('../models');
const { saveUnique, getById, update, remove } = require('../helpers/redisHelper');


// Crear estudiante
exports.createEstudiante = async (req, res) => {
	let transaction;
	try {
		const { Detalle_carrera_cursadas: planesCursadosData, ...estudianteData } = req.body;


		    // Validar duplicados con Redis (usamos el campo "ci" como ID único)
    const result = await saveUnique("estudiantes", estudianteData.ci, estudianteData);

    if (!result.success) {
      return res.status(409).json({ error: result.message });
    }

		// Iniciar transacción
		transaction = await sequelize.transaction();

		// 1. Crear el estudiante
		const estudiante = await Estudiante.create(estudianteData, { transaction });

		// 2. Asociar los planes de estudio si se proporcionan
		if (Array.isArray(planesCursadosData) && planesCursadosData.length > 0) {
			// Recopilar los códigos de los planes de estudio
			const codigosPlanes = planesCursadosData
				.filter(plan => plan.codigo)
				.map(plan => plan.codigo);

			// Buscar los planes de estudio existentes
			const planesExistentes = await Plan_de_estudio.findAll({
				where: { codigo: codigosPlanes },
				transaction
			});

			// Verificar que todos los códigos enviados existan
			if (planesExistentes.length !== codigosPlanes.length) {
				const codigosEncontrados = planesExistentes.map(p => p.codigo);
				const codigosFaltantes = codigosPlanes.filter(c => !codigosEncontrados.includes(c));
				await transaction.rollback();
				return res.status(400).json({
					error: `No existen los planes de estudio con los códigos: ${codigosFaltantes.join(', ')}`
				});
			}

			// Preparar los datos para la inserción masiva en la tabla intermedia
			const detallesCursados = planesExistentes.map(plan => ({
				estudianteId: estudiante.id,
				planDeEstudioId: plan.id,
				fechaInscripcion: new Date() // Puedes agregar la fecha actual
			}));

			await Detalle_carrera_cursadas.bulkCreate(detallesCursados, { transaction });
		}

		// 3. Recargar el estudiante con sus relaciones
		const estudianteCreado = await Estudiante.findOne({
			where: { id: estudiante.id },
			include: [
				{
					model: Detalle_carrera_cursadas,
					include: [{ model: Plan_de_estudio }]
				}
			],
			transaction
		});

		// Commit de la transacción
		await transaction.commit();

		res.status(201).json({
			success: true,
			message: 'Estudiante y sus carreras cursadas creados correctamente',
			estudiante: estudianteCreado
		});

	} catch (error) {
		console.error(error);
		// Rollback en caso de error
		if (transaction) {
			await transaction.rollback();
		}
		res.status(400).json({ error: error.message });
	}
};

// Obtener todos los estudiantes (solo desde DB)
exports.getEstudiantes = async (req, res) => {
	try {

		const page = parseInt(req.query.page) || 1;
		const pageSize = parseInt(req.query.pageSize) || 10;
		const offset = (page - 1) * pageSize;

		const estudiantes = await Estudiante.findAll(
			{
				include: [
					{
						model: Boleta_Inscripcion,
						attributes: { exclude: ['createdAt', 'updatedAt', "estudianteId", "Estudiante"] },
						include: [
							{
								model: Periodo,
								attributes: { exclude: ['createdAt', 'updatedAt', "id"] }
							}
						],
					},
					{
						model: Detalle_carrera_cursadas,
						attributes: { exclude: ['createdAt', 'updatedAt', "estudianteId", "id", "planDeEstudioId"] },
						include: [
							{
								model: Plan_de_estudio,
								attributes: { exclude: ['createdAt', 'updatedAt', "id", "carreraId"] }
							}
						]
					},
				],
				attributes: { exclude: ['createdAt', 'updatedAt', "id"] },
				order: [['nombre', 'ASC']],
				limit: pageSize,
				offset
			});
		res.json(estudiantes);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Obtener estudiante por registro
exports.getEstudianteByRegistro = async (req, res) => {
	try {
		const registro = parseInt(req.params.registro);
		if (isNaN(registro)) {
			return res.status(400).json({ error: 'El registro debe ser un número entero' });
		}
		const estudiante = await Estudiante.findOne(
			{
				where: { registro },
				include: [
					{
						model: Boleta_Inscripcion,
						attributes: { exclude: ['createdAt', 'updatedAt', "estudianteId", "Estudiante"] },
						include: [
							{
								model: Periodo,
								attributes: { exclude: ['createdAt', 'updatedAt', "id"] }
							}
						],
					},
					{
						model: Detalle_carrera_cursadas,
						attributes: { exclude: ['createdAt', 'updatedAt', "estudianteId", "id", "planDeEstudioId"] },
						include: [
							{
								model: Plan_de_estudio,
								attributes: { exclude: ['createdAt', 'updatedAt', "id", "carreraId"] }
							}
						]
					},
				],
				attributes: { exclude: ['createdAt', 'updatedAt', "id"] },

			});
		if (!estudiante) return res.status(404).json({ error: 'No encontrado' });
		res.json(estudiante);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Actualizar estudiante
exports.updateEstudiante = async (req, res) => {
	let transaction;
	try {
		const registro = req.params.registro;

		if (!registro) {
			return res.status(400).json({ error: 'El registro del estudiante es requerido' });
		}

		// Iniciar transacción
		transaction = await sequelize.transaction();

		// 1. Buscar el estudiante por su registro
		const estudiante = await Estudiante.findOne({
			where: { registro },
			transaction
		});

		if (!estudiante) {
			await transaction.rollback();
			return res.status(404).json({ error: 'Estudiante no encontrado' });
		}
		const estudianteId = estudiante.id;

		// 2. Separar los datos principales de las relaciones
		const { Detalle_carrera_cursadas: planesCursadosData, ...estudianteData } = req.body;

		// 3. Actualizar los datos principales del estudiante
		await estudiante.update(estudianteData, { transaction });

		// 4. Reemplazar las relaciones con los planes de estudio
		if (Array.isArray(planesCursadosData)) {
			// Eliminar todos los detalles de carreras cursadas actuales del estudiante
			await Detalle_carrera_cursadas.destroy({
				where: { estudianteId },
				transaction
			});

			// Recopilar los códigos de los nuevos planes de estudio
			const codigosPlanes = planesCursadosData
				.filter(plan => plan.codigo)
				.map(plan => plan.codigo);

			// Buscar los planes de estudio existentes
			const planesExistentes = await Plan_de_estudio.findAll({
				where: { codigo: codigosPlanes },
				transaction
			});

			// Verificar si todos los códigos enviados existen
			if (planesExistentes.length !== codigosPlanes.length) {
				const codigosEncontrados = planesExistentes.map(p => p.codigo);
				const codigosFaltantes = codigosPlanes.filter(c => !codigosEncontrados.includes(c));
				await transaction.rollback();
				return res.status(400).json({
					error: `No existen los planes de estudio con los códigos: ${codigosFaltantes.join(', ')}`
				});
			}

			// Preparar los datos para la inserción masiva en la tabla intermedia
			const detallesCursados = planesExistentes.map(plan => ({
				estudianteId: estudianteId,
				planDeEstudioId: plan.id,
				fechaInscripcion: new Date() // Opcional: mantener la fecha de inscripción
			}));

			await Detalle_carrera_cursadas.bulkCreate(detallesCursados, { transaction });

		} else if (planesCursadosData !== undefined) {
			await transaction.rollback();
			return res.status(400).json({
				error: 'Detalle_carrera_cursadas debe ser un array'
			});
		}

		// 5. Recargar el estudiante con sus relaciones actualizadas
		const estudianteActualizado = await Estudiante.findOne({
			where: { id: estudianteId },
			include: [
				{
					model: Boleta_Inscripcion,
					attributes: { exclude: ['createdAt', 'updatedAt', "estudianteId", "Estudiante"] },
					include: [
						{
							model: Periodo,
							attributes: { exclude: ['createdAt', 'updatedAt', "id"] }
						}
					],
				},
				{
					model: Detalle_carrera_cursadas,
					attributes: { exclude: ['createdAt', 'updatedAt', "estudianteId", "id", "planDeEstudioId"] },
					include: [
						{
							model: Plan_de_estudio,
							attributes: { exclude: ['createdAt', 'updatedAt', "id", "carreraId"] }
						}
					]
				},
			],
			attributes: { exclude: ['createdAt', 'updatedAt', "id"] },
			transaction
		});

		// 6. Commit de la transacción
		await transaction.commit();

		res.json({
			success: true,
			message: 'Estudiante y sus carreras cursadas actualizadas correctamente',
			estudiante: estudianteActualizado
		});

	} catch (error) {
		console.error(error);
		if (transaction) {
			await transaction.rollback();
		}
		res.status(400).json({ error: error.message });
	}

};

// Eliminar estudiante
exports.deleteEstudiante = async (req, res) => {
	console.log("llego");
	try {
		const registro = req.params.registro;
		if (!registro) {
			return res.status(400).json({ error: 'El registro del estudiante es requerido' });
		}

				// Primero buscamos el estudiante para obtener su CI
		const estudiante = await Estudiante.findOne({ where: { registro } });
		if (!estudiante) return res.status(404).json({ error: 'No encontrado' });

		// 🔹 Borramos también de Redis usando el CI
		const { deleteUnique } = require('../helpers/redisHelper');
		await deleteUnique('estudiantes', estudiante.ci);


		const deleted = await Estudiante.destroy({ where: { registro } });
		if (!deleted) return res.status(404).json({ error: 'No encontrado' });
		res.json({ mensaje: 'Estudiante eliminado' });
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: error.message });

	}
};

