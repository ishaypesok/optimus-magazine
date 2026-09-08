import React from 'react';
import { PAGES_LIST } from './Sidebar';
import { BookOpen, ShieldCheck, Flame, User, Heart, Calculator, Trophy, Zap, Cpu, Activity, BatteryCharging, Sparkles, Layers, Orbit, Tv } from 'lucide-react';

export default function MagazineTableOfContents({ setPage }) {
  // Group pages by category for structured printing
  const categories = [
    'Fundamentals',
    'Personal Data',
    'Protocols',
    'Cell Biology',
    'Deep Physiology',
    'Calculators & Bioenergetics',
    'Field Studies',
    'Podcast & Bioenergetics'
  ];

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">
      
      {/* HEADER BAR */}
      <div className="border-b-2 border-stone-900 pb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-950 font-bold text-xs uppercase tracking-wider border border-emerald-300 inline-flex items-center gap-1.5 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            Official Print Index
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 uppercase tracking-tight">
            Table of Contents
          </h1>
          <p className="text-stone-600 text-sm font-normal">
            Complete Page Index for Issue 1 • 32 Articles Across Bioenergetics, Telemetry & Physiology
          </p>
        </div>
        <div className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
          32 Articles Cataloged
        </div>
      </div>

      {/* 2-COLUMN TABLE OF CONTENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm">
        {categories.map((cat, catIdx) => {
          const catPages = PAGES_LIST.filter(p => p.category === cat);
          if (catPages.length === 0) return null;

          return (
            <div key={catIdx} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 shadow-2xs">
              <h3 className="font-extrabold text-emerald-900 text-sm border-b border-stone-200 pb-2 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                {cat}
              </h3>

              <div className="space-y-2">
                {catPages.map((page) => {
                  const IconComponent = page.icon || BookOpen;
                  return (
                    <div
                      key={page.id}
                      onClick={() => setPage && setPage(page.id)}
                      className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-white hover:shadow-xs transition cursor-pointer border border-transparent hover:border-stone-200 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <IconComponent className="w-4 h-4 text-emerald-700 shrink-0 group-hover:scale-110 transition" />
                        <span className="font-semibold text-stone-800 group-hover:text-emerald-950 truncate">
                          {page.title}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 font-mono">
                          {page.badge}
                        </span>
                        <span className="font-mono font-bold text-emerald-800 text-xs bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                          P. {page.id}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER ACCENT */}
      <div className="p-4 rounded-xl bg-stone-900 text-white text-xs font-mono flex items-center justify-between">
        <span>Optimus Magazine • Issue 01</span>
        <span className="text-emerald-400 font-bold">Bioenergetics Science Press</span>
      </div>

    </article>
  );
}
