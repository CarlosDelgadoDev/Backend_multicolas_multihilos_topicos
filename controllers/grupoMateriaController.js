// Controlador CRUD para Grupo_Materia
const { sequelize, Grupo_Materia, Docente, Materia, Periodo, Horario, Gestion, Aula, Modulo } = require('../models');

// Crear un nuevo Grupo de Materia y sus relaciones
exports.createGrupoMateria = async (req, res) => {
	let transaction;
	try {
		const { Docente: docenteData, Materium: materiaData, Periodo: periodoData, Horarios: horariosData, ...grupoMateriaData } = req.body;

		// Validar datos de entrada esenciales
		if (!docenteData || !docenteData.ci) {
			return res.status(400).json({ error: 'Debe proporcionar el CI del docente.' });
		}
		if (!materiaData || !materiaData.sigla) {
			return res.status(400).json({ error: 'Debe proporcionar la sigla de la materia.' });
		}
		if (!periodoData || !periodoData.id) {
			return res.status(400).json({ error: 'Debe proporcionar el ID del periodo.' });
		}

		// Iniciar transacción
		transaction = await sequelize.transaction();

		// 1. Buscar el docente, la materia y el periodo por sus identificadores
		const docente = await Docente.findOne({ where: { ci: docenteData.ci }, transaction });
		if (!docente) {
			await transaction.rollback();
			return res.status(404).json({ error: `No existe un docente con el CI: ${docenteData.ci}` });
		}

		const materia = await Materia.findOne({ where: { sigla: materiaData.sigla }, transaction });
		if (!materia) {
			await transaction.rollback();
			return res.status(404).json({ error: `No existe una materia con la sigla: ${materiaData.sigla}` });
		}

		const periodo = await Periodo.findByPk(periodoData.id, { transaction });
		if (!periodo) {
			await transaction.rollback();
			return res.status(404).json({ error: `No existe un periodo con el ID: ${periodoData.id}` });
		}

		// 2. Crear el Grupo_Materia
		grupoMateriaData.docenteId = docente.id;
		grupoMateriaData.materiaId = materia.id;
		grupoMateriaData.periodoId = periodo.id;

		const grupoMateria = await Grupo_Materia.create(grupoMateriaData, { transaction });

		// 3. Asociar los horarios
		if (Array.isArray(horariosData) && horariosData.length > 0) {
			const horarioIds = horariosData.map(h => h.id);

			// Validar que los horarios existan
			const horariosExistentes = await Horario.findAll({ where: { id: horarioIds }, transaction });
			if (horariosExistentes.length !== horarioIds.length) {
				const idsEncontrados = horariosExistentes.map(h => h.id);
				const idsFaltantes = horarioIds.filter(id => !idsEncontrados.includes(id));
				await transaction.rollback();
				return res.status(400).json({
					error: `No se encontraron horarios con los siguientes IDs: ${idsFaltantes.join(', ')}`
				});
			}

			// Asociar los horarios al grupo de materia
			await Horario.update(
				{ grupoMateriaId: grupoMateria.id },
				{ where: { id: horarioIds }, transaction }
			);
		} else if (horariosData !== undefined) {
			await transaction.rollback();
			return res.status(400).json({ error: 'Horarios debe ser un array de objetos con ID.' });
		}

		// 4. Recargar el grupo de materia con sus relaciones para la respuesta
		const grupoMateriaCreado = await Grupo_Materia.findOne({
			where: { id: grupoMateria.id },
			include: [
				{
					model: Docente,
					attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
				},
				{
					model: Materia,
					attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
				},
				{
					model: Periodo,
					attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'gestionId'] },
					include: [
						{
							model: Gestion,
							attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
						}
					]
				},
				{
					model: Horario,
					attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'grupoMateriaId', 'aulaId'] },
					include: [
						{
							model: Aula,
							attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'moduloId'] },
							include: [
								{
									model: Modulo,
									attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
								}
							]
						}
					]
				}
			],
			attributes: { exclude: ['id', 'materiaId', 'docenteId', 'periodoId', 'createdAt', 'updatedAt'] },
			transaction
		});

		// 5. Commit de la transacción
		await transaction.commit();

		res.status(201).json({
			success: true,
			message: 'Grupo de materia y sus relaciones creadas correctamente.',
			grupoMateria: grupoMateriaCreado
		});

	} catch (error) {
		console.error(error);
		if (transaction) {
			await transaction.rollback();
		}
		res.status(400).json({ error: error.message });
	}
};

exports.getGruposMateria = async (req, res) => {
	try {
		const { page = 1, pageSize = 10 } = req.query;
		const offset = (page - 1) * pageSize;
		const grupos = await Grupo_Materia.findAll(
			{
				include: [
					{
						model: Docente,
						attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
					},
					{
						model: Materia,
						attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
					},
					{
						model: Periodo,
						attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'gestionId'] },
						include: [
							{
								model: Gestion,
								attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
							}
						]
					},
					{
						model: Horario,
						attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'grupoMateriaId', 'aulaId'] },
						include: [
							{
								model: Aula,
								attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'moduloId'] },
								include: [
									{
										model: Modulo,
										attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
									}
								]
							}
						]
					}
				],
				attributes: { exclude: ['id', 'materiaId', 'docenteId', 'periodoId', 'createdAt', 'updatedAt'] },
				limit: pageSize,
				offset
			});
		res.json(grupos);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getGrupoMateriaBySigla = async (req, res) => {
	try {
		const sigla = req.params.sigla;
		if (!sigla) {
			return res.status(400).json({ error: 'La sigla es obligatoria' });
		}
		const grupo = await Grupo_Materia.findOne(
			{
				where: { sigla },
				include: [
					{
						model: Docente,
						attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
					},
					{
						model: Materia,
						attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
					},
					{
						model: Periodo,
						attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'gestionId'] },
						include: [
							{
								model: Gestion,
								attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
							}
						]
					},
					{
						model: Horario,
						attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'grupoMateriaId', 'aulaId'] },
						include: [
							{
								model: Aula,
								attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'moduloId'] },
								include: [
									{
										model: Modulo,
										attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
									}
								]
							}
						]
					}
				],
				attributes: { exclude: ['id', 'materiaId', 'docenteId', 'periodoId', 'createdAt', 'updatedAt'] }
			});
		if (!grupo) return res.status(404).json({ error: 'No encontrado' });
		res.json(grupo);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Actualizar las relaciones de un Grupo de Materia
exports.updateGrupoMateria = async (req, res) => {
	let transaction;
	try {
		const sigla = req.params.sigla;

		if (!sigla) {
			return res.status(400).json({ error: 'La sigla del grupo de materia es requerida.' });
		}

		transaction = await sequelize.transaction();

		// 1. Buscar el Grupo_Materia por su sigla
		const grupoMateria = await Grupo_Materia.findOne({ where: { sigla }, transaction });

		if (!grupoMateria) {
			await transaction.rollback();
			return res.status(404).json({ error: `No se encontró un grupo de materia con la sigla: ${sigla}` });
		}

		const { Docente: docenteData, Materium: materiaData, Periodo: periodoData, Horarios: horariosData } = req.body;

		// 2. Actualizar las relaciones belongsTo
		// Actualizar Docente
		if (docenteData && docenteData.ci) {
			const docente = await Docente.findOne({ where: { ci: docenteData.ci }, transaction });
			if (!docente) {
				await transaction.rollback();
				return res.status(404).json({ error: `No existe un docente con el CI: ${docenteData.ci}` });
			}
			await grupoMateria.update({ docenteId: docente.id }, { transaction });
		}

		// Actualizar Materia
		if (materiaData && materiaData.sigla) {
			const materia = await Materia.findOne({ where: { sigla: materiaData.sigla }, transaction });
			if (!materia) {
				await transaction.rollback();
				return res.status(404).json({ error: `No existe una materia con la sigla: ${materiaData.sigla}` });
			}
			await grupoMateria.update({ materiaId: materia.id }, { transaction });
		}

		// Actualizar Periodo
		if (periodoData && periodoData.id) {
			const periodo = await Periodo.findByPk(periodoData.id, { transaction });
			if (!periodo) {
				await transaction.rollback();
				return res.status(404).json({ error: `No existe un periodo con el ID: ${periodoData.id}` });
			}
			await grupoMateria.update({ periodoId: periodo.id }, { transaction });
		}

		// 3. Actualizar la relación hasMany con Horarios
		if (Array.isArray(horariosData)) {
			const horarioIds = horariosData.map(h => h.id);

			// Desasociar los horarios antiguos del grupo
			await Horario.update(
				{ grupoMateriaId: null },
				{ where: { grupoMateriaId: grupoMateria.id }, transaction }
			);

			// Validar que los nuevos horarios existan
			const horariosExistentes = await Horario.findAll({ where: { id: horarioIds }, transaction });
			if (horariosExistentes.length !== horarioIds.length) {
				const idsEncontrados = horariosExistentes.map(h => h.id);
				const idsFaltantes = horarioIds.filter(id => !idsEncontrados.includes(id));
				await transaction.rollback();
				return res.status(400).json({ error: `No se encontraron horarios con los siguientes IDs: ${idsFaltantes.join(', ')}` });
			}

			// Asociar los nuevos horarios al grupo de materia
			await Horario.update(
				{ grupoMateriaId: grupoMateria.id },
				{ where: { id: horarioIds }, transaction }
			);
		}

		// 4. Recargar el grupo de materia con sus relaciones actualizadas
		const grupoMateriaActualizado = await Grupo_Materia.findOne({
			where: { id: grupoMateria.id },
			include: [
					{
						model: Docente,
						attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
					},
					{
						model: Materia,
						attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
					},
					{
						model: Periodo,
						attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'gestionId'] },
						include: [
							{
								model: Gestion,
								attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
							}
						]
					},
					{
						model: Horario,
						attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'grupoMateriaId', 'aulaId'] },
						include: [
							{
								model: Aula,
								attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'moduloId'] },
								include: [
									{
										model: Modulo,
										attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
									}
								]
							}
						]
					}
				],
				attributes: { exclude: ['id', 'materiaId', 'docenteId', 'periodoId', 'createdAt', 'updatedAt'] },
			transaction
		});

		await transaction.commit();

		res.json({
			success: true,
			message: 'Relaciones del grupo de materia actualizadas correctamente.',
			grupoMateria: grupoMateriaActualizado
		});

	} catch (error) {
		console.error(error);
		if (transaction) {
			await transaction.rollback();
		}
		res.status(400).json({ error: error.message });
	}
};

exports.deleteGrupoMateria = async (req, res) => {
	try {

		const sigla = req.params.sigla;

		if (!sigla) {
			return res.status(400).json({ error: 'La sigla del grupo de materia es requerida.' });
		}
		const deleted = await Grupo_Materia.destroy({ where: { sigla } });
		if (!deleted) return res.status(404).json({ error: 'No encontrado' });
		res.json({ mensaje: 'Grupo materia eliminado' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
