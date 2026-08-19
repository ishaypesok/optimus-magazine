import React from 'react';
import { ZONES } from '../data/metabolismData';
import { Flame, MessageCircle, AlertTriangle, Sparkles, HeartPulse, CheckCircle2, Sliders, ArrowRightLeft } from 'lucide-react';

export default function ZoneControls({ currentZoneId, setCurrentZoneId }) {
  const currentZone = ZONES.find(z => z.id === currentZoneId) || ZONES[1];

  return (
    <section className="glass-panel rounded-2xl p-5 md:p-6 mb-6 shadow-xl border border-slate-800 relative">
      
      {/* Top Header & Presets */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-100">Exercise Intensity Zone Controller</h2>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <Sliders className="w-3 h-3" /> How to Switch: Drag Slider or Click Any Card Below
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Change exercise intensity (Zone 1 to Zone 5) to observe fuel selection, oxygen demand, and lactate dynamics live.
          </p>
        </div>
      </div>

      {/* Main Interactive Slider Bar */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2.5">
          <span className="flex items-center gap-1 text-slate-300">🧘 Zone 1 (Recovery)</span>
          <span className="text-emerald-400 flex items-center gap-1 font-extrabold text-sm animate-pulse">
            <Flame className="w-4 h-4" /> Zone 2: FATmax Sweetspot (Peak Fat Burn)
          </span>
          <span className="flex items-center gap-1 text-rose-400">💥 Zone 5 (VO2 Max)</span>
        </div>

        {/* Custom Range Slider Input */}
        <div className="relative flex items-center py-2">
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={currentZoneId}
            onChange={(e) => setCurrentZoneId(parseInt(e.target.value))}
            className="w-full h-4 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none ring-2 ring-emerald-500/30 shadow-inner"
          />
        </div>

        <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-1">
          <span>50-60% HR</span>
          <span className="text-teal-300">60-70% HR (Zone 2)</span>
          <span>70-80% HR</span>
          <span>80-90% HR</span>
          <span className="text-rose-400">90-100% HR</span>
        </div>
      </div>

      {/* Giant Clickable Zone Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-5">
        {ZONES.map((z) => {
          const isSelected = z.id === currentZoneId;
          return (
            <button
              key={z.id}
              onClick={() => setCurrentZoneId(z.id)}
              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? `${z.badgeColor} shadow-lg scale-[1.02] ring-2 ring-current border-current`
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{z.name}</span>
                {z.id === 2 && (
                  <span className="bg-emerald-500 text-slate-950 text-[9px] uppercase font-extrabold px-1.5 py-0.2 rounded-full">
                    FATmax
                  </span>
                )}
              </div>
              <div className="text-[11px] font-semibold text-slate-200 truncate mt-0.5">{z.label}</div>
              <div className="text-[10px] text-slate-400 mt-1">{z.hrRange}</div>

              {isSelected && (
                <div className="absolute bottom-1 right-1 text-[10px] font-extrabold text-emerald-400 flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Active
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Zone Detail Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="md:col-span-2 glass-card p-4 rounded-xl border border-slate-800/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-extrabold px-2.5 py-1 rounded-lg border ${currentZone.badgeColor}`}>
                {currentZone.name}: {currentZone.label}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                O₂ Demand: <strong className="text-cyan-300">{currentZone.o2Demand}</strong>
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium mb-3">
              {currentZone.metabolicState}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-300 block">Pyruvate Fate:</span>
                  <span className="text-slate-400 text-[11px]">{currentZone.pyruvateFate}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-start gap-2">
                {currentZone.lactate > 3.0 ? (
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-semibold text-slate-300 block">Lactate Dynamics:</span>
                  <span className="text-slate-400 text-[11px]">{currentZone.lactateStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conversational Pace Indicator */}
        <div className="glass-card p-4 rounded-xl border border-slate-800/90 flex flex-col justify-between bg-gradient-to-b from-slate-900/90 to-slate-900/40">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-2">
              <MessageCircle className="w-4 h-4 text-cyan-400" />
              <span>Talk Test Gauge</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-cyan-500/20 text-xs text-slate-200 leading-snug">
              {currentZone.conversationalText}
            </div>
          </div>

          {currentZone.id === 2 && (
            <div className="mt-3 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-2">
              <span className="text-base">💡</span>
              <span><strong>Pro Tip:</strong> In Zone 2, your slow-twitch muscle fibers burn fat & clear lactate effortlessly!</span>
            </div>
          )}
        </div>

      </div>

    </section>
  );
}
