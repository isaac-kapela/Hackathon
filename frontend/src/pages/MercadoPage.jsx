import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Globe, 
  DollarSign, 
  Calendar, 
  RefreshCw, 
  Layers, 
  Scale, 
  ShieldCheck, 
  Info,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Building2,
  Sparkles
} from 'lucide-react';
import { apiService } from '../services/api';

export default function MercadoPage() {
  const [mercadoData, setMercadoData] = useState(null);
  const [loading, setLoading] = useState(true);

  const carregarDados = () => {
    setLoading(true);
    apiService.obterBenchmarksMercado()
      .then(data => {
        setMercadoData(data);
      })
      .catch(err => console.error('Erro ao carregar dados de mercado:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const mercado = mercadoData?.mercado || {};
  const ibge = mercadoData?.ibge || {};
  const benchmarks = mercadoData?.benchmarks_embrapa || {};

  const relacaoTrocaAtual = (mercado.milho_saca_60kg && mercado.leite_cepea_medio) 
    ? (mercado.milho_saca_60kg / mercado.leite_cepea_medio).toFixed(1) 
    : '27.6';

  const cotacoesEstados = [
    { estado: 'São Paulo (SP)', preco: mercado.leite_sp || 2.52, diff: '+1.6%' },
    { estado: 'Minas Gerais (MG)', preco: mercado.leite_mg || 2.45, diff: '-1.2%' },
    { estado: 'Paraná (PR)', preco: mercado.leite_pr || 2.43, diff: '-2.0%' },
    { estado: 'Goiás (GO)', preco: mercado.leite_go || 2.41, diff: '-2.8%' },
    { estado: 'Rio Grande do Sul (RS)', preco: mercado.leite_rs || 2.40, diff: '-3.2%' },
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Banner Explicativo de Papel no Sistema Especialista */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-7 rounded-3xl shadow-xl border border-slate-700/60">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl text-emerald-400 shrink-0">
              <TrendingUp className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">Mercado, Cotações & Benchmarks Oficiais</h2>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-wider">
                  CEPEA • IBGE • EMBRAPA
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Esta seção centraliza os <strong>indicadores econômicos e metas zootécnicas oficiais</strong> que alimentam diretamente o motor de inferência determinístico. Nenhuma regra do sistema toma decisões arbitrárias: todos os alertas de quebra de caixa, relação de troca e sanidade são balizados nestes dados de referência.
              </p>
            </div>
          </div>

          <button
            onClick={carregarDados}
            disabled={loading}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-sm shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : 'text-slate-400'}`} />
            <span>{loading ? 'Atualizando...' : 'Atualizar Cotações'}</span>
          </button>
        </div>
      </div>

      {/* Grid de Cotações Principais de Referência (CEPEA / ESALQ) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Indicadores Agropecuários Nacionais</span>
          <h3 className="text-lg font-black text-slate-900 mt-0.5">Cotações CEPEA / ESALQ & Relação de Troca</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Preço Médio Brasil Leite */}
          <div className="p-5 bg-gradient-to-br from-emerald-50/70 to-teal-50/70 rounded-3xl border border-emerald-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">Leite Médio Produtor (Brasil)</span>
              <span className="text-[11px] text-emerald-600 font-medium">Média ponderada CEPEA Líquido</span>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-emerald-950">
                  R$ {mercado.leite_cepea_medio !== undefined ? mercado.leite_cepea_medio.toFixed(2) : '2.48'}
                </span>
                <span className="text-xs font-bold text-emerald-700">/ litro</span>
              </div>
              <p className="text-[11px] text-emerald-800 mt-1 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Base para cálculo de receita bruta
              </p>
            </div>
          </div>

          {/* Card 2: Milho Saca 60kg */}
          <div className="p-5 bg-gradient-to-br from-amber-50/70 to-orange-50/70 rounded-3xl border border-amber-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">Milho Grão (Saca 60kg)</span>
              <span className="text-[11px] text-amber-600 font-medium">Indicador Campinas/SP (CEPEA)</span>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-amber-950">
                  R$ {mercado.milho_saca_60kg !== undefined ? mercado.milho_saca_60kg.toFixed(2) : '68.50'}
                </span>
                <span className="text-xs font-bold text-amber-700">/ saca</span>
              </div>
              <p className="text-[11px] text-amber-800 mt-1 font-semibold flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-amber-600" />
                Compõe ~65% do concentrado 22% PB
              </p>
            </div>
          </div>

          {/* Card 3: Farelo de Soja Tonelada */}
          <div className="p-5 bg-gradient-to-br from-blue-50/70 to-indigo-50/70 rounded-3xl border border-blue-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">Farelo de Soja (Granel)</span>
              <span className="text-[11px] text-blue-600 font-medium">Base Paranaguá/PR (CEPEA)</span>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-blue-950">
                  R$ {mercado.soja_tonelada !== undefined ? mercado.soja_tonelada.toFixed(2) : '2100.00'}
                </span>
                <span className="text-xs font-bold text-blue-700">/ ton</span>
              </div>
              <p className="text-[11px] text-blue-800 mt-1 font-semibold flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                Compõe ~32% da proteína da ração
              </p>
            </div>
          </div>

          {/* Card 4: Relação de Troca Leite / Milho */}
          <div className="p-5 bg-gradient-to-br from-purple-50/70 to-pink-50/70 rounded-3xl border border-purple-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-900 uppercase tracking-wider block">Relação de Troca (Leite/Milho)</span>
              <span className="text-[11px] text-purple-600 font-medium">Litros de leite p/ comprar 1 saca</span>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-purple-950">
                  {relacaoTrocaAtual}
                </span>
                <span className="text-xs font-bold text-purple-700">L / saca</span>
              </div>
              <p className="text-[11px] text-purple-800 mt-1 font-semibold flex items-center gap-1">
                {Number(relacaoTrocaAtual) <= 30 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                )}
                <span>Meta Embrapa: &lt; 30 (Alerta: &gt; 32)</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Grid de Duas Colunas: Preços Regionais + Dados IBGE SIDRA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Painel 1: Cotações por Bacia Leiteira / Estado */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900">Preço do Leite por Bacia Leiteira (CEPEA)</h4>
              <p className="text-xs text-slate-500">Variação regional de pagamento líquido ao produtor</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {cotacoesEstados.map((item, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between text-xs hover:bg-slate-50/80 px-2 rounded-xl transition-colors">
                <span className="font-bold text-slate-800 text-sm">{item.estado}</span>
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-sm font-black text-slate-900">
                    R$ {item.preco.toFixed(2)}/L
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${item.diff.startsWith('+') ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                    {item.diff} vs BR
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Painel 2: IBGE SIDRA - Captação Nacional de Leite Cru */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
              <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-black text-slate-900">Captação Nacional de Leite Cru (IBGE)</h4>
                <p className="text-xs text-slate-500">Pesquisa Trimestral do Leite — SIDRA Tabela 1086</p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Volume Trimestral Captado (Sob SIF)</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-indigo-950 font-mono">
                    {ibge.volume_nacional_mil_litros ? (ibge.volume_nacional_mil_litros / 1000000).toFixed(2) : '6.61'}
                  </span>
                  <span className="text-sm font-bold text-indigo-800">Bilhões de Litros / Trimestre</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Período avaliado: <strong>{ibge.periodo || '2026/T2'}</strong> • Fonte: {ibge.fonte || 'IBGE SIDRA'}
                </span>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed bg-amber-50/60 border border-amber-200/70 p-4 rounded-2xl">
                <strong className="text-amber-900 block mb-1">Impacto na Pecuária de Precisão:</strong>
                O volume captado pelo IBGE reflete a sazonalidade de entressafra e chuvas. Quando a captação nacional cai, a bonificação por sólidos e qualidade (IN 76/77) atinge seu maior valor estratégico.
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Tabela de Benchmarks Zootécnicos e Normas Embrapa / MAPA */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
          <div className="p-2.5 bg-teal-100 text-teal-700 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-900">Benchmarks Zootécnicos e Sanitários Embrapa / MAPA</h4>
            <p className="text-xs text-slate-500">Parâmetros de corte utilizados pelas regras determinísticas do sistema especialista</p>
          </div>
        </div>

        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Indicador</th>
                <th className="p-4">Meta Ideal Embrapa</th>
                <th className="p-4">Limite de Alerta</th>
                <th className="p-4">Regra do Motor Acionada</th>
                <th className="p-4">Fundamentação Técnica</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="p-4 font-bold text-slate-900">DEL Médio (Dias em Lactação)</td>
                <td className="p-4 text-emerald-700 font-bold">150 a 180 dias</td>
                <td className="p-4 text-rose-700 font-bold">&gt; 180 dias</td>
                <td className="p-4 font-mono font-bold text-indigo-700">R2 (Atraso Reprodutivo)</td>
                <td className="p-4 text-slate-600">DEL alto indica falha de inseminação e queda na persistência da lactação.</td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="p-4 font-bold text-slate-900">% Vacas em Lactação</td>
                <td className="p-4 text-emerald-700 font-bold">≥ 80% do rebanho</td>
                <td className="p-4 text-rose-700 font-bold">&lt; 80%</td>
                <td className="p-4 font-mono font-bold text-indigo-700">R2 (Lactação Baixa)</td>
                <td className="p-4 text-slate-600">Vacas secas consomem recursos fixos sem gerar receita líquida.</td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="p-4 font-bold text-slate-900">CCS (Contagem Células Somáticas)</td>
                <td className="p-4 text-emerald-700 font-bold">&lt; 200 mil céls/mL</td>
                <td className="p-4 text-rose-700 font-bold">&gt; 500 mil (Limite IN 76/77)</td>
                <td className="p-4 font-mono font-bold text-indigo-700">R4 (Mastite / IN 76/77)</td>
                <td className="p-4 text-slate-600">CCS &gt; 500k viola a norma MAPA e causa penalidade severa no preço do leite.</td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="p-4 font-bold text-slate-900">CBT (Contagem Bacteriana Total)</td>
                <td className="p-4 text-emerald-700 font-bold">&lt; 50 mil UFC/mL</td>
                <td className="p-4 text-rose-700 font-bold">&gt; 300 mil (Limite IN 76/77)</td>
                <td className="p-4 font-mono font-bold text-indigo-700">R4 (Higiene / Ordenha)</td>
                <td className="p-4 text-slate-600">Falha de resfriamento ou higiene de teteiras desqualifica o leite para consumo.</td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="p-4 font-bold text-slate-900">Participação da Nutrição no COE</td>
                <td className="p-4 text-emerald-700 font-bold">45% a 60%</td>
                <td className="p-4 text-rose-700 font-bold">&gt; 65% do COE</td>
                <td className="p-4 font-mono font-bold text-indigo-700">R1 & R6 (Eficiência Ração)</td>
                <td className="p-4 text-slate-600">Nutrição acima de 65% esgota a margem operacional e gera queima de caixa.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}