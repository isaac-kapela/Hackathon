import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, Globe, DollarSign, Calendar, RefreshCw } from 'lucide-react';
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
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <div className="space-y-6 pb-16">
      {/* Header da Página */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              Mercado & Indicadores Oficiais
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Integração de séries históricas e cotações de referência: IBGE SIDRA (Tabela 1086) e CEPEA/ESALQ.
            </p>
          </div>
          <button
            onClick={carregarDados}
            disabled={loading}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </div>

        {/* Cotações CEPEA */}
        {mercadoData && (
          <div className="mt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-500" />
              Cotações de Referência CEPEA / ESALQ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
                <span className="text-xs font-semibold text-emerald-800">Preço Médio Leite Produtor (CEPEA)</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-emerald-950">
                    R$ {mercadoData.cotacoes_cepea_referencia?.preco_medio_leite_cepea?.toFixed(2)}
                  </span>
                  <span className="text-xs text-emerald-700">/ litro</span>
                </div>
                <p className="text-[11px] text-emerald-600 mt-1">Média Brasil ponderada</p>
              </div>

              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200">
                <span className="text-xs font-semibold text-amber-800">Milho Grão (Saca 60kg - Campinas/SP)</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-amber-950">
                    R$ {mercadoData.cotacoes_cepea_referencia?.milho_saca_60kg_campinas?.toFixed(2)}
                  </span>
                  <span className="text-xs text-amber-700">/ saca</span>
                </div>
                <p className="text-[11px] text-amber-600 mt-1">Indicador ESALQ/BM&F Bovespa</p>
              </div>

              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200">
                <span className="text-xs font-semibold text-blue-800">Farelo de Soja (Paranaguá/PR)</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-blue-950">
                    R$ {mercadoData.cotacoes_cepea_referencia?.farelo_soja_tonelada_paranagua?.toFixed(2)}
                  </span>
                  <span className="text-xs text-blue-700">/ ton</span>
                </div>
                <p className="text-[11px] text-blue-600 mt-1">Base exportação / granel</p>
              </div>
            </div>
          </div>
        )}

        {/* Tabela de Aquisição de Leite Cru - IBGE SIDRA */}
        {mercadoData && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-500" />
                Aquisição Trimestral de Leite Cru no Brasil (IBGE - Tabela 1086)
              </h3>
              <span className="text-[11px] text-slate-400">
                Fonte: {mercadoData.ibge_aquisicao_leite?.fonte}
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase">
                  <tr>
                    <th className="p-3">Período / Trimestre</th>
                    <th className="p-3">Volume Captado (Milhões de Litros)</th>
                    <th className="p-3">Variação / Contexto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mercadoData.ibge_aquisicao_leite?.dados?.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-800 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {item.periodo}
                      </td>
                      <td className="p-3 font-mono font-bold text-indigo-700">
                        {item.volume_mil_litros.toLocaleString('pt-BR')} mil L
                      </td>
                      <td className="p-3 text-slate-500">{item.descricao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
