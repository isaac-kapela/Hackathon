/**
 * presets.data.js
 * Cenários de teste e demonstração do Sistema Especialista Zootécnico & Econômico
 */

module.exports = {
  alta_eficiencia: {
    nome: "Fazenda Modelo (Alta Eficiência, Conforto & Bônus)",
    dados: {
      producao_diaria: 2200,
      total_vacas: 85,
      vacas_lactacao: 72,
      del_medio: 155,
      iep_meses: 12.8,
      taxa_deteccao_cio: 68,
      taxa_concepcao: 42,
      taxa_prenhez: 28.5,
      idade_primeiro_parto_meses: 23.5,
      taxa_mortalidade_bezerras: 2.0,
      temperatura_ambiente: 21,
      umidade_relativa: 60,
      escore_condicao_corporal: 3.1,
      taxa_claudicacao: 2.5,
      incidencia_mastite_clinica_mes: 1.5,
      consumo_concentrado_vaca_dia: 7.0,
      relacao_volumoso_concentrado: 58,
      ureia_leite_nul: 12.0,
      ccs: 160,
      cbt: 28,
      gordura_leite: 3.85,
      proteina_leite: 3.30,
      numero_trabalhadores: 3,
      preco_base_leite: 2.48,
      preco_saca_milho: 68.50,
      preco_ton_soja: 2100.00,
      custo_volumoso_dia: 8.50,
      custo_mao_obra_contratada_mes: 7500,
      outros_custos_coe_mes: 4500,
      depreciacao_mes: 3500,
      mao_obra_familiar_mes: 4000,
      custo_oportunidade_capital_mes: 5000
    }
  },
  estresse_termico_e_acidose: {
    nome: "Fazenda sob Estresse Térmico & Acidose (Verão Crítico)",
    dados: {
      producao_diaria: 1400,
      total_vacas: 90,
      vacas_lactacao: 65,
      del_medio: 190,
      iep_meses: 14.2,
      taxa_deteccao_cio: 45,
      taxa_concepcao: 24,
      taxa_prenhez: 10.8,
      idade_primeiro_parto_meses: 27,
      taxa_mortalidade_bezerras: 4.5,
      temperatura_ambiente: 32, // Calor elevado
      umidade_relativa: 80, // ITU > 83 (Severo)
      escore_condicao_corporal: 2.6,
      taxa_claudicacao: 7.0,
      incidencia_mastite_clinica_mes: 3.8,
      consumo_concentrado_vaca_dia: 8.5,
      relacao_volumoso_concentrado: 40, // Muito concentrado -> Acidose
      ureia_leite_nul: 17.5, // NUL alto
      ccs: 420,
      cbt: 95,
      gordura_leite: 3.10, // Gordura deprimida
      proteina_leite: 3.05,
      numero_trabalhadores: 2,
      preco_base_leite: 2.45,
      preco_saca_milho: 74.00,
      preco_ton_soja: 2250.00,
      custo_volumoso_dia: 9.00,
      custo_mao_obra_contratada_mes: 5500,
      outros_custos_coe_mes: 5200,
      depreciacao_mes: 3200,
      mao_obra_familiar_mes: 4000,
      custo_oportunidade_capital_mes: 5000
    }
  },
  mastite_e_qualidade_critica: {
    nome: "Fazenda com Crise Sanitária (Mastite & CBT Alta)",
    dados: {
      producao_diaria: 1000,
      total_vacas: 75,
      vacas_lactacao: 52,
      del_medio: 180,
      iep_meses: 13.8,
      taxa_deteccao_cio: 50,
      taxa_concepcao: 30,
      taxa_prenhez: 15.0,
      idade_primeiro_parto_meses: 27,
      taxa_mortalidade_bezerras: 7.0, // Alta mortalidade
      temperatura_ambiente: 28.5, // Gera ITU 79.1 (Estresse Térmico Severo)
      umidade_relativa: 70,
      escore_condicao_corporal: 2.7,
      taxa_claudicacao: 8.5, // Problemas de cascos
      incidencia_mastite_clinica_mes: 6.0, // Mastite clínica severa
      consumo_concentrado_vaca_dia: 7.5,
      relacao_volumoso_concentrado: 50,
      ureia_leite_nul: 13.5,
      ccs: 620, // Mastite subclínica severa (620k)
      cbt: 180, // Falha de resfriamento/tanque (180k)
      gordura_leite: 3.4,
      proteina_leite: 3.0,
      numero_trabalhadores: 2,
      preco_base_leite: 2.45,
      preco_saca_milho: 78.00,
      preco_ton_soja: 2400.00,
      custo_volumoso_dia: 13.50,
      custo_mao_obra_contratada_mes: 8500,
      outros_custos_coe_mes: 10700,
      depreciacao_mes: 5700,
      mao_obra_familiar_mes: 4800,
      custo_oportunidade_capital_mes: 5000
    }
  },
  descapitalizacao_e_milho_caro: {
    nome: "Fazenda em Descapitalização (Ração Cara & IEP Longo)",
    dados: {
      producao_diaria: 950,
      total_vacas: 90,
      vacas_lactacao: 56, // Poucas vacas produzindo (< 65%)
      del_medio: 225, // DEL atrasado
      iep_meses: 15.5, // IEP longo
      taxa_deteccao_cio: 40,
      taxa_concepcao: 28,
      taxa_prenhez: 11.2,
      idade_primeiro_parto_meses: 29.5, // Atraso de novilhas
      taxa_mortalidade_bezerras: 6.0,
      temperatura_ambiente: 26,
      umidade_relativa: 70,
      escore_condicao_corporal: 2.4, // Vacas magras
      taxa_claudicacao: 6.0,
      incidencia_mastite_clinica_mes: 3.5,
      consumo_concentrado_vaca_dia: 7.5,
      relacao_volumoso_concentrado: 48,
      ureia_leite_nul: 8.5, // Deficiência proteica
      ccs: 380,
      cbt: 85,
      gordura_leite: 3.5,
      proteina_leite: 3.1,
      numero_trabalhadores: 3,
      preco_base_leite: 2.38,
      preco_saca_milho: 84.00, // Milho caro
      preco_ton_soja: 2450.00,
      custo_volumoso_dia: 9.80,
      custo_mao_obra_contratada_mes: 6500,
      outros_custos_coe_mes: 5200,
      depreciacao_mes: 3500,
      mao_obra_familiar_mes: 4500,
      custo_oportunidade_capital_mes: 5500
    }
  },
  familiar_a_pasto: {
    nome: "Fazenda Familiar a Pasto (Baixo Desembolso)",
    dados: {
      producao_diaria: 500,
      total_vacas: 40,
      vacas_lactacao: 31,
      del_medio: 170,
      iep_meses: 13.8,
      taxa_deteccao_cio: 58,
      taxa_concepcao: 36,
      taxa_prenhez: 20.8,
      idade_primeiro_parto_meses: 26.5,
      taxa_mortalidade_bezerras: 3.0,
      temperatura_ambiente: 23,
      umidade_relativa: 65,
      escore_condicao_corporal: 2.9,
      taxa_claudicacao: 3.0,
      incidencia_mastite_clinica_mes: 2.0,
      consumo_concentrado_vaca_dia: 3.5,
      relacao_volumoso_concentrado: 75,
      ureia_leite_nul: 11.5,
      ccs: 260,
      cbt: 48,
      gordura_leite: 3.75,
      proteina_leite: 3.20,
      numero_trabalhadores: 1,
      preco_base_leite: 2.42,
      preco_saca_milho: 68.50,
      preco_ton_soja: 2100.00,
      custo_volumoso_dia: 4.50,
      custo_mao_obra_contratada_mes: 0,
      outros_custos_coe_mes: 1800,
      depreciacao_mes: 1200,
      mao_obra_familiar_mes: 3500,
      custo_oportunidade_capital_mes: 2000
    }
  }
};