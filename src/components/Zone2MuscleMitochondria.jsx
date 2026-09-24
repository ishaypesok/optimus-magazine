import React, { useState } from 'react';
import { 
  Zap, Activity, Droplet, Dumbbell, CheckCircle2, Flame, 
  Sparkles, Layers, Scale, Clock, ShieldCheck, Cpu
} from 'lucide-react';

export default function Zone2MuscleMitochondria() {
  const [activeTab, setActiveTab] = useState('oxygen_journey'); // 'oxygen_journey' | 'verdict' | 'molecular' | 'nuances' | 'matrix' | 'synthesis'
  const [activeOxygenStep, setActiveOxygenStep] = useState(0);

  const OXYGEN_STEPS = [
    {
      num: '1',
      emoji: '🛵',
      label: '1. Train to Scooter',
      title: 'The Delivery Hand-off',
      subtitle: 'Capillaries → Sarcoplasm',
      summary: 'Oxygen hops off the Hemoglobin red-blood-cell express train in the capillaries. Inside your slow-twitch muscle fibers, it is immediately caught by Myoglobin—an agile courier on a scooter who escorts oxygen straight to the mitochondrial doorstep.',
      details: 'Myoglobin has a higher oxygen affinity than Hemoglobin at lower partial pressures ($PO_2$), acting as a high-speed intracellular diffusion shuttle. It prevents oxygen from diffusing aimlessly and routes it directly toward the mitochondrial reticulum.',
      badge: 'Blood to Muscle Transfer',
      tagColor: 'bg-teal-100 text-teal-900 border-teal-300'
    },
    {
      num: '2',
      emoji: '🏰',
      label: '2. Castle Gates',
      title: 'Crossing Two Walls',
      subtitle: 'Outer Membrane → Intermembrane Space → Cristae',
      summary: 'The mitochondrion is an ancient fortress with two separate walls. Oxygen slips effortlessly through the porous outer wall (via voltage-dependent anion channels/porins), glides across the courtyard (intermembrane space), and docks right against the folded inner membrane (cristae).',
      details: 'Because oxygen ($O_2$) is a small, uncharged, lipid-soluble gas, it does not require active pumps to cross lipid bilayers. It follows a steep partial pressure gradient directly to where oxygen tension is lowest: the catalytic core of Complex IV.',
      badge: 'Cellular Penetration',
      tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
    },
    {
      num: '3',
      emoji: '⚡',
      label: '3. The Assembly Line',
      title: 'Passing the Sparks',
      subtitle: 'Complexes I, II & III • Hydroelectric Dam Creation',
      summary: 'Stations 1, 2, and 3 break down the breakdown products of your morning fats (Acetyl-CoA via the Krebs cycle), passing high-energy electron sparks down a wire. As the sparks pass, they pump protons out into the courtyard, creating tremendous pressure—exactly like water backing up behind a hydroelectric dam!',
      details: 'NADH and $FADH_2$ donate electrons to Complex I and Complex II. Mobile electron carriers (Ubiquinone/CoQ10 and Cytochrome c) shuttle these electrons forward, while Complexes I, III, and IV pump protons ($H^+$) into the intermembrane space, generating the Mitochondrial Membrane Potential ($\Delta\Psi_m \approx 150-180\\text{ mV}$).',
      badge: 'Electron Transport & Proton Pumping',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      num: '4',
      emoji: '⚾',
      label: '4. The Big Catch',
      title: 'Oxygen at Complex IV (Cytochrome c Oxidase)',
      subtitle: 'The Ultimate Terminal Electron Acceptor',
      summary: 'At Station 4, Oxygen stands waiting with its catcher\'s glove wide open! It catches 4 spent electron sparks, scoops up 4 loose protons, and instantly transforms them into pure, clean metabolic water ($H_2O$). Zero toxic smoke, zero acid—just fresh water and heat!',
      details: 'The formula: $O_2 + 4e^- + 4H^+ \\rightarrow 2 H_2O$. This reaction is the SOLE physiological reason human beings breathe oxygen! By snatching the electrons at the end of the line, Oxygen prevents the molecular assembly line from backing up and jamming.',
      badge: 'Clean Water Synthesis',
      tagColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
    },
    {
      num: '5',
      emoji: '🪙',
      label: '5. The Turbine',
      title: 'Stamping ATP Energy Coins (ATP Synthase)',
      subtitle: 'Complex V • Rotary Molecular Engine',
      summary: 'Because Oxygen catches every spark and keeps Station 4 completely clear of congestion, the pressurized dam water (protons in the courtyard) rushes back inside through ATP Synthase. This spins the rotor at up to 9,000 RPM, mechanically stamping ADP and phosphate into massive amounts of clean ATP energy coins!',
      details: 'Chemiosmosis in action! Protons flow down the electrochemical gradient through the $F_0$ rotor, driving rotation of the catalytic $F_1$ head. Zone 2 fat oxidation delivers ~106–129 ATP molecules per palmitate fatty acid molecule, operating at peak thermodynamic efficiency.',
      badge: 'Rotary ATP Synthesis',
      tagColor: 'bg-purple-100 text-purple-900 border-purple-300'
    }
  ];

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">
      
      {/* Editorial Header Banner */}
      <div className="space-y-3 border-b border-stone-200 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider border border-emerald-300 inline-flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-700" />
            Article 35 • Deep Physiology & Molecular Science
          </span>
          <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 font-bold text-xs uppercase tracking-wider border border-blue-300 inline-flex items-center gap-1.5">
            <Droplet className="w-3.5 h-3.5 text-blue-700" />
            The Oxygen Journey
          </span>
          <span className="px-3.5 py-1 rounded-full bg-purple-100 text-purple-900 font-bold text-xs uppercase tracking-wider border border-purple-300 inline-flex items-center gap-1.5">
            <Dumbbell className="w-3.5 h-3.5 text-purple-700" />
            Hypertrophy vs. Mitochondria
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight tracking-tight">
          Muscle Growth vs. Mitochondrial Biogenesis: Does Zone 2 Build Muscle?
        </h1>
        <p className="text-stone-600 text-sm sm:text-base font-normal max-w-4xl leading-relaxed">
          Examining the foundational endurance question: <em>"In Zone 2 running, is there no muscle increase, but only mitochondrial increase?"</em> Explore the molecular antagonism between AMPK and mTORC1, what actually expands inside your leg muscles, and take a friendly 5-stage backstage tour of Oxygen through the mitochondria.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3 no-print">
        <button
          onClick={() => setActiveTab('oxygen_journey')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
            activeTab === 'oxygen_journey'
              ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-500/30'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Droplet className="w-4 h-4 text-cyan-300" />
          <span>1. The Friendly Oxygen Journey (5 Stages)</span>
        </button>

        <button
          onClick={() => setActiveTab('verdict')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
            activeTab === 'verdict'
              ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-500/30'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>2. The Core Scientific Verdict</span>
        </button>

        <button
          onClick={() => setActiveTab('molecular')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
            activeTab === 'molecular'
              ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-500/30'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-300" />
          <span>3. AMPK vs. mTORC1 Interference</span>
        </button>

        <button
          onClick={() => setActiveTab('nuances')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
            activeTab === 'nuances'
              ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-500/30'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-300" />
          <span>4. What Actually Expands in Muscle?</span>
        </button>

        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
            activeTab === 'matrix'
              ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-500/30'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Scale className="w-4 h-4 text-emerald-300" />
          <span>5. Zone 2 vs. Weights Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('synthesis')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
            activeTab === 'synthesis'
              ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-500/30'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-blue-300" />
          <span>6. Practical Longevity Protocol</span>
        </button>
      </div>

      {/* TAB 1: THE FRIENDLY OXYGEN JOURNEY (FEATURE HIGHLIGHT) */}
      {(activeTab === 'oxygen_journey' || typeof window === 'undefined') && (
        <section className="space-y-8 animate-fade-in">
          
          {/* Hero Explainer Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white border border-emerald-500/40 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-500/20 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center">
                  <Droplet className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 block font-bold">
                    SPECIAL BACKSTAGE TOUR • HOW OXYGEN POWERS YOUR MITOCHONDRIA
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    The Friendly Path of Oxygen: From Your Breath to the Spark
                  </h2>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-mono border border-emerald-400/30">
                The Reason We Breathe Air 💨
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Have you ever wondered what <em>actually happens</em> to the air you pull into your lungs during a continuous Zone 2 jog? Inside your slow-twitch muscle fibers, your mitochondria function exactly like a microscopic, high-tech <strong>hydroelectric clean-power plant</strong>. Follow Oxygen step-by-step through the 5 checkpoints below:
            </p>
          </div>

          {/* 5-Step Story Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {OXYGEN_STEPS.map((step, idx) => {
              const isSelected = activeOxygenStep === idx;
              return (
                <div
                  key={step.num}
                  onClick={() => setActiveOxygenStep(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-white shadow-lg border-emerald-500 ring-2 ring-emerald-500/30 -translate-y-1'
                      : 'bg-stone-50 hover:bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{step.emoji}</span>
                      <span className="text-xs font-mono font-black text-stone-400">STAGE 0{step.num}</span>
                    </div>
                    <div className="text-xs font-bold text-emerald-800 font-mono uppercase tracking-tight">
                      {step.label}
                    </div>
                    <h3 className="text-sm font-bold text-stone-900 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      {step.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-200">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${step.tagColor}`}>
                      {step.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Deep-Dive on Selected Stage */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{OXYGEN_STEPS[activeOxygenStep].emoji}</span>
                <h3 className="text-base font-bold text-stone-900">
                  Detailed Bioenergetics: {OXYGEN_STEPS[activeOxygenStep].title} ({OXYGEN_STEPS[activeOxygenStep].subtitle})
                </h3>
              </div>
              <div className="text-xs font-mono text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                Stage {activeOxygenStep + 1} of 5
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal bg-stone-50 p-4 rounded-xl border border-stone-200">
              {OXYGEN_STEPS[activeOxygenStep].details}
            </p>
          </div>

          {/* Zone 2 vs. Zone 5 Operational Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm uppercase font-mono">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                In Zone 2: The Perfect Clean Symphony
              </div>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-normal">
                Because your heart rate is kept strictly at <strong>101–120 BPM</strong>, your lungs supply oxygen at the exact speed the electron transport chain demands. Station 4 never clogs. Every electron spark is cleanly extinguished into pure water ($H_2O$), and your slow-twitch fibers burn fatty acids effortlessly for hours with <strong>zero muscle burn and zero toxic acidosis</strong>.
              </p>
              <div className="text-[11px] font-mono text-emerald-900 bg-white p-2.5 rounded-lg border border-emerald-200">
                ✨ Result: Peak FATmax, high mitochondrial biogenesis, rapid recovery.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-rose-50 border border-rose-300 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-rose-950 font-bold text-sm uppercase font-mono">
                <Zap className="w-5 h-5 text-rose-700" />
                In Zone 5: The Severe Assembly Jam
              </div>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-normal">
                When sprinting at maximal effort, glucose glycolysis floods the cell with electrons faster than capillaries can deliver oxygen. Station 4 runs out of oxygen catchers! The assembly line jams, electrons back up upstream, and pyruvate is forced to absorb electrons to become <strong>lactic acid</strong>—producing burning legs and rapid exhaustion.
              </p>
              <div className="text-[11px] font-mono text-rose-900 bg-white p-2.5 rounded-lg border border-rose-200">
                ⚠️ Result: Severe oxygen debt, glycolysis dependency, mitochondrial shutdown.
              </div>
            </div>
          </div>

        </section>
      )}

      {/* TAB 2: THE CORE VERDICT */}
      {activeTab === 'verdict' && (
        <section className="space-y-6 animate-fade-in">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white space-y-4 shadow-md border border-emerald-600/40">
            <div className="flex items-center gap-2.5 text-emerald-300 font-bold text-lg font-serif">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <span>The Core Scientific Verdict: You Are Practically Right!</span>
            </div>
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
              Your intuition is physiologically spot-on: <strong>Zone 2 running produces negligible to zero contractile muscle hypertrophy (muscle fiber thickening) in trained athletes.</strong> Its entire biological mandate is <strong>mitochondrial biogenesis, enzyme expansion, and microvascular capillarization.</strong>
            </p>
            <div className="p-4 rounded-xl bg-black/40 border border-emerald-400/30 text-xs font-mono text-emerald-200">
              💡 Summary Rule: Zone 2 expands the <strong>cellular engine and gas tank</strong> (mitochondria & capillaries), while heavy resistance training expands the <strong>chassis and mechanical horsepower</strong> (muscle fibers & myofibrillar cross-sectional area).
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900">Why Zone 2 Doesn't Thicken Muscle Fibers</h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                Skeletal muscle enlargement (hypertrophy) requires <strong>high mechanical tension</strong> that approaches muscular failure, which recruits Type IIa and IIx fast-twitch motor units. Zone 2 deliberately stays far below this threshold, running exclusively on low-tension Type I slow-twitch fibers that have an extremely limited capacity for cross-sectional diameter growth.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-800">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900">Why Mitochondria Multiply Exponentially</h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                Continuous low-intensity contractions deplete energy reserves slowly and steadily, raising cellular AMP levels. This activates the master metabolic switch <strong>AMPK</strong>, which directly switches on <strong>PGC-1α</strong>. PGC-1α commands the cell nucleus to replicate mitochondrial DNA, resulting in up to <strong>+40% to +50% increase in mitochondrial density</strong>.
              </p>
            </div>
          </div>

        </section>
      )}

      {/* TAB 3: MOLECULAR PHYSIOLOGY (AMPK VS. MTORC1) */}
      {activeTab === 'molecular' && (
        <section className="space-y-6 animate-fade-in">
          
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-600" />
              The Molecular Tug-of-War: AMPK vs. mTORC1 (The Interference Effect)
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
              At the intracellular level, muscle cells must choose how to allocate energy: should they build bulky protein fibers (expensive to maintain), or should they build efficient energy factories? Two opposing signaling pathways dictate this choice:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="text-xs font-mono font-bold uppercase text-emerald-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  Zone 2 Signal: The AMPK / PGC-1α Pathway
                </div>
                <div className="text-sm font-bold text-emerald-950">Aerobic Energy & Efficiency Mode</div>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  Continuous muscular contraction elevates the AMP:ATP ratio. AMPK senses this mild energy drop and triggers <strong>PGC-1α</strong> (Peroxisome proliferator-activated receptor gamma coactivator 1-alpha). PGC-1α stimulates mitochondrial fission and biogenesis, fatty acid beta-oxidation, and capillary growth.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
                <div className="text-xs font-mono font-bold uppercase text-purple-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  Heavy Resistance Signal: The mTORC1 Pathway
                </div>
                <div className="text-sm font-bold text-purple-950">Contractile Protein Growth Mode</div>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  High mechanical strain against resistance activates mechanosensors and intracellular phosphatidic acid, switching on <strong>mTORC1</strong>. mTORC1 phosphorylates <strong>p70S6K</strong> and <strong>4E-BP1</strong>, ramping up ribosomal translation to synthesize thick actin and myosin filaments.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border-l-4 border-amber-500 text-xs text-stone-800 leading-relaxed">
              ⚠️ <strong>The Key Biochemistry:</strong> Active AMPK directly phosphorylates <em>TSC2</em> and <em>Raptor</em>, which acts as a molecular brake on mTORC1. When you run in Zone 2, your cells actively quiet down the muscle-bulking machinery so they can channel all available nutrients into building pristine mitochondria!
            </div>
          </div>

          {/* Motor Unit Size Principle */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-700" />
              Henneman's Size Principle: Why Running Doesn't Touch Fast-Twitch Fibers
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
              Your central nervous system recruits motor units strictly in order of size:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="font-bold text-emerald-900">Type I (Slow-Twitch)</div>
                <div className="text-stone-600">Recruited during: Walking & Zone 2 running. High mitochondria, high fatigue resistance, low growth ceiling.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="font-bold text-amber-900">Type IIa (Fast Oxidative)</div>
                <div className="text-stone-600">Recruited during: Tempo runs, Zone 4, medium lifting. Moderate growth potential, mixed fuel.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="font-bold text-rose-900">Type IIx (Fast Glycolytic)</div>
                <div className="text-stone-600">Recruited during: Heavy deadlifts, all-out sprints. High growth ceiling (+40% diameter), fast to fatigue.</div>
              </div>
            </div>
          </div>

        </section>
      )}

      {/* TAB 4: THE 4 NUANCES (WHAT ACTUALLY EXPANDS?) */}
      {activeTab === 'nuances' && (
        <section className="space-y-6 animate-fade-in">
          
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-stone-900">
              The 4 Nuances: What Actually "Expands" in Zone 2 Muscle?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
              Even though you are not adding bodybuilder myofibrils, regular Zone 2 running causes profound physical structural remodeling that makes your leg muscles feel denser, firmer, and more vascular:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2.5 hover:border-emerald-400 transition">
              <div className="text-3xl">🔬</div>
              <div className="text-xs font-mono font-bold text-emerald-800 uppercase">1. Mitochondrial Swelling</div>
              <h3 className="text-sm font-bold text-stone-900">Volume Fraction Multiplier</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                In untrained muscle, mitochondria occupy only ~3–5% of the muscle fiber volume. In trained Zone 2 runners, this expands to <strong>15% to 22%</strong> of total intracellular volume—visibly filling out the cell!
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2.5 hover:border-blue-400 transition">
              <div className="text-3xl">🩸</div>
              <div className="text-xs font-mono font-bold text-blue-800 uppercase">2. Capillary Angiogenesis</div>
              <h3 className="text-sm font-bold text-stone-900">6–8 Vessels Per Fiber</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                Zone 2 releases VEGF, stimulating new micro-vessels. Capillaries per fiber surge from 3–4 up to <strong>6–8 capillaries</strong>, flooding the muscle with blood volume and giving a permanent vascular tone.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2.5 hover:border-cyan-400 transition">
              <div className="text-3xl">💧</div>
              <div className="text-xs font-mono font-bold text-cyan-800 uppercase">3. Sarcoplasmic Hydration</div>
              <h3 className="text-sm font-bold text-stone-900">Glycogen Water Sponge</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                Aerobic training expands intramuscular glycogen storage capacity. Because each gram of stored glycogen binds <strong>3 to 4 grams of water</strong>, your quadriceps and calves retain healthy fluid and look fuller.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2.5 hover:border-amber-400 transition">
              <div className="text-3xl">👟</div>
              <div className="text-xs font-mono font-bold text-amber-800 uppercase">4. Impact Remodeling</div>
              <h3 className="text-sm font-bold text-stone-900">Soleus & Tendon Stiffness</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                In individuals transitioning from walking to running, ground impact forces (2–3x body weight) and eccentric braking do trigger modest initial hypertrophy in the <strong>soleus</strong> and Achilles tendon collagen.
              </p>
            </div>

          </div>

        </section>
      )}

      {/* TAB 5: COMPARISON MATRIX */}
      {activeTab === 'matrix' && (
        <section className="space-y-6 animate-fade-in">
          
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-700" />
                Head-to-Head: Zone 2 Running vs. Resistance Training
              </h2>
              <p className="text-xs text-stone-600 font-normal mt-0.5">
                Direct biomarker and adaptation comparison across cellular and tissue parameters.
              </p>
            </div>
            <span className="text-xs font-mono bg-stone-100 text-stone-700 px-3 py-1 rounded-lg border border-stone-300">
              Cellular Phenotype Analysis
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm bg-white">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-100 text-stone-700 uppercase font-mono text-[11px] border-b border-stone-200">
                <tr>
                  <th className="p-3.5 font-bold">Adaptation Parameter</th>
                  <th className="p-3.5 font-bold text-emerald-800">Zone 2 Aerobic Running</th>
                  <th className="p-3.5 font-bold text-purple-800">Hypertrophy Resistance Training</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-800">
                <tr className="hover:bg-stone-50 transition">
                  <td className="p-3.5 font-semibold">Primary Master Switch</td>
                  <td className="p-3.5 font-mono text-emerald-700 font-bold">AMPK → PGC-1α</td>
                  <td className="p-3.5 font-mono text-purple-700 font-bold">mTORC1 → p70S6K</td>
                </tr>
                <tr className="hover:bg-stone-50 transition">
                  <td className="p-3.5 font-semibold">Fibers Recruited</td>
                  <td className="p-3.5">Type I (Slow-Twitch Oxidative)</td>
                  <td className="p-3.5">Type IIa & IIx (Fast-Twitch Glycolytic)</td>
                </tr>
                <tr className="hover:bg-stone-50 transition">
                  <td className="p-3.5 font-semibold">Contractile Muscle Hypertrophy</td>
                  <td className="p-3.5 text-stone-500">Negligible to Zero (in trained state)</td>
                  <td className="p-3.5 text-purple-800 font-bold">+20% to +45% Fiber Diameter</td>
                </tr>
                <tr className="hover:bg-stone-50 transition">
                  <td className="p-3.5 font-semibold">Mitochondrial Biogenesis</td>
                  <td className="p-3.5 text-emerald-700 font-bold">Massive (+40-50% Density & Enzymes)</td>
                  <td className="p-3.5 text-stone-500">Minimal to Diluted</td>
                </tr>
                <tr className="hover:bg-stone-50 transition">
                  <td className="p-3.5 font-semibold">Capillary-to-Fiber Ratio</td>
                  <td className="p-3.5 text-emerald-700 font-bold">Extremely High (6–8 vessels/fiber)</td>
                  <td className="p-3.5 text-stone-500">Low to Unchanged</td>
                </tr>
                <tr className="hover:bg-stone-50 transition">
                  <td className="p-3.5 font-semibold">Primary Fuel Substrate</td>
                  <td className="p-3.5 text-teal-700 font-semibold">Free Fatty Acids (FATmax Peak)</td>
                  <td className="p-3.5 text-amber-700 font-semibold">Intramuscular Glycogen & Creatine Phosphate</td>
                </tr>
                <tr className="hover:bg-stone-50 transition">
                  <td className="p-3.5 font-semibold">Longevity Phenotype</td>
                  <td className="p-3.5 text-emerald-800">High VO2max, Insulin Sensitivity, Cardiac Output</td>
                  <td className="p-3.5 text-purple-800">Sarcopenia Defense, Bone Density, Joint Integrity</td>
                </tr>
              </tbody>
            </table>
          </div>

        </section>
      )}

      {/* TAB 6: PRACTICAL LONGEVITY PROTOCOL */}
      {activeTab === 'synthesis' && (
        <section className="space-y-6 animate-fade-in">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-stone-900 to-slate-900 text-white space-y-4 shadow-md border border-emerald-500/30">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                The Longevity Synthesis: Why You Must Combine Both
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Do not treat Zone 2 and resistance training as competitors. They are the two non-negotiable pillars of human healthspan: Zone 2 builds the <strong>aerobic engine, clears cellular debris (mitophagy), and optimizes metabolic flexibility</strong>, while resistance training maintains <strong>skeletal muscle mass, metabolic glucose sink capacity, and bone mineral density</strong> as you age.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
              <div className="text-emerald-700 font-bold text-sm flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> 1. Separate the Stimuli
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                To prevent AMPK from shutting down mTORC1 protein synthesis, separate heavy lifting and Zone 2 running by at least <strong>6 hours</strong>, or perform them on alternating days.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
              <div className="text-purple-700 font-bold text-sm flex items-center gap-1.5">
                <Dumbbell className="w-4 h-4" /> 2. Lift First, Run Later
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                If you must perform both in a single workout session, complete your resistance training first so neuromuscular freshness produces clean mechanical tension without fatigue.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
              <div className="text-amber-700 font-bold text-sm flex items-center gap-1.5">
                <Flame className="w-4 h-4" /> 3. Fuel Sufficient Protein
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                Consume <strong>1.6 to 2.0g protein/kg</strong> body weight daily. This guarantees your muscle tissue has ample amino acids for protein turnover while logging high Zone 2 mileage.
              </p>
            </div>
          </div>

        </section>
      )}

      {/* Magazine Footer Reference Badge */}
      <div className="p-4 rounded-xl bg-stone-100 text-stone-600 text-xs font-mono flex flex-wrap items-center justify-between gap-2 border border-stone-200">
        <span>Optimus Magazine • Issue 01 • Article 35</span>
        <span className="text-emerald-800 font-bold">Bioenergetics & Longevity Science Press</span>
      </div>

    </article>
  );
}
