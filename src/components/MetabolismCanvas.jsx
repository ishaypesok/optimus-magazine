import React, { useRef, useEffect, useState } from 'react';
import { ZONES } from '../data/metabolismData';
import { Info, Sparkles, Play, Pause, Wind, Clock, RotateCcw, Flame, Droplet, Calendar, CheckCircle2, FastForward } from 'lucide-react';

export default function MetabolismCanvas({ currentZoneId, onSelectStage }) {
  const canvasRef = useRef(null);
  
  // Synced Clock & Real Run Simulation State
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1); // 1x, 5x, 10x speed!
  const [selectedRunId, setSelectedRunId] = useState('aug18');

  // Real Apple Health Workouts
  const REAL_RUNS = [
    {
      id: 'aug18',
      dateLabel: 'Aug 18, 2026 Run ⭐ (65 min @ 117 bpm)',
      durationMin: 65.03,
      distanceKm: 5.56,
      paceMinKm: 11.68,
      avgHr: 117,
      watchCalories: 340,
      o2LitersTotal: 86.5
    },
    {
      id: 'aug15',
      dateLabel: 'Aug 15, 2026 Run (65 min @ 115 bpm)',
      durationMin: 65.0,
      distanceKm: 5.50,
      paceMinKm: 11.82,
      avgHr: 115,
      watchCalories: 330,
      o2LitersTotal: 86.5
    },
    {
      id: 'aug12',
      dateLabel: 'Aug 12, 2026 Run (66.4 min @ 113 bpm)',
      durationMin: 66.4,
      distanceKm: 5.56,
      paceMinKm: 11.93,
      avgHr: 113,
      watchCalories: 329,
      o2LitersTotal: 88.4
    },
    {
      id: 'aug08',
      dateLabel: 'Aug 8, 2026 Run (64.8 min @ 119 bpm)',
      durationMin: 64.8,
      distanceKm: 5.43,
      paceMinKm: 11.93,
      avgHr: 119,
      watchCalories: 337,
      o2LitersTotal: 86.2
    }
  ];

  const activeRun = REAL_RUNS.find(r => r.id === selectedRunId) || REAL_RUNS[0];
  const maxSeconds = Math.ceil(activeRun.durationMin * 60);

  const zone = ZONES.find(z => z.id === currentZoneId) || ZONES[1];

  // Stopwatch Timer Ticker (Clock Synced!)
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSecondsElapsed(prev => {
        if (prev >= maxSeconds) {
          setIsRunning(false);
          return maxSeconds;
        }
        return prev + 1;
      });
    }, 1000 / speedMultiplier);
    return () => clearInterval(interval);
  }, [isRunning, speedMultiplier, maxSeconds]);

  // Format HH:MM:SS
  const formatTime = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Cumulative math for user's 80kg & VO2Max 25.6
  const minutesElapsed = secondsElapsed / 60;
  const z2Vo2LitersPerMin = 1.331; // 1.331 L/min for 80kg & VO2Max 25.6
  const fatRateGPerMin = 0.466; // 0.466 g/min fat

  const fatGramsBurned = (fatRateGPerMin * minutesElapsed).toFixed(1);
  const fatCaloriesBurned = Math.round(fatRateGPerMin * minutesElapsed * 9);
  const o2LitersConsumed = (z2Vo2LitersPerMin * minutesElapsed).toFixed(1);
  const atpMillionsGenerated = (zone.atpSpeed * 120 * secondsElapsed / 1000).toFixed(1);
  const currentKm = (minutesElapsed / activeRun.paceMinKm).toFixed(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const width = canvas.parentElement.clientWidth || 900;
    const height = 540;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let angleKrebs = 0;
    let angleAtpSynthase = 0;

    const fattyParticles = [];
    const glucoseParticles = [];
    const oxygenParticles = [];
    const protonParticles = [];
    const atpParticles = [];

    const initParticles = () => {
      // Fatty acids
      for (let i = 0; i < 18; i++) {
        fattyParticles.push({
          x: Math.random() * (width * 0.3),
          y: Math.random() * (height * 0.4) + 40,
          vx: 0.8 + Math.random() * 0.6,
          vy: (Math.random() - 0.5) * 0.4,
          stage: 0
        });
      }
      // Glucose
      for (let i = 0; i < 12; i++) {
        glucoseParticles.push({
          x: Math.random() * (width * 0.25),
          y: height * 0.6 + Math.random() * (height * 0.2),
          vx: 0.6 + Math.random() * 0.5,
          vy: (Math.random() - 0.5) * 0.4,
          stage: 0
        });
      }
      // Oxygen (Cyan Double Dots)
      for (let i = 0; i < 24; i++) {
        oxygenParticles.push({
          x: Math.random() * (width * 0.4),
          y: height * 0.15 + Math.random() * (height * 0.2),
          vx: 1.2 + Math.random() * 0.8,
          vy: (Math.random() - 0.5) * 0.4
        });
      }
      // Protons
      for (let i = 0; i < 30; i++) {
        protonParticles.push({
          x: width * 0.76 + (Math.random() - 0.5) * 60,
          y: height * 0.28 + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6
        });
      }
      // ATP
      for (let i = 0; i < 20; i++) {
        atpParticles.push({
          x: width * 0.88 + (Math.random() - 0.5) * 40,
          y: height * 0.65 + (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          life: Math.random() * 100
        });
      }
    };

    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background Gradients
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#020617');
      bgGrad.addColorStop(0.5, '#0f172a');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. CYTOPLASM AREA
      const cytoGrad = ctx.createLinearGradient(0, 0, width * 0.4, 0);
      cytoGrad.addColorStop(0, 'rgba(30, 41, 59, 0.4)');
      cytoGrad.addColorStop(1, 'rgba(15, 23, 42, 0.1)');
      ctx.fillStyle = cytoGrad;
      ctx.fillRect(0, 0, width * 0.4, height);

      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText('CYTOPLASM (Cytosol)', 20, 25);

      // 2. MITOCHONDRION OUTER & INNER MEMBRANE
      const mitoX = width * 0.35;
      const mitoY = 40;
      const mitoW = width * 0.62;
      const mitoH = height - 80;

      ctx.beginPath();
      ctx.roundRect(mitoX, mitoY, mitoW, mitoH, 40);
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.6)';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.fillStyle = 'rgba(6, 78, 59, 0.15)';
      ctx.fill();

      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText('MITOCHONDRION (Outer Membrane)', mitoX + 25, mitoY + 24);

      ctx.beginPath();
      ctx.roundRect(mitoX + 15, mitoY + 35, mitoW - 30, mitoH - 50, 30);
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.8)';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = 'rgba(13, 148, 136, 0.15)';
      ctx.fill();

      ctx.strokeStyle = 'rgba(20, 184, 166, 0.4)';
      ctx.lineWidth = 2;
      for (let i = 1; i <= 4; i++) {
        const foldY = mitoY + 50 + i * (mitoH / 5.5);
        ctx.beginPath();
        ctx.moveTo(mitoX + 15, foldY);
        ctx.quadraticCurveTo(mitoX + 120, foldY + 15, mitoX + 220, foldY);
        ctx.stroke();
      }

      ctx.fillStyle = '#2dd4bf';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText('Mitochondrial Matrix', mitoX + mitoW - 140, mitoY + 60);

      // 3. GLYCOLYSIS BOX (Cytoplasm - 0 Oxygen Used)
      const glycX = width * 0.12;
      const glycY = height * 0.60;
      const glycW = 140;
      const glycH = 80;

      ctx.beginPath();
      ctx.roundRect(glycX, glycY, glycW, glycH, 16);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText('Glycolysis', glycX + 15, glycY + 22);
      ctx.font = '9px Inter, sans-serif';
      ctx.fillStyle = '#fef08a';
      ctx.fillText('Glucose → 2 Pyruvate', glycX + 15, glycY + 38);
      ctx.fillStyle = '#67e8f9';
      ctx.font = 'bold 9px Inter, sans-serif';
      ctx.fillText('(0 Oxygen Used Here)', glycX + 15, glycY + 54);

      // 4. CPT-1 GATE
      const cptX = width * 0.35;
      const cptY = height * 0.26;
      ctx.beginPath();
      ctx.arc(cptX, cptY, 24, 0, Math.PI * 2);
      ctx.fillStyle = zone.cpt1Active ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)';
      ctx.fill();
      ctx.strokeStyle = zone.cpt1Active ? '#10b981' : '#ef4444';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = zone.cpt1Active ? '#34d399' : '#f87171';
      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('CPT-1 Gate', cptX, cptY - 30);
      ctx.font = '9px Inter, sans-serif';
      ctx.fillText(zone.cpt1Active ? 'OPEN (Fat In)' : 'BLOCKED', cptX, cptY + 36);
      ctx.textAlign = 'left';

      // 5. BETA-OXIDATION BOX
      const betaX = width * 0.46;
      const betaY = height * 0.20;
      const betaW = 120;
      const betaH = 80;

      ctx.beginPath();
      ctx.roundRect(betaX, betaY, betaW, betaH, 16);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText('Beta-Oxidation', betaX + 12, betaY + 24);
      ctx.font = '9px Inter, sans-serif';
      ctx.fillStyle = '#a7f3d0';
      ctx.fillText('Fatty Acid → Acetyl-CoA', betaX + 12, betaY + 42);

      // 6. PDH GATE
      const pdhX = width * 0.35;
      const pdhY = height * 0.65;
      ctx.beginPath();
      ctx.arc(pdhX, pdhY, 24, 0, Math.PI * 2);
      ctx.fillStyle = zone.pdhActive ? 'rgba(59, 130, 246, 0.3)' : 'rgba(239, 68, 68, 0.3)';
      ctx.fill();
      ctx.strokeStyle = zone.pdhActive ? '#3b82f6' : '#ef4444';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = zone.pdhActive ? '#60a5fa' : '#f87171';
      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('PDH Gate', pdhX, pdhY - 30);
      ctx.font = '9px Inter, sans-serif';
      ctx.fillText(zone.pdhActive ? 'ACTIVE' : 'INHIBITED', pdhX, pdhY + 36);
      ctx.textAlign = 'left';

      // 7. KREBS CYCLE SPINNING WHEEL
      const krebsX = width * 0.64;
      const krebsY = height * 0.55;
      const krebsR = 55;

      ctx.beginPath();
      ctx.arc(krebsX, krebsY, krebsR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
      ctx.lineWidth = 4;
      ctx.stroke();

      if (isRunning) angleKrebs += 0.015 * zone.atpSpeed;
      for (let i = 0; i < 6; i++) {
        const a = angleKrebs + (i * Math.PI / 3);
        const nx = krebsX + Math.cos(a) * krebsR;
        const ny = krebsY + Math.sin(a) * krebsR;

        ctx.beginPath();
        ctx.arc(nx, ny, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#c084fc';
        ctx.fill();
      }

      ctx.fillStyle = '#e9d5ff';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Krebs Cycle', krebsX, krebsY - 6);
      ctx.font = '9px Inter, sans-serif';
      ctx.fillStyle = '#c084fc';
      ctx.fillText('NADH / FADH2', krebsX, krebsY + 10);
      ctx.textAlign = 'left';

      // 8. ETC & ATP SYNTHASE ROTOR
      const etcX = width * 0.86;
      const etcY = height * 0.45;
      const etcR = 48;

      ctx.beginPath();
      ctx.arc(etcX, etcY, etcR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(234, 179, 8, 0.15)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.8)';
      ctx.lineWidth = 3;
      ctx.stroke();

      if (isRunning) angleAtpSynthase += 0.04 * zone.atpSpeed;
      for (let i = 0; i < 4; i++) {
        const a = angleAtpSynthase + (i * Math.PI / 2);
        const bx = etcX + Math.cos(a) * 30;
        const by = etcY + Math.sin(a) * 30;

        ctx.beginPath();
        ctx.moveTo(etcX, etcY);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ATP Synthase', etcX, etcY - 55);
      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.fillStyle = '#22d3ee';
      ctx.fillText('Complex IV (O2 Destination)', etcX, etcY + 60);
      ctx.textAlign = 'left';

      // 9. ANIMATE PARTICLES (If Running)
      if (isRunning) {
        
        fattyParticles.forEach(p => {
          p.x += p.vx * zone.fatOxidationRate * 1.2;
          p.y += p.vy;
          if (p.x > width * 0.48) p.x = 20;

          ctx.beginPath();
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#10b981';
          ctx.fill();
        });

        glucoseParticles.forEach(p => {
          p.x += p.vx * (zone.carbOxidation / 50);
          p.y += p.vy;
          if (p.x > width * 0.32) p.x = 10;

          ctx.beginPath();
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#f59e0b';
          ctx.fill();
        });

        oxygenParticles.forEach(p => {
          p.x += p.vx * 1.5;
          p.y += (etcY - p.y) * 0.02;

          if (p.x > etcX - 20) {
            p.x = 20;
            p.y = height * 0.15 + Math.random() * (height * 0.2);
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.arc(p.x + 6, p.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#06b6d4';
          ctx.fill();
        });

        atpParticles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.life += 1;
          if (p.life > 100) {
            p.x = etcX;
            p.y = etcY + 15;
            p.life = 0;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#facc15';
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentZoneId, zone, isRunning]);

  return (
    <section className="glass-panel rounded-3xl p-5 md:p-6 border border-slate-800 shadow-2xl mb-8 relative bg-slate-950/90">
      
      {/* Real Run Selector & Synced Cell Clock Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 mb-5 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-lg">
        
        {/* Real Run Dropdown */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-extrabold text-slate-400 tracking-wider">Simulate Real Run In Cell:</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {isRunning ? "⏱️ Running" : "⏸️ Paused"}
              </span>
            </div>
            
            <div className="mt-1 flex items-center gap-2">
              <select
                value={selectedRunId}
                onChange={(e) => {
                  setSelectedRunId(e.target.value);
                  setSecondsElapsed(0);
                  setIsRunning(true);
                }}
                className="bg-slate-950 text-emerald-300 text-xs font-bold rounded-lg border border-emerald-500/40 px-2.5 py-1 focus:outline-none"
              >
                {REAL_RUNS.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.dateLabel}
                  </option>
                ))}
              </select>
              <div className="text-xl font-extrabold font-mono tracking-tight text-slate-100">
                {formatTime(secondsElapsed)}
              </div>
            </div>
          </div>
        </div>

        {/* Stopwatch & Simulation Synced Play/Pause Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              isRunning
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-md'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-slate-950" />}
            <span>{isRunning ? "Pause Cell & Run" : "Start Cell & Run"}</span>
          </button>

          <button
            onClick={() => setSpeedMultiplier(speedMultiplier === 1 ? 5 : 1)}
            className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
              speedMultiplier > 1
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <FastForward className="w-3.5 h-3.5 text-cyan-400" />
            <span>{speedMultiplier}x Speed</span>
          </button>

          <button
            onClick={() => {
              setSecondsElapsed(0);
              setIsRunning(true);
            }}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Reset Clock & Cell"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Live Cumulative Tally Grid for Real Run */}
        <div className="grid grid-cols-4 gap-2 w-full lg:w-auto">
          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[9px] uppercase font-bold text-slate-400 flex items-center gap-1">
              📍 Distance
            </div>
            <div className="text-sm font-extrabold text-teal-300 mt-0.5">{currentKm} km</div>
          </div>

          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[9px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Flame className="w-3 h-3 text-emerald-400" /> Fat Burned
            </div>
            <div className="text-sm font-extrabold text-emerald-300 mt-0.5">{fatGramsBurned}g</div>
          </div>

          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[9px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Wind className="w-3 h-3 text-cyan-400" /> O₂ Used
            </div>
            <div className="text-sm font-extrabold text-cyan-300 mt-0.5">{o2LitersConsumed}L</div>
          </div>

          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[9px] uppercase font-bold text-slate-400 flex items-center gap-1">
              🔥 Calories
            </div>
            <div className="text-sm font-extrabold text-amber-300 mt-0.5">{fatCaloriesBurned} kcal</div>
          </div>
        </div>

      </div>

      {/* Main HTML5 Canvas */}
      <div className="w-full h-[540px] relative rounded-2xl overflow-hidden border border-slate-800">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            const width = rect.width;
            const height = rect.height;

            const hitRegions = [
              { id: "capillary", x: width * 0.08, y: height * 0.25, radius: 42 },
              { id: "glycolysis", x: width * 0.18, y: height * 0.68, radius: 45 },
              { id: "cpt1", x: width * 0.38, y: height * 0.26, radius: 32 },
              { id: "beta_ox", x: width * 0.52, y: height * 0.28, radius: 45 },
              { id: "pdh", x: width * 0.38, y: height * 0.65, radius: 32 },
              { id: "krebs", x: width * 0.64, y: height * 0.55, radius: 65 },
              { id: "etc", x: width * 0.86, y: height * 0.45, radius: 55 },
              { id: "lactate_shuttle", x: width * 0.22, y: height * 0.88, radius: 35 }
            ];

            const clicked = hitRegions.find(r => {
              const dx = clickX - r.x;
              const dy = clickY - r.y;
              return Math.sqrt(dx * dx + dy * dy) <= r.radius;
            });

            if (clicked && onSelectStage) {
              onSelectStage(clicked.id);
            }
          }}
        />

        {/* Floating Instructions Legend Overlay */}
        <div className="absolute bottom-4 left-4 glass-panel px-3.5 py-2 rounded-xl border border-slate-800 text-[10px] text-slate-300 flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>Fatty Acid (🥑)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>Glucose (🍇)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span>Oxygen O₂ (🫁)</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 border-l border-slate-800 pl-3">
            <Info className="w-3 h-3 text-emerald-400" />
            <span>Click any organelle/gate to inspect!</span>
          </div>
        </div>

      </div>

    </section>
  );
}
