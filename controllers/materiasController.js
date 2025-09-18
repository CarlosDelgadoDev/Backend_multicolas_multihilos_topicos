// Controlador CRUD para Materiaes
const { saveUnique, update, deleteUnique } = require('../helpers/redisHelper');
const { sequelize, Materia, Pre_requisito } = require('../models');

// Crear materia
exports.createMateria = async (req, res) => {

	let transaction;
	try {
		const { Pre_requisitos: prerequisitosData, ...materiaData } = req.body;

		// Validar duplicados en Redis usando "sigla"
		const result = await saveUnique('materias', materiaData.sigla, materiaData);
		if (!result.success) {
			return res.status(409).json({ error: result.message });
		}

		// Iniciar transacción
		transaction = await sequelize.transaction();

		// 1. Crear la materia principal
		const materia = await Materia.create(materiaData, { transaction });

		// 2. Asociar los prerrequisitos si se proporcionan
		if (Array.isArray(prerequisitosData) && prerequisitosData.length > 0) {
			// Recopilar las siglas de los prerrequisitos
			const siglasPrerequisitos = prerequisitosData
				.filter(prerequisito => prerequisito.sigla)
				.map(prerequisito => prerequisito.sigla);

			// Validar que la materia no sea su propio prerrequisito
			if (siglasPrerequisitos.includes(materia.sigla)) {
				await transaction.rollback();
				return res.status(400).json({
					error: 'Una materia no puede ser su propio prerrequisito.'
				});
			}

			// Buscar las materias que actúan como prerrequisitos
			const materiasPrerequisitos = await Materia.findAll({
				where: { sigla: siglasPrerequisitos },
				transaction
			});

			// Verificar que todas las siglas enviadas existen
			if (materiasPrerequisitos.length !== siglasPrerequisitos.length) {
				const siglasExistentes = materiasPrerequisitos.map(m => m.sigla);
				const siglasFaltantes = siglasPrerequisitos.filter(s => !siglasExistentes.includes(s));
				await transaction.rollback();
				return res.status(400).json({
					error: `No existen las materias con las siglas: ${siglasFaltantes.join(', ')}`
				});
			}

			// Preparar los datos para la inserción masiva en la tabla de relaciones
			const relacionesPrerequisitos = materiasPrerequisitos.map(prerequisito => ({
				materiaId: materia.id,
				prerequisitoId: prerequisito.id
			}));

			await Pre_requisito.bulkCreate(relacionesPrerequisitos, { transaction });
		}

		// 3. Recargar la materia con sus relaciones
		const materiaCreada = await Materia.findOne({
			where: { id: materia.id },
			// 👈 Usar el alias `Prerequisitos` para la inclusión
			include: [
				{
					model: Pre_requisito,
					as: 'Prerequisitos',
					include: [
						{
							model: Materia, as: 'MateriaPrerequisito',
							attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
						}],
					attributes: { exclude: ['createdAt', 'updatedAt', "materiaId", "id"] }
				}],
			attributes: { exclude: ['createdAt', 'updatedAt', "id"] },
			transaction
		});
		// 4. Commit de la transacción
		await transaction.commit();

		res.status(201).json({
			success: true,
			message: 'Materia y sus prerrequisitos creados correctamente',
			materia: materiaCreada
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

// Obtener todas las materias
exports.getMaterias = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const pageSize = parseInt(req.query.pageSize) || 10;
		const offset = (page - 1) * pageSize;

		const materias = await Materia.findAll(
			{
				include: [
					{
						model: Pre_requisito,
						as: 'Prerequisitos',
						include: [
							{
								model: Materia, as: 'MateriaPrerequisito',
								attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
							}],
						attributes: { exclude: ['createdAt', 'updatedAt', "materiaId", "id"] }
					}],
				attributes: { exclude: ['createdAt', 'updatedAt', "id"] },
				order: [['nombre', 'ASC']],
				limit: pageSize,
				offset
			});

		res.json(materias);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getMateriaBySigla = async (req, res) => {
	try {
		const sigla = req.params.sigla;
		const materia = await Materia.findOne(
			{
				where: { sigla },
				include: [
					{
						model: Pre_requisito,
						as: 'Prerequisitos',
						include: [
							{
								model: Materia, as: 'MateriaPrerequisito',
								attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
							}],
						attributes: { exclude: ['createdAt', 'updatedAt', "materiaId", "id"] }
					}],
				attributes: { exclude: ['createdAt', 'updatedAt', "id"] },
			}
		);
		if (!materia) return res.status(404).json({ error: 'No encontrado' });
		res.json({
			materia
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Actualizar materia
exports.updateMateria = async (req, res) => {
	let transaction;
	try {
		const sigla = req.params.sigla;

		if (!sigla) {
			return res.status(400).json({ error: 'La sigla de la materia es requerida' });
		}

		// Iniciar transacción
		transaction = await sequelize.transaction();

		// 1. Buscar la materia por su sigla
		const materia = await Materia.findOne({
			where: { sigla },
			transaction
		});

		if (!materia) {
			await transaction.rollback();
			return res.status(404).json({ error: 'Materia no encontrada' });
		}
		const materiaId = materia.id;

		// 2. Separar datos de la materia de sus relaciones
		const { Pre_requisitos: prerequisitosData, ...materiaData } = req.body;

		// 3. Actualizar los datos principales de la materia
		await materia.update(materiaData, { transaction });

		// 4. Reemplazar las relaciones de los prerrequisitos
		if (Array.isArray(prerequisitosData)) {
			// Recopilar las siglas de los nuevos prerrequisitos
			const siglasPrerequisitos = prerequisitosData
				.filter(prerequisito => prerequisito.sigla)
				.map(prerequisito => prerequisito.sigla);

			// Validar que la materia no sea su propio prerrequisito
			if (siglasPrerequisitos.includes(materia.sigla)) {
				await transaction.rollback();
				return res.status(400).json({
					error: 'Una materia no puede ser su propio prerrequisito.'
				});
			}

			// Buscar las materias que actúan como prerrequisitos
			const materiasPrerequisitos = await Materia.findAll({
				where: { sigla: siglasPrerequisitos },
				transaction
			});

			if (materiasPrerequisitos.length !== siglasPrerequisitos.length) {
				const siglasExistentes = materiasPrerequisitos.map(m => m.sigla);
				const siglasFaltantes = siglasPrerequisitos.filter(s => !siglasExistentes.includes(s));
				await transaction.rollback();
				return res.status(400).json({
					error: `No existen las materias con las siglas: ${siglasFaltantes.join(', ')}`
				});
			}

			// --- LÓGICA DE ACTUALIZACIÓN CORREGIDA ---
			// A. Primero, eliminar todas las relaciones existentes para esta materia
			await Pre_requisito.destroy({
				where: { materiaId },
				transaction
			});

			// B. Luego, crear las nuevas relaciones
			const relacionesPrerequisitos = materiasPrerequisitos.map(prerequisito => ({
				materiaId: materiaId,
				prerequisitoId: prerequisito.id
			}));

			await Pre_requisito.bulkCreate(relacionesPrerequisitos, { transaction });
			// --- FIN DE LA LÓGICA CORREGIDA ---

		} else if (prerequisitosData !== undefined) {
			await transaction.rollback();
			return res.status(400).json({
				error: 'Pre_requisitos debe ser un array'
			});
		}

		// 5. Recargar la materia con sus relaciones actualizadas
		const materiaActualizada = await Materia.findOne({
			where: { id: materiaId },
			include: [{ model: Pre_requisito, as: 'Prerequisitos', include: [{ model: Materia, as: 'MateriaPrerequisito' }] }],
			transaction
		});

		// 6. Commit de la transacción
		await transaction.commit();

		res.json({
			success: true,
			message: 'Materia y sus prerrequisitos actualizados correctamente',
			materia: materiaActualizada
		});

	} catch (error) {
		console.error(error);
		if (transaction) {
			await transaction.rollback();
		}
		res.status(400).json({ error: error.message });
	}

};

// Eliminar materia
exports.deleteMateria = async (req, res) => {
	try {
		const sigla = req.params.sigla;

		if (!sigla) {
			return res.status(400).json({ error: 'La sigla de la materia es requerida' });
		}

		const materia = await Materia.findOne({ where: { sigla } });
		if (!materia) return res.status(404).json({ error: 'No encontrado' });

		// Borrar también de Redis
		await deleteUnique('materias', sigla);

		// Borrar de la base de datos

		const deleted = await Materia.destroy({ where: { sigla } });
		if (!deleted) return res.status(404).json({ error: 'No encontrado' });
		res.json({ mensaje: 'Materia eliminada' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
