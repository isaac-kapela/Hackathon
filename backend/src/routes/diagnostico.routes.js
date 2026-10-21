const express = require('express');
const router = express.Router();
const diagnosticoController = require('../controllers/diagnostico.controller');

router.post('/', diagnosticoController.executarDiagnostico);

module.exports = router;
