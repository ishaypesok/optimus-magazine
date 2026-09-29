import React, { useState } from 'react';
import { 
  Dna, Zap, ShieldCheck, Activity, TrendingUp, Sliders, 
  CheckCircle2, AlertCircle, Sparkles, Scale, Heart, 
  Cpu, RefreshCw, BarChart2, Layers, Award, Dumbbell
} from 'lucide-react';

export default function MitochondrialBiogenesisMasterclass() {
  const [activeTab, setActiveTab] = useState('zone2_vs_hiit'); // 'overview' | 'molecular_pathway' | 'zone2_vs_hiit' | 'simulator' | 'protocol'
  const [selectedHiitMetric, setSelectedHiitMetric] = useState(0);

  // Simulator state for 65+ training mix
  const [zone2Hours, setZone2Hours] = useState(3.5); // hours/week
  const [hiitSessions, setHiitSessions] = useState(1); // sessions/week

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
      zone2Details: 'Expands the total surface area, volume density, cristae folds, and capillary bed per muscle fiber. Multiplies the total number of cellular powerhouses.',
      hiit: 'Intrinsic Mitochondrial Respiration ("Supercharging Turbines")',
      hiitDetails: 'Increases the enzymatic rate per unit of existing mitochondrion (State 3 respiration, Cytochrome c Oxidase activity). Maximizes peak aerobic output.',
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
            Article 40 • Flagship Longevity Masterclass
          </span>
          <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-950 font-bold text-xs uppercase tracking-wider border border-blue-300 inline-flex items-center gap-1.5 shadow-2xs">
            <Dna className="w-3.5 h-3.5 text-blue-700" />
            Mitochondrial Biogenesis at 65+
          </span>
          <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-950 font-bold text-xs uppercase tracking-wider border border-amber-300 inline-flex items-center gap-1.5 shadow-2xs">
            <Scale className="w-3.5 h-3.5 text-amber-700" />
            Zone 2 vs. HIIT Deep Comparison
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight tracking-tight">
          Mitochondrial Biogenesis Masterclass: Rebuilding Cellular Powerhouses at 65+
        </h1>
        <p className="text-stone-600 text-sm sm:text-base font-normal max-w-4xl leading-relaxed">
          How aerobic exercise triggers new mitochondrial birth through the <strong>PGC-1α master switch</strong>, why mitochondrial decline is <em>reversible</em> rather than inevitable with aging, and the critical biological comparison: <strong>Zone 2 base vs. High-Intensity Interval Training (HIIT)</strong> for longevity runners.
        </p>
      </div>

      {/* ================= TAB NAVIGATION ================= */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3 no-print">
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
          onClick={() => setActiveTab('molecular_pathway')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-2xs ${
            activeTab === 'molecular_pathway'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
        >
          <Dna className="w-4 h-4 text-emerald-300" />
          <span>The PGC-1α Molecular Cascade</span>
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

      {/* ================= TAB 1: ZONE 2 VS. HIIT HEAD-TO-HEAD ================= */}
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
                      <span className="text-rose-800 font-bold">Severe</span>: Lactate &gt; 8–14 mmol/L; proton ($H^+$) accumulation inhibites fat burning.
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

      {/* ================= TAB 2: OVERVIEW & THE 65+ CHALLENGE ================= */}
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

      {/* ================= TAB 3: MOLECULAR CASCADE ================= */}
      {activeTab === 'molecular_pathway' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="p-6 rounded-2xl bg-stone-900 text-white space-y-2">
            <div className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
              From Footstrike to Gene Expression
            </div>
            <h3 className="text-2xl font-black">
              The 5-Step PGC-1α Signaling Cascade
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-normal">
              How a steady 105–117 BPM heartbeat translates into physical organelle multiplication inside your slow-twitch muscle fibers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Contraction & Calcium Flux',
                icon: Activity,
                desc: 'Repeated muscle contractions cause low-amplitude, prolonged intracellular Calcium (Ca²⁺) release, activating CaMK (Calmodulin kinase).',
                tag: 'Muscle Trigger'
              },
              {
                step: '02',
                title: 'Kinase Activation',
                icon: Cpu,
                desc: 'Moderate ATP turnover raises the AMP:ATP and NAD⁺:NADH ratios, phosphorylating AMPK and activating the longevity deacetylase SIRT1.',
                tag: 'Energy Sensing'
              },
              {
                step: '03',
                title: 'PGC-1α Master Switch',
                icon: Zap,
                desc: 'AMPK and SIRT1 activate PGC-1α (the master regulator of biogenesis), releasing it to translocate directly into the cell nucleus.',
                tag: 'Master Conductor'
              },
              {
                step: '04',
                title: 'Nuclear Factor Binding',
                icon: Dna,
                desc: 'Inside the nucleus, PGC-1α binds to NRF-1 and NRF-2 (Nuclear Respiratory Factors), transcribing the nuclear-encoded mitochondrial genes.',
                tag: 'Gene Transcription'
              },
              {
                step: '05',
                title: 'TFAM & mtDNA Replication',
                icon: RefreshCw,
                desc: 'TFAM crosses into the mitochondria, replicating mitochondrial DNA (mtDNA) and triggering binary fission to create new daughter organelles!',
                tag: 'Organelle Birth'
              }
            ].map((st, i) => {
              const Icon = st.icon;
              return (
                <div key={i} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2 flex flex-col justify-between hover:border-emerald-400 transition">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Step {st.step}
                      </span>
                      <Icon className="w-4 h-4 text-stone-600" />
                    </div>
                    <div className="text-sm font-black text-stone-900">{st.title}</div>
                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      {st.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-stone-100 text-[10px] font-mono text-emerald-700 font-bold uppercase">
                    {st.tag}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-stone-800 text-xs sm:text-sm leading-relaxed space-y-2">
            <div className="font-extrabold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              The Biological Takeaway:
            </div>
            <p>
              Unlike muscle hypertrophy (which requires high mechanical tension and mTORC1 activation), <strong>mitochondrial biogenesis requires continuous time-under-aerobic-tension</strong>. A 60–90 minute Zone 2 run provides an uninterrupted wave of PGC-1α activation that pulses for several hours post-exercise, driving massive new cristae and enzyme construction during sleep.
            </p>
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
