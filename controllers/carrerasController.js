// Controlador CRUD para Carreras con RedisHelper
const { sequelize, Carrera, Facultad, Plan_de_estudio } = require('../models');
const { redisHelper } = require('../helpers/redisHelper');

// Crear carrera
exports.createCarrera = async (req, res) => {
	let transaction;
	try {
		const { Facultad: facultadData, Plan_de_estudios: planesData, ...carreraData } = req.body;

		if (!facultadData || !facultadData.sigla) {
			return res.status(400).json({ error: 'Debe proporcionar la sigla de la facultad' });
		}

		// Buscar facultad
		const facultad = await Facultad.findOne({ where: { sigla: facultadData.sigla } });
		if (!facultad) return res.status(400).json({ error: `No existe facultad con sigla ${facultadData.sigla}` });

		// Validación de duplicado en Redis
		const redisKey = `carreras:${facultad.id}:${carreraData.sigla}`;
		const exists = await redisHelper.exists(redisKey);
		if (exists) return res.status(400).json({ error: 'Carrera ya existe' });

		transaction = await sequelize.transaction();
		carreraData.facultadId = facultad.id;
		const carrera = await Carrera.create(carreraData, { transaction });

		if (Array.isArray(planesData) && planesData.length > 0) {
			const planesConCarreraId = planesData.map(plan => ({ ...plan, carreraId: carrera.id }));
			await Plan_de_estudio.bulkCreate(planesConCarreraId, { transaction });
		}

		await transaction.commit();

		// Guardar en Redis
		await redisHelper.set(redisKey, JSON.stringify(carreraData));

		res.status(201).json({ success: true, message: 'Carrera creada correctamente', carrera });
	} catch (error) {
		if (transaction) await transaction.rollback();
		res.status(400).json({ error: error.message });
	}
};

// Obtener todas las carreras
exports.getCarreras = async (req, res) => {
	try {
		const page = Math.max(1, parseInt(req.query.page) || 1);
		const pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize) || 10));

		const { count, rows: carreras } = await Carrera.findAndCountAll({
			include: [ { model: Facultad }, { model: Plan_de_estudio } ],
			limit: pageSize,
			offset: (page - 1) * pageSize,
			order: [['createdAt', 'DESC']]
		});

		const totalPages = Math.ceil(count / pageSize);

		res.json({ success: true, carreras, pagination: { total: count, page, pageSize, totalPages } });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Obtener carrera por sigla
exports.getCarreraBySigla = async (req, res) => {
	try {
		const sigla = req.params.sigla;
		const carrera = await Carrera.findOne({
			where: { sigla },
			include: [ { model: Facultad }, { model: Plan_de_estudio } ],
		});

		if (!carrera) return res.status(404).json({ error: 'No encontrado' });
		res.json({ success: true, carrera });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Actualizar carrera
exports.updateCarrera = async (req, res) => {
	let transaction;
	try {
		const sigla = req.params.sigla;
		if (!sigla) return res.status(400).json({ error: 'Sigla es requerida' });

		transaction = await sequelize.transaction();

		const carrera = await Carrera.findOne({
			where: { sigla },
			include: [ { model: Facultad }, { model: Plan_de_estudio } ],
			transaction
		});

		if (!carrera) {
			await transaction.rollback();
			return res.status(404).json({ error: 'Carrera no encontrada' });
		}

		const carreraId = carrera.id;
		const { Facultad: facultadData, Plan_de_estudios: planesData, ...carreraData } = req.body;

		// Validar facultad si se proporciona
		if (facultadData && facultadData.sigla) {
			const facultad = await Facultad.findOne({ where: { sigla: facultadData.sigla }, transaction });
			if (!facultad) {
				await transaction.rollback();
				return res.status(400).json({ error: `No existe facultad con sigla ${facultadData.sigla}` });
			}
			carreraData.facultadId = facultad.id;
		}

		// Validación duplicados en Redis
		const redisKey = `carreras:${carreraData.facultadId || carrera.facultadId}:${carreraData.sigla || carrera.sigla}`;
		const exists = await redisHelper.exists(redisKey);
		if (exists && (carreraData.sigla || carreraData.facultadId) !== (carrera.sigla || carrera.facultadId)) {
			await transaction.rollback();
			return res.status(400).json({ error: 'Carrera con esa sigla en la facultad ya existe' });
		}

		// Actualizar datos principales
		await carrera.update(carreraData, { transaction });

		// Actualizar planes de estudio
		if (Array.isArray(planesData)) {
			await Plan_de_estudio.update({ carreraId: null }, { where: { carreraId: carrera.id }, transaction });
			const codigos = planesData.filter(p => p.codigo).map(p => p.codigo);
			const planesExistentes = await Plan_de_estudio.findAll({ where: { codigo: codigos }, transaction });
			if (planesExistentes.length !== codigos.length) {
				const codigosExistentes = planesExistentes.map(p => p.codigo);
				const codigosFaltantes = codigos.filter(c => !codigosExistentes.includes(c));
				await transaction.rollback();
				return res.status(400).json({ error: `No existen planes de estudio con códigos: ${codigosFaltantes.join(', ')}` });
			}
			await Plan_de_estudio.update({ carreraId: carrera.id }, { where: { codigo: codigos }, transaction });
		}

		const carreraActualizada = await Carrera.findOne({
			where: { id: carreraId },
			include: [ { model: Facultad }, { model: Plan_de_estudio } ],
			transaction
		});

		await transaction.commit();

		// Actualizar Redis
		await redisHelper.set(redisKey, JSON.stringify(carreraData));

		res.json({ success: true, message: 'Carrera y sus relaciones actualizadas correctamente', carrera: carreraActualizada });

	} catch (error) {
		if (transaction) await transaction.rollback();
		res.status(400).json({ error: error.message });
	}
};

// Eliminar carrera
exports.deleteCarrera = async (req, res) => {
	try {
		const carrera = await Carrera.findByPk(req.params.id);
		if (!carrera) return res.status(404).json({ error: 'No encontrado' });

		await Carrera.destroy({ where: { id: carrera.id } });

		// Eliminar de Redis
		const redisKey = `carreras:${carrera.facultadId}:${carrera.sigla}`;
		await redisHelper.del(redisKey);

		res.json({ mensaje: 'Carrera eliminada' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
