import React, { useState } from 'react';
import { Activity, Zap, ExternalLink, ChevronRight, ChevronLeft, Droplet, Heart, TrendingUp, Award } from 'lucide-react';

const TWEET_IMAGES = [
  {
    src: 'https://pbs.twimg.com/media/HSr64y_WEAAsqty?format=webp&name=medium',
    alt: 'VO₂max vs Lactate — Dr. Iñigo San Millán infographic slide 1',
  },
  {
    src: 'https://pbs.twimg.com/media/HSr64zHXcAASZfD?format=webp&name=medium',
    alt: 'VO₂max vs Lactate — Dr. Iñigo San Millán infographic slide 2',
  },
  {
    src: 'https://pbs.twimg.com/media/HSr64y9XAAAcVcC?format=webp&name=medium',
    alt: 'VO₂max vs Lactate — Dr. Iñigo San Millán infographic slide 3',
  },
  {
    src: 'https://pbs.twimg.com/media/HSr64zAWQAArFqh?format=webp&name=medium',
    alt: 'VO₂max vs Lactate — Dr. Iñigo San Millán infographic slide 4',
  },
];

const KEY_INSIGHTS = [
  {
    icon: Heart,
    color: 'text-red-700',
    bg: 'bg-red-50 border-red-200',
    title: 'VO₂max — Powerful But Incomplete',
    body: 'VO₂max is one of our most powerful markers of cardiorespiratory fitness, integrating the ability of the lungs, heart, circulation, and muscles to deliver and use oxygen. But it only measures delivery — not what happens inside the cell.',
  },
  {
    icon: Zap,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50 border-emerald-200',
    title: 'Lactate Is Not a Waste Product',
    body: 'Lactate is a major fuel and signaling molecule. Its kinetics provide an indirect window into what is happening at the mitochondrial level. Lactate is a great proxy for mitochondrial function and metabolic health.',
  },
  {
    icon: TrendingUp,
    color: 'text-blue-700',
    bg: 'bg-blue-50 border-blue-200',
    title: 'Lactate Clearance = Mitochondrial Power',
    body: 'Increased lactate clearance capacity is directly associated with greater mitochondrial content and oxidative capacity. The faster your muscles clear lactate, the more efficient and powerful your mitochondria are.',
  },
  {
    icon: Activity,
    color: 'text-violet-700',
    bg: 'bg-violet-50 border-violet-200',
    title: 'Complementary — Not Competing',
    body: 'VO₂max and Lactate metrics are complementary parameters. A high VO₂max athlete with poor lactate clearance is not as metabolically healthy as one who has both. You need both lenses to see the full picture.',
  },
];

export default function SanMillanVO2maxSpotlight() {
  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () => setActiveSlide(i => Math.max(i - 1, 0));
  const nextSlide = () => setActiveSlide(i => Math.min(i + 1, TWEET_IMAGES.length - 1));

  return (
    <article className="space-y-8 animate-fade-in font-sans">

      {/* Article Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 font-bold text-xs uppercase tracking-wider border border-blue-200 inline-flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-700" />
            Page 34 • Expert Spotlight
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs uppercase tracking-wider border border-emerald-200 inline-flex items-center gap-1.5">
            🧬 Mitochondria & Metabolism
          </span>
          <a
            href="https://x.com/doctorinigo/status/2101768037452116035"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-900 text-white text-[11px] font-bold hover:bg-black transition"
          >
            <span className="font-mono text-[12px]">𝕏</span>
            View on X
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-stone-900 leading-tight tracking-tight">
          VO₂max vs. Lactate:{' '}
          <span className="text-blue-700">Why One Number Isn't Enough</span>
        </h2>

        {/* Author Attribution */}
        <div className="flex items-center gap-3 py-3 px-4 rounded-2xl bg-stone-900 border border-stone-700 w-fit">
          <img
            src="https://pbs.twimg.com/profile_images/2010643137417347072/uj9F7xEs_normal.jpg"
            alt="Dr. Iñigo San Millán"
            className="w-10 h-10 rounded-full border-2 border-blue-400 object-cover"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-bold text-sm">Iñigo San Millán, PhD</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="14" height="14" className="shrink-0">
                <path fill="#1d9bf0" fillRule="evenodd" d="M12 1.75c1.4 0 2.62.87 3.34 2.19 1.44-.43 2.92-.17 3.91.81s1.24 2.47.81 3.91c1.32.72 2.2 1.94 2.2 3.34s-.88 2.62-2.2 3.34c.43 1.44.18 2.92-.81 3.9-.99 1-2.47 1.25-3.91.82-.72 1.32-1.94 2.19-3.34 2.19s-2.62-.87-3.34-2.2c-1.44.44-2.92.18-3.9-.8-1-.99-1.24-2.47-.82-3.91-1.32-.72-2.19-1.95-2.19-3.34 0-1.4.87-2.62 2.2-3.34-.43-1.44-.18-2.92.8-3.9.99-1 2.47-1.25 3.91-.82.72-1.32 1.95-2.19 3.34-2.19M10.45 13.3l-2.23-2.25-1.42 1.4 3.7 3.75 6.24-6.77-1.47-1.36z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-stone-400 text-[11px] font-medium">@doctorinigo · September 20, 2026</p>
            <p className="text-stone-400 text-[10px]">Sports Scientist & Physician · Advisor to Tour de France champions</p>
          </div>
        </div>
      </div>

      {/* Original Tweet Block */}
      <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold uppercase tracking-wider">
          <span className="font-mono text-[14px] text-stone-800">𝕏</span>
          Original Thread by @doctorinigo
        </div>
        <blockquote className="text-stone-800 text-sm leading-relaxed font-normal space-y-3 border-l-4 border-blue-400 pl-4">
          <p>
            <strong>VO₂max is quite important. However, it doesn't tell the whole story…</strong>
          </p>
          <p>
            VO₂max is one of our most powerful markers of cardiorespiratory fitness, integrating the ability of the lungs, heart, circulation and muscles to deliver and use oxygen.
          </p>
          <p>
            But ultimately, oxygen has to reach the cell and mitochondria, where metabolism and energy production happen.
          </p>
          <p>
            Exercise profoundly adapts mitochondrial function, oxidative capacity, substrate utilization, metabolic flexibility and lactate metabolism.
          </p>
          <p>
            I have spent much of my career studying lactate and cellular bioenergetics. <strong>Lactate is not a waste product:</strong> it is a major fuel and signaling molecule, and its kinetics provide an indirect window into what is happening at the mitochondrial level. Lactate is a great proxy for mitochondrial function.
          </p>
          <p>
            Also, <strong>increased lactate clearance capacity is associated with greater mitochondrial content and oxidative capacity.</strong>
          </p>
          <p className="font-bold text-stone-900">
            VO₂max and Lactate are complementary, not competing parameters.
          </p>
          <p className="text-blue-600 text-xs font-medium">
            #VO2max #Lactate #Mitochondria #MetabolicHealth #Longevity
          </p>
        </blockquote>
      </div>

      {/* Image Carousel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-stone-700 uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-600" />
            Dr. San Millán's Infographic Slides ({activeSlide + 1} / {TWEET_IMAGES.length})
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              disabled={activeSlide === 0}
              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-40 transition border border-stone-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 text-stone-700" />
            </button>
            <button
              onClick={nextSlide}
              disabled={activeSlide === TWEET_IMAGES.length - 1}
              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-40 transition border border-stone-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 text-stone-700" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-stone-200 shadow-md bg-stone-950">
          <img
            key={activeSlide}
            src={TWEET_IMAGES[activeSlide].src}
            alt={TWEET_IMAGES[activeSlide].alt}
            className="w-full max-h-[500px] object-contain mx-auto animate-fade-in"
            loading="lazy"
          />
          {/* Slide dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {TWEET_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeSlide ? 'bg-white w-5' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <p className="text-xs text-stone-500 italic text-center">
          Original infographic images from{' '}
          <a
            href="https://x.com/doctorinigo/status/2101768037452116035"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            @doctorinigo on X
          </a>{' '}
          · September 20, 2026 · Marked "Made with AI"
        </p>
      </div>

      {/* Key Insights Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
          <Zap className="w-5 h-5 text-emerald-700" />
          Key Scientific Insights
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {KEY_INSIGHTS.map((insight, idx) => {
            const Icon = insight.icon;
            return (
              <div key={idx} className={`p-5 rounded-2xl border ${insight.bg} space-y-2 transition hover:shadow-sm`}>
                <div className={`flex items-center gap-2 font-bold text-sm ${insight.color}`}>
                  <Icon className="w-4 h-4 shrink-0" />
                  {insight.title}
                </div>
                <p className="text-stone-700 text-xs leading-relaxed font-normal">{insight.body}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ishai's Context Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white shadow-md border border-slate-700 space-y-3">
        <div className="text-amber-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
          <Droplet className="w-4 h-4 text-amber-400" />
          Why This Matters for Ishai
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-normal">
          Your Wingate Lab test confirmed your Zone 2 threshold at <strong className="text-emerald-400">101–120 BPM</strong>. This directly reflects lactate kinetics and mitochondrial efficiency — not just VO₂max. Dr. San Millán's framework means your Zone 2 sessions are continuously improving your lactate clearance rate, making your mitochondria stronger with every run.
        </p>
        <div className="text-xs text-emerald-300 font-semibold">
          📌 Your next Wingate test will confirm whether lactate clearance has improved alongside aerobic capacity.
        </div>
      </div>

      {/* Source Attribution */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200 text-xs text-stone-500">
        <div className="space-y-0.5">
          <div className="font-bold text-stone-700">Source</div>
          <div>
            Iñigo San Millán, PhD (@doctorinigo) · X/Twitter Thread
          </div>
          <div>Published: September 20, 2026</div>
        </div>
        <a
          href="https://x.com/doctorinigo/status/2101768037452116035"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-black transition shadow-sm"
        >
          <span className="font-mono text-[13px]">𝕏</span>
          View Original Thread
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </article>
  );
}
