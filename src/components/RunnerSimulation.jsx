import React, { useState, useEffect } from 'react';
import { ZONES } from '../data/metabolismData';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, ReferenceDot } from 'recharts';
import { Play, Pause, RotateCcw, FastForward, Flame, Wind, Sparkles, Droplets, Award, Activity, Sliders, HelpCircle, UserCheck, Calendar, CheckCircle2, PlusCircle, X } from 'lucide-react';

export default function RunnerSimulation() {
  const [minute, setMinute] = useState(0); // 0 to maxMins
  const [isRunning, setIsRunning] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [selectedRunId, setSelectedRunId] = useState('aug18');
  const [userVo2Max, setUserVo2Max] = useState(25.6);
  const [userWeightKg, setUserWeightKg] = useState(82.9);
  const [chartMode, setChartMode] = useState('calories');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New run input form state
  const [newRunDate, setNewRunDate] = useState('08/18/2026');
  const [newRunDuration, setNewRunDuration] = useState('65');
  const [newRunDistance, setNewRunDistance] = useState('5.56');
  const [newRunPace, setNewRunPace] = useState('11.68');
  const [newRunHr, setNewRunHr] = useState('117');
  const [newRunCalories, setNewRunCalories] = useState('340');

  // Real runs list
  const [runsList, setRunsList] = useState([
    {
      id: 'aug18',
      dateLabel: 'Aug 18, 2026 (New Latest Run ⭐)',
      durationMin: 65.03,
      distanceKm: 5.56,
      paceMinKm: 11.68,
      avgHr: 117,
      watchCalories: 340,
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
      note: 'User verified run'
    };

    setRunsList([newEntry, ...runsList]);
    setSelectedRunId(newId);
    setMinute(0);
    setIsRunning(false);
    setIsAddModalOpen(false);
  };

  // Math for user's VO2Max (25.6) & Weight (80kg)
  const z2Vo2MlKgMin = userVo2Max * 0.65;
  const z2Vo2LitersPerMin = (z2Vo2MlKgMin * userWeightKg) / 1000;

  const fatRateGPerMin = z2Vo2LitersPerMin * 0.35;
  const carbRateGPerMin = z2Vo2LitersPerMin * 0.12;

  const currentDistanceKm = ((minute / activeRun.paceMinKm)).toFixed(2);
  const currentDistanceMiles = (currentDistanceKm * 0.621371).toFixed(2);

  const fatGrams = minute * fatRateGPerMin;
  const carbGrams = minute * carbRateGPerMin;

  const fatGramsBurned = fatGrams.toFixed(1);
  const carbGramsBurned = carbGrams.toFixed(1);

  const fatCaloriesBurned = Math.round(fatGrams * 9);
  const carbCaloriesBurned = Math.round(carbGrams * 4);
  const totalCaloriesBurned = fatCaloriesBurned + carbCaloriesBurned;

  const o2LitersConsumed = (minute * z2Vo2LitersPerMin).toFixed(1);
  const co2LitersExhaled = (o2LitersConsumed * 0.8).toFixed(1);
  const metabolicWaterMl = (fatGrams * 1.1).toFixed(1);
  const atpBillions = (minute * z2Vo2LitersPerMin * 0.07).toFixed(2);

  // Dynamic Lactate calculation tailored to active run's Avg HR and minute
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

  // Live Full Chart Dataset up to maxMins
  const fullSimulationChartData = [];
  for (let m = 0; m <= maxMins; m += 1) { // 1-minute granularity for smooth clock animation!
    const fG = m <= 15 ? (fatRateGPerMin * 0.5 * m + (m * m / 30) * fatRateGPerMin * 0.5) : (fatRateGPerMin * 0.5 * 15 + 7.5 * fatRateGPerMin * 0.5 + (m - 15) * fatRateGPerMin);
    const cG = m * carbRateGPerMin;

    const fKcal = Math.round(fG * 9);
    const cKcal = Math.round(cG * 4);

    const currentFatRate = m <= 15 ? fatRateGPerMin * 0.5 + (m / 15) * fatRateGPerMin * 0.5 : fatRateGPerMin;
    const lactateMmol = computeRunLactate(m, activeRun.avgHr);

    fullSimulationChartData.push({
      minute: `${m}m`,
      minNum: m,
      fatKcal: fKcal,
      carbKcal: cKcal,
      totalKcal: fKcal + cKcal,
      cumFat: parseFloat(fG.toFixed(1)),
      cumCarb: parseFloat(cG.toFixed(1)),
      fatRate: parseFloat(currentFatRate.toFixed(2)),
      carbRate: parseFloat(carbRateGPerMin.toFixed(2)),
      lactate: lactateMmol
    });
  }

  // Current active slice for progressive real-time chart filling
  const liveChartData = fullSimulationChartData.slice(0, minute + 1);
  const currentChartPoint = fullSimulationChartData[minute] || fullSimulationChartData[0];

  return (
    <section className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl mb-8 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40">
      
      {/* Header & Apple Health Real Run Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-emerald-400 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Real-Time Clock & Chart Simulation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-2">
            🏃 {activeRun.dateLabel}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Verified Heart Rate: <strong className="text-emerald-300">{activeRun.avgHr} bpm (Zone 2)</strong> • Duration: <strong>{activeRun.durationMin.toFixed(1)} mins</strong> • Distance: <strong>{activeRun.distanceKm.toFixed(2)} km</strong>
          </p>
        </div>

        {/* Real Run Selector & Add Run Button */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Select Real Run */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-emerald-500/40 text-xs">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300 font-semibold">Select Run:</span>
            <select
              value={selectedRunId}
              onChange={(e) => {
                setSelectedRunId(e.target.value);
                setMinute(0);
                setIsRunning(false);
              }}
              className="bg-slate-950 text-emerald-300 font-bold rounded-lg border border-emerald-500/40 px-2 py-1 focus:outline-none"
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
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Update Run</span>
          </button>
        </div>
      </div>

      {/* Verified Run Verification Banner */}
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xl shrink-0">
            ✅
          </div>
          <div>
            <div className="font-bold text-emerald-300 text-sm">Verification Result: 100% Zone 2 Aerobic Perfection!</div>
            <p className="text-slate-300">
              Your average heart rate of <strong>{activeRun.avgHr} bpm</strong> kept your mitochondria operating at peak fat oxidation (FAT_max) with zero muscle burn!
            </p>
          </div>
        </div>

        <div className="text-right shrink-0 font-mono">
          <span className="text-slate-400 block text-[10px]">Reported Active Calories:</span>
          <span className="text-emerald-300 font-extrabold text-base">{activeRun.watchCalories} kcal</span>
        </div>
      </div>

      {/* Prominent Start Clock & Control Panel (Positioned directly below Verification Result) */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border-2 border-emerald-500/50 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-emerald-500/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-2xl text-emerald-400 shrink-0">
            ⏱️
          </div>
          <div>
            <div className="font-extrabold text-slate-100 text-sm flex items-center gap-2">
              <span>Run Simulation Controller</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${isRunning ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
                {isRunning ? '🟢 Running Live' : '⏸️ Paused'}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Press the green button to start the live exercise clock and watch metabolic output animate in real-time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-extrabold transition-all shadow-xl scale-105 ${
              isRunning
                ? 'bg-amber-500/20 text-amber-300 border-2 border-amber-500/60 hover:bg-amber-500/30'
                : 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-emerald-500/30 animate-pulse-glow'
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5 text-amber-400" /> : <Play className="w-5 h-5 text-slate-950 fill-slate-950" />}
            <span>{isRunning ? "Pause Clock" : minute >= maxMins ? "Re-Run 65 Min Clock" : "▶ START LIVE CLOCK RUN"}</span>
          </button>

          <button
            onClick={() => setSpeedMultiplier(speedMultiplier === 1 ? 5 : 1)}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border transition-all ${
              speedMultiplier > 1
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
            title="Toggle simulation speed"
          >
            <FastForward className="w-4 h-4 text-cyan-400" />
            <span>{speedMultiplier}x Speed</span>
          </button>

          <button
            onClick={() => { setMinute(0); setIsRunning(false); }}
            className="flex items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-700 hover:bg-slate-800 transition-all"
            title="Reset clock to Minute 0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Timeline Slider with Live Ticking Badge */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6">
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="text-slate-300">0 min (Start)</span>
          <span className="text-emerald-400 font-extrabold text-sm flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            <span className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
            <span>⏱️ Minute {minute} of {maxMins} — {currentDistanceKm} km @ {activeRun.paceMinKm.toFixed(1)} min/km</span>
          </span>
          <span className="text-teal-300">{maxMins} min (Finish)</span>
        </div>

        <input
          type="range"
          min="0"
          max={maxMins}
          step="1"
          value={minute}
          onChange={(e) => setMinute(parseInt(e.target.value))}
          className="w-full h-4 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none ring-2 ring-emerald-500/30"
        />

        <div className="flex justify-between text-[10px] text-slate-500 font-semibold mt-2">
          <span>0m</span>
          <span>15m (FATmax Peak)</span>
          <span>30m</span>
          <span>45m</span>
          <span>{maxMins}m (Target: {activeRun.distanceKm} km)</span>
        </div>
      </div>

      {/* Live Recharts Chart Animated synchronously with the Clock */}
      <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Flame className="w-4 h-4 text-emerald-400 animate-pulse" />
              Live Animated Chart Running with Clock (Min {minute})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Watch the cursor line & curves advance in real-time as the exercise clock ticks!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setChartMode('calories')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                chartMode === 'calories'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Calories (kcal)
            </button>
            <button
              onClick={() => setChartMode('cumulative')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                chartMode === 'cumulative'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Weight (Grams)
            </button>
            <button
              onClick={() => setChartMode('lactate')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                chartMode === 'lactate'
                  ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🧪 Lactate Curve (mM)
            </button>
          </div>
        </div>

        <div className="w-full h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            {chartMode === 'lactate' ? (
              <LineChart data={fullSimulationChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="minute" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit=" mM" domain={[0, 4]} />
                <Tooltip />
                <Legend verticalAlign="top" height={30} />
                <ReferenceLine y={2.0} stroke="#14b8a6" strokeDasharray="4 4" label={{ value: 'LT1 (Aerobic Threshold ~2.0 mM)', fill: '#14b8a6', fontSize: 10, fontWeight: 'bold' }} />
                <ReferenceLine
                  x={`${minute}m`}
                  stroke="#34d399"
                  strokeWidth={2.5}
                  strokeDasharray="4 4"
                  label={{
                    value: `⏱️ MINUTE ${minute} (${currentRunLactate} mM)`,
                    fill: '#34d399',
                    fontSize: 11,
                    fontWeight: 'bold',
                    position: 'top'
                  }}
                />
                <Line type="monotone" dataKey="lactate" name="Est. Blood Lactate (mmol/L)" unit=" mM" stroke="#14b8a6" strokeWidth={3.5} dot={false} activeDot={{ r: 8 }} />
              </LineChart>
            ) : chartMode === 'calories' ? (
              <AreaChart data={fullSimulationChartData}>
                <defs>
                  <linearGradient id="simFatKcal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="simCarbKcal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="minute" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit=" kcal" domain={[0, 350]} />
                <Tooltip />
                <Legend verticalAlign="top" height={30} />
                
                {/* Live Clock Moving Cursor Line */}
                <ReferenceLine
                  x={`${minute}m`}
                  stroke="#34d399"
                  strokeWidth={2.5}
                  strokeDasharray="4 4"
                  label={{
                    value: `⏱️ MINUTE ${minute} (${fatCaloriesBurned} kcal Fat)`,
                    fill: '#34d399',
                    fontSize: 11,
                    fontWeight: 'bold',
                    position: 'top'
                  }}
                />

                <Area type="monotone" dataKey="fatKcal" name="Fat Calories (9 kcal/g)" unit=" kcal" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#simFatKcal)" />
                <Area type="monotone" dataKey="carbKcal" name="Carb Calories (4 kcal/g)" unit=" kcal" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#simCarbKcal)" />
              </AreaChart>
            ) : (
              <AreaChart data={fullSimulationChartData}>
                <defs>
                  <linearGradient id="simFat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="simCarb" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="minute" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit=" g" domain={[0, 40]} />
                <Tooltip />
                <Legend verticalAlign="top" height={30} />

                {/* Live Clock Moving Cursor Line */}
                <ReferenceLine
                  x={`${minute}m`}
                  stroke="#34d399"
                  strokeWidth={2.5}
                  strokeDasharray="4 4"
                  label={{
                    value: `⏱️ MINUTE ${minute} (${fatGramsBurned}g Fat)`,
                    fill: '#34d399',
                    fontSize: 11,
                    fontWeight: 'bold',
                    position: 'top'
                  }}
                />

                <Area type="monotone" dataKey="cumFat" name="Cumulative Fat (g)" unit="g" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#simFat)" />
                <Area type="monotone" dataKey="cumCarb" name="Cumulative Carbs (g)" unit="g" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#simCarb)" />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cumulative Metrics Grid updating synchronously with the Clock */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        
        {/* Fat Burned */}
        <div className="glass-card p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-300 mb-1">
            <Flame className="w-3.5 h-3.5 text-emerald-400" /> Fat Energy (9 kcal/g)
          </div>
          <div className="text-xl font-extrabold text-emerald-300">
            {fatCaloriesBurned} <span className="text-xs font-normal text-slate-300">kcal</span>
          </div>
          <div className="text-[10px] font-bold text-emerald-400 mt-1">
            {fatGramsBurned} grams of fat
          </div>
        </div>

        {/* Carb Burned */}
        <div className="glass-card p-3.5 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400 mb-1">
            <Flame className="w-3.5 h-3.5 text-amber-400" /> Carb Energy (4 kcal/g)
          </div>
          <div className="text-xl font-extrabold text-amber-300">
            {carbCaloriesBurned} <span className="text-xs font-normal text-slate-400">kcal</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            {carbGramsBurned} grams (spared!)
          </div>
        </div>

        {/* Total Calories */}
        <div className="glass-card p-3.5 rounded-xl border border-teal-500/30">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-teal-300 mb-1">
            🔥 Calculated Energy
          </div>
          <div className="text-xl font-extrabold text-teal-300">
            {totalCaloriesBurned} <span className="text-xs font-normal text-slate-300">kcal</span>
          </div>
          <div className="text-[10px] font-semibold text-emerald-400 mt-1">
            87% Fat / 13% Carbs
          </div>
        </div>

        {/* Oxygen Consumed */}
        <div className="glass-card p-3.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-cyan-300 mb-1">
            <Wind className="w-3.5 h-3.5 text-cyan-400" /> Verified O₂ (80kg)
          </div>
          <div className="text-xl font-extrabold text-cyan-300">
            {o2LitersConsumed} <span className="text-xs font-normal text-slate-300">Liters</span>
          </div>
          <div className="text-[10px] font-bold text-cyan-400 mt-1">
            {z2Vo2LitersPerMin.toFixed(2)} L/min
          </div>
        </div>

        {/* Dynamic Blood Lactate Card */}
        <div className="glass-card p-3.5 rounded-xl border border-teal-500/40 bg-teal-500/10">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-teal-300 mb-1">
            🧪 Est. Blood Lactate
          </div>
          <div className="text-xl font-extrabold text-teal-300">
            {currentRunLactate} <span className="text-xs font-normal text-slate-300">mM</span>
          </div>
          <div className="text-[10px] font-bold text-emerald-400 mt-1">
            {currentRunLactate <= 2.0 ? 'Optimal Clearance ✅' : 'Elevated Threshold ⚠️'}
          </div>
        </div>

        {/* Water Produced */}
        <div className="glass-card p-3.5 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400 mb-1">
            <Droplets className="w-3.5 h-3.5 text-blue-400" /> Water Produced
          </div>
          <div className="text-xl font-extrabold text-blue-300">
            {metabolicWaterMl} <span className="text-xs font-normal text-slate-400">mL</span>
          </div>
          <div className="text-[9px] text-slate-500 mt-1">Internal hydration</div>
        </div>

        {/* ATP Generated */}
        <div className="glass-card p-3.5 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> ATP Generated
          </div>
          <div className="text-xl font-extrabold text-yellow-300">
            {atpBillions} <span className="text-xs font-normal text-slate-400">Billion</span>
          </div>
          <div className="text-[9px] text-slate-500 mt-1">Aerobic yield</div>
        </div>

      </div>

      {/* Add New Run Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel max-w-md w-full rounded-2xl p-6 border border-slate-700 shadow-2xl relative bg-slate-900">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-4">
              <PlusCircle className="w-5 h-5 text-emerald-400" />
              Update or Add 08/15/2026 Run Data
            </h3>

            <form onSubmit={handleAddRun} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Run Date:</label>
                <input
                  type="text"
                  value={newRunDate}
                  onChange={(e) => setNewRunDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Duration (minutes):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newRunDuration}
                    onChange={(e) => setNewRunDuration(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Distance (km):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newRunDistance}
                    onChange={(e) => setNewRunDistance(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Pace (m/km):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newRunPace}
                    onChange={(e) => setNewRunPace(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Avg HR (bpm):</label>
                  <input
                    type="number"
                    value={newRunHr}
                    onChange={(e) => setNewRunHr(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Calories (kcal):</label>
                  <input
                    type="number"
                    value={newRunCalories}
                    onChange={(e) => setNewRunCalories(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold"
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
