import React, { useState } from 'react';
import { 
  Heart, 
  BatteryCharging, 
  Activity, 
  Moon, 
  Zap, 
  Flame, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Award, 
  Info, 
  Sliders,
  Feather,
  Droplet
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ReferenceLine, 
  AreaChart, 
  Area 
} from 'recharts';
import confetti from 'canvas-confetti';
import LactateParadoxInfographic from './LactateParadoxInfographic';

export default function RecoveryMastery() {
  // 1. Zone 2 Calculator State
  const [age, setAge] = useState(35);
  const [restingHr, setRestingHr] = useState(60);
  const [customMaxHr, setCustomMaxHr] = useState('');
  const [trainingGoal, setTrainingGoal] = useState('health'); // 'health', 'fatloss', 'endurance', 'elite'

  // Calculated Heart Rates
  const estimatedMaxHr = customMaxHr ? parseInt(customMaxHr, 10) || 185 : Math.round(208 - (0.7 * age));
  const hrReserve = estimatedMaxHr - restingHr;
  
  // Karvonen Formula: HR = HR_rest + % * (HR_max - HR_rest)
  const z2LowerKarvonen = Math.round(restingHr + 0.60 * hrReserve);
  const z2UpperKarvonen = Math.round(restingHr + 0.70 * hrReserve);
  const z2MidKarvonen = Math.round(restingHr + 0.65 * hrReserve);
  
  // Traditional % HR Max
  const z2LowerTrad = Math.round(0.60 * estimatedMaxHr);
  const z2UpperTrad = Math.round(0.70 * estimatedMaxHr);

  // Weekly Zone 2 Target Volume
  const volumeTargets = {
    health: { label: 'General Health & Longevity', mins: 150, sessions: '3 x 50 min' },
    fatloss: { label: 'Metabolic Health & Fat Loss', mins: 210, sessions: '4 x 50 min' },
    endurance: { label: 'Endurance Building (80/20)', mins: 300, sessions: '4 x 75 min' },
    elite: { label: 'High-Volume Performance Peak', mins: 420, sessions: '5 x 85 min' },
  };

  // 2. Supercompensation Simulator State
  const [workoutIntensity, setWorkoutIntensity] = useState('z2'); // 'z2', 'z4', 'z5'
  const [recoveryQuality, setRecoveryQuality] = useState('optimal'); // 'poor', 'good', 'optimal'

  // Generate 7-day supercompensation curve data
  const generateSupercompData = () => {
    let fatigueFactor = workoutIntensity === 'z5' ? 40 : workoutIntensity === 'z4' ? 25 : 12;
    let recoveryRate = recoveryQuality === 'optimal' ? 1.5 : recoveryQuality === 'good' ? 1.0 : 0.6;
    
    // Day 0 to Day 6 (hourly points)
    const points = [];
    for (let hour = 0; hour <= 120; hour += 4) {
      const day = (hour / 24).toFixed(1);
      let performance = 100;

      if (hour < 2) {
        // Initial workout depletion phase
        performance = 100 - (fatigueFactor * (hour / 2));
      } else {
        // Recovery phase towards baseline and supercompensation peak
        const hoursPost = hour - 2;
        const recoveryTimeNeeded = (fatigueFactor * 2.5) / recoveryRate; 
        
        if (hoursPost < recoveryTimeNeeded) {
          // Returning to baseline
          const progress = hoursPost / recoveryTimeNeeded;
          performance = (100 - fatigueFactor) + (fatigueFactor * progress);
        } else if (hoursPost < recoveryTimeNeeded + 36) {
          // Supercompensation Peak!
          const superPeakProgress = (hoursPost - recoveryTimeNeeded) / 36;
          const peakBonus = workoutIntensity === 'z5' ? 12 : workoutIntensity === 'z4' ? 8 : 5;
          const decay = Math.sin(superPeakProgress * Math.PI);
          performance = 100 + (peakBonus * decay);
        } else {
          // Detraining / return to baseline
          performance = 100 + Math.max(0, 5 - ((hoursPost - recoveryTimeNeeded - 36) * 0.1));
        }
      }

      points.push({
        hour,
        day: `Day ${(hour / 24).toFixed(1)}`,
        performance: Math.round(performance),
        baseline: 100
      });
    }
    return points;
  };

  const supercompData = generateSupercompData();

  // 3. HRV & ANS Balance Simulator
  const [hrvRmssd, setHrvRmssd] = useState(65); // 20 - 120 ms
  const [rhrDelta, setRhrDelta] = useState(0); // -5 to +10 bpm above baseline

  const calculateAnsBalance = () => {
    let score = (hrvRmssd / 100) * 70 - (rhrDelta * 3);
    score = Math.max(10, Math.min(100, Math.round(score)));
    
    if (score >= 75) {
      return { 
        state: 'Parasympathetic Dominance (Rest & Digest)', 
        color: 'text-emerald-400', 
        bgColor: 'bg-emerald-500/10 border-emerald-500/30',
        icon: '🌿',
        desc: 'High Vagal Tone! Mitochondria are actively repairing, glycogen stores are restoring, and protein synthesis is peaking. Excellent day for high volume Zone 2 or intense intervals.' 
      };
    } else if (score >= 45) {
      return { 
        state: 'Balanced Autonomic Tone', 
        color: 'text-teal-300', 
        bgColor: 'bg-teal-500/10 border-teal-500/30',
        icon: '⚖️',
        desc: 'Normal physiological baseline. Your nervous system is balanced. Stick to planned Zone 2 training.' 
      };
    } else {
      return { 
        state: 'Sympathetic Stress Dominance (Fight or Flight)', 
        color: 'text-rose-400', 
        bgColor: 'bg-rose-500/10 border-rose-500/30',
        icon: '⚠️',
        desc: 'Elevated Cortisol & Adrenaline! High sympathetic drive is suppressing recovery. Avoid Zone 4/5 HIIT today. Choose Active Recovery (Zone 1 walk/spin) and prioritize deep sleep.' 
      };
    }
  };

  const ansStatus = calculateAnsBalance();

  // 4. Active vs Passive Lactate Clearance Simulator
  const [clearanceMode, setClearanceMode] = useState('active'); // 'active' or 'passive'

  const generateLactateClearanceData = () => {
    const data = [];
    let activeLactate = 8.5; // Starting high post Zone 4/5 effort
    let passiveLactate = 8.5;

    for (let min = 0; min <= 60; min += 5) {
      data.push({
        minute: `${min}m`,
        ActiveZone1: parseFloat(activeLactate.toFixed(1)),
        PassiveRest: parseFloat(passiveLactate.toFixed(1)),
        Threshold: 2.0
      });

      // Active clearance rate via Type I fiber oxidation + MCT1 shuttles: ~0.45 mM per 5 min
      activeLactate = Math.max(1.2, activeLactate - 0.65);
      // Passive clearance (sitting still): ~0.20 mM per 5 min
      passiveLactate = Math.max(1.2, passiveLactate - 0.25);
    }
    return data;
  };

  const lactateClearanceData = generateLactateClearanceData();

  // 5. Daily Recovery Score Assessment Widget
  const [sleepScore, setSleepScore] = useState(8);
  const [domsScore, setDomsScore] = useState(2); // 1 = none, 10 = extreme
  const [mentalStress, setMentalStress] = useState(3); // 1 = relaxed, 10 = stressed
  const [assessmentResult, setAssessmentResult] = useState(null);

  const calculateReadiness = () => {
    const sleepContrib = (sleepScore / 10) * 40;
    const domsContrib = ((10 - domsScore) / 9) * 30;
    const stressContrib = ((10 - mentalStress) / 9) * 30;
    const totalScore = Math.round(sleepContrib + domsContrib + stressContrib);

    let recommendation = '';
    let zoneAction = '';
    let badgeBg = '';

    if (totalScore >= 80) {
      recommendation = '🚀 High Readiness! Your cell repair and nervous system are fully recharged.';
      zoneAction = 'Green Light: 60-90 min Zone 2 Base Run/Ride OR High-Intensity Zone 4/5 Intervals.';
      badgeBg = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    } else if (totalScore >= 60) {
      recommendation = '💛 Moderate Readiness. Solid baseline state for steady-state aerobic work.';
      zoneAction = 'Optimal Action: Pure Zone 2 Conversational Aerobic Training (45-60 min). Keep intensity controlled.';
      badgeBg = 'bg-teal-500/20 text-teal-300 border-teal-500/40';
    } else {
      recommendation = '❤️ Low Readiness / Recovery Deficit. Body is signaling fatigue and cellular stress.';
      zoneAction = 'Caution Action: Switch to Zone 1 Active Recovery (30 min easy walk/light spin), stretching & 8+ hours sleep.';
      badgeBg = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    }

    setAssessmentResult({ score: totalScore, recommendation, zoneAction, badgeBg });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch (e) {
      // Confetti fallback
    }
  };

  return (
    <div className="space-y-10 mb-16 max-w-7xl mx-auto">
      
      {/* Hero Banner */}
      <section className="glass-panel p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-emerald-400 mb-2">
              <Heart className="w-4 h-4 fill-emerald-400/20" />
              <span>Physiological Mastery Protocol</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">
                Page 11 • Zone 2 & Recovery Engine
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 mb-3 bg-gradient-to-r from-slate-100 via-emerald-200 to-teal-300 bg-clip-text text-transparent">
              Master Zone 2 & Recovery
            </h2>
            <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-medium">
              Zone 2 training expands mitochondrial density and fat oxidation capacity—but true metabolic adaptation occurs during <strong>Recovery</strong>. Optimize your heart rate targets, HRV, lactate clearance, and supercompensation curve.
            </p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-emerald-500/30 bg-slate-950/80 flex items-center gap-4 shrink-0 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-slate-950 font-black text-2xl shadow-md shadow-emerald-500/20">
              ⚡
            </div>
            <div>
              <div className="text-xs uppercase text-slate-400 font-bold">Golden Rule</div>
              <div className="text-sm font-bold text-emerald-300">Adaptation = Stress + Recovery</div>
              <div className="text-[11px] text-slate-400">Zone 2 builds the engine; Recovery repairs it.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FEATURED METABOLIC EDUCATION INFOGRAPHIC (PAGE 11) */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-800 tracking-wider">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>Page 11 Metabolic Education Feature Infographic</span>
        </div>
        <LactateParadoxInfographic />
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: INTERACTIVE ZONE 2 & FATMAX CALCULATOR */}
      {/* ------------------------------------------------------------- */}
      <section className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100">1. Precision Zone 2 & Target HR Calculator</h3>
              <p className="text-xs text-slate-400">Uses Karvonen Heart Rate Reserve (HRR) formula for maximum accuracy.</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30 hidden sm:inline-block">
            Karvonen Method
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls & Inputs */}
          <div className="lg:col-span-5 space-y-5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between mb-1.5">
                <span>Age: <strong className="text-emerald-400 font-mono text-sm">{age} years</strong></span>
                <span className="text-[10px] text-slate-400">Est. HR max: {estimatedMaxHr} bpm</span>
              </label>
              <input 
                type="range" 
                min="18" 
                max="80" 
                value={age} 
                onChange={(e) => setAge(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between mb-1.5">
                <span>Resting Heart Rate (RHR): <strong className="text-teal-400 font-mono text-sm">{restingHr} bpm</strong></span>
                <span className="text-[10px] text-slate-400">Measured upon waking</span>
              </label>
              <input 
                type="range" 
                min="40" 
                max="90" 
                value={restingHr} 
                onChange={(e) => setRestingHr(parseInt(e.target.value, 10))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">
                Custom Measured HR Max (Optional):
              </label>
              <input 
                type="number" 
                placeholder={`Default: ${208 - Math.round(0.7 * age)} bpm`}
                value={customMaxHr} 
                onChange={(e) => setCustomMaxHr(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                Training Goal & Target Volume:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(volumeTargets).map((key) => (
                  <button
                    key={key}
                    onClick={() => setTrainingGoal(key)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all border ${
                      trainingGoal === key
                        ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/50 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>{volumeTargets[key].label}</div>
                    <div className="text-[10px] opacity-75 font-mono mt-0.5">{volumeTargets[key].mins} min/wk</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Target Results Display */}
          <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Karvonen Zone 2 */}
              <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase text-emerald-400">Target Zone 2 HR Range</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">HRR Method</span>
                </div>
                <div className="text-3xl font-black font-mono text-emerald-300">
                  {z2LowerKarvonen} – {z2UpperKarvonen} <span className="text-sm font-normal text-slate-400">BPM</span>
                </div>
                <p className="text-xs text-slate-300">
                  Sweet Spot (FATmax Peak): <strong className="text-emerald-400 font-mono">{z2MidKarvonen} BPM</strong>.
                </p>
                <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 mt-1">
                  🗣️ <strong>Talk Test Benchmark:</strong> Continuous nasal breathing & effortless full-sentence dialogue.
                </div>
              </div>

              {/* Standard % HR Max Comparison */}
              <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase text-slate-400">Standard % HR Max</span>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">Simple Method</span>
                </div>
                <div className="text-3xl font-black font-mono text-slate-300">
                  {z2LowerTrad} – {z2UpperTrad} <span className="text-sm font-normal text-slate-400">BPM</span>
                </div>
                <p className="text-xs text-slate-400">
                  Based strictly on 60%–70% of estimated HR max ({estimatedMaxHr} bpm).
                </p>
                <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 mt-1">
                  💡 HRR (Karvonen) is superior as it adapts to your athletic resting heart rate!
                </div>
              </div>

            </div>

            {/* Weekly Prescription Summary Card */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase text-teal-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <span>Weekly Zone 2 Prescription ({volumeTargets[trainingGoal].label})</span>
                </div>
                <div className="text-lg font-extrabold text-slate-100">
                  {volumeTargets[trainingGoal].mins} Minutes / Week <span className="text-xs font-normal text-slate-400">({volumeTargets[trainingGoal].sessions})</span>
                </div>
                <p className="text-xs text-slate-300">
                  Builds capillary density, GLUT4 transporters, and mitochondrial volume without causing CNS burnout.
                </p>
              </div>

              <div className="shrink-0 px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 font-mono text-xs font-bold text-center">
                Lactate Ceiling<br/>
                <span className="text-base text-white">~1.7 - 2.0 mM</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: SUPERCOMPENSATION & TRAINING LOAD SIMULATOR */}
      {/* ------------------------------------------------------------- */}
      <section className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100">2. Supercompensation & Training Load Curve</h3>
              <p className="text-xs text-slate-400">Simulate how fitness adaptation peaks post-workout based on recovery quality.</p>
            </div>
          </div>

          {/* Simulator Controls */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Intensity Toggle */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setWorkoutIntensity('z2')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${workoutIntensity === 'z2' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}
              >
                Zone 2 Base
              </button>
              <button
                onClick={() => setWorkoutIntensity('z4')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${workoutIntensity === 'z4' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
              >
                Zone 4 Threshold
              </button>
              <button
                onClick={() => setWorkoutIntensity('z5')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${workoutIntensity === 'z5' ? 'bg-rose-500 text-slate-950' : 'text-slate-400'}`}
              >
                Zone 5 HIIT
              </button>
            </div>

            {/* Recovery Quality Toggle */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setRecoveryQuality('poor')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${recoveryQuality === 'poor' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-slate-400'}`}
              >
                Poor Rest 🥱
              </button>
              <button
                onClick={() => setRecoveryQuality('good')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${recoveryQuality === 'good' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-400'}`}
              >
                Good Rest 🙂
              </button>
              <button
                onClick={() => setRecoveryQuality('optimal')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${recoveryQuality === 'optimal' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400'}`}
              >
                Optimal Rest 🌟
              </button>
            </div>

          </div>
        </div>

        {/* Supercompensation Recharts Curve */}
        <div className="h-64 sm:h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={supercompData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="supercompGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
              <YAxis domain={[50, 120]} stroke="#94a3b8" fontSize={11} unit="%" />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="glass-panel p-3 rounded-xl border border-slate-700 bg-slate-900/95 text-xs space-y-1">
                        <div className="font-bold text-slate-100">{data.day} ({data.hour} Hours Post-Workout)</div>
                        <div className="text-emerald-400 font-mono font-bold">
                          Fitness / Readiness Level: {data.performance}%
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {data.performance > 100 ? '🚀 Supercompensation Peak Zone!' : data.performance < 100 ? '📉 Fatigue & Repair Phase' : 'Baseline State'}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine y={100} stroke="#64748b" strokeDasharray="4 4" label={{ value: 'Baseline Fitness (100%)', fill: '#94a3b8', fontSize: 10 }} />
              <Area type="monotone" dataKey="performance" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#supercompGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Dynamic Key Findings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="font-bold text-rose-400 flex items-center gap-1.5">
              <span>📉 Phase 1: Depletion & Acute Fatigue</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Glycogen is depleted, micro-tears occur in myofibrils, and cellular ATP drops. Performance is temporarily impaired.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="font-bold text-teal-300 flex items-center gap-1.5">
              <span>🔄 Phase 2: Compensation / Repair</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Anabolic hormones (Growth Hormone, Testosterone) peak during deep sleep. Protein synthesis restores muscle tissue to baseline.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-1">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <span>🚀 Phase 3: Supercompensation Peak</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              The golden window! Mitochondria & glycogen over-index above baseline. Hitting your next workout here compounds long-term gains.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: AUTONOMIC NERVOUS SYSTEM & HRV SIMULATOR */}
      {/* ------------------------------------------------------------- */}
      <section className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100">3. Autonomic Nervous System & HRV Tracker</h3>
            <p className="text-xs text-slate-400">Heart Rate Variability (rMSSD) reflects Vagus nerve tone and cellular readiness.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls */}
          <div className="lg:col-span-5 space-y-5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between mb-1.5">
                <span>Morning HRV (rMSSD): <strong className="text-emerald-400 font-mono text-sm">{hrvRmssd} ms</strong></span>
                <span className="text-[10px] text-slate-400">Higher = Parasympathetic</span>
              </label>
              <input 
                type="range" 
                min="20" 
                max="120" 
                value={hrvRmssd} 
                onChange={(e) => setHrvRmssd(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between mb-1.5">
                <span>Resting Heart Rate Delta vs Baseline: <strong className="text-teal-400 font-mono text-sm">{rhrDelta > 0 ? `+${rhrDelta}` : rhrDelta} bpm</strong></span>
                <span className="text-[10px] text-slate-400">+5 bpm signals stress</span>
              </label>
              <input 
                type="range" 
                min="-5" 
                max="12" 
                value={rhrDelta} 
                onChange={(e) => setRhrDelta(parseInt(e.target.value, 10))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 leading-relaxed">
              💡 <strong>Why HRV Matters for Zone 2:</strong> Zone 2 training stimulates parasympathetic vagal tone without causing systemic stress spikes. Low HRV indicates sympathetic burnout.
            </div>
          </div>

          {/* ANS Gauge & Recommendation Output */}
          <div className="lg:col-span-7 space-y-4">
            <div className={`p-6 rounded-2xl border ${ansStatus.bgColor} space-y-3 transition-all`}>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{ansStatus.icon}</span>
                <span className={`text-xs font-bold uppercase tracking-wider ${ansStatus.color}`}>
                  Autonomic Status Diagnostic
                </span>
              </div>
              
              <h4 className={`text-2xl font-black ${ansStatus.color}`}>
                {ansStatus.state}
              </h4>
              
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {ansStatus.desc}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/80 text-xs font-mono">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Sympathetic Drive</span>
                  <span className="text-slate-200 font-bold">{Math.max(10, 100 - hrvRmssd)}% (Adrenaline / Fight-or-Flight)</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Vagal Parasympathetic Tone</span>
                  <span className="text-emerald-400 font-bold">{hrvRmssd}% (Repair & Regeneration)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: ACTIVE VS PASSIVE LACTATE CLEARANCE */}
      {/* ------------------------------------------------------------- */}
      <section className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <Droplet className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100">4. Lactate Clearance: Active Zone 1 Flush vs Passive Rest</h3>
              <p className="text-xs text-slate-400">Why light movement (Zone 1) clears lactate 2.5x faster than sitting down.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Chart */}
          <div className="lg:col-span-8 h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lactateClearanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="minute" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 10]} stroke="#94a3b8" fontSize={11} unit=" mM" />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="glass-panel p-3 rounded-xl border border-slate-700 bg-slate-900/95 text-xs space-y-1">
                          <div className="font-bold text-slate-100">Time: {payload[0].payload.minute}</div>
                          <div className="text-emerald-400 font-mono">
                            ⚡ Active Zone 1 Flush: {payload[0].payload.ActiveZone1} mmol/L
                          </div>
                          <div className="text-rose-400 font-mono">
                            🛋️ Passive Sitting Rest: {payload[0].payload.PassiveRest} mmol/L
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine y={2.0} stroke="#10b981" strokeDasharray="4 4" label={{ value: 'Zone 2 LT1 Baseline (2.0 mM)', fill: '#10b981', fontSize: 10 }} />
                <Line type="monotone" dataKey="ActiveZone1" stroke="#10b981" strokeWidth={3} dot={{ r: 3 }} name="Active Zone 1 Flush" />
                <Line type="monotone" dataKey="PassiveRest" stroke="#f43f5e" strokeWidth={3} strokeDasharray="4 4" dot={{ r: 3 }} name="Passive Rest" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Explanation */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-2">
              <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
                <span>⚡ Active Zone 1 Flush Protocol</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Spinning easy at 50% HRmax keeps blood circulating through Type I (slow-twitch) muscle fibers without creating new lactate.
              </p>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-300 font-mono text-[11px]">
                MCT1 Transporters shuttle lactate directly into mitochondria to burn as fuel!
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/20 space-y-2">
              <h4 className="font-bold text-rose-400 text-sm">
                🛋️ Passive Sitting Rest
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Sitting on the bench slows cardiac output. Lactate removal relies solely on liver gluconeogenesis (Cori cycle), taking over double the time.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 5: THE 5 PILLARS OF RECOVERY MASTERY */}
      {/* ------------------------------------------------------------- */}
      <section className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100">5. The 5 Science-Backed Pillars of Recovery Mastery</h3>
            <p className="text-xs text-slate-400">Actionable protocols to accelerate cellular repair and mitochondrial biogenesis.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Pillar 1 */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold">1</span>
              <Moon className="w-5 h-5 text-indigo-400" />
            </div>
            <h4 className="font-bold text-slate-100 text-sm">Sleep & Mitophagy Architecture</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Stage 3/4 Slow-Wave Sleep releases <strong>~70% of daily Growth Hormone</strong>. During deep sleep, the cell triggers <em>Mitophagy</em> (PINK1/Parkin pathway) to destroy damaged mitochondria and build fresh ones.
            </p>
            <div className="text-[11px] text-emerald-400 font-mono pt-1">Target: 7.5 – 9 hours / night</div>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">2</span>
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <h4 className="font-bold text-slate-100 text-sm">Post-Workout GLUT4 Fueling Window</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              In the 30–45 minutes post-exercise, <strong>GLUT4 glucose transporters</strong> remain docked at the cell membrane independent of insulin. Consuming carbs + protein (3:1 ratio) rapidly refills muscle glycogen.
            </p>
            <div className="text-[11px] text-amber-400 font-mono pt-1">Ratio: 0.8g carb/kg + 0.3g protein/kg</div>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">3</span>
              <Feather className="w-5 h-5 text-teal-400" />
            </div>
            <h4 className="font-bold text-slate-100 text-sm">Active Zone 1 & Hydrotherapy</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              20–30 minutes of low-intensity Zone 1 spinning or walking promotes capillary vasodilation and lymphatic drainage without triggering muscle damage or additional cortisol.
            </p>
            <div className="text-[11px] text-teal-300 font-mono pt-1">Protocol: HR &lt; 55% HRmax</div>
          </div>

          {/* Pillar 4 */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">4</span>
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="font-bold text-slate-100 text-sm">Polarized 80 / 20 Training Balance</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Keep 80% of total weekly endurance volume strictly inside <strong>Zone 2</strong>, and only 20% in Zone 4/5. Avoid the "Zone 3 Black Hole" which causes high chronic fatigue with low mitochondrial return.
            </p>
            <div className="text-[11px] text-emerald-300 font-mono pt-1">Rule: 80% Easy / 20% Hard</div>
          </div>

          {/* Pillar 5 */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold">5</span>
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </div>
            <h4 className="font-bold text-slate-100 text-sm">Overtraining & Cardiac Drift Defense</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Monitor <em>Cardiac Drift</em> (HR rising while maintaining steady power/pace). If HR drifts &gt; 8% in Zone 2, your core body temperature or dehydration is impairing stroke volume.
            </p>
            <div className="text-[11px] text-rose-300 font-mono pt-1">Red Flag: Morning RHR +6 bpm</div>
          </div>

          {/* Pillar 6 */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">6</span>
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <h4 className="font-bold text-slate-100 text-sm">Hydration & Electrolyte Homeostasis</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mitochondrial enzymes (Citrate Synthase, PDH) require fluid homeostasis to maintain matrix volume. Sweat loses Sodium ($Na^+$) and Potassium ($K^+$), which must be replenished.
            </p>
            <div className="text-[11px] text-cyan-300 font-mono pt-1">Tip: 500mg Sodium per hour Z2</div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 6: DAILY READINESS & RECOVERY ASSESSMENT WIDGET */}
      {/* ------------------------------------------------------------- */}
      <section className="glass-panel p-6 md:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 shadow-2xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100">6. Interactive Daily Recovery & Readiness Check</h3>
            <p className="text-xs text-slate-300">Answer 3 quick metrics to get your personalized daily Zone 2 training recommendation.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Form */}
          <div className="lg:col-span-6 space-y-5 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between mb-1.5">
                <span>Sleep Quality Last Night: <strong className="text-emerald-400 font-mono text-sm">{sleepScore} / 10</strong></span>
                <span className="text-[10px] text-slate-400">{sleepScore >= 8 ? 'Restful Deep Sleep' : 'Interrupted'}</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={sleepScore} 
                onChange={(e) => setSleepScore(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between mb-1.5">
                <span>Muscle Soreness (DOMS): <strong className="text-amber-400 font-mono text-sm">{domsScore} / 10</strong></span>
                <span className="text-[10px] text-slate-400">{domsScore <= 3 ? 'Fresh Legs' : 'Heavy / Sore'}</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={domsScore} 
                onChange={(e) => setDomsScore(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between mb-1.5">
                <span>Mental & Life Stress Level: <strong className="text-cyan-400 font-mono text-sm">{mentalStress} / 10</strong></span>
                <span className="text-[10px] text-slate-400">{mentalStress <= 3 ? 'Low Stress' : 'High Stress'}</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={mentalStress} 
                onChange={(e) => setMentalStress(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <button
              onClick={calculateReadiness}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Calculate Today's Recovery Score & Recommendation</span>
            </button>
          </div>

          {/* Assessment Result Output */}
          <div className="lg:col-span-6 space-y-4">
            {assessmentResult ? (
              <div className="glass-panel p-6 rounded-2xl border border-emerald-500/40 bg-slate-900/90 space-y-4 animate-fade-in shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Daily Readiness Score</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${assessmentResult.badgeBg}`}>
                    {assessmentResult.score} / 100
                  </span>
                </div>

                <div className="text-3xl font-black font-mono text-emerald-300">
                  {assessmentResult.score}% Readiness
                </div>

                <p className="text-sm font-semibold text-slate-200 leading-relaxed">
                  {assessmentResult.recommendation}
                </p>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
                  <strong>Prescribed Action:</strong> {assessmentResult.zoneAction}
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl border border-dashed border-slate-800 text-center space-y-3 bg-slate-950/40">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mx-auto text-xl">
                  ⚡
                </div>
                <h4 className="font-bold text-slate-300 text-sm">Ready to check today's recovery status?</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Adjust the sliders on the left and click calculate to generate your custom action plan!
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
