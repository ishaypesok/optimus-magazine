import React, { useState } from 'react';
import { 
  Activity, ShieldCheck, Flame, Zap, Heart, Cpu, Brain, Layers, RefreshCw, 
  Lightbulb, Sliders, CheckCircle2, AlertTriangle, ArrowRight, Dna, HelpCircle, Sparkles, FileText, Droplet, BarChart2, Target, SlidersHorizontal
} from 'lucide-react';
import { LACTATE_MASTERCLASS_DATA, LAB_LACTATE_TEST_DATA } from '../data/metabolismData';
import LactateParadoxInfographic from './LactateParadoxInfographic';

export default function LactateMasterclass() {
  const [activeTab, setActiveTab] = useState('infographic'); // Default tab shows the featured infographic poster!
  const [selectedZone, setSelectedZone] = useState(2);
  const [selectedLabStage, setSelectedLabStage] = useState(3); // Stage 3 = LT1 Zone 2 Ceiling (1.7 mmol/L)
  const [activeCoriStep, setActiveCoriStep] = useState(0);

  // Lactate concentration & kinetics specs by exercise zone
  const ZONE_LACTATE_SPECS = {
    1: { name: 'Zone 1 (Rest / Easy Walk)', concentration: '1.0 - 1.2 mmol/L', status: 'Resting Baseline', clearanceRate: 100, productionRate: 15, hPlusAcidosis: 'None', desc: 'Minimal lactate generation. Baseline metabolic turnover smoothly cleared by resting slow-twitch fibers.' },
    2: { name: 'Zone 2 (Target: 126–140 BPM)', concentration: '1.5 - 2.0 mmol/L', status: 'Optimal Steady State (LT1)', clearanceRate: 100, productionRate: 65, hPlusAcidosis: 'Zero Buffering Stress', desc: 'Lactate clearance matches production 1:1! MCT-1 transporters shuttle lactate directly into mitochondria without H+ accumulation.' },
    3: { name: 'Zone 3 (Tempo / Steady)', concentration: '2.5 - 3.5 mmol/L', status: 'Moderate Accumulation', clearanceRate: 85, productionRate: 90, hPlusAcidosis: 'Mild H+ Stress', desc: 'Glycolytic rate increases. MCT-1 transporters begin approaching saturation, causing mild blood lactate elevation.' },
    4: { name: 'Zone 4 (Threshold / LT2)', concentration: '4.0 - 6.0 mmol/L', status: 'Lactate Threshold 2 (MLSS)', clearanceRate: 50, productionRate: 140, hPlusAcidosis: 'Moderate Acidosis', desc: 'Maximal Lactate Steady State exceeded. Pyruvate outpaces mitochondrial intake capacity; H+ ions cause progressive leg burning.' },
    5: { name: 'Zone 5 (All-Out Sprint)', concentration: '8.0 - 14.0+ mmol/L', status: 'Severe Acidosis & Exhaustion', clearanceRate: 15, productionRate: 250, hPlusAcidosis: 'Severe Acidosis (pH < 7.1)', desc: 'Rapid anaerobic glycogen breakdown floods muscle with lactate and H+. Severe intracellular acidosis forces muscular shutdown.' }
  };

  const currentZoneSpec = ZONE_LACTATE_SPECS[selectedZone];
  const currentLabStage = LAB_LACTATE_TEST_DATA.stages.find(s => s.stage === selectedLabStage) || LAB_LACTATE_TEST_DATA.stages[2];

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">
      
      {/* Page Title & Badge */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wider border border-amber-300 inline-flex items-center gap-1.5 shadow-xs">
            <Activity className="w-3.5 h-3.5 text-amber-700" />
            Page 6 • Deep Bioenergetics Masterclass
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-300">
            🖼️ Feature: Optimus Magazine Infographic
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight tracking-tight">
          What is Lactate? <span className="text-amber-700">The Premium Cellular Fuel & Buffer</span>
        </h2>

        <p className="text-stone-600 text-sm sm:text-base max-w-4xl font-normal leading-relaxed">
          Demolishing the 80-year-old myth of "lactic acid waste." Learn what lactate actually is, how it fuels your heart and brain, acts as a signaling hormone ("lactormone"), and recycles energy during Zone 2 exercise!
        </p>
      </div>

      {/* FEATURED INFOGRAPHIC CALLOUT PROMPT */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300 shrink-0 font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase font-extrabold text-emerald-300 tracking-wider">
              Featured Magazine Infographic
            </div>
            <div className="text-sm font-bold text-white">
              The Lactate Paradox: Fuel, Not Poison
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('infographic')}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-xs transition shadow-sm shrink-0 flex items-center gap-1.5"
        >
          <span>View Infographic Poster & Digital Edition</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Tabs Navigation */}
      <div className="border-b border-stone-200">
        <nav className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'infographic', label: '🖼️ Infographic Poster & Digital Edition', icon: Sparkles },
            { id: 'labtest', label: '🧪 Lab Lactate Test (Finger-Prick Protocol)', icon: Droplet },
            { id: 'definition', label: '💡 What is Lactate? (Detailed Guide)', icon: Lightbulb },
            { id: 'shuttle', label: '🍷 The Lactate Shuttle (MCT-1 & MCT-4)', icon: Activity },
            { id: 'myths', label: '🛑 Debunking 4 Major Myths', icon: AlertTriangle },
            { id: 'organs', label: '🫀 Heart & Brain Superfuel', icon: Heart },
            { id: 'cori', label: '🔄 The Cori Cycle (Liver)', icon: RefreshCw },
            { id: 'simulator', label: '🧪 Zone 1–5 Lactate Clearance Visualizer', icon: Sliders }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-800 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* ==================== TAB: INFOGRAPHIC POSTER ==================== */}
      {activeTab === 'infographic' && (
        <LactateParadoxInfographic />
      )}

      {/* ==================== TAB: LABORATORY LACTATE TEST ==================== */}
      {activeTab === 'labtest' && (
        <div className="space-y-6 animate-fade-in font-sans">
          
          {/* Main Lab Test Container */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-300 shadow-md space-y-8">
            
            {/* Header Title & Badges */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-800 tracking-wider">
                  <Droplet className="w-4 h-4 text-rose-600 animate-pulse" />
                  <span>Laboratory Bioenergetic Diagnostics</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  {LAB_LACTATE_TEST_DATA.overview.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm font-normal max-w-3xl leading-relaxed">
                  {LAB_LACTATE_TEST_DATA.overview.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-[11px] font-extrabold text-stone-700">
                <span className="px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-300 flex items-center gap-1.5">
                  🧪 Capillary Finger-Prick
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-950 border border-amber-300 flex items-center gap-1.5">
                  🩸 mmol/L Analyzer
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-950 border border-emerald-300 flex items-center gap-1.5">
                  🎯 LT1 & LT2 Discovery
                </span>
              </div>
            </div>

            {/* Description & Equipment Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="lg:col-span-2 p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                <div className="font-extrabold text-amber-950 text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-700" />
                  <span>How Laboratory Lactate Testing Works</span>
                </div>
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-normal">
                  {LAB_LACTATE_TEST_DATA.overview.description}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="font-extrabold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  ⚙️ Standard Lab Equipment
                </div>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {LAB_LACTATE_TEST_DATA.overview.equipment.map((eq, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 font-medium">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* The 3 Core Threshold Milestones Cards */}
            <div className="space-y-4">
              <h4 className="text-base font-black text-stone-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-700" />
                <span>The 3 Key Milestones Discovered in a Lab Test</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {LAB_LACTATE_TEST_DATA.milestones.map((m, idx) => (
                  <div 
                    key={idx} 
                    className={`p-5 rounded-2xl border space-y-3 ${
                      m.code === 'LT1' 
                        ? 'bg-emerald-50/90 border-emerald-300 shadow-xs' 
                        : m.code === 'LT2'
                        ? 'bg-rose-50/90 border-rose-300'
                        : 'bg-stone-50 border-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-stone-900 text-white font-mono text-xs font-black">
                        {m.code}
                      </span>
                      <span className="text-xs font-black text-stone-900 font-mono bg-white/80 px-2 py-0.5 rounded-full border border-stone-200">
                        {m.range}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="font-extrabold text-stone-900 text-sm">{m.title}</div>
                      {m.badge && (
                        <div className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">
                          {m.badge}
                        </div>
                      )}
                      <p className="text-xs text-stone-600 leading-relaxed font-normal">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INTERACTIVE TREADMILL STAGE SIMULATOR & BLOOD SAMPLE CARD */}
            <div className="p-6 rounded-3xl bg-stone-900 text-stone-100 space-y-6 shadow-xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-rose-400 font-extrabold text-xs uppercase tracking-widest">
                    <Droplet className="w-4 h-4 text-rose-500 animate-bounce" />
                    Interactive Lab Treadmill Simulator
                  </div>
                  <h4 className="text-lg font-black text-white mt-0.5">
                    Select a Treadmill Stage to View Blood Lactate & Finger-Prick Data
                  </h4>
                </div>

                <div className="px-3 py-1 rounded-xl bg-stone-800 border border-stone-700 text-xs font-mono text-emerald-400">
                  Current Stage: <strong className="text-white">Stage {currentLabStage.stage} ({currentLabStage.speedKmh} km/h)</strong>
                </div>
              </div>

              {/* Treadmill Stage Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {LAB_LACTATE_TEST_DATA.stages.map((s) => {
                  const isSelected = selectedLabStage === s.stage;
                  return (
                    <button
                      key={s.stage}
                      onClick={() => setSelectedLabStage(s.stage)}
                      className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between space-y-1 ${
                        isSelected
                          ? s.isLT1
                            ? 'bg-emerald-900/90 text-emerald-100 border-emerald-500 ring-2 ring-emerald-500/50'
                            : s.isLT2
                            ? 'bg-rose-900/90 text-rose-100 border-rose-500 ring-2 ring-rose-500/50'
                            : 'bg-amber-900/90 text-amber-100 border-amber-500 ring-2 ring-amber-500/50'
                          : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 border border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase opacity-80">Stage {s.stage}</span>
                        {s.isLT1 && <span className="text-[10px] font-black text-emerald-300">LT1 🎯</span>}
                        {s.isLT2 && <span className="text-[10px] font-black text-rose-300">LT2 ⚠️</span>}
                      </div>
                      <div className="text-xs font-black">{s.speedKmh} km/h</div>
                      <div className="text-[11px] font-mono text-stone-400">{s.lactateMmol} mmol/L</div>
                    </button>
                  );
                })}
              </div>

              {/* Detailed Finger-Prick Blood Sample Display Card */}
              <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                
                {/* Visual Blood Drop Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-950/60 to-stone-900 border border-rose-900/40 text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-rose-900/40 border border-rose-600/50 flex items-center justify-center mx-auto text-rose-400 shadow-lg">
                    <Droplet className="w-7 h-7 text-rose-500 fill-rose-500/30 animate-pulse" />
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-rose-300">
                    Capillary Blood Sample #{currentLabStage.stage}
                  </div>
                  <div className="text-3xl font-black text-white font-mono">
                    {currentLabStage.lactateMmol} <span className="text-xs font-sans text-stone-400">mmol/L</span>
                  </div>
                  <div className="text-[11px] font-bold text-stone-400">
                    Volume: 0.2 µL • Micro-Lancet
                  </div>
                </div>

                {/* Treadmill Stats */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-stone-400 uppercase">Treadmill Speed & Workload</div>
                      <div className="text-lg font-black text-white">
                        {currentLabStage.speedKmh} km/h <span className="text-xs text-stone-400 font-mono">({currentLabStage.paceMinKm} min/km)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-stone-400 uppercase">Heart Rate</div>
                        <div className="text-lg font-black text-rose-400 font-mono">{currentLabStage.hrBpm} BPM</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-stone-400 uppercase">Exercise Zone</div>
                        <div className="text-lg font-black text-emerald-400">Zone {currentLabStage.zone}</div>
                      </div>
                    </div>
                  </div>

                  {/* Stage Analysis Note */}
                  <div className={`p-4 rounded-xl text-xs leading-relaxed font-medium ${
                    currentLabStage.isLT1 
                      ? 'bg-emerald-950/80 text-emerald-200 border border-emerald-700/60 font-bold'
                      : currentLabStage.isLT2
                      ? 'bg-rose-950/80 text-rose-200 border border-rose-700/60 font-bold'
                      : 'bg-stone-900 text-stone-300 border border-stone-800'
                  }`}>
                    <div className="font-extrabold text-xs uppercase mb-1">
                      🔬 Lab Stage {currentLabStage.stage} Diagnostics: {currentLabStage.status}
                    </div>
                    <p>{currentLabStage.note}</p>
                  </div>
                </div>

              </div>

            </div>

            {/* VISUAL LACTATE THRESHOLD CURVE GRAPH */}
            <div className="space-y-4 pt-2">
              <h4 className="text-base font-black text-stone-900 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-amber-700" />
                <span>Lab Lactate Curve (Speed vs. Blood Lactate in mmol/L)</span>
              </h4>

              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                
                {/* Bar Chart Visualization */}
                <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end h-44 pt-6 pb-2 border-b border-stone-300">
                  {LAB_LACTATE_TEST_DATA.stages.map((s) => {
                    const heightPercent = Math.min((s.lactateMmol / 10) * 100, 100);
                    const isSelected = selectedLabStage === s.stage;
                    return (
                      <div 
                        key={s.stage} 
                        onClick={() => setSelectedLabStage(s.stage)}
                        className="flex flex-col items-center gap-1 cursor-pointer group h-full justify-end"
                      >
                        <span className="text-[10px] font-mono font-bold text-stone-700">
                          {s.lactateMmol}
                        </span>

                        <div className="w-full bg-stone-200 rounded-t-xl h-full flex items-end overflow-hidden p-0.5">
                          <div 
                            className={`w-full rounded-t-lg transition-all duration-300 ${
                              s.isLT1 
                                ? 'bg-emerald-600 group-hover:bg-emerald-500' 
                                : s.isLT2
                                ? 'bg-rose-600 group-hover:bg-rose-500'
                                : 'bg-amber-600 group-hover:bg-amber-500'
                            } ${isSelected ? 'ring-2 ring-stone-900 shadow-md' : 'opacity-80'}`}
                            style={{ height: `${heightPercent}%` }}
                          />
                        </div>

                        <span className="text-[10px] font-bold text-stone-600 mt-1">
                          {s.speedKmh}k
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-stone-600">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-600 inline-block" /> 🎯 LT1 (Zone 2 Ceiling ~1.7 mmol/L)</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-600 inline-block" /> ⚠️ LT2 (Anaerobic Threshold ~4.3 mmol/L)</span>
                  </div>
                  <span className="text-stone-500 text-[11px]">Click any bar to select stage</span>
                </div>

              </div>
            </div>

            {/* STEP-BY-STEP FINGER-PRICK LAB TESTING PROTOCOL */}
            <div className="space-y-4 pt-2">
              <h4 className="text-base font-black text-stone-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-700" />
                <span>The 4-Step Finger-Prick Lab Testing Protocol</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
                {LAB_LACTATE_TEST_DATA.labProtocolSteps.map((p, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-xs">
                      {p.step}
                    </div>
                    <div className="font-extrabold text-stone-900 text-sm">{p.title}</div>
                    <p className="text-stone-600 text-xs leading-relaxed font-normal">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ==================== TAB 0: WHAT IS LACTATE DETAILED GUIDE ==================== */}
      {activeTab === 'definition' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-6">
            
            <div className="border-b border-stone-200 pb-4">
              <h3 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                What is Lactate? (Complete Friendly Breakdown)
              </h3>
              <p className="text-xs text-stone-600">
                Understanding the chemistry, origin, and physiological purpose of lactate in 3 simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-800 text-xs sm:text-sm leading-relaxed">
              
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                <div className="font-extrabold text-amber-950 text-sm flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-800 text-white flex items-center justify-center text-xs font-bold">1</span>
                  Where does Lactate come from?
                </div>
                <p className="text-stone-700 leading-relaxed font-normal">
                  When your body breaks down carbohydrates (Glucose) for fast energy, it undergoes a process called <strong>Glycolysis</strong> in the cytoplasm.
                </p>
                <p className="text-stone-700 leading-relaxed font-normal">
                  Each 6-carbon Glucose molecule is split into two 3-carbon molecules called <strong>Pyruvate</strong>. When energy demand is high or mitochondria are busy, Pyruvate is rapidly converted into <strong>Lactate</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                <div className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs font-bold">2</span>
                  Why is Lactate NOT a waste product?
                </div>
                <p className="text-stone-700 leading-relaxed font-normal">
                  Lactate is packed with high-energy electrons! It contains almost <strong>95% of the original energy stored in glucose</strong>.
                </p>
                <p className="text-stone-700 leading-relaxed font-normal">
                  Instead of throwing it away as waste, your body shuttles lactate to slow-twitch muscle mitochondria, the heart, and the brain, where it is converted back into Pyruvate and burned cleanly for ATP energy!
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 space-y-3">
                <div className="font-extrabold text-teal-950 text-sm flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal-800 text-white flex items-center justify-center text-xs font-bold">3</span>
                  Lactate in Zone 2 Exercise
                </div>
                <p className="text-stone-700 leading-relaxed font-normal">
                  In Zone 2 exercise, your body produces lactate steadily from active muscles.
                </p>
                <p className="text-stone-700 leading-relaxed font-normal">
                  Because your slow-twitch muscle fibers have high mitochondrial density and dense MCT-1 transporters, <strong>lactate clearance speed matches production 1:1 (~1.5 to 2.0 mmol/L)</strong>, leaving zero excess acid to cause muscle burn!
                </p>
              </div>

            </div>

            {/* Deep Dive Card: How Protons (H+) Cause the Burn & How Lactate Buffers Them */}
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 space-y-4">
              <div className="flex items-center gap-2 text-amber-950 font-extrabold text-base">
                <Zap className="w-5 h-5 text-amber-700" />
                <span>Deep Dive: Why Hydrogen Protons ($H^+$) Cause the Burn & How Lactate Buffers Them</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-800 leading-relaxed">
                <div className="p-4 rounded-xl bg-white border border-amber-200 space-y-2">
                  <div className="font-extrabold text-rose-900 text-xs uppercase flex items-center gap-1.5">
                    <span>🔥 1. What Actually Causes the Muscle Burn?</span>
                  </div>
                  <p className="text-stone-700">
                    During hard sprints, your muscles rapidly break down ATP energy. This chemical reaction releases free <strong>Hydrogen Protons ($H^+$)</strong> directly into the muscle cell.
                  </p>
                  <p className="text-stone-700">
                    <strong>Free $H^+$ ions are pure acid!</strong> They drop your intracellular pH from 7.1 down to 6.5, inhibiting muscle contraction enzymes and stimulating nerve pain receptors. <em>This $H^+$ acid accumulation is what causes the intense muscle burn!</em>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-emerald-200 space-y-2">
                  <div className="font-extrabold text-emerald-900 text-xs uppercase flex items-center gap-1.5">
                    <span>🧽 2. How Lactate Acts Like an "Acid Sponge"</span>
                  </div>
                  <p className="text-stone-700">
                    When the enzyme <strong>Lactate Dehydrogenase (LDH)</strong> converts Pyruvate into Lactate, it <strong>consumes 1 free $H^+$ proton</strong> from the cell cytosol:
                  </p>
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-950 font-mono text-[11px] font-bold text-center">
                    Pyruvate + NADH + H⁺ → Lactate + NAD⁺
                  </div>
                  <p className="text-stone-700">
                    By absorbing a free $H^+$ proton, creating Lactate <strong>removes acid from the cell!</strong> Furthermore, when MCT transporters export Lactate into the blood, it carries another $H^+$ proton out with it!
                  </p>
                </div>
              </div>
            </div>

            {/* Explanation Card: Why Do Muscles Eventually Fall Down? */}
            <div className="p-6 rounded-2xl bg-rose-50 border border-rose-300 space-y-4">
              <div className="flex items-center gap-2 text-rose-950 font-extrabold text-base">
                <AlertTriangle className="w-5 h-5 text-rose-700" />
                <span>Why Do Muscles Eventually "Fall Down"? (The 4 Causes of Exhaustion)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-stone-800">
                <div className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-1">
                  <div className="font-extrabold text-rose-950 text-xs uppercase">🌊 1. Acid Sponge Overflooded</div>
                  <p className="text-stone-700 leading-relaxed font-normal">
                    In Zone 4/5, $H^+$ acid is produced 5x faster than MCT transporters can export it. Acidity spikes, locking muscle enzymes.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-1">
                  <div className="font-extrabold text-rose-950 text-xs uppercase">🔒 2. Calcium-Troponin Blockade</div>
                  <p className="text-stone-700 leading-relaxed font-normal">
                    Excess H⁺ protons physically block Calcium ions (Ca²⁺) from binding to Troponin, preventing muscle fibers from contracting!
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-1">
                  <div className="font-extrabold text-rose-950 text-xs uppercase">⛽ 3. Glycogen "Bonk"</div>
                  <p className="text-stone-700 leading-relaxed font-normal">
                    High intensity burns pure glycogen. Once muscle carbohydrate stores drop to zero, ATP production plummets.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-1">
                  <div className="font-extrabold text-rose-950 text-xs uppercase">🧠 4. Brain Central Governor</div>
                  <p className="text-stone-700 leading-relaxed font-normal">
                    The brain senses rising heat and acidity, reducing electrical drive to muscles to protect the heart from damage.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================== TAB 1: THE LACTATE SHUTTLE ==================== */}
      {activeTab === 'shuttle' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-6">
            
            <div className="border-b border-stone-200 pb-4">
              <h3 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-700" />
                The Cell-to-Cell & Intracellular Lactate Shuttle (Dr. George Brooks Discovery)
              </h3>
              <p className="text-xs text-stone-600">
                How fast-twitch fibers generate lactate, and slow-twitch mitochondria import and burn it.
              </p>
            </div>

            {/* Shuttle Visual Diagram Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              
              {/* Step 1: Fast Twitch Production */}
              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-rose-200 text-rose-950 font-black text-xs uppercase">
                    Step 1 • Production
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-800">MCT-4 Exporter</span>
                </div>
                <h4 className="font-extrabold text-stone-900 text-base">Fast-Twitch (Type II) Muscle</h4>
                <p className="text-xs text-stone-700 leading-relaxed">
                  During movement, fast-twitch fibers quickly convert glucose to Pyruvate. High glycolytic flux creates Lactate, which is exported out of the cell via <strong>MCT-4 transporters</strong> into the extracellular fluid and bloodstream.
                </p>
              </div>

              {/* Step 2: Blood Circulation */}
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded bg-amber-200 text-amber-950 font-black text-xs uppercase">
                      Step 2 • Transport
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-800">Systemic Blood Flow</span>
                  </div>
                  <h4 className="font-extrabold text-stone-900 text-base">Circulating Lactate Pool</h4>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    Lactate travels smoothly through blood vessels to oxidative tissues. In Zone 2 exercise, blood concentration remains steady (~1.5–2.0 mmol/L) because clearance speed perfectly matches generation rate.
                  </p>
                </div>
                <div className="text-center pt-2 text-amber-800 font-bold text-xs">
                  ⚡ Energy Carrier Molecule
                </div>
              </div>

              {/* Step 3: Slow Twitch Import & Oxidation */}
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-emerald-200 text-emerald-950 font-black text-xs uppercase">
                    Step 3 • Oxidation
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-800">MCT-1 Importer</span>
                </div>
                <h4 className="font-extrabold text-stone-900 text-base">Slow-Twitch (Type I) Mitochondria</h4>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Slow-twitch fibers express dense <strong>MCT-1 transporters</strong>. They pull lactate into the mitochondrial matrix, where mitochondrial LDH (m-LDH) converts it to Pyruvate to fuel the Krebs Cycle!
                </p>
              </div>

            </div>

            {/* Transporter Specs Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {LACTATE_MASTERCLASS_DATA.shuttleTransporters.map((trans, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="text-xs font-extrabold text-amber-900">{trans.name}</div>
                  <div className="text-[11px] font-bold text-stone-500 uppercase">{trans.role} • {trans.location}</div>
                  <p className="text-xs text-stone-700 leading-relaxed">{trans.desc}</p>
                  <div className="text-[11px] font-bold text-emerald-800 pt-1 border-t border-stone-200">
                    📈 {trans.adaptation}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* ==================== TAB 2: MYTHS VS FACTS ==================== */}
      {activeTab === 'myths' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-6">
            
            <div className="border-b border-stone-200 pb-4">
              <h3 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                Debunking 4 Major Lactate Misconceptions
              </h3>
              <p className="text-xs text-stone-600">
                Modern exercise physiology vs. outdated 20th-century dogma.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LACTATE_MASTERCLASS_DATA.mythsVsFacts.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className="p-3 rounded-xl bg-rose-100/80 border border-rose-200 text-rose-950 font-bold text-xs space-y-1">
                    <span className="text-[10px] uppercase font-black tracking-wider text-rose-700">❌ Outdated Myth</span>
                    <p className="text-stone-900 font-semibold">{item.myth}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-100/80 border border-emerald-200 text-emerald-950 font-bold text-xs space-y-1">
                    <span className="text-[10px] uppercase font-black tracking-wider text-emerald-800">✅ Modern Science Fact</span>
                    <p className="text-stone-900 font-normal leading-relaxed">{item.fact}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* ==================== TAB 3: ORGAN DESTINATIONS ==================== */}
      {activeTab === 'organs' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-6">
            
            <div className="border-b border-stone-200 pb-4">
              <h3 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600" />
                Organ Fuel Preferences: Heart, Brain & Liver
              </h3>
              <p className="text-xs text-stone-600">
                Lactate is not just a muscle substrate—it is an essential systemic fuel for vital organs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LACTATE_MASTERCLASS_DATA.organDestinations.map((org, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 hover:border-amber-400 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{org.emoji}</span>
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs">
                      {org.fuelUse}
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-stone-900 pt-1">{org.organ}</h4>
                  <p className="text-xs text-stone-700 leading-relaxed font-normal">{org.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* ==================== TAB 4: THE CORI CYCLE ==================== */}
      {activeTab === 'cori' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-6">
            
            <div className="border-b border-stone-200 pb-4">
              <h3 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-teal-700" />
                The Cori Cycle (Hepatic Gluconeogenesis)
              </h3>
              <p className="text-xs text-stone-600">
                Click through the 4-step metabolic cycle that turns muscle lactate back into fresh glucose in the liver.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              {LACTATE_MASTERCLASS_DATA.coriCycleSteps.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCoriStep(idx)}
                  className={`p-3.5 rounded-xl border text-left transition ${
                    activeCoriStep === idx
                      ? 'bg-amber-800 text-white border-amber-900 shadow-sm'
                      : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <div className="text-[10px] uppercase font-extrabold text-amber-300">Step {s.step}</div>
                  <div className="text-xs font-bold truncate">{s.title.split(' ')[0]}</div>
                </button>
              ))}
            </div>

            {(() => {
              const cur = LACTATE_MASTERCLASS_DATA.coriCycleSteps[activeCoriStep];
              return (
                <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 space-y-3">
                  <div className="text-xs font-extrabold text-amber-900 uppercase">
                    Step {cur.step} of 4 • {cur.title}
                  </div>
                  <p className="text-sm text-stone-800 font-medium leading-relaxed">
                    {cur.detail}
                  </p>
                </div>
              );
            })()}

          </div>

        </div>
      )}

      {/* ==================== TAB 5: ZONE 1-5 LACTATE SIMULATOR ==================== */}
      {activeTab === 'simulator' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-amber-700" />
                  Lactate Clearance & Concentration Simulator
                </h3>
                <p className="text-xs text-stone-600 font-medium">
                  Select an exercise zone to view real-time blood lactate levels and mitochondrial clearance kinetics.
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-amber-900 text-white text-xs font-bold shadow-xs shrink-0">
                Selected: <strong className="text-amber-300">Zone {selectedZone}</strong>
              </div>
            </div>

            {/* Zone Buttons Selector */}
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map(z => (
                <button
                  key={z}
                  onClick={() => setSelectedZone(z)}
                  className={`py-2.5 rounded-xl font-black text-xs sm:text-sm border transition ${
                    selectedZone === z
                      ? 'bg-amber-800 text-white border-amber-900 shadow-sm'
                      : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  Zone {z}
                </button>
              ))}
            </div>

            {/* Spec Output Box */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
                <span className="text-base font-extrabold text-stone-900">{currentZoneSpec.name}</span>
                <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-950 font-black text-xs">
                  {currentZoneSpec.concentration}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                {currentZoneSpec.desc}
              </p>

              {/* Clearance vs Production Progress Bars */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                    <span>Mitochondrial Lactate Clearance Rate</span>
                    <span className="text-emerald-800 font-black">{currentZoneSpec.clearanceRate}%</span>
                  </div>
                  <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 transition-all duration-500 rounded-full"
                      style={{ width: `${currentZoneSpec.clearanceRate}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                    <span>Glycolytic Lactate Production Flux</span>
                    <span className="text-amber-800 font-black">{currentZoneSpec.productionRate}%</span>
                  </div>
                  <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-600 transition-all duration-500 rounded-full"
                      style={{ width: `${Math.min(currentZoneSpec.productionRate, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Takeaway Box */}
      <div className="p-6 rounded-2xl bg-stone-900 text-stone-100 space-y-3 shadow-md font-sans">
        <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm uppercase">
          <Lightbulb className="w-5 h-5" />
          Key Takeaway on Lactate for Optimus Readers
        </div>
        <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-normal">
          Lactate is not your enemy—it is your body's preferred cellular fuel and buffer! Training in Zone 2 forces your slow-twitch muscle fibers to express dense <strong>MCT-1 transporters</strong> and <strong>m-LDH enzymes</strong>, enabling your body to clear lactate seamlessly even during high-intensity surges.
        </p>
      </div>

    </article>
  );
}
