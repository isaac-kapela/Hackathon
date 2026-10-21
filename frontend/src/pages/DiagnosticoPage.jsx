import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Activity, 
  DollarSign, 
  Droplets, 
  TrendingUp, 
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';
import CertaintyFactorGauge from '../components/CertaintyFactorGauge';
import ExplanationModule from '../components/ExplanationModule';
import KpiCard from '../components/KpiCard';
import WorkingMemoryInspector from '../components/WorkingMemoryInspector';
import ReportExportModal from '../components/ReportExportModal';
import { apiService } from '../services/api';

const INITIAL_FORM = {
  producao_diaria: 1200,
  total_vacas: 80,
  vacas_lactacao: 64,
  del_medio: 165,
  iep_meses: 13.2,
  taxa_prenhez: 22,
  consumo_concentrado_vaca_dia: 6.0,
  ccs: 280,
  cbt: 45,
  gordura_leite: 3.7,
  proteina_leite: 3.2,
  preco_base_leite: 2.45,
  preco_saca_milho: 68.50,
  preco_ton_soja: 2100.00,
  custo_volumoso_dia: 8.50,
  custo_mao_obra_contratada_mes: 6000,
  outros_custos_coe_mes: 4200,
  depreciacao_mes: 3200,
  mao_obra_familiar_mes: 4000,
  custo_oportunidade_capital_mes: 5000
};

export default function DiagnosticoPage() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [presets, setPresets] = useState({});
  const [resultado, setResultado] = useState(null);
  const [indicadores, setIndicadores] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  // Carregar presets ao montar
  useEffect(() => {
    apiService.obterPresets()
      .then(data => {
        if (data.sucesso) setPresets(data.presets);
      })
      .catch(err => console.error('Erro ao carregar presets:', err));

    // Executar primeiro diagnóstico inicial
    executarDiagnostico(INITIAL_FORM);
  }, []);

  const handleInputChange = (field, value) => {
    const updated = { ...formData, [field]: Number(value) };
    setFormData(updated);
  };

  const aplicarPreset = (key) => {
    if (presets[key]) {
      const presetData = presets[key].dados;
      setFormData(presetData);
      executarDiagnostico(presetData);
    }
  };

  const executarDiagnostico = async (dados = formData) => {
    setLoading(true);
    try {
      const data = await apiService.executarDiagnostico(dados);
      if (data.sucesso) {
        setResultado(data.resultado);
        setIndicadores(data.indicadores);
      }
    } catch (err) {
      console.error('Erro ao executar diagnóstico:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Barra de Presets Rápidos */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-md border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-semibold text-slate-200">Cenários de Teste Rápidos (Demonstração):</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(presets).map(([key, item]) => (
            <button
              key={key}
              onClick={() => aplicarPreset(key)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-emerald-600 border border-slate-700 text-slate-200 hover:text-white transition-all shadow-sm"
            >
              {item.nome.split('(')[0]}
            </button>
          ))}
          <button
            onClick={() => {
              setFormData(INITIAL_FORM);
              executarDiagnostico(INITIAL_FORM);
            }}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white flex items-center gap-1 transition-all"
            title="Restaurar padrão"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Padrão
          </button>
        </div>
      </div>

      {/* Grid Principal: Formulário + Resultados */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Formulário de Parâmetros da Fazenda (5 colunas) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                Parâmetros da Fazenda
              </h2>
              <p className="text-xs text-slate-500">Ajuste os dados técnicos para disparar a inferência</p>
            </div>
            <button
              onClick={() => executarDiagnostico()}
              disabled={loading}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Play className="w-4 h-4" />
              {loading ? 'Calculando...' : 'Avaliar'}
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); executarDiagnostico(); }} className="space-y-6">
            
            {/* Bloco 1: Zootecnia */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-indigo-500" />
                1. Rebanho e Zootecnia
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Produção Diária (L/dia)</label>
                  <input
                    type="number"
                    value={formData.producao_diaria}
                    onChange={(e) => handleInputChange('producao_diaria', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Total de Vacas</label>
                  <input
                    type="number"
                    value={formData.total_vacas}
                    onChange={(e) => handleInputChange('total_vacas', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Vacas em Lactação</label>
                  <input
                    type="number"
                    value={formData.vacas_lactacao}
                    onChange={(e) => handleInputChange('vacas_lactacao', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">DEL Médio (dias)</label>
                  <input
                    type="number"
                    value={formData.del_medio}
                    onChange={(e) => handleInputChange('del_medio', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">IEP Médio (meses)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.iep_meses}
                    onChange={(e) => handleInputChange('iep_meses', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Consumo Ração (kg/dia)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.consumo_concentrado_vaca_dia}
                    onChange={(e) => handleInputChange('consumo_concentrado_vaca_dia', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Bloco 2: Qualidade do Leite */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-cyan-500" />
                2. Qualidade do Leite (MAPA IN 76/77)
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">CCS (mil céls/mL)</label>
                  <input
                    type="number"
                    value={formData.ccs}
                    onChange={(e) => handleInputChange('ccs', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">CBT (mil UFC/mL)</label>
                  <input
                    type="number"
                    value={formData.cbt}
                    onChange={(e) => handleInputChange('cbt', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Gordura (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.gordura_leite}
                    onChange={(e) => handleInputChange('gordura_leite', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Proteína (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.proteina_leite}
                    onChange={(e) => handleInputChange('proteina_leite', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Bloco 3: Custos e Preços */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                3. Custos e Cotações (Embrapa / CEPEA)
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Preço Base Leite (R$/L)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.preco_base_leite}
                    onChange={(e) => handleInputChange('preco_base_leite', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Saca Milho (R$/60kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.preco_saca_milho}
                    onChange={(e) => handleInputChange('preco_saca_milho', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Volumoso (R$/vaca/dia)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.custo_volumoso_dia}
                    onChange={(e) => handleInputChange('custo_volumoso_dia', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Mão de Obra (R$/mês)</label>
                  <input
                    type="number"
                    value={formData.custo_mao_obra_contratada_mes}
                    onChange={(e) => handleInputChange('custo_mao_obra_contratada_mes', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Depreciação (R$/mês)</label>
                  <input
                    type="number"
                    value={formData.depreciacao_mes}
                    onChange={(e) => handleInputChange('depreciacao_mes', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Mão de Obra Fam. (R$/mês)</label>
                  <input
                    type="number"
                    value={formData.mao_obra_familiar_mes}
                    onChange={(e) => handleInputChange('mao_obra_familiar_mes', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              {loading ? 'Processando Regras...' : 'Reavaliar Rebanho e Custos'}
            </button>
          </form>
        </div>

        {/* Painel de Resultados do Sistema Especialista (7 colunas) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header de Status Geral do Diagnóstico */}
          {resultado && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status Consolidado do Rebanho</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-0.5">Diagnóstico Especialista</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowReportModal(true)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-slate-600" />
                    Gerar Laudo
                  </button>
                  <CertaintyFactorGauge 
                    cf={resultado.fator_certeza_geral} 
                    status={resultado.status_geral} 
                  />
                </div>
              </div>

              {/* Grid de KPIs Reutilizáveis */}
              {indicadores && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                  <KpiCard
                    title="Margem Bruta"
                    value={`R$ ${indicadores.margem_bruta_litro.toFixed(2)}`}
                    unit="/ L"
                    subtitle="Receita líquida - COE"
                    alertType={indicadores.margem_bruta_litro > 0 ? 'success' : 'danger'}
                    icon={DollarSign}
                  />

                  <KpiCard
                    title="Margem Líquida"
                    value={`R$ ${indicadores.margem_liquida_litro.toFixed(2)}`}
                    unit="/ L"
                    subtitle="Receita líquida - COT"
                    alertType={indicadores.margem_liquida_litro > 0 ? 'success' : 'warning'}
                    icon={TrendingUp}
                  />

                  <KpiCard
                    title="DEL Médio"
                    value={indicadores.del_medio}
                    unit="dias"
                    subtitle="Meta: 150 a 180 d"
                    alertType={indicadores.del_medio <= 180 ? 'success' : 'warning'}
                    icon={Activity}
                  />

                  <KpiCard
                    title="Eficiência Ração"
                    value={indicadores.eficiencia_alimentar.toFixed(2)}
                    unit="L / kg"
                    subtitle="Leite por kg de concentrado"
                    alertType={indicadores.eficiencia_alimentar >= 2.2 ? 'success' : 'warning'}
                    icon={Droplets}
                  />
                </div>
              )}
            </div>
          )}

          {/* Módulo de Explicação - Requisito Mandatório do Hackathon */}
          {resultado && (
            <ExplanationModule 
              conclusoes={resultado.conclusoes}
              auditTrail={resultado.audit_trail}
              indicadores={indicadores}
            />
          )}

          {/* Inspecionar Fatos na Memória de Trabalho */}
          {indicadores && (
            <WorkingMemoryInspector workingMemory={indicadores} />
          )}

        </div>
      </div>

      {/* Modal de Laudo Técnico */}
      <ReportExportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        resultado={resultado}
        indicadores={indicadores}
      />
    </div>
  );
}
