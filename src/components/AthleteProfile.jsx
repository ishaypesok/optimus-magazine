import React, { useState, useEffect } from 'react';
import { 
  User, Activity, Heart, Flame, Zap, ShieldCheck, Award, 
  RotateCcw, Sliders, CheckCircle2, BookOpen, Clock, BatteryCharging, TrendingUp, Sparkles, Quote, Target
} from 'lucide-react';

const DEFAULT_PROFILE = {
  name: 'Ishai Pesok',
  age: 38,
  restingHR: 62,
  maxHR: 182,
  targetMinHR: 112,
  targetMaxHR: 117,
  weeklyGoalHours: 3.5,
  labTested: true,
  labName: 'Wingate Institute Ribstein Sports Medicine Center',
  physiologist: 'Yair Azgad',
  testDate: 'Jan 8, 2023',
  lthr: 132,
  lthrSpeed: '7.2 km/h (8:20 min/km)',
  peakTestHR: 133,
  testedLactateAtZone2: 1.8,
  bio: "Ishai is a dedicated runner and health longevity practitioner. Clinical blood lactate threshold testing performed at the Wingate Institute Sports Medicine Center (by physiologist Yair Azgad) established Ishai's Lactate Threshold Heart Rate (LTHR) at 132 BPM (7.2 km/h, 8:20 min/km). Ishai's lab-prescribed Zone 2 aerobic base range is 112–117 BPM (9:48–9:22 min/km pace), optimizing capillary density, mitochondrial biogenesis, and lipid oxidation while avoiding glycolytic fatigue.",
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
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
                  Personal Bioenergetics Profile
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/40 flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" /> Wingate Institute Lab Report (Jan 8, 2023)
                </span>
                <span className="flex items-center gap-1 text-xs text-stone-300 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Synced to Local Device
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                {profile.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 font-medium mt-0.5">
                Wingate Zone 2 Range: <strong className="text-emerald-300">{profile.targetMinHR} – {profile.targetMaxHR} BPM</strong> (9:48 – 9:22 min/km) • LTHR: <strong className="text-amber-300">{profile.lthr || 132} BPM</strong> (7.2 km/h)
              </p>
              
              <div className="mt-3 flex flex-col gap-1.5 p-3 rounded-2xl bg-emerald-950/80 border border-emerald-400/30 text-emerald-200 text-xs font-medium">
                <div className="flex items-center gap-2 italic">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>“At minute 60, Ishai hit FATmax. Mitochondria were producing ATP at 88% efficiency. No sugar crash.”</span>
                </div>
                <div className="text-[11px] text-amber-300/90 font-medium italic pt-1 border-t border-emerald-800/60 flex items-center gap-1.5">
                  <span className="font-bold text-amber-400 font-mono uppercase text-[9px] px-1.5 py-0.2 rounded bg-amber-400/20">Footnote</span>
                  <span>“Rest two days after. This is how we build cellular health at 79.”</span>
                </div>
              </div>
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
              <span>Personal Parameter & Wingate Lab Customizer</span>
            </div>
            <span className="text-xs text-stone-500">Changes save automatically to your device</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">About Me / Bio</label>
              <textarea
                rows={2}
                value={profile.bio || ''}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs font-medium text-stone-900 focus:border-emerald-600 focus:outline-none"
                placeholder="Write a short summary about your training philosophy and goals..."
              />
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
                <label className="text-xs font-bold text-stone-700">Wingate Zone 2 Min HR</label>
                <input
                  type="number"
                  value={profile.targetMinHR}
                  onChange={(e) => setProfile({ ...profile, targetMinHR: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-sm font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Wingate Zone 2 Max HR</label>
                <input
                  type="number"
                  value={profile.targetMaxHR}
                  onChange={(e) => setProfile({ ...profile, targetMaxHR: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-sm font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Wingate LTHR (סח"ח)</label>
                <input
                  type="number"
                  value={profile.lthr || 132}
                  onChange={(e) => setProfile({ ...profile, lthr: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-sm font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Speed at LTHR (km/h)</label>
                <input
                  type="text"
                  value={profile.lthrSpeed || '7.2 km/h (8:20 min/km)'}
                  onChange={(e) => setProfile({ ...profile, lthrSpeed: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-sm font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Physiologist</label>
                <input
                  type="text"
                  value={profile.physiologist || 'Yair Azgad'}
                  onChange={(e) => setProfile({ ...profile, physiologist: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-sm font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Testing Facility</label>
                <input
                  type="text"
                  value={profile.labName || 'Wingate Institute Ribstein Center'}
                  onChange={(e) => setProfile({ ...profile, labName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-sm font-bold text-stone-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-emerald-900 font-medium">
            <span>Formula Calculated Zone 2 (Karvonen 60%-70% HRR): <strong>{calculatedZone2Low} – {calculatedZone2High} BPM</strong></span>
          </div>
        </div>
      )}

      {/* Wingate Institute Laboratory Verification Card */}
      <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-emerald-500/30 space-y-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/80 pb-4 relative">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-300 text-emerald-950 shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-black uppercase tracking-widest border border-emerald-400/40">
                  Wingate Institute Clinical Ergometry Test
                </span>
                <span className="text-xs text-amber-300 font-bold font-mono">
                  Report Date: Jan 8, 2023 • Physiologist: Yair Azgad
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                Wingate Institute Lactate Threshold & Heart Rate Zones
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-xs font-bold font-mono">
              LTHR (סח"ח): {profile.lthr || 132} BPM (7.2 km/h)
            </span>
          </div>
        </div>

        {/* Wingate 5-Zone Clinical Table */}
        <div className="space-y-3 relative">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            Wingate Clinical Heart Rate & Pace Prescription Table (Joe Friel LTHR Protocol)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            
            <div className="p-3.5 rounded-2xl bg-emerald-900/30 border border-emerald-500/20 space-y-1">
              <div className="text-[10px] font-black uppercase tracking-wider text-stone-400">Zone 1 • Recovery</div>
              <div className="text-lg font-black text-white font-mono">86 – 112 <span className="text-xs font-semibold text-stone-300">BPM</span></div>
              <p className="text-[10px] text-stone-300 font-mono">Pace &gt; 11:44 min/km</p>
              <p className="text-[10px] text-stone-400 italic">65–85% of LTHR • Easy walking & recovery</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-900/60 border border-emerald-400/50 space-y-1 shadow-sm">
              <div className="text-[10px] font-black uppercase tracking-wider text-emerald-300">Zone 2 • Aerobic Base</div>
              <div className="text-lg font-black text-emerald-200 font-mono">112 – 117 <span className="text-xs font-semibold text-emerald-300">BPM</span></div>
              <p className="text-[10px] text-emerald-300 font-mono font-bold">9:48 – 9:22 min/km (6.1–6.4 km/h)</p>
              <p className="text-[10px] text-emerald-200/90 italic">85–89% LTHR • Long continuous volume</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-teal-900/30 border border-teal-500/20 space-y-1">
              <div className="text-[10px] font-black uppercase tracking-wider text-teal-300">Zone 3 • Marathon Tempo</div>
              <div className="text-lg font-black text-white font-mono">119 – 124 <span className="text-xs font-semibold text-stone-300">BPM</span></div>
              <p className="text-[10px] text-stone-300 font-mono">9:16 – 8:52 min/km (6.5–6.8 km/h)</p>
              <p className="text-[10px] text-stone-400 italic">90–94% LTHR • Aerobic power & tempo</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-900/30 border border-amber-500/30 space-y-1">
              <div className="text-[10px] font-black uppercase tracking-wider text-amber-300">Zone 4 • Sub-Threshold</div>
              <div className="text-lg font-black text-white font-mono">125 – 131 <span className="text-xs font-semibold text-stone-300">BPM</span></div>
              <p className="text-[10px] text-stone-300 font-mono">8:46 – 8:25 min/km (6.8–7.1 km/h)</p>
              <p className="text-[10px] text-stone-400 italic">95–99% LTHR • Sustainable tempo</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-red-900/30 border border-red-500/30 space-y-1">
              <div className="text-[10px] font-black uppercase tracking-wider text-red-300">Zone 5a • At/Above LTHR</div>
              <div className="text-lg font-black text-white font-mono">132 – 135 <span className="text-xs font-semibold text-stone-300">BPM</span></div>
              <p className="text-[10px] text-stone-300 font-mono">8:20 – 8:10 min/km (7.2–7.3 km/h)</p>
              <p className="text-[10px] text-stone-400 italic">100–102% LTHR • Threshold intervals</p>
            </div>

          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-400/40 text-emerald-100 text-xs leading-relaxed flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-bold block mb-0.5">Wingate Institute Clinical Report Summary:</strong>
            <span>
              The clinical lactate ergometry report from the Ribstein Center at Wingate Institute (tested by physiologist Yair Azgad) establishes your Lactate Threshold Heart Rate (LTHR) at <strong>132 BPM (7.2 km/h)</strong>. To maximize mitochondrial biogenesis and capillary density without lactate accumulation, Wingate prescribes your Zone 2 aerobic volume training between <strong>112 and 117 BPM (9:48 – 9:22 min/km pace)</strong>.
            </span>
          </div>
        </div>
      </div>

      {/* About Ishai — Bio & Longevity Card */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-200">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-stone-900 tracking-tight">
                About Ishai — Bioenergetics & Longevity Profile
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Endurance practitioner focused on Zone 2 metabolic optimization & mitochondrial biogenesis
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold font-mono self-start sm:self-center">
            Cellular Health at 79 Target
          </span>
        </div>

        {/* Bio Narrative & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <h4 className="text-sm font-bold text-stone-800 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              Athlete Bio & Philosophy
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {profile.bio || `Ishai is a dedicated runner and health longevity advocate focused on science-backed cellular fitness. Rather than chasing short-term intensity, Ishai's training philosophy prioritizes building a powerful aerobic base through disciplined Zone 2 running (126–140 BPM). By training muscle fibers to oxidize fatty acids efficiently, Ishai preserves glycogen reserves, minimizes oxidative stress, and expands mitochondrial density for lifelong metabolic health.`}
            </p>
            <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/70 text-xs text-emerald-950 font-medium flex items-start gap-2.5">
              <Quote className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-emerald-900">Training Creed:</strong>
                <span className="italic">“Rest two days after. This is how we build cellular health at 79.”</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Primary Discipline</span>
              </div>
              <p className="text-xs text-stone-600 font-semibold">Zone 2 Aerobic Base Running</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                <Target className="w-4 h-4 text-amber-600" />
                <span>FATmax Target</span>
              </div>
              <p className="text-xs text-stone-600 font-semibold">{profile.targetMinHR}–{profile.targetMaxHR} BPM (60-70% HRR)</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                <Flame className="w-4 h-4 text-orange-600" />
                <span>Fuel Strategy</span>
              </div>
              <p className="text-xs text-stone-600 font-semibold">82% Fat / 18% Glucose Substrate</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Long-Term Goal</span>
              </div>
              <p className="text-xs text-stone-600 font-semibold">Mitochondrial Biogenesis & Health</p>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 space-y-1">
            <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-900">
              <span className="w-6 h-6 rounded-lg bg-emerald-200/80 text-emerald-800 flex items-center justify-center text-xs font-bold">1</span>
              <span>Aerobic Discipline</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-normal">
              Keeping pace controlled in the 126–140 BPM box to maximize lipid burn and prevent lactate accumulation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200/60 space-y-1">
            <div className="flex items-center gap-2 text-xs font-extrabold text-teal-900">
              <span className="w-6 h-6 rounded-lg bg-teal-200/80 text-teal-800 flex items-center justify-center text-xs font-bold">2</span>
              <span>Cellular Energy</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-normal">
              Stimulating mitochondrial density expansion and PGC-1&alpha; expression with 45–60 min sustained runs.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-1">
            <div className="flex items-center gap-2 text-xs font-extrabold text-amber-900">
              <span className="w-6 h-6 rounded-lg bg-amber-200/80 text-amber-800 flex items-center justify-center text-xs font-bold">3</span>
              <span>Structured Rest</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-normal">
              Integrating mandatory 48-hour recovery windows to allow cellular repair and muscle fiber adaptation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-100/80 border border-stone-200 space-y-1">
            <div className="flex items-center gap-2 text-xs font-extrabold text-stone-900">
              <span className="w-6 h-6 rounded-lg bg-stone-300 text-stone-800 flex items-center justify-center text-xs font-bold">4</span>
              <span>Telemetry Tracking</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-normal">
              Analyzing real-time bioenergetics telemetry, heart rate metrics, and estimated substrate ratios.
            </p>
          </div>
        </div>
      </div>

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
