const express = require('express');
const router = express.Router();
const boletaInscripcionController = require('../controllers/boletaInscripcionController');
/**
 * @swagger
 * tags:
 *   name: BoletaInscripcion
 *   description: Endpoints para gestionar boletas de inscripción
 */

/**
 * @swagger
 * /boleta_inscripcion:
 *   get:
 *     summary: Obtener todas las boletas de inscripción
 *     tags: [BoletaInscripcion]
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
 *         description: Lista de boletas de inscripción
 */
router.get('/', boletaInscripcionController.getBoletasInscripcion);

/**
 * @swagger
 * /boleta_inscripcion/{id}:
 *   get:
 *     summary: Obtener boleta de inscripción por ID
 *     tags: [BoletaInscripcion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Boleta de inscripción encontrada
 *       404:
 *         description: No encontrado
 */
router.get('/:id', boletaInscripcionController.getBoletaInscripcionById);

/**
 * @swagger
 * /boleta_inscripcion:
 *   post:
 *     summary: Crear una nueva boleta de inscripción
 *     tags: [BoletaInscripcion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Detalle_Inscripcions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     Grupo_Materium:
 *                       type: object
 *                       properties:
 *                         sigla:
 *                           type: string
 *                         Materium:
 *                           type: object
 *                           properties:
 *                             sigla:
 *                               type: string
 *                       required:
 *                         - sigla
 *                         - Materium
 *                 minItems: 1
 *               Periodo:
 *                 type: object
 *                 properties:
 *                   numero:
 *                     type: integer
 *                   Gestion:
 *                     type: object
 *                     properties:
 *                       año:
 *                         type: integer
 *                 required:
 *                   - numero
 *                   - Gestion
 *               Estudiante:
 *                 type: object
 *                 properties:
 *                   registro:
 *                     type: integer
 *                 required:
 *                   - registro
 *             required:
 *               - Detalle_Inscripcions
 *               - Periodo
 *               - Estudiante
 *           example:
 *             Detalle_Inscripcions:
 *               - Grupo_Materium:
 *                   sigla: "Grupo A"
 *                   Materium:
 *                     sigla: "INF-101"
 *               - Grupo_Materium:
 *                   sigla: "Grupo A"
 *                   Materium:
 *                     sigla: "INF-101"
 *             Periodo:
 *               numero: 1
 *               Gestion:
 *                 año: 2025
 *             Estudiante:
 *               registro: 1
 *     responses:
 *       201:
 *         description: Boleta de inscripción creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 456
 *                 Estudiante:
 *                   type: object
 *                   properties:
 *                     registro:
 *                       type: integer
 *                       example: 1
 *                 Periodo:
 *                   type: object
 *                   properties:
 *                     numero:
 *                       type: integer
 *                       example: 1
 *                     Gestion:
 *                       type: object
 *                       properties:
 *                         año:
 *                           type: integer
 *                           example: 2025
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Estudiante, grupo o materia no encontrados
 */
router.post('/', boletaInscripcionController.createBoletaInscripcion);

/**
 * @swagger
 * /boleta_inscripcion/{id}:
 *   put:
 *     summary: Actualizar los detalles de inscripción de una boleta por ID
 *     tags: [BoletaInscripcion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 456
 *         description: ID único de la boleta de inscripción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Detalle_Inscripcions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     Grupo_Materium:
 *                       type: object
 *                       properties:
 *                         sigla:
 *                           type: string
 *                         Materium:
 *                           type: object
 *                           properties:
 *                             sigla:
 *                               type: string
 *                       required:
 *                         - sigla
 *                         - Materium
 *                 minItems: 1
 *                 description: Lista de inscripciones a actualizar
 *             required:
 *               - Detalle_Inscripcions
 *           example:
 *             Detalle_Inscripcions:
 *               - Grupo_Materium:
 *                   sigla: "Grupo A"
 *                   Materium:
 *                     sigla: "INF-101"
 *               - Grupo_Materium:
 *                   sigla: "Grupo B"
 *                   Materium:
 *                     sigla: "MAT-101"
 *     responses:
 *       200:
 *         description: Detalles de inscripción actualizados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 456
 *                 Detalle_Inscripcions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Grupo_Materium:
 *                         type: object
 *                         properties:
 *                           sigla:
 *                             type: string
 *                           Materium:
 *                             type: object
 *                             properties:
 *                               sigla:
 *                                 type: string
 *       404:
 *         description: Boleta de inscripción no encontrada
 *       400:
 *         description: Error en los datos enviados o grupos/materias inválidos
 */
router.put('/:id', boletaInscripcionController.updateBoletaInscripcion);

/**
 * @swagger
 * /boleta_inscripcion/{id}:
 *   delete:
 *     summary: Eliminar boleta de inscripción
 *     tags: [BoletaInscripcion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Boleta de inscripción eliminada
 *       404:
 *         description: No encontrado
 */
router.delete('/:id', boletaInscripcionController.deleteBoletaInscripcion);

module.exports = router;
