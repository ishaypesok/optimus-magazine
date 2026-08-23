import React, { useState } from 'react';
import { 
  Maximize2, X, Download, ZoomIn, CheckCircle2, XCircle, 
  Activity, Cpu, TrendingUp, Sparkles, Layers, ArrowRight
} from 'lucide-react';

export default function LactateParadoxInfographic() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('poster'); // 'poster' or 'digital'

  return (
    <div className="space-y-6 font-sans">
      
      {/* View Switcher Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-stone-900 leading-tight">
              The Lactate Paradox: Fuel, Not Poison
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              Optimus Magazine • Page 11 Metabolic Education Infographic
            </p>
          </div>
        </div>

        {/* View Mode Buttons */}
        <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-300 text-xs font-bold w-full sm:w-auto justify-center">
          <button
            onClick={() => setActiveView('poster')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition ${
              activeView === 'poster'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <span>🖼️ Original Infographic Poster</span>
          </button>
          <button
            onClick={() => setActiveView('digital')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition ${
              activeView === 'digital'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <span>⚡ Interactive Digital Edition</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: ORIGINAL INFOGRAPHIC POSTER */}
      {activeView === 'poster' && (
        <div className="space-y-4 animate-fade-in">
          <div className="relative rounded-3xl overflow-hidden border-2 border-stone-300 bg-stone-900 shadow-lg group">
            {/* Infographic Image */}
            <img 
              src={`${import.meta.env.BASE_URL}lactate-paradox-infographic.png`} 
              alt="The Lactate Paradox: Fuel, Not Poison - Optimus Magazine Page 11" 
              className="w-full h-auto object-contain cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
              onClick={() => setIsModalOpen(true)}
            />

            {/* Hover Overlay Button */}
            <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="pointer-events-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md text-stone-900 font-extrabold text-xs shadow-xl border border-stone-300 hover:bg-white transition hover:scale-105"
              >
                <Maximize2 className="w-4 h-4 text-emerald-700" />
                <span>Click to View Full-Screen Infographic</span>
              </button>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-stone-600 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Full-resolution magazine asset added to Optimus Magazine</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 transition font-bold"
              >
                <ZoomIn className="w-3.5 h-3.5 text-emerald-700" />
                <span>Zoom Poster</span>
              </button>
              <a 
                href={`${import.meta.env.BASE_URL}lactate-paradox-infographic.png`} 
                download="Optimus_Magazine_Lactate_Paradox.png"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white transition font-bold shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download High-Res</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: INTERACTIVE DIGITAL RECREATION */}
      {activeView === 'digital' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-stone-300 shadow-md space-y-8 animate-fade-in font-sans">
          
          {/* Magazine Header Pill Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4 text-xs font-bold text-stone-600">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-black uppercase text-[11px]">
                💡 PAGE 11 • METABOLIC EDUCATION
              </span>
              <span className="font-extrabold text-stone-800">Optimus Enterprise</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-300 text-[11px] font-semibold">
              Persistence & Bioenergetic Education
            </div>
          </div>

          {/* Title Banner */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              The Lactate Paradox: <span className="text-emerald-700">Fuel, Not Poison</span>
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-normal max-w-4xl leading-relaxed">
              For decades, runners have blamed lactate for the burning ache in their legs. But exercise science tells a different story: lactate isn't metabolic waste—it's high-octane fuel.
            </p>
          </div>

          {/* Myth vs Reality Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Old Myth */}
            <div className="p-6 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-4">
              <div className="flex items-center gap-2 text-rose-900 font-black text-base border-b border-rose-200 pb-3">
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>The Old Myth: The Waste Product</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-800">
                <div className="p-3.5 rounded-xl bg-white/90 border border-rose-200 space-y-1">
                  <div className="font-extrabold text-rose-950 text-xs">🏃 The Sensation</div>
                  <p className="text-stone-700 font-normal">
                    You push too hard, your legs burn, and you assume lactic acid is pooling.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/90 border border-rose-200 space-y-1">
                  <div className="font-extrabold text-rose-950 text-xs">⚡ The Consequence</div>
                  <p className="text-stone-700 font-normal">
                    You stop running, convinced that acid is destroying muscle tissue.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/90 border border-rose-200 space-y-1">
                  <div className="font-extrabold text-rose-950 text-xs">🚫 The Result</div>
                  <p className="text-stone-700 font-normal">
                    Fear of discomfort prevents you from understanding energy processing.
                  </p>
                </div>
              </div>
            </div>

            {/* The Optimus Reality */}
            <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-4">
              <div className="flex items-center gap-2 text-emerald-950 font-black text-base border-b border-emerald-200 pb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>The Optimus Reality: The Recycled Energy Source</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-800">
                <div className="p-3.5 rounded-xl bg-white/90 border border-emerald-200 space-y-1">
                  <div className="font-extrabold text-emerald-950 text-xs">🧬 The Cellular Shift</div>
                  <p className="text-stone-700 font-normal">
                    Lactate is constantly produced, even at rest. It is a vital energy shuttle.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/90 border border-emerald-200 space-y-1">
                  <div className="font-extrabold text-emerald-950 text-xs">🎯 The Clear Zone</div>
                  <p className="text-stone-700 font-normal">
                    In Zone 2, mitochondria easily clear and consume lactate as fast as it's produced.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/90 border border-emerald-200 space-y-1">
                  <div className="font-extrabold text-emerald-950 text-xs">🚀 The Result</div>
                  <p className="text-stone-700 font-normal">
                    By raising your "lactate threshold," you turn a waste product into clean fuel.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Middle Shuttle Diagram Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 text-white space-y-4 shadow-md">
            <div className="text-center space-y-1">
              <div className="text-xs font-black uppercase tracking-widest text-emerald-400">
                BIOENERGETIC SHUTTLE KINETICS
              </div>
              <h3 className="text-lg font-black tracking-tight text-white">
                THE LACTATE SHUTTLE IN ACTION
              </h3>
            </div>

            {/* Shuttle Workflow Visual */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1 text-center">
                <div className="font-extrabold text-rose-300 text-xs">⚡ FT Fiber (Fast-Twitch)</div>
                <p className="text-stone-200 text-xs">Produces Lactate during higher intensity efforts via anaerobic glycolysis.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 border border-emerald-500/40 space-y-1 text-center flex flex-col justify-center items-center">
                <div className="font-extrabold text-emerald-300 text-xs flex items-center gap-1">
                  <span>MCT-1 & Capillary Shuttle</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-stone-200 text-xs">Transports lactate directly across muscle fibers into mitochondria.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1 text-center">
                <div className="font-extrabold text-teal-300 text-xs">🔋 ST Fiber (Slow-Twitch)</div>
                <p className="text-stone-200 text-xs">Mitochondria easily clear and oxidize lactate into clean ATP energy.</p>
              </div>
            </div>
          </div>

          {/* The 3-Step Protocol */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-stone-900 text-center tracking-tight">
              The 3-Step Lactate Shuttle Protocol
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
              
              {/* Step 1 */}
              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2.5 text-center">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black mx-auto text-base">
                  1
                </div>
                <h4 className="font-extrabold text-stone-900 text-base">Respect the Clearance Rate</h4>
                <p className="text-stone-700 leading-relaxed font-normal">
                  Lactate only builds up when production outpaces clearance. Keep Zone 2 intensity steady!
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-2xl bg-teal-50/80 border border-teal-200 space-y-2.5 text-center">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-black mx-auto text-base">
                  2
                </div>
                <h4 className="font-extrabold text-stone-900 text-base">Build Mitochondrial Machinery</h4>
                <p className="text-stone-700 leading-relaxed font-normal">
                  More mitochondria mean more "doorways" (MCT-1) for lactate to enter and be burned.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2.5 text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black mx-auto text-base">
                  3
                </div>
                <h4 className="font-extrabold text-stone-900 text-base">Elevate Your Threshold</h4>
                <p className="text-stone-700 leading-relaxed font-normal">
                  Smart training shifts the curve, allowing you to run faster before lactate accumulates.
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* FULL SCREEN LIGHTBOX MODAL */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal Header */}
          <div className="w-full max-w-6xl flex items-center justify-between mb-4 text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span className="font-extrabold text-sm sm:text-base">Optimus Magazine Page 11 • The Lactate Paradox</span>
            </div>
            <div className="flex items-center gap-3">
              <a 
                href={`${import.meta.env.BASE_URL}lactate-paradox-infographic.png`} 
                download="Optimus_Magazine_Lactate_Paradox.png"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition"
              >
                <Download className="w-4 h-4" />
                <span>Save Image</span>
              </a>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Modal Image Box */}
          <div 
            className="max-w-5xl max-h-[85vh] overflow-auto rounded-2xl bg-stone-900 border border-stone-700 shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={`${import.meta.env.BASE_URL}lactate-paradox-infographic.png`} 
              alt="Full View: The Lactate Paradox - Optimus Magazine Page 11"
              className="max-w-full h-auto rounded-xl object-contain mx-auto"
            />
          </div>
        </div>
      )}

    </div>
  );
}
