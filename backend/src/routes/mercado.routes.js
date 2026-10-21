const express = require('express');
const router = express.Router();
const mercadoController = require('../controllers/mercado.controller');

router.get('/benchmarks', mercadoController.obterBenchmarks);

module.exports = router;
