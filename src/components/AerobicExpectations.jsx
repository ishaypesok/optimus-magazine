import React, { useState } from 'react';
import { 
  TrendingUp, Sparkles, Heart, Zap, Award, Calendar, CheckCircle2, 
  ArrowRight, ShieldCheck, Clock, Flame, Activity, Sun, BatteryCharging, ChevronRight
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';

export default function AerobicExpectations() {
  const [trainingMonths, setTrainingMonths] = useState(2);

  // Data modeling aerobic expansion progression at constant 109 BPM HR over 6 months
  const progressionData = [
    { month: 'Start (Wk 1)', pace: 11.5, paceStr: '11:30 min/km', hr: 109, mitoDensity: 100, vo2: 26.0, fatOx: 28.5 },
    { month: 'Month 1', pace: 11.0, paceStr: '11:00 min/km', hr: 109, mitoDensity: 115, vo2: 26.8, fatOx: 32.0 },
    { month: 'Month 2', pace: 10.4, paceStr: '10:24 min/km', hr: 109, mitoDensity: 130, vo2: 27.5, fatOx: 36.5 },
    { month: 'Month 3', pace: 9.8, paceStr: '9:48 min/km', hr: 109, mitoDensity: 145, vo2: 28.4, fatOx: 41.0 },
    { month: 'Month 4', pace: 9.3, paceStr: '9:18 min/km', hr: 109, mitoDensity: 160, vo2: 29.2, fatOx: 45.0 },
    { month: 'Month 6', pace: 8.8, paceStr: '8:48 min/km', hr: 109, mitoDensity: 180, vo2: 30.5, fatOx: 50.0 },
  ];

  const currentStage = progressionData[Math.min(trainingMonths, progressionData.length - 1)];

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-stone-900 text-white p-6 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase tracking-wider border border-emerald-400/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Page 12 • Aerobic Expansion Roadmap
            </span>
            <span className="px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider border border-amber-400/30 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-amber-400" /> Constant 109 BPM Heart Rate Target
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            What to Expect in the Coming Days & Months
          </h2>
          <p className="text-stone-200 text-xs sm:text-sm font-medium leading-relaxed">
            As you continue Zone 2 running, your heart rate stays the same (**109 BPM**), but your pace naturally speeds up, your recovery gets faster, and your cellular health expands automatically!
          </p>
        </div>
      </div>

      {/* 3 Phases Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Phase 1 */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3 relative overflow-hidden">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg">
            1
          </div>
          <h3 className="text-lg font-black text-stone-900">
            Next 2-3 Days: Supercompensation
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed font-normal">
            During your 48–72 hour rest window, your muscle cells repair micro-fatigue and restock glycogen.
          </p>
          <ul className="text-xs text-stone-700 space-y-1.5 pt-2 border-t border-stone-100 font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Legs feel light & eager by Day 3</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Zero joint stiffness or inflammation</span>
            </li>
          </ul>
        </div>

        {/* Phase 2 */}
        <div className="p-6 rounded-3xl bg-emerald-50/80 border border-emerald-300 shadow-sm space-y-3 relative overflow-hidden">
          <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-black text-lg">
            2
          </div>
          <h3 className="text-lg font-black text-stone-900">
            Weeks 2–6: Pace Expansion
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed font-normal">
            At the <strong>exact same 109 BPM heart rate</strong>, your pace naturally speeds up as mitochondrial density increases.
          </p>
          <ul className="text-xs text-emerald-950 space-y-1.5 pt-2 border-t border-emerald-200/60 font-semibold">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>Pace drops from 11:30 → 10:30 min/km</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>Running 65 mins feels effortless</span>
            </li>
          </ul>
        </div>

        {/* Phase 3 */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3 relative overflow-hidden">
          <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-black text-lg">
            3
          </div>
          <h3 className="text-lg font-black text-stone-900">
            Months 2–6: Cellular Longevity
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed font-normal">
            Long-term cardiovascular adaptations lower your resting HR and maximize whole-body insulin sensitivity.
          </p>
          <ul className="text-xs text-stone-700 space-y-1.5 pt-2 border-t border-stone-100 font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Lower morning resting heart rate</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Higher VO₂ Max & fat oxidation</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Interactive Aerobic Expansion Estimator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-emerald-600" /> Progression Simulator
            </div>
            <h3 className="text-2xl font-black text-stone-900">
              Interactive Aerobic Expansion Curve (at 109 BPM)
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              Drag the timeline slider to see how your speed and cellular mitochondrial density progress over 6 months.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
            {progressionData.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setTrainingMonths(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  trainingMonths === idx
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {item.month}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Dynamic Indicator Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
            <div className="text-xs font-bold text-emerald-800">Target Heart Rate</div>
            <div className="text-2xl font-black text-emerald-900">{currentStage.hr} <span className="text-xs font-normal">BPM</span></div>
            <div className="text-[11px] text-emerald-700 font-medium">Constant Target</div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
            <div className="text-xs font-bold text-stone-600">Expected Pace @ 109 BPM</div>
            <div className="text-2xl font-black text-stone-900">{currentStage.paceStr}</div>
            <div className="text-[11px] text-emerald-700 font-semibold">Speed comes naturally</div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
            <div className="text-xs font-bold text-amber-800">Mitochondrial Density</div>
            <div className="text-2xl font-black text-amber-900">+{currentStage.mitoDensity - 100}%</div>
            <div className="text-[11px] text-amber-700 font-medium">Cellular Engine Expansion</div>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 space-y-1">
            <div className="text-xs font-bold text-cyan-800">Est. Fat Burned / Run</div>
            <div className="text-2xl font-black text-cyan-900">{currentStage.fatOx}g fat</div>
            <div className="text-[11px] text-cyan-700 font-medium">~{Math.round(currentStage.fatOx * 9)} kcal from lipids</div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={progressionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="mitoGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#78716c" fontSize={11} tickLine={false} />
              <YAxis stroke="#78716c" fontSize={11} tickLine={false} domain={[90, 190]} unit="%" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1c1917', borderRadius: '16px', border: '1px solid #44403c', color: '#fff' }}
                formatter={(val, name) => [`+${val - 100}% Increase`, 'Mitochondrial Density']}
              />
              <Area type="monotone" dataKey="mitoDensity" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#mitoGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* The 3 Golden Rules Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white space-y-4 shadow-sm">
        <h3 className="text-xl font-black flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-300" />
          <span>The 3 Golden Rules for Aerobic Expansion</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
          <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-1.5">
            <div className="font-bold text-emerald-200 text-sm">1. Never Rush Pace</div>
            <p className="text-stone-200 leading-relaxed">
              Always let your heart rate dictate your speed (**105–117 BPM**). Speed is a result of fitness, not effort!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-1.5">
            <div className="font-bold text-emerald-200 text-sm">2. Rest 2 Days Between Runs</div>
            <p className="text-stone-200 leading-relaxed">
              Mitochondria reproduce and capillary density grows during rest, not during the run.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-1.5">
            <div className="font-bold text-emerald-200 text-sm">3. Trust the Biological Process</div>
            <p className="text-stone-200 leading-relaxed">
              In 6 months, you will run faster at 109 BPM than you used to run at 150 BPM!
            </p>
          </div>
        </div>
      </div>

      {/* The Gear 2 Speed Expansion Highlight Card */}
      <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-300 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-base">
          <Sparkles className="w-5 h-5 text-emerald-700" />
          <span>The "Gear 2 Expansion" Effect: Absorbing Higher Speeds into Zone 2</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-800 leading-relaxed font-normal">
          <div className="p-4 rounded-2xl bg-white border border-emerald-200 space-y-2">
            <div className="font-extrabold text-emerald-900 text-xs uppercase">
              1. Month 1: Gear 2 is Slow Pace Only
            </div>
            <p className="text-stone-700">
              When starting, Gear 2 (Zone 2) only supports slow paces (e.g. 11:30 min/km jog at 109 BPM). Pushing faster immediately forces your heart rate into Zone 3/4.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-emerald-200 space-y-2">
            <div className="font-extrabold text-emerald-900 text-xs uppercase">
              2. Month 6: Gear 2 Expands to Absorb Faster Speeds
            </div>
            <p className="text-stone-700">
              As mitochondrial density doubles, <strong>Gear 2 expands to swallow higher speeds!</strong> Paces that used to require Gear 3/4 effort (e.g. 8:30 min/km) now occur effortlessly inside Gear 2 (at the exact same 109 BPM)!
            </p>
          </div>
        </div>
      </div>

    </article>
  );
}
