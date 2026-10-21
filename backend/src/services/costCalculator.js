/**
 * costCalculator.js
 * Metodologia Embrapa de Custo de Produção do Leite (COE, COT, CT, Custopec)
 * Integração com Índices de Mercado CEPEA e Qualidade MAPA IN 76/77
 */

function calculateIndicators(input) {
  // 1. Zootecnia Básica
  const producaoDiaria = Number(input.producao_diaria || 1200);
  const totalVacas = Number(input.total_vacas || 80);
  const vacasLactacao = Number(input.vacas_lactacao || 64);
  const delMedio = Number(input.del_medio || 165);
  const iepMeses = Number(input.iep_meses || 13.2);
  const taxaPrenhez = Number(input.taxa_prenhez || 22);
  const consumoConcentradoVacaDia = Number(input.consumo_concentrado_vaca_dia || 6.0);

  const percVacasLactacao = totalVacas > 0 ? (vacasLactacao / totalVacas) * 100 : 0;
  const producaoMediaVacaDia = vacasLactacao > 0 ? producaoDiaria / vacasLactacao : 0;
  
  // Eficiência Alimentar (L de leite por kg de ração consumida)
  const totalConcentradoDia = consumoConcentradoVacaDia * vacasLactacao;
  const eficienciaAlimentar = totalConcentradoDia > 0 ? producaoDiaria / totalConcentradoDia : 0;

  // 2. Qualidade do Leite & Ajuste de Preço (MAPA IN 76/77 e tabelas de laticínio)
  const ccs = Number(input.ccs || 280);
  const cbt = Number(input.cbt || 45);
  const gorduraLeite = Number(input.gordura_leite || 3.7);
  const proteinaLeite = Number(input.proteina_leite || 3.2);

  let ajusteQualidade = 0;
  // Bônus/Desconto CCS
  if (ccs < 200) ajusteQualidade += 0.05;
  else if (ccs <= 400) ajusteQualidade += 0.0;
  else if (ccs <= 500) ajusteQualidade -= 0.04;
  else ajusteQualidade -= 0.12; // Severo

  // Bônus/Desconto CBT
  if (cbt < 50) ajusteQualidade += 0.03;
  else if (cbt <= 100) ajusteQualidade += 0.0;
  else ajusteQualidade -= 0.07;

  // Bônus Sólidos (Gordura >= 3.7% e Proteína >= 3.2%)
  if (gorduraLeite >= 3.7 && proteinaLeite >= 3.2) {
    ajusteQualidade += 0.03;
  }

  const precoBaseLeite = Number(input.preco_base_leite || 2.45);
  const precoLiquidoLeite = Math.max(0.5, precoBaseLeite + ajusteQualidade);

  // 3. Custos de Mercado e Concentrado (CEPEA)
  const precoSacaMilho = Number(input.preco_saca_milho || 68.50);
  const precoTonSoja = Number(input.preco_ton_soja || 2100.0);
  
  // Estimativa do kg do concentrado 22% PB base milho + farelo de soja
  // Ração padrão 22%: ~65% milho + 32% soja + 3% núcleo mineral
  const precoKgMilho = precoSacaMilho / 60;
  const precoKgSoja = precoTonSoja / 1000;
  const precoKgConcentrado = (0.65 * precoKgMilho) + (0.32 * precoKgSoja) + 0.15; // + mineral

  // 4. Custos Operacionais Embrapa (Mensais - 30 dias)
  const producaoMensal = producaoDiaria * 30;

  // Custos de Alimentação
  const custoConcentradoMes = totalConcentradoDia * precoKgConcentrado * 30;
  const custoVolumosoVacaDia = Number(input.custo_volumoso_dia || 8.50);
  const custoVolumosoMes = vacasLactacao * custoVolumosoVacaDia * 30;
  const custoAlimentacaoTotalMes = custoConcentradoMes + custoVolumosoMes;

  // Outros Custos Diretos
  const custoMaoObraContratadaMes = Number(input.custo_mao_obra_contratada_mes || 6000.0);
  const outrosCustosCoeMes = Number(input.outros_custos_coe_mes || 4200.0);

  // COE (Custo Operacional Efetivo)
  const coeMes = custoAlimentacaoTotalMes + custoMaoObraContratadaMes + outrosCustosCoeMes;
  const coeLitro = producaoMensal > 0 ? coeMes / producaoMensal : 0;
  const percAlimentacaoCoe = coeMes > 0 ? (custoAlimentacaoTotalMes / coeMes) * 100 : 0;

  // COT (Custo Operacional Total) = COE + Depreciação + Mão de Obra Familiar
  const depreciacaoMes = Number(input.depreciacao_mes || 3200.0);
  const maoObraFamiliarMes = Number(input.mao_obra_familiar_mes || 4000.0);
  const cotMes = coeMes + depreciacaoMes + maoObraFamiliarMes;
  const cotLitro = producaoMensal > 0 ? cotMes / producaoMensal : 0;

  // CT (Custo Total) = COT + Remuneração do Capital (Terra, Animais)
  const custoOportunidadeCapitalMes = Number(input.custo_oportunidade_capital_mes || 5000.0);
  const ctMes = cotMes + custoOportunidadeCapitalMes;
  const ctLitro = producaoMensal > 0 ? ctMes / producaoMensal : 0;

  // 5. Receitas e Margens
  const receitaBrutaMes = producaoMensal * precoLiquidoLeite;
  const margemBrutaMes = receitaBrutaMes - coeMes;
  const margemBrutaLitro = precoLiquidoLeite - coeLitro;

  const margemLiquidaMes = receitaBrutaMes - cotMes;
  const margemLiquidaLitro = precoLiquidoLeite - cotLitro;

  const lucroTotalMes = receitaBrutaMes - ctMes;
  const lucroLitro = precoLiquidoLeite - ctLitro;

  // 6. Relações de Troca (CEPEA)
  const relacaoTrocaMilho = precoLiquidoLeite > 0 ? precoSacaMilho / precoLiquidoLeite : 0;
  const precoSacaSoja = (precoTonSoja / 1000) * 60;
  const relacaoTrocaSoja = precoLiquidoLeite > 0 ? precoSacaSoja / precoLiquidoLeite : 0;

  // 7. Ponto de Equilíbrio Operacional (Litros/dia para cobrir COE)
  // Custo variável por litro estimado (alimentação por litro)
  const custoAlimentacaoLitro = producaoMensal > 0 ? custoAlimentacaoTotalMes / producaoMensal : 0;
  const margemContribuicaoLitro = precoLiquidoLeite - custoAlimentacaoLitro;
  const custosFixosCoeMes = custoMaoObraContratadaMes + outrosCustosCoeMes;
  const pontoEquilibrioLitrosMes = margemContribuicaoLitro > 0 ? custosFixosCoeMes / margemContribuicaoLitro : 0;
  const pontoEquilibrioLitrosDia = pontoEquilibrioLitrosMes / 30;

  // Retorna os fatos compilados para o Motor de Inferência e para o Frontend
  return {
    ...input,
    // Fatos calculados
    producao_diaria: producaoDiaria,
    producao_mensal: producaoMensal,
    total_vacas: totalVacas,
    vacas_lactacao: vacasLactacao,
    del_medio: delMedio,
    iep_meses: iepMeses,
    taxa_prenhez: taxaPrenhez,
    perc_vacas_lactacao: Number(percVacasLactacao.toFixed(1)),
    producao_media_vaca_dia: Number(producaoMediaVacaDia.toFixed(1)),
    eficiencia_alimentar: Number(eficienciaAlimentar.toFixed(2)),
    
    // Qualidade
    ccs,
    cbt,
    gordura_leite: gorduraLeite,
    proteina_leite: proteinaLeite,
    ajuste_qualidade_litro: Number(ajusteQualidade.toFixed(3)),
    preco_base_leite: precoBaseLeite,
    preco_liquido_leite: Number(precoLiquidoLeite.toFixed(3)),

    // Custos
    preco_kg_concentrado: Number(precoKgConcentrado.toFixed(2)),
    custo_alimentacao_total_mes: Number(custoAlimentacaoTotalMes.toFixed(2)),
    coe_mes: Number(coeMes.toFixed(2)),
    coe_litro: Number(coeLitro.toFixed(3)),
    perc_alimentacao_coe: Number(percAlimentacaoCoe.toFixed(1)),
    
    cot_mes: Number(cotMes.toFixed(2)),
    cot_litro: Number(cotLitro.toFixed(3)),

    ct_mes: Number(ctMes.toFixed(2)),
    ct_litro: Number(ctLitro.toFixed(3)),

    // Resultados Financeiros
    receita_bruta_mes: Number(receitaBrutaMes.toFixed(2)),
    margem_bruta_mes: Number(margemBrutaMes.toFixed(2)),
    margem_bruta_litro: Number(margemBrutaLitro.toFixed(3)),
    margem_liquida_mes: Number(margemLiquidaMes.toFixed(2)),
    margem_liquida_litro: Number(margemLiquidaLitro.toFixed(3)),
    lucro_total_mes: Number(lucroTotalMes.toFixed(2)),
    lucro_litro: Number(lucroLitro.toFixed(3)),

    // Indicadores de Mercado CEPEA
    preco_saca_milho: precoSacaMilho,
    preco_ton_soja: precoTonSoja,
    relacao_troca_milho: Number(relacaoTrocaMilho.toFixed(2)),
    relacao_troca_soja: Number(relacaoTrocaSoja.toFixed(2)),

    // Ponto de equilíbrio
    ponto_equilibrio_litros_dia: Number(pontoEquilibrioLitrosDia.toFixed(0)),
    ponto_equilibrio_litros_mes: Number(pontoEquilibrioLitrosMes.toFixed(0))
  };
}

module.exports = { calculateIndicators };
