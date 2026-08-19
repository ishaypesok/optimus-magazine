import React from 'react';
import { CHARACTERS } from '../data/metabolismData';
import { Users, Sparkles, Zap, Flame } from 'lucide-react';

export default function MetabolicCharacters() {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-400" />
            Meet the Metabolic Buddies
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Friendly characters representing the key molecules and organelles inside your cells!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CHARACTERS.map((char) => (
          <div
            key={char.id}
            className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${char.avatarBg} p-0.5 shadow-lg flex items-center justify-center text-3xl shrink-0`}>
                  <div className="w-full h-full bg-slate-950/40 rounded-[14px] flex items-center justify-center">
                    {char.emoji}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-100">{char.name}</h3>
                  <div className="text-xs font-semibold text-slate-400">{char.title}</div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border mt-1 inline-block ${char.color}`}>
                    {char.role}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                "{char.description}"
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
              <div className="flex items-center justify-between bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-medium">ATP Output:</span>
                <span className="font-bold text-slate-200">{char.atpYield}</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px]">
                <strong>Zone 2 Role:</strong> {char.zone2Behavior}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
