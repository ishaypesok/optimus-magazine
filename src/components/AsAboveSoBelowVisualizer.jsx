import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Zap, Activity, Orbit, Globe, Compass, Info, Volume2, VolumeX, Maximize2, RefreshCw, Sliders, Dna, Layers, ShieldCheck, FileText, X
} from 'lucide-react';

const REALMS_DATA = [
  {
    minExp: -15,
    maxExp: -10,
    name: "Subatomic & Quantum Orbital Realm",
    exponentLabel: "10⁻¹⁵ to 10⁻¹⁰ m",
    color: "#60a5fa",
    textColor: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-400/40",
    desc: "Observing quantum probability clouds, wave-packet interference, and electron standing waves around atomic nuclei governed by the Schrödinger equation."
  },
  {
    minExp: -10,
    maxExp: -4,
    name: "Cellular & Mitochondrial Bioenergetic Realm",
    exponentLabel: "10⁻⁶ m (Microscopic)",
    color: "#34d399",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-400/40",
    desc: "Observing inner organellar dynamics: glowing mitochondria synthesizing ATP along inner membrane cristae, intertwined with a dense microtubule cytoskeleton."
  },
  {
    minExp: -4,
    maxExp: 10,
    name: "Organismal, Vascular & Biospheric Realm",
    exponentLabel: "10⁰ m (Human Scale)",
    color: "#f87171",
    textColor: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-400/40",
    desc: "Observing fractal vascular trees, neural dendrite arbors, leaf venation, and organic fluid transport optimized for minimal energy dissipation."
  },
  {
    minExp: 10,
    maxExp: 26,
    name: "Cosmic Web & Galactic Filament Realm",
    exponentLabel: "10²⁶ m (Cosmological)",
    color: "#c084fc",
    textColor: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-400/40",
    desc: "Observing the cosmic dark matter filaments connecting superclusters and spiral galaxies. Structural homology matches neural network topology (Vazza & Feletti 2020)."
  }
];

export default function AsAboveSoBelowVisualizer() {
  const canvasRef = useRef(null);
  
  // Interactive Simulation States
  const [activeTab, setActiveTab] = useState('continuous'); // 'continuous' | 'comparison' | 'turing' | 'blueprint'
  const [scaleExponent, setScaleExponent] = useState(-6); // 10^-6 default (Mitochondria)
  const [speed, setSpeed] = useState(1.0);
  const [density, setDensity] = useState(1200);
  const [blendFactor, setBlendFactor] = useState(0.5); // Comparison mode cross-fade
  const [showBioluminescent, setShowBioluminescent] = useState(true);
  const [showFilaments, setShowFilaments] = useState(true);
  const [enableRotation, setEnableRotation] = useState(true);
  const [audioActive, setAudioActive] = useState(false);
  const [fps, setFps] = useState(60);

  // Audio Context Ref
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const baseOscRef = useRef(null);
  const harmonyOscRef = useRef(null);
  const subOscRef = useRef(null);

  // Simulation Data Refs
  const simStateRef = useRef({
    scaleExponent: -6,
    targetScaleExponent: -6,
    speed: 1.0,
    nodes: [],
    mitochondria: [],
    galaxies: [],
    panX: 0,
    panY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0
  });

  // Determine current active realm based on exponent scale
  const currentRealm = REALMS_DATA.find(r => scaleExponent >= r.minExp && scaleExponent <= r.maxExp) || REALMS_DATA[1];

  // --------------------------------------------------------------------------
  // Simulation Data Initialization
  // --------------------------------------------------------------------------
  const initSimulationData = (width, height, nodeCount) => {
    const nodes = [];
    const clusterCount = 6;
    const clusters = [];
    for (let c = 0; c < clusterCount; c++) {
      clusters.push({
        x: (Math.random() - 0.5) * width * 1.1,
        y: (Math.random() - 0.5) * height * 1.1
      });
    }

    for (let i = 0; i < nodeCount; i++) {
      const cluster = clusters[i % clusterCount];
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.pow(Math.random(), 2.2) * (Math.min(width, height) * 0.55);
      
      nodes.push({
        x: cluster.x + Math.cos(angle) * radius,
        y: cluster.y + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1.2,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03
      });
    }

    // Mitochondria Structures
    const mitochondria = [];
    const mitoCount = 8;
    for (let m = 0; m < mitoCount; m++) {
      const angle = (m / mitoCount) * Math.PI * 2 + Math.random() * 0.5;
      const dist = 120 + Math.random() * 200;
      mitochondria.push({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        length: 70 + Math.random() * 45,
        width: 26 + Math.random() * 10,
        rotation: angle + Math.PI / 2,
        protonCount: 16,
        cristaeCount: 6
      });
    }

    // Galaxies
    const galaxies = [];
    const galaxyCount = 5;
    for (let g = 0; g < galaxyCount; g++) {
      galaxies.push({
        x: (Math.random() - 0.5) * width * 0.7,
        y: (Math.random() - 0.5) * height * 0.7,
        arms: 2 + Math.floor(Math.random() * 3),
        size: 80 + Math.random() * 100,
        rotationSpeed: (Math.random() > 0.5 ? 1 : -1) * (0.002 + Math.random() * 0.003),
        currentAngle: Math.random() * Math.PI * 2
      });
    }

    return { nodes, mitochondria, galaxies };
  };

  // --------------------------------------------------------------------------
  // Canvas Loop & Animation Effect
  // --------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 540;
      const data = initSimulationData(canvas.width, canvas.height, density);
      simStateRef.current.nodes = data.nodes;
      simStateRef.current.mitochondria = data.mitochondria;
      simStateRef.current.galaxies = data.galaxies;
    };

    resize();
    window.addEventListener('resize', resize);

    // Turing Grid State
    let turingU, turingV, turingNextU, turingNextV;
    const tw = 120;
    const th = 80;
    
    const initTuring = () => {
      turingU = new Float32Array(tw * th);
      turingV = new Float32Array(tw * th);
      turingNextU = new Float32Array(tw * th);
      turingNextV = new Float32Array(tw * th);
      for (let i = 0; i < tw * th; i++) {
        turingU[i] = 1.0;
        turingV[i] = 0.0;
      }
      for (let s = 0; s < 15; s++) {
        const cx = Math.floor(Math.random() * tw);
        const cy = Math.floor(Math.random() * th);
        for (let y = cy - 5; y <= cy + 5; y++) {
          for (let x = cx - 5; x <= cx + 5; x++) {
            if (x >= 0 && x < tw && y >= 0 && y < th) {
              turingV[y * tw + x] = 0.9;
            }
          }
        }
      }
    };
    initTuring();

    const stepTuring = () => {
      const Du = 0.16;
      const Dv = 0.08;
      const feed = 0.037;
      const kill = 0.06;
      for (let y = 1; y < th - 1; y++) {
        for (let x = 1; x < tw - 1; x++) {
          const i = y * tw + x;
          const lapU = turingU[i - 1] + turingU[i + 1] + turingU[i - tw] + turingU[i + tw] - 4 * turingU[i];
          const lapV = turingV[i - 1] + turingV[i + 1] + turingV[i - tw] + turingV[i + tw] - 4 * turingV[i];
          const uvv = turingU[i] * turingV[i] * turingV[i];
          turingNextU[i] = turingU[i] + (Du * lapU - uvv + feed * (1 - turingU[i])) * speed;
          turingNextV[i] = turingV[i] + (Dv * lapV + uvv - (feed + kill) * turingV[i]) * speed;
        }
      }
      const tmpU = turingU; turingU = turingNextU; turingNextU = tmpU;
      const tmpV = turingV; turingV = turingNextV; turingNextV = tmpV;
    };

    const renderTuring = () => {
      stepTuring();
      const imgData = ctx.createImageData(tw, th);
      for (let i = 0; i < tw * th; i++) {
        const uVal = turingU[i];
        const vVal = turingV[i];
        const idx = i * 4;
        imgData.data[idx]     = Math.floor(vVal * 130 + 20);
        imgData.data[idx + 1] = Math.floor((1 - uVal) * 240 + 30);
        imgData.data[idx + 2] = Math.floor(uVal * 220 + 80);
        imgData.data[idx + 3] = 255;
      }
      const offCanvas = document.createElement('canvas');
      offCanvas.width = tw; offCanvas.height = th;
      offCanvas.getContext('2d').putImageData(imgData, 0, 0);
      ctx.drawImage(offCanvas, 0, 0, canvas.width, canvas.height);
    };

    // Render Main Loop
    const loop = (timestamp) => {
      frameCount++;
      if (timestamp - lastFpsUpdate >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastFpsUpdate = timestamp;
      }

      // Smooth scale interpolation
      simStateRef.current.scaleExponent += (simStateRef.current.targetScaleExponent - simStateRef.current.scaleExponent) * 0.08;
      setScaleExponent(simStateRef.current.scaleExponent);

      ctx.fillStyle = 'rgba(3, 5, 8, 0.45)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (activeTab === 'turing') {
        renderTuring();
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      const exp = simStateRef.current.scaleExponent;
      const { nodes, mitochondria, galaxies } = simStateRef.current;
      const rotSpeed = enableRotation ? 0.001 * speed : 0;

      // Update node physics
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (enableRotation) {
          const dx = node.x;
          const dy = node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ang = Math.atan2(dy, dx) + rotSpeed * (400 / (dist + 100));
          node.x = Math.cos(ang) * dist;
          node.y = Math.sin(ang) * dist;
        }
        node.x += node.vx * speed;
        node.y += node.vy * speed;
        node.phase += node.pulseSpeed * speed;
      }

      if (activeTab === 'comparison') {
        // Dual layer cross-fade rendering
        ctx.save();
        ctx.translate(canvas.width / 2 + simStateRef.current.panX, canvas.height / 2 + simStateRef.current.panY);

        // Layer 1: Mitochondria & Cell Nodes (#34d399)
        ctx.globalAlpha = 1.0 - blendFactor;
        for (let m = 0; m < mitochondria.length; m++) {
          const mito = mitochondria[m];
          ctx.save();
          ctx.translate(mito.x, mito.y);
          ctx.rotate(mito.rotation);
          ctx.strokeStyle = '#34d399';
          ctx.lineWidth = 2;
          ctx.shadowColor = '#34d399';
          ctx.shadowBlur = 10;
          const halfL = mito.length / 2;
          const r = mito.width / 2;
          ctx.beginPath();
          ctx.arc(-halfL, 0, r, Math.PI / 2, Math.PI * 1.5);
          ctx.lineTo(halfL, -r);
          ctx.arc(halfL, 0, r, -Math.PI / 2, Math.PI / 2);
          ctx.lineTo(-halfL, r);
          ctx.closePath();
          ctx.stroke();

          ctx.strokeStyle = 'rgba(52, 211, 153, 0.5)';
          ctx.lineWidth = 1;
          const step = mito.length / (mito.cristaeCount + 1);
          for (let c = 1; c <= mito.cristaeCount; c++) {
            const cx = -halfL + c * step;
            const side = c % 2 === 0 ? 1 : -1;
            ctx.beginPath();
            ctx.moveTo(cx, side * r * 0.8);
            ctx.lineTo(cx, -side * r * 0.2);
            ctx.stroke();
          }
          ctx.restore();
        }

        if (showFilaments) {
          const maxDist = 80;
          ctx.lineWidth = 0.7;
          ctx.strokeStyle = 'rgba(52, 211, 153, 0.25)';
          for (let i = 0; i < nodes.length; i += 2) {
            const p1 = nodes[i];
            for (let j = i + 1; j < nodes.length; j += 4) {
              const p2 = nodes[j];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              if (dx * dx + dy * dy < maxDist * maxDist) {
                ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
              }
            }
          }
        }

        // Layer 2: Cosmic Galaxies & Filaments (#c084fc)
        ctx.globalAlpha = blendFactor;
        for (let g = 0; g < galaxies.length; g++) {
          const gal = galaxies[g];
          gal.currentAngle += gal.rotationSpeed * speed;
          ctx.save();
          ctx.translate(gal.x, gal.y);
          ctx.rotate(gal.currentAngle);
          const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, gal.size * 0.3);
          coreGrad.addColorStop(0, '#ffffff');
          coreGrad.addColorStop(0.4, '#c084fc');
          coreGrad.addColorStop(1, 'rgba(192, 132, 252, 0)');
          ctx.fillStyle = coreGrad;
          ctx.beginPath(); ctx.arc(0, 0, gal.size * 0.3, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = 'rgba(192, 132, 252, 0.4)';
          ctx.lineWidth = 1.2;
          for (let a = 0; a < gal.arms; a++) {
            const armAngle = (a / gal.arms) * Math.PI * 2;
            ctx.beginPath();
            for (let t = 0; t < gal.size; t += 4) {
              const theta = armAngle + t * 0.05;
              const rad = t * 0.9;
              const ax = Math.cos(theta) * rad;
              const ay = Math.sin(theta) * rad;
              if (t === 0) ctx.moveTo(ax, ay); else ctx.lineTo(ax, ay);
            }
            ctx.stroke();
          }
          ctx.restore();
        }

        if (showFilaments) {
          const maxDist = 80;
          ctx.lineWidth = 0.7;
          ctx.strokeStyle = 'rgba(192, 132, 252, 0.3)';
          for (let i = 0; i < nodes.length; i += 2) {
            const p1 = nodes[i];
            for (let j = i + 1; j < nodes.length; j += 4) {
              const p2 = nodes[j];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              if (dx * dx + dy * dy < maxDist * maxDist) {
                ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
              }
            }
          }
        }

        // Common Bioluminescent Nodes
        ctx.globalAlpha = 1.0;
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const pulse = node.radius + Math.sin(node.phase) * 0.5;
          if (showBioluminescent) {
            const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulse * 3.5);
            glow.addColorStop(0, blendFactor > 0.5 ? '#c084fc' : '#34d399');
            glow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = glow;
            ctx.beginPath(); ctx.arc(node.x, node.y, pulse * 3.5, 0, Math.PI * 2); ctx.fill();
          }
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(node.x, node.y, pulse, 0, Math.PI * 2); ctx.fill();
        }

        ctx.restore();
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      ctx.save();
      ctx.translate(canvas.width / 2 + simStateRef.current.panX, canvas.height / 2 + simStateRef.current.panY);

      // Color Palette by Realm
      let primaryColor = '#34d399';
      let filamentColor = 'rgba(52, 211, 153, 0.22)';
      if (exp < -10) { primaryColor = '#60a5fa'; filamentColor = 'rgba(96, 165, 250, 0.22)'; }
      else if (exp > 10) { primaryColor = '#c084fc'; filamentColor = 'rgba(192, 132, 252, 0.25)'; }
      else if (exp >= -4 && exp <= 10) { primaryColor = '#f87171'; filamentColor = 'rgba(248, 113, 113, 0.2)'; }

      // 1. Draw Realm Sub-structures
      if (exp >= -10 && exp <= -3) {
        // Render Mitochondria
        for (let m = 0; m < mitochondria.length; m++) {
          const mito = mitochondria[m];
          ctx.save();
          ctx.translate(mito.x, mito.y);
          ctx.rotate(mito.rotation);
          ctx.strokeStyle = '#34d399';
          ctx.lineWidth = 2;
          ctx.shadowColor = '#34d399';
          ctx.shadowBlur = 10;
          const halfL = mito.length / 2;
          const r = mito.width / 2;
          ctx.beginPath();
          ctx.arc(-halfL, 0, r, Math.PI / 2, Math.PI * 1.5);
          ctx.lineTo(halfL, -r);
          ctx.arc(halfL, 0, r, -Math.PI / 2, Math.PI / 2);
          ctx.lineTo(-halfL, r);
          ctx.closePath();
          ctx.stroke();

          // Cristae
          ctx.strokeStyle = 'rgba(52, 211, 153, 0.5)';
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
          const step = mito.length / (mito.cristaeCount + 1);
          for (let c = 1; c <= mito.cristaeCount; c++) {
            const cx = -halfL + c * step;
            const side = c % 2 === 0 ? 1 : -1;
            ctx.beginPath();
            ctx.moveTo(cx, side * r * 0.8);
            ctx.lineTo(cx, -side * r * 0.2);
            ctx.stroke();
          }

          // Protons
          ctx.fillStyle = '#fbbf24';
          for (let p = 0; p < mito.protonCount; p++) {
            const pProgress = (timestamp * 0.001 * speed + p * 0.25) % 1.0;
            const px = -halfL + pProgress * mito.length;
            const py = Math.sin(pProgress * Math.PI * 4) * (r * 0.5);
            ctx.beginPath();
            ctx.arc(px, py, 1.3, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      } else if (exp > 10) {
        // Render Galaxies
        for (let g = 0; g < galaxies.length; g++) {
          const gal = galaxies[g];
          gal.currentAngle += gal.rotationSpeed * speed;
          ctx.save();
          ctx.translate(gal.x, gal.y);
          ctx.rotate(gal.currentAngle);
          const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, gal.size * 0.3);
          coreGrad.addColorStop(0, '#ffffff');
          coreGrad.addColorStop(0.4, '#c084fc');
          coreGrad.addColorStop(1, 'rgba(192, 132, 252, 0)');
          ctx.fillStyle = coreGrad;
          ctx.beginPath();
          ctx.arc(0, 0, gal.size * 0.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = 'rgba(192, 132, 252, 0.4)';
          ctx.lineWidth = 1.2;
          for (let a = 0; a < gal.arms; a++) {
            const armAngle = (a / gal.arms) * Math.PI * 2;
            ctx.beginPath();
            for (let t = 0; t < gal.size; t += 4) {
              const theta = armAngle + t * 0.05;
              const rad = t * 0.9;
              const ax = Math.cos(theta) * rad;
              const ay = Math.sin(theta) * rad;
              if (t === 0) ctx.moveTo(ax, ay);
              else ctx.lineTo(ax, ay);
            }
            ctx.stroke();
          }
          ctx.restore();
        }
      }

      // 2. Network Filaments
      if (showFilaments) {
        const maxDist = 80;
        ctx.lineWidth = 0.7;
        for (let i = 0; i < nodes.length; i += 2) {
          const p1 = nodes[i];
          for (let j = i + 1; j < nodes.length; j += 4) {
            const p2 = nodes[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < maxDist * maxDist) {
              ctx.strokeStyle = filamentColor;
              ctx.globalAlpha = (1 - Math.sqrt(distSq) / maxDist) * 0.45;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1.0;
      }

      // 3. Bioluminescent Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulse = node.radius + Math.sin(node.phase) * 0.5;
        if (showBioluminescent) {
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulse * 3.5);
          glow.addColorStop(0, primaryColor);
          glow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulse * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [activeTab, speed, density, blendFactor, showBioluminescent, showFilaments, enableRotation]);

  // Handle Zoom Scale Slider Change
  const handleScaleChange = (val) => {
    simStateRef.current.targetScaleExponent = parseFloat(val);
  };

  // Toggle Audio Drone
  const toggleAudioSynth = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.setValueAtTime(0.12, ctx.currentTime);
      master.connect(ctx.destination);
      masterGainRef.current = master;

      const base = ctx.createOscillator();
      base.type = 'sine';
      base.frequency.setValueAtTime(108, ctx.currentTime);
      base.connect(master);
      base.start();
      baseOscRef.current = base;

      const harm = ctx.createOscillator();
      harm.type = 'triangle';
      harm.frequency.setValueAtTime(174.7, ctx.currentTime);
      harm.connect(master);
      harm.start();
      harmonyOscRef.current = harm;

      setAudioActive(true);
    } else {
      if (audioActive) {
        masterGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.1);
        setAudioActive(false);
      } else {
        audioCtxRef.current.resume();
        masterGainRef.current.gain.setTargetAtTime(0.12, audioCtxRef.current.currentTime, 0.1);
        setAudioActive(true);
      }
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Title & Header Badge */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-extrabold text-xs uppercase tracking-wider border border-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-purple-700" />
          <span>Page 31 • Interactive Multiscale Simulator</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-black text-stone-900 leading-tight tracking-tight">
          As Above, So Below: Universal Self-Similarity
        </h2>
        <p className="text-stone-600 text-sm font-normal">
          From quantum wavefunctions to mitochondrial inner membrane networks and cosmic filaments—exploring nature's identical fractal patterns across 41 orders of magnitude.
        </p>
      </div>

      {/* Mode Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-stone-900 text-stone-200 border border-stone-800 shadow-md">
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setActiveTab('continuous')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'continuous' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-stone-800 text-stone-400'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Scale Zoom (10⁻¹⁵ to 10²⁶m)</span>
          </button>

          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'comparison' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-stone-800 text-stone-400'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Cell vs Cosmic Web</span>
          </button>

          <button
            onClick={() => setActiveTab('turing')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'turing' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-stone-800 text-stone-400'
            }`}
          >
            <Orbit className="w-3.5 h-3.5" />
            <span>Morphogenesis (Turing)</span>
          </button>

          <button
            onClick={() => setActiveTab('blueprint')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'blueprint' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:bg-stone-800 text-stone-400'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Scientific Blueprint</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleAudioSynth}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              audioActive ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50' : 'bg-stone-800 text-stone-300 border-stone-700'
            }`}
          >
            {audioActive ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>432Hz Harmonics</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Box */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 border-2 border-stone-800 shadow-2xl">
        
        {/* Scale HUD Badge Overlay */}
        {activeTab !== 'comparison' && (
          <div className="absolute top-4 left-4 z-20 max-w-sm p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-white space-y-1 shadow-lg pointer-events-none">
            <div className="text-[10px] font-mono tracking-widest text-indigo-400 font-bold uppercase">
              CURRENT SCALE CONTINUUM
            </div>
            <div className="text-xl font-black font-mono tracking-tight text-white flex items-center gap-2">
              <span>10<sup>{Math.round(scaleExponent) < 0 ? `-${Math.abs(Math.round(scaleExponent))}` : `+${Math.round(scaleExponent)}`}</sup> meters</span>
            </div>
            <div className={`text-xs font-bold ${currentRealm.textColor}`}>
              {currentRealm.name}
            </div>
            <p className="text-[11px] text-slate-300 leading-snug font-normal pt-1">
              {currentRealm.desc}
            </p>
          </div>
        )}

        {/* Comparative Overlay Control (Shown in Comparison Mode) */}
        {activeTab === 'comparison' && (
          <div className="absolute top-4 left-4 right-4 z-20 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-indigo-500/40 text-white space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                Structural Homology: Cell vs Cosmic Web
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold border border-indigo-400/40">
                Fractal Dim: D ≈ 1.83
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Superimposing microscopic neuronal & organelle networks over cosmological dark matter filament simulations (Vazza & Feletti 2020).
            </p>
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-300">
                <span>Cross-Fade Blend:</span>
                <span className="text-emerald-400 font-bold">{Math.round((1 - blendFactor) * 100)}% Cell / {Math.round(blendFactor * 100)}% Cosmic</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={blendFactor}
                onChange={(e) => setBlendFactor(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-400">
                <span>100% Neuron / Cell</span>
                <span>Equal Superimposition</span>
                <span>100% Cosmic Filaments</span>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Canvas Element */}
        <canvas ref={canvasRef} className="w-full h-[540px] block cursor-grab active:cursor-grabbing" />

        {/* Bottom Floating Control Bar */}
        <div className="p-4 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-white">
          
          {/* Zoom Slider */}
          <div className="flex-1 min-w-[240px] space-y-1">
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>Zoom Scale</span>
              <span className="text-emerald-400 font-bold">{currentRealm.exponentLabel}</span>
            </div>
            <input
              type="range"
              min="-15"
              max="26"
              step="0.1"
              value={scaleExponent}
              onChange={(e) => handleScaleChange(e.target.value)}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono">
              <span>Atomic (10⁻¹⁵m)</span>
              <span>Cell (10⁻⁶m)</span>
              <span>Human (10⁰m)</span>
              <span>Cosmos (10²⁶m)</span>
            </div>
          </div>

          {/* Scale Preset Chips */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => handleScaleChange(-15)}
              className="px-2.5 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-[11px] font-bold border border-blue-500/40 transition"
            >
              Quantum
            </button>
            <button
              onClick={() => handleScaleChange(-6)}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-bold border border-emerald-500/40 transition"
            >
              Cell / Mito
            </button>
            <button
              onClick={() => handleScaleChange(0)}
              className="px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-[11px] font-bold border border-red-500/40 transition"
            >
              Vascular
            </button>
            <button
              onClick={() => handleScaleChange(26)}
              className="px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-[11px] font-bold border border-purple-500/40 transition"
            >
              Cosmic Web
            </button>
          </div>

          {/* Render Stats */}
          <div className="flex items-center gap-3 font-mono text-[10px] text-slate-400 shrink-0 border-l border-slate-800 pl-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              FPS: {fps}
            </span>
            <span>Nodes: {density}</span>
          </div>

        </div>
      </div>

      {/* Scientific Blueprint Modal Overlay */}
      {activeTab === 'blueprint' && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 sm:p-8 overflow-y-auto flex items-center justify-center font-sans">
          <div className="relative max-w-4xl w-full bg-slate-900 border-2 border-indigo-500/50 rounded-3xl p-6 sm:p-10 text-white space-y-8 shadow-2xl">
            <button
              onClick={() => setActiveTab('continuous')}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
              title="Close Blueprint Modal"
            >
              <X className="w-6 h-6" />
            </button>

            <header className="space-y-2 pr-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-extrabold text-xs uppercase tracking-wider border border-indigo-400/40">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Scientific Blueprint & Mathematical Foundation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                The Mathematics of Universal Self-Similarity
              </h2>
              <p className="text-slate-300 text-sm">
                From microscopic bioenergetics to the large-scale structure of the Universe.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-blue-500/30 space-y-3">
                <div className="text-2xl">⚛️</div>
                <h3 className="text-base font-bold text-blue-400">1. Quantum Probability & Atomic Orbitals</h3>
                <p className="text-slate-300 text-xs leading-relaxed font-normal">
                  At 10⁻¹⁵m to 10⁻¹⁰m, electron cloud distributions around atomic nuclei are governed by Schrödinger wavefunctions. Nodes of interference create standing wave patterns identical to resonance figures in macroscopic acoustics.
                </p>
                <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-blue-300 border border-blue-500/30">
                  ∇²ψ + (8π²m / h²)(E - V)ψ = 0
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-emerald-500/30 space-y-3">
                <div className="text-2xl">⚡</div>
                <h3 className="text-base font-bold text-emerald-400">2. Mitochondrial & Cytoskeletal Networks</h3>
                <p className="text-slate-300 text-xs leading-relaxed font-normal">
                  At 10⁻⁶m, mitochondria form hyper-connected, dynamic networks within cells to optimize proton gradients (ΔΨm) and ATP synthases across inner membrane cristae. Cytoplasmic streaming mirrors cosmic mass flows.
                </p>
                <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-emerald-300 border border-emerald-500/30">
                  ΔG = -zFΔΨ + 2.3RT log(pH_out / pH_in)
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-pink-500/30 space-y-3">
                <div className="text-2xl">🌀</div>
                <h3 className="text-base font-bold text-pink-400">3. Turing Morphogenesis & Reaction-Diffusion</h3>
                <p className="text-slate-300 text-xs leading-relaxed font-normal">
                  Alan Turing showed in 1952 how activator-inhibitor chemical systems give rise to spontaneous spots, stripes, and reticulated networks across biological tissues and stellar nurseries via self-organizing instability.
                </p>
                <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-pink-300 border border-pink-500/30">
                  ∂u/∂t = D_u ∇²u + f(u,v)
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-purple-500/30 space-y-3">
                <div className="text-2xl">🌌</div>
                <h3 className="text-base font-bold text-purple-400">4. The Cosmic Web vs Human Brain (Vazza & Feletti 2020)</h3>
                <p className="text-slate-300 text-xs leading-relaxed font-normal">
                  A ground-breaking quantitative comparison between the network of 69 billion neurons in the human brain and the cosmic web of 100 billion galaxies revealed striking spectral density match and identical average node connectivity.
                </p>
                <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-purple-300 border border-purple-500/30">
                  P(k) = ⟨|δ_k|²⟩ (Identical power law exponent across 27 orders of magnitude)
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border border-indigo-500/40 text-center space-y-2">
              <blockquote className="text-sm italic font-serif text-slate-200">
                “The total volume of memory capacity in the cosmic web matches the human brain's neural memory capacity required to store lifetime experiences. Nature executes the same energy dissipation optimization across all dimensions.”
              </blockquote>
              <div className="text-xs font-mono text-indigo-400 font-bold">
                F. Vazza (Astrophysicist) & A. Feletti (Neurosurgeon), Frontiers in Physics 2020
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setActiveTab('continuous')}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-md cursor-pointer"
              >
                Return to Interactive Canvas Simulator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deep Scientific Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-3">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-base">
            <Dna className="w-5 h-5 text-emerald-700" />
            Microscopic Bioenergetics (10⁻⁶m)
          </div>
          <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-normal">
            Inside human muscle cells during Zone 2 exercise, mitochondria form interconnected, bioluminescent networks designed to distribute proton gradients (ΔΨm) efficiently across inner membrane cristae folds.
          </p>
          <div className="p-3 rounded-xl bg-emerald-100/60 text-emerald-950 font-mono text-xs border border-emerald-200">
            ΔG = -zFΔΨ + 2.3RT log(pH_out / pH_in)
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-3">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-base">
            <Globe className="w-5 h-5 text-purple-700" />
            Cosmic Structural Homology (10²⁶m)
          </div>
          <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-normal">
            Quantitative network analysis by astrophysicist F. Vazza & neurosurgeon A. Feletti (2020) proved that the spatial distribution of dark matter filaments connecting 100 billion galaxies matches the neural network of the human brain with identical spectral power density exponent.
          </p>
          <div className="p-3 rounded-xl bg-purple-100/60 text-purple-950 font-mono text-xs border border-purple-200">
            Average Node Connectivity: N_brain ≈ 4.6 vs N_cosmos ≈ 3.8 (D ≈ 1.83)
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-center space-y-2 border border-slate-800 shadow-md">
        <blockquote className="text-sm sm:text-base italic font-serif text-slate-200 max-w-3xl mx-auto">
          “The same physical laws governing thermodynamic energy dissipation dictate the branching of rivers, the cristae folds of mitochondria, the neural arbors of the brain, and the cosmic filaments of dark matter.”
        </blockquote>
        <div className="text-xs font-mono text-indigo-400 font-bold">
          Optimus Bioenergetics & Universal Physics Index
        </div>
      </div>

    </div>
  );
}

