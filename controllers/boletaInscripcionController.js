// Controlador CRUD para Boleta_Inscripcion
const { sequelize, Boleta_Inscripcion, Grupo_Materia, Materia, Detalle_Inscripcion, Periodo, Gestion, Estudiante } = require('../models');
const { all } = require('../routes/carreras');

// Crear una nueva Boleta de Inscripción
exports.createBoletaInscripcion = async (req, res) => {
    let transaction;
    try {
        const { Estudiante: estudianteData, Periodo: periodoData, Detalle_Inscripcions: detallesInscripcionData } = req.body;

        // Validar datos de entrada esenciales
        if (!estudianteData || !estudianteData.registro) {
            return res.status(400).json({ error: 'Debe proporcionar el registro del estudiante.' });
        }
        if (!periodoData || !periodoData.numero || !periodoData.Gestion || !periodoData.Gestion.año) {
            return res.status(400).json({ error: 'Debe proporcionar los datos del periodo y gestión.' });
        }

        // Iniciar transacción
        transaction = await sequelize.transaction();

        // 1. Buscar al estudiante
        const estudiante = await Estudiante.findOne({
            where: { registro: estudianteData.registro },
            transaction
        });

        if (!estudiante) {
            await transaction.rollback();
            return res.status(404).json({ error: `No existe un estudiante con registro ${estudianteData.registro}` });
        }

        // 2. Buscar o crear la gestión y el periodo
        const [gestion, gestionCreada] = await Gestion.findOrCreate({
            where: { año: periodoData.Gestion.año },
            transaction
        });

        const [periodo, periodoCreado] = await Periodo.findOrCreate({
            where: {
                numero: periodoData.numero,
                gestionId: gestion.id
            },
            transaction
        });

        // 3. Crear la Boleta de Inscripción
        const boletaInscripcion = await Boleta_Inscripcion.create({
            fechaDeInscripcion: new Date(),
            estudianteId: estudiante.id,
            periodoId: periodo.id
        }, { transaction });

        // 4. Procesar y asociar los detalles de inscripción
        const nuevosDetalles = [];
        if (Array.isArray(detallesInscripcionData) && detallesInscripcionData.length > 0) {
            for (const detalle of detallesInscripcionData) {
                const { Grupo_Materium: grupoMateriaData } = detalle;

                if (!grupoMateriaData || !grupoMateriaData.sigla || !grupoMateriaData.Materium || !grupoMateriaData.Materium.sigla) {
                    await transaction.rollback();
                    return res.status(400).json({ error: 'Cada detalle de inscripción debe contener la sigla del grupo y la sigla de la materia' });
                }

                // Buscar la materia por su sigla
                const materia = await Materia.findOne({
                    where: { sigla: grupoMateriaData.Materium.sigla },
                    transaction
                });

                if (!materia) {
                    await transaction.rollback();
                    return res.status(404).json({ error: `No existe la materia con sigla '${grupoMateriaData.Materium.sigla}'` });
                }

                // Buscar el grupo de materia por su sigla y el ID de la materia
                const grupoMateria = await Grupo_Materia.findOne({
                    where: {
                        sigla: grupoMateriaData.sigla,
                        materiaId: materia.id
                    },
                    transaction
                });

                if (!grupoMateria) {
                    await transaction.rollback();
                    return res.status(404).json({ error: `No existe el grupo '${grupoMateriaData.sigla}' para la materia '${materia.sigla}'` });
                }

                nuevosDetalles.push({
                    boletaInscripcionId: boletaInscripcion.id,
                    grupoMateriaId: grupoMateria.id
                });
            }

            // Creación masiva de los detalles de inscripción
            await Detalle_Inscripcion.bulkCreate(nuevosDetalles, { transaction });
        }

        // 5. Recargar la boleta con todas sus relaciones para la respuesta
        const boletaCreada = await Boleta_Inscripcion.findOne({
            where: { id: boletaInscripcion.id },
            include: [
                { model: Estudiante },
                { model: Periodo, include: [{ model: Gestion }] },
                {
                    model: Detalle_Inscripcion,
                    include: [{
                        model: Grupo_Materia,
                        include: [{ model: Materia }]
                    }]
                }
            ],
            transaction
        });

        // 6. Commit de la transacción
        await transaction.commit();

        res.status(201).json({
            success: true,
            message: 'Boleta de inscripción y detalles creados correctamente',
            boleta: boletaCreada
        });

    } catch (error) {
        console.error(error);
        if (transaction) {
            await transaction.rollback();
        }
        res.status(400).json({ error: error.message });
    }
};

exports.getBoletasInscripcion = async (req, res) => {
	try {

		const page = parseInt(req.query.page) || 1;
		const pageSize = parseInt(req.query.pageSize) || 10;
		const offset = (page - 1) * pageSize;

		const boletas = await Boleta_Inscripcion.findAll(
			{
				include: [
					{
						model: Detalle_Inscripcion,
						attributes: {
							exclude: ['createdAt', 'updatedAt', 'id'],
						},
						include: [
							{
								model: Grupo_Materia,
								attributes: {
									exclude: ['createdAt', 'updatedAt', 'id', 'cupo', 'materiaId', 'docenteId', 'periodoId'],
								},
								include: [
									{
										model: Materia,
										attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
									},
								]
							},

						]

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
					}],
				attributes: { exclude: ['createdAt', 'updatedAt'] },
				order: [['id', 'ASC']],
				limit: pageSize,
				offset
			});
		res.json(boletas);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

exports.getBoletaInscripcionById = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		if (isNaN(id)) {
			return res.status(400).json({ error: 'ID inválido' });
		}
		const boleta = await Boleta_Inscripcion.findOne(
			{
				where: { id },
				include: [
					{
						model: Detalle_Inscripcion,
						attributes: {
							exclude: ['createdAt', 'updatedAt', 'id'],
						},
						include: [
							{
								model: Grupo_Materia,
								attributes: {
									exclude: ['createdAt', 'updatedAt', 'id', 'cupo', 'materiaId', 'docenteId', 'periodoId'],
								},
								include: [
									{
										model: Materia,
										attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
									},
								]
							},

						]

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
					}],
			});
		if (!boleta) return res.status(404).json({ error: 'No encontrado' });
		res.json(boleta);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateBoletaInscripcion = async (req, res) => {
	let transaction;
	try {
		const boletaId = req.params.id;

		if (!boletaId) {
			return res.status(400).json({ error: 'El ID de la boleta de inscripción es requerido' });
		}

		transaction = await sequelize.transaction();

		// 1. Buscar la boleta de inscripción
		const boletaInscripcion = await Boleta_Inscripcion.findByPk(boletaId, { transaction });

		if (!boletaInscripcion) {
			await transaction.rollback();
			return res.status(404).json({ error: 'Boleta de inscripción no encontrada' });
		}

		const { Detalle_Inscripcions: detallesInscripcionData } = req.body;

		// 2. Desasociar los registros antiguos
		// Esta es la parte que pone el campo boletaInscripcionId a NULL
		await Detalle_Inscripcion.update(
			{ boletaInscripcionId: null },
			{
				where: { boletaInscripcionId: boletaId },
				transaction
			}
		);

		// 3. Crear las nuevas relaciones
		if (Array.isArray(detallesInscripcionData) && detallesInscripcionData.length > 0) {
			const nuevosDetalles = [];

			for (const detalle of detallesInscripcionData) {
				const { Grupo_Materium: grupoMateriaData } = detalle;

				if (!grupoMateriaData || !grupoMateriaData.sigla || !grupoMateriaData.Materium || !grupoMateriaData.Materium.sigla) {
					await transaction.rollback();
					return res.status(400).json({
						error: 'Cada detalle de inscripción debe contener la sigla del grupo y la sigla de la materia'
					});
				}

				// A. Buscar la materia por su sigla
				const materia = await Materia.findOne({
					where: { sigla: grupoMateriaData.Materium.sigla },
					transaction
				});

				if (!materia) {
					await transaction.rollback();
					return res.status(400).json({
						error: `No existe una materia con la sigla: ${grupoMateriaData.Materium.sigla}`
					});
				}

				// B. Buscar el grupo de materia por su sigla y el ID de la materia
				const grupoMateria = await Grupo_Materia.findOne({
					where: {
						sigla: grupoMateriaData.sigla,
						materiaId: materia.id
					},
					transaction
				});

				if (!grupoMateria) {
					await transaction.rollback();
					return res.status(400).json({
						error: `No existe un grupo con sigla '${grupoMateriaData.sigla}' para la materia '${materia.sigla}'`
					});
				}

				// C. Preparar el nuevo detalle para la inserción
				nuevosDetalles.push({
					boletaInscripcionId: boletaId,
					grupoMateriaId: grupoMateria.id
				});
			}

			// Crear los nuevos detalles de inscripción
			await Detalle_Inscripcion.bulkCreate(nuevosDetalles, { transaction });
		}

		// 4. Recargar la boleta con sus relaciones actualizadas
		const boletaActualizada = await Boleta_Inscripcion.findOne({
			where: { id: boletaId },
			include: [
				{
					model: Detalle_Inscripcion,
					attributes: {
						exclude: ['createdAt', 'updatedAt', 'id', 'boletaInscripcionId'],
					},
					include: [
						{
							model: Grupo_Materia,
							attributes: {
								exclude: ['createdAt', 'updatedAt', 'id', 'cupo', 'materiaId', 'docenteId', 'periodoId'],
							},
							include: [
								{
									model: Materia,
									attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
								},
							]
						},

					]

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
					model: Estudiante,
					attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'carreraId'] }
				}],
			attributes: { exclude: ['createdAt', 'updatedAt', 'estudianteId'] },
			transaction
		});

		await transaction.commit();

		res.json({
			success: true,
			message: 'Inscripción actualizada correctamente',
			boleta: boletaActualizada
		});

	} catch (error) {
		console.error(error);
		if (transaction) {
			await transaction.rollback();
		}
		res.status(400).json({ error: error.message });
	}
};

exports.deleteBoletaInscripcion = async (req, res) => {
	try {
		const deleted = await Boleta_Inscripcion.destroy({ where: { id: req.params.id } });
		if (!deleted) return res.status(404).json({ error: 'No encontrado' });
		res.json({ mensaje: 'Boleta de inscripción eliminada' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
