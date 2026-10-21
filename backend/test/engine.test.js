/**
 * engine.test.js
 * Teste automatizado do Motor de Inferência e Metodologia Embrapa
 */

const InferenceEngine = require('../src/engine/InferenceEngine');
const rulesDb = require('../src/knowledge/rules.json');
const variablesDb = require('../src/knowledge/variables.json');
const { calculateIndicators } = require('../src/services/costCalculator');

console.log('--- INICIANDO TESTES DO MOTOR DE INFERÊNCIA ---');

const engine = new InferenceEngine(rulesDb, variablesDb);

// Caso de Teste 1: Fazenda com Mastite Subclínica e CBT alta
console.log('\n[TESTE 1] Fazenda com Mastite (CCS > 500k) e CBT Alta (> 100k):');
const casoMastite = calculateIndicators({
  producao_diaria: 1000,
  total_vacas: 80,
  vacas_lactacao: 60,
  ccs: 600, // deve disparar R03
  cbt: 150, // deve disparar R04
  del_medio: 160,
  iep_meses: 13.0,
  preco_base_leite: 2.45
});

const resMastite = engine.run(casoMastite);
console.log(`Status Geral: ${resMastite.statusGeral}`);
console.log(`Fator de Certeza Geral (CF): ${resMastite.fatorCertezaGeral}`);
console.log(`Total de regras disparadas: ${resMastite.totalRegrasDisparadas}`);
resMastite.regrasDisparadas.forEach(r => {
  console.log(` - [${r.id}] ${r.nome} (CF: ${r.cf}, Prioridade: ${r.prioridade})`);
});

const disparouR03 = resMastite.regrasDisparadas.some(r => r.id === 'R03');
const disparouR04 = resMastite.regrasDisparadas.some(r => r.id === 'R04');
console.log(`Asserção R03 disparada: ${disparouR03 ? 'PASSOU' : 'FALHOU'}`);
console.log(`Asserção R04 disparada: ${disparouR04 ? 'PASSOU' : 'FALHOU'}`);

// Caso de Teste 2: Fazenda Modelo de Alta Eficiência
console.log('\n[TESTE 2] Fazenda Modelo de Alta Eficiência (CCS < 200k, CBT < 50k, Margem Líquida alta):');
const casoModelo = calculateIndicators({
  producao_diaria: 2000,
  total_vacas: 80,
  vacas_lactacao: 68,
  del_medio: 155,
  iep_meses: 12.5,
  taxa_prenhez: 25,
  consumo_concentrado_vaca_dia: 6.0,
  ccs: 150,
  cbt: 25,
  preco_base_leite: 2.50,
  preco_saca_milho: 65.0,
  custo_volumoso_dia: 7.0,
  custo_mao_obra_contratada_mes: 5000,
  outros_custos_coe_mes: 3500,
  depreciacao_mes: 2500,
  mao_obra_familiar_mes: 3500
});

const resModelo = engine.run(casoModelo);
console.log(`Status Geral: ${resModelo.statusGeral}`);
console.log(`Margem Bruta por Litro: R$ ${casoModelo.margem_bruta_litro}`);
console.log(`Margem Líquida por Litro: R$ ${casoModelo.margem_liquida_litro}`);
console.log(`Total de regras disparadas: ${resModelo.totalRegrasDisparadas}`);
resModelo.regrasDisparadas.forEach(r => {
  console.log(` - [${r.id}] ${r.nome} (CF: ${r.cf})`);
});

console.log('\n--- TODOS OS TESTES EXECUTADOS COM SUCESSO ---');
