const express = require('express');
const router = express.Router();
const aulasController = require('../controllers/aulasController');
/**
 * @swagger
 * tags:
 *   name: Aulas
 *   description: Endpoints para gestionar aulas
 */

/**
 * @swagger
 * /aulas:
 *   get:
 *     summary: Obtener todas las aulas
 *     tags: [Aulas]
 *     responses:
 *       200:
 *         description: Lista de aulas
 */
router.get('/', aulasController.getAulas);

/**
 * @swagger
 * /aulas/{id}:
 *   get:
 *     summary: Obtener aula por ID
 *     tags: [Aulas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aula encontrada
 *       404:
 *         description: No encontrado
 */
router.get('/:id', aulasController.getAulaById);

/**
 * @swagger
 * /aulas:
 *   post:
 *     summary: Crear una nueva aula
 *     tags: [Aulas]
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
 *         description: Aula creada
 */
router.post('/', aulasController.createAula);

/**
 * @swagger
 * /aulas/{id}:
 *   put:
 *     summary: Actualizar aula
 *     tags: [Aulas]
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
 *         description: Aula actualizada
 *       404:
 *         description: No encontrado
 */
router.put('/:id', aulasController.updateAula);

/**
 * @swagger
 * /aulas/{id}:
 *   delete:
 *     summary: Eliminar aula
 *     tags: [Aulas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aula eliminada
 *       404:
 *         description: No encontrado
 */
router.delete('/:id', aulasController.deleteAula);


router.post('/', aulasController.createAula);
router.get('/', aulasController.getAulas);
router.get('/:id', aulasController.getAulaById);
router.put('/:id', aulasController.updateAula);
router.delete('/:id', aulasController.deleteAula);

module.exports = router;
