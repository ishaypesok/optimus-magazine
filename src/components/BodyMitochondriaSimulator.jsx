import React, { useState } from 'react';
import { 
  Activity, Heart, Brain, Zap, Flame, ShieldCheck, Sparkles, 
  Droplet, Layers, Cpu, TrendingUp, CheckCircle2, RefreshCw, 
  User, ArrowRight, Lightbulb, Info, Check, Eye
} from 'lucide-react';

export default function BodyMitochondriaSimulator() {
  // State 1: Active Exercise Zone
  const [selectedZone, setSelectedZone] = useState(2); // Zone 2 default
  
  // State 2: Session Duration Slider
  const [runDurationMin, setRunDurationMin] = useState(45); // 45 min default

  // State 3: Selected Anatomical Tissue Hotspot
  const [selectedTissue, setSelectedTissue] = useState('legs'); // 'legs', 'heart', 'brain', 'liver', 'diaphragm'

  // Zone Physiology Specs
  const ZONE_SPECS = {
    1: {
      name: 'Zone 1: Rest & Recovery',
      pgc1a: 15, // PGC-1a signal %
      fatOx: 85,
      lactate: 0.8,
      mitoGrowthRate: '0% (Baseline Maintenance)',
      color: 'border-stone-300 bg-stone-100 text-stone-800',
      badgeBg: 'bg-stone-600',
      desc: 'Resting state. Energy demand is low, so the body does not signal for new mitochondrial biogenesis.'
    },
    2: {
      name: 'Zone 2: Cellular Sweet Spot ⭐',
      pgc1a: 100, // Peak signaling!
      fatOx: 100, // Max absolute FATmax
      lactate: 1.5,
      mitoGrowthRate: '+25% Volume Expansion over 12 Weeks',
      color: 'border-emerald-500 bg-emerald-50 text-emerald-950',
      badgeBg: 'bg-emerald-600 text-white font-extrabold',
      desc: 'Optimal AMPK & PGC-1α activation. Calcium influx and low lactate stimulate maximum mitochondrial proliferation & capillary angiogenesis.'
    },
    3: {
      name: 'Zone 3: Tempo / Mixed Fuel',
      pgc1a: 60,
      fatOx: 55,
      lactate: 2.8,
      mitoGrowthRate: '+10% Growth (Carb Shift)',
      color: 'border-amber-400 bg-amber-50 text-amber-950',
      badgeBg: 'bg-amber-600 text-white font-bold',
      desc: 'Carbohydrates take over. Moderate biogenesis, but rising lactate begins to inhibit fatty acid transport into mitochondria.'
    },
    4: {
      name: 'Zone 4/5: Threshold & Sprint',
      pgc1a: 25,
      fatOx: 10,
      lactate: 7.5,
      mitoGrowthRate: 'Minimal (High Acidic Stress)',
      color: 'border-rose-400 bg-rose-50 text-rose-950',
      badgeBg: 'bg-rose-600 text-white font-bold',
      desc: 'Anaerobic glycolysis dominates. High H+ acidity inhibits mitochondrial enzymes (CPT-1), bottlenecking fat oxidation.'
    }
  };

  // Tissue Data Specs
  const TISSUE_SPECS = {
    legs: {
      id: 'legs',
      name: 'Leg Skeletal Muscle (Quads, Glutes, Calves)',
      fiberType: 'Type I Slow-Twitch Fibers',
      densityBaseline: '3,200 mitochondria / muscle cell',
      densityZone2: '4,400 mitochondria / muscle cell (+37.5%)',
      primaryRole: 'Propulsion & Aerobic Endurance',
      zone2Benefit: 'Zone 2 stimulates massive PGC-1α transcription, doubling mitochondrial volume, expanding capillary network density, and increasing fatigue resistance.',
      icon: User,
      color: 'emerald',
      positionText: 'Lower Body & Quadriceps'
    },
    heart: {
      id: 'heart',
      name: 'Myocardium (Heart Muscle)',
      fiberType: 'Specialized Cardiac Muscle',
      densityBaseline: 'Highest in body (~40% of cell volume!)',
      densityZone2: '+15% Cristae surface area & stroke volume expansion',
      primaryRole: 'Pumping Oxygenated Blood to Working Tissues',
      zone2Benefit: 'Cardiomyocytes rely 100% on aerobic fat oxidation. Zone 2 increases stroke volume (blood pumped per beat) without pathological pressure overload.',
      icon: Heart,
      color: 'rose',
      positionText: 'Chest & Cardiovascular Center'
    },
    brain: {
      id: 'brain',
      name: 'Brain (Cortex & Hippocampus)',
      fiberType: 'Neurons & Astrocytes',
      densityBaseline: 'Consumes 20% of resting O₂ supply',
      densityZone2: 'Stimulates Mitophagy & BDNF Neuroplasticity',
      primaryRole: 'Cognitive Control, Focus & Memory',
      zone2Benefit: 'Zone 2 increases cerebral blood flow and triggers BDNF (Brain-Derived Neurotrophic Factor), clearing damaged mitochondria via mitophagy and boosting mental stamina.',
      icon: Brain,
      color: 'indigo',
      positionText: 'Cranial Neuronal Network'
    },
    liver: {
      id: 'liver',
      name: 'Liver (Hepatic Tissue)',
      fiberType: 'Hepatocytes',
      densityBaseline: '1,000–2,000 mitochondria / cell',
      densityZone2: 'Enhanced Cori Cycle & Lactate Clearance',
      primaryRole: 'Metabolic Regulation & Gluconeogenesis',
      zone2Benefit: 'Liver mitochondria clear circulating lactate (converting it back into glucose) and process free fatty acids during extended Zone 2 running.',
      icon: Flame,
      color: 'amber',
      positionText: 'Upper Abdomen'
    },
    diaphragm: {
      id: 'diaphragm',
      name: 'Diaphragm & Respiratory Muscles',
      fiberType: 'Oxidative Slow-Twitch Respiratory Fibers',
      densityBaseline: '3,800 mitochondria / cell',
      densityZone2: '+20% Fatigue Resistance for Continuous Breathing',
      primaryRole: 'Rhythmic Ventilation & O₂ Exchange',
      zone2Benefit: 'Prevents respiratory muscle fatigue ("diaphragmatic steal"), keeping oxygen flowing to leg muscles during long runs.',
      icon: Activity,
      color: 'teal',
      positionText: 'Chest Cavity Base'
    }
  };

  const currentZone = ZONE_SPECS[selectedZone];
  const activeTissue = TISSUE_SPECS[selectedTissue];

  // Dynamic calculations based on zone and duration
  const biogenesisScore = Math.round((currentZone.pgc1a * (runDurationMin / 45)));
  const capilaryDensityBoost = (selectedZone === 2 ? Math.round(15 * (runDurationMin / 45)) : Math.round(4 * (runDurationMin / 45)));

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-teal-950 via-stone-900 to-emerald-950 text-white p-6 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase tracking-wider border border-emerald-400/30 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" /> Page 15 • Whole-Body Anatomical Simulator
            </span>
            <span className="px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-extrabold uppercase tracking-wider border border-teal-400/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" /> PGC-1α Biogenesis Mapping
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Whole-Body Mitochondrial Distribution Simulator
          </h2>
          <p className="text-stone-200 text-sm sm:text-base font-medium leading-relaxed">
            Mitochondria aren't just in your legs! Zone 2 running acts as a systemic cellular stimulus, multiplying mitochondrial density, expanding capillary networks, and enhancing ATP synthesis in your <strong>heart, brain, liver, diaphragm, and skeletal muscles</strong>.
          </p>
        </div>
      </div>

      {/* Simulator Control Dashboard */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-stone-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-700" />
              <span>Step 1: Set Exercise Intensity & Run Duration</span>
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              See how different exercise zones switch on mitochondrial biogenesis signals across your organs.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs font-bold bg-stone-100 p-2 rounded-xl border border-stone-200">
            <span>Biogenesis Signal Score:</span>
            <span className="text-emerald-700 text-sm">{biogenesisScore} pts</span>
          </div>
        </div>

        {/* Zone Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((zId) => {
            const z = ZONE_SPECS[zId];
            const isSelected = selectedZone === zId;
            return (
              <button
                key={zId}
                onClick={() => setSelectedZone(zId)}
                className={`p-4 rounded-2xl border text-left transition space-y-2 flex flex-col justify-between ${
                  isSelected
                    ? `${z.color} border-2 shadow-sm font-bold`
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase inline-block mb-1.5 ${z.badgeBg}`}>
                    {zId === 2 ? 'Target Zone ⭐' : `Zone ${zId}`}
                  </span>
                  <h4 className="text-xs sm:text-sm font-extrabold line-clamp-1">{z.name}</h4>
                </div>

                <div className="pt-2 border-t border-stone-200/60 text-[11px] space-y-1">
                  <div className="flex justify-between text-stone-600 font-medium">
                    <span>PGC-1α Signal:</span>
                    <strong className={zId === 2 ? 'text-emerald-700 font-extrabold' : 'text-stone-800'}>{z.pgc1a}%</strong>
                  </div>
                  <div className="flex justify-between text-stone-600 font-medium">
                    <span>Fat Ox Share:</span>
                    <strong className="text-stone-800">{z.fatOx}%</strong>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Duration Slider */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-stone-800">
            <span>Run Duration:</span>
            <span className="text-sm font-black text-emerald-800 font-mono">{runDurationMin} minutes</span>
          </div>
          <input
            type="range"
            min="15"
            max="90"
            step="15"
            value={runDurationMin}
            onChange={(e) => setRunDurationMin(parseInt(e.target.value))}
            className="w-full accent-emerald-700 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-medium text-stone-500 font-mono">
            <span>15 min (Quick)</span>
            <span>45 min (Optimal)</span>
            <span>90 min (Extended Aerobic)</span>
          </div>
        </div>

      </div>

      {/* Interactive Body Map & Tissue Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Anatomical Map Selector (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
          <div className="border-b border-stone-200 pb-3">
            <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-700" />
              <span>Step 2: Select Body Region</span>
            </h3>
            <p className="text-xs text-stone-500">
              Click any organ or muscle group to inspect its mitochondrial profile.
            </p>
          </div>

          {/* Interactive Anatomical SVG Diagram */}
          <div className="relative bg-gradient-to-b from-stone-50 to-emerald-50/30 rounded-2xl p-6 border border-stone-200 flex flex-col items-center justify-center space-y-3">
            
            {/* SVG Silhouette Body Map */}
            <svg viewBox="0 0 200 380" className="w-48 h-80 drop-shadow-sm">
              {/* Body Silhouette */}
              <path
                d="M100,20 C112,20 120,30 120,44 C120,58 112,65 100,65 C88,65 80,58 80,44 C80,30 88,20 100,20 Z 
                   M70,80 L130,80 L145,160 L130,160 L125,230 L135,350 L112,350 L104,250 L96,250 L88,350 L65,350 L75,230 L70,160 L55,160 Z"
                fill="#e7e5e4"
                stroke="#d6d3d1"
                strokeWidth="2"
              />

              {/* Hotspot 1: Brain (Head) */}
              <g 
                onClick={() => setSelectedTissue('brain')} 
                className="cursor-pointer group"
              >
                <circle 
                  cx="100" cy="42" r="14" 
                  fill={selectedTissue === 'brain' ? '#6366f1' : '#a5b4fc'} 
                  className="transition group-hover:scale-110" 
                />
                <circle cx="100" cy="42" r="18" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3,3" className="animate-spin" />
              </g>

              {/* Hotspot 2: Heart (Upper Chest Left) */}
              <g 
                onClick={() => setSelectedTissue('heart')} 
                className="cursor-pointer group"
              >
                <circle 
                  cx="106" cy="105" r="12" 
                  fill={selectedTissue === 'heart' ? '#f43f5e' : '#fda4af'} 
                  className="transition group-hover:scale-110" 
                />
                <circle cx="106" cy="105" r="16" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3,3" className="animate-spin" />
              </g>

              {/* Hotspot 3: Diaphragm (Mid Chest) */}
              <g 
                onClick={() => setSelectedTissue('diaphragm')} 
                className="cursor-pointer group"
              >
                <ellipse 
                  cx="100" cy="130" rx="20" ry="7" 
                  fill={selectedTissue === 'diaphragm' ? '#14b8a6' : '#99f6e4'} 
                  className="transition group-hover:scale-110" 
                />
              </g>

              {/* Hotspot 4: Liver (Right Abdomen) */}
              <g 
                onClick={() => setSelectedTissue('liver')} 
                className="cursor-pointer group"
              >
                <circle 
                  cx="88" cy="148" r="11" 
                  fill={selectedTissue === 'liver' ? '#f59e0b' : '#fde68a'} 
                  className="transition group-hover:scale-110" 
                />
              </g>

              {/* Hotspot 5: Legs (Quads) */}
              <g 
                onClick={() => setSelectedTissue('legs')} 
                className="cursor-pointer group"
              >
                <rect 
                  x="78" y="240" width="18" height="60" rx="8"
                  fill={selectedTissue === 'legs' ? '#10b981' : '#6ee7b7'} 
                  className="transition group-hover:scale-105" 
                />
                <rect 
                  x="104" y="240" width="18" height="60" rx="8"
                  fill={selectedTissue === 'legs' ? '#10b981' : '#6ee7b7'} 
                  className="transition group-hover:scale-105" 
                />
              </g>
            </svg>

            <span className="text-[11px] font-bold text-stone-600 bg-white/80 px-3 py-1 rounded-full border border-stone-200">
              📌 Click nodes on the body diagram above
            </span>
          </div>

          {/* Tissue Buttons List */}
          <div className="space-y-1.5">
            {Object.keys(TISSUE_SPECS).map((key) => {
              const t = TISSUE_SPECS[key];
              const IconComp = t.icon;
              const isSelected = selectedTissue === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedTissue(key)}
                  className={`w-full p-3 rounded-2xl border text-left transition flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-emerald-700 text-white font-bold shadow-xs border-emerald-800'
                      : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComp className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-700'}`} />
                    <span>{t.name}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Column: Deep-Dive Microscopic Inspector (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
          
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[11px] uppercase tracking-wider inline-block mb-1">
                {activeTissue.positionText}
              </span>
              <h3 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
                {activeTissue.name}
              </h3>
              <p className="text-xs font-semibold text-stone-500 mt-0.5">
                {activeTissue.fiberType} • {activeTissue.primaryRole}
              </p>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <activeTissue.icon className="w-6 h-6 text-emerald-700" />
            </div>
          </div>

          {/* Density Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-[11px] font-bold text-stone-500 uppercase block">Baseline Density</span>
              <div className="text-sm font-extrabold text-stone-800">{activeTissue.densityBaseline}</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-[11px] font-extrabold text-emerald-800 uppercase block">Zone 2 Adaptations</span>
              <div className="text-sm font-extrabold text-emerald-950">{activeTissue.densityZone2}</div>
            </div>

          </div>

          {/* Biological Benefit Detail Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-stone-900 to-emerald-950 text-white space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Zone 2 Biological Mechanism
            </div>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-normal">
              {activeTissue.zone2Benefit}
            </p>
          </div>

          {/* Current Simulation Outcome Dashboard */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
              Simulation Metrics for Selected Run:
            </h4>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-stone-100 border border-stone-200">
                <span className="text-[10px] text-stone-500 font-medium block">Intensity Zone</span>
                <strong className="text-stone-900 text-xs font-extrabold">{selectedZone === 2 ? 'Zone 2 ⭐' : `Zone ${selectedZone}`}</strong>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] text-emerald-800 font-medium block">PGC-1α Signal</span>
                <strong className="text-emerald-900 text-xs font-extrabold">{currentZone.pgc1a}% Peak</strong>
              </div>

              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200">
                <span className="text-[10px] text-teal-800 font-medium block">Capillary Boost</span>
                <strong className="text-teal-900 text-xs font-extrabold">+{capilaryDensityBoost}% Angiogenesis</strong>
              </div>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs font-medium flex items-start gap-2.5">
            <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Cellular Takeaway:</strong> Zone 2 exercise triggers systemic calcium-calmodulin kinase (CaMK) and p38 MAPK pathways, which upregulate PGC-1α across all vital organs simultaneously.
            </div>
          </div>

        </div>

      </div>

      {/* Summary Footer */}
      <div className="p-6 rounded-3xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
            Optimus Bioenergetics Rule
          </span>
          <h4 className="text-base font-extrabold text-white">
            Zone 2 Benefits the Whole Body, Not Just Your Legs
          </h4>
          <p className="text-xs text-stone-300 max-w-xl font-normal">
            By staying below your lactate threshold, you provide your heart, brain, liver, and oxidative muscle fibers with continuous oxygen without acidifying your cellular environment.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-emerald-600 text-white text-xs font-extrabold shrink-0">
          Page 15 • Complete
        </div>
      </div>

    </article>
  );
}
