const { sequelize, Plan_de_estudio, Materia, Detalle_materia, Carrera } = require('../models');
const RedisHelper = require('../helpers/redisHelper'); // tu helper de Redis

// Crear plan de estudio
exports.createPlanDeEstudio = async (req, res) => {
    let transaction;
    try {
        const { carrera: carreraData, Detalle_materia: detallesData, ...planData } = req.body;

        // Validar duplicados en DB
        const existePlan = await Plan_de_estudio.findOne({ where: { codigo: planData.codigo } });
        if (existePlan) return res.status(400).json({ error: `Ya existe un plan con código ${planData.codigo}` });

        // Buscar carrera
        const carrera = await Carrera.findOne({ where: { sigla: carreraData?.sigla } });
        if (!carrera) return res.status(400).json({ error: `No existe carrera con sigla ${carreraData?.sigla}` });

        planData.carreraId = carrera.id;

        // Transacción
        transaction = await sequelize.transaction();

        // Crear plan de estudio
        const planDeEstudio = await Plan_de_estudio.create(planData, { transaction });

        // Crear detalles de materia
        if (Array.isArray(detallesData) && detallesData.length) {
            const detallesConPlanId = [];
            for (const detalle of detallesData) {
                if (!detalle.Materium?.sigla) {
                    await transaction.rollback();
                    return res.status(400).json({ error: 'Cada materia debe tener una sigla' });
                }

                // Buscar o crear materia
                let materia = await Materia.findOne({ where: { sigla: detalle.Materium.sigla }, transaction });
                if (!materia) {
                    materia = await Materia.create(detalle.Materium, { transaction });
                }

                detallesConPlanId.push({
                    creditos: detalle.creditos,
                    planDeEstudioId: planDeEstudio.id,
                    materiaId: materia.id
                });
            }
            await Detalle_materia.bulkCreate(detallesConPlanId, { transaction });
        }

        const planCreado = await Plan_de_estudio.findOne({
            where: { id: planDeEstudio.id },
            include: [
                { model: Carrera, attributes: { exclude: ['createdAt','updatedAt','id','facultadId'] } },
                { model: Detalle_materia, include: [{ model: Materia, attributes: { exclude: ['createdAt','updatedAt','id'] } }] }
            ],
            attributes: { exclude: ['createdAt','updatedAt','id','carreraId','materiaId'] },
            transaction
        });

        await transaction.commit();

        // Guardar en Redis (opcional)
        await RedisHelper.set(`plan:${planCreado.codigo}`, JSON.stringify(planCreado));

        res.status(201).json({ success: true, message: 'Plan creado correctamente', planDeEstudio: planCreado });

    } catch (error) {
        if (transaction) await transaction.rollback();
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los planes de estudio
exports.getPlanesDeEstudio = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize) || 10));

        const { count, rows: planes } = await Plan_de_estudio.findAndCountAll({
            include: [
                { model: Carrera, attributes: { exclude: ['createdAt','updatedAt','id','facultadId'] } },
                { model: Detalle_materia, include: [{ model: Materia, attributes: { exclude: ['createdAt','updatedAt','id'] } }] }
            ],
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [['nombre','DESC']]
        });

        res.json({
            success: true,
            planes,
            pagination: { total: count, page, pageSize, totalPages: Math.ceil(count/pageSize) }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener plan por código
exports.getPlanDeEstudioByCodigo = async (req, res) => {
    try {
        const codigo = req.params.codigo;

        // Verificar Redis primero
        const cache = await RedisHelper.get(`plan:${codigo}`);
        if (cache) return res.json(JSON.parse(cache));

        const plan = await Plan_de_estudio.findOne({
            where: { codigo },
            include: [
                { model: Carrera, attributes: { exclude: ['createdAt','updatedAt','id','facultadId'] } },
                { model: Detalle_materia, include: [{ model: Materia, attributes: { exclude: ['createdAt','updatedAt','id'] } }] }
            ],
            attributes: { exclude: ['createdAt','updatedAt','id','carreraId','materiaId'] }
        });

        if (!plan) return res.status(404).json({ error: 'No encontrado' });

        // Guardar en Redis
        await RedisHelper.set(`plan:${codigo}`, JSON.stringify(plan));

        res.json(plan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar plan de estudio
exports.updatePlanDeEstudio = async (req, res) => {
    let transaction;
    try {
        const codigo = req.params.codigo;
        if (!codigo) return res.status(400).json({ error: 'Código requerido' });

        transaction = await sequelize.transaction();

        const planDeEstudio = await Plan_de_estudio.findOne({
            where: { codigo },
            include: [{ model: Carrera }, { model: Detalle_materia }],
            transaction
        });

        if (!planDeEstudio) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Plan no encontrado' });
        }

        const { Carrera: carreraData, Detalle_materia: detallesData, ...planData } = req.body;

        // Actualizar carrera si viene
        if (carreraData?.sigla) {
            const carrera = await Carrera.findOne({ where: { sigla: carreraData.sigla }, transaction });
            if (!carrera) {
                await transaction.rollback();
                return res.status(400).json({ error: `No existe carrera con sigla ${carreraData.sigla}` });
            }
            planData.carreraId = carrera.id;
        }

        // Actualizar datos principales
        await planDeEstudio.update(planData, { transaction });

        // Reemplazar detalles de materia
        if (Array.isArray(detallesData)) {
            await Detalle_materia.destroy({ where: { planDeEstudioId: planDeEstudio.id }, transaction });

            const siglasMaterias = detallesData.map(d => d.Materium.sigla);
            const materiasExistentes = await Materia.findAll({ where: { sigla: siglasMaterias }, transaction });

            if (materiasExistentes.length !== siglasMaterias.length) {
                const faltantes = siglasMaterias.filter(s => !materiasExistentes.map(m=>m.sigla).includes(s));
                await transaction.rollback();
                return res.status(400).json({ error: `No existen materias con siglas: ${faltantes.join(', ')}` });
            }

            const nuevosDetalles = detallesData.map(detalle => ({
                creditos: detalle.creditos,
                planDeEstudioId: planDeEstudio.id,
                materiaId: materiasExistentes.find(m=>m.sigla===detalle.Materium.sigla).id
            }));

            await Detalle_materia.bulkCreate(nuevosDetalles, { transaction });
        }

        const planActualizado = await Plan_de_estudio.findOne({
            where: { id: planDeEstudio.id },
            include: [
                { model: Carrera },
                { model: Detalle_materia, include: [{ model: Materia }] }
            ],
            transaction
        });

        await transaction.commit();

        // Actualizar Redis
        await RedisHelper.set(`plan:${codigo}`, JSON.stringify(planActualizado));

        res.json({ success: true, message: 'Plan actualizado correctamente', planDeEstudio: planActualizado });

    } catch (error) {
        if (transaction) await transaction.rollback();
        res.status(400).json({ error: error.message });
    }
};

// Eliminar plan de estudio
exports.deletePlanDeEstudio = async (req, res) => {
    try {
        const codigo = req.params.codigo;
        if (!codigo) return res.status(400).json({ error: 'Código requerido' });

        const deleted = await Plan_de_estudio.destroy({ where: { codigo } });
        if (!deleted) return res.status(404).json({ error: 'No encontrado' });

        // Eliminar de Redis
        await RedisHelper.del(`plan:${codigo}`);

        res.json({ mensaje: 'Plan eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
