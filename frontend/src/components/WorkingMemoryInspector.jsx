import React, { useState } from 'react';
import { Database, ChevronDown, ChevronUp, Search } from 'lucide-react';

export default function WorkingMemoryInspector({ workingMemory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  if (!workingMemory) return null;

  const entries = Object.entries(workingMemory).filter(([key]) =>
    key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/70 hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-indigo-600" />
          <div className="text-left">
            <h4 className="text-sm font-semibold text-slate-800">
              Inspecionar Memória de Trabalho ({Object.keys(workingMemory).length} fatos gerados)
            </h4>
            <p className="text-xs text-slate-500">
              Estado interno dos fatos avaliados pelo motor de inferência
            </p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>

      {isOpen && (
        <div className="p-6 border-t border-slate-200">
          <div className="mb-4 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Filtrar fato por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3.5 max-h-96 overflow-y-auto p-1">
            {entries.map(([key, value]) => (
              <div key={key} className="p-3.5 bg-slate-50/80 hover:bg-slate-100/80 transition-colors rounded-xl border border-slate-200 text-xs flex flex-col justify-between">
                <span className="font-mono text-indigo-700 block font-bold truncate" title={key}>
                  {key}
                </span>
                <span className="font-semibold text-slate-900 mt-2 block text-sm">
                  {typeof value === 'number' ? (Number.isInteger(value) ? value : value.toFixed(3)) : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
