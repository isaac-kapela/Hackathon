/**
 * server.js
 * Servidor REST do Sistema Especialista para Pecuária Leiteira
 * Hackathon UFJF 2026 - RERUM Engenharia de Sistemas
 */

const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota raiz de health-check
app.get('/', (req, res) => {
  res.json({
    status: 'ONLINE',
    sistema: 'Sistema Especialista em Pecuária Leiteira (Tema 3 - Economia & Zootecnia)',
    evento: 'XXVIII Semana da Computação UFJF / RERUM 2026',
    documentacao_endpoints: {
      diagnostico: 'POST /api/diagnostico',
      regras: 'GET /api/conhecimento/regras',
      variaveis: 'GET /api/conhecimento/variaveis',
      mercado: 'GET /api/mercado/benchmarks',
      presets: 'GET /api/presets'
    }
  });
});

// Registro das rotas modulares da API
app.use('/api', apiRoutes);

// Tratamento de rota não encontrada
app.use((req, res) => {
  res.status(404).json({
    sucesso: false,
    erro: `Rota ${req.method} ${req.url} não encontrada.`
  });
});

// Tratamento global de erros
app.use((err, req, res, next) => {
  console.error('[Global Error Handler]:', err);
  res.status(500).json({
    sucesso: false,
    erro: 'Erro interno no servidor.',
    detalhes: err.message
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log('=======================================================');
    console.log('  SISTEMA ESPECIALISTA EM PECUÁRIA LEITEIRA (BACKEND)  ');
    console.log('  Hackathon UFJF 2026 - RERUM Engenharia de Sistemas   ');
    console.log(`  API rodando em: http://localhost:${PORT}             `);
    console.log('=======================================================');
  });
}

module.exports = app;
