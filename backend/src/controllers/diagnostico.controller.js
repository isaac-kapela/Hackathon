/**
 * diagnostico.controller.js
 * Controlador responsável pelo processamento de inferência e cálculo de indicadores
 */

const InferenceEngine = require('../engine/InferenceEngine');
const rulesDb = require('../knowledge/rules.json');
const variablesDb = require('../knowledge/variables.json');
const { calculateIndicators } = require('../services/costCalculator');
const { validateDiagnosticoInput } = require('../validators/input.validator');

const engine = new InferenceEngine(rulesDb, variablesDb);

exports.executarDiagnostico = (req, res) => {
  try {
    const input = req.body || {};

    const validation = validateDiagnosticoInput(input);
    if (!validation.valid) {
      return res.status(400).json({
        sucesso: false,
        erros: validation.errors
      });
    }

    // 1. Enriquecimento de fatos com a metodologia Embrapa / MAPA
    const workingMemory = calculateIndicators(input);

    // 2. Execução determinística do motor de inferência
    const inferenceResult = engine.run(workingMemory);

    return res.json({
      sucesso: true,
      timestamp: new Date().toISOString(),
      resultado: inferenceResult,
      indicadores: workingMemory
    });
  } catch (error) {
    console.error('[DiagnosticoController] Erro:', error);
    return res.status(500).json({
      sucesso: false,
      erro: error.message
    });
  }
};
