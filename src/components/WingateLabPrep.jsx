import React, { useState, useEffect } from 'react';
import { 
  Calendar, CheckCircle2, Clock, AlertCircle, Award, Sparkles, 
  Activity, Flame, FileText, Save, RefreshCw, ChevronRight, UserCheck, Droplet, ShieldCheck, Heart
} from 'lucide-react';

export default function WingateLabPrep() {
  const testDate = new Date('2026-09-01T09:00:00');
  const [daysRemaining, setDaysRemaining] = useState(4);

  // Form state for post-test Wingate results
  const [labVt1, setLabVt1] = useState('117');
  const [labVt2, setLabVt2] = useState('132');
  const [labVo2Max, setLabVo2Max] = useState('26');
  const [labMaxHr, setLabMaxHr] = useState('155');
  const [labFatMax, setLabFatMax] = useState('112');
  const [labNotes, setLabNotes] = useState('Wingate Senior Laboratory Treadmill CPET + Blood Lactate Test.');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('wingate_lab_results');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setLabVt1(parsed.vt1 || '117');
        setLabVt2(parsed.vt2 || '132');
        setLabVo2Max(parsed.vo2Max || '26');
        setLabMaxHr(parsed.maxHr || '155');
        setLabFatMax(parsed.fatMax || '112');
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
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white p-6 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative space-y-4 max-w-4xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-400/30 flex items-center gap-1.5 shadow-md">
              <Calendar className="w-4 h-4 text-emerald-400" /> Upcoming Test: September 1, 2026
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Wingate Institute Sports Physiology Lab
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Wingate Institute Lab Test Preparation & Data Entry Center
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed max-w-3xl">
            Complete pre-test protocol guide for your upcoming CPET (Cardiopulmonary Exercise Test) and blood lactate threshold assessment at the <strong>Wingate Institute</strong>, plus a post-test lab results logger to update your profile.
          </p>

          {/* Key Metrics Quick Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Target Zone 2</div>
              <div className="text-emerald-400 font-black text-base mt-0.5">105 - 117 BPM</div>
            </div>
            <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Target FATmax</div>
              <div className="text-cyan-300 font-black text-base mt-0.5">112 - 117 BPM</div>
            </div>
            <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase">LTHR Ceiling</div>
              <div className="text-rose-400 font-black text-base mt-0.5">132 BPM</div>
            </div>
            <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Test Date</div>
              <div className="text-amber-300 font-black text-base mt-0.5">Sept 1, 2026</div>
            </div>
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
