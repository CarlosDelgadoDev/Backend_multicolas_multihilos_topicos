const express = require('express');
const router = express.Router();
const gestionController = require('../controllers/gestionController');
/**
 * @swagger
 * tags:
 *   name: Gestiones
 *   description: Endpoints para gestionar gestiones
 */

/**
 * @swagger
 * /gestiones:
 *   get:
 *     summary: Obtener todas las gestiones
 *     tags: [Gestiones]
 *     responses:
 *       200:
 *         description: Lista de gestiones
 */
router.get('/', gestionController.getGestiones);

/**
 * @swagger
 * /gestiones/{id}:
 *   get:
 *     summary: Obtener gestión por ID
 *     tags: [Gestiones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gestión encontrada
 *       404:
 *         description: No encontrado
 */
router.get('/:id', gestionController.getGestionById);

/**
 * @swagger
 * /gestiones:
 *   post:
 *     summary: Crear una nueva gestión
 *     tags: [Gestiones]
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
 *         description: Gestión creada
 */
router.post('/', gestionController.createGestion);

/**
 * @swagger
 * /gestiones/{id}:
 *   put:
 *     summary: Actualizar gestión
 *     tags: [Gestiones]
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
 *         description: Gestión actualizada
 *       404:
 *         description: No encontrado
 */
router.put('/:id', gestionController.updateGestion);

/**
 * @swagger
 * /gestiones/{id}:
 *   delete:
 *     summary: Eliminar gestión
 *     tags: [Gestiones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gestión eliminada
 *       404:
 *         description: No encontrado
 */
router.delete('/:id', gestionController.deleteGestion);

router.post('/', gestionController.createGestion);
router.get('/', gestionController.getGestiones);
router.get('/:id', gestionController.getGestionById);
router.put('/:id', gestionController.updateGestion);
router.delete('/:id', gestionController.deleteGestion);

module.exports = router;
