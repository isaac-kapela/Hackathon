import React from 'react';
import { Cpu, BookOpen, TrendingUp, Sparkles, ShieldCheck, Activity } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'diagnostico', label: 'Diagnóstico & Simulação', icon: Activity },
    { id: 'conhecimento', label: 'Base de Conhecimento', icon: BookOpen },
    { id: 'mercado', label: 'Mercado & Benchmarks', icon: TrendingUp },
  ];

  return (
    <header className="bg-slate-900/95 backdrop-blur-md text-white shadow-xl border-b border-slate-800/80 sticky top-0 z-50 transition-all">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3.5">
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-700 p-2.5 rounded-2xl text-white shadow-lg shadow-emerald-950/40 border border-emerald-400/30">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            
            <div>
              <div className="flex items-center space-x-2.5">
                <h1 className="font-black text-xl text-white tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  RERUM AgroExpert
                </h1>
                <span className="text-[11px] bg-emerald-500/15 text-emerald-400 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 tracking-wide uppercase">
                  Hackathon UFJF 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Sistema Especialista Zootécnico & Econômico • <span className="text-emerald-400/90 font-semibold">Tema 3</span>
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

        </div>
      </div>
    </header>
  );
}
