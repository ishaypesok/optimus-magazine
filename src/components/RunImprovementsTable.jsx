import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, TrendingDown, Activity, Heart, Flame, Calendar, Award, 
  Sparkles, CheckCircle2, ArrowUpRight, ArrowDownRight, RefreshCw, 
  Zap, ShieldCheck, Filter, Info, PlusCircle, Printer, Compass, Gauge, AlertCircle, ArrowDown,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import MetabolicTierBadge, { MetabolicTierLegend } from './MetabolicTierBadge';

// Deterministic model for Mitochondrial Adaptation Proxy (0–100)
export const calcMitoAdaptationProxy = (paceVal, avgHr, hrDriftPercent, zone2Percent) => {
  if (!paceVal || !avgHr) return 90;
  const mpb = 1000.0 / (paceVal * avgHr);
  const s_drift = Math.min(100, Math.max(50, Math.round(105 - ((hrDriftPercent || 3.8) * 2.0))));
  const s_adh = Math.min(100, Math.round(((zone2Percent || 85) / 90.0) * 100));
  const s_eff = Math.min(100, Math.round((mpb / 0.720) * 90));
  return Math.round((0.40 * s_drift) + (0.35 * s_adh) + (0.25 * s_eff));
};

const INITIAL_RUNS_DATA = [
  {
    id: 'run-oct-07-2026',
    date: 'Oct 07, 2026',
    title: "🔥 Latest Outdoor Run (5.66 km • Apple Watch AutoSync • Week 3 Consolidation Complete)",
    distanceKm: 5.66,
    durationMin: 62.5,
    paceStr: '11:02 min/km',
    paceVal: 11.04,
    avgHr: 113,
    maxHr: 127,
    powerWatts: 123,
    zone2Percent: 91,
    fatBurnGrams: 29.5,
    carbBurnGrams: 16.5,
    mitoScore: 99,
    hrDriftPercent: 3.3,
    lthrMargin: '-22 BPM',
    note: 'Week 3 Consolidation Run 3: 5.66 km in 1:02:30 • 113 BPM Avg HR (Pure Zone 2) • 127 BPM Max • 123W • 0.804 m/beat • 7,492 steps • 334 kcal • 63.7m Elev Gain • AutoSync'
  },
  {
    id: 'run-oct-04-2026',
    date: 'Oct 04, 2026',
    title: "Outdoor Run (5.16 km • Apple Watch AutoSync • Week 3 Consolidation)",
    distanceKm: 5.16,
    durationMin: 58.4,
    paceStr: '11:18 min/km',
    paceVal: 11.31,
    avgHr: 116,
    maxHr: 141,
    powerWatts: 121,
    zone2Percent: 88,
    fatBurnGrams: 27.1,
    carbBurnGrams: 15.2,
    mitoScore: 98,
    hrDriftPercent: 3.5,
    lthrMargin: '-19 BPM',
    note: 'Week 3 Consolidation Run 2: 5.16 km in 58:23 • 116 BPM Avg HR (Zone 2 FATmax) • 141 BPM Max • 121W • 7,945 steps (136 SPM) • 305 kcal • 56.7m Elev Gain • AutoSync'
  },
  {
    id: 'run-oct-01-2026',
    date: 'Oct 01, 2026',
    title: "Outdoor Run (4.77 km • Apple Watch AutoSync • Deload Run 1)",
    distanceKm: 4.77,
    durationMin: 53.9,
    paceStr: '11:18 min/km',
    paceVal: 11.31,
    avgHr: 114,
    maxHr: 131,
    powerWatts: 118,
    zone2Percent: 88,
    fatBurnGrams: 28.5,
    carbBurnGrams: 10.2,
    mitoScore: 98,
    hrDriftPercent: 3.4,
    lthrMargin: '-21 BPM',
    note: 'Week 3 Deload & Consolidation: 4.77 km in 53:56 • 114 BPM Avg HR (Exact FATmax Corridor) • 131 BPM Max • 118W • 0.776 m/beat • AutoSync'
  },
  {
    id: 'run-sep-28-2026',
    date: 'Sep 28, 2026',
    title: "Outdoor Run (7.59 km • Apple Watch AutoSync • Distance Record 🏆)",
    distanceKm: 7.59,
    durationMin: 88.2,
    paceStr: '11:36 min/km',
    paceVal: 11.61,
    avgHr: 114,
    maxHr: 127,
    powerWatts: 118,
    zone2Percent: 91,
    fatBurnGrams: 44.5,
    carbBurnGrams: 16.8,
    mitoScore: 99,
    hrDriftPercent: 3.2,
    lthrMargin: '-21 BPM',
    note: 'New All-Time Distance Record! 7.59 km in 1:28:09 • 114 BPM Avg HR (Pure Zone 2) • 127 BPM Max • 118W • 0.755 m/beat • 11,936 steps • AutoSync'
  },
  {
    id: 'run-sep-25-2026',
    date: 'Sep 25, 2026',
    title: "Outdoor Run (6.49 km • Apple Watch AutoSync)",
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
    mitoScore: 98,
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
    mitoScore: 87,
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
    mitoScore: 89,
    hrDriftPercent: 4.1,
    lthrMargin: '-18 BPM',
    note: 'Distance Record: 7.11 km in 1:24:12 • 117 BPM Avg HR • 112W • 452 kcal • High aerobic volume: 7.11 km at 117 BPM • AutoSync'
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
    mitoScore: 88,
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
    mitoScore: 96,
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
    mitoScore: 97,
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
    mitoScore: 97,
    hrDriftPercent: 3.9,
    lthrMargin: '-21 BPM',
    note: '6.46 km in 78.3 mins • 114 BPM Avg HR • 92% Zone 2 • Low HR within target corridor • AutoSync'
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
    mitoScore: 94,
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
    zone2Percent: null,
    fatBurnGrams: null,
    carbBurnGrams: null,
    mitoScore: null,
    hrDriftPercent: null,
    lthrMargin: '0 BPM (LTHR 135)',
    note: 'Wingate Institute Clinical Test — Lactate & Health: LTHR 135 BPM @ 7.2 km/h • Zone 2 Base Limit: ≤120 BPM • VO₂ Peak: 34.1 ml/kg/min'
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
    mitoScore: 99,
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
    mitoScore: 94,
    hrDriftPercent: 5.8,
    lthrMargin: '-13 BPM',
    note: 'Initial Baseline: 119 BPM Avg HR • Cardiac Cost: 1,372 beats/km • 0.729 m/beat'
  }
];

export default function RunImprovementsTable({ prevPage, nextPage, setPage } = {}) {
  const tableContainerRef = useRef(null);
  const topScrollContainerRef = useRef(null);
  const [tableScrollWidth, setTableScrollWidth] = useState(1400);

  const [runs, setRuns] = useState(() => {
    const saved = localStorage.getItem('optimus_ishai_runs_v4');
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
          if (!mapped.some(r => r.id === 'run-oct-07-2026')) {
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

  // Sync scroll width dynamically between top scrollbar and table
  useEffect(() => {
    const updateScrollWidth = () => {
      if (tableContainerRef.current) {
        setTableScrollWidth(tableContainerRef.current.scrollWidth);
      }
    };
    updateScrollWidth();
    const timer = setTimeout(updateScrollWidth, 150);
    window.addEventListener('resize', updateScrollWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScrollWidth);
    };
  }, [runs]);

  // Synchronized scroll handlers
  const handleTableScroll = (e) => {
    if (topScrollContainerRef.current && Math.abs(topScrollContainerRef.current.scrollLeft - e.target.scrollLeft) > 1) {
      topScrollContainerRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  const handleTopScroll = (e) => {
    if (tableContainerRef.current && Math.abs(tableContainerRef.current.scrollLeft - e.target.scrollLeft) > 1) {
      tableContainerRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  const scrollTableBy = (delta) => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({ left: delta, behavior: 'smooth' });
    }
  };

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
  const highestZone2 = Math.max(...runs.map(r => r.zone2Percent || 0));
  const maxFatBurn = Math.max(...runs.map(r => r.fatBurnGrams || 0));
  const outdoorRunsWithMito = runs.filter(r => r.mitoScore != null);
  const avgMitoScore = outdoorRunsWithMito.length 
    ? Math.round(outdoorRunsWithMito.reduce((acc, r) => acc + r.mitoScore, 0) / outdoorRunsWithMito.length) 
    : 95;

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

              {/* Direct Page Movement Toggle at Top of Page 28 */}
              {prevPage && nextPage && (
                <div className="inline-flex items-center bg-white/10 hover:bg-white/15 border border-white/20 rounded-full p-0.5 shadow-2xs transition">
                  <button
                    onClick={prevPage}
                    className="p-1 px-2.5 hover:bg-white/20 text-white transition flex items-center gap-1 font-bold text-[11px] rounded-full"
                    title="Move to Previous Page (Page 27)"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Page 27</span>
                  </button>
                  <span className="px-2 text-[10px] font-mono font-bold text-emerald-200 border-x border-white/20">
                    28
                  </span>
                  <button
                    onClick={nextPage}
                    className="p-1 px-2.5 hover:bg-white/20 text-white transition flex items-center gap-1 font-bold text-[11px] rounded-full"
                    title="Move to Next Page (Page 29)"
                  >
                    <span>Page 29</span>
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
                  </button>
                </div>
              )}

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
              Tracking longitudinal performance and physiological-response patterns across continuous workouts. Solves the central aerobic question: 
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
                Aerobic Efficiency Index = Distance-Per-Heartbeat
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
              Measured: Distance • Pace • Heart Rate | Device-Estimated: Running Power
            </div>
            <p className="text-[11px] text-stone-600 leading-snug">
              Direct empirical telemetry captured by Apple Watch Ultra optical photoplethysmography and dual-frequency GPS (running power is device-estimated via biomechanical accelerometer models).
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
              {metersPerBeatDelta >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              <span>{metersPerBeatDelta >= 0 ? `+${((metersPerBeatDelta/prevMetersPerBeat)*100).toFixed(1)}%` : `${((metersPerBeatDelta/prevMetersPerBeat)*100).toFixed(1)}%`} vs {getShortDate(previousRun.date)} ({prevMetersPerBeat.toFixed(3)} → {latestMetersPerBeat.toFixed(3)} m/beat)</span>
            </p>
            <div className="text-[10px] text-stone-500 leading-tight pt-1 border-t border-stone-100">
              Aerobic Efficiency Index = Distance-per-heartbeat metric. May reflect improved cardiovascular efficiency when conditions are comparable; represents more distance covered per recorded heartbeat.
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
              Mathematical inverse of Distance/Beat (1,000 ÷ m/beat). Expresses the identical ground-speed-to-heart-rate ratio in total heartbeats required to travel 1,000 meters.
            </div>
          </div>

          {/* Card 3: Pace at Standard Base HR */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2 hover:border-emerald-300 transition">
            <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <span>3. Pace at Optimus Aerobic HR</span>
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
              Measured pace achieved within the Optimus training corridor of 105–117 BPM, selected within the laboratory-derived aerobic range (limit ≤120 BPM).
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
              <CheckCircle2 className="w-3.5 h-3.5" /> Minimal cardiac drift across {latestRun.durationMin.toFixed(0)} min
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
              <Sparkles className="w-3.5 h-3.5" /> {((latestRun.durationMin * (latestRun.zone2Percent || 85)) / 100).toFixed(1)} min strictly inside Zone 2 corridor
            </p>
            <div className="text-[10px] text-stone-500 leading-tight pt-1 border-t border-stone-100">
              Maintains the planned aerobic-intensity corridor and contributes to the model-based estimate of substrate utilization.
            </div>
          </div>

          {/* Card 6: Mitochondrial Adaptation Proxy — MODELLED */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2 hover:border-purple-300 transition">
            <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <span>6. Mitochondrial Adaptation Proxy (Modelled)</span>
                <MetabolicTierBadge tier="modeled" size="xs" />
              </span>
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-stone-900 font-mono">
              {latestRun.mitoScore} <span className="text-xs font-sans font-bold text-purple-700">— MODELLED PROXY</span>
            </div>
            <p className="text-[11px] text-purple-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Mitochondrial Adaptation Proxy (Modelled) — NOT DIRECTLY MEASURED
            </p>
            <div className="text-[10px] text-stone-500 leading-tight pt-1 border-t border-stone-100">
              Composite Proxy Index (0–100). Weighted model integrating normalized component scores: 40% HR-drift resistance, 35% Zone 2 corridor adherence, and 25% pace-to-heart-rate efficiency. Does not directly measure mitochondrial function.
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
                * Note: This card specifically compares a 3-day acute window (Oct 07 vs. Oct 04). Your true chronic adaptation is demonstrated across the full July–October longitudinal dataset in the master table below.
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
                {paceDelta <= 0 ? <ArrowDownRight className="w-3 h-3 text-emerald-700" /> : <ArrowUpRight className="w-3 h-3 text-emerald-700" />}
                <span>{paceDelta <= 0 ? `${Math.abs(Math.round(paceDelta * 60))} sec/km (faster)` : `+${Math.round(paceDelta * 60)} sec/km (steady)`}</span>
              </div>
            </div>
            <div className="text-[10px] text-stone-500 pt-0.5">{paceDelta <= 0 ? 'Faster pace' : 'Controlled Zone 2 pace'}</div>
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

          {/* Card 6: Mito Proxy */}
          <div className="p-3.5 rounded-xl bg-white border border-emerald-200 flex flex-col justify-between space-y-1.5 shadow-2xs">
            <div className="text-[11px] text-stone-500 font-bold flex items-center justify-between">
              <span>Mito Proxy</span>
              <MetabolicTierBadge tier="modeled" size="xs" />
            </div>
            <div className="space-y-1">
              <div className="text-base sm:text-lg font-black text-stone-900 font-mono">
                {latestRun.mitoScore}
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded">
                <ArrowUpRight className="w-3 h-3 text-emerald-700" />
                <span>+{mitoDelta} pts vs Sep 22</span>
              </div>
            </div>
            <div className="text-[10px] text-stone-500 pt-0.5">Model-derived proxy</div>
          </div>

        </div>
      </div>

      {/* 6. MAIN CHRONOLOGICAL WORKOUT LOG */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div>
            <h3 className="text-xl font-black text-stone-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-700" />
              <span>Longitudinal Exercise Dataset (12 Runs + 1 Clinical Test)</span>
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              Every run is evaluated chronologically; the Sep 1 clinical test is retained as a laboratory reference point and is not directly comparable to outdoor training sessions.
            </p>
          </div>
          
          <button
            onClick={() => {
              const saved = localStorage.getItem('optimus_ishai_runs_v4') || localStorage.getItem('optimus_ishai_runs_v3');
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

        {/* Top Horizontal Scrollbar Track & Scroll Toggle Navigation */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 space-y-2 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-extrabold text-xs border border-emerald-300">
                ↔️ Table Scroll Toggle
              </span>
              <span className="text-xs text-stone-600 font-medium">
                Scroll horizontally to view all metric columns
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollTableBy(-320)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-200 text-stone-800 text-xs font-bold border border-stone-300 shadow-2xs transition cursor-pointer"
                title="Scroll Table Left"
              >
                <ChevronLeft className="w-4 h-4 text-emerald-700" />
                <span>Scroll Left</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTableBy(320)}
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition cursor-pointer"
                title="Scroll Table Right"
              >
                <span>Scroll Right</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Synchronized Top Horizontal Scrollbar Track */}
          <div
            ref={topScrollContainerRef}
            onScroll={handleTopScroll}
            className="overflow-x-auto overflow-y-hidden rounded-lg bg-stone-200/90 border border-stone-300 shadow-inner"
            style={{ height: '22px' }}
          >
            <div style={{ width: `${tableScrollWidth}px`, height: '1px' }} />
          </div>
        </div>

        {/* Scrollable Table */}
        <div 
          ref={tableContainerRef}
          onScroll={handleTableScroll}
          className="overflow-x-auto"
        >
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
                    <span>Mito Proxy</span>
                    <span className="select-none"><MetabolicTierBadge tier="modeled" size="xs" /></span>
                  </span>
                </th>
                <th className="py-3.5 px-4 rounded-r-xl whitespace-nowrap">Physiological Insight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              {runs.map((run, idx) => {
                const isFirst = idx === 0;
                const runMetersPerBeat = calcMetersPerBeat(run.paceVal, run.avgHr);
                const currentCost = calcCardiacCost(run.paceVal, run.avgHr);

                return (
                  <tr 
                    key={run.id || idx}
                    className={`hover:bg-stone-50/80 transition ${
                      isFirst ? 'bg-emerald-50/40 font-semibold' : ''
                    }`}
                  >
                    
                    {/* Date & Title */}
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-stone-900">
                        {run.date}{isFirst ? ' — Latest ⭐' : ''}
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
                    <td className="py-3.5 px-4 font-mono font-bold text-stone-900 text-sm whitespace-nowrap">
                      {run.avgHr} BPM
                    </td>

                    {/* Distance per Heartbeat (m/beat) */}
                    <td className="py-3.5 px-4 bg-emerald-50/40 font-mono font-black text-emerald-950 text-sm whitespace-nowrap">
                      {runMetersPerBeat.toFixed(3)} <span className="text-[10px] text-emerald-700 font-sans font-semibold">m/beat</span>
                    </td>

                    {/* Cardiac Cost Index (beats/km) */}
                    <td className="py-3.5 px-4 font-mono font-bold text-stone-900 text-sm whitespace-nowrap">
                      {currentCost.toLocaleString()} <span className="text-[10px] text-stone-500 font-sans font-normal">beats/km</span>
                    </td>

                    {/* Zone 2 Compliance */}
                    <td className="py-3.5 px-4">
                      {run.zone2Percent != null ? (
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200">
                            <div 
                              className="bg-emerald-600 h-full rounded-full" 
                              style={{ width: `${Math.min(run.zone2Percent, 100)}%` }} 
                            />
                          </div>
                          <span className="font-extrabold text-stone-900 font-mono">{run.zone2Percent}%</span>
                        </div>
                      ) : (
                        <span className="text-xs text-stone-400 font-mono font-semibold">N/A</span>
                      )}
                    </td>

                    {/* Estimated Fat Oxidation */}
                    <td className="py-3.5 px-4 font-bold text-amber-900 font-mono">
                      {run.fatBurnGrams != null ? (
                        <>{run.fatBurnGrams}g <span className="text-[10px] font-sans font-normal text-stone-500">est.</span></>
                      ) : (
                        <span className="text-xs text-stone-400 font-mono font-semibold">N/A</span>
                      )}
                    </td>

                    {/* Modeled Mito Index */}
                    <td className="py-3.5 px-4">
                      {run.mitoScore != null ? (
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
                      ) : (
                        <span className="px-2 py-0.5 rounded-lg font-mono font-semibold text-xs text-stone-400 bg-stone-100 border border-stone-200">
                          N/A
                        </span>
                      )}
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
            * <strong>Mitochondrial Adaptation Proxy (Modelled):</strong> A longitudinal model-based indicator. It does not directly measure mitochondrial function or cellular respiration.
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
            <h4 className="text-xs sm:text-sm font-bold tracking-wide text-purple-200 font-mono">
              Mitochondrial Adaptation Proxy (Modelled): 98
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
                <strong>Speed ÷ Heart Rate. </strong>Helps assess whether you run faster at the same heart rate or at a lower heart rate at the same speed.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Cardiac Cost Index (beats/km)</span>
                <MetabolicTierBadge tier="calculated" size="xs" />
              </div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                <strong>Average HR × Pace. </strong>Mathematical inverse of Distance/Beat (1,000 ÷ m/beat). While derived from the same underlying pace-to-heart-rate relationship, expressing it as heartbeats per kilometer provides an intuitive gauge of cardiac workload over a fixed distance.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Pace at Optimus Aerobic HR</span>
                <MetabolicTierBadge tier="measured" label="MEASURED RELATIONSHIP" size="xs" />
              </div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                <strong>Pace achieved within 105–117 BPM. </strong>Measured pace achieved within the Optimus training corridor of 105–117 BPM, selected within the laboratory-derived aerobic range (limit ≤120 BPM).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">HR Drift (Decoupling)</span>
                <MetabolicTierBadge tier="calculated" size="xs" />
              </div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                <strong>1st Half vs 2nd Half HR. </strong>Evaluates cardiovascular decoupling over 60–80+ minutes. Drift &lt;5% is classified by this model as low cardiac drift.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Zone 2 Consistency</span>
                <MetabolicTierBadge tier="measured" size="xs" />
              </div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                <strong>% Duration in Target. </strong>Tracks the percentage of the workout performed within the predefined aerobic-intensity corridor.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Mitochondrial Adaptation Proxy (Modelled)</span>
                <MetabolicTierBadge tier="modeled" size="xs" />
              </div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                <strong>Composite Proxy Index (0–100). </strong>Weighted model integrating normalized component scores: 40% HR-drift resistance, 35% Zone 2 corridor adherence, and 25% pace-to-heart-rate efficiency.
              </p>
              <div className="text-[10px] text-stone-300 bg-black/25 p-2 rounded-lg font-mono space-y-0.5 mt-1 border border-white/10">
                <div className="text-emerald-300 font-bold mb-0.5">Component Normalization Formulas:</div>
                <div>• HR-Drift Score: min(100, round(105 - (Drift% × 2))) [3.6% drift → 98 / 100]</div>
                <div>• Corridor Adherence: min(100, round((Corridor Duration % / 90) × 100)) [88% in corridor → 98 / 100]</div>
                <div>• Efficiency Score: min(100, round((Distance/Beat ÷ 0.720 m/beat) × 90)) [0.780 m/beat → 98 / 100]</div>
                <div className="text-white font-bold pt-0.5 border-t border-white/10">Composite: (0.40 × 98) + (0.35 × 98) + (0.25 × 98) = 98.0 → 98 / 100</div>
              </div>
              <p className="text-[10px] text-stone-400 italic pt-1 leading-normal font-sans">
                Reference values and weighting coefficients are model-defined parameters for longitudinal tracking; they are not universal physiological thresholds. Applied consistently across the 12 outdoor runs; the clinical test serves as a laboratory reference point.
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
              <strong className="text-white inline font-bold mr-1">1. Ambient Temperature & Heat:</strong>{' '}
              Hot weather elevates heart rate via cutaneous vasodilation. Ambient temperature and humidity are recognized as potential confounders and should be considered when comparing runs.
            </div>
            <div>
              <strong className="text-white inline font-bold mr-1">2. Course Gradient & Elevation:</strong>{' '}
              Grade changes alter metabolic cost. Route elevation and grade changes are treated as potential confounders across training courses.
            </div>
            <div>
              <strong className="text-white inline font-bold mr-1">3. Acute vs. Longitudinal Adaptations:</strong>{' '}
              A 3-day window demonstrates acute day-to-day performance differences; true chronic cellular adaptation is evaluated across your complete July–October longitudinal dataset (13+ outdoor runs + Wingate clinical baseline).
            </div>
          </div>
        </div>

      </div>

    </article>
  );
}
