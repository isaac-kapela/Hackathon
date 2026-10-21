const express = require('express');
const router = express.Router();
const conhecimentoController = require('../controllers/conhecimento.controller');

router.get('/regras', conhecimentoController.listarRegras);
router.get('/variaveis', conhecimentoController.listarVariaveis);

module.exports = router;
