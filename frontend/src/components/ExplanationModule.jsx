import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronRight, Check, AlertCircle, Bookmark, ShieldAlert, Award, FileSpreadsheet } from 'lucide-react';

export default function ExplanationModule({ regrasDisparadas = [], memoriaTrabalho = {} }) {
  const [openRuleId, setOpenRuleId] = useState(regrasDisparadas?.[0]?.id || null);

  if (!regrasDisparadas || regrasDisparadas.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center text-slate-500">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
          <Award className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-slate-800 mb-1">Nenhuma Não-Conformidade Detectada</h4>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          O rebanho atende a todas as metas zootécnicas da Embrapa e aos padrões sanitários da IN 76/77 do MAPA.
        </p>
      </div>
    );
  }

  const categoryBadges = {
    financeira: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    qualidade: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    zootecnica: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    mercado: 'bg-amber-50 text-amber-700 border-amber-200'
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">Módulo de Explicação Interativo</h3>
            <p className="text-xs text-slate-500">Trilha de auditoria transparente: entenda o porquê de cada decisão</p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
          {regrasDisparadas.length} regra(s) no Audit Trail
        </span>
      </div>

      <div className="space-y-3">
        {regrasDisparadas.map((regra, idx) => {
          const isOpen = openRuleId === regra.id;
          const isCritico = regra.conclusao?.status === 'CRITICO';
          const isSucesso = regra.conclusao?.status === 'SUCESSO';

          let statusBadge = 'bg-amber-100 text-amber-900 border-amber-200';
          if (isCritico) statusBadge = 'bg-rose-100 text-rose-900 border-rose-200';
          if (isSucesso) statusBadge = 'bg-emerald-100 text-emerald-900 border-emerald-200';

          return (
            <div
              key={regra.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? 'border-slate-300 shadow-md bg-white ring-1 ring-slate-200' : 'border-slate-200 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenRuleId(isOpen ? null : regra.id)}
                className="w-full px-5 py-4 text-left flex items-center justify-between focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-200 text-slate-800 rounded-lg">
                    #{idx + 1} {regra.id}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-snug">{regra.nome}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${statusBadge}`}>
                        {regra.conclusao?.status}
                      </span>
                      <span className={`text-[10px] font-semibold capitalize px-2 py-0.5 rounded-full border ${categoryBadges[regra.categoria] || 'bg-slate-100 text-slate-600'}`}>
                        {regra.categoria}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs text-slate-500">
                  <div className="text-right hidden sm:block">
                    <span className="font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded text-[11px] block">
                      CF: +{regra.cf}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Prioridade {regra.prioridade}</span>
                  </div>
                  {isOpen ? <ChevronDown className="w-5 h-5 text-slate-500" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-white space-y-4 text-sm">
                  
                  {/* Bloco 1: Premissas SE (IF) */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      1. Condições Verificadas na Memória de Trabalho (Premissas SE)
                    </span>
                    <div className="bg-slate-50 rounded-xl p-3 font-mono text-xs space-y-2 border border-slate-200/80">
                      {regra.condicoesAvaliadas?.map((c, cIdx) => (
                        <div key={cIdx} className="flex items-center space-x-2.5 text-slate-700 bg-white p-2 rounded-lg border border-slate-100 shadow-2xs">
                          <div className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span>
                            <strong className="text-indigo-900">{c.campo}</strong> {c.operador} <strong>{c.valorEsperado}</strong>
                            {' '}→ <span className="text-slate-500">Valor Atual:</span> <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">{typeof c.valorObservado === 'number' ? c.valorObservado.toFixed(2) : String(c.valorObservado)}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bloco 2: Diagnóstico Técnico ENTÃO (THEN) */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      2. Diagnóstico / Conclusão (ENTÃO)
                    </span>
                    <p className="text-slate-800 font-semibold bg-slate-50/70 p-3 rounded-xl border border-slate-150">
                      {regra.conclusao?.resumo}
                    </p>
                  </div>

                  {/* Bloco 3: Plano de Ação Recomendado */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-xl p-4 text-emerald-950">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 mb-1.5 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1 text-emerald-700" />
                      Recomendação de Manejo / Ação Corretiva
                    </span>
                    <p className="text-xs leading-relaxed font-medium">{regra.conclusao?.recomendacao}</p>
                  </div>

                  {/* Bloco 4: Referência Oficial */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-100">
                    <div className="flex items-center space-x-1.5">
                      <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                      <span>Embasamento Técnico: <strong className="text-slate-700">{regra.conclusao?.fonte}</strong></span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">ID da Regra: {regra.id}</span>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
