import React from 'react';
import { ZONES } from '../data/metabolismData';
import { Flame, MessageCircle, AlertTriangle, Sparkles, HeartPulse, CheckCircle2, Sliders, ArrowRightLeft } from 'lucide-react';

export default function ZoneControls({ currentZoneId, setCurrentZoneId }) {
  const currentZone = ZONES.find(z => z.id === currentZoneId) || ZONES[1];

  return (
    <section className="magazine-page p-5 md:p-6 mb-6 shadow-sm border border-stone-200 relative text-stone-900">
      
      {/* Top Header & Presets */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg font-bold font-serif text-stone-900">Exercise Intensity Zone Controller</h2>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
              <Sliders className="w-3 h-3" /> Drag Slider or Click Any Card Below
            </span>
          </div>
          <p className="text-xs text-stone-600 mt-1">
            Change exercise intensity (Zone 1 to Zone 5) to observe fuel selection, oxygen demand, and lactate dynamics live.
          </p>
        </div>
      </div>

      {/* Main Interactive Slider Bar */}
      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 mb-5">
        <div className="flex items-center justify-between text-xs font-bold text-stone-600 mb-2.5">
          <span className="flex items-center gap-1 text-stone-700">🧘 Zone 1 (Recovery)</span>
          <span className="text-emerald-800 flex items-center gap-1 font-extrabold text-sm">
            <Flame className="w-4 h-4 text-emerald-700" /> Zone 2: FATmax Sweetspot (Peak Fat Burn)
          </span>
          <span className="flex items-center gap-1 text-rose-700">💥 Zone 5 (VO2 Max)</span>
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
            className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700 transition"
          />
        </div>
      </div>

      {/* Zone Selector Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {ZONES.map((z) => {
          const isSelected = z.id === currentZoneId;
          const isZone2 = z.id === 2;

          return (
            <button
              key={z.id}
              onClick={() => setCurrentZoneId(z.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? isZone2
                    ? 'bg-emerald-700 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500'
                    : 'bg-stone-900 text-white border-stone-900 shadow-md'
                  : isZone2
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 hover:bg-emerald-100'
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center justify-between font-bold text-xs">
                <span>{z.name}</span>
                <span className="text-[10px] opacity-80">{z.hrRange}</span>
              </div>
              <div className="text-[11px] font-mono mt-1 opacity-90 font-semibold">
                Fat: {z.fatOxidation}% | Carb: {z.carbOxidation}%
              </div>
            </button>
          );
        })}
      </div>

    </section>
  );
}
