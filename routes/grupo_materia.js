const express = require('express');
const router = express.Router();
const grupoMateriaController = require('../controllers/grupoMateriaController');
/**
 * @swagger
 * tags:
 *   name: GrupoMateria
 *   description: Endpoints para gestionar grupos de materia
 */

/**
 * @swagger
 * /grupo_materia:
 *   get:
 *     summary: Obtener todos los grupos de materia
 *     tags: [GrupoMateria]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página (por defecto 1)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Número de elementos por página (por defecto 10)
 *     responses:
 *       200:
 *         description: Lista de grupos de materia
 */
router.get('/', grupoMateriaController.getGruposMateria);

/**
 * @swagger
 * /grupo_materia/{sigla}:
 *   get:
 *     summary: Obtener grupo de materia por sigla
 *     tags: [GrupoMateria]
 *     parameters:
 *       - in: path
 *         name: sigla
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Grupo de materia encontrado
 *       404:
 *         description: No encontrado
 */
router.get('/:sigla', grupoMateriaController.getGrupoMateriaBySigla);

/**
 * @swagger
 * /grupo_materia:
 *   post:
 *     summary: Crear un nuevo grupo de materia
 *     tags: [GrupoMateria]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sigla:
 *                 type: string
 *                 example: "Grupo C"
 *               Docente:
 *                 type: object
 *                 properties:
 *                   ci:
 *                     type: string
 *                     example: "11223344"
 *                 required:
 *                   - ci
 *               Materium:
 *                 type: object
 *                 properties:
 *                   sigla:
 *                     type: string
 *                     example: "INF-101"
 *                 required:
 *                   - sigla
 *               Periodo:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                 required:
 *                   - id
 *               Horarios:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                   required:
 *                     - id
 *                 minItems: 1
 *             required:
 *               - sigla
 *               - Docente
 *               - Materium
 *               - Periodo
 *               - Horarios
 *           example:
 *             sigla: "Grupo C"
 *             Docente:
 *               ci: "11223344"
 *             Materium:
 *               sigla: "INF-101"
 *             Periodo:
 *               id: 1
 *             Horarios:
 *               - id: 1
 *     responses:
 *       201:
 *         description: Grupo de materia creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 789
 *                 sigla:
 *                   type: string
 *                   example: "Grupo C"
 *                 Docente:
 *                   type: object
 *                   properties:
 *                     ci:
 *                       type: string
 *                       example: "11223344"
 *                 Materium:
 *                   type: object
 *                   properties:
 *                     sigla:
 *                       type: string
 *                       example: "INF-101"
 *                 Periodo:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                 Horarios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *       400:
 *         description: Error en los datos enviados (campos faltantes o inválidos)
 *       404:
 *         description: Docente, materia, periodo u horario no encontrado
 *       409:
 *         description: El grupo ya existe para esta materia y periodo
 */
router.post('/', grupoMateriaController.createGrupoMateria);

/**
 * @swagger
 * /grupo_materia/{sigla}:
 *   put:
 *     summary: Actualizar un grupo de materia por su sigla (sin cambiar la sigla)
 *     tags: [GrupoMateria]
 *     parameters:
 *       - in: path
 *         name: sigla
 *         required: true
 *         schema:
 *           type: string
 *           example: "Grupo C"
 *         description: Sigla única del grupo de materia a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Docente:
 *                 type: object
 *                 properties:
 *                   ci:
 *                     type: string
 *                     example: "11223344"
 *                 required:
 *                   - ci
 *               Materium:
 *                 type: object
 *                 properties:
 *                   sigla:
 *                     type: string
 *                     example: "INF-101"
 *                 required:
 *                   - sigla
 *               Periodo:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                 required:
 *                   - id
 *               Horarios:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                   required:
 *                     - id
 *                 minItems: 1
 *             required:
 *               - Docente     
 *               - Materium
 *               - Periodo
 *               - Horarios
 *           example:
 *             Docente:       
 *               ci: "11223344"
 *             Materium:
 *               sigla: "INF-101"
 *             Periodo:
 *               id: 1
 *             Horarios:
 *               - id: 1
 *     responses:
 *       200:
 *         description: Grupo de materia actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 789
 *                 sigla:
 *                   type: string
 *                   example: "Grupo C"
 *                 Docente:
 *                   type: object
 *                   properties:
 *                     ci:
 *                       type: string
 *                       example: "11223344"
 *                 Materium:
 *                   type: object
 *                   properties:
 *                     sigla:
 *                       type: string
 *                       example: "INF-101"
 *                 Periodo:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                 Horarios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *       404:
 *         description: Grupo de materia, docente, materia, periodo u horario no encontrado
 *       400:
 *         description: Error en los datos enviados
 *       409:
 *         description: Conflicto 
 */
router.put('/:sigla', grupoMateriaController.updateGrupoMateria);

/**
 * @swagger
 * /grupo_materia/{sigla}:
 *   delete:
 *     summary: Eliminar grupo de materia
 *     tags: [GrupoMateria]
 *     parameters:
 *       - in: path
 *         name: sigla
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Grupo de materia eliminado
 *       404:
 *         description: No encontrado
 */
router.delete('/:sigla', grupoMateriaController.deleteGrupoMateria);

module.exports = router;
