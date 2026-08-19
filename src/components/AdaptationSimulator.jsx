import React, { useState } from 'react';
import { Sliders, Sparkles, TrendingUp, ShieldCheck, Flame, Cpu, Award } from 'lucide-react';

export default function AdaptationSimulator() {
  const [weeks, setWeeks] = useState(8);

  // Compute physiological adaptations based on training weeks
  const mitoDensity = 100 + weeks * 7.5; // % relative to baseline
  const fatMaxCap = (0.35 + weeks * 0.035).toFixed(2); // g/min fat oxidation at FATmax
  const cpt1Density = 100 + weeks * 6.0; // %
  const lactateThresholdPace = 100 + weeks * 2.5; // % speed at LT1

  return (
    <section className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-teal-400" />
            <h2 className="text-xl font-bold text-slate-100">Mitochondrial Adaptation Simulator</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Slide consistency to see how weeks of Zone 2 training trigger Mitochondrial Biogenesis (PGC-1α).
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Training Consistency: <strong>{weeks} Weeks</strong></span>
        </div>
      </div>

      {/* Interactive Slider */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
          <span>Untrained Baseline (0 Weeks)</span>
          <span className="text-emerald-400 font-extrabold">Consistent Zone 2 Base (12 Weeks)</span>
        </div>

        <input
          type="range"
          min="0"
          max="12"
          step="1"
          value={weeks}
          onChange={(e) => setWeeks(parseInt(e.target.value))}
          className="w-full h-3 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-teal-400 focus:outline-none ring-1 ring-slate-800"
        />

        <div className="flex justify-between text-[11px] text-slate-500 mt-2">
          <span>0w</span>
          <span>3w</span>
          <span>6w</span>
          <span>9w</span>
          <span>12w (Peak Base)</span>
        </div>
      </div>

      {/* Live Metric Adaptations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* Mitochondrial Density */}
        <div className="glass-card p-4 rounded-xl border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Mitochondria Count</span>
            <Cpu className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-teal-300 mb-1">
            +{Math.round(mitoDensity - 100)}%
          </div>
          <p className="text-[11px] text-slate-400">
            More mitochondria built via PGC-1α master gene expression!
          </p>
        </div>

        {/* FATmax Burning Capacity */}
        <div className="glass-card p-4 rounded-xl border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Peak Fat Oxidation</span>
            <Flame className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-300 mb-1">
            {fatMaxCap} <span className="text-xs font-normal text-slate-400">g/min</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Burns double the fat per minute compared to untrained!
          </p>
        </div>

        {/* CPT-1 Gatekeeper Enzymes */}
        <div className="glass-card p-4 rounded-xl border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>CPT-1 Gate Density</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-300 mb-1">
            +{Math.round(cpt1Density - 100)}%
          </div>
          <p className="text-[11px] text-slate-400">
            More carnitine transporters to shuttle lipids into matrix!
          </p>
        </div>

        {/* Speed at Aerobic Threshold */}
        <div className="glass-card p-4 rounded-xl border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>LT1 Speed Threshold</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-cyan-300 mb-1">
            +{Math.round(lactateThresholdPace - 100)}%
          </div>
          <p className="text-[11px] text-slate-400">
            You go faster at the same easy conversational heart rate!
          </p>
        </div>

      </div>

      {/* Visual Comparison: Untrained vs Trained Cell */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs leading-relaxed text-slate-300 flex flex-col md:flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-2xl shrink-0">
          🧬
        </div>
        <div>
          <h4 className="font-bold text-slate-200 text-sm mb-0.5">Why Zone 2 is the Longevity & Performance Engine</h4>
          <p className="text-slate-400">
            High intensity sprints (Zone 5) build cytosolic power, but <strong>Zone 2</strong> builds the underlying cellular hardware—multiplying mitochondrial surface area, expanding fat oxidation threshold, and protecting against metabolic dysfunction.
          </p>
        </div>
      </div>
    </section>
  );
}
