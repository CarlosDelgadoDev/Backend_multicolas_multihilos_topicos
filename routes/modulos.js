const express = require('express');
const router = express.Router();
const modulosController = require('../controllers/modulosController');
/**
 * @swagger
 * tags:
 *   name: Modulos
 *   description: Endpoints para gestionar modulos
 */

/**
 * @swagger
 * /modulos:
 *   get:
 *     summary: Obtener todos los modulos
 *     tags: [Modulos]
 *     responses:
 *       200:
 *         description: Lista de modulos
 */
router.get('/', modulosController.getModulos);

/**
 * @swagger
 * /modulos/{id}:
 *   get:
 *     summary: Obtener modulo por ID
 *     tags: [Modulos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Modulo encontrado
 *       404:
 *         description: No encontrado
 */
router.get('/:id', modulosController.getModuloById);

/**
 * @swagger
 * /modulos:
 *   post:
 *     summary: Crear un nuevo modulo
 *     tags: [Modulos]
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
 *         description: Modulo creado
 */
router.post('/', modulosController.createModulo);

/**
 * @swagger
 * /modulos/{id}:
 *   put:
 *     summary: Actualizar modulo
 *     tags: [Modulos]
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
 *         description: Modulo actualizado
 *       404:
 *         description: No encontrado
 */
router.put('/:id', modulosController.updateModulo);

/**
 * @swagger
 * /modulos/{id}:
 *   delete:
 *     summary: Eliminar modulo
 *     tags: [Modulos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Modulo eliminado
 *       404:
 *         description: No encontrado
 */
router.delete('/:id', modulosController.deleteModulo);


router.post('/', modulosController.createModulo);
router.get('/', modulosController.getModulos);
router.get('/:id', modulosController.getModuloById);
router.put('/:id', modulosController.updateModulo);
router.delete('/:id', modulosController.deleteModulo);

module.exports = router;
