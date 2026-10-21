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
  FileText,
  Sliders,
  CheckCircle2,
  Info
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
  const [selectedPresetKey, setSelectedPresetKey] = useState(null);
  const [activeFormTab, setActiveFormTab] = useState('zootecnia');
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
    setSelectedPresetKey(null);
    const updated = { ...formData, [field]: Number(value) };
    setFormData(updated);
  };

  const aplicarPreset = (key) => {
    if (presets[key]) {
      setSelectedPresetKey(key);
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
      
      {/* Barra de Presets Rápidos com Estilo Hero Moderno */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 rounded-3xl shadow-xl border border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-amber-400/10 border border-amber-400/20 rounded-2xl text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Cenários de Teste Rápidos</span>
            <p className="text-sm font-semibold text-slate-200">Selecione um caso prático para validar as regras do motor:</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(presets).map(([key, item]) => {
            const isSelected = selectedPresetKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => aplicarPreset(key)}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-emerald-500 text-white ring-2 ring-emerald-400 shadow-emerald-950/50'
                    : 'bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <span>{item.nome.split('(')[0]}</span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => {
              setSelectedPresetKey(null);
              setFormData(INITIAL_FORM);
              executarDiagnostico(INITIAL_FORM);
            }}
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white flex items-center gap-1.5 transition-all"
            title="Restaurar padrão inicial"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Padrão</span>
          </button>
        </div>
      </div>

      {/* Grid Principal: Formulário + Painel Especialista */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Formulário de Parâmetros da Fazenda (5 colunas) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-600" />
                Variáveis da Propriedade
              </h2>
              <p className="text-xs text-slate-500">Dados zootécnicos, sanitários e econômicos</p>
            </div>
            
            <button
              type="button"
              onClick={() => executarDiagnostico()}
              disabled={loading}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-900/20 flex items-center gap-1.5 transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              {loading ? 'Processando...' : 'Avaliar Agora'}
            </button>
          </div>

          {/* Abas do Formulário */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
            <button
              type="button"
              onClick={() => setActiveFormTab('zootecnia')}
              className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center space-x-1 ${
                activeFormTab === 'zootecnia' ? 'bg-white text-emerald-700 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Zootecnia</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFormTab('qualidade')}
              className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center space-x-1 ${
                activeFormTab === 'qualidade' ? 'bg-white text-cyan-700 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Qualidade</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFormTab('custos')}
              className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center space-x-1 ${
                activeFormTab === 'custos' ? 'bg-white text-indigo-700 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Custos</span>
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); executarDiagnostico(); }} className="space-y-4">
            
            {/* Aba 1: Zootecnia */}
            {activeFormTab === 'zootecnia' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Produção Diária (L/dia)
                    </label>
                    <input
                      type="number"
                      value={formData.producao_diaria}
                      onChange={(e) => handleInputChange('producao_diaria', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Total de Vacas
                    </label>
                    <input
                      type="number"
                      value={formData.total_vacas}
                      onChange={(e) => handleInputChange('total_vacas', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Vacas em Lactação
                    </label>
                    <input
                      type="number"
                      value={formData.vacas_lactacao}
                      onChange={(e) => handleInputChange('vacas_lactacao', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400">Meta: ≥ 80% do total</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      DEL Médio (dias)
                    </label>
                    <input
                      type="number"
                      value={formData.del_medio}
                      onChange={(e) => handleInputChange('del_medio', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400">Meta: 150 a 180 d</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      IEP Médio (meses)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.iep_meses}
                      onChange={(e) => handleInputChange('iep_meses', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400">Meta: 12.5 a 13.5 m</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Taxa de Prenhez (%)
                    </label>
                    <input
                      type="number"
                      value={formData.taxa_prenhez}
                      onChange={(e) => handleInputChange('taxa_prenhez', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400">Meta: ≥ 20%</span>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-slate-700 font-semibold mb-1">
                      Consumo Ração Concentrada (kg/vaca/dia)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.consumo_concentrado_vaca_dia}
                      onChange={(e) => handleInputChange('consumo_concentrado_vaca_dia', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400">Utilizado no cálculo de eficiência alimentar</span>
                  </div>
                </div>
              </div>
            )}

            {/* Aba 2: Qualidade */}
            {activeFormTab === 'qualidade' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      CCS (mil céls/mL)
                    </label>
                    <input
                      type="number"
                      value={formData.ccs}
                      onChange={(e) => handleInputChange('ccs', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400">IN 76/77: ≤ 500k</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      CBT (mil UFC/mL)
                    </label>
                    <input
                      type="number"
                      value={formData.cbt}
                      onChange={(e) => handleInputChange('cbt', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400">IN 76/77: ≤ 300k (Bônus: &lt; 50k)</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Gordura (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.gordura_leite}
                      onChange={(e) => handleInputChange('gordura_leite', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400">Padrão: ≥ 3.5%</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Proteína (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.proteina_leite}
                      onChange={(e) => handleInputChange('proteina_leite', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400">Padrão: ≥ 3.1%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Aba 3: Custos & Mercado */}
            {activeFormTab === 'custos' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Preço Base Leite (R$/L)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.preco_base_leite}
                      onChange={(e) => handleInputChange('preco_base_leite', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Saca Milho (R$/60kg)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.preco_saca_milho}
                      onChange={(e) => handleInputChange('preco_saca_milho', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Volumoso (R$/vaca/dia)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.custo_volumoso_dia}
                      onChange={(e) => handleInputChange('custo_volumoso_dia', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Mão de Obra (R$/mês)
                    </label>
                    <input
                      type="number"
                      value={formData.custo_mao_obra_contratada_mes}
                      onChange={(e) => handleInputChange('custo_mao_obra_contratada_mes', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Depreciação (R$/mês)
                    </label>
                    <input
                      type="number"
                      value={formData.depreciacao_mes}
                      onChange={(e) => handleInputChange('depreciacao_mes', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Mão de Obra Fam. (R$/mês)
                    </label>
                    <input
                      type="number"
                      value={formData.mao_obra_familiar_mes}
                      onChange={(e) => handleInputChange('mao_obra_familiar_mes', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              {loading ? 'Processando Inferência...' : 'Reavaliar Rebanho e Custos'}
            </button>
          </form>
        </div>

        {/* Painel de Resultados do Sistema Especialista (7 colunas) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header de Status Geral do Diagnóstico */}
          {resultado && (
            <div className="space-y-4">
              <CertaintyFactorGauge 
                statusGeral={resultado.statusGeral} 
                cf={resultado.fatorCertezaGeral} 
                totalRegrasDisparadas={resultado.totalRegrasDisparadas}
              />

              {/* Grid de KPIs Reutilizáveis com Metas */}
              {indicadores && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <KpiCard
                    title="Margem Bruta"
                    value={`R$ ${indicadores.margem_bruta_litro !== undefined ? indicadores.margem_bruta_litro.toFixed(2) : '0.00'}`}
                    unit="/ L"
                    subtitle="Receita líquida - COE"
                    targetText="Meta: > R$ 0,50"
                    alertType={indicadores.margem_bruta_litro > 0 ? 'success' : 'danger'}
                    icon={DollarSign}
                  />

                  <KpiCard
                    title="Margem Líquida"
                    value={`R$ ${indicadores.margem_liquida_litro !== undefined ? indicadores.margem_liquida_litro.toFixed(2) : '0.00'}`}
                    unit="/ L"
                    subtitle="Receita líquida - COT"
                    targetText="Meta: > R$ 0,25"
                    alertType={indicadores.margem_liquida_litro > 0 ? 'success' : 'warning'}
                    icon={TrendingUp}
                  />

                  <KpiCard
                    title="DEL Médio"
                    value={indicadores.del_medio || 0}
                    unit="dias"
                    subtitle="Lactação do Rebanho"
                    targetText="150 a 180 d"
                    alertType={indicadores.del_medio <= 180 ? 'success' : 'warning'}
                    icon={Activity}
                  />

                  <KpiCard
                    title="Eficiência Ração"
                    value={indicadores.eficiencia_alimentar !== undefined ? indicadores.eficiencia_alimentar.toFixed(2) : '0.00'}
                    unit="L / kg"
                    subtitle="Conversão Alimentar"
                    targetText="Meta: ≥ 2.2"
                    alertType={indicadores.eficiencia_alimentar >= 2.2 ? 'success' : 'warning'}
                    icon={Droplets}
                  />
                </div>
              )}
            </div>
          )}

          {/* Botão de Laudo Técnico */}
          {resultado && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowReportModal(true)}
                className="px-4 py-2.5 text-xs font-bold text-slate-800 bg-white border border-slate-200/90 hover:bg-slate-50 shadow-sm rounded-2xl flex items-center gap-2 transition-all hover:shadow"
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Emitir Laudo Técnico Especialista</span>
              </button>
            </div>
          )}

          {/* Módulo de Explicação - Requisito Mandatório do Hackathon */}
          {resultado && (
            <ExplanationModule 
              regrasDisparadas={resultado.regrasDisparadas || []}
              memoriaTrabalho={indicadores || {}}
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
