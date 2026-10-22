import React from 'react';
import { Cpu, BookOpen, TrendingUp, Sparkles, ShieldCheck, Activity, Presentation, ExternalLink } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'diagnostico', label: 'Diagnóstico & Simulação', icon: Activity },
    { id: 'conhecimento', label: 'Base de Conhecimento', icon: BookOpen },
    { id: 'mercado', label: 'Mercado & Benchmarks', icon: TrendingUp },
  ];

  return (
    <header className="bg-gradient-to-r from-red-950 via-[#900000] to-rose-950 text-white shadow-2xl border-b border-red-800/80 sticky top-0 z-50 transition-all">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3.5">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-xl shadow-red-950/70 border-2 border-red-300/60 bg-red-900/60 flex items-center justify-center">
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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-red-950"></span>
              </span>
            </div>
            
            <div>
              <div className="flex items-center space-x-2.5">
                <h1 className="font-black text-xl text-white tracking-tight bg-gradient-to-r from-white via-rose-100 to-rose-200 bg-clip-text text-transparent">
                  MicroLeiteMacroNegocios
                </h1>
                <span className="text-[11px] bg-red-500/30 text-rose-200 font-bold px-2.5 py-0.5 rounded-full border border-red-400/40 tracking-wide uppercase">
                  Hackathon UFJF 2026 (32h)
                </span>
              </div>
              <p className="text-xs text-rose-200/80 font-medium">
                Sistema Especialista Zootécnico & Econômico • <span className="text-white font-semibold">Tema 3</span>
              </p>
            </div>
          </div>

          {/* Navigation Tabs & Presentation Button */}
          <div className="flex items-center gap-3">
            <nav className="flex items-center bg-red-950/80 p-1.5 rounded-2xl border border-red-800/80 shadow-inner">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-950/60 border border-red-400/30'
                        : 'text-rose-200/90 hover:text-white hover:bg-red-900/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-rose-300'}`} />
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
                className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-rose-900/80 to-red-900/80 hover:from-rose-800 hover:to-red-800 border border-rose-400/50 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-950/40"
                title="Abrir Apresentação Oficial Unificada (Produto, Metodologia Sadrey, Scrum e Parceria com IA)"
              >
                <Presentation className="w-3.5 h-3.5 text-rose-300" />
                <span>Apresentação Completa (Slides/PDF)</span>
                <ExternalLink className="w-2.5 h-2.5 text-rose-300/80" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
