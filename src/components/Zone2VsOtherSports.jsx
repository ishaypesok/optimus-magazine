import React, { useState } from 'react';
import { 
  Dumbbell, Flame, Zap, Activity, Heart, ShieldCheck, 
  BatteryCharging, Sparkles, CheckCircle2, XCircle, ArrowUpRight, Scale, RefreshCw, Trophy, AlertTriangle, Layers
} from 'lucide-react';

export default function Zone2VsOtherSports() {
  const [selectedSportId, setSelectedSportId] = useState('hiit');
  const [activeCategory, setActiveCategory] = useState('all');

  const SPORTS_DATA = [
    {
      id: 'zone2',
      name: 'Zone 2 Aerobic Base',
      subtitle: 'Steady-State FATmax Cardio (Light Jog, Incline Walk, Easy Bike)',
      icon: '🏃‍♂️',
      themeColor: 'emerald',
      bgGradient: 'from-emerald-900 to-teal-950',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      primaryFuel: 'Fatty Acids (Free Fatty Acids)',
      fatBurnRate: '0.55 - 0.70 g/min (MAXIMUM)',
      carbBurnRate: '0.20 - 0.30 g/min (Low)',
      mitochondriaImpact: '⭐⭐⭐⭐⭐ (Peak PGC-1α Biogenesis)',
      lactateLevel: '1.5 - 2.0 mmol/L (Steady Clearance)',
      recoveryTime: '0 - 12 Hours (Repeatable Daily)',
      cnsFatigue: 'Very Low (Zero Burnout)',
      injuryRisk: 'Minimal (Low Joint Impact)',
      keyPros: [
        'Builds new & bigger mitochondrial powerhouses (PGC-1α)',
        'Burns highest absolute grams of fat per minute (FATmax)',
        'Lowers baseline resting heart rate & improves insulin sensitivity',
        'Can be repeated daily without draining central nervous system'
      ],
      keyCons: [
        'Does not build significant muscle mass (hypertrophy)',
        'Does not push peak VO2max ceiling on its own'
      ],
      verdict: 'The essential foundation of all human endurance & metabolic health.'
    },
    {
      id: 'hiit',
      name: 'HIIT & Sprint Intervals (Zone 5)',
      subtitle: 'All-Out Sprints, Tabata, Hill Repeats (90-100% HRmax)',
      icon: '⚡',
      themeColor: 'rose',
      bgGradient: 'from-rose-950 to-amber-950',
      badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
      primaryFuel: 'Glucose & Glycogen (Carbs)',
      fatBurnRate: '0.00 - 0.10 g/min (Near Zero during effort)',
      carbBurnRate: '1.20 - 2.00 g/min (Extreme)',
      mitochondriaImpact: '⭐⭐⭐ (Expands VO2max ceiling, but fewer new mitochondria)',
      lactateLevel: '8.0 - 15.0+ mmol/L (Severe Acidosis)',
      recoveryTime: '48 - 72 Hours Needed',
      cnsFatigue: 'High (Spikes Cortisol & Sympathetic Drive)',
      injuryRisk: 'Moderate to High',
      keyPros: [
        'Rapidly expands peak VO2max cardio ceiling in short time',
        'Improves anaerobic power and buffering of muscle burn',
        'Time-efficient workout (15-20 minutes total)'
      ],
      keyCons: [
        'Locks CPT-1 fat gate—burns almost zero fat during the workout',
        'High CNS fatigue & cortisol spike if done more than 1-2x/week',
        'Cannot trigger deep mitochondrial density expansion like Zone 2'
      ],
      verdict: 'Great for peak speed & VO2max, but dangerous if overused without a Zone 2 base.'
    },
    {
      id: 'weights',
      name: 'Heavy Strength & Weightlifting',
      subtitle: 'Powerlifting, Hypertrophy, Barbell & Dumbbell Training',
      icon: '🏋️‍♂️',
      themeColor: 'purple',
      bgGradient: 'from-purple-950 to-slate-950',
      badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
      primaryFuel: 'ATP-PCr (Phosphagen) & Muscle Glycogen',
      fatBurnRate: '0.05 - 0.15 g/min (Low during lift)',
      carbBurnRate: '0.80 - 1.50 g/min (High burst)',
      mitochondriaImpact: '⭐ (Low mitochondrial biogenesis impact)',
      lactateLevel: '3.0 - 8.0 mmol/L (Localized In Muscle)',
      recoveryTime: '24 - 48 Hours Per Muscle Group',
      cnsFatigue: 'Moderate to High (Heavy Spinal & Neural Load)',
      injuryRisk: 'Moderate (Requires Strict Form)',
      keyPros: [
        '#1 modality for building muscle mass & maintaining bone density',
        'Increases resting metabolic rate via higher muscle tissue',
        'Strengthens joints, tendons, and connective tissue'
      ],
      keyCons: [
        'Does not train mitochondrial oxidative capacity or aerobic heart efficiency',
        'Zero direct fat oxidation during set execution'
      ],
      verdict: 'Essential partner to Zone 2! Together they form the ultimate strength + endurance hybrid.'
    },
    {
      id: 'zone3',
      name: 'Zone 3 / Tempo Training ("The Gray Zone")',
      subtitle: 'Moderate-Hard Running / Half-Marathon Pace (75-84% HRmax)',
      icon: '🏃',
      themeColor: 'amber',
      bgGradient: 'from-amber-950 to-stone-950',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      primaryFuel: '50% Carbohydrates / 50% Fat',
      fatBurnRate: '0.30 - 0.40 g/min (Declining)',
      carbBurnRate: '0.70 - 1.00 g/min (Rising)',
      mitochondriaImpact: '⭐⭐ (Sub-optimal for biogenesis)',
      lactateLevel: '2.5 - 4.0 mmol/L (Elevated Steady State)',
      recoveryTime: '24 - 36 Hours',
      cnsFatigue: 'Moderate (Accumulates Chronic Fatigue)',
      injuryRisk: 'Moderate (Repetitive Strain)',
      keyPros: [
        'Specific race pace practice for 10k/Half-Marathon runners',
        'Builds mental toughness for sustained moderate discomfort'
      ],
      keyCons: [
        'Too hard for optimal fat oxidation & mitochondrial growth',
        'Too easy to trigger maximal VO2max adaptation',
        'Causes "black hole fatigue"—burns out runners who train here daily'
      ],
      verdict: 'The classic trap zone! Beginners spend too much time here instead of staying easy in Zone 2.'
    },
    {
      id: 'metcon',
      name: 'CrossFit & High-Intensity MetCon',
      subtitle: 'Circuit Training, AMRAPs, Kettlebells & Plyometrics',
      icon: '🔥',
      themeColor: 'cyan',
      bgGradient: 'from-cyan-950 to-slate-950',
      badgeBg: 'bg-cyan-100 text-cyan-900 border-cyan-300',
      primaryFuel: 'Mixed Carbohydrate Glycolysis',
      fatBurnRate: '0.10 - 0.25 g/min (Low)',
      carbBurnRate: '1.00 - 1.80 g/min (Very High)',
      mitochondriaImpact: '⭐⭐⭐ (Mixed Hybrid Adaptation)',
      lactateLevel: '6.0 - 12.0 mmol/L (High Acidosis)',
      recoveryTime: '36 - 48 Hours',
      cnsFatigue: 'High (Adrenaline & High Heart Rate)',
      injuryRisk: 'High (Fast explosive lifts under fatigue)',
      keyPros: [
        'Combines cardiovascular stress with muscular endurance',
        'High total calorie expenditure during workout',
        'Fun, varied, and highly community-driven'
      ],
      keyCons: [
        'Extremely high lactate & acidity suppresses fat oxidation',
        'Risk of overtraining if done daily without Zone 2 recovery base'
      ],
      verdict: 'Exciting functional workout, but needs Zone 2 base to recover faster between rounds.'
    },
    {
      id: 'zone1',
      name: 'Zone 1 Casual Movement',
      subtitle: 'Light Walking, Household Chores, Easy Strolling (<60% HRmax)',
      icon: '🚶‍♀️',
      themeColor: 'stone',
      bgGradient: 'from-stone-900 to-stone-950',
      badgeBg: 'bg-stone-200 text-stone-900 border-stone-300',
      primaryFuel: '85% Fat / 15% Carbs',
      fatBurnRate: '0.10 - 0.15 g/min (Tiny per minute)',
      carbBurnRate: '0.02 - 0.05 g/min (Negligible)',
      mitochondriaImpact: '⭐ (Zero PGC-1α stimulus)',
      lactateLevel: '1.0 mmol/L (Baseline Rest)',
      recoveryTime: '0 Hours (Active Recovery)',
      cnsFatigue: 'Zero',
      injuryRisk: 'Zero',
      keyPros: [
        'Fantastic for blood sugar clearance after meals',
        'Improves daily NEAT (Non-Exercise Activity Thermogenesis)',
        'Great active recovery on rest days'
      ],
      keyCons: [
        'Work output is too low to trigger new mitochondrial building'
      ],
      verdict: 'Great for active rest and general health, but does not upgrade your cellular engine.'
    },
    {
      id: 'pilates',
      name: 'Pilates (Mat & Reformer)',
      subtitle: 'Core Stability, Spinal Alignment, Muscular Endurance & Posture',
      icon: '🧘‍♀️',
      themeColor: 'teal',
      bgGradient: 'from-teal-950 to-stone-950',
      badgeBg: 'bg-teal-100 text-teal-900 border-teal-300',
      primaryFuel: '65% Fat / 35% Carbohydrates',
      fatBurnRate: '0.20 - 0.35 g/min (Low to Moderate)',
      carbBurnRate: '0.15 - 0.30 g/min (Low)',
      mitochondriaImpact: '⭐⭐ (Active Recovery & Postural Resilience)',
      lactateLevel: '1.2 - 2.5 mmol/L (Mild Localized Resistance)',
      recoveryTime: '0 - 12 Hours (Highly Repeatable)',
      cnsFatigue: 'Very Low (Promotes Parasympathetic Calm)',
      injuryRisk: 'Very Low (Rehab Friendly / Zero Impact)',
      keyPros: [
        '#1 discipline for deep core stability, pelvic floor, and spinal alignment',
        'Improves posture and body awareness, keeping joints safe during running/cycling',
        'Lowers stress hormones (cortisol) through mindful breathwork'
      ],
      keyCons: [
        'Muscle mass involvement is too localized to maximize aerobic mitochondrial density',
        'Lower total calorie & fat oxidation per hour than Zone 2 running/cycling'
      ],
      verdict: 'The ultimate alignment partner! Pilates fixes posture & core stability so you can do Zone 2 injury-free.'
    }
  ];

  const selectedSport = SPORTS_DATA.find(s => s.id === selectedSportId) || SPORTS_DATA[1];
  const zone2Sport = SPORTS_DATA[0];

  return (
    <div className="space-y-8 font-sans">

      {/* Main Feature Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-stone-950 text-white space-y-4 shadow-lg border border-emerald-800/40 relative overflow-hidden">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-800/80 text-emerald-200 font-extrabold text-xs uppercase tracking-wider border border-emerald-600/50 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-emerald-300" />
            Special Comparative Analysis
          </span>
          <span className="text-xs text-stone-400 font-mono">Peer-Reviewed Physiology</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Zone 2 vs. Other Sports & Modalities
          </h2>
          <p className="text-emerald-200 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
            Why do World Champion endurance athletes, Tour de France cyclists, and top longevity physicians prioritize Zone 2 over HIIT, MetCons, and tempo training? Explore how Zone 2 compares head-to-head with every major training style.
          </p>
        </div>
      </div>

      {/* Interactive Sport Selector Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-stone-700">
          <span>Select a Sport / Modality to Compare with Zone 2:</span>
          <span className="text-emerald-800 font-extrabold">Showing Head-to-Head Breakdown</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {SPORTS_DATA.filter(s => s.id !== 'zone2').map(sport => {
            const isSelected = selectedSportId === sport.id;
            return (
              <button
                key={sport.id}
                onClick={() => setSelectedSportId(sport.id)}
                className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-800 shadow-md ring-2 ring-emerald-500'
                    : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="text-xl mb-1">{sport.icon}</div>
                <div className="text-xs font-bold leading-snug line-clamp-2">
                  {sport.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Head-to-Head Comparison Card Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Card: Zone 2 Benchmark */}
        <div className="p-6 rounded-3xl bg-emerald-900 text-white space-y-5 border border-emerald-700/60 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-black uppercase tracking-wider border border-emerald-600">
                ⭐ BENCHMARK: ZONE 2
              </span>
              <span className="text-2xl">{zone2Sport.icon}</span>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-white">{zone2Sport.name}</h3>
              <p className="text-xs text-emerald-200 mt-0.5">{zone2Sport.subtitle}</p>
            </div>

            {/* Metrics Breakdown */}
            <div className="space-y-2 pt-2 border-t border-emerald-800/80 text-xs">
              <div className="flex justify-between py-1 border-b border-emerald-800/50">
                <span className="text-emerald-300 font-medium">Primary Fuel:</span>
                <strong className="text-white">{zone2Sport.primaryFuel}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-800/50">
                <span className="text-emerald-300 font-medium">Fat Oxidation:</span>
                <strong className="text-amber-300">{zone2Sport.fatBurnRate}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-800/50">
                <span className="text-emerald-300 font-medium">Mitochondrial Expansion:</span>
                <strong className="text-emerald-200">{zone2Sport.mitochondriaImpact}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-800/50">
                <span className="text-emerald-300 font-medium">Lactate & pH:</span>
                <strong className="text-white">{zone2Sport.lactateLevel}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-emerald-300 font-medium">CNS Recovery Time:</span>
                <strong className="text-emerald-200">{zone2Sport.recoveryTime}</strong>
              </div>
            </div>

            {/* Key Advantages */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Zone 2 Key Advantages:</span>
              <ul className="space-y-1.5 text-xs text-emerald-100">
                {zone2Sport.keyPros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/50 text-xs text-emerald-200 font-medium italic">
            "{zone2Sport.verdict}"
          </div>
        </div>

        {/* Right Card: Selected Challenger Sport */}
        <div className="p-6 rounded-3xl bg-white text-stone-900 space-y-5 border border-stone-300 shadow-md flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${selectedSport.badgeBg}`}>
                COMPARED MODALITY
              </span>
              <span className="text-2xl">{selectedSport.icon}</span>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-stone-900">{selectedSport.name}</h3>
              <p className="text-xs text-stone-500 mt-0.5">{selectedSport.subtitle}</p>
            </div>

            {/* Metrics Breakdown */}
            <div className="space-y-2 pt-2 border-t border-stone-200 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-600 font-medium">Primary Fuel:</span>
                <strong className="text-stone-900">{selectedSport.primaryFuel}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-600 font-medium">Fat Oxidation:</span>
                <strong className="text-rose-700">{selectedSport.fatBurnRate}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-600 font-medium">Mitochondrial Expansion:</span>
                <strong className="text-stone-800">{selectedSport.mitochondriaImpact}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-600 font-medium">Lactate & pH:</span>
                <strong className="text-stone-900">{selectedSport.lactateLevel}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-600 font-medium">CNS Recovery Time:</span>
                <strong className="text-stone-800">{selectedSport.recoveryTime}</strong>
              </div>
            </div>

            {/* Key Differences / Pros & Cons */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">Pros & Considerations:</span>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {selectedSport.keyPros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
                {selectedSport.keyCons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-stone-600">
                    <XCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-800 font-medium italic">
            "{selectedSport.verdict}"
          </div>
        </div>

      </div>

      {/* Comprehensive Sport Comparison Table Matrix */}
      <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-4 font-sans">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-base">
            <Scale className="w-5 h-5 text-emerald-700" />
            <span>Master Comparison Matrix: Zone 2 vs. All Modalities</span>
          </div>
          <span className="text-xs text-stone-500 font-semibold hidden sm:inline">Scroll horizontally if needed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-300 text-stone-500 font-bold uppercase text-[10px] tracking-wider bg-stone-100/80">
                <th className="py-3 px-3">Sport / Modality</th>
                <th className="py-3 px-3">Primary Fuel</th>
                <th className="py-3 px-3">Fat Burn (g/min)</th>
                <th className="py-3 px-3">Mitochondria Signal</th>
                <th className="py-3 px-3">Lactate / Acid Burn</th>
                <th className="py-3 px-3">Recovery Needed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-800 font-normal">
              
              {/* Row 1: Zone 2 ⭐ */}
              <tr className="bg-emerald-50/80 font-semibold border-l-4 border-l-emerald-600">
                <td className="py-3 px-3 font-bold text-emerald-950 flex items-center gap-1.5">
                  <span>🏃‍♂️ Zone 2 (FATmax)</span>
                </td>
                <td className="py-3 px-3 text-emerald-900">Free Fatty Acids (Fat)</td>
                <td className="py-3 px-3 text-emerald-950 font-bold">0.55 - 0.70 g/min ⭐</td>
                <td className="py-3 px-3 text-emerald-900">Mitochondrial Expansion (PGC-1α)</td>
                <td className="py-3 px-3 text-emerald-900">1.5 - 2.0 mM (Balanced)</td>
                <td className="py-3 px-3 text-emerald-900">0-12 Hours (Daily)</td>
              </tr>

              {/* Row 2: HIIT */}
              <tr className="hover:bg-stone-100/60">
                <td className="py-3 px-3 font-bold text-stone-900 flex items-center gap-1.5">
                  <span>⚡ HIIT / Zone 5 Sprints</span>
                </td>
                <td className="py-3 px-3 text-stone-700">Glycogen (Carbs)</td>
                <td className="py-3 px-3 text-rose-700 font-bold">&lt; 0.10 g/min (Locked CPT-1)</td>
                <td className="py-3 px-3 text-stone-700">VO2max Peak Ceiling</td>
                <td className="py-3 px-3 text-rose-700 font-bold">&gt; 8.0 - 15.0 mM (Severe Burn)</td>
                <td className="py-3 px-3 text-stone-700">48 - 72 Hours</td>
              </tr>

              {/* Row 3: Weightlifting */}
              <tr className="hover:bg-stone-100/60">
                <td className="py-3 px-3 font-bold text-stone-900 flex items-center gap-1.5">
                  <span>🏋️‍♂️ Heavy Strength / Lifting</span>
                </td>
                <td className="py-3 px-3 text-stone-700">ATP-PCr & Glycogen</td>
                <td className="py-3 px-3 text-stone-600">0.05 - 0.15 g/min</td>
                <td className="py-3 px-3 text-stone-700">Muscle Hypertrophy & Density</td>
                <td className="py-3 px-3 text-stone-700">3.0 - 8.0 mM (Localized)</td>
                <td className="py-3 px-3 text-stone-700">24 - 48 Hours</td>
              </tr>

              {/* Row 4: Zone 3 */}
              <tr className="hover:bg-stone-100/60">
                <td className="py-3 px-3 font-bold text-stone-900 flex items-center gap-1.5">
                  <span>🏃 Zone 3 Tempo ("Gray Zone")</span>
                </td>
                <td className="py-3 px-3 text-stone-700">50% Carbs / 50% Fat</td>
                <td className="py-3 px-3 text-amber-700">0.30 - 0.40 g/min</td>
                <td className="py-3 px-3 text-stone-700">Sub-optimal Biogenesis</td>
                <td className="py-3 px-3 text-amber-700">2.5 - 4.0 mM</td>
                <td className="py-3 px-3 text-stone-700">24 - 36 Hours</td>
              </tr>

              {/* Row 5: MetCon */}
              <tr className="hover:bg-stone-100/60">
                <td className="py-3 px-3 font-bold text-stone-900 flex items-center gap-1.5">
                  <span>🔥 CrossFit / MetCon</span>
                </td>
                <td className="py-3 px-3 text-stone-700">Mixed Glycolysis</td>
                <td className="py-3 px-3 text-stone-600">0.10 - 0.25 g/min</td>
                <td className="py-3 px-3 text-stone-700">Hybrid Power Endurance</td>
                <td className="py-3 px-3 text-rose-700">6.0 - 12.0 mM</td>
                <td className="py-3 px-3 text-stone-700">36 - 48 Hours</td>
              </tr>

              {/* Row 6: Pilates */}
              <tr className="hover:bg-stone-100/60">
                <td className="py-3 px-3 font-bold text-stone-900 flex items-center gap-1.5">
                  <span>🧘‍♀️ Pilates (Mat & Reformer)</span>
                </td>
                <td className="py-3 px-3 text-stone-700">65% Fat / 35% Carbs</td>
                <td className="py-3 px-3 text-teal-700 font-semibold">0.20 - 0.35 g/min</td>
                <td className="py-3 px-3 text-stone-700">Postural & Muscular Balance</td>
                <td className="py-3 px-3 text-stone-700">1.2 - 2.5 mM (Mild Resistance)</td>
                <td className="py-3 px-3 text-teal-800 font-semibold">0 - 12 Hours (Daily)</td>
              </tr>

              {/* Row 7: Zone 1 */}
              <tr className="hover:bg-stone-100/60">
                <td className="py-3 px-3 font-bold text-stone-900 flex items-center gap-1.5">
                  <span>🚶‍♀️ Zone 1 Casual Walking</span>
                </td>
                <td className="py-3 px-3 text-stone-700">Fat (85%) / Carbs (15%)</td>
                <td className="py-3 px-3 text-stone-600">0.10 - 0.15 g/min (Slow)</td>
                <td className="py-3 px-3 text-stone-500">Baseline Maintenance</td>
                <td className="py-3 px-3 text-stone-700">1.0 mM (Baseline)</td>
                <td className="py-3 px-3 text-stone-700">0 Hours</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* The 80/20 Hybrid Training Solution Callout */}
      <div className="p-6 rounded-3xl bg-emerald-950 text-white space-y-4 shadow-md font-sans">
        <div className="flex items-center gap-2 text-emerald-300 font-bold text-base">
          <Layers className="w-5 h-5 text-emerald-400" />
          <span>The Optimal Hybrid Solution: How to Combine Zone 2 with Other Sports</span>
        </div>

        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
          Zone 2 is not meant to replace strength training or intense interval sprints. Instead, exercise physiologists (like Dr. Iñigo San Millán) recommend the <strong>80/20 Pyramidal Training Model</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-900/90 border border-emerald-700 space-y-1.5">
            <div className="font-extrabold text-emerald-200 uppercase text-[11px] tracking-wider">🏃 80% Aerobic Base (Zone 2)</div>
            <p className="text-emerald-100 text-xs">
              3 to 4 hours per week. Builds your mitochondrial engine, lowers resting heart rate, and maximizes daily fat oxidation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-900/90 border border-emerald-700 space-y-1.5">
            <div className="font-extrabold text-amber-200 uppercase text-[11px] tracking-wider">⚡ 20% High Intensity (Zone 5 / HIIT)</div>
            <p className="text-emerald-100 text-xs">
              1 session per week (15-20 min). Touches your maximal VO2max ceiling without overloading your nervous system.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-900/90 border border-emerald-700 space-y-1.5">
            <div className="font-extrabold text-purple-200 uppercase text-[11px] tracking-wider">🏋️ 2-3x Resistance Training</div>
            <p className="text-emerald-100 text-xs">
              Heavy lifting 2 to 3 times per week to preserve muscle mass, joint stability, and bone density.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
