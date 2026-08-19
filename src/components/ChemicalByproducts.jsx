import React from 'react';
import { CHEMICAL_BYPRODUCTS } from '../data/metabolismData';
import { TestTube, Sparkles, Droplets, Wind, Zap, Shield, ArrowRight } from 'lucide-react';

export default function ChemicalByproducts() {
  return (
    <section className="max-w-6xl mx-auto mb-12">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl mb-8 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40">
        <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-widest text-cyan-400 mb-2">
          <TestTube className="w-4 h-4" />
          <span>Biochemical Inputs & Outputs</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-100 mb-2 bg-gradient-to-r from-cyan-200 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
          Chemical By-Products & Molecular Substrates
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          Detailed scientific breakdown of what enters the cell, what powers the mitochondrial turbine, and where every chemical output ($CO_2$, $H_2O$, $ATP$, $H^+$, Lactate) goes during Zone 2 exercise.
        </p>
      </div>

      {/* Grid of By-Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CHEMICAL_BYPRODUCTS.map((item) => (
          <div
            key={item.id}
            className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.cardBg} border border-white/10 flex items-center justify-center text-2xl shrink-0 shadow-md`}>
                    {item.emoji}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{item.name}</h3>
                    <div className="text-xs font-mono font-bold text-slate-400">{item.formula}</div>
                  </div>
                </div>
              </div>

              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border mb-4 inline-block ${item.color}`}>
                {item.role}
              </span>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="font-semibold text-slate-400 block mb-0.5">🌱 Origin / Source:</span>
                  <span className="text-slate-300 leading-relaxed">{item.origin}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="font-semibold text-slate-400 block mb-0.5">🏁 Ultimate Fate / Destination:</span>
                  <span className="text-slate-300 leading-relaxed">{item.fate}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs">
              <strong>Zone 2 Impact:</strong> {item.zone2Importance}
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
