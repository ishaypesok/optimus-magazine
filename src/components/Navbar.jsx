import React from 'react';
import { Activity, Flame, Zap, Droplet, Sparkles, Volume2, VolumeX, HelpCircle, Layers, Users, Sliders, BookOpen, TestTube, Monitor, BarChart3, RotateCw, Play } from 'lucide-react';
import { ZONES } from '../data/metabolismData';

export default function Navbar({ currentZoneId, activeTab, setActiveTab, isMuted, setIsMuted, onOpenQuiz, onOpenPresentation }) {
  const zone = ZONES.find(z => z.id === currentZoneId) || ZONES[1];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center animate-pulse-glow">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400/30" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                Zone 2 Optimus
              </h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Cellular Visualizer
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive Mitochondrial Pathway, Fat Oxidation & Oxygen Simulator
            </p>
          </div>
        </div>

        {/* Live Metabolic Status Bar */}
        <div className="flex flex-wrap items-center gap-2.5 bg-slate-900/80 px-3.5 py-1.5 rounded-2xl border border-slate-800/80">
          
          {/* Fat Fuel */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-800/50">
            <Flame className="w-4 h-4 text-emerald-400 animate-pulse" />
            <div className="text-left">
              <div className="text-[9px] uppercase font-semibold text-slate-400">Fat Fuel</div>
              <div className="text-xs font-bold text-emerald-300">{zone.fatOxidation}% <span className="text-[10px] text-slate-400 font-normal">({zone.fatOxidationRate}g/m)</span></div>
            </div>
          </div>

          {/* Carb Fuel */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-800/50">
            <Zap className="w-4 h-4 text-amber-400" />
            <div className="text-left">
              <div className="text-[9px] uppercase font-semibold text-slate-400">Carb Fuel</div>
              <div className="text-xs font-bold text-amber-300">{zone.carbOxidation}%</div>
            </div>
          </div>

          {/* Lactate Level */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-800/50">
            <Droplet className={`w-4 h-4 ${zone.lactate > 3.0 ? 'text-rose-400 animate-bounce' : 'text-teal-400'}`} />
            <div className="text-left">
              <div className="text-[9px] uppercase font-semibold text-slate-400">Lactate</div>
              <div className={`text-xs font-bold ${zone.lactate > 3.0 ? 'text-rose-400' : 'text-teal-300'}`}>
                {zone.lactate} <span className="text-[10px] text-slate-400 font-normal">mM</span>
              </div>
            </div>
          </div>

          {/* ATP Output */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-800/50">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <div className="text-left">
              <div className="text-[9px] uppercase font-semibold text-slate-400">ATP Yield</div>
              <div className="text-xs font-bold text-yellow-300">
                {~~ (zone.atpSpeed * 120)} <span className="text-[10px] text-slate-400 font-normal">ATP/s</span>
              </div>
            </div>
          </div>
        </div>

        {/* View Navigation Tabs & Presentation Deck Button */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Presentation Deck Button */}
          <button
            onClick={onOpenPresentation}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all scale-105"
            title="Launch Fullscreen Presentation Mode"
          >
            <Monitor className="w-4 h-4" />
            <span>Live Presentation Deck</span>
          </button>

          <nav className="flex flex-wrap items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('magazine')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'magazine'
                  ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 shadow-lg shadow-emerald-500/30'
                  : 'text-emerald-400 hover:text-emerald-300 hover:bg-slate-800/80'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>📖 Digital Magazine</span>
            </button>

            <button
              onClick={() => setActiveTab('canvas')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'canvas'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Live Cell</span>
            </button>

            <button
              onClick={() => setActiveTab('runner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'runner'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <span>🏃 1-Hour Runner</span>
            </button>

            <button
              onClick={() => setActiveTab('krebs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'krebs'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Krebs Cycle</span>
            </button>

            <button
              onClick={() => setActiveTab('charts')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'charts'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Charts</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'guide'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Guide</span>
            </button>

            <button
              onClick={() => setActiveTab('byproducts')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'byproducts'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <TestTube className="w-3.5 h-3.5" />
              <span>By-Products</span>
            </button>

            <button
              onClick={() => setActiveTab('stages')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'stages'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Pathway</span>
            </button>

            <button
              onClick={() => setActiveTab('characters')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'characters'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Buddies</span>
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'simulator'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Adaptation</span>
            </button>
          </nav>

          {/* Quiz Button */}
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 text-xs font-semibold transition-all shadow-sm"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Quiz</span>
          </button>
        </div>

      </div>
    </header>
  );
}
