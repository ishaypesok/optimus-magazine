import React, { useState } from 'react';
import { 
  Apple, 
  Heart, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  TrendingDown, 
  Flame, 
  CheckCircle2, 
  AlertCircle,
  Droplet,
  Coffee,
  Clock,
  Sun,
  Shield,
  Feather
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceLine, BarChart, Bar, Legend } from 'recharts';

export default function Zone2NutritionBP() {
  const [preRunState, setPreRunState] = useState('fasted'); // 'fasted' | 'high_sugar'
  const [weeksTraining, setWeeksTraining] = useState(8);

  // Data modeling blood pressure reduction over 12 weeks of Zone 2
  const bpProgressionData = [
    { week: 'Start (Wk 0)', sbp: 138, dbp: 86, hr: 64, nitoxide: 40 },
    { week: 'Wk 2', sbp: 135, dbp: 84, hr: 63, nitoxide: 52 },
    { week: 'Wk 4', sbp: 132, dbp: 82, hr: 62, nitoxide: 65 },
    { week: 'Wk 6', sbp: 129, dbp: 80, hr: 61, nitoxide: 78 },
    { week: 'Wk 8', sbp: 126, dbp: 78, hr: 60, nitoxide: 88 },
    { week: 'Wk 12', sbp: 122, dbp: 76, hr: 58, nitoxide: 100 },
  ];

  // Data comparing Blood Pressure Spike during different exercise intensities
  const exerciseBpComparison = [
    { type: 'Resting', sbp: 125, dbp: 80, safety: 'Optimal' },
    { type: 'Zone 2 (105-117 BPM)', sbp: 138, dbp: 78, safety: 'Safe Vascular Shear Stress' },
    { type: 'Zone 4 (Threshold)', sbp: 172, dbp: 88, safety: 'Moderate Stress' },
    { type: 'Zone 5 / Sprint', sbp: 195, dbp: 94, safety: 'High Spikes' },
    { type: 'Heavy Weightlifting', sbp: 220, dbp: 110, safety: 'Extreme Pressure Spike' },
  ];

  const currentBpStage = bpProgressionData[Math.min(Math.floor(weeksTraining / 2), bpProgressionData.length - 1)];

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">
      
      {/* Header Banner */}
      <div className="space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider border border-emerald-200 inline-flex items-center gap-1.5">
          <Apple className="w-3.5 h-3.5 text-emerald-700" />
          Page 13 • Bioenergetic Nutrition & Cardiovascular Health
        </span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-stone-900 leading-tight tracking-tight">
          Zone 2 Nutrition & Blood Pressure Optimization
        </h2>
        <p className="text-stone-600 text-sm lg:text-base font-normal">
          How low-insulin fueling maximizes FATmax, and how gentle aerobic shear stress permanently lowers arterial blood pressure.
        </p>
      </div>

      {/* SECTION 1: NUTRITION FOR ZONE 2 (THE INSULIN-FAT SWITCH) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white space-y-6 shadow-md border border-emerald-800/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/60 pb-5">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs tracking-wider uppercase border border-emerald-500/30">
              Mitochondrial Fueling Science
            </span>
            <h3 className="text-2xl font-black text-white mt-1.5 flex items-center gap-2">
              <Zap className="w-6 h-6 text-emerald-400" />
              <span>1. Pre-Run Fueling & The Insulin Switch</span>
            </h3>
          </div>
          
          {/* Interactive Fueling Switch */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-emerald-500/30 text-xs font-bold">
            <button
              onClick={() => setPreRunState('fasted')}
              className={`px-3.5 py-2 rounded-xl transition ${
                preRunState === 'fasted'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              🌱 Low-Insulin / Fasted State
            </button>
            <button
              onClick={() => setPreRunState('high_sugar')}
              className={`px-3.5 py-2 rounded-xl transition ${
                preRunState === 'high_sugar'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              🍩 High-Sugar / Gels Pre-Run
            </button>
          </div>
        </div>

        {/* State Breakdown */}
        {preRunState === 'fasted' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-normal">
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 space-y-2">
              <div className="font-extrabold text-emerald-300 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Baseline Insulin Level
              </div>
              <p className="text-stone-300 leading-relaxed">
                Circulating insulin remains baseline (&lt; 5 µIU/mL). The lipolysis door is wide open, releasing free fatty acids (FFAs) from adipose tissue directly into blood plasma.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 space-y-2">
              <div className="font-extrabold text-emerald-300 text-sm flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-emerald-400" />
                CPT-1 Gatekeeper Unlocked
              </div>
              <p className="text-stone-300 leading-relaxed">
                Without malonyl-CoA inhibition, <strong>Carnitine Palmitoyltransferase-1 (CPT-1)</strong> shuttles fatty acids smoothly into mitochondria for β-oxidation at 85%+ FATmax rate.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 space-y-2">
              <div className="font-extrabold text-emerald-300 text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                No Energy Crashes
              </div>
              <p className="text-stone-300 leading-relaxed">
                You burn steady fat (9 kcal/g). Blood sugar remains completely stable, preventing reactive hypoglycemia, brain fog, or sudden hunger spikes.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-normal">
            <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-500/40 space-y-2">
              <div className="font-extrabold text-amber-300 text-sm flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                Insulin Spike (&gt; 30 µIU/mL)
              </div>
              <p className="text-stone-300 leading-relaxed">
                Ingesting high-glycemic carbs right before Zone 2 triggers a rapid insulin surge. Insulin signals cells to store energy, blocking lipolysis immediately.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-500/40 space-y-2">
              <div className="font-extrabold text-amber-300 text-sm flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                CPT-1 Inhibited by Malonyl-CoA
              </div>
              <p className="text-stone-300 leading-relaxed">
                Insulin activates acetyl-CoA carboxylase, producing malonyl-CoA which <strong>blocks CPT-1</strong>. Mitochondria are forced to stop burning fat and rely on glucose!
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-500/40 space-y-2">
              <div className="font-extrabold text-amber-300 text-sm flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                Blunted Zone 2 Adaptation
              </div>
              <p className="text-stone-300 leading-relaxed">
                Carb oxidation dominates (yielding only 4 kcal/g). Glycogen depletes twice as fast, and mitochondrial biogenesis signals (PGC-1α) are significantly reduced.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* NUTRITION TIMELINE & NITRIC OXIDE SUPERFOODS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Intra & Post-Run Nutrition Protocol */}
        <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-4 font-sans">
          <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-base border-b border-stone-200 pb-3">
            <Clock className="w-5 h-5 text-emerald-700" />
            <span>Zone 2 Fueling Timeline (Wingate Protocol)</span>
          </div>

          <div className="space-y-3 text-xs text-stone-700">
            <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-1">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-emerald-600" />
                Pre-Run (30-60 Min Before):
              </div>
              <p className="text-stone-600 leading-relaxed">
                Black coffee or green tea (caffeine increases lipolysis by 10-15%). If hungry: 1 boiled egg or small handful of walnuts/almonds (zero insulin spike).
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-1">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-cyan-600" />
                During Run (60–90 Min Duration):
              </div>
              <p className="text-stone-600 leading-relaxed">
                <strong>Pure Water + Electrolytes</strong> (Sodium, Potassium, Magnesium). No sports gels or sugar needed! Electrolytes maintain cell membrane potential and prevent heart rate drift.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-1">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Apple className="w-4 h-4 text-teal-600" />
                Post-Run (Within 2 Hours):
              </div>
              <p className="text-stone-600 leading-relaxed">
                25–30g clean protein (leucine-rich to rebuild mitochondrial enzymes) + complex low-GI carbs (sweet potato, berries, oats) to gently restore liver glycogen.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Nitric Oxide (NO) Superfoods for Vasodilation */}
        <div className="p-6 rounded-3xl bg-teal-50 border border-teal-200 space-y-4 font-sans">
          <div className="flex items-center gap-2 text-teal-950 font-extrabold text-base border-b border-teal-200 pb-3">
            <Sparkles className="w-5 h-5 text-teal-700" />
            <span>Vascular Superfoods: Natural Nitric Oxide (NO) Boosters</span>
          </div>

          <p className="text-xs text-stone-700 leading-relaxed">
            Dietary nitrates are converted by mouth bacteria into nitrite and active Nitric Oxide (NO), expanding blood vessels and increasing oxygen delivery to mitochondria.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-white/90 border border-teal-200 space-y-1">
              <div className="font-extrabold text-teal-950">🔴 Beetroot Juice / Beets</div>
              <p className="text-[11px] text-stone-600">Rich in inorganic nitrate. Reduces oxygen cost of exercise by up to 5%.</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/90 border border-teal-200 space-y-1">
              <div className="font-extrabold text-teal-950">🥬 Leafy Greens & Arugula</div>
              <p className="text-[11px] text-stone-600">Highest nitrate density per gram. Promotes endothelial elasticity.</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/90 border border-teal-200 space-y-1">
              <div className="font-extrabold text-teal-950">🔻 Pomegranates & Citrus</div>
              <p className="text-[11px] text-stone-600">Polyphenols protect Nitric Oxide from oxidative breakdown.</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/90 border border-teal-200 space-y-1">
              <div className="font-extrabold text-teal-950">🍉 Watermelon (Citrulline)</div>
              <p className="text-[11px] text-stone-600">L-Citrulline directly fuels plasma L-arginine for eNOS production.</p>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 2: BLOOD PRESSURE & CARDIOVASCULAR HEALTH */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6 border border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-extrabold text-xs tracking-wider uppercase border border-cyan-500/30">
              Vascular Hemodynamics
            </span>
            <h3 className="text-2xl font-black text-white mt-1.5 flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-400" />
              <span>2. Zone 2 & Blood Pressure Regulation</span>
            </h3>
          </div>

          {/* Interactive Weeks Slider */}
          <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-stone-300 whitespace-nowrap">Training Progress:</span>
            <input 
              type="range" 
              min="0" 
              max="12" 
              step="2" 
              value={weeksTraining}
              onChange={e => setWeeksTraining(Number(e.target.value))}
              className="accent-emerald-500 cursor-pointer w-28 sm:w-36"
            />
            <span className="text-xs font-mono font-extrabold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30 whitespace-nowrap">
              {weeksTraining} Weeks
            </span>
          </div>
        </div>

        {/* BP Progression Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-xs text-stone-400 font-medium">Systolic BP (SBP)</div>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{currentBpStage.sbp} <span className="text-xs font-sans text-stone-400">mmHg</span></div>
            <div className="text-[10px] text-emerald-300 font-bold mt-0.5">-{138 - currentBpStage.sbp} mmHg drop</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-xs text-stone-400 font-medium">Diastolic BP (DBP)</div>
            <div className="text-2xl font-black text-teal-400 font-mono mt-1">{currentBpStage.dbp} <span className="text-xs font-sans text-stone-400">mmHg</span></div>
            <div className="text-[10px] text-teal-300 font-bold mt-0.5">-{86 - currentBpStage.dbp} mmHg drop</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-xs text-stone-400 font-medium">Resting Heart Rate</div>
            <div className="text-2xl font-black text-cyan-400 font-mono mt-1">{currentBpStage.hr} <span className="text-xs font-sans text-stone-400">BPM</span></div>
            <div className="text-[10px] text-cyan-300 font-bold mt-0.5">Vagal Tone ↑</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-xs text-stone-400 font-medium">Vascular Nitric Oxide</div>
            <div className="text-2xl font-black text-rose-400 font-mono mt-1">+{currentBpStage.nitoxide}%</div>
            <div className="text-[10px] text-rose-300 font-bold mt-0.5">Endothelial Shear Stress</div>
          </div>
        </div>

        {/* Recharts Area Chart for BP Drop */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-stone-300">
            <span>Resting Blood Pressure Reduction Over 12 Weeks (Zone 2 Protocol)</span>
            <span className="text-emerald-400 font-mono">Target: &lt;120/80 mmHg</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bpProgressionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="sbpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="dbpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#64748b" fontSize={11} />
                <YAxis domain={[60, 150]} stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} 
                  labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                />
                <ReferenceLine y={120} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Optimal SBP (120)', fill: '#10b981', fontSize: 10 }} />
                <ReferenceLine y={80} stroke="#14b8a6" strokeDasharray="3 3" label={{ value: 'Optimal DBP (80)', fill: '#14b8a6', fontSize: 10 }} />
                <Area type="monotone" dataKey="sbp" name="Systolic BP (mmHg)" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#sbpGrad)" />
                <Area type="monotone" dataKey="dbp" name="Diastolic BP (mmHg)" stroke="#14b8a6" strokeWidth={3} fillOpacity={1} fill="url(#dbpGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparison: Zone 2 vs High-Intensity BP Spikes */}
        <div className="space-y-3 font-sans">
          <h4 className="text-sm font-extrabold text-stone-200 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Blood Pressure Response During Exercise (Zone 2 vs. Heavy Spikes)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-emerald-300">Zone 2 (105-117 BPM)</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">Safe Shear</span>
              </div>
              <div className="text-lg font-black text-white font-mono">138 / 78 <span className="text-xs text-stone-400 font-sans">mmHg</span></div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                Mild, steady SBP increase provides <strong>laminar shear stress</strong> that stimulates Nitric Oxide (NO) without arterial strain. DBP remains stable.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-amber-300">Zone 4/5 (Sprint/HIIT)</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px]">High Stress</span>
              </div>
              <div className="text-lg font-black text-white font-mono">195 / 94 <span className="text-xs text-stone-400 font-sans">mmHg</span></div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                Heavy sympathetic surge & adrenaline spike blood pressure rapidly, creating micro-vascular stress in non-conditioned arteries.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 space-y-1.5 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-rose-300">Heavy Weightlifting</span>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold text-[10px]">Extreme Spike</span>
              </div>
              <div className="text-lg font-black text-white font-mono">220+ / 110+ <span className="text-xs text-stone-400 font-sans">mmHg</span></div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                Valsalva maneuver (breath-holding under strain) causes massive pressure spikes, requiring extreme cardiac wall effort.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* MASTER ATHLETE BP SAFETY PROTOCOL */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-900 to-emerald-950 text-white space-y-4 shadow-sm border border-teal-800/40">
        <h3 className="text-xl font-black flex items-center gap-2">
          <Shield className="w-6 h-6 text-teal-300" />
          <span>The Master Athlete (70+) Blood Pressure Safety Rules</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
          
          <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-1.5">
            <div className="font-bold text-teal-200 text-sm">1. Stay in 105–117 BPM Window</div>
            <p className="text-stone-200 leading-relaxed font-normal">
              Keeping your heart rate in your Wingate-verified Zone 2 range keeps exercise SBP below 145 mmHg, ensuring zero vascular overload.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-1.5">
            <div className="font-bold text-teal-200 text-sm">2. Nasal Breathing Regulation</div>
            <p className="text-stone-200 leading-relaxed font-normal">
              Inhaling through the nose releases sinus Nitric Oxide directly into your lungs, dilating blood vessels and lowering blood pressure during the run.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-1.5">
            <div className="font-bold text-teal-200 text-sm">3. Prevent Cardiac Drift</div>
            <p className="text-stone-200 leading-relaxed font-normal">
              Sip electrolyte water throughout your run. Preventing dehydration maintains stroke volume, keeping HR and BP stable for the full 60 minutes.
            </p>
          </div>

        </div>
      </div>

    </article>
  );
}
