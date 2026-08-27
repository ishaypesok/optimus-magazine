import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Activity, 
  Flame, 
  Cpu, 
  Zap, 
  Clock, 
  Dna, 
  Layers, 
  Award, 
  TrendingUp, 
  Sun, 
  Moon, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Info, 
  Sliders, 
  Droplet, 
  UserCheck, 
  Lightbulb, 
  BookOpen, 
  ChevronRight,
  Smile,
  Shield,
  ZapOff,
  Feather
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import confetti from 'canvas-confetti';

export default function AntiAgingMasterclass() {
  // 1. Interactive Biological Age Calculator State
  const [chronoAge, setChronoAge] = useState(42);
  const [z2WeeklyHours, setZ2WeeklyHours] = useState(3.5);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [vo2maxTier, setVo2maxTier] = useState('superior'); // 'below', 'average', 'superior', 'elite'
  const [fastingProtocol, setFastingProtocol] = useState('16_8'); // 'none', '12_12', '16_8', '24h_periodic'
  const [dietQuality, setDietQuality] = useState('polyphenol'); // 'standard', 'mediterranean', 'polyphenol'
  const [stressLevel, setStressLevel] = useState('moderate'); // 'high', 'moderate', 'low'

  // Dynamic Biological Age Calculations
  const calculateBiologicalMetrics = () => {
    let ageDiff = 0;

    // Zone 2 impact (-0.8 yrs per hour up to -4 yrs)
    ageDiff -= Math.min(z2WeeklyHours * 0.9, 4.5);

    // Sleep impact
    if (sleepHours >= 7 && sleepHours <= 9) ageDiff -= 2.2;
    else if (sleepHours < 6) ageDiff += 2.5;

    // VO2 Max tier impact
    if (vo2maxTier === 'elite') ageDiff -= 4.0;
    else if (vo2maxTier === 'superior') ageDiff -= 2.5;
    else if (vo2maxTier === 'average') ageDiff -= 0.5;
    else if (vo2maxTier === 'below') ageDiff += 3.0;

    // Fasting / Autophagy impact
    if (fastingProtocol === '24h_periodic') ageDiff -= 2.0;
    else if (fastingProtocol === '16_8') ageDiff -= 1.5;
    else if (fastingProtocol === '12_12') ageDiff -= 0.7;

    // Diet impact
    if (dietQuality === 'polyphenol') ageDiff -= 2.2;
    else if (dietQuality === 'mediterranean') ageDiff -= 1.2;
    else ageDiff += 1.5;

    // Stress impact
    if (stressLevel === 'low') ageDiff -= 1.8;
    else if (stressLevel === 'high') ageDiff += 2.8;

    const biologicalAge = Math.max(18, Math.round((chronoAge + ageDiff) * 10) / 10);
    const ageSavings = Math.round((chronoAge - biologicalAge) * 10) / 10;
    const agingVelocity = Math.round((biologicalAge / chronoAge) * 100) / 100;
    
    // Mitochondrial health score (0-100)
    const mitoScore = Math.min(100, Math.max(30, Math.round(100 - (biologicalAge * 0.4) + (z2WeeklyHours * 5) + (vo2maxTier === 'elite' ? 15 : 8))));

    return { biologicalAge, ageSavings, agingVelocity, mitoScore };
  };

  const { biologicalAge, ageSavings, agingVelocity, mitoScore } = calculateBiologicalMetrics();

  const handleConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // 2. The 9 Hallmarks of Aging Selector State
  const [activeHallmark, setActiveHallmark] = useState(0);

  const HALLMARKS = [
    {
      id: 1,
      name: 'Telomere Attrition',
      category: 'Genomic Integrity',
      icon: Dna,
      color: 'from-purple-600 to-indigo-600',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      summary: 'Shortening of protective chromosome end-caps during cell division limits replicative capacity.',
      mechanism: 'Each DNA replication cycle loses 50-200 base pairs at chromosome tips. When telomeres reach a critical minimum length, cells enter apoptosis or permanent senescence.',
      intervention: 'Zone 2 exercise activates telomerase enzyme pathways (TERT) and reduces systemic oxidative DNA strand break rates.',
      biomarkers: 'Leukocyte Telomere Length (LTL), TERT gene expression.'
    },
    {
      id: 2,
      name: 'Cellular Senescence',
      category: 'Cellular Fate',
      icon: ZapOff,
      color: 'from-amber-600 to-orange-600',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      summary: 'Permanent arrest of cell cycle; "zombie cells" linger and secrete toxic pro-inflammatory SASP signals.',
      mechanism: 'Damaged cells resist apoptosis, secreting SASP (Senescence-Associated Secretory Phenotype) containing IL-6, TNF-α, and matrix metalloproteinases that damage neighbor cells.',
      intervention: 'Autophagy induction via intermittent fasting and Zone 2 clears senescent cells; senolytics (Fisetin, Quercetin) target anti-apoptotic BCL-2 pathways.',
      biomarkers: 'p16INK4a, p21, SASP cytokine panels (IL-6, IL-1β).'
    },
    {
      id: 3,
      name: 'Mitochondrial Dysfunction',
      category: 'Bioenergetics',
      icon: Cpu,
      color: 'from-emerald-600 to-teal-600',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      summary: 'Accumulation of damaged mitochondria leads to ROS leak, low ATP, and systemic metabolic collapse.',
      mechanism: 'Aging reduces electron transport efficiency in Complex I & III, increasing reactive oxygen species (ROS) leakage that mutates mitochondrial DNA (mtDNA).',
      intervention: 'Zone 2 training triggers PGC-1α for mitochondrial biogenesis; mitophagy clears defective mitochondria through PINK1/Parkin pathways.',
      biomarkers: 'Fasting Lactate, mtDNA copy number, Citrate Synthase activity.'
    },
    {
      id: 4,
      name: 'Deregulated Nutrient Sensing',
      category: 'Metabolic Signaling',
      icon: Flame,
      color: 'from-rose-600 to-pink-600',
      textColor: 'text-rose-700',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      summary: 'Chronic over-activation of nutrient-sensing pathways (mTOR, Insulin/IGF-1) suppresses repair.',
      mechanism: 'Constant nutrient availability keeps mTORC1 in high-growth mode, blocking FOXO transcription factors and suppressing sirtuin longevity enzymes.',
      intervention: 'Pulsed inhibition of mTOR via fasting and exercise shifts energy into AMPK activation, turning on SIRT1-SIRT7 deacetylation pathways.',
      biomarkers: 'Fasting Insulin (<5 uIU/mL), HOMA-IR, NAD+/NADH ratio.'
    },
    {
      id: 5,
      name: 'Loss of Proteostasis',
      category: 'Protein Quality',
      icon: Layers,
      color: 'from-blue-600 to-cyan-600',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      summary: 'Failure of protein folding, chaperone machinery, and proteasomal degradation leads to misfolded aggregates.',
      mechanism: 'Oxidized and misfolded proteins aggregate inside cells (e.g. amyloid, tau), overwhelming heat shock chaperones and the ubiquitin-proteasome system.',
      intervention: 'Thermal stress (sauna at 80°C+) upregulates Heat Shock Proteins (HSP70/HSP90); fasting stimulates macro-autophagy.',
      biomarkers: 'Advanced Glycation End-products (AGEs), ubiquitin protein load.'
    },
    {
      id: 6,
      name: 'Epigenetic Alterations',
      category: 'Gene Regulation',
      icon: Sparkles,
      color: 'from-teal-600 to-emerald-600',
      textColor: 'text-teal-700',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      summary: 'Drift in DNA methylation patterns and histone modifications causes loss of youth gene expression.',
      mechanism: 'Methylation noise causes silencing of protective repair genes and accidental activation of oncogenes or inflammatory pathways over time.',
      intervention: 'DNMT enzyme modulation via folate/B12 methyl donors, NAD+ boosters (NMN/NR), and regular low-intensity exercise reverses Horvath clock epigenetic age.',
      biomarkers: 'DNA Methylation Clock (Horvath/GrimAge), Histone acetylation.'
    },
    {
      id: 7,
      name: 'Genomic Instability',
      category: 'DNA Repair',
      icon: ShieldCheck,
      color: 'from-indigo-600 to-blue-600',
      textColor: 'text-indigo-700',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      summary: 'Accumulation of DNA double-strand breaks, point mutations, and chromosomal translocations.',
      mechanism: 'Exogenous toxins and endogenous oxidative stress cause tens of thousands of DNA lesions per cell per day. Depletion of NAD+ impairs PARP-1 repair enzymes.',
      intervention: 'NAD+ replenishment supports PARP-1 single/double strand repair; high polyphenol diets neutralize reactive species.',
      biomarkers: '8-OHdG (DNA oxidation marker), PARP-1 activity.'
    },
    {
      id: 8,
      name: 'Stem Cell Exhaustion',
      category: 'Regeneration',
      icon: Activity,
      color: 'from-emerald-700 to-teal-800',
      textColor: 'text-emerald-800',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      summary: 'Loss of regenerative stem cells in muscle, bone, skin, and organs leads to tissue atrophy.',
      mechanism: 'Niche microenvironment deterioration and senescent signaling prevent progenitor stem cells from dividing to repair damaged muscle fibers and tissues.',
      intervention: 'Exercise-induced myokines (Irisin, IL-6 pulses) stimulate satellite stem cell proliferation and tissue perfusion.',
      biomarkers: 'Circulating Progenitor Cells (CD34+), Satellite cell proliferation.'
    },
    {
      id: 9,
      name: 'Altered Intercellular Communication',
      category: 'Systemic Environment',
      icon: Heart,
      color: 'from-rose-700 to-red-700',
      textColor: 'text-rose-800',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      summary: 'Chronic systemic low-grade inflammation ("Inflammaging") disrupts tissue signaling.',
      mechanism: 'Elevated baseline cytokines (IL-6, TNF-α, CRP) cause chronic vascular stiffening, neuroinflammation, and metabolic tissue resistance.',
      intervention: 'Anti-inflammatory diet rich in Omega-3 (EPA/DHA), polyphenols, and regular aerobic exercise converts inflammatory profile to anti-inflammatory IL-10.',
      biomarkers: 'hs-CRP (<0.5 mg/L), ApoB, IL-10 to TNF-α ratio.'
    }
  ];

  // 3. Healthspan vs Lifespan Chart Data
  const trajectoryData = [
    { age: 30, standard: 95, longevity: 98 },
    { age: 40, standard: 88, longevity: 96 },
    { age: 50, standard: 75, longevity: 94 },
    { age: 60, standard: 58, longevity: 90 },
    { age: 70, standard: 38, longevity: 84 },
    { age: 80, standard: 20, longevity: 76 },
    { age: 90, standard: 5, longevity: 62 },
    { age: 95, standard: 0, longevity: 48 },
  ];

  // 4. Lab Biomarker Target Comparison Table Data
  const BIOMARKERS = [
    {
      name: 'Fasting Insulin',
      standard: '< 15–25 µIU/mL',
      optimal: '< 5.0 µIU/mL',
      significance: 'Key marker of insulin sensitivity and mTOR baseline activity.',
      status: 'Optimal'
    },
    {
      name: 'hs-CRP (High-Sensitivity CRP)',
      standard: '< 3.0 mg/L',
      optimal: '< 0.5 mg/L',
      significance: 'Primary systemic inflame-aging and arterial inflammation marker.',
      status: 'Optimal'
    },
    {
      name: 'ApoB (Apolipoprotein B)',
      standard: '< 100 mg/dL',
      optimal: '< 60–70 mg/dL',
      significance: 'Measures total atherogenic lipoprotein particle count.',
      status: 'Optimal'
    },
    {
      name: 'HbA1c (Glycated Hemoglobin)',
      standard: '< 5.7%',
      optimal: '< 5.0–5.2%',
      significance: '3-month average blood glucose & glycation damage to proteins.',
      status: 'Optimal'
    },
    {
      name: 'VO2 Max (Cardiorespiratory)',
      standard: 'Average for age',
      optimal: 'Top 10% (> 48 mL/kg/min)',
      significance: '#1 single predictor of all-cause mortality reduction (up to 5x lower risk).',
      status: 'Optimal'
    },
    {
      name: 'Fasting Triglyceride / HDL Ratio',
      standard: '< 3.5',
      optimal: '< 1.2',
      significance: 'Strongest non-invasive surrogate for metabolic health & liver fat.',
      status: 'Optimal'
    }
  ];

  return (
    <article className="space-y-10 animate-fade-in font-sans text-stone-900">
      
      {/* SECTION 1: HEADER MASTHEAD */}
      <div className="space-y-3 border-b border-stone-200 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-950 font-extrabold text-xs uppercase tracking-wider border border-emerald-300 inline-flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Page 23 • Anti-Aging & Longevity Science
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-950 font-bold text-xs border border-purple-200 inline-flex items-center gap-1">
            <Dna className="w-3 h-3 text-purple-700" />
            Epigenetic & Cellular Masterclass
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight tracking-tight">
          Anti-Aging & Cellular Longevity Masterclass
        </h1>

        <p className="text-stone-600 text-sm sm:text-base max-w-4xl leading-relaxed font-normal">
          A scientific, bioenergetic deep dive into extending <strong>Healthspan</strong>—combining the 9 Hallmarks of Aging, Telomere preservation, NAD+ sirtuin signaling, Autophagy, Collagen longevity, and Zone 2 mitochondrial maintenance.
        </p>
      </div>

      {/* SECTION 2: INTERACTIVE BIOLOGICAL AGE CALCULATOR */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-emerald-950 text-white space-y-6 shadow-xl border border-stone-800 relative overflow-hidden">
        
        {/* Glow effect decorative element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Sliders className="w-4 h-4" />
              <span>Interactive Longevity Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Calculate Your Cellular Biological Age
            </h2>
          </div>

          <button
            onClick={handleConfetti}
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition shadow-sm flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Celebrate Longevity Savings</span>
          </button>
        </div>

        {/* Input Sliders & Selectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs text-stone-300">
          
          {/* Chronological Age */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex justify-between font-bold text-white">
              <span>Chronological Age:</span>
              <span className="text-emerald-400 text-sm">{chronoAge} Years</span>
            </div>
            <input
              type="range"
              min="20"
              max="85"
              value={chronoAge}
              onChange={(e) => setChronoAge(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[10px] text-stone-400">Actual years since birth</p>
          </div>

          {/* Zone 2 Volume */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex justify-between font-bold text-white">
              <span>Zone 2 Cardio / Week:</span>
              <span className="text-emerald-400 text-sm">{z2WeeklyHours} Hours</span>
            </div>
            <input
              type="range"
              min="0"
              max="7"
              step="0.5"
              value={z2WeeklyHours}
              onChange={(e) => setZ2WeeklyHours(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[10px] text-stone-400">Triggers PGC-1α mitochondrial biogenesis</p>
          </div>

          {/* Sleep Hours */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex justify-between font-bold text-white">
              <span>Nightly Sleep Average:</span>
              <span className="text-emerald-400 text-sm">{sleepHours} Hours</span>
            </div>
            <input
              type="range"
              min="5"
              max="9.5"
              step="0.5"
              value={sleepHours}
              onChange={(e) => setSleepHours(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[10px] text-stone-400">Glymphatic brain waste clearance</p>
          </div>

          {/* VO2 Max Tier */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <label className="font-bold text-white block">VO2 Max Fitness Tier:</label>
            <select
              value={vo2maxTier}
              onChange={(e) => setVo2maxTier(e.target.value)}
              className="w-full bg-stone-800 text-white border border-stone-700 rounded-xl p-2 font-medium focus:outline-none focus:border-emerald-500"
            >
              <option value="below">Below Average (Low Reserve)</option>
              <option value="average">Average (50th Percentile)</option>
              <option value="superior">Superior (75th Percentile)</option>
              <option value="elite">Elite (Top 5% - Maximum Longevity)</option>
            </select>
          </div>

          {/* Fasting / Autophagy */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <label className="font-bold text-white block">Autophagy / Fasting Protocol:</label>
            <select
              value={fastingProtocol}
              onChange={(e) => setFastingProtocol(e.target.value)}
              className="w-full bg-stone-800 text-white border border-stone-700 rounded-xl p-2 font-medium focus:outline-none focus:border-emerald-500"
            >
              <option value="none">Standard Meal Schedule (No Fasting)</option>
              <option value="12_12">12:12 Nightly Fast (Circadian Reset)</option>
              <option value="16_8">16:8 Time-Restricted Feeding</option>
              <option value="24h_periodic">Periodic 24h Fast + 16:8 (High Autophagy)</option>
            </select>
          </div>

          {/* Diet & Stress */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <label className="font-bold text-white block">Diet & Stress Status:</label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={dietQuality}
                onChange={(e) => setDietQuality(e.target.value)}
                className="bg-stone-800 text-white text-[11px] border border-stone-700 rounded-xl p-1.5 font-medium"
              >
                <option value="standard">Standard Diet</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="polyphenol">High Polyphenol</option>
              </select>

              <select
                value={stressLevel}
                onChange={(e) => setStressLevel(e.target.value)}
                className="bg-stone-800 text-white text-[11px] border border-stone-700 rounded-xl p-1.5 font-medium"
              >
                <option value="high">High Stress</option>
                <option value="moderate">Mod Stress</option>
                <option value="low">Low Stress / High HRV</option>
              </select>
            </div>
          </div>

        </div>

        {/* Calculated Results Display Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          
          <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-1 shadow-inner">
            <span className="text-[10px] text-emerald-300 uppercase font-black tracking-wider block">Estimated Biological Age</span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-300">
              {biologicalAge} <span className="text-xs text-emerald-400 font-normal">Years</span>
            </div>
            <p className="text-[11px] text-emerald-200 font-medium">
              {ageSavings >= 0 ? `🎉 ${ageSavings} years younger than calendar!` : `⚠️ ${Math.abs(ageSavings)} years older than calendar`}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 text-center space-y-1">
            <span className="text-[10px] text-stone-400 uppercase font-black tracking-wider block">Aging Velocity Score</span>
            <div className="text-3xl sm:text-4xl font-black text-white">
              {agingVelocity}x
            </div>
            <p className="text-[11px] font-medium text-emerald-400">
              {agingVelocity < 1.0 ? `Aging ${Math.round((1 - agingVelocity) * 100)}% slower than avg` : 'Accelerated aging baseline'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 text-center space-y-1">
            <span className="text-[10px] text-stone-400 uppercase font-black tracking-wider block">Mitochondrial Biogenesis Score</span>
            <div className="text-3xl sm:text-4xl font-black text-teal-300">
              {mitoScore} <span className="text-xs text-stone-400 font-normal">/ 100</span>
            </div>
            <p className="text-[11px] text-teal-200 font-medium">PGC-1α Transcription Efficiency</p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 text-center space-y-1">
            <span className="text-[10px] text-stone-400 uppercase font-black tracking-wider block">Autophagy Clearance Rate</span>
            <div className="text-3xl sm:text-4xl font-black text-purple-300">
              {fastingProtocol === 'none' ? 'Low' : fastingProtocol === '12_12' ? 'Moderate' : 'High'}
            </div>
            <p className="text-[11px] text-purple-200 font-medium">Zombie Cell & Aggregate Removal</p>
          </div>

        </div>

      </div>

      {/* SECTION 3: THE 9 HALLMARKS OF AGING (INTERACTIVE MATRIX) */}
      <div className="space-y-6">
        
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-purple-800 font-extrabold text-xs uppercase tracking-wider">
            <Dna className="w-4 h-4 text-purple-700" />
            <span>Cellular Pathology & Mechanisms</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            The 9 Hallmarks of Aging (Cellular Deep Dive)
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-normal">
            Click any hallmark below to inspect its microscopic mechanism, consequences, and targeted lifestyle/bioenergetic interventions.
          </p>
        </div>

        {/* Hallmark Selector Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
          {HALLMARKS.map((h, idx) => {
            const Icon = h.icon;
            const isSelected = activeHallmark === idx;
            return (
              <button
                key={h.id}
                onClick={() => setActiveHallmark(idx)}
                className={`p-3 rounded-2xl font-bold text-xs flex flex-col items-center justify-center text-center gap-1.5 transition border ${
                  isSelected
                    ? `${h.bgColor} ${h.borderColor} ${h.textColor} shadow-md scale-105 border-2`
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? h.textColor : 'text-stone-500'}`} />
                <span className="text-[10.5px] leading-tight truncate w-full">{h.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Hallmark Detail Card View */}
        {(() => {
          const current = HALLMARKS[activeHallmark];
          const Icon = current.icon;
          return (
            <div className={`p-6 sm:p-8 rounded-3xl ${current.bgColor} border ${current.borderColor} space-y-6 transition-all duration-300 shadow-sm font-sans`}>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl bg-gradient-to-tr ${current.color} text-white shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-wider text-stone-500 block">
                      Hallmark #{current.id} • {current.category}
                    </span>
                    <h3 className={`text-xl sm:text-2xl font-extrabold ${current.textColor}`}>
                      {current.name}
                    </h3>
                  </div>
                </div>

                <div className="px-3.5 py-1 rounded-xl bg-white/80 border border-stone-300 text-stone-800 text-xs font-mono font-bold shrink-0">
                  Target Biomarker: {current.biomarkers}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-800 text-xs sm:text-sm leading-relaxed">
                
                {/* 1. What Happens */}
                <div className="p-4 rounded-2xl bg-white/80 border border-stone-200 space-y-2">
                  <div className="font-extrabold text-stone-900 text-xs uppercase flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-stone-600" />
                    <span>1. Core Definition</span>
                  </div>
                  <p className="text-stone-700 text-xs leading-relaxed font-normal">
                    {current.summary}
                  </p>
                </div>

                {/* 2. Molecular Mechanism */}
                <div className="p-4 rounded-2xl bg-white/80 border border-stone-200 space-y-2">
                  <div className="font-extrabold text-stone-900 text-xs uppercase flex items-center gap-1.5">
                    <Dna className="w-4 h-4 text-purple-700" />
                    <span>2. Molecular Breakdown</span>
                  </div>
                  <p className="text-stone-700 text-xs leading-relaxed font-normal">
                    {current.mechanism}
                  </p>
                </div>

                {/* 3. Targeted Intervention */}
                <div className="p-4 rounded-2xl bg-emerald-950 text-white space-y-2 shadow-xs">
                  <div className="font-extrabold text-emerald-300 text-xs uppercase flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>3. Longevity Intervention</span>
                  </div>
                  <p className="text-emerald-100 text-xs leading-relaxed font-normal">
                    {current.intervention}
                  </p>
                </div>

              </div>

            </div>
          );
        })()}

      </div>

      {/* SECTION 4: HEALTHSPAN VS LIFESPAN TRAJECTORY CHART */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-50 border border-stone-200 space-y-6">
        
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span>Healthspan Compression of Morbidity</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
            Standard Aging vs. Longevity Protocol Trajectory
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-normal">
            The goal of anti-aging bioenergetics isn't just adding calendar years, but maintaining 90%+ physical and cognitive capacity until late in life.
          </p>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trajectoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLongevity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorStandard" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="age" label={{ value: 'Age (Years)', position: 'insideBottomRight', offset: -5 }} stroke="#64748b" />
              <YAxis label={{ value: 'Functional Vitality (%)', angle: -90, position: 'insideLeft' }} stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                formatter={(value) => [`${value}% Functional Capacity`]}
              />
              <Legend verticalAlign="top" height={36} />
              <Area type="monotone" dataKey="longevity" name="Longevity Protocol (Optimized Healthspan)" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorLongevity)" />
              <Area type="monotone" dataKey="standard" name="Standard Sedentary Baseline" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorStandard)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1">
            <span className="font-extrabold text-stone-900 block">📉 Standard Aging Curve</span>
            <p className="text-stone-600 text-xs">
              Gradual decline starting at age 40 due to mitochondrial decay, muscle loss (sarcopenia), and metabolic inflexibility. Extended years spent dealing with chronic disease.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
            <span className="font-extrabold text-emerald-950 block">🚀 Optimized Longevity Curve</span>
            <p className="text-emerald-900 text-xs">
              Vigorous health and stamina sustained through ages 70–90+ via Zone 2 biogenesis, high VO2 Max, autophagy, and low systemic inflammation.
            </p>
          </div>
        </div>

      </div>

      {/* SECTION 5: SKIN & DERMATOLOGICAL ANTI-AGING */}
      <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-6">
        
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Dermatological & Tissue Longevity</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
            Skin Aging, Collagen Type I & III, and Micro-Circulation
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-normal">
            How vascular perfusion, advanced glycation end-products (AGEs), and cellular turnover control skin elasticity and youthful appearance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          
          <div className="p-5 rounded-2xl bg-white border border-amber-200 space-y-2">
            <div className="font-bold text-amber-950 text-sm flex items-center gap-2">
              <Droplet className="w-4 h-4 text-amber-600" />
              <span>1. Collagen Matrix & AGEs</span>
            </div>
            <p className="text-stone-700 text-xs leading-relaxed font-normal">
              High blood sugar spikes cause glucose to bind non-enzymatically to collagen fibers (forming AGEs), causing skin stiffness, wrinkling, and loss of rebound.
            </p>
            <p className="text-[11px] text-amber-900 font-semibold pt-1">
              ✨ <em>Fix:</em> Zone 2 maintains flat glucose curves, protecting collagen cross-linking!
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-amber-200 space-y-2">
            <div className="font-bold text-amber-950 text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-600" />
              <span>2. Dermal Capillary Perfusion</span>
            </div>
            <p className="text-stone-700 text-xs leading-relaxed font-normal">
              Zone 2 exercise stimulates cutaneous angiogenesis—expanding microscopic capillary networks to flood the dermal extracellular matrix with O₂ and nutrients.
            </p>
            <p className="text-[11px] text-amber-900 font-semibold pt-1">
              ✨ <em>Result:</em> Natural skin glow, rapid cell turnover, and efficient toxin flushing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-amber-200 space-y-2">
            <div className="font-bold text-amber-950 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>3. Fibroblast Activation</span>
            </div>
            <p className="text-stone-700 text-xs leading-relaxed font-normal">
              Fibroblasts require high mitochondrial ATP to secrete pro-collagen and hyaluronic acid. As mitochondria degrade, fibroblast output drops by 75%.
            </p>
            <p className="text-[11px] text-amber-900 font-semibold pt-1">
              ✨ <em>Fix:</em> Mitochondrial biogenesis re-energizes dermal fibroblasts!
            </p>
          </div>

        </div>

      </div>

      {/* SECTION 6: BIOMARKER MATRIX TABLE */}
      <div className="space-y-4">
        
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-800 font-extrabold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4 text-teal-700" />
            <span>Quantitative Clinical Benchmarks</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
            Longevity Lab Biomarkers: Standard vs. Optimal Target Ranges
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-2xs">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-stone-100 text-stone-700 font-extrabold text-[11px] uppercase border-b border-stone-200">
              <tr>
                <th className="py-3.5 px-4">Biomarker / Test</th>
                <th className="py-3.5 px-4">Standard Medical Range</th>
                <th className="py-3.5 px-4 text-emerald-800">Optimal Longevity Target</th>
                <th className="py-3.5 px-4">Bioenergetic Significance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-800">
              {BIOMARKERS.map((b, idx) => (
                <tr key={idx} className="hover:bg-emerald-50/50 transition">
                  <td className="py-3.5 px-4 font-bold text-stone-900">{b.name}</td>
                  <td className="py-3.5 px-4 text-stone-500 font-mono">{b.standard}</td>
                  <td className="py-3.5 px-4 text-emerald-900 font-mono font-bold">{b.optimal}</td>
                  <td className="py-3.5 px-4 text-stone-600 leading-relaxed">{b.significance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* SECTION 7: 24-HOUR DAILY LONGEVITY BLUEPRINT */}
      <div className="p-6 sm:p-8 rounded-3xl bg-teal-950 text-white space-y-6 shadow-xl border border-teal-900">
        
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>Circadian & Bioenergetic Protocol</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            The Optimal 24-Hour Anti-Aging Blueprint
          </h2>
          <p className="text-teal-200 text-xs sm:text-sm font-normal">
            Aligning light exposure, Zone 2 exercise, time-restricted feeding, thermal stress, and deep sleep.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-amber-300 font-bold text-sm">
              <span>🌅 07:00 AM</span>
              <Sun className="w-4 h-4" />
            </div>
            <div className="font-bold text-white">Circadian Reset & Hydration</div>
            <p className="text-teal-100 text-xs leading-relaxed">
              10–15 min morning sunlight exposure sets Sirtuin circadian clocks. 500ml water + electrolytes to hydrate cellular mitochondria.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-emerald-300 font-bold text-sm">
              <span>🏃 08:00 AM</span>
              <Flame className="w-4 h-4" />
            </div>
            <div className="font-bold text-white">Zone 2 Aerobic Session</div>
            <p className="text-teal-100 text-xs leading-relaxed">
              45–60 min steady Zone 2 cardio (conversational pace). Maximum FATmax oxidation, AMPK activation, and PGC-1α transcription.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-teal-300 font-bold text-sm">
              <span>🥗 01:00 PM</span>
              <Droplet className="w-4 h-4" />
            </div>
            <div className="font-bold text-white">Polyphenol Fast-Break</div>
            <p className="text-teal-100 text-xs leading-relaxed">
              Break 16-hour fast with extra virgin olive oil, dark berries, green leafies, clean protein. Minimizes glucose insulin spikes.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-purple-300 font-bold text-sm">
              <span>🌙 10:30 PM</span>
              <Moon className="w-4 h-4" />
            </div>
            <div className="font-bold text-white">Deep Glymphatic Sleep</div>
            <p className="text-teal-100 text-xs leading-relaxed">
              Cool room (18°C/65°F), zero blue light. Deep slow-wave sleep triggers growth hormone pulses and brain glymphatic waste clearance.
            </p>
          </div>

        </div>

      </div>

      {/* FOOTER CALLOUT & NEXT PAGE ACTION */}
      <div className="p-6 rounded-2xl bg-stone-100 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-emerald-700 shrink-0" />
          <div className="text-xs text-stone-700">
            <strong className="text-stone-900 block">Peer-Reviewed Longevity Science:</strong>
            Based on clinical longevity studies from Harvath DNA Epigenetics, Hallmarks of Aging (Lopez-Otin et al.), and Bioenergetic Zone 2 Physiology.
          </div>
        </div>
      </div>

    </article>
  );
}
