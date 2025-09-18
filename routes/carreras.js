const express = require('express');
const router = express.Router();
const carrerasController = require('../controllers/carrerasController');


/**
 * @swagger
 * tags:
 *   name: Carreras
 *   description: Endpoints para gestionar carreras
 */

/**
 * @swagger
 * /carreras:
 *   get:
 *     summary: Obtener todas las carreras con paginación
 *     tags: [Carreras]
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
 *         description: Lista de carreras obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 carreras:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 6
 *                       nombre:
 *                         type: string
 *                         example: "Salud Humanaa"
 *                       descripcion:
 *                         type: string
 *                         example: "carrera de salud humana"
 *                       sigla:
 *                         type: string
 *                         example: "SH"
 *                       facultadId:
 *                         type: integer
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-09-11T17:26:12.261Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-09-11T19:06:47.806Z"
 *                       Facultad:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           nombre:
 *                             type: string
 *                             example: "Facultad de Ingeniería en Ciencias de la Computación y Telecomunicaciones"
 *                           descripcion:
 *                             type: string
 *                             example: "Forma ingenieros en computación y telecomunicaciones con enfoque tecnológico y de innovación."
 *                           sigla:
 *                             type: string
 *                             example: "FICCT"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-09-11T17:08:02.705Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-09-11T17:08:02.705Z"
 *                       Plan_de_estudios:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 5
 *                             nombre:
 *                               type: string
 *                               example: "Plan 2024 - Administración de Empresas"
 *                             tipoPeriodo:
 *                               type: string
 *                               example: "Semestral"
 *                             modalidad:
 *                               type: string
 *                               example: "Virtual"
 *                             codigo:
 *                               type: string
 *                               example: "ADE-2024"
 *                             carreraId:
 *                               type: integer
 *                               example: 6
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                               example: "2025-09-11T17:08:02.727Z"
 *                             updatedAt:
 *                               type: string
 *                               format: date-time
 *                               example: "2025-09-11T19:11:31.455Z"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 1
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 1
 *             example:
 *               success: true
 *               carreras:
 *                 - id: 6
 *                   nombre: "Salud Humanaa"
 *                   descripcion: "carrera de salud humana"
 *                   sigla: "SH"
 *                   facultadId: 1
 *                   createdAt: "2025-09-11T17:26:12.261Z"
 *                   updatedAt: "2025-09-11T19:06:47.806Z"
 *                   Facultad:
 *                     id: 1
 *                     nombre: "Facultad de Ingeniería en Ciencias de la Computación y Telecomunicaciones"
 *                     descripcion: "Forma ingenieros en computación y telecomunicaciones con enfoque tecnológico y de innovación."
 *                     sigla: "FICCT"
 *                     createdAt: "2025-09-11T17:08:02.705Z"
 *                     updatedAt: "2025-09-11T17:08:02.705Z"
 *                   Plan_de_estudios:
 *                     - id: 5
 *                       nombre: "Plan 2024 - Administración de Empresas"
 *                       tipoPeriodo: "Semestral"
 *                       modalidad: "Virtual"
 *                       codigo: "ADE-2024"
 *                       carreraId: 6
 *                       createdAt: "2025-09-11T17:08:02.727Z"
 *                       updatedAt: "2025-09-11T19:11:31.455Z"
 *                     - id: 6
 *                       nombre: "Plan 2024 - Diseño Gráfico"
 *                       tipoPeriodo: "Semestral"
 *                       modalidad: "Semipresencial"
 *                       codigo: "DG-2024"
 *                       carreraId: 6
 *                       createdAt: "2025-09-11T17:08:02.727Z"
 *                       updatedAt: "2025-09-11T19:11:31.455Z"
 *               pagination:
 *                 total: 1
 *                 page: 1
 *                 pageSize: 10
 *                 totalPages: 1
 *       400:
 *         description: Parámetros inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', carrerasController.getCarreras);

/**
 * @swagger
 * /carreras/{sigla}:
 *   get:
 *     summary: Obtener carrera por ID
 *     tags: [Carreras]
 *     parameters:
 *       - in: path
 *         name: sigla
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrera encontrada
 *       404:
 *         description: No encontrado
 */
router.get('/:sigla', carrerasController.getCarreraBySigla);

/**
 * @swagger
 * /carreras:
 *   post:
 *     summary: Crear una nueva carrera
 *     tags: [Carreras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               sigla:
 *                 type: string
 *               facultadId:
 *                 type: integer
 *           example:
 *             nombre: "Salud Humanaa"
 *             descripcion: "carrera de salud humana"
 *             sigla: "SH"
 *             Facultad:
 *               sigla: "FICCT"
 *             Plan_de_estudios:
 *               - nombre: "Plan 2024 - Administración de Empresas"
 *                 tipoPeriodo: "Semestral"
 *                 modalidad: "Virtual"
 *                 codigo: "ADE-2024"
 *               - nombre: "Plan 2024 - Diseño Gráfico"
 *                 tipoPeriodo: "Semestral"
 *                 modalidad: "Semipresencial"
 *                 codigo: "DG-2024"
 *     responses:
 *       201:
 *         description: Carrera creada
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', carrerasController.createCarrera);

/**
 * @swagger
 * /carreras/{sigla}:
 *   put:
 *     summary: Actualizar carrera
 *     tags: [Carreras]
 *     parameters:
 *       - in: path
 *         name: sigla
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - sigla
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Salud Humanaa"
 *               descripcion:
 *                 type: string
 *                 example: "carrera de salud humana"
 *               sigla:
 *                 type: string
 *                 example: "SH"
 *               Facultad:
 *                 type: object
 *                 required:
 *                   - sigla
 *                 properties:
 *                   sigla:
 *                     type: string
 *                     example: "FICCT"
 *               Plan_de_estudios:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - codigo
 *                   properties:
 *                     codigo:
 *                       type: string
 *                       example: "DG-2024"
 *           example:
 *             nombre: "Salud Humanaa"
 *             descripcion: "carrera de salud humana"
 *             sigla: "SH"
 *             Facultad:
 *               sigla: "FICCT"
 *             Plan_de_estudios:
 *               - codigo: "DG-2024"
 *               - codigo: "ADE-2024"
 *     responses:
 *       200:
 *         description: Carrera actualizada
 *       404:
 *         description: No encontrado
 *       400:
 *         description: Error en los datos enviados
 */
router.put('/:sigla', carrerasController.updateCarrera);

/**
 * @swagger
 * /carreras/{sigla}:
 *   delete:
 *     summary: Eliminar carrera
 *     tags: [Carreras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Carrera eliminada
 *       404:
 *         description: No encontrado
 */
router.delete('/:sigla', carrerasController.deleteCarrera);

module.exports = router;
