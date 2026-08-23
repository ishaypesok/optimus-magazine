import React from 'react';
import { Menu, Share2, Printer, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { PAGES_LIST } from './Sidebar';

export default function MagazineHeader({ 
  activeArticle, 
  setActiveArticle,
  isSidebarOpen,
  setIsSidebarOpen
}) {
  const currentObj = PAGES_LIST.find(p => p.id === activeArticle) || PAGES_LIST[0];

  const prevPage = () => setActiveArticle(Math.max(activeArticle - 1, 1));
  const nextPage = () => setActiveArticle(Math.min(activeArticle + 1, 19));

  return (
    <header className="sticky top-0 z-30 bg-[#f8f6f0]/90 backdrop-blur-md border-b border-stone-200 px-4 lg:px-8 py-3 shadow-xs font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Sidebar Toggle & Page Indicator */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 transition flex items-center gap-2 font-bold text-xs border border-stone-300 shadow-2xs"
            title="Toggle Sidebar Menu"
          >
            <Menu className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">Magazine Index</span>
          </button>

          <div className="h-5 w-px bg-stone-300 hidden sm:block" />

          {/* Current Page Title Badge */}
          <div className="min-w-0 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-extrabold text-[11px] uppercase tracking-wider shrink-0 border border-emerald-300">
              Page {activeArticle}/19
            </span>
            <h2 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
              {currentObj.title || currentObj.label}
            </h2>
          </div>
        </div>

        {/* Right: Quick Previous / Next & Share Actions */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Quick Page Jump Buttons */}
          <div className="flex items-center bg-stone-100 rounded-xl p-0.5 border border-stone-300 text-xs font-bold">
            <button
              onClick={prevPage}
              disabled={activeArticle === 1}
              className="p-1.5 rounded-lg hover:bg-stone-200 disabled:opacity-30 text-stone-700 transition"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 text-[11px] text-stone-500 font-mono hidden md:inline">
              {activeArticle} / 19
            </span>
            <button
              onClick={nextPage}
              disabled={activeArticle === 19}
              className="p-1.5 rounded-lg hover:bg-stone-200 disabled:opacity-30 text-stone-700 transition"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Share Button */}
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('🔗 Optimus Magazine link copied to clipboard!');
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

      </div>
    </header>
  );
}
