import React from 'react';
import { BookOpen, Flame, Sparkles, Heart, Activity, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function WrittenGuide() {
  return (
    <article className="max-w-4xl mx-auto space-y-8 mb-12">
      
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40">
        <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-widest text-emerald-400 mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Comprehensive Physiological Guide</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100 mb-3 bg-gradient-to-r from-slate-100 via-emerald-200 to-teal-300 bg-clip-text text-transparent">
          The Science of Zone 2 Cellular Metabolism
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          A complete, friendly written breakdown of how your body burns fat, shuttles pyruvate, clears lactate, and expands mitochondrial density.
        </p>
      </div>

      {/* Section 1: What is Zone 2? */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-3 text-xl font-bold text-slate-100">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xl shrink-0">
            🏃
          </div>
          <h3>1. What is Zone 2 Exercise Intensity?</h3>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Zone 2 exercise is defined as the intensity where <strong>absolute fat oxidation rate (FAT_max)</strong> reaches its peak and blood lactate levels remain steady and low (~1.5 to 2.0 mmol/L, right at the Aerobic Threshold or LT1).
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          It typically corresponds to <strong>60% – 70% of your maximum heart rate</strong>. Subjectively, it is known as the <em>Conversational Pace</em>—you are working hard enough to breathe rhythmically, but you can effortlessly speak in complete sentences without gasping.
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong>The Talk Test Rule:</strong> If you get too breathless to talk continuously, your heart rate has drifted into Zone 3 or 4, shifting your cellular metabolism from fat burning to rapid carbohydrate consumption.
          </div>
        </div>
      </section>

      {/* Section 2: Cellular Pathway (Beta-Oxidation vs Glycolysis) */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-3 text-xl font-bold text-slate-100">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center text-xl shrink-0">
            🥑
          </div>
          <h3>2. The Dual Fuel Streams: Fats vs. Carbs</h3>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          Inside your muscle cells, ATP is generated via two primary fuel inputs:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-950/80 border border-emerald-500/20 space-y-2">
            <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
              <span>🥑 Fatty Acid Beta-Oxidation</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Dominant in Zone 2</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Free fatty acids enter the mitochondria through the <strong>CPT-1 gatekeeper</strong>. Inside the matrix, <strong>Beta-Oxidation</strong> repeatedly chops fatty acid chains into 2-carbon Acetyl-CoA units. A single palmitate fat molecule yields an astounding <strong>~106 to 120 ATPs</strong>!
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/80 border border-amber-500/20 space-y-2">
            <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
              <span>🍇 Glucose Glycolysis</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">Dominant in Zone 4-5</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Glucose is split in the cytoplasm into 2 Pyruvate molecules. In Zone 2, Pyruvate smoothly enters the mitochondrion via the <strong>PDH enzyme complex</strong> to become Acetyl-CoA. But in Zone 5, PDH capacity is overwhelmed, causing pyruvate to overflow into Lactate.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: The Role of Oxygen */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-3 text-xl font-bold text-slate-100">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-xl shrink-0">
            🫁
          </div>
          <h3>3. Where is Oxygen (O₂) Used?</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Oxygen is delivered by your red blood cells through capillaries into the muscle cell. It travels directly into the <strong>inner mitochondrial membrane</strong>, specifically targeting <strong>Complex IV of the Electron Transport Chain</strong>.
        </p>

        <p className="text-sm text-slate-300 leading-relaxed">
          As high-energy electrons stream down Complex I–IV, pumping protons (H⁺) across the membrane, <strong>Oxygen acts as the final electron magnet</strong>. It picks up 2 electrons and 2 protons to form clean <strong>Metabolic Water (H₂O)</strong>.
        </p>

        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200">
          <strong>Key Insight:</strong> Without Oxygen, the Electron Transport Chain immediately backs up, the ATP Synthase rotor stops spinning, and your cells are forced to switch to emergency high-lactate anaerobic glycolysis!
        </div>
      </section>

      {/* Section 4: Lactate Truth */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-3 text-xl font-bold text-slate-100">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center justify-center text-xl shrink-0">
            🛡️
          </div>
          <h3>4. The Lactate Shuttle: Friend, Not Foe</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Contrary to old myths, <strong>lactate is NOT a toxic waste product that causes muscle soreness</strong>. Lactate is a high-energy metabolic intermediate!
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          In Zone 2 training, your <strong>Type I (slow-twitch oxidative) muscle fibers</strong> are rich in <strong>MCT-1 transporters</strong> and mitochondria. They actively suck up lactate from the blood, convert it back to Pyruvate, and burn it cleanly for ATP.
        </p>
      </section>

      {/* Section 5: Long-term Adaptation */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-3 text-xl font-bold text-slate-100">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center text-xl shrink-0">
            🧬
          </div>
          <h3>5. Long-Term Adaptation: Mitochondrial Biogenesis</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Consistent Zone 2 training (3-4 hours per week for 8-12 weeks) activates the master gene regulator <strong>PGC-1α</strong>. This signals your muscle cells to:
        </p>

        <ul className="space-y-2 text-xs text-slate-300">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Build More & Larger Mitochondria</strong> (Mitochondrial Biogenesis)</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Upregulate CPT-1 Fat Transporters</strong> so you burn more fat per minute</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Expand Capillary Networks (Angiogenesis)</strong> for faster O₂ delivery</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Raise Your Lactate Clearance Capacity</strong> so you can go faster at lower heart rates!</span>
          </li>
        </ul>
      </section>

    </article>
  );
}
