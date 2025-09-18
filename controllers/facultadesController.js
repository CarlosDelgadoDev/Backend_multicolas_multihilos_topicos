// Controlador CRUD para Facultad
const { sequelize, Facultad, Carrera } = require('../models');
const { saveUnique, deleteUnique } = require('../helpers/redisHelper'); // <- Redis helper

// Crear facultad
exports.createFacultad = async (req, res) => {
    let transaction;
    try {
        const { Carreras: carrerasData, ...facultadData } = req.body;

        // ✅ Validación de duplicados usando Redis
        const resultUnique = await saveUnique('facultades', facultadData.sigla, facultadData);
        if (!resultUnique.success) {
            return res.status(400).json({ error: 'Facultad ya existe' });
        }

        // Iniciar transacción
        transaction = await sequelize.transaction();

        // 1. Crear la facultad
        const facultad = await Facultad.create(facultadData, { transaction });

        // 2. Crear las carreras y asociarlas a la facultad
        if (Array.isArray(carrerasData) && carrerasData.length > 0) {
            const carrerasConFacultadId = carrerasData.map(carrera => ({
                ...carrera,
                facultadId: facultad.id
            }));
            await Carrera.bulkCreate(carrerasConFacultadId, { transaction });
        }

        // 3. Recargar la facultad con sus relaciones
        const facultadCreada = await Facultad.findOne({
            where: { id: facultad.id },
            include: [{ model: Carrera }],
            transaction
        });

        await transaction.commit();

        res.status(201).json({
            success: true,
            message: 'Facultad creada correctamente',
            facultad: facultadCreada
        });

    } catch (error) {
        if (transaction) await transaction.rollback();
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las facultades
exports.getFacultades = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize) || 10));
        const facultades = await Facultad.findAll({
            order: [['nombre', 'ASC']],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{
                model: Carrera,
                attributes: { exclude: ['createdAt', 'updatedAt', 'facultadId'] }
            }],
            limit: pageSize,
            offset: (page - 1) * pageSize
        });
        res.json(facultades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener facultad por sigla
exports.getFacultadBySigla = async (req, res) => {
    try {
        const sigla = req.params.sigla;
        if (!sigla) return res.status(400).json({ error: 'Sigla de la facultad es requerida' });

        const facultad = await Facultad.findOne({
            where: { sigla },
            include: [{ model: Carrera, attributes: { exclude: ['createdAt', 'updatedAt', 'facultadId', 'id'] } }],
            attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
        });

        if (!facultad) return res.status(404).json({ error: `Facultad con sigla ${sigla} no encontrada` });
        res.json(facultad);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar facultad
exports.updateFacultad = async (req, res) => {
    let transaction;
    try {
        const sigla = req.params.sigla;
        if (!sigla) return res.status(400).json({ error: 'Sigla de la facultad es requerida' });

        transaction = await sequelize.transaction();
        const facultad = await Facultad.findOne({ where: { sigla }, include: [{ model: Carrera }], transaction });

        if (!facultad) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Facultad no encontrada' });
        }

        const facultadId = facultad.id;
        const { Carreras: carrerasData, ...facultadData } = req.body;

        await facultad.update(facultadData, { transaction });

        if (Array.isArray(carrerasData)) {
            const siglas = carrerasData.filter(c => c.sigla).map(c => c.sigla);
            const carrerasExistentes = await Carrera.findAll({ where: { sigla: siglas }, transaction });

            if (carrerasExistentes.length !== siglas.length) {
                await transaction.rollback();
                const siglasExistentes = carrerasExistentes.map(c => c.sigla);
                const siglasFaltantes = siglas.filter(s => !siglasExistentes.includes(s));
                return res.status(400).json({ error: `No existen carreras con las siglas: ${siglasFaltantes.join(', ')}` });
            }

            await Carrera.update({ facultadId: null }, { where: { facultadId: facultad.id }, transaction });
            await Carrera.update({ facultadId: facultad.id }, { where: { sigla: siglas }, transaction });
        } else if (carrerasData !== undefined) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Carreras debe ser un array de las siglas de las carreras' });
        }

        const facultadActualizada = await Facultad.findOne({ where: { id: facultadId }, include: [{ model: Carrera }], transaction });
        await transaction.commit();

        res.json({ success: true, message: 'Facultad y sus relaciones actualizadas correctamente', facultad: facultadActualizada });

    } catch (error) {
        if (transaction) await transaction.rollback();
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

// Eliminar facultad
exports.deleteFacultad = async (req, res) => {
    try {
        const sigla = req.params.sigla;
        if (!sigla) return res.status(400).json({ error: 'Sigla de la facultad es requerida' });

        const facultad = await Facultad.findOne({ where: { sigla } });
        if (!facultad) return res.status(404).json({ error: `Facultad con sigla ${sigla} no encontrada` });

        await Facultad.destroy({ where: { sigla } });

        // 🔹 También eliminar de Redis
        await deleteUnique('facultades', sigla);

        res.json({ mensaje: 'Facultad eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
