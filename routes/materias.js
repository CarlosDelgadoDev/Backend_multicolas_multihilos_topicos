const express = require('express');
const router = express.Router();
const materiasController = require('../controllers/materiasController');
/**
 * @swagger
 * tags:
 *   name: Materias
 *   description: Endpoints para gestionar materias
 */

/**
 * @swagger
 * /materias:
 *   get:
 *     summary: Obtener todas las materias
 *     tags: [Materias]
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
 *         description: Lista de materias
 */
router.get('/', materiasController.getMaterias);

/**
 * @swagger
 * /materias/{sigla}:
 *   get:
 *     summary: Obtener materia por sigla
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: sigla
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Materia encontrada
 *       404:
 *         description: No encontrado
 */
router.get('/:sigla', materiasController.getMateriaBySigla);

/**
 * @swagger
 * /materias:
 *   post:
 *     summary: Crear una nueva materia con sus prerequisitos
 *     tags: [Materias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Programación I2"
 *               horasDeEstudio:
 *                 type: integer
 *                 example: 60
 *               sigla:
 *                 type: string
 *                 example: "INF-102-a"
 *               nivel:
 *                 type: integer
 *                 example: 1
 *               Pre_requisitos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sigla:
 *                       type: string
 *                   required:
 *                     - sigla
 *             required:
 *               - nombre
 *               - sigla
 *               - nivel
 *           example:
 *             nombre: "Programación I2"
 *             horasDeEstudio: 60
 *             sigla: "INF-102-a"
 *             nivel: 1
 *             Pre_requisitos:
 *               - sigla: "INF-101"
 *               - sigla: "MAT-101"
 *     responses:
 *       201:
 *         description: Materia creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 5
 *                 nombre:
 *                   type: string
 *                   example: "Programación I2"
 *                 sigla:
 *                   type: string
 *                   example: "INF-102-a"
 *                 nivel:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Error en los datos enviados
 *       409:
 *         description: La sigla ya existe
 */
router.post('/', materiasController.createMateria);

/**
 * @swagger
 * /materias/{sigla}:
 *   put:
 *     summary: Actualizar una materia por su sigla
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: sigla
 *         required: true
 *         schema:
 *           type: string
 *         description: Sigla de la materia a actualizar (ej. INF-102-a)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Programación I2 - Actualizada"
 *               horasDeEstudio:
 *                 type: integer
 *                 example: 70
 *               nivel:
 *                 type: integer
 *                 example: 2
 *               Pre_requisitos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sigla:
 *                       type: string
 *                   required:
 *                     - sigla
 *             required:
 *               - nombre
 *               - nivel
 *           example:
 *             nombre: "Programación I2 - Actualizada"
 *             horasDeEstudio: 70
 *             nivel: 2
 *             Pre_requisitos:
 *               - sigla: "INF-101"
 *               - sigla: "LOG-101"
 *     responses:
 *       200:
 *         description: Materia actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 5
 *                 nombre:
 *                   type: string
 *                   example: "Programación I2 - Actualizada"
 *                 sigla:
 *                   type: string
 *                   example: "INF-102-a"
 *                 nivel:
 *                   type: integer
 *                   example: 2
 *       404:
 *         description: Materia no encontrada
 *       400:
 *         description: Error en los datos enviados
 */
router.put('/:sigla', materiasController.updateMateria);

/**
 * @swagger
 * /materias/{sigla}:
 *   delete:
 *     summary: Eliminar materia
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: sigla
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Materia eliminada
 *       404:
 *         description: No encontrado
 */
router.delete('/:sigla', materiasController.deleteMateria);


module.exports = router;
