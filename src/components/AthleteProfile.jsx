import React, { useState, useEffect } from 'react';
import { 
  User, Activity, Heart, Flame, Zap, ShieldCheck, Award, 
  RotateCcw, Sliders, CheckCircle2, BookOpen, Clock, BatteryCharging, TrendingUp, Sparkles 
} from 'lucide-react';

const DEFAULT_PROFILE = {
  name: 'Ishai Pesok',
  age: 38,
  restingHR: 62,
  maxHR: 182,
  targetMinHR: 126,
  targetMaxHR: 140,
  weeklyGoalHours: 3.5,
};

export default function AthleteProfile() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('optimus_ishai_profile');
    if (saved) {
      try { return { ...DEFAULT_PROFILE, ...JSON.parse(saved) }; } catch (e) { return DEFAULT_PROFILE; }
    }
    return DEFAULT_PROFILE;
  });

  const [isEditing, setIsEditing] = useState(false);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('optimus_ishai_profile', JSON.stringify(profile));
  }, [profile]);

  // Calculations based on Karvonen / Bioenergetics models
  const hrReserve = profile.maxHR - profile.restingHR;
  const calculatedZone2Low = Math.round(profile.restingHR + (hrReserve * 0.60));
  const calculatedZone2High = Math.round(profile.restingHR + (hrReserve * 0.70));

  const averageZone2HR = Math.round((profile.targetMinHR + profile.targetMaxHR) / 2);
  
  // Estimated metrics at target average HR
  const estimatedFatGramsPerMin = (0.62 * (averageZone2HR / 135)).toFixed(2);
  const estimatedFatKcalPerHour = Math.round(estimatedFatGramsPerMin * 60 * 9);
  const weeklyFatKcalTotal = Math.round(estimatedFatKcalPerHour * profile.weeklyGoalHours);
  const weeklyFatGramsTotal = Math.round(estimatedFatGramsPerMin * 60 * profile.weeklyGoalHours);
  const mitochondrialScore = Math.min(100, Math.round((profile.weeklyGoalHours / 4.0) * 100));

  const handleReset = () => {
    setProfile(DEFAULT_PROFILE);
    localStorage.removeItem('optimus_ishai_profile');
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans text-stone-900">

      {/* Profile Header Hero */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-200 p-1 shadow-md shrink-0 flex items-center justify-center text-emerald-950 font-black text-2xl">
              <User className="w-10 h-10 text-emerald-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
                  Personal Bioenergetics Profile
                </span>
                <span className="flex items-center gap-1 text-xs text-stone-300 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Synced to Local Device
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                {profile.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 font-medium mt-0.5">
                Zone 2 Target: <strong className="text-emerald-300">{profile.targetMinHR} – {profile.targetMaxHR} BPM</strong> • FATmax Sweet Spot
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition ${
                isEditing 
                  ? 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400' 
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>{isEditing ? 'Done Editing' : 'Customize My Numbers'}</span>
            </button>

            {isEditing && (
              <button
                onClick={handleReset}
                title="Reset to defaults"
                className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-xs transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Editing Controls Drawer */}
      {isEditing && (
        <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-6 space-y-6 shadow-xs animate-fade-in">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
            <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
              <Sliders className="w-4 h-4 text-emerald-700" />
              <span>Personal Parameter Customizer</span>
            </div>
            <span className="text-xs text-stone-500">Changes save automatically to your device</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Resting Heart Rate (BPM)</label>
              <input
                type="number"
                value={profile.restingHR}
                onChange={(e) => setProfile({ ...profile, restingHR: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-sm font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Max Heart Rate (BPM)</label>
              <input
                type="number"
                value={profile.maxHR}
                onChange={(e) => setProfile({ ...profile, maxHR: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-sm font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Min Zone 2 HR (BPM)</label>
              <input
                type="number"
                value={profile.targetMinHR}
                onChange={(e) => setProfile({ ...profile, targetMinHR: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-sm font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Max Zone 2 HR (BPM)</label>
              <input
                type="number"
                value={profile.targetMaxHR}
                onChange={(e) => setProfile({ ...profile, targetMaxHR: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-sm font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-emerald-900 font-medium">
            <span>Formula Calculated Zone 2 (Karvonen 60%-70% HRR): <strong>{calculatedZone2Low} – {calculatedZone2High} BPM</strong></span>
          </div>
        </div>
      )}

      {/* 4 Metric Live Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="magazine-card p-5 space-y-2 border border-emerald-200/80 bg-white">
          <div className="flex items-center justify-between text-emerald-800">
            <span className="text-xs font-bold uppercase tracking-wider">Target HR Range</span>
            <Heart className="w-5 h-5 text-emerald-600 fill-emerald-100" />
          </div>
          <div className="text-2xl font-black text-stone-900">
            {profile.targetMinHR} – {profile.targetMaxHR} <span className="text-sm font-semibold text-stone-500">BPM</span>
          </div>
          <p className="text-xs text-stone-600">
            Optimal range where fat oxidation is maximized and blood lactate stays &le; 2.0 mmol/L.
          </p>
        </div>

        <div className="magazine-card p-5 space-y-2 border border-amber-200/80 bg-white">
          <div className="flex items-center justify-between text-amber-800">
            <span className="text-xs font-bold uppercase tracking-wider">FATmax Rate</span>
            <Flame className="w-5 h-5 text-amber-600 fill-amber-100" />
          </div>
          <div className="text-2xl font-black text-stone-900">
            {estimatedFatGramsPerMin} <span className="text-sm font-semibold text-stone-500">g/min</span>
          </div>
          <p className="text-xs text-stone-600">
            ~{estimatedFatKcalPerHour} kcal/hr burned purely from stored lipid (fatty acid) stores.
          </p>
        </div>

        <div className="magazine-card p-5 space-y-2 border border-teal-200/80 bg-white">
          <div className="flex items-center justify-between text-teal-800">
            <span className="text-xs font-bold uppercase tracking-wider">Weekly Target</span>
            <Clock className="w-5 h-5 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-stone-900">
            {profile.weeklyGoalHours} <span className="text-sm font-semibold text-stone-500">hrs/week</span>
          </div>
          <p className="text-xs text-stone-600">
            Yields ~{weeklyFatGramsTotal}g fat burn and ~{weeklyFatKcalTotal} kcal from Zone 2 training.
          </p>
        </div>

        <div className="magazine-card p-5 space-y-2 border border-emerald-200/80 bg-white">
          <div className="flex items-center justify-between text-emerald-800">
            <span className="text-xs font-bold uppercase tracking-wider">Mito Biogenesis</span>
            <BatteryCharging className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">
            {mitochondrialScore}% <span className="text-sm font-semibold text-stone-500">Stimulus</span>
          </div>
          <p className="text-xs text-stone-600">
            Optimal PGC-1&alpha; activation for mitochondrial density expansion.
          </p>
        </div>

      </div>

      {/* Visual Substrate Breakdown & Weekly Goal Slider */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Fuel Ratio Gauge Card */}
        <div className="magazine-card p-6 space-y-4 border border-stone-200 bg-white">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center gap-2 font-bold text-stone-900">
              <Zap className="w-4 h-4 text-emerald-700" />
              <span>Fuel Source Substrate Breakdown at {averageZone2HR} BPM</span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800">82% Fat / 18% Carb</span>
          </div>

          <div className="space-y-3">
            <div className="h-6 rounded-xl bg-stone-100 overflow-hidden flex p-1 border border-stone-200">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-l-lg transition-all duration-500 flex items-center justify-center text-[10px] font-black text-white" style={{ width: '82%' }}>
                FAT (82%)
              </div>
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-r-lg transition-all duration-500 flex items-center justify-center text-[10px] font-black text-white" style={{ width: '18%' }}>
                CARB (18%)
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-900 block">Fat Oxidation Efficiency</span>
                <span className="text-stone-600 block">High mitochondrial density enables sustained lipid energy production without glycogen depletion.</span>
              </div>
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 space-y-1">
                <span className="font-bold text-amber-900 block">Lactate Clearance</span>
                <span className="text-stone-600 block">Minimal glycolytic flux (&lt; 2.0 mmol/L) allows MCT-1 transporters to recycle lactate efficiently.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Goal Interactive Adjuster */}
        <div className="magazine-card p-6 space-y-4 border border-stone-200 bg-white">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center gap-2 font-bold text-stone-900">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>Weekly Zone 2 Target Hours</span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800">{profile.weeklyGoalHours} Hours / Week</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-stone-600 font-medium">
                <span>1 hr/wk (Baseline)</span>
                <span>3.5 hrs/wk (Recommended)</span>
                <span>7+ hrs/wk (Pro)</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="0.5"
                value={profile.weeklyGoalHours}
                onChange={(e) => setProfile({ ...profile, weeklyGoalHours: Number(e.target.value) })}
                className="w-full accent-emerald-700 cursor-pointer h-2 bg-stone-200 rounded-lg"
              />
            </div>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-800">Weekly Fat Burned:</span>
                <span className="font-mono font-bold text-emerald-800">{weeklyFatGramsTotal} grams (~{weeklyFatKcalTotal} kcal)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-800">Mitochondrial Biogenesis Score:</span>
                <span className="font-mono font-bold text-emerald-800">{mitochondrialScore} / 100</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Personalized Key Recommendations */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
        <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm tracking-wide uppercase">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Ishai's Personalized Bioenergetic Guidelines</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-stone-800/80 p-4 rounded-2xl border border-stone-700 space-y-2">
            <div className="font-bold text-emerald-300 text-sm">1. Stay in the 126–140 BPM Box</div>
            <p className="text-stone-300 leading-relaxed">
              If your heart rate creeps above 142 BPM on hills, slow your pace to keep muscle cells operating in pure FATmax mode.
            </p>
          </div>

          <div className="bg-stone-800/80 p-4 rounded-2xl border border-stone-700 space-y-2">
            <div className="font-bold text-emerald-300 text-sm">2. Target 45–60 Min Sessions</div>
            <p className="text-stone-300 leading-relaxed">
              Mitochondrial signaling (AMPK and PGC-1&alpha;) peaks after ~30 minutes of continuous steady-state Zone 2 stimulus.
            </p>
          </div>

          <div className="bg-stone-800/80 p-4 rounded-2xl border border-stone-700 space-y-2">
            <div className="font-bold text-emerald-300 text-sm">3. Consistency &gt; Intensity</div>
            <p className="text-stone-300 leading-relaxed">
              Accumulating 3 to 4 hours per week at your target heart rate provides superior metabolic flexibility and capillary growth compared to high-intensity intervals.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
