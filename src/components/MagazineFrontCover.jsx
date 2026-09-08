import React from 'react';
import { BookOpen, Flame, Cpu, ShieldCheck, Award, Zap, Activity } from 'lucide-react';

export default function MagazineFrontCover() {
  return (
    <div className="w-full min-h-[950px] p-8 sm:p-12 bg-stone-950 text-white rounded-3xl border-4 border-emerald-600/40 shadow-2xl relative overflow-hidden flex flex-col justify-between font-sans">
      
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Cover Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b-2 border-emerald-500/40 pb-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
            Official Collector's Print Edition • Issue 01
          </span>
          <div className="text-xs text-stone-400 font-mono">Published September 2026 • Bioenergetics Science Press</div>
        </div>
        <div className="px-4 py-1.5 rounded-full bg-emerald-950 text-emerald-300 font-mono text-xs font-bold border border-emerald-600/60 shadow-lg">
          32 Complete Articles
        </div>
      </div>

      {/* Main Title & Logo Section */}
      <div className="relative z-10 my-8 space-y-6 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-3xl overflow-hidden border-4 border-emerald-500/80 shadow-2xl bg-black shrink-0">
            <img src="./optimus-logo.jpg" alt="Optimus Magazine Logo" className="w-full h-full object-cover" />
          </div>
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500 text-stone-950 font-black text-xs uppercase tracking-widest">
              <Zap className="w-4 h-4" />
              The Bioenergetics & Longevity Journal
            </div>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white leading-none font-masthead">
              OPTIMUS MAGAZINE
            </h1>
            <p className="text-lg sm:text-xl text-stone-300 font-light max-w-2xl leading-relaxed">
              The Friendly & Precise Guide to Zone 2 Exercise, FATmax Substrate Oxidation, Mitochondrial Biogenesis & Human Longevity.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Cover Stories Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 my-6 border-t border-b border-stone-800 py-8">
        
        <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
          <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
            🔥 Lead Feature • Article 5
          </span>
          <h3 className="font-bold text-white text-base leading-snug">
            FATmax Science & Bioenergetics
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Unlocking the exact exercise speed where fat oxidation peaks and blood lactate remains at steady state.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
          <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
            🎙️ Special Feature • Article 32
          </span>
          <h3 className="font-bold text-white text-base leading-snug">
            How Mitochondria Control Metabolism
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Dr. Jared Rutter on Huberman Lab: MPC1/MPC2 pyruvate carriers, cell fate decisions, and cancer rewiring.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
          <span className="text-[11px] font-mono font-bold text-teal-400 uppercase tracking-wider block">
            🏃 Telemetry • Article 3 & 8
          </span>
          <h3 className="font-bold text-white text-base leading-snug">
            Ishai Athlete Profile & 10K Tracker
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Real Apple Watch Ultra run data, heart rate drift analysis, and the 12-week recomposition blueprint.
          </p>
        </div>

      </div>

      {/* Cover Footer & Barcode Placeholder */}
      <div className="relative z-10 flex flex-wrap items-end justify-between gap-4 pt-4 text-xs font-mono text-stone-400">
        <div className="space-y-1">
          <div className="font-bold text-stone-200">OPTIMUS PRESS • ISRAEL EDITION</div>
          <div>ISSN 2958-4821 • PEER-REVIEWED PHYSIOLOGY DATA</div>
        </div>

        {/* Decorative Barcode Box */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white text-stone-900 border border-stone-300 shadow-sm">
          <div className="space-y-0.5">
            <div className="h-7 w-32 bg-[repeating-linear-gradient(90deg,#000,#000_2px,#fff_2px,#fff_4px,#000_4px,#000_7px,#fff_7px,#fff_9px)]" />
            <div className="text-[9px] font-mono font-bold text-center tracking-widest">9 772958 482001</div>
          </div>
          <div className="text-[10px] font-bold font-sans text-emerald-900">
            PRINT EDITION<br />VOL 1.0
          </div>
        </div>
      </div>

    </div>
  );
}
