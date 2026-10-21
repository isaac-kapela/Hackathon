import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function CertaintyFactorGauge({ statusGeral, cf, totalRegrasDisparadas }) {
  // Posicionamento do marcador de CF (-1 a +1 normalizado para 0 a 100%)
  // CF = -1 -> 0%, CF = 0 -> 50%, CF = 1 -> 100%
  const clampedCF = Math.max(-1, Math.min(1, cf || 0));
  const percentPosition = ((clampedCF + 1) / 2) * 100;

  const isCritico = statusGeral === 'CRITICO';
  const isAlerta = statusGeral === 'ALERTA';
  const isSaudavel = statusGeral === 'SAUDAVEL' || statusGeral === 'SUCESSO';

  let statusBadge = {
    bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    icon: <CheckCircle className="w-5 h-5 text-emerald-600 inline mr-1.5" />,
    label: 'Propriedade Eficiente & Saudável'
  };

  if (isCritico) {
    statusBadge = {
      bg: 'bg-red-100 text-red-800 border-red-300',
      icon: <XCircle className="w-5 h-5 text-red-600 inline mr-1.5" />,
      label: 'Emergência / Risco Crítico'
    };
  } else if (isAlerta) {
    statusBadge = {
      bg: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 inline mr-1.5" />,
      label: 'Alerta Operacional / Reprodutivo'
    };
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Resultado da Triagem Especialista
          </span>
          <h2 className="text-xl font-bold text-slate-800">Diagnóstico Zootécnico & Econômico</h2>
        </div>
        <div className={`px-4 py-1.5 rounded-full text-sm font-bold border flex items-center shadow-sm ${statusBadge.bg}`}>
          {statusBadge.icon}
          {statusBadge.label}
        </div>
      </div>

      {/* Régua de Fator de Certeza (CF) inspirada no slide da RERUM */}
      <div className="mt-5">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-1">
          <span>Fator de Certeza Combinado (CF): <strong className="text-slate-800 text-sm font-mono">{cf > 0 ? `+${cf}` : cf}</strong></span>
          <span>{totalRegrasDisparadas} regra(s) disparada(s)</span>
        </div>

        {/* Barra Gradiente Tri-color */}
        <div className="relative w-full h-4 rounded-full overflow-hidden flex bg-slate-200 shadow-inner">
          <div className="w-1/3 bg-emerald-500 h-full" title="Zona Saudável (-1.0 a -0.33)"></div>
          <div className="w-1/3 bg-amber-400 h-full" title="Zona de Alerta (-0.33 a +0.33)"></div>
          <div className="w-1/3 bg-rose-500 h-full" title="Zona Crítica (+0.33 a +1.0)"></div>
        </div>

        {/* Marcador do CF */}
        <div className="relative w-full h-5 mt-1">
          <div
            className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center transition-all duration-500"
            style={{ left: `${percentPosition}%` }}
          >
            <div className="w-0.5 h-3 bg-slate-900"></div>
            <span className="text-[10px] font-mono font-bold text-slate-800 bg-slate-100 px-1 rounded shadow-xs">
              {cf > 0 ? `+${cf}` : cf}
            </span>
          </div>
        </div>

        {/* Escala numérica */}
        <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-0.5 px-1">
          <span>-1.0 (Seguro)</span>
          <span>0.0 (Neutro)</span>
          <span>+0.4 (Atenção)</span>
          <span>+0.7</span>
          <span>+1.0 (Crítico)</span>
        </div>
      </div>
    </div>
  );
}
