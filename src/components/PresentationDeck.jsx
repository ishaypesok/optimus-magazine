import React, { useState, useEffect } from 'react';
import { PRESENTATION_SLIDES } from '../data/presentationData';
import { ZONES } from '../data/metabolismData';
import MetabolismCanvas from './MetabolismCanvas';
import FuelCharts from './FuelCharts';
import ZoneControls from './ZoneControls';
import AdaptationSimulator from './AdaptationSimulator';
import ChemicalByproducts from './ChemicalByproducts';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, X, MessageSquare, Sparkles, CheckCircle2, Play, HelpCircle, Layers, Monitor } from 'lucide-react';

export default function PresentationDeck({ onClose, currentZoneId, setCurrentZoneId }) {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slide = PRESENTATION_SLIDES[currentSlideIdx];

  // Keyboard Navigation Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIdx]);

  const handleNext = () => {
    if (currentSlideIdx + 1 < PRESENTATION_SLIDES.length) {
      setCurrentSlideIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx(prev => prev - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-slate-100 flex flex-col justify-between p-4 md:p-6 overflow-y-auto animate-fade-in select-none">
      
      {/* Top Deck Controls Bar */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
            <Monitor className="w-4 h-4 text-emerald-400" />
            <span>{slide.badge}</span>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden md:inline">
            Use Left/Right Arrow Keys to Navigate
          </span>
        </div>

        {/* Slide Selection Jump Dropdown & Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Slide Jump Selector */}
          <select
            value={currentSlideIdx}
            onChange={(e) => setCurrentSlideIdx(parseInt(e.target.value))}
            className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-1.5 font-semibold focus:outline-none focus:border-emerald-500"
          >
            {PRESENTATION_SLIDES.map((s, idx) => (
              <option key={s.id} value={idx}>
                Slide {idx + 1}: {s.title.substring(0, 32)}...
              </option>
            ))}
          </select>

          {/* Toggle Presenter Notes */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              showNotes
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Speaker Talking Points"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Speaker Notes</span>
          </button>

          {/* Toggle Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            title="Toggle Fullscreen Mode"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close Deck */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 transition-colors"
            title="Exit Presentation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Slide Content Area */}
      <div className="my-4 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center">
        
        {/* Slide Title & Subtitle */}
        <div className="mb-5 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-emerald-200 to-teal-300 bg-clip-text text-transparent">
            {slide.title}
          </h2>
          <p className="text-sm text-slate-400 font-medium mt-1">
            {slide.subtitle}
          </p>
        </div>

        {/* Slide Bullets Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {slide.bullets.map((b, idx) => (
            <div key={idx} className="glass-card p-3.5 rounded-xl border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{b}</span>
            </div>
          ))}
        </div>

        {/* Slide Interactive Widget Container */}
        <div className="w-full">
          {slide.contentType === 'zone_slider' && (
            <ZoneControls currentZoneId={currentZoneId} setCurrentZoneId={setCurrentZoneId} />
          )}

          {slide.contentType === 'fuel_chart' && (
            <FuelCharts currentZoneId={currentZoneId} />
          )}

          {slide.contentType === 'live_canvas' && (
            <MetabolismCanvas currentZoneId={currentZoneId} />
          )}

          {slide.contentType === 'adaptation_slider' && (
            <AdaptationSimulator />
          )}

          {slide.contentType === 'oxygen_focus' && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-4">
              <div className="flex items-center gap-3 text-cyan-300 font-bold text-lg">
                <span className="text-2xl">🫁</span>
                <span>Oxygen (O₂) as the Final Aerobic Magnet</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Oxygen is delivered by red blood cells directly to Complex IV of the Electron Transport Chain inside the inner mitochondrial membrane. It accepts low-energy electrons and bonds with H⁺ protons to form clean **Metabolic Water (H₂O)**, keeping the ATP turbine spinning continuous golden energy sparks!
              </p>
            </div>
          )}

          {slide.contentType === 'lactate_focus' && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-rose-500/30 space-y-4">
              <div className="flex items-center gap-3 text-rose-300 font-bold text-lg">
                <span className="text-2xl">🛡️</span>
                <span>The Lactate Shuttle: Slow-Twitch Muscle Clearing</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Type I slow-twitch oxidative muscle fibers contain abundant **MCT-1 transporters**. In Zone 2, any lactate produced by fast-twitch fibers is immediately sucked into slow-twitch mitochondria, converted back to Pyruvate, and burned for energy!
              </p>
            </div>
          )}

          {slide.contentType === 'conclusion' && (
            <div className="glass-panel p-8 rounded-2xl border border-emerald-500/40 text-center space-y-4 bg-gradient-to-br from-slate-900 to-emerald-950/40">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center text-3xl mx-auto animate-bounce">
                🎉
              </div>
              <h3 className="text-2xl font-bold text-slate-100">Ready for Presenting & Audience Q&A</h3>
              <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
                You are now equipped with the complete live visual demonstration of Zone 2 cellular bioenergetics!
              </p>
            </div>
          )}
        </div>

        {/* Presenter Talking Notes Drawer */}
        {showNotes && (
          <div className="mt-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3">
            <MessageSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-300 mb-0.5">Presenter Talking Points (What to say):</strong>
              <p className="leading-relaxed">{slide.presenterNotes}</p>
            </div>
          </div>
        )}

      </div>

      {/* Footer Navigation Bar */}
      <footer className="flex items-center justify-between pt-3 border-t border-slate-800 max-w-6xl mx-auto w-full">
        <button
          onClick={handlePrev}
          disabled={currentSlideIdx === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            currentSlideIdx === 0
              ? 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Slide</span>
        </button>

        {/* Slide Dots Indicator */}
        <div className="flex items-center gap-1.5">
          {PRESENTATION_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIdx(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentSlideIdx
                  ? 'bg-emerald-400 w-6'
                  : 'bg-slate-700 hover:bg-slate-500'
              }`}
              title={`Jump to Slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentSlideIdx + 1 === PRESENTATION_SLIDES.length}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            currentSlideIdx + 1 === PRESENTATION_SLIDES.length
              ? 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-md'
          }`}
        >
          <span>Next Slide</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

    </div>
  );
}
