import React, { useState } from 'react';
import { 
  Maximize2, X, Download, ZoomIn, CheckCircle2, XCircle, 
  Award, ShieldCheck, Sparkles, Car, AlertTriangle, ArrowRight, Printer
} from 'lucide-react';

export default function RunnerLicenseInfographic() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('poster'); // 'poster' or 'digital'
  const [runnerName, setRunnerName] = useState('Ishai');
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const EXAM_QUESTIONS = [
    {
      id: 1,
      question: "Why do most beginner runners quit after just 2-3 weeks?",
      options: [
        { text: "They run too fast (Zone 4/5 Redline), causing pain, acidosis, and burnout", correct: true },
        { text: "Their legs aren't biologically built for running", correct: false },
        { text: "They don't drink enough sugary sports drinks", correct: false }
      ],
      explanation: "Correct! Without a 'Runner License', beginners run at an all-out effort (Zone 4/5), flooding their muscles with acid and quitting due to exhaustion."
    },
    {
      id: 2,
      question: "Just like shifting gears in a car, what is Gear 2 (Zone 2)?",
      options: [
        { text: "An easy conversational pace where fat oxidation (FATmax) peaks", correct: true },
        { text: "A maximum sprint where you can't breathe", correct: false },
        { text: "Walking slowly while looking at your phone", correct: false }
      ],
      explanation: "Bingo! Zone 2 is Gear 2—a steady, comfortable effort that builds mitochondria without damaging your body."
    },
    {
      id: 3,
      question: "How do you earn long-term consistency in running?",
      options: [
        { text: "By understanding metabolic bioenergetics and building a multi-week Zone 2 base", correct: true },
        { text: "By pushing to maximum exhaustion on every single run", correct: false },
        { text: "By running 7 days a week without any rest days", correct: false }
      ],
      explanation: "Spot on! Real persistence comes from respecting your biological engine, resting properly, and building cellular health."
    }
  ];

  const handleSelectOption = (qId, optionIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const isExamComplete = Object.keys(selectedAnswers).length === EXAM_QUESTIONS.length;
  const allCorrect = isExamComplete && EXAM_QUESTIONS.every((q) => {
    const chosenIdx = selectedAnswers[q.id];
    return chosenIdx !== undefined && q.options[chosenIdx].correct;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* View Switcher Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-stone-900 leading-tight">
              The Official Runner's Manifesto & License
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              Optimus Magazine • Page 18 Final Masterpiece Infographic
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
            <span>⚡ Interactive Exam & License</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: ORIGINAL INFOGRAPHIC POSTER */}
      {activeView === 'poster' && (
        <div className="space-y-4 animate-fade-in">
          <div className="relative rounded-3xl overflow-hidden border-2 border-stone-300 bg-stone-900 shadow-lg group">
            {/* Infographic Image */}
            <img 
              src={`${import.meta.env.BASE_URL}runners-license-infographic.jpg`} 
              alt="Page 18 - The Runner's Manifesto: The Official Runner's License" 
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
                <span>Click to View Full-Screen Infographic Poster</span>
              </button>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-stone-600 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Full-resolution Page 18 manifesto infographic added to Optimus Magazine</span>
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
                href={`${import.meta.env.BASE_URL}runners-license-infographic.jpg`} 
                download="Optimus_Magazine_Runners_License_Page18.jpg"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white transition font-bold shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download High-Res</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: INTERACTIVE EXAM & DIGITAL LICENSE */}
      {activeView === 'digital' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-stone-300 shadow-md space-y-8 animate-fade-in font-sans">
          
          {/* Header Pill Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4 text-xs font-bold text-stone-600">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-black uppercase text-[11px]">
                📜 PAGE 18 • THE RUNNER'S MANIFESTO
              </span>
              <span className="font-extrabold text-stone-800">Optimus Enterprise</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-300 text-[11px] font-semibold">
              Persistence & Bioenergetic Certification
            </div>
          </div>

          {/* Title Banner */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              Earn Your Official <span className="text-emerald-700">"Runner's License"</span>
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-normal max-w-4xl leading-relaxed">
              Why nobody should start running without passing Gear 2! Just as you wouldn't drive a high-speed vehicle without a driver's license, you shouldn't run without understanding your body's bioenergetic engine.
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Unlicensed Runner */}
            <div className="p-6 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-4">
              <div className="flex items-center gap-2 text-rose-900 font-black text-base border-b border-rose-200 pb-3">
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>The Unlicensed Beginner (Why Most People Quit)</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-800">
                <div className="p-3.5 rounded-xl bg-white/90 border border-rose-200 space-y-1">
                  <div className="font-extrabold text-rose-950 text-xs">🔴 Redlining in 1st Gear</div>
                  <p className="text-stone-700 font-normal">
                    Jumps straight into Zone 4/5, gasping for air within 5 minutes.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/90 border border-rose-200 space-y-1">
                  <div className="font-extrabold text-rose-950 text-xs">🔥 Severe Acid Burn</div>
                  <p className="text-stone-700 font-normal">
                    Floods muscles with H+ protons, causing severe pain and soreness.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/90 border border-rose-200 space-y-1">
                  <div className="font-extrabold text-rose-950 text-xs">❌ Quick Abandonment</div>
                  <p className="text-stone-700 font-normal">
                    Concludes "running isn't for me" and quits within 2 weeks.
                  </p>
                </div>
              </div>
            </div>

            {/* The Certified Runner */}
            <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-4">
              <div className="flex items-center gap-2 text-emerald-950 font-black text-base border-b border-emerald-200 pb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>The Certified Optimus Runner (Persistent & Consistent)</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-800">
                <div className="p-3.5 rounded-xl bg-white/90 border border-emerald-200 space-y-1">
                  <div className="font-extrabold text-emerald-950 text-xs">🏃 Shifts to Gear 2 (Zone 2)</div>
                  <p className="text-stone-700 font-normal">
                    Runs at a steady conversational pace where absolute fat oxidation (FATmax) peaks.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/90 border border-emerald-200 space-y-1">
                  <div className="font-extrabold text-emerald-950 text-xs">🧬 Stimulates Biogenesis</div>
                  <p className="text-stone-700 font-normal">
                    Triggers PGC-1α gene pathways to build double mitochondrial density.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/90 border border-emerald-200 space-y-1">
                  <div className="font-extrabold text-emerald-950 text-xs">🌟 Lifetime Consistency</div>
                  <p className="text-stone-700 font-normal">
                    Runs effortlessly for decades with zero injury or burnout!
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* The 4 Pillars Grid */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-stone-900 text-center tracking-tight">
              The 4 Pillars of the Bioenergetic License
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black mx-auto text-base">
                  1
                </div>
                <h4 className="font-extrabold text-stone-900 text-base">Gear Control</h4>
                <p className="text-stone-700 font-normal leading-relaxed">
                  Know your exercise zones. Spend 80% of running volume in Zone 2.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black mx-auto text-base">
                  2
                </div>
                <h4 className="font-extrabold text-stone-900 text-base">Fuel Management</h4>
                <p className="text-stone-700 font-normal leading-relaxed">
                  Understand that fat (9 kcal/g) is your unlimited energy reservoir.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black mx-auto text-base">
                  3
                </div>
                <h4 className="font-extrabold text-stone-900 text-base">Engine Maintenance</h4>
                <p className="text-stone-700 font-normal leading-relaxed">
                  Respect mitochondrial binary fission—replication requires multi-week consistency.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black mx-auto text-base">
                  4
                </div>
                <h4 className="font-extrabold text-stone-900 text-base">Recovery Protocol</h4>
                <p className="text-stone-700 font-normal leading-relaxed">
                  Rest 1-2 days after key workouts. Cellular adaptation occurs during rest!
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Exam & Certificate Section */}
          <div className="p-6 rounded-2xl bg-stone-900 text-stone-100 space-y-6 shadow-xl font-sans">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm uppercase">
                  <Sparkles className="w-5 h-5" />
                  Interactive License Exam
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Pass the Bioenergetic Exam to Unlock Your Certificate
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-400">Runner Name:</span>
                <input
                  type="text"
                  value={runnerName}
                  onChange={(e) => setRunnerName(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-xs font-bold text-emerald-300 focus:outline-none focus:border-emerald-500 w-36"
                  placeholder="Enter name..."
                />
              </div>
            </div>

            {/* Questions Grid */}
            <div className="space-y-6">
              {EXAM_QUESTIONS.map((q) => {
                const chosen = selectedAnswers[q.id];
                return (
                  <div key={q.id} className="p-4 rounded-xl bg-stone-800/80 border border-stone-700 space-y-3">
                    <div className="font-bold text-sm text-stone-100">
                      Question {q.id}: {q.question}
                    </div>

                    <div className="space-y-2">
                      {q.options.map((opt, idx) => {
                        const isSelected = chosen === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectOption(q.id, idx)}
                            className={`w-full text-left p-3 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                              isSelected
                                ? opt.correct
                                  ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-600 font-bold'
                                  : 'bg-rose-900/80 text-rose-200 border border-rose-600 font-bold'
                                : 'bg-stone-900/90 text-stone-300 hover:bg-stone-700 border border-stone-800'
                            }`}
                          >
                            <span>{opt.text}</span>
                            {isSelected && (
                              opt.correct ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {chosen !== undefined && (
                      <div className="text-[11px] text-emerald-400 italic pt-1">
                        📌 {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Printable License Certificate */}
            {allCorrect ? (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950 via-stone-900 to-teal-950 border-2 border-emerald-500 space-y-4 text-center animate-fade-in shadow-2xl relative overflow-hidden">
                
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-widest">
                  <Award className="w-6 h-6 text-emerald-400" />
                  Official Bioenergetics Certificate
                </div>

                <div className="space-y-1">
                  <h4 className="text-2xl font-black text-white tracking-wide">
                    OFFICIAL OPTIMUS RUNNER'S LICENSE
                  </h4>
                  <p className="text-xs text-emerald-300 font-mono">
                    License ID: OPTIMUS-RUN-2026-018 • Bioenergetics Science Press
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-emerald-500/30 max-w-md mx-auto space-y-2">
                  <div className="text-xs text-stone-300 uppercase font-bold">This Certificate Certifies That</div>
                  <div className="text-2xl font-black text-emerald-200 font-serif tracking-wider">
                    {runnerName || 'Ishai'}
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Has successfully mastered metabolic bioenergetics, Zone 2 FATmax oxidation, and mitochondrial biogenesis rules. Certified for lifetime consistent running!
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Official License</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="p-4 rounded-xl bg-stone-800 border border-stone-700 text-center text-xs text-stone-400 italic">
                🔒 Select the correct answers to all 3 questions above to generate your official printable Runner's License!
              </div>
            )}

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
              <span className="font-extrabold text-sm sm:text-base">Optimus Magazine Page 18 • The Official Runner's License</span>
            </div>
            <div className="flex items-center gap-3">
              <a 
                href={`${import.meta.env.BASE_URL}runners-license-infographic.jpg`} 
                download="Optimus_Magazine_Runners_License_Page18.jpg"
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
              src={`${import.meta.env.BASE_URL}runners-license-infographic.jpg`} 
              alt="Full View: Page 18 Runner's License Infographic"
              className="max-w-full h-auto rounded-xl object-contain mx-auto"
            />
          </div>
        </div>
      )}

    </div>
  );
}
