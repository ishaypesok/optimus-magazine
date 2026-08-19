import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, Flame, Activity, Zap, Droplet, Clock, 
  ChevronRight, ChevronLeft, Bookmark, Share2, Award, ArrowUpRight, 
  ShieldCheck, Heart, Layers, BarChart2, CheckCircle2, UserCheck, Printer
} from 'lucide-react';
import { ZONES, CHARACTERS } from '../data/metabolismData';
import FuelCharts from './FuelCharts';
import RunnerSimulation from './RunnerSimulation';
import AdaptationSimulator from './AdaptationSimulator';

export default function MagazineView({ currentZoneId, setCurrentZoneId, activeArticle, setActiveArticle }) {
  const [internalPage, setInternalPage] = useState(1);
  const activePage = (activeArticle && typeof activeArticle === 'number') ? activeArticle : internalPage;
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
    <div className="space-y-6 animate-fade-in text-stone-900">
      
      {/* Friendly Magazine Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-stone-800 text-white rounded-3xl p-6 lg:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-mono tracking-widest text-emerald-200">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>OPTIMUS MAGAZINE • SPECIAL ISSUE #01</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold font-serif">
              The Friendly Guide to Zone 2 Bioenergetics
            </h1>
            <p className="text-emerald-100 text-xs lg:text-sm max-w-2xl font-serif italic">
              Explore cellular metabolism, fat oxidation, and longevity science page by page in a warm, clear format.
            </p>
          </div>

          {/* Page Turn Pill Controls */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
            <button
              onClick={prevPage}
              disabled={activePage === 1}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 disabled:opacity-40 text-white transition"
              title="Previous Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="px-3 text-center text-xs font-mono font-bold text-emerald-100">
              PAGE {activePage} / {totalPages}
            </div>

            <button
              onClick={nextPage}
              disabled={activePage === totalPages}
              className="p-2 rounded-xl bg-white text-emerald-950 hover:bg-emerald-100 font-bold disabled:opacity-40 transition shadow-sm"
              title="Next Page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* MAGAZINE PAGE CONTAINER (Clean Ivory Paper Sheet) */}
      <main className="magazine-page p-6 sm:p-10 lg:p-14 space-y-8 relative">
        
        {/* Page Top Header Bar */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 text-xs text-stone-500 font-mono">
          <div className="flex items-center gap-2 font-bold text-emerald-800">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>OPTIMUS MAGAZINE • PAGE {activePage} OF {totalPages}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-stone-400">
            <span>Vol. I, Issue 01</span>
            <span>•</span>
            <span>Metabolic Health Press</span>
          </div>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-1 text-stone-600 hover:text-emerald-700 font-medium transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print Page</span>
          </button>
        </div>

        {/* ==================== PAGE 1: COVER STORY ==================== */}
        {activePage === 1 && (
          <article className="space-y-8 animate-fade-in">
            
            <div className="space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider border border-emerald-200">
                Page 1 • Cover Story
              </span>
              <h2 className="text-3xl lg:text-5xl font-black font-serif text-stone-900 leading-tight">
                The Science of FATmax: Why Zone 2 is the Ultimate Metabolic Engine
              </h2>
              <p className="text-stone-600 text-sm lg:text-base font-serif italic">
                By Bioenergetics Science Group • 8 Min Read
              </p>
            </div>

            {/* Editorial Multi-column Paper Spread */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-stone-800 text-sm lg:text-base leading-relaxed">
              <div className="space-y-4">
                <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-emerald-800 first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                  When exercise intensity is maintained at roughly 60% to 70% of maximal heart rate, human skeletal muscle experiences a sweet spot in substrate utilization known as <strong>FATmax</strong>. At this exact metabolic state, fatty acid oxidation peaks in absolute rate (grams per minute).
                </p>
                <p>
                  Unlike carbohydrates, which are stored in limited quantities (~400-500g of glycogen in liver and muscle), fat stores are virtually infinite—even in lean endurance athletes. In Zone 2, Free Fatty Acids (FFAs) cross the mitochondrial double membrane through the <strong>CPT-1 (Carnitine Palmitoyltransferase I)</strong> gatekeeper.
                </p>
                <div className="p-4 rounded-2xl bg-emerald-50/80 border-l-4 border-emerald-600 space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block font-mono">Key Bioenergetic Insight</span>
                  <p className="text-xs text-emerald-950 font-serif italic">
                    "High blood glucose and elevated insulin suppress CPT-1 activity. Zone 2 training under moderate insulin conditions optimizes fat oxidation pathways."
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p>
                  Inside the mitochondrial matrix, fatty acids undergo <strong>Beta-Oxidation</strong>, a spiral pathway that continuously shears off 2-carbon units to produce <em>Acetyl-CoA</em>. This Acetyl-CoA directly feeds the <strong>Krebs (Citric Acid) Cycle</strong> without overloading pyruvate dehydrogenase or generating hydrogen ion accumulation.
                </p>
                <p>
                  Because Oxygen (O₂) is available in abundant supply during Zone 2, the Electron Transport Chain operates at peak efficiency. Every single palmitate molecule (16-carbon fatty acid) yields approximately <strong>106 to 120 ATP energy molecules</strong>, alongside clean metabolic water (H₂O) and carbon dioxide (CO₂).
                </p>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-900 border-b border-stone-200 pb-2">
                    <span>Substrate Energy Comparison</span>
                    <span className="text-emerald-700 font-mono">Zone 2 Peak</span>
                  </div>
                  <div className="space-y-2 text-xs text-stone-700">
                    <div className="flex justify-between"><span>Fat Oxidation Yield:</span><strong className="text-emerald-800">~106-120 ATP / molecule</strong></div>
                    <div className="flex justify-between"><span>Glucose Oxidation Yield:</span><strong className="text-amber-800">~32-34 ATP / molecule</strong></div>
                    <div className="flex justify-between"><span>Anaerobic Glycolysis:</span><strong className="text-rose-700">2 ATP / molecule + Lactate + H⁺</strong></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Light Fuel Chart */}
            <div className="pt-6 border-t border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-serif text-stone-900 flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-emerald-700" />
                  Interactive Chart: Fuel Dynamics Across Heart Rate Zones
                </h3>
              </div>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <FuelCharts currentZoneId={currentZoneId} />
              </div>
            </div>

          </article>
        )}

        {/* ==================== PAGE 2: CELLULAR ENGINE ==================== */}
        {activePage === 2 && (
          <article className="space-y-8 animate-fade-in">
            
            <div className="space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-teal-100 text-teal-900 font-bold text-xs uppercase tracking-wider border border-teal-200">
                Page 2 • Cellular Powerhouse
              </span>
              <h2 className="text-3xl lg:text-5xl font-black font-serif text-stone-900 leading-tight">
                Building the Cellular Engine: PGC-1α & Angiogenesis
              </h2>
              <p className="text-stone-600 text-sm lg:text-base font-serif italic">
                How Zone 2 stimulates mitochondrial biogenesis and expands capillary networks.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 space-y-4 text-stone-800 text-sm lg:text-base leading-relaxed">
                <p>
                  Chronic adaptation to Zone 2 training is governed by the cellular master regulator <strong>PGC-1α (Peroxisome proliferator-activated receptor gamma coactivator 1-alpha)</strong>. When slow-twitch (Type I) muscle fibers sustain moderate contraction for extended durations, intracellular calcium fluxes and AMPK activation trigger PGC-1α transcription.
                </p>
                <p>
                  This signal instructs muscle cells to undergo <strong>Mitochondrial Biogenesis</strong>—building new mitochondria and expanding existing networks. Concurrently, Zone 2 stimulates <strong>Angiogenesis</strong>, increasing capillary density around muscle fibers to deliver oxygen and fatty acids directly to mitochondrial doorsteps.
                </p>

                {/* Character Cards Grid */}
                <div className="pt-4 space-y-3">
                  <h3 className="text-lg font-bold text-stone-900 font-serif">Key Metabolic Characters in Zone 2</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CHARACTERS.map((char) => (
                      <div key={char.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 hover:border-emerald-500/60 transition shadow-xs">
                        <div className="flex items-center gap-2.5">
                          <span className="text-3xl">{char.avatar}</span>
                          <div>
                            <div className="text-xs font-bold text-stone-900">{char.name}</div>
                            <div className="text-[10px] text-emerald-700 font-mono font-semibold">{char.role}</div>
                          </div>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">{char.zone2Behavior}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Magazine Callout */}
              <div className="bg-emerald-900 text-white p-6 rounded-3xl space-y-6 shadow-md">
                <h3 className="text-sm font-bold text-emerald-300 uppercase font-mono tracking-wider">
                  Mitochondrial Adaptations
                </h3>

                <ul className="space-y-4 text-xs text-emerald-100">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                    <span><strong>Mitochondrial Density:</strong> Increases functional surface area for Beta-Oxidation and Electron Transport enzymes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                    <span><strong>Enzymatic Upregulation:</strong> Enhances Citrate Synthase and CPT-1 enzyme concentrations by up to 40%.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                    <span><strong>Capillarity:</strong> Increases capillary-to-fiber ratio, shortening O₂ diffusion distances.</span>
                  </li>
                </ul>

                <div className="p-4 rounded-2xl bg-white/10 text-xs text-emerald-100 border border-white/20">
                  ⚡ <strong>Long-Term Longevity:</strong> Preserves mitochondrial health, mitigating metabolic dysfunction, insulin resistance, and age-related fatigue.
                </div>
              </div>

            </div>

            {/* Embedded Adaptation Simulator */}
            <div className="pt-6 border-t border-stone-200">
              <AdaptationSimulator />
            </div>

          </article>
        )}

        {/* ==================== PAGE 3: LACTATE PARADOX ==================== */}
        {activePage === 3 && (
          <article className="space-y-8 animate-fade-in">
            
            <div className="space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wider border border-amber-200">
                Page 3 • Investigative Report
              </span>
              <h2 className="text-3xl lg:text-5xl font-black font-serif text-stone-900 leading-tight">
                The Lactate Paradox: Demolishing Old Myths
              </h2>
              <p className="text-stone-600 text-sm lg:text-base font-serif italic">
                Why lactate is a premium energy fuel, not a toxic waste product.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-stone-800 text-sm lg:text-base leading-relaxed">
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
                  Blood lactate levels remain stable around <strong>1.5 to 2.0 mmol/L</strong>. This steady state ensures that hydrogen ions (H⁺) are buffered cleanly, avoiding muscular acidosis while recycling lactate into clean energy.
                </p>
              </div>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold font-serif text-lg">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  Zone 2 Lactate Balance
                </div>
                <ul className="space-y-2 text-xs text-stone-700">
                  <li>• Lactate Production = Lactate Clearance (~1.5 mM)</li>
                  <li>• MCT-1 Transporters shuttle lactate into mitochondria</li>
                  <li>• Zero muscle burning; sustainable for hours</li>
                  <li>• High oxidative capacity buffers all hydrogen ions</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
                <div className="flex items-center gap-2 text-rose-900 font-bold font-serif text-lg">
                  <Zap className="w-5 h-5 text-rose-700" />
                  Zone 4/5 Anaerobic Spillover
                </div>
                <ul className="space-y-2 text-xs text-stone-700">
                  <li>• Lactate Production &gt;&gt; Clearance (&gt; 4.0 mM)</li>
                  <li>• Pyruvate overflows glycolytic capacity</li>
                  <li>• Hydrogen ions (H⁺) accumulate, lowering intracellular pH</li>
                  <li>• Causes muscular acidosis, pain, and forced stoppage</li>
                </ul>
              </div>
            </div>

          </article>
        )}

        {/* ==================== PAGE 4: 1-HOUR RUNNER FIELD STUDY ==================== */}
        {activePage === 4 && (
          <article className="space-y-8 animate-fade-in">
            
            <div className="space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-cyan-100 text-cyan-900 font-bold text-xs uppercase tracking-wider border border-cyan-200">
                Page 4 • Field Experiment
              </span>
              <h2 className="text-3xl lg:text-5xl font-black font-serif text-stone-900 leading-tight">
                The 1-Hour Zone 2 Runner: Real-Time Field Simulation
              </h2>
              <p className="text-stone-600 text-sm lg:text-base font-serif italic">
                Track how heart rate, fat burn, glycogen depletion, and lactate evolve over a 60-minute session.
              </p>
            </div>

            {/* Embedded Live Runner Simulator */}
            <div className="pt-2">
              <RunnerSimulation />
            </div>

          </article>
        )}

        {/* ==================== PAGE 5: LONGEVITY PROTOCOLS ==================== */}
        {activePage === 5 && (
          <article className="space-y-8 animate-fade-in">
            
            <div className="space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider border border-emerald-200">
                Page 5 • Longevity Masterclass
              </span>
              <h2 className="text-3xl lg:text-5xl font-black font-serif text-stone-900 leading-tight">
                Mastering the Conversational Pace: Practical Guidelines
              </h2>
              <p className="text-stone-600 text-sm lg:text-base font-serif italic">
                How to integrate Zone 2 training into your weekly routine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-serif text-stone-900">The Talk Test</h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  You should be able to speak in full, complete sentences without gasping for air. If you can only utter a few words at a time, you have drifted into Zone 3 or 4.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-serif text-stone-900">Weekly Volume</h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Aim for 3 to 4 sessions of 45–90 minutes per week (totaling 3 to 5 hours). Consistency is key to driving PGC-1α mitochondrial biogenesis signals.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-800">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-serif text-stone-900">Heart Rate Formula</h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Typically 60–70% of Maximum Heart Rate (HRmax) or calculated via Maffetone formula: <em>180 minus your age</em> (adjusted for fitness level).
                </p>
              </div>

            </div>

            {/* Protocol Summary Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white space-y-3 shadow-md">
              <h3 className="text-xl font-bold font-serif">
                The 80/20 Endurance Paradigm
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-serif italic">
                Modern exercise physiology recommends structuring your total training volume into <strong>80% low-intensity Zone 2 aerobic base</strong> and <strong>20% high-intensity interval training (Zone 5)</strong>. This avoids chronic fatigue while building peak metabolic resilience.
              </p>
            </div>

          </article>
        )}

        {/* Page Footer Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-stone-200">
          <button
            onClick={prevPage}
            disabled={activePage === 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-800 text-xs font-bold transition border border-stone-300"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Page</span>
          </button>

          <div className="text-xs font-mono font-semibold text-stone-600">
            Page <strong className="text-emerald-800 text-sm">{activePage}</strong> of <strong>{totalPages}</strong>
          </div>

          <button
            onClick={nextPage}
            disabled={activePage === totalPages}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white text-xs font-bold transition shadow-sm"
          >
            <span>Next Page</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </main>

    </div>
  );
}
