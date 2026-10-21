import React, { useState, useEffect } from 'react';
import { BookOpen, Database, Bookmark, Shield, CheckCircle2 } from 'lucide-react';
import { apiService } from '../services/api';

export default function BaseConhecimentoPage() {
  const [regras, setRegras] = useState([]);
  const [variaveis, setVariaveis] = useState([]);
  const [activeSubTab, setActiveSubTab] = useState('regras');

  useEffect(() => {
    apiService.obterRegras()
      .then(data => setRegras(data.regras || []))
      .catch(err => console.error(err));

    apiService.obterVariaveis()
      .then(data => setVariaveis(data.variaveis || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-6 pb-16">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-600" />
              Base de Conhecimento Explícita & Versionada
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Todas as regras e variáveis são auditáveis e independentes de LLM, com respaldo técnico da Embrapa Gado de Leite, CEPEA e MAPA.
            </p>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveSubTab('regras')}
              className={`px-4 py-1.5 rounded-md transition-all ${
                activeSubTab === 'regras' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Regras de Produção ({regras.length})
            </button>
            <button
              onClick={() => setActiveSubTab('variaveis')}
              className={`px-4 py-1.5 rounded-md transition-all ${
                activeSubTab === 'variaveis' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dicionário de Variáveis ({variaveis.length})
            </button>
          </div>
        </div>

        {/* Visualização de Regras de Produção */}
        {activeSubTab === 'regras' && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {regras.map((r) => {
                const isCritico = r.conclusao.status === 'CRITICO';
                const isAlerta = r.conclusao.status === 'ALERTA';

                return (
                  <div 
                    key={r.id} 
                    className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {r.id}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-semibold text-slate-500">
                            Prioridade: {r.prioridade}
                          </span>
                          <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                            CF: {Math.round(r.cf * 100)}%
                          </span>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-slate-800 mb-1">{r.nome}</h4>
                      <p className="text-xs text-slate-600 mb-3">{r.conclusao.resumo}</p>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-150 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Condições (Premissas)
                        </span>
                        <ul className="space-y-1">
                          {r.condicoes.map((c, idx) => (
                            <li key={idx} className="text-xs font-mono text-slate-700">
                              <span className="font-semibold text-emerald-700">{c.campo}</span> {c.operador} <span className="font-semibold text-slate-900">{c.valor}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="capitalize font-medium">Categoria: {r.categoria}</span>
                      <span className="truncate max-w-[200px]" title={r.conclusao.fonte}>{r.conclusao.fonte}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Visualização de Dicionário de Variáveis */}
        {activeSubTab === 'variaveis' && (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Identificador</th>
                  <th className="p-3">Nome Amigável</th>
                  <th className="p-3">Categoria</th>
                  <th className="p-3">Tipo / Unidade</th>
                  <th className="p-3">Padrão</th>
                  <th className="p-3">Descrição Técnica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {variaveis.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-mono font-semibold text-indigo-700">{v.id}</td>
                    <td className="p-3 font-semibold text-slate-800">{v.nome}</td>
                    <td className="p-3 capitalize">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-medium">
                        {v.categoria}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">{v.tipo} ({v.unidade})</td>
                    <td className="p-3 font-mono text-slate-800 font-medium">{v.padrao}</td>
                    <td className="p-3 text-slate-500 max-w-xs">{v.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
