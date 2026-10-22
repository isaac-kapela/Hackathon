import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronRight, 
  Check, 
  AlertCircle, 
  Bookmark, 
  Award,
  Sparkles,
  Thermometer,
  HeartPulse,
  Wheat,
  Activity,
  DollarSign,
  Droplets,
  Layers
} from 'lucide-react';

export default function ExplanationModule({ regrasDisparadas = [], memoriaTrabalho = {} }) {
  const [openRuleId, setOpenRuleId] = useState(regrasDisparadas?.[0]?.id || null);

  if (!regrasDisparadas || regrasDisparadas.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/90 p-8 sm:p-10 text-center text-slate-500">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-red-600 border border-red-100 shadow-sm">
          <Award className="w-7 h-7" />
        </div>
        <h4 className="text-lg font-black text-slate-900 mb-1">Nenhuma Não-Conformidade Crítica Detectada</h4>
        <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
          O rebanho atende às metas zootécnicas, bioclimáticas e econômicas da Embrapa Gado de Leite e aos padrões sanitários da IN 76/77 do MAPA.
        </p>
      </div>
    );
  }

  const categoryBadges = {
    financeira: { bg: 'bg-red-50 text-red-700 border-red-200', icon: DollarSign },
    qualidade: { bg: 'bg-cyan-50 text-cyan-700 border-cyan-200', icon: Droplets },
    zootecnica: { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: Activity },
    mercado: { bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: Sparkles },
    ambiencia: { bg: 'bg-orange-50 text-orange-700 border-orange-200', icon: Thermometer },
    saude: { bg: 'bg-rose-50 text-rose-700 border-rose-200', icon: HeartPulse },
    nutricao: { bg: 'bg-lime-50 text-lime-800 border-lime-200', icon: Wheat },
    operacional: { bg: 'bg-purple-50 text-purple-700 border-purple-200', icon: Layers }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200/90 p-6 sm:p-7 space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-red-500/10 text-red-700 rounded-2xl border border-red-500/20">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">Módulo de Explicação & Trilha de Auditoria</h3>
            <p className="text-xs text-slate-500">Transparência determinística: visualize a cadeia lógica (SE → ENTÃO) de cada regra disparada</p>
          </div>
        </div>

        <span className="text-xs font-mono font-black px-3.5 py-1.5 bg-slate-100 text-slate-700 rounded-full border border-slate-200/80">
          {regrasDisparadas.length} regra(s) disparada(s)
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

          const catConf = categoryBadges[regra.categoria] || { bg: 'bg-slate-100 text-slate-600 border-slate-200', icon: Activity };
          const CatIcon = catConf.icon;

          return (
            <div
              key={regra.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? 'border-slate-300 shadow-md bg-white ring-1 ring-slate-200' : 'border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenRuleId(isOpen ? null : regra.id)}
                className="w-full px-5 py-4 text-left flex items-center justify-between focus:outline-none"
              >
                <div className="flex items-center space-x-3.5">
                  <span className="font-mono text-xs font-black px-2.5 py-1 bg-slate-200/80 text-slate-800 rounded-xl">
                    #{idx + 1} {regra.id}
                  </span>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm leading-snug">{regra.nome}</h4>
                    <div className="flex items-center space-x-2 mt-1.5">
                      <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${statusBadge}`}>
                        {regra.conclusao?.status}
                      </span>
                      <span className={`text-[10px] font-bold capitalize px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${catConf.bg}`}>
                        <CatIcon className="w-3 h-3" />
                        <span>{regra.categoria}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs text-slate-500">
                  <div className="text-right hidden sm:block">
                    <span className="font-mono font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-lg text-[11px] block">
                      CF: +{regra.cf}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Prioridade {regra.prioridade}</span>
                  </div>
                  {isOpen ? <ChevronDown className="w-5 h-5 text-slate-500" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-white space-y-4 text-sm animate-fadeIn">
                  
                  {/* Bloco 1: Premissas SE (IF) */}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                      1. Condições Verificadas na Memória de Trabalho (Premissas SE)
                    </span>
                    <div className="bg-slate-50 rounded-2xl p-3 font-mono text-xs space-y-2 border border-slate-200/80">
                      {regra.condicoesAvaliadas?.map((c, cIdx) => (
                        <div key={cIdx} className="flex items-center space-x-2.5 text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/70 shadow-2xs">
                          <div className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs">
                            <strong className="text-indigo-900">{c.campo}</strong> {c.operador} <strong>{c.valorEsperado}</strong>
                            {' '}→ <span className="text-slate-500">Valor Observado:</span> <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">{typeof c.valorObservado === 'number' ? c.valorObservado.toFixed(2) : String(c.valorObservado)}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bloco 2: Diagnóstico Técnico ENTÃO (THEN) */}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                      2. Diagnóstico Técnico (ENTÃO)
                    </span>
                    <p className="text-slate-800 font-semibold bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 text-xs sm:text-sm">
                      {regra.conclusao?.resumo}
                    </p>
                  </div>

                  {/* Bloco 3: Plano de Ação Recomendado */}
                  <div className="bg-gradient-to-br from-red-50/80 via-rose-50/60 to-red-50/80 border border-red-200/90 rounded-2xl p-4 text-red-950">
                    <span className="text-[10px] font-black uppercase tracking-wider text-red-800 mb-1.5 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1.5 text-red-700" />
                      Recomendação Zootécnica & Manejo Corretivo
                    </span>
                    <p className="text-xs leading-relaxed font-medium">{regra.conclusao?.recomendacao}</p>
                  </div>

                  {/* Bloco 4: Referência Oficial */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
                    <div className="flex items-center space-x-1.5">
                      <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                      <span>Embasamento: <strong className="text-slate-700 font-bold">{regra.conclusao?.fonte}</strong></span>
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