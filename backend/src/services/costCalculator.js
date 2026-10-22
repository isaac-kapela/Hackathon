/**
 * costCalculator.js
 * Metodologia Embrapa de Custo de Produção do Leite (COE, COT, CT, Custopec)
 * Integração com Índices de Mercado CEPEA, Qualidade MAPA IN 76/77,
 * Bioclimatologia (ITU / THI), Bem-Estar Animal e Zootecnia Avançada
 */

function calculateIndicators(input) {
  // 1. Zootecnia Básica & Estrutura do Rebanho
  const producaoDiaria = Number(input.producao_diaria !== undefined && input.producao_diaria !== '' ? input.producao_diaria : 1200);
  const totalVacas = Number(input.total_vacas !== undefined && input.total_vacas !== '' ? input.total_vacas : 80);
  const vacasLactacao = Number(input.vacas_lactacao !== undefined && input.vacas_lactacao !== '' ? input.vacas_lactacao : 64);
  const delMedio = Number(input.del_medio !== undefined && input.del_medio !== '' ? input.del_medio : 165);
  const iepMeses = Number(input.iep_meses !== undefined && input.iep_meses !== '' ? input.iep_meses : 13.2);
  
  // Reprodução e Recria
  const taxaDeteccaoCio = Number(input.taxa_deteccao_cio !== undefined && input.taxa_deteccao_cio !== '' ? input.taxa_deteccao_cio : 60);
  const taxaConcepcao = Number(input.taxa_concepcao !== undefined && input.taxa_concepcao !== '' ? input.taxa_concepcao : 38);
  
  let taxaPrenhez = Number(input.taxa_prenhez !== undefined && input.taxa_prenhez !== '' ? input.taxa_prenhez : 0);
  if (!taxaPrenhez || taxaPrenhez === 0) {
    taxaPrenhez = (taxaDeteccaoCio * taxaConcepcao) / 100;
  }
  
  const idadePrimeiroPartoMeses = Number(input.idade_primeiro_parto_meses !== undefined && input.idade_primeiro_parto_meses !== '' ? input.idade_primeiro_parto_meses : 25);
  const taxaMortalidadeBezerras = Number(input.taxa_mortalidade_bezerras !== undefined && input.taxa_mortalidade_bezerras !== '' ? input.taxa_mortalidade_bezerras : 3.0);

  const percVacasLactacao = totalVacas > 0 ? (vacasLactacao / totalVacas) * 100 : 0;
  const producaoMediaVacaDia = vacasLactacao > 0 ? producaoDiaria / vacasLactacao : 0;

  // 2. Bioclimatologia & Conforto Térmico (Fórmula NRC / Thom)
  // ITU = 0.8 * T + (UR / 100) * (T - 14.4) + 46.4
  const temperaturaAmbiente = Number(input.temperatura_ambiente !== undefined && input.temperatura_ambiente !== '' ? input.temperatura_ambiente : 24);
  const umidadeRelativa = Number(input.umidade_relativa !== undefined && input.umidade_relativa !== '' ? input.umidade_relativa : 68);
  
  const ituCalculado = (0.8 * temperaturaAmbiente) + ((umidadeRelativa / 100) * (temperaturaAmbiente - 14.4)) + 46.4;
  const itu = Number(ituCalculado.toFixed(1));

  let statusEstresseTermico = 'CONFORTO';
  let perdaEstimadaItuLitroDia = 0;
  if (itu > 78) {
    statusEstresseTermico = 'SEVERO';
    perdaEstimadaItuLitroDia = producaoDiaria * 0.15; // ~15% de queda
  } else if (itu >= 72) {
    statusEstresseTermico = 'MODERADO';
    perdaEstimadaItuLitroDia = producaoDiaria * 0.06; // ~6% de queda
  }

  // 3. Saúde, Sanidade e Bem-Estar Animal
  const escoreCondicaoCorporal = Number(input.escore_condicao_corporal !== undefined && input.escore_condicao_corporal !== '' ? input.escore_condicao_corporal : 3.0);
  const taxaClaudicacao = Number(input.taxa_claudicacao !== undefined && input.taxa_claudicacao !== '' ? input.taxa_claudicacao : 4.0);
  const incidenciaMastiteClinicaMes = Number(input.incidencia_mastite_clinica_mes !== undefined && input.incidencia_mastite_clinica_mes !== '' ? input.incidencia_mastite_clinica_mes : 2.0);

  // 4. Nutrição e Manejo Alimentar
  const consumoConcentradoVacaDia = Number(input.consumo_concentrado_vaca_dia !== undefined && input.consumo_concentrado_vaca_dia !== '' ? input.consumo_concentrado_vaca_dia : 6.0);
  const relacaoVolumosoConcentrado = Number(input.relacao_volumoso_concentrado !== undefined && input.relacao_volumoso_concentrado !== '' ? input.relacao_volumoso_concentrado : 60);
  const ureiaLeiteNul = Number(input.ureia_leite_nul !== undefined && input.ureia_leite_nul !== '' ? input.ureia_leite_nul : 12.5);

  const totalConcentradoDia = consumoConcentradoVacaDia * vacasLactacao;
  const eficienciaAlimentar = totalConcentradoDia > 0 ? producaoDiaria / totalConcentradoDia : 0;

  // 5. Qualidade do Leite & Ajuste de Preço (MAPA IN 76/77 e tabelas de laticínio)
  const ccs = Number(input.ccs !== undefined && input.ccs !== '' ? input.ccs : 280);
  const cbt = Number(input.cbt !== undefined && input.cbt !== '' ? input.cbt : 45);
  const gorduraLeite = Number(input.gordura_leite !== undefined && input.gordura_leite !== '' ? input.gordura_leite : 3.7);
  const proteinaLeite = Number(input.proteina_leite !== undefined && input.proteina_leite !== '' ? input.proteina_leite : 3.2);

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

  const precoBaseLeite = Number(input.preco_base_leite !== undefined && input.preco_base_leite !== '' ? input.preco_base_leite : 2.45);
  const precoLiquidoLeite = Math.max(0.5, precoBaseLeite + ajusteQualidade);

  // 6. Custos de Mercado e Concentrado (CEPEA)
  const precoSacaMilho = Number(input.preco_saca_milho !== undefined && input.preco_saca_milho !== '' ? input.preco_saca_milho : 68.50);
  const precoTonSoja = Number(input.preco_ton_soja !== undefined && input.preco_ton_soja !== '' ? input.preco_ton_soja : 2100.0);
  
  // Estimativa do kg do concentrado 22% PB base milho + farelo de soja
  const precoKgMilho = precoSacaMilho / 60;
  const precoKgSoja = precoTonSoja / 1000;
  const precoKgConcentrado = (0.65 * precoKgMilho) + (0.32 * precoKgSoja) + 0.15; // + mineral

  // 7. Custos Operacionais Embrapa (Mensais - 30 dias)
  const producaoMensal = producaoDiaria * 30;

  // Custos de Alimentação
  const custoConcentradoMes = totalConcentradoDia * precoKgConcentrado * 30;
  const custoVolumosoVacaDia = Number(input.custo_volumoso_dia !== undefined && input.custo_volumoso_dia !== '' ? input.custo_volumoso_dia : 8.50);
  const custoVolumosoMes = vacasLactacao * custoVolumosoVacaDia * 30;
  const custoAlimentacaoTotalMes = custoConcentradoMes + custoVolumosoMes;

  // Eficiência de Mão de Obra
  const numeroTrabalhadores = Math.max(1, Number(input.numero_trabalhadores !== undefined && input.numero_trabalhadores !== '' ? input.numero_trabalhadores : 2));
  const vacasPorTrabalhador = Number((vacasLactacao / numeroTrabalhadores).toFixed(1));
  const producaoLitrosPorTrabalhadorDia = Number((producaoDiaria / numeroTrabalhadores).toFixed(0));

  // Outros Custos Diretos
  const custoMaoObraContratadaMes = Number(input.custo_mao_obra_contratada_mes !== undefined && input.custo_mao_obra_contratada_mes !== '' ? input.custo_mao_obra_contratada_mes : 6000.0);
  const outrosCustosCoeMes = Number(input.outros_custos_coe_mes !== undefined && input.outros_custos_coe_mes !== '' ? input.outros_custos_coe_mes : 4200.0);

  // COE (Custo Operacional Efetivo)
  const coeMes = custoAlimentacaoTotalMes + custoMaoObraContratadaMes + outrosCustosCoeMes;
  const coeLitro = producaoMensal > 0 ? coeMes / producaoMensal : 0;
  const percAlimentacaoCoe = coeMes > 0 ? (custoAlimentacaoTotalMes / coeMes) * 100 : 0;

  // COT (Custo Operacional Total) = COE + Depreciação + Mão de Obra Familiar
  const depreciacaoMes = Number(input.depreciacao_mes !== undefined && input.depreciacao_mes !== '' ? input.depreciacao_mes : 3200.0);
  const maoObraFamiliarMes = Number(input.mao_obra_familiar_mes !== undefined && input.mao_obra_familiar_mes !== '' ? input.mao_obra_familiar_mes : 4000.0);
  const cotMes = coeMes + depreciacaoMes + maoObraFamiliarMes;
  const cotLitro = producaoMensal > 0 ? cotMes / producaoMensal : 0;

  // CT (Custo Total) = COT + Remuneração do Capital (Terra, Animais)
  const custoOportunidadeCapitalMes = Number(input.custo_oportunidade_capital_mes !== undefined && input.custo_oportunidade_capital_mes !== '' ? input.custo_oportunidade_capital_mes : 5000.0);
  const ctMes = cotMes + custoOportunidadeCapitalMes;
  const ctLitro = producaoMensal > 0 ? ctMes / producaoMensal : 0;

  // 8. Receitas e Margens
  const receitaBrutaMes = producaoMensal * precoLiquidoLeite;
  const margemBrutaMes = receitaBrutaMes - coeMes;
  const margemBrutaLitro = precoLiquidoLeite - coeLitro;

  const margemLiquidaMes = receitaBrutaMes - cotMes;
  const margemLiquidaLitro = precoLiquidoLeite - cotLitro;

  const lucroTotalMes = receitaBrutaMes - ctMes;
  const lucroLitro = precoLiquidoLeite - ctLitro;

  // 9. Relações de Troca (CEPEA)
  const relacaoTrocaMilho = precoLiquidoLeite > 0 ? precoSacaMilho / precoLiquidoLeite : 0;
  const precoSacaSoja = (precoTonSoja / 1000) * 60;
  const relacaoTrocaSoja = precoLiquidoLeite > 0 ? precoSacaSoja / precoLiquidoLeite : 0;

  // 10. Ponto de Equilíbrio Operacional (Litros/dia para cobrir COE)
  const custoAlimentacaoLitro = producaoMensal > 0 ? custoAlimentacaoTotalMes / producaoMensal : 0;
  const margemContribuicaoLitro = precoLiquidoLeite - custoAlimentacaoLitro;
  const custosFixosCoeMes = custoMaoObraContratadaMes + outrosCustosCoeMes;
  const pontoEquilibrioLitrosMes = margemContribuicaoLitro > 0 ? custosFixosCoeMes / margemContribuicaoLitro : 0;
  const pontoEquilibrioLitrosDia = pontoEquilibrioLitrosMes / 30;

  // Retorna os fatos compilados para o Motor de Inferência e para o Frontend
  return {
    ...input,
    // Zootecnia
    producao_diaria: producaoDiaria,
    producao_mensal: producaoMensal,
    total_vacas: totalVacas,
    vacas_lactacao: vacasLactacao,
    del_medio: delMedio,
    iep_meses: iepMeses,
    taxa_deteccao_cio: taxaDeteccaoCio,
    taxa_concepcao: taxaConcepcao,
    taxa_prenhez: Number(taxaPrenhez.toFixed(1)),
    idade_primeiro_parto_meses: idadePrimeiroPartoMeses,
    taxa_mortalidade_bezerras: taxaMortalidadeBezerras,
    perc_vacas_lactacao: Number(percVacasLactacao.toFixed(1)),
    producao_media_vaca_dia: Number(producaoMediaVacaDia.toFixed(1)),
    
    // Conforto e Ambiência
    temperatura_ambiente: temperaturaAmbiente,
    umidade_relativa: umidadeRelativa,
    itu: itu,
    status_estresse_termico: statusEstresseTermico,
    perda_estimada_itu_litro_dia: Number(perdaEstimadaItuLitroDia.toFixed(0)),

    // Sanidade e Bem-Estar
    escore_condicao_corporal: escoreCondicaoCorporal,
    taxa_claudicacao: taxaClaudicacao,
    incidencia_mastite_clinica_mes: incidenciaMastiteClinicaMes,

    // Nutrição
    consumo_concentrado_vaca_dia: consumoConcentradoVacaDia,
    relacao_volumoso_concentrado: relacaoVolumosoConcentrado,
    ureia_leite_nul: ureiaLeiteNul,
    eficiencia_alimentar: Number(eficienciaAlimentar.toFixed(2)),
    
    // Qualidade
    ccs,
    cbt,
    gordura_leite: gorduraLeite,
    proteina_leite: proteinaLeite,
    ajuste_qualidade_litro: Number(ajusteQualidade.toFixed(3)),
    preco_base_leite: precoBaseLeite,
    preco_liquido_leite: Number(precoLiquidoLeite.toFixed(3)),

    // Mão de Obra e Eficiência Operacional
    numero_trabalhadores: numeroTrabalhadores,
    vacas_por_trabalhador: vacasPorTrabalhador,
    producao_litros_por_trabalhador_dia: producaoLitrosPorTrabalhadorDia,

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