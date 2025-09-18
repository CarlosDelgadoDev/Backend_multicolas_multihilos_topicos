var express = require('express');
var router = express.Router();

var taskController = require("../controllers/taskController");

/**
 * @swagger
 * tag:
 *   name: Tasks
 *   description: Endpoints para gestionar tareas asíncronas
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: para encolar la tarea asincrona
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: tarea encolada
 */
router.post('/', taskController.createTask);


/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: para ver el estado de la tarea
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: tarea encontrada
 *         status: [procesada, procesando, error]
 *         response: {
 *          data: []
 *         }
 */
router.get('/:id', taskController.getStatus);


module.exports = router;
