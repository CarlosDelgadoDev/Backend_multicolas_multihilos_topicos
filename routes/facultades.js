const express = require('express');
const router = express.Router();
const facultadesController = require('../controllers/facultadesController');


/**
 * @swagger
 * tags:
 *   name: Facultades
 *   description: Endpoints para gestionar facultades
 */

/**
 * @swagger
 * /facultades:
 *   get:
 *     summary: Obtener todas las facultades
 *     tags: [Facultades]
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
 *         description: Lista de facultades
 */
router.get('/', facultadesController.getFacultades);

/**
 * @swagger
 * /facultades/{sigla}:
 *   get:
 *     summary: Obtener facultad por ID
 *     tags: [Facultades]
 *     parameters:
 *       - in: path
 *         name: sigla
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Facultad encontrada
 *       404:
 *         description: No encontrado
 */
router.get('/:sigla', facultadesController.getFacultadBySigla);

/**
 * @swagger
 * /facultades:
 *   post:
 *     summary: Crear una nueva facultad
 *     tags: [Facultades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Facultad creada
 */
router.post('/', facultadesController.createFacultad);

/**
 * @swagger
 * /facultades/{sigla}:
 *   put:
 *     summary: Actualizar facultad
 *     tags: [Facultades]
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
 *                 example: "facultad nueva"
 *               descripcion:
 *                 type: string
 *                 example: "descripcion de la nueva facultad"
 *               sigla:
 *                 type: string
 *                 example: "FN"
 *               carreras:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - codigo
 *                   properties:
 *                     codigo:
 *                       type: string
 *                       example: "CRN"
 *     responses:
 *       200:
 *         description: Facultad actualizada
 *       404:
 *         description: No encontrado
 */
router.put('/:sigla', facultadesController.updateFacultad);

/**
 * @swagger
 * /facultades/{sigla}:
 *   delete:
 *     summary: Eliminar facultad
 *     tags: [Facultades]
 *     parameters:
 *       - in: path
 *         name: sigla
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Facultad eliminada
 *       404:
 *         description: No encontrado
 */
router.delete('/:sigla', facultadesController.deleteFacultad);

module.exports = router;
