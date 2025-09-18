const express = require('express');
const router = express.Router();
const detalleNotasController = require('../controllers/detalleNotasController');
/**
 * @swagger
 * tags:
 *   name: DetalleNotas
 *   description: Endpoints para gestionar detalles de notas
 */

/**
 * @swagger
 * /detalle_notas:
 *   get:
 *     summary: Obtener todos los detalles de notas
 *     tags: [DetalleNotas]
 *     responses:
 *       200:
 *         description: Lista de detalles de notas
 */
router.get('/', detalleNotasController.getDetallesNotas);

/**
 * @swagger
 * /detalle_notas/{id}:
 *   get:
 *     summary: Obtener detalle de notas por ID
 *     tags: [DetalleNotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de notas encontrado
 *       404:
 *         description: No encontrado
 */
router.get('/:id', detalleNotasController.getDetalleNotasById);

/**
 * @swagger
 * /detalle_notas:
 *   post:
 *     summary: Crear un nuevo detalle de notas
 *     tags: [DetalleNotas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               actaDeNotasId:
 *                 type: integer
 *               estudianteId:
 *                 type: integer
 *               nota:
 *                 type: number
 *     responses:
 *       201:
 *         description: Detalle de notas creado
 */
router.post('/', detalleNotasController.createDetalleNotas);

/**
 * @swagger
 * /detalle_notas/{id}:
 *   put:
 *     summary: Actualizar detalle de notas
 *     tags: [DetalleNotas]
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
 *               actaDeNotasId:
 *                 type: integer
 *               estudianteId:
 *                 type: integer
 *               nota:
 *                 type: number
 *     responses:
 *       200:
 *         description: Detalle de notas actualizado
 *       404:
 *         description: No encontrado
 */
router.put('/:id', detalleNotasController.updateDetalleNotas);

/**
 * @swagger
 * /detalle_notas/{id}:
 *   delete:
 *     summary: Eliminar detalle de notas
 *     tags: [DetalleNotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de notas eliminado
 *       404:
 *         description: No encontrado
 */
router.delete('/:id', detalleNotasController.deleteDetalleNotas);


router.post('/', detalleNotasController.createDetalleNotas);
router.get('/', detalleNotasController.getDetallesNotas);
router.get('/:id', detalleNotasController.getDetalleNotasById);
router.put('/:id', detalleNotasController.updateDetalleNotas);
router.delete('/:id', detalleNotasController.deleteDetalleNotas);

module.exports = router;
