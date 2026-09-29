import React, { useState, useEffect } from 'react';
import Sidebar, { PAGES_LIST } from './components/Sidebar';
import MagazineHeader from './components/MagazineHeader';
import MagazineView from './components/MagazineView';
import { BookOpen } from 'lucide-react';
import { trackPageView } from './utils/analytics';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function getPageFromHash() {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash || window.location.search;
  const match = hash.match(/page[=\-]?(\d+)/i);
  if (match && match[1]) {
    const pageNum = parseInt(match[1], 10);
    if (pageNum >= 1 && pageNum <= PAGES_LIST.length) {
      return pageNum;
    }
  }
  return null;
}

export default function App() {
  const [currentZoneId, setCurrentZoneId] = useState(2);
  const [bgTheme, setBgTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('optimus_bg_theme') || 'paper';
    }
    return 'paper';
  });

  // Initial page from URL hash or default to Page 1 (Editor's Foreword & Mission)
  const [activeArticle, setActiveArticle] = useState(() => {
    return getPageFromHash() || 1;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPrintAllMode, setIsPrintAllMode] = useState(false);

  const handlePrintFullMagazine = () => {
    setIsPrintAllMode(true);
    setTimeout(() => {
      window.print();
      setIsPrintAllMode(false);
    }, 400);
  };

  // Sync background theme with localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('optimus_bg_theme', bgTheme);
    }
  }, [bgTheme]);

  // Sync page state with browser URL hash
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#page=${activeArticle}`);
    }
    trackPageView(activeArticle);
  }, [activeArticle]);

  // Listen to hash changes (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      if (page && page !== activeArticle) {
        setActiveArticle(page);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeArticle]);

  const themeClassMap = {
    paper: 'bg-editorial-paper text-stone-900',
    dark: 'bg-bio-obsidian text-stone-100',
    mint: 'bg-clinical-mint text-stone-900',
  };

  return (
    <div className={`min-h-screen ${themeClassMap[bgTheme] || themeClassMap.paper} selection:bg-emerald-200 selection:text-emerald-950 font-sans flex transition-colors duration-500`}>
      
      {/* Sidebar Navigation */}
      <Sidebar
        activeArticle={activeArticle}
        setActiveArticle={setActiveArticle}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area Offset for Sidebar on Desktop */}
      <div className="flex-1 lg:pl-80 flex flex-col min-w-0 transition-all duration-300">
        
        {/* Sticky Top Header Bar */}
        <MagazineHeader
          activeArticle={activeArticle}
          setActiveArticle={setActiveArticle}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          bgTheme={bgTheme}
          setBgTheme={setBgTheme}
          onPrintFullMagazine={handlePrintFullMagazine}
        />

        {/* Main Magazine Layout Container */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
          
          {/* Magazine Spreads & Articles */}
          <MagazineView
            currentZoneId={currentZoneId}
            setCurrentZoneId={setCurrentZoneId}
            activeArticle={activeArticle}
            setActiveArticle={setActiveArticle}
            searchQuery={searchQuery}
            isPrintAllMode={isPrintAllMode}
          />

          {/* Editorial Paper Footer */}
          <footer className="magazine-page p-8 text-center space-y-3 shadow-xs border border-stone-200">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-13 rounded-xl overflow-hidden border border-emerald-600/70 shadow-sm bg-black shrink-0">
                  <img src="./optimus-logo.jpg" alt="OPTIMUS Logo" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg sm:text-xl font-black text-stone-900 leading-tight">OPTIMUS — Longevity 65+: The Practical Handbook</h3>
                  <p className="text-xs text-stone-500 font-medium">Science, fitness & bioenergetics for healthy aging</p>
                </div>
              </div>
            </div>
            <p className="max-w-3xl mx-auto text-xs text-stone-600 leading-relaxed font-normal">
              Zone 2 exercise is a low-to-moderate aerobic training intensity characterized by sustained oxidative metabolism. Training at this intensity can contribute to mitochondrial and metabolic adaptations, while the exercise intensity associated with maximal fat oxidation (FATmax) varies between individuals and is not synonymous with Zone 2. The target aerobic corridor in Optimus is individualized using laboratory-measured LTHR.
            </p>
            <div className="text-xs font-semibold text-emerald-800 italic pt-1">
              <span>📌 Training Note: “Two days of recovery between runs — part of my current aerobic training approach at 79.”</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] font-mono text-stone-600 pt-3 border-t border-stone-200">
              <span>Bioenergetics Science Press</span>
              <span>•</span>
              <span>Based on Peer-Reviewed Physiology Literature</span>
              <span>•</span>
              <a 
                href="https://github.com/ishaypesok/optimus-magazine"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-stone-900 hover:text-emerald-700 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-md border border-stone-300 transition shadow-2xs"
                title="View Open Source Repository on GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5 fill-current" />
                <span>GitHub Repository</span>
              </a>
              <span>•</span>
              <a
                href="https://ishaypesok.github.io/optimus-magazine/"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-800 font-bold hover:underline"
              >
                Published via GitHub Pages
              </a>
            </div>
          </footer>

        </main>

      </div>

    </div>
  );
}
