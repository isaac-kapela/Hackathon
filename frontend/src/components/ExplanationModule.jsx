import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronRight, Check, AlertCircle, Bookmark } from 'lucide-react';

export default function ExplanationModule({ regrasDisparadas, memoriaTrabalho }) {
  const [openRuleId, setOpenRuleId] = useState(regrasDisparadas[0]?.id || null);

  if (!regrasDisparadas || regrasDisparadas.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center text-slate-500">
        Nenhuma regra de anomalia disparada. O rebanho está dentro dos parâmetros normais.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center space-x-2 pb-4 border-b border-slate-100">
        <HelpCircle className="w-5 h-5 text-emerald-600" />
        <h3 className="text-lg font-bold text-slate-800">Módulo de Explicação: Como o sistema chegou a isso?</h3>
      </div>

      <p className="text-xs text-slate-500 mt-2 mb-4">
        O motor de inferência avaliou todas as regras de produção contra os fatos da fazenda. 
        Abaixo está o <strong>traço auditável</strong> das regras que foram disparadas em ordem de prioridade:
      </p>

      <div className="space-y-3">
        {regrasDisparadas.map((regra, idx) => {
          const isOpen = openRuleId === regra.id;
          const isCritico = regra.conclusao.status === 'CRITICO';
          const isSucesso = regra.conclusao.status === 'SUCESSO';

          let badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
          if (isCritico) badgeColor = 'bg-rose-100 text-rose-800 border-rose-200';
          if (isSucesso) badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';

          return (
            <div
              key={regra.id}
              className="border border-slate-200 rounded-lg overflow-hidden transition-all bg-slate-50/50 hover:border-slate-300"
            >
              <button
                onClick={() => setOpenRuleId(isOpen ? null : regra.id)}
                className="w-full px-4 py-3 text-left flex items-center justify-between focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-200 text-slate-700 rounded">
                    #{idx + 1} {regra.id}
                  </span>
                  <span className="font-semibold text-slate-800 text-sm">{regra.nome}</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
                    {regra.conclusao.status}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-500">
                  <span className="font-mono">CF: +{regra.cf}</span>
                  <span className="font-mono">Prio: {regra.prioridade}</span>
                  {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-200/60 bg-white space-y-3 text-sm">
                  {/* Premissas / Condições Satisfeitas */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Condições Verificadas na Memória de Trabalho (Premissas SE)
                    </h4>
                    <div className="bg-slate-50 rounded p-2.5 font-mono text-xs space-y-1 border border-slate-100">
                      {regra.condicoesAvaliadas.map((c, cIdx) => (
                        <div key={cIdx} className="flex items-center space-x-2 text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>
                            <strong>{c.campo}</strong> {c.operador} <strong>{c.valorEsperado}</strong>
                            {' '}→ <em>(Valor Real: <span className="text-emerald-700 font-bold">{c.valorObservado}</span>)</em>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Diagnóstico / Resumo */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Conclusão / Diagnóstico (ENTÃO)
                    </h4>
                    <p className="text-slate-800 font-medium">{regra.conclusao.resumo}</p>
                  </div>

                  {/* Recomendação Zootécnica e Econômica */}
                  <div className="bg-emerald-50/60 border border-emerald-100 rounded p-3 text-emerald-950">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      Recomendação de Ação Imediata
                    </h4>
                    <p className="text-xs leading-relaxed">{regra.conclusao.recomendacao}</p>
                  </div>

                  {/* Fonte Técnica */}
                  <div className="flex items-center text-xs text-slate-400 pt-1">
                    <Bookmark className="w-3 h-3 mr-1 text-slate-400" />
                    <span>Fonte: <strong>{regra.conclusao.fonte}</strong></span>
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
