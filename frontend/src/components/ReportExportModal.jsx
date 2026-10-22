import React from 'react';
import { X, Printer, Download, FileText, Award, AlertTriangle, CheckCircle2, ShieldCheck, Thermometer, Activity, DollarSign, Droplets } from 'lucide-react';

export default function ReportExportModal({ isOpen, onClose, resultado, indicadores }) {
  if (!isOpen || !resultado) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ resultado, indicadores }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `laudo-tecnico-especialista-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const regras = resultado.regrasDisparadas || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-100 text-red-700 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800">Laudo Técnico de Consultoria Especialista</h3>
              <p className="text-xs text-slate-500">Auditoria zootécnica, sanitária, bioclimática e financeira</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Imprimir Laudo</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadJson}
              className="px-3.5 py-2 text-xs font-bold text-red-700 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Download className="w-4 h-4 text-red-600" />
              <span>Exportar JSON</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Corpo do Relatório */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-800 print:p-0">
          
          {/* Cabeçalho do Laudo */}
          <div className="border-b border-slate-200 pb-5">
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-start gap-3.5">
                <img 
                  src="/logo.jpeg" 
                  alt="MicroLeiteMacroNegocios Logo" 
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
                />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    MicroLeiteMacroNegocios • Hackathon UFJF 2026 (56h)
                  </span>
                  <h1 className="text-2xl font-black text-slate-900 mt-1">Laudo Especialista de Avaliação Zootécnica & Econômica</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Fundamentação: Embrapa Gado de Leite, MAPA IN 76/77, NRC Dairy Cattle e CEPEA</p>
                </div>
              </div>
              <div className="text-right text-xs text-slate-500 font-medium shrink-0">
                <p>Data de Emissão: <strong className="text-slate-800">{new Date().toLocaleDateString('pt-BR')}</strong></p>
                <p className="mt-1">
                  Status Geral: <span className={`font-black uppercase px-2 py-0.5 rounded text-[11px] ${
                    resultado.statusGeral === 'CRITICO' ? 'bg-rose-100 text-rose-800' : resultado.statusGeral === 'ALERTA' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>{resultado.statusGeral}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Resumo de Indicadores Chave */}
          {indicadores && (
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">1. Síntese dos Indicadores Auditados</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Produção Diária</span>
                  <span className="text-sm font-black text-slate-900">{indicadores.producao_diaria} L/dia</span>
                  <span className="text-[10px] text-slate-400 block">{indicadores.vacas_lactacao} vacas em lactação</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">DEL & IEP Médios</span>
                  <span className="text-sm font-black text-slate-900">{indicadores.del_medio} d / {indicadores.iep_meses} m</span>
                  <span className="text-[10px] text-slate-400 block">TXP: {indicadores.taxa_prenhez}%</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Margem Líquida (COT)</span>
                  <span className={`text-sm font-black ${indicadores.margem_liquida_litro > 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    R$ {indicadores.margem_liquida_litro?.toFixed(2)}/L
                  </span>
                  <span className="text-[10px] text-slate-400 block">Lucro CT: R$ {indicadores.lucro_litro?.toFixed(2)}/L</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Ambiência & Sanidade</span>
                  <span className="text-sm font-black text-slate-900">ITU: {indicadores.itu} ({indicadores.status_estresse_termico})</span>
                  <span className="text-[10px] text-slate-400 block">CCS: {indicadores.ccs}k • CBT: {indicadores.cbt}k</span>
                </div>
              </div>
            </div>
          )}

          {/* Regras Disparadas e Recomendações */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">2. Conclusões Especialistas & Recomendações de Manejo ({regras.length} regras)</h4>
            <div className="space-y-3">
              {regras.map((c, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-black px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                        {c.id}
                      </span>
                      <span className="text-sm font-black text-slate-800">{c.nome}</span>
                    </div>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full font-mono">
                      CF: +{c.cf}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{c.conclusao?.resumo}</p>
                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 text-xs text-amber-950">
                    <strong className="text-amber-900">Recomendação Técnica:</strong> {c.conclusao?.recomendacao}
                  </div>
                  <p className="text-[10px] text-slate-400 italic">Fonte: {c.conclusao?.fonte}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
            <p>Sistema Especialista Zootécnico & Econômico • Desenvolvido com Motor Baseado em Regras Determinísticas</p>
          </div>

        </div>
      </div>
    </div>
  );
}