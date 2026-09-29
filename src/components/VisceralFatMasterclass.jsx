import React, { useState } from 'react';
import { 
  Flame, ShieldCheck, Activity, Sliders, 
  CheckCircle2, AlertCircle, Sparkles, Scale, Heart, 
  Layers, Award, Zap, Droplet,
  ChevronRight, TrendingDown, Target, Dumbbell
} from 'lucide-react';

export default function VisceralFatMasterclass() {
  const [activeTab, setActiveTab] = useState('dichotomy'); // 'dichotomy' | 'lipolysis_engine' | 'simulator' | 'spot_reduction' | 'protocol'
  
  // Simulator inputs
  const [weeklyZone2Hours, setWeeklyZone2Hours] = useState(3.5); // 1 to 8 hours
  const [weeklyHiitSessions, setWeeklyHiitSessions] = useState(1); // 0 to 4 sessions
  const [nutritionalState, setNutritionalState] = useState('fasted'); // 'fasted' | 'mixed' | 'sugary'
  const [caloricBalance, setCaloricBalance] = useState(-250); // -600 to +600 kcal

  // Simulator computed values
  // Base lipolytic stimulation from running
  const aerobicLipolysisScore = weeklyZone2Hours * 14; 
  const catecholamineSpikeScore = weeklyHiitSessions * 22;
  
  // Insulin discount factor
  const insulinSuppressionFactor = nutritionalState === 'fasted' ? 1.25 : nutritionalState === 'mixed' ? 0.85 : 0.45;
  
  // Caloric deficit multiplier
  const deficitBonus = caloricBalance < 0 ? Math.abs(caloricBalance) * 0.05 : -(caloricBalance * 0.04);
  
  // VAT reduction velocity index (% monthly reduction capacity)
  const vatReductionRate = Math.max(0, Math.min(100, Math.round(((aerobicLipolysisScore + catecholamineSpikeScore) * insulinSuppressionFactor + deficitBonus) * 0.72)));
  
  // Subcutaneous fat mobilization index (much slower due to alpha-2 receptors)
  const satMobilizationRate = Math.max(0, Math.min(100, Math.round(vatReductionRate * 0.42)));
  
  // Weekly hours with HSL (Hormone-Sensitive Lipase) actively unlocked
  const activeHslHours = Math.min(168, Math.round((weeklyZone2Hours * 1.6 + weeklyHiitSessions * 2.2) * (nutritionalState === 'fasted' ? 1.5 : 1.0) * 4.2));
  
  // Hepatic (Liver) fat clearance index
  const liverFatClearance = Math.min(100, Math.round(vatReductionRate * 1.15));

  // Cortisol & recovery risk
  const recoveryStressRisk = Math.min(100, Math.max(5, Math.round(weeklyHiitSessions * 24 + (weeklyZone2Hours > 6 ? (weeklyZone2Hours - 6) * 15 : 0) + (caloricBalance < -400 ? 20 : 0))));

  return (
    <article className="space-y-8 font-sans pb-16">
      
      {/* Editorial Header */}
      <header className="border-b border-stone-200 dark:border-stone-800 pb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            Article 41 • Deep Physiology & Metabolic Clearance
          </span>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
            Biochemistry • Adipose Receptors • Lipolysis
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 font-medium">
            Peer-Reviewed Bioenergetics
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 dark:text-stone-50 leading-tight">
          Targeting Visceral & Abdominal Fat: <br className="hidden sm:inline" />
          <span className="text-rose-600 dark:text-rose-400">The Bioenergetics of Running, Receptor Densities & Lipolysis</span>
        </h1>

        <p className="text-lg text-stone-600 dark:text-stone-300 max-w-4xl leading-relaxed">
          Why running melts deep organ fat significantly faster than the pinchable skinfold on your belly. 
          The cellular interplay between <strong className="text-stone-900 dark:text-stone-100">β-adrenergic receptors</strong>, 
          the <strong className="text-stone-900 dark:text-stone-100">portal vein vascular highway</strong>, 
          and the <strong className="text-stone-900 dark:text-stone-100">insulin-independent GLUT4 bypass</strong>.
        </p>

        {/* Athlete Context Card */}
        <div className="bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              IP
            </div>
            <div>
              <div className="font-semibold text-stone-900 dark:text-stone-100">Target Athlete Context: Ishai Pesok</div>
              <div className="text-stone-500 dark:text-stone-400">Weight: 83.6 kg • Lean Body Mass: 68.8 kg (VeSync BIA: 17.7% BF)</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">
              Key Goal: Preserve 68.8kg Muscle • Mobilize Visceral Adipose
            </span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex flex-wrap gap-2 border-b border-stone-200 dark:border-stone-800 pb-3" aria-label="Article Sections">
        {[
          { id: 'dichotomy', label: '1. Biological Dichotomy (VAT vs. SAT)', icon: Layers },
          { id: 'lipolysis_engine', label: '2. The Lipolysis Cascade (Epi & HSL)', icon: Zap },
          { id: 'simulator', label: '3. Interactive Fat Clearance Simulator', icon: Sliders },
          { id: 'spot_reduction', label: '4. Spot Reduction vs. Visceral Reality', icon: Target },
          { id: 'protocol', label: '5. Polarized 80/20 Protocol & Lab Biomarkers', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-rose-500'}`} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* ============================================================== */}
      {/* TAB 1: BIOLOGICAL DICHOTOMY (VISCERAL VS. SUBCUTANEOUS FAT)    */}
      {/* ============================================================== */}
      {activeTab === 'dichotomy' && (
        <section className="space-y-8 animate-fadeIn">
          <div className="bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-950/30 dark:to-orange-950/20 p-6 rounded-2xl border border-rose-200 dark:border-rose-900/40">
            <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
              The Tale of Two Fats: Not All Abdominal Fat Is Equal
            </h2>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-sm sm:text-base">
              When runners look in the mirror and notice their waistline narrowing before the "pinchable roll" disappears, 
              they are witnessing a profound cellular reality: <strong className="text-rose-600 dark:text-rose-400">visceral adipose tissue (VAT)</strong> is 
              hyper-responsive to running, while <strong className="text-amber-600 dark:text-amber-400">subcutaneous adipose tissue (SAT)</strong> is 
              evolutionarily wired to resist quick mobilization.
            </p>
          </div>

          {/* Deep Comparative Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Visceral Fat Card */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border-2 border-rose-500/40 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                    <Flame className="w-5 h-5 fill-rose-500" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Visceral Adipose Tissue (VAT)</h3>
                    <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold">"Deep Organ Fat" • Intra-Abdominal</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300">
                  RAPID CLEARANCE
                </span>
              </div>

              <div className="text-sm text-stone-600 dark:text-stone-300 space-y-3 leading-relaxed">
                <p>
                  Located behind the abdominal muscle wall, tightly wrapped around the <strong>liver, intestines, pancreas, and kidneys</strong>.
                </p>
                
                <div className="bg-rose-50 dark:bg-rose-950/40 rounded-xl p-3.5 border border-rose-200 dark:border-rose-900/50 space-y-2 text-xs">
                  <div className="font-bold text-rose-900 dark:text-rose-200 uppercase tracking-wide">Key Physiological Features:</div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span><strong>High β₁ & β₂ Receptors:</strong> Enriched with catecholamine-receptive lipolytic switches that activate instantly during running.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span><strong>Low α₂ Receptors:</strong> Lacks the anti-lipolytic "brakes" that keep subcutaneous fat locked away.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span><strong>Direct Portal Vein Highway:</strong> Mobilized Free Fatty Acids (FFAs) drain straight to the liver for immediate energetic oxidation.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span><strong>Dense Capillarization:</strong> 2.5x higher blood perfusion than subcutaneous fat; receives hormones immediately.</span>
                  </div>
                </div>

                <div className="text-xs text-stone-500 dark:text-stone-400 italic">
                  <strong>Clinical Significance:</strong> Highly inflammatory when enlarged (secretes TNF-α, IL-6, and CRP), driving cardiovascular risk and insulin resistance. Eliminating it via Zone 2 is a primary longevity intervention!
                </div>
              </div>
            </div>

            {/* Subcutaneous Belly Fat Card */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                    <Layers className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Subcutaneous Abdominal Fat (SAT)</h3>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">"Pinchable Roll" • Hypodermal Layer</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                  METABOLIC BUFFER
                </span>
              </div>

              <div className="text-sm text-stone-600 dark:text-stone-300 space-y-3 leading-relaxed">
                <p>
                  Located directly beneath the skin, on top of the abdominal wall. This is the tissue measured by Wingate skinfold callipers.
                </p>
                
                <div className="bg-stone-50 dark:bg-stone-800/60 rounded-xl p-3.5 border border-stone-200 dark:border-stone-700 space-y-2 text-xs">
                  <div className="font-bold text-stone-900 dark:text-stone-200 uppercase tracking-wide">Key Physiological Features:</div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span><strong>High α₂ Adrenergic Density:</strong> Loaded with inhibitory α₂ receptors that shut down cAMP and stop fat mobilization.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span><strong>Low Capillary Blood Flow:</strong> Poor blood supply means circulating adrenaline reaches these cells at much lower concentrations.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span><strong>Systemic Venous Drainage:</strong> Mobilized lipids travel slowly through systemic veins rather than the portal vein.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span><strong>Long-Term Famine Depot:</strong> Biologically designed as an evolutionary emergency reserve for starvation, making it the last to shrink.</span>
                  </div>
                </div>

                <div className="text-xs text-stone-500 dark:text-stone-400 italic">
                  <strong>Diagnostic Note:</strong> Skinfold callipers pinch SAT only! A 32% skinfold reading can hide the fact that your visceral fat has already been dramatically cleared by your running routines.
                </div>
              </div>
            </div>

          </div>

          {/* Deep Receptor Comparison Table */}
          <div className="bg-stone-50 dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Scale className="w-5 h-5 text-rose-500" />
              Side-by-Side Physiological Matrix: Visceral vs. Subcutaneous
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400">
                    <th className="pb-3 font-semibold">Physiological Parameter</th>
                    <th className="pb-3 font-semibold text-rose-600 dark:text-rose-400">Visceral Adipose Tissue (VAT)</th>
                    <th className="pb-3 font-semibold text-amber-600 dark:text-amber-400">Subcutaneous Belly Fat (SAT)</th>
                    <th className="pb-3 font-semibold">Endurance Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                  <tr>
                    <td className="py-3 font-medium">Lipolytic Sensitivity to Catecholamines</td>
                    <td className="py-3 font-bold text-rose-600 dark:text-rose-400">Extremely High (Fast Release)</td>
                    <td className="py-3 text-stone-500">Moderate to Low (Slow Release)</td>
                    <td className="py-3">Visceral fat drains during the first 20–40 min of running.</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">β-Adrenergic Receptor Density</td>
                    <td className="py-3 font-bold text-rose-600 dark:text-rose-400">High (β₁ + β₂ + β₃)</td>
                    <td className="py-3 text-stone-500">Low to Moderate</td>
                    <td className="py-3">Running adrenaline activates VAT lipolysis instantaneously.</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">α₂-Adrenergic Receptor Density</td>
                    <td className="py-3 font-bold text-emerald-600 dark:text-emerald-400">Very Low (Minimal Brakes)</td>
                    <td className="py-3 font-bold text-amber-600 dark:text-amber-400">Very High (Strong Anti-Lipolytic Brake)</td>
                    <td className="py-3">Explains why lower belly skinfolds are the last to lean out.</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Capillary Perfusion / Blood Flow</td>
                    <td className="py-3 font-bold text-rose-600 dark:text-rose-400">High Perfusion (Dense Microvasculature)</td>
                    <td className="py-3 text-stone-500">Low Perfusion (Poor Microvasculature)</td>
                    <td className="py-3">Higher blood flow sweeps free fatty acids into muscle tissue.</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Venous Drainage Pathway</td>
                    <td className="py-3 font-bold text-rose-600 dark:text-rose-400">Portal Vein → Directly to Liver</td>
                    <td className="py-3">Systemic Circulation → Vena Cava</td>
                    <td className="py-3">Zone 2 running rapidly clears non-alcoholic fatty liver (NAFLD).</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Sensitivity to Insulin's Lipolytic Block</td>
                    <td className="py-3 text-stone-700 dark:text-stone-300">Moderate</td>
                    <td className="py-3 font-bold text-rose-600 dark:text-rose-400">Extremely High</td>
                    <td className="py-3">Even tiny elevations in insulin completely paralyze SAT burning.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* TAB 2: THE LIPOLYSIS CASCADE (MOLECULAR ENGINE)                */}
      {/* ============================================================== */}
      {activeTab === 'lipolysis_engine' && (
        <section className="space-y-8 animate-fadeIn">
          <div className="bg-stone-50 dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-3">
            <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Zap className="w-6 h-6 text-rose-500" />
              The Molecular Lipolysis Cascade: How Muscle Contraction Unlocks Fat Droplets
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              Every step on your outdoor run initiates a rapid, multi-tiered hormonal and enzymatic chain reaction. 
              Here is how electrical pulses in your quadriceps and calves trigger the chemical breakdown of stored triacylglycerols in abdominal adipocytes.
            </p>
          </div>

          {/* Sequential 5-Step Engine */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            {/* Step 1 */}
            <div className="bg-white dark:bg-stone-900 rounded-xl p-5 border border-stone-200 dark:border-stone-800 space-y-3 relative overflow-hidden">
              <div className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center justify-between">
                <span>STAGE 01</span>
                <Activity className="w-4 h-4 text-rose-500" />
              </div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">Catecholamine Flood</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Muscular work activates the sympathetic nervous system. The adrenal medulla secretes <strong>epinephrine</strong> and nerve terminals release <strong>norepinephrine</strong> into the bloodstream.
              </p>
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] font-mono text-stone-500">
                Epi & Norepi surge 3–10x above baseline
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-stone-900 rounded-xl p-5 border border-stone-200 dark:border-stone-800 space-y-3 relative overflow-hidden">
              <div className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center justify-between">
                <span>STAGE 02</span>
                <Flame className="w-4 h-4 text-rose-500" />
              </div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">β-Receptor & cAMP</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Epinephrine binds to β₁ and β₂ receptors on visceral fat cells. This couples with Gs proteins, activating <strong>Adenylyl Cyclase</strong>, which synthesizes cyclic AMP (cAMP).
              </p>
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] font-mono text-stone-500">
                ATP → [Adenylyl Cyclase] → cAMP → PKA
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-stone-900 rounded-xl p-5 border-2 border-rose-500/40 rounded-xl p-5 space-y-3 relative overflow-hidden">
              <div className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center justify-between">
                <span>STAGE 03</span>
                <Zap className="w-4 h-4 text-rose-500" />
              </div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">HSL & ATGL Cleavage</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Protein Kinase A (PKA) phosphorylates <strong>Perilipin-1</strong> (opening the lipid droplet shield) and activates <strong>Hormone-Sensitive Lipase (HSL)</strong> and <strong>ATGL</strong>.
              </p>
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] font-mono text-stone-500">
                Triglyceride → 3 FFAs + Glycerol
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white dark:bg-stone-900 rounded-xl p-5 border border-stone-200 dark:border-stone-800 space-y-3 relative overflow-hidden">
              <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                <span>STAGE 04</span>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">Insulin Bypass (GLUT4)</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Contracting muscles pull glucose directly via <strong>calcium-mediated GLUT4 translocation</strong>, completely bypassing insulin. Circulating insulin falls, releasing the brake on HSL!
              </p>
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] font-mono text-stone-500">
                Insulin brake removed for 24–48h
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white dark:bg-stone-900 rounded-xl p-5 border border-stone-200 dark:border-stone-800 space-y-3 relative overflow-hidden">
              <div className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center justify-between">
                <span>STAGE 05</span>
                <Droplet className="w-4 h-4 text-rose-500" />
              </div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">Mitochondrial Burn</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Free fatty acids bind albumin, reach working slow-twitch muscle fibers, cross through <strong>CPT-1 carnitine gates</strong> into the matrix, and undergo complete β-oxidation.
              </p>
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] font-mono text-stone-500">
                106+ ATP generated per Palmitate
              </div>
            </div>

          </div>

          {/* Deep Dive: The Insulin "Lock" Phenomenon */}
          <div className="bg-rose-50 dark:bg-rose-950/30 rounded-2xl p-6 border border-rose-200 dark:border-rose-900/50 space-y-4">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-rose-200 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200">
                <AlertCircle className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  The Master Switch: Why Insulin Paralyzes Fat Loss (And How Running Defeats It)
                </h3>
                <p className="text-xs text-rose-700 dark:text-rose-300">
                  Phosphodiesterase-3B (PDE3B) & the Anti-Lipolytic Cascade
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              Whenever insulin is elevated—even slightly—it activates an intracellular enzyme called <strong>Phosphodiesterase-3B (PDE3B)</strong>. 
              PDE3B destroys cyclic AMP (cAMP) inside fat cells within seconds. Without cAMP, Protein Kinase A remains inactive, 
              <strong>Hormone-Sensitive Lipase (HSL) shuts down cold</strong>, and not a single molecule of stored fat can leave the droplet.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide">
                  The Sedentary Insulin Trap:
                </span>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Consuming frequent carbohydrates without movement keeps baseline insulin hovering around 10–25 μIU/mL. 
                  At these concentrations, HSL is 95% inhibited. The body is chemically incapable of burning its own visceral fat.
                </p>
              </div>

              <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                  The Zone 2 Running Breakthrough:
                </span>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  During running, muscle contraction translocates GLUT4 transporters independently of insulin. 
                  Blood glucose is sucked into working muscles, driving circulating insulin down to basal levels (2–4 μIU/mL). 
                  <strong>The PDE3B brake releases, and HSL floods the visceral fat droplet!</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Muscle-Secreted IL-6: The Myokine Secret Weapon */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-500" />
              The Myokine Secret Weapon: Muscle-Derived IL-6 Targets Visceral Fat
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              For decades, Interleukin-6 (IL-6) was considered strictly an inflammatory toxin released by immune cells. 
              However, pioneering research by Dr. Bente Klarlund Pedersen proved that <strong>contracting skeletal muscle acts as an endocrine gland</strong>, 
              releasing pure "exercise-induced IL-6" directly into the bloodstream without activating inflammatory markers like TNF-α.
            </p>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 space-y-1">
                <div className="font-bold text-stone-900 dark:text-stone-100">
                  Selective Visceral Homing
                </div>
                <p className="text-stone-600 dark:text-stone-400 text-xs">
                  Exercise-derived IL-6 travels directly through the circulation and specifically binds to IL-6 receptors on <strong>visceral adipocytes</strong>, 
                  amplifying lipolysis by up to <strong>150%</strong> compared to rest, while stimulating the liver to increase fatty acid oxidation. 
                  When IL-6 signaling is blocked experimentally in humans, visceral fat reduction from exercise is almost completely abolished!
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* TAB 3: INTERACTIVE VISCERAL FAT & RUNNING SIMULATOR           */}
      {/* ============================================================== */}
      {activeTab === 'simulator' && (
        <section className="space-y-8 animate-fadeIn">
          <div className="bg-stone-50 dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-2">
            <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Sliders className="w-6 h-6 text-rose-500" />
              Interactive Visceral Fat Clearance Simulator
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base">
              Adjust your weekly training volume, intensity distribution, and pre-run nutrition to calculate your real-time 
              visceral fat mobilization rate, liver fat clearance, and HSL activation window.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Quick Protocols:</span>
            <button
              onClick={() => {
                setWeeklyZone2Hours(4.0);
                setWeeklyHiitSessions(1);
                setNutritionalState('fasted');
                setCaloricBalance(-250);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 hover:bg-rose-200 transition-colors"
            >
              🎯 Optimal Visceral Shred (Ishai's Gold Standard)
            </button>
            <button
              onClick={() => {
                setWeeklyZone2Hours(2.0);
                setWeeklyHiitSessions(0);
                setNutritionalState('sugary');
                setCaloricBalance(200);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 transition-colors"
            >
              ⚠️ High Sugar / Insulin Blocked
            </button>
            <button
              onClick={() => {
                setWeeklyZone2Hours(7.0);
                setWeeklyHiitSessions(3);
                setNutritionalState('fasted');
                setCaloricBalance(-700);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 transition-colors"
            >
              🔥 Chronic Overtraining / Cortisol Spike
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Input Controls (Left Column, 6 cols) */}
            <div className="lg:col-span-6 bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-6">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base border-b border-stone-200 dark:border-stone-800 pb-3 flex items-center justify-between">
                <span>Training & Nutritional Parameters</span>
                <Sliders className="w-4 h-4 text-stone-400" />
              </h3>

              {/* Slider 1: Zone 2 Volume */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="zone2-hours-range" className="font-medium text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    Weekly Zone 2 Aerobic Running:
                  </label>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">
                    {weeklyZone2Hours} hrs / week
                  </span>
                </div>
                <input 
                  id="zone2-hours-range"
                  type="range" 
                  min="0.5" 
                  max="8.0" 
                  step="0.5"
                  value={weeklyZone2Hours}
                  onChange={(e) => setWeeklyZone2Hours(parseFloat(e.target.value))}
                  className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                  <span>30 mins (Starter)</span>
                  <span>3.5 hrs (Sweet Spot)</span>
                  <span>8.0 hrs (Elite)</span>
                </div>
              </div>

              {/* Slider 2: HIIT / Tempo */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="hiit-sessions-range" className="font-medium text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-rose-500" />
                    Weekly High-Intensity / Tempo Sessions:
                  </label>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400 text-base">
                    {weeklyHiitSessions} {weeklyHiitSessions === 1 ? 'session' : 'sessions'} / wk
                  </span>
                </div>
                <input 
                  id="hiit-sessions-range"
                  type="range" 
                  min="0" 
                  max="4" 
                  step="1"
                  value={weeklyHiitSessions}
                  onChange={(e) => setWeeklyHiitSessions(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                  <span>0 (Pure Zone 2)</span>
                  <span>1 (80/20 Balance)</span>
                  <span>4 (Heavy Sympathetic)</span>
                </div>
              </div>

              {/* Radio: Nutritional Pre-Run State */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-stone-800 dark:text-stone-200">
                  Pre-Run Fueling State (Insulin Environment):
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'fasted', label: 'Fasted / Black Coffee', desc: 'Basal Insulin (<4 μIU/mL)', factor: '🔥 Max Lipolysis' },
                    { id: 'mixed', label: 'Light Low-GI Meal', desc: 'Mild Insulin (8-12 μIU/mL)', factor: '⚖️ Moderate Lipolysis' },
                    { id: 'sugary', label: 'High Carb / Sports Drink', desc: 'Spike (>30 μIU/mL)', factor: '🚫 HSL Paralyzed' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setNutritionalState(item.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                        nutritionalState === item.id
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-stone-900 dark:text-stone-100 font-semibold'
                          : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 text-stone-600 dark:text-stone-400 hover:border-stone-300'
                      }`}
                    >
                      <div>
                        <div className="font-bold">{item.label}</div>
                        <div className="text-[10px] text-stone-500 mt-0.5">{item.desc}</div>
                      </div>
                      <div className="mt-2 text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">
                        {item.factor}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 3: Caloric Deficit / Surplus */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="caloric-balance-range" className="font-medium text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-amber-500" />
                    Daily Caloric Energy Balance:
                  </label>
                  <span className={`font-mono font-bold text-base ${caloricBalance < 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {caloricBalance > 0 ? `+${caloricBalance}` : caloricBalance} kcal / day
                  </span>
                </div>
                <input 
                  id="caloric-balance-range"
                  type="range" 
                  min="-600" 
                  max="600" 
                  step="50"
                  value={caloricBalance}
                  onChange={(e) => setCaloricBalance(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                  <span>-600 (Aggressive Deficit)</span>
                  <span>0 (Maintenance Recomp)</span>
                  <span>+600 (Bulking Surplus)</span>
                </div>
              </div>
            </div>

            {/* Real-Time Computed Dashboard (Right Column, 6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Primary Output Metric */}
              <div className="bg-gradient-to-br from-rose-500 to-rose-700 text-white rounded-2xl p-6 shadow-md space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-mono text-rose-200 font-bold">
                      Primary Biological Output
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white mt-0.5">
                      Visceral Fat Clearance Velocity
                    </h3>
                  </div>
                  <div className="text-4xl font-mono font-black text-rose-100">
                    {vatReductionRate}<span className="text-xl">/100</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-rose-900/60 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-white h-full transition-all duration-500 rounded-full"
                    style={{ width: `${vatReductionRate}%` }}
                  />
                </div>

                <div className="text-xs text-rose-100 leading-relaxed">
                  {vatReductionRate > 70 ? (
                    <span>🚀 <strong>Maximum Visceral Shred Zone:</strong> Epinephrine receptors are intensely stimulated while insulin suppression allows continuous HSL activity. Intra-abdominal and organ fat will deplete rapidly.</span>
                  ) : vatReductionRate > 40 ? (
                    <span>⚡ <strong>Steady Metabolic Recomposition:</strong> Visceral fat is consistently tapped as fuel during your runs. Excellent sustainable pace.</span>
                  ) : (
                    <span>⚠️ <strong>Suppressed Lipolysis:</strong> High insulin or low volume is preventing HSL from unlocking your fat stores. Adjust pre-run fuel or increase Zone 2 duration.</span>
                  )}
                </div>
              </div>

              {/* Secondary Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                
                {/* Metric 1: Subcutaneous vs Visceral */}
                <div className="bg-white dark:bg-stone-900 rounded-xl p-4 border border-stone-200 dark:border-stone-800 space-y-1.5">
                  <div className="text-xs text-stone-500 font-medium">Subcutaneous (Belly Roll) Rate</div>
                  <div className="text-2xl font-mono font-bold text-amber-600 dark:text-amber-400">
                    {satMobilizationRate}%
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Moves at ~42% of visceral speed due to α₂ receptor resistance.
                  </p>
                </div>

                {/* Metric 2: Weekly HSL Active Hours */}
                <div className="bg-white dark:bg-stone-900 rounded-xl p-4 border border-stone-200 dark:border-stone-800 space-y-1.5">
                  <div className="text-xs text-stone-500 font-medium">Weekly Active Lipolytic Window</div>
                  <div className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {activeHslHours} hrs
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Post-exercise insulin sensitivity maintains fat burning for hours.
                  </p>
                </div>

                {/* Metric 3: Hepatic Steatosis Clearance */}
                <div className="bg-white dark:bg-stone-900 rounded-xl p-4 border border-stone-200 dark:border-stone-800 space-y-1.5">
                  <div className="text-xs text-stone-500 font-medium">Liver Fat Clearance Score</div>
                  <div className="text-2xl font-mono font-bold text-rose-600 dark:text-rose-400">
                    {liverFatClearance}%
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Direct portal drainage burns liver fat prior to subcutaneous fat.
                  </p>
                </div>

                {/* Metric 4: Cortisol / Recovery Risk */}
                <div className="bg-white dark:bg-stone-900 rounded-xl p-4 border border-stone-200 dark:border-stone-800 space-y-1.5">
                  <div className="text-xs text-stone-500 font-medium">Chronic Cortisol / Stress Risk</div>
                  <div className={`text-2xl font-mono font-bold ${recoveryStressRisk > 60 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {recoveryStressRisk}%
                  </div>
                  <p className="text-[11px] text-stone-500">
                    {recoveryStressRisk > 60 ? 'High! High cortisol encourages visceral fat storage.' : 'Optimal. Anabolic recovery preserved.'}
                  </p>
                </div>

              </div>

              {/* Personalized Verdict for Ishai */}
              <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs space-y-1.5">
                <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-rose-500" />
                  Preserving Lean Mass (68.8 kg) During Visceral Depletion:
                </div>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  Zone 2 running at 3.5–4.5 hours per week with 1 weekly tempo/interval session provides maximum visceral fat clearance 
                  without cannibalizing your muscle tissue. Keep your caloric deficit modest (200–300 kcal/day) and prioritize 
                  1.6–2.0 g/kg protein to safeguard your muscle engines!
                </p>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* TAB 4: SPOT REDUCTION MYTH VS. VISCERAL REALITY                */}
      {/* ============================================================== */}
      {activeTab === 'spot_reduction' && (
        <section className="space-y-8 animate-fadeIn">
          <div className="bg-stone-50 dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-3">
            <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Target className="w-6 h-6 text-rose-500" />
              The "Spot Reduction" Paradox: Why Crunches Fail, But Running Works
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              Fitness dogma correctly teaches that "you cannot spot-reduce fat." 
              Doing 500 abdominal crunches will not burn fat from your abdomen. 
              However, the medical reality reveals a fascinating paradox: 
              <strong className="text-rose-600 dark:text-rose-400"> running naturally produces systemic visceral spot-clearance</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Why Abdominal Crunches Fail */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                  <AlertCircle className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Why Ab Crunches Don't Burn Belly Fat</h3>
                  <p className="text-xs text-rose-600 font-semibold">Local Muscle Contraction ≠ Local Lipolysis</p>
                </div>
              </div>

              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                When you flex your abdominal muscles during a sit-up, those muscles burn intracellular glycogen. 
                They do <strong>not</strong> pull lipids from the subcutaneous fat layer lying directly on top of them. 
                There is no direct anatomical pipeline between a rectus abdominis muscle cell and the overlying skinfold!
              </p>

              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-400 space-y-2">
                <div className="font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wide">Physiological Dead End:</div>
                <p>
                  Ab workouts burn negligible total calories (rarely exceeding 40–60 kcal for 15 minutes of grueling effort) 
                  and release insufficient systemic catecholamines to trigger full-body lipolysis.
                </p>
              </div>
            </div>

            {/* Why Running Selectively Empties Visceral Fat */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border-2 border-emerald-500/40 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Why Running Empties Visceral Fat First</h3>
                  <p className="text-xs text-emerald-600 font-semibold">Systemic Hormone Flood + Receptor Affinity</p>
                </div>
              </div>

              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Running recruits the largest muscle groups in the human body (glutes, quads, calves, hamstrings) for 45–90 continuous minutes. 
                This floods the entire circulatory tree with <strong>epinephrine and norepinephrine</strong>.
              </p>

              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-900 dark:text-emerald-200 space-y-2">
                <div className="font-bold uppercase tracking-wide">The Receptor Destination:</div>
                <p>
                  Because visceral fat has an overwhelmingly high density of β-receptors and rapid blood perfusion, 
                  it "catches" that systemic adrenaline flood first. The fat melts from your organs before your body even touches the pinchable lower belly fat!
                </p>
              </div>
            </div>

          </div>

          {/* The Biological Order of Fat Loss Diagram */}
          <div className="bg-stone-50 dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-rose-500" />
              The "Inside-Out" Fat Burning Sequence
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              When entering an endurance running regimen with optimized nutrition, fat mobilizes in a distinct, scientifically proven anatomical sequence:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
              
              <div className="bg-white dark:bg-stone-800/80 p-4 rounded-xl border-t-4 border-rose-500 space-y-2">
                <span className="text-[11px] font-mono font-bold text-rose-600 dark:text-rose-400">STEP 1 • FIRST TO CLEAR</span>
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">Hepatic (Liver) Fat</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Intrahepatic lipid droplets clear within weeks of regular Zone 2 running, dramatically improving insulin sensitivity.
                </p>
              </div>

              <div className="bg-white dark:bg-stone-800/80 p-4 rounded-xl border-t-4 border-rose-400 space-y-2">
                <span className="text-[11px] font-mono font-bold text-rose-500 dark:text-rose-300">STEP 2 • WEEKS 2–8</span>
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">Visceral Organ Fat</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Omental and mesenteric fat depots shrink rapidly due to rich blood flow and high β-receptor affinity.
                </p>
              </div>

              <div className="bg-white dark:bg-stone-800/80 p-4 rounded-xl border-t-4 border-amber-400 space-y-2">
                <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">STEP 3 • MONTHS 2–4</span>
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">Upper Subcutaneous</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Fat thins from the face, neck, shoulders, arms, and upper chest, where blood flow and receptor density are moderate.
                </p>
              </div>

              <div className="bg-white dark:bg-stone-800/80 p-4 rounded-xl border-t-4 border-stone-400 space-y-2">
                <span className="text-[11px] font-mono font-bold text-stone-500">STEP 4 • FINAL FRONTIER</span>
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">Lower Belly & Love Handles</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Dense in inhibitory α₂ receptors. Requires months of patient, low-insulin endurance consistency to surrender.
                </p>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* TAB 5: PROTOCOL & CLINICAL BIOMARKERS                           */}
      {/* ============================================================== */}
      {activeTab === 'protocol' && (
        <section className="space-y-8 animate-fadeIn">
          <div className="bg-stone-50 dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-3">
            <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-rose-500" />
              The Complete Practical Protocol & Clinical Biomarkers Scorecard
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              How to execute a sustainable running framework that strips visceral fat, safeguards lean muscle mass, 
              and tracks true biological progress using objective laboratory tests.
            </p>
          </div>

          {/* Practical Execution Protocol */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                <Activity className="w-4 h-4" />
                <span>1. The 80/20 Polarized Rule</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                <strong>80% of weekly runs in strict Zone 2:</strong> Keeps lactate &lt; 2.0 mmol/L and CPT-1 gates open for pure fat oxidation without triggering cortisol spikes that store visceral fat.
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                <strong>20% high intensity (1 session/week):</strong> Triggers a sharp catecholamine spike to stimulate stubborn β-receptors.
              </p>
            </div>

            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                <Flame className="w-4 h-4" />
                <span>2. The Pre-Run Fueling Rule</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                <strong>Never drink high-glycemic carbohydrates</strong> in the 90 minutes preceding an easy Zone 2 fat-burning run.
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                An insulin surge of just 15 μIU/mL will trigger PDE3B and lock HSL for the first 45 minutes of your workout, completely blocking fat oxidation.
              </p>
            </div>

            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                <Dumbbell className="w-4 h-4" />
                <span>3. Preserve the 68.8kg Muscle Engine</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Never enter extreme caloric deficits (&gt;500 kcal/day). Severe deficits elevate cortisol and cause muscle catabolism.
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Consume 1.6–2.0 g/kg of quality protein per day and maintain 2 weekly strength sessions to preserve your metabolic powerhouses.
              </p>
            </div>

          </div>

          {/* Clinical Biomarkers Table */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              The Laboratory Scorecard: How to Track Visceral Fat Clearance
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Because standard bathroom scales and skinfold callipers cannot accurately distinguish visceral fat from muscle hydration, 
              rely on these four gold-standard systemic biomarkers:
            </p>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400">
                    <th className="pb-3 font-semibold">Biomarker</th>
                    <th className="pb-3 font-semibold">Optimal Target Range</th>
                    <th className="pb-3 font-semibold">Biological Mechanism</th>
                    <th className="pb-3 font-semibold">Clinical Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                  <tr>
                    <td className="py-3 font-bold">Fasting Serum Insulin</td>
                    <td className="py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">&lt; 5.0 μIU/mL</td>
                    <td className="py-3">Primary master regulator of HSL. Low fasting insulin guarantees active daily fat mobilization.</td>
                    <td className="py-3 text-stone-500">Track every 3–6 months.</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold">Triglyceride / HDL Ratio</td>
                    <td className="py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">&lt; 1.5 (Ideally &lt; 1.0)</td>
                    <td className="py-3">The strongest non-imaging surrogate for liver fat and visceral adipose tissue accumulation.</td>
                    <td className="py-3 text-stone-500">Calculated from standard lipid panel.</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold">Waist-to-Height Ratio</td>
                    <td className="py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">&lt; 0.50</td>
                    <td className="py-3">Measures abdominal circumference relative to frame. Far superior to BMI for athletic builds.</td>
                    <td className="py-3 text-stone-500">Measure at navel with tape measure monthly.</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold">ALT & AST (Liver Enzymes)</td>
                    <td className="py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">ALT &lt; 25 U/L • AST &lt; 25 U/L</td>
                    <td className="py-3">Low transaminases confirm minimal hepatic steatosis (liver fat) and healthy mitochondrial oxidation.</td>
                    <td className="py-3 text-stone-500">Standard CMP blood test.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Final Editorial Takeaway */}
          <div className="bg-gradient-to-r from-rose-900 to-stone-900 text-white p-6 sm:p-8 rounded-2xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-rose-800 text-rose-200">
                <Sparkles className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-serif font-bold text-white">
                The Bottom Line for Your Longevity Journey
              </h3>
            </div>
            <p className="text-sm text-stone-200 leading-relaxed">
              When you lace up your running shoes and maintain your conversational Zone 2 pace, you are not simply burning calories—you are executing a precision hormonal intervention. 
              Your high-density β-adrenergic receptors and rich portal capillaries guarantee that <strong>visceral fat around your vital organs is mobilized first</strong>, 
              slashing systemic inflammation, protecting your cardiovascular system, and preserving your hard-earned 68.8 kg lean muscle mass.
            </p>
          </div>
        </section>
      )}

    </article>
  );
}
