import React, { useState, useEffect } from 'react';
import { ZONES } from '../data/metabolismData';
import { Clock, Play, Pause, RotateCcw, Flame, Wind, Sparkles, Droplet } from 'lucide-react';

export default function ProcessClock({ currentZoneId }) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const zone = ZONES.find(z => z.id === currentZoneId) || ZONES[1];

  // Timer Ticker
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Format HH:MM:SS
  const formatTime = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Real-time Cumulative Calculation based on current zone
  const minutes = secondsElapsed / 60;
  const fatGramsBurned = (zone.fatOxidationRate * minutes).toFixed(1);
  const carbGramsBurned = ((zone.carbOxidation / 100) * 1.2 * minutes).toFixed(1);
  
  // O2 consumption: ~2.0 L/min in Z2, scaled by zone
  const o2RateLPerMin = zone.id === 1 ? 1.2 : zone.id === 2 ? 2.1 : zone.id === 3 ? 2.8 : zone.id === 4 ? 3.5 : 4.2;
  const o2LitersConsumed = (o2RateLPerMin * minutes).toFixed(1);
  const co2LitersExhaled = (o2RateLPerMin * 0.8 * minutes).toFixed(1);
  const atpMillionsGenerated = (zone.atpSpeed * 120 * secondsElapsed / 1000).toFixed(1);

  return (
    <div className="glass-panel p-4 md:p-5 rounded-2xl border border-slate-800 shadow-xl mb-6 bg-slate-900/90">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Stopwatch Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Exercise Process Clock</span>
              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live Simulation
              </span>
            </div>
            <div className="text-3xl font-extrabold font-mono tracking-tight text-slate-100 mt-0.5">
              {formatTime(secondsElapsed)}
            </div>
          </div>
        </div>

        {/* Timer Control Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              isRunning
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-md'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-slate-950" />}
            <span>{isRunning ? "Pause Clock" : "Start Clock"}</span>
          </button>

          <button
            onClick={() => {
              setSecondsElapsed(0);
              setIsRunning(true);
            }}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Reset Clock"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Cumulative Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
          
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400">
              <Flame className="w-3 h-3 text-emerald-400" /> Fat Burned
            </div>
            <div className="text-sm font-extrabold text-emerald-300 mt-0.5">
              {fatGramsBurned} <span className="text-[10px] font-normal text-slate-400">g</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400">
              <Wind className="w-3 h-3 text-cyan-400" /> O₂ Consumed
            </div>
            <div className="text-sm font-extrabold text-cyan-300 mt-0.5">
              {o2LitersConsumed} <span className="text-[10px] font-normal text-slate-400">Liters</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400">
              <Wind className="w-3 h-3 text-slate-400" /> CO₂ Exhaled
            </div>
            <div className="text-sm font-extrabold text-slate-200 mt-0.5">
              {co2LitersExhaled} <span className="text-[10px] font-normal text-slate-400">Liters</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400">
              <Sparkles className="w-3 h-3 text-yellow-400" /> ATP Yield
            </div>
            <div className="text-sm font-extrabold text-yellow-300 mt-0.5">
              {atpMillionsGenerated} <span className="text-[10px] font-normal text-slate-400">M ATP</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
