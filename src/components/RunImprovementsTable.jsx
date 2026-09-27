import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Activity, Heart, Flame, Calendar, Award, 
  Sparkles, CheckCircle2, ArrowUpRight, ArrowDownRight, RefreshCw, 
  Zap, ShieldCheck, Filter, Info, PlusCircle, Printer, Compass, Gauge, AlertCircle, ArrowDown
} from 'lucide-react';
import MetabolicTierBadge, { MetabolicTierLegend } from './MetabolicTierBadge';

const INITIAL_RUNS_DATA = [
  {
    id: 'run-sep-25-2026',
    date: 'Sep 25, 2026',
    title: "🔥 Latest Outdoor Run (6.49 km • Apple Watch AutoSync)",
    distanceKm: 6.49,
    durationMin: 73.6,
    paceStr: '11:21 min/km',
    paceVal: 11.35,
    avgHr: 113,
    maxHr: 131,
    powerWatts: 122,
    zone2Percent: 88,
    fatBurnGrams: 37.8,
    carbBurnGrams: 14.2,
    mitoScore: 99,
    hrDriftPercent: 3.6,
    lthrMargin: '-22 BPM',
    note: 'Run-level efficiency metrics higher than Sep 22: 6.49 km in 1:13:36 • 113 BPM Avg HR (Zone 2 corridor) • 131 BPM Max • 122W • 0.780 m/beat • AutoSync'
  },
  {
    id: 'run-sep-22-2026',
    date: 'Sep 22, 2026',
    title: "Outdoor Run (6.29 km • Apple Watch AutoSync)",
    distanceKm: 6.29,
    durationMin: 74.0,
    paceStr: '11:46 min/km',
    paceVal: 11.77,
    avgHr: 118,
    maxHr: 142,
    powerWatts: 124,
    zone2Percent: 68,
    fatBurnGrams: 34.2,
    carbBurnGrams: 22.5,
    mitoScore: 97,
    hrDriftPercent: 5.2,
    lthrMargin: '-17 BPM',
    note: 'Outdoor Run: 6.29 km in 1:14:00 • 118 BPM Avg HR • 142 BPM Max • 124W • 0.720 m/beat • Elevated cardiac cost on warm afternoon • AutoSync'
  },
  {
    id: 'run-sep-19-2026',
    date: 'Sep 19, 2026',
    title: "Outdoor Run (7.11 km Record 🏆 • Apple Watch AutoSync)",
    distanceKm: 7.11,
    durationMin: 84.2,
    paceStr: '12:00 min/km',
    paceVal: 12.00,
    avgHr: 117,
    maxHr: 129,
    powerWatts: 112,
    zone2Percent: 72,
    fatBurnGrams: 39.1,
    carbBurnGrams: 21.8,
    mitoScore: 98,
    hrDriftPercent: 4.1,
    lthrMargin: '-18 BPM',
    note: 'Distance Record: 7.11 km in 1:24:12 • 117 BPM Avg HR • 112W • 452 kcal • High aerobic volume tolerance • AutoSync'
  },
  {
    id: 'run-sep-16-2026',
    date: 'Sep 16, 2026',
    title: "Outdoor Run (6.51 km • Apple Watch AutoSync)",
    distanceKm: 6.51,
    durationMin: 77.6,
    paceStr: '11:55 min/km',
    paceVal: 11.92,
    avgHr: 115,
    maxHr: 132,
    powerWatts: 111,
    zone2Percent: 70,
    fatBurnGrams: 34.8,
    carbBurnGrams: 19.6,
    mitoScore: 98,
    hrDriftPercent: 4.4,
    lthrMargin: '-20 BPM',
    note: 'Solid Aerobic Base: 6.51 km in 1:17:33 • 115 BPM Avg HR • 111W • Smooth cadence in Zone 2 • AutoSync'
  },
  {
    id: 'run-sep-13-2026',
    date: 'Sep 13, 2026',
    title: "Outdoor Run (6.59 km Record 🏆 • Apple Watch AutoSync)",
    distanceKm: 6.59,
    durationMin: 79.3,
    paceStr: '12:02 min/km',
    paceVal: 12.03,
    avgHr: 117,
    maxHr: 132,
    powerWatts: 107,
    zone2Percent: 94,
    fatBurnGrams: 35.5,
    carbBurnGrams: 12.1,
    mitoScore: 99,
    hrDriftPercent: 3.8,
    lthrMargin: '-18 BPM',
    note: '94% Zone 2 Consistency: 6.59 km in 1:19:19 • 117 BPM Avg HR • 107W • 126 SPM • AutoSync'
  },
  {
    id: 'run-sep-10-2026',
    date: 'Sep 10, 2026',
    title: "Outdoor Run (6.55 km Record • Apple Watch AutoSync)",
    distanceKm: 6.55,
    durationMin: 75.7,
    paceStr: '11:33 min/km',
    paceVal: 11.55,
    avgHr: 116,
    maxHr: 142,
    powerWatts: 118,
    zone2Percent: 95,
    fatBurnGrams: 40.2,
    carbBurnGrams: 13.5,
    mitoScore: 99,
    hrDriftPercent: 3.5,
    lthrMargin: '-19 BPM',
    note: 'Peak Zone 2 Consistency (95%): 6.55 km in 75.7 mins • 116 BPM Avg HR • 40.2g estimated fat oxidized • AutoSync'
  },
  {
    id: 'run-sep-07-2026',
    date: 'Sep 7, 2026',
    title: "Outdoor Run (6.46 km Record • Apple Watch AutoSync)",
    distanceKm: 6.46,
    durationMin: 78.3,
    paceStr: '12:07 min/km',
    paceVal: 12.11,
    avgHr: 114,
    maxHr: 131,
    powerWatts: 114,
    zone2Percent: 92,
    fatBurnGrams: 34.8,
    carbBurnGrams: 11.2,
    mitoScore: 98,
    hrDriftPercent: 3.9,
    lthrMargin: '-21 BPM',
    note: '6.46 km in 78.3 mins • 114 BPM Avg HR • 92% Zone 2 • Low cardiac strain • AutoSync'
  },
  {
    id: 'run-sep-03-2026',
    date: 'Sep 3, 2026',
    title: "Outdoor Run (6.00 km • Post-Wingate)",
    distanceKm: 6.00,
    durationMin: 71.0,
    paceStr: '11:51 min/km',
    paceVal: 11.85,
    avgHr: 109,
    maxHr: 130,
    powerWatts: 116,
    zone2Percent: 79,
    fatBurnGrams: 30.5,
    carbBurnGrams: 8.2,
    mitoScore: 97,
    hrDriftPercent: 3.7,
    lthrMargin: '-26 BPM',
    note: 'Post-Wingate Base: 6.00 km in 71.0 mins • 109 BPM Avg HR (Lowest HR recorded) • AutoSync'
  },
  {
    id: 'run-sep-01-2026-wingate',
    date: 'Sep 1, 2026',
    title: "🏥 Wingate Institute Clinical Test (Lactate & Health)",
    distanceKm: 4.50,
    durationMin: 26.0,
    paceStr: '8:20 min/km (LT2)',
    paceVal: 8.33,
    avgHr: 118,
    maxHr: 137,
    powerWatts: 174,
    zone2Percent: 100,
    fatBurnGrams: 28.0,
    carbBurnGrams: 12.0,
    mitoScore: 100,
    hrDriftPercent: 2.1,
    lthrMargin: '0 BPM (LTHR 135)',
    note: 'Official Wingate Clinical Test! LTHR 135 BPM @ 7.2 km/h • Zone 2 Base Limit: ≤120 BPM • VO₂ Peak: 34.1 ml/kg/min'
  },
  {
    id: 'run-aug-27-2026',
    date: 'Aug 27, 2026',
    title: "Latest Outdoor Run (6.13 km Record)",
    distanceKm: 6.13,
    durationMin: 69.9,
    paceStr: '11:24 min/km',
    paceVal: 11.40,
    avgHr: 114,
    maxHr: 126,
    powerWatts: 120,
    zone2Percent: 95,
    fatBurnGrams: 30.2,
    carbBurnGrams: 9.4,
    mitoScore: 98,
    hrDriftPercent: 4.0,
    lthrMargin: '-18 BPM',
    note: 'Broke 6.13 km milestone in 69.9 mins • 114 BPM Avg HR • Apple Watch AutoSync'
  },
  {
    id: 'run-aug-24-2026',
    date: 'Aug 24, 2026',
    title: "Outdoor Run (6.11 km)",
    distanceKm: 6.11,
    durationMin: 72.3,
    paceStr: '11:50 min/km',
    paceVal: 11.84,
    avgHr: 108,
    maxHr: 124,
    powerWatts: 115,
    zone2Percent: 97,
    fatBurnGrams: 31.5,
    carbBurnGrams: 8.6,
    mitoScore: 99,
    hrDriftPercent: 3.4,
    lthrMargin: '-24 BPM',
    note: 'Zone 2 Purity: 108 BPM Avg HR • 97% inside 105–117 BPM corridor'
  },
  {
    id: 'run-aug-21-2026',
    date: 'Aug 21, 2026',
    title: "Outdoor Run (Apple Watch)",
    distanceKm: 5.52,
    durationMin: 63.5,
    paceStr: '11:30 min/km',
    paceVal: 11.50,
    avgHr: 109,
    maxHr: 126,
    powerWatts: 119,
    zone2Percent: 96,
    fatBurnGrams: 28.5,
    carbBurnGrams: 8.2,
    mitoScore: 98,
    hrDriftPercent: 3.5,
    lthrMargin: '-23 BPM',
    note: 'Smooth aerobic pacing • 109 BPM Avg HR • 119W Power'
  },
  {
    id: 'run-jul-23-2026',
    date: 'Jul 23, 2026',
    title: 'Initial Aerobic Benchmark',
    distanceKm: 5.44,
    durationMin: 62.8,
    paceStr: '11:32 min/km',
    paceVal: 11.53,
    avgHr: 119,
    maxHr: 135,
    powerWatts: 117,
    zone2Percent: 86,
    fatBurnGrams: 21.0,
    carbBurnGrams: 12.5,
    mitoScore: 87,
    hrDriftPercent: 5.8,
    lthrMargin: '-13 BPM',
    note: 'Initial Baseline: 119 BPM Avg HR • Cardiac Cost: 1,372 beats/km • 0.729 m/beat'
  }
];

export default function RunImprovementsTable() {
  const [runs, setRuns] = useState(() => {
    const saved = localStorage.getItem('optimus_ishai_runs_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const mapped = parsed.map(r => ({
            id: r.id || `run-${Math.random()}`,
            date: r.date || 'Recent Run',
            title: r.title || 'Outdoor Run',
            distanceKm: r.distanceKm || 5.5,
            durationMin: r.durationMinutes || r.durationMin || 60,
            paceStr: r.avgPace || r.paceStr || '11:30 min/km',
            paceVal: r.paceVal || (r.distanceKm ? (r.durationMinutes || r.durationMin) / r.distanceKm : 11.5),
            avgHr: r.avgHeartRate || r.avgHr || 110,
            maxHr: r.maxHeartRate || r.maxHr || 125,
            powerWatts: r.powerWatts || (r.paceVal ? Math.round(82.9 * (1000 / (r.paceVal * 60)) * (1 + (60 / ((r.distanceKm || 5) * 1000)))) : 115),
            zone2Percent: r.zone2TimePercent || r.zone2Percent || 95,
            fatBurnGrams: r.fatBurnGrams || 25,
            carbBurnGrams: r.carbBurnGrams || 8,
            mitoScore: r.mitochondrialEfficiencyScore || r.mitoScore || 95,
            hrDriftPercent: r.hrDriftPercent || 3.8,
            lthrMargin: r.lthrMargin || '-20 BPM',
            note: r.note || 'Synced Workout'
          }));
          if (!mapped.some(r => r.id === 'run-sep-25-2026')) {
            mapped.unshift(INITIAL_RUNS_DATA[0]);
          }
          return mapped;
        }
      } catch (e) {
        console.error('Failed to parse runs from localStorage', e);
      }
    }
    return INITIAL_RUNS_DATA;
  });

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('optimus_ishai_runs_v3');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRuns(parsed.map(r => ({
              id: r.id || `run-${Math.random()}`,
              date: r.date || 'Recent Run',
              title: r.title || 'Outdoor Run',
              distanceKm: r.distanceKm || 5.5,
              durationMin: r.durationMinutes || r.durationMin || 60,
              paceStr: r.avgPace || r.paceStr || '11:30 min/km',
              paceVal: r.paceVal || (r.distanceKm ? (r.durationMinutes || r.durationMin) / r.distanceKm : 11.5),
              avgHr: r.avgHeartRate || r.avgHr || 110,
              maxHr: r.maxHeartRate || r.maxHr || 125,
              powerWatts: r.powerWatts || (r.paceVal ? Math.round(82.9 * (1000 / (r.paceVal * 60)) * (1 + (60 / ((r.distanceKm || 5) * 1000)))) : 115),
              zone2Percent: r.zone2TimePercent || r.zone2Percent || 95,
              fatBurnGrams: r.fatBurnGrams || 25,
              carbBurnGrams: r.carbBurnGrams || 8,
              mitoScore: r.mitochondrialEfficiencyScore || r.mitoScore || 95,
              hrDriftPercent: r.hrDriftPercent || 3.8,
              lthrMargin: r.lthrMargin || '-20 BPM',
              note: r.note || 'Synced Workout'
            })));
          }
        } catch (e) {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const latestRun = runs[0] || INITIAL_RUNS_DATA[0];
  const previousRun = runs[1] || INITIAL_RUNS_DATA[1];
  const baselineRun = runs[runs.length - 1] || INITIAL_RUNS_DATA[INITIAL_RUNS_DATA.length - 1];

  // Helper to extract short date (e.g. "Aug 24")
  const getShortDate = (dateStr) => {
    if (!dateStr) return '';
    const match = dateStr.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d+/i);
    if (match) return match[0];
    return dateStr.split(',')[0].replace(/Today\s*\(/i, '').trim();
  };

  // Distance per Heartbeat = 1000 / (paceVal * avgHr) meters
  const calcMetersPerBeat = (paceVal, avgHr) => {
    if (!paceVal || !avgHr) return 0.70;
    return (1000 / (paceVal * avgHr));
  };

  // Speed in km/h = 60 / paceVal
  const calcSpeedKmh = (paceVal) => {
    if (!paceVal) return 5.0;
    return (60 / paceVal);
  };

  // Cardiac Cost = paceVal * avgHr (exact heartbeats to travel 1 km)
  const calcCardiacCost = (paceVal, avgHr) => {
    if (!paceVal || !avgHr) return 1300;
    return Math.round(paceVal * avgHr);
  };

  const latestMetersPerBeat = calcMetersPerBeat(latestRun.paceVal, latestRun.avgHr);
  const prevMetersPerBeat = calcMetersPerBeat(previousRun.paceVal, previousRun.avgHr);
  const baselineMetersPerBeat = calcMetersPerBeat(baselineRun.paceVal, baselineRun.avgHr);
  const metersPerBeatDelta = latestMetersPerBeat - prevMetersPerBeat;
  const metersPerBeatBaselineDeltaPercent = (((latestMetersPerBeat - baselineMetersPerBeat) / baselineMetersPerBeat) * 100).toFixed(1);

  const latestCardiacCost = calcCardiacCost(latestRun.paceVal, latestRun.avgHr);
  const prevCardiacCost = calcCardiacCost(previousRun.paceVal, previousRun.avgHr);
  const cardiacCostDelta = latestCardiacCost - prevCardiacCost;

  const hrDelta = latestRun.avgHr - previousRun.avgHr;
  const paceDelta = (latestRun.paceVal - previousRun.paceVal).toFixed(2);
  const zone2Delta = latestRun.zone2Percent - previousRun.zone2Percent;
  const mitoDelta = latestRun.mitoScore - previousRun.mitoScore;

  // Best/extreme statistics across all loaded workouts
  const lowestHr = Math.min(...runs.map(r => r.avgHr));
  const lowestCardiacCost = Math.min(...runs.map(r => calcCardiacCost(r.paceVal, r.avgHr)));
  const highestZone2 = Math.max(...runs.map(r => r.zone2Percent));
  const maxFatBurn = Math.max(...runs.map(r => r.fatBurnGrams));
  const avgMitoScore = Math.round(runs.reduce((acc, r) => acc + r.mitoScore, 0) / runs.length);

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900 pb-16">
      
      {/* 1. TOP HERO BANNER */}
      <div className="bg-gradient-to-br from-stone-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border border-emerald-500/20">
        <div className="absolute -right-12 -top-12 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase tracking-wider border border-emerald-400/30 inline-flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                Page 28 • Longitudinal Aerobic Engine
              </span>
              <div className="flex items-center gap-1.5">
                <MetabolicTierBadge tier="measured" size="xs" />
                <MetabolicTierBadge tier="calculated" size="xs" />
                <MetabolicTierBadge tier="modeled" size="xs" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Run Progress & Adaptation Matrix
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm font-medium max-w-2xl leading-relaxed">
              Tracking physiological adaptation patterns across continuous workouts. Solves the central aerobic question: 
              <span className="text-emerald-300 font-bold"> Are you running faster at the same heart rate, or maintaining the same pace at a lower heart rate?</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-4 py-2.5 rounded-2xl shadow-sm text-xs transition cursor-pointer print:hidden no-print"
              title="Print or Save Page 28 as PDF"
            >
              <Printer className="w-4 h-4 text-emerald-100" />
              <span>Save Page 28 as PDF</span>
            </button>
            <div className="flex items-center gap-2.5 bg-white/10 p-2.5 rounded-2xl border border-white/10 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="font-extrabold text-white">Apple Watch Ultra Sync</div>
                <div className="text-stone-300 text-[10px]">Empirical Photoplethysmography (Optical Heart-Rate Measurement)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. HERO METRIC: DISTANCE PER HEARTBEAT (AEROBIC EFFICIENCY INDEX) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white border border-emerald-500/30 shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[11px] font-mono font-black uppercase tracking-wider border border-emerald-400/30">
                Aerobic Efficiency Index = Pace/HR-Derived Metric
              </span>
              <MetabolicTierBadge tier="calculated" size="xs" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Distance Per Heartbeat
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-normal">
              Rather than assuming raw heart rate indicates fitness, this calculated metric normalizes running speed by recorded heart rate:
              <strong className="text-white"> 6.49 km at 113 BPM vs. 6.29 km at 118 BPM</strong> (a faster pace was achieved with a lower average heart rate, resulting in more distance covered per recorded heartbeat).
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 shrink-0">
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                Current Distance / Pulse
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-black text-white flex items-baseline gap-1.5">
                {latestMetersPerBeat.toFixed(3)}
                <span className="text-xs font-sans text-stone-300 font-bold">m / beat</span>
              </div>
              <div className="text-[11px] text-stone-300">
                ({(latestMetersPerBeat * 100).toFixed(1)} cm covered per beat)
              </div>
            </div>

            <div className="h-12 w-px bg-white/20 hidden sm:block" />

            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-stone-300 uppercase tracking-wider">
                vs. July Baseline
              </div>
              <div className="text-lg font-mono font-extrabold text-emerald-400 flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4 text-emerald-300" />
                +{metersPerBeatBaselineDeltaPercent}%
              </div>
              <div className="text-[10px] text-stone-300">
                Distance-per-Heartbeat (0.729 → 0.780 m/beat)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. THREE-TIER SCIENTIFIC EPISTEMOLOGY HIERARCHY BAR */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <h3 className="text-xs sm:text-sm font-black text-stone-900 uppercase tracking-tight">
              Optimus 3-Tier Scientific Hierarchy: Empirical Grounding
            </h3>
          </div>
          <span className="text-[10px] font-mono text-stone-500">Methodological Transparency</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* TIER 1: MEASURED */}
          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-emerald-950 text-xs">1. MEASURED</span>
              <MetabolicTierBadge tier="measured" size="xs" />
            </div>
            <div className="text-xs font-mono font-bold text-emerald-900">
              Distance • Pace • Heart Rate • Running Power (estimated)
            </div>
            <p className="text-[11px] text-stone-600 leading-snug">
              Empirical telemetry captured by Apple Watch Ultra optical photoplethysmography and dual-frequency GPS (with running power estimated via accelerometer models).
            </p>
          </div>

          {/* TIER 2: CALCULATED */}
          <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sky-950 text-xs">2. CALCULATED</span>
              <MetabolicTierBadge tier="calculated" size="xs" />
            </div>
            <div className="text-xs font-mono font-bold text-sky-900">
              Distance/Beat • Cardiac Cost Index • HR Drift
            </div>
            <p className="text-[11px] text-stone-600 leading-snug">
              Pure mathematical formulas combining measured variables (e.g. Beats/km = HR [beats/min] × Pace [min/km], Speed ÷ HR = m/beat).
            </p>
          </div>

          {/* TIER 3: MODELED */}
          <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-purple-950 text-xs">3. MODELED</span>
              <MetabolicTierBadge tier="modeled" size="xs" />
            </div>
            <div className="text-xs font-mono font-bold text-purple-900">
              Estimated Fat Oxidation • Mito Adapt.
            </div>
            <p className="text-[11px] text-stone-600 leading-snug">
              Model-based physiological estimates informed by laboratory and longitudinal exercise data. Explicitly not direct cellular biopsies.
            </p>
          </div>

        </div>
      </div>

      {/* 4. THE 6 PILLAR ADAPTATION MATRIX CARDS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-stone-500 flex items-center gap-2">
            <Gauge className="w-4 h-4 text-emerald-700" />
            <span>The 6 Pillar Adaptation Matrix</span>
          </h3>
          <span className="text-xs text-stone-500 font-medium">Standardized against laboratory-measured LTHR (135 BPM)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1: Distance Per Heartbeat */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2 hover:border-emerald-300 transition">
            <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <span>1. Distance / Heartbeat</span>
                <MetabolicTierBadge tier="calculated" size="xs" />
              </span>
              <Gauge className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-stone-900 font-mono">
              {latestMetersPerBeat.toFixed(3)} <span className="text-xs font-sans font-bold text-stone-500">m / beat</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +8.3% vs Sep 22 (0.720 → 0.780 m/beat)
            </p>
            <div className="text-[10px] text-stone-500 leading-tight pt-1 border-t border-stone-100">
              Aerobic Efficiency Index = Pace/HR-derived metric. May reflect improved cardiovascular efficiency when conditions are comparable; represents more distance covered per recorded heartbeat.
            </div>
          </div>

          {/* Card 2: Cardiac Cost (Beats / km) */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2 hover:border-emerald-300 transition">
            <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <span>2. Cardiac Cost Index</span>
                <MetabolicTierBadge tier="calculated" size="xs" />
              </span>
              <Heart className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-stone-900 font-mono">
              {latestCardiacCost.toLocaleString()} <span className="text-xs font-sans font-bold text-stone-500">beats / km</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" /> -{Math.abs(cardiacCostDelta)} beats/km vs previous run
            </p>
            <div className="text-[10px] text-stone-500 leading-tight pt-1 border-t border-stone-100">
              Beats/km = HR (beats/min) × Pace (min/km). Calculated index of heartbeats required to travel 1,000 meters.
            </div>
          </div>

          {/* Card 3: Pace at Standard Base HR */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2 hover:border-emerald-300 transition">
            <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <span>3. Pace at Zone 2 HR</span>
                <MetabolicTierBadge tier="measured" label="MEASURED RELATIONSHIP" size="xs" />
              </span>
              <TrendingUp className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-stone-900 font-mono">
              11:21 <span className="text-xs font-sans font-bold text-stone-500">min/km @ 113 BPM</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 22 BPM below laboratory-measured LTHR (135 BPM)
            </p>
            <div className="text-[10px] text-stone-500 leading-tight pt-1 border-t border-stone-100">
              Direct measured pace achieved within the Optimus training corridor of 105–117 BPM, selected within the laboratory-derived aerobic range (limit ≤120 BPM).
            </div>
          </div>

          {/* Card 4: Aerobic Decoupling & HR Drift */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2 hover:border-emerald-300 transition">
            <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <span>4. HR Drift (Decoupling)</span>
                <MetabolicTierBadge tier="calculated" size="xs" />
              </span>
              <Activity className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-stone-900 font-mono">
              &lt; {latestRun.hrDriftPercent || 3.6}% <span className="text-xs font-sans font-bold text-emerald-600">Low Drift (&lt;5%)</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Minimal cardiac drift across 73 min
            </p>
            <div className="text-[10px] text-stone-500 leading-tight pt-1 border-t border-stone-100">
              Drift between 1st & 2nd half. Values &lt;5% are classified by this model as low cardiac drift.
            </div>
          </div>

          {/* Card 5: Zone 2 Consistency */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2 hover:border-emerald-300 transition">
            <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <span>5. Zone 2 Discipline</span>
                <MetabolicTierBadge tier="measured" size="xs" />
              </span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-stone-900 font-mono">
              {latestRun.zone2Percent}% <span className="text-xs font-sans font-bold text-stone-500">Compliance</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 64.8 min strictly inside 105–117 BPM
            </p>
            <div className="text-[10px] text-stone-500 leading-tight pt-1 border-t border-stone-100">
              Maintains planned aerobic-intensity corridor and supports the modeled estimate of predominantly fat-based energy contribution.
            </div>
          </div>

          {/* Card 6: Mitochondrial Adaptation Index — MODELLED */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2 hover:border-purple-300 transition">
            <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <span>6. Mito Adaptation</span>
                <MetabolicTierBadge tier="modeled" size="xs" />
              </span>
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-stone-900 font-mono">
              {latestRun.mitoScore} <span className="text-xs font-sans font-bold text-purple-700">— MODELLED</span>
            </div>
            <p className="text-[11px] text-purple-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> High Model-Estimated Oxidative Flux — NOT DIRECTLY MEASURED
            </p>
            <div className="text-[10px] text-stone-500 leading-tight pt-1 border-t border-stone-100">
              Composite proxy index (0–100): 40% drift resistance (&lt;5%), 35% estimated lipid oxidation, 25% pace/HR efficiency. Does not directly measure mitochondrial function.
            </div>
          </div>

        </div>
      </div>

      {/* 5. ACUTE COMPARISON DELTA (SEP 25 vs SEP 22) */}
      <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-300 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <h3 className="text-lg font-black text-emerald-950">
                Acute Comparison ({getShortDate(latestRun.date)} vs. {getShortDate(previousRun.date)})
              </h3>
              <p className="text-xs text-emerald-800">
                * Note: A 3-day window demonstrates acute performance differences; evidence of chronic adaptation requires a substantially longer longitudinal dataset.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-800 text-white font-extrabold text-xs">
            Improved Aerobic Efficiency Metrics vs. Previous Run
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
          
          {/* Card 1: Avg Heart Rate */}
          <div className="p-3.5 rounded-xl bg-white border border-emerald-200 flex flex-col justify-between space-y-1.5 shadow-2xs">
            <div className="text-[11px] text-stone-500 font-bold flex items-center justify-between">
              <span>Avg Heart Rate</span>
              <MetabolicTierBadge tier="measured" size="xs" />
            </div>
            <div className="space-y-1">
              <div className="text-base sm:text-lg font-black text-stone-900 font-mono">
                {latestRun.avgHr} <span className="text-xs font-sans font-semibold text-stone-500">BPM</span>
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded">
                <ArrowDownRight className="w-3 h-3 text-emerald-700" />
                <span>{hrDelta > 0 ? `+${hrDelta}` : hrDelta} BPM</span>
              </div>
            </div>
            <div className="text-[10px] text-stone-500 pt-0.5">Lower average heart rate</div>
          </div>

          {/* Card 2: Pace */}
          <div className="p-3.5 rounded-xl bg-white border border-emerald-200 flex flex-col justify-between space-y-1.5 shadow-2xs">
            <div className="text-[11px] text-stone-500 font-bold flex items-center justify-between">
              <span>Pace</span>
              <MetabolicTierBadge tier="measured" size="xs" />
            </div>
            <div className="space-y-1">
              <div className="text-base sm:text-lg font-black text-stone-900 font-mono">
                {latestRun.paceStr.split(' ')[0]} <span className="text-xs font-sans font-semibold text-stone-500">min/km</span>
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded">
                <ArrowDownRight className="w-3 h-3 text-emerald-700" />
                <span>-25 sec/km (faster)</span>
              </div>
            </div>
            <div className="text-[10px] text-stone-500 pt-0.5">Faster pace</div>
          </div>

          {/* Card 3: Dist / Beat */}
          <div className="p-3.5 rounded-xl bg-white border border-emerald-200 flex flex-col justify-between space-y-1.5 shadow-2xs">
            <div className="text-[11px] text-stone-500 font-bold flex items-center justify-between">
              <span>Dist / Beat</span>
              <MetabolicTierBadge tier="calculated" size="xs" />
            </div>
            <div className="space-y-1">
              <div className="text-base sm:text-lg font-black text-stone-900 font-mono">
                {latestMetersPerBeat.toFixed(3)} <span className="text-xs font-sans font-semibold text-stone-500">m</span>
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded">
                <ArrowUpRight className="w-3 h-3 text-emerald-700" />
                <span>+{metersPerBeatDelta.toFixed(3)} m/beat</span>
              </div>
            </div>
            <div className="text-[10px] text-stone-500 pt-0.5">Meters per heartbeat</div>
          </div>

          {/* Card 4: Cardiac Cost Index */}
          <div className="p-3.5 rounded-xl bg-white border border-emerald-200 flex flex-col justify-between space-y-1.5 shadow-2xs">
            <div className="text-[11px] text-stone-500 font-bold flex items-center justify-between">
              <span>Cardiac Cost Index</span>
              <MetabolicTierBadge tier="calculated" size="xs" />
            </div>
            <div className="space-y-1">
              <div className="text-base sm:text-lg font-black text-stone-900 font-mono">
                {latestCardiacCost.toLocaleString()} <span className="text-xs font-sans font-semibold text-stone-500">beats/km</span>
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded">
                <ArrowDownRight className="w-3 h-3 text-emerald-700" />
                <span>{cardiacCostDelta > 0 ? `+${cardiacCostDelta}` : cardiacCostDelta} beats/km</span>
              </div>
            </div>
            <div className="text-[10px] text-stone-500 pt-0.5">Fewer beats per km</div>
          </div>

          {/* Card 5: Zone 2 Score */}
          <div className="p-3.5 rounded-xl bg-white border border-emerald-200 flex flex-col justify-between space-y-1.5 shadow-2xs">
            <div className="text-[11px] text-stone-500 font-bold flex items-center justify-between">
              <span>Zone 2 Score</span>
              <MetabolicTierBadge tier="measured" size="xs" />
            </div>
            <div className="space-y-1">
              <div className="text-base sm:text-lg font-black text-stone-900 font-mono">
                {latestRun.zone2Percent}%
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded">
                <ArrowUpRight className="w-3 h-3 text-emerald-700" />
                <span>+{zone2Delta}% pts</span>
              </div>
            </div>
            <div className="text-[10px] text-stone-500 pt-0.5">In 105–117 corridor</div>
          </div>

          {/* Card 6: Mito Adapt. */}
          <div className="p-3.5 rounded-xl bg-white border border-emerald-200 flex flex-col justify-between space-y-1.5 shadow-2xs">
            <div className="text-[11px] text-stone-500 font-bold flex items-center justify-between">
              <span>Mito Adapt.</span>
              <MetabolicTierBadge tier="modeled" size="xs" />
            </div>
            <div className="space-y-1">
              <div className="text-base sm:text-lg font-black text-stone-900 font-mono">
                {latestRun.mitoScore}
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded">
                <ArrowUpRight className="w-3 h-3 text-emerald-700" />
                <span>+{mitoDelta} pts</span>
              </div>
            </div>
            <div className="text-[10px] text-stone-500 pt-0.5">Model-derived index</div>
          </div>

        </div>
      </div>

      {/* 6. MAIN CHRONOLOGICAL WORKOUT LOG */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div>
            <h3 className="text-xl font-black text-stone-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-700" />
              <span>Longitudinal Exercise Dataset ({runs.length} Sessions)</span>
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              Every workout evaluated chronologically. Shows longitudinal evidence of changes in pace and heart rate across workouts.
            </p>
          </div>
          
          <button
            onClick={() => {
              const saved = localStorage.getItem('optimus_ishai_runs_v3') || localStorage.getItem('optimus_ishai_runs');
              if (saved) {
                try { setRuns(JSON.parse(saved)); } catch (e) {}
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* Scrollable Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 font-extrabold uppercase tracking-wider bg-stone-50/80">
                <th className="py-3.5 px-4 rounded-l-xl whitespace-nowrap">Date & Workout</th>
                <th className="py-3.5 px-4 whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    <span>Distance</span>
                    <span className="select-none"><MetabolicTierBadge tier="measured" size="xs" /></span>
                  </span>
                </th>
                <th className="py-3.5 px-4 whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    <span>Pace</span>
                    <span className="select-none"><MetabolicTierBadge tier="measured" size="xs" /></span>
                  </span>
                </th>
                <th className="py-3.5 px-4 whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    <span>Avg HR</span>
                    <span className="select-none"><MetabolicTierBadge tier="measured" size="xs" /></span>
                  </span>
                </th>
                <th className="py-3.5 px-4 bg-emerald-50/50 whitespace-nowrap">
                  <span className="flex items-center gap-1 text-emerald-900">
                    <span>Dist / Beat</span>
                    <span className="select-none"><MetabolicTierBadge tier="calculated" size="xs" /></span>
                  </span>
                </th>
                <th className="py-3.5 px-4 whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    <span>Cardiac Cost Index</span>
                    <span className="select-none"><MetabolicTierBadge tier="calculated" size="xs" /></span>
                  </span>
                </th>
                <th className="py-3.5 px-4 whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    <span>Zone 2 %</span>
                    <span className="select-none"><MetabolicTierBadge tier="measured" size="xs" /></span>
                  </span>
                </th>
                <th className="py-3.5 px-4 whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    <span>Est. Fat Ox.</span>
                    <span className="select-none"><MetabolicTierBadge tier="modeled" size="xs" /></span>
                  </span>
                </th>
                <th className="py-3.5 px-4 whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    <span>Mito Adapt.</span>
                    <span className="select-none"><MetabolicTierBadge tier="modeled" size="xs" /></span>
                  </span>
                </th>
                <th className="py-3.5 px-4 rounded-r-xl whitespace-nowrap">Physiological Insight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              {runs.map((run, idx) => {
                const prev = runs[idx + 1];
                const isHrImproved = prev && run.avgHr < prev.avgHr;
                const hrDiff = prev ? prev.avgHr - run.avgHr : 0;
                const isFirst = idx === 0;

                const runMetersPerBeat = calcMetersPerBeat(run.paceVal, run.avgHr);
                const prevMetersPerBeat = prev ? calcMetersPerBeat(prev.paceVal, prev.avgHr) : null;
                const isEffImproved = prevMetersPerBeat && runMetersPerBeat > prevMetersPerBeat;

                const currentCost = calcCardiacCost(run.paceVal, run.avgHr);
                const prevCost = prev ? calcCardiacCost(prev.paceVal, prev.avgHr) : null;
                const isCostImproved = prevCost && currentCost < prevCost;
                const costDiff = prevCost ? prevCost - currentCost : 0;

                return (
                  <tr 
                    key={run.id || idx}
                    className={`hover:bg-stone-50/80 transition ${
                      isFirst ? 'bg-emerald-50/40 font-semibold' : ''
                    }`}
                  >
                    
                    {/* Date & Title */}
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-stone-900 flex items-center gap-1.5">
                        {run.date}
                        {isFirst && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-black">
                            Latest ⭐
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-500">{run.title}</div>
                    </td>

                    {/* Distance */}
                    <td className="py-3.5 px-4 font-bold text-stone-900 font-mono whitespace-nowrap">
                      {run.distanceKm} <span className="text-[11px] font-sans font-normal text-stone-500">km</span>
                    </td>

                    {/* Pace */}
                    <td className="py-3.5 px-4 font-bold text-stone-900 font-mono whitespace-nowrap">
                      {run.paceStr}
                    </td>

                    {/* Avg Heart Rate */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex flex-col leading-tight">
                        <span className="font-black text-stone-900 text-sm font-mono">{run.avgHr} BPM</span>
                        {isFirst && isHrImproved && (
                          <div className="mt-1 flex items-center gap-1">
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-100/90 text-emerald-800 text-[10px] font-mono font-bold">
                              <span>↓</span>
                              <span>{hrDiff} BPM</span>
                            </span>
                            <span className="text-[9px] text-stone-500 font-sans font-medium">(vs Sep 22)</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Distance per Heartbeat (m/beat) */}
                    <td className="py-3.5 px-4 bg-emerald-50/40 whitespace-nowrap">
                      <div className="flex flex-col leading-tight">
                        <span className="font-black text-emerald-950 text-sm font-mono">
                          {runMetersPerBeat.toFixed(3)} <span className="text-[10px] text-emerald-700 font-sans font-semibold">m/beat</span>
                        </span>
                        {isFirst && isEffImproved && (
                          <div className="mt-1 flex items-center gap-1 font-sans">
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-100/90 text-emerald-800 text-[10px] font-mono font-bold">
                              <span>↑</span>
                              <span>{(runMetersPerBeat - prevMetersPerBeat).toFixed(3)}</span>
                            </span>
                            <span className="text-[9px] text-stone-500 font-medium">(vs Sep 22)</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Cardiac Cost Index (beats/km) */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex flex-col leading-tight font-mono">
                        <span className="font-black text-stone-900 text-sm">
                          {currentCost.toLocaleString()} <span className="text-[10px] text-stone-500 font-sans font-normal">beats/km</span>
                        </span>
                        {isFirst && isCostImproved && (
                          <div className="mt-1 flex items-center gap-1 font-sans">
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-100/90 text-emerald-800 text-[10px] font-mono font-bold">
                              <span>↓</span>
                              <span>{costDiff}</span>
                            </span>
                            <span className="text-[9px] text-stone-500 font-medium">(vs Sep 22)</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Zone 2 Compliance */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200">
                          <div 
                            className="bg-emerald-600 h-full rounded-full" 
                            style={{ width: `${Math.min(run.zone2Percent, 100)}%` }} 
                          />
                        </div>
                        <span className="font-extrabold text-stone-900 font-mono">{run.zone2Percent}%</span>
                      </div>
                    </td>

                    {/* Estimated Fat Oxidation */}
                    <td className="py-3.5 px-4 font-bold text-amber-900 font-mono">
                      {run.fatBurnGrams}g <span className="text-[10px] font-sans font-normal text-stone-500">est.</span>
                    </td>

                    {/* Modeled Mito Index */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-lg font-mono font-black text-xs inline-flex items-center gap-1 ${
                        run.mitoScore >= 98 
                          ? 'bg-purple-100 text-purple-900 border border-purple-200' 
                          : run.mitoScore >= 92
                          ? 'bg-purple-50 text-purple-800 border border-purple-100'
                          : 'bg-stone-100 text-stone-800'
                      }`}>
                        <span>{run.mitoScore}</span>
                        <span className="text-[9px] text-purple-700 font-semibold uppercase">M</span>
                      </span>
                    </td>

                    {/* Adaptation Note */}
                    <td className="py-3.5 px-4 text-[11px] text-stone-600 max-w-xs leading-snug">
                      {run.note || 'Verified Aerobic Run'}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Scientific Footnotes for the Table */}
        <div className="pt-2 text-[10px] text-stone-500 border-t border-stone-100 space-y-1">
          <div>
            * <strong>ESTIMATED FAT OXIDATION:</strong> Modeled substrate utilization based on Wingate laboratory lactate threshold profiles. Not a direct metabolic cart RER/VO₂ measurement.
          </div>
          <div>
            * <strong>MITOCHONDRIAL ADAPTATION INDEX:</strong> A longitudinal model-based indicator. It does not directly measure mitochondrial function or cellular respiration.
          </div>
        </div>

      </div>

      {/* 7. SCIENTIFIC EPISTEMOLOGY & CONFOUNDER CONTROL PANEL */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-950 text-white space-y-6 shadow-xl border border-slate-800">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5 text-emerald-400 font-extrabold text-base">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Scientific Epistemology & Confounder Control Protocol</span>
          </div>
          <div className="flex items-center gap-2">
            <MetabolicTierBadge tier="measured" size="xs" />
            <MetabolicTierBadge tier="calculated" size="xs" />
            <MetabolicTierBadge tier="modeled" size="xs" />
          </div>
        </div>

        {/* Highlighted Box: Verbatim Mitochondrial Formulation from Expert Critique */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 to-slate-900 border border-purple-500/30 space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
            <h4 className="text-xs sm:text-sm font-black tracking-wide text-purple-200 uppercase font-mono">
              MITOCHONDRIAL ADAPTATION INDEX: 99 — MODELLED
            </h4>
            <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-purple-500/20 text-purple-300 border border-purple-400/30">
              Non-Invasive Physiological Modeling
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
            "A longitudinal model-based indicator. It does not directly measure mitochondrial function or cellular respiration."
          </p>
          <div className="text-[11px] text-stone-400 pt-1 leading-normal font-sans">
            By distinguishing empirical biometrics from model-based physiological estimates, Optimus makes the methodological limitations of wearable-derived metrics explicit, without confusing wrist-worn photoplethysmography with in-vitro muscle biopsy respirometry.
          </div>
        </div>

        {/* 6 Metric Pillars Explanatory Breakdown Table */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Methodological Architecture of the 6 Matrix Pillars
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Distance per Heartbeat</span>
                <MetabolicTierBadge tier="calculated" size="xs" />
              </div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                <strong>Speed ÷ Heart Rate.</strong> Helps assess whether you run faster at the same heart rate or at a lower heart rate at the same speed.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Cardiac Cost Index (beats/km)</span>
                <MetabolicTierBadge tier="calculated" size="xs" />
              </div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                <strong>Average HR × Pace.</strong> Indicates how many heartbeats are required to cover 1 km. At comparable running intensity and conditions, a lower value may be consistent with improved cardiovascular efficiency.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Pace at Standard Base HR</span>
                <MetabolicTierBadge tier="measured" label="MEASURED RELATIONSHIP" size="xs" />
              </div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                <strong>Speed in 105–117 BPM.</strong> Direct measured pace within the Optimus training corridor of 105–117 BPM, selected within the laboratory-derived aerobic range (limit ≤120 BPM).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">HR Drift (Decoupling)</span>
                <MetabolicTierBadge tier="calculated" size="xs" />
              </div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                <strong>1st Half vs 2nd Half HR.</strong> Evaluates cardiovascular decoupling over 60–80+ minutes. Drift &lt;5% is classified by this model as low cardiac drift.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Zone 2 Consistency</span>
                <MetabolicTierBadge tier="measured" size="xs" />
              </div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                <strong>% Duration in Target.</strong> Tracks the percentage of the workout performed within the predefined aerobic-intensity corridor.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Mitochondrial Adaptation</span>
                <MetabolicTierBadge tier="modeled" size="xs" />
              </div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                <strong>Composite Proxy Index (0–100).</strong> Weighted model integrating: 40% low drift resistance (&lt;5% drift), 35% estimated lipid oxidation, and 25% pace-to-heart-rate efficiency index.
              </p>
            </div>

          </div>
        </div>

        {/* Confounder Control System */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-stone-200 font-bold text-xs">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Optimus Confounder Control Protocol (Why single runs can deceive)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-stone-300 leading-relaxed">
            <div>
              <strong className="text-white block mb-0.5">1. Ambient Temperature & Heat:</strong>
              Hot weather elevates heart rate via cutaneous vasodilation. Ambient temperature and humidity are recognized as potential confounders and should be considered when comparing runs.
            </div>
            <div>
              <strong className="text-white block mb-0.5">2. Course Gradient & Elevation:</strong>
              Grade changes alter metabolic cost. Route elevation and grade changes are treated as potential confounders across training courses.
            </div>
            <div>
              <strong className="text-white block mb-0.5">3. Longitudinal Dataset Requirements:</strong>
              A 3-day window demonstrates acute performance differences; evidence of chronic adaptation requires a substantially longer longitudinal dataset.
            </div>
          </div>
        </div>

      </div>

    </article>
  );
}
