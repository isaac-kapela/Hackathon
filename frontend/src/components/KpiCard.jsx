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
    <div className={`p-5 sm:p-6 rounded-3xl border shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${alertStyles[alertType]} flex flex-col justify-between`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-2xl ${badgeStyles[alertType]}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline space-x-2 my-1">
        <span className="text-2xl sm:text-3xl font-black tracking-tight">{value}</span>
        {unit && <span className="text-xs sm:text-sm font-bold text-slate-500">{unit}</span>}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100/90 flex items-center justify-between text-xs gap-2">
        {subtitle && <span className="text-slate-500 truncate font-medium">{subtitle}</span>}
        {targetText && (
          <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md text-[11px] shrink-0 border border-emerald-200/70">
            {targetText}
          </span>
        )}
      </div>
    </div>
  );
}
