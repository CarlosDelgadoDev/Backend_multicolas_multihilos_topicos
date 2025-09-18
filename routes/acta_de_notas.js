const express = require('express');
const router = express.Router();
const actaDeNotasController = require('../controllers/actaDeNotasController');
/**
 * @swagger
 * tags:
 *   name: ActaDeNotas
 *   description: Endpoints para gestionar actas de notas
 */

/**
 * @swagger
 * /acta_de_notas:
 *   get:
 *     summary: Obtener todas las actas de notas
 *     tags: [ActaDeNotas]
 *     responses:
 *       200:
 *         description: Lista de actas de notas
 */
router.get('/', actaDeNotasController.getActasDeNotas);

/**
 * @swagger
 * /acta_de_notas/{id}:
 *   get:
 *     summary: Obtener acta de notas por ID
 *     tags: [ActaDeNotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Acta de notas encontrada
 *       404:
 *         description: No encontrado
 */
router.get('/:id', actaDeNotasController.getActaDeNotasById);

/**
 * @swagger
 * /acta_de_notas:
 *   post:
 *     summary: Crear una nueva acta de notas
 *     tags: [ActaDeNotas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grupoMateriaId:
 *                 type: integer
 *               docenteId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Acta de notas creada
 */
router.post('/', actaDeNotasController.createActaDeNotas);

/**
 * @swagger
 * /acta_de_notas/{id}:
 *   put:
 *     summary: Actualizar acta de notas
 *     tags: [ActaDeNotas]
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
 *               grupoMateriaId:
 *                 type: integer
 *               docenteId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Acta de notas actualizada
 *       404:
 *         description: No encontrado
 */
router.put('/:id', actaDeNotasController.updateActaDeNotas);

/**
 * @swagger
 * /acta_de_notas/{id}:
 *   delete:
 *     summary: Eliminar acta de notas
 *     tags: [ActaDeNotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Acta de notas eliminada
 *       404:
 *         description: No encontrado
 */
router.delete('/:id', actaDeNotasController.deleteActaDeNotas);


router.post('/', actaDeNotasController.createActaDeNotas);
router.get('/', actaDeNotasController.getActasDeNotas);
router.get('/:id', actaDeNotasController.getActaDeNotasById);
router.put('/:id', actaDeNotasController.updateActaDeNotas);
router.delete('/:id', actaDeNotasController.deleteActaDeNotas);

module.exports = router;
