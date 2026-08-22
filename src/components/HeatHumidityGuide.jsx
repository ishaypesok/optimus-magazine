import React, { useState } from 'react';
import { 
  Sun, Flame, Droplet, Activity, Clock, Sparkles, ShieldCheck, 
  CheckCircle2, Heart, TrendingUp, Zap, Thermometer, Smile, 
  Lightbulb, HelpCircle, ArrowRight, RefreshCw, AlertTriangle
} from 'lucide-react';

export default function HeatHumidityGuide() {
  // Interactive State 1: Pace & Heat Strain Calculator
  const [coolPaceMinutes, setCoolPaceMinutes] = useState(6); // 6:00 pace default
  const [coolPaceSeconds, setCoolPaceSeconds] = useState(0);
  const [unit, setUnit] = useState('min/km'); // 'min/km' or 'min/mi'
  const [heatSeverity, setHeatSeverity] = useState('moderate'); // 'mild', 'moderate', 'extreme'

  // Interactive State 2: Adaptation Timeline Tab
  const [activeAdaptationStage, setActiveAdaptationStage] = useState(1);

  // Interactive State 3: Hydration Scenario Selector
  const [selectedHydrationScenario, setSelectedHydrationScenario] = useState('short');

  // Heat Pace Adjuster Calculations
  const getPaceAddition = () => {
    switch (heatSeverity) {
      case 'mild': return 15; // +15 sec
      case 'moderate': return 25; // +25 sec
      case 'extreme': return 40; // +40 sec
      default: return 25;
    }
  };

  const totalCoolSec = coolPaceMinutes * 60 + coolPaceSeconds;
  const totalHeatSec = totalCoolSec + getPaceAddition();
  const heatPaceMin = Math.floor(totalHeatSec / 60);
  const heatPaceSec = totalHeatSec % 60;
  const formattedHeatSec = heatPaceSec < 10 ? `0${heatPaceSec}` : `${heatPaceSec}`;
  const formattedCoolSec = coolPaceSeconds < 10 ? `0${coolPaceSeconds}` : `${coolPaceSeconds}`;

  const adaptationStages = [
    {
      id: 1,
      days: 'Days 1 – 3',
      title: 'Initial Thermal Shock & Misery',
      status: 'High Perceived Stress',
      color: 'bg-rose-500/10 text-rose-700 border-rose-200',
      badgeBg: 'bg-rose-600',
      description: 'Perceived effort skyrockets. HR is elevated by 10-25 BPM for identical paces. Heavy, slow feeling is expected and normal.',
      mechanisms: [
        'Blood redirected away from legs to skin surface for cooling',
        'Stroke volume drops; heart rate compensates by drifting up',
        'Sweat response is delayed and sweat contains higher sodium'
      ],
      action: 'Run by RPE (talk test) only. Ignore watch pace completely.'
    },
    {
      id: 2,
      days: 'Days 4 – 7',
      title: 'Plasma Volume & Sweat Ramp',
      status: 'Physiological Shift',
      color: 'bg-amber-500/10 text-amber-800 border-amber-200',
      badgeBg: 'bg-amber-600',
      description: 'Your body expands blood plasma volume to maintain stroke volume while sweating earlier and more profusely.',
      mechanisms: [
        'Plasma volume expands by up to 10-15%',
        'Sweating begins at lower core temperature thresholds',
        'Aldosterone retention helps conserve urinary sodium'
      ],
      action: 'Maintain consistent easy Zone 2 effort. Electrolyte intake becomes helpful.'
    },
    {
      id: 3,
      days: 'Days 8 – 14',
      title: 'Full Heat Adaptation',
      status: 'Acclimatized Sweet Spot',
      color: 'bg-emerald-500/10 text-emerald-800 border-emerald-200',
      badgeBg: 'bg-emerald-600',
      description: 'Full heat acclimatization achieved. Core temperature remains lower, sweat is dilute, and perceived effort stabilizes.',
      mechanisms: [
        'Dilute sweat (sodium concentration cut in half)',
        'Cardiovascular stability restored at higher thermal loads',
        'Unlocks high fitness boost once cooler weather arrives'
      ],
      action: 'Normal training routine manageable. Enjoy the aerobic upgrade!'
    }
  ];

  const hydrationScenarios = {
    short: {
      title: 'Short Runs (30–45 min)',
      subtitle: 'Well-hydrated going into the run',
      badge: 'Low Hydration Risk',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      recommendation: 'Water is usually not strictly necessary mid-run if you hydrated beforehand, though taking small sips is fine if it makes you feel better.',
      keyTakeaway: 'Focus on drinking 300–500ml of water 1–2 hours before stepping outside.'
    },
    long: {
      title: 'Long Runs & High Weekly Mileage',
      subtitle: 'Runs > 60 min or high volume blocks',
      badge: 'High Thermal & Electrolyte Demand',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      recommendation: 'Electrolyte and carbohydrate drinks genuinely aid hydration, maintain blood sodium, and accelerate post-run recovery.',
      keyTakeaway: 'Sip 400–700ml per hour with ~300–500mg sodium. Pre-hydration is still the #1 lever.'
    },
    casual: {
      title: 'Low Mileage & Casual Exercise',
      subtitle: 'Easy recovery sessions & casual runs',
      badge: 'Standard Baseline',
      badgeColor: 'bg-stone-100 text-stone-800 border-stone-300',
      recommendation: 'You do not need expensive sports drinks or complex formulas. Plain water and good daily dietary hydration are more than enough.',
      keyTakeaway: 'Drink to thirst throughout the day and eat balanced meals.'
    }
  };

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">
      
      {/* Editorial Hero Banner */}
      <div className="bg-gradient-to-br from-amber-950 via-stone-900 to-emerald-950 text-white p-6 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-10 bottom-0 opacity-10 pointer-events-none">
          <Sun className="w-72 h-72 text-amber-300" />
        </div>

        <div className="relative space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider border border-amber-400/30 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-400" /> Page 14 • Summer Mileage Masterclass
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase tracking-wider border border-emerald-400/30 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" /> Thermal Physiology & RPE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Running in Heat & Humidity
          </h2>
          <p className="text-stone-200 text-sm sm:text-base font-medium leading-relaxed">
            Heat works like altitude—it is a physiological stressor your body can adapt to, but only if you train smart around it. The goal isn't to fight through heat exhaustion; it's to manage internal strain so summer mileage actually pays off.
          </p>
        </div>
      </div>

      {/* Interactive Tool 1: Real-Time Heat Pace Adjuster */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50/70 via-stone-50 to-emerald-50/50 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-900 font-extrabold text-lg">
              <Thermometer className="w-5 h-5 text-amber-700" />
              <span>Interactive Heat Pace & RPE Simulator</span>
            </div>
            <p className="text-xs text-stone-600 font-normal mt-0.5">
              See how heat and humidity automatically increase your perceived effort (RPE) without loss of aerobic fitness.
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-stone-200/70 p-1 rounded-xl text-xs font-bold text-stone-700 self-start sm:self-auto">
            <button
              onClick={() => setUnit('min/km')}
              className={`px-3 py-1 rounded-lg transition ${unit === 'min/km' ? 'bg-white shadow-xs text-emerald-900' : 'text-stone-600'}`}
            >
              min/km
            </button>
            <button
              onClick={() => setUnit('min/mi')}
              className={`px-3 py-1 rounded-lg transition ${unit === 'min/mi' ? 'bg-white shadow-xs text-emerald-900' : 'text-stone-600'}`}
            >
              min/mi
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          
          {/* Controls Column */}
          <div className="space-y-5 lg:col-span-2">
            
            {/* Pace Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-stone-800">
                <span>Target Pace in Cool Weather (15°C / 59°F):</span>
                <span className="text-sm font-black text-emerald-800 font-mono">
                  {coolPaceMinutes}:{formattedCoolSec} {unit}
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="12"
                step="0.5"
                value={coolPaceMinutes + coolPaceSeconds / 60}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  const mins = Math.floor(val);
                  const secs = Math.round((val - mins) * 60);
                  setCoolPaceMinutes(mins);
                  setCoolPaceSeconds(secs);
                }}
                className="w-full accent-emerald-700 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-medium text-stone-600 font-mono">
                <span>4:00 {unit}</span>
                <span>8:00 {unit}</span>
                <span>12:00 {unit}</span>
              </div>
            </div>

            {/* Heat Severity Radio Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-800 block">Current Weather & Humidity Level:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'mild', label: 'Warm (23-26°C)', sec: '+15s', bg: 'hover:bg-amber-100/60' },
                  { id: 'moderate', label: 'Hot & Humid (27-31°C)', sec: '+25s', bg: 'hover:bg-amber-100' },
                  { id: 'extreme', label: 'Scorching (32°C+)', sec: '+40s', bg: 'hover:bg-rose-100' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setHeatSeverity(item.id)}
                    className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-1 ${
                      heatSeverity === item.id 
                        ? 'bg-amber-700 text-white border-amber-800 shadow-sm font-bold' 
                        : `bg-white text-stone-800 border-stone-200 ${item.bg}`
                    }`}
                  >
                    <span className="text-xs font-semibold">{item.label}</span>
                    <span className={`text-[11px] font-mono font-bold ${heatSeverity === item.id ? 'text-amber-200' : 'text-amber-700'}`}>
                      {item.sec} pace shift
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Outcome Display Box */}
          <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-md space-y-4 text-center">
            <div className="text-xs font-extrabold uppercase tracking-wider text-amber-800 flex items-center justify-center gap-1">
              <Activity className="w-4 h-4 text-amber-600" /> Physiological Equivalent Pace
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-amber-950 font-mono">
                {heatPaceMin}:{formattedHeatSec} <span className="text-sm font-sans font-bold text-amber-800">{unit}</span>
              </div>
              <p className="text-xs font-bold text-amber-700">
                (+{getPaceAddition()} seconds per {unit.split('/')[1]})
              </p>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed font-normal pt-2 border-t border-stone-100">
              Running at <strong>{heatPaceMin}:{formattedHeatSec}</strong> in heat exerts the exact same internal cardiovascular & metabolic stress as <strong>{coolPaceMinutes}:{formattedCoolSec}</strong> in cool weather!
            </p>
          </div>

        </div>
      </div>

      {/* 8 Core Rules Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-black text-xl text-stone-900">
          <ShieldCheck className="w-6 h-6 text-emerald-700" />
          <h3>The 8 Essential Rules for Summer Running</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Rule 1 */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3 relative">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-sm">
                1
              </span>
              <h4 className="font-extrabold text-stone-900 text-base">Throw away the watch</h4>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Heat and humidity raise perceived effort at any given pace—sometimes by 20–30 seconds per mile. Run strictly by <strong>rate of perceived exertion (RPE)</strong> and the talk test, not the number on your wrist.
            </p>
            <div className="p-3 rounded-xl bg-amber-50 text-amber-900 text-xs font-semibold border border-amber-200/60">
              💡 <strong>Key Idea:</strong> Slower pace in heat = same internal cellular stress as faster pace in cool weather. Trust effort, not the clock.
            </div>
          </div>

          {/* Rule 2 */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3 relative">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-sm">
                2
              </span>
              <h4 className="font-extrabold text-stone-900 text-base">Be careful going long</h4>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Your brain shuts you down before you overheat—it is predictive (anticipatory governor), not reactive. Anything past ~60 minutes is higher risk in hot, humid conditions.
            </p>
            <ul className="text-xs text-stone-700 space-y-1.5 font-medium list-disc list-inside">
              <li><strong>Split long runs:</strong> turn a 90-min run into 45/45 or 60/30 with a break.</li>
              <li><strong>Marathoners:</strong> treat the long run as the week's highest-risk session.</li>
              <li>Mid-run water stops will <em>not</em> undo your training adaptations!</li>
            </ul>
          </div>

          {/* Rule 3 */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3 relative">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-sm">
                3
              </span>
              <h4 className="font-extrabold text-stone-900 text-base">Give yourself an out on workouts</h4>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Pushing into real heat exhaustion costs you weeks of recovery, not days. Build flexibility into hard efforts instead of locking in a rigid prescription.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                <span className="font-bold block text-[11px] uppercase text-rose-700">Instead of:</span>
                "6-mile rigid tempo run"
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                <span className="font-bold block text-[11px] uppercase text-emerald-700">Try:</span>
                "35 min tempo effort, split as needed"
              </div>
            </div>
          </div>

          {/* Rule 4 */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3 relative">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-sm">
                4
              </span>
              <h4 className="font-extrabold text-stone-900 text-base">Make it feel easier</h4>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Summer training is largely mental consistency. Lower perceived effort with proactive cooling hacks:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-stone-800">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-stone-100">
                <span>🧊 Cold towel on neck / frozen hat</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-stone-100">
                <span>🚰 Plan routes past water fountains</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-stone-100">
                <span>🏊 Cold shower / pool post-run</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-stone-100">
                <span>🏃 Indoor treadmill cross-training</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Tool 2: 14-Day Heat Adaptation Tracker */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-stone-900 font-extrabold text-lg">
              <RefreshCw className="w-5 h-5 text-emerald-700" />
              <span>Rule 5: The 14-Day Heat Adaptation Timeline</span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Full heat adaptation takes ~2 weeks. Consistency through the rough first few runs unlocks massive cellular upgrades.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold self-start sm:self-auto">
            100% Adaptation in 14 Days
          </span>
        </div>

        {/* Adaptation Stage Tabs */}
        <div className="grid grid-cols-3 gap-2">
          {adaptationStages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setActiveAdaptationStage(stage.id)}
              className={`p-3 sm:p-4 rounded-2xl border text-left transition ${
                activeAdaptationStage === stage.id
                  ? `${stage.color} border-2 shadow-xs font-bold`
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <div className="text-xs font-black uppercase tracking-wider">{stage.days}</div>
              <div className="text-xs sm:text-sm font-extrabold line-clamp-1">{stage.title}</div>
            </button>
          ))}
        </div>

        {/* Selected Stage Detail Panel */}
        {(() => {
          const currentStage = adaptationStages.find(s => s.id === activeAdaptationStage);
          return (
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-base font-extrabold text-stone-900">{currentStage.title}</h4>
                <span className={`px-3 py-1 rounded-full text-white text-xs font-extrabold ${currentStage.badgeBg}`}>
                  {currentStage.status}
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {currentStage.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-stone-200">
                <span className="text-xs font-bold text-stone-900 block">Physiological Adaptations Occurring:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentStage.mechanisms.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white border border-stone-200 text-xs text-stone-700 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200 text-xs font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Coach Strategy: {currentStage.action}</span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Interactive Tool 3: Hydration Matrix (Rule 6) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-stone-900 font-extrabold text-lg border-b border-stone-200 pb-4">
          <Droplet className="w-5 h-5 text-cyan-600" />
          <span>Rule 6: Hydration Decision Matrix</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {Object.keys(hydrationScenarios).map((key) => {
            const sc = hydrationScenarios[key];
            const isSelected = selectedHydrationScenario === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedHydrationScenario(key)}
                className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-cyan-50/80 border-cyan-400 border-2 shadow-xs'
                    : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div>
                  <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border inline-block mb-2 ${sc.badgeColor}`}>
                    {sc.badge}
                  </span>
                  <h4 className="font-extrabold text-stone-900 text-sm">{sc.title}</h4>
                  <p className="text-xs text-stone-500 font-normal mt-0.5">{sc.subtitle}</p>
                </div>
                <div className="text-xs font-bold text-cyan-800 flex items-center gap-1">
                  <span>View hydration protocol</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Scenario Output */}
        {(() => {
          const sc = hydrationScenarios[selectedHydrationScenario];
          return (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-900 to-teal-900 text-white space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-extrabold text-white">{sc.title} Protocol</h4>
                <Droplet className="w-5 h-5 text-cyan-300" />
              </div>
              <p className="text-xs sm:text-sm text-cyan-100 leading-relaxed">
                {sc.recommendation}
              </p>
              <div className="p-3 rounded-xl bg-white/10 text-cyan-50 border border-white/10 text-xs font-semibold">
                <strong>📌 Primary Rule:</strong> {sc.keyTakeaway}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Rules 7 & 8 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Rule 7 */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center font-black text-sm">
              7
            </span>
            <h4 className="font-extrabold text-stone-900 text-base">About Heart Rate & Cardiac Drift</h4>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Cardiac drift is dramatic in high humidity—heart rate can climb as if you are running far harder than you actually are. Use HR as one data point, not a strict governor.
          </p>
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>Quick 20-Minute Check-In:</span>
            </div>
            <p className="text-xs font-medium">
              20 minutes into a hard effort, ask: <em>"Does this still feel okay?"</em> If yes, continue. If not, that is your immediate signal to back off.
            </p>
          </div>
        </div>

        {/* Rule 8 */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-sm">
              8
            </span>
            <h4 className="font-extrabold text-stone-900 text-base">When the first cool day arrives</h4>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            All summer heat training builds massive expanded plasma volume and oxygen-carrying efficiency. When heat stress lifts, your fitness shoots up dramatically!
          </p>
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <Zap className="w-4 h-4 text-emerald-700" />
              <span>Harvest Your Heat Adaptations:</span>
            </div>
            <p className="text-xs font-medium">
              Schedule a hard workout on the first cool morning. Tempo, threshold, and repeat paces will drop noticeably effortlessly.
            </p>
          </div>
        </div>

      </div>

      {/* Summary Footnote Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 to-emerald-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
            Optimus Bioenergetics Takeaway
          </span>
          <h4 className="text-lg font-black text-white">
            Consistency Over Speed in the Heat
          </h4>
          <p className="text-xs text-stone-300 max-w-xl">
            Treat summer heat as an invisible altitude camp. Lower your pace, prioritize pre-hydration, listen to RPE, and watch your fitness explode when autumn arrives.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-emerald-600 text-white text-xs font-extrabold shrink-0 shadow-xs">
          Page 14 • Complete
        </div>
      </div>

    </article>
  );
}
