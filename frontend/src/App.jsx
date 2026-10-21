import React, { useState } from 'react';
import Header from './components/Header';
import DiagnosticoPage from './pages/DiagnosticoPage';
import BaseConhecimentoPage from './pages/BaseConhecimentoPage';
import MercadoPage from './pages/MercadoPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('diagnostico');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'diagnostico' && <DiagnosticoPage />}
        {activeTab === 'conhecimento' && <BaseConhecimentoPage />}
        {activeTab === 'mercado' && <MercadoPage />}
      </main>

      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            <strong>Hackathon UFJF 2026</strong> • XXVIII Semana da Computação DCC/UFJF & RERUM Engenharia de Sistemas
          </span>
          <span className="font-mono text-[11px] text-slate-400">
            Motor Determinístico Baseado em Regras & Fatos • 100% Localhost
          </span>
        </div>
      </footer>
    </div>
  );
}
