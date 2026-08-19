import React from 'react';
import { PATHWAY_STAGES } from '../data/metabolismData';
import { X, ChevronLeft, ChevronRight, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PathwayDetailModal({ stageId, onClose, onSelectStage }) {
  if (!stageId) return null;

  const stageIndex = PATHWAY_STAGES.findIndex(s => s.id === stageId);
  const stage = PATHWAY_STAGES[stageIndex] || PATHWAY_STAGES[0];

  const prevStage = PATHWAY_STAGES[(stageIndex - 1 + PATHWAY_STAGES.length) % PATHWAY_STAGES.length];
  const nextStage = PATHWAY_STAGES[(stageIndex + 1) % PATHWAY_STAGES.length];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-2xl rounded-2xl border border-slate-700 shadow-2xl p-6 relative overflow-hidden bg-slate-900/95">
        
        {/* Top Header & Badge */}
        <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              {stage.badge}
            </span>
            <h3 className="text-2xl font-bold text-slate-100 mt-2">{stage.name}</h3>
            <p className="text-xs font-medium text-slate-400">{stage.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Detailed Explanation */}
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 leading-relaxed">
            {stage.description}
          </div>

          {/* Zone 2 Specific Physiological Impact */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200">
            <div className="flex items-center gap-2 font-bold text-emerald-300 mb-1">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Zone 2 Pathway Highlight</span>
            </div>
            <p className="leading-relaxed">{stage.zone2Fact}</p>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-800">
          <button
            onClick={() => onSelectStage(prevStage.id)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{prevStage.name.split(' ')[1]}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-bold transition-all shadow-md"
          >
            Got it!
          </button>

          <button
            onClick={() => onSelectStage(nextStage.id)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
          >
            <span>{nextStage.name.split(' ')[1]}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
