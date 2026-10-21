/**
 * conhecimento.controller.js
 * Controlador para consulta à Base de Conhecimento formal (Regras e Variáveis)
 */

const rulesDb = require('../knowledge/rules.json');
const variablesDb = require('../knowledge/variables.json');

exports.listarRegras = (req, res) => {
  res.json({
    sucesso: true,
    versao: rulesDb.versao,
    data_revisao: rulesDb.data_revisao,
    dominio: rulesDb.dominio,
    total: rulesDb.regras.length,
    regras: rulesDb.regras
  });
};

exports.listarVariaveis = (req, res) => {
  res.json({
    sucesso: true,
    versao: variablesDb.versao,
    data_revisao: variablesDb.data_revisao,
    dominio: variablesDb.dominio,
    instituicao_referencia: variablesDb.instituicao_referencia,
    total: variablesDb.variaveis.length,
    variaveis: variablesDb.variaveis
  });
};
