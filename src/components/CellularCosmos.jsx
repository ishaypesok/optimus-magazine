import React, { useState } from 'react';
import { 
  Sparkles, Cpu, Activity, Zap, Flame, ShieldCheck, HelpCircle, Eye, 
  Layers, Smile, ArrowRight, Dna, Compass, Globe, Info, RefreshCw, Radio
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ORGANELLES_DATA = [
  {
    id: 'mitochondria',
    name: 'Mitochondria (The Power Plants)',
    emoji: '⚡',
    color: 'from-amber-400 to-yellow-500',
    border: 'border-amber-400',
    text: 'text-amber-300',
    bg: 'bg-amber-500/10',
    badge: '100 - 2,000 per Cell',
    summary: 'The electric power plants powering 90% of cellular life!',
    description: 'Double-membraned ovals with inner cristae folds. They burn fat (Acetyl-CoA) through the 8-station Krebs cycle and Electron Transport Chain, generating 10 sextillion ATP energy molecules per second during Zone 2 runs!',
    cosmicParallel: 'Like mini star systems orbiting the cell nucleus, generating continuous energy light.',
    details: 'In Zone 2 exercise, signaling cascades (PGC-1α) trigger these organelles to split and multiply (mitochondrial biogenesis), increasing your cellular engine capacity.'
  },
  {
    id: 'nucleus',
    name: 'Nucleus & Chromatin (The Command Center)',
    emoji: '🧬',
    color: 'from-purple-400 to-indigo-500',
    border: 'border-purple-400',
    text: 'text-purple-300',
    bg: 'bg-purple-500/10',
    badge: '3 Billion Base Pairs of DNA',
    summary: 'The genetic vault directing all cellular biogenesis and repair!',
    description: 'Housed behind a double-layered nuclear envelope, the nucleus contains your entire genome. When you exercise, stress signals travel into the nucleus, activating transcription factors that transcribe new mitochondrial proteins.',
    cosmicParallel: 'The supermassive central black hole / galaxy core holding the gravitational blueprint of the system.',
    details: 'Zone 2 running activates histone deacetylases (SIRT1/SIRT3) that keep nuclear DNA youthful and protected against age-related damage.'
  },
  {
    id: 'er',
    name: 'Endoplasmic Reticulum & Ribosomes (The Protein Factory)',
    emoji: '🌺',
    color: 'from-sky-400 to-blue-500',
    border: 'border-sky-400',
    text: 'text-sky-300',
    bg: 'bg-sky-500/10',
    badge: '100,000+ Proteins Built / min',
    summary: 'Extensive membrane network building structural & enzymatic machines!',
    description: 'A labyrinth of folded membranes studded with tiny ribosome molecular machines. Ribosomes read mRNA blueprints from the nucleus to construct enzymes like Citrate Synthase and Aconitase.',
    cosmicParallel: 'Interstellar gas nebulae where new molecular stars and complex elements are forged.',
    details: 'Ensures damaged enzymes in the Krebs cycle are rapidly replaced, maintaining peak metabolic speed.'
  },
  {
    id: 'cytoskeleton',
    name: 'Cytoskeleton Highways (Microtubules & Filaments)',
    emoji: '🌿',
    color: 'from-emerald-400 to-teal-500',
    border: 'border-emerald-400',
    text: 'text-emerald-300',
    bg: 'bg-emerald-500/10',
    badge: 'Kinesin & Dynein Motor Tracks',
    summary: 'The dense structural scaffolding and high-speed delivery highway!',
    description: 'Intricate networks of tubulin microtubules and actin filaments crisscrossing the cytosol. Motor proteins (Kinesin) literally "walk" along these tracks carrying ATP packages and moving mitochondria to high-energy zones.',
    cosmicParallel: 'Cosmic web filaments connecting galaxy clusters across dark space.',
    details: 'Maintains cell shape against mechanical muscle contractions while sprinting or running.'
  },
  {
    id: 'cytosol',
    name: 'Cytosolic Crowding (The Dense Molecular Matrix)',
    emoji: '🌌',
    color: 'from-pink-400 to-rose-500',
    border: 'border-pink-400',
    text: 'text-pink-300',
    bg: 'bg-pink-500/10',
    badge: '200 - 300 mg/mL Density',
    summary: 'A hyper-packed molecular metropolis in perpetual, organized chaos!',
    description: 'Contrary to old textbook drawings showing empty blue water, the cytosolic interior is packed with proteins, metabolites, water channels, and ions at extreme density ($200-300 \\text{ mg/mL}$).',
    cosmicParallel: 'A dense stellar cluster where collisions and energy exchanges happen billions of times per second.',
    details: 'Substrate channeling ensures substrates like Acetyl-CoA pass directly from one enzyme machine to the next without getting lost.'
  }
];

export default function CellularCosmos() {
  const [selectedOrganelle, setSelectedOrganelle] = useState('mitochondria');
  const [activeTab, setActiveTab] = useState('landscape'); // 'landscape' | 'parallels' | 'science'

  const activeData = ORGANELLES_DATA.find(o => o.id === selectedOrganelle) || ORGANELLES_DATA[0];

  const handleOrganelleSelect = (id) => {
    setSelectedOrganelle(id);
    try {
      const fireConfetti = typeof confetti === 'function' ? confetti : (confetti && confetti.default);
      if (typeof fireConfetti === 'function') {
        fireConfetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } catch(e) {}
  };

  return (
    <div className="space-y-6 font-sans text-slate-100">
      
      {/* Top Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-purple-950/60 to-slate-900 shadow-2xl border border-purple-500/30 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs uppercase tracking-widest border border-purple-500/40 inline-flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              Page 21 • The Cellular Cosmos
            </span>

            <span className="px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-mono font-bold text-amber-300">
              3D Molecular Landscape Visualization
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-200 via-pink-200 to-amber-300 bg-clip-text text-transparent">
              The Cellular Cosmos: Inside the Human Cell
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
              Explore the most detailed 3D molecular cross-section of a human cell ever created! Discover why the crowded interior of your cells resembles a vibrant, hyper-organized cosmic galaxy of mitochondria, DNA, and molecular highways.
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage: Image & Hotspot Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: 3D Image & Interactive Organelle Overlay (7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-amber-300 font-extrabold text-sm sm:text-base">
              <Eye className="w-5 h-5 text-amber-400" />
              <span>Interactive 3D Molecular Cutaway Model</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Click organelle pins to inspect!</span>
          </div>

          {/* Image Canvas Container */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-2xl group">
            <img 
              src="/optimus-magazine/cellular_cosmos.jpg" 
              alt="Cellular Cosmos 3D Model"
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
            />

            {/* Glowing Hotspot Overlay Pins */}
            <button
              onClick={() => handleOrganelleSelect('mitochondria')}
              className={`absolute top-[42%] left-[22%] p-2 rounded-full transition-all duration-300 ${
                selectedOrganelle === 'mitochondria' 
                  ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/50 scale-125 z-20' 
                  : 'bg-amber-500/80 text-white hover:scale-110'
              }`}
              title="Click to inspect Mitochondria"
            >
              <span className="text-xs font-black">⚡</span>
            </button>

            <button
              onClick={() => handleOrganelleSelect('mitochondria')}
              className={`absolute bottom-[28%] right-[32%] p-2 rounded-full transition-all duration-300 ${
                selectedOrganelle === 'mitochondria' 
                  ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/50 scale-125 z-20' 
                  : 'bg-amber-500/80 text-white hover:scale-110'
              }`}
              title="Click to inspect Mitochondria"
            >
              <span className="text-xs font-black">⚡</span>
            </button>

            <button
              onClick={() => handleOrganelleSelect('nucleus')}
              className={`absolute top-[48%] left-[48%] p-2 rounded-full transition-all duration-300 ${
                selectedOrganelle === 'nucleus' 
                  ? 'bg-purple-400 text-slate-950 ring-4 ring-purple-400/50 scale-125 z-20' 
                  : 'bg-purple-500/80 text-white hover:scale-110'
              }`}
              title="Click to inspect Nucleus & DNA"
            >
              <span className="text-xs font-black">🧬</span>
            </button>

            <button
              onClick={() => handleOrganelleSelect('er')}
              className={`absolute top-[38%] right-[38%] p-2 rounded-full transition-all duration-300 ${
                selectedOrganelle === 'er' 
                  ? 'bg-sky-400 text-slate-950 ring-4 ring-sky-400/50 scale-125 z-20' 
                  : 'bg-sky-500/80 text-white hover:scale-110'
              }`}
              title="Click to inspect Endoplasmic Reticulum"
            >
              <span className="text-xs font-black">🌺</span>
            </button>

            <button
              onClick={() => handleOrganelleSelect('cytoskeleton')}
              className={`absolute top-[28%] left-[45%] p-2 rounded-full transition-all duration-300 ${
                selectedOrganelle === 'cytoskeleton' 
                  ? 'bg-emerald-400 text-slate-950 ring-4 ring-emerald-400/50 scale-125 z-20' 
                  : 'bg-emerald-500/80 text-white hover:scale-110'
              }`}
              title="Click to inspect Cytoskeleton Highways"
            >
              <span className="text-xs font-black">🌿</span>
            </button>

            <button
              onClick={() => handleOrganelleSelect('cytosol')}
              className={`absolute bottom-[18%] left-[28%] p-2 rounded-full transition-all duration-300 ${
                selectedOrganelle === 'cytosol' 
                  ? 'bg-pink-400 text-slate-950 ring-4 ring-pink-400/50 scale-125 z-20' 
                  : 'bg-pink-500/80 text-white hover:scale-110'
              }`}
              title="Click to inspect Cytosolic Crowding"
            >
              <span className="text-xs font-black">🌌</span>
            </button>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent text-[11px] font-mono text-slate-300 flex items-center justify-between">
              <span>Scientific 3D Model: Cell Landscape & Organelles</span>
              <span className="text-amber-300 font-bold">Active: {activeData.name}</span>
            </div>
          </div>

          {/* Quick Selector Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {ORGANELLES_DATA.map((o) => (
              <button
                key={o.id}
                onClick={() => handleOrganelleSelect(o.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                  selectedOrganelle === o.id
                    ? `bg-slate-900 ${o.text} ${o.border} shadow-lg scale-105`
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <span>{o.emoji}</span>
                <span>{o.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Deep-Dive Organelle Inspector Panel (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-5">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${activeData.bg} ${activeData.text} ${activeData.border}`}>
              {activeData.badge}
            </span>
            <span className="text-xs text-slate-400 font-mono">Organelle Inspector</span>
          </div>

          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{activeData.emoji}</span>
              <h3 className={`text-lg font-extrabold ${activeData.text}`}>
                {activeData.name}
              </h3>
            </div>

            <p className="text-slate-200 text-xs sm:text-sm font-semibold leading-relaxed">
              {activeData.summary}
            </p>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs sm:text-sm leading-relaxed text-slate-300 font-normal">
              <p>{activeData.description}</p>
            </div>

            {/* Cosmic Parallel Card */}
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-1.5 text-xs text-purple-200">
              <div className="font-extrabold text-purple-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Cosmic Universe Parallel:</span>
              </div>
              <p className="leading-relaxed font-normal">{activeData.cosmicParallel}</p>
            </div>

            {/* Zone 2 Connection */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1.5 text-xs text-emerald-200">
              <div className="font-extrabold text-emerald-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-emerald-400" />
                <span>Zone 2 Bioenergetics Secret:</span>
              </div>
              <p className="leading-relaxed font-normal">{activeData.details}</p>
            </div>

          </div>

        </div>

      </div>

      {/* Cellular Workers Callout Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/40 text-slate-100 space-y-4 shadow-xl">
        <div className="flex items-center gap-2.5 text-amber-400 font-extrabold text-lg">
          <Smile className="w-5 h-5 text-amber-400" />
          <span>Where/What are the "Humans" or "Workers" Inside the Cell?</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
          In a physical human factory, human workers carry boxes, operate machinery, and make executive decisions. Inside the cell, there are no miniature human beings—instead, <strong>Enzymes & Motor Proteins</strong> perform every single worker role autonomously!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm font-sans pt-2">
          
          {/* Worker 1: Kinesin */}
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-2">
            <div className="font-extrabold text-amber-300 text-sm flex items-center gap-2">
              <span>🚶 Kinesin Motor Proteins</span>
              <span className="text-[10px] bg-amber-400/20 px-2 py-0.5 rounded text-amber-300">The Delivery Workers</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-normal">
              <strong>They literally WALK on two legs!</strong> Kinesin has two globular feet that take physical 8-nanometer steps along microtubule highways at 100 steps per second, carrying heavy mitochondria and ATP cargo on their backs!
            </p>
          </div>

          {/* Worker 2: Enzymes */}
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-2">
            <div className="font-extrabold text-emerald-300 text-sm flex items-center gap-2">
              <span>🛠️ Enzyme Technicians</span>
              <span className="text-[10px] bg-emerald-400/20 px-2 py-0.5 rounded text-emerald-300">Machine Operators</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-normal">
              Enzymes like <strong>Citrate Synthase</strong> and <strong>Aconitase</strong> are specialized robot technicians. They grab incoming 2-carbon fat packages, snap them into 4-slot molds, and shear off carbon bonds to harvest electron energy.
            </p>
          </div>

          {/* Worker 3: PGC-1alpha */}
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-purple-500/30 space-y-2">
            <div className="font-extrabold text-purple-300 text-sm flex items-center gap-2">
              <span>📋 PGC-1α & DNA</span>
              <span className="text-[10px] bg-purple-400/20 px-2 py-0.5 rounded text-purple-300">The Plant Managers</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-normal">
              <strong>PGC-1α</strong> lives in the nuclear headquarters. Whenever you run in Zone 2, PGC-1α issues manufacturing orders (mRNA) to build hundreds of new mitochondrial power plants!
            </p>
          </div>

        </div>
      </div>

      {/* Cosmic Comparison Grid: Human Cell vs The Universe */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-slate-100 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-amber-300 font-extrabold text-lg">
            <Globe className="w-5 h-5 text-amber-400" />
            <span>Cellular Scale: Human Body vs. The Observable Universe</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs border border-amber-400/40">
            As Above, So Below
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm font-sans">
          
          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2">
            <div className="font-extrabold text-purple-300 text-sm flex items-center gap-2">
              <span>🌌 Galaxy Clusters</span>
              <ArrowRight className="w-4 h-4 text-purple-400" />
              <span>Human Body</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-normal">
              The observable universe contains <strong>~100 Billion Galaxies</strong>. Your body contains <strong>~37 Trillion to 100 Trillion Cells</strong>—meaning your physical body holds 1,000 times more individual living cells than there are galaxies in the visible cosmos!
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2">
            <div className="font-extrabold text-amber-300 text-sm flex items-center gap-2">
              <span>🪐 Solar Systems</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
              <span>Mitochondria</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-normal">
              Just as stars and solar systems orbit galaxy centers, <strong>100 to 2,000 mitochondria</strong> orbit the nucleus inside a single muscle cell, generating energy light continuously.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
            <div className="font-extrabold text-emerald-300 text-sm flex items-center gap-2">
              <span>💫 Universal Stars</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
              <span>Krebs Cycle Turns</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-normal">
              Astrophysicists count <strong>1 Sextillion ($10^{21}$) stars</strong> in the universe. During a Zone 2 run, your mitochondria complete <strong>1 Sextillion Krebs Cycle turns every single second</strong>!
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
