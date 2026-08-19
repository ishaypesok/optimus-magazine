import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, Flame, Activity, Zap, Droplet, Clock, 
  ChevronRight, ChevronLeft, Bookmark, Share2, Award, ArrowUpRight, 
  ShieldCheck, Heart, Layers, BarChart2, CheckCircle2, UserCheck
} from 'lucide-react';
import { ZONES, CHARACTERS } from '../data/metabolismData';
import FuelCharts from './FuelCharts';
import RunnerSimulation from './RunnerSimulation';
import AdaptationSimulator from './AdaptationSimulator';

export default function MagazineView({ currentZoneId, setCurrentZoneId, activeArticle, setActiveArticle }) {
  const [internalPage, setInternalPage] = useState(1);
  const activePage = (activeArticle && activeArticle !== 'all') ? activeArticle : internalPage;
  const totalPages = 5;

  const zone2 = ZONES.find(z => z.id === 2) || ZONES[1];
  const currentZone = ZONES.find(z => z.id === currentZoneId) || zone2;

  const setPage = (page) => {
    setInternalPage(page);
    if (setActiveArticle) setActiveArticle(page);
  };

  const nextPage = () => setPage(Math.min(activePage + 1, totalPages));
  const prevPage = () => setPage(Math.max(activePage - 1, 1));

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      
      {/* Magazine Cover & Masthead Banner */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 p-8 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          {/* Masthead Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-500/20 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-spin-slow" />
                <span>Special Digital Edition • Vol. I, Issue 01</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-white font-serif mt-1">
                ZONE 2 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">REVIEW</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                Cellular Longevity & Bioenergetics
              </span>
              <button 
                onClick={() => window.print()}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Print Edition</span>
              </button>
            </div>
          </div>

          {/* Magazine Hero Feature Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center pt-2">
            <div className="lg:col-span-2 space-y-4">
              <span className="inline-block px-3 py-1 rounded-md bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider">
                Cover Feature Story
              </span>
              <h2 className="text-2xl lg:text-4xl font-bold font-serif text-white leading-tight">
                The Cellular Secret to Infinite Endurance & Mitochondrial Health
              </h2>
              <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
                Why world-class endurance athletes, cardiologists, and longevity researchers are prioritizing Zone 2 training above all else. Explore the bioenergetics of FatMax, lactate shuttles, and mitochondrial biogenesis.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 font-mono">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-400" /> 12 Min Read</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-teal-400" /> Peer-Reviewed Physiology</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5 text-cyan-400" /> Interactive Experiments</span>
              </div>
            </div>

            {/* Live Issue Stats Card */}
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-emerald-500/30 space-y-4 shadow-xl">
              <div className="text-xs uppercase font-mono text-emerald-400 font-bold tracking-wider">
                Issue Key Metrics
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Peak FatOx</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono">0.65 g/min</div>
                  <div className="text-[9px] text-slate-500">Maximum Lipid Burn</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Lactate Steady</div>
                  <div className="text-xl font-bold text-teal-300 font-mono">1.5 - 2.0 mM</div>
                  <div className="text-[9px] text-slate-500">Zero Acidosis</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">ATP Yield</div>
                  <div className="text-xl font-bold text-yellow-300 font-mono">~106-120</div>
                  <div className="text-[9px] text-slate-500">Per Lipid Molecule</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Transporter</div>
                  <div className="text-xl font-bold text-cyan-300 font-mono">CPT-1 & MCT-1</div>
                  <div className="text-[9px] text-slate-500">Mitochondrial Import</div>
                </div>
              </div>
            </div>
          </div>

          {/* Magazine Table of Contents Page Selector */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-800">
            <span className="text-xs font-mono text-slate-400 font-semibold">CONTENTS / PAGES:</span>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 1, label: '01. Cover Story: FATmax' },
                { id: 2, label: '02. Cellular Powerhouse' },
                { id: 3, label: '03. The Lactate Paradox' },
                { id: 4, label: '04. 1-Hour Runner Study' },
                { id: 5, label: '05. Longevity Protocols' },
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setPage(p.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activePage === p.id
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </header>

      {/* PAGE 1: COVER STORY - FATMAX & AEROBIC METABOLISM */}
      {activePage === 1 && (
        <article className="space-y-8 animate-fade-in">
          
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-10 space-y-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                ARTICLE 01 • PHYSIOLOGY DEEP DIVE
              </span>
              <span className="text-xs text-slate-500">• By Bioenergetics Research Group</span>
            </div>

            <h2 className="text-3xl lg:text-5xl font-black font-serif text-slate-100 leading-tight">
              The Science of FATmax: Why Zone 2 is the Ultimate Metabolic Engine
            </h2>

            {/* Editorial Multi-column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 leading-relaxed text-slate-300 text-sm lg:text-base">
              <div className="space-y-4">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-emerald-400 first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                  When exercise intensity is maintained at roughly 60% to 70% of maximal heart rate, human skeletal muscle experiences a sweet spot in substrate utilization known as <strong>FATmax</strong>. At this exact metabolic state, fatty acid oxidation peaks in absolute rate (grams per minute).
                </p>
                <p>
                  Unlike carbohydrates, which are stored in limited quantities (~400-500g of glycogen in liver and muscle), fat stores are virtually infinite—even in lean athletes. In Zone 2, Free Fatty Acids (FFAs) cross the mitochondrial double membrane through the <strong>CPT-1 (Carnitine Palmitoyltransferase I)</strong> gatekeeper.
                </p>
                <div className="p-4 rounded-2xl bg-emerald-950/30 border-l-4 border-emerald-400 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">Key Takeaway</span>
                  <p className="text-xs text-emerald-200 font-serif italic">
                    "High blood glucose and elevated insulin suppress CPT-1 activity. Zone 2 training under low-to-moderate insulin conditions optimizes fat oxidation pathways."
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p>
                  Inside the mitochondrial matrix, fatty acids undergo <strong>Beta-Oxidation</strong>, a spiral pathway that continuously shears off 2-carbon units to produce <em>Acetyl-CoA</em>. This Acetyl-CoA directly feeds the <strong>Krebs (Citric Acid) Cycle</strong> without overloading pyruvate dehydrogenase or generating hydrogen ion accumulation.
                </p>
                <p>
                  Because Oxygen (O₂) is available in abundant supply during Zone 2, the Electron Transport Chain operates at peak efficiency. Every single palmitate molecule (16-carbon fatty acid) yields approximately <strong>106 to 120 ATP molecules</strong>, alongside metabolic water (H₂O) and carbon dioxide (CO₂).
                </p>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                    <span>Substrate Efficiency Comparison</span>
                    <span className="text-emerald-400 font-mono">Zone 2 Peak</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex justify-between"><span>Fat Oxidation Yield:</span><strong className="text-emerald-300">~106-120 ATP / molecule</strong></div>
                    <div className="flex justify-between"><span>Glucose Oxidation Yield:</span><strong className="text-amber-300">~32-34 ATP / molecule</strong></div>
                    <div className="flex justify-between"><span>Anaerobic Glycolysis:</span><strong className="text-rose-400">2 ATP / molecule + Lactate + H⁺</strong></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Live Fuel Charts */}
            <div className="pt-6 border-t border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-serif text-slate-100 flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-emerald-400" />
                  Interactive Magazine Chart: Fuel Dynamics across Heart Rate Zones
                </h3>
                <span className="text-xs text-slate-400">Select intensity below to test live bioenergetics</span>
              </div>
              <FuelCharts currentZoneId={currentZoneId} />
            </div>

          </div>

        </article>
      )}

      {/* PAGE 2: CELLULAR POWERHOUSE & ADAPTATIONS */}
      {activePage === 2 && (
        <article className="space-y-8 animate-fade-in">
          
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-10 space-y-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 font-mono text-xs font-bold border border-teal-500/30">
                ARTICLE 02 • CELLULAR BIOGENESIS
              </span>
              <span className="text-xs text-slate-500">• Mitochondrial Density & Capillary Network</span>
            </div>

            <h2 className="text-3xl lg:text-5xl font-black font-serif text-slate-100 leading-tight">
              Building the Cellular Engine: PGC-1α & Angiogenesis
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 space-y-4 text-slate-300 text-sm lg:text-base leading-relaxed">
                <p>
                  Chronic adaptation to Zone 2 training is governed by the cellular master regulator <strong>PGC-1α (Peroxisome proliferator-activated receptor gamma coactivator 1-alpha)</strong>. When slow-twitch (Type I) muscle fibers sustain moderate contraction for extended durations, intracellular calcium fluxes and AMPK activation trigger PGC-1α transcription.
                </p>
                <p>
                  This signal instructs the muscle cells to undergo <strong>Mitochondrial Biogenesis</strong>—building new mitochondria and expanding existing networks. Concurrently, Zone 2 stimulates <strong>Angiogenesis</strong>, increasing capillary density around muscle fibers to deliver oxygen and fatty acids directly to the mitochondrial doorsteps.
                </p>

                {/* Character Feature Grid */}
                <div className="pt-4 space-y-3">
                  <h3 className="text-base font-bold text-white font-serif">Key Metabolic Characters in Zone 2</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CHARACTERS.map((char) => (
                      <div key={char.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 hover:border-emerald-500/40 transition">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{char.avatar}</span>
                          <div>
                            <div className="text-xs font-bold text-slate-100">{char.name}</div>
                            <div className="text-[10px] text-emerald-400 font-mono">{char.role}</div>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{char.zone2Behavior}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Magazine Callout */}
              <div className="bg-gradient-to-b from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
                <h3 className="text-base font-bold text-emerald-400 uppercase font-mono tracking-wider">
                  Mitochondrial Adaptations
                </h3>

                <ul className="space-y-4 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Mitochondrial Density:</strong> Increases functional surface area for Beta-Oxidation and Electron Transport Chain enzymes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Enzymatic Upregulation:</strong> Enhances Citrate Synthase and CPT-1 enzyme concentrations by up to 40%.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Capillarity:</strong> Increases capillary-to-fiber ratio, shortening O₂ diffusion distances.</span>
                  </li>
                </ul>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                  ⚡ <strong>Long-term Longevity Benefit:</strong> Preserves mitochondrial health, mitigating metabolic dysfunction, insulin resistance, and age-related fatigue.
                </div>
              </div>

            </div>

            {/* Embedded Adaptation Simulator */}
            <div className="pt-6 border-t border-slate-800">
              <AdaptationSimulator />
            </div>

          </div>

        </article>
      )}

      {/* PAGE 3: THE LACTATE PARADOX */}
      {activePage === 3 && (
        <article className="space-y-8 animate-fade-in">
          
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-10 space-y-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
                ARTICLE 03 • INVESTIGATIVE REPORT
              </span>
              <span className="text-xs text-slate-500">• Debunking Lactate Myths & The Shuttle Concept</span>
            </div>

            <h2 className="text-3xl lg:text-5xl font-black font-serif text-slate-100 leading-tight">
              The Lactate Paradox: Demolishing Old Myths
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-300 text-sm lg:text-base leading-relaxed">
              <div className="space-y-4">
                <p>
                  For decades, lactate was mistakenly labeled as a toxic metabolic waste product responsible for muscle soreness and fatigue. Modern sports biochemistry has thoroughly disproven this concept.
                </p>
                <p>
                  Lactate is actually a <strong>high-energy metabolic intermediate and signaling molecule</strong>. During muscle contraction, glycolytic fibers (Type II) convert glucose into pyruvate and lactate. Through the <strong>Intracellular and Intercellular Lactate Shuttle</strong> (via MCT-1 and MCT-4 transporters), lactate is transported into oxidative Type I fibers.
                </p>
              </div>

              <div className="space-y-4">
                <p>
                  In Zone 2, your slow-twitch muscle fibers possess so many mitochondria and high lactate dehydrogenase (LDH) activity that <strong>lactate clearance perfectly matches lactate production</strong>.
                </p>
                <p>
                  Blood lactate levels remain stable around <strong>1.5 to 2.0 mmol/L</strong>. This steady state ensures that hydrogen ions (H⁺) are buffered cleanly, avoiding muscular acidosis while recycling lactate into energy.
                </p>
              </div>
            </div>

            {/* Infographic Comparison Spread */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold font-serif text-lg">
                  <ShieldCheck className="w-5 h-5" />
                  Zone 2 Lactate Balance
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li>• Lactate Production = Lactate Clearance (~1.5 mM)</li>
                  <li>• MCT-1 Transporters shuttle lactate into mitochondria</li>
                  <li>• Zero muscle burning; sustainable for hours</li>
                  <li>• High oxidative capacity buffers all hydrogen ions</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold font-serif text-lg">
                  <Zap className="w-5 h-5" />
                  Zone 4/5 Anaerobic Spillover
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li>• Lactate Production &gt;&gt; Clearance (&gt; 4.0 mM)</li>
                  <li>• Pyruvate overflows glycolytic capacity</li>
                  <li>• Hydrogen ions (H⁺) accumulate, lowering intracellular pH</li>
                  <li>• Causes muscular acidosis, pain, and forced stoppage</li>
                </ul>
              </div>
            </div>

          </div>

        </article>
      )}

      {/* PAGE 4: 1-HOUR RUNNER LIVE EXPERIMENT */}
      {activePage === 4 && (
        <article className="space-y-8 animate-fade-in">
          
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-10 space-y-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                ARTICLE 04 • INTERACTIVE FIELD STUDY
              </span>
              <span className="text-xs text-slate-500">• Live 60-Minute Runner Simulation</span>
            </div>

            <div>
              <h2 className="text-3xl lg:text-5xl font-black font-serif text-slate-100 leading-tight">
                The 1-Hour Zone 2 Runner: Real-Time Field Simulation
              </h2>
              <p className="text-slate-300 text-sm lg:text-base mt-2 max-w-3xl">
                Experience how heart rate, fat vs. carbohydrate oxidation, glycogen depletion, and lactate levels evolve over a 60-minute session. Adjust the intensity slider to compare Zone 2 endurance with high-intensity fatigue.
              </p>
            </div>

            {/* Embedded Live Runner Simulator */}
            <div className="pt-2">
              <RunnerSimulation />
            </div>

          </div>

        </article>
      )}

      {/* PAGE 5: LONGEVITY PROTOCOLS & PRACTICAL GUIDE */}
      {activePage === 5 && (
        <article className="space-y-8 animate-fade-in">
          
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-10 space-y-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                ARTICLE 05 • PRACTICAL PROTOCOL
              </span>
              <span className="text-xs text-slate-500">• Training Guidelines & Execution</span>
            </div>

            <h2 className="text-3xl lg:text-5xl font-black font-serif text-slate-100 leading-tight">
              Mastering the Conversational Pace: Practical Guidelines
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-serif text-white">The Talk Test</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You should be able to speak in full, complete sentences without gasping for air. If you can only utter a few words at a time, you have drifted into Zone 3 or 4.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-300">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-serif text-white">Weekly Volume</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Aim for 3 to 4 sessions of 45–90 minutes per week (totaling 3 to 5 hours). Consistency is key to driving PGC-1α mitochondrial biogenesis signals.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-300">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-serif text-white">Heart Rate Formula</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Typically 60–70% of Maximum Heart Rate (HRmax) or calculated via Maffetone formula: <em>180 minus your age</em> (adjusted for fitness level).
                </p>
              </div>

            </div>

            {/* Protocol Summary Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-950 border border-emerald-500/30 space-y-4">
              <h3 className="text-xl font-bold font-serif text-white">
                The 80/20 Endurance Paradigm
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Modern exercise physiology recommends structuring your total training volume into <strong>80% low-intensity Zone 2 aerobic base</strong> and <strong>20% high-intensity interval training (Zone 5)</strong>. This avoids the "gray zone" of chronic fatigue while building peak metabolic resilience.
              </p>
            </div>

          </div>

        </article>
      )}

      {/* Magazine Page Reader Navigation Controls */}
      <footer className="flex items-center justify-between bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
        <button
          onClick={prevPage}
          disabled={activePage === 1}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-xs font-semibold transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Article</span>
        </button>

        <div className="text-xs font-mono text-slate-400">
          Page <strong className="text-emerald-400">{activePage}</strong> of <strong>{totalPages}</strong>
        </div>

        <button
          onClick={nextPage}
          disabled={activePage === totalPages}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 text-xs font-bold transition"
        >
          <span>Next Article</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

    </div>
  );
}
