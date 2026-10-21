const express = require('express');
const router = express.Router();
const presetsController = require('../controllers/presets.controller');

router.get('/', presetsController.listarPresets);
router.get('/:id', presetsController.obterPresetPorId);

module.exports = router;
