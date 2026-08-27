import React, { useState, useEffect } from 'react';
import { KREBS_STEPS } from '../data/metabolismData';
import { RotateCw, Play, Pause, Sparkles, CheckCircle2, ChevronLeft, ChevronRight, Zap, Droplet, Wind } from 'lucide-react';

export default function KrebsCycleDetail() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const step = KREBS_STEPS[activeStepIdx];

  // Auto-rotation timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIdx((prev) => (prev + 1) % KREBS_STEPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="max-w-6xl mx-auto mb-12">
      
      {/* Top Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl mb-8 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-2">
              <RotateCw className="w-4 h-4 animate-spin-slow" />
              <span>The Energy Carousel (TCA Cycle)</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-100 mb-2 bg-gradient-to-r from-amber-200 via-yellow-200 to-emerald-300 bg-clip-text text-transparent">
              Interactive Krebs Cycle Visualizer
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              Explore the 8 enzymatic steps inside the mitochondrial matrix that strip high-energy electrons from Acetyl-CoA to power the Electron Transport Chain!
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs font-medium">
              <span>💡 <strong>Quick Bioenergetics Q&A:</strong> How many Krebs cycles are in 1 mitochondrion? <strong>Zero physical structures!</strong> The Krebs cycle is a <em>chemical reaction pathway</em> running millions of times per second across thousands of matrix enzymes.</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all shadow-md"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
              <span>{isPlaying ? "Pause Carousel" : "Auto Play"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Wheel & Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Interactive Circular Wheel (7 Columns on LG) */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-slate-800 shadow-2xl relative flex items-center justify-center min-h-[420px] bg-slate-950/80">
          
          {/* Central Core */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-amber-500/20 via-yellow-500/10 to-emerald-500/20 border border-amber-500/40 flex flex-col items-center justify-center text-center p-2 z-10 shadow-2xl backdrop-blur-md">
            <div className="text-2xl mb-0.5">🎡</div>
            <div className="text-xs font-extrabold text-amber-300">1 Cycle Turn</div>
            <div className="text-[10px] text-slate-400 mt-0.5 font-mono">3 NADH • 1 FADH₂<br/>1 ATP • 2 CO₂</div>
          </div>

          {/* Circular Connecting Ring */}
          <div className="absolute w-72 h-72 rounded-full border-2 border-dashed border-amber-500/30 animate-spin-slow pointer-events-none" />

          {/* 8 Step Nodes placed in a circle */}
          {KREBS_STEPS.map((s, idx) => {
            const angle = (idx / 8) * (2 * Math.PI) - Math.PI / 2;
            const radius = 135; // px from center
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isCurrent = idx === activeStepIdx;

            return (
              <button
                key={s.step}
                onClick={() => {
                  setActiveStepIdx(idx);
                  setIsPlaying(false);
                }}
                style={{
                  transform: `translate(${x}px, ${y}px)`
                }}
                className={`absolute w-12 h-12 rounded-2xl flex items-center justify-center text-lg transition-all duration-300 z-20 shadow-xl border ${
                  isCurrent
                    ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 scale-125 ring-4 ring-amber-400/40 border-white font-bold'
                    : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-amber-400 hover:scale-110'
                }`}
                title={`Step ${s.step}: ${s.name}`}
              >
                <span>{s.emoji}</span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Step Inspector Card (5 Columns on LG) */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[420px] bg-slate-900/90">
          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                Step {step.step} of 8 — {step.emoji}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setActiveStepIdx((activeStepIdx - 1 + KREBS_STEPS.length) % KREBS_STEPS.length);
                    setIsPlaying(false);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setActiveStepIdx((activeStepIdx + 1) % KREBS_STEPS.length);
                    setIsPlaying(false);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-100 mb-1">{step.name}</h3>
            <div className="text-xs font-semibold text-teal-400 mb-3">Enzyme: {step.enzyme}</div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed mb-4">
              {step.description}
            </div>

            {/* Reaction Substrate & Products */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 font-semibold block text-[10px]">Input Substrate:</span>
                <span className="font-bold text-amber-300">{step.substrate}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 font-semibold block text-[10px]">Output Product:</span>
                <span className="font-bold text-emerald-300">{step.product}</span>
              </div>
            </div>

            {/* By-Products Emitted */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs text-slate-400 font-semibold">Outputs Emitted:</span>
              {step.byproducts.map((bp, i) => (
                <span key={i} className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-yellow-300 border border-slate-700">
                  {bp}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs">
            <strong>Zone 2 Relevance:</strong> {step.zone2Highlight}
          </div>

        </div>

      </div>

    </section>
  );
}
