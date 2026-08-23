import React, { useState, useRef, useEffect } from 'react';
import { 
  Dna, Cpu, Activity, Play, Pause, RotateCcw, Sparkles, Sliders, ShieldCheck, 
  Flame, Clock, Lightbulb, ChevronRight, Zap, RefreshCw, Layers, CheckCircle2, ArrowUpRight
} from 'lucide-react';
import { MITOCHONDRIA_REPRODUCTION_DATA } from '../data/metabolismData';

export default function MitochondrialReproduction() {
  const [activeTab, setActiveTab] = useState('canvas'); // 'canvas', 'evolution', 'signaling', 'trajectory'
  const [weeks, setWeeks] = useState(6);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fissionCount, setFissionCount] = useState(0);
  const [simSpeed, setSimSpeed] = useState(1);
  const [activeStep, setActiveStep] = useState(0);

  const canvasRef = useRef(null);

  // Live Canvas Animation for Binary Fission & Fusion Dynamics
  useEffect(() => {
    if (activeTab !== 'canvas') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const width = canvas.clientWidth || 800;
    const height = canvas.clientHeight || 450;
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);

    let progress = 0; // 0 to 1 cycle of fission
    let cyclePhase = 'growing'; // 'growing', 'constricting', 'splitting', 'fusing'

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Cell Cytoplasm Background Matrix
      const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width / 1.2);
      grad.addColorStop(0, '#f0fdf4');
      grad.addColorStop(1, '#ecfdf5');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Cytosol Grid Lines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (isPlaying) {
        progress += 0.006 * simSpeed;
        if (progress >= 1) {
          progress = 0;
          setFissionCount(prev => prev + 1);
        }
      }

      const centerX = width / 2;
      const centerY = height / 2;

      // Calculate constricting waist and separation
      let waistRadius = 45;
      let separation = 0;
      let drp1Opacity = 0;

      if (progress < 0.3) {
        // Phase 1: Elongation & mtDNA replication
        cyclePhase = 'Growing & Replicating mtDNA...';
        waistRadius = 45 + progress * 20;
        drp1Opacity = progress * 2;
      } else if (progress < 0.75) {
        // Phase 2: Drp1 Ring Constriction (Bacterial Fission)
        cyclePhase = 'Drp1 Ring Constricting Membrane...';
        const p = (progress - 0.3) / 0.45;
        waistRadius = 65 * (1 - p * 0.75);
        drp1Opacity = 1;
      } else {
        // Phase 3: Complete Binary Fission into 2 Daughters
        cyclePhase = 'Complete Binary Fission → 2 Daughter Organelles';
        const p = (progress - 0.75) / 0.25;
        waistRadius = 15 * (1 - p);
        separation = p * 70;
        drp1Opacity = 1 - p;
      }

      // Draw Left Daughter / Left Half
      const leftX = centerX - separation;
      const rightX = centerX + separation;

      // Draw Mitochondrion Outer & Inner Membrane (Double Bacterial Membrane)
      ctx.save();

      // Left Organelle Body
      ctx.beginPath();
      ctx.ellipse(leftX - (separation > 0 ? 35 : 20), centerY, 55, Math.max(12, waistRadius), 0, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = 'rgba(16, 185, 129, 0.4)';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#047857';
      ctx.stroke();

      // Right Organelle Body
      ctx.beginPath();
      ctx.ellipse(rightX + (separation > 0 ? 35 : 20), centerY, 55, Math.max(12, waistRadius), 0, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#047857';
      ctx.stroke();

      // Cristae Fold Lines Inside Matrix
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 2;
      for (let offset of [-30, -10, 10, 30]) {
        ctx.beginPath();
        ctx.moveTo(leftX - (separation > 0 ? 35 : 20) + offset, centerY - waistRadius * 0.6);
        ctx.lineTo(leftX - (separation > 0 ? 35 : 20) + offset, centerY + waistRadius * 0.6);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rightX + (separation > 0 ? 35 : 20) + offset, centerY - waistRadius * 0.6);
        ctx.lineTo(rightX + (separation > 0 ? 35 : 20) + offset, centerY + waistRadius * 0.6);
        ctx.stroke();
      }

      // Draw Circular mtDNA Plasmids (Ancient Bacterial Plasmids)
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      
      // Left mtDNA circle
      ctx.beginPath();
      ctx.arc(leftX - (separation > 0 ? 40 : 25), centerY, 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#fef3c7';
      ctx.fill();

      // Right mtDNA circle
      ctx.beginPath();
      ctx.arc(rightX + (separation > 0 ? 40 : 25), centerY, 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#fef3c7';
      ctx.fill();

      // Draw Drp1 Ring Constriction Assembly at Center
      if (drp1Opacity > 0.05 && separation < 30) {
        ctx.strokeStyle = `rgba(239, 68, 68, ${drp1Opacity})`;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 8, Math.max(10, waistRadius + 6), 0, 0, Math.PI * 2);
        ctx.stroke();

        // Drp1 Label
        ctx.fillStyle = '#dc2626';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('Drp1 Fission Ring ✂️', centerX - 48, centerY - waistRadius - 14);
      }

      // Overlay Labels & Legend
      ctx.fillStyle = '#065f46';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`Status: ${cyclePhase}`, 20, 30);
      ctx.fillText(`Cycle Progress: ${Math.round(progress * 100)}%`, 20, 50);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [activeTab, isPlaying, simSpeed]);

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">
      
      {/* Article Header Badge & Title */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider border border-emerald-300 inline-flex items-center gap-1.5 shadow-xs">
            <Dna className="w-3.5 h-3.5 text-emerald-700" />
            Page 17 • Deep Evolutionary Physiology
          </span>
          <span className="px-3 py-1 rounded-full bg-stone-200 text-stone-700 font-bold text-xs">
            Endosymbiosis & Biogenesis
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight tracking-tight">
          The Ancient Bacterial Legacy: <span className="text-emerald-700">Mitochondrial Reproduction</span>
        </h2>

        <p className="text-stone-600 text-sm sm:text-base max-w-4xl font-normal leading-relaxed">
          Why the mitochondria in your cells behave like 2-billion-year-old captive bacteria—and why replicating them is a <strong>multi-week cellular manufacturing project</strong> rather than a single-run event!
        </p>
      </div>

      {/* Main Feature Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: 2 Billion Years Ago */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 text-white space-y-3 shadow-md relative overflow-hidden">
          <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            1.8 Billion Years of History
          </div>
          <h3 className="text-xl font-black text-white">
            Living Bacteria Inside Human Muscle Cells
          </h3>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Mitochondria are not native eukaryotic organelles created by cell nuclei. They are descended from an ancient aerobic bacterium (α-proteobacterium) engulfed ~2 billion years ago. They retain <strong>circular bacterial DNA (mtDNA)</strong>, <strong>70S bacterial ribosomes</strong>, and reproduce strictly by <strong>bacterial binary fission</strong>!
          </p>
        </div>

        {/* Card 2: Why 1 Run is Not Enough */}
        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 space-y-3 text-amber-950 shadow-xs">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm uppercase tracking-wider">
            <Clock className="w-4 h-4 text-amber-700" />
            The Multi-Week Timeline Reality
          </div>
          <h3 className="text-xl font-black text-amber-950">
            A Single Zone 2 Run Triggers the Signal, Not the Finished Factory
          </h3>
          <p className="text-stone-800 text-xs sm:text-sm leading-relaxed">
            Running in Zone 2 for 45 minutes activates the <strong>PGC-1α master gene switch</strong>. However, replicating circular mtDNA, translating 1,000+ proteins, building cardiolipin lipid membranes, and splitting via Drp1 rings takes <strong>weeks of repeated stimulus</strong>.
          </p>
        </div>

      </div>

      {/* Interactive Feature Navigation Tabs */}
      <div className="border-b border-stone-200">
        <nav className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'canvas', label: '🔬 Live Binary Fission Canvas', icon: Activity },
            { id: 'evolution', label: '🧬 2-Billion-Year Endosymbiosis', icon: Dna },
            { id: 'signaling', label: '⚡ PGC-1α Molecular Pipeline', icon: Zap },
            { id: 'trajectory', label: '📊 12-Week Trajectory Simulator', icon: Sliders }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* ==================== TAB 1: LIVE CANVAS BINARY FISSION VISUALIZER ==================== */}
      {activeTab === 'canvas' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-700" />
                  Mitochondrial Binary Fission & Fusion Live Canvas
                </h3>
                <p className="text-xs text-stone-600 font-medium">
                  Watch Drp1 protein rings constrict the bacterial double membrane to split a mitochondrion into two functional daughters!
                </p>
              </div>

              {/* Simulation Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pause' : 'Play Simulation'}</span>
                </button>

                <button
                  onClick={() => {
                    setFissionCount(0);
                    setIsPlaying(true);
                  }}
                  className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
                  title="Reset Counter"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Canvas Container */}
            <div className="relative rounded-xl overflow-hidden border border-emerald-200 shadow-inner bg-emerald-950">
              <canvas
                ref={canvasRef}
                className="w-full h-80 sm:h-96 block"
              />
              
              {/* Floating Stat Overlay */}
              <div className="absolute top-4 right-4 px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-xs border border-emerald-200 text-xs font-bold text-emerald-950 shadow-md">
                <span>Completed Binary Fissions: <strong className="text-emerald-700 text-sm">{fissionCount}</strong></span>
              </div>
            </div>

            {/* Protein Molecular Role Legend Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {MITOCHONDRIA_REPRODUCTION_DATA.fissionFusionProteins.map((prot, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <div className="flex items-center justify-between text-xs font-extrabold text-stone-900">
                    <span>{prot.name.split(' ')[0]}</span>
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono">
                      {prot.role}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    {prot.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* ==================== TAB 2: ENDOSYMBIOSIS TIMELINE ==================== */}
      {activeTab === 'evolution' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-6">
            
            <div className="border-b border-stone-200 pb-4">
              <h3 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
                <Dna className="w-5 h-5 text-teal-700" />
                The 2-Billion-Year Endosymbiotic Theory (Lynn Margulis Discovery)
              </h3>
              <p className="text-xs text-stone-600">
                Four undeniable biological proofs that mitochondria are captive bacteria living inside human cells.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MITOCHONDRIA_REPRODUCTION_DATA.evolutionaryTimeline.map((item, index) => (
                <div key={index} className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2 hover:border-emerald-400 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                      {item.era}
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-stone-900 pt-1">
                    {item.title}
                  </h4>

                  <p className="text-xs text-stone-700 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-stone-200 text-[11px] font-semibold text-emerald-900 italic">
                    📌 Proof: {item.evidence}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* ==================== TAB 3: MOLECULAR SIGNALING PIPELINE ==================== */}
      {activeTab === 'signaling' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-6">
            
            <div className="border-b border-stone-200 pb-4">
              <h3 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-600" />
                The PGC-1α Molecular Signaling Cascade
              </h3>
              <p className="text-xs text-stone-600">
                Click each step to trace how a Zone 2 workout turns into nuclear & mitochondrial gene expression.
              </p>
            </div>

            {/* Interactive Step Navigator */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              {MITOCHONDRIA_REPRODUCTION_DATA.signalingCascade.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3.5 rounded-xl border text-left transition ${
                    activeStep === idx
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                      : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-300">
                    Step {step.step}
                  </div>
                  <div className="text-xs font-bold truncate">
                    {step.name}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Step Detail Panel */}
            {(() => {
              const cur = MITOCHONDRIA_REPRODUCTION_DATA.signalingCascade[activeStep];
              return (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-950 font-extrabold text-xs">
                      Step {cur.step} of 4 • {cur.name}
                    </span>
                    <span className="text-xs font-bold text-stone-600">
                      Primary Trigger: <strong className="text-emerald-900">{cur.trigger}</strong>
                    </span>
                  </div>

                  <p className="text-sm text-stone-800 font-medium leading-relaxed">
                    {cur.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-emerald-200">
                    <span className="text-xs font-extrabold text-emerald-900">Key Molecular Players:</span>
                    {cur.molecules.map((m, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-md bg-white border border-emerald-300 text-xs font-mono font-bold text-emerald-800 shadow-2xs">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}

          </div>

        </div>
      )}

      {/* ==================== TAB 4: 12-WEEK TRAJECTORY SIMULATOR ==================== */}
      {activeTab === 'trajectory' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-emerald-700" />
                  Mitochondrial Density Trajectory (0 to 12 Weeks)
                </h3>
                <p className="text-xs text-stone-600 font-medium">
                  Slide to observe why single runs produce signaling transcripts, while multi-week consistency creates double mitochondrial mass.
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-emerald-900 text-white text-xs font-bold shadow-xs shrink-0">
                Training Duration: <strong className="text-emerald-300">{weeks} Weeks</strong>
              </div>
            </div>

            {/* Slider */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex justify-between text-xs font-bold text-stone-700">
                <span>0 Weeks (Untrained Baseline)</span>
                <span>6 Weeks (+35% Density)</span>
                <span className="text-emerald-800 font-black">12 Weeks (+60% Density)</span>
              </div>

              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={weeks}
                onChange={(e) => setWeeks(parseInt(e.target.value))}
                className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700 focus:outline-none"
              />
            </div>

            {/* Dynamic Adaptations Output Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="text-xs font-bold text-stone-600">Total Mitochondria Density</div>
                <div className="text-2xl font-black text-emerald-900">
                  +{Math.round(weeks * 5)}%
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  {weeks === 0 
                    ? "Baseline organelle count."
                    : weeks <= 2 
                    ? "Initial PGC-1α transcripts and TFAM replication beginning."
                    : `Expanded bacterial organelle population across slow-twitch muscle fibers!`}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 space-y-1">
                <div className="text-xs font-bold text-stone-600">Binary Fission Events / Day</div>
                <div className="text-2xl font-black text-teal-900">
                  {Math.round(100 + weeks * 25)} <span className="text-xs font-semibold text-stone-600">events/cell</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  Drp1 ring constrictions actively dividing organelles during post-workout recovery.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <div className="text-xs font-bold text-stone-600">FATmax Burning Rate</div>
                <div className="text-2xl font-black text-amber-900">
                  {(0.35 + weeks * 0.025).toFixed(2)} <span className="text-xs font-semibold text-stone-600">g/min</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  Higher mitochondrial mass allows burning maximum fat at faster running paces!
                </p>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Article Takeaway Box */}
      <div className="p-6 rounded-2xl bg-stone-900 text-stone-100 space-y-3 shadow-md font-sans">
        <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm uppercase">
          <Lightbulb className="w-5 h-5" />
          Key Editorial Takeaway for Optimus Readers
        </div>
        <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-normal">
          Respect the evolutionary history inside your cells! Every time you perform a 45-minute Zone 2 run at conversational pace, you are sending a biochemical signal to ancient bacterial DNA (mtDNA) to replicate, translate enzymes, and divide via Drp1 binary fission. <strong>Consistency over weeks and months is the only key that builds a dense cellular powerhouse!</strong>
        </p>
      </div>

    </article>
  );
}
