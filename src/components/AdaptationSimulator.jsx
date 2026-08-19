import React, { useState } from 'react';
import { Sliders, Sparkles, TrendingUp, ShieldCheck, Flame, Cpu } from 'lucide-react';

export default function AdaptationSimulator() {
  const [weeks, setWeeks] = useState(8);

  // Compute physiological adaptations based on training weeks
  const mitoDensity = 100 + weeks * 7.5; // % relative to baseline
  const fatMaxCap = (0.35 + weeks * 0.035).toFixed(2); // g/min fat oxidation at FATmax
  const cpt1Density = 100 + weeks * 6.0; // %
  const lactateThresholdPace = 100 + weeks * 2.5; // % speed at LT1

  return (
    <section className="bg-stone-50 rounded-2xl p-6 border border-stone-200 shadow-xs mb-8 font-sans text-stone-900">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-700" />
            <h2 className="text-xl font-extrabold text-stone-900">Mitochondrial Adaptation Simulator</h2>
          </div>
          <p className="text-xs text-stone-700 font-medium mt-1">
            Slide consistency to see how weeks of Zone 2 training trigger Mitochondrial Biogenesis (PGC-1α).
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-emerald-900 text-white text-xs font-bold flex items-center gap-2 shadow-xs shrink-0">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>Training Consistency: <strong className="text-emerald-200">{weeks} Weeks</strong></span>
        </div>
      </div>

      {/* Interactive Slider */}
      <div className="mb-8 p-4 rounded-xl bg-white border border-stone-200">
        <div className="flex justify-between text-xs font-bold text-stone-700 mb-2">
          <span>Untrained Baseline (0 Weeks)</span>
          <span className="text-emerald-800 font-extrabold">Consistent Zone 2 Base (12 Weeks)</span>
        </div>

        <input
          type="range"
          min="0"
          max="12"
          step="1"
          value={weeks}
          onChange={(e) => setWeeks(parseInt(e.target.value))}
          className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700 focus:outline-none"
        />

        <div className="flex justify-between text-[11px] font-semibold text-stone-600 mt-2">
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
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-1">
            <span>Mitochondria Count</span>
            <Cpu className="w-4 h-4 text-teal-700" />
          </div>
          <div className="text-2xl font-extrabold text-teal-800 mb-1">
            +{Math.round(mitoDensity - 100)}%
          </div>
          <p className="text-xs text-stone-700 font-medium leading-relaxed">
            More mitochondria built via PGC-1α master gene expression!
          </p>
        </div>

        {/* FATmax Burning Capacity */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-1">
            <span>Peak Fat Oxidation</span>
            <Flame className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-800 mb-1">
            {fatMaxCap} <span className="text-xs font-semibold text-stone-600">g/min</span>
          </div>
          <p className="text-xs text-stone-700 font-medium leading-relaxed">
            Burns double the fat per minute compared to untrained!
          </p>
        </div>

        {/* CPT-1 Gatekeeper Enzymes */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-1">
            <span>CPT-1 Gate Density</span>
            <ShieldCheck className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-extrabold text-amber-800 mb-1">
            +{Math.round(cpt1Density - 100)}%
          </div>
          <p className="text-xs text-stone-700 font-medium leading-relaxed">
            More carnitine transporters to shuttle lipids into matrix!
          </p>
        </div>

        {/* Speed at Aerobic Threshold */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-1">
            <span>LT1 Speed Threshold</span>
            <TrendingUp className="w-4 h-4 text-cyan-700" />
          </div>
          <div className="text-2xl font-extrabold text-cyan-800 mb-1">
            +{Math.round(lactateThresholdPace - 100)}%
          </div>
          <p className="text-xs text-stone-700 font-medium leading-relaxed">
            You go faster at the same easy conversational heart rate!
          </p>
        </div>

      </div>

      {/* Visual Comparison: Untrained vs Trained Cell */}
      <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs leading-relaxed text-stone-800 flex flex-col md:flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-2xl shrink-0">
          🧬
        </div>
        <div>
          <h4 className="font-bold text-stone-900 text-sm mb-0.5">Why Zone 2 is the Longevity & Performance Engine</h4>
          <p className="text-stone-700 font-normal">
            High intensity sprints (Zone 5) build cytosolic power, but <strong>Zone 2</strong> builds the underlying cellular hardware—multiplying mitochondrial surface area, expanding fat oxidation threshold, and protecting against metabolic dysfunction.
          </p>
        </div>
      </div>
    </section>
  );
}
