import React from 'react';
import { Search } from 'lucide-react';

export default function MagazineHeader({ 
  activeArticle, 
  setActiveArticle,
  searchQuery,
  setSearchQuery
}) {
  return (
    <header className="sticky top-0 z-50 glass-panel-light border-b border-stone-200 px-4 lg:px-8 py-3.5 shadow-sm">
      <div className="max-w-7xl mx-auto space-y-3 font-sans">
        
        {/* Top Masthead Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Clean Main Title */}
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-600 p-0.5 shadow-md shadow-emerald-700/10 overflow-hidden shrink-0">
              <img 
                src="./optimus-logo.jpg" 
                alt="Optimus Magazine Logo" 
                className="w-full h-full object-cover rounded-[14px]" 
              />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-stone-900">
                OPTIMUS <span className="text-emerald-700 font-extrabold">MAGAZINE</span>
              </h1>
              <p className="text-xs sm:text-sm font-bold text-emerald-900 tracking-tight mt-0.5">
                The Friendly Guide to Zone 2 Bioenergetics & Cellular Health
              </p>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-xs font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-600 transition w-56 sm:w-64"
            />
          </div>

        </div>

        {/* 5 Page Navigation Tabs */}
        <div className="pt-2 border-t border-stone-200">
          <nav className="flex flex-wrap items-center justify-start sm:justify-between gap-1 bg-stone-100/90 p-1 rounded-xl border border-stone-200 text-xs font-semibold">
            {[
              { id: 1, label: 'Page 1: FATmax Story' },
              { id: 2, label: 'Page 2: Cellular Engine' },
              { id: 3, label: 'Page 3: Lactate Paradox' },
              { id: 4, label: 'Page 4: 1-Hour Runner' },
              { id: 5, label: 'Page 5: Longevity Guide' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveArticle(tab.id)}
                className={`px-4 py-1.5 rounded-lg transition ${
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
