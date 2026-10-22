import React, { useState, useEffect, useRef } from 'react';
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
  Scale,
  Zap,
  ArrowRight,
  ShieldCheck,
  AlertOctagon,
  HelpCircle
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
  const [autoRun, setAutoRun] = useState(true);

  const debounceTimerRef = useRef(null);

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

  // Auto-inferência em tempo real com debounce suave (150ms)
  useEffect(() => {
    if (!autoRun) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      executarDiagnostico(formData);
    }, 150);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [formData, autoRun]);

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

  // Simulações rápidas "O que acontece se..."
  const aplicarOtimizacao = (tipo) => {
    setSelectedPresetKey(null);
    if (tipo === 'resfriamento') {
      setFormData(prev => ({ ...prev, temperatura_ambiente: 22, umidade_relativa: 60 }));
    } else if (tipo === 'qualidade') {
      setFormData(prev => ({ ...prev, ccs: 160, cbt: 30 }));
    } else if (tipo === 'dieta') {
      setFormData(prev => ({ ...prev, relacao_volumoso_concentrado: 60, consumo_concentrado_vaca_dia: 6.0, ureia_leite_nul: 12.0 }));
    } else if (tipo === 'reproducao') {
      const totalV = Number(formData.total_vacas || 80);
      setFormData(prev => ({ ...prev, vacas_lactacao: Math.round(totalV * 0.83), del_medio: 160, iep_meses: 12.8, taxa_prenhez: 24 }));
    }
  };

  // Micro-cálculos ao vivo para os crachás de status
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

  const ccsNum = Number(formData.ccs || 280);
  const cbtNum = Number(formData.cbt || 45);
  const eccNum = Number(formData.escore_condicao_corporal || 3.0);
  const volNum = Number(formData.relacao_volumoso_concentrado || 60);

  // Separar regras críticas, alertas e sucessos para o Plano de Ação Imediato
  const regrasDisparadas = resultado?.regrasDisparadas || [];
  const regrasCriticas = regrasDisparadas.filter(r => r.conclusao?.status === 'CRITICO');
  const regrasAlertas = regrasDisparadas.filter(r => r.conclusao?.status === 'ALERTA');
  const regrasSucessos = regrasDisparadas.filter(r => r.conclusao?.status === 'SUCESSO');

  return (
    <div className="space-y-8 pb-16">
      
      {/* 1. Barra de Cenários / Presets com Visual Cards Intuitivos */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-slate-700/60 flex flex-col gap-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-amber-400/10 border border-amber-400/20 rounded-2xl text-amber-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">Simulador de Cenários Práticos</span>
                <span className="text-[11px] bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700 text-slate-300 font-bold">1-Clique</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">Clique em um perfil para carregar parâmetros reais e ver o diagnóstico instantâneo:</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">Modo Tempo Real:</span>
            <button
              type="button"
              onClick={() => setAutoRun(!autoRun)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                autoRun 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${autoRun ? 'text-emerald-400 fill-emerald-400' : 'text-slate-500'}`} />
              <span>{autoRun ? 'Auto-Inferência Ativa' : 'Manual'}</span>
            </button>
          </div>
        </div>

        {/* Botões dos Presets em Grid Flexível */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {Object.entries(presets).map(([key, item]) => {
            const isSelected = selectedPresetKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => aplicarPreset(key)}
                className={`p-3 text-left rounded-2xl transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-emerald-400 ring-2 ring-emerald-400/50 shadow-lg'
                    : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black truncate">{item.nome.split('(')[0]}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200 shrink-0" />}
                </div>
                <span className={`text-[10px] truncate ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {key === 'alta_eficiencia' ? 'Bônus e Conforto' :
                   key === 'estresse_termico_e_acidose' ? 'ITU Alto e Ração' :
                   key === 'mastite_e_qualidade_critica' ? 'Mastite e CBT' :
                   key === 'descapitalizacao_e_milho_caro' ? 'Ração Cara e IEP' : 'Pasto Familiar'}
                </span>
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
            className="p-3 text-left rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white transition-all flex flex-col justify-between"
            title="Restaurar parâmetros padrão"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black">Restaurar Padrão</span>
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <span className="text-[10px] text-slate-400">Valores Médios Embrapa</span>
          </button>
        </div>
      </div>

      {/* 2. Grid Principal: Formulário + Painel Especialista */}
      <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-8 items-start">
        
        {/* Formulário com Abas e Indicadores Visuais Instantâneos (5 colunas) */}
        <div className="lg:col-span-5 xl:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6 sticky top-24">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-600" />
                Ajuste os Parâmetros
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Altere os campos para simular o impacto imediato</p>
            </div>

            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-mono text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>25 Regras</span>
            </div>
          </div>

          {/* Abas com Números de Etapa Intuitivos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 bg-slate-100 p-1.5 rounded-2xl text-[11px] font-bold text-slate-600 gap-1">
            <button
              type="button"
              onClick={() => setActiveFormTab('zootecnia')}
              className={`py-2 px-1 rounded-xl transition-all flex items-center justify-center space-x-1 ${
                activeFormTab === 'zootecnia' ? 'bg-white text-emerald-700 shadow-sm font-black' : 'hover:text-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>1. Rebanho</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFormTab('conforto')}
              className={`py-2 px-1 rounded-xl transition-all flex items-center justify-center space-x-1 ${
                activeFormTab === 'conforto' ? 'bg-white text-orange-700 shadow-sm font-black' : 'hover:text-slate-900'
              }`}
            >
              <Thermometer className="w-3.5 h-3.5" />
              <span>2. Clima/ITU</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFormTab('nutricao_qualidade')}
              className={`py-2 px-1 rounded-xl transition-all flex items-center justify-center space-x-1 ${
                activeFormTab === 'nutricao_qualidade' ? 'bg-white text-cyan-700 shadow-sm font-black' : 'hover:text-slate-900'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>3. Qualidade</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFormTab('custos')}
              className={`py-2 px-1 rounded-xl transition-all flex items-center justify-center space-x-1 ${
                activeFormTab === 'custos' ? 'bg-white text-indigo-700 shadow-sm font-black' : 'hover:text-slate-900'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>4. Custos</span>
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); executarDiagnostico(); }} className="space-y-4">
            
            {/* Aba 1: Rebanho & Reprodução */}
            {activeFormTab === 'zootecnia' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Produção Diária (L/dia)</label>
                    <input
                      type="number"
                      value={formData.producao_diaria}
                      onChange={(e) => handleInputChange('producao_diaria', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Total Vacas Adultas</label>
                    <input
                      type="number"
                      value={formData.total_vacas}
                      onChange={(e) => handleInputChange('total_vacas', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-700 font-bold">Vacas em Lactação</label>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        livePercLact >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {livePercLact}% ({livePercLact >= 80 ? 'Meta ok' : 'Baixo'})
                      </span>
                    </div>
                    <input
                      type="number"
                      value={formData.vacas_lactacao}
                      onChange={(e) => handleInputChange('vacas_lactacao', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-700 font-bold">DEL Médio (dias)</label>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        Number(formData.del_medio || 0) <= 180 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {Number(formData.del_medio || 0) <= 180 ? 'Ideal' : 'Atrasado'}
                      </span>
                    </div>
                    <input
                      type="number"
                      value={formData.del_medio}
                      onChange={(e) => handleInputChange('del_medio', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-700 font-bold">IEP Médio (meses)</label>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        Number(formData.iep_meses || 0) <= 13.5 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {Number(formData.iep_meses || 0) <= 13.5 ? 'Meta ok' : 'Longo'}
                      </span>
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.iep_meses}
                      onChange={(e) => handleInputChange('iep_meses', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-700 font-bold">Detecção Cios (%)</label>
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                        TXP: {liveTXP}%
                      </span>
                    </div>
                    <input
                      type="number"
                      value={formData.taxa_deteccao_cio}
                      onChange={(e) => handleInputChange('taxa_deteccao_cio', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Taxa Concepção (%)</label>
                    <input
                      type="number"
                      value={formData.taxa_concepcao}
                      onChange={(e) => handleInputChange('taxa_concepcao', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Meta: ≥ 35%</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">IPP Novilhas (meses)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.idade_primeiro_parto_meses}
                      onChange={(e) => handleInputChange('idade_primeiro_parto_meses', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Meta: 22 a 26 m</span>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-slate-700 font-bold mb-1">Mortalidade de Bezerras (%)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.taxa_mortalidade_bezerras}
                      onChange={(e) => handleInputChange('taxa_mortalidade_bezerras', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Meta de colostragem & cria: &lt; 5%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Aba 2: Conforto & Clima (ITU) */}
            {activeFormTab === 'conforto' && (
              <div className="space-y-4 animate-fadeIn">
                <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                  liveITU < 72 ? 'bg-emerald-50 border-emerald-200 text-emerald-950' :
                  liveITU <= 78 ? 'bg-amber-50 border-amber-200 text-amber-950' :
                  'bg-rose-50 border-rose-200 text-rose-950'
                }`}>
                  <div className="flex items-center space-x-3">
                    <Thermometer className={`w-6 h-6 ${
                      liveITU < 72 ? 'text-emerald-600' : liveITU <= 78 ? 'text-amber-600' : 'text-rose-600'
                    }`} />
                    <div>
                      <span className="text-xs font-black block">Índice de Conforto Térmico (ITU)</span>
                      <span className="text-[11px]">
                        {liveITU < 72 ? 'Zona de Conforto (Sem perdas)' :
                         liveITU <= 78 ? 'Estresse Moderado (~6% de perda)' :
                         'Estresse Severo (~15% a 25% de perda)'}
                      </span>
                    </div>
                  </div>
                  <span className={`text-sm font-black px-3 py-1.5 rounded-xl font-mono text-white ${
                    liveITU < 72 ? 'bg-emerald-600' : liveITU <= 78 ? 'bg-amber-600' : 'bg-rose-600'
                  }`}>
                    ITU {liveITU}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Temperatura Galpão (°C)</label>
                    <input
                      type="number"
                      value={formData.temperatura_ambiente}
                      onChange={(e) => handleInputChange('temperatura_ambiente', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Ideal: &lt; 24°C</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Umidade Relativa (%)</label>
                    <input
                      type="number"
                      value={formData.umidade_relativa}
                      onChange={(e) => handleInputChange('umidade_relativa', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Umidade do ar</span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-700 font-bold">Escore Corporal (ECC 1-5)</label>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        eccNum >= 2.75 && eccNum <= 3.25 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {eccNum < 2.5 ? 'Muito Magra' : eccNum > 3.75 ? 'Gorda' : 'Ideal'}
                      </span>
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.escore_condicao_corporal}
                      onChange={(e) => handleInputChange('escore_condicao_corporal', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-700 font-bold">Claudicação / Mancas (%)</label>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        Number(formData.taxa_claudicacao || 0) <= 5 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {Number(formData.taxa_claudicacao || 0) <= 5 ? 'Meta ok' : 'Alto'}
                      </span>
                    </div>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.taxa_claudicacao}
                      onChange={(e) => handleInputChange('taxa_claudicacao', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-slate-700 font-bold mb-1">Mastite Clínica (% vacas/mês)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.incidencia_mastite_clinica_mes}
                      onChange={(e) => handleInputChange('incidencia_mastite_clinica_mes', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Descarte de leite com antibiótico (Meta: &lt; 3%/mês)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Aba 3: Nutrição & Qualidade */}
            {activeFormTab === 'nutricao_qualidade' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Ração Concentrada (kg/d)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.consumo_concentrado_vaca_dia}
                      onChange={(e) => handleInputChange('consumo_concentrado_vaca_dia', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-700 font-bold">Volumoso (% Dieta)</label>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        volNum >= 45 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {volNum >= 45 ? 'Rúmen ok' : 'Acidose!'}
                      </span>
                    </div>
                    <input
                      type="number"
                      value={formData.relacao_volumoso_concentrado}
                      onChange={(e) => handleInputChange('relacao_volumoso_concentrado', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-700 font-bold">Nitrogênio Ureico no Leite (NUL mg/dL)</label>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        Number(formData.ureia_leite_nul || 0) >= 10 && Number(formData.ureia_leite_nul || 0) <= 14 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {Number(formData.ureia_leite_nul || 0) > 16 ? 'Excesso Proteico' : Number(formData.ureia_leite_nul || 0) < 10 ? 'Falta PB' : 'Equilibrado'}
                      </span>
                    </div>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.ureia_leite_nul}
                      onChange={(e) => handleInputChange('ureia_leite_nul', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-700 font-bold">CCS (mil/mL)</label>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        ccsNum < 200 ? 'bg-emerald-100 text-emerald-800' : ccsNum <= 500 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {ccsNum < 200 ? '+Bônus' : ccsNum <= 500 ? 'Neutro' : 'Desconto!'}
                      </span>
                    </div>
                    <input
                      type="number"
                      value={formData.ccs}
                      onChange={(e) => handleInputChange('ccs', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-700 font-bold">CBT (mil/mL)</label>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        cbtNum < 50 ? 'bg-emerald-100 text-emerald-800' : cbtNum <= 100 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {cbtNum < 50 ? '+Bônus' : cbtNum <= 100 ? 'Neutro' : 'Desconto!'}
                      </span>
                    </div>
                    <input
                      type="number"
                      value={formData.cbt}
                      onChange={(e) => handleInputChange('cbt', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Gordura (%)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={formData.gordura_leite}
                      onChange={(e) => handleInputChange('gordura_leite', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Padrão: ≥ 3.5%</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Proteína (%)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={formData.proteina_leite}
                      onChange={(e) => handleInputChange('proteina_leite', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Padrão: ≥ 3.1%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Aba 4: Custos & Equipe */}
            {activeFormTab === 'custos' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Preço Base Leite (R$/L)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.preco_base_leite}
                      onChange={(e) => handleInputChange('preco_base_leite', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Milho (R$/saca 60kg)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.preco_saca_milho}
                      onChange={(e) => handleInputChange('preco_saca_milho', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Farelo Soja (R$/ton)</label>
                    <input
                      type="number"
                      step="50"
                      value={formData.preco_ton_soja}
                      onChange={(e) => handleInputChange('preco_ton_soja', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Volumoso (R$/vaca/dia)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.custo_volumoso_dia}
                      onChange={(e) => handleInputChange('custo_volumoso_dia', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-700 font-bold">Nº Trabalhadores</label>
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                        {liveProdTrab} L/homem
                      </span>
                    </div>
                    <input
                      type="number"
                      value={formData.numero_trabalhadores}
                      onChange={(e) => handleInputChange('numero_trabalhadores', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Mão de Obra (R$/mês)</label>
                    <input
                      type="number"
                      value={formData.custo_mao_obra_contratada_mes}
                      onChange={(e) => handleInputChange('custo_mao_obra_contratada_mes', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Depreciação (R$/mês)</label>
                    <input
                      type="number"
                      value={formData.depreciacao_mes}
                      onChange={(e) => handleInputChange('depreciacao_mes', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Pró-labore Fam. (R$/mês)</label>
                    <input
                      type="number"
                      value={formData.mao_obra_familiar_mes}
                      onChange={(e) => handleInputChange('mao_obra_familiar_mes', e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
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
              {loading ? 'Calculando Inferência...' : 'Reavaliar Rebanho & Custos'}
            </button>
          </form>

          {/* Simulador de Otimização Rápida "O que acontece se...?" */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Simulador Rápido: E se eu otimizar...?
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => aplicarOtimizacao('resfriamento')}
                className="p-2 text-left bg-orange-50/70 hover:bg-orange-100/80 border border-orange-200/80 rounded-xl font-bold text-orange-950 transition-all"
              >
                ❄️ Resfriar (ITU &lt; 72)
              </button>
              <button
                type="button"
                onClick={() => aplicarOtimizacao('qualidade')}
                className="p-2 text-left bg-cyan-50/70 hover:bg-cyan-100/80 border border-cyan-200/80 rounded-xl font-bold text-cyan-950 transition-all"
              >
                🧪 Bônus CCS (&lt; 200k)
              </button>
              <button
                type="button"
                onClick={() => aplicarOtimizacao('dieta')}
                className="p-2 text-left bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200/80 rounded-xl font-bold text-emerald-950 transition-all"
              >
                🌾 Dieta Ruminal 60%
              </button>
              <button
                type="button"
                onClick={() => aplicarOtimizacao('reproducao')}
                className="p-2 text-left bg-indigo-50/70 hover:bg-indigo-100/80 border border-indigo-200/80 rounded-xl font-bold text-indigo-950 transition-all"
              >
                🐄 83% Vacas Lactação
              </button>
            </div>
          </div>

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

              {/* Box de Plano de Ação Imediato Priorizado */}
              {regrasDisparadas.length > 0 && (
                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Plano de Ação Imediato Priorizado
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      {regrasCriticas.length > 0 ? `${regrasCriticas.length} Ação(ões) Crítica(s)` : `${regrasAlertas.length} Ponto(s) de Alerta`}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Alertas Críticos */}
                    {regrasCriticas.slice(0, 3).map((r, i) => (
                      <div key={i} className="p-3 bg-rose-50/80 border border-rose-200/80 rounded-2xl flex items-start gap-3">
                        <div className="p-1 bg-rose-200 text-rose-800 rounded-lg shrink-0 mt-0.5">
                          <AlertOctagon className="w-4 h-4" />
                        </div>
                        <div className="text-xs">
                          <strong className="text-rose-950 block">{r.nome}</strong>
                          <p className="text-rose-900 mt-0.5 leading-snug">{r.conclusao?.recomendacao}</p>
                        </div>
                      </div>
                    ))}

                    {/* Alertas Operacionais se não houver críticos suficientes */}
                    {regrasCriticas.length === 0 && regrasAlertas.slice(0, 3).map((r, i) => (
                      <div key={i} className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-2xl flex items-start gap-3">
                        <div className="p-1 bg-amber-200 text-amber-800 rounded-lg shrink-0 mt-0.5">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <div className="text-xs">
                          <strong className="text-amber-950 block">{r.nome}</strong>
                          <p className="text-amber-900 mt-0.5 leading-snug">{r.conclusao?.recomendacao}</p>
                        </div>
                      </div>
                    ))}

                    {/* Sucessos se tudo estiver saudável */}
                    {regrasCriticas.length === 0 && regrasAlertas.length === 0 && (
                      <div className="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl flex items-start gap-3">
                        <div className="p-1 bg-emerald-200 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                          <Award className="w-4 h-4" />
                        </div>
                        <div className="text-xs text-emerald-950">
                          <strong>Excelência Zootécnica e Econômica Mantida</strong>
                          <p className="text-emerald-900 mt-0.5">O rebanho cumpre as metas da Embrapa e não apresenta riscos iminentes.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

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