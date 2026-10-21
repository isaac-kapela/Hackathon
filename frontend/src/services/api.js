/**
 * api.js
 * Cliente HTTP para comunicação com a API REST do Backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.erro || `Erro HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

export const apiService = {
  /**
   * Executa a inferência e cálculo de indicadores
   */
  async executarDiagnostico(dadosFazenda) {
    const response = await fetch(`${API_BASE_URL}/diagnostico`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosFazenda)
    });
    return handleResponse(response);
  },

  /**
   * Obtém a lista de regras da base de conhecimento
   */
  async obterRegras() {
    const response = await fetch(`${API_BASE_URL}/conhecimento/regras`);
    return handleResponse(response);
  },

  /**
   * Obtém o dicionário de variáveis
   */
  async obterVariaveis() {
    const response = await fetch(`${API_BASE_URL}/conhecimento/variaveis`);
    return handleResponse(response);
  },

  /**
   * Obtém cotações e benchmarks de mercado (CEPEA / IBGE)
   */
  async obterBenchmarksMercado() {
    const response = await fetch(`${API_BASE_URL}/mercado/benchmarks`);
    return handleResponse(response);
  },

  /**
   * Obtém a lista de presets pré-configurados
   */
  async obterPresets() {
    const response = await fetch(`${API_BASE_URL}/presets`);
    return handleResponse(response);
  }
};
