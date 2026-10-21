import React from 'react';
import { X, Printer, Download, FileText } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-800">Laudo Técnico de Diagnóstico Especialista</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </button>
            <button
              type="button"
              onClick={handleDownloadJson}
              className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar JSON
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Corpo do Relatório */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-800 print:p-0">
          {/* Cabeçalho do Laudo */}
          <div className="border-b border-slate-200 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-bold text-slate-900">Relatório de Consultoria Zootécnica & Econômica</h1>
                <p className="text-xs text-slate-500">Fundamentação: Metodologia Embrapa Gado de Leite & Normativa MAPA IN 76/77</p>
              </div>
              <div className="text-right text-xs text-slate-500">
                <p>Data: {new Date().toLocaleDateString('pt-BR')}</p>
                <p>Status: <span className="font-bold text-slate-800">{resultado.statusGeral}</span></p>
              </div>
            </div>
          </div>

          {/* Resumo de Indicadores Chave */}
          {indicadores && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">1. Síntese de Indicadores Operacionais</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Produção Diária</span>
                  <span className="text-sm font-bold text-slate-800">{indicadores.producao_diaria} L/dia</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">DEL Médio</span>
                  <span className="text-sm font-bold text-slate-800">{indicadores.del_medio} dias</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Margem Líquida</span>
                  <span className="text-sm font-bold text-slate-800">R$ {indicadores.margem_liquida_litro?.toFixed(2)}/L</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Qualidade (CCS / CBT)</span>
                  <span className="text-sm font-bold text-slate-800">{indicadores.ccs}k / {indicadores.cbt}k</span>
                </div>
              </div>
            </div>
          )}

          {/* Regras Disparadas e Recomendações */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">2. Conclusões Especialistas e Ações Recomendadas</h4>
            <div className="space-y-3">
              {regras.map((c, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {c.id}
                      </span>
                      <span className="text-sm font-bold text-slate-800">{c.nome}</span>
                    </div>
                    <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      CF: +{c.cf}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{c.conclusao?.resumo}</p>
                  <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-200/60 text-xs text-amber-900">
                    <strong>Recomendação Técnica:</strong> {c.conclusao?.recomendacao}
                  </div>
                  <p className="mt-1.5 text-[10px] text-slate-400 italic">Fonte: {c.conclusao?.fonte}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
