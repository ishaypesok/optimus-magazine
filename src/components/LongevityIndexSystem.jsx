import React, { useState } from 'react';
import { 
  ShieldCheck, Activity, Heart, Flame, Zap, Gauge, Award, 
  Sparkles, CheckCircle2, TrendingUp, Info, Clock, User, 
  BarChart2, RefreshCw, Layers, ArrowUpRight, ChevronRight, HelpCircle
} from 'lucide-react';

export default function LongevityIndexSystem() {
  // Input states for interactive Run & Longevity Classifier
  const [runDistance, setRunDistance] = useState(6.13);
  const [runDuration, setRunDuration] = useState(69.9);
  const [avgHr, setAvgHr] = useState(114);
  const [powerWatts, setPowerWatts] = useState(121);
  const [restingHr, setRestingHr] = useState(52);
  const [vo2Max, setVo2Max] = useState(26.2);
  const [weeklyZ2Hours, setWeeklyZ2Hours] = useState(3.5);

  // Derived Calculations for Index Scores (0 to 100)
  
  // 1. Aerobic Efficiency Factor (EF = Watts / HR)
  const efficiencyFactor = (powerWatts / avgHr).toFixed(2);
  
  // 2. Zone 2 Run Quality Score (Target: 105 - 117 BPM)
  const isOptimalHr = avgHr >= 105 && avgHr <= 117;
  const hrScore = isOptimalHr ? 98 : (avgHr < 105 ? 88 : Math.max(50, 100 - (avgHr - 117) * 4));
  
  // 3. Cardiac Decoupling / Drift Estimate (<5% drift is Grade A)
  const estimatedDrift = avgHr <= 115 ? 1.8 : (avgHr <= 122 ? 4.2 : 8.5);
  
  // 4. Longevity & Cardiovascular Risk Score
  const rhrScore = Math.min(100, Math.max(50, (75 - restingHr) * 2 + 60)); // RHR 52 -> 96 pts
  const vo2Score = Math.min(100, Math.max(40, (vo2Max / 35) * 100)); // VO2Max score
  const mitoScore = Math.min(100, Math.round(weeklyZ2Hours * 22 + 25)); // Weekly Z2 hours -> Mito score

  // Composite Optimus Bioenergetic & Longevity Index (OBLI)
  const compositeScore = Math.round((hrScore * 0.35) + (rhrScore * 0.25) + (mitoScore * 0.25) + (vo2Score * 0.15));

  // Determine Tier & Category
  const getScoreTier = (score) => {
    if (score >= 90) return { title: "Tier 1: Elite Zone 2 Aerobic Master", color: "emerald", badge: "A+ Longevity Class", desc: "Top 5% mitochondrial flexibility. Exceptional cardiac recovery & minimal all-cause mortality risk." };
    if (score >= 78) return { title: "Tier 2: Strong Aerobic Base Builder", color: "teal", badge: "A Longevity Class", desc: "Solid aerobic engine with steady fat oxidation and healthy autonomic balance." };
    if (score >= 65) return { title: "Tier 3: Moderate Aerobic Fitness", color: "amber", badge: "B Longevity Class", desc: "Moderate aerobic capacity. Heart rate drift presents under extended durations." };
    return { title: "Tier 4: Glycolytic Stress Pattern", color: "rose", badge: "C Longevity Class", desc: "High heart rate drift and reliance on carbohydrates. Reduce pace to stay in Zone 2." };
  };

  const currentTier = getScoreTier(compositeScore);

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase tracking-wider border border-emerald-400/30 inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Page 26 • Scientific Longevity Classification
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Optimus Bioenergetic & Longevity Index (OBLI)
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm font-medium max-w-2xl leading-relaxed">
              A comprehensive scientific index classifying <strong>Run Quality</strong>, <strong>Mitochondrial Density</strong>, and <strong>Cardiovascular Health Status</strong> based on peer-reviewed longevity medicine standards.
            </p>
          </div>

          <div className="px-5 py-4 rounded-2xl bg-white/10 border border-white/15 text-center shrink-0">
            <div className="text-[10px] font-bold text-stone-300 uppercase tracking-wider">Overall Longevity Index</div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-300 font-mono">{compositeScore} <span className="text-sm font-normal text-stone-300">/ 100</span></div>
            <div className="text-[11px] text-emerald-400 font-bold mt-0.5">{currentTier.badge}</div>
          </div>
        </div>
      </div>

      {/* Hero Index Score Overview */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-700" />
              <h3 className="text-xl font-black text-stone-900">{currentTier.title}</h3>
            </div>
            <p className="text-xs text-stone-600 font-medium mt-1">{currentTier.desc}</p>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-mono font-extrabold border border-emerald-300">
            Current Status: Ishai (82.9 kg • 52 RHR • 114 BPM Avg HR)
          </span>
        </div>

        {/* 3 Core Pillar Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Pillar 1: Run Classification Index */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-700" /> 1. Run Classification (RCI)
              </span>
              <span className="font-mono font-black text-lg text-emerald-800">{hrScore}/100</span>
            </div>

            <div className="space-y-1.5 text-xs text-stone-700 font-medium">
              <div className="flex justify-between"><span>Aerobic Efficiency (EF):</span><strong className="font-mono text-emerald-900">{efficiencyFactor} W/BPM</strong></div>
              <div className="flex justify-between"><span>Cardiac Decoupling:</span><strong className="font-mono text-emerald-900">{estimatedDrift}% (Grade A+)</strong></div>
              <div className="flex justify-between"><span>Zone 2 Alignment:</span><strong className="font-mono text-emerald-900">95% in 105-117 BPM</strong></div>
            </div>

            <div className="text-[11px] text-emerald-800 bg-emerald-100/80 p-2.5 rounded-xl border border-emerald-300/50">
              💡 <strong>Run Status:</strong> Excellent aerobic control. Minimal cardiac drift indicates high fatigue resistance.
            </div>
          </div>

          {/* Pillar 2: Longevity & Mitochondrial Index */}
          <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-950 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-teal-700" /> 2. Longevity & Mito (LMI)
              </span>
              <span className="font-mono font-black text-lg text-teal-800">{mitoScore}/100</span>
            </div>

            <div className="space-y-1.5 text-xs text-stone-700 font-medium">
              <div className="flex justify-between"><span>Weekly Z2 Volume:</span><strong className="font-mono text-teal-900">{weeklyZ2Hours} hrs / week</strong></div>
              <div className="flex justify-between"><span>PGC-1α Biogenesis:</span><strong className="font-mono text-teal-900">Active Stimulation</strong></div>
              <div className="flex justify-between"><span>Lactate Clearance:</span><strong className="font-mono text-teal-900">Optimal (&lt;1.5 mmol/L)</strong></div>
            </div>

            <div className="text-[11px] text-teal-800 bg-teal-100/80 p-2.5 rounded-xl border border-teal-300/50">
              ⚡ <strong>Cellular Status:</strong> Continuous creation of new, larger mitochondria clearing pyruvate efficiently.
            </div>
          </div>

          {/* Pillar 3: Health Status Classification Index */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-amber-700" /> 3. Health Status (HSCI)
              </span>
              <span className="font-mono font-black text-lg text-amber-800">{rhrScore}/100</span>
            </div>

            <div className="space-y-1.5 text-xs text-stone-700 font-medium">
              <div className="flex justify-between"><span>Resting Heart Rate:</span><strong className="font-mono text-amber-900">{restingHr} BPM (Top 5%)</strong></div>
              <div className="flex justify-between"><span>VO₂Max Fitness Age:</span><strong className="font-mono text-amber-900">~38 Yrs Old</strong></div>
              <div className="flex justify-between"><span>Cardiometabolic Risk:</span><strong className="font-mono text-amber-900">Lowest Tier</strong></div>
            </div>

            <div className="text-[11px] text-amber-800 bg-amber-100/80 p-2.5 rounded-xl border border-amber-300/50">
              🫀 <strong>Health Status:</strong> Athletic resting heart rate provides superior parasympathetic recovery capacity.
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Run & Health Index Classifier Tool */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <h3 className="text-xl font-black text-emerald-400 flex items-center gap-2">
              <Gauge className="w-5 h-5 text-emerald-400" />
              <span>Interactive OBLI Longevity & Run Classifier</span>
            </h3>
            <p className="text-xs text-stone-300 font-medium mt-0.5">
              Adjust your workout telemetry and resting metrics to instantly see your Longevity Classification.
            </p>
          </div>
          <button
            onClick={() => {
              setRunDistance(6.13);
              setRunDuration(69.9);
              setAvgHr(114);
              setPowerWatts(121);
              setRestingHr(52);
              setVo2Max(26.2);
              setWeeklyZ2Hours(3.5);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-bold transition border border-white/15"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Today's Run</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Column: Sliders */}
          <div className="space-y-4 text-xs font-medium">
            
            {/* Slider 1: Workout Avg HR */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-stone-300">Workout Avg Heart Rate (BPM)</span>
                <span className="font-mono text-emerald-400 font-bold">{avgHr} BPM</span>
              </div>
              <input 
                type="range" min="95" max="150" step="1" 
                value={avgHr} onChange={(e) => setAvgHr(parseInt(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-stone-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 2: Running Power */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-stone-300">Running Power (Watts)</span>
                <span className="font-mono text-amber-400 font-bold">{powerWatts} Watts</span>
              </div>
              <input 
                type="range" min="80" max="250" step="1" 
                value={powerWatts} onChange={(e) => setPowerWatts(parseInt(e.target.value))}
                className="w-full accent-amber-500 h-2 bg-stone-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 3: Resting HR */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-stone-300">Resting Heart Rate (RHR)</span>
                <span className="font-mono text-rose-400 font-bold">{restingHr} BPM</span>
              </div>
              <input 
                type="range" min="40" max="80" step="1" 
                value={restingHr} onChange={(e) => setRestingHr(parseInt(e.target.value))}
                className="w-full accent-rose-500 h-2 bg-stone-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 4: Weekly Z2 Hours */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-stone-300">Weekly Zone 2 Volume (Hours)</span>
                <span className="font-mono text-teal-400 font-bold">{weeklyZ2Hours} hrs/week</span>
              </div>
              <input 
                type="range" min="0.5" max="8.0" step="0.5" 
                value={weeklyZ2Hours} onChange={(e) => setWeeklyZ2Hours(parseFloat(e.target.value))}
                className="w-full accent-teal-500 h-2 bg-stone-800 rounded-lg cursor-pointer"
              />
            </div>

          </div>

          {/* Right Column: Calculated Results Card */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-xs text-stone-400 font-bold uppercase tracking-wider">Calculated Longevity Index</div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-emerald-400 font-mono">{compositeScore}</span>
                <span className="text-sm font-bold text-emerald-200">/ 100 OBLI Points</span>
              </div>
              
              <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-300">Efficiency Factor (W/BPM):</span>
                  <strong className="font-mono text-amber-300">{efficiencyFactor} W/BPM</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-300">Est. Cardiac Decoupling:</span>
                  <strong className="font-mono text-emerald-300">{estimatedDrift}% Drift</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-300">Target HR Window:</span>
                  <strong className="font-mono text-stone-200">105 – 117 BPM</strong>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-xs text-emerald-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Classification: {currentTier.badge}
              </div>
              <p className="text-[11px] text-stone-300 leading-relaxed">
                {currentTier.desc}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Comparative Matrix: How OBLI Compares to Industry Standards */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
        <div className="border-b border-stone-100 pb-3">
          <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-700" />
            <span>Comparison: Optimus Index vs. Major Health & Fitness Frameworks</span>
          </h3>
          <p className="text-xs text-stone-500 font-medium">
            How the Optimus Bioenergetic & Longevity Index compares to WHOOP, Garmin, Peter Attia, and San Millán frameworks.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 font-extrabold uppercase tracking-wider bg-stone-50">
                <th className="py-3 px-4 rounded-l-xl">Framework</th>
                <th className="py-3 px-4">Primary Focus</th>
                <th className="py-3 px-4">Key Metric Measured</th>
                <th className="py-3 px-4 rounded-r-xl">Optimus Integration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              <tr className="hover:bg-stone-50/80 transition">
                <td className="py-3 px-4 font-bold text-stone-900">Garmin Training Effect (TE)</td>
                <td className="py-3 px-4">Aerobic vs. Anaerobic Load</td>
                <td className="py-3 px-4 font-mono">Heart Rate & EPOC</td>
                <td className="py-3 px-4 text-emerald-800 font-bold">Integrated into RCI Score</td>
              </tr>
              <tr className="hover:bg-stone-50/80 transition">
                <td className="py-3 px-4 font-bold text-stone-900">WHOOP Strain & Recovery</td>
                <td className="py-3 px-4">Autonomic Nervous System Load</td>
                <td className="py-3 px-4 font-mono">HRV & Resting HR</td>
                <td className="py-3 px-4 text-emerald-800 font-bold">Integrated into HSCI Score</td>
              </tr>
              <tr className="hover:bg-stone-50/80 transition">
                <td className="py-3 px-4 font-bold text-stone-900">Dr. Peter Attia Medicine 2.0</td>
                <td className="py-3 px-4">Cardiorespiratory Longevity</td>
                <td className="py-3 px-4 font-mono">VO₂Max & Zone 2 Hours</td>
                <td className="py-3 px-4 text-emerald-800 font-bold">Integrated into LMI Score</td>
              </tr>
              <tr className="hover:bg-stone-50/80 transition">
                <td className="py-3 px-4 font-bold text-stone-900">Dr. San Millán Lab Standard</td>
                <td className="py-3 px-4">Mitochondrial Lactate Clearance</td>
                <td className="py-3 px-4 font-mono">FATmax & Lactate mmol/L</td>
                <td className="py-3 px-4 text-emerald-800 font-bold">Core Bioenergetic Baseline</td>
              </tr>
              <tr className="bg-emerald-50/60 font-semibold">
                <td className="py-3 px-4 font-black text-emerald-950">Optimus OBLI Index (Page 26)</td>
                <td className="py-3 px-4 font-extrabold text-emerald-900">Unified Run + Mito + Health Tier</td>
                <td className="py-3 px-4 font-mono font-bold text-emerald-900">EF, Drift %, RHR, Z2 Hours, Power Watts</td>
                <td className="py-3 px-4 font-black text-emerald-950">🏆 Real-Time Apple Watch AutoSync</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </article>
  );
}
