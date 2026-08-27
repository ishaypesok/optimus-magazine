import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, RotateCw, Sparkles, CheckCircle2, ChevronRight, ChevronLeft, 
  Truck, Cpu, ArrowRight, Zap, Info, ShieldCheck, Flame, RefreshCw, Layers,
  Wind, BatteryCharging, Droplet, Award, Lightbulb, HelpCircle, Heart, Smile,
  Sliders, Gauge, ArrowDown, Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STATIONS_INFO = [
  {
    station: 1,
    name: "Citrate Synthesis",
    enzyme: "Citrate Synthase",
    formula: "Acetyl-CoA (2C) + Oxaloacetate (4C) → Citrate (6C)",
    emoji: "🍋",
    carbonCount: 6,
    badge: "Station 1 • Docking & Merger",
    summary: "Acetyl-CoA delivery truck docks. Robotic arm lifts 2C box into OAA mold, detaching bulky CoA tag.",
    details: "On the conveyor belt, 4-carbon Oxaloacetate merges with the 2-carbon unit box delivered by Acetyl-CoA. Citrate Synthase detaches the bulky CoA tag and forms a 6-carbon Citrate mold. High energy release (ΔG°' = -31.5 kJ/mol) makes this irreversible!",
    yieldNotice: "CoA-SH recycled back to cytoplasm.",
    friendlyAnalogy: "🚚 The 2-Carbon Delivery Truck docks at the 4-Slot Mold Tray!",
    friendlyExplanation: "Your body breaks down fat into 2-carbon cargo packages (Acetyl-CoA). The delivery truck arrives at the cellular assembly line where a 4-slot mold tray (Oxaloacetate) is waiting. The expert factory worker enzyme (Citrate Synthase) snaps the 2-carbon box into the mold, detaches the bulky delivery handle (CoA), and creates a 6-carbon Citrate molecule!",
    zone2Connection: "In Zone 2 exercise, fatty acid delivery trucks arrive in a steady, smooth stream. Because oxygen is plentiful, the 4-slot molds are always clean and ready to receive them without causing traffic jams!",
    inputDiagram: "Acetyl-CoA (2C) + OAA Tray (4C)",
    machineAction: "Docking Arm snaps 2C into 4C mold & pops off CoA tag",
    outputDiagram: "Citrate (6C) Molecule + Recycled CoA Tag"
  },
  {
    station: 2,
    name: "Isomerization to Isocitrate",
    enzyme: "Aconitase",
    formula: "Citrate (6C) → Isocitrate (6C)",
    emoji: "🔄",
    carbonCount: 6,
    badge: "Station 2 • Molecular Rearrangement",
    summary: "Hydroxyl group relocation nozzle dehydrates & rehydrates molecule, converting Citrate to Isocitrate.",
    details: "Citrate is structurally rearranged into its isomer Isocitrate. Water is temporarily removed and added back to shift the hydroxyl (-OH) group, preparing the molecule for carbon shearing and energy extraction.",
    yieldNotice: "Structural isomer prepared for oxidation.",
    friendlyAnalogy: "🔄 Turning the Box Around to Unpack the Zipper!",
    friendlyExplanation: "Citrate is a bit awkward for the next factory machines to open directly. So the enzyme Aconitase temporarily sprays water on it, rotates a chemical handle, and turns it into Isocitrate. Think of it like spinning a package around so the zipper is facing directly toward you!",
    zone2Connection: "This quick rearrangement keeps the production line fluid, preventing any backlog inside the mitochondrial matrix.",
    inputDiagram: "Citrate (6C)",
    machineAction: "Water spray nozzle dehydrates & rotates chemical handle",
    outputDiagram: "Isocitrate (6C)"
  },
  {
    station: 3,
    name: "1st Carbon Shearing & Oxidation",
    enzyme: "Isocitrate Dehydrogenase",
    formula: "Isocitrate (6C) → α-Ketoglutarate (5C) + 1x NADH + 1x CO₂",
    emoji: "💨",
    carbonCount: 5,
    badge: "Station 3 • 1st CO₂ Exhaust & NADH Battery",
    summary: "Carbon Shearing Arm #1 clips off 1 carbon as CO₂ exhaust gas while charging 1st NADH battery!",
    details: "CRITICAL RATE-LIMITING STEP! Isocitrate is oxidized to 5-carbon α-Ketoglutarate. High-energy electrons are stripped onto NAD+ to charge 1 NADH battery, and the 1st CO₂ exhaust gas molecule is vented into breath!",
    yieldNotice: "+1 NADH 🔋 | +1 CO₂ Vented 💨",
    friendlyAnalogy: "💨 Clipping Carbon #1 & Charging Battery #1!",
    friendlyExplanation: "A robotic shearing arm clips off 1 carbon block from the 6-carbon molecule. This clipped carbon turns into CO₂ gas (which travels up to your lungs and you exhale it out!). At the exact same time, high-energy electrons are harvested to fully charge a power bank called NADH!",
    zone2Connection: "This is a key speed-controller of fat burning. During comfortable Zone 2 running, cellular signals keep this station humming at maximum fat-burning efficiency.",
    inputDiagram: "Isocitrate (6C) + Empty NAD+ Cart",
    machineAction: "Shearing blade clips 1 carbon & charges electrons onto wagon",
    outputDiagram: "α-Ketoglutarate (5C) + 1x CO₂ Gas 💨 + 1x NADH Battery 🔋"
  },
  {
    station: 4,
    name: "2nd Carbon Shearing & Oxidation",
    enzyme: "α-Ketoglutarate Dehydrogenase",
    formula: "α-Ketoglutarate (5C) → Succinyl-CoA (4C) + 1x NADH + 1x CO₂",
    emoji: "⚡",
    carbonCount: 4,
    badge: "Station 4 • 2nd CO₂ Exhaust & 2nd NADH Battery",
    summary: "Carbon Shearing Arm #2 shears off the 2nd carbon as CO₂ exhaust, charging 2nd NADH battery!",
    details: "The 5-carbon molecule is further oxidized down to 4-carbon Succinyl-CoA. High-energy electrons charge a 2nd NADH battery, and the 2nd CO₂ gas is released. All 2 original carbons from Acetyl-CoA have now been exhausted!",
    yieldNotice: "+1 NADH 🔋 | +1 CO₂ Vented 💨 (All original 2C exhausted!)",
    friendlyAnalogy: "💨 Clipping Carbon #2 & Charging Battery #2!",
    friendlyExplanation: "The 5-carbon molecule moves to the next machine, where a second shearing arm clips off another carbon block as CO₂ gas (exhaled!). A second NADH power bank is charged! Both carbons that arrived on the original delivery truck have now been fully processed and exhaled!",
    zone2Connection: "You literally exhale the fat you burn as CO₂ gas through your nose and mouth while running!",
    inputDiagram: "α-Ketoglutarate (5C) + Empty NAD+ Cart",
    machineAction: "2nd Shearing blade clips final fat carbon & charges 2nd wagon",
    outputDiagram: "Succinyl-CoA (4C) + 1x CO₂ Gas 💨 + 1x NADH Battery 🔋"
  },
  {
    station: 5,
    name: "Substrate-Level ATP Generation",
    enzyme: "Succinyl-CoA Synthetase",
    formula: "Succinyl-CoA (4C) → Succinate (4C) + 1x ATP",
    emoji: "💡",
    carbonCount: 4,
    badge: "Station 5 • Direct ATP Energy Spark",
    summary: "High-energy thioester bond cleavage sparks direct production of 1 ATP energy unit!",
    details: "The high-energy bond connecting CoA to Succinyl-CoA is cleaved. The energy released directly phosphorylates GDP to GTP (or ADP to ATP). This is direct substrate-level phosphorylation right inside the matrix!",
    yieldNotice: "+1 ATP (Direct Matrix Power) ⚡",
    friendlyAnalogy: "💡 Instant Cash Bonus (Direct ATP Spark)!",
    friendlyExplanation: "The high-energy bond holding the molecule pops open, releasing a direct burst of energy that creates 1 ATP energy currency molecule on the spot! It's like finding a $20 bill right inside the factory pocket without having to wait for the main power generator!",
    zone2Connection: "Provides immediate cellular fuel right inside the muscle mitochondria to keep your stride feeling light and easy.",
    inputDiagram: "Succinyl-CoA (4C) + ADP/GDP",
    machineAction: "High-energy bond pops open & creates 1 ATP on the spot",
    outputDiagram: "Succinate (4C) + 1x Direct ATP Spark 💡"
  },
  {
    station: 6,
    name: "Succinate Oxidation (Complex II)",
    enzyme: "Succinate Dehydrogenase (ETC Complex II)",
    formula: "Succinate (4C) → Fumarate (4C) + 1x FADH₂",
    emoji: "🔌",
    carbonCount: 4,
    badge: "Station 6 • ETC Complex II Docking & FADH₂ Battery",
    summary: "Succinate docks at Complex II, transferring electrons to FAD to charge 1 FADH₂ battery.",
    details: "Succinate is oxidized to Fumarate. Note: Succinate Dehydrogenase IS Complex II of the Electron Transport Chain! Electrons are passed directly to FAD, charging 1 FADH₂ battery right on the inner mitochondrial membrane.",
    yieldNotice: "+1 FADH₂ 🔋 (Complex II Bridge)",
    friendlyAnalogy: "🔌 Plugging into the Power Grid & Charging FADH₂!",
    friendlyExplanation: "The 4-carbon frame docks directly onto the inner wall of the mitochondrial power station (Complex II). It transfers high-energy electrons directly into a second type of battery called FADH₂.",
    zone2Connection: "This station is physically built into the Electron Transport Chain—bridging fat breakdown directly to cellular electricity generation!",
    inputDiagram: "Succinate (4C) + Empty FAD Cart",
    machineAction: "Docks directly at Complex II wall to charge FAD into FADH₂",
    outputDiagram: "Fumarate (4C) + 1x FADH₂ Battery 🔌"
  },
  {
    station: 7,
    name: "Hydration to Malate",
    enzyme: "Fumarase",
    formula: "Fumarate (4C) + H₂O → Malate (4C)",
    emoji: "💧",
    carbonCount: 4,
    badge: "Station 7 • Water Injection Unit",
    summary: "Water nozzle sprays H₂O across the double bond of Fumarate to form Malate.",
    details: "Water (H₂O) is added across the double bond of Fumarate to yield 4-carbon Malate, positioning hydrogen and oxygen atoms for the final oxidation step.",
    yieldNotice: "Consumes 1x H₂O 💧",
    friendlyAnalogy: "💧 Washing & Hydrating the Mold Frame",
    friendlyExplanation: "A water nozzle sprays a molecule of water (H₂O) onto the double bond of the 4-carbon frame, converting Fumarate into Malate. This softens up the chemical bonds so the final battery pack can be charged.",
    zone2Connection: "Hydration is essential for bioenergetics—staying hydrated during long runs keeps cellular enzymes operating at peak speed.",
    inputDiagram: "Fumarate (4C) + H₂O Water Spray",
    machineAction: "Water nozzle hydrates double bond to prepare for final battery charge",
    outputDiagram: "Malate (4C)"
  },
  {
    station: 8,
    name: "Regeneration of Oxaloacetate",
    enzyme: "Malate Dehydrogenase",
    formula: "Malate (4C) → Oxaloacetate (4C) + 1x NADH",
    emoji: "🔑",
    carbonCount: 4,
    badge: "Station 8 • Final NADH & OAA Reset",
    summary: "Malate is oxidized back to Oxaloacetate, charging 3rd NADH battery. OAA mold is cleaned & reset!",
    details: "Malate undergoes final oxidation to regenerate 4-carbon Oxaloacetate. This reaction charges the 3rd and final NADH battery. The Oxaloacetate mold is completely cleaned, reset, and slides back to Station 1 to wait for the next Acetyl-CoA truck!",
    yieldNotice: "+1 NADH 🔋 | Cycle Complete! OAA Reset 🔄",
    friendlyAnalogy: "🔑 Charging Final Battery #3 & Resetting the Mold!",
    friendlyExplanation: "Malate loses its final set of high-energy electrons to charge the 3rd NADH power bank. The 4-carbon mold tray is now completely cleaned, polished, and reset back to Oxaloacetate. It slides right back to Station 1 to wait for the next delivery truck!",
    zone2Connection: "Completes the loop! The 4-carbon mold tray is never consumed or destroyed—it is recycled endlessly so you can keep burning fat continuously for hours!",
    inputDiagram: "Malate (4C) + Empty NAD+ Cart",
    machineAction: "Strips final electrons to charge 3rd NADH & resets OAA mold",
    outputDiagram: "Oxaloacetate Mold (4C Reset) + 1x NADH Battery 🔋"
  }
];

export default function MolecularAssemblyLine() {
  const [activeStation, setActiveStation] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isZone2Mode, setIsZone2Mode] = useState(false);
  const [selectedCarbon, setSelectedCarbon] = useState(null);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [activeTab, setActiveTab] = useState('simple'); // 'simple' | 'blueprint' | 'analogy' | 'zone2'
  const [showBatteryGuide, setShowBatteryGuide] = useState(true);

  // Cumulative Yield Accumulator State
  const [yieldData, setYieldData] = useState({
    nadh: 0,
    fadh2: 0,
    atp: 0,
    co2: 0
  });

  // Calculate yield based on current station index in active cycle
  useEffect(() => {
    let nadh = 0;
    let fadh2 = 0;
    let atp = 0;
    let co2 = 0;

    if (activeStation >= 3) { nadh += 1; co2 += 1; }
    if (activeStation >= 4) { nadh += 1; co2 += 1; }
    if (activeStation >= 5) { atp += 1; }
    if (activeStation >= 6) { fadh2 += 1; }
    if (activeStation >= 8) { nadh += 1; }

    setYieldData({ nadh, fadh2, atp, co2 });
  }, [activeStation]);

  const triggerCycleCompletionConfetti = () => {
    try {
      const fireConfetti = typeof confetti === 'function' ? confetti : (confetti && confetti.default);
      if (typeof fireConfetti === 'function') {
        fireConfetti({
          particleCount: 65,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6']
        });
      }
    } catch (e) {
      // Fallback gracefully
    }
  };

  // Auto-advance timer through all 8 stations
  useEffect(() => {
    if (!isPlaying) return;
    const baseTime = isZone2Mode ? 2200 : 3500;
    const duration = baseTime / playbackSpeed;
    const timer = setTimeout(() => {
      if (activeStation >= 8) {
        triggerCycleCompletionConfetti();
        setCompletedCycles((c) => c + 1);
        setActiveStation(1);
      } else {
        setActiveStation((prev) => prev + 1);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [isPlaying, activeStation, playbackSpeed, isZone2Mode]);

  const handleStationClick = (stNum) => {
    setActiveStation(stNum);
    setIsPlaying(false);
    if (stNum === 8) triggerCycleCompletionConfetti();
  };

  const currentSt = STATIONS_INFO[activeStation - 1];

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner & Full Cycle Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-stone-900 to-amber-950/60 text-stone-100 shadow-2xl border border-stone-800 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-widest border border-amber-500/40 inline-flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-amber-400 animate-spin-slow" />
              Full 8-Station Industrial TCA Plant
            </span>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Completed Cycles: {completedCycles}</span>
              </div>

              <button
                onClick={() => setIsZone2Mode(!isZone2Mode)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                  isZone2Mode
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/30'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-emerald-400'
                }`}
              >
                <Zap className={`w-3.5 h-3.5 ${isZone2Mode ? 'text-slate-950 fill-slate-950' : 'text-emerald-400'}`} />
                <span>{isZone2Mode ? 'Zone 2 Turbo Delivery ON' : 'Standard Speed'}</span>
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-amber-200 via-yellow-200 to-emerald-300 bg-clip-text text-transparent">
              The Molecular Assembly Line: 8-Step Krebs Cycle
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
              Watch the complete 8-station bioenergetic plant! Clear visual blueprints for all 6 carbons (2C delivered from fat + 4C recycled mold), energy battery accumulation (3 NADH + 1 FADH₂ + 1 ATP), CO₂ exhaust venting, and Oxaloacetate recycling explained in simple, friendly terms.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Carbon Source Map Infographic Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-amber-500/40 text-slate-100 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-base">
            <Smile className="w-5 h-5 text-amber-400" />
            <span>Visual Carbon Source Map: Where Do the 6 Carbons Come From?</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs border border-amber-400/40">
            2C Delivery + 4C Mold = 6C Citrate
          </span>
        </div>

        {/* Visual Flow Schematic Box */}
        <div className="p-4 rounded-2xl bg-white/80 border border-stone-200 space-y-3 font-sans shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center text-xs">
            
            {/* Left: 2C Fat Delivery */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 space-y-1">
              <div className="text-base font-black text-amber-900 flex items-center justify-center gap-1">
                <span>🚚 2-Carbon Package</span>
              </div>
              <div className="text-[11px] font-bold text-amber-800">(Acetyl-CoA from Fat)</div>
              <div className="flex items-center justify-center gap-1.5 pt-1">
                <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center justify-center shadow">C1</span>
                <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center justify-center shadow">C2</span>
              </div>
            </div>

            {/* Middle: Merger Station */}
            <div className="flex flex-col items-center justify-center gap-1 text-stone-600 font-bold">
              <span className="text-lg text-emerald-600 font-black">➕ Merged by Enzyme</span>
              <ArrowRight className="w-5 h-5 text-emerald-600 hidden md:block" />
              <ArrowDown className="w-5 h-5 text-emerald-600 md:hidden" />
              <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">Citrate Synthase Arm</span>
            </div>

            {/* Right: 4C Recycled Mold */}
            <div className="p-3 rounded-xl bg-sky-50 border border-sky-300 space-y-1">
              <div className="text-base font-black text-sky-900 flex items-center justify-center gap-1">
                <span>🔄 4-Carbon Mold Tray</span>
              </div>
              <div className="text-[11px] font-bold text-sky-800">(Recycled Oxaloacetate)</div>
              <div className="flex items-center justify-center gap-1.5 pt-1">
                <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-black text-[10px] flex items-center justify-center shadow">C3</span>
                <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-black text-[10px] flex items-center justify-center shadow">C4</span>
                <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-black text-[10px] flex items-center justify-center shadow">C5</span>
                <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-black text-[10px] flex items-center justify-center shadow">C6</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 8-Station Quick Navigation Bar */}
      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto">
        {STATIONS_INFO.map((st) => (
          <button
            key={st.station}
            onClick={() => handleStationClick(st.station)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeStation === st.station
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/30 scale-105'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>{st.emoji}</span>
            <span className="hidden md:inline">Station {st.station}</span>
          </button>
        ))}
      </div>

      {/* Main Visual Stage Canvas */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl relative space-y-6 overflow-hidden">
        
        {/* Station Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
            <span className="text-amber-300 font-extrabold text-xs uppercase tracking-widest">
              {currentSt.badge}
            </span>
          </div>

          <div className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
            Current Assembly Structure: <strong className="text-amber-300">{currentSt.carbonCount} Carbons</strong>
          </div>
        </div>

        {/* Dynamic Assembly Canvas */}
        <div className="relative min-h-[360px] sm:min-h-[420px] rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/90 p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
          
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* TOP SECTION: Enzymatic Robotic Arm / Workstation Apparatus */}
          <div className="relative z-10 flex justify-center items-start h-24">
            <div className="transition-all duration-700 flex flex-col items-center">
              {/* Robotic Arm Shaft */}
              <div className="w-16 h-4 bg-slate-700 rounded-t-md border border-slate-600 shadow-md flex items-center justify-center">
                <div className="w-3 h-1 bg-amber-400 rounded-full animate-pulse" />
              </div>
              <div className="w-3 bg-gradient-to-b from-slate-600 to-amber-500 h-10 animate-pulse" />
              
              {/* Enzyme Badge */}
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-400 text-amber-300 text-xs font-mono font-bold flex items-center gap-2 shadow-xl ring-4 ring-amber-500/20">
                <Cpu className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span>Machine / Enzyme: {currentSt.enzyme}</span>
              </div>
            </div>
          </div>

          {/* MIDDLE SECTION: Dynamic Carbon Structure & Animated Reactions */}
          <div className="relative z-10 my-4 flex flex-col items-center justify-center min-h-[160px] gap-4">
            
            {/* Animated Carbon Molecule Frame */}
            <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/95 border-2 border-amber-400/80 shadow-2xl backdrop-blur-md flex flex-col items-center gap-4 max-w-lg w-full">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentSt.emoji}</span>
                <span className="text-base font-extrabold text-amber-300">{currentSt.name}</span>
              </div>

              {/* Carbon Origin Color Legend Header */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-mono border-t border-b border-slate-800 py-1.5 w-full">
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span>Gold: Fat Delivery (C1-C2)</span>
                </span>
                <span className="flex items-center gap-1 text-sky-300 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  <span>Blue: Recycled Mold (C3-C6)</span>
                </span>
              </div>

              {/* Carbon Spheres Chain */}
              <div className="flex items-center gap-2">
                {[...Array(currentSt.carbonCount)].map((_, idx) => {
                  const cId = idx + 1;
                  const isDelivered = cId <= 2;
                  return (
                    <button
                      key={cId}
                      onClick={() => setSelectedCarbon({ 
                        id: cId, 
                        name: `Carbon ${cId}`, 
                        source: isDelivered ? "Delivered from Fat (Acetyl-CoA Truck)" : "Recycled 4-Carbon Mold (Oxaloacetate)",
                        origin: `Part of ${currentSt.name} (${currentSt.carbonCount}C frame)` 
                      })}
                      className={`w-10 h-10 rounded-full font-black text-xs flex flex-col items-center justify-center shadow-lg transition-all duration-500 hover:scale-115 ${
                        isDelivered 
                          ? 'bg-gradient-to-tr from-amber-400 to-yellow-400 text-slate-950 ring-2 ring-amber-300' 
                          : 'bg-gradient-to-tr from-sky-500 to-blue-600 text-white ring-2 ring-sky-300'
                      }`}
                      title={isDelivered ? "Carbon from Fat (Acetyl-CoA)" : "Carbon from Recycled Mold (Oxaloacetate)"}
                    >
                      <span>C{cId}</span>
                      <span className="text-[8px] opacity-75">{isDelivered ? 'Fat' : 'Mold'}</span>
                    </button>
                  );
                })}
              </div>

              <div className="text-[11px] font-mono text-slate-400 text-center">
                Formula: <span className="text-amber-200 font-bold">{currentSt.formula}</span>
              </div>
            </div>

            {/* Special Visual Effects based on Station Action */}
            {activeStation === 3 && (
              <div className="px-3 py-1.5 rounded-xl bg-sky-950/90 border border-sky-400 text-sky-300 text-xs font-mono font-bold flex items-center gap-2 animate-bounce">
                <Wind className="w-4 h-4 text-sky-400" />
                <span>💨 CO₂ Gas Sheared & Vented! (+1 NADH Battery Charged)</span>
              </div>
            )}

            {activeStation === 4 && (
              <div className="px-3 py-1.5 rounded-xl bg-sky-950/90 border border-sky-400 text-sky-300 text-xs font-mono font-bold flex items-center gap-2 animate-bounce">
                <Wind className="w-4 h-4 text-sky-400" />
                <span>💨 2nd CO₂ Gas Vented! (All 2 original fat carbons cleared!)</span>
              </div>
            )}

            {activeStation === 5 && (
              <div className="px-3 py-1.5 rounded-xl bg-amber-950/90 border border-amber-400 text-amber-300 text-xs font-mono font-bold flex items-center gap-2 animate-pulse">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>⚡ High-Energy Thioester Bond Cleaved! Direct ATP Generated!</span>
              </div>
            )}

            {activeStation === 6 && (
              <div className="px-3 py-1.5 rounded-xl bg-purple-950/90 border border-purple-400 text-purple-300 text-xs font-mono font-bold flex items-center gap-2 animate-pulse">
                <Zap className="w-4 h-4 text-purple-400" />
                <span>🔌 Complex II Membrane Gate Active! FADH₂ Battery Charged!</span>
              </div>
            )}

            {activeStation === 7 && (
              <div className="px-3 py-1.5 rounded-xl bg-teal-950/90 border border-teal-400 text-teal-300 text-xs font-mono font-bold flex items-center gap-2 animate-pulse">
                <Droplet className="w-4 h-4 text-teal-400" />
                <span>💧 H₂O Water Injection across double bond!</span>
              </div>
            )}

            {activeStation === 8 && (
              <div className="px-3 py-1.5 rounded-xl bg-emerald-950/90 border border-emerald-400 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 animate-bounce">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>🔄 3rd NADH Charged! Oxaloacetate Cleaned & Reset for Next Truck!</span>
              </div>
            )}

          </div>

          {/* BOTTOM SECTION: Conveyor Track & Direction Indicators */}
          <div className="relative z-10 w-full space-y-2">
            <div className="h-6 w-full rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between px-3 overflow-hidden shadow-inner">
              <div className="flex items-center gap-6 w-full animate-pulse">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="h-4 w-2 bg-slate-600 rounded-xs transform -skew-x-12" />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <RefreshCw className={`w-3 h-3 text-amber-400 ${isPlaying ? 'animate-spin' : ''}`} />
                <span>Assembly Plant: Station {activeStation} of 8</span>
              </span>
              <span>Flow: Continuous TCA Cycle Carousel</span>
            </div>
          </div>

        </div>

        {/* Step Control Buttons */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveStation(prev => (prev <= 1 ? 8 : prev - 1))}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition border border-slate-700 text-xs font-bold flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev Station</span>
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition shadow-lg flex items-center gap-1.5 text-xs"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
              <span>{isPlaying ? 'Pause Assembly Line' : 'Auto-Run Cycle'}</span>
            </button>

            <button
              onClick={() => setActiveStation(prev => (prev >= 8 ? 1 : prev + 1))}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition border border-slate-700 text-xs font-bold flex items-center gap-1"
            >
              <span className="hidden sm:inline">Next Station</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Speed Controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Speed:</span>
            {[1, 1.5, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition ${
                  playbackSpeed === spd
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* 🎯 PLACED DIRECTLY HERE: Enhanced Station Friendly Breakdown Inspector Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
          
          {/* Header & Mode Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">{currentSt.emoji}</span>
              <h3 className="text-lg font-extrabold text-amber-300">
                Station {currentSt.station}: {currentSt.name}
              </h3>
            </div>

            {/* Explanation Perspective Tabs */}
            <div className="flex flex-wrap items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('simple')}
                className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                  activeTab === 'simple'
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Simple Story</span>
              </button>

              <button
                onClick={() => setActiveTab('blueprint')}
                className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                  activeTab === 'blueprint'
                    ? 'bg-sky-400 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Station Blueprint</span>
              </button>

              <button
                onClick={() => setActiveTab('analogy')}
                className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                  activeTab === 'analogy'
                    ? 'bg-emerald-400 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Factory Metaphor</span>
              </button>

              <button
                onClick={() => setActiveTab('zone2')}
                className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                  activeTab === 'zone2'
                    ? 'bg-teal-400 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Zone 2 Secret</span>
              </button>
            </div>
          </div>

          {/* Dynamic Tab Content */}
          {activeTab === 'simple' && (
            <div className="space-y-2 animate-fade-in text-stone-300 text-xs sm:text-sm leading-relaxed font-normal">
              <div className="font-bold text-amber-400 text-sm">💡 What is happening in plain words?</div>
              <p>{currentSt.friendlyExplanation}</p>
              <div className="pt-2 text-xs font-mono text-slate-400 border-t border-slate-800">
                Official Chemical Reaction: <span className="text-amber-300 font-bold">{currentSt.formula}</span>
              </div>
            </div>
          )}

          {activeTab === 'blueprint' && (
            <div className="space-y-3 animate-fade-in text-xs sm:text-sm leading-relaxed">
              <div className="font-bold text-sky-400 text-sm flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>Station {currentSt.station} Machine Blueprint & Flow</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-bold text-[11px] uppercase">1. What Enters</div>
                  <div className="text-amber-300 font-extrabold">{currentSt.inputDiagram}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-sky-500/40 space-y-1">
                  <div className="text-sky-400 font-bold text-[11px] uppercase">2. Machine Action</div>
                  <div className="text-slate-200 font-semibold">{currentSt.machineAction}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-bold text-[11px] uppercase">3. What Leaves</div>
                  <div className="text-emerald-400 font-extrabold">{currentSt.outputDiagram}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analogy' && (
            <div className="space-y-2 animate-fade-in text-emerald-200 text-xs sm:text-sm leading-relaxed font-normal">
              <div className="font-bold text-emerald-400 text-sm">{currentSt.friendlyAnalogy}</div>
              <p>{currentSt.details}</p>
              <div className="pt-2 text-xs font-mono text-emerald-400 border-t border-slate-800">
                Key Machine: <span className="text-white font-bold">{currentSt.enzyme}</span>
              </div>
            </div>
          )}

          {activeTab === 'zone2' && (
            <div className="space-y-2 animate-fade-in text-teal-200 text-xs sm:text-sm leading-relaxed font-normal">
              <div className="font-bold text-teal-300 text-sm">🏃 Why is this crucial for your Zone 2 runs?</div>
              <p>{currentSt.zone2Connection}</p>
              <div className="pt-2 text-xs font-bold text-teal-400 border-t border-slate-800">
                ⚡ Yield: {currentSt.yieldNotice}
              </div>
            </div>
          )}

        </div>

        {/* Carbon Modal Inspector */}
        {selectedCarbon && (
          <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40 space-y-2 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>{selectedCarbon.name}</span>
              </span>
              <button 
                onClick={() => setSelectedCarbon(null)}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                ✕ Close
              </button>
            </div>
            <div className="text-xs text-slate-300 space-y-1">
              <p><strong>Carbon Source:</strong> <span className="text-amber-300 font-bold">{selectedCarbon.source}</span></p>
              <p><strong>Context:</strong> {selectedCarbon.origin}</p>
            </div>
          </div>
        )}

      </div>

      {/* Live Energy & Carbon Yield Accumulator Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* NADH Battery Counter */}
        <div className={`p-4 rounded-2xl border transition-all duration-500 ${
          yieldData.nadh > 0 
            ? 'bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-500/10' 
            : 'bg-slate-900/80 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between text-xs font-bold text-emerald-300 mb-1">
            <span className="flex items-center gap-1.5">
              <BatteryCharging className="w-4 h-4 text-emerald-400" />
              <span>NADH Batteries</span>
            </span>
            <span className="font-mono text-sm">{yieldData.nadh} / 3</span>
          </div>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3].map((num) => (
              <div 
                key={num} 
                className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                  yieldData.nadh >= num ? 'bg-emerald-400 shadow-md shadow-emerald-400/50' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* FADH2 Battery Counter */}
        <div className={`p-4 rounded-2xl border transition-all duration-500 ${
          yieldData.fadh2 > 0 
            ? 'bg-purple-950/40 border-purple-500/50 shadow-lg shadow-purple-500/10' 
            : 'bg-slate-900/80 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between text-xs font-bold text-purple-300 mb-1">
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>FADH₂ Battery</span>
            </span>
            <span className="font-mono text-sm">{yieldData.fadh2} / 1</span>
          </div>
          <div className="flex gap-1 mt-2">
            <div className={`h-2 flex-1 rounded-full transition-all duration-500 ${
              yieldData.fadh2 >= 1 ? 'bg-purple-400 shadow-md shadow-purple-400/50' : 'bg-slate-800'
            }`} />
          </div>
        </div>

        {/* ATP Energy Spark Counter */}
        <div className={`p-4 rounded-2xl border transition-all duration-500 ${
          yieldData.atp > 0 
            ? 'bg-amber-950/40 border-amber-500/50 shadow-lg shadow-amber-500/10' 
            : 'bg-slate-900/80 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-1">
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Direct ATP</span>
            </span>
            <span className="font-mono text-sm">{yieldData.atp} / 1</span>
          </div>
          <div className="flex gap-1 mt-2">
            <div className={`h-2 flex-1 rounded-full transition-all duration-500 ${
              yieldData.atp >= 1 ? 'bg-amber-400 shadow-md shadow-amber-400/50' : 'bg-slate-800'
            }`} />
          </div>
        </div>

        {/* CO2 Exhaust Gas Counter */}
        <div className={`p-4 rounded-2xl border transition-all duration-500 ${
          yieldData.co2 > 0 
            ? 'bg-sky-950/40 border-sky-500/50 shadow-lg shadow-sky-500/10' 
            : 'bg-slate-900/80 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between text-xs font-bold text-sky-300 mb-1">
            <span className="flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-sky-400" />
              <span>CO₂ Exhaust</span>
            </span>
            <span className="font-mono text-sm">{yieldData.co2} / 2</span>
          </div>
          <div className="flex gap-1 mt-2">
            {[1, 2].map((num) => (
              <div 
                key={num} 
                className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                  yieldData.co2 >= num ? 'bg-sky-400 shadow-md shadow-sky-400/50 animate-pulse' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Explanatory Guide: What are NADH & FADH2 Power-Bank Batteries? */}
      {showBatteryGuide && (
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-emerald-500/40 text-slate-100 space-y-3 animate-fade-in relative">
          <button 
            onClick={() => setShowBatteryGuide(false)}
            className="absolute top-4 right-4 text-xs text-slate-400 hover:text-slate-200"
          >
            ✕ Hide Guide
          </button>

          <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm sm:text-base">
            <BatteryCharging className="w-5 h-5 text-emerald-400" />
            <span>Demystifying "NADH" & "FADH₂": What Are These Cellular Power Banks?</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm leading-relaxed">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>NADH Battery = High-Capacity Power Cart</span>
              </div>
              <p className="text-slate-300 font-normal">
                <strong>NAD⁺</strong> is an empty rechargeable battery wagon floating in your cell. When enzymes break carbon bonds at Stations 3, 4, and 8, they load high-energy electrons onto the wagon, turning it into <strong>NADH</strong>! It drives over to <strong>Complex I</strong> of the mitochondrial power grid to generate <strong>~2.5 ATP</strong> electricity per battery!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                <span>FADH₂ Battery = Secondary Membrane Power Cart</span>
              </div>
              <p className="text-slate-300 font-normal">
                <strong>FAD</strong> is a specialized secondary battery wagon. At Station 6, it docks right onto <strong>Complex II</strong> on the inner membrane, loading electrons to become <strong>FADH₂</strong>! It delivers its charge to generate <strong>~1.5 ATP</strong> electricity!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Summary of Total Energy Yield Per Turn */}
      <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-base">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <span>Total Energy Yield per 1 Cycle Turn (1 Acetyl-CoA Delivery)</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-xs border border-emerald-300">
            Grand Total = 10 ATP per Turn
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-white border border-stone-200">
            <div className="font-bold text-emerald-800">3x NADH Batteries</div>
            <div className="text-stone-600 mt-0.5">3 × ~2.5 ATP = <strong>7.5 ATP</strong> in Complex I</div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-stone-200">
            <div className="font-bold text-purple-800">1x FADH₂ Battery</div>
            <div className="text-stone-600 mt-0.5">1 × ~1.5 ATP = <strong>1.5 ATP</strong> in Complex II</div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-stone-200">
            <div className="font-bold text-amber-800">1x ATP (GTP) Spark</div>
            <div className="text-stone-600 mt-0.5">Direct matrix energy = <strong>1.0 ATP</strong></div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-stone-200">
            <div className="font-bold text-sky-800">2x CO₂ Exhaust</div>
            <div className="text-stone-600 mt-0.5">Literally exhaled out of your mouth!</div>
          </div>
        </div>
      </div>

      {/* Interactive Power & Lightbulbs Visual Infographic Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-950 border border-amber-500/40 text-slate-100 space-y-4">
        <div className="flex items-center gap-2.5 text-amber-300 font-extrabold text-lg">
          <Gauge className="w-5 h-5 text-amber-400" />
          <span>Visual Energy Scale: Human Power vs Lightbulbs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm font-sans">
          
          {/* Rest: 100W */}
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 text-sm">🛋️ Body at Rest</span>
              <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono font-bold text-xs">~100 Watts</span>
            </div>
            <div className="text-2xl">💡</div>
            <p className="text-slate-300 leading-relaxed font-normal">
              Equivalent to <strong>1 standard 100W lightbulb</strong>. Your mitochondria burn <strong>1.2 Sextillion ATP/sec</strong> (~60 kg ATP recycled per day!).
            </p>
          </div>

          {/* Zone 2 Run: 800W */}
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-emerald-500/40 space-y-2 ring-2 ring-emerald-500/30">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-300 text-sm">🏃 Zone 2 Running</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs">~800 Watts</span>
            </div>
            <div className="text-2xl">💡💡💡💡💡💡💡💡</div>
            <p className="text-slate-300 leading-relaxed font-normal">
              Equivalent to powering <strong>8 household lightbulbs continuously</strong>! Mitochondria churn out <strong>10 Sextillion ATP/sec</strong>.
            </p>
          </div>

          {/* All-Out Sprint: 1600W */}
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-purple-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-300 text-sm">⚡ All-Out Sprint</span>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono font-bold text-xs">~1600 Watts</span>
            </div>
            <div className="text-2xl">⚡⚡⚡</div>
            <p className="text-slate-300 leading-relaxed font-normal">
              Equivalent to a <strong>microwave or toaster oven</strong> on high power! Burns <strong>18 Sextillion ATP/sec</strong>.
            </p>
          </div>

        </div>

        {/* Cosmic Universe Parallel Callout */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-950 to-indigo-950/80 border border-purple-500/40 text-slate-100 space-y-2 mt-4 shadow-xl">
          <div className="flex items-center gap-2 text-purple-300 font-extrabold text-sm sm:text-base">
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            <span>🌌 The Inner Cosmos: Your Body vs. The Observable Universe</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Astrophysicists estimate there are roughly <strong>1 Sextillion ($10^{21}$) to 10 Sextillion ($10^{22}$) stars</strong> in the entire observable universe. When you run in Zone 2, your mitochondria complete <strong>1 Sextillion Krebs Cycle turns</strong> and generate <strong>10 Sextillion ATP molecules every single second</strong>. 
          </p>
          <div className="text-xs font-bold text-purple-300 bg-purple-950/90 p-2.5 rounded-xl border border-purple-800/80 inline-block">
            ✨ You are literally operating a full cosmic universe of molecular stars inside your cells with every stride!
          </div>
        </div>

      </div>

      {/* Friendly Bioenergetics Q&A Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-slate-100 space-y-6">
        <div className="flex items-center gap-2.5 text-amber-400 font-extrabold text-lg">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <span>Frequently Asked Questions (Friendly Bioenergetics)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs sm:text-sm">
          
          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-3 col-span-1 md:col-span-2 lg:col-span-3">
            <div className="font-bold text-amber-300 text-sm flex items-center justify-between">
              <span>🧪 What is Oxaloacetate (OAA)?</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">C₄H₄O₅ • 4-Carbon Receptor</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-normal text-xs sm:text-sm">
              <strong>Oxaloacetate (OAA)</strong> is a 4-carbon dicarboxylic acid (C₄H₄O₅) that serves as the essential <strong>"4-slot molding tray"</strong> of cellular respiration inside the mitochondrial matrix. It acts as both the <strong>initial substrate acceptor</strong> (merging with 2-carbon Acetyl-CoA from fat/carbs to form Citrate) and the <strong>final regenerated product</strong> of the Krebs cycle.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1">🔑 1. The Energy Gateway</div>
                <div className="text-slate-300 leading-relaxed font-normal">
                  Without Oxaloacetate, 2-carbon units from fat breakdown cannot enter the Krebs cycle ("fat burns in the flame of carbs").
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-emerald-300 flex items-center gap-1">🔀 2. Metabolic Crossroad</div>
                <div className="text-slate-300 leading-relaxed font-normal">
                  Serves as the key intermediate for gluconeogenesis (making new glucose), amino acid synthesis (Aspartate), and electron shuttling.
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-teal-500/40 space-y-3 col-span-1 md:col-span-2 lg:col-span-3">
            <div className="font-bold text-teal-300 text-sm flex items-center justify-between">
              <span>🧬 Where Does Oxaloacetate (OAA) Come From? (Its 4 Primary Sources)</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">Anaplerosis & Recycling</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-normal text-xs sm:text-sm">
              Oxaloacetate (OAA) is the 4-carbon molding tray that receives 2-carbon units from fat. Your body maintains and replenishes OAA through <strong>4 primary pathways</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-1">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1">🔄 1. Krebs Cycle Recycling</div>
                <div className="text-slate-300 leading-relaxed font-normal">
                  Step 8 oxidizes <strong>L-Malate</strong> back into OAA via <em>Malate Dehydrogenase</em>, resetting the tray after every turn.
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-emerald-300 flex items-center gap-1">🍞 2. Glucose / Carbs</div>
                <div className="text-slate-300 leading-relaxed font-normal">
                  <em>Pyruvate Carboxylase</em> adds CO₂ to <strong>Pyruvate (3C)</strong> to synthesize fresh OAA (4C) from scratch (anaplerosis: <em>"fat burns in the flame of carbs"</em>).
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-sky-300 flex items-center gap-1">🥩 3. Amino Acids / Protein</div>
                <div className="text-slate-300 leading-relaxed font-normal">
                  <strong>Aspartate</strong> undergoes transamination via <em>AST (Aspartate Transaminase)</em> to directly transform into OAA.
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-purple-300 flex items-center gap-1">🏃 4. Lactate Shuttle</div>
                <div className="text-slate-300 leading-relaxed font-normal">
                  Lactate is converted into Pyruvate by <em>LDH</em>, which then fuels <em>Pyruvate Carboxylase</em> to rebuild OAA during exercise.
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-emerald-300 text-sm">
              ❓ What seeds "3 NADH + 1 FADH₂" power-bank batteries?
            </div>
            <p className="text-slate-300 leading-relaxed font-normal">
              They are <strong>high-energy electron carrier wagons</strong>! NAD⁺ and FAD are empty wagons waiting in the cell. As food bonds are broken, enzymes load them with high-energy electrons, turning them into charged <strong>NADH</strong> and <strong>FADH₂</strong> batteries that drive over to the Electron Transport Chain power station to generate 90% of your body's ATP electricity!
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-sky-300 text-sm">
              ❓ Where does the fat go when I burn it?
            </div>
            <p className="text-slate-300 leading-relaxed font-normal">
              You literally exhale it! During Stations 3 and 4, the carbon shearing arms clip off 2 carbons. They react with oxygen to form CO₂ gas, which travels through your bloodstream into your lungs and leaves your body with every breath.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-purple-300 text-sm">
              ⚡ How many Watts are in an ATP molecule?
            </div>
            <p className="text-slate-300 leading-relaxed font-normal">
              <strong>Watts measure power (energy per second)</strong>, whereas 1 ATP molecule is a single energy packet ($8.3 \times 10^{-20}$ Joules). To output <strong>1 Watt of continuous power</strong>, your body must break down <strong>12 quintillion ATP per second</strong>! At rest (~100W), you burn <strong>1.2 sextillion ATP/sec</strong> (~50-70 kg of ATP recycled per day!).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-2">
            <div className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
              <span>❓ How many Krebs cycles are in one mitochondrion?</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-normal">
              <strong>Zero physical objects!</strong> The Krebs cycle is a <em>chemical reaction pathway</em> (a sequence of 8 enzymatic steps), not a physical structure. However, each mitochondrial matrix contains thousands of copies of all 8 cycle enzymes operating simultaneously. Per 1 molecule of glucose, the cycle turns <strong>2 times</strong> (or 8+ turns per fatty acid), completing millions of chemical turns per second inside each cell!
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2 col-span-1 md:col-span-2 lg:col-span-2">
            <div className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
              <span>⏱️ What is the Cycle Time for 10 ATP?</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-normal">
              At the single-molecule scale, 1 mitochondrial enzyme complex completes 1 full turn (yielding 10 ATP) in <strong>1 to 10 milliseconds (0.001 to 0.01 seconds)</strong>! Across your entire body during Zone 2 running (~800W), your mitochondria complete <strong>1 Sextillion ($10^{21}$) cycle turns every single second</strong>!
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
