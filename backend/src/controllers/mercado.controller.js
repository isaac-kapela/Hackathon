/**
 * mercado.controller.js
 * Controlador de dados de mercado (IBGE SIDRA e CEPEA/ESALQ)
 */

const { getMarketBenchmarks, COTACOES_PADRAO } = require('../services/marketService');

exports.obterBenchmarks = async (req, res) => {
  try {
    const benchmarks = await getMarketBenchmarks();
    res.json({
      sucesso: true,
      timestamp: new Date().toISOString(),
      ...benchmarks
    });
  } catch (error) {
    console.error('[MercadoController] Erro:', error);
    res.status(500).json({
      sucesso: false,
      erro: error.message,
      cotacoes_cepea_referencia: COTACOES_PADRAO
    });
  }
};
