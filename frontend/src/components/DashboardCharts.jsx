import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { TrendingUp, PieChart as PieIcon, Activity, DollarSign, Layers } from 'lucide-react';

export default function DashboardCharts({ indicadores, formData }) {
  if (!indicadores) return null;

  // 1. Dados para o Gráfico de Sensibilidade de Preço & Lucro Mensal (Evolução)
  const basePreco = Number(indicadores.preco_liquido_leite || indicadores.preco_base_leite || formData.preco_base_leite || 2.45);
  const producaoMensal = Number(indicadores.producao_mensal || (Number(formData.producao_diaria || 1200) * 30));
  
  // Custos mensais reais oriundos do costCalculator
  const coeMensal = Number(indicadores.coe_mes !== undefined ? indicadores.coe_mes : (Number(formData.producao_diaria || 1200) * 30 * Number(indicadores.coe_litro || 1.8)));
  const cotMensal = Number(indicadores.cot_mes !== undefined ? indicadores.cot_mes : (coeMensal + Number(formData.depreciacao_mes || 3200) + Number(formData.mao_obra_familiar_mes || 4000)));
  const ctMensal = Number(indicadores.ct_mes !== undefined ? indicadores.ct_mes : (cotMensal + Number(formData.custo_oportunidade_capital_mes || 5000)));

  const precosVariacao = [
    Number((basePreco * 0.75).toFixed(2)),
    Number((basePreco * 0.85).toFixed(2)),
    Number((basePreco * 0.95).toFixed(2)),
    Number(basePreco.toFixed(2)),
    Number((basePreco * 1.05).toFixed(2)),
    Number((basePreco * 1.15).toFixed(2)),
    Number((basePreco * 1.25).toFixed(2))
  ];

  const dadosEvolucaoLucro = precosVariacao.map((p) => {
    const rec = p * producaoMensal;
    const margemBruta = rec - coeMensal;
    const margemLiquida = rec - cotMensal;
    const lucroReal = rec - ctMensal;

    return {
      precoLitro: `R$ ${p.toFixed(2)}`,
      precoNum: p,
      Receita: Math.round(rec),
      COE: Math.round(coeMensal),
      COT: Math.round(cotMensal),
      CT: Math.round(ctMensal),
      MargemBruta: Math.round(margemBruta),
      MargemLiquida: Math.round(margemLiquida),
      LucroReal: Math.round(lucroReal)
    };
  });

  // 2. Dados de Composição dos Custos (Breakdown Embrapa)
  const custoVolumosoMes = Number(formData.vacas_lactacao || 64) * Number(formData.custo_volumoso_dia || 8.50) * 30;
  const custoAlimentacaoTotal = Number(indicadores.custo_alimentacao_total_mes || (custoVolumosoMes + 12000));
  const custoRacaoMes = Math.max(0, custoAlimentacaoTotal - custoVolumosoMes);
  const custoMaoObraMes = Number(formData.custo_mao_obra_contratada_mes || 0);
  const outrosCustosMes = Number(formData.outros_custos_coe_mes || 0);
  const depreciacaoMes = Number(formData.depreciacao_mes || 0);
  const maoObraFamMes = Number(formData.mao_obra_familiar_mes || 0);
  const custoOportunidadeMes = Number(formData.custo_oportunidade_capital_mes || 0);

  const dadosComposicaoCustos = [
    { name: 'Ração Concentrada', valor: Math.round(custoRacaoMes), color: '#3b82f6' },
    { name: 'Volumoso / Silagem', valor: Math.round(custoVolumosoMes), color: '#b91c1c' },
    { name: 'Mão de Obra Contratada', valor: Math.round(custoMaoObraMes), color: '#8b5cf6' },
    { name: 'Outros Diretos (Energia/Sanidade)', valor: Math.round(outrosCustosMes), color: '#f59e0b' },
    { name: 'Depreciação de Máquinas', valor: Math.round(depreciacaoMes), color: '#64748b' },
    { name: 'Mão de Obra Familiar (Pró-labore)', valor: Math.round(maoObraFamMes), color: '#ec4899' },
    { name: 'Custo Oportunidade Capital', valor: Math.round(custoOportunidadeMes), color: '#14b8a6' }
  ].filter(item => item.valor > 0);

  // 3. Comparativo de Custo Unitário vs Preço (R$/L)
  const dadosCustosUnitarios = [
    {
      categoria: 'Preço & Custos (R$/L)',
      'Preço Líquido Recebido': Number((indicadores.preco_liquido_leite || basePreco).toFixed(2)),
      'COE (Desembolso Direto)': Number((indicadores.coe_litro || 0).toFixed(2)),
      'COT (Operacional Total)': Number((indicadores.cot_litro || 0).toFixed(2)),
      'CT (Custo Total c/ Capital)': Number((indicadores.ct_litro || 0).toFixed(2))
    }
  ];

  // 4. Curva Teórica de Lactação (305 dias) e Posição do DEL Atual
  const delAtual = Number(indicadores.del_medio || formData.del_medio || 165);
  const dadosCurvaLactacao = [
    { dia: 30, producaoEsperada: 28, estagio: 'Subida / Pico' },
    { dia: 60, producaoEsperada: 32, estagio: 'Pico de Lactação' },
    { dia: 90, producaoEsperada: 30, estagio: 'Platô Produtivo' },
    { dia: 150, producaoEsperada: 26, estagio: 'Meta Ideal (150d)' },
    { dia: 180, producaoEsperada: 23, estagio: 'Meta Limite (180d)' },
    { dia: 240, producaoEsperada: 17, estagio: 'Declínio Acentuado' },
    { dia: 305, producaoEsperada: 12, estagio: 'Secagem' }
  ];

  const formatCurrency = (val) => `R$ ${val?.toLocaleString('pt-BR')}`;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-2xl shadow-md shadow-indigo-500/20">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">Painel Gráfico de Desempenho & Lucratividade</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">Sensibilidade econômica, decomposição de custos e curva produtiva em tempo real</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* GRÁFICO 1: Evolução / Sensibilidade de Lucro por Preço */}
        <div className="p-6 rounded-3xl border border-slate-200/80 bg-slate-50/50 hover:bg-white transition-all hover:shadow-md flex flex-col justify-between">
          <div className="mb-4">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-red-600" />
                Evolução do Lucro e Margem Líquida Mensal
              </h4>
              <span className="text-xs font-mono text-red-800 bg-red-100 px-3 py-1 rounded-full font-bold border border-red-200">
                Preço Atual: R$ {basePreco.toFixed(2)}/L
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Simulação de receita vs custos operacionais em função do preço do leite (faixa ±25%)
            </p>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dadosEvolucaoLucro} margin={{ top: 10, right: 15, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorLucro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b91c1c" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#b91c1c" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="colorLucroReal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e11d48" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="#e11d48" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="precoLitro" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tickFormatter={(val) => `R$ ${(val/1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  formatter={(val, name) => [formatCurrency(val), name]}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
                <Area type="monotone" dataKey="Receita" stroke="#3b82f6" fillOpacity={1} fill="url(#colorReceita)" name="Receita Bruta" />
                <Line type="monotone" dataKey="COT" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" name="Custo Operacional (COT)" dot={false} />
                <Line type="monotone" dataKey="CT" stroke="#64748b" strokeWidth={2} strokeDasharray="2 2" name="Custo Total c/ Capital (CT)" dot={false} />
                <Area type="monotone" dataKey="MargemLiquida" stroke="#b91c1c" strokeWidth={2} fillOpacity={1} fill="url(#colorLucro)" name="Margem Líquida (Rec - COT)" />
                <Area type="monotone" dataKey="LucroReal" stroke="#e11d48" strokeWidth={2.5} fillOpacity={1} fill="url(#colorLucroReal)" name="Lucro Real (Rec - CT)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICO 2: Composição dos Custos Operacionais (Metodologia Embrapa) */}
        <div className="p-6 rounded-3xl border border-slate-200/80 bg-slate-50/50 hover:bg-white transition-all hover:shadow-md flex flex-col justify-between">
          <div className="mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-indigo-600" />
              Composição Estrutural dos Custos (COE + COT)
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Distribuição percentual dos custos mensais (Ração, Volumoso, Mão de Obra, Depreciação)
            </p>
          </div>

          <div className="h-80 w-full flex items-center justify-center pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dadosComposicaoCustos}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="valor"
                >
                  {dadosComposicaoCustos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val) => [formatCurrency(val), 'Valor Mensal']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontSize: '12px' }}
                />
                <Legend 
                  layout="vertical" 
                  align="right" 
                  verticalAlign="middle" 
                  wrapperStyle={{ fontSize: '11px', lineHeight: '22px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICO 3: Comparativo Preço Líquido vs COE vs COT vs CT por Litro */}
        <div className="p-6 rounded-3xl border border-slate-200/80 bg-slate-50/50 hover:bg-white transition-all hover:shadow-md">
          <div className="mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Layers className="w-4 h-4 text-red-600" />
              Margens Unitárias por Litro Produzido (R$/Litro)
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Margem Bruta (Preço - COE) e Margem Líquida (Preço - COT) por litro
            </p>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosCustosUnitarios} margin={{ top: 15, right: 15, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="categoria" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tickFormatter={(val) => `R$ ${val.toFixed(2)}`} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  formatter={(val) => [`R$ ${Number(val).toFixed(2)}/L`]}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="Preço Líquido Recebido" fill="#b91c1c" radius={[8, 8, 0, 0]} />
                <Bar dataKey="COE (Desembolso Direto)" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                <Bar dataKey="COT (Operacional Total)" fill="#ef4444" radius={[8, 8, 0, 0]} />
                <Bar dataKey="CT (Custo Total c/ Capital)" fill="#64748b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICO 4: Curva Teórica de Lactação e Posição do DEL Atual */}
        <div className="p-6 rounded-3xl border border-slate-200/80 bg-slate-50/50 hover:bg-white transition-all hover:shadow-md">
          <div className="mb-4">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600" />
                Curva de Lactação (305d) vs DEL Atual da Fazenda
              </h4>
              <span className={`text-xs font-mono px-3 py-1 rounded-full font-bold border ${delAtual <= 180 ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200'}`}>
                DEL Atual: {delAtual} dias
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Posição do rebanho em relação à meta ótima de DEL (150 a 180 dias)
            </p>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dadosCurvaLactacao} margin={{ top: 15, right: 15, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorDEL" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="dia" tickFormatter={(d) => `${d}d`} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tickFormatter={(val) => `${val} L/v`} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  formatter={(val, name, item) => [`${val} L/vaca/dia (${item.payload.estagio})`, 'Produção']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontSize: '12px' }}
                />
                <ReferenceLine x={180} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Meta Máx 180d', fill: '#d97706', fontSize: 11, fontWeight: 'bold' }} />
                <Area type="natural" dataKey="producaoEsperada" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDEL)" name="Produção Esperada" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
