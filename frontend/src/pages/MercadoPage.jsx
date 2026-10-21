import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, Globe, DollarSign, Calendar, RefreshCw, Layers } from 'lucide-react';
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
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Mercado & Benchmarks Oficiais
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Integração de cotações e séries históricas do <strong>CEPEA/ESALQ</strong> e <strong>IBGE SIDRA (Tabela 1086)</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={carregarDados}
            disabled={loading}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-600' : ''}`} />
            <span>Atualizar Cotações</span>
          </button>
        </div>

        {/* Cotações CEPEA */}
        {mercadoData && (
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              Cotações de Referência CEPEA / ESALQ
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="p-5 bg-gradient-to-br from-emerald-50/70 to-teal-50/70 rounded-2xl border border-emerald-200/80 shadow-2xs">
                <span className="text-xs font-bold text-emerald-900 block">Preço Médio Leite Produtor (CEPEA)</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-emerald-950">
                    R$ {mercadoData.cotacoes_cepea_referencia?.preco_medio_leite_cepea?.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-emerald-700">/ litro</span>
                </div>
                <p className="text-[11px] text-emerald-600 mt-1 font-medium">Média Brasil ponderada CEPEA</p>
              </div>

              <div className="p-5 bg-gradient-to-br from-amber-50/70 to-orange-50/70 rounded-2xl border border-amber-200/80 shadow-2xs">
                <span className="text-xs font-bold text-amber-900 block">Milho Grão (Saca 60kg - Campinas/SP)</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-amber-950">
                    R$ {mercadoData.cotacoes_cepea_referencia?.milho_saca_60kg_campinas?.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-amber-700">/ saca</span>
                </div>
                <p className="text-[11px] text-amber-600 mt-1 font-medium">Indicador ESALQ / BM&F Bovespa</p>
              </div>

              <div className="p-5 bg-gradient-to-br from-blue-50/70 to-indigo-50/70 rounded-2xl border border-blue-200/80 shadow-2xs">
                <span className="text-xs font-bold text-blue-900 block">Farelo de Soja (Paranaguá/PR)</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-blue-950">
                    R$ {mercadoData.cotacoes_cepea_referencia?.farelo_soja_tonelada_paranagua?.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-blue-700">/ ton</span>
                </div>
                <p className="text-[11px] text-blue-600 mt-1 font-medium">Base exportação / granel</p>
              </div>

            </div>
          </div>
        )}

        {/* Tabela de Aquisição de Leite Cru - IBGE SIDRA */}
        {mercadoData && (
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                Aquisição Trimestral de Leite Cru no Brasil (IBGE - Tabela 1086)
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Fonte: {mercadoData.ibge_aquisicao_leite?.fonte}
              </span>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Período / Trimestre</th>
                    <th className="p-3.5">Volume Captado</th>
                    <th className="p-3.5">Variação / Contexto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mercadoData.ibge_aquisicao_leite?.dados?.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-3.5 font-bold text-slate-800 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {item.periodo}
                      </td>
                      <td className="p-3.5 font-mono font-bold text-indigo-700">
                        {item.volume_mil_litros.toLocaleString('pt-BR')} mil Litros
                      </td>
                      <td className="p-3.5 text-slate-500 font-medium">{item.descricao}</td>
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
