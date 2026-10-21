import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle, ShieldAlert, Zap } from 'lucide-react';

export default function CertaintyFactorGauge({ statusGeral, cf, totalRegrasDisparadas }) {
  const clampedCF = Math.max(-1, Math.min(1, cf !== undefined && cf !== null ? cf : 0));
  // CF = -1 -> 0%, CF = 0 -> 50%, CF = 1 -> 100%
  const percentPosition = ((clampedCF + 1) / 2) * 100;

  const isCritico = statusGeral === 'CRITICO';
  const isAlerta = statusGeral === 'ALERTA';
  const isSaudavel = statusGeral === 'SAUDAVEL' || statusGeral === 'SUCESSO';

  let config = {
    bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800',
    badgeBg: 'bg-emerald-600 text-white',
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
    label: 'Propriedade Eficiente & Saudável',
    desc: 'Os parâmetros zootécnicos e financeiros estão equilibrados conforme as metas da Embrapa.'
  };

  if (isCritico) {
    config = {
      bg: 'bg-rose-500/10 border-rose-500/30 text-rose-950',
      badgeBg: 'bg-rose-600 text-white',
      icon: <XCircle className="w-5 h-5 text-rose-600" />,
      label: 'Emergência / Risco Crítico',
      desc: 'Detecção de queima de caixa (COE > Receita) ou mastite severa acima do limite legal (MAPA IN 76/77).'
    };
  } else if (isAlerta) {
    config = {
      bg: 'bg-amber-500/10 border-amber-500/30 text-amber-950',
      badgeBg: 'bg-amber-600 text-white',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
      label: 'Alerta Operacional / Reprodutivo',
      desc: 'Indicadores como DEL, IEP ou custos fixos apresentam desvio e demandam correção de manejo.'
    };
  }

  return (
    <div className={`rounded-2xl border p-6 transition-all shadow-sm ${config.bg} bg-white`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Triagem do Sistema Especialista
            </span>
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isCritico ? 'bg-rose-400' : isAlerta ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isCritico ? 'bg-rose-500' : isAlerta ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-0.5">Diagnóstico Consolidado</h2>
          <p className="text-xs text-slate-500 mt-0.5">{config.desc}</p>
        </div>

        <div className={`px-4 py-2 rounded-xl text-xs font-black shadow-sm flex items-center space-x-2 ${config.badgeBg}`}>
          {config.label}
        </div>
      </div>

      {/* Régua de Fator de Certeza (MYCIN CF) */}
      <div className="mt-5">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-2">
          <div className="flex items-center space-x-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Fator de Certeza Combinado (MYCIN CF):</span>
            <span className="font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
              {clampedCF > 0 ? `+${clampedCF.toFixed(2)}` : clampedCF.toFixed(2)}
            </span>
          </div>
          <span className="text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            {totalRegrasDisparadas} regra(s) acionada(s)
          </span>
        </div>

        {/* Barra Gradiente Tri-color com Marcador Suave */}
        <div className="relative w-full h-5 rounded-full overflow-hidden flex bg-slate-100 shadow-inner border border-slate-200">
          <div className="w-1/3 bg-gradient-to-r from-emerald-500 to-teal-400 h-full" title="Zona Saudável (-1.0 a -0.33)"></div>
          <div className="w-1/3 bg-gradient-to-r from-amber-400 to-orange-400 h-full" title="Zona de Alerta (-0.33 a +0.33)"></div>
          <div className="w-1/3 bg-gradient-to-r from-rose-500 to-red-600 h-full" title="Zona Crítica (+0.33 a +1.0)"></div>
        </div>

        {/* Cursor do Fator de Certeza */}
        <div className="relative w-full h-6 mt-1.5">
          <div
            className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center transition-all duration-700 ease-out"
            style={{ left: `${percentPosition}%` }}
          >
            <div className="w-1 h-3.5 bg-slate-900 rounded-full shadow-sm"></div>
            <span className="text-[10px] font-mono font-black text-slate-900 bg-white border border-slate-300 shadow-md px-1.5 py-0.5 rounded-md mt-0.5 whitespace-nowrap">
              CF {clampedCF > 0 ? `+${clampedCF.toFixed(2)}` : clampedCF.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Escala explicativa */}
        <div className="flex justify-between text-[10px] font-mono font-semibold text-slate-400 mt-1 px-1">
          <span className="text-emerald-700">-1.0 (Meta Atingida)</span>
          <span className="text-amber-700">0.0 (Neutro)</span>
          <span className="text-rose-700">+1.0 (Risco Imediato)</span>
        </div>
      </div>
    </div>
  );
}
