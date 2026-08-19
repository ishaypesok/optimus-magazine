import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/metabolismData';
import { X, HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ZoneQuiz({ onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx) => {
    if (selectedOption !== null) return; // Prevent double click
    setSelectedOption(idx);

    const isCorrect = question.options[idx].correct;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
      // Trigger confetti if high score!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-xl rounded-2xl border border-slate-700 shadow-2xl p-6 relative overflow-hidden bg-slate-900/95">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-slate-100">Zone 2 Mastery Quiz</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!showResult ? (
          <div>
            {/* Question Counter */}
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-3">
              <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="text-amber-300 font-mono">Score: {score}</span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden mb-5">
              <div
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                className="h-full bg-amber-400 transition-all duration-300"
              />
            </div>

            {/* Question Text */}
            <h4 className="text-base font-bold text-slate-100 leading-snug mb-4">
              {question.question}
            </h4>

            {/* Options */}
            <div className="space-y-2.5 mb-6">
              {question.options.map((option, idx) => {
                let btnStyle = "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300";
                
                if (selectedOption !== null) {
                  if (option.correct) {
                    btnStyle = "bg-emerald-500/20 border-emerald-500/60 text-emerald-200 font-semibold";
                  } else if (selectedOption === idx) {
                    btnStyle = "bg-rose-500/20 border-rose-500/60 text-rose-200 font-semibold";
                  } else {
                    btnStyle = "bg-slate-950/30 border-slate-800 text-slate-500 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs leading-snug transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                  >
                    <span>{option.text}</span>
                    {selectedOption !== null && option.correct && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {selectedOption === idx && !option.correct && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation Feedback */}
            {selectedOption !== null && (
              <div className={`p-3.5 rounded-xl text-xs mb-5 border ${
                question.options[selectedOption].correct
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}>
                <div className="font-bold mb-0.5">
                  {question.options[selectedOption].correct ? "🎉 Correct!" : "💡 Explanation:"}
                </div>
                <p>{question.options[selectedOption].explanation}</p>
              </div>
            )}

            {/* Next Button */}
            {selectedOption !== null && (
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-bold transition-all shadow-md hover:from-amber-400 hover:to-orange-400"
                >
                  {currentIdx + 1 === QUIZ_QUESTIONS.length ? "See Final Results" : "Next Question →"}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Final Results Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center text-3xl mx-auto animate-bounce">
              🏆
            </div>

            <h4 className="text-2xl font-bold text-slate-100">Quiz Completed!</h4>
            
            <div className="text-3xl font-extrabold text-amber-300">
              {score} / {QUIZ_QUESTIONS.length} <span className="text-sm font-normal text-slate-400">Correct</span>
            </div>

            <p className="text-xs text-slate-300 max-w-md mx-auto">
              {score === QUIZ_QUESTIONS.length
                ? "🌟 Perfect score! You are officially a Zone 2 Mitochondrial Master!"
                : "Great effort! You now understand how fat oxidation and mitochondrial energy pathways power your body."}
            </p>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md"
              >
                Back to Zone 2 Optimus
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
