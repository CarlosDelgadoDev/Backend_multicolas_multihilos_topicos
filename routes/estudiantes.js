const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');


/**
 * @swagger
 * tags:
 *   name: Estudiantes
 *   description: Endpoints para gestionar estudiantes
 */

/**
 * @swagger
 * /estudiantes:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     tags: [Estudiantes]
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
 *         description: Lista de estudiantes
 */
router.get('/', estudiantesController.getEstudiantes);

/**
 * @swagger
 * /estudiantes/{registro}:
 *   get:
 *     summary: Obtener estudiante por registro
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: registro
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiante encontrado
 *       404:
 *         description: No encontrado
 */
router.get('/:registro', estudiantesController.getEstudianteByRegistro);

/**
 * @swagger
 * /estudiantes:
 *   post:
 *     summary: Crear un nuevo estudiante con sus carreras cursadas
 *     tags: [Estudiantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Ana"
 *               apellidoPaterno:
 *                 type: string
 *                 example: "Pérez"
 *               apellidoMaterno:
 *                 type: string
 *                 example: "Soto"
 *               ci:
 *                 type: string
 *                 example: "87654321"
 *               fechaNacimiento:
 *                 type: string
 *                 format: date-time
 *                 example: "2001-05-15T00:00:00.000Z"
 *               nacionalidad:
 *                 type: string
 *                 example: "Boliviana"
 *               Detalle_carrera_cursadas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     codigo:
 *                       type: string
 *                   required:
 *                     - codigo
 *             required:
 *               - nombre
 *               - apellidoPaterno
 *               - ci
 *               - fechaNacimiento
 *           example:
 *             nombre: "Ana"
 *             apellidoPaterno: "Pérez"
 *             apellidoMaterno: "Soto"
 *             ci: "87654321"
 *             fechaNacimiento: "2001-05-15T00:00:00.000Z"
 *             nacionalidad: "Boliviana"
 *             Detalle_carrera_cursadas:
 *               - codigo: "TEL-2023"
 *     responses:
 *       201:
 *         description: Estudiante creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 123
 *                 nombre:
 *                   type: string
 *                   example: "Ana"
 *                 ci:
 *                   type: string
 *                   example: "87654321"
 *                 Detalle_carrera_cursadas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       codigo:
 *                         type: string
 *                         example: "TEL-2023"
 *       400:
 *         description: Error en los datos enviados
 *       409:
 *         description: El CI ya está registrado
 */
router.post('/', estudiantesController.createEstudiante);

/**
 * @swagger
 * /estudiantes/{registro}:
 *   put:
 *     summary: Actualizar un estudiante por su número de registro
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: registro
 *         required: true
 *         schema:
 *           type: string
 *           example: "212180525"
 *         description: Número de registro único del estudiante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Ana"
 *               apellidoPaterno:
 *                 type: string
 *                 example: "Pérez"
 *               apellidoMaterno:
 *                 type: string
 *                 example: "Soto"
 *               ci:
 *                 type: string
 *                 example: "87654321"
 *               fechaNacimiento:
 *                 type: string
 *                 format: date-time
 *                 example: "2001-05-15T00:00:00.000Z"
 *               nacionalidad:
 *                 type: string
 *                 example: "Boliviana"
 *               Detalle_carrera_cursadas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     codigo:
 *                       type: string
 *                   required:
 *                     - codigo
 *             required:
 *               - nombre
 *               - apellidoPaterno
 *               - ci
 *               - fechaNacimiento
 *           example:
 *             nombre: "Ana"
 *             apellidoPaterno: "Pérez"
 *             apellidoMaterno: "Soto"
 *             ci: "87654321"
 *             fechaNacimiento: "2001-05-15T00:00:00.000Z"
 *             nacionalidad: "Boliviana"
 *             Detalle_carrera_cursadas:
 *               - codigo: "TEL-2023"
 *     responses:
 *       200:
 *         description: Estudiante actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 registro:
 *                   type: string
 *                   example: "212180525"
 *                 nombre:
 *                   type: string
 *                   example: "Ana"
 *                 ci:
 *                   type: string
 *                   example: "87654321"
 *                 Detalle_carrera_cursadas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       codigo:
 *                         type: string
 *                         example: "TEL-2023"
 *       404:
 *         description: Estudiante no encontrado
 *       400:
 *         description: Error en los datos enviados
 */
router.put('/:registro', estudiantesController.updateEstudiante);

/**
 * @swagger
 * /estudiantes/{registro}:
 *   delete:
 *     summary: Eliminar estudiante
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: registro
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiante eliminado
 *       404:
 *         description: No encontrado
 */
router.delete('/:registro', estudiantesController.deleteEstudiante);

module.exports = router;
