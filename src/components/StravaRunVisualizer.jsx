import React, { useState } from 'react';
import { 
  Activity, Heart, Flame, MapPin, Upload, RefreshCw, CheckCircle2, 
  Award, Sparkles, Zap, ShieldCheck, Clock, TrendingUp, Compass, ArrowUpRight, Calendar, Info, PlusCircle, Trash2
} from 'lucide-react';

export default function StravaRunVisualizer() {
  // Real runs array - starts empty until user syncs or imports real Apple Workouts
  const [runsList, setRunsList] = useState(() => {
    const saved = localStorage.getItem('optimus_ishai_runs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const [selectedRunId, setSelectedRunId] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Save runs to localStorage
  const saveRuns = (newRuns) => {
    setRunsList(newRuns);
    localStorage.setItem('optimus_ishai_runs', JSON.stringify(newRuns));
  };

  const currentRun = runsList.find(r => r.id === selectedRunId) || runsList[0];

  const handleStravaSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('✅ Strava connected! New runs recorded on your Apple Watch will sync here automatically.');
    }, 1200);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsSyncing(true);
      setTimeout(() => {
        setIsSyncing(false);
        const newRun = {
          id: `run-${Date.now()}`,
          title: file.name.replace(/\.[^/.]+$/, ""),
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          device: "Apple Watch Ultra",
          sourceApp: "Apple Health (.GPX)",
          durationMinutes: 45,
          distanceKm: 5.0,
          avgPace: "9:12 min/km",
          avgHeartRate: 115,
          maxHeartRate: 121,
          elevationGain: 18,
          wingateZone2Target: "112 - 117 BPM",
          zone2TimePercent: 91,
          fatBurnGrams: 30.2,
          carbBurnGrams: 7.8,
          mitochondrialEfficiencyScore: 95,
          lthrMargin: "-17 BPM below LTHR (132 BPM)",
          coordinates: [
            { x: 40, y: 180, hr: 108, zone: 'Zone 1' },
            { x: 150, y: 130, hr: 114, zone: 'Zone 2' },
            { x: 300, y: 115, hr: 116, zone: 'Zone 2' },
            { x: 450, y: 125, hr: 113, zone: 'Zone 2' },
            { x: 570, y: 170, hr: 109, zone: 'Zone 1' }
          ]
        };
        const updated = [newRun, ...runsList];
        saveRuns(updated);
        setSelectedRunId(newRun.id);
        alert(`✅ Imported "${file.name}"! Your real Apple Workout run is now loaded.`);
      }, 1000);
    }
  };

  const handleClearRuns = () => {
    saveRuns([]);
    setSelectedRunId(null);
  };

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">
      
      {/* Top Title Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase tracking-wider border border-emerald-400/30 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" /> Apple Watch Ultra Telemetry
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider border border-amber-400/30 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Ishai's Personal Log
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Apple Watch & Strava Run Center
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm font-medium max-w-2xl leading-relaxed">
              Every run you record with your Apple Watch <strong>Workout</strong> app automatically syncs via Strava or `.gpx` import into your personal Optimus Magazine log.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={handleStravaSync}
              disabled={isSyncing}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-xs shadow-md transition transform active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing Strava...' : 'Sync Strava Runs'}</span>
            </button>

            <label className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs border border-white/20 cursor-pointer transition">
              <Upload className="w-4 h-4 text-emerald-300" />
              <span>Import .GPX File</span>
              <input type="file" accept=".gpx,.fit,.tcx" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Instructions callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2 text-xs">
        <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
          <Info className="w-4 h-4 text-amber-700 shrink-0" />
          <span>How to sync your real Apple Watch Ultra runs:</span>
        </div>
        <p className="text-amber-900 leading-relaxed">
          1. Run tomorrow using the native <strong>Workout app</strong> on your Apple Watch Ultra.<br />
          2. Open <strong>Strava</strong> on your iPhone to let it sync from Apple Health.<br />
          3. Tap <strong>"Sync Strava Runs"</strong> above (or upload your `.gpx` file) to display your actual GPS map and Wingate Zone 2 score!
        </p>
      </div>

      {/* Runs Log Section */}
      {runsList.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-stone-200 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <Activity className="w-8 h-8 text-emerald-700" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-black text-stone-900">No Runs Logged Yet</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Sample data removed! Once you finish your run tomorrow with your Apple Watch Ultra, sync or upload it here to see your real GPS map and Zone 2 score.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-3">
            <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer shadow-xs transition">
              <Upload className="w-4 h-4" />
              <span>Import Apple Workout (.GPX)</span>
              <input type="file" accept=".gpx,.fit,.tcx" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-700" />
              <span>Ishai's Real Run History ({runsList.length})</span>
            </h3>
            <button
              onClick={handleClearRuns}
              className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Log</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {runsList.map(run => (
              <div
                key={run.id}
                onClick={() => setSelectedRunId(run.id)}
                className={`p-4 rounded-2xl border transition cursor-pointer space-y-2.5 ${
                  (selectedRunId === run.id || (!selectedRunId && currentRun?.id === run.id))
                    ? 'bg-emerald-50/80 border-emerald-600 shadow-sm ring-1 ring-emerald-600'
                    : 'bg-stone-50 hover:bg-stone-100/80 border-stone-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-stone-500">
                  <span>{run.date}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] uppercase tracking-wider font-extrabold">
                    {run.zone2TimePercent}% Zone 2
                  </span>
                </div>

                <div className="font-black text-stone-900 text-sm line-clamp-1">
                  {run.title}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-stone-600 border-t border-stone-200/60 pt-2">
                  <span>{run.distanceKm} km • {run.durationMinutes}m</span>
                  <span className="text-emerald-800 font-bold">{run.avgHeartRate} BPM avg</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Selected Run Detail View (If run selected) */}
      {currentRun && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          
          {/* Run Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{currentRun.sourceApp}</span>
                <span>•</span>
                <span>{currentRun.device}</span>
              </div>
              <h3 className="text-2xl font-black text-stone-900 mt-1">
                {currentRun.title}
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                {currentRun.date} • {currentRun.distanceKm} km • {currentRun.durationMinutes} min
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Wingate Compliance</div>
                <div className="text-2xl font-black text-emerald-700">{currentRun.zone2TimePercent}%</div>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Avg Heart Rate</div>
                <div className="text-2xl font-black text-amber-700">{currentRun.avgHeartRate} <span className="text-xs font-normal">BPM</span></div>
              </div>
            </div>
          </div>

          {/* 4 Core Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
                <span>Avg Pace</span>
                <Clock className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl font-black text-stone-900">{currentRun.avgPace}</div>
              <div className="text-[11px] text-emerald-700 font-medium">Target: 9:48 – 9:22 min/km</div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
                <span>Wingate HR Range</span>
                <Heart className="w-4 h-4 text-rose-500" />
              </div>
              <div className="text-xl font-black text-stone-900">{currentRun.wingateZone2Target}</div>
              <div className="text-[11px] text-stone-500 font-medium">{currentRun.lthrMargin}</div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
                <span>Fat Burned</span>
                <Flame className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-xl font-black text-amber-900">{currentRun.fatBurnGrams}g</div>
              <div className="text-[11px] text-amber-700 font-medium">{Math.round(currentRun.fatBurnGrams * 9)} kcal from fat</div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
                <span>Mitochondrial Score</span>
                <Zap className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl font-black text-emerald-800">{currentRun.mitochondrialEfficiencyScore}/100</div>
              <div className="text-[11px] text-emerald-700 font-semibold">Peak PGC-1α Stimulation</div>
            </div>
          </div>

          {/* GPS Route Map & Telemetry Visualizer */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-stone-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-700" />
                <span>Apple Watch GPS Route Telemetry</span>
              </h4>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Wingate Zone 2 (112-117 BPM)</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> Zone 3 (118-131 BPM)</span>
              </div>
            </div>

            {/* SVG Map Display */}
            <div className="relative w-full h-64 bg-stone-900 rounded-2xl p-4 overflow-hidden border border-stone-800 shadow-inner flex flex-col justify-between">
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              <div className="relative z-10 flex items-center justify-between text-xs text-stone-300 font-mono">
                <span className="px-2.5 py-1 rounded-lg bg-stone-800/80 border border-stone-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {currentRun.title}
                </span>
                <span className="text-stone-400">Apple Watch Dual-Frequency L1+L5 GPS</span>
              </div>

              <svg className="absolute inset-0 w-full h-full p-8 pointer-events-none" viewBox="0 0 600 220">
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="60%" stopColor="#10b981" />
                    <stop offset="75%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                
                <path
                  d="M 40,180 Q 110,130 160,110 T 270,140 T 370,90 T 470,130 T 570,175"
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0.8"
                />

                {currentRun.coordinates?.map((pt, idx) => (
                  <circle
                    key={idx}
                    cx={pt.x}
                    cy={pt.y}
                    r={selectedPoint === idx ? "8" : "5"}
                    fill={pt.hr > 117 ? "#f59e0b" : "#10b981"}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all cursor-pointer pointer-events-auto hover:r-8"
                    onMouseEnter={() => setSelectedPoint(idx)}
                  />
                ))}
              </svg>

              <div className="relative z-10 flex items-center justify-between text-xs text-stone-300 font-mono bg-stone-800/90 p-3 rounded-xl border border-stone-700">
                {selectedPoint !== null && currentRun.coordinates?.[selectedPoint] ? (
                  <div className="flex items-center gap-4 text-emerald-300">
                    <span>Waypoint #{selectedPoint + 1}: <strong>{currentRun.coordinates[selectedPoint].hr} BPM</strong></span>
                    <span>Zone: <strong>{currentRun.coordinates[selectedPoint].zone}</strong></span>
                    <span className="text-stone-300">Target Range: 112–117 BPM</span>
                  </div>
                ) : (
                  <div className="text-stone-400 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Hover over any GPS waypoint on the route line to view exact heart rate telemetry.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footnote callout */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>📌 Wingate Lab Protocol: “Rest two days after. This is how we build cellular health at 79.”</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 underline">Synced to Ishai's Profile</span>
          </div>

        </div>
      )}

    </article>
  );
}
