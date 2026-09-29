import React, { useState } from 'react';
import { 
  Dna, Zap, ShieldCheck, Activity, TrendingUp, Sliders, 
  CheckCircle2, AlertCircle, Sparkles, Scale, Heart, 
  BarChart2, Layers, Award, Dumbbell,
  ChevronRight, ChevronLeft, Maximize2, X, ZoomIn
} from 'lucide-react';

const BIOGENESIS_SLIDES = [
  {
    id: 1,
    title: 'The Master Biogenesis Pathway',
    subtitle: 'From muscle contraction to PGC-1α activation, nuclear transcription & TFAM organelle birth',
    src: './mitochondrial_biogenesis_slide_1.jpg',
    alt: 'Mitochondrial Biogenesis Molecular Pathway in Human Muscle Cells',
    badge: '1. Molecular Regulation',
    keyPoints: [
      { label: 'Contraction & Calcium Influx', text: 'Rhythmic muscular contractions generate prolonged Ca²⁺ flux, activating CaMK (Calmodulin kinase).' },
      { label: 'Energy Sensing Kinases (AMPK & SIRT1)', text: 'ATP turnover raises AMP/ATP and NAD⁺/NADH ratios, phosphorylating AMPK and activating SIRT1 deacetylase.' },
      { label: 'PGC-1α Nuclear Translocation', text: 'Deacetylated PGC-1α enters the nucleus, co-activating NRF-1 and NRF-2 transcription factors.' },
      { label: 'TFAM & DRP1 Fission', text: 'TFAM replicates mitochondrial DNA (mtDNA) while DRP1 rings orchestrate binary fission to create new daughter organelles.' }
    ]
  },
  {
    id: 2,
    title: 'Comparative Adaptations: Zone 2 vs. HIIT',
    subtitle: 'Chronic volumetric network expansion vs. peak enzymatic efficiency & acute mitophagy',
    src: './mitochondrial_biogenesis_slide_2.jpg',
    alt: 'Zone 2 vs. HIIT Mitochondrial Adaptations in Skeletal Muscle',
    badge: '2. Comparative Remodeling',
    keyPoints: [
      { label: 'Zone 2: Volumetric Expansion', text: 'Builds total mitochondrial mass, expands cristae surface area, and triggers rich capillary growth for enhanced oxygen delivery.' },
      { label: 'Zone 2: Pure Fat Oxidation', text: 'Sustained beta-oxidation via CPT-1 gates with stable, low lactate levels (<2.0 mmol/L) in cellular equilibrium.' },
      { label: 'HIIT: Enzyme Efficiency Tuning', text: 'Spikes in AMP/ATP ratio upregulate key respiratory enzymes per unit of existing mitochondrion.' },
      { label: 'HIIT: Rapid Mitophagy & Glycolysis', text: 'Triggers intense autophagic quality control alongside high lactate flux and fast-twitch fiber recruitment.' }
    ]
  },
  {
    id: 3,
    title: 'Muscle Fiber Biopsy: Untrained vs. Zone 2',
    subtitle: 'Direct microscopic evidence of mitochondrial density & capillary expansion in human muscle',
    src: './zone2_mitochondria_comparison.jpg',
    alt: 'Untrained vs Endurance Trained Zone 2 Muscle Fiber Biopsy',
    badge: '3. Muscle Fiber Biopsy',
    keyPoints: [
      { label: 'Untrained Architecture', text: 'Sparse, fragmented mitochondria clustered near sarcolemma with minimal capillary contacts, limiting fat oxidation.' },
      { label: 'Trained Zone 2 Architecture', text: 'Dense, interconnected mitochondrial reticulum weaving between every myofibril with expanded cristae volume.' },
      { label: 'Capillary Network Expansion', text: 'Profound microvascular capillarization ensures rapid, effortless oxygen transfer from red blood cells to myoglobin.' },
      { label: 'Age-Reversing Remodeling', text: 'Completely offsets the 8–10% per decade natural loss of oxidative capacity in master runners.' }
    ]
  },
  {
    id: 4,
    title: 'Transmission Electron Micrograph (TEM at 15,000x)',
    subtitle: 'Direct physical proof of inner cristae membranes, matrix density & capillary interface',
    src: './mitochondria_tem_micrograph.jpg',
    alt: 'Transmission Electron Micrograph 15,000x Magnification of Muscle Mitochondria',
    badge: '4. Physical TEM Proof',
    keyPoints: [
      { label: '15,000x Ultrastructure', text: 'Direct microscopic cross-section revealing individual double membranes and packed protein matrices.' },
      { label: 'Folded Cristae Architecture', text: 'The folded inner cristae house Complexes I–IV and ATP Synthase rotary turbines that generate cellular energy.' },
      { label: 'Intracellular Proximity', text: 'Positioned in immediate contact with red blood capillaries, enabling zero-delay oxygen diffusion.' },
      { label: 'Living Biological Evidence', text: 'Visual proof that consistent aerobic exercise literally restructures the physical cellular machinery of life.' }
    ]
  }
];

export default function MitochondrialBiogenesisMasterclass() {
  const [activeTab, setActiveTab] = useState('slideshow'); // 'slideshow' | 'zone2_vs_hiit' | 'overview' | 'simulator' | 'protocol'
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHiitMetric, setSelectedHiitMetric] = useState(0);

  // Simulator state for 65+ training mix
  const [zone2Hours, setZone2Hours] = useState(3.5); // hours/week
  const [hiitSessions, setHiitSessions] = useState(1); // sessions/week

  const currentSlide = BIOGENESIS_SLIDES[activeSlideIdx];
  const nextSlide = () => setActiveSlideIdx((prev) => (prev + 1) % BIOGENESIS_SLIDES.length);
  const prevSlide = () => setActiveSlideIdx((prev) => (prev - 1 + BIOGENESIS_SLIDES.length) % BIOGENESIS_SLIDES.length);

  // Computed metrics for 65+ athlete
  const mitoDensityGain = Math.min(100, Math.round(zone2Hours * 16 + hiitSessions * 8));
  const enzymeEfficiencyGain = Math.min(100, Math.round(hiitSessions * 22 + zone2Hours * 10));
  const injuryRiskIndex = Math.min(100, Math.max(5, Math.round((hiitSessions * 28) + (zone2Hours > 6 ? (zone2Hours - 6) * 12 : 0))));
  const recoveryScore = Math.max(10, Math.min(100, Math.round(100 - (hiitSessions * 24) - (zone2Hours * 4))));

  const HIIT_COMPARISONS = [
    {
      title: 'Primary Organelle Adaptation',
      shortName: 'Adaptation Type',
      zone2: 'Mitochondrial Mass & Network Density ("Building the Factory")',
      zone2Details: 'Expands total organelle volume, cristae surface area, and capillary beds per muscle fiber. Multiplies the absolute count of cellular powerhouses.',
      hiit: 'Intrinsic Mitochondrial Respiration ("Supercharging Turbines")',
      hiitDetails: 'Increases the enzymatic rate per unit of existing mitochondrion (State 3 respiration, Cytochrome c Oxidase activity). Maximizes peak aerobic throughput.',
      badge: 'Architecture vs. Rate',
      tagColor: 'text-emerald-800 bg-emerald-100 border-emerald-300'
    },
    {
      title: 'Molecular Signaling Pathway',
      shortName: 'Signaling Drivers',
      zone2: 'Sustained CaMK + p38 MAPK + Steady AMPK Flux',
      zone2Details: 'Prolonged, rhythmic calcium flux from slow-twitch muscle contractions induces sustained PGC-1α nuclear translocation over 60–90 continuous minutes.',
      hiit: 'Acute Severe AMP:ATP Ratio Spike + High ROS Burst',
      hiitDetails: 'Sudden, extreme cellular energy depletion triggers emergency AMPK phosphorylation and SIRT1 activation, accompanied by an intense surge of oxidative free radicals.',
      badge: 'Continuous vs. Emergency',
      tagColor: 'text-blue-800 bg-blue-100 border-blue-300'
    },
    {
      title: 'Metabolic Substrate & Lactate Flux',
      shortName: 'Metabolic Flux',
      zone2: 'Pure Fatty Acid Oxidation • Lactate < 2.0 mmol/L',
      zone2Details: 'Maximal CPT-1 fatty acid uptake into the mitochondrial matrix. Generates 106–129 ATP per palmitate molecule in continuous metabolic equilibrium with zero cellular acidification.',
      hiit: 'Anaerobic Glycolysis • Lactate > 8.0–14.0 mmol/L',
      hiitDetails: 'Overwhelms the Mitochondrial Pyruvate Carrier (MPC). Massive accumulation of cytosolic lactate and acidic hydrogen protons ($H^+$), rapidly shutting down fat oxidation.',
      badge: 'Clean Fat vs. High Acid',
      tagColor: 'text-amber-800 bg-amber-100 border-amber-300'
    },
    {
      title: 'Orthopedic & Joint Impact for 65+ Athletes',
      shortName: 'Orthopedic Load',
      zone2: 'Low Ground Reaction Forces (1.5–2.0x Bodyweight)',
      zone2Details: 'Steady, controlled cadence protects knees, hips, and Achilles tendons. Allows safe, high-volume weekly consistency without connective tissue micro-tears.',
      hiit: 'High Ground Reaction Forces (3.0–4.5x Bodyweight)',
      hiitDetails: 'Near-maximal sprinting or all-out intervals create severe shear stress on cartilage, meniscus, and tendons with longer collagen repair cycles in mature runners.',
      badge: 'Joint-Preserving vs. High Impact',
      tagColor: 'text-purple-800 bg-purple-100 border-purple-300'
    },
    {
      title: 'Autonomic & Hormonal Recovery Profile',
      shortName: 'Autonomic Profile',
      zone2: 'Parasympathetic Preservation • Baseline Cortisol',
      zone2Details: 'Heart Rate Variability (HRV) rebounds rapidly within 24–48 hours. Fits perfectly into a 48-hour recovery rhythm (such as two rest days between runs).',
      hiit: 'Heavy Sympathetic Surge • Prolonged Cortisol Elevation',
      hiitDetails: 'Requires 72–96 hours for full central nervous system (CNS) and muscle glycogen re-synthesis in runners over 65. Stacking HIIT leads to chronic systemic fatigue.',
      badge: 'Fast Rebound vs. Deep Debt',
      tagColor: 'text-rose-800 bg-rose-100 border-rose-300'
    },
    {
      title: 'Mitochondrial Quality Control & Mitophagy',
      shortName: 'Organelle Cleanup',
      zone2: 'Balanced Organelle Turnover & Gentle Mitophagy',
      zone2Details: 'Zone 2 stimulates healthy organelle fission and continuous recycling of worn-out cristae via Pink1/Parkin mitophagy without catastrophic cellular damage.',
      hiit: 'Rapid Acute Autophagic Shock',
      hiitDetails: 'Accelerates immediate clearance of damaged mitochondria, but if recovery is incomplete, leaves remaining mitochondria fragmented and prone to oxidative leakage.',
      badge: 'Renewed Reticulum',
      tagColor: 'text-teal-800 bg-teal-100 border-teal-300'
    }
  ];

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="space-y-3 border-b border-stone-200 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-950 font-bold text-xs uppercase tracking-wider border border-emerald-300 inline-flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Article 40 • Visual Scientific Masterclass
          </span>
          <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-950 font-bold text-xs uppercase tracking-wider border border-blue-300 inline-flex items-center gap-1.5 shadow-2xs">
            <Dna className="w-3.5 h-3.5 text-blue-700" />
            Mitochondrial Biogenesis at 65+
          </span>
          <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-950 font-bold text-xs uppercase tracking-wider border border-amber-300 inline-flex items-center gap-1.5 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-amber-700" />
            4 Visual Slides & Infographics
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight tracking-tight">
          Mitochondrial Biogenesis Masterclass:{' '}
          <span className="text-emerald-700">Rebuilding Cellular Powerhouses at 65+</span>
        </h1>
        <p className="text-stone-600 text-sm sm:text-base font-normal max-w-4xl leading-relaxed">
          Just like Dr. San Millán's Zone 2 visual manifesto on Page 39, this chapter provides a <strong>definitive visual and biological guide to Mitochondrial Biogenesis</strong>: high-resolution medical infographics, biopsy cross-sections, the PGC-1α molecular cascade, and the essential comparison with HIIT for master runners.
        </p>

        {/* Bioenergetics Advisory Board Callout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-stone-900 text-white border border-stone-800 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full border-2 border-emerald-400 bg-emerald-950 flex items-center justify-center text-emerald-300 shrink-0 font-black text-lg">
              🧬
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base">The Biology of Mitochondrial Multiplication</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-mono font-bold">
                  PGC-1α • TFAM • DRP1
                </span>
              </div>
              <p className="text-stone-300 text-xs mt-0.5">
                Synthesizing landmark research by David Hood, John Holloszy, David Bishop, and Iñigo San Millán on cellular organelle remodeling.
              </p>
            </div>
          </div>
          <div className="text-right text-[11px] font-mono text-stone-400 shrink-0">
            <div>Topic: Mitochondrial Biogenesis</div>
            <div className="text-emerald-400 font-semibold">#Biogenesis #PGC1alpha #Zone2vsHIIT</div>
          </div>
        </div>
      </div>

      {/* ================= TAB NAVIGATION ================= */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3 no-print">
        <button
          onClick={() => setActiveTab('slideshow')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-2xs ${
            activeTab === 'slideshow'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-300" />
          <span>🖼️ Visual Infographic Slides (4 Slides)</span>
        </button>

        <button
          onClick={() => setActiveTab('zone2_vs_hiit')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-2xs ${
            activeTab === 'zone2_vs_hiit'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
        >
          <Scale className="w-4 h-4 text-emerald-300" />
          <span>Zone 2 vs. HIIT Head-to-Head</span>
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-2xs ${
            activeTab === 'overview'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-300" />
          <span>The 65+ Mitochondrial Challenge</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-2xs ${
            activeTab === 'simulator'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
        >
          <Sliders className="w-4 h-4 text-emerald-300" />
          <span>65+ Training Mix Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('protocol')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-2xs ${
            activeTab === 'protocol'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-300" />
          <span>Actionable 65+ Longevity Protocol</span>
        </button>
      </div>

      {/* ================= TAB 1: VISUAL SLIDESHOW (MODELED AFTER PAGE 39) ================= */}
      {activeTab === 'slideshow' && (
        <section className="space-y-6 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-700" />
                The 4 Scientific Biogenesis Infographics & Slides
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Click any slide tab or use navigation arrows. Tap the infographic to enlarge in high resolution.
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
                Slide {activeSlideIdx + 1} / {BIOGENESIS_SLIDES.length}
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

          {/* Slide Selection Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {BIOGENESIS_SLIDES.map((slide, idx) => (
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
              <div className="relative aspect-[16/9] sm:aspect-[16/10] w-full bg-stone-950 flex items-center justify-center p-1">
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
                <span className="text-stone-400 font-mono">Infographic {currentSlide.id} of {BIOGENESIS_SLIDES.length}</span>
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
                    <div key={pIdx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                      <div className="font-extrabold text-stone-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>{point.label}</span>
                      </div>
                      <p className="text-stone-600 leading-relaxed font-normal pl-5">
                        {point.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
                  >
                    <ZoomIn className="w-4 h-4 text-emerald-400" />
                    <span>Open High-Resolution Inspection Modal</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

        </section>
      )}

      {/* ================= TAB 2: ZONE 2 VS. HIIT HEAD-TO-HEAD ================= */}
      {activeTab === 'zone2_vs_hiit' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Key Concept Intro Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-stone-900 via-slate-900 to-emerald-950 text-white shadow-md border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
              <Zap className="w-4 h-4" /> The Foundational Bioenergetic Dilemma
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Volume vs. Intensity: Expanding the Factory vs. Tuning the Turbines
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-4xl">
              Both <strong>Zone 2 aerobic exercise</strong> and <strong>High-Intensity Interval Training (HIIT)</strong> stimulate mitochondrial biogenesis, but they do so through radically different biological mechanisms. In the longevity community, HIIT is often promoted for its time-efficiency; however, for athletes aged <strong>65 and older</strong>, prioritizing HIIT over an aerobic base leads to a critical physiological trap.
            </p>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-xs sm:text-sm text-emerald-200 font-medium">
              💡 <strong>The Master Principle:</strong> <em>“You cannot tune an engine that doesn't have enough cylinders. Zone 2 builds the mitochondrial factory floor; high intensity tunes the machinery inside it.”</em>
            </div>
          </div>

          {/* Interactive Metric Selector */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
              <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-emerald-700" />
                Select a Comparison Dimension to Inspect:
              </h3>
              <span className="text-xs text-stone-500 font-medium">Click any tab below to review the detailed biological trade-offs</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {HIIT_COMPARISONS.map((comp, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedHiitMetric(idx)}
                  className={`p-3 rounded-xl text-left border transition text-xs font-bold ${
                    selectedHiitMetric === idx
                      ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  <div className="text-[10px] opacity-75 font-mono mb-1">0{idx + 1}</div>
                  <div className="truncate">{comp.shortName}</div>
                </button>
              ))}
            </div>

            {/* Focused Detailed Comparison Panel */}
            {(() => {
              const cur = HIIT_COMPARISONS[selectedHiitMetric];
              return (
                <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-emerald-300 shadow-sm space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
                    <div>
                      <span className={`text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full border ${cur.tagColor}`}>
                        {cur.badge}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                        {cur.title}
                      </h4>
                    </div>
                    <div className="text-xs font-mono font-bold text-stone-500">
                      Comparison Metric {selectedHiitMetric + 1} of {HIIT_COMPARISONS.length}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Zone 2 Column */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-black uppercase tracking-wider">
                          Zone 2 Aerobic Base (101–120 BPM)
                        </span>
                        <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                      </div>
                      <div className="text-base sm:text-lg font-extrabold text-emerald-950">
                        {cur.zone2}
                      </div>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                        {cur.zone2Details}
                      </p>
                    </div>

                    {/* HIIT Column */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-rose-700 text-white text-xs font-black uppercase tracking-wider">
                          HIIT / High Intensity (&gt;85% HRmax)
                        </span>
                        <AlertCircle className="w-5 h-5 text-rose-700" />
                      </div>
                      <div className="text-base sm:text-lg font-extrabold text-rose-950">
                        {cur.hiit}
                      </div>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                        {cur.hiitDetails}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Comprehensive Side-by-Side Summary Table */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-stone-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-700" />
              Full Comparison Matrix for Athletes 65+
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-xs">
              <table className="w-full text-left border-collapse text-xs sm:text-sm bg-white">
                <thead>
                  <tr className="bg-stone-100 border-b border-stone-200 text-stone-800 font-extrabold">
                    <th className="p-4 w-1/4">Biological Domain</th>
                    <th className="p-4 w-3/8 text-emerald-900 bg-emerald-50/70 border-r border-emerald-100">
                      🏃 Zone 2 Aerobic Base (Continuous)
                    </th>
                    <th className="p-4 w-3/8 text-rose-900 bg-rose-50/70">
                      ⚡ High-Intensity Intervals (HIIT)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr className="hover:bg-stone-50 transition">
                    <td className="p-4 font-bold text-stone-900">Adaptation Nature</td>
                    <td className="p-4 text-stone-700 bg-emerald-50/30 border-r border-emerald-100">
                      <strong>Mitochondrial Mass & Density</strong>: Multiplies organelle numbers, cristae volume, and capillarization.
                    </td>
                    <td className="p-4 text-stone-700 bg-rose-50/30">
                      <strong>Specific Respiration Rate</strong>: Boosts enzymatic throughput per unit of existing mitochondria.
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-50 transition">
                    <td className="p-4 font-bold text-stone-900">Primary Fuel Burned</td>
                    <td className="p-4 text-stone-700 bg-emerald-50/30 border-r border-emerald-100">
                      <strong>Fatty Acids (Beta-Oxidation)</strong>: Clean, steady ATP yield with zero glycogen depletion.
                    </td>
                    <td className="p-4 text-stone-700 bg-rose-50/30">
                      <strong>Glycogen (Glycolysis)</strong>: Rapid carbohydrate burn, producing lactate and acidity.
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-50 transition">
                    <td className="p-4 font-bold text-stone-900">Cellular Acidosis</td>
                    <td className="p-4 text-stone-700 bg-emerald-50/30 border-r border-emerald-100">
                      <span className="text-emerald-800 font-bold">None</span>: Lactate stable at 1.2–1.8 mmol/L; full metabolic equilibrium.
                    </td>
                    <td className="p-4 text-stone-700 bg-rose-50/30">
                      <span className="text-rose-800 font-bold">Severe</span>: Lactate &gt; 8–14 mmol/L; proton ($H^+$) accumulation inhibits fat burning.
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-50 transition">
                    <td className="p-4 font-bold text-stone-900">Recovery Time at 65+</td>
                    <td className="p-4 text-stone-700 bg-emerald-50/30 border-r border-emerald-100">
                      <strong>24 to 48 Hours</strong>: Rapid restoration, allowing 3–4 runs per week with fresh legs.
                    </td>
                    <td className="p-4 text-stone-700 bg-rose-50/30">
                      <strong>72 to 96+ Hours</strong>: Extended neuromuscular and connective tissue recovery required.
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-50 transition">
                    <td className="p-4 font-bold text-stone-900">Orthopedic Safety</td>
                    <td className="p-4 text-stone-700 bg-emerald-50/30 border-r border-emerald-100">
                      <span className="text-emerald-800 font-bold">High</span>: Gentle ground impact, protects aging knees and spine.
                    </td>
                    <td className="p-4 text-stone-700 bg-rose-50/30">
                      <span className="text-rose-800 font-bold">Caution Required</span>: High impact forces increase hamstring and tendon tear risk.
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-50 transition">
                    <td className="p-4 font-bold text-stone-900">Role in Longevity</td>
                    <td className="p-4 text-stone-700 bg-emerald-50/30 border-r border-emerald-100">
                      <strong>80%–90% Foundation</strong>: The essential base for all cellular health and disease prevention.
                    </td>
                    <td className="p-4 text-stone-700 bg-rose-50/30">
                      <strong>10%–20% Supplement</strong>: Micro-dosed strategically once base is rock-solid.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ================= TAB 3: OVERVIEW & THE 65+ CHALLENGE ================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-rose-800">
                <TrendingUp className="w-6 h-6 rotate-180" />
              </div>
              <h3 className="text-base font-extrabold text-stone-900">The 8% / Decade Decline</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                In sedentary individuals, skeletal muscle mitochondrial oxidative capacity ($V_{max}$) declines by approximately <strong>8% to 10% per decade after age 40</strong>, leading to metabolic inflexibility, insulin resistance, and chronic fatigue.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-stone-900">Hallmark of Aging</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                Mitochondrial dysfunction is classified as a primary <strong>Hallmark of Aging</strong>. When mitochondria age without replacement, they leak reactive oxygen species (ROS), accumulate mtDNA mutations, and lose the ability to oxidize fat.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-stone-900">The Reversibility Proof</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                Muscle biopsy studies (e.g. Holloszy et al., Hood et al.) show that <strong>master athletes who train consistently maintain mitochondrial density and respiratory enzyme activity comparable to active 25-year-olds</strong>! The decline is predominantly disuse, not an unchangeable fate.
              </p>
            </div>
          </div>

          {/* Deep Explanation */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-stone-900">
              Why Mitochondrial Biogenesis is the True Fountain of Youth for Master Runners
            </h3>
            <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                Every cell in your body requires adenosine triphosphate (ATP) to sustain life. In slow-twitch (Type I) skeletal muscle fibers, more than <strong>95% of that ATP is generated inside mitochondria through oxidative phosphorylation</strong>.
              </p>
              <p>
                As we cross 65, the body naturally tends to lose mitochondrial density if not stimulated. But when you step out for a sustained 101–120 BPM Zone 2 run, your muscle cells experience continuous, rhythmic contractions that demand oxidative energy without causing cellular acidosis. This metabolic steady-state signals the cell's genetic machinery to build <strong>new, young, highly efficient mitochondria</strong>.
              </p>
              <p>
                This process does not merely help you run faster—it upgrades whole-body glucose uptake, clears circulating triglycerides, maintains healthy blood pressure, and shields brain neurons from neurodegeneration.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ================= TAB 4: 65+ TRAINING MIX SIMULATOR ================= */}
      {activeTab === 'simulator' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-700" />
                65+ Longevity Training Mix Calculator: Zone 2 vs. HIIT
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-medium">
                Adjust your weekly Zone 2 aerobic volume and HIIT frequency to simulate the expected mitochondrial adaptations, orthopedic injury risk, and recovery balance.
              </p>
            </div>

            {/* Interactive Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Zone 2 Slider */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-stone-800">
                  <span>Zone 2 Base Volume:</span>
                  <span className="text-emerald-800 font-mono font-black text-base">{zone2Hours} Hours / Week</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.5"
                  value={zone2Hours}
                  onChange={(e) => setZone2Hours(parseFloat(e.target.value))}
                  className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700 focus:outline-none"
                />
                <div className="flex justify-between text-[11px] font-mono text-stone-500">
                  <span>0 hrs (Sedentary)</span>
                  <span>3.5 hrs (Sweet Spot)</span>
                  <span>8 hrs (Elite)</span>
                </div>
              </div>

              {/* HIIT Slider */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-stone-800">
                  <span>HIIT Frequency:</span>
                  <span className="text-rose-800 font-mono font-black text-base">{hiitSessions} Session / Week</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="1"
                  value={hiitSessions}
                  onChange={(e) => setHiitSessions(parseInt(e.target.value))}
                  className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-700 focus:outline-none"
                />
                <div className="flex justify-between text-[11px] font-mono text-stone-500">
                  <span>0 sessions (Pure Base)</span>
                  <span>1 session (Safe Polish)</span>
                  <span>4 sessions (High Strain)</span>
                </div>
              </div>

            </div>

            {/* Simulated Outputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Output 1: Mito Density */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="text-xs font-bold text-stone-600">Mitochondrial Mass & Density</div>
                <div className="text-2xl font-black text-emerald-900">
                  +{mitoDensityGain}%
                </div>
                <p className="text-[11px] text-stone-600">
                  Expands organelle numbers and capillary networks across Type I slow-twitch fibers.
                </p>
              </div>

              {/* Output 2: Enzyme Efficiency */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                <div className="text-xs font-bold text-stone-600">Enzyme Throughput & VO₂max</div>
                <div className="text-2xl font-black text-blue-900">
                  +{enzymeEfficiencyGain}%
                </div>
                <p className="text-[11px] text-stone-600">
                  Elevates Complex IV cytochrome oxidase activity and maximal oxygen extraction.
                </p>
              </div>

              {/* Output 3: Orthopedic Injury Risk */}
              <div className={`p-4 rounded-xl border space-y-1 ${
                injuryRiskIndex > 50 
                  ? 'bg-rose-50 border-rose-300 text-rose-900' 
                  : 'bg-stone-50 border-stone-200 text-stone-900'
              }`}>
                <div className="text-xs font-bold text-stone-600">Orthopedic Injury Risk (65+)</div>
                <div className={`text-2xl font-black ${injuryRiskIndex > 50 ? 'text-rose-700' : 'text-stone-800'}`}>
                  {injuryRiskIndex}%
                </div>
                <p className="text-[11px] text-stone-600">
                  {injuryRiskIndex > 50 
                    ? '⚠️ Warning: High shear stress on mature joints, knees, and Achilles tendons!'
                    : '✅ Joint-safe zone with low impact and minimal tendon inflammation.'}
                </p>
              </div>

              {/* Output 4: Recovery Balance */}
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 space-y-1">
                <div className="text-xs font-bold text-stone-600">Autonomic Recovery Balance</div>
                <div className="text-2xl font-black text-teal-900">
                  {recoveryScore} / 100
                </div>
                <p className="text-[11px] text-stone-600">
                  {recoveryScore >= 70
                    ? 'Matches Ishai\'s 48-hour recovery rhythm (two rest days between runs).'
                    : 'Systemic fatigue may accumulate without extended multi-day rest.'}
                </p>
              </div>

            </div>

            {/* Scientific Recommendation Box */}
            <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-700 space-y-1">
              <span className="font-black text-stone-900">Recommended 65+ Longevity Ratio:</span>
              <p>
                For athletes aged 65+, <strong>85% to 90% of total aerobic training time should remain firmly in Zone 2 (101–120 BPM)</strong>. If incorporating higher intensity, limit it to 1 session per week (or short, low-impact uphill strides of 20–30 seconds) to reap enzyme benefits without orthopedic damage.
              </p>
            </div>

          </div>

        </div>
      )}

      {/* ================= TAB 5: ACTIONABLE 65+ PROTOCOL ================= */}
      {activeTab === 'protocol' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm uppercase">
                <Heart className="w-5 h-5 text-emerald-600" />
                The Core Zone 2 Foundation (80–90%)
              </div>
              <h3 className="text-xl font-black text-stone-900">
                Ishai's Lab-Calibrated Aerobic Base Rules
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Heart Rate Corridor</strong>: Keep Apple Watch strictly between <strong>101 and 120 BPM</strong> (Wingate Lab tested FATmax range).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Session Duration</strong>: 45 to 75 minutes per run. This continuous duration is required to trigger maximal PGC-1α gene transcription.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Weekly Frequency</strong>: 2 to 3 base runs per week with <strong>48 hours (two recovery days)</strong> between sessions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Conversational Pacing</strong>: Always maintain the Talk Test. If you cannot speak full paragraphs comfortably, walk for 60 seconds until HR drops below 110 BPM.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-rose-800 font-extrabold text-sm uppercase">
                <Dumbbell className="w-5 h-5 text-rose-600" />
                Safe High-Intensity Micro-Dosing (10–20%)
              </div>
              <h3 className="text-xl font-black text-stone-900">
                How 65+ Runners Can Safely Touch High Intensity
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Pounding Rule</strong>: Never do all-out flat sprints on hard tarmac. Flat sprinting generates 4–5x bodyweight ground shear forces that endanger senior Achilles tendons.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Gentle Uphill Strides</strong>: Perform 4 to 6 gentle uphill accelerations of 20 to 30 seconds on a soft incline at the end of a Zone 2 run. Uphill running eliminates impact while triggering high-threshold motor units.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Cross-Training HIIT Option</strong>: Use a stationary spin bike, elliptical, or rowing machine for high-intensity intervals (e.g. 4 x 2 minutes). Zero joint shock with 100% of the mitochondrial enzyme stimulus!</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Post-Interval Rest</strong>: Follow any high-intensity session with a full 72 hours of recovery or active walking.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Scientific Summary Quote */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-stone-900 text-white space-y-3 border border-emerald-800/40 shadow-sm">
            <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4" /> Sports Physiology Editorial Verdict
            </div>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic">
              “Mitochondrial biogenesis is not a luxury for master athletes—it is the single most decisive biological determinant of healthy longevity, cognitive stamina, and metabolic freedom. By anchoring your training in steady Zone 2 while prudently micro-dosing low-impact intensity, you actively halt the 8% per decade decline and maintain the cellular energy architecture of a runner decades younger.”
            </p>
            <div className="text-xs text-emerald-300 font-mono pt-2 border-t border-slate-700">
              OPTIMUS — Longevity 65+ Editorial Board • Reference: Bishop et al. (2019), Hood et al. (2015), San Millán (2020)
            </div>
          </div>

        </div>
      )}

      {/* ================= MODAL: HIGH-RESOLUTION SLIDE ZOOM ================= */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-stone-700 shadow-2xl flex flex-col max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-stone-950 border-b border-stone-800 text-white">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Slide {activeSlideIdx + 1} / {BIOGENESIS_SLIDES.length}
                </span>
                <span className="font-bold text-sm sm:text-base text-stone-200">
                  {currentSlide.title}
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition flex items-center gap-1 text-xs"
                title="Close"
              >
                <span>Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="flex-1 flex items-center justify-center p-3 bg-black min-h-[300px] max-h-[65vh] overflow-hidden">
              <img
                src={currentSlide.src}
                alt={currentSlide.alt}
                className="max-h-full max-w-full object-contain rounded-xl"
              />
            </div>

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-between p-4 bg-stone-950 border-t border-stone-800">
              <button
                onClick={prevSlide}
                className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1 transition"
              >
                <ChevronLeft className="w-4 h-4" /> Prev Slide
              </button>
              <span className="text-xs text-stone-400 font-mono hidden sm:inline">
                Click outside or Close to exit
              </span>
              <button
                onClick={nextSlide}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 transition"
              >
                Next Slide <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER CITATIONS ================= */}
      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-[11px] font-mono text-stone-500 space-y-1">
        <div><strong>Key Scientific Literature References:</strong></div>
        <div>1. Hood, D. A., et al. (2015). <em>Unravelling the mechanisms of exercise-induced mitochondrial biogenesis in human muscle.</em> J Physiol.</div>
        <div>2. Bishop, D. J., et al. (2019). <em>High-intensity interval training vs. moderate-intensity continuous exercise on mitochondrial content and respiratory function.</em> Sports Med.</div>
        <div>3. San-Millán, I., & Brooks, G. A. (2018). <em>Assessment of Metabolic Flexibility and Mitochondrial Health by Lactate Testing.</em> Sports Med.</div>
      </div>

    </article>
  );
}
