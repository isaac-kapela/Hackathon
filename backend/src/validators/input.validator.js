/**
 * input.validator.js
 * Validação de integridade dos parâmetros zootécnicos e econômicos
 */

function validateDiagnosticoInput(data) {
  const errors = [];

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['O corpo da requisição deve ser um objeto JSON válido.'] };
  }

  // Validações zootécnicas básicas
  if (data.total_vacas !== undefined && data.vacas_lactacao !== undefined) {
    if (Number(data.vacas_lactacao) > Number(data.total_vacas)) {
      errors.push('O número de vacas em lactação não pode ser maior que o total de vacas adultas.');
    }
  }

  if (data.producao_diaria !== undefined && Number(data.producao_diaria) <= 0) {
    errors.push('A produção diária total deve ser maior que zero.');
  }

  if (data.ccs !== undefined && Number(data.ccs) < 0) {
    errors.push('A CCS (Contagem de Células Somáticas) não pode ser negativa.');
  }

  if (data.cbt !== undefined && Number(data.cbt) < 0) {
    errors.push('A CBT (Contagem Bacteriana Total) não pode ser negativa.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateDiagnosticoInput
};
