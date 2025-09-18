const express = require('express');
const router = express.Router();
const preRequisitoController = require('../controllers/preRequisitoController');
/**
 * @swagger
 * tags:
 *   name: PreRequisito
 *   description: Endpoints para gestionar pre-requisitos
 */

/**
 * @swagger
 * /pre_requisito:
 *   get:
 *     summary: Obtener todos los pre-requisitos
 *     tags: [PreRequisito]
 *     responses:
 *       200:
 *         description: Lista de pre-requisitos
 */
router.get('/', preRequisitoController.getPreRequisitos);

/**
 * @swagger
 * /pre_requisito/{id}:
 *   get:
 *     summary: Obtener pre-requisito por ID
 *     tags: [PreRequisito]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pre-requisito encontrado
 *       404:
 *         description: No encontrado
 */
router.get('/:id', preRequisitoController.getPreRequisitoById);

/**
 * @swagger
 * /pre_requisito:
 *   post:
 *     summary: Crear un nuevo pre-requisito
 *     tags: [PreRequisito]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               materiaId:
 *                 type: integer
 *               requisitoId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pre-requisito creado
 */
router.post('/', preRequisitoController.createPreRequisito);

/**
 * @swagger
 * /pre_requisito/{id}:
 *   put:
 *     summary: Actualizar pre-requisito
 *     tags: [PreRequisito]
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
 *               materiaId:
 *                 type: integer
 *               requisitoId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Pre-requisito actualizado
 *       404:
 *         description: No encontrado
 */
router.put('/:id', preRequisitoController.updatePreRequisito);

/**
 * @swagger
 * /pre_requisito/{id}:
 *   delete:
 *     summary: Eliminar pre-requisito
 *     tags: [PreRequisito]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pre-requisito eliminado
 *       404:
 *         description: No encontrado
 */
router.delete('/:id', preRequisitoController.deletePreRequisito);


router.post('/', preRequisitoController.createPreRequisito);
router.get('/', preRequisitoController.getPreRequisitos);
router.get('/:id', preRequisitoController.getPreRequisitoById);
router.put('/:id', preRequisitoController.updatePreRequisito);
router.delete('/:id', preRequisitoController.deletePreRequisito);

module.exports = router;
