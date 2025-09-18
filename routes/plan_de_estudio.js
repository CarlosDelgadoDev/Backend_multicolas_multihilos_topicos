const express = require('express');
const router = express.Router();
const planDeEstudioController = require('../controllers/planDeEstudioController');
/**
 * @swagger
 * tags:
 *   name: PlanDeEstudio
 *   description: Endpoints para gestionar planes de estudio
 */

/**
 * @swagger
 * /plan_de_estudio:
 *   get:
 *     summary: Obtener todos los planes de estudio
 *     tags: [PlanDeEstudio]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página (por defecto 1)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Número de elementos por página (por defecto 10)
 *     responses:
 *       200:
 *         description: Lista de planes de estudio
 */
router.get('/', planDeEstudioController.getPlanesDeEstudio);

/**
 * @swagger
 * /plan_de_estudio/{codigo}:
 *   get:
 *     summary: Obtener plan de estudio por código
 *     tags: [PlanDeEstudio]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Plan de estudio encontrado
 *       404:
 *         description: No encontrado
 */
router.get('/:codigo', planDeEstudioController.getPlanDeEstudioByCodigo);

/**
 * @swagger
 * /plan_de_estudio:
 *   post:
 *     summary: Crear un nuevo plan de estudio
 *     tags: [PlanDeEstudio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               tipoPeriodo:
 *                 type: string
 *               modalidad:
 *                 type: string
 *               codigo:
 *                 type: string
 *               Detalle_materia:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     creditos:
 *                       type: integer
 *                     Materium:
 *                       type: object
 *                       properties:
 *                         nombre:
 *                           type: string
 *                         horasDeEstudio:
 *                           type: integer
 *                         sigla:
 *                           type: string
 *                         nivel:
 *                           type: integer
 *               carrera:
 *                 type: object
 *                 properties:
 *                   sigla:
 *                     type: string
 *           example:
 *             nombre: "imgenieria en pelotudes"
 *             tipoPeriodo: "Semestral"
 *             modalidad: "Presencial"
 *             codigo: "IS-2029"
 *             Detalle_materia:
 *               - creditos: 5
 *                 Materium:
 *                   nombre: "Pelotudes 1"
 *                   horasDeEstudio: 60
 *                   sigla: "INF-101"
 *                   nivel: 1
 *               - creditos: 4
 *                 Materium:
 *                   nombre: "introduccion a boludeces"
 *                   horasDeEstudio: 50
 *                   sigla: "MAT-101"
 *                   nivel: 1
 *             carrera:
 *               sigla: "QUIM"
 *     responses:
 *       201:
 *         description: Plan de estudio creado
 */
router.post('/', planDeEstudioController.createPlanDeEstudio);

/**
 * @swagger
 * /plan_de_estudio/{codigo}:
 *   put:
 *     summary: Actualizar un plan de estudio por código
 *     tags: [PlanDeEstudio]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *           example: "IS-2029"
 *         description: Código único del plan de estudio a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               tipoPeriodo:
 *                 type: string
 *               modalidad:
 *                 type: string
 *               Detalle_materia:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     creditos:
 *                       type: integer
 *                     Materium:
 *                       type: object
 *                       properties:
 *                         sigla:
 *                           type: string
 *               carrera:
 *                 type: object
 *                 properties:
 *                   sigla:
 *                     type: string
 *           example:
 *             nombre: "imgenieria en pelotudes"
 *             tipoPeriodo: "Semestral"
 *             modalidad: "Presencial"
 *             Detalle_materia:
 *               - creditos: 5
 *                 Materium:
 *                   sigla: "INF-101"
 *               - creditos: 4
 *                 Materium:
 *                   sigla: "MAT-101"
 *             carrera:
 *               sigla: "QUIM"
 *     responses:
 *       200:
 *         description: Plan de estudio actualizado exitosamente
 *       404:
 *         description: Plan de estudio no encontrado
 *       400:
 *         description: Solicitud inválida
 */
router.put('/:codigo', planDeEstudioController.updatePlanDeEstudio);

/**
 * @swagger
 * /plan_de_estudio/{codigo}:
 *   delete:
 *     summary: Eliminar plan de estudio
 *     tags: [PlanDeEstudio]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Plan de estudio eliminado
 *       404:
 *         description: No encontrado
 */
router.delete('/:codigo', planDeEstudioController.deletePlanDeEstudio);


// router.post('/', planDeEstudioController.createPlanDeEstudio);
// router.get('/', planDeEstudioController.getPlanesDeEstudio);
// router.get('/:id', planDeEstudioController.getPlanDeEstudioById);
// router.put('/:id', planDeEstudioController.updatePlanDeEstudio);
// router.delete('/:id', planDeEstudioController.deletePlanDeEstudio);

module.exports = router;
