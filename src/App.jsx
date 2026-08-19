import React, { useState } from 'react';
import MagazineHeader from './components/MagazineHeader';
import MagazineView from './components/MagazineView';
import ZoneControls from './components/ZoneControls';
import { BookOpen } from 'lucide-react';

export default function App() {
  const [currentZoneId, setCurrentZoneId] = useState(2);
  const [activeArticle, setActiveArticle] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-stone-900 selection:bg-emerald-200 selection:text-emerald-950 pb-20 font-sans">
      
      {/* Clean Magazine Sticky Header */}
      <MagazineHeader
        activeArticle={activeArticle}
        setActiveArticle={setActiveArticle}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Magazine Layout Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 space-y-6">
        
        {/* Interactive Zone Controller Banner */}
        <ZoneControls
          currentZoneId={currentZoneId}
          setCurrentZoneId={setCurrentZoneId}
        />

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
  );
}
