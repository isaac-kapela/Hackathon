/**
 * input.validator.js
 * Validação rigorosa de integridade zootécnica e consistência de parâmetros
 * Bloqueia casos impossíveis (ex: vacas em lactação > total de vacas, porcentagens fora de 0-100, etc.)
 */

function validateDiagnosticoInput(data) {
  const errors = [];

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['O corpo da requisição deve ser um objeto JSON válido.'] };
  }

  const totalVacas = Number(data.total_vacas !== undefined ? data.total_vacas : 0);
  const vacasLactacao = Number(data.vacas_lactacao !== undefined ? data.vacas_lactacao : 0);
  const producaoDiaria = Number(data.producao_diaria !== undefined ? data.producao_diaria : 0);

  // 1. Consistência de Estrutura do Rebanho
  if (totalVacas < 0) {
    errors.push('O total de vacas não pode ser negativo.');
  }

  if (vacasLactacao < 0) {
    errors.push('O número de vacas em lactação não pode ser negativo.');
  }

  if (vacasLactacao > totalVacas) {
    errors.push(`Inconsistência zootécnica: Você informou ${vacasLactacao} vacas em lactação para um total de apenas ${totalVacas} vacas adultas.`);
  }

  if (totalVacas === 0 && vacasLactacao > 0) {
    errors.push('Não é possível ter vacas em lactação com o rebanho total zerado.');
  }

  if (vacasLactacao === 0 && producaoDiaria > 0) {
    errors.push('Inconsistência: Não é possível ter produção diária de leite (> 0L) com 0 vacas em lactação.');
  }

  if (producaoDiaria < 0) {
    errors.push('A produção diária total de leite não pode ser negativa.');
  }

  // 2. Limites Físicos e Biológicos (0 a 100%)
  const camposPercentuais = [
    { campo: 'umidade_relativa', label: 'Umidade Relativa' },
    { campo: 'relacao_volumoso_concentrado', label: 'Proporção de Volumoso na Dieta' },
    { campo: 'taxa_deteccao_cio', label: 'Taxa de Detecção de Cio' },
    { campo: 'taxa_concepcao', label: 'Taxa de Concepção' },
    { campo: 'taxa_prenhez', label: 'Taxa de Prenhez' },
    { campo: 'taxa_claudicacao', label: 'Taxa de Claudicação / Problemas de Casco' },
    { campo: 'incidencia_mastite_clinica_mes', label: 'Incidência de Mastite Clínica' },
    { campo: 'taxa_mortalidade_bezerras', label: 'Taxa de Mortalidade de Bezerras' }
  ];

  for (const { campo, label } of camposPercentuais) {
    if (data[campo] !== undefined && data[campo] !== '') {
      const val = Number(data[campo]);
      if (val < 0 || val > 100) {
        errors.push(`${label} deve estar no intervalo biológico de 0% a 100% (informado: ${val}%).`);
      }
    }
  }

  // 3. Escore de Condição Corporal (Escala 1.0 a 5.0)
  if (data.escore_condicao_corporal !== undefined && data.escore_condicao_corporal !== '') {
    const ecc = Number(data.escore_condicao_corporal);
    if (ecc < 1.0 || ecc > 5.0) {
      errors.push(`O Escore de Condição Corporal (ECC) deve estar na escala de 1.0 a 5.0 (informado: ${ecc}).`);
    }
  }

  // 4. Sanidade e Qualidade (Valores não negativos)
  if (data.ccs !== undefined && Number(data.ccs) < 0) {
    errors.push('A Contagem de Células Somáticas (CCS) não pode ser negativa.');
  }

  if (data.cbt !== undefined && Number(data.cbt) < 0) {
    errors.push('A Contagem Bacteriana Total (CBT) não pode ser negativa.');
  }

  // 5. Mão de Obra e Economia
  if (data.numero_trabalhadores !== undefined && Number(data.numero_trabalhadores) < 0) {
    errors.push('O número de trabalhadores não pode ser negativo.');
  }

  if (data.preco_base_leite !== undefined && Number(data.preco_base_leite) < 0) {
    errors.push('O preço base do leite não pode ser negativo.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateDiagnosticoInput
};
