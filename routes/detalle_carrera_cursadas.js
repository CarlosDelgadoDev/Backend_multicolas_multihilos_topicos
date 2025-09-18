const express = require('express');
const router = express.Router();
const detalleCarreraCursadasController = require('../controllers/detalleCarreraCursadasController');
/**
 * @swagger
 * tags:
 *   name: DetalleCarreraCursadas
 *   description: Endpoints para gestionar detalles de carrera cursadas
 */

/**
 * @swagger
 * /detalle_carrera_cursadas:
 *   get:
 *     summary: Obtener todos los detalles de carrera cursadas
 *     tags: [DetalleCarreraCursadas]
 *     responses:
 *       200:
 *         description: Lista de detalles de carrera cursadas
 */
router.get('/', detalleCarreraCursadasController.getDetallesCarreraCursadas);

/**
 * @swagger
 * /detalle_carrera_cursadas/{id}:
 *   get:
 *     summary: Obtener detalle de carrera cursadas por ID
 *     tags: [DetalleCarreraCursadas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de carrera cursadas encontrado
 *       404:
 *         description: No encontrado
 */
router.get('/:id', detalleCarreraCursadasController.getDetalleCarreraCursadasById);

/**
 * @swagger
 * /detalle_carrera_cursadas:
 *   post:
 *     summary: Crear un nuevo detalle de carrera cursadas
 *     tags: [DetalleCarreraCursadas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estudianteId:
 *                 type: integer
 *               carreraId:
 *                 type: integer
 *               gestionId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Detalle de carrera cursadas creado
 */
router.post('/', detalleCarreraCursadasController.createDetalleCarreraCursadas);

/**
 * @swagger
 * /detalle_carrera_cursadas/{id}:
 *   put:
 *     summary: Actualizar detalle de carrera cursadas
 *     tags: [DetalleCarreraCursadas]
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
 *               estudianteId:
 *                 type: integer
 *               carreraId:
 *                 type: integer
 *               gestionId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Detalle de carrera cursadas actualizado
 *       404:
 *         description: No encontrado
 */
router.put('/:id', detalleCarreraCursadasController.updateDetalleCarreraCursadas);

/**
 * @swagger
 * /detalle_carrera_cursadas/{id}:
 *   delete:
 *     summary: Eliminar detalle de carrera cursadas
 *     tags: [DetalleCarreraCursadas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de carrera cursadas eliminado
 *       404:
 *         description: No encontrado
 */
router.delete('/:id', detalleCarreraCursadasController.deleteDetalleCarreraCursadas);


router.post('/', detalleCarreraCursadasController.createDetalleCarreraCursadas);
router.get('/', detalleCarreraCursadasController.getDetallesCarreraCursadas);
router.get('/:id', detalleCarreraCursadasController.getDetalleCarreraCursadasById);
router.put('/:id', detalleCarreraCursadasController.updateDetalleCarreraCursadas);
router.delete('/:id', detalleCarreraCursadasController.deleteDetalleCarreraCursadas);

module.exports = router;
