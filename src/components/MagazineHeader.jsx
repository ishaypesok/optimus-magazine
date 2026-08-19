import React from 'react';
import { BookOpen, Sparkles, Search, Monitor } from 'lucide-react';

export default function MagazineHeader({ 
  activeArticle, 
  setActiveArticle,
  searchQuery,
  setSearchQuery,
  onOpenPresentation,
  onOpenQuiz
}) {
  return (
    <header className="sticky top-0 z-50 glass-panel-light border-b border-stone-200 px-4 lg:px-8 py-3.5 shadow-sm">
      <div className="max-w-7xl mx-auto space-y-3 font-sans">
        
        {/* Top Masthead Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Main Friendly Title */}
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-600 p-0.5 shadow-md shadow-emerald-700/10 overflow-hidden shrink-0">
              <img 
                src="./optimus-logo.jpg" 
                alt="Optimus Magazine Logo" 
                className="w-full h-full object-cover rounded-[14px]" 
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-stone-900">
                  OPTIMUS <span className="text-emerald-700 font-extrabold">MAGAZINE</span>
                </h1>
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  Issue #01
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-emerald-900 tracking-tight mt-0.5">
                The Friendly Guide to Zone 2 Bioenergetics & Cellular Health
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles & topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-xs font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-600 transition w-44 sm:w-52"
              />
            </div>

            {/* Issue Quiz Button */}
            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-bold text-stone-700 border border-stone-200 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Issue Quiz</span>
            </button>

            {/* Presentation Mode Button */}
            <button
              onClick={onOpenPresentation}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-sm transition scale-105"
            >
              <Monitor className="w-4 h-4" />
              <span>Presentation Mode</span>
            </button>

          </div>

        </div>

        {/* Page Switcher Navigation Tabs */}
        <div className="pt-2 border-t border-stone-200">
          <nav className="flex flex-wrap items-center justify-start sm:justify-between gap-1 bg-stone-100/90 p-1 rounded-xl border border-stone-200 text-xs font-semibold">
            {[
              { id: 1, label: 'Page 1: Contents' },
              { id: 2, label: 'Page 2: FATmax Story' },
              { id: 3, label: 'Page 3: Cellular Engine' },
              { id: 4, label: 'Page 4: Lactate Paradox' },
              { id: 5, label: 'Page 5: 1-Hour Runner' },
              { id: 6, label: 'Page 6: Longevity Guide' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveArticle(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeArticle === tab.id
                    ? 'bg-emerald-700 text-white font-bold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

      </div>
    </header>
  );
}
