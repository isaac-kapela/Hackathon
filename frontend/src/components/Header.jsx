import React from 'react';
import { Cpu, BookOpen, TrendingUp, Sparkles, ShieldCheck, Activity, Presentation, ExternalLink } from 'lucide-react';

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
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg shadow-red-950/40 border-2 border-red-500/40 bg-slate-800 flex items-center justify-center">
                <img 
                  src="/logo.jpeg" 
                  alt="MicroLeiteMacroNegocios Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600 border-2 border-slate-900"></span>
              </span>
            </div>
            
            <div>
              <div className="flex items-center space-x-2.5">
                <h1 className="font-black text-xl text-white tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  MicroLeiteMacroNegocios
                </h1>
                <span className="text-[11px] bg-red-500/15 text-red-400 font-bold px-2.5 py-0.5 rounded-full border border-red-500/30 tracking-wide uppercase">
                  Hackathon UFJF 2026 (32h)
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Sistema Especialista Zootécnico & Econômico • <span className="text-red-400/90 font-semibold">Tema 3</span>
              </p>
            </div>
          </div>

          {/* Navigation Tabs & Presentation Button */}
          <div className="flex items-center gap-3">
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
                        ? 'bg-gradient-to-r from-red-700 to-rose-700 text-white shadow-md shadow-red-950/40'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <a
                href="/apresentacao.html"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-red-500/15 to-red-600/15 hover:from-red-500/25 hover:to-red-600/25 border border-red-400/30 text-red-300 hover:text-red-200 rounded-xl text-xs font-bold transition-all shadow-sm"
                title="Abrir Apresentação do Produto (Slides em HTML/PDF)"
              >
                <Presentation className="w-3.5 h-3.5 text-red-400" />
                <span>Pitch Produto</span>
                <ExternalLink className="w-2.5 h-2.5 text-red-400/60" />
              </a>

              <a
                href="/apresentacao_processo_ia.html"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-indigo-500/15 to-indigo-600/15 hover:from-indigo-500/25 hover:to-indigo-600/25 border border-indigo-400/30 text-indigo-300 hover:text-indigo-200 rounded-xl text-xs font-bold transition-all shadow-sm"
                title="Abrir Apresentação de Metodologia, Sadrey + Scrum e Parceria Humano + IA"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Metodologia & IA</span>
                <ExternalLink className="w-2.5 h-2.5 text-indigo-400/60" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
