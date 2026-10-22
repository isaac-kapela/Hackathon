/**
 * InferenceEngine.js
 * Motor de Inferência Determinístico Baseado em Regras e Fatos
 * Desenvolvido para o Hackathon UFJF 2026 - RERUM Engenharia de Sistemas
 */

class InferenceEngine {
  constructor(rulesDatabase, variablesDictionary) {
    this.rules = rulesDatabase.regras || [];
    this.variables = variablesDictionary.variaveis || [];
  }

  /**
   * Avalia uma condição individual de uma regra contra a memória de trabalho
   */
  evaluateCondition(cond, facts) {
    const valorFato = facts[cond.campo];
    if (valorFato === undefined || valorFato === null) {
      return { match: false, valorFato: null };
    }

    let match = false;
    switch (cond.operador) {
      case '==':
        match = valorFato === cond.valor;
        break;
      case '!=':
        match = valorFato !== cond.valor;
        break;
      case '>':
        match = Number(valorFato) > Number(cond.valor);
        break;
      case '>=':
        match = Number(valorFato) >= Number(cond.valor);
        break;
      case '<':
        match = Number(valorFato) < Number(cond.valor);
        break;
      case '<=':
        match = Number(valorFato) <= Number(cond.valor);
        break;
      case 'in':
        match = Array.isArray(cond.valor) && cond.valor.includes(valorFato);
        break;
      default:
        match = false;
    }

    return { match, valorFato };
  }

  /**
   * Combinação de dois Fatores de Certeza (MYCIN Certainty Factor Combination)
   */
  combineCertaintyFactors(cf1, cf2) {
    if (cf1 >= 0 && cf2 >= 0) {
      return cf1 + cf2 * (1 - cf1);
    } else if (cf1 < 0 && cf2 < 0) {
      return cf1 + cf2 * (1 + cf1);
    } else {
      const minAbs = Math.min(Math.abs(cf1), Math.abs(cf2));
      if (minAbs === 1) return 0;
      return (cf1 + cf2) / (1 - minAbs);
    }
  }

  /**
   * Executa o ciclo de inferência sobre os fatos fornecidos
   */
  run(workingMemory) {
    // 1. Resolução de Conflitos: Ordenar regras por prioridade decrescente
    const sortedRules = [...this.rules].sort((a, b) => b.prioridade - a.prioridade);

    const firedRules = [];
    let cumulativeCF = 0;
    let criticalCount = 0;
    let alertCount = 0;
    let successCount = 0;

    for (const rule of sortedRules) {
      const evaluationResults = [];
      let allMatched = true;

      for (const cond of rule.condicoes) {
        const evalRes = this.evaluateCondition(cond, workingMemory);
        evaluationResults.push({
          campo: cond.campo,
          operador: cond.operador,
          valorEsperado: cond.valor,
          valorObservado: evalRes.valorFato,
          satisfeito: evalRes.match
        });

        if (!evalRes.match) {
          allMatched = false;
          break; // Conjunção E (AND)
        }
      }

      if (allMatched) {
        // Regra disparada
        cumulativeCF = this.combineCertaintyFactors(cumulativeCF, rule.cf);

        if (rule.conclusao.status === 'CRITICO') criticalCount++;
        else if (rule.conclusao.status === 'ALERTA') alertCount++;
        else if (rule.conclusao.status === 'SUCESSO') successCount++;

        firedRules.push({
          id: rule.id,
          nome: rule.nome,
          prioridade: rule.prioridade,
          cf: rule.cf,
          categoria: rule.categoria,
          condicoesAvaliadas: evaluationResults,
          conclusao: rule.conclusao
        });
      }
    }

    // Determina o status geral da propriedade com balanceamento hierárquico
    let statusGeral = 'SAUDAVEL';
    if (criticalCount > 0) {
      statusGeral = 'CRITICO';
    } else if (alertCount > 0 && alertCount > successCount) {
      statusGeral = 'ALERTA';
    } else if (alertCount > 0 && successCount >= alertCount && alertCount >= 2) {
      statusGeral = 'ALERTA';
    } else {
      statusGeral = 'SAUDAVEL';
    }

    return {
      timestamp: new Date().toISOString(),
      statusGeral,
      fatorCertezaGeral: Number(cumulativeCF.toFixed(2)),
      totalRegrasAvaliadas: this.rules.length,
      totalRegrasDisparadas: firedRules.length,
      criticalCount,
      alertCount,
      successCount,
      regrasDisparadas: firedRules,
      memoriaTrabalho: workingMemory
    };
  }
}

module.exports = InferenceEngine;