const express = require('express');
const router = express.Router();
const detalleInscripcionController = require('../controllers/detalleInscripcionController');
/**
 * @swagger
 * tags:
 *   name: DetalleInscripcion
 *   description: Endpoints para gestionar detalles de inscripción
 */

/**
 * @swagger
 * /detalle_inscripcion:
 *   get:
 *     summary: Obtener todos los detalles de inscripción
 *     tags: [DetalleInscripcion]
 *     responses:
 *       200:
 *         description: Lista de detalles de inscripción
 */
router.get('/', detalleInscripcionController.getDetallesInscripcion);

/**
 * @swagger
 * /detalle_inscripcion/{id}:
 *   get:
 *     summary: Obtener detalle de inscripción por ID
 *     tags: [DetalleInscripcion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de inscripción encontrado
 *       404:
 *         description: No encontrado
 */
router.get('/:id', detalleInscripcionController.getDetalleInscripcionById);

/**
 * @swagger
 * /detalle_inscripcion:
 *   post:
 *     summary: Crear un nuevo detalle de inscripción
 *     tags: [DetalleInscripcion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boletaInscripcionId:
 *                 type: integer
 *               grupoMateriaId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Detalle de inscripción creado
 */
router.post('/', detalleInscripcionController.createDetalleInscripcion);

/**
 * @swagger
 * /detalle_inscripcion/{id}:
 *   put:
 *     summary: Actualizar detalle de inscripción
 *     tags: [DetalleInscripcion]
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
 *               boletaInscripcionId:
 *                 type: integer
 *               grupoMateriaId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Detalle de inscripción actualizado
 *       404:
 *         description: No encontrado
 */
router.put('/:id', detalleInscripcionController.updateDetalleInscripcion);

/**
 * @swagger
 * /detalle_inscripcion/{id}:
 *   delete:
 *     summary: Eliminar detalle de inscripción
 *     tags: [DetalleInscripcion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de inscripción eliminado
 *       404:
 *         description: No encontrado
 */
router.delete('/:id', detalleInscripcionController.deleteDetalleInscripcion);


router.post('/', detalleInscripcionController.createDetalleInscripcion);
router.get('/', detalleInscripcionController.getDetallesInscripcion);
router.get('/:id', detalleInscripcionController.getDetalleInscripcionById);
router.put('/:id', detalleInscripcionController.updateDetalleInscripcion);
router.delete('/:id', detalleInscripcionController.deleteDetalleInscripcion);

module.exports = router;
