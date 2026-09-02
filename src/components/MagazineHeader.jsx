import React, { useState } from 'react';
import { Menu, Share2, ChevronLeft, ChevronRight, Check, Sun, Moon, Sparkles } from 'lucide-react';
import { PAGES_LIST } from './Sidebar';

export default function MagazineHeader({ 
  activeArticle, 
  setActiveArticle,
  isSidebarOpen,
  setIsSidebarOpen,
  bgTheme = 'paper',
  setBgTheme
}) {
  const [copied, setCopied] = useState(false);
  const currentObj = PAGES_LIST.find(p => p.id === activeArticle) || PAGES_LIST[0];

  const prevPage = () => setActiveArticle(Math.max(activeArticle - 1, 1));
  const nextPage = () => setActiveArticle(Math.min(activeArticle + 1, PAGES_LIST.length));

  // Current page direct URL
  const chapterUrl = `https://ishaypesok.github.io/optimus-magazine/#page=${activeArticle}`;
  const chapterTitle = currentObj.title || currentObj.label;

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(chapterUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareOnX = () => {
    const text = encodeURIComponent(`Reading "${chapterTitle}" in Optimus Magazine 🏃‍♂️⚡`);
    const url = encodeURIComponent(chapterUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const themes = [
    { id: 'paper', label: 'Paper', icon: Sun, color: 'hover:text-amber-700' },
    { id: 'dark', label: 'Obsidian', icon: Moon, color: 'hover:text-emerald-400' },
    { id: 'mint', label: 'Mint', icon: Sparkles, color: 'hover:text-teal-600' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#f8f6f0]/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-4 lg:px-8 py-3 shadow-xs font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Sidebar Toggle & Page Indicator */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 sm:px-3 sm:py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition flex items-center gap-2 font-bold text-xs border border-stone-300 dark:border-stone-700 shadow-2xs"
            title="Toggle Sidebar Menu"
          >
            <div className="w-8 h-10 rounded-lg overflow-hidden shrink-0 border border-emerald-500/50 shadow-xs bg-black">
              <img src="./optimus-logo.jpg" alt="Optimus Logo" className="w-full h-full object-cover" />
            </div>
            <span className="hidden sm:inline">Magazine Index</span>
          </button>

          <div className="h-5 w-px bg-stone-300 dark:bg-stone-700 hidden sm:block" />

          {/* Current Page Title Badge */}
          <div className="min-w-0 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 font-extrabold text-[11px] uppercase tracking-wider shrink-0 border border-emerald-300 dark:border-emerald-800">
              Page {activeArticle}/{PAGES_LIST.length}
            </span>
            <h2 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
              {chapterTitle}
            </h2>
          </div>
        </div>

        {/* Right: Background Theme Selector & Navigation Actions */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Background Theme Switcher Pill */}
          {setBgTheme && (
            <div className="flex items-center bg-stone-200/80 dark:bg-stone-800/90 rounded-xl p-1 border border-stone-300 dark:border-stone-700 text-xs font-bold gap-1 shadow-inner">
              {themes.map((t) => {
                const IconComponent = t.icon;
                const isActive = bgTheme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setBgTheme(t.id)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition ${
                      isActive
                        ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-400 shadow-xs font-bold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                    }`}
                    title={`Switch Background Theme to ${t.label}`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span className="hidden xl:inline">{t.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Quick Page Jump Buttons */}
          <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-0.5 border border-stone-300 dark:border-stone-700 text-xs font-bold">
            <button
              onClick={prevPage}
              disabled={activeArticle === 1}
              className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-30 text-stone-700 dark:text-stone-300 transition"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 text-[11px] text-stone-500 dark:text-stone-400 font-mono hidden md:inline">
              {activeArticle} / {PAGES_LIST.length}
            </span>
            <button
              onClick={nextPage}
              disabled={activeArticle === PAGES_LIST.length}
              className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-30 text-stone-700 dark:text-stone-300 transition"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Copy Direct Page URL Button */}
          <button
            onClick={copyToClipboard}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs transition border ${
              copied
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700'
            }`}
            title="Copy Direct Online Link for this Chapter"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />}
            <span className="hidden sm:inline">{copied ? 'Link Copied!' : 'Copy Link'}</span>
          </button>

          {/* Post on X (Twitter) Button */}
          <button
            onClick={shareOnX}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-black font-bold text-xs shadow-xs transition"
            title="Post this Chapter on X (Twitter)"
          >
            <span className="font-mono text-sm leading-none">𝕏</span>
            <span className="hidden sm:inline">Post on X</span>
          </button>

        </div>

      </div>
    </header>
  );
}
