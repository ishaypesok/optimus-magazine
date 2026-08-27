import React from 'react';
import { 
  BookOpen, Sparkles, Compass, ShieldCheck, Flame, Zap, 
  Activity, ChevronRight, Award, Layers, Cpu, Heart, CheckCircle2, Target, Globe
} from 'lucide-react';

export default function ForewordMission({ setPage }) {
  return (
    <div className="space-y-8 animate-fade-in font-sans text-stone-900">
      
      {/* Top Header Badge & Title */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider border border-emerald-300 inline-flex items-center gap-1.5 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            Page 25 • Editor's Foreword & Mission Statement
          </span>
          <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 font-extrabold text-xs border border-teal-200">
            Why Optimus Magazine Exists
          </span>
        </div>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-stone-900 leading-tight tracking-tight">
          Why Optimus Magazine Exists: Bridging Fitness Wearables & Cellular Bioenergetics
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-4xl font-normal">
          From black-box calorie counts to opening the cellular hood of human metabolism—how personal fitness telemetry becomes an interactive journey through cellular science.
        </p>
      </div>

      {/* Hero Origin Story Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-950 text-white space-y-5 shadow-lg border border-stone-800">
        
        <div className="flex items-center gap-3 text-emerald-400 font-extrabold text-base border-b border-white/10 pb-3">
          <Compass className="w-5 h-5 text-emerald-400" />
          <span>The Origin Story: From Budget Tracking to Cellular Bioenergetics</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-stone-200 leading-relaxed font-normal">
          <div className="space-y-3">
            <p>
              When managing personal finances, off-the-shelf platforms like <strong>Firefly III</strong> provide complete, standardized double-entry accounting. The math of money is solved—there is no need to reinvent a ledger app from scratch.
            </p>
            <p>
              However, when looking at consumer health and exercise wearables—Apple Watch, WHOOP, Garmin, or Oura—a glaring physiological gap emerged.
            </p>
          </div>

          <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-extrabold text-emerald-300 text-sm flex items-center gap-2">
              <span>⚠️ The "Black-Box" Calorie Problem</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Every fitness wearable on the market gives you a single "black-box" number (e.g. <em>"You burned 380 Active Calories"</em>). 
            </p>
            <p className="text-xs text-emerald-200 font-medium">
              None of them open the cellular hood to show <strong>HOW</strong> those calories were produced, how many <strong>grams of Fat vs Carbs</strong> were burned, or how many <strong>moles of ATP</strong> your mitochondria resynthesized!
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-xs text-emerald-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>The Mission of Optimus Magazine</span>
          </div>
          <span className="font-mono text-emerald-300 font-bold">To turn passive biometric telemetry into interactive cellular education.</span>
        </div>

      </div>

      {/* Interactive Market Landscape Matrix */}
      <div className="space-y-4 pt-2">
        
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-700" />
            How Optimus Magazine Compares to the Market
          </h3>
          <span className="text-xs font-mono font-bold text-stone-500 uppercase">4 Market Domains</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          {/* Card 1: Consumer Wearables */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 flex flex-col justify-between hover:border-emerald-600 transition">
            <div className="space-y-2">
              <div className="flex items-center justify-between font-bold text-stone-900 text-sm">
                <span>1. Consumer Wearables</span>
                <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-700 text-[10px] font-mono">Apple / WHOOP</span>
              </div>
              <p className="text-stone-600 text-xs leading-relaxed font-normal">
                Track heart rate, GPS pace, and active calories.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-stone-800 text-xs space-y-1">
              <div className="font-bold text-amber-950 text-[11px]">❌ Limitation:</div>
              <p className="text-[11px] text-stone-700">Black-box calorie numbers with zero cellular breakdown or FATmax insights.</p>
            </div>
          </div>

          {/* Card 2: Endurance Platforms */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 flex flex-col justify-between hover:border-emerald-600 transition">
            <div className="space-y-2">
              <div className="flex items-center justify-between font-bold text-stone-900 text-sm">
                <span>2. Endurance Platforms</span>
                <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-700 text-[10px] font-mono">TrainingPeaks</span>
              </div>
              <p className="text-stone-600 text-xs leading-relaxed font-normal">
                Track Training Stress Score (TSS), power curves, and HR drift.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-stone-800 text-xs space-y-1">
              <div className="font-bold text-amber-950 text-[11px]">❌ Limitation:</div>
              <p className="text-[11px] text-stone-700">Built as dense coach spreadsheets with zero interactive cellular visualizers.</p>
            </div>
          </div>

          {/* Card 3: Metabolic Hardware */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 flex flex-col justify-between hover:border-emerald-600 transition">
            <div className="space-y-2">
              <div className="flex items-center justify-between font-bold text-stone-900 text-sm">
                <span>3. Metabolic Hardware</span>
                <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-700 text-[10px] font-mono">Lumen / PNOĒ</span>
              </div>
              <p className="text-stone-600 text-xs leading-relaxed font-normal">
                Measure exhaled CO₂ breath rates or blood glucose CGMs.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-stone-800 text-xs space-y-1">
              <div className="font-bold text-amber-950 text-[11px]">❌ Limitation:</div>
              <p className="text-[11px] text-stone-700">Requires expensive $300-$10,000 hardware without continuous live simulation.</p>
            </div>
          </div>

          {/* Card 4: Optimus Magazine */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-900 to-teal-950 text-white space-y-3 flex flex-col justify-between shadow-sm border border-emerald-700">
            <div className="space-y-2">
              <div className="flex items-center justify-between font-extrabold text-emerald-300 text-sm">
                <span>4. Optimus Magazine</span>
                <span className="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-mono font-bold">Unique</span>
              </div>
              <p className="text-emerald-100 text-xs leading-relaxed font-normal">
                Digital twin bringing $10,000 lab stoichiometry directly to your wrist data!
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-emerald-100 text-xs space-y-1">
              <div className="font-extrabold text-white text-[11px]">✅ The Secret Sauce:</div>
              <p className="text-[11px] text-emerald-200">Frayn stoichiometry + live 3D mitochondria + magazine editorial spreads.</p>
            </div>
          </div>

        </div>

      </div>

      {/* The 4 Core Pillars of Optimus Magazine */}
      <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50 border border-emerald-300 space-y-5 font-sans">
        
        <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-base sm:text-lg border-b border-emerald-200 pb-3">
          <Award className="w-5 h-5 text-emerald-700" />
          <span>The 4 Core Pillars of Optimus Magazine</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-800 leading-relaxed font-normal">
          
          <div className="p-4 rounded-xl bg-white/90 border border-emerald-200 space-y-2">
            <div className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-700" />
              <span>1. Digital Metabolic Twin</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              Translates raw Apple Watch heart rate, duration, and VO₂max into exact Frayn substrate combustion grams (Fat vs Carbs) and ATP turnover rates.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/90 border border-emerald-200 space-y-2">
            <div className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-teal-700" />
              <span>2. Interactive Cellular Visualizers</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              Real-time interactive models of mitochondria, PGC-1α biogenesis signaling, CPT-1 fat gatekeepers, the Krebs cycle, and 3D cell cosmos.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/90 border border-emerald-200 space-y-2">
            <div className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-700" />
              <span>3. Personal Wingate Institute Protocols</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              Integrates official physiological lab testing, summer heat adjustments (-5 BPM ceiling), nutrition timing, and actionable runner recovery rules.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/90 border border-emerald-200 space-y-2">
            <div className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>4. Editorial Journal Experience</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              Combines peer-reviewed science with high-end magazine design, custom typography, interactive sliders, data tables, and shareable chapter links.
            </p>
          </div>

        </div>

      </div>

      {/* Bottom CTA Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex flex-wrap items-center justify-between gap-4 shadow-sm font-sans">
        <div className="space-y-1">
          <div className="font-extrabold text-base text-emerald-200">Ready to Explore the Magazine?</div>
          <p className="text-xs text-emerald-100 font-normal">Start reading Page 1 to master the friendly intro to Zone 2 and FATmax science.</p>
        </div>

        {setPage && (
          <button
            onClick={() => setPage(1)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-black transition shadow-sm"
          >
            <span>Start Page 1: What is Zone 2?</span>
            <ChevronRight className="w-4 h-4 text-emerald-800" />
          </button>
        )}
      </div>

    </div>
  );
}
