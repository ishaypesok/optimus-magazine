import React, { useState } from 'react';
import { 
  Flame, Droplet, Clock, Zap, Award, ExternalLink, ShieldCheck, 
  Activity, Heart, AlertCircle, CheckCircle2, ChevronRight, Calculator,
  Coffee, HelpCircle, ArrowUpRight, Scale, Info
} from 'lucide-react';

const TABS = [
  { id: 'loading', label: '1. Carbo-Loading', badge: '36-48h Before' },
  { id: 'breakfast', label: '2. Race Morning', badge: '3-4h Before' },
  { id: 'topoff', label: '3. Start Line', badge: '15-30m Before' },
  { id: 'inrace', label: '4. During Race', badge: 'Every 60 Mins' },
  { id: 'hydration', label: '5. Hydration & Salt', badge: 'No Overdrinking' },
  { id: 'caffeine', label: '6. Caffeine Protocol', badge: 'Ergogenic' },
];

export default function MarathonFuelingMasterclass() {
  const [activeTab, setActiveTab] = useState('loading');

  // Interactive Marathon Fueling Calculator State
  const [runnerWeight, setRunnerWeight] = useState(74); // kg
  const [targetTimeHours, setTargetTimeHours] = useState(3.5); // 3h 30m
  const [gutTrainingLevel, setGutTrainingLevel] = useState('intermediate'); // beginner (40g), intermediate (60g), advanced (80g)

  // Calculations
  const hourlyCarbTarget = gutTrainingLevel === 'beginner' ? 40 : gutTrainingLevel === 'intermediate' ? 60 : 80;
  const totalInRaceCarbs = Math.round(hourlyCarbTarget * targetTimeHours);
  const gelsNeeded = Math.ceil(totalInRaceCarbs / 25); // assuming ~25g per gel
  const breakfastCarbsMin = Math.round(runnerWeight * 1.5);
  const breakfastCarbsMax = Math.round(runnerWeight * 2.5);
  const estTotalBurnKcal = Math.round(runnerWeight * 1.02 * 42.195);
  const exogenousCarbKcal = totalInRaceCarbs * 4;
  const exogenousCoveragePct = Math.min(35, Math.round((exogenousCarbKcal / estTotalBurnKcal) * 100));
  const caffeineDoseMg = Math.round(runnerWeight * 3);

  return (
    <article className="space-y-8 animate-fade-in font-sans text-stone-900">
      
      {/* Article Header & Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-950 font-bold text-xs uppercase tracking-wider border border-emerald-300 inline-flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-emerald-700" />
            Article 36 • Expert Spotlight & Masterclass
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 font-bold text-xs uppercase tracking-wider border border-blue-200 inline-flex items-center gap-1.5">
            🏃 Marathon Bioenergetics & Fueling
          </span>
          <a
            href="https://www.mysportscience.com/post/how-to-fuel-for-a-marathon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-900 text-white text-xs font-bold hover:bg-black transition shadow-xs"
          >
            <span>Original Source on MySportScience</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
          How to Fuel for a Marathon:{' '}
          <span className="text-emerald-700">The Science of 42.2K Nutrition</span>
        </h1>
        <p className="text-stone-600 text-base sm:text-lg font-normal leading-relaxed max-w-4xl">
          A definitive, evidence-based masterclass by world-renowned exercise physiologist <strong>Prof. Asker Jeukendrup</strong>. 
          Covering carbo-loading kinetics, SGLT1/GLUT5 dual-transporters, nocturnal liver glycogen rescue, and the physiological balance of fat oxidation vs. exogenous carbohydrate delivery.
        </p>

        {/* Author Attribution Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-stone-900 text-white border border-stone-800 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-md shrink-0 flex items-center justify-center font-black text-white text-lg">
              AJ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base">Prof. Asker Jeukendrup, PhD</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                  Pioneer of Multiple Transportable Carbs
                </span>
              </div>
              <p className="text-stone-300 text-xs mt-0.5">
                Founder of MySportScience • Former Head of Gatorade Sports Science Institute • Nutritionist to Olympic Champions & Tour de France Teams
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-800 text-[11px] font-mono text-stone-400">
            <div>Peer-Reviewed Consensus</div>
            <div className="text-emerald-400 font-bold">Updated Scientific Edition</div>
          </div>
        </div>
      </div>

      {/* Hero Infographic Banner */}
      <div className="p-4 sm:p-6 rounded-3xl bg-stone-100 border border-stone-300 space-y-3 shadow-xs">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-stone-800 font-extrabold text-sm uppercase tracking-wider">
            <Award className="w-4 h-4 text-emerald-700" />
            Official Infographic: How to Fuel for a Marathon
          </div>
          <span className="text-[11px] font-mono text-stone-500">Source: mysportscience.com</span>
        </div>
        
        <div className="overflow-hidden rounded-2xl border-2 border-stone-300 shadow-sm bg-white">
          <img 
            src="./marathon-fueling-guide.jpg" 
            alt="Prof. Asker Jeukendrup - How to Fuel for a Marathon Infographic" 
            className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-300"
          />
        </div>
        <p className="text-xs text-stone-600 italic text-center">
          Overview of the marathon fueling timeline: The day before (carbo-loading), the morning of (liver top-off), 15 min pre-race, in-race fueling, and post-race recovery.
        </p>
      </div>

      {/* Interactive Phase Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <h2 className="text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-700" />
            Phase-by-Phase Fueling Blueprint
          </h2>
          <span className="text-xs font-mono text-stone-500 hidden sm:inline">Click tabs to view protocols</span>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`p-3 rounded-2xl text-left transition-all border flex flex-col justify-between gap-1.5 ${
                activeTab === t.id
                  ? 'bg-emerald-900 text-white border-emerald-950 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
              }`}
            >
              <span className={`text-[10px] font-mono uppercase tracking-wider font-extrabold ${
                activeTab === t.id ? 'text-emerald-300' : 'text-stone-500'
              }`}>
                {t.badge}
              </span>
              <span className="text-xs font-bold leading-tight line-clamp-1">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Cards */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm min-h-[280px]">
          {activeTab === 'loading' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-2.5 text-emerald-800 font-extrabold text-lg">
                <Flame className="w-6 h-6 text-emerald-700" />
                Carbohydrate Loading: Macro Shifting vs. Indiscriminate Gorging
              </div>
              <p className="text-stone-700 text-sm leading-relaxed">
                Carbo-loading is one of the most misunderstood strategies in running. Runners often treat it as a free license to binge on pizza, pastries, and fatty pastas the night before, resulting in gastrointestinal distress and lethargy.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="font-extrabold text-emerald-950 text-sm">🌾 Target Quantity</div>
                  <div className="text-2xl font-black text-emerald-800 font-mono">7 – 10 g/kg</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Over the 24 to 36 hours prior to the race. For a 70 kg runner, this equals ~500–700 grams of carbohydrates.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                  <div className="font-extrabold text-amber-950 text-sm">⚖️ Shift Ratios, Don't Gorge</div>
                  <div className="text-base font-bold text-amber-800">Lower Fat & Fiber</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Keep total caloric intake relatively close to normal by dramatically dropping dietary fat, protein, and roughage while increasing clean carbs (rice, pasta, oats, potatoes).
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                  <div className="font-extrabold text-blue-950 text-sm">💧 Expect Water Weight</div>
                  <div className="text-base font-bold text-blue-800">+1.0 to 1.5 kg</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Every 1 gram of stored glycogen binds approximately <strong>3 grams of water</strong>. Gaining 1–1.5 kg is a sign of successfully saturated cellular fuel tanks!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'breakfast' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-2.5 text-emerald-800 font-extrabold text-lg">
                <Clock className="w-6 h-6 text-emerald-700" />
                Race Morning: Rescuing Depleted Nocturnal Liver Glycogen
              </div>
              <p className="text-stone-700 text-sm leading-relaxed">
                While your muscles hold onto their glycogen during sleep, your <strong>liver</strong> is constantly active overnight. Your liver burns through 50% or more of its glycogen to maintain normal blood glucose for your brain and vital organs while you sleep.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    Timing & Dosage
                  </div>
                  <div className="text-xl font-black text-emerald-800 font-mono">100 – 200 grams carbs</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Consume your pre-race meal <strong>3 to 4 hours before the race start</strong>. This allows gastric emptying to complete and prevents nausea or heavy stomach during running.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                    Ideal Food Composition
                  </div>
                  <div className="text-sm font-semibold text-stone-800">Low Fiber, Low Fat, Low Protein</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Stick to tested classics: oatmeal/porridge with honey and banana, white toast with jam, white rice, or liquid meal replacement drinks. Avoid high-fiber cereals, seeds, eggs, or bacon.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'topoff' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-2.5 text-emerald-800 font-extrabold text-lg">
                <Zap className="w-6 h-6 text-emerald-700" />
                Start Line Top-Off: Debunking "Reactive Hypoglycemia"
              </div>
              <p className="text-stone-700 text-sm leading-relaxed">
                Many runners are terrified of having a gel 15 minutes before the gun goes off, fearing that an insulin spike will cause a severe blood glucose crash 15 minutes into the race. Prof. Jeukendrup explains why this fear is scientifically unfounded.
              </p>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  The Sympathetic Override
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  The moment your race begins, heightened adrenaline and sympathetic nervous activity <strong>potently suppress pancreatic insulin secretion</strong>. Simultaneously, muscle contractions trigger insulin-independent <strong>GLUT4 transporter translocation</strong>. Blood sugar stabilizes, and the 20–30g of carbs taken at the start acts as your immediate first wave of in-race fuel!
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-stone-600 bg-stone-100 p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-emerald-800">Protocol:</span>
                <span>1 Gel (20–30g Carbs) + 150ml Plain Water consumed 15–20 minutes prior to gun time.</span>
              </div>
            </div>
          )}

          {activeTab === 'inrace' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-2.5 text-emerald-800 font-extrabold text-lg">
                <Activity className="w-6 h-6 text-emerald-700" />
                During the Race: Transporters & In-Race Kinetics (60 – 90 g/h)
              </div>
              <p className="text-stone-700 text-sm leading-relaxed">
                Your intestinal wall is not a passive sponge. Carbohydrates must be transported across the gut epithelium into the bloodstream using specialized protein transporters.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="font-bold text-stone-900 text-sm">SGLT1 Transporter Saturation (~60 g/h)</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Glucose and maltodextrin enter via the <strong>SGLT1</strong> transporter. At around 60g/hour, these transporters become completely saturated. Swallowing more pure glucose simply leads to accumulation in the gut lumen, drawing water and causing GI cramps.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="font-bold text-stone-900 text-sm">Dual Transporters: Adding GLUT5 (Up to 90 g/h)</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Fructose uses a completely separate pathway: the <strong>GLUT5</strong> transporter. By combining glucose and fructose (in a 2:1 or 1:0.8 ratio), you open two distinct gates simultaneously, boosting absorption to <strong>up to 90 g/h</strong>.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-950 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Crucial Osmolality Rule:</strong> Always wash concentrated gels down with plain water! Washing down a hypertonic gel with a concentrated sports drink spikes osmolality, halts gastric emptying, and causes sudden nausea or osmotic diarrhea.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hydration' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-2.5 text-emerald-800 font-extrabold text-lg">
                <Droplet className="w-6 h-6 text-emerald-700" />
                Hydration & Electrolytes: The Defense Against Hyponatremia
              </div>
              <p className="text-stone-700 text-sm leading-relaxed">
                The biggest misconception in marathon running is that you must replace 100% of fluid lost through sweat. In reality, **overdrinking is far more dangerous than mild dehydration**.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <div className="font-bold text-stone-900 text-xs uppercase tracking-wider">Normal Weight Loss</div>
                  <div className="text-xl font-black text-emerald-800 font-mono">-1.0 to -2.0 kg</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Finishing a marathon 1–2 kg lighter is completely physiological and safe (partly due to burned fuel and water released from glycogen).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                  <div className="font-bold text-rose-950 text-xs uppercase tracking-wider">The Deadly Threat</div>
                  <div className="text-sm font-bold text-rose-800">EAH (Hyponatremia)</div>
                  <p className="text-xs text-rose-700 leading-relaxed">
                    Drinking excessive plain water dilutes blood sodium levels below 135 mmol/L, causing brain swelling, confusion, and collapse.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
                  <div className="font-bold text-blue-950 text-xs uppercase tracking-wider">Hydration Rule of Thumb</div>
                  <div className="text-xl font-black text-blue-800 font-mono">400 – 800 ml/h</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Drink to thirst. Use small, frequent sips at water stations rather than gulping full cups. Add sodium (300–600 mg/L) in warm conditions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'caffeine' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-2.5 text-emerald-800 font-extrabold text-lg">
                <Coffee className="w-6 h-6 text-emerald-700" />
                Caffeine Ergogenic Protocol: Central Fatigue Reduction
              </div>
              <p className="text-stone-700 text-sm leading-relaxed">
                Caffeine does not just "wake you up"—it crosses the blood-brain barrier and antagonizes <strong>adenosine receptors</strong>, directly lowering Rate of Perceived Exertion (RPE) and delaying central nervous system fatigue.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                  <div className="font-bold text-amber-950 text-sm">Recommended Dosage</div>
                  <div className="text-2xl font-black text-amber-800 font-mono">~3 mg/kg</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    For a 70 kg runner, this equals roughly **200 mg of caffeine** (equivalent to 1–2 strong coffees or 2 caffeinated gels).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="font-bold text-stone-900 text-sm">Timing Strategy</div>
                  <div className="text-sm font-semibold text-stone-800">45–60 min before need</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Caffeine peaks in the blood 45 to 60 minutes after ingestion. Take half pre-race and save the second caffeinated gel for **km 28–32**, exactly when the psychological "wall" hits.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Fueling & Bioenergetics Calculator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-slate-900 to-emerald-950 text-white border border-stone-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              Optimus Interactive Engine
            </div>
            <h3 className="text-2xl font-black text-white mt-1">
              Personalized Marathon Fueling & Oxidation Planner
            </h3>
          </div>
          <span className="text-xs font-mono text-stone-400 bg-stone-800/60 px-3 py-1.5 rounded-xl border border-stone-700">
            Based on Jeukendrup Substrate Kinetics
          </span>
        </div>

        {/* Input Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-300">
              <span>Runner Body Weight:</span>
              <span className="text-emerald-400 font-mono text-sm">{runnerWeight} kg</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="100" 
              value={runnerWeight}
              onChange={(e) => setRunnerWeight(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-500 font-mono">
              <span>50 kg</span>
              <span>75 kg</span>
              <span>100 kg</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-300">
              <span>Target Finish Time:</span>
              <span className="text-emerald-400 font-mono text-sm">
                {Math.floor(targetTimeHours)}h {Math.round((targetTimeHours % 1) * 60)}m
              </span>
            </div>
            <input 
              type="range" 
              min="2.5" 
              max="5.0" 
              step="0.25"
              value={targetTimeHours}
              onChange={(e) => setTargetTimeHours(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-500 font-mono">
              <span>2h 30m</span>
              <span>3h 45m</span>
              <span>5h 00m</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-300">
              <span>Gut Training Level:</span>
              <span className="text-emerald-400 font-mono text-sm capitalize">{gutTrainingLevel}</span>
            </div>
            <div className="grid grid-cols-3 gap-1 pt-1">
              {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setGutTrainingLevel(lvl)}
                  className={`py-1.5 px-2 rounded-xl text-center text-xs font-bold capitalize transition border ${
                    gutTrainingLevel === lvl 
                      ? 'bg-emerald-600 text-white border-emerald-400' 
                      : 'bg-stone-800/80 hover:bg-stone-800 text-stone-400 border-stone-700'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <div className="text-[10px] text-stone-400 text-center font-mono">
              {gutTrainingLevel === 'beginner' && '40g/h (single glucose/carb)'}
              {gutTrainingLevel === 'intermediate' && '60g/h (standard marathon target)'}
              {gutTrainingLevel === 'advanced' && '80g/h (requires dual-transporters)'}
            </div>
          </div>
        </div>

        {/* Output Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-1">
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Total In-Race Carbs</div>
            <div className="text-2xl font-black text-emerald-400 font-mono">{totalInRaceCarbs} g</div>
            <div className="text-[10px] text-stone-400 font-mono">~{hourlyCarbTarget} g/hour</div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-1">
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Gels Required</div>
            <div className="text-2xl font-black text-amber-400 font-mono">{gelsNeeded} Gels</div>
            <div className="text-[10px] text-stone-400 font-mono">1 pre-start + {gelsNeeded - 1} on course</div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-1">
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Pre-Race Breakfast</div>
            <div className="text-2xl font-black text-blue-400 font-mono">{breakfastCarbsMin}–{breakfastCarbsMax} g</div>
            <div className="text-[10px] text-stone-400 font-mono">3–4h before start</div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-1">
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Caffeine Dose</div>
            <div className="text-2xl font-black text-purple-400 font-mono">~{caffeineDoseMg} mg</div>
            <div className="text-[10px] text-stone-400 font-mono">3 mg/kg threshold</div>
          </div>
        </div>

        {/* Bioenergetic Substrate Distribution Bar */}
        <div className="space-y-2 pt-2 border-t border-stone-800">
          <div className="flex justify-between items-center text-xs font-semibold text-stone-300">
            <span>Estimated Total Race Energy Expenditure: <strong className="text-white font-mono">{estTotalBurnKcal.toLocaleString()} kcal</strong></span>
            <span className="text-emerald-400 font-mono">Exogenous Fuel Covers ~{exogenousCoveragePct}% of Total Kcal</span>
          </div>

          <div className="h-4 w-full rounded-full bg-stone-800 overflow-hidden flex shadow-inner">
            <div 
              style={{ width: `${exogenousCoveragePct}%` }} 
              className="bg-emerald-500 h-full flex items-center justify-center text-[9px] font-black text-emerald-950" 
              title="Exogenous Gels & Carbs"
            >
              {exogenousCoveragePct}%
            </div>
            <div 
              style={{ width: `${Math.round((100 - exogenousCoveragePct) * 0.58)}%` }} 
              className="bg-amber-500 h-full flex items-center justify-center text-[9px] font-black text-amber-950" 
              title="Stored Muscle Glycogen"
            >
              Glycogen (~{Math.round((100 - exogenousCoveragePct) * 0.58)}%)
            </div>
            <div 
              style={{ width: `${100 - exogenousCoveragePct - Math.round((100 - exogenousCoveragePct) * 0.58)}%` }} 
              className="bg-sky-500 h-full flex items-center justify-center text-[9px] font-black text-sky-950" 
              title="Aerobic Fat Oxidation"
            >
              Fat (~{100 - exogenousCoveragePct - Math.round((100 - exogenousCoveragePct) * 0.58)}%)
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-400 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span>Exogenous Carbs: {exogenousCarbKcal} kcal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span>Internal Glycogen: ~{Math.round(estTotalBurnKcal * 0.45)} kcal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
              <span>Endogenous Fat Oxidation: ~{Math.round(estTotalBurnKcal * 0.35)} kcal</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Fat Burning & Bioenergetics Deep Dive */}
      <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-4">
        <div className="flex items-center gap-2 text-stone-900 font-extrabold text-lg">
          <Info className="w-5 h-5 text-emerald-700" />
          The Bioenergetics Connection: Fat Burning Meets Race Fueling
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-stone-700 leading-relaxed">
          <div className="space-y-3">
            <h4 className="font-bold text-stone-900">Why Carbs Sparing Glycogen Doesn't Halt Fat Oxidation</h4>
            <p className="text-xs leading-relaxed">
              Because running consumes 14–16 kcal/minute while 60g/h of gels provides only 4 kcal/minute, there is an unavoidable 10–12 kcal/minute deficit. 
              During exercise, sympathetic tone suppresses insulin, meaning <strong>intramuscular fat oxidation continues to burn in the background</strong>.
            </p>
            <p className="text-xs leading-relaxed">
              The athlete with a well-developed Zone 2 base burns fat at 0.6–0.8 g/min, saving hundreds of grams of muscle glycogen for the final 10 kilometers.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-stone-900">"Fat Burns in the Flame of Carbohydrate"</h4>
            <p className="text-xs leading-relaxed">
              The Krebs cycle requires <strong>Oxaloacetate</strong> to condense with fatty-acid-derived Acetyl-CoA. Oxaloacetate is replenished through pyruvate (the terminal product of glycolysis).
            </p>
            <p className="text-xs leading-relaxed">
              When muscle glycogen runs completely dry, pyruvate plummets, oxaloacetate is exhausted, and **even fat oxidation grinds to a halt**. Fueling with exogenous carbs maintains anaplerotic flux so your fat engine can keep turning.
            </p>
          </div>
        </div>
      </div>

      {/* Race Day Checklist Summary */}
      <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-4">
        <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-base">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          Prof. Jeukendrup's Golden Rules Checklist
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-800">
          <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Never try anything new on race day:</strong> Practice all gels, brands, and fluid timing during long training runs.</span>
          </div>
          <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Train the gut:</strong> Increase carb intake progressively during tempo and race-pace sessions for 6–8 weeks to upregulate SGLT1.</span>
          </div>
          <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Gel + Plain Water only:</strong> Avoid washing high-sugar gels down with concentrated sports drinks to prevent gastric shutdown.</span>
          </div>
          <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Cognitive Flexibility:</strong> Have a plan, but if the gut rebels or temperatures spike, dial back intake slightly and listen to your physiology.</span>
          </div>
        </div>
      </div>

      {/* Article Footer & Citation */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs font-mono text-stone-600">
        <div>Optimus Magazine • Issue 01 • Article 36</div>
        <div className="flex items-center gap-3">
          <span>Author: Asker Jeukendrup, PhD</span>
          <span>•</span>
          <a 
            href="https://www.mysportscience.com/post/how-to-fuel-for-a-marathon" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-emerald-800 font-bold hover:underline inline-flex items-center gap-1"
          >
            mysportscience.com
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </article>
  );
}
