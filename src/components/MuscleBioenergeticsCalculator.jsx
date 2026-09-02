import React, { useState } from 'react';
import { 
  Calculator, Flame, Zap, Activity, Cpu, RotateCcw, Sparkles, 
  BookOpen, Heart, Clock, User, CheckCircle2, BarChart2, Info, 
  TrendingUp, ArrowRight, ShieldCheck, RefreshCw, AlertTriangle, Dumbbell, Scale, Target, Layers
} from 'lucide-react';

export default function MuscleBioenergeticsCalculator() {
  // Preset Configurations
  const presets = {
    paper_study: {
      name: "Paper Reference Benchmark",
      description: "Direct bottom-up model: 1 kg wet muscle built across 12 weeks",
      targetKg: 1.0,
      timeframeWeeks: 12,
      chosenSurplus: 350,
      efficiencyModel: "central", // central (3481), low (3710), high (3204)
      expLevel: "intermediate"
    },
    lean_bulk: {
      name: "Optimal Lean Hypertrophy",
      description: "Controlled surplus (+200 kcal/day) targeting 1.5 kg muscle in 12 weeks",
      targetKg: 1.5,
      timeframeWeeks: 12,
      chosenSurplus: 200,
      efficiencyModel: "central",
      expLevel: "intermediate"
    },
    dirty_bulk: {
      name: "Traditional 'Dirty' Bulk",
      description: "Aggressive +600 kcal/day surplus showing high fat accretion",
      targetKg: 1.5,
      timeframeWeeks: 12,
      chosenSurplus: 600,
      efficiencyModel: "central",
      expLevel: "intermediate"
    },
    advanced_lifter: {
      name: "Advanced Lifter Micro-Gain",
      description: "Slow 0.5 kg gain over 16 weeks with +150 kcal/day micro-surplus",
      targetKg: 0.5,
      timeframeWeeks: 16,
      chosenSurplus: 150,
      efficiencyModel: "central",
      expLevel: "advanced"
    },
    recomp_phenomenon: {
      name: "1:1 Body Recomposition",
      description: "Maintenance intake (0 surplus) + Zone 2: Stored fat directly fuels 1 kg muscle accretion",
      targetKg: 1.0,
      timeframeWeeks: 12,
      chosenSurplus: 0,
      efficiencyModel: "central",
      expLevel: "intermediate"
    }
  };

  const [activePreset, setActivePreset] = useState('paper_study');
  const [targetKg, setTargetKg] = useState(presets.paper_study.targetKg);
  const [timeframeWeeks, setTimeframeWeeks] = useState(presets.paper_study.timeframeWeeks);
  const [chosenSurplus, setChosenSurplus] = useState(presets.paper_study.chosenSurplus);
  const [efficiencyModel, setEfficiencyModel] = useState(presets.paper_study.efficiencyModel);
  const [expLevel, setExpLevel] = useState(presets.paper_study.expLevel);
  const [includeZone2, setIncludeZone2] = useState(true);

  const applyPreset = (key) => {
    const p = presets[key];
    if (!p) return;
    setActivePreset(key);
    setTargetKg(p.targetKg);
    setTimeframeWeeks(p.timeframeWeeks);
    setChosenSurplus(p.chosenSurplus);
    setEfficiencyModel(p.efficiencyModel);
    setExpLevel(p.expLevel);
  };

  // --- BIOENERGETIC COMPUTATIONS ---
  // Energy per kg wet skeletal muscle based on paper model
  const costPerKgMap = {
    central: 3481,
    low: 3710,   // Low efficiency = higher energy required
    high: 3204   // High deposition efficiency = lower energy required
  };

  const costPerKg = costPerKgMap[efficiencyModel] || 3481;
  const totalDays = Math.max(1, timeframeWeeks * 7);

  // 1. Macromolecular composition for wet muscle (per 1 kg)
  const proteinG = 177 * targetKg;
  const lipidG = 30 * targetKg;
  const glycogenG = 20 * targetKg;
  const waterG = 773 * targetKg;

  // 2. Tissue chemical energy (Enthalpy)
  const proteinEnergyKcal = proteinG * 4.27; // ~755.8 kcal per kg
  const lipidEnergyKcal = lipidG * 9.4;      // ~282 kcal per kg
  const glycogenEnergyKcal = glycogenG * 4.18; // ~83.6 kcal per kg
  const baseTissueEnthalpyKcal = (1355) * targetKg; // ~1355 kcal/kg

  // 3. Waterfall stages (per kg base values scaled by targetKg)
  const directSynthesisKcal = (1515 - 1355) * targetKg; // +160 kcal/kg
  const depositionInefficiencyKcal = (2587 - 1515) * targetKg; // +1072 kcal/kg
  const accrualMaintenanceKcal = (3133 - 2587) * targetKg; // +546 kcal/kg (over 12 weeks proportional)
  const ditKcal = (costPerKg - 3133) * targetKg; // +348 kcal/kg

  // Total energy required to physically construct the target muscle mass
  const totalMuscleEnergyCost = costPerKg * targetKg;
  
  // Daily tissue-specific energy requirement
  const dailyMuscleCostKcal = totalMuscleEnergyCost / totalDays;

  // 4. Surplus Destination Simulation (Where do the user's daily calories go?)
  // Training output extra cost ~ 60-90 kcal/day
  // NEAT spillover ~ 15-25% of surplus
  // EPOC & recovery ~ 35 kcal/day
  // Zone 2 fat oxidation burn (3x 45m / week = ~150 kcal/day fat burn)
  const dailyTrainingWork = Math.min(chosenSurplus * 0.20, 80);
  const dailyNeatSpillover = Math.min(chosenSurplus * 0.22, 140);
  const dailyEpocRecovery = Math.min(chosenSurplus * 0.10, 45);
  const dailyZone2FatBurn = includeZone2 ? Math.min(chosenSurplus * 0.35, 150) : 0;

  // Remainder diverted to Adipose Fat Storage
  const dailyAdiposeSurplusKcal = Math.max(
    0, 
    chosenSurplus - dailyMuscleCostKcal - dailyTrainingWork - dailyNeatSpillover - dailyEpocRecovery - dailyZone2FatBurn
  );

  // Total accumulation over the timeframe
  const totalSurplusKcalOverall = chosenSurplus * totalDays;
  const totalAdiposeKcalOverall = dailyAdiposeSurplusKcal * totalDays;

  // 9,300 kcal per kg of human body fat gain
  const totalFatGainedKg = totalAdiposeKcalOverall / 9300;
  const totalWeightGainKg = targetKg + totalFatGainedKg;
  const musclePctOfWeightGain = totalWeightGainKg > 0 ? (targetKg / totalWeightGainKg) * 100 : 0;
  const fatPctOfWeightGain = totalWeightGainKg > 0 ? (totalFatGainedKg / totalWeightGainKg) * 100 : 0;

  // Ratio of surplus relative to pure tissue requirement
  const surplusMultiplier = dailyMuscleCostKcal > 0 ? chosenSurplus / dailyMuscleCostKcal : 0;

  return (
    <article className="space-y-8 animate-fade-in font-sans">
      {/* Header Banner */}
      <div className="bg-stone-900 text-stone-100 p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border border-stone-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/20 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
              Article 29 • Interactive Bioenergetics Model
            </span>
            <span className="text-xs font-mono text-stone-400">
              Reference Cost: ~3,481 kcal/kg Wet Muscle
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            The Bioenergetic Cost of Building 1 kg of Skeletal Muscle
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Exploring the bottom-up energetic model for wet human skeletal muscle accretion—including chemical enthalpy, peptide synthesis, deposition efficiency, tissue maintenance, and diet-induced thermogenesis.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-stone-800/80 p-3 rounded-2xl border border-stone-700/60">
              <div className="text-xs text-stone-400 font-medium">Tissue Enthalpy</div>
              <div className="text-lg font-bold text-amber-400 font-mono">1,355 kcal/kg</div>
              <div className="text-[10px] text-stone-400">Stored potential energy</div>
            </div>
            <div className="bg-stone-800/80 p-3 rounded-2xl border border-stone-700/60">
              <div className="text-xs text-stone-400 font-medium">Synthesis & Deposition</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">2,587 kcal/kg</div>
              <div className="text-[10px] text-stone-400">Includes MPS inefficiency</div>
            </div>
            <div className="bg-stone-800/80 p-3 rounded-2xl border border-stone-700/60">
              <div className="text-xs text-stone-400 font-medium">Total Cost (Central)</div>
              <div className="text-lg font-bold text-cyan-400 font-mono">3,481 kcal/kg</div>
              <div className="text-[10px] text-stone-400">Includes RMR + DIT/TEF</div>
            </div>
            <div className="bg-stone-800/80 p-3 rounded-2xl border border-stone-700/60">
              <div className="text-xs text-stone-400 font-medium">Daily Tissue Cost</div>
              <div className="text-lg font-bold text-emerald-300 font-mono">~41 kcal/day</div>
              <div className="text-[10px] text-stone-400">1 kg gained over 12 wks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Select Interactive Simulation Scenario</span>
          </div>
          <span className="text-xs text-stone-500 font-mono">Presets & Real-time Sliders</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.entries(presets).map(([key, p]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className={`p-3.5 rounded-2xl text-left transition-all border ${
                activePreset === key 
                  ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-950 shadow-sm' 
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="font-bold text-xs flex items-center justify-between mb-1">
                <span>{p.name}</span>
                {activePreset === key && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              </div>
              <div className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                {p.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Controls & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Sliders & Controls */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-700" />
              <span>Simulation Parameters</span>
            </h3>
            <button 
              onClick={() => applyPreset('paper_study')}
              className="text-xs text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Slider 1: Target Muscle Gain */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-stone-700">
              <label className="flex items-center gap-1.5">
                <Dumbbell className="w-3.5 h-3.5 text-emerald-600" />
                Target Wet Muscle Mass:
              </label>
              <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                {targetKg.toFixed(2)} kg ({(targetKg * 2.20462).toFixed(2)} lbs)
              </span>
            </div>
            <input 
              type="range"
              min="0.2"
              max="4.0"
              step="0.1"
              value={targetKg}
              onChange={(e) => {
                setTargetKg(parseFloat(e.target.value));
                setActivePreset('custom');
              }}
              className="w-full accent-emerald-600 h-2 bg-stone-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>0.2 kg</span>
              <span>1.0 kg (Baseline)</span>
              <span>4.0 kg</span>
            </div>
          </div>

          {/* Slider 2: Timeframe (Weeks) */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-stone-700">
              <label className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                Gain Timeframe:
              </label>
              <span className="font-mono text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                {timeframeWeeks} Weeks ({totalDays} Days)
              </span>
            </div>
            <input 
              type="range"
              min="4"
              max="36"
              step="1"
              value={timeframeWeeks}
              onChange={(e) => {
                setTimeframeWeeks(parseInt(e.target.value, 10));
                setActivePreset('custom');
              }}
              className="w-full accent-amber-600 h-2 bg-stone-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>4 Wks</span>
              <span>12 Wks (Study)</span>
              <span>36 Wks</span>
            </div>
          </div>

          {/* Slider 3: Daily Caloric Surplus */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-stone-700">
              <label className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-600" />
                Prescribed Daily Surplus:
              </label>
              <span className="font-mono text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200">
                +{chosenSurplus} kcal/day
              </span>
            </div>
            <input 
              type="range"
              min="50"
              max="800"
              step="25"
              value={chosenSurplus}
              onChange={(e) => {
                setChosenSurplus(parseInt(e.target.value, 10));
                setActivePreset('custom');
              }}
              className="w-full accent-rose-600 h-2 bg-stone-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>+50 kcal</span>
              <span>+350 kcal</span>
              <span>+800 kcal</span>
            </div>
          </div>

          {/* Efficiency Model Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-600" />
              Protein Deposition Efficiency Variance:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'high', label: 'High Eff.', val: '3,204 kcal/kg' },
                { id: 'central', label: 'Central', val: '3,481 kcal/kg' },
                { id: 'low', label: 'Low Eff.', val: '3,710 kcal/kg' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setEfficiencyModel(m.id);
                    setActivePreset('custom');
                  }}
                  className={`p-2 rounded-xl text-center border transition text-xs ${
                    efficiencyModel === m.id
                      ? 'bg-cyan-50 border-cyan-500 font-bold text-cyan-900 ring-1 ring-cyan-400'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <div>{m.label}</div>
                  <div className="text-[10px] text-stone-400 font-mono">{m.val}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Zone 2 Integration Toggle */}
          <div className="space-y-2 pt-1 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Zone 2 Aerobic Base Protocol:</span>
              </label>
              <button
                onClick={() => setIncludeZone2(!includeZone2)}
                className={`px-3 py-1 rounded-xl font-bold text-xs transition border flex items-center gap-1.5 ${
                  includeZone2
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                    : 'bg-stone-100 text-stone-600 border-stone-300 hover:bg-stone-200'
                }`}
              >
                <span>{includeZone2 ? 'ON (3x 45m/wk)' : 'OFF (No Cardio)'}</span>
              </button>
            </div>
            <p className="text-[11px] text-stone-500 leading-normal">
              {includeZone2 
                ? 'Adds ~150 kcal/day of FATmax fat oxidation burn, improving P-ratio and preventing adipose fat accumulation.' 
                : 'Disabled. All unburned surplus calories flow directly into adipose tissue storage.'}
            </p>
          </div>

          {/* Quick Summary Card */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
            <div className="text-xs font-bold text-stone-800 flex items-center justify-between">
              <span>Calculated Muscle Energy Cost</span>
              <span className="font-mono text-emerald-700 font-extrabold">{totalMuscleEnergyCost.toLocaleString()} total kcal</span>
            </div>
            <div className="text-xs font-bold text-stone-800 flex items-center justify-between border-t border-stone-200 pt-2">
              <span>Pure Daily Tissue Requirement</span>
              <span className="font-mono text-emerald-800 font-black text-sm bg-emerald-100 px-2 py-0.5 rounded-lg border border-emerald-300">
                {dailyMuscleCostKcal.toFixed(1)} kcal/day
              </span>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed pt-1">
              Building <strong className="text-stone-800">{targetKg} kg</strong> of wet muscle over <strong className="text-stone-800">{timeframeWeeks} weeks</strong> requires just <strong className="text-emerald-700">{dailyMuscleCostKcal.toFixed(1)} kcal/day</strong> of pure tissue synthesis & maintenance energy.
            </p>
          </div>

        </div>

        {/* Right Column: Bioenergetic Breakdown & Surplus Destination */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Daily Surplus Destination Breakdown */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-rose-600" />
                  <span>Where Does Your +{chosenSurplus} kcal/day Surplus Go?</span>
                </h3>
                <p className="text-xs text-stone-500">
                  Comparing physical muscle accretion vs. training, NEAT & adipose fat storage
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-200">
                  {surplusMultiplier.toFixed(1)}x Pure Tissue Need
                </span>
              </div>
            </div>

            {/* Visual Stacked Bar */}
            <div className="space-y-2">
              <div className="h-6 w-full bg-stone-100 rounded-xl overflow-hidden flex shadow-inner">
                <div 
                  style={{ width: `${Math.min(100, (dailyMuscleCostKcal / chosenSurplus) * 100)}%` }}
                  className="bg-emerald-500 h-full flex items-center justify-center text-[10px] font-bold text-white font-mono transition-all"
                  title="Pure Muscle Tissue Cost"
                >
                  {((dailyMuscleCostKcal / chosenSurplus) * 100) > 10 ? `${((dailyMuscleCostKcal / chosenSurplus) * 100).toFixed(0)}%` : ''}
                </div>
                <div 
                  style={{ width: `${Math.min(100, (dailyTrainingWork / chosenSurplus) * 100)}%` }}
                  className="bg-sky-500 h-full flex items-center justify-center text-[10px] font-bold text-white font-mono transition-all"
                  title="Training Work Output"
                >
                  {((dailyTrainingWork / chosenSurplus) * 100) > 10 ? `${((dailyTrainingWork / chosenSurplus) * 100).toFixed(0)}%` : ''}
                </div>
                <div 
                  style={{ width: `${Math.min(100, (dailyNeatSpillover / chosenSurplus) * 100)}%` }}
                  className="bg-amber-500 h-full flex items-center justify-center text-[10px] font-bold text-white font-mono transition-all"
                  title="Spontaneous NEAT Burn"
                >
                  {((dailyNeatSpillover / chosenSurplus) * 100) > 10 ? `${((dailyNeatSpillover / chosenSurplus) * 100).toFixed(0)}%` : ''}
                </div>
                {includeZone2 && (
                  <div 
                    style={{ width: `${Math.min(100, (dailyZone2FatBurn / chosenSurplus) * 100)}%` }}
                    className="bg-teal-500 h-full flex items-center justify-center text-[10px] font-bold text-white font-mono transition-all"
                    title="Zone 2 FATmax Fat Oxidation"
                  >
                    {((dailyZone2FatBurn / chosenSurplus) * 100) > 10 ? `${((dailyZone2FatBurn / chosenSurplus) * 100).toFixed(0)}%` : ''}
                  </div>
                )}
                <div 
                  style={{ width: `${Math.min(100, (dailyAdiposeSurplusKcal / chosenSurplus) * 100)}%` }}
                  className="bg-rose-500 h-full flex items-center justify-center text-[10px] font-bold text-white font-mono transition-all"
                  title="Adipose Fat Gain Storage"
                >
                  {((dailyAdiposeSurplusKcal / chosenSurplus) * 100) > 12 ? `${((dailyAdiposeSurplusKcal / chosenSurplus) * 100).toFixed(0)}%` : ''}
                </div>
              </div>

              {/* Legend & Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Muscle Tissue</span>
                  </div>
                  <div className="text-sm font-black text-emerald-700 font-mono mt-0.5">
                    {dailyMuscleCostKcal.toFixed(1)} kcal
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">
                    {((dailyMuscleCostKcal / chosenSurplus) * 100).toFixed(1)}% of surplus
                  </div>
                </div>

                <div className="bg-sky-50 p-2.5 rounded-xl border border-sky-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                    <span>Training Work</span>
                  </div>
                  <div className="text-sm font-black text-sky-700 font-mono mt-0.5">
                    {dailyTrainingWork.toFixed(0)} kcal
                  </div>
                  <div className="text-[10px] text-sky-600 font-medium">
                    {((dailyTrainingWork / chosenSurplus) * 100).toFixed(1)}% of surplus
                  </div>
                </div>

                <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span>NEAT & Heat</span>
                  </div>
                  <div className="text-sm font-black text-amber-700 font-mono mt-0.5">
                    {dailyNeatSpillover.toFixed(0)} kcal
                  </div>
                  <div className="text-[10px] text-amber-600 font-medium">
                    {((dailyNeatSpillover / chosenSurplus) * 100).toFixed(1)}% of surplus
                  </div>
                </div>

                <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span>Fat Accretion</span>
                  </div>
                  <div className="text-sm font-black text-rose-700 font-mono mt-0.5">
                    {dailyAdiposeSurplusKcal.toFixed(0)} kcal
                  </div>
                  <div className="text-[10px] text-rose-600 font-medium">
                    {((dailyAdiposeSurplusKcal / chosenSurplus) * 100).toFixed(1)}% of surplus
                  </div>
                </div>
              </div>
            </div>

            {/* Projected Body Composition Outcome */}
            <div className="bg-stone-900 text-stone-100 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between text-xs font-bold border-b border-stone-800 pb-2">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Target className="w-4 h-4" />
                  12-Week Projected Body Composition Shift
                </span>
                <span className="text-stone-400 font-mono">
                  Total Intake: +{totalSurplusKcalOverall.toLocaleString()} surplus kcal
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-stone-800/90 p-3 rounded-xl border border-stone-700">
                  <div className="text-xs text-stone-400 font-medium">Muscle Mass Built</div>
                  <div className="text-xl font-black text-emerald-400 font-mono">+ {targetKg.toFixed(2)} kg</div>
                  <div className="text-[10px] text-emerald-300 font-semibold">{musclePctOfWeightGain.toFixed(1)}% of weight gained</div>
                </div>

                <div className="bg-stone-800/90 p-3 rounded-xl border border-stone-700">
                  <div className="text-xs text-stone-400 font-medium">Fat Mass Gained</div>
                  <div className="text-xl font-black text-rose-400 font-mono">+ {totalFatGainedKg.toFixed(2)} kg</div>
                  <div className="text-[10px] text-rose-300 font-semibold">{fatPctOfWeightGain.toFixed(1)}% of weight gained</div>
                </div>

                <div className="bg-stone-800/90 p-3 rounded-xl border border-stone-700">
                  <div className="text-xs text-stone-400 font-medium">Total Scale Shift</div>
                  <div className="text-xl font-black text-white font-mono">+ {totalWeightGainKg.toFixed(2)} kg</div>
                  <div className="text-[10px] text-stone-400 font-medium">({(totalWeightGainKg * 2.20462).toFixed(1)} lbs scale weight)</div>
                </div>
              </div>

              {dailyAdiposeSurplusKcal > 150 && (
                <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-amber-300 text-xs leading-relaxed">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>High Fat Accretion Warning:</strong> Your surplus (+{chosenSurplus} kcal/day) is <strong>{surplusMultiplier.toFixed(1)}x higher</strong> than the energetic requirement of muscle tissue deposition. Over {timeframeWeeks} weeks, this yields <strong>{totalFatGainedKg.toFixed(2)} kg of body fat</strong> alongside muscle.
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* Bottom-Up Bioenergetic Waterfall Details */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-4">
            <h3 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Bottom-Up Energetic Waterfall (Per 1 kg Muscle)</span>
            </h3>

            <div className="space-y-3">
              {[
                { 
                  stage: "1. Tissue Enthalpy (Chemical Energy)", 
                  val: "~1,355 kcal", 
                  desc: "Direct chemical potential energy stored in 177g protein, 30g lipid, and 20g glycogen.", 
                  color: "bg-emerald-500",
                  pct: 39 
                },
                { 
                  stage: "2. Direct Biochemical Synthesis", 
                  val: "+160 kcal (~1,515 kcal)", 
                  desc: "ATP cost of peptide bond formation (~4 ATP/amino acid) & lipogenesis/glycogenesis.", 
                  color: "bg-sky-500",
                  pct: 44 
                },
                { 
                  stage: "3. Deposition Efficiency Inefficiency", 
                  val: "+1,072 kcal (~2,587 kcal)", 
                  desc: "Accounts for protein turnover dynamics (continuous MPS vs. MPB protein breakdown).", 
                  color: "bg-indigo-500",
                  pct: 74 
                },
                { 
                  stage: "4. 12-Week Maintenance Cost", 
                  val: "+546 kcal (~3,133 kcal)", 
                  desc: "RMR metabolic maintenance of the expanding muscle mass during accretion.", 
                  color: "bg-amber-500",
                  pct: 90 
                },
                { 
                  stage: "5. Diet-Induced Thermogenesis (DIT)", 
                  val: "+348 kcal (~3,481 kcal)", 
                  desc: "Thermic Effect of Food (TEF) from digesting and processing extra substrate.", 
                  color: "bg-rose-500",
                  pct: 100 
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                    <span>{item.stage}</span>
                    <span className="font-mono text-emerald-800">{item.val}</span>
                  </div>
                  <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full transition-all`} style={{ width: `${item.pct}%` }} />
                  </div>
                  <p className="text-[11px] text-stone-500 leading-normal">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Zone 2 & Muscle Accretion Synergy Section */}
      <div className="bg-gradient-to-br from-teal-900 via-stone-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl space-y-6 border border-teal-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-teal-800/80 pb-4">
          <div className="flex items-center gap-2 font-bold text-sm text-teal-300">
            <Activity className="w-5 h-5 text-teal-400" />
            <span>The Zone 2 Bioenergetic Link: Aerobic Base & Muscle Accretion</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-mono font-bold">
            FATmax & Lactate Clearance
          </span>
        </div>

        <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
          Zone 2 training directly optimizes the bioenergetic efficiency of muscle hypertrophy by solving the <strong>"Bulking Surplus Paradox"</strong>—allowing you to maintain a surplus for anabolic signaling while preventing excess fat gain and accelerating intra-set recovery.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-stone-800/80 p-4 rounded-2xl border border-stone-700/80 space-y-1.5">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              <span>1. FATmax Substrate Partitioning</span>
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              Zone 2 selectively burns excess circulating lipids (~0.6-0.8g fat/min), diverting surplus glucose and amino acids into muscle glycogen & protein synthesis instead of de novo lipogenesis (fat storage).
            </p>
          </div>

          <div className="bg-stone-800/80 p-4 rounded-2xl border border-stone-700/80 space-y-1.5">
            <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>2. MCT-1 Lactate Shuttle</span>
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              Type I slow-twitch fibers built in Zone 2 upregulate MCT-1 transporters, converting anaerobic lactate from heavy lifting back into Pyruvate to fuel mitochondrial ATP production between sets.
            </p>
          </div>

          <div className="bg-stone-800/80 p-4 rounded-2xl border border-stone-700/80 space-y-1.5">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>3. No mTOR Interference</span>
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              Unlike Zone 4-5 high-intensity cardio which causes severe glycogen depletion and prolonged AMPK spikes, Zone 2 produces low structural fatigue, preserving full mTORC1 muscle building signaling.
            </p>
          </div>

          <div className="bg-stone-800/80 p-4 rounded-2xl border border-stone-700/80 space-y-1.5">
            <div className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>4. Capillary Angiogenesis</span>
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              Expands microvascular capillary density around Type II muscle fibers, accelerating amino acid (leucine) perfusion and reducing resting metabolic maintenance strain on newly accrued tissue.
            </p>
          </div>
        </div>
      </div>

      {/* 1:1 Body Recomposition Phenomenon Feature Card */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl space-y-5 border border-amber-800/80 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-800/60 pb-3">
          <div className="flex items-center gap-2 font-black text-base text-amber-400">
            <RefreshCw className="w-5 h-5 text-amber-400 animate-spin-slow" />
            <span>The 1:1 Body Recomposition Phenomenon (ΔFat kg = ΔMuscle kg)</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
            Autocrine Energy Recycling
          </span>
        </div>

        <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
          How can an athlete gain <strong className="text-emerald-400">+1.0 kg of pure muscle mass</strong> while losing <strong className="text-rose-400">-1.0 kg of body fat</strong> at net-zero scale weight change? Through <strong>Substrate Recycling</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 space-y-2">
            <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4" />
              <span>1. The Fat Energy Deposit</span>
            </div>
            <div className="text-lg font-mono font-black text-rose-300">~7,700 to 9,000 kcal</div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Every 1 kg of stored adipose fat contains up to 9,000 kcal of potential bioenergetic fuel.
            </p>
          </div>

          <div className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 space-y-2">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4" />
              <span>2. The Muscle Building Cost</span>
            </div>
            <div className="text-lg font-mono font-black text-emerald-300">~3,481 kcal / kg</div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Physical tissue accretion requires ~3,481 kcal total across 12 weeks.
            </p>
          </div>

          <div className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 space-y-2">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>3. The 2.2x Energy Surplus</span>
            </div>
            <div className="text-lg font-mono font-black text-amber-300">1 kg Fat ➔ 1 kg Muscle + Gym</div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Breaking down 1 kg of fat provides 2.2x more energy than needed to build 1 kg of muscle, with the rest powering resistance training workouts!
            </p>
          </div>
        </div>

        <div className="bg-stone-900/90 p-4 rounded-2xl border border-teal-800/60 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-teal-300">
            <span className="flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-teal-400" />
              The Tissue Density & Volumetric Difference (1 kg Fat vs 1 kg Muscle)
            </span>
            <span className="font-mono text-[10px] text-teal-200 bg-teal-900/60 px-2 py-0.5 rounded-lg border border-teal-700">
              Fat Density: 0.90 g/cm³ vs Muscle Density: 1.06 g/cm³
            </span>
          </div>
          <p className="text-[11px] text-stone-300 leading-relaxed">
            Because fat is significantly less dense than muscle, <strong>1 kg of body fat takes up 1.11 Liters of volume</strong>, whereas <strong>1 kg of muscle takes up only 0.94 Liters</strong>. When you replace 1 kg of fat with 1 kg of muscle, your scale weight stays identical (~80 kg), but your physical body volume <strong>shrinks by ~170 mL (~18% volume reduction)</strong>—making your waist tighter, clothes fit looser, and physique visibly firmer!
          </p>
        </div>

        <div className="bg-stone-950/80 p-4 rounded-2xl border border-amber-900/40 text-xs text-amber-200/90 leading-relaxed font-mono">
          📌 Real-World Note: Scale weight stays flat at ~80 kg, but body composition transforms completely. Zone 2 beta-oxidation acts as the key catalyst enabling the mitochondria to extract fat energy without triggering systemic fatigue.
        </div>
      </div>

      {/* Scientific Synthesis & Takeaway Box */}
      <div className="bg-emerald-950 text-emerald-50 p-6 sm:p-8 rounded-3xl space-y-4 border border-emerald-900 shadow-lg">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Physiological Synthesis: Why Athletes Shouldn't Just Eat +41 kcal/day</span>
        </div>
        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
          While the physical energy required to construct <strong className="text-white font-mono">1 kg</strong> of wet skeletal muscle over 12 weeks equates to only <strong className="text-white font-mono">~41 kcal/day</strong>, simply adding <strong className="text-white font-mono">+41 kcal/day</strong> to baseline nutrition rarely yields maximal hypertrophy in practice.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-emerald-900/60 p-4 rounded-2xl border border-emerald-800 space-y-1">
            <h4 className="font-bold text-xs text-emerald-300">1. Baseline Tracking Noise</h4>
            <p className="text-[11px] text-emerald-200/80 leading-relaxed">
              Standard daily TDEE fluctuates by ±100 to 200 kcal/day due to sodium, water balance, and digestion. A +41 kcal micro-surplus is easily lost in tracking error.
            </p>
          </div>

          <div className="bg-emerald-900/60 p-4 rounded-2xl border border-emerald-800 space-y-1">
            <h4 className="font-bold text-xs text-emerald-300">2. mTOR & Anabolic Signaling</h4>
            <p className="text-[11px] text-emerald-200/80 leading-relaxed">
              Hypertrophy pathways thrive on cellular energy abundance. Elevated intracellular ATP/AMP ratios and insulin/IGF-1 signaling maximize fractional synthetic rate (FSR).
            </p>
          </div>

          <div className="bg-emerald-900/60 p-4 rounded-2xl border border-emerald-800 space-y-1">
            <h4 className="font-bold text-xs text-emerald-300">3. NEAT & Work Output</h4>
            <p className="text-[11px] text-emerald-200/80 leading-relaxed">
              Hard resistance training demands added glycogen resynthesis, post-exercise oxygen consumption (EPOC), and compensates for spontaneous activity increases.
            </p>
          </div>
        </div>

        <div className="text-center text-xs text-emerald-300 italic pt-2 font-mono border-t border-emerald-900">
          Recommendation: Target a modest +150 to +250 kcal/day surplus to optimize muscle gain while preventing excess fat accumulation.
        </div>
      </div>
    </article>
  );
}
