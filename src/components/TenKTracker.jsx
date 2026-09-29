import React, { useState, useEffect } from 'react';
import { 
  Trophy, Calendar, CheckCircle2, Circle, Activity, 
  Flame, Plus, Trash2, Heart, ShieldCheck, ChevronDown, ChevronUp, 
  Sparkles, TrendingUp, Smartphone, 
  Award, Clock, Droplet, AlertTriangle, Fish
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
    focus: "Week 2 — PGC-1α Surge & Landmark 7.59 km Run (11:37 min/km)", 
    workouts: [
      { id: "w2d1", day: "Run 1 (e.g. Tue)", title: "Zone 2 Base Pacer (5.0 km)", pacerPace: "11.3 min/km", desc: "Set Watch Pacer to 11.3 min/km. Soft stride under hips, peak fat oxidation." },
      { id: "w2d2", day: "Run 2 (e.g. Thu)", title: "Steady Z2 Pacer Cruise (5.5 km)", pacerPace: "11.3 min/km", desc: "Set Watch Pacer to 11.3 min/km. Feel how light conversational breathing stays." },
      { id: "w2d3", day: "Run 3 (e.g. Sat)", title: "🏆 Landmark Run: 7.59 km Completed!", pacerPace: "11:37 min/km", desc: "7.59 km in 1:28:09 at 114 BPM average HR! 76% of full 10K goal accomplished." }
    ]
  },
  { 
    week: 3, 
    focus: "Week 3 — Recovery & Cellular Consolidation Deload (11.5–11.8 min/km)", 
    workouts: [
      { id: "w3d1", day: "Run 1 (e.g. Tue)", title: "Active Recovery Pacer (4.5 km)", pacerPace: "11.8 min/km", desc: "Deload run! Allows cells to consolidate daughter mitochondria and VEGF capillaries." },
      { id: "w3d2", day: "Run 2 (e.g. Thu)", title: "Light Form Pacer Run (5.0 km)", pacerPace: "11.8 min/km", desc: "Keep it light, bouncy, and effortless. Zero joint pounding." },
      { id: "w3d3", day: "Run 3 (e.g. Sat)", title: "Consolidation Checkpoint (5.5–6.0 km)", pacerPace: "11.5 min/km", desc: "Consolidate your base before stepping to next progression." }
    ]
  },
  { 
    week: 4, 
    focus: "Week 4 — Base Re-Expansion (6.5–7.5 km • 11.2 min/km)", 
    workouts: [
      { id: "w4d1", day: "Run 1 (e.g. Tue)", title: "Rhythmic Base Flow (5.5 km)", pacerPace: "11.2 min/km", desc: "Fresh mitochondria fully operational; smooth and effortless glide." },
      { id: "w4d2", day: "Run 2 (e.g. Thu)", title: "Aerobic Cruise Run (6.0 km)", pacerPace: "11.2 min/km", desc: "Building consistent time-on-feet without fatigue." },
      { id: "w4d3", day: "Run 3 (e.g. Sat)", title: "Base Endurance Run (7.0–7.5 km)", pacerPace: "11.0 min/km", desc: "Re-confirming 7+ km with lower heart rate and zero strain." }
    ]
  },
  { 
    week: 5, 
    focus: "Week 5 — Reticular Expansion & Pace Shift (8.2–8.5 km • 10.8 min/km)", 
    workouts: [
      { id: "w5d1", day: "Run 1 (e.g. Tue)", title: "Zone 2 Base Pacer (5.5 km)", pacerPace: "10.8 min/km", desc: "Oxygen delivery noticeably more efficient after Week 4 consolidation." },
      { id: "w5d2", day: "Run 2 (e.g. Thu)", title: "Steady Cruise Pacer (6.0 km)", pacerPace: "10.8 min/km", desc: "Watch wrist cues keep you strictly between 101–120 BPM." },
      { id: "w5d3", day: "Run 3 (e.g. Sat)", title: "Milestone Pacer Run (8.2–8.5 km)", pacerPace: "10.8 min/km", desc: "Continuous Z2 movement with zero stress; stepping stone to 9 km!" }
    ]
  },
  { 
    week: 6, 
    focus: "Week 6 — Peak Duration & Low Cardiac Drift (9.0–9.5 km • 10.5 min/km)", 
    workouts: [
      { id: "w6d1", day: "Run 1 (e.g. Tue)", title: "Recovery Base Pacer (5.5 km)", pacerPace: "11.0 min/km", desc: "Easy mid-week base run. Rest two days after for muscle repair." },
      { id: "w6d2", day: "Run 2 (e.g. Thu)", title: "Rhythmic Flow Pacer (6.5 km)", pacerPace: "10.5 min/km", desc: "Practicing mid-run electrolyte sipping every 20 minutes." },
      { id: "w6d3", day: "Run 3 (e.g. Sat)", title: "Peak Long Run (9.0–9.5 km)", pacerPace: "10.5 min/km", desc: "The longest test run before the taper. Within touching distance of 10K!" }
    ]
  },
  { 
    week: 7, 
    focus: "Week 7 — Taper & Glycogen Supercompensation (5.0 km • 10.8 min/km)", 
    workouts: [
      { id: "w7d1", day: "Run 1 (e.g. Tue)", title: "Taper Easy Pacer (4.0 km)", pacerPace: "11.0 min/km", desc: "Short, relaxed stride. Glycogen stores topping off in liver and muscle." },
      { id: "w7d2", day: "Run 2 (e.g. Thu)", title: "Tune-Up Pacer Run (5.0 km)", pacerPace: "10.5 min/km", desc: "Light, bouncy, and effortless stride. Saving peak energy for next week." },
      { id: "w7d3", day: "Run 3 (e.g. Sat)", title: "Easy Shakeout Pacer (4.5 km)", pacerPace: "10.8 min/km", desc: "Relaxed confidence. Full hydration and deep recovery." }
    ]
  },
  { 
    week: 8, 
    focus: "Week 8 — 🏆 The Official 10.0 km Zone 2 Champion Finish! (10.5 min/km)", 
    workouts: [
      { id: "w8d1", day: "Run 1 (e.g. Tue)", title: "Easy Shakeout Pacer (3.5 km)", pacerPace: "11.5 min/km", desc: "Gentle shakeout jog. Legs feel fresh and full of bounce." },
      { id: "w8d2", day: "Run 2 (e.g. Thu)", title: "Pre-Milestone Activation (4.0 km)", pacerPace: "11.0 min/km", desc: "Hydrate, eat clean, and rest two full days before the champion run." },
      { id: "w8d3", day: "Run 3 (e.g. Sat)", title: "🏆 OFFICIAL 10.0 KM CHAMPION FINISH!", pacerPace: "10.5 min/km", desc: "CONGRATULATIONS! 10.0 km completed in pure Zone 2 metabolic equilibrium!" }
    ]
  }
];

export default function TenKTracker() {
  const [activeTab, setActiveTab] = useState('blueprint'); // 'blueprint' | 'plan' | 'watch' | 'log' | 'wise'
  
  // LocalStorage State
  const [completedWorkouts, setCompletedWorkouts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('optimus_10k_completed')) || ['w1d1', 'w1d2', 'w1d3', 'w2d1', 'w2d2', 'w2d3'];
    } catch {
      return ['w1d1', 'w1d2', 'w1d3', 'w2d1', 'w2d2', 'w2d3'];
    }
  });

  const [runLogs, setRunLogs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('optimus_10k_logs')) || [
        {
          id: 'log_record',
          date: '2026-09-28',
          type: '10K Milestone',
          dist: 7.59,
          duration: '1:28:09',
          pace: '11:37',
          rpe: 3,
          feeling: 'Pure Zone 2 Metabolic Flow',
          notes: 'New All-Time Record! 7.59 km at 114 BPM Avg HR. 11,936 steps. Zero leg burn!'
        }
      ];
    } catch {
      return [];
    }
  });

  // Finish Calculator State
  const [calcPace, setCalcPace] = useState(11.0); // min/km
  const [selectedPathwayWeek, setSelectedPathwayWeek] = useState(2);

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

  const [expandedWeeks, setExpandedWeeks] = useState({ 2: true, 3: true });

  useEffect(() => {
    localStorage.setItem('optimus_10k_completed', JSON.stringify(completedWorkouts));
  }, [completedWorkouts]);

  useEffect(() => {
    localStorage.setItem('optimus_10k_logs', JSON.stringify(runLogs));
  }, [runLogs]);

  // Dynamic Pace Calculations
  const z2Logs = runLogs.filter(l => l.dist > 0 && l.duration);
  let currentZ2Pace = 11.4;

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
  const planPercent = Math.min(100, Math.round((completedCount / 24) * 100));

  const toggleWeek = (wNum) => {
    setExpandedWeeks(prev => ({ ...prev, [wNum]: !prev[wNum] }));
  };

  const toggleWorkoutCheckbox = (wId) => {
    if (completedWorkouts.includes(wId)) {
      setCompletedWorkouts(prev => prev.filter(id => id !== wId));
    } else {
      setCompletedWorkouts(prev => [...prev, wId]);
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
    setRunLogs(prev => prev.filter(l => l.id !== logId));
  };

  // Calculator outputs for 10K finish
  const totalCalcMinutes = Math.round(calcPace * 10);
  const finishHours = Math.floor(totalCalcMinutes / 60);
  const finishMins = totalCalcMinutes % 60;
  const finishTimeStr = `${finishHours}h ${finishMins < 10 ? '0' : ''}${finishMins}m`;
  const estimatedHeartbeats = Math.round(totalCalcMinutes * 114);
  const estimatedFatGrams = Math.round(totalCalcMinutes * 0.62);
  const estimatedHydrationMl = Math.round(totalCalcMinutes * 8.5);

  const PATHWAY_STEPS = [
    {
      week: 2,
      title: 'Week 2: The 7.59 km Landmark Run',
      badge: 'CURRENT STATUS • 76% ACCOMPLISHED',
      badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
      dist: '7.59 km',
      pace: '11:37 min/km',
      duration: '1:28:09',
      hr: '114 BPM',
      focus: 'Aerobic Efficiency & Peak PGC-1α Surge',
      details: 'Proof of concept! Running 88 continuous minutes at 114 BPM proved your slow-twitch muscle fibers are in complete metabolic equilibrium, burning pure fat without cellular acidosis.',
      rules: 'Take two full recovery days (48 hours) to let newly split daughter mitochondria mature.'
    },
    {
      week: 3,
      title: 'Week 3: The Consolidation Trap & Deload',
      badge: 'CRITICAL CONSOLIDATION DELOAD',
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300',
      dist: '5.0 – 6.0 km',
      pace: '11.5 – 11.8 min/km',
      duration: '~55 – 65 min',
      hr: '105 – 112 BPM',
      focus: 'Cellular Consolidation & Capillary Solidification',
      details: 'Resist the urge to push for 8.5 km immediately! Week 3 allows your muscles to synthesize cristae folding proteins, mature micro-capillaries (VEGF), and protect tendons from micro-tears.',
      rules: 'Dial distance back by ~25%. Keep pace relaxed and bouncy. Two rest days between runs.'
    },
    {
      week: 4,
      title: 'Week 4: Base Re-Expansion (6.5–7.5 km)',
      badge: 'AEROBIC RE-EXPANSION',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      dist: '6.5 – 7.5 km',
      pace: '11.0 – 11.2 min/km',
      duration: '~72 – 82 min',
      hr: '108 – 114 BPM',
      focus: 'Testing Newly Minted Mitochondria',
      details: 'Following the Week 3 deload, your newly mature daughter mitochondria are online! Re-running the 7+ km range feels noticeably easier on your legs and breathing.',
      rules: 'Maintain smooth heel-to-toe stride cadence. Take 2 rest days between sessions.'
    },
    {
      week: 5,
      title: 'Week 5: Reticular Expansion to 8.5 km',
      badge: 'STEPPING STONE',
      badgeColor: 'bg-blue-100 text-blue-950 border-blue-300',
      dist: '8.2 – 8.5 km',
      pace: '10.8 – 11.0 min/km',
      duration: '~90 – 95 min',
      hr: '108 – 115 BPM',
      focus: 'Expanding the Mitochondrial Grid',
      details: 'Following the solid foundation of Weeks 2–4, your muscle fibers feel refreshed with expanded capillary density. Stepping to 8.5 km feels noticeably easier on your lungs and legs.',
      rules: 'Carry a handheld water bottle with electrolytes. Sip lightly every 20 minutes.'
    },
    {
      week: 6,
      title: 'Week 6: The Peak Long Run (9.0–9.5 km)',
      badge: 'PEAK DISTANCE TEST',
      badgeColor: 'bg-purple-100 text-purple-950 border-purple-300',
      dist: '9.0 – 9.5 km',
      pace: '10.5 – 10.8 min/km',
      duration: '~98 – 105 min',
      hr: '110 – 117 BPM',
      focus: 'Cardiac Drift Mastery & Hydration Rhythm',
      details: 'The final, longest rehearsal run before the 10K! Tests your time-on-feet endurance. You are now within touching distance of the full 10-kilometer finish line.',
      rules: 'Strict adherence to the 120 BPM ceiling. If HR touches 122 BPM, walk 60 seconds.'
    },
    {
      week: 7,
      title: 'Week 7: Taper & Supercompensation',
      badge: 'GLYCOGEN SUPERCOMPENSATION',
      badgeColor: 'bg-teal-100 text-teal-950 border-teal-300',
      dist: '4.5 – 5.0 km',
      pace: '10.8 – 11.0 min/km',
      duration: '~48 – 55 min',
      hr: '105 – 112 BPM',
      focus: 'Tapering Volume to Maximize Muscle Glycogen',
      details: 'Cutting volume in half allows muscle enzyme concentrations, glycogen stores, and connective tissues to reach peak supercompensation for the big day.',
      rules: 'Keep runs light, springy, and short. Sleep 8+ hours per night and prioritize hydration.'
    },
    {
      week: 8,
      title: 'Week 8: 🏆 The Official 10.0 km Champion Run!',
      badge: 'MILESTONE FINISH LINE',
      badgeColor: 'bg-emerald-600 text-white border-emerald-700 font-black',
      dist: '10.00 km',
      pace: '10.5 – 11.0 min/km',
      duration: '~1:45:00 – 1:50:00',
      hr: '112 – 118 BPM',
      focus: 'The 10K Longevity Champion Finish',
      details: 'The culmination of 8 weeks of pure Zone 2 bioenergetic discipline! A complete 10K completed at 79 years old in continuous metabolic equilibrium.',
      rules: 'Pave the run with steady rhythm, celebrate every kilometer, and earn your official Runner\'s License!'
    }
  ];

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-emerald-500/40">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-10 -translate-y-10">
          <Trophy className="w-96 h-96 text-emerald-400" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5 text-emerald-400" />
              Article 8 • Official 10K Blueprint & Protocol
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Week 2 Landmark: 7.59 km Completed (76%)
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            8-Week Zone 2 10K Training & Nutrition Plan:{' '}
            <span className="text-emerald-400">From 7.59 km to the 10K Goal</span>
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Proof that steady-state aerobic running in the <strong>101–120 BPM FATmax corridor</strong> rebuilds cellular powerhouses and enables master runners to complete a 10K safely, cleanly, and without joint injury.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-xs text-stone-300 block">Current Milestone</span>
              <strong className="text-xl sm:text-2xl font-black text-amber-300">7.59 km (76%)</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-xs text-stone-300 block">Current Z2 Pace</span>
              <strong className="text-xl sm:text-2xl font-black text-emerald-300">{currentZ2Pace.toFixed(1)} min/km</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-xs text-stone-300 block">Target Finish HR</span>
              <strong className="text-xl sm:text-2xl font-black text-white">114 BPM</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-xs text-stone-300 block">Total Distance</span>
              <strong className="text-xl sm:text-2xl font-black text-emerald-400">{totalKm.toFixed(1)} km</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-stone-200 gap-2 overflow-x-auto pb-1 no-print">
        <button
          onClick={() => setActiveTab('blueprint')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-2xs shrink-0 ${
            activeTab === 'blueprint'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Trophy className="w-4 h-4 text-emerald-300" />
          <span>🏆 Week 2 to 10K Blueprint & Nutrition</span>
        </button>

        <button
          onClick={() => setActiveTab('plan')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-2xs shrink-0 ${
            activeTab === 'plan'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Calendar className="w-4 h-4 text-emerald-300" />
          <span>📅 8-Week Target Pace Schedule</span>
        </button>

        <button
          onClick={() => setActiveTab('watch')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-2xs shrink-0 ${
            activeTab === 'watch'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Smartphone className="w-4 h-4 text-emerald-300" />
          <span>⌚ Apple Watch Pacer Setup</span>
        </button>

        <button
          onClick={() => setActiveTab('log')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-2xs shrink-0 ${
            activeTab === 'log'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-300" />
          <span>📓 Journal & Logs ({runLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wise')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-2xs shrink-0 ${
            activeTab === 'wise'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Flame className="w-4 h-4 text-emerald-300" />
          <span>🔬 Zone 2 Science Rules</span>
        </button>
      </div>

      {/* ================= TAB 1: WEEK 3 TO 10K BLUEPRINT & NUTRITION ================= */}
      {activeTab === 'blueprint' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Section 1: The Proof of Concept at 79 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs font-black uppercase tracking-wider">
              <Award className="w-4 h-4 text-emerald-600" />
              The Living Proof of Concept at 79
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
              Shattering the Age Limit: 7.59 km at 79 Years Old
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
              Conventional medicine often assumes that after age 65 or 70, running 10 kilometers is too stressful for joints or heart muscle. <strong>This plan proves otherwise.</strong>
            </p>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
              Yesterday, by anchoring strictly to the lab-tested <strong>101–120 BPM heart rate corridor</strong>, Ishai completed <strong>7.59 km in 1:28:09 (11,936 steps) with an average heart rate of only 114 BPM</strong>. Zero leg burn, zero breathless gasping, and zero joint inflammation. You are already at <strong>76% of your 10K goal</strong>!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-xs font-bold text-emerald-950">1. Clean Bioenergetics</span>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  Running at 114 BPM kept blood lactate at ~1.3 mM, allowing continuous fatty acid beta-oxidation through CPT-1 gates.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-xs font-bold text-emerald-950">2. Low Impact Cadence</span>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  Short, soft strides kept ground reaction forces at just 1.5–2x bodyweight, shielding mature knees and tendons.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-xs font-bold text-emerald-950">3. The 48-Hour Recovery Rhythm</span>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  Taking two recovery days between runs guarantees full mitochondrial organelle division and capillary growth.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Interactive Week-by-Week Pathway */}
          <div className="space-y-4">
            <div className="border-b border-stone-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-700" />
                  The 7-Week Pathway: From Week 2 to the 10K Finish
                </h3>
                <p className="text-xs text-stone-600 font-medium">
                  Click any week below to inspect the distance, pace targets, biological focus, and mandatory rest rules.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {PATHWAY_STEPS.map((step) => (
                <button
                  key={step.week}
                  onClick={() => setSelectedPathwayWeek(step.week)}
                  className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between gap-1.5 ${
                    selectedPathwayWeek === step.week
                      ? 'bg-emerald-900 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500/30'
                      : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-black opacity-80">Week {step.week}</span>
                    {step.week === 2 && (
                      <span className="text-[9px] bg-amber-400 text-amber-950 font-black px-1.5 py-0.2 rounded-full">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-extrabold truncate">{step.dist}</div>
                  <span className="text-[10px] opacity-75 truncate">{step.focus.split(' ')[0]} {step.focus.split(' ')[1]}</span>
                </button>
              ))}
            </div>

            {/* Focused Pathway Step Card */}
            {(() => {
              const cur = PATHWAY_STEPS.find(s => s.week === selectedPathwayWeek) || PATHWAY_STEPS[0];
              return (
                <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-emerald-300 shadow-sm space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
                    <div>
                      <span className={`text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full border ${cur.badgeColor}`}>
                        {cur.badge}
                      </span>
                      <h4 className="text-2xl font-black text-stone-900 mt-1">
                        {cur.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <div>Distance: <strong className="text-emerald-800 text-sm">{cur.dist}</strong></div>
                      <div>Pacer: <strong className="text-stone-800 text-sm">{cur.pace}</strong></div>
                      <div>Est. Time: <strong className="text-stone-800 text-sm">{cur.duration}</strong></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="font-extrabold text-sm text-stone-900 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-700" />
                        Biological Focus & Cellular Remodeling:
                      </div>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                        {cur.details}
                      </p>
                    </div>

                    <div className="space-y-3 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                      <div className="font-extrabold text-sm text-emerald-950 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        Senior Runner Rules & Execution:
                      </div>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                        {cur.rules}
                      </p>
                    </div>
                  </div>

                  {cur.week === 3 && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm space-y-1.5">
                      <div className="font-black flex items-center gap-2 text-amber-900">
                        <AlertTriangle className="w-4 h-4 text-amber-700" />
                        BEWARE THE "CONSOLIDATION TRAP"!
                      </div>
                      <p className="leading-relaxed">
                        After running a big milestone like 7.59 km in Week 2, it is tempting to jump to 8.5 km or 9.0 km immediately. <strong>Do not do this.</strong> Week 3 is specifically designed as a <em>cellular deload</em>. Your muscle fibers need lower distance (5.0–6.0 km) to finish assembling the newly created daughter mitochondria (via DRP1) and allow microscopic blood capillaries (VEGF) to mature. Trust the deload!
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Section 3: The 3 Non-Negotiable Longevity Rules */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              The 3 Non-Negotiable Rules for 65+ Runners
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-base">
                  1
                </div>
                <h4 className="text-base font-extrabold text-stone-900">
                  Two Recovery Days Between Runs
                </h4>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  Mitochondria and capillary blood vessels are <strong>synthesized during rest, not during runs</strong>. A 48-hour gap between training days prevents collagen micro-tears in senior knees and allows the PGC-1α genetic cascade to complete unhindered.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800 font-bold text-base">
                  2
                </div>
                <h4 className="text-base font-extrabold text-stone-900">
                  The 101–120 BPM Zero-Acidosis Ceiling
                </h4>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  Never chase pace over heart rate. If your Apple Watch vibrates that HR is crossing 122–125 BPM, <strong>walk for 60 seconds</strong> until HR drops below 110 BPM. Keeping blood lactate below 1.5 mM guarantees you never hit the wall.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-base">
                  3
                </div>
                <h4 className="text-base font-extrabold text-stone-900">
                  The Talk Test & Nose Breathing
                </h4>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  You should be able to speak complete sentences comfortably without gasping for air. If you cannot recite your address out loud smoothly, you are running too fast. Slow down and let fat oxidation resume.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Complete 10K Nutrition & Hydration Strategy */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase border border-emerald-200">
                Endurance Fueling Protocols
              </span>
              <h3 className="text-2xl font-black text-stone-900 mt-1">
                Complete Nutrition & Hydration Strategy for the 10K Distance
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-medium">
                As your runs expand from 88 minutes toward 105–110 minutes, targeted fueling keeps blood volume high and protects PGC-1α synthesis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Pre-Run & Mid-Run */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-stone-900">
                    <Clock className="w-4 h-4 text-emerald-700" />
                    1. Pre-Run (60–90 Minutes Before)
                  </div>
                  <ul className="space-y-1.5 text-xs text-stone-700 list-disc list-inside">
                    <li><strong>Hydration:</strong> Drink 400–500 ml of water with a pinch of electrolytes (sodium + potassium).</li>
                    <li><strong>The Medjool Date Hack:</strong> 1 or 2 Medjool dates (תמר מג'הול) paired with <strong>1 to 2 whole walnuts (1 walnut half inside each date)</strong> or 1 tsp raw tahini! The healthy fats blunt insulin so CPT-1 fat gates stay wide open while delivering steady natural energy without stomach heaviness.</li>
                    <li><strong>Rule:</strong> Avoid processed sugars or high glycemic snacks that spike insulin. Insulin halts fatty acid beta-oxidation!</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-stone-900">
                    <Droplet className="w-4 h-4 text-blue-700" />
                    2. Mid-Run Hydration & Fuel (During 88–110 Minutes)
                  </div>
                  <ul className="space-y-1.5 text-xs text-stone-700 list-disc list-inside">
                    <li><strong>Fighting Cardiac Drift:</strong> Beyond 70 minutes, sweating causes blood plasma loss, pushing heart rate up 5–8 BPM even when you are not tired.</li>
                    <li><strong>Hydration Protocol:</strong> Carry a handheld soft flask with light electrolyte water. Take <strong>2–3 small sips every 20 minutes</strong>.</li>
                    <li><strong>Mid-Run Date Option:</strong> On runs exceeding 80–90 minutes, 1 pitted date chewed slowly at minute 50–60 provides natural potassium and glucose without stomach upset—far superior to chemical gels!</li>
                  </ul>
                </div>
              </div>

              {/* Post-Run & Rest Days */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-emerald-950">
                    <Flame className="w-4 h-4 text-emerald-700" />
                    3. Post-Run Reconstruction Window (Within 45–60 min)
                  </div>
                  <ul className="space-y-1.5 text-xs text-stone-800 list-disc list-inside">
                    <li><strong>Protein Building Blocks:</strong> Consume <strong>25–30 grams of high-quality protein</strong> (wild sardines, eggs, Greek yogurt, or wild salmon). <em>Sardine Buyer Rule: Choose whole sardines with skin & bones (for 380mg bioavailable bone calcium) packed in Extra Virgin Olive Oil or spring water—never cheap soybean or vegetable oil!</em></li>
                    <li><strong>Dates for Glycogen Restoration:</strong> 2 Medjool dates paired with your protein creates the optimal gentle insulin signal to shuttle amino acids straight into recovering mitochondria.</li>
                    <li><strong>Enzyme Translation:</strong> Supplies the building blocks needed by ribosomes to manufacture new respiratory complexes.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-stone-900">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    4. Two Rest Days Support (Organelle Maturation)
                  </div>
                  <ul className="space-y-1.5 text-xs text-stone-700 list-disc list-inside">
                    <li><strong>Daily Protein:</strong> Maintain <strong>1.2 to 1.5 grams of protein per kilogram</strong> of bodyweight across both rest days.</li>
                    <li><strong>Anti-Inflammatory Fats & SMASH Fish:</strong> Extra virgin olive oil, raw tahini, walnuts, and wild sardines/mackerel to supply EPA/DHA for flexible mitochondrial double membranes.</li>
                    <li><strong>Deep Sleep:</strong> Aim for 7.5 to 8.5 hours. Growth hormone released during deep sleep finalizes cristae folding!</li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Spotlight Banner: Medjool Dates - The Ultimate Natural Endurance Fuel */}
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300 text-stone-900 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-950 font-black text-sm">
                  <span className="text-xl">🌴</span>
                  <span>Spotlight: Why Medjool Dates (תמרים) Are The Ultimate 10K Superfood</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full">
                  167 mg Potassium / Date
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs leading-relaxed">
                <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1">
                  <strong className="text-amber-950 block">1. Natural 1:1 Dual Sugars</strong>
                  <p className="text-stone-700">Contains a balanced blend of natural glucose (fuels contracting muscles) and fructose (restores liver glycogen to feed your brain and heart).</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1">
                  <strong className="text-amber-950 block">2. Potassium & Magnesium</strong>
                  <p className="text-stone-700">Packed with natural potassium to power the sodium-potassium pump during 12,000+ footstrikes, preventing cramps and muscle twitches.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1">
                  <strong className="text-amber-950 block">3. The Walnut / Tahini Pairing</strong>
                  <p className="text-stone-700">Pairing each date with <strong>1 walnut half</strong> (or 1 whole walnut for 2 dates) slows gastric absorption, preventing insulin spikes so CPT-1 fat-burning gates stay wide open in Zone 2!</p>
                </div>
              </div>
            </div>

            {/* Spotlight Banner: Wild Sardines vs Tuna & The Buyer's Guide */}
            <div className="p-5 sm:p-6 rounded-2xl bg-cyan-950 text-white border border-cyan-500/40 space-y-4 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-800/60 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
                    <Fish className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-base sm:text-lg text-white">
                      Spotlight: Why Wild Sardines (סרדינים) Crush Tuna for 65+ Longevity
                    </h4>
                    <p className="text-xs text-cyan-200">
                      Trophic level bioenergetics: Zero mercury, 380mg bone calcium, and cardiolipin-repairing EPA/DHA.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 px-2.5 py-1 rounded-full">
                  Premier "SMASH" Fish
                </span>
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs leading-relaxed">
                <div className="p-3.5 bg-cyan-900/40 rounded-xl border border-cyan-700/50 space-y-1">
                  <strong className="text-cyan-200 block text-sm">1. Zero Mercury vs Apex Predator</strong>
                  <p className="text-cyan-100/90">
                    Tuna is an apex predator (Trophic Level 4.5) accumulating neurotoxic methylmercury that poisons Mitochondrial Complex IV. Sardines feed at Trophic Level 2 on plankton—virtually zero mercury!
                  </p>
                </div>
                <div className="p-3.5 bg-cyan-900/40 rounded-xl border border-cyan-700/50 space-y-1">
                  <strong className="text-cyan-200 block text-sm">2. Edible Bones for 15,000 Strikes</strong>
                  <p className="text-cyan-100/90">
                    Whole canned sardines contain soft, pressure-cooked bones delivering <strong>~380 mg of bioavailable calcium (35% RDA)</strong>, phosphorus, and marine collagen. Canned tuna filet provides 0 mg calcium.
                  </p>
                </div>
                <div className="p-3.5 bg-cyan-900/40 rounded-xl border border-cyan-700/50 space-y-1">
                  <strong className="text-cyan-200 block text-sm">3. Cardiolipin & Cellular CoQ10</strong>
                  <p className="text-cyan-100/90">
                    Packed with 1,800 mg EPA/DHA Omega-3s that reinforce the inner mitochondrial membrane (cardiolipin), paired with high natural CoQ10 to shuttle electrons across your respiratory chain.
                  </p>
                </div>
              </div>

              {/* Supermarket Buyer's Rules */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-cyan-500/30 space-y-2.5">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <span>🛒 Supermarket Buyer's Checklist (מדריך קנייה)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="space-y-1">
                    <span className="text-white font-semibold block">🫒 The Oil Rule (Most Critical):</span>
                    <p>Buy ONLY packed in <strong>Extra Virgin Olive Oil (שמן זית כתית מעולה)</strong> or <strong>Spring Water (מים)</strong>. NEVER buy in cheap soybean, sunflower, or vegetable oil (שמן סויה / שמן צמחי)—their oxidized Omega-6 destroys the anti-inflammatory benefits!</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-white font-semibold block">🐟 Whole Fish with Skin & Bones (שלמים):</span>
                    <p>Always buy whole sardines with skin & bones (שלמים, לא מפולטים). Never buy skinless/boneless, which strips away 90% of the bone calcium and collagen.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-white font-semibold block">🥫 Top Supermarket Brands:</span>
                    <p><strong>King Oscar</strong> (Norwegian tiny brisling sardines in EVOO), Portuguese/Spanish artisanal cans (<strong>Ortiz, Matiz, Bela</strong>), or quality supermarket brands (<strong>Starkist, Willi-Food</strong>—verify "in olive oil" on front label!).</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-white font-semibold block">🍋 2-Minute Post-Run Recipe:</span>
                    <p>Open can in EVOO, squeeze fresh lemon over the fish (Vitamin C boosts iron absorption), mash lightly with a fork, add parsley, and enjoy over sourdough or roasted sweet potato.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Interactive 10K Finish Time & Fuel Calculator */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-emerald-950 to-slate-900 text-white space-y-6 shadow-xl border border-emerald-500/40">
            <div className="border-b border-white/15 pb-4">
              <span className="text-[11px] font-mono font-bold text-emerald-300 uppercase">
                Interactive Telemetry Projection
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                Your 10K Finish Time & Metabolic Fuel Calculator
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Slide your target Apple Watch Zone 2 pace to calculate total duration, estimated heartbeats, and grams of pure fat burned.
              </p>
            </div>

            {/* Slider */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3">
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                <span>Target Apple Watch Pacer Pace:</span>
                <span className="text-emerald-400 font-mono font-black text-lg">{calcPace.toFixed(1)} min/km</span>
              </div>
              <input
                type="range"
                min="9.5"
                max="13.0"
                step="0.1"
                value={calcPace}
                onChange={(e) => setCalcPace(parseFloat(e.target.value))}
                className="w-full h-3 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
              />
              <div className="flex justify-between text-[11px] font-mono text-stone-400">
                <span>9.5 min/km (Fast Z2)</span>
                <span>11.0 min/km (Ishai Sweet Spot)</span>
                <span>13.0 min/km (Very Easy Jog)</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
                <span className="text-xs text-stone-300">Projected 10K Time</span>
                <div className="text-2xl font-black text-emerald-400">{finishTimeStr}</div>
                <span className="text-[10px] text-stone-400">Continuous Z2 flow</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
                <span className="text-xs text-stone-300">Estimated Heartbeats</span>
                <div className="text-2xl font-black text-white">{estimatedHeartbeats.toLocaleString()}</div>
                <span className="text-[10px] text-stone-400">At ~114 BPM Avg HR</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
                <span className="text-xs text-stone-300">Pure Fat Burned</span>
                <div className="text-2xl font-black text-amber-300">{estimatedFatGrams} g</div>
                <span className="text-[10px] text-stone-400">Clean beta-oxidation</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
                <span className="text-xs text-stone-300">Recommended Water</span>
                <div className="text-2xl font-black text-blue-300">{estimatedHydrationMl} ml</div>
                <span className="text-[10px] text-stone-400">With light electrolytes</span>
              </div>
            </div>
          </div>

          {/* Section 5: Knee Care & Joint Biomechanics Protocol */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full uppercase border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Biomechanical Joint Shield
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  Knee Care & 3D Joint Biomechanics Protocol
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-normal">
                  Understanding the internal kinematics of the knee joint during 10K running: muscles, ligaments, and cartilage in motion.
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-3 py-1.5 rounded-full">
                🔬 Kinematics & Longevity
              </span>
            </div>

            {/* 3D Kinematics Anatomy Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Pillar 1: Patella Pulley */}
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <span className="w-7 h-7 rounded-lg bg-amber-400/20 flex items-center justify-center text-base">🦴</span>
                  <span>1. Patellar Pulley Tracking</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  The patella (kneecap) acts as a mechanical lever, sliding up and down through the femoral trochlear groove. When you land with a <strong className="text-white">soft, slightly bent knee</strong>, the patella glides smoothly without excessive compressive grinding against the femur cartilage.
                </p>
                <div className="text-[11px] text-amber-200/90 font-mono bg-amber-950/40 p-2 rounded-lg border border-amber-500/20">
                  ⚡ Overstriding straight leg = 3–4x bodyweight braking compression.
                </div>
              </div>

              {/* Pillar 2: Menisci Cushions */}
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2.5">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                  <span className="w-7 h-7 rounded-lg bg-cyan-400/20 flex items-center justify-center text-base">🛡️</span>
                  <span>2. Menisci Roll & Glide</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  The knee is not a simple hinge: the femoral condyles <strong className="text-white">roll and slide backwards</strong> on the tibial meniscus pads. High-cushion footwear like your <strong className="text-cyan-300">Brooks Ghost (DNA LOFT foam)</strong> absorbs the initial ground shockwave, preserving natural cartilage thickness.
                </p>
                <div className="text-[11px] text-cyan-200/90 font-mono bg-cyan-950/40 p-2 rounded-lg border border-cyan-500/20">
                  👟 Segmented Crash Pad guides smooth heel-to-toe transition.
                </div>
              </div>

              {/* Pillar 3: Cruciate Ligaments */}
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <span className="w-7 h-7 rounded-lg bg-emerald-400/20 flex items-center justify-center text-base">🧬</span>
                  <span>3. Cruciate Alignment (ACL/PCL)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Deep within the capsule, the ACL and PCL cross like an "X" to stabilize anterior-posterior displacement. By <strong className="text-white">landing your feet directly underneath your hips</strong> (cadence ~140 SPM), ground forces remain purely vertical, eliminating damaging rotational twisting.
                </p>
                <div className="text-[11px] text-emerald-200/90 font-mono bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/20">
                  🎯 Zero shear stress when center of mass stays balanced.
                </div>
              </div>
            </div>

            {/* The 3 Golden Joint-Care Rules for 65+ Runners */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-800 to-indigo-950/70 border border-emerald-500/30 space-y-3">
              <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                The 3 Golden Knee-Protection Habits for Every Run
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-1">
                  <span className="font-bold text-emerald-300 block">1. The Cadence Rule (~140 SPM)</span>
                  <p className="text-slate-300">Take shorter, lighter "whisper" steps. Elevating cadence by 5–7 steps cuts peak impact forces on the knee joint by approximately 20%.</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-1">
                  <span className="font-bold text-cyan-300 block">2. Post-Run Magnesium Glycinate</span>
                  <p className="text-slate-300">Taking 200 mg Magnesium Glycinate post-run flushes out cellular calcium, fully releasing quadriceps and hamstring tension on the patellar tendon.</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-1">
                  <span className="font-bold text-amber-300 block">3. Synovial Fluid Hydration</span>
                  <p className="text-slate-300">Nuun electrolyte hydration maintains blood plasma and joint synovial fluid volume, keeping cartilage lubricated and friction-free across 10 kilometers.</p>
                </div>
              </div>
            </div>

            {/* Mental Cue Banner */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏃‍♂️</span>
                <div>
                  <div className="text-xs font-bold text-white">Mental Cue for Your Next Run:</div>
                  <div className="text-xs text-slate-300 italic">"Whisper steps under the hips • Soft knee flexion • Let the patella glide freely"</div>
                </div>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-mono bg-emerald-900/50 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full shrink-0">
                100% Pain-Free Longevity
              </span>
            </div>
          </div>

        </div>
      )}

      {/* ================= TAB 2: TARGET PACE SCHEDULE (NO DISTANCES) ================= */}
      {activeTab === 'plan' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 text-emerald-950">
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
              <span className="font-mono text-xs font-black text-emerald-900 shrink-0">{planPercent}%</span>
            </div>
          </div>

          <div className="space-y-4">
            {APPLE_WATCH_PACER_PROGRAM.map((w) => {
              const isExpanded = !!expandedWeeks[w.week];
              const weekDoneCount = w.workouts.filter(wk => completedWorkouts.includes(wk.id)).length;
              const isWeekFullyDone = weekDoneCount === w.workouts.length;

              return (
                <div 
                  key={w.week} 
                  className={`border rounded-2xl overflow-hidden transition shadow-2xs ${
                    isWeekFullyDone 
                      ? 'border-emerald-300 bg-emerald-50/30' 
                      : w.week === 3
                      ? 'border-amber-400 ring-2 ring-amber-400/30 bg-white'
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div 
                    onClick={() => toggleWeek(w.week)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-stone-50 select-none transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        isWeekFullyDone ? 'bg-emerald-700 text-white' : w.week === 2 ? 'bg-emerald-600 text-white' : w.week === 3 ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {isWeekFullyDone ? '✓' : w.week}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm sm:text-base text-stone-900">{w.focus}</h4>
                          {w.week === 2 && (
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                              🏆 7.59 km Landmark Done!
                            </span>
                          )}
                          {w.week === 3 && (
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                              Next: Consolidation Deload
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-stone-500 font-medium">3 Target Pacer Runs Planned</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-stone-500 font-bold hidden sm:inline">
                        {weekDoneCount}/{w.workouts.length} Done
                      </span>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-stone-200/60 p-4 sm:p-5 space-y-3 bg-stone-50/50">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {w.workouts.map((wk) => {
                          const isDone = completedWorkouts.includes(wk.id);
                          return (
                            <div 
                              key={wk.id}
                              className={`p-4 rounded-xl border transition flex flex-col justify-between space-y-3 ${
                                isDone 
                                  ? 'bg-emerald-50 border-emerald-300' 
                                  : 'bg-white border-stone-200 hover:border-emerald-300'
                              }`}
                            >
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-mono font-bold text-stone-500 uppercase">{wk.day}</span>
                                  <button
                                    onClick={() => toggleWorkoutCheckbox(wk.id)}
                                    className="text-stone-400 hover:text-emerald-700 transition"
                                  >
                                    {isDone ? <CheckCircle2 className="w-5 h-5 text-emerald-700 fill-emerald-100" /> : <Circle className="w-5 h-5" />}
                                  </button>
                                </div>
                                <div className="font-extrabold text-sm text-stone-900">{wk.title}</div>
                                <div className="inline-block px-2.5 py-0.5 rounded-md bg-stone-900 text-amber-300 font-mono text-xs font-black">
                                  ⌚ Pacer: {wk.pacerPace}
                                </div>
                                <p className="text-xs text-stone-600 leading-relaxed font-normal pt-1">
                                  {wk.desc}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 3: WATCH SETUP ================= */}
      {activeTab === 'watch' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-xl font-black text-stone-900 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-700" />
              How to Set Apple Watch Pacer for Zone 2 (Step-by-Step)
            </h3>
            <ol className="space-y-3 text-xs sm:text-sm text-stone-700 list-decimal list-inside leading-relaxed">
              <li>Open the <strong>Workout App</strong> on your Apple Watch.</li>
              <li>Scroll to <strong>Outdoor Run</strong> and tap the <strong>••• (More)</strong> button on the top right.</li>
              <li>Tap <strong>Pacer</strong> and select or set your target pace (e.g. <strong>11:00 min/km</strong>).</li>
              <li>Start your run! Your Apple Watch will vibrate and display:
                <ul className="pl-6 pt-1 space-y-1 list-disc list-inside text-stone-600">
                  <li><strong className="text-emerald-700">On Pace:</strong> You are in perfect Zone 2 sync.</li>
                  <li><strong className="text-amber-700">Ahead:</strong> Slow down! You are running too fast and drifting toward Zone 3.</li>
                  <li><strong className="text-blue-700">Behind:</strong> Do not rush to catch up if your heart rate is already 118–120 BPM. Body feeling always rules!</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      )}

      {/* ================= TAB 4: JOURNAL & LOGS ================= */}
      {activeTab === 'log' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-black text-stone-900">Your Run Journal</h3>
              <p className="text-xs text-stone-500 font-medium">{runLogs.length} Sessions Logged</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Log Session</span>
            </button>
          </div>

          <div className="space-y-3">
            {runLogs.map((log) => (
              <div key={log.id} className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      {log.date}
                    </span>
                    <span className="text-xs font-extrabold text-stone-900">{log.type}</span>
                    {log.dist >= 7.5 && (
                      <span className="text-[10px] bg-amber-400 text-amber-950 font-black px-2 py-0.5 rounded-full">
                        🏆 Landmark Record
                      </span>
                    )}
                  </div>
                  <div className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-3">
                    <span>{log.dist} km</span>
                    <span className="text-stone-300">•</span>
                    <span>{log.duration}</span>
                    <span className="text-stone-300">•</span>
                    <span className="text-emerald-700 text-sm">{log.pace} min/km</span>
                  </div>
                  {log.notes && (
                    <p className="text-xs text-stone-600 font-normal pt-1 italic">
                      "{log.notes}"
                    </p>
                  )}
                </div>

                <button
                  onClick={() => deleteLog(log.id)}
                  className="p-2 text-stone-400 hover:text-rose-600 transition shrink-0"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 5: ZONE 2 SCIENCE RULES ================= */}
      {activeTab === 'wise' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm">
              <Smartphone className="w-4 h-4" />
              <span>Apple Watch Pacer & Zone 2 Harmony</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Setting your Watch Pacer to your target Zone 2 pace ensures you never accidentally run too fast. If your watch shows you are "Ahead", slow down and let your heart rate drop.
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm">
              <Heart className="w-4 h-4" />
              <span>The Conversational Breathing Rule</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              If breathing gets heavy or you can't speak full sentences, you've slipped out of Zone 2 into Zone 3. Slow down or walk for 60 seconds to pull blood lactate back down below 1.5 mmol/L.
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-2 sm:col-span-2">
            <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Rest Two Days After Long Runs</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
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
                    step="0.01"
                    required
                    placeholder="e.g. 7.59"
                    value={logForm.dist}
                    onChange={(e) => setLogForm({ ...logForm, dist: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Time Ran (HH:MM:SS)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1:28:09"
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
                  placeholder="e.g. 114 BPM Avg HR. Felt smooth."
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
