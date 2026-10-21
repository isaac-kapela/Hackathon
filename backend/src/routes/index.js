const express = require('express');
const router = express.Router();

const diagnosticoRoutes = require('./diagnostico.routes');
const conhecimentoRoutes = require('./conhecimento.routes');
const mercadoRoutes = require('./mercado.routes');
const presetsRoutes = require('./presets.routes');

router.use('/diagnostico', diagnosticoRoutes);
router.use('/conhecimento', conhecimentoRoutes);
router.use('/mercado', mercadoRoutes);
router.use('/presets', presetsRoutes);

module.exports = router;
