/**
 * presets.controller.js
 * Controlador de cenários de simulação rápida
 */

const PRESETS = require('../data/presets.data');

exports.listarPresets = (req, res) => {
  res.json({
    sucesso: true,
    presets: PRESETS
  });
};

exports.obterPresetPorId = (req, res) => {
  const { id } = req.params;
  const preset = PRESETS[id];

  if (!preset) {
    return res.status(404).json({
      sucesso: false,
      erro: `Cenário pré-configurado '${id}' não encontrado.`
    });
  }

  res.json({
    sucesso: true,
    id,
    preset
  });
};
