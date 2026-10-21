import React from 'react';

export default function KpiCard({ title, value, unit, subtitle, alertType = 'neutral', icon: Icon, targetText }) {
  const alertStyles = {
    neutral: 'bg-white border-slate-200/90 text-slate-900',
    success: 'bg-emerald-50/50 border-emerald-200/80 text-emerald-950',
    warning: 'bg-amber-50/50 border-amber-200/80 text-amber-950',
    danger: 'bg-rose-50/50 border-rose-200/80 text-rose-950'
  };

  const badgeStyles = {
    neutral: 'bg-slate-100 text-slate-600',
    success: 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30',
    warning: 'bg-amber-500 text-white shadow-sm shadow-amber-500/30',
    danger: 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
  };

  return (
    <div className={`p-4 rounded-2xl border shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${alertStyles[alertType]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-xl ${badgeStyles[alertType]}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline space-x-1.5">
        <span className="text-2xl font-black tracking-tight">{value}</span>
        {unit && <span className="text-xs font-semibold text-slate-500">{unit}</span>}
      </div>

      <div className="mt-2 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[11px]">
        {subtitle && <span className="text-slate-500 truncate">{subtitle}</span>}
        {targetText && (
          <span className="font-semibold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded text-[10px]">
            {targetText}
          </span>
        )}
      </div>
    </div>
  );
}
