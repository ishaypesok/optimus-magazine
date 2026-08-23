import React, { useState } from 'react';
import { 
  Flame, Activity, Zap, Droplet, ShieldCheck, CheckCircle2, 
  HelpCircle, Sparkles, ArrowRight, Layers, Lock, Unlock, 
  TrendingUp, AlertTriangle, ChevronRight, RefreshCw, Cpu
} from 'lucide-react';

export default function HowFatIsCreated() {
  // Simulator State
  const [caloricState, setCaloricState] = useState('surplus'); // 'deficit' | 'maintenance' | 'surplus' | 'heavy_surplus'
  const [carbIntake, setCarbIntake] = useState('high'); // 'low' | 'moderate' | 'high'
  const [isZone2Active, setIsZone2Active] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Derived Physiological Calculations based on simulator inputs
  const getSimData = () => {
    if (isZone2Active) {
      return {
        insulinLevel: 8, // µIU/mL (low)
        insulinStatus: 'Low (Fasting / Exercise Level)',
        glycogenSaturation: 65, // %
        citrateSpillover: false,
        accStatus: 'INACTIVE (Blocked by Zone 2 AMPK)',
        accActive: false,
        malonylCoALevel: 5, // %
        cpt1Status: 'UNLOCKED (Maximum Fat Burning - FATmax)',
        cpt1Open: true,
        hslStatus: 'ACTIVE (Stripping Fat from Adipocytes)',
        netFatCreationRate: 0.0, // g/day
        adipocyteAction: 'Shrinking (Lipolysis Active)',
        statusColor: 'emerald',
        message: '⚡ Zone 2 exercise activates AMPK, which shuts off Acetyl-CoA Carboxylase (ACC) and unlocks CPT-1! Fat creation is completely blocked while fat oxidation peaks.'
      };
    }

    let surplusFactor = 0;
    if (caloricState === 'deficit') surplusFactor = -0.5;
    if (caloricState === 'maintenance') surplusFactor = 0;
    if (caloricState === 'surplus') surplusFactor = 1;
    if (caloricState === 'heavy_surplus') surplusFactor = 2.2;

    let carbFactor = 0.2;
    if (carbIntake === 'moderate') carbFactor = 0.6;
    if (carbIntake === 'high') carbFactor = 1.0;

    const insulin = Math.round(10 + (surplusFactor > 0 ? surplusFactor * 25 : 0) + (carbFactor * 35));
    const glycogen = Math.min(100, Math.round(50 + (surplusFactor * 25) + (carbFactor * 25)));
    const citrateSpill = glycogen >= 85 && surplusFactor > 0;
    const accActive = insulin > 25 && citrateSpill;
    const malonylCoA = accActive ? Math.min(100, Math.round(insulin * 1.1)) : 10;
    const cpt1Open = malonylCoA < 30;
    const fatRate = accActive ? ((surplusFactor * 18) + (carbFactor * 15)).toFixed(1) : 0.0;

    let statusColor = 'emerald';
    if (accActive) statusColor = 'rose';
    else if (surplusFactor > 0) statusColor = 'amber';

    return {
      insulinLevel: insulin,
      insulinStatus: insulin > 40 ? 'HIGH SURGE (Storage Mode)' : insulin > 20 ? 'Moderate' : 'Low',
      glycogenSaturation: glycogen,
      citrateSpillover: citrateSpill,
      accStatus: accActive ? 'ACTIVE (De Novo Lipogenesis ON)' : 'INACTIVE (Low Substrate / Low Insulin)',
      accActive,
      malonylCoALevel: malonylCoA,
      cpt1Status: cpt1Open ? 'UNLOCKED (Fat Burn Allowed)' : 'BLOCKED (CPT-1 Shut by Malonyl-CoA)',
      cpt1Open,
      hslStatus: accActive ? 'INHIBITED by Insulin' : 'Active',
      netFatCreationRate: fatRate,
      adipocyteAction: accActive ? 'Expanding (Triglyceride Accumulation)' : 'Stable / Neutral',
      statusColor,
      message: accActive 
        ? '⚠️ High glucose + full glycogen causes Citrate to exit mitochondria. Insulin activates ACC to synthesize Malonyl-CoA & Palmitate, locking fat inside adipocytes!'
        : 'Balance maintained: Glycogen stores are accepting glucose or caloric balance prevents De Novo Lipogenesis spillover.'
    };
  };

  const sim = getSimData();

  const STEPS_DATA = [
    {
      step: 1,
      title: 'Glycogen Saturation & Citrate Export',
      icon: Droplet,
      badge: 'Step 1 • Cytosolic Leak',
      summary: 'When muscle & liver glycogen stores (~400–500g) fill up, excess glucose enters glycolysis.',
      details: 'Glucose breaks down into Pyruvate, which enters the mitochondria and converts into Acetyl-CoA. Acetyl-CoA combines with Oxaloacetate to form Citrate. When cellular ATP levels are high, the enzyme Isocitrate Dehydrogenase is inhibited. Citrate backs up inside the mitochondria and leaks out into the Cytoplasm via the Citrate-Malate shuttle!'
    },
    {
      step: 2,
      title: 'Citrate Cleavage & Malonyl-CoA Lock',
      icon: Lock,
      badge: 'Step 2 • The Master Lock',
      summary: 'Citrate is cleaved in the cytoplasm, and ACC creates Malonyl-CoA—the switch that blocks fat burning.',
      details: 'In the cytoplasm, ATP-Citrate Lyase cleaves Citrate back into Acetyl-CoA and Oxaloacetate. Elevated Insulin activates Acetyl-CoA Carboxylase (ACC). ACC attaches CO₂ to Acetyl-CoA to form Malonyl-CoA. CRITICAL physiology: Malonyl-CoA physically blocks CPT-1 (the gate into mitochondria), halting fat oxidation while fat creation begins!'
    },
    {
      step: 3,
      title: 'Palmitate Synthesis by FAS',
      icon: Cpu,
      badge: 'Step 3 • Fatty Acid Construction',
      summary: 'Fatty Acid Synthase (FAS) links Malonyl-CoA units together to build 16-Carbon Palmitic Acid.',
      details: 'The enzyme complex Fatty Acid Synthase (FAS) repeatedly adds 2-carbon blocks from Malonyl-CoA, consuming 14 NADPH energy batteries (from the Pentose Phosphate Pathway) and 7 ATP. The end product is Palmitate (Palmitic Acid, 16:0)—a saturated fatty acid created entirely from scratch (De Novo).'
    },
    {
      step: 4,
      title: 'Triglyceride Assembly & Adipocyte Storage',
      icon: Layers,
      badge: 'Step 4 • Fat Droplet Expansion',
      summary: 'Palmitate is esterified with Glycerol-3-Phosphate into Triglycerides and packed into fat cells.',
      details: '3 Fatty Acid chains are bound to a Glycerol-3-Phosphate backbone to form a Triglyceride (TAG). In the liver, TAGs are packaged into VLDL (Very Low-Density Lipoproteins) and released into the blood. Lipoprotein Lipase (LPL), activated by insulin on adipose capillaries, breaks VLDL down so fat enters White Adipocytes for long-term storage!'
    }
  ];

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">
      
      {/* HEADER HERO BANNER */}
      <div className="space-y-3 border-b border-stone-200 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-rose-100 text-rose-950 font-bold text-xs uppercase tracking-wider border border-rose-200 inline-flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-rose-700" />
            Page 19 • Deep Physiology & Lipogenesis
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-bold text-xs border border-emerald-200">
            🧪 Bioenergetics of Fat Storage
          </span>
        </div>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-stone-900 leading-tight tracking-tight">
          How the Human Body Creates Fat: De Novo Lipogenesis & Adipogenesis
        </h2>

        <p className="text-stone-600 text-sm lg:text-base font-normal max-w-4xl leading-relaxed">
          While Zone 2 exercise is the ultimate engine for burning fat, understanding how the body <strong>creates and stores fat from scratch (De Novo Lipogenesis)</strong> unveils the exact biochemical triggers—excess glucose, glycogen saturation, citrate spillover, and insulin spikes—that drive adipose accumulation.
        </p>
      </div>

      {/* QUICK FACT HIGHLIGHT STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
          <div className="font-extrabold text-amber-950 flex items-center gap-1.5 text-sm">
            <span>🧪 De Novo Lipogenesis</span>
          </div>
          <p className="text-stone-700 leading-relaxed font-normal">
            The biochemical pathway converting excess dietary carbohydrates into 16-carbon fatty acids (Palmitate).
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
          <div className="font-extrabold text-rose-950 flex items-center gap-1.5 text-sm">
            <span>🔑 Master On-Switch</span>
          </div>
          <p className="text-stone-700 leading-relaxed font-normal">
            High Insulin + Cytosolic Citrate activates <strong>Acetyl-CoA Carboxylase (ACC)</strong>, starting fat creation.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
          <div className="font-extrabold text-purple-950 flex items-center gap-1.5 text-sm">
            <span>🔒 The Malonyl Lock</span>
          </div>
          <p className="text-stone-700 leading-relaxed font-normal">
            ACC produces Malonyl-CoA, which <strong>blocks CPT-1</strong>, completely shutting down fat oxidation.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-1">
          <div className="font-extrabold text-emerald-950 flex items-center gap-1.5 text-sm">
            <span>🛡️ Zone 2 Off-Switch</span>
          </div>
          <p className="text-stone-700 leading-relaxed font-normal">
            Zone 2 activates <strong>AMPK</strong>, which phosphorylates ACC, instantly turning OFF fat synthesis!
          </p>
        </div>

      </div>

      {/* ==================== INTERACTIVE SIMULATOR SECTION ==================== */}
      <section className="p-6 sm:p-8 rounded-3xl bg-stone-900 text-white space-y-6 shadow-xl border border-stone-800 font-sans">
        
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs uppercase tracking-wider border border-emerald-500/30">
              Interactive Bioenergetic Engine
            </span>
            <h3 className="text-xl font-extrabold text-white mt-1">
              Lipogenesis & Fat Storage Simulator
            </h3>
          </div>
          <div className="text-xs text-stone-400">
            Adjust inputs to observe real-time enzyme switching and fat synthesis rates
          </div>
        </div>

        {/* SIMULATOR CONTROLS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-stone-800/80 p-5 rounded-2xl border border-stone-700/60">
          
          {/* Control 1: Caloric Balance */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-stone-300 uppercase tracking-wider block">
              1. Caloric Balance State
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              {[
                { id: 'deficit', label: 'Caloric Deficit' },
                { id: 'maintenance', label: 'Maintenance' },
                { id: 'surplus', label: 'Mild Surplus' },
                { id: 'heavy_surplus', label: 'Heavy Surplus (+1k)' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setCaloricState(opt.id)}
                  className={`p-2 rounded-xl border text-left transition ${
                    caloricState === opt.id
                      ? 'bg-emerald-600 text-white border-emerald-400 font-extrabold shadow-sm'
                      : 'bg-stone-700/50 text-stone-300 border-stone-600 hover:bg-stone-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Control 2: Carb & Glucose Load */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-stone-300 uppercase tracking-wider block">
              2. Carbohydrate / Sugar Intake
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold">
              {[
                { id: 'low', label: 'Low (Fasting)' },
                { id: 'moderate', label: 'Moderate' },
                { id: 'high', label: 'High Sugar Spike' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setCarbIntake(opt.id)}
                  className={`p-2 rounded-xl border text-center transition ${
                    carbIntake === opt.id
                      ? 'bg-rose-600 text-white border-rose-400 font-extrabold shadow-sm'
                      : 'bg-stone-700/50 text-stone-300 border-stone-600 hover:bg-stone-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Control 3: Physical Activity / Zone 2 */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-stone-300 uppercase tracking-wider block">
              3. Exercise State
            </label>
            <button
              onClick={() => setIsZone2Active(!isZone2Active)}
              className={`w-full p-3 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-2 transition ${
                isZone2Active
                  ? 'bg-emerald-500 text-stone-950 border-emerald-300 shadow-md ring-2 ring-emerald-400/50'
                  : 'bg-stone-700/80 text-stone-200 border-stone-600 hover:bg-stone-700'
              }`}
            >
              <Activity className={`w-4 h-4 ${isZone2Active ? 'animate-pulse text-stone-950' : 'text-emerald-400'}`} />
              <span>{isZone2Active ? '🏃 ZONE 2 EXERCISE ACTIVE (AMPK ON)' : '🛋️ RESTING / SEDENTARY (ZONE 1)'}</span>
            </button>
          </div>

        </div>

        {/* DYNAMIC REAL-TIME MONITOR DISPLAY */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-stone-400 border-b border-stone-800 pb-2">
            <span>REAL-TIME CELLULAR RESPONSES</span>
            <span className="text-emerald-400 font-mono">Status: {sim.accActive ? '⚠️ FAT CREATION ON' : '✅ FAT CREATION BLOCKED'}</span>
          </div>

          {/* Live Status Message Card */}
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed font-semibold transition ${
            isZone2Active
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
              : sim.accActive
              ? 'bg-rose-950/80 border-rose-500/50 text-rose-200'
              : 'bg-amber-950/50 border-amber-500/40 text-amber-200'
          }`}>
            {sim.message}
          </div>

          {/* Metrics Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Metric 1: Insulin Level */}
            <div className="p-4 rounded-2xl bg-stone-800/90 border border-stone-700 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-400 font-bold">
                <span>Insulin Level</span>
                <span className="text-stone-300">{sim.insulinLevel} µIU/mL</span>
              </div>
              <div className="h-2 w-full bg-stone-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${sim.insulinLevel > 35 ? 'bg-rose-500' : 'bg-emerald-400'}`} 
                  style={{ width: `${Math.min(100, sim.insulinLevel)}%` }} 
                />
              </div>
              <div className="text-[11px] font-bold text-stone-300">{sim.insulinStatus}</div>
            </div>

            {/* Metric 2: Glycogen Capacity */}
            <div className="p-4 rounded-2xl bg-stone-800/90 border border-stone-700 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-400 font-bold">
                <span>Liver/Muscle Glycogen</span>
                <span className="text-stone-300">{sim.glycogenSaturation}%</span>
              </div>
              <div className="h-2 w-full bg-stone-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${sim.glycogenSaturation >= 85 ? 'bg-amber-500' : 'bg-teal-400'}`} 
                  style={{ width: `${sim.glycogenSaturation}%` }} 
                />
              </div>
              <div className="text-[11px] font-bold text-stone-300">
                {sim.glycogenSaturation >= 85 ? '⚠️ Saturated → Citrate Exporting' : 'Accepting Glucose'}
              </div>
            </div>

            {/* Metric 3: ACC Enzyme State */}
            <div className="p-4 rounded-2xl bg-stone-800/90 border border-stone-700 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-400 font-bold">
                <span>ACC Enzyme (Lipogenesis)</span>
                {sim.accActive ? <Lock className="w-3.5 h-3.5 text-rose-400" /> : <Unlock className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <div className={`text-xs font-black px-2.5 py-1 rounded-lg text-center ${
                sim.accActive ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}>
                {sim.accStatus}
              </div>
              <div className="text-[10px] text-stone-400">
                CPT-1 Gate: <strong className={sim.cpt1Open ? 'text-emerald-400' : 'text-rose-400'}>{sim.cpt1Status}</strong>
              </div>
            </div>

            {/* Metric 4: Est. Fat Creation Rate */}
            <div className="p-4 rounded-2xl bg-stone-800/90 border border-stone-700 space-y-1">
              <div className="text-xs text-stone-400 font-bold">Est. De Novo Fat Creation</div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                +{sim.netFatCreationRate} <span className="text-xs font-bold text-stone-400">g / day</span>
              </div>
              <div className="text-[11px] text-stone-300 font-bold">
                Adipocytes: <span className="text-amber-300">{sim.adipocyteAction}</span>
              </div>
            </div>

          </div>

          {/* SIMULATOR PATHWAY VISUALIZER DIAGRAM CARD */}
          <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
            <div className="text-xs font-extrabold text-stone-400 uppercase tracking-wider flex items-center justify-between">
              <span>Cellular Substrate Flow Diagram</span>
              <span className="text-[11px] font-normal text-stone-400">Glucose → Citrate → Malonyl-CoA → Palmitate → Adipocyte</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center text-xs">
              
              {/* Box 1: Glucose */}
              <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                <div className="font-extrabold text-teal-400 text-xs">1. Glucose (6C)</div>
                <div className="text-[10px] text-stone-400">Glycolysis in Cytosol</div>
                <ArrowRight className="w-4 h-4 text-stone-600 mx-auto hidden md:block mt-1" />
              </div>

              {/* Box 2: Mitochondrial Citrate */}
              <div className={`p-3 rounded-xl border space-y-1 transition ${
                sim.citrateSpillover ? 'bg-amber-950/60 border-amber-500/50 text-amber-200' : 'bg-stone-900 border-stone-800 text-stone-400'
              }`}>
                <div className="font-extrabold text-xs">2. Citrate Export</div>
                <div className="text-[10px]">
                  {sim.citrateSpillover ? '⚠️ Leaks to Cytosol' : 'Stays in Krebs Cycle'}
                </div>
              </div>

              {/* Box 3: ACC & Malonyl-CoA */}
              <div className={`p-3 rounded-xl border space-y-1 transition ${
                sim.accActive ? 'bg-rose-950/70 border-rose-500/60 text-rose-200' : 'bg-stone-900 border-stone-800 text-stone-500'
              }`}>
                <div className="font-extrabold text-xs">3. ACC → Malonyl-CoA</div>
                <div className="text-[10px]">
                  {sim.accActive ? '🔒 CPT-1 Blocked!' : 'OFF (CPT-1 Open)'}
                </div>
              </div>

              {/* Box 4: Palmitate Synthesis */}
              <div className={`p-3 rounded-xl border space-y-1 transition ${
                sim.accActive ? 'bg-purple-950/60 border-purple-500/50 text-purple-200' : 'bg-stone-900 border-stone-800 text-stone-500'
              }`}>
                <div className="font-extrabold text-xs">4. FAS Palmitate (16C)</div>
                <div className="text-[10px]">
                  {sim.accActive ? 'Uses 14 NADPH + 7 ATP' : 'Zero Synthesis'}
                </div>
              </div>

              {/* Box 5: Adipocyte Fat Droplet */}
              <div className={`p-3 rounded-xl border space-y-1 transition ${
                sim.accActive ? 'bg-amber-900/60 border-amber-400/50 text-amber-100' : 'bg-emerald-950/40 border-emerald-600/40 text-emerald-300'
              }`}>
                <div className="font-extrabold text-xs">5. Adipocyte TAG</div>
                <div className="text-[10px]">
                  {isZone2Active ? '🔥 Lipolysis Active' : sim.accActive ? '📦 Stored in Fat Cell' : 'Neutral State'}
                </div>
              </div>

            </div>

            {isZone2Active && (
              <div className="p-3 rounded-xl bg-emerald-900/90 border border-emerald-400 text-emerald-100 text-xs font-bold flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 text-emerald-300 animate-bounce" />
                <span>ZONE 2 AMPK SIGNAL DETECTED: Phosphorylates ACC Serine-79 → Lipogenesis immediately halted!</span>
              </div>
            )}
          </div>

        </div>

      </section>

      {/* ==================== STEP-BY-STEP BIOCHEMICAL BLUEPRINT ==================== */}
      <section className="space-y-6 pt-4 font-sans">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
            Biochemical Pathway Stepper
          </span>
          <h3 className="text-2xl font-black text-stone-900">
            The 4-Stage Journey of How the Body Converts Glucose to Fat
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm font-normal">
            Click through each stage to explore the detailed enzyme kinetics, substrates, and cellular compartments.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STEPS_DATA.map((step) => {
            const Icon = step.icon;
            const isSelected = activeStep === step.step;

            return (
              <button
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-rose-900 text-white border-rose-800 shadow-md ring-2 ring-rose-300'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                    isSelected ? 'bg-rose-800 text-rose-100' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {step.badge}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-rose-200' : 'text-rose-700'}`} />
                </div>
                <div className="font-extrabold text-xs leading-snug">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Content Card */}
        {(() => {
          const current = STEPS_DATA.find(s => s.step === activeStep) || STEPS_DATA[0];
          const StepIcon = current.icon;

          return (
            <div className="p-6 sm:p-8 rounded-3xl bg-stone-50 border border-stone-200 space-y-4 shadow-sm">
              <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-800 shrink-0">
                  <StepIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">{current.badge}</span>
                  <h4 className="text-xl font-extrabold text-stone-900">{current.title}</h4>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs sm:text-sm">
                <div className="lg:col-span-2 space-y-3 text-stone-700 leading-relaxed font-normal">
                  <p className="font-bold text-stone-900 text-sm">{current.summary}</p>
                  <p>{current.details}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3 text-xs">
                  <div className="font-bold text-stone-900 uppercase tracking-wider text-[11px] border-b border-stone-100 pb-1.5">
                    ⚙️ Key Enzymes & Molecules
                  </div>
                  {activeStep === 1 && (
                    <ul className="space-y-2 text-stone-700">
                      <li>• <strong>Substrate:</strong> Excess Blood Glucose</li>
                      <li>• <strong>Enzyme:</strong> Isocitrate Dehydrogenase (Inhibited by high ATP)</li>
                      <li>• <strong>Transporter:</strong> Citrate-Malate Shuttle</li>
                      <li>• <strong>Location:</strong> Mitochondria → Cytoplasm</li>
                    </ul>
                  )}
                  {activeStep === 2 && (
                    <ul className="space-y-2 text-stone-700">
                      <li>• <strong>Enzyme 1:</strong> ATP-Citrate Lyase (ACL)</li>
                      <li>• <strong>Master Enzyme:</strong> Acetyl-CoA Carboxylase (ACC)</li>
                      <li>• <strong>Hormone Trigger:</strong> Insulin (Dephosphorylates ACC)</li>
                      <li>• <strong>Key Product:</strong> Malonyl-CoA (Blocks CPT-1 Gate)</li>
                    </ul>
                  )}
                  {activeStep === 3 && (
                    <ul className="space-y-2 text-stone-700">
                      <li>• <strong>Enzyme Complex:</strong> Fatty Acid Synthase (FAS)</li>
                      <li>• <strong>Energy Cost:</strong> 14 NADPH + 7 ATP</li>
                      <li>• <strong>End Product:</strong> Palmitic Acid (16:0 Saturated Fat)</li>
                      <li>• <strong>Location:</strong> Cytoplasm of Liver & Adipocytes</li>
                    </ul>
                  )}
                  {activeStep === 4 && (
                    <ul className="space-y-2 text-stone-700">
                      <li>• <strong>Backbone:</strong> Glycerol-3-Phosphate</li>
                      <li>• <strong>Carrier:</strong> VLDL (Very Low-Density Lipoprotein)</li>
                      <li>• <strong>Capillary Enzyme:</strong> Lipoprotein Lipase (LPL)</li>
                      <li>• <strong>Storage Site:</strong> White Adipose Tissue (WAT)</li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* ==================== DEEP PHYSIOLOGY COMPARISON CARDS ==================== */}
      <section className="space-y-6 pt-4 font-sans">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
            Comparative Bioenergetics
          </span>
          <h3 className="text-2xl font-black text-stone-900">
            De Novo Lipogenesis vs. Direct Dietary Fat Storage
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          
          {/* Card A: De Novo Lipogenesis (Carbs to Fat) */}
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 space-y-4 font-sans">
            <div className="flex items-center gap-2 text-amber-950 font-extrabold text-base">
              <RefreshCw className="w-5 h-5 text-amber-700" />
              <span>1. De Novo Lipogenesis (Carbs → Fat)</span>
            </div>

            <ul className="space-y-2 text-stone-700 font-normal">
              <li>• <strong>High Energetic Cost:</strong> Converting carbohydrates to fatty acids loses <strong>~20–25% of energy as metabolic heat</strong>.</li>
              <li>• <strong>Glycogen Buffer:</strong> Humans don't convert carbs to fat easily until liver glycogen (~100g) and muscle glycogen (~400g) are completely saturated.</li>
              <li>• <strong>Main Trigger:</strong> Chronic overconsumption of refined sugars (e.g. high-fructose corn syrup) + sedentary lifestyle.</li>
            </ul>

            <div className="p-3 rounded-xl bg-white/90 border border-amber-300 text-xs text-amber-950 font-semibold">
              💡 <em>Takeaway:</em> Converting carbs into fat is biologically expensive. The body prefers burning excess carbs for heat (diet-induced thermogenesis) before committing them to DNL.
            </div>
          </div>

          {/* Card B: Direct Dietary Fat Storage */}
          <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 space-y-4 font-sans">
            <div className="flex items-center gap-2 text-rose-950 font-extrabold text-base">
              <Layers className="w-5 h-5 text-rose-700" />
              <span>2. Direct Dietary Fat Storage (Fat → Fat)</span>
            </div>

            <ul className="space-y-2 text-stone-700 font-normal">
              <li>• <strong>Ultra-Efficient (~2-3% Cost):</strong> Dietary fats (chylomicrons) are packaged directly into triglycerides with minimal energy expenditure.</li>
              <li>• <strong>Carb + Fat Synergy:</strong> When high carbs elevate Insulin, Insulin turns on LPL on fat cells and shuts off HSL. If dietary fat is present, 100% of it is directed straight into adipocytes!</li>
              <li>• <strong>Zone 2 Solution:</strong> Zone 2 exercises oxidize dietary fats immediately in mitochondria before they can be stored in adipose tissue.</li>
            </ul>

            <div className="p-3 rounded-xl bg-white/90 border border-rose-300 text-xs text-rose-950 font-semibold">
              ⚠️ <em>Takeaway:</em> High insulin from carbs + abundant dietary fat is the fastest physiological combo for expanding fat stores.
            </div>
          </div>

        </div>
      </section>

      {/* ==================== HOW ZONE 2 SHUTS DOWN FAT CREATION ==================== */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-900 to-teal-950 text-white space-y-6 shadow-md font-sans">
        <div className="space-y-2 border-b border-emerald-800 pb-4">
          <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 font-bold text-xs uppercase tracking-wider border border-emerald-400/30">
            The Zone 2 Shield
          </span>
          <h3 className="text-2xl font-extrabold text-white">
            How Zone 2 Exercise Completely Reverses Fat Creation
          </h3>
          <p className="text-emerald-100 text-xs sm:text-sm font-normal max-w-3xl">
            Zone 2 is not just a passive workout—it triggers an immediate intracellular enzyme cascade that turns OFF lipogenesis and turns ON fat burning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          
          <div className="p-5 rounded-2xl bg-emerald-900/60 border border-emerald-700/60 space-y-2">
            <div className="font-extrabold text-emerald-300 text-sm flex items-center gap-1.5">
              <span>⚡ 1. AMPK Phosphorylates ACC</span>
            </div>
            <p className="text-emerald-100 leading-relaxed font-normal">
              Zone 2 muscle contractions raise the AMP/ATP ratio, activating <strong>AMPK</strong>. AMPK adds a phosphate group to Serine-79 on ACC, instantly deactivating the enzyme and halting Malonyl-CoA creation!
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-900/60 border border-emerald-700/60 space-y-2">
            <div className="font-extrabold text-emerald-300 text-sm flex items-center gap-1.5">
              <span>🔓 2. CPT-1 Gate Swings Open</span>
            </div>
            <p className="text-emerald-100 leading-relaxed font-normal">
              With Malonyl-CoA depleted, the CPT-1 door into mitochondria opens fully. Free fatty acids flood into the matrix to undergo Beta-Oxidation at maximum speed (FATmax).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-900/60 border border-emerald-700/60 space-y-2">
            <div className="font-extrabold text-emerald-300 text-sm flex items-center gap-1.5">
              <span>💧 3. HSL Mobilizes Adipose TAGs</span>
            </div>
            <p className="text-emerald-100 leading-relaxed font-normal">
              Low insulin during Zone 2 unlocks <strong>Hormone-Sensitive Lipase (HSL)</strong> inside fat cells, stripping stored triglycerides into free fatty acids to fuel working muscles.
            </p>
          </div>

        </div>
      </section>

      {/* ==================== KNOWLEDGE CHECK QUIZ ==================== */}
      <section className="p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-6 font-sans">
        <div className="flex items-center gap-2 text-stone-900 font-extrabold text-lg">
          <HelpCircle className="w-5 h-5 text-rose-700" />
          <span>Physiology Knowledge Check: Test Your Lipogenesis Understanding</span>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          
          {/* Question 1 */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
            <div className="font-extrabold text-stone-900">
              1. What enzyme is known as the "Master On-Switch" for fat synthesis, and what molecule blocks CPT-1?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { id: 'q1_a', text: 'Enzyme: ACC (Acetyl-CoA Carboxylase) | Molecule: Malonyl-CoA', correct: true },
                { id: 'q1_b', text: 'Enzyme: HSL (Hormone-Sensitive Lipase) | Molecule: Lactate', correct: false },
                { id: 'q1_c', text: 'Enzyme: PGC-1α | Molecule: Pyruvate', correct: false },
                { id: 'q1_d', text: 'Enzyme: AMPK | Molecule: ATP', correct: false }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setQuizAnswers(prev => ({ ...prev, q1: opt.id }))}
                  className={`p-2.5 rounded-xl border text-left font-medium transition ${
                    quizAnswers.q1 === opt.id
                      ? opt.correct
                        ? 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold'
                        : 'bg-rose-100 text-rose-950 border-rose-400 font-bold'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
            <div className="font-extrabold text-stone-900">
              2. How does Zone 2 exercise immediately stop De Novo Lipogenesis inside cells?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { id: 'q2_a', text: 'By activating AMPK, which phosphorylates and deactivates ACC', correct: true },
                { id: 'q2_b', text: 'By raising insulin levels to extreme highs', correct: false },
                { id: 'q2_c', text: 'By forcing Citrate to stay stuck in the cytoplasm', correct: false },
                { id: 'q2_d', text: 'By destroying fat cells directly', correct: false }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setQuizAnswers(prev => ({ ...prev, q2: opt.id }))}
                  className={`p-2.5 rounded-xl border text-left font-medium transition ${
                    quizAnswers.q2 === opt.id
                      ? opt.correct
                        ? 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold'
                        : 'bg-rose-100 text-rose-950 border-rose-400 font-bold'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

    </article>
  );
}
