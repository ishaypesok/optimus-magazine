import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MagazineHeader from './components/MagazineHeader';
import MagazineView from './components/MagazineView';
import { BookOpen } from 'lucide-react';
import { trackPageView } from './utils/analytics';

function getPageFromHash() {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash || window.location.search;
  const match = hash.match(/page[=\-]?(\d+)/i);
  if (match && match[1]) {
    const pageNum = parseInt(match[1], 10);
    if (pageNum >= 1 && pageNum <= 19) {
      return pageNum;
    }
  }
  return null;
}

export default function App() {
  const [currentZoneId, setCurrentZoneId] = useState(2);
  // Initial page from URL hash or default to Page 4 (Live Cell Visualizer)
  const [activeArticle, setActiveArticle] = useState(() => {
    return getPageFromHash() || 4;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-stone-900 selection:bg-emerald-200 selection:text-emerald-950 font-sans flex">
      
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
          />

          {/* Editorial Paper Footer */}
          <footer className="magazine-page p-8 text-center space-y-3 shadow-xs border border-stone-200">
            <div className="flex items-center justify-center gap-2 font-bold text-stone-900 text-lg">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              <span>OPTIMUS MAGAZINE</span>
            </div>
            <p className="max-w-3xl mx-auto text-xs text-stone-600 leading-relaxed font-normal">
              Zone 2 exercise represents the exact metabolic sweet spot where absolute fat oxidation (FATmax) peaks, mitochondrial biogenesis is stimulated via PGC-1α signaling, and blood lactate remains in steady state (~1.5-2.0 mmol/L).
            </p>
            <div className="text-xs font-semibold text-emerald-800 italic pt-1">
              <span>📌 Footnote: “Rest two days after. This is how we build cellular health at 79.”</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-stone-500 pt-2 border-t border-stone-200">
              <span>Bioenergetics Science Press</span>
              <span>•</span>
              <span>Peer-Reviewed Physiology Data</span>
              <span>•</span>
              <span className="text-emerald-800 font-bold">Published via GitHub Pages</span>
            </div>
          </footer>

        </main>

      </div>

    </div>
  );
}
