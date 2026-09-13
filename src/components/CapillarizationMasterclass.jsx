import React, { useState } from 'react';
import { 
  Heart, Zap, Droplet, Clock, ShieldCheck, Activity, Flame, 
  TrendingDown, Sparkles, CheckCircle2, Award, ChevronRight, 
  Layers, Thermometer, Info, Sun, Lightbulb, Compass, ArrowUpRight, Gauge
} from 'lucide-react';

export default function CapillarizationMasterclass() {
  const [activeTab, setActiveTab] = useState('blood_health'); // 'blood_health' | 'signs' | 'drift_tactics' | 'lab'
  const [capillaryDensity, setCapillaryDensity] = useState('dense'); // 'baseline' | 'dense'
  const [walkResetCount, setWalkResetCount] = useState(2);

  return (
    <article className="space-y-8 animate-fade-in font-sans">
      
      {/* Header Banner */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider border border-emerald-200 inline-flex items-center gap-1.5">
            <Droplet className="w-3.5 h-3.5 text-emerald-700" />
            Article 33 • Masterclass & Field Science
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 font-bold text-xs uppercase tracking-wider border border-blue-200 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            Microscopic Capillarization
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wider border border-amber-200 inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-amber-700" />
            Blood Health & Nitric Oxide
          </span>
        </div>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-stone-900 leading-tight tracking-tight">
          Microscopic Muscle Capillarization & Blood Health Masterclass
        </h2>
        <p className="text-stone-600 text-sm lg:text-base font-normal max-w-4xl">
          How Zone 2 running builds millions of new micro-vessels inside your leg muscles, thins blood plasma, relaxes arteries with Nitric Oxide, and transforms daily energy and long-term cardiovascular longevity.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActiveTab('blood_health')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
            activeTab === 'blood_health'
              ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-500/30'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Droplet className="w-4 h-4" />
          1. The 4 Pillars of "Blood Health"
        </button>

        <button
          onClick={() => setActiveTab('signs')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
            activeTab === 'signs'
              ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-500/30'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          2. How You Notice Capillarization (5 Signs)
        </button>

        <button
          onClick={() => setActiveTab('drift_tactics')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
            activeTab === 'drift_tactics'
              ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-500/30'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Sun className="w-4 h-4" />
          3. 120 BPM & Cardiac Drift Tactics
        </button>

        <button
          onClick={() => setActiveTab('lab')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
            activeTab === 'lab'
              ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-500/30'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Gauge className="w-4 h-4" />
          4. Lab & Wingate Re-Test Predictor
        </button>
      </div>

      {/* TAB 1: THE 4 PILLARS OF BLOOD HEALTH */}
      {activeTab === 'blood_health' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-2xl bg-emerald-900 text-white space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-lg">
              <Droplet className="w-6 h-6 text-emerald-400" />
              <span>What Does "Blood Health" Mean in Zone 2 Physiology?</span>
            </div>
            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed font-normal">
              When you train in Zone 2 for 70–80 minutes, your blood undergoes major biological upgrades. It is not just about moving your legs—your circulatory system fundamentally restructures its fluid dynamics, vessel elasticity, and metabolic clearance capacity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-base">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center text-xs font-black">1</span>
                <span>Plasma Volume Expansion (Hypervolemia)</span>
              </div>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                Zone 2 running stimulates your kidneys and liver to produce <strong>300 to 500 mL of fresh blood plasma</strong> (the fluid part of blood).
              </p>
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium">
                <strong>Why it matters:</strong> Thins blood viscosity naturally, increases stroke volume (more blood pumped per beat), and lowers your <strong>Resting Heart Rate to 52 BPM</strong>!
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-blue-900 font-extrabold text-base">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center text-xs font-black">2</span>
                <span>Nitric Oxide & Vascular Elasticity</span>
              </div>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                Sustained laminar blood flow triggers the inner lining of your blood vessels (<em>endothelium</em>) to release <strong>Nitric Oxide (NO)</strong>.
              </p>
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 font-medium">
                <strong>Why it matters:</strong> Nitric oxide dilates blood vessels, keeps arterial walls flexible and soft, and is the #1 medical mechanism for maintaining low resting blood pressure.
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-base">
                <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-black">3</span>
                <span>Metabolic Clearance (Cleaner Blood)</span>
              </div>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                Active muscle capillaries pull <strong>triglycerides, free fatty acids, and circulating glucose</strong> out of your bloodstream to burn inside mitochondria.
              </p>
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium">
                <strong>Why it matters:</strong> Clears excess blood sugar without needing high insulin spikes and lowers blood lipids naturally.
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-purple-900 font-extrabold text-base">
                <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-900 flex items-center justify-center text-xs font-black">4</span>
                <span>Dense Muscle Capillarization</span>
              </div>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                Your body grows thousands of microscopic new blood vessels (<em>capillaries</em>) surrounding every single muscle fiber in your calves, quads, and glutes.
              </p>
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-950 font-medium">
                <strong>Why it matters:</strong> Increases capillary-to-fiber ratio from 2:1 up to 5:1, flooding cells with oxygen effortlessly.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: HOW YOU NOTICE CAPILLARIZATION (5 SIGNS) */}
      {activeTab === 'signs' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-950 text-xs sm:text-sm">
            <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong>How do we notice microscopic capillaries without a lab biopsy?</strong>
              <p className="mt-1 text-stone-700">
                Although capillaries are single-cell microscopic tubes, their physiological effects produce unmistakable, day-to-day physical changes in how your legs feel and recover.
              </p>
            </div>
          </div>

          {/* Interactive Density Simulator Toggle */}
          <div className="p-6 rounded-2xl bg-stone-900 text-white space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-base text-emerald-400">Microscopic Muscle Capillary Density Visualizer</h3>
                <p className="text-xs text-stone-400">Toggle between baseline vs. fully capillarized muscle tissue</p>
              </div>

              <div className="flex items-center gap-2 bg-stone-800 p-1.5 rounded-xl border border-stone-700">
                <button
                  onClick={() => setCapillaryDensity('baseline')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    capillaryDensity === 'baseline'
                      ? 'bg-stone-700 text-white shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Baseline (2 Capillaries / Fiber)
                </button>
                <button
                  onClick={() => setCapillaryDensity('dense')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    capillaryDensity === 'dense'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Zone 2 Adapted (5-6 Capillaries / Fiber 🏆)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700">
                <div className="text-stone-400">Heart Rate @ 11:30 min/km</div>
                <div className={`text-lg font-black mt-1 ${capillaryDensity === 'dense' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {capillaryDensity === 'dense' ? '114 – 117 BPM' : '128 – 132 BPM'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700">
                <div className="text-stone-400">Warm-up Stiffness Time</div>
                <div className={`text-lg font-black mt-1 ${capillaryDensity === 'dense' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {capillaryDensity === 'dense' ? '3 to 5 Minutes' : '15 to 20 Minutes'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700">
                <div className="text-stone-400">Next-Day Leg Soreness (DOMS)</div>
                <div className={`text-lg font-black mt-1 ${capillaryDensity === 'dense' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {capillaryDensity === 'dense' ? 'Zero Soreness (Instant Clearance)' : '24–48 Hours Stiffness'}
                </div>
              </div>
            </div>
          </div>

          {/* 5 Real-World Signs Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm">
                <Heart className="w-4 h-4 text-emerald-700" />
                <span>1. Lower HR for Same Speed</span>
              </div>
              <p className="text-stone-700 text-xs leading-relaxed">
                A speed that used to push your heart rate to 128 BPM now stays comfortably at <strong>114–117 BPM</strong>. Each muscle fiber gets oxygen from 5 capillaries instead of 2, so the heart pumps less frequently.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 text-blue-900 font-extrabold text-sm">
                <Clock className="w-4 h-4 text-blue-700" />
                <span>2. Warm-ups Take 3 Mins</span>
              </div>
              <p className="text-stone-700 text-xs leading-relaxed">
                The initial "heavy leg" stiffness during the first 15 mins disappears. Dense capillary beds open up instantly upon movement, flooding muscles with oxygen immediately.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 text-purple-900 font-extrabold text-sm">
                <ShieldCheck className="w-4 h-4 text-purple-700" />
                <span>3. Zero Next-Day Soreness</span>
              </div>
              <p className="text-stone-700 text-xs leading-relaxed">
                Capillaries act as a 2-way highway—delivering oxygen <em>in</em>, and sweeping metabolic waste and inflammatory markers <em>out</em> continuously during and right after your run.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                <Flame className="w-4 h-4 text-amber-700" />
                <span>4. Effortless Stair Climbing</span>
              </div>
              <p className="text-stone-700 text-xs leading-relaxed">
                Climbing 3 flights of stairs no longer causes that "burning" thigh sensation. Continuous capillary oxygen keeps leg muscles operating in pure aerobic mode.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 text-rose-900 font-extrabold text-sm">
                <Droplet className="w-4 h-4 text-rose-700" />
                <span>5. Warmer Extremities</span>
              </div>
              <p className="text-stone-700 text-xs leading-relaxed">
                Enhanced micro-vascularity improves peripheral circulation down to your feet and toes, accelerating tissue repair and skin health.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-sm">
                <Award className="w-4 h-4 text-emerald-700" />
                <span>6. Lab Lactate Clearance</span>
              </div>
              <p className="text-stone-800 text-xs leading-relaxed">
                In a lab re-test at Wingate, lactate produced at 7.2 km/h is re-absorbed and cleared by capillaries faster, dropping blood lactate from 4.34 mmol/L to ~2.5 mmol/L.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: 120 BPM & CARDIAC DRIFT TACTICS */}
      {activeTab === 'drift_tactics' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="p-6 rounded-2xl bg-amber-900 text-white space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-extrabold text-lg">
              <Sun className="w-6 h-6 text-amber-400" />
              <span>Why Staying Under 120 BPM Feels Almost Impossible (And What to Do)</span>
            </div>
            <p className="text-amber-100 text-xs sm:text-sm leading-relaxed font-normal">
              Running continuously for 80 minutes in <strong>28°C (82°F) heat and 76% humidity</strong> triggers <strong>Cardiac Drift</strong>. Your body pumps extra blood to your skin to cool down, causing your heart to beat 5–10 BPM faster during the second half of your run—even if your pace stays identical!
            </p>
          </div>

          {/* Interactive Walk-Reset Simulator */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-stone-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-700" />
                <span>The 30-Second Walk Reset Method</span>
              </h3>
              <span className="text-xs font-mono bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-full font-bold">
                Tactical Reset
              </span>
            </div>

            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
              Whenever your Watch shows HR creeping up to <strong>122–124 BPM</strong>, take a <strong>30-second walking break</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-stone-200">
                <div className="text-stone-500">Before Walk Reset</div>
                <div className="text-amber-700 font-black text-base mt-1">123 BPM (Drift Zone)</div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="text-emerald-900 font-bold">During 30s Walk</div>
                <div className="text-emerald-800 font-black text-base mt-1">Drops to 105 BPM ⚡</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-stone-200">
                <div className="text-stone-500">After Resuming Run</div>
                <div className="text-emerald-900 font-black text-base mt-1">Stays 112–115 BPM</div>
              </div>
            </div>
          </div>

          {/* 3 Core Rules Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="font-extrabold text-stone-900 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>1. Focus on Average HR (117 BPM)</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Do not stress over brief 1-minute spikes to 125 BPM on hills. Your overall run average of <strong>117 BPM</strong> guarantees 95%+ pure Zone 2 fat burning.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="font-extrabold text-stone-900 text-sm flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-blue-700" />
                <span>2. Pre-Run Fluid Loading</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Drink 300–400 mL of cool water 20 minutes before stepping outside. High plasma volume prevents late-run cardiac drift.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="font-extrabold text-stone-900 text-sm flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-700" />
                <span>3. Cooler Window Selection</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                A 2°C drop in ambient temperature reduces cardiac thermal stress by 5 to 8 BPM instantly!
              </p>
            </div>

          </div>
        </div>
      )}

      {/* TAB 4: LAB & WINGATE RE-TEST PREDICTOR */}
      {activeTab === 'lab' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="p-6 rounded-2xl bg-stone-900 text-white space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-lg">
              <Gauge className="w-6 h-6 text-emerald-400" />
              <span>Wingate Clinical Re-Test Lactate & HR Predictor</span>
            </div>
            
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Comparison between your <strong>Sep 1, 2026 Wingate Clinical Test</strong> and projected re-test values after 3 months of capillarization & Zone 2 base building:
            </p>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-stone-700 text-stone-400">
                    <th className="pb-3">Stage / Treadmill Speed</th>
                    <th className="pb-3">Sep 1 Clinical Result</th>
                    <th className="pb-3 text-emerald-400">Projected Re-Test Result</th>
                    <th className="pb-3">Biological Mechanism</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 text-stone-200">
                  <tr>
                    <td className="py-3 font-bold text-white">Stage 3 (5.4 km/h)</td>
                    <td className="py-3">104 BPM • 1.61 mmol/L</td>
                    <td className="py-3 text-emerald-400 font-bold">98 BPM • 1.20 mmol/L</td>
                    <td className="py-3 text-stone-400 text-[11px]">Expanded stroke volume & blood plasma</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-white">Stage 4 (6.0 km/h)</td>
                    <td className="py-3">109 BPM • 1.84 mmol/L</td>
                    <td className="py-3 text-emerald-400 font-bold">103 BPM • 1.45 mmol/L</td>
                    <td className="py-3 text-stone-400 text-[11px]">Pure FATmax mitochondrial steady state</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-white">Stage 5 (6.6 km/h)</td>
                    <td className="py-3">116 BPM • 2.80 mmol/L</td>
                    <td className="py-3 text-emerald-400 font-bold">110 BPM • 1.90 mmol/L</td>
                    <td className="py-3 text-stone-400 text-[11px]">Denser leg capillaries clear lactate faster</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-white">Stage 6 (7.2 km/h LT2)</td>
                    <td className="py-3 text-amber-400 font-bold">118 BPM • 4.34 mmol/L</td>
                    <td className="py-3 text-emerald-400 font-bold">114 BPM • 2.60 mmol/L 🏆</td>
                    <td className="py-3 text-stone-400 text-[11px]">LT2 threshold moves up to 8.0+ km/h!</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </article>
  );
}
