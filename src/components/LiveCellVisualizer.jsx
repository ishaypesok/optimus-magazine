import React, { useRef, useEffect, useState } from 'react';
import { 
  Play, Pause, Zap, Flame, Cpu, Wind, Info, Sparkles, CheckCircle2, ShieldCheck, Activity, RotateCcw, Share2
} from 'lucide-react';

export default function LiveCellVisualizer() {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedZone, setSelectedZone] = useState(2); // Default Zone 2 FATmax
  const [simSpeed, setSimSpeed] = useState(1);
  const [activeTab, setActiveTab] = useState('mitochondria');

  // Zone presets for cellular kinetics
  const ZONE_SPECS = {
    1: {
      name: 'Zone 1 (Rest / Couch)',
      fatRate: 0.12,
      carbRate: 0.05,
      o2Supply: 40,
      atpOutput: 15,
      lactateAccumulation: 0,
      mitochondriaGlow: '#059669',
      status: 'Resting Baseline',
      desc: 'Idling engine. High fat % (85%), but tiny total energy output. No stimulus for building new mitochondria.'
    },
    2: {
      name: 'Zone 2 (FATmax Sweet Spot)',
      fatRate: 0.65,
      carbRate: 0.25,
      o2Supply: 95,
      atpOutput: 88,
      lactateAccumulation: 0,
      mitochondriaGlow: '#10b981',
      status: 'Peak Fat Oxidation & PGC-1α Biogenesis',
      desc: 'Maximum absolute fat burning (0.65g/min). O₂ supply matches demand 100%. Triggers expansion of cell mitochondria!'
    },
    3: {
      name: 'Zone 3 (Tempo / Moderate)',
      fatRate: 0.40,
      carbRate: 0.60,
      o2Supply: 80,
      atpOutput: 92,
      lactateAccumulation: 15,
      mitochondriaGlow: '#f59e0b',
      status: 'Mixed Substrate Shift',
      desc: 'Carbohydrates take over as primary fuel. Fat oxidation drops as intensity increases.'
    },
    4: {
      name: 'Zone 4 (Threshold / Heavy)',
      fatRate: 0.15,
      carbRate: 0.90,
      o2Supply: 60,
      atpOutput: 95,
      lactateAccumulation: 60,
      mitochondriaGlow: '#f97316',
      status: 'Anaerobic Glycolysis Dominance',
      desc: 'O₂ demand exceeds mitochondrial intake capacity. Glycolysis produces lactate and H+ acidity rapidly.'
    },
    5: {
      name: 'Zone 5 (All-Out Sprint)',
      fatRate: 0.02,
      carbRate: 1.00,
      o2Supply: 30,
      atpOutput: 100,
      lactateAccumulation: 95,
      mitochondriaGlow: '#ef4444',
      status: 'Muscular Acidosis & Rapid Exhaustion',
      desc: 'Fat burning shuts down completely (CPT-1 gate locked). Rapid glycogen depletion with severe leg burn.'
    }
  };

  const currentSpec = ZONE_SPECS[selectedZone];

  // Canvas particle animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set high DPI sizing
    const width = canvas.clientWidth || 800;
    const height = canvas.clientHeight || 450;
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);

    // Particle pools
    const particles = [];
    const NUM_FAT = Math.round(currentSpec.fatRate * 35);
    const NUM_CARB = Math.round(currentSpec.carbRate * 35);
    const NUM_O2 = Math.round((currentSpec.o2Supply / 100) * 30);

    // Mitochondria boundaries (center rectangle)
    const mitoX = width * 0.38;
    const mitoY = height * 0.22;
    const mitoW = width * 0.48;
    const mitoH = height * 0.58;

    // Initialize particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        type: 'fat',
        x: Math.random() * (mitoX - 40) + 20,
        y: Math.random() * (height - 60) + 30,
        vx: (1 + Math.random() * 1.5) * simSpeed,
        vy: (Math.random() - 0.5) * 0.8,
        size: 5 + Math.random() * 3,
        alpha: 0.8 + Math.random() * 0.2
      });
    }

    for (let i = 0; i < 25; i++) {
      particles.push({
        type: 'carb',
        x: Math.random() * (mitoX - 40) + 20,
        y: Math.random() * (height - 60) + 30,
        vx: (1.2 + Math.random() * 1.8) * simSpeed,
        vy: (Math.random() - 0.5) * 0.8,
        size: 4 + Math.random() * 2,
        alpha: 0.8
      });
    }

    for (let i = 0; i < 25; i++) {
      particles.push({
        type: 'o2',
        x: Math.random() * (width - 40) + 20,
        y: Math.random() * 40 + 10,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (1 + Math.random() * 1.5) * simSpeed,
        size: 3.5,
        alpha: 0.9
      });
    }

    // ATP spark sparks inside mitochondria moving out
    const atpSparks = [];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // --- 1. DRAW CELLULAR BACKGROUND & MEMBRANE (Sarcolemma) ---
      ctx.fillStyle = '#fbfbfa';
      ctx.fillRect(0, 0, width, height);

      // Sarcoplasm (Cytoplasm) shading
      const cytoGrad = ctx.createLinearGradient(0, 0, width, height);
      cytoGrad.addColorStop(0, '#f4f4f0');
      cytoGrad.addColorStop(1, '#ecebe4');
      ctx.fillStyle = cytoGrad;
      ctx.fillRect(10, 10, width - 20, height - 20);

      // Sarcolemma Outer Membrane border
      ctx.strokeStyle = '#d6d3d1';
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 6]);
      ctx.strokeRect(10, 10, width - 20, height - 20);
      ctx.setLineDash([]);

      // Label Sarcolemma
      ctx.fillStyle = '#78716c';
      ctx.font = '600 10px sans-serif';
      ctx.fillText('SARCOLEMMA (MUSCLE CELL MEMBRANE)', 20, 26);

      // --- 2. DRAW CPT-1 GATE (Fat Entrance Channel) ---
      const cptY = height * 0.45;
      ctx.fillStyle = selectedZone > 3 ? '#fee2e2' : '#d1fae5';
      ctx.strokeStyle = selectedZone > 3 ? '#ef4444' : '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(mitoX - 18, cptY - 25, 18, 50, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = selectedZone > 3 ? '#991b1b' : '#065f46';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText(selectedZone > 3 ? 'CPT-1 (LOCKED 🔒)' : 'CPT-1 (OPEN 🔑)', mitoX - 65, cptY + 3);

      // --- 3. DRAW LIVE MITOCHONDRIA (POWERHOUSE) ---
      // Outer Membrane
      ctx.save();
      ctx.shadowColor = currentSpec.mitochondriaGlow;
      ctx.shadowBlur = 20;
      
      const mitoGrad = ctx.createLinearGradient(mitoX, mitoY, mitoX + mitoW, mitoY + mitoH);
      mitoGrad.addColorStop(0, '#064e3b');
      mitoGrad.addColorStop(1, '#022c22');
      ctx.fillStyle = mitoGrad;

      ctx.beginPath();
      ctx.roundRect(mitoX, mitoY, mitoW, mitoH, 30);
      ctx.fill();
      ctx.restore();

      // Cristae inner folds
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = 0.5;
      for (let yOffset = 30; yOffset < mitoH - 20; yOffset += 25) {
        ctx.beginPath();
        ctx.moveTo(mitoX + 20, mitoY + yOffset);
        ctx.bezierCurveTo(mitoX + mitoW * 0.3, mitoY + yOffset - 10, mitoX + mitoW * 0.6, mitoY + yOffset + 10, mitoX + mitoW - 20, mitoY + yOffset);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Mitochondria Header Label
      ctx.fillStyle = '#a7f3d0';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('MITOCHONDRION (LIVE POWERHOUSE)', mitoX + 20, mitoY + 28);
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#6ee7b7';
      ctx.fillText(`Beta-Oxidation & Krebs Cycle Active • ATP Yield: ${currentSpec.atpOutput}%`, mitoX + 20, mitoY + 44);

      // --- 4. UPDATE & DRAW PARTICLES ---
      if (isPlaying) {
        // Spawn ATP sparks inside mitochondria
        if (Math.random() < (currentSpec.atpOutput / 100) * 0.8) {
          atpSparks.push({
            x: mitoX + 40 + Math.random() * (mitoW - 80),
            y: mitoY + 40 + Math.random() * (mitoH - 80),
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            life: 1.0,
            size: 3 + Math.random() * 3
          });
        }
      }

      // Render Fat Particles (Gold Spheres)
      particles.forEach(p => {
        if (isPlaying) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap around cytoplasm
          if (p.x > mitoX - 10 && p.type === 'fat' && selectedZone > 3) {
            // Bounce off locked CPT-1 gate if high intensity!
            p.vx *= -1;
          } else if (p.x > mitoX + 30) {
            p.x = 20;
            p.y = Math.random() * (height - 60) + 30;
          }
        }

        ctx.fillStyle = p.type === 'fat' ? '#f59e0b' : p.type === 'carb' ? '#3b82f6' : '#06b6d4';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render ATP Energy Sparks (Bright Emerald Stars/Sparks)
      for (let i = atpSparks.length - 1; i >= 0; i--) {
        const spark = atpSparks[i];
        if (isPlaying) {
          spark.x += spark.vx;
          spark.y += spark.vy;
          spark.life -= 0.02 * simSpeed;
        }

        if (spark.life <= 0) {
          atpSparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = spark.life;
        ctx.fillStyle = '#34d399';
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw Legend at top right
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.strokeStyle = '#e7e5e4';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(width - 170, 16, 150, 75, 8);
      ctx.fill();
      ctx.stroke();

      ctx.font = 'bold 9px sans-serif';
      ctx.fillStyle = '#44403c';
      ctx.fillText('LIVE MOLECULE LEGEND', width - 160, 30);

      // Fat
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(width - 155, 42, 4, 0, Math.PI * 2); ctx.fill();
      ctx.font = '9px sans-serif'; ctx.fillStyle = '#57534e';
      ctx.fillText('Fatty Acid (FFA)', width - 145, 45);

      // Carb
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath(); ctx.arc(width - 155, 57, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillText('Glucose / Carbs', width - 145, 60);

      // ATP
      ctx.fillStyle = '#34d399';
      ctx.beginPath(); ctx.arc(width - 155, 72, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillText('ATP Energy Molecule', width - 145, 75);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, selectedZone, simSpeed, currentSpec]);

  return (
    <div className="space-y-6 font-sans">

      {/* Header Card */}
      <div className="p-6 rounded-3xl bg-emerald-950 text-white space-y-3 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Cpu className="w-48 h-48 text-emerald-400" />
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 font-extrabold text-xs uppercase tracking-wider border border-emerald-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            Interactive Bioenergetics Feature
          </span>
          <div className="flex items-center gap-2">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out the Live Cell Visualizer in Optimus Magazine! 🔬 Watch mitochondria & fat-burning in real-time:')}&url=${encodeURIComponent('https://ishaypesok.github.io/optimus-magazine/')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share to X / Twitter</span>
            </a>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition border border-emerald-600"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <button
              onClick={() => setSimSpeed(simSpeed === 1 ? 2 : simSpeed === 2 ? 4 : 1)}
              className="px-3 py-1.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-emerald-200 font-bold text-xs border border-emerald-700 transition"
            >
              Speed: {simSpeed}x
            </button>
          </div>
        </div>

        <div className="space-y-1 relative z-10">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>The Live Cell Visualizer</span>
          </h2>
          <p className="text-emerald-200 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Watch real-time cellular bioenergetics inside your muscle fibers! Toggle exercise intensity zones below to see how insulin, oxygen, CPT-1 gates, and mitochondria dynamically burn fat vs sugar.
          </p>
        </div>
      </div>

      {/* Zone Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map(zoneId => {
          const isSelected = selectedZone === zoneId;
          return (
            <button
              key={zoneId}
              onClick={() => setSelectedZone(zoneId)}
              className={`p-3 rounded-2xl text-left border transition relative ${
                isSelected 
                  ? zoneId === 2 
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-400' 
                    : 'bg-stone-900 text-white border-stone-800 shadow-sm'
                  : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black uppercase ${isSelected ? 'text-white' : 'text-stone-500'}`}>
                  Zone {zoneId}
                </span>
                {zoneId === 2 && (
                  <span className="px-1.5 py-0.5 rounded bg-emerald-400 text-emerald-950 text-[10px] font-extrabold">
                    FATmax ⭐
                  </span>
                )}
              </div>
              <div className="text-xs font-bold truncate mt-1">
                {zoneId === 1 && 'Resting'}
                {zoneId === 2 && 'Aerobic Fat'}
                {zoneId === 3 && 'Tempo'}
                {zoneId === 4 && 'Threshold'}
                {zoneId === 5 && 'Anaerobic'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Canvas + Live Dashboard Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Canvas View */}
        <div className="lg:col-span-2 bg-stone-900 rounded-3xl p-3 border border-stone-800 shadow-inner relative overflow-hidden flex flex-col justify-center">
          <canvas 
            ref={canvasRef} 
            className="w-full h-[380px] sm:h-[420px] rounded-2xl block bg-stone-950"
          />
        </div>

        {/* Live Metrics Side Panel */}
        <div className="space-y-4 font-sans">
          
          {/* Active Zone Status Card */}
          <div className="p-5 rounded-3xl bg-white border border-stone-200 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Cellular Kinetics</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                {currentSpec.name}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-600 font-medium flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-500" /> Fat Oxidation Rate:
                </span>
                <span className="font-extrabold text-stone-900">{currentSpec.fatRate} g/min</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-500" 
                  style={{ width: `${(currentSpec.fatRate / 0.7) * 100}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs pt-1">
                <span className="text-stone-600 font-medium flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-blue-500" /> Carb Utilization Rate:
                </span>
                <span className="font-extrabold text-stone-900">{currentSpec.carbRate} g/min</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-500" 
                  style={{ width: `${currentSpec.carbRate * 100}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs pt-1">
                <span className="text-stone-600 font-medium flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-cyan-500" /> Oxygen Delivery (O₂):
                </span>
                <span className="font-extrabold text-stone-900">{currentSpec.o2Supply}% Saturation</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-500" 
                  style={{ width: `${currentSpec.o2Supply}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
              {currentSpec.desc}
            </p>
          </div>

          {/* Key Bioenergetic Insights Accordion / Tabs */}
          <div className="p-5 rounded-3xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs text-stone-900 border-b border-stone-200 pb-2">
              <Info className="w-4 h-4 text-emerald-700" />
              <span>Interactive Cell Component Guide</span>
            </div>

            <div className="flex gap-1 bg-stone-200/60 p-1 rounded-xl text-[11px] font-bold">
              {['mitochondria', 'cpt1', 'atp'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1 rounded-lg capitalize transition ${
                    activeTab === tab ? 'bg-white text-emerald-950 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab === 'cpt1' ? 'CPT-1 Gate' : tab}
                </button>
              ))}
            </div>

            <div className="text-xs text-stone-700 leading-relaxed font-normal pt-1">
              {activeTab === 'mitochondria' && (
                <div className="space-y-1.5">
                  <div className="font-bold text-emerald-950">🔋 Mitochondrion (Cell Powerhouse)</div>
                  <p>
                    Double-membraned organelle where Beta-Oxidation & Krebs cycle take place. In Zone 2, mitochondrial density grows by up to 40% over time!
                  </p>
                </div>
              )}
              {activeTab === 'cpt1' && (
                <div className="space-y-1.5">
                  <div className="font-bold text-emerald-950">🔑 CPT-1 Gatekeeper Enzyme</div>
                  <p>
                    Carnitine Palmitoyltransferase I moves long-chain fats into mitochondria. High insulin locks this gate; Zone 2 lowers insulin to keep it wide open.
                  </p>
                </div>
              )}
              {activeTab === 'atp' && (
                <div className="space-y-1.5">
                  <div className="font-bold text-emerald-950">⚡ ATP Yield (Cell Energy Currency)</div>
                  <p>
                    Fat breakdown yields <strong>106–120 ATP per molecule</strong>—more than 3x the energy yield of carbohydrate breakdown (~32 ATP)!
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
