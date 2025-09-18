const express = require('express');
const router = express.Router();
const horariosController = require('../controllers/horariosController');

router.post('/', horariosController.createHorario);
router.get('/', horariosController.getHorarios);
router.get('/:id', horariosController.getHorarioById);
router.put('/:id', horariosController.updateHorario);
router.delete('/:id', horariosController.deleteHorario);

module.exports = router;
