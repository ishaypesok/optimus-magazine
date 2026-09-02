import React, { useState } from 'react';
import { 
  Calendar, CheckCircle2, Dumbbell, Flame, Activity, Clock, 
  Utensils, Droplet, Zap, Target, BookOpen, ChevronRight, 
  TrendingUp, Award, Layers, ShieldCheck, Heart, Sparkles, Scale, AlertTriangle
} from 'lucide-react';

export default function HypertrophyBlueprint12W() {
  const [activeTab, setActiveTab] = useState('nutrition'); // 'nutrition' | 'training' | 'timeline' | 'checklist'
  const [bodyWeightKg, setBodyWeightKg] = useState(80);
  const [goalMode, setGoalMode] = useState('lean_bulk'); // 'lean_bulk' | 'recomp' | 'fat_loss'

  // Calculated Nutrition Targets based on body weight
  const proteinMult = goalMode === 'fat_loss' ? 2.3 : 2.0;
  const proteinTargetG = Math.round(bodyWeightKg * proteinMult);
  const proteinPerMealG = Math.round(proteinTargetG / 4);
  const dailySurplusKcal = goalMode === 'lean_bulk' ? 200 : (goalMode === 'recomp' ? 0 : -300);
  const targetMonthlyGainKg = goalMode === 'lean_bulk' ? 0.5 : (goalMode === 'recomp' ? 0.0 : -1.0);
  const total12WGainKg = goalMode === 'lean_bulk' ? 1.5 : (goalMode === 'recomp' ? 1.0 : -3.0);

  // Habit Tracker State
  const [checkedHabits, setCheckedHabits] = useState({
    protein: true,
    surplus: true,
    zone2: true,
    lifting: true,
    sleep: false,
    water: true
  });

  const toggleHabit = (key) => {
    setCheckedHabits(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <article className="space-y-8 animate-fade-in font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-teal-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/20 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              Article 30 • 12-Week Practical Action Guide
            </span>
            <span className="text-xs font-mono text-stone-300 bg-stone-800/80 px-2.5 py-1 rounded-lg border border-stone-700">
              Protocol: Nutrition + Zone 2 + Hypertrophy
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            The 12-Week Behavioral & Nutrition Blueprint
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            How to structure your daily food intake, Zone 2 cardio sessions, resistance training, and recovery behaviors to achieve peak muscle accretion and 1:1 body recomposition in real life.
          </p>

          {/* Interactive Goal Mode Selector */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setGoalMode('lean_bulk')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                goalMode === 'lean_bulk'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-400/30'
                  : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:bg-stone-800'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Clean Lean Bulk (+200 kcal/day)</span>
            </button>

            <button
              onClick={() => setGoalMode('recomp')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                goalMode === 'recomp'
                  ? 'bg-amber-600 text-white border-amber-500 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:bg-stone-800'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>1:1 Body Recomposition (Maintenance)</span>
            </button>

            <button
              onClick={() => setGoalMode('fat_loss')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                goalMode === 'fat_loss'
                  ? 'bg-rose-600 text-white border-rose-500 shadow-md ring-2 ring-rose-400/30'
                  : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:bg-stone-800'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Fat Loss & Muscle Preservation (-300 kcal/day)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Tabs Bar */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-stone-200 flex flex-wrap items-center gap-2 text-xs font-bold">
        {[
          { id: 'nutrition', label: '1. Practical Nutrition & Macros', icon: Utensils },
          { id: 'training', label: '2. Training & Zone 2 Protocol', icon: Activity },
          { id: 'timeline', label: '3. 12-Week Progression Timeline', icon: Clock },
          { id: 'checklist', label: '4. Daily Behavioral Checklist', icon: CheckCircle2 },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl transition ${
                activeTab === tab.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ==================== TAB 1: PRACTICAL NUTRITION & MACROS ==================== */}
      {activeTab === 'nutrition' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* User Bodyweight Input & Personalized Targets Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-emerald-700" />
                  <span>Personalized 12-Week Nutrition Calculator</span>
                </h3>
                <p className="text-xs text-stone-500">
                  Calibrated for your exact body weight and training targets
                </p>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-stone-700">Your Body Weight:</label>
                <input
                  type="number"
                  min="50"
                  max="140"
                  value={bodyWeightKg}
                  onChange={(e) => setBodyWeightKg(Number(e.target.value))}
                  className="w-20 px-2.5 py-1 rounded-xl bg-stone-50 border border-stone-300 font-mono text-sm font-bold text-emerald-900 text-center"
                />
                <span className="text-xs font-bold text-stone-500">kg</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200">
                <div className="text-[11px] font-bold text-emerald-900">Daily Protein Target</div>
                <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">{proteinTargetG} g/day</div>
                <div className="text-[10px] text-emerald-600">2.0 g per kg body weight</div>
              </div>

              <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
                <div className="text-[11px] font-bold text-amber-900">Protein Per Meal</div>
                <div className="text-xl font-black text-amber-700 font-mono mt-0.5">~{proteinPerMealG} g/meal</div>
                <div className="text-[10px] text-amber-600">Across 4 meals (Leucine threshold)</div>
              </div>

              <div className="bg-rose-50 p-3.5 rounded-2xl border border-rose-200">
                <div className="text-[11px] font-bold text-rose-900">Daily Calorie Target</div>
                <div className="text-xl font-black text-rose-700 font-mono mt-0.5">
                  {dailySurplusKcal === 0 ? 'Maintenance' : `+${dailySurplusKcal} kcal`}
                </div>
                <div className="text-[10px] text-rose-600">
                  {dailySurplusKcal === 0 ? 'Net-zero scale change' : 'Clean lean gain surplus'}
                </div>
              </div>

              <div className="bg-sky-50 p-3.5 rounded-2xl border border-sky-200">
                <div className="text-[11px] font-bold text-sky-900">Target Monthly Shift</div>
                <div className="text-xl font-black text-sky-700 font-mono mt-0.5">
                  {targetMonthlyGainKg === 0 ? '0.0 kg/mo' : `+${targetMonthlyGainKg} kg/mo`}
                </div>
                <div className="text-[10px] text-sky-600">
                  {targetMonthlyGainKg === 0 ? '1:1 Recomposition' : 'Lean muscle progression'}
                </div>
              </div>
            </div>
          </div>

          {/* The 4 Nutritional Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Pillar 1 */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 font-extrabold text-stone-900 text-sm border-b border-stone-100 pb-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-xs">1</span>
                <span>Protein Distribution & Leucine Threshold</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                To maximize Muscle Protein Synthesis (MPS), hit <strong>2.0 g protein per kg of body weight</strong> ({proteinTargetG}g total for {bodyWeightKg}kg). Split this evenly into 3 to 4 meals containing at least <strong>3g of leucine</strong> per meal (e.g. 35-45g high-quality protein per seating).
              </p>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-[11px] text-stone-700 space-y-1">
                <div className="font-bold text-stone-900">Ideal Meal Timing:</div>
                <div>• Breakfast (8:00 AM): ~{proteinPerMealG}g Protein</div>
                <div>• Lunch (12:30 PM): ~{proteinPerMealG}g Protein</div>
                <div>• Post-Workout (5:00 PM): ~{proteinPerMealG}g Protein</div>
                <div>• Dinner (8:30 PM): ~{proteinPerMealG}g Protein</div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 font-extrabold text-stone-900 text-sm border-b border-stone-100 pb-2">
                <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-mono text-xs">2</span>
                <span>Carbohydrate Timing (Lifting vs. Zone 2)</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Carbohydrates are your high-octane fuel for heavy gym sessions, while fats fuel Zone 2. 
              </p>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-[11px] text-stone-700 space-y-1">
                <div>• <strong>Pre-Lifting (1-2 hrs before):</strong> 40-60g complex carbs (oats, rice, fruit) to fill muscle glycogen for heavy reps.</div>
                <div>• <strong>Pre-Zone 2:</strong> Keep carbs low to moderate so blood glucose is steady and CPT-1 fat oxidation (FATmax) operates at full efficiency.</div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 font-extrabold text-stone-900 text-sm border-b border-stone-100 pb-2">
                <span className="w-6 h-6 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-mono text-xs">3</span>
                <span>Caloric Surplus Management</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {goalMode === 'lean_bulk' ? (
                  <span>Aim for a controlled <strong>+200 kcal/day surplus</strong> above your baseline TDEE. This covers the ~41 kcal tissue cost, gym work, and NEAT without causing excess fat storage.</span>
                ) : (
                  <span>Aim for <strong>exact maintenance calories (0 surplus)</strong>. Let your 3x weekly Zone 2 sessions burn off ~150 kcal/day of body fat to fuel your muscle building!</span>
                )}
              </p>
              <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 text-[11px] text-rose-900 font-mono">
                Rule: Track scale weight weekly. If scale moves faster than +0.5 kg/month, trim 100 kcal.
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 font-extrabold text-stone-900 text-sm border-b border-stone-100 pb-2">
                <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-mono text-xs">4</span>
                <span>Hydration & Electrolyte Homeostasis</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Muscle tissue is 77% water. Sweat during Zone 2 loses sodium and potassium, which must be replenished to maintain intracellular matrix volume.
              </p>
              <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 text-[11px] text-sky-900 font-mono">
                Target: 3.5 - 4.0 Liters water daily + 500mg Sodium per Zone 2 hour.
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ==================== TAB 2: TRAINING & ZONE 2 PROTOCOL ==================== */}
      {activeTab === 'training' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-4">
            <h3 className="font-extrabold text-stone-900 text-base flex items-center gap-2 border-b border-stone-100 pb-3">
              <Activity className="w-4 h-4 text-emerald-700" />
              <span>Weekly Training Architecture (The Concurrent Model)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Lifting Card */}
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-900 uppercase">
                  <Dumbbell className="w-4 h-4 text-emerald-700" />
                  <span>3-4x Resistance Sessions</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Focus on progressive overload across compound lifts (Squat, Press, Row, RDL).
                </p>
                <div className="text-[11px] text-stone-500 font-mono bg-white p-2.5 rounded-xl border border-stone-200 space-y-1">
                  <div>• Rep Range: 6 - 12 reps</div>
                  <div>• Intensity: 1 - 3 RIR (Reps in Reserve)</div>
                  <div>• Rest: 2 - 3 mins between heavy sets</div>
                </div>
              </div>

              {/* Zone 2 Card */}
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold text-teal-900 uppercase">
                  <Activity className="w-4 h-4 text-teal-700" />
                  <span>3x 45-Min Zone 2 Sessions</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Dedicated aerobic base building at FATmax intensity (~60-70% Max HR).
                </p>
                <div className="text-[11px] text-stone-500 font-mono bg-white p-2.5 rounded-xl border border-stone-200 space-y-1">
                  <div>• HR Ceiling: 112 - 118 BPM (Conversational)</div>
                  <div>• Lactate: 1.5 - 2.0 mmol/L</div>
                  <div>• Modality: Running, Incline Treadmill, Cycling</div>
                </div>
              </div>

              {/* Recovery Card */}
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-900 uppercase">
                  <Heart className="w-4 h-4 text-indigo-700" />
                  <span>1-2x Rest & CNS Recovery</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Complete rest days allowing parasympathetic recovery and muscle remodeling.
                </p>
                <div className="text-[11px] text-stone-500 font-mono bg-white p-2.5 rounded-xl border border-stone-200 space-y-1">
                  <div>• Sleep Target: 7.5 - 9.0 Hours/night</div>
                  <div>• Light Walking / Mobility only</div>
                  <div>• Hydration focus</div>
                </div>
              </div>

            </div>
          </div>

          {/* Sample Weekly Microcycle Schedule */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-4">
            <h4 className="font-extrabold text-stone-900 text-sm">Sample 7-Day Microcycle Schedule:</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 text-center text-xs">
              {[
                { day: 'Mon', main: 'Hypertrophy A', sub: 'Upper Body' },
                { day: 'Tue', main: 'Zone 2 Run', sub: '45m FATmax' },
                { day: 'Wed', main: 'Hypertrophy B', sub: 'Lower Body' },
                { day: 'Thu', main: 'Zone 2 Run', sub: '45m FATmax' },
                { day: 'Fri', main: 'Hypertrophy C', sub: 'Push/Pull' },
                { day: 'Sat', main: 'Zone 2 Run', sub: '45m FATmax' },
                { day: 'Sun', main: 'Full Rest', sub: 'CNS Recovery' },
              ].map((d, i) => (
                <div key={i} className="bg-stone-50 p-3 rounded-2xl border border-stone-200 space-y-1">
                  <div className="font-bold text-stone-900">{d.day}</div>
                  <div className="font-extrabold text-emerald-800 text-[11px]">{d.main}</div>
                  <div className="text-[10px] text-stone-500">{d.sub}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ==================== TAB 3: 12-WEEK PROGRESSION TIMELINE ==================== */}
      {activeTab === 'timeline' && (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-6 animate-fade-in">
          <h3 className="font-extrabold text-stone-900 text-base flex items-center gap-2 border-b border-stone-100 pb-3">
            <Clock className="w-4 h-4 text-emerald-700" />
            <span>12-Week Phase Progression & Milestones</span>
          </h3>

          <div className="space-y-4">
            
            {/* Phase 1 */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-300">
                  Weeks 1 – 4: Foundational Priming & Neuromuscular Adaptations
                </span>
                <span className="text-stone-500 font-mono">Target Gain: +0.4 - 0.5 kg</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Initial glycogen filling, capillary dilation, and motor unit recruitment. Scale weight shifts slightly by ~0.5 kg (or stays flat for Recomp). Neuromuscular efficiency increases rapidly.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300">
                  Weeks 5 – 8: Peak Hypertrophy & FATmax Optimization
                </span>
                <span className="text-stone-500 font-mono">Target Gain: +0.5 kg</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Muscle Protein Synthesis (MPS) operates at peak fractional rate. Zone 2 sessions upregulate MCT-1 transporters and CPT-1 enzymes. Waist measurements remain tight while chest/legs expand.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-indigo-800 bg-indigo-100 px-2.5 py-1 rounded-lg border border-indigo-300">
                  Weeks 9 – 12: Tissue Consolidation & Volumetric Shift
                </span>
                <span className="text-stone-500 font-mono">Target Gain: +0.5 kg (Total: +1.5 kg)</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Cumulative 1.0 kg wet muscle tissue consolidated. The 18% tissue density volume shift is fully realized. Resting Metabolic Rate (RMR) increases by ~13 kcal/day permanently.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* ==================== TAB 4: DAILY BEHAVIORAL CHECKLIST ==================== */}
      {activeTab === 'checklist' && (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Daily Behavioral Habit Tracker</span>
              </h3>
              <p className="text-xs text-stone-500">
                Check off your daily core behaviors to guarantee 12-week success
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              {Object.values(checkedHabits).filter(Boolean).length} / {Object.keys(checkedHabits).length} Completed Today
            </span>
          </div>

          <div className="space-y-3">
            {[
              { key: 'protein', title: `Hit ${proteinTargetG}g Protein Target`, desc: `Distributed across 3-4 meals (~${proteinPerMealG}g per meal)` },
              { key: 'surplus', title: goalMode === 'lean_bulk' ? 'Maintain +200 kcal Surplus' : 'Hit Exact Maintenance Intake', desc: 'No dirty overeating; clean nutrient-dense foods' },
              { key: 'zone2', title: 'Complete Zone 2 Session or Active Recovery', desc: '45 mins at 112-118 BPM conversational pace' },
              { key: 'lifting', title: 'Execute Resistance Training with Progressive Overload', desc: 'Log weights & reps; 1-3 Reps in Reserve' },
              { key: 'water', title: 'Drink 3.5 - 4.0 Liters Water + Electrolytes', desc: '500mg Sodium intake around Zone 2' },
              { key: 'sleep', title: 'Sleep 7.5 to 9.0 Hours', desc: 'Essential for growth hormone release & MPS recovery' },
            ].map((habit) => (
              <div 
                key={habit.key}
                onClick={() => toggleHabit(habit.key)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                  checkedHabits[habit.key]
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-xs flex items-center gap-2">
                    <span>{habit.title}</span>
                  </div>
                  <div className="text-[11px] text-stone-500">{habit.desc}</div>
                </div>

                <div className={`w-6 h-6 rounded-xl flex items-center justify-center transition border ${
                  checkedHabits[habit.key]
                    ? 'bg-emerald-600 text-white border-emerald-700'
                    : 'bg-white border-stone-300'
                }`}>
                  {checkedHabits[habit.key] && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary Box */}
      <div className="bg-stone-900 text-stone-100 p-6 sm:p-8 rounded-3xl space-y-3 border border-stone-800 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <BookOpen className="w-4 h-4" />
          <span>The Bottom Line for Your 12-Week Journey</span>
        </div>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
          Building 1 kg of muscle tissue is a precise metabolic process. By pairing <strong>2.0 g/kg protein intake</strong>, a controlled <strong>+200 kcal surplus (or maintenance for Recomp)</strong>, <strong>progressive lifting</strong>, and <strong>3x weekly Zone 2 cardio</strong>, you ensure that every calorie consumed goes toward pure muscle accretion while keeping your body fat minimal.
        </p>
      </div>
    </article>
  );
}
