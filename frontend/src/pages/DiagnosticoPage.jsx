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
import DashboardCharts from '../components/DashboardCharts';
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
    // Permite string vazia "" durante a digitação para não travar o zero
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
    // Higieniza campos vazios convertendo "" para 0 antes da inferência
    const dadosHigienizados = {};
    for (const [key, val] of Object.entries(dados)) {
      dadosHigienizados[key] = (val === '' || val === null || val === undefined) ? 0 : Number(val);
    }

    try {
      const data = await apiService.executarDiagnostico(dadosHigienizados);
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
    <div className="space-y-8 pb-16">
      
      {/* Barra de Presets Rápidos com Estilo Hero Moderno e Responsivo */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-slate-700/60 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-amber-400/10 border border-amber-400/20 rounded-2xl text-amber-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Cenários Práticos de Referência</span>
              <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700 text-slate-300">Benchmarks</span>
            </div>
            <p className="text-sm text-slate-300 mt-0.5">Selecione um perfil de fazenda para carregar parâmetros e auditar o motor de inferência:</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto">
          {Object.entries(presets).map(([key, item]) => {
            const isSelected = selectedPresetKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => aplicarPreset(key)}
                className={`px-4 py-2.5 text-xs font-bold rounded-2xl transition-all shadow-sm flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white ring-2 ring-emerald-400 shadow-lg shadow-emerald-950/50'
                    : 'bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white'
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
            className="px-4 py-2.5 text-xs font-bold rounded-2xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white flex items-center gap-2 transition-all"
            title="Restaurar parâmetros padrão"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Padrão</span>
          </button>
        </div>
      </div>

      {/* Grid Principal: Formulário + Painel Especialista */}
      <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-8 items-start">
        
        {/* Formulário de Parâmetros da Fazenda (4 colunas no widescreen) */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6 sticky top-24">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2.5">
                <Sliders className="w-5 h-5 text-emerald-600" />
                Parâmetros da Fazenda
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Indicadores zootécnicos, qualidade e custos</p>
            </div>

            <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 shrink-0">
              Motor Ativo
            </span>
          </div>

          {/* Abas do Formulário */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl text-xs font-bold text-slate-600">
            <button
              type="button"
              onClick={() => setActiveFormTab('zootecnia')}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                activeFormTab === 'zootecnia' ? 'bg-white text-emerald-700 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Zootecnia</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFormTab('qualidade')}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                activeFormTab === 'qualidade' ? 'bg-white text-cyan-700 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              <Droplets className="w-4 h-4" />
              <span>Qualidade</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFormTab('custos')}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                activeFormTab === 'custos' ? 'bg-white text-indigo-700 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Custos</span>
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); executarDiagnostico(); }} className="space-y-5">
            
            {/* Aba 1: Zootecnia */}
            {activeFormTab === 'zootecnia' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      Produção Diária (L/dia)
                    </label>
                    <input
                      type="number"
                      value={formData.producao_diaria}
                      onChange={(e) => handleInputChange('producao_diaria', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      Total de Vacas
                    </label>
                    <input
                      type="number"
                      value={formData.total_vacas}
                      onChange={(e) => handleInputChange('total_vacas', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      Vacas em Lactação
                    </label>
                    <input
                      type="number"
                      value={formData.vacas_lactacao}
                      onChange={(e) => handleInputChange('vacas_lactacao', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">Meta: ≥ 80% do rebanho</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      DEL Médio (dias)
                    </label>
                    <input
                      type="number"
                      value={formData.del_medio}
                      onChange={(e) => handleInputChange('del_medio', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">Meta: 150 a 180 d</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      IEP Médio (meses)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.iep_meses}
                      onChange={(e) => handleInputChange('iep_meses', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">Meta: 12.5 a 13.5 m</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      Taxa de Prenhez (%)
                    </label>
                    <input
                      type="number"
                      value={formData.taxa_prenhez}
                      onChange={(e) => handleInputChange('taxa_prenhez', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">Meta: ≥ 20%</span>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-slate-700 font-bold mb-1.5">
                      Consumo Ração Concentrada (kg/vaca/dia)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.consumo_concentrado_vaca_dia}
                      onChange={(e) => handleInputChange('consumo_concentrado_vaca_dia', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">Base para conversão alimentar (L de leite / kg ração)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Aba 2: Qualidade */}
            {activeFormTab === 'qualidade' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      CCS (mil céls/mL)
                    </label>
                    <input
                      type="number"
                      value={formData.ccs}
                      onChange={(e) => handleInputChange('ccs', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">IN 76/77: ≤ 500k</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      CBT (mil UFC/mL)
                    </label>
                    <input
                      type="number"
                      value={formData.cbt}
                      onChange={(e) => handleInputChange('cbt', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">IN 76/77: ≤ 300k (Bônus &lt; 50k)</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      Gordura (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.gordura_leite}
                      onChange={(e) => handleInputChange('gordura_leite', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">Padrão: ≥ 3.5%</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      Proteína (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.proteina_leite}
                      onChange={(e) => handleInputChange('proteina_leite', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">Padrão: ≥ 3.1%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Aba 3: Custos & Mercado */}
            {activeFormTab === 'custos' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      Preço Base (R$/L)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.preco_base_leite}
                      onChange={(e) => handleInputChange('preco_base_leite', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      Saca Milho (R$/60kg)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.preco_saca_milho}
                      onChange={(e) => handleInputChange('preco_saca_milho', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      Volumoso (R$/vaca/dia)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.custo_volumoso_dia}
                      onChange={(e) => handleInputChange('custo_volumoso_dia', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      Mão de Obra (R$/mês)
                    </label>
                    <input
                      type="number"
                      value={formData.custo_mao_obra_contratada_mes}
                      onChange={(e) => handleInputChange('custo_mao_obra_contratada_mes', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      Depreciação (R$/mês)
                    </label>
                    <input
                      type="number"
                      value={formData.depreciacao_mes}
                      onChange={(e) => handleInputChange('depreciacao_mes', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      Mão de Obra Fam. (R$/mês)
                    </label>
                    <input
                      type="number"
                      value={formData.mao_obra_familiar_mes}
                      onChange={(e) => handleInputChange('mao_obra_familiar_mes', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-black rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2.5 text-xs uppercase tracking-wider mt-4 hover:shadow-slate-900/30 active:scale-[0.99]"
            >
              <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              {loading ? 'Processando Inferência...' : 'Executar Diagnóstico & Simulação'}
            </button>
          </form>
        </div>

        {/* Painel de Resultados do Sistema Especialista (8 colunas no widescreen) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          
          {/* Header de Status Geral do Diagnóstico */}
          {resultado && (
            <div className="space-y-6">
              <CertaintyFactorGauge 
                statusGeral={resultado.statusGeral} 
                cf={resultado.fatorCertezaGeral} 
                totalRegrasDisparadas={resultado.totalRegrasDisparadas}
              />

              {/* Grid de KPIs Reutilizáveis com Metas */}
              {indicadores && (
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
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
                className="px-5 py-3 text-xs font-bold text-slate-800 bg-white border border-slate-200/90 hover:bg-slate-50 shadow-sm rounded-2xl flex items-center gap-2.5 transition-all hover:shadow hover:-translate-y-0.5"
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Emitir Laudo Técnico Especialista</span>
              </button>
            </div>
          )}

          {/* Painel Gráfico Interativo com Recharts */}
          {indicadores && (
            <DashboardCharts 
              indicadores={indicadores} 
              formData={formData} 
            />
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
