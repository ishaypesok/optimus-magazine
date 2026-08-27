import React, { useState, useEffect } from 'react';
import { 
  Trophy, Calendar, CheckCircle2, Circle, Activity, Target, 
  Flame, Plus, Trash2, Zap, Heart, ShieldCheck, Info, ChevronDown, ChevronUp, Smile, Cpu, Sparkles, TrendingUp, RefreshCw, Gauge, Smartphone
} from 'lucide-react';

const APPLE_WATCH_PACER_PROGRAM = [
  { 
    week: 1, 
    focus: "Week 1 — Establishing Z2 Pacer Pace (11.5 min/km)", 
    workouts: [
      { id: "w1d1", day: "Run 1 (e.g. Tue)", title: "Zone 2 Pacer Run", pacerPace: "11.5 min/km", desc: "Set Apple Watch Pacer to 11.5 min/km. Run comfortably strictly by body feeling. Stop whenever your body dictates." },
      { id: "w1d2", day: "Run 2 (e.g. Thu)", title: "Light Z2 Pacer Flow", pacerPace: "11.5 min/km", desc: "Set Apple Watch Pacer to 11.5 min/km. If watch vibrates 'Ahead', slow down to keep HR low." },
      { id: "w1d3", day: "Run 3 (e.g. Sat)", title: "Long Aerobic Pacer Run", pacerPace: "11.5 min/km", desc: "Set Apple Watch Pacer to 11.5 min/km. Smooth continuous time-on-feet in Zone 2." }
    ]
  },
  { 
    week: 2, 
    focus: "Week 2 — PGC-1α Mitochondrial Adaptation (11.3 min/km)", 
    workouts: [
      { id: "w2d1", day: "Run 1 (e.g. Tue)", title: "Zone 2 Base Pacer", pacerPace: "11.3 min/km", desc: "Set Watch Pacer to 11.3 min/km. Soft stride under hips, peak fat oxidation." },
      { id: "w2d2", day: "Run 2 (e.g. Thu)", title: "Steady Z2 Pacer Groove", pacerPace: "11.3 min/km", desc: "Set Watch Pacer to 11.3 min/km. Feel how light conversational breathing stays." },
      { id: "w2d3", day: "Run 3 (e.g. Sat)", title: "Time-on-Feet Pacer Run", pacerPace: "11.3 min/km", desc: "Set Watch Pacer to 11.3 min/km. Building cellular mitochondrial density." }
    ]
  },
  { 
    week: 3, 
    focus: "Week 3 — Aerobic Efficiency Gain (11.0 min/km)", 
    workouts: [
      { id: "w3d1", day: "Run 1 (e.g. Tue)", title: "Zone 2 Base Pacer", pacerPace: "11.0 min/km", desc: "Set Watch Pacer to 11.0 min/km. Notice pace feels easier at same heart rate." },
      { id: "w3d2", day: "Run 2 (e.g. Thu)", title: "Steady Z2 Pacer Cruise", pacerPace: "11.0 min/km", desc: "Set Watch Pacer to 11.0 min/km. Beta-oxidation running smoothly." },
      { id: "w3d3", day: "Run 3 (e.g. Sat)", title: "Endurance Pacer Run", pacerPace: "11.0 min/km", desc: "Set Watch Pacer to 11.0 min/km. A major bioenergetic milestone!" }
    ]
  },
  { 
    week: 4, 
    focus: "Week 4 — Recovery & Cellular Consolidation (11.8 min/km)", 
    workouts: [
      { id: "w4d1", day: "Run 1 (e.g. Tue)", title: "Active Recovery Pacer", pacerPace: "11.8 min/km", desc: "Set Watch Pacer to an easy 11.8 min/km. Allows cells to consolidate mitochondria." },
      { id: "w4d2", day: "Run 2 (e.g. Thu)", title: "Light Form Pacer Run", pacerPace: "11.8 min/km", desc: "Set Watch Pacer to 11.8 min/km. Keep it light, bouncy, and effortless." },
      { id: "w4d3", day: "Run 3 (e.g. Sat)", title: "Halfway Checkpoint Pacer", pacerPace: "11.2 min/km", desc: "Set Watch Pacer to 11.2 min/km. Halfway mark of your Zone 2 journey!" }
    ]
  },
  { 
    week: 5, 
    focus: "Week 5 — Pace Efficiency Shift (10.8 min/km)", 
    workouts: [
      { id: "w5d1", day: "Run 1 (e.g. Tue)", title: "Zone 2 Base Pacer", pacerPace: "10.8 min/km", desc: "Set Watch Pacer to 10.8 min/km. Oxygen delivery noticeably more efficient." },
      { id: "w5d2", day: "Run 2 (e.g. Thu)", title: "Steady Cruise Pacer", pacerPace: "10.8 min/km", desc: "Set Watch Pacer to 10.8 min/km. Watch wrist cues keep you in Z2." },
      { id: "w5d3", day: "Run 3 (e.g. Sat)", title: "Milestone Pacer Run", pacerPace: "10.8 min/km", desc: "Set Watch Pacer to 10.8 min/km. Continuous Z2 movement with zero stress." }
    ]
  },
  { 
    week: 6, 
    focus: "Week 6 — Peak Duration & Low Cardiac Drift (10.5 min/km)", 
    workouts: [
      { id: "w6d1", day: "Run 1 (e.g. Tue)", title: "Recovery Base Pacer", pacerPace: "11.2 min/km", desc: "Set Watch Pacer to 11.2 min/km. Rest two days after for muscle repair." },
      { id: "w6d2", day: "Run 2 (e.g. Thu)", title: "Rhythmic Flow Pacer", pacerPace: "10.5 min/km", desc: "Set Watch Pacer to 10.5 min/km. Smooth cadence, stable heart rate." },
      { id: "w6d3", day: "Run 3 (e.g. Sat)", title: "Peak Pacer Run", pacerPace: "10.5 min/km", desc: "Set Watch Pacer to 10.5 min/km. Logged at easy Zone 2 effort." }
    ]
  },
  { 
    week: 7, 
    focus: "Week 7 — Taper & Supercompensation (10.8 min/km)", 
    workouts: [
      { id: "w7d1", day: "Run 1 (e.g. Tue)", title: "Taper Easy Pacer", pacerPace: "11.0 min/km", desc: "Set Watch Pacer to 11.0 min/km. Glycogen stores topping off." },
      { id: "w7d2", day: "Run 2 (e.g. Thu)", title: "Tune-Up Pacer Run", pacerPace: "10.5 min/km", desc: "Set Watch Pacer to 10.5 min/km. Light, bouncy, and effortless stride." },
      { id: "w7d3", day: "Run 3 (e.g. Sat)", title: "Taper Long Pacer Run", pacerPace: "10.5 min/km", desc: "Set Watch Pacer to 10.5 min/km. Saving peak power for milestone week!" }
    ]
  },
  { 
    week: 8, 
    focus: "Week 8 — Peak Zone 2 Apple Watch Pacer Milestone (10.5 min/km)", 
    workouts: [
      { id: "w8d1", day: "Run 1 (e.g. Tue)", title: "Easy Shakeout Pacer", pacerPace: "11.5 min/km", desc: "Set Watch Pacer to 11.5 min/km shakeout jog." },
      { id: "w8d2", day: "Run 2 (e.g. Thu)", title: "Pre-Race Activation Pacer", pacerPace: "11.0 min/km", desc: "Set Watch Pacer to 11.0 min/km. Hydrate and rest well!" },
      { id: "w8d3", day: "Run 3 (e.g. Sat)", title: "🏆 PEAK APPLE WATCH PACER CHAMPION RUN!", pacerPace: "10.5 min/km", desc: "CONGRATULATIONS! Set Watch Pacer to 10.5 min/km for your official Zone 2 finish!" }
    ]
  }
];

export default function TenKTracker() {
  const [activeTab, setActiveTab] = useState('plan');
  
  // LocalStorage State
  const [completedWorkouts, setCompletedWorkouts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('optimus_10k_completed')) || [];
    } catch {
      return [];
    }
  });

  const [runLogs, setRunLogs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('optimus_10k_logs')) || [];
    } catch {
      return [];
    }
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logForm, setLogForm] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'Apple Watch Pacer Z2',
    dist: '',
    duration: '',
    rpe: 3,
    feeling: 'Apple Watch Pacer Matched',
    notes: ''
  });

  const [expandedWeeks, setExpandedWeeks] = useState({ 1: true });

  useEffect(() => {
    localStorage.setItem('optimus_10k_completed', JSON.stringify(completedWorkouts));
  }, [completedWorkouts]);

  useEffect(() => {
    localStorage.setItem('optimus_10k_logs', JSON.stringify(runLogs));
  }, [runLogs]);

  // Dynamic Pace Calculations
  const z2Logs = runLogs.filter(l => l.dist > 0 && l.duration);
  let currentZ2Pace = 11.5;

  if (z2Logs.length > 0) {
    const totalPaceSec = z2Logs.reduce((acc, log) => {
      const sec = parseDurationToSeconds(log.duration);
      return acc + (sec / log.dist);
    }, 0);
    const avgSecPerKm = totalPaceSec / z2Logs.length;
    currentZ2Pace = Math.max(6.0, Math.min(16.0, avgSecPerKm / 60.0));
  }

  const totalKm = runLogs.reduce((sum, l) => sum + (parseFloat(l.dist) || 0), 0);
  const completedCount = completedWorkouts.length;
  const planPercent = Math.round((completedCount / 24) * 100);

  const toggleWeek = (wNum) => {
    setExpandedWeeks(prev => ({ ...prev, [wNum]: !prev[wNum] }));
  };

  const toggleWorkoutCheckbox = (wId, type, title, pacerPace) => {
    if (completedWorkouts.includes(wId)) {
      setCompletedWorkouts(prev => prev.filter(id => id !== wId));
      setRunLogs(prev => prev.filter(l => l.workoutId !== wId));
    } else {
      setCompletedWorkouts(prev => [...prev, wId]);
      const autoLog = {
        id: 'log_' + Date.now(),
        workoutId: wId,
        date: new Date().toISOString().split('T')[0],
        type: type,
        dist: 3.0,
        duration: "34:30",
        pace: pacerPace,
        rpe: 3,
        feeling: 'Apple Watch Pacer Matched',
        notes: `Completed ${title} (Apple Watch Pacer set to ${pacerPace}).`
      };
      setRunLogs(prev => [autoLog, ...prev]);
    }
  };

  const handleSaveRunLog = (e) => {
    e.preventDefault();
    const distNum = parseFloat(logForm.dist);
    if (!distNum || distNum <= 0) return;

    const seconds = parseDurationToSeconds(logForm.duration);
    const paceSec = distNum > 0 ? (seconds / distNum) : 0;

    const newLog = {
      id: 'log_' + Date.now(),
      date: logForm.date,
      type: logForm.type,
      dist: distNum,
      duration: logForm.duration,
      pace: formatPaceDuration(paceSec),
      rpe: logForm.rpe,
      feeling: logForm.feeling,
      notes: logForm.notes
    };

    setRunLogs(prev => [newLog, ...prev]);
    setIsModalOpen(false);
    setLogForm({
      date: new Date().toISOString().split('T')[0],
      type: 'Apple Watch Pacer Z2',
      dist: '',
      duration: '',
      rpe: 3,
      feeling: 'Apple Watch Pacer Matched',
      notes: ''
    });
  };

  const deleteLog = (logId) => {
    const targetLog = runLogs.find(l => l.id === logId);
    if (targetLog && targetLog.workoutId) {
      setCompletedWorkouts(prev => prev.filter(wId => wId !== targetLog.workoutId));
    }
    setRunLogs(prev => prev.filter(l => l.id !== logId));
  };

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-stone-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-10 -translate-y-10">
          <Smartphone className="w-96 h-96 text-emerald-400" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            Page 22 • Pure Apple Watch Target Pace
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Apple Watch Target Paces
          </h2>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Zero distances, zero time limits! Each card gives you <strong>ONLY the Target Pace</strong> to set on your Apple Watch Pacer before you run.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <span className="text-xs text-stone-300 block">Watch Mode</span>
              <strong className="text-2xl font-black text-amber-300">Apple Pacer</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <span className="text-xs text-stone-300 block">Current Z2 Pace</span>
              <strong className="text-2xl font-black text-emerald-300">{currentZ2Pace.toFixed(1)} min/km</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <span className="text-xs text-stone-300 block">Plan Progress</span>
              <strong className="text-2xl font-black text-emerald-400">{planPercent}%</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <span className="text-xs text-stone-300 block">Total Distance Logged</span>
              <strong className="text-2xl font-black text-white">{totalKm.toFixed(1)} km</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-stone-200 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('plan')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition ${
            activeTab === 'plan'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Target Pace Schedule</span>
        </button>

        <button
          onClick={() => setActiveTab('watch')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition ${
            activeTab === 'watch'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Pacer Setup Instructions</span>
        </button>

        <button
          onClick={() => setActiveTab('log')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition ${
            activeTab === 'log'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Journal & Logs ({runLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wise')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition ${
            activeTab === 'wise'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Zone 2 Science Rules</span>
        </button>
      </div>

      {/* TAB 1: TARGET PACE SCHEDULE (NO DISTANCES) */}
      {activeTab === 'plan' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-emerald-950">
            <div>
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-700" />
                Pure Apple Watch Target Pace Schedule
              </h3>
              <p className="text-xs text-emerald-800">Set your Apple Watch Pacer to the exact target pace below before running!</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-full sm:w-48 bg-emerald-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-emerald-700 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${planPercent}%` }}
                ></div>
              </div>
              <span className="font-extrabold text-emerald-900 text-sm">{planPercent}% Completed</span>
            </div>
          </div>

          <div className="space-y-4">
            {APPLE_WATCH_PACER_PROGRAM.map((w) => {
              const isOpen = expandedWeeks[w.week];
              const isWeekComplete = w.workouts.every(wo => completedWorkouts.includes(wo.id));

              return (
                <div key={w.week} className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-xs">
                  <div 
                    onClick={() => toggleWeek(w.week)}
                    className="p-4 bg-stone-50 hover:bg-stone-100 cursor-pointer flex items-center justify-between transition border-b border-stone-100"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 font-extrabold text-xs">
                        Week {w.week}
                      </span>
                      <h4 className="font-bold text-stone-900 text-sm sm:text-base">{w.focus}</h4>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-stone-600">
                      {isWeekComplete ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Done
                        </span>
                      ) : (
                        isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-stone-50/50">
                      {w.workouts.map(wo => {
                        const isChecked = completedWorkouts.includes(wo.id);

                        return (
                          <div 
                            key={wo.id}
                            className={`p-4 rounded-xl border transition ${
                              isChecked 
                                ? 'bg-emerald-50/80 border-emerald-300' 
                                : 'bg-white border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                                {wo.day}
                              </span>
                              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-extrabold">
                                Zone 2 Flow
                              </span>
                            </div>

                            <div className="font-extrabold text-stone-900 text-base mb-1">
                              {wo.title}
                            </div>

                            {/* Clean Single Apple Watch Pacer Box (NO DISTANCE NUMBERS) */}
                            <div className="my-3 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-0.5 shadow-2xs">
                              <span className="text-[10px] font-extrabold uppercase text-emerald-800 tracking-wider block">Set Watch Pacer Pace:</span>
                              <strong className="text-xl text-emerald-950 font-black block">
                                {wo.pacerPace}
                              </strong>
                            </div>

                            <p className="text-xs text-stone-600 mb-4 leading-relaxed">{wo.desc}</p>

                            <button
                              onClick={() => toggleWorkoutCheckbox(wo.id, "Apple Watch Pacer Z2", wo.title, wo.pacerPace)}
                              className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition ${
                                isChecked
                                  ? 'bg-emerald-700 text-white'
                                  : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300'
                              }`}
                            >
                              {isChecked ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 text-white" />
                                  <span>Completed!</span>
                                </>
                              ) : (
                                <>
                                  <Circle className="w-4 h-4 text-stone-400" />
                                  <span>Mark Completed</span>
                                </>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PACER INSTRUCTIONS */}
      {activeTab === 'watch' && (
        <div className="space-y-6">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 space-y-4">
            <h3 className="font-extrabold text-stone-900 text-lg flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-700" />
              How to Program Apple Watch Pacer Mode Before Each Run
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-900 font-extrabold flex items-center justify-center text-xs">1</div>
                <h4 className="font-bold text-stone-900 text-sm">Launch Pacer</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Open <strong>Workout app</strong> on Apple Watch → Scroll to <strong>Outdoor Run</strong> → Tap <strong>`...` (three dots)</strong> → Tap <strong>Pacer</strong>.
                </p>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-900 font-extrabold flex items-center justify-center text-xs">2</div>
                <h4 className="font-bold text-stone-900 text-sm">Input Target Pace</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Set <strong>Target Pace</strong> from today's workout card (e.g. <strong>11.5 min/km</strong>). Tap <strong>Done</strong>!
                </p>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-900 font-extrabold flex items-center justify-center text-xs">3</div>
                <h4 className="font-bold text-stone-900 text-sm">Listen to Wrist Taps</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Your Apple Watch will show your live <strong>Ahead / Behind meter</strong>. If it vibrates saying <em>"Ahead"</em>, slow down to stay in Zone 2!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: JOURNAL */}
      {activeTab === 'log' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-stone-900 text-lg">Apple Watch Pacer Run Journal</h3>
              <p className="text-xs text-stone-600">Every run you log dynamically updates your Zone 2 pace progression.</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              <span>Log Pacer Run</span>
            </button>
          </div>

          <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
            {runLogs.length === 0 ? (
              <div className="p-8 text-center text-stone-500 text-xs sm:text-sm space-y-2">
                <Info className="w-8 h-8 mx-auto text-stone-400 mb-2" />
                <p>No Apple Watch Pacer runs logged yet in Optimus Magazine.</p>
                <p className="text-stone-400">Click "Log Pacer Run" above after finishing your run!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-stone-100 text-stone-600 font-bold border-b border-stone-200">
                      <th className="p-3">Date</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Distance Ran</th>
                      <th className="p-3">Pacer Pace</th>
                      <th className="p-3">Effort RPE</th>
                      <th className="p-3">Notes</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {runLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-stone-50/80 transition">
                        <td className="p-3 font-semibold text-stone-900">{log.date}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[11px] font-bold">
                            {log.type}
                          </span>
                        </td>
                        <td className="p-3 text-stone-700 font-bold">{log.dist} km</td>
                        <td className="p-3 font-bold text-amber-900 bg-amber-50 rounded-md px-2 py-1 inline-block my-1">{log.pace} min/km</td>
                        <td className="p-3">
                          <span className="font-bold text-emerald-800">{log.rpe} / 10 (Z2)</span>
                        </td>
                        <td className="p-3 text-stone-600 max-w-xs truncate">{log.notes || log.feeling || '—'}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => deleteLog(log.id)}
                            className="p-1 text-red-500 hover:text-red-700 transition"
                            title="Delete log"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: ZONE 2 SCIENCE RULES */}
      {activeTab === 'wise' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm">
              <Smartphone className="w-4 h-4" />
              <span>Apple Watch Pacer & Zone 2 Harmony</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Setting your Watch Pacer to your target Zone 2 pace ensures you never accidentally run too fast. If your watch shows you are "Ahead", slow down and let your heart rate drop.
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm">
              <Heart className="w-4 h-4" />
              <span>The Conversational Breathing Rule</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              If breathing gets heavy or you can't speak full sentences, you've slipped out of Zone 2 into Zone 3. Slow down or walk for 60 seconds to pull blood lactate back down below 2.0 mmol/L.
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-2 sm:col-span-2">
            <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Rest Two Days After Long Runs</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Mitochondrial biogenesis and muscle repair peak during rest days. Rest 2 days after long runs to maximize cellular adaptation and stay 100% injury-free!
            </p>
          </div>
        </div>
      )}

      {/* LOG SESSION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-stone-200 space-y-4">
            <h3 className="font-extrabold text-stone-900 text-lg">Log Apple Watch Pacer Session</h3>
            
            <form onSubmit={handleSaveRunLog} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={logForm.date}
                    onChange={(e) => setLogForm({ ...logForm, date: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Type</label>
                  <select
                    value={logForm.type}
                    onChange={(e) => setLogForm({ ...logForm, type: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  >
                    <option value="Apple Watch Pacer Z2">Apple Watch Pacer Z2</option>
                    <option value="10K Milestone">10K Milestone Run</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Distance Ran (km)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    placeholder="e.g. 3.0"
                    value={logForm.dist}
                    onChange={(e) => setLogForm({ ...logForm, dist: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Time Ran (MM:SS)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 34:30"
                    value={logForm.duration}
                    onChange={(e) => setLogForm({ ...logForm, duration: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Effort RPE (Zone 2 = RPE 3-4): {logForm.rpe}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={logForm.rpe}
                  onChange={(e) => setLogForm({ ...logForm, rpe: parseInt(e.target.value, 10) })}
                  className="w-full accent-emerald-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Notes / Watch Feedback</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Watch Pacer set to 11.5 min/km. Felt smooth."
                  value={logForm.notes}
                  onChange={(e) => setLogForm({ ...logForm, notes: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs"
                >
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </article>
  );
}

// Helpers
function parseDurationToSeconds(str) {
  if (!str) return 0;
  const parts = str.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}

function formatPaceDuration(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
