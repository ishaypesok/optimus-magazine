import React, { useState, useEffect } from 'react';
import { 
  Calendar, CheckCircle2, Clock, AlertCircle, Award, Sparkles, 
  Activity, Flame, FileText, Save, RefreshCw, ChevronRight, UserCheck, Droplet, ShieldCheck, Heart
} from 'lucide-react';

export default function WingateLabPrep() {
  const testDate = new Date('2026-09-01T09:00:00');
  const [daysRemaining, setDaysRemaining] = useState(0);

  // Form state for post-test Wingate results
  const [labVt1, setLabVt1] = useState('120');
  const [labVt2, setLabVt2] = useState('135');
  const [labVo2Max, setLabVo2Max] = useState('34.1');
  const [labMaxHr, setLabMaxHr] = useState('137');
  const [labFatMax, setLabFatMax] = useState('92');
  const [labNotes, setLabNotes] = useState('Official Corrected Wingate Report (Sep 2, 2026): Graph error acknowledged & corrected by Ezekiel Frankel. LTHR 135 bpm @ 7.2 km/h. Zone 2 base range 101-120 bpm (max 120 bpm base limit). Peak HR 137 bpm. Stage 6 lactate 4.34 mmol/L.');
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    const savedData = localStorage.getItem('wingate_lab_results');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setLabVt1(parsed.vt1 || '120');
        setLabVt2(parsed.vt2 || '135');
        setLabVo2Max(parsed.vo2Max || '34.1');
        setLabMaxHr(parsed.maxHr || '137');
        setLabFatMax(parsed.fatMax || '92');
        setLabNotes(parsed.notes || '');
        setIsSaved(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSaveResults = (e) => {
    e.preventDefault();
    const dataToSave = {
      vt1: labVt1,
      vt2: labVt2,
      vo2Max: labVo2Max,
      maxHr: labMaxHr,
      fatMax: labFatMax,
      notes: labNotes,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('wingate_lab_results', JSON.stringify(dataToSave));
    setIsSaved(true);
  };

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">
      
      {/* Top Banner Header with Magazine Cover & Wingate Photos */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white p-6 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative space-y-6 max-w-5xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-400/30 flex items-center gap-1.5 shadow-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Official Corrected Report: September 2, 2026
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Wingate Institute Ribstein Sports Medicine Center
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Text & Metrics */}
            <div className="md:col-span-7 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Wingate Institute Lab Test Data & Bioenergetics Feature
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                Official laboratory blood lactate threshold assessment and cardiovascular health screening report from the <strong>Wingate Institute</strong> (Ezekiel Frankel, Sc.M & Dr. Shira Ginzburg). Full 8-stage treadmill ergometry dataset mapped into the LTHR 136 bpm 5-Zone model.
              </p>

              {/* Key Metrics Quick Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Zone 2 Base Ceiling</div>
                  <div className="text-emerald-400 font-black text-base mt-0.5">121 BPM Max</div>
                </div>
                <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">LT1 Threshold</div>
                  <div className="text-cyan-300 font-black text-base mt-0.5">123 BPM (2.06 mmol)</div>
                </div>
                <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">LTHR (LT2)</div>
                  <div className="text-rose-400 font-black text-base mt-0.5">136 BPM (4.34 mmol)</div>
                </div>
                <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Peak Test HR</div>
                  <div className="text-amber-300 font-black text-base mt-0.5">137 BPM</div>
                </div>
              </div>
            </div>

            {/* Right Column: Featured Magazine Cover (Younger Ishai) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-[240px] space-y-1.5 text-center">
                <div className="rounded-2xl overflow-hidden border-2 border-emerald-400/60 shadow-2xl bg-black">
                  <img 
                    src="./optimus-cover.jpg" 
                    alt="Optimus Magazine Feature Cover" 
                    className="w-full h-64 object-cover hover:scale-105 transition duration-500" 
                  />
                </div>
                <span className="text-[11px] font-black text-emerald-400 uppercase tracking-wider block pt-1">
                  📰 Official Feature Cover Issue
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 0: OFFICIAL 8-STAGE LAB RESULTS TABLE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-700" /> Official Wingate Step Test Table (Biosen C-Line)
            </div>
            <h3 className="text-2xl font-black text-stone-900 mt-1">
              8-Stage Incremental Treadmill Lactate & HR Dataset
            </h3>
            <p className="text-xs text-stone-500 font-medium mt-0.5">
              Exact clinical measurements from the Wingate Institute Ribstein Sports Medicine Center report (Test Date: Sep 1, 2026 • Corrected: Sep 2, 2026).
            </p>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold shrink-0">
            Zone 2 Base Limit: <strong className="text-emerald-700 text-sm">120 BPM</strong> (Page 4 Directive)
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-100 text-stone-700 font-black uppercase text-[10px] tracking-wider border-b border-stone-200">
                <th className="py-3 px-3">Stage</th>
                <th className="py-3 px-3">Speed (km/h)</th>
                <th className="py-3 px-3">Slope (%)</th>
                <th className="py-3 px-3">Heart Rate</th>
                <th className="py-3 px-3">% HRmax</th>
                <th className="py-3 px-3">Lactate (mmol/L)</th>
                <th className="py-3 px-3">RPE (6-20)</th>
                <th className="py-3 px-3">Physiological State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              <tr className="hover:bg-stone-50/80">
                <td className="py-2.5 px-3 font-extrabold text-stone-900">Stage 1</td>
                <td className="py-2.5 px-3">4.0 km/h</td>
                <td className="py-2.5 px-3">0.5%</td>
                <td className="py-2.5 px-3 font-bold text-slate-700">84 bpm</td>
                <td className="py-2.5 px-3 text-stone-500">61%</td>
                <td className="py-2.5 px-3 font-bold text-emerald-700">1.42 mmol/L</td>
                <td className="py-2.5 px-3">12</td>
                <td className="py-2.5 px-3 text-[11px] text-stone-500">Warmup / Active Recovery</td>
              </tr>
              <tr className="hover:bg-stone-50/80">
                <td className="py-2.5 px-3 font-extrabold text-stone-900">Stage 2</td>
                <td className="py-2.5 px-3">4.8 km/h</td>
                <td className="py-2.5 px-3">0.5%</td>
                <td className="py-2.5 px-3 font-bold text-slate-700">92 bpm</td>
                <td className="py-2.5 px-3 text-stone-500">67%</td>
                <td className="py-2.5 px-3 font-bold text-emerald-700">1.29 mmol/L</td>
                <td className="py-2.5 px-3">13</td>
                <td className="py-2.5 px-3 text-[11px] text-emerald-800 font-semibold">Baseline Lactate Nadir</td>
              </tr>
              <tr className="hover:bg-stone-50/80">
                <td className="py-2.5 px-3 font-extrabold text-stone-900">Stage 3</td>
                <td className="py-2.5 px-3">5.6 km/h</td>
                <td className="py-2.5 px-3">0.5%</td>
                <td className="py-2.5 px-3 font-bold text-emerald-700">113 bpm</td>
                <td className="py-2.5 px-3 text-stone-500">82%</td>
                <td className="py-2.5 px-3 font-bold text-emerald-700">1.52 mmol/L</td>
                <td className="py-2.5 px-3">14</td>
                <td className="py-2.5 px-3 text-[11px] text-emerald-700">Zone 2 Aerobic Base Range</td>
              </tr>
              <tr className="bg-emerald-50/60 font-semibold border-l-4 border-emerald-500">
                <td className="py-2.5 px-3 font-extrabold text-emerald-950">Stage 4</td>
                <td className="py-2.5 px-3">6.4 km/h</td>
                <td className="py-2.5 px-3">0.5%</td>
                <td className="py-2.5 px-3 font-black text-emerald-800">123 bpm</td>
                <td className="py-2.5 px-3 text-emerald-900 font-bold">90%</td>
                <td className="py-2.5 px-3 font-black text-cyan-700">2.06 mmol/L</td>
                <td className="py-2.5 px-3 font-bold">14</td>
                <td className="py-2.5 px-3 text-[11px] font-bold text-cyan-800">Aerobic Threshold (LT1) (~120-123 bpm)</td>
              </tr>
              <tr className="hover:bg-stone-50/80">
                <td className="py-2.5 px-3 font-extrabold text-stone-900">Stage 5</td>
                <td className="py-2.5 px-3">7.2 km/h</td>
                <td className="py-2.5 px-3">0.5%</td>
                <td className="py-2.5 px-3 font-bold text-amber-700">135 bpm</td>
                <td className="py-2.5 px-3 text-stone-500">99%</td>
                <td className="py-2.5 px-3 font-bold text-amber-700">3.05 mmol/L</td>
                <td className="py-2.5 px-3">14</td>
                <td className="py-2.5 px-3 text-[11px] text-amber-800 font-semibold">Tempo / Pre-Threshold Transition</td>
              </tr>
              <tr className="bg-rose-50/60 font-semibold border-l-4 border-rose-500">
                <td className="py-2.5 px-3 font-extrabold text-rose-950">Stage 6</td>
                <td className="py-2.5 px-3">7.2 km/h</td>
                <td className="py-2.5 px-3 font-bold text-rose-700">2.0%</td>
                <td className="py-2.5 px-3 font-black text-rose-800">132 bpm</td>
                <td className="py-2.5 px-3 text-rose-900 font-bold">96%</td>
                <td className="py-2.5 px-3 font-black text-rose-700">4.34 mmol/L</td>
                <td className="py-2.5 px-3 text-stone-400">—</td>
                <td className="py-2.5 px-3 text-[11px] font-bold text-rose-800">Anaerobic Threshold (LT2 / LTHR 135 bpm)</td>
              </tr>
              <tr className="hover:bg-stone-50/80">
                <td className="py-2.5 px-3 font-extrabold text-stone-900">Stage 7</td>
                <td className="py-2.5 px-3">7.2 km/h</td>
                <td className="py-2.5 px-3">4.0%</td>
                <td className="py-2.5 px-3 font-bold text-slate-700">135 bpm</td>
                <td className="py-2.5 px-3 text-stone-500">99%</td>
                <td className="py-2.5 px-3 text-stone-400">—</td>
                <td className="py-2.5 px-3 text-stone-400">—</td>
                <td className="py-2.5 px-3 text-[11px] text-stone-500">High Workload Incline Stage</td>
              </tr>
              <tr className="bg-amber-50/40">
                <td className="py-2.5 px-3 font-extrabold text-amber-950">Stage 8</td>
                <td className="py-2.5 px-3">7.2 km/h</td>
                <td className="py-2.5 px-3 font-bold text-amber-800">6.0%</td>
                <td className="py-2.5 px-3 font-black text-amber-900">137 bpm</td>
                <td className="py-2.5 px-3 font-bold text-amber-900">100%</td>
                <td className="py-2.5 px-3 text-stone-400">—</td>
                <td className="py-2.5 px-3 text-stone-400">—</td>
                <td className="py-2.5 px-3 text-[11px] font-bold text-amber-900">Peak Test HR (137 bpm) • BP 160/80</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Letter & Directive Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 border border-slate-800">
            <div className="font-extrabold text-amber-400 text-sm flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-400" /> Wingate Physiologist Response (Ezekiel Frankel)
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              "Indeed, there was an error in the printed graph. I apologize for that, and I am attaching the corrected printed graph along with the data as requested... If there is any error I have not addressed, please let me know and we will fix it."
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950 text-white space-y-2 border border-emerald-800">
            <div className="font-extrabold text-emerald-300 text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Page 4 Official Written Guideline
            </div>
            <p className="text-emerald-100 leading-relaxed text-[11px]">
              "Performing light and moderate workouts is very important for building the aerobic base – <strong>these workouts should not exceed a heart rate of 120 bpm</strong>."
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: PRE-TEST 48-HOUR PREPARATION PROTOCOL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <div className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">Protocol Checklist</div>
          <h3 className="text-2xl font-black text-stone-900 mt-1">
            48-Hour Pre-Test Preparation Checklist
          </h3>
          <p className="text-xs text-stone-500 font-medium">
            Follow these physiological rules to ensure 100% accurate blood lactate and VO₂ Max results at Wingate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-black text-sm">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>1. 48 Hours Before (T-48h)</span>
            </div>
            <ul className="space-y-1.5 text-stone-600 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>No Exhaustive Training:</strong> Rest or light Zone 1 walk only. Avoid high-intensity interval training (HIIT).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Glycogen Replenishment:</strong> Eat complex carbohydrates to normalize muscle glycogen stores.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-black text-sm">
              <Droplet className="w-4 h-4 text-cyan-700" />
              <span>2. 24 Hours Before (T-24h)</span>
            </div>
            <ul className="space-y-1.5 text-stone-600 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Optimal Hydration:</strong> Drink 2.5–3.0 liters of water with electrolyte sodium/potassium balance.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Sleep Optimization:</strong> Target 8 hours of quality restorative sleep (monitor via Apple Watch Sleep).</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-black text-sm">
              <Flame className="w-4 h-4 text-amber-700" />
              <span>3. 3 Hours Before (T-3h)</span>
            </div>
            <ul className="space-y-1.5 text-stone-600 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Light Pre-Test Meal:</strong> Easily digestible carbohydrates (oatmeal or banana) 3 hours before.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Caffeine & Stimulants:</strong> Avoid heavy coffee/stimulants 4h prior to prevent elevated resting HR.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-black text-sm">
              <FileText className="w-4 h-4 text-rose-700" />
              <span>4. At the Wingate Lab</span>
            </div>
            <ul className="space-y-1.5 text-stone-600 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Wear Apple Watch Ultra:</strong> Log workout simultaneously to compare watch telemetry against metabolic cart.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Request Metrics Copy:</strong> Ask for earlobe blood lactate curve chart and raw CPET export.</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* SECTION 2: WHAT TO REQUEST FROM WINGATE PHYSIOLOGISTS */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg space-y-4">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" /> Lab Report Checklist: Data Points to Collect
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
            <div className="font-extrabold text-emerald-400">1. VT1 (Aerobic Threshold)</div>
            <p className="text-slate-300 text-[11px]">Heart rate and pace where blood lactate first exceeds baseline (~2.0 mmol/L).</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
            <div className="font-extrabold text-cyan-400">2. FATmax Target BPM</div>
            <p className="text-slate-300 text-[11px]">Heart rate where fat oxidation rate (g/min) reaches its absolute maximum.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
            <div className="font-extrabold text-rose-400">3. VT2 (Lactate Threshold)</div>
            <p className="text-slate-300 text-[11px]">Maximum sustainable heart rate before rapid lactate accumulation (~4.0 mmol/L).</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
            <div className="font-extrabold text-amber-400">4. Lab VO₂ Max</div>
            <p className="text-slate-300 text-[11px]">Maximal oxygen uptake (mL/kg/min) recorded via indirect calorimetry hood/mask.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
            <div className="font-extrabold text-purple-400">5. True Maximum Heart Rate</div>
            <p className="text-slate-300 text-[11px]">Peak heart rate reached at the end of incremental treadmill ramp protocol.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
            <div className="font-extrabold text-emerald-300">6. Respiratory Exchange Ratio (RER)</div>
            <p className="text-slate-300 text-[11px]">VCO₂/VO₂ ratio showing exact transition from fat burning (0.70) to glucose (1.00+).</p>
          </div>
        </div>
      </div>

      {/* SECTION 3: POST-TEST WINGATE RESULTS ENTRY FORM */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <div className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">Post-Test Logger</div>
            <h3 className="text-2xl font-black text-stone-900 mt-1">
              Input Wingate Lab Results (Sept 1, 2026)
            </h3>
          </div>
          {isSaved && (
            <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black flex items-center gap-1 border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Results Saved in Local Profile
            </span>
          )}
        </div>

        <form onSubmit={handleSaveResults} className="space-y-4 text-xs font-semibold text-stone-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div>
              <label className="block mb-1 text-stone-500">VT1 (Aerobic Threshold BPM)</label>
              <input
                type="number"
                value={labVt1}
                onChange={e => setLabVt1(e.target.value)}
                className="w-full p-3 rounded-xl bg-stone-100 border border-stone-300 font-bold text-stone-900"
                placeholder="117"
              />
            </div>

            <div>
              <label className="block mb-1 text-stone-500">VT2 (Lactate Threshold BPM)</label>
              <input
                type="number"
                value={labVt2}
                onChange={e => setLabVt2(e.target.value)}
                className="w-full p-3 rounded-xl bg-stone-100 border border-stone-300 font-bold text-stone-900"
                placeholder="132"
              />
            </div>

            <div>
              <label className="block mb-1 text-stone-500">Lab VO₂ Max (mL/kg/min)</label>
              <input
                type="number"
                value={labVo2Max}
                onChange={e => setLabVo2Max(e.target.value)}
                className="w-full p-3 rounded-xl bg-stone-100 border border-stone-300 font-bold text-stone-900"
                placeholder="26"
              />
            </div>

            <div>
              <label className="block mb-1 text-stone-500">Max Heart Rate (BPM)</label>
              <input
                type="number"
                value={labMaxHr}
                onChange={e => setLabMaxHr(e.target.value)}
                className="w-full p-3 rounded-xl bg-stone-100 border border-stone-300 font-bold text-stone-900"
                placeholder="155"
              />
            </div>

            <div>
              <label className="block mb-1 text-stone-500">FATmax Peak (BPM)</label>
              <input
                type="number"
                value={labFatMax}
                onChange={e => setLabFatMax(e.target.value)}
                className="w-full p-3 rounded-xl bg-stone-100 border border-stone-300 font-bold text-stone-900"
                placeholder="112"
              />
            </div>

          </div>

          <div>
            <label className="block mb-1 text-stone-500">Wingate Physiologist Notes & Observations</label>
            <textarea
              value={labNotes}
              onChange={e => setLabNotes(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-xl bg-stone-100 border border-stone-300 font-bold text-stone-900"
              placeholder="e.g. Excellent aerobic efficiency in 105-117 BPM range. VT1 confirmed at 117 BPM."
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-md transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save & Sync Wingate Lab Results</span>
            </button>
          </div>
        </form>
      </div>

    </article>
  );
}
