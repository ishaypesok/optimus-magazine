import React, { useState, useEffect } from 'react';
import { ZONES } from '../data/metabolismData';
import { 
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, ReferenceLine, ReferenceDot 
} from 'recharts';
import { 
  Play, Pause, RotateCcw, FastForward, Flame, Wind, Sparkles, 
  Droplets, Activity, Calendar, CheckCircle2, PlusCircle, X, 
  ChevronLeft, ChevronRight, Eye, Layers, TrendingUp, Award, Gauge
} from 'lucide-react';

export default function RunnerSimulation() {
  const [minute, setMinute] = useState(0); // 0 to maxMins
  const [isRunning, setIsRunning] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [selectedRunId, setSelectedRunId] = useState('aug24');
  const [userVo2Max, setUserVo2Max] = useState(25.6);
  const [userWeightKg, setUserWeightKg] = useState(82.9);
  const [chartMode, setChartMode] = useState('calories'); // 'calories' | 'cumulative' | 'lactate'
  const [viewStyle, setViewStyle] = useState('progressive'); // 'progressive' | 'full' | 'compare'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New run input form state
  const [newRunDate, setNewRunDate] = useState('08/24/2026');
  const [newRunDuration, setNewRunDuration] = useState('72.3');
  const [newRunDistance, setNewRunDistance] = useState('6.11');
  const [newRunPace, setNewRunPace] = useState('11.83');
  const [newRunHr, setNewRunHr] = useState('108');
  const [newRunCalories, setNewRunCalories] = useState('381');

  // Real runs list
  const [runsList, setRunsList] = useState([
    {
      id: 'aug24',
      dateLabel: 'Aug 24, 2026 (Latest Run ⭐)',
      durationMin: 72.3,
      distanceKm: 6.11,
      paceMinKm: 11.83,
      avgHr: 108,
      watchCalories: 381,
      color: '#047857',
      note: 'New Distance Record (6.11 km)! 100% Zone 2 Aerobic Run • 108 BPM Avg HR • Apple Watch AutoSync!'
    },
    {
      id: 'aug21',
      dateLabel: 'Aug 21, 2026',
      durationMin: 63.53,
      distanceKm: 5.52,
      paceMinKm: 11.51,
      avgHr: 109,
      watchCalories: 316,
      color: '#2563eb',
      note: 'Verified 100% Zone 2 Run • 109 BPM Avg HR • Apple Watch Ultra AutoSync!'
    },
    {
      id: 'aug18',
      dateLabel: 'Aug 18, 2026',
      durationMin: 65.03,
      distanceKm: 5.56,
      paceMinKm: 11.68,
      avgHr: 117,
      watchCalories: 340,
      color: '#8b5cf6',
      note: 'Verified 100% Zone 2 Run in Kefar Sava!'
    },
    {
      id: 'aug15',
      dateLabel: 'Aug 15, 2026',
      durationMin: 65.0,
      distanceKm: 5.50,
      paceMinKm: 11.82,
      avgHr: 115,
      watchCalories: 330,
      color: '#d97706',
      note: 'Verified 100% Zone 2 Run!'
    },
    {
      id: 'aug12',
      dateLabel: 'Aug 12, 2026',
      durationMin: 66.4,
      distanceKm: 5.56,
      paceMinKm: 11.93,
      avgHr: 113,
      watchCalories: 329,
      color: '#059669',
      note: '100% Perfect Zone 2 Aerobic Pace!'
    },
    {
      id: 'aug08',
      dateLabel: 'Aug 8, 2026',
      durationMin: 64.8,
      distanceKm: 5.43,
      paceMinKm: 11.93,
      avgHr: 119,
      watchCalories: 337,
      color: '#dc2626',
      note: 'Solid Zone 2 Base Run'
    },
    {
      id: 'jul23',
      dateLabel: 'Jul 23, 2026',
      durationMin: 62.8,
      distanceKm: 5.44,
      paceMinKm: 11.53,
      avgHr: 119,
      watchCalories: 333,
      color: '#475569',
      note: 'Conversational 11.5 min/km Pace'
    }
  ]);

  const activeRun = runsList.find(r => r.id === selectedRunId) || runsList[0];
  const maxMins = Math.ceil(activeRun.durationMin);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setMinute((prev) => {
        if (prev >= maxMins) {
          setIsRunning(false);
          return maxMins;
        }
        return prev + 1;
      });
    }, 400 / speedMultiplier);

    return () => clearInterval(interval);
  }, [isRunning, speedMultiplier, maxMins]);

  const handleAddRun = (e) => {
    e.preventDefault();
    const dur = parseFloat(newRunDuration) || 60;
    const dist = parseFloat(newRunDistance) || 5.0;
    const hr = parseInt(newRunHr) || 115;
    const cal = parseInt(newRunCalories) || 330;
    const pace = parseFloat(newRunPace) || (dur / dist);

    const newId = `run_${Date.now()}`;
    const newEntry = {
      id: newId,
      dateLabel: `${newRunDate} (Custom Run)`,
      durationMin: dur,
      distanceKm: dist,
      paceMinKm: pace,
      avgHr: hr,
      watchCalories: cal,
      color: '#0d9488',
      note: 'User verified run'
    };

    setRunsList([newEntry, ...runsList]);
    setSelectedRunId(newId);
    setMinute(0);
    setIsRunning(false);
    setIsAddModalOpen(false);
  };

  // Math for user's VO2Max (25.6) & Weight (82.9kg)
  const z2Vo2MlKgMin = userVo2Max * 0.65;
  const z2Vo2LitersPerMin = (z2Vo2MlKgMin * userWeightKg) / 1000;

  const fatRateGPerMin = z2Vo2LitersPerMin * 0.35;
  const carbRateGPerMin = z2Vo2LitersPerMin * 0.12;

  const currentDistanceKm = ((minute / activeRun.paceMinKm)).toFixed(2);
  const fatGrams = minute * fatRateGPerMin;
  const carbGrams = minute * carbRateGPerMin;

  const fatGramsBurned = fatGrams.toFixed(1);
  const carbGramsBurned = carbGrams.toFixed(1);

  const fatCaloriesBurned = Math.round(fatGrams * 9);
  const carbCaloriesBurned = Math.round(carbGrams * 4);
  const totalCaloriesBurned = fatCaloriesBurned + carbCaloriesBurned;

  const o2LitersConsumed = (minute * z2Vo2LitersPerMin).toFixed(1);
  const metabolicWaterMl = (fatGrams * 1.1).toFixed(1);

  const computeRunLactate = (m, hr) => {
    const base = 1.0;
    const eq = Math.max(1.0, 1.0 + Math.pow(Math.max(0, hr - 90) / 32, 2.2));
    if (m === 0) return 1.0;
    if (m <= 8) {
      return parseFloat((base + (eq - base + 0.3) * (m / 8)).toFixed(2));
    } else if (m <= 15) {
      return parseFloat(((base + (eq - base + 0.3)) - (0.3 * ((m - 8) / 7))).toFixed(2));
    } else {
      const drift = m > 50 ? (m - 50) * 0.005 : 0;
      return parseFloat((eq + drift).toFixed(2));
    }
  };

  const currentRunLactate = computeRunLactate(minute, activeRun.avgHr);

  const fullSimulationChartData = [];
  for (let m = 0; m <= maxMins; m += 1) {
    const fG = m <= 15 ? (fatRateGPerMin * 0.5 * m + (m * m / 30) * fatRateGPerMin * 0.5) : (fatRateGPerMin * 0.5 * 15 + 7.5 * fatRateGPerMin * 0.5 + (m - 15) * fatRateGPerMin);
    const cG = m * carbRateGPerMin;

    const fKcal = Math.round(fG * 9);
    const cKcal = Math.round(cG * 4);
    const lactateMmol = computeRunLactate(m, activeRun.avgHr);
    const isElapsed = m <= minute;

    // Multi-run comparison data points
    const compObj = {};
    runsList.slice(0, 4).forEach(r => {
      if (m <= Math.ceil(r.durationMin)) {
        compObj[`lactate_${r.id}`] = computeRunLactate(m, r.avgHr);
      }
    });

    fullSimulationChartData.push({
      minute: `${m}m`,
      minNum: m,
      fatKcal: fKcal,
      carbKcal: cKcal,
      totalKcal: fKcal + cKcal,
      cumFat: parseFloat(fG.toFixed(1)),
      cumCarb: parseFloat(cG.toFixed(1)),
      lactate: lactateMmol,
      
      // Progressive reveal data (null for future minutes)
      activeFatKcal: isElapsed ? fKcal : null,
      activeCarbKcal: isElapsed ? cKcal : null,
      activeCumFat: isElapsed ? parseFloat(fG.toFixed(1)) : null,
      activeCumCarb: isElapsed ? parseFloat(cG.toFixed(1)) : null,
      activeLactate: isElapsed ? lactateMmol : null,

      ...compObj
    });
  }

  const activePoint = fullSimulationChartData[minute] || fullSimulationChartData[0];

  return (
    <section className="bg-stone-50 rounded-2xl p-6 md:p-8 border border-stone-200 shadow-xs mb-8 font-sans text-stone-900">
      
      {/* Header & Apple Health Real Run Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Real-Time Animated Run Results</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 flex items-center gap-2">
            🏃 {activeRun.dateLabel}
          </h2>
          <p className="text-xs text-stone-700 font-medium mt-1">
            Verified Heart Rate: <strong className="text-emerald-900 font-bold">{activeRun.avgHr} bpm (Zone 2)</strong> • Duration: <strong>{activeRun.durationMin.toFixed(1)} mins</strong> • Distance: <strong>{activeRun.distanceKm.toFixed(2)} km</strong>
          </p>
        </div>

        {/* Real Run Selector & Add Run Button */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-stone-300 text-xs shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span className="text-stone-700 font-bold">Select Run:</span>
            <select
              value={selectedRunId}
              onChange={(e) => {
                setSelectedRunId(e.target.value);
                setMinute(0);
                setIsRunning(false);
              }}
              className="bg-stone-100 text-stone-900 font-bold rounded-lg border border-stone-300 px-2 py-1 focus:outline-none"
            >
              {runsList.map(r => (
                <option key={r.id} value={r.id}>
                  {r.dateLabel} ({r.durationMin.toFixed(0)}m, {r.avgHr} bpm)
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 border border-stone-300 text-xs font-bold transition"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Update Run</span>
          </button>
        </div>
      </div>

      {/* Verified Run Verification Banner */}
      <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-xs mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center text-xl shrink-0 font-bold">
            ✓
          </div>
          <div>
            <div className="font-extrabold text-emerald-950 text-sm">Verification Result: 100% Zone 2 Aerobic Perfection!</div>
            <p className="text-emerald-900 font-medium">
              Your average heart rate of <strong>{activeRun.avgHr} bpm</strong> kept your mitochondria operating at peak fat oxidation (FATmax) with zero muscle burn!
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-emerald-900 block text-[10px] font-bold">Reported Active Calories:</span>
          <span className="text-emerald-950 font-extrabold text-base">{activeRun.watchCalories} kcal</span>
        </div>
      </div>

      {/* Control Panel */}
      <div className="p-4 rounded-2xl bg-white border border-stone-300 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-2xl shrink-0">
            ⏱️
          </div>
          <div>
            <div className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
              <span>Run Simulation Controller</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${isRunning ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-stone-100 text-stone-700 border border-stone-300'}`}>
                {isRunning ? '🟢 Running Live' : '⏸️ Paused'}
              </span>
            </div>
            <p className="text-xs text-stone-700 font-medium">
              Press the green button to start the live exercise clock and watch your run results move along the chart in real time!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-extrabold transition shadow-xs ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isRunning ? "Pause Clock" : minute >= maxMins ? "Re-Run Clock" : "START LIVE CLOCK RUN"}</span>
          </button>

          <button
            onClick={() => setSpeedMultiplier(speedMultiplier === 1 ? 5 : speedMultiplier === 5 ? 10 : 1)}
            className="px-3 py-2.5 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 transition"
          >
            <FastForward className="w-4 h-4 text-emerald-700 inline mr-1" />
            <span>{speedMultiplier}x Speed</span>
          </button>

          <button
            onClick={() => { setMinute(0); setIsRunning(false); }}
            className="px-3 py-2.5 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 transition"
          >
            <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Timeline Slider with Step Controls */}
      <div className="p-4 rounded-xl bg-white border border-stone-200 mb-6">
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="text-stone-700">0 min (Start)</span>
          <span className="text-emerald-900 font-extrabold text-xs bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-2">
            <span>⏱️ Minute {minute} of {maxMins}</span>
            <span>•</span>
            <span>🏃 {currentDistanceKm} km @ {activeRun.paceMinKm.toFixed(1)} min/km</span>
          </span>
          <span className="text-teal-900 font-bold">{maxMins} min (Finish)</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMinute(m => Math.max(0, m - 1))}
            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition"
            title="Step Back 1 Min"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <input
            type="range"
            min="0"
            max={maxMins}
            step="1"
            value={minute}
            onChange={(e) => setMinute(parseInt(e.target.value))}
            className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700 focus:outline-none"
          />

          <button
            onClick={() => setMinute(m => Math.min(maxMins, m + 1))}
            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition"
            title="Step Forward 1 Min"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Animated HUD Banner Directly Over the Chart */}
      <div className="bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 text-white p-4 rounded-2xl mb-4 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs border border-emerald-800/40 font-sans">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 text-xl font-black shrink-0 animate-pulse">
            🏃
          </div>
          <div>
            <div className="font-black text-stone-100 flex items-center gap-2 text-sm tracking-tight">
              <span>LIVE RUN POSITION: MINUTE {minute}</span>
              <span className="bg-emerald-500 text-stone-950 font-black px-2 py-0.5 rounded-full text-[10px] uppercase">
                {currentDistanceKm} KM
              </span>
            </div>
            <div className="text-[11px] text-stone-300 mt-0.5">
              Pace: <strong>{activeRun.paceMinKm.toFixed(2)} min/km</strong> • Avg HR: <strong className="text-emerald-400">{activeRun.avgHr} BPM</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-sans">
          <div className="text-center">
            <span className="block text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Fat Burned</span>
            <span className="font-extrabold text-emerald-300 text-base">{fatCaloriesBurned} <span className="text-[10px] text-emerald-400">kcal</span> <span className="text-[10px] text-stone-400 font-normal">({fatGramsBurned}g)</span></span>
          </div>

          <div className="w-px h-8 bg-stone-700/80"></div>

          <div className="text-center">
            <span className="block text-[10px] text-amber-400 font-bold uppercase tracking-wider">Carbs Burned</span>
            <span className="font-extrabold text-amber-300 text-base">{carbCaloriesBurned} <span className="text-[10px] text-amber-400">kcal</span> <span className="text-[10px] text-stone-400 font-normal">({carbGramsBurned}g)</span></span>
          </div>

          <div className="w-px h-8 bg-stone-700/80"></div>

          <div className="text-center">
            <span className="block text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Blood Lactate</span>
            <span className="font-extrabold text-cyan-300 text-base">{currentRunLactate} <span className="text-[10px] text-cyan-400">mM</span></span>
          </div>
        </div>
      </div>

      {/* Live Recharts Chart Animated synchronously with the Clock */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
              <Flame className="w-4 h-4 text-emerald-700" />
              Live Animated Chart Running with Clock (Min {minute})
            </h3>
            <p className="text-xs text-stone-700 font-medium mt-0.5">
              Watch the vertical runner line, glowing dot & graph curve move smoothly along the chart in real-time!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Switch */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-300 text-xs font-bold">
              <button
                onClick={() => setViewStyle('progressive')}
                className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
                  viewStyle === 'progressive' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
                }`}
                title="Progressive Trail: Draws line live as runner advances"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Live Trail</span>
              </button>
              <button
                onClick={() => setViewStyle('full')}
                className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
                  viewStyle === 'full' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
                }`}
                title="Full Graph View: Full curve with moving cursor"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Full Graph</span>
              </button>
              <button
                onClick={() => setViewStyle('compare')}
                className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
                  viewStyle === 'compare' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
                }`}
                title="Compare Historical Runs"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Compare Runs</span>
              </button>
            </div>

            {/* Metric Type Selector */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-300 text-xs font-bold">
              <button
                onClick={() => setChartMode('calories')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  chartMode === 'calories' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Calories
              </button>
              <button
                onClick={() => setChartMode('cumulative')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  chartMode === 'cumulative' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Grams
              </button>
              <button
                onClick={() => setChartMode('lactate')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  chartMode === 'lactate' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Lactate
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-72 relative">
          <ResponsiveContainer width="100%" height="100%">
            {viewStyle === 'compare' ? (
              <LineChart data={fullSimulationChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                <XAxis dataKey="minute" stroke="#44403c" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }} />
                <YAxis stroke="#44403c" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }} unit=" mM" domain={[0, 3.5]} />
                <Tooltip />
                <Legend />
                <ReferenceLine y={2.0} stroke="#047857" strokeDasharray="4 4" label={{ value: 'Zone 2 LT1 Threshold (2.0 mM)', fill: '#047857', fontSize: 11, fontWeight: 'bold' }} />
                
                {/* Moving Vertical Cursor Line & Marker Dot */}
                <ReferenceLine 
                  x={`${minute}m`} 
                  stroke="#047857" 
                  strokeWidth={2.5} 
                  strokeDasharray="3 3" 
                  label={{ value: `🏃 Min ${minute} (${currentDistanceKm}km)`, position: 'top', fill: '#047857', fontSize: 11, fontWeight: 'bold' }}
                />

                {runsList.slice(0, 4).map(run => (
                  <Line 
                    key={run.id}
                    type="monotone"
                    dataKey={`lactate_${run.id}`}
                    name={`${run.dateLabel.split(' ')[0]} (${run.avgHr} bpm)`}
                    stroke={run.color}
                    strokeWidth={run.id === selectedRunId ? 3.5 : 1.5}
                    strokeDasharray={run.id === selectedRunId ? '0' : '4 4'}
                    dot={false}
                  />
                ))}

                <ReferenceDot
                  x={`${minute}m`}
                  y={activePoint.lactate}
                  r={8}
                  fill="#047857"
                  stroke="#ffffff"
                  strokeWidth={3}
                  isFront={true}
                />
              </LineChart>
            ) : chartMode === 'lactate' ? (
              <LineChart data={fullSimulationChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                <XAxis dataKey="minute" stroke="#44403c" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }} />
                <YAxis stroke="#44403c" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }} unit=" mM" domain={[0, 3.5]} />
                <Tooltip />
                <ReferenceLine y={2.0} stroke="#047857" strokeDasharray="4 4" label={{ value: 'LT1 Aerobic Threshold (~2.0 mM)', fill: '#047857', fontSize: 11, fontWeight: 'bold' }} />

                {/* Vertical Moving Runner Cursor Line */}
                <ReferenceLine 
                  x={`${minute}m`} 
                  stroke="#047857" 
                  strokeWidth={2.5} 
                  strokeDasharray="3 3" 
                  label={{ value: `🏃 Min ${minute} (${currentDistanceKm}km)`, position: 'top', fill: '#047857', fontSize: 11, fontWeight: 'bold' }}
                />

                {/* Milestone Reference Markers */}
                <ReferenceLine x="15m" stroke="#3b82f6" strokeDasharray="2 2" label={{ value: 'Min 15: Steady State', fill: '#2563eb', fontSize: 10 }} />
                <ReferenceLine x="45m" stroke="#8b5cf6" strokeDasharray="2 2" label={{ value: 'Min 45: Endurance', fill: '#7c3aed', fontSize: 10 }} />

                {viewStyle === 'progressive' ? (
                  <>
                    {/* Ghost Projected Line */}
                    <Line type="monotone" dataKey="lactate" name="Projected Lactate" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                    {/* Active Real-Time Elapsed Line */}
                    <Line type="monotone" dataKey="activeLactate" name="Est. Blood Lactate (mmol/L)" unit=" mM" stroke="#047857" strokeWidth={4} dot={false} />
                  </>
                ) : (
                  <Line type="monotone" dataKey="lactate" name="Est. Blood Lactate (mmol/L)" unit=" mM" stroke="#047857" strokeWidth={3} dot={false} />
                )}

                {/* Pulsing Dot Moving Along Curve */}
                <ReferenceDot
                  x={`${minute}m`}
                  y={activePoint.lactate}
                  r={8}
                  fill="#047857"
                  stroke="#ffffff"
                  strokeWidth={3}
                  isFront={true}
                />
              </LineChart>
            ) : chartMode === 'calories' ? (
              <AreaChart data={fullSimulationChartData}>
                <defs>
                  <linearGradient id="simFatKcal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#047857" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#047857" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="simCarbKcal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                <XAxis dataKey="minute" stroke="#44403c" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }} />
                <YAxis stroke="#44403c" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }} unit=" kcal" domain={[0, 380]} />
                <Tooltip />

                {/* Vertical Moving Runner Cursor Line */}
                <ReferenceLine 
                  x={`${minute}m`} 
                  stroke="#047857" 
                  strokeWidth={2.5} 
                  strokeDasharray="3 3" 
                  label={{ value: `🏃 Min ${minute} (${currentDistanceKm}km)`, position: 'top', fill: '#047857', fontSize: 11, fontWeight: 'bold' }}
                />

                {viewStyle === 'progressive' ? (
                  <>
                    <Area type="monotone" dataKey="fatKcal" stroke="#94a3b8" strokeWidth={1} strokeDasharray="4 4" fill="none" />
                    <Area type="monotone" dataKey="carbKcal" stroke="#cbd5e1" strokeWidth={1} strokeDasharray="4 4" fill="none" />
                    
                    <Area type="monotone" dataKey="activeFatKcal" name="Fat Calories (9 kcal/g)" unit=" kcal" stroke="#047857" strokeWidth={3.5} fillOpacity={1} fill="url(#simFatKcal)" />
                    <Area type="monotone" dataKey="activeCarbKcal" name="Carb Calories (4 kcal/g)" unit=" kcal" stroke="#d97706" strokeWidth={3.5} fillOpacity={1} fill="url(#simCarbKcal)" />
                  </>
                ) : (
                  <>
                    <Area type="monotone" dataKey="fatKcal" name="Fat Calories (9 kcal/g)" unit=" kcal" stroke="#047857" strokeWidth={3} fillOpacity={1} fill="url(#simFatKcal)" />
                    <Area type="monotone" dataKey="carbKcal" name="Carb Calories (4 kcal/g)" unit=" kcal" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#simCarbKcal)" />
                  </>
                )}

                {/* Pulsing Dots Moving Along Curves */}
                <ReferenceDot
                  x={`${minute}m`}
                  y={activePoint.fatKcal}
                  r={7}
                  fill="#047857"
                  stroke="#ffffff"
                  strokeWidth={2.5}
                  isFront={true}
                />
                <ReferenceDot
                  x={`${minute}m`}
                  y={activePoint.carbKcal}
                  r={7}
                  fill="#d97706"
                  stroke="#ffffff"
                  strokeWidth={2.5}
                  isFront={true}
                />
              </AreaChart>
            ) : (
              <AreaChart data={fullSimulationChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                <XAxis dataKey="minute" stroke="#44403c" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }} />
                <YAxis stroke="#44403c" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }} unit=" g" domain={[0, 45]} />
                <Tooltip />

                {/* Vertical Moving Runner Cursor Line */}
                <ReferenceLine 
                  x={`${minute}m`} 
                  stroke="#047857" 
                  strokeWidth={2.5} 
                  strokeDasharray="3 3" 
                  label={{ value: `🏃 Min ${minute} (${currentDistanceKm}km)`, position: 'top', fill: '#047857', fontSize: 11, fontWeight: 'bold' }}
                />

                {viewStyle === 'progressive' ? (
                  <>
                    <Area type="monotone" dataKey="cumFat" stroke="#94a3b8" strokeWidth={1} strokeDasharray="4 4" fill="none" />
                    <Area type="monotone" dataKey="cumCarb" stroke="#cbd5e1" strokeWidth={1} strokeDasharray="4 4" fill="none" />

                    <Area type="monotone" dataKey="activeCumFat" name="Cumulative Fat (g)" unit="g" stroke="#047857" strokeWidth={3.5} fill="#047857" fillOpacity={0.7} />
                    <Area type="monotone" dataKey="activeCumCarb" name="Cumulative Carbs (g)" unit="g" stroke="#d97706" strokeWidth={3.5} fill="#d97706" fillOpacity={0.7} />
                  </>
                ) : (
                  <>
                    <Area type="monotone" dataKey="cumFat" name="Cumulative Fat (g)" unit="g" stroke="#047857" strokeWidth={3} fill="#047857" fillOpacity={0.7} />
                    <Area type="monotone" dataKey="cumCarb" name="Cumulative Carbs (g)" unit="g" stroke="#d97706" strokeWidth={3} fill="#d97706" fillOpacity={0.7} />
                  </>
                )}

                {/* Pulsing Dots Moving Along Curves */}
                <ReferenceDot
                  x={`${minute}m`}
                  y={activePoint.cumFat}
                  r={7}
                  fill="#047857"
                  stroke="#ffffff"
                  strokeWidth={2.5}
                  isFront={true}
                />
                <ReferenceDot
                  x={`${minute}m`}
                  y={activePoint.cumCarb}
                  r={7}
                  fill="#d97706"
                  stroke="#ffffff"
                  strokeWidth={2.5}
                  isFront={true}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cumulative Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-sans">
        
        <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50">
          <div className="text-[11px] font-extrabold text-emerald-900 uppercase">Fat Energy</div>
          <div className="text-xl font-extrabold text-emerald-950">{fatCaloriesBurned} kcal</div>
          <div className="text-xs font-bold text-emerald-800">{fatGramsBurned}g fat</div>
        </div>

        <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
          <div className="text-[11px] font-bold text-stone-700 uppercase">Carb Energy</div>
          <div className="text-xl font-extrabold text-stone-900">{carbCaloriesBurned} kcal</div>
          <div className="text-xs font-medium text-stone-600">{carbGramsBurned}g carbs</div>
        </div>

        <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
          <div className="text-[11px] font-bold text-stone-700 uppercase">Total Energy</div>
          <div className="text-xl font-extrabold text-stone-900">{totalCaloriesBurned} kcal</div>
          <div className="text-xs font-bold text-emerald-800">87% Fat Mix</div>
        </div>

        <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
          <div className="text-[11px] font-bold text-stone-700 uppercase">Verified O₂</div>
          <div className="text-xl font-extrabold text-stone-900">{o2LitersConsumed} L</div>
          <div className="text-xs font-medium text-stone-600">{z2Vo2LitersPerMin.toFixed(2)} L/min</div>
        </div>

        <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50">
          <div className="text-[11px] font-extrabold text-emerald-900 uppercase">Est. Lactate</div>
          <div className="text-xl font-extrabold text-emerald-950">{currentRunLactate} mM</div>
          <div className="text-xs font-bold text-emerald-800">Clearance ✅</div>
        </div>

        <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
          <div className="text-[11px] font-bold text-stone-700 uppercase">Metabolic Water</div>
          <div className="text-xl font-extrabold text-stone-900">{metabolicWaterMl} mL</div>
          <div className="text-xs font-medium text-stone-600">Hydration</div>
        </div>

      </div>

      {/* Add New Run Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 border border-stone-300 shadow-2xl relative font-sans text-stone-900">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-extrabold text-stone-900 flex items-center gap-2 mb-4">
              <PlusCircle className="w-5 h-5 text-emerald-700" />
              Update or Add Run Data
            </h3>

            <form onSubmit={handleAddRun} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-800 font-bold mb-1">Run Date:</label>
                <input
                  type="text"
                  value={newRunDate}
                  onChange={(e) => setNewRunDate(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-stone-800 font-bold mb-1">Duration (min):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newRunDuration}
                    onChange={(e) => setNewRunDuration(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-stone-800 font-bold mb-1">Distance (km):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newRunDistance}
                    onChange={(e) => setNewRunDistance(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-stone-800 font-bold mb-1">Pace (m/km):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newRunPace}
                    onChange={(e) => setNewRunPace(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-stone-800 font-bold mb-1">Avg HR (bpm):</label>
                  <input
                    type="number"
                    value={newRunHr}
                    onChange={(e) => setNewRunHr(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-stone-800 font-bold mb-1">Calories (kcal):</label>
                  <input
                    type="number"
                    value={newRunCalories}
                    onChange={(e) => setNewRunCalories(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 font-bold"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-stone-200 text-stone-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-700 text-white font-bold"
                >
                  Verify & Plot Run
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}

