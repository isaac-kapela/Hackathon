/**
 * presets.data.js
 * Cenários de teste e demonstração do Sistema Especialista
 */

module.exports = {
  alta_eficiencia: {
    nome: "Fazenda Modelo (Alta Eficiência e Bonificação)",
    dados: {
      producao_diaria: 1800,
      total_vacas: 80,
      vacas_lactacao: 68,
      del_medio: 160,
      iep_meses: 12.8,
      taxa_prenhez: 24,
      consumo_concentrado_vaca_dia: 6.5,
      ccs: 180,
      cbt: 35,
      gordura_leite: 3.8,
      proteina_leite: 3.3,
      preco_base_leite: 2.48,
      preco_saca_milho: 68.50,
      preco_ton_soja: 2100.00,
      custo_volumoso_dia: 8.50,
      custo_mao_obra_contratada_mes: 6500,
      outros_custos_coe_mes: 4500,
      depreciacao_mes: 3500,
      mao_obra_familiar_mes: 4000,
      custo_oportunidade_capital_mes: 5000
    }
  },
  mastite_e_qualidade_critica: {
    nome: "Fazenda com Crise Sanitária (Mastite & CBT Alta)",
    dados: {
      producao_diaria: 1100,
      total_vacas: 85,
      vacas_lactacao: 60,
      del_medio: 175,
      iep_meses: 13.5,
      taxa_prenhez: 19,
      consumo_concentrado_vaca_dia: 6.0,
      ccs: 650, // Mastite subclínica severa
      cbt: 220, // Falha de resfriamento
      gordura_leite: 3.4,
      proteina_leite: 3.0,
      preco_base_leite: 2.45,
      preco_saca_milho: 72.00,
      preco_ton_soja: 2200.00,
      custo_volumoso_dia: 9.00,
      custo_mao_obra_contratada_mes: 6000,
      outros_custos_coe_mes: 4800,
      depreciacao_mes: 3000,
      mao_obra_familiar_mes: 4000,
      custo_oportunidade_capital_mes: 5000
    }
  },
  descapitalizacao_e_milho_caro: {
    nome: "Fazenda em Risco de Descapitalização (Ração Cara)",
    dados: {
      producao_diaria: 950,
      total_vacas: 90,
      vacas_lactacao: 58, // Poucas vacas produzindo (< 65%)
      del_medio: 220, // DEL atrasado
      iep_meses: 15.2, // IEP longo
      taxa_prenhez: 14,
      consumo_concentrado_vaca_dia: 7.5, // Baixa conversão
      ccs: 380,
      cbt: 80,
      gordura_leite: 3.5,
      proteina_leite: 3.1,
      preco_base_leite: 2.38,
      preco_saca_milho: 82.00, // Milho caro
      preco_ton_soja: 2400.00,
      custo_volumoso_dia: 9.50,
      custo_mao_obra_contratada_mes: 6000,
      outros_custos_coe_mes: 5000,
      depreciacao_mes: 3500,
      mao_obra_familiar_mes: 4500,
      custo_oportunidade_capital_mes: 5500
    }
  }
};
