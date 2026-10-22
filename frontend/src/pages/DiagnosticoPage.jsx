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
  Info,
  Thermometer,
  HeartPulse,
  Wheat,
  Users,
  Award,
  AlertTriangle,
  Scale
} from 'lucide-react';
import CertaintyFactorGauge from '../components/CertaintyFactorGauge';
import ExplanationModule from '../components/ExplanationModule';
import KpiCard from '../components/KpiCard';
import DashboardCharts from '../components/DashboardCharts';
import WorkingMemoryInspector from '../components/WorkingMemoryInspector';
import ReportExportModal from '../components/ReportExportModal';
import { apiService } from '../services/api';

const INITIAL_FORM = {
  // Zootecnia
  producao_diaria: 1200,
  total_vacas: 80,
  vacas_lactacao: 64,
  del_medio: 165,
  iep_meses: 13.2,
  taxa_deteccao_cio: 60,
  taxa_concepcao: 38,
  taxa_prenhez: 22.8,
  idade_primeiro_parto_meses: 25,
  taxa_mortalidade_bezerras: 3.0,
  
  // Ambiência & Conforto
  temperatura_ambiente: 24,
  umidade_relativa: 68,
  
  // Saúde & Bem-Estar
  escore_condicao_corporal: 3.0,
  taxa_claudicacao: 4.0,
  incidencia_mastite_clinica_mes: 2.0,
  
  // Nutrição
  consumo_concentrado_vaca_dia: 6.0,
  relacao_volumoso_concentrado: 60,
  ureia_leite_nul: 12.5,
  
  // Qualidade
  ccs: 280,
  cbt: 45,
  gordura_leite: 3.7,
  proteina_leite: 3.2,
  
  // Mão de Obra e Custos
  numero_trabalhadores: 2,
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

  // Micro-cálculos ao vivo para feedback instantâneo no formulário
  const tempNum = Number(formData.temperatura_ambiente || 24);
  const umidNum = Number(formData.umidade_relativa || 68);
  const liveITU = Number(((0.8 * tempNum) + ((umidNum / 100) * (tempNum - 14.4)) + 46.4).toFixed(1));
  
  const totalV = Number(formData.total_vacas || 1);
  const lactV = Number(formData.vacas_lactacao || 0);
  const livePercLact = totalV > 0 ? Number(((lactV / totalV) * 100).toFixed(1)) : 0;

  const detCio = Number(formData.taxa_deteccao_cio || 60);
  const txConc = Number(formData.taxa_concepcao || 38);
  const liveTXP = Number(((detCio * txConc) / 100).toFixed(1));

  const prodD = Number(formData.producao_diaria || 1200);
  const numTrab = Math.max(1, Number(formData.numero_trabalhadores || 1));
  const liveProdTrab = Math.round(prodD / numTrab);

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
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Cenários de Demonstração & Benchmarks</span>
              <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700 text-slate-300">Embrapa & MAPA</span>
            </div>
            <p className="text-sm text-slate-300 mt-0.5">Selecione um perfil de fazenda para auditar a sensibilidade do sistema especialista:</p>
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
                className={`px-3.5 py-2.5 text-xs font-bold rounded-2xl transition-all shadow-sm flex items-center space-x-2 ${
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
            className="px-3.5 py-2.5 text-xs font-bold rounded-2xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white flex items-center gap-2 transition-all"
            title="Restaurar parâmetros padrão"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Padrão</span>
          </button>
        </div>
      </div>

      {/* Grid Principal: Formulário + Painel Especialista */}
      <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-8 items-start">
        
        {/* Formulário de Parâmetros da Fazenda (5 colunas) */}
        <div className="lg:col-span-5 xl:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6 sticky top-24">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2.5">
                <Sliders className="w-5 h-5 text-emerald-600" />
                Parâmetros Zootécnicos & Custos
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Indicadores do rebanho, ambiência, nutrição e financeiro</p>
            </div>

            <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shrink-0">
              25 Regras Ativas
            </span>
          </div>

          {/* Abas do Formulário */}
          <div className="grid grid-cols-2 sm:grid-cols-4 bg-slate-100 p-1.5 rounded-2xl text-[11px] font-bold text-slate-600 gap-1">
            <button
              type="button"
              onClick={() => setActiveFormTab('zootecnia')}
              className={`py-2 px-1 rounded-xl transition-all flex items-center justify-center space-x-1 ${
                activeFormTab === 'zootecnia' ? 'bg-white text-emerald-700 shadow-sm font-black' : 'hover:text-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Rebanho</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFormTab('conforto')}
              className={`py-2 px-1 rounded-xl transition-all flex items-center justify-center space-x-1 ${
                activeFormTab === 'conforto' ? 'bg-white text-orange-700 shadow-sm font-black' : 'hover:text-slate-900'
              }`}
            >
              <Thermometer className="w-3.5 h-3.5" />
              <span>Conforto/ITU</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFormTab('nutricao_qualidade')}
              className={`py-2 px-1 rounded-xl transition-all flex items-center justify-center space-x-1 ${
                activeFormTab === 'nutricao_qualidade' ? 'bg-white text-cyan-700 shadow-sm font-black' : 'hover:text-slate-900'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Qualidade</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFormTab('custos')}
              className={`py-2 px-1 rounded-xl transition-all flex items-center justify-center space-x-1 ${
                activeFormTab === 'custos' ? 'bg-white text-indigo-700 shadow-sm font-black' : 'hover:text-slate-900'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Custos/Equipe</span>
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); executarDiagnostico(); }} className="space-y-5">
            
            {/* Aba 1: Rebanho & Zootecnia */}
            {activeFormTab === 'zootecnia' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Produção Diária (L/dia)
                    </label>
                    <input
                      type="number"
                      value={formData.producao_diaria}
                      onChange={(e) => handleInputChange('producao_diaria', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Total Vacas Adultas
                    </label>
                    <input
                      type="number"
                      value={formData.total_vacas}
                      onChange={(e) => handleInputChange('total_vacas', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-700 font-bold">Vacas em Lactação</label>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${livePercLact >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {livePercLact}% lact.
                      </span>
                    </div>
                    <input
                      type="number"
                      value={formData.vacas_lactacao}
                      onChange={(e) => handleInputChange('vacas_lactacao', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Meta: ≥ 80% do rebanho</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      DEL Médio (dias)
                    </label>
                    <input
                      type="number"
                      value={formData.del_medio}
                      onChange={(e) => handleInputChange('del_medio', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Meta: 150 a 180 d</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      IEP Médio (meses)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.iep_meses}
                      onChange={(e) => handleInputChange('iep_meses', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Meta: 12.5 a 13.5 m</span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-700 font-bold">Detecção de Cios (%)</label>
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1 rounded">
                        TXP: {liveTXP}%
                      </span>
                    </div>
                    <input
                      type="number"
                      value={formData.taxa_deteccao_cio}
                      onChange={(e) => handleInputChange('taxa_deteccao_cio', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Meta: ≥ 60%</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Taxa de Concepção (%)
                    </label>
                    <input
                      type="number"
                      value={formData.taxa_concepcao}
                      onChange={(e) => handleInputChange('taxa_concepcao', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Meta: ≥ 35%</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      IPP Novilhas (meses)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.idade_primeiro_parto_meses}
                      onChange={(e) => handleInputChange('idade_primeiro_parto_meses', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Meta: 22 a 26 m</span>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-slate-700 font-bold mb-1">
                      Mortalidade de Bezerras (%)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.taxa_mortalidade_bezerras}
                      onChange={(e) => handleInputChange('taxa_mortalidade_bezerras', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Meta de colostragem & bezerreiro: &lt; 5%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Aba 2: Conforto, Ambiência & Sanidade */}
            {activeFormTab === 'conforto' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3.5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200/80 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <Thermometer className="w-5 h-5 text-orange-600" />
                    <div>
                      <span className="text-xs font-black text-slate-900 block">Monitor de Estresse Térmico (ITU)</span>
                      <span className="text-[11px] text-slate-600">Fórmula NRC/Thom baseada em T° e UR</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-black px-2.5 py-1 rounded-xl font-mono ${
                      liveITU < 72 ? 'bg-emerald-600 text-white' : liveITU <= 78 ? 'bg-amber-500 text-white' : 'bg-rose-600 text-white'
                    }`}>
                      ITU: {liveITU}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Temperatura Ambiente (°C)
                    </label>
                    <input
                      type="number"
                      value={formData.temperatura_ambiente}
                      onChange={(e) => handleInputChange('temperatura_ambiente', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Ideal: &lt; 24°C</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Umidade Relativa (%)
                    </label>
                    <input
                      type="number"
                      value={formData.umidade_relativa}
                      onChange={(e) => handleInputChange('umidade_relativa', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Ambiente / Galpão</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Escore Corporal (ECC 1 a 5)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.escore_condicao_corporal}
                      onChange={(e) => handleInputChange('escore_condicao_corporal', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Ideal lactação: 2.75 a 3.25</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Claudicação / Mancas (%)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.taxa_claudicacao}
                      onChange={(e) => handleInputChange('taxa_claudicacao', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Meta bem-estar: &lt; 5%</span>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-slate-700 font-bold mb-1">
                      Incidência Mastite Clínica (%/mês)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.incidencia_mastite_clinica_mes}
                      onChange={(e) => handleInputChange('incidencia_mastite_clinica_mes', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Grumos, antibiótico e descarte (Meta: &lt; 3%/mês)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Aba 3: Nutrição & Qualidade */}
            {activeFormTab === 'nutricao_qualidade' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Consumo Ração (kg/vaca/d)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.consumo_concentrado_vaca_dia}
                      onChange={(e) => handleInputChange('consumo_concentrado_vaca_dia', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Volumoso na Dieta (% MS)
                    </label>
                    <input
                      type="number"
                      value={formData.relacao_volumoso_concentrado}
                      onChange={(e) => handleInputChange('relacao_volumoso_concentrado', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Ideal ruminal: 50% a 70%</span>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-slate-700 font-bold mb-1">
                      Nitrogênio Ureico Leite (NUL mg/dL)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.ureia_leite_nul}
                      onChange={(e) => handleInputChange('ureia_leite_nul', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Equilíbrio Energia:Proteína no Rúmen (Ideal: 10 a 14 mg/dL)</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      CCS (mil céls/mL)
                    </label>
                    <input
                      type="number"
                      value={formData.ccs}
                      onChange={(e) => handleInputChange('ccs', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">IN 76/77: ≤ 500k (Bônus &lt; 200k)</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      CBT (mil UFC/mL)
                    </label>
                    <input
                      type="number"
                      value={formData.cbt}
                      onChange={(e) => handleInputChange('cbt', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">IN 76/77: ≤ 300k (Bônus &lt; 50k)</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Gordura (%)
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={formData.gordura_leite}
                      onChange={(e) => handleInputChange('gordura_leite', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Padrão: ≥ 3.5%</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Proteína (%)
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={formData.proteina_leite}
                      onChange={(e) => handleInputChange('proteina_leite', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Padrão: ≥ 3.1%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Aba 4: Custos, Insumos & Equipe */}
            {activeFormTab === 'custos' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Preço Base Leite (R$/L)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.preco_base_leite}
                      onChange={(e) => handleInputChange('preco_base_leite', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Milho (R$/saca 60kg)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.preco_saca_milho}
                      onChange={(e) => handleInputChange('preco_saca_milho', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Farelo Soja (R$/ton)
                    </label>
                    <input
                      type="number"
                      step="50"
                      value={formData.preco_ton_soja}
                      onChange={(e) => handleInputChange('preco_ton_soja', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Volumoso (R$/vaca/dia)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.custo_volumoso_dia}
                      onChange={(e) => handleInputChange('custo_volumoso_dia', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-700 font-bold">Nº Trabalhadores</label>
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1 rounded">
                        {liveProdTrab} L/homem
                      </span>
                    </div>
                    <input
                      type="number"
                      value={formData.numero_trabalhadores}
                      onChange={(e) => handleInputChange('numero_trabalhadores', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Meta: &gt; 400 L/homem/dia</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Mão de Obra (R$/mês)
                    </label>
                    <input
                      type="number"
                      value={formData.custo_mao_obra_contratada_mes}
                      onChange={(e) => handleInputChange('custo_mao_obra_contratada_mes', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Depreciação (R$/mês)
                    </label>
                    <input
                      type="number"
                      value={formData.depreciacao_mes}
                      onChange={(e) => handleInputChange('depreciacao_mes', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Pró-labore Fam. (R$/mês)
                    </label>
                    <input
                      type="number"
                      value={formData.mao_obra_familiar_mes}
                      onChange={(e) => handleInputChange('mao_obra_familiar_mes', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
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

        {/* Painel de Resultados do Sistema Especialista (7 colunas) */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-8">
          
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
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4">
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
                    title="Lucro Real (CT)"
                    value={`R$ ${indicadores.lucro_litro !== undefined ? indicadores.lucro_litro.toFixed(2) : '0.00'}`}
                    unit="/ L"
                    subtitle="Receita líquida - CT"
                    targetText="Meta: > R$ 0,10"
                    alertType={indicadores.lucro_litro > 0 ? 'success' : 'danger'}
                    icon={DollarSign}
                  />

                  <KpiCard
                    title="Conforto Térmico"
                    value={indicadores.itu || 0}
                    unit="ITU"
                    subtitle={indicadores.status_estresse_termico === 'CONFORTO' ? 'Zona de Conforto' : 'Estresse Calórico'}
                    targetText="Meta: < 72"
                    alertType={indicadores.itu < 72 ? 'success' : indicadores.itu <= 78 ? 'warning' : 'danger'}
                    icon={Thermometer}
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
                    title="Taxa de Prenhez"
                    value={indicadores.taxa_prenhez !== undefined ? indicadores.taxa_prenhez : 0}
                    unit="%"
                    subtitle="A cada ciclo de 21 dias"
                    targetText="Meta: ≥ 20%"
                    alertType={indicadores.taxa_prenhez >= 20 ? 'success' : 'warning'}
                    icon={Sparkles}
                  />

                  <KpiCard
                    title="Qualidade CCS"
                    value={indicadores.ccs || 0}
                    unit="mil/mL"
                    subtitle="Saúde do Úbere"
                    targetText="Meta: < 200k"
                    alertType={indicadores.ccs <= 250 ? 'success' : indicadores.ccs <= 500 ? 'warning' : 'danger'}
                    icon={HeartPulse}
                  />

                  <KpiCard
                    title="Produtividade M.O."
                    value={indicadores.producao_litros_por_trabalhador_dia || 0}
                    unit="L / homem"
                    subtitle="Rendimento diário"
                    targetText="Meta: > 400"
                    alertType={indicadores.producao_litros_por_trabalhador_dia >= 400 ? 'success' : 'warning'}
                    icon={Users}
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