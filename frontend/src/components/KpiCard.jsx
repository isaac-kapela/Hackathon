import React from 'react';

export default function KpiCard({ title, value, unit, subtitle, alertType = 'neutral', icon: Icon }) {
  const alertStyles = {
    neutral: 'bg-white border-slate-200 text-slate-800',
    success: 'bg-emerald-50/60 border-emerald-200 text-emerald-900',
    warning: 'bg-amber-50/60 border-amber-200 text-amber-900',
    danger: 'bg-rose-50/60 border-rose-200 text-rose-900'
  };

  const badgeStyles = {
    neutral: 'bg-slate-100 text-slate-600',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-rose-100 text-rose-700'
  };

  return (
    <div className={`p-4 rounded-xl border shadow-sm transition-all hover:shadow-md ${alertStyles[alertType]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`p-1.5 rounded-lg ${badgeStyles[alertType]}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold tracking-tight">{value}</span>
        {unit && <span className="text-xs font-medium text-slate-500">{unit}</span>}
      </div>
      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 leading-tight">{subtitle}</p>
      )}
    </div>
  );
}
