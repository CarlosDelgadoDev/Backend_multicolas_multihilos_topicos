const express = require('express');
const router = express.Router();
const docentesController = require('../controllers/docentesController');
/**
 * @swagger
 * tags:
 *   name: Docentes
 *   description: Endpoints para gestionar docentes
 */

/**
 * @swagger
 * /docentes:
 *   get:
 *     summary: Obtener todos los docentes
 *     tags: [Docentes]
 *     responses:
 *       200:
 *         description: Lista de docentes
 */
router.get('/', docentesController.getDocentes);

/**
 * @swagger
 * /docentes/{id}:
 *   get:
 *     summary: Obtener docente por ID
 *     tags: [Docentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Docente encontrado
 *       404:
 *         description: No encontrado
 */
router.get('/:id', docentesController.getDocenteById);

/**
 * @swagger
 * /docentes:
 *   post:
 *     summary: Crear un nuevo docente
 *     tags: [Docentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellidoPaterno:
 *                 type: string
 *               apellidoMaterno:
 *                 type: string
 *               ci:
 *                 type: string
 *               fechaNac:
 *                 type: string
 *                 format: date
 *               profesion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Docente creado
 */
router.post('/', docentesController.createDocente);

/**
 * @swagger
 * /docentes/{id}:
 *   put:
 *     summary: Actualizar docente
 *     tags: [Docentes]
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
 *               apellidoPaterno:
 *                 type: string
 *               apellidoMaterno:
 *                 type: string
 *               ci:
 *                 type: string
 *               fechaNac:
 *                 type: string
 *                 format: date
 *               profesion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Docente actualizado
 *       404:
 *         description: No encontrado
 */
router.put('/:id', docentesController.updateDocente);

/**
 * @swagger
 * /docentes/{id}:
 *   delete:
 *     summary: Eliminar docente
 *     tags: [Docentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Docente eliminado
 *       404:
 *         description: No encontrado
 */
router.delete('/:id', docentesController.deleteDocente);


router.post('/', docentesController.createDocente);
router.get('/', docentesController.getDocentes);
router.get('/:id', docentesController.getDocenteById);
router.put('/:id', docentesController.updateDocente);
router.delete('/:id', docentesController.deleteDocente);

module.exports = router;
