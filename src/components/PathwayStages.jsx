import React from 'react';
import { PATHWAY_STAGES } from '../data/metabolismData';
import { Sparkles, ArrowRight, Layers, HelpCircle } from 'lucide-react';

export default function PathwayStages({ onSelectStage }) {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            Step-by-Step Zone 2 Metabolic Pathway
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Explore the 8 sequential cellular stages that turn fats and glucose into ATP during Zone 2.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PATHWAY_STAGES.map((stage, idx) => (
          <div
            key={stage.id}
            onClick={() => onSelectStage(stage.id)}
            className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs font-bold font-mono">
                  0{idx + 1}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  {stage.badge}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                {stage.name}
              </h3>
              <p className="text-xs font-medium text-slate-400 mt-0.5 mb-3">
                {stage.subtitle}
              </p>

              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                {stage.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
              <span>Inspect Details</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
