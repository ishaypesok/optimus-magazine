import React from 'react';
import { BookOpen, Sparkles, Search, Bookmark, Printer, Share2, Layers, Monitor, ChevronDown } from 'lucide-react';

export default function MagazineHeader({ 
  activeIssue, 
  setActiveIssue, 
  activeArticle, 
  setActiveArticle,
  searchQuery,
  setSearchQuery,
  onOpenPresentation,
  onOpenQuiz
}) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 px-4 lg:px-8 py-4 shadow-2xl">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Top Masthead Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Magazine Branding */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-400 p-0.5 shadow-2xl shadow-emerald-500/30 overflow-hidden shrink-0">
              <img 
                src="./optimus-logo.jpg" 
                alt="Optimus Magazine Logo" 
                className="w-full h-full object-cover rounded-[14px]" 
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl lg:text-3xl font-black font-masthead tracking-wider bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                  OPTIMUS MAGAZINE
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Vol. I
                </span>
              </div>
              <p className="text-xs text-slate-400 font-serif italic">
                The Journal of Cellular Bioenergetics, Zone 2 Science & Longevity
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles & topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition w-44 sm:w-56"
              />
            </div>

            {/* Quiz Button */}
            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>Issue Quiz</span>
            </button>

            {/* Presentation Deck Button */}
            <button
              onClick={onOpenPresentation}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition scale-105"
            >
              <Monitor className="w-4 h-4" />
              <span>Live Presentation Deck</span>
            </button>

          </div>

        </div>

        {/* Issue & Navigation Category Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          
          {/* Issue Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">ACTIVE ISSUE:</span>
            <div className="relative inline-block">
              <select
                value={activeIssue}
                onChange={(e) => setActiveIssue(e.target.value)}
                className="appearance-none bg-slate-900 border border-emerald-500/30 text-white font-serif font-bold text-xs rounded-xl px-3 py-1.5 pr-8 focus:outline-none focus:border-emerald-400 cursor-pointer shadow-lg"
              >
                <option value="issue-1">Issue #01: Zone 2 Metabolism & Bioenergetics</option>
                <option value="issue-2" disabled>Issue #02: Metabolic Flexibility (Upcoming)</option>
                <option value="issue-3" disabled>Issue #03: Autophagy & Longevity (Upcoming)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Article Category Tabs */}
          <nav className="flex flex-wrap items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-medium">
            {[
              { id: 'all', label: '📖 All Articles' },
              { id: 1, label: '01. FATmax Cover Story' },
              { id: 2, label: '02. Cellular Powerhouse' },
              { id: 3, label: '03. Lactate Paradox' },
              { id: 4, label: '04. 1-Hour Runner Study' },
              { id: 5, label: '05. Longevity Protocol' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveArticle(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeArticle === tab.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
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
