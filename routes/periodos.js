const express = require('express');
const router = express.Router();
const periodosController = require('../controllers/periodosController');

/**
 * @swagger
 * tags:
 *   name: Periodos
 *   description: Endpoints para gestionar periodos
 */

/**
 * @swagger
 * /periodos:
 *   get:
 *     summary: Obtener todos los periodos
 *     tags: [Periodos]
 *     responses:
 *       200:
 *         description: Lista de periodos
 */
router.get('/', periodosController.getPeriodos);

/**
 * @swagger
 * /periodos/{id}:
 *   get:
 *     summary: Obtener periodo por ID
 *     tags: [Periodos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Periodo encontrado
 *       404:
 *         description: No encontrado
 */
router.get('/:id', periodosController.getPeriodoById);

/**
 * @swagger
 * /periodos:
 *   post:
 *     summary: Crear un nuevo periodo
 *     tags: [Periodos]
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
 *         description: Periodo creado
 */
router.post('/', periodosController.createPeriodo);

/**
 * @swagger
 * /periodos/{id}:
 *   put:
 *     summary: Actualizar periodo
 *     tags: [Periodos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *       200:
 *         description: Periodo actualizado
 *       404:
 *         description: No encontrado
 */
router.put('/:id', periodosController.updatePeriodo);

/**
 * @swagger
 * /periodos/{id}:
 *   delete:
 *     summary: Eliminar periodo
 *     tags: [Periodos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Periodo eliminado
 *       404:
 *         description: No encontrado
 */
router.delete('/:id', periodosController.deletePeriodo);

module.exports = router;
