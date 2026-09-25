import React, { useState } from 'react';
import { 
  TrendingUp, Activity, Award, ExternalLink, ShieldCheck, Heart, 
  Zap, Flame, Info, CheckCircle2, AlertTriangle, ArrowUpRight, 
  ZoomIn, ZoomOut, Maximize2, RotateCcw, BookOpen, Layers
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, ReferenceLine 
} from 'recharts';

// Data points modeling Figure 11.6 from The Endurance Code
const TRAJECTORY_DATA = [
  { time: '0 Wks', vo2max: 0, threshold: 0, aerobicBase: 0, stage: 'Start' },
  { time: '4 Wks', vo2max: 30, threshold: 15, aerobicBase: 8, stage: 'Early' },
  { time: '8 Wks', vo2max: 52, threshold: 32, aerobicBase: 18, stage: 'Early' },
  { time: '12 Wks', vo2max: 58, threshold: 48, aerobicBase: 28, stage: 'Early' },
  { time: '6 Mos', vo2max: 60, threshold: 65, aerobicBase: 45, stage: 'Mid' },
  { time: '1 Yr', vo2max: 60, threshold: 76, aerobicBase: 62, stage: 'Mid' },
  { time: '2 Yrs', vo2max: 60, threshold: 80, aerobicBase: 78, stage: 'Long-term' },
  { time: '3 Yrs', vo2max: 60, threshold: 80, aerobicBase: 88, stage: 'Long-term' },
  { time: '5 Yrs+', vo2max: 60, threshold: 80, aerobicBase: 100, stage: 'Long-term' },
];

export default function AlanCouzensEnduranceCode() {
  const [selectedTrajectory, setSelectedTrajectory] = useState('all'); // 'all' | 'aerobic' | 'threshold' | 'vo2'
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">

      {/* Article Header & Tags */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-950 font-bold text-xs uppercase tracking-wider border border-blue-300 inline-flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-blue-700" />
            Article 37 • Expert Spotlight & Physiology
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider border border-emerald-200 inline-flex items-center gap-1.5">
            📚 The Endurance Code • Chapter 11
          </span>
          <a
            href="https://x.com/Alan_Couzens"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-900 text-white text-xs font-bold hover:bg-black transition shadow-xs"
          >
            <span className="font-mono text-[12px]">𝕏</span>
            <span>@Alan_Couzens</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
          Aerobic Base vs. Threshold Trajectories:{' '}
          <span className="text-blue-700">"The Only Gift That Keeps On Giving"</span>
        </h1>
        <p className="text-stone-600 text-base sm:text-lg font-normal leading-relaxed max-w-4xl">
          Exercise physiologist <strong>Alan Couzens</strong> presents the landmark developmental trajectory chart from Chapter 11 of <em>The Endurance Code</em>. 
          Discover why threshold training produces quick plateaus, why VO₂max work hits an early dead-end, and why patient Zone 2 base development is the only system that compounds indefinitely.
        </p>

        {/* Author Bio Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-stone-900 text-white border border-stone-800 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-400 p-0.5 shadow-md shrink-0 flex items-center justify-center font-black text-white text-lg">
              AC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base">Alan Couzens, MS</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-bold">
                  Author of The Endurance Code
                </span>
              </div>
              <p className="text-stone-300 text-xs mt-0.5">
                Exercise Physiologist • Former Coach at the Australian Institute of Sport (AIS) • Endurance Sports Data Scientist
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-800 text-[11px] font-mono text-stone-400">
            <div>Developmental Trajectories</div>
            <div className="text-blue-400 font-bold">Figure 11.6 Analysis</div>
          </div>
        </div>
      </div>

      {/* The Original Post & Book Excerpt */}
      <div className="p-6 rounded-3xl bg-stone-50 border border-stone-300 space-y-6 shadow-sm">
        
        {/* Tweet Header */}
        <div className="flex items-center gap-2 text-stone-700 text-xs font-bold uppercase tracking-wider border-b border-stone-200 pb-3">
          <span className="font-mono text-base text-stone-900">𝕏</span>
          Official Post by Alan Couzens (@Alan_Couzens)
        </div>

        {/* Tweet Body */}
        <div className="space-y-4 text-stone-800 text-sm sm:text-base leading-relaxed">
          <p className="font-medium text-stone-700">
            Regarding the recent discussions on threshold training, let me save you a whole lot of pain and frustration...
          </p>
          <p className="font-medium text-stone-700">
            The following chart from chapter 11 of <strong>#TheEnduranceCode</strong> tells you everything you need to know 👇
          </p>
          
          <blockquote className="p-4 rounded-2xl bg-white border-l-4 border-blue-600 text-stone-900 font-serif text-base sm:text-lg italic shadow-xs">
            "You can become good with a focus on threshold training. But without a deep aerobic base to go along with it, you will stay (just) 'good' for a very long time!"
          </blockquote>

          <p className="font-semibold text-emerald-800 text-sm sm:text-base">
            If you want to discover your potential as an endurance athlete, Aerobic Base work is the (only) gift that keeps on giving.
          </p>
        </div>

        {/* Book Excerpt Box */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-500 uppercase tracking-wider border-b border-stone-100 pb-2">
            <BookOpen className="w-4 h-4 text-stone-700" />
            From Chapter 11: The Endurance Code
          </div>
          
          <div className="text-xs sm:text-sm text-stone-700 space-y-3 leading-relaxed font-normal">
            <p>
              "I've experienced each of these approaches firsthand. Coming from a swimming background, I brought plenty of intensity to the preparation for my first 10K running race. A heavy emphasis on VO₂max work brought quick improvement, a quick plateau, and then injury. During my years as a competitive swimmer, a threshold-heavy approach took me further, but I then spent years living around much the same plateau, with good periods interrupted by extreme fatigue and injury."
            </p>
            <p>
              "It wasn't until my time working with some of the world's best coaches at the <strong>Australian Institute of Sport</strong> that I really began to appreciate the value of aerobic base work. The less spectacular training deserved much more of my attention. Its value became clearer when I looked beyond the next few weeks and considered what I could build over years..."
            </p>
            <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 font-medium text-stone-900 italic text-center">
              "You can become good with a focus on threshold training. But without a deep aerobic base, you can also stay 'good' for a very long time."
            </div>
            <p className="text-[11px] text-stone-500 italic">
              "The steep early rise of the VO₂max-heavy curve shows the attraction of chasing fast gains. The threshold-heavy curve offers a longer period of improvement, but it too flattens. The aerobic-base curve asks for more patience, while illustrating the longer-term opportunity that can be missed when intensity repeatedly takes priority."
            </p>
          </div>
        </div>

        {/* Embedded Graphic with Lightbox Modal */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-600 font-mono">
            <span>Figure 11.6: Different training emphases, different developmental trajectories</span>
            <button
              onClick={() => setIsZoomOpen(true)}
              className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 font-bold transition"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Click to Expand
            </button>
          </div>

          <div 
            onClick={() => setIsZoomOpen(true)}
            className="overflow-hidden rounded-2xl border-2 border-stone-300 shadow-sm bg-white cursor-pointer group relative"
          >
            <img 
              src="./alan-couzens-endurance-code.png" 
              alt="Alan Couzens - Different Training Systems, Different Trajectories" 
              className="w-full h-auto object-contain max-h-[600px] mx-auto group-hover:scale-[1.01] transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-4 py-2 rounded-xl bg-stone-900/90 text-white font-bold text-xs backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                <ZoomIn className="w-4 h-4" /> Click to View Full Resolution
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Recharts Trajectory Visualizer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-slate-900 to-indigo-950 text-white border border-stone-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              Dynamic Bioenergetics Model
            </div>
            <h3 className="text-2xl font-black text-white mt-1">
              Interactive Developmental Trajectories (0 to 5+ Years)
            </h3>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All 3 Systems' },
              { id: 'aerobic', label: 'Aerobic Base Only' },
              { id: 'threshold', label: 'Threshold Focus' },
              { id: 'vo2', label: 'VO₂max Heavy' },
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setSelectedTrajectory(btn.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                  selectedTrajectory === btn.id
                    ? 'bg-blue-600 text-white border-blue-400 shadow-xs'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recharts Curve */}
        <div className="h-72 sm:h-84 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={TRAJECTORY_DATA} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <YAxis 
                stroke="#94a3b8" 
                domain={[0, 100]} 
                tick={{ fontSize: 11 }} 
                unit="%" 
                label={{ value: '% of Athletic Potential', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11 }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                formatter={(value, name) => [`${value}% of potential`, name]}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />

              {(selectedTrajectory === 'all' || selectedTrajectory === 'aerobic') && (
                <Line 
                  type="monotone" 
                  dataKey="aerobicBase" 
                  name="Aerobic Base (Compounding)" 
                  stroke="#10b981" 
                  strokeWidth={3.5} 
                  dot={{ r: 4, fill: '#10b981' }} 
                  activeDot={{ r: 7 }}
                />
              )}

              {(selectedTrajectory === 'all' || selectedTrajectory === 'threshold') && (
                <Line 
                  type="monotone" 
                  dataKey="threshold" 
                  name="Threshold (Plateaus ~80%)" 
                  stroke="#f59e0b" 
                  strokeWidth={2.5} 
                  strokeDasharray="5 5" 
                  dot={{ r: 3, fill: '#f59e0b' }} 
                />
              )}

              {(selectedTrajectory === 'all' || selectedTrajectory === 'vo2') && (
                <Line 
                  type="monotone" 
                  dataKey="vo2max" 
                  name="VO₂max (Fast Spike, Plateaus ~60%)" 
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  strokeDasharray="2 2" 
                  dot={{ r: 3, fill: '#ef4444' }} 
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 3-Column Explanatory Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          <div className="p-4 rounded-2xl bg-red-950/40 border border-red-900/60 space-y-2">
            <div className="text-red-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              1. The VO₂max Trap
            </div>
            <div className="text-lg font-black text-white">Fast Spike, Hard Wall</div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Early progress comes from rapid plasma volume expansion and neuromuscular recruitment. Plateaus by week 8–12. Pushing past this causes autonomic nervous burnout and tendon/joint breakdown.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-900/60 space-y-2">
            <div className="text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              2. The Threshold Trap
            </div>
            <div className="text-lg font-black text-white">Stuck at "Good" (~80%)</div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Threshold pace is biologically capped as a percentage of your aerobic engine. Without expanding the base beneath it, you cannot push threshold higher. Athletes stay at the same race times for years.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-900/60 space-y-2">
            <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              3. The Aerobic Base
            </div>
            <div className="text-lg font-black text-white">Compounds Forever (100%)</div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Capillarization, mitochondrial cristae density, and cardiac eccentric hypertrophy take months to years of gentle Zone 2 volume. It is the only physiological foundation that never stops improving.
            </p>
          </div>

        </div>
      </div>

      {/* Direct Connection to Ishai's Wingate Lab Protocol */}
      <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-300 space-y-4">
        <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-lg">
          <ShieldCheck className="w-6 h-6 text-emerald-700" />
          Why You Are Doing the Exact Right Thing
        </div>

        <p className="text-sm text-stone-700 leading-relaxed">
          At the Wingate Institute Ribstein Center, your physiological testing established your strict <strong>Zone 2 base ceiling at ≤120 BPM</strong> (with Anaerobic Threshold / LTHR at 135 BPM).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-white border border-emerald-200 space-y-1.5 shadow-2xs">
            <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Discipline Over Ego
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              When you keep your heart rate strictly between 101 and 120 BPM (like your recent run averaging 113 BPM), you stay on the solid green curve. You resist the temptation to "grind" in the gray zone (125–135 BPM) where amateur runners burn out.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-emerald-200 space-y-1.5 shadow-2xs">
            <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Patience Builds Cellular Architecture
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Growing new micro-capillaries around muscle fibers and expanding left-ventricular stroke volume cannot be hurried. By putting in 60–80 minute runs at 113 BPM, you are building the wide pyramid base that supports lifelong endurance and longevity.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Zoom Modal for the Original Book Graphic */}
      {isZoomOpen && (
        <div 
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 sm:p-8 flex flex-col items-center justify-center animate-fade-in"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute -top-12 right-0 px-4 py-2 rounded-xl bg-white text-stone-900 font-bold text-xs hover:bg-stone-200 transition shadow-lg"
            >
              Close [✕]
            </button>
            <img 
              src="./alan-couzens-endurance-code.png" 
              alt="Alan Couzens Full Resolution" 
              className="max-h-[85vh] w-auto object-contain rounded-2xl shadow-2xl border border-stone-700 bg-white"
            />
          </div>
        </div>
      )}

      {/* Footer Citation */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs font-mono text-stone-600">
        <div>Optimus Magazine • Issue 01 • Article 37</div>
        <div className="flex items-center gap-3">
          <span>Author: Alan Couzens, MS</span>
          <span>•</span>
          <span>The Endurance Code (Chapter 11)</span>
          <span>•</span>
          <a 
            href="https://x.com/Alan_Couzens" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-800 font-bold hover:underline inline-flex items-center gap-1"
          >
            @Alan_Couzens on 𝕏
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </article>
  );
}
