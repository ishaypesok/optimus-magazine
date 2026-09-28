import React, { useState } from 'react';
import { 
  Zap, Activity, Heart, Flame, ShieldCheck, ExternalLink, ChevronRight, ChevronLeft, 
  ZoomIn, Maximize2, X, CheckCircle2, AlertTriangle, Layers, ArrowRight, Dna, Info, RefreshCw, BarChart2
} from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: 'Zone 2 Metabolic Equilibrium',
    subtitle: 'High mitochondrial stimulation with full substrate oxidation and stable blood lactate (~1-2 mM)',
    src: './sanmillan-zone2-slide-1.jpg',
    alt: 'Zone 2 Metabolic Equilibrium — Dr. Iñigo San Millán Slide 1',
    badge: '1. Whole-Body Equilibrium',
    keyPoints: [
      { label: 'High Mitochondrial Demand', text: 'Mitochondria operate at maximum aerobic capacity, completely oxidizing both carbohydrates and fatty acids.' },
      { label: 'Full Glycolytic Accommodation', text: 'Pyruvate generated from cytosolic glycolysis is 100% transported and oxidized inside the mitochondrial matrix.' },
      { label: 'Peak Fat Oxidation (FatMax)', text: 'Maximal lipolysis in adipose tissue and peak mitochondrial fatty acid uptake (FAT/CD36 & CPT-1).' },
      { label: 'Equilibrium Clearance', text: 'Lactate production perfectly equals lactate oxidation and clearance via intra- and extra-cellular shuttles (~1-2 mM).' }
    ]
  },
  {
    id: 2,
    title: 'Substrates at Zone 2',
    subtitle: 'Integrated substrate metabolism in skeletal muscle — Carbs & Fats in perfect balance',
    src: './sanmillan-zone2-slide-2.jpg',
    alt: 'Substrates at Zone 2 — Dr. Iñigo San Millán Slide 2',
    badge: '2. Substrate Flux & Gates',
    keyPoints: [
      { label: 'Carbohydrate Pathway', text: 'Contraction- and insulin-mediated GLUT4 uptake feeds glycolysis. Pyruvate passes cleanly through MPC (mitochondrial pyruvate carrier) into Krebs cycle.' },
      { label: 'Fat Pathway (FatMax)', text: 'Fatty acids transported via FAT/CD36, transported through outer/inner membranes via CPT-1 & CPT-2, feeding Beta-Oxidation.' },
      { label: 'Flexible Fuel Integration', text: 'Highest total oxidative phosphorylation with minimal excess lactate formation; stable, sustainable energy production.' }
    ]
  },
  {
    id: 3,
    title: 'Lactate Shuttles at Equilibrium',
    subtitle: 'Intracellular and extracellular lactate shuttles maintain stable redox & muscle pH',
    src: './sanmillan-zone2-slide-3.jpg',
    alt: 'Zone 2: Lactate Shuttles at Equilibrium — Dr. Iñigo San Millán Slide 3',
    badge: '3. Shuttles & Redox',
    keyPoints: [
      { label: 'Intracellular Shuttle (Type II → Type I)', text: 'Fast-twitch (Type II) fibers export lactate via MCT4; adjacent slow-twitch (Type I) oxidative fibers take it up via MCT1, where LDH converts it to pyruvate to burn for ATP.' },
      { label: 'Extracellular Shuttle (Systemic Fuel)', text: 'Lactate circulates to the Heart, Brain, oxidative muscles, and Liver (gluconeogenesis/Cori cycle). Lactate is a primary fuel, never a waste product!' },
      { label: 'Redox (NAD⁺/NADH) & pH Stability', text: 'NAD⁺/NADH ratio remains balanced. Hydrogen ions (H⁺) are formed but cleared steadily, preventing cellular acidosis and muscle fatigue.' }
    ]
  },
  {
    id: 4,
    title: 'Leaving Zone 2: Metabolic Drift',
    subtitle: 'When glycolytic flux exceeds transport capacity, equilibrium breaks and fatigue accelerates',
    src: './sanmillan-zone2-slide-4.jpg',
    alt: 'Leaving Zone 2: Metabolic Drift — Dr. Iñigo San Millán Slide 4',
    badge: '4. The Drift Threshold',
    keyPoints: [
      { label: 'MPC Carrier Bottleneck', text: 'Cytosolic glycolysis outpaces mitochondrial oxidative capacity. Pyruvate entry through the MPC is rate-limiting and cannot keep pace.' },
      { label: 'Redox Stress & Acidosis', text: 'Excess pyruvate is reduced to lactate by LDH to regenerate NAD⁺. H⁺ ions accumulate, muscle pH drops, and acidosis impairs cross-bridge contraction.' },
      { label: 'Shuttle Overload & Fat Suppression', text: 'The intracellular lactate shuttle is overwhelmed. High lactate levels inhibit CPT-1, crashing fat oxidation. Metabolic drift sets in.' }
    ]
  }
];

export default function SanMillanZone2MetabolicState() {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStateTab, setActiveStateTab] = useState('equilibrium'); // 'equilibrium' | 'drift'

  const currentSlide = SLIDES[activeSlideIdx];

  const nextSlide = () => setActiveSlideIdx((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setActiveSlideIdx((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">
      
      {/* Article Header & Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-950 font-bold text-xs uppercase tracking-wider border border-emerald-300 inline-flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-emerald-700" />
            Article 39 • Groundbreaking Synthesis
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 font-bold text-xs uppercase tracking-wider border border-blue-200 inline-flex items-center gap-1.5">
            🔬 30-Year Physiology Milestone
          </span>
          <a
            href="https://x.com/doctorinigo/status/2104553589335040125"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-white text-xs font-bold hover:bg-black transition shadow-xs"
          >
            <span className="font-mono text-[12px]">𝕏</span>
            <span>View Original Post on X</span>
            <ExternalLink className="w-3 h-3 text-stone-300" />
          </a>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
          What is Zone 2?{' '}
          <span className="text-emerald-700">Metabolic Equilibrium vs. Metabolic Drift</span>
        </h1>
        <p className="text-stone-600 text-base sm:text-lg font-normal leading-relaxed max-w-4xl">
          World-renowned systems physiologist <strong>Dr. Iñigo San Millán</strong> synthesizes 30 years of muscle metabolism, lactate kinetics, and elite endurance coaching into a definitive visual manifesto. Zone 2 is not just a heart rate or pace—<strong>it is a physiological state of cellular equilibrium</strong>.
        </p>

        {/* Dr. Iñigo San Millán Author Profile Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-stone-900 text-white border border-stone-800 shadow-md">
          <div className="flex items-center gap-3.5">
            <img
              src="https://pbs.twimg.com/profile_images/2010643137417347072/uj9F7xEs_200x200.jpg"
              alt="Dr. Iñigo San Millán"
              className="w-12 h-12 rounded-full border-2 border-emerald-400 object-cover shrink-0"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=120&q=80';
              }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base">Dr. Iñigo San Millán, PhD</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                  Verified Physiologist
                </span>
              </div>
              <p className="text-stone-300 text-xs mt-0.5">
                Associate Professor of Medicine (Univ. of Colorado) • Coach to Tour de France Champion Tadej Pogačar • 30+ Years of Bioenergetics Research
              </p>
            </div>
          </div>
          <div className="text-right text-[11px] font-mono text-stone-400 shrink-0">
            <div>Published: September 28, 2026</div>
            <div className="text-emerald-400 font-semibold">#Zone2 #MetabolicEquilibrium #MetabolicDrift</div>
          </div>
        </div>
      </div>

      {/* The Core Manifesto Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-stone-900 to-teal-950 text-white border border-emerald-600/40 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          The Bioenergetic Definition of Zone 2
        </div>
        <blockquote className="text-lg sm:text-2xl font-serif italic text-emerald-50 leading-relaxed border-l-4 border-emerald-500 pl-4">
          “For me, Zone 2 is not simply a heart rate, power output, pace or lactate number… <span className="text-emerald-300 font-sans font-black not-italic underline decoration-emerald-500 underline-offset-4">It is a METABOLIC STATE</span>. 
          It is the intensity at which mitochondrial and bioenergetic demand is the highest, while the cell can still maintain <span className="text-emerald-300 font-sans font-black not-italic">METABOLIC EQUILIBRIUM</span>. 
          And when that equilibrium begins to break, we start moving away from Zone 2 and into what I describe as <span className="text-amber-400 font-sans font-black not-italic">METABOLIC DRIFT</span>.”
        </blockquote>
        <div className="text-right text-xs font-mono text-emerald-300 font-bold">
          — Dr. Iñigo San Millán (Sep 28, 2026)
        </div>
      </div>

      {/* Main Interactive Slide Carousel Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-700" />
              The 4 Scientific Carousel Slides (Guided by Dr. San Millán)
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Click any slide tab or use navigation arrows. Tap the infographic to view in high-resolution full screen.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 transition shadow-2xs text-stone-700"
              title="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-900 rounded-lg border border-emerald-200">
              Slide {activeSlideIdx + 1} / {SLIDES.length}
            </span>
            <button
              onClick={nextSlide}
              className="p-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 transition shadow-2xs text-stone-700"
              title="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Selection Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setActiveSlideIdx(idx)}
              className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between gap-1.5 ${
                activeSlideIdx === idx
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500/30'
                  : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${activeSlideIdx === idx ? 'text-emerald-200' : 'text-stone-500'}`}>
                {slide.badge}
              </span>
              <span className="text-xs font-extrabold line-clamp-1">
                {slide.title}
              </span>
            </button>
          ))}
        </div>

        {/* Active Slide Display & In-depth Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Slide Infographic Card */}
          <div className="lg:col-span-7 bg-black rounded-3xl overflow-hidden border border-stone-300 shadow-xl relative group">
            <div className="relative aspect-[4/5] sm:aspect-[4/4.8] w-full bg-stone-950 flex items-center justify-center">
              <img
                src={currentSlide.src}
                alt={currentSlide.alt}
                className="w-full h-full object-contain cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
                onClick={() => setIsModalOpen(true)}
              />
              
              {/* Fullscreen Overlay Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="absolute bottom-4 right-4 bg-black/80 hover:bg-black text-white px-3 py-1.5 rounded-xl border border-white/20 text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs transition shadow-lg"
              >
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Enlarge High-Res</span>
              </button>
            </div>
            
            <div className="p-4 bg-stone-900 text-white flex items-center justify-between text-xs border-t border-stone-800">
              <span className="font-bold text-emerald-400">{currentSlide.title}</span>
              <span className="text-stone-400 font-mono">Infographic {currentSlide.id} of 4</span>
            </div>
          </div>

          {/* Accompanying Scientific Breakdown */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase">
                  Scientific Breakdown • {currentSlide.badge}
                </span>
                <h3 className="text-xl font-black text-stone-900 leading-tight">
                  {currentSlide.title}
                </h3>
                <p className="text-xs text-stone-600 font-medium">
                  {currentSlide.subtitle}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {currentSlide.keyPoints.map((point, pIdx) => (
                  <div key={pIdx} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                    <div className="text-xs font-extrabold text-stone-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                      {point.label}
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      {point.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">Navigate slides:</span>
                <div className="flex gap-2">
                  <button
                    onClick={prevSlide}
                    className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 font-bold text-stone-800 text-xs transition"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={nextSlide}
                    className="px-3 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 font-bold text-white text-xs transition"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Context Card */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 text-xs space-y-2">
              <div className="font-extrabold flex items-center gap-1.5 text-blue-900">
                <Info className="w-4 h-4 text-blue-700" />
                Why This Explains Ishai's Wingate Lab Test
              </div>
              <p className="text-blue-900/90 leading-relaxed">
                In Ishai's Wingate Sports Medicine lab test, his aerobic threshold was validated between <strong>101 and 120 BPM</strong>. When Ishai runs at 115 BPM, his cells remain in <em>Metabolic Equilibrium</em>—clearing lactate, burning fat via CPT-1, and maintaining cellular pH. If he surges above 120 BPM, he enters <em>Metabolic Drift</em>!
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Simulator: Equilibrium vs. Drift */}
      <section className="p-6 sm:p-8 rounded-3xl bg-stone-900 text-white border border-stone-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Interactive Physiological Comparator
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Metabolic Equilibrium vs. Metabolic Drift
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              Toggle between the two states to compare what occurs inside the muscle fibers, blood, and mitochondria.
            </p>
          </div>
          <div className="flex p-1 bg-stone-800 rounded-2xl border border-stone-700 shrink-0">
            <button
              onClick={() => setActiveStateTab('equilibrium')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeStateTab === 'equilibrium'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Zone 2: Equilibrium
            </button>
            <button
              onClick={() => setActiveStateTab('drift')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeStateTab === 'drift'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              Above Zone 2: Drift
            </button>
          </div>
        </div>

        {/* Dynamic Comparison Grid */}
        {activeStateTab === 'equilibrium' ? (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm">
              <strong className="text-white">State 1: Metabolic Equilibrium (Zone 2 — 101 to 120 BPM in Ishai)</strong>
              <p className="mt-1 text-emerald-300/90 font-normal">
                Mitochondrial oxidative phosphorylation is operating at maximum sustainable capacity without exceeding transport limits. Carbohydrates and fats are fully oxidized, with zero cumulative acidification.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
                <div className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider">Substrate Flux</div>
                <div className="text-base font-black text-white">Full Pyruvate Entry (MPC)</div>
                <p className="text-stone-300 font-normal">
                  Pyruvate enters mitochondria smoothly via the MPC carrier. No excess cytosolic accumulation.
                </p>
                <div className="pt-2 text-emerald-300 font-mono font-bold">FATmax: ~0.65 g/min</div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
                <div className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider">Lactate Kinetics</div>
                <div className="text-base font-black text-white">Production = Oxidation</div>
                <p className="text-stone-300 font-normal">
                  Type II fibers export lactate via MCT4; Type I fibers absorb and clear it via MCT1 + LDH.
                </p>
                <div className="pt-2 text-emerald-300 font-mono font-bold">Blood Lactate: 1.0 – 1.8 mM</div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
                <div className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider">Cellular Homeostasis</div>
                <div className="text-base font-black text-white">Stable Redox (NAD⁺/NADH)</div>
                <p className="text-stone-300 font-normal">
                  Protons (H⁺) are cleared without accumulating. Intracellular pH is stable; contraction force is preserved.
                </p>
                <div className="pt-2 text-emerald-300 font-mono font-bold">Sustainability: Hours on end</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs sm:text-sm">
              <strong className="text-white">State 2: Metabolic Drift (Above Zone 2 — e.g. 125 – 150+ BPM)</strong>
              <p className="mt-1 text-amber-300/90 font-normal">
                Glycolytic flux outpaces mitochondrial transport capacity. Pyruvate backs up in the cytosol, forcing conversion to lactate, draining NAD⁺ availability, and causing progressive acidosis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
                <div className="text-amber-400 font-bold uppercase text-[10px] tracking-wider">Substrate Flux</div>
                <div className="text-base font-black text-white">MPC Carrier Bottleneck</div>
                <p className="text-stone-300 font-normal">
                  Mitochondria cannot accept the excess pyruvate flood. CPT-1 is inhibited, crashing fat oxidation.
                </p>
                <div className="pt-2 text-amber-300 font-mono font-bold">Fat Burn: Drops to &lt;0.2 g/min</div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
                <div className="text-amber-400 font-bold uppercase text-[10px] tracking-wider">Lactate Kinetics</div>
                <div className="text-base font-black text-white">Shuttle Overwhelmed</div>
                <p className="text-stone-300 font-normal">
                  Type II fiber export overwhelms Type I oxidative capacity. Excess spills into circulation.
                </p>
                <div className="pt-2 text-amber-300 font-mono font-bold">Blood Lactate: 2.5 – 6.0+ mM</div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
                <div className="text-amber-400 font-bold uppercase text-[10px] tracking-wider">Cellular Homeostasis</div>
                <div className="text-base font-black text-white">Acidosis & Redox Stress</div>
                <p className="text-stone-300 font-normal">
                  H⁺ accumulates, intracellular pH drops, inhibiting actin-myosin contraction. Fatigue is inevitable.
                </p>
                <div className="pt-2 text-amber-300 font-mono font-bold">Sustainability: Limited minutes</div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Practical Takeaways for Longevity 65+ Runners */}
      <section className="p-6 sm:p-8 rounded-3xl bg-emerald-50 border border-emerald-300 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
            Practical Implementation for Ishai (Optimus 65+)
          </span>
          <h2 className="text-2xl font-black text-stone-900">
            How to Apply Dr. San Millán's Breakthrough in Your Running
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-normal">
            Why staying within the 101–120 BPM ceiling protects your cellular machinery and maximizes mitochondrial biogenesis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-5 rounded-2xl bg-white border border-emerald-200 space-y-2 shadow-2xs">
            <div className="font-extrabold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              1. Guard Your 120 BPM Ceiling
            </div>
            <p className="text-stone-600 leading-relaxed font-normal">
              When running at 115 BPM, your cells are in full <strong>Metabolic Equilibrium</strong>. If you let your heart rate drift past 120 BPM on an uphill slope, your MPC transporters saturate and you slip into <strong>Metabolic Drift</strong>. Slow down immediately to restore balance.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-emerald-200 space-y-2 shadow-2xs">
            <div className="font-extrabold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              2. Stimulate Type I Lactate Clearance (MCT1)
            </div>
            <p className="text-stone-600 leading-relaxed font-normal">
              Running continuously for 50–70 minutes in Zone 2 forces your slow-twitch oxidative fibers to upregulate <strong>MCT1 transporters</strong> and mitochondrial density, multiplying your lifelong lactate clearance capacity.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-emerald-200 space-y-2 shadow-2xs">
            <div className="font-extrabold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              3. Maximize Fat Oxidation (FatMax)
            </div>
            <p className="text-stone-600 leading-relaxed font-normal">
              Fat oxidation relies on CPT-1 and CPT-2 enzymes, which are inhibited as soon as lactate spikes. By training strictly in Zone 2 equilibrium, you preserve peak fat burning (up to 0.65 g/min) and spare glycogen.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-emerald-200 space-y-2 shadow-2xs">
            <div className="font-extrabold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              4. Zero Acidosis = Rapid 48-Hour Recovery
            </div>
            <p className="text-stone-600 leading-relaxed font-normal">
              Because pH remains stable and H⁺ ions do not accumulate during equilibrium runs, cellular stress remains restorative. This supports Ishai's 48-hour recovery rhythm between runs at age 79 without systemic inflammation.
            </p>
          </div>
        </div>
      </section>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col p-4 sm:p-6 transition-all"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="flex items-center justify-between text-white pb-3 max-w-5xl w-full mx-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-mono text-xs font-bold px-2.5 py-1 rounded bg-stone-800">
                Slide {currentSlide.id} / 4
              </span>
              <h3 className="font-extrabold text-sm sm:text-base text-white">
                {currentSlide.title}
              </h3>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition"
              title="Close Fullscreen View"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center max-w-5xl w-full mx-auto overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img
              src={currentSlide.src}
              alt={currentSlide.alt}
              className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />
          </div>

          <div className="flex items-center justify-center gap-4 pt-3" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={prevSlide}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Slide
            </button>
            <button
              onClick={nextSlide}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition"
            >
              Next Slide <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </article>
  );
}
