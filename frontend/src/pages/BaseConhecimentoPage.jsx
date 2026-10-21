import React, { useState, useEffect } from 'react';
import { BookOpen, Database, Bookmark, Shield, CheckCircle2, Search, Filter, Sparkles, Layers } from 'lucide-react';
import { apiService } from '../services/api';

export default function BaseConhecimentoPage() {
  const [regras, setRegras] = useState([]);
  const [variaveis, setVariaveis] = useState([]);
  const [activeSubTab, setActiveSubTab] = useState('regras');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');

  useEffect(() => {
    apiService.obterRegras()
      .then(data => setRegras(data.regras || []))
      .catch(err => console.error(err));

    apiService.obterVariaveis()
      .then(data => setVariaveis(data.variaveis || []))
      .catch(err => console.error(err));
  }, []);

  const filteredRegras = regras.filter(r => {
    const matchesSearch = r.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.conclusao?.resumo?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todas' || r.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredVariaveis = variaveis.filter(v => {
    return v.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
           v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
           v.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const categoryPills = [
    { id: 'todas', label: 'Todas' },
    { id: 'financeira', label: 'Financeira (COE/COT)' },
    { id: 'qualidade', label: 'Qualidade (IN 76/77)' },
    { id: 'zootecnica', label: 'Zootécnica' },
    { id: 'mercado', label: 'Mercado (CEPEA)' }
  ];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header da Base de Conhecimento */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/90 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Base de Conhecimento Declarativa
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Regras e variáveis estruturadas e auditáveis, com fundamentação técnica na <strong>Embrapa Gado de Leite</strong>, <strong>MAPA</strong> e <strong>CEPEA</strong>.
              </p>
            </div>
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
            <button
              onClick={() => { setActiveSubTab('regras'); setSearchTerm(''); }}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeSubTab === 'regras' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Regras de Produção ({regras.length})
            </button>
            <button
              onClick={() => { setActiveSubTab('variaveis'); setSearchTerm(''); }}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeSubTab === 'variaveis' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dicionário de Variáveis ({variaveis.length})
            </button>
          </div>
        </div>

        {/* Barra de Pesquisa e Filtros */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder={activeSubTab === 'regras' ? 'Buscar regra por nome ou ID...' : 'Buscar variável...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {activeSubTab === 'regras' && (
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {categoryPills.map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedCategory(pill.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === pill.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Visualização de Regras de Produção */}
        {activeSubTab === 'regras' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {filteredRegras.map((r) => {
              const isCritico = r.conclusao?.status === 'CRITICO';
              const isAlerta = r.conclusao?.status === 'ALERTA';

              return (
                <div 
                  key={r.id} 
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                        {r.id}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-slate-500">
                          Prioridade: {r.prioridade}
                        </span>
                        <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                          CF: +{r.cf}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-sm font-black text-slate-900 mb-1">{r.nome}</h4>
                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">{r.conclusao?.resumo}</p>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                        Condições Lógicas (Premissas SE)
                      </span>
                      <ul className="space-y-1">
                        {r.condicoes.map((c, idx) => (
                          <li key={idx} className="text-xs font-mono text-slate-700 bg-white p-1.5 rounded border border-slate-100">
                            <span className="font-bold text-indigo-900">{c.campo}</span> {c.operador} <span className="font-bold text-slate-900">{c.valor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="capitalize font-bold text-slate-600">Categoria: {r.categoria}</span>
                    <span className="truncate max-w-[220px] font-medium" title={r.conclusao?.fonte}>
                      {r.conclusao?.fonte}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Visualização de Dicionário de Variáveis */}
        {activeSubTab === 'variaveis' && (
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Identificador</th>
                  <th className="p-3.5">Nome Amigável</th>
                  <th className="p-3.5">Categoria</th>
                  <th className="p-3.5">Tipo / Unidade</th>
                  <th className="p-3.5">Padrão</th>
                  <th className="p-3.5">Descrição Técnica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVariaveis.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-indigo-700">{v.id}</td>
                    <td className="p-3.5 font-bold text-slate-800">{v.nome}</td>
                    <td className="p-3.5 capitalize">
                      <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full text-[11px] font-bold border border-slate-200">
                        {v.categoria}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600">{v.tipo} ({v.unidade})</td>
                    <td className="p-3.5 font-mono text-slate-900 font-bold">{v.padrao}</td>
                    <td className="p-3.5 text-slate-500 max-w-xs">{v.descricao}</td>
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
