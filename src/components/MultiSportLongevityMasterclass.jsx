import React, { useState } from 'react';
import {
  Trophy, Activity, Heart, ShieldCheck, Flame, Zap, ExternalLink,
  CheckCircle2, Info, Maximize2, ZoomIn, ArrowUpRight, Calculator,
  Layers, Footprints, Dumbbell, TrendingDown, Award, Sparkles, RotateCcw
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine
} from 'recharts';

// Chart 1: Dose-response curve modeling Figure 2A from Han et al. (BMJ Medicine 2026; 5:e001513)
// Individual physical activities (0 - 40 MET hours/week) vs Hazard Ratio for All-Cause Mortality
const MODALITY_DOSE_DATA = [
  { metHours: 0, walking: 1.00, running: 1.00, jogging: 1.00, weights: 1.00, rowingCalisthenics: 1.00, tennis: 1.00, cycling: 1.00 },
  { metHours: 2, walking: 0.87, running: 0.89, jogging: 0.86, weights: 0.88, rowingCalisthenics: 0.89, tennis: 0.88, cycling: 0.90 },
  { metHours: 5, walking: 0.78, running: 0.85, jogging: 0.85, weights: 0.85, rowingCalisthenics: 0.88, tennis: 0.83, cycling: 0.95 },
  { metHours: 10, walking: 0.76, running: 0.89, jogging: 0.94, weights: 0.89, rowingCalisthenics: 0.90, tennis: 0.84, cycling: 1.00 },
  { metHours: 15, walking: 0.75, running: 0.86, jogging: 1.01, weights: 0.87, rowingCalisthenics: 0.84, tennis: 0.85, cycling: 0.99 },
  { metHours: 20, walking: 0.75, running: 0.83, jogging: null, weights: 0.85, rowingCalisthenics: 0.78, tennis: 0.85, cycling: 0.97 },
  { metHours: 25, walking: 0.75, running: 0.79, jogging: null, weights: null, rowingCalisthenics: null, tennis: 0.86, cycling: 0.96 },
  { metHours: 30, walking: 0.76, running: 0.75, jogging: null, weights: null, rowingCalisthenics: null, tennis: 0.86, cycling: 0.95 },
  { metHours: 35, walking: 0.76, running: null, jogging: null, weights: null, rowingCalisthenics: null, tennis: 0.86, cycling: null },
  { metHours: 40, walking: 0.76, running: null, jogging: null, weights: null, rowingCalisthenics: null, tennis: null, cycling: null },
];

// Chart 2: Total Physical Activity (0 - 100 MET hours/week) vs Cause-Specific Mortality Hazard Ratio
const TOTAL_VOLUME_MORTALITY_DATA = [
  { metHours: 0, allCause: 1.00, cvd: 1.00, cancer: 1.00, respiratory: 1.00, other: 1.00 },
  { metHours: 5, allCause: 0.85, cvd: 0.81, cancer: 0.90, respiratory: 0.68, other: 0.88 },
  { metHours: 10, allCause: 0.76, cvd: 0.71, cancer: 0.84, respiratory: 0.54, other: 0.81 },
  { metHours: 15, allCause: 0.72, cvd: 0.67, cancer: 0.80, respiratory: 0.47, other: 0.78 },
  { metHours: 20, allCause: 0.70, cvd: 0.65, cancer: 0.79, respiratory: 0.45, other: 0.76 },
  { metHours: 30, allCause: 0.69, cvd: 0.64, cancer: 0.79, respiratory: 0.44, other: 0.75 },
  { metHours: 40, allCause: 0.69, cvd: 0.63, cancer: 0.79, respiratory: 0.43, other: 0.76 },
  { metHours: 60, allCause: 0.69, cvd: 0.62, cancer: 0.79, respiratory: 0.41, other: 0.80 },
  { metHours: 80, allCause: 0.70, cvd: 0.61, cancer: 0.79, respiratory: 0.39, other: 0.85 },
  { metHours: 100, allCause: 0.70, cvd: 0.60, cancer: 0.79, respiratory: 0.37, other: 0.89 },
];

const STUDY_MODALITIES = [
  {
    name: 'Walking (Brisk & Easy)',
    icon: '🚶',
    hr: '0.83',
    ci: '0.80 – 0.85',
    reduction: '-17%',
    curveBehavior: 'Steep drop to ~0.75 by 8–10 MET-h/wk; stays flat out to 40 MET-h/wk with zero J-curve.',
    systemTarget: 'Aerobic base, vascular endothelial shear stress, glycemic control, zero orthopedic/CNS strain.',
    highlight: true
  },
  {
    name: 'Tennis, Squash, Racquetball',
    icon: '🎾',
    hr: '0.85',
    ci: '0.80 – 0.89',
    reduction: '-15%',
    curveBehavior: 'Optimal drop around 5–10 MET-h/wk (~0.83), stable plateau out to 35 MET-h/wk.',
    systemTarget: 'Agility, lateral proprioception, visual-motor reaction speed, social engagement.',
    highlight: false
  },
  {
    name: 'Rowing or Calisthenics',
    icon: '🚣',
    hr: '0.86',
    ci: '0.82 – 0.90',
    reduction: '-14%',
    curveBehavior: 'Continuous downward slope reaching ~0.78 at 20 MET-h/wk.',
    systemTarget: 'Upper/lower body kinetic chain integration, core stability, postural endurance.',
    highlight: false
  },
  {
    name: 'Running',
    icon: '🏃',
    hr: '0.87',
    ci: '0.80 – 0.93',
    reduction: '-13%',
    curveBehavior: 'Strong drop at 3–5 MET-h/wk and sustained protection down to ~0.75 in trained runners.',
    systemTarget: 'Left-ventricular stroke volume, PGC-1α mitochondrial biogenesis, capillary density.',
    highlight: true
  },
  {
    name: 'Weight / Resistance Training',
    icon: '🏋️',
    hr: '0.87',
    ci: '0.82 – 0.91',
    reduction: '-13%',
    curveBehavior: 'Drops rapidly by 3–6 MET-h/wk (~0.85) and maintains protection up to 20 MET-h/wk.',
    systemTarget: 'Type II fiber preservation, osteogenic bone mineral density (DEXA), tendon stiffness.',
    highlight: true
  },
  {
    name: 'Jogging (Slow / Conversational)',
    icon: '🏃‍♂️',
    hr: '0.89',
    ci: '0.85 – 0.94',
    reduction: '-11%',
    curveBehavior: 'Sweet spot at 3–7 MET-h/wk (~0.85); excessive unrecovered volume shows diminishing returns.',
    systemTarget: 'FATmax lipid oxidation, parasympathetic vagal tone, gentle osteogenic loading.',
    highlight: true
  },
  {
    name: 'Bicycling',
    icon: '🚴',
    hr: '0.96',
    ci: '0.93 – 0.99',
    reduction: '-4%',
    curveBehavior: 'Modest inverse association across volume ranges.',
    systemTarget: 'Concentric-only quadriceps work, zero impact joint unloading.',
    highlight: false
  },
  {
    name: 'Lap Swimming',
    icon: '🏊',
    hr: '1.01',
    ci: '0.97 – 1.05',
    reduction: 'Neutral',
    curveBehavior: 'Flat curve near 1.00 (P=0.02); often confounded by self-selection of injured/arthritic cohorts.',
    systemTarget: 'Horizontal hydrostatic venous return, upper-body respiratory mechanics.',
    highlight: false
  },
];

export default function MultiSportLongevityMasterclass() {
  const [activeChartTab, setActiveChartTab] = useState('modalities'); // 'modalities' | 'total'
  const [zoomImage, setZoomImage] = useState(null);

  // Interactive Multi-Sport Portfolio Calculator State (Pre-loaded with Ishai's Age-79 Profile)
  const [walkHours, setWalkHours] = useState(4.0);       // ~3.3 METs -> 13.2 MET-h
  const [runHours, setRunHours] = useState(2.5);         // ~4.86 METs (Ishai's 10.2km run METs) -> 12.15 MET-h
  const [strengthHours, setStrengthHours] = useState(1.5); // ~3.5 METs -> 5.25 MET-h
  const [stairsCalisthenicsHours, setStairsCalisthenicsHours] = useState(1.0); // ~4.0 METs -> 4.0 MET-h

  const resetToIshaiProfile = () => {
    setWalkHours(4.0);
    setRunHours(2.5);
    setStrengthHours(1.5);
    setStairsCalisthenicsHours(1.0);
  };

  const walkMetH = +(walkHours * 3.3).toFixed(1);
  const runMetH = +(runHours * 4.86).toFixed(1);
  const strengthMetH = +(strengthHours * 3.5).toFixed(1);
  const stairsMetH = +(stairsCalisthenicsHours * 4.0).toFixed(1);
  const totalMetHours = +(walkMetH + runMetH + strengthMetH + stairsMetH).toFixed(1);

  // Count distinct active modalities (>= 0.5 hrs/week)
  const activeModalitiesCount = [
    walkHours >= 0.5,
    runHours >= 0.5,
    strengthHours >= 0.5,
    stairsCalisthenicsHours >= 0.5,
  ].filter(Boolean).length;

  const walkingSharePct = totalMetHours > 0 ? Math.round((walkMetH / totalMetHours) * 100) : 0;

  // Estimate volume mortality reduction (plateaus ~30% at 20+ MET-h/wk)
  const volumeReductionPct = totalMetHours === 0
    ? 0
    : totalMetHours < 20
      ? Math.round((totalMetHours / 20) * 30)
      : 30;

  // Independent Exercise Variety Bonus (up to +19% relative hazard reduction in highest quintile)
  const varietyBonusPct = activeModalitiesCount >= 4
    ? 19
    : activeModalitiesCount === 3
      ? 14
      : activeModalitiesCount === 2
        ? 8
        : 0;

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">

      {/* Article Header & Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-950 font-bold text-xs uppercase tracking-wider border border-emerald-300 inline-flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-emerald-700" />
            Article 42 • Expert Spotlight & Cohort Longevity
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 font-bold text-xs uppercase tracking-wider border border-blue-200 inline-flex items-center gap-1.5">
            🏥 BMJ Medicine 2026 • 111,467 Participants
          </span>
          <a
            href="https://x.com/Alan_Couzens/status/2117594856323449327"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-900 text-white text-xs font-bold hover:bg-black transition shadow-xs"
          >
            <span className="font-mono text-[12px]">𝕏</span>
            <span>@Alan_Couzens Post</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://bmjmedicine.bmj.com/content/5/1/e001513#sec-19"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition shadow-xs"
          >
            <span>BMJ Medicine Study (e001513)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
          The Multi-Sport Longevity Dividend:{' '}
          <span className="text-emerald-700">Why Variety (-19% Mortality) & Walking Anchor a 100-Year Life</span>
        </h1>
        <p className="text-stone-600 text-base sm:text-lg font-normal leading-relaxed max-w-4xl">
          Exercise physiologist <strong>Alan Couzens</strong> highlights a landmark 30-year Harvard cohort study published in <em>BMJ Medicine</em> (Han et al., 2026) tracking <strong>111,467 adults</strong>. 
          Discover why athletes with the highest <strong>exercise variety</strong> enjoy a <strong>19% lower risk of all-cause mortality</strong> independent of total volume—and why <strong>plain walking (HR = 0.83)</strong> is the undisputed foundation of the longevity dose-response curve.
        </p>

        {/* Dual Attribution Banner: Alan Couzens + Harvard BMJ Medicine Cohort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-stone-900 text-white border border-stone-800 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-md shrink-0 flex items-center justify-center font-black text-white text-lg">
              AC
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-extrabold text-white text-base">Alan Couzens, MS × BMJ Medicine (2026)</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                  30-Year Harvard Cohort (NHS & HPFS)
                </span>
              </div>
              <p className="text-stone-300 text-xs mt-0.5">
                Han et al., &ldquo;Physical activity types, variety, and mortality: results from two prospective cohort studies&rdquo; • <em>BMJ Medicine</em> 2026;5(1):e001513
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-800 text-[11px] font-mono text-stone-400">
            <div>DOI: 10.1136/bmjmed-2025-001513</div>
            <div className="text-emerald-400 font-bold">70,725 Women + 40,742 Men</div>
          </div>
        </div>
      </div>

      {/* Original Post & Dual BMJ Medicine Figures Showcase */}
      <div className="p-6 rounded-3xl bg-stone-50 border border-stone-300 space-y-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2 text-stone-800 text-xs font-bold uppercase tracking-wider">
            <span className="font-mono text-base text-stone-900">𝕏</span>
            Official Post by Alan Couzens (@Alan_Couzens • Nov 3, 2026)
          </div>
          <span className="text-[11px] font-mono text-stone-500">Click either BMJ chart to inspect full resolution</span>
        </div>

        <blockquote className="p-5 rounded-2xl bg-white border-l-4 border-emerald-600 text-stone-900 space-y-2 shadow-xs">
          <p className="font-bold text-base sm:text-lg text-stone-900">
            &ldquo;Want to live a long time? Be a multi sport athlete! 🏊🚴🏃🚶🏋️&rdquo;
          </p>
          <p className="text-sm sm:text-base text-stone-700 font-medium">
            &ldquo;Those with the highest amount of exercise variety had <strong className="text-emerald-800">19% lower all-cause mortality</strong>. And make sure a good chunk of that volume is <strong className="text-blue-800">plain ol&rsquo; walking! 🚶</strong>&rdquo;
          </p>
          <div className="pt-1 text-xs font-mono text-emerald-700">
            Source: https://bmjmedicine.bmj.com/content/5/1/e001513#sec-19
          </div>
        </blockquote>

        {/* Side-by-Side Original BMJ Medicine Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Figure 1: Individual Activities */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-600 font-mono">
              <span className="font-bold text-stone-800">Figure A: Individual Activities (0–40 MET-h/wk)</span>
              <button
                onClick={() => setZoomImage('./couzens-bmj-multisport-1.jpg')}
                className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-bold transition"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                Expand
              </button>
            </div>
            <div
              onClick={() => setZoomImage('./couzens-bmj-multisport-1.jpg')}
              className="overflow-hidden rounded-2xl border-2 border-stone-300 shadow-sm bg-white cursor-pointer group relative"
            >
              <img
                src="./couzens-bmj-multisport-1.jpg"
                alt="BMJ Medicine - Individual physical activities (MET hours/week) vs Hazard ratio for all-cause mortality"
                className="w-full h-72 object-contain p-2 mx-auto group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3.5 py-1.5 rounded-xl bg-stone-900/90 text-white font-bold text-xs flex items-center gap-1.5 shadow-md">
                  <ZoomIn className="w-4 h-4" /> View Full Chart
                </span>
              </div>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              <strong>Key Insight:</strong> Notice the solid <strong>Blue Curve (Walking)</strong>—it drops sharply to a ~0.75 Hazard Ratio by 8–10 MET-hours/week and remains rock-steady all the way to 40 MET-hours/week with zero J-curve rebound.
            </p>
          </div>

          {/* Figure 2: Total Physical Activity vs Mortality Causes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-600 font-mono">
              <span className="font-bold text-stone-800">Figure B: Total Activity vs. Cause-Specific Mortality</span>
              <button
                onClick={() => setZoomImage('./couzens-bmj-multisport-2.jpg')}
                className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-bold transition"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                Expand
              </button>
            </div>
            <div
              onClick={() => setZoomImage('./couzens-bmj-multisport-2.jpg')}
              className="overflow-hidden rounded-2xl border-2 border-stone-300 shadow-sm bg-white cursor-pointer group relative"
            >
              <img
                src="./couzens-bmj-multisport-2.jpg"
                alt="BMJ Medicine - Total physical activity (MET hours/week) vs All-cause, CVD, Cancer, and Respiratory mortality"
                className="w-full h-72 object-contain p-2 mx-auto group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3.5 py-1.5 rounded-xl bg-stone-900/90 text-white font-bold text-xs flex items-center gap-1.5 shadow-md">
                  <ZoomIn className="w-4 h-4" /> View Full Chart
                </span>
              </div>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              <strong>Key Insight:</strong> Across all 111,467 participants, steep mortality reduction occurs between <strong>0 and 20 MET-hours/week</strong> (All-cause HR ~0.70, Cardiovascular HR ~0.65, Respiratory HR ~0.45), plateauing thereafter.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Pillars of the BMJ Medicine Study */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-2 shadow-2xs">
          <div className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            1. The Variety Effect (-19%)
          </div>
          <div className="text-3xl font-black text-emerald-950 font-mono">-19% Mortality</div>
          <p className="text-xs text-stone-700 leading-relaxed">
            Even when holding <strong>total exercise volume (MET-hours/week)</strong> constant, participants in the highest quintile of <strong>exercise variety</strong> had a 19% lower risk of premature death (and 13%–41% lower risk from CVD, cancer, and respiratory disease) than single-sport specialists.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-blue-50 border border-blue-200 space-y-2 shadow-2xs">
          <div className="text-xs font-black uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
            <Footprints className="w-4 h-4 text-blue-700" />
            2. Walking Is King (HR = 0.83)
          </div>
          <div className="text-3xl font-black text-blue-950 font-mono">-17% Risk (0.83)</div>
          <p className="text-xs text-stone-700 leading-relaxed">
            Among all individual modalities, <strong>plain walking</strong> showed the strongest, most consistent inverse association with mortality (pooled HR = 0.83, 95% CI: 0.80–0.85)—delivering massive vascular and metabolic protection with zero autonomic burnout.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200 space-y-2 shadow-2xs">
          <div className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-amber-700" />
            3. The 20 MET-h/wk Inflection
          </div>
          <div className="text-3xl font-black text-amber-950 font-mono">~20 MET-h/wk</div>
          <p className="text-xs text-stone-700 leading-relaxed">
            Total volume benefits plateau around <strong>20 MET-hours/week</strong> (~4–5 hours of mixed Zone 2 running, brisk walking, and resistance work). Beyond 20 MET-h/wk, <strong>diversifying modalities</strong> yields far greater longevity returns than grinding more single-sport volume.
          </p>
        </div>
      </div>

      {/* Interactive Recharts Dose-Response Explorer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-slate-900 to-emerald-950 text-white border border-stone-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <TrendingDown className="w-4 h-4" />
              Interactive BMJ Medicine Cohort Data Explorer
            </div>
            <h3 className="text-2xl font-black text-white mt-1">
              {activeChartTab === 'modalities'
                ? 'Dose-Response by Exercise Modality (0 – 40 MET-Hours/Week)'
                : 'Total Physical Activity vs. Cause-Specific Mortality (0 – 100 MET-Hours/Week)'}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveChartTab('modalities')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition border ${
                activeChartTab === 'modalities'
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-xs'
                  : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
              }`}
            >
              1. By Sport Modality (0–40 MET-h)
            </button>
            <button
              onClick={() => setActiveChartTab('total')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition border ${
                activeChartTab === 'total'
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-xs'
                  : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
              }`}
            >
              2. By Mortality Cause (0–100 MET-h)
            </button>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {activeChartTab === 'modalities' ? (
              <LineChart data={MODALITY_DOSE_DATA} margin={{ top: 10, right: 25, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="metHours"
                  stroke="#94a3b8"
                  tick={{ fontSize: 11 }}
                  unit=" MET-h"
                />
                <YAxis
                  stroke="#94a3b8"
                  domain={[0.65, 1.05]}
                  tick={{ fontSize: 11 }}
                  label={{ value: 'Hazard Ratio (All-Cause Mortality)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(value, name) => [value ? `HR ${value.toFixed(2)} (${Math.round((1 - value) * 100)}% lower risk)` : 'N/A', name]}
                  labelFormatter={(label) => `Volume: ${label} MET-hours/week`}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <ReferenceLine y={1.0} stroke="#64748b" strokeDasharray="4 4" />
                <Line type="monotone" dataKey="walking" name="Walking (HR 0.83 • Flat Plateau)" stroke="#38bdf8" strokeWidth={3.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="running" name="Running (HR 0.87)" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 3 }} connectNulls />
                <Line type="monotone" dataKey="weights" name="Weight Training (HR 0.87)" stroke="#a855f7" strokeWidth={2.5} dot={{ r: 3 }} connectNulls />
                <Line type="monotone" dataKey="rowingCalisthenics" name="Rowing / Calisthenics (HR 0.86)" stroke="#14b8a6" strokeWidth={2} dot={{ r: 3 }} connectNulls />
                <Line type="monotone" dataKey="tennis" name="Tennis / Racquet (HR 0.85)" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} connectNulls />
                <Line type="monotone" dataKey="jogging" name="Jogging (HR 0.89)" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} connectNulls />
              </LineChart>
            ) : (
              <LineChart data={TOTAL_VOLUME_MORTALITY_DATA} margin={{ top: 10, right: 25, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="metHours"
                  stroke="#94a3b8"
                  tick={{ fontSize: 11 }}
                  unit=" MET-h"
                />
                <YAxis
                  stroke="#94a3b8"
                  domain={[0.3, 1.05]}
                  tick={{ fontSize: 11 }}
                  label={{ value: 'Hazard Ratio (95% CI)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(value, name) => [`HR ${value.toFixed(2)} (${Math.round((1 - value) * 100)}% lower risk)`, name]}
                  labelFormatter={(label) => `Total Volume: ${label} MET-hours/week`}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <ReferenceLine x={20} stroke="#10b981" strokeDasharray="3 3" label={{ value: '20 MET-h Sweet Spot', fill: '#10b981', fontSize: 11, position: 'top' }} />
                <Line type="monotone" dataKey="allCause" name="All-Cause Mortality" stroke="#38bdf8" strokeWidth={3.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="cvd" name="Cardiovascular Disease" stroke="#f59e0b" strokeWidth={3} dot={{ r: 3.5 }} />
                <Line type="monotone" dataKey="respiratory" name="Respiratory Disease" stroke="#a855f7" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="cancer" name="Cancer Mortality" stroke="#ec4899" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 text-xs text-stone-300 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <strong className="text-emerald-400">Why Alan Couzens Emphasizes Walking:</strong> High-intensity single-sport volume can trigger a sympathetic &ldquo;J-curve&rdquo; uptick when recovery is exceeded. Walking (`3.0–3.8 METs`) allows you to accumulate massive aerobic volume (`10–25+ MET-hours/week`) on recovery days between Zone 2 runs while keeping cortisol, blood pressure afterload, and joint shear near zero.
          </div>
        </div>
      </div>

      {/* Complete Pooled Hazard Ratio Table (All 8 Modalities) */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
          <div>
            <h3 className="text-xl font-black text-stone-900">
              Pooled Multivariable-Adjusted Hazard Ratios by Activity Type
            </h3>
            <p className="text-xs text-stone-500">
              Comparing highest vs. lowest volume categories across Nurses&rsquo; Health Study &amp; Health Professionals Follow-Up Study (Han et al., <em>BMJ Medicine</em> 2026)
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-mono font-bold text-xs">
            n = 111,467 • 30-Yr Follow-Up
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-300 text-stone-500 font-bold uppercase text-[10px] tracking-wider bg-stone-100/80">
                <th className="py-3 px-3">Activity Modality</th>
                <th className="py-3 px-3">Pooled HR (95% CI)</th>
                <th className="py-3 px-3">Mortality Reduction</th>
                <th className="py-3 px-3">Dose-Response Curve Behavior</th>
                <th className="py-3 px-3">Primary Longevity System Targeted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-800">
              {STUDY_MODALITIES.map((item, idx) => (
                <tr
                  key={idx}
                  className={item.highlight ? 'bg-emerald-50/60 font-medium' : 'hover:bg-stone-50'}
                >
                  <td className="py-3 px-3 font-bold text-stone-900 whitespace-nowrap">
                    <span className="mr-1.5 text-base">{item.icon}</span>
                    {item.name}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-stone-900 whitespace-nowrap">
                    {item.hr} <span className="text-stone-500 font-normal">({item.ci})</span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-full font-mono font-extrabold text-[11px] ${
                      item.reduction.startsWith('-')
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-stone-200 text-stone-700'
                    }`}>
                      {item.reduction}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-stone-700 leading-relaxed">{item.curveBehavior}</td>
                  <td className="py-3 px-3 text-stone-600 leading-relaxed">{item.systemTarget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Multi-Sport Longevity Portfolio Calculator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 text-white border border-stone-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              Interactive Multi-Sport Longevity Portfolio Planner
            </div>
            <h3 className="text-2xl font-black text-white mt-1">
              Weekly MET-Hours &amp; Exercise Variety Simulator
            </h3>
          </div>
          <button
            onClick={resetToIshaiProfile}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 text-xs font-bold border border-emerald-600 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Ishai&rsquo;s Age-79 Profile
          </button>
        </div>

        {/* 4 Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-4 rounded-2xl bg-stone-800/70 border border-stone-700 space-y-2">
            <div className="flex justify-between text-xs font-bold text-sky-300">
              <span>🚶 Walking (3.3 METs)</span>
              <span className="font-mono text-white">{walkHours} hrs/wk</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={walkHours}
              onChange={(e) => setWalkHours(Number(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-stone-400">
              <span>HR = 0.83 (-17%)</span>
              <span className="text-sky-400 font-bold">{walkMetH} MET-h</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/70 border border-stone-700 space-y-2">
            <div className="flex justify-between text-xs font-bold text-emerald-300">
              <span>🏃 Zone 2 Run (4.86 METs)</span>
              <span className="font-mono text-white">{runHours} hrs/wk</span>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              step="0.5"
              value={runHours}
              onChange={(e) => setRunHours(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-stone-400">
              <span>HR = 0.87 (-13%)</span>
              <span className="text-emerald-400 font-bold">{runMetH} MET-h</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/70 border border-stone-700 space-y-2">
            <div className="flex justify-between text-xs font-bold text-purple-300">
              <span>🏋️ Resistance / Weights (3.5 METs)</span>
              <span className="font-mono text-white">{strengthHours} hrs/wk</span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              step="0.5"
              value={strengthHours}
              onChange={(e) => setStrengthHours(Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-stone-400">
              <span>HR = 0.87 (-13%)</span>
              <span className="text-purple-400 font-bold">{strengthMetH} MET-h</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/70 border border-stone-700 space-y-2">
            <div className="flex justify-between text-xs font-bold text-amber-300">
              <span>🚣 Calisthenics &amp; Stairs (4.0 METs)</span>
              <span className="font-mono text-white">{stairsCalisthenicsHours} hrs/wk</span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              step="0.5"
              value={stairsCalisthenicsHours}
              onChange={(e) => setStairsCalisthenicsHours(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-stone-400">
              <span>HR = 0.86 (-14%)</span>
              <span className="text-amber-400 font-bold">{stairsMetH} MET-h</span>
            </div>
          </div>
        </div>

        {/* Summary Output Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-stone-800 border border-stone-700 space-y-1">
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Total Weekly Volume</div>
            <div className="text-2xl font-black text-emerald-400 font-mono">{totalMetHours} MET-h</div>
            <div className="text-[10px] text-stone-400 font-mono">
              {totalMetHours >= 20 ? '✅ Above 20 MET-h Sweet Spot' : `Target: 20.0+ MET-h/wk`}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800 border border-stone-700 space-y-1">
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Active Modalities</div>
            <div className="text-2xl font-black text-sky-400 font-mono">{activeModalitiesCount} / 4 Pillars</div>
            <div className="text-[10px] text-stone-400 font-mono">
              {activeModalitiesCount >= 4 ? '🏆 Top Variety Quintile' : 'Add modalities for full bonus'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800 border border-stone-700 space-y-1">
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Walking Volume Share</div>
            <div className="text-2xl font-black text-amber-400 font-mono">{walkingSharePct}%</div>
            <div className="text-[10px] text-stone-400 font-mono">
              {walkMetH} MET-h low-stress base
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-600/60 space-y-1">
            <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">Variety Dividend</div>
            <div className="text-2xl font-black text-white font-mono">-{varietyBonusPct}% Risk</div>
            <div className="text-[10px] text-emerald-300 font-mono">
              Independent of {volumeReductionPct}% volume effect
            </div>
          </div>
        </div>
      </div>

      {/* Direct Connection to Ishai's Telemetry, Cardiology & 10.20 km Champion Run */}
      <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-300 space-y-4">
        <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-lg">
          <ShieldCheck className="w-6 h-6 text-emerald-700" />
          How Your Age-79 Protocol Embodies the BMJ Medicine &amp; Alan Couzens Model
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-emerald-200 space-y-2 shadow-2xs">
            <div className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              1. 10.20 km Run + Walking Recovery Days
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Your <strong>November 1, 2026 Champion Run (10.20 km in 2:06:29 at 113.0 BPM, 4.86 METs)</strong> generated <strong>10.2 MET-hours</strong> in a single aerobic session. Because you pair every run with <strong>2 mandatory recovery days of plain walking</strong>, you combine the #1 longevity staple in the BMJ study (<strong>Walking, HR = 0.83</strong>) with <strong>Zone 2 Running (HR = 0.87)</strong> without ever crossing into the high-volume J-curve!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-emerald-200 space-y-2 shadow-2xs">
            <div className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              2. 12-MET Stress Echo &amp; Hemodynamic Safety
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Your <strong>October 21, 2026 Maccabi Stress Echocardiogram</strong> confirmed an extraordinary <strong>12 METs</strong> capacity at age 79.3 (100% negative for ischemia, blood pressure 120/80 → 150/80 mmHg) alongside stable <em>Moderate Aortic Insufficiency</em>. Spreading your weekly ~25–35 MET-hours across <strong>walking, Zone 2 jogging, calisthenics, and dynamic resistance</strong> keeps systolic afterload low while stimulating every organ system.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-emerald-200 space-y-2 shadow-2xs">
            <div className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              3. Multi-Plane Cartilage &amp; Bone Protection
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Repeating a single mechanical motion 7 days a week overloads the same patellofemoral and meniscal contact points. Alternating your <strong>140+ SPM &ldquo;whisper-step&rdquo; runs</strong> with plain walking, mobility/calisthenics, and strength maintenance distributes osteogenic loading across multiple planes—capturing the full <strong>-19% multi-sport longevity dividend</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Expanding Original Charts */}
      {zoomImage && (
        <div
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 sm:p-8 flex flex-col items-center justify-center animate-fade-in"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setZoomImage(null)}
              className="absolute -top-12 right-0 px-4 py-2 rounded-xl bg-white text-stone-900 font-bold text-xs hover:bg-stone-200 transition shadow-lg"
            >
              Close [✕]
            </button>
            <img
              src={zoomImage}
              alt="BMJ Medicine Full Resolution Chart"
              className="max-h-[85vh] w-auto object-contain rounded-2xl shadow-2xl border border-stone-700 bg-white p-2"
            />
          </div>
        </div>
      )}

      {/* Footer Citation */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs font-mono text-stone-600">
        <div>OPTIMUS — Longevity 65+ • Issue 01 • Article 42</div>
        <div className="flex flex-wrap items-center gap-3">
          <span>Alan Couzens, MS (@Alan_Couzens)</span>
          <span>•</span>
          <span>Han et al., BMJ Medicine 2026;5(1):e001513</span>
          <span>•</span>
          <a
            href="https://bmjmedicine.bmj.com/content/5/1/e001513#sec-19"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-800 font-bold hover:underline inline-flex items-center gap-1"
          >
            BMJ Medicine Full Text
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </article>
  );
}

