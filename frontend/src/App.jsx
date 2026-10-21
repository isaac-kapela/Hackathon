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

      <main className="flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-6">
        {activeTab === 'diagnostico' && <DiagnosticoPage />}
        {activeTab === 'conhecimento' && <BaseConhecimentoPage />}
        {activeTab === 'mercado' && <MercadoPage />}
      </main>

      <footer className="bg-white border-t border-slate-200 py-5 text-center text-xs text-slate-500 mt-8">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-semibold text-slate-700">
            <strong>Hackathon UFJF 2026</strong> • XXVIII Semana da Computação DCC/UFJF & RERUM Engenharia de Sistemas
          </span>
          <span className="font-mono text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Motor Determinístico Baseado em Regras & Fatos • 100% Localhost
          </span>
        </div>
      </footer>
    </div>
  );
}
