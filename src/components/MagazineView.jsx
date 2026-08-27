import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, Flame, Activity, Zap, Droplet, Clock, 
  ChevronRight, ChevronLeft, Bookmark, Share2, Award, ArrowUpRight, 
  ShieldCheck, Heart, Layers, BarChart2, CheckCircle2, UserCheck, Printer, Smile, HelpCircle, Lightbulb, BatteryCharging, Cpu
} from 'lucide-react';
import { ZONES, CHARACTERS } from '../data/metabolismData';
import FuelCharts from './FuelCharts';
import RunnerSimulation from './RunnerSimulation';
import AdaptationSimulator from './AdaptationSimulator';
import LiveCellVisualizer from './LiveCellVisualizer';
import Zone2VsOtherSports from './Zone2VsOtherSports';
import AthleteProfile from './AthleteProfile';
import StravaRunVisualizer from './StravaRunVisualizer';
import RecoveryMastery from './RecoveryMastery';
import AerobicExpectations from './AerobicExpectations';
import Zone2NutritionBP from './Zone2NutritionBP';
import HeatHumidityGuide from './HeatHumidityGuide';
import BodyMitochondriaSimulator from './BodyMitochondriaSimulator';
import RunImprovementsTable from './RunImprovementsTable';
import MitochondrialReproduction from './MitochondrialReproduction';
import LactateMasterclass from './LactateMasterclass';
import RunnerLicense from './RunnerLicense';
import HowFatIsCreated from './HowFatIsCreated';
import MolecularAssemblyLine from './MolecularAssemblyLine';
import CellularCosmos from './CellularCosmos';
import TenKTracker from './TenKTracker';
import AntiAgingMasterclass from './AntiAgingMasterclass';
import BioenergeticsCalculator from './BioenergeticsCalculator';
import ForewordMission from './ForewordMission';
import LongevityIndexSystem from './LongevityIndexSystem';
import ScientificAccreditation from './ScientificAccreditation';
import WingateLabPrep from './WingateLabPrep';
import { PAGES_LIST } from './Sidebar';

export default function MagazineView({ currentZoneId, setCurrentZoneId, activeArticle, setActiveArticle }) {
  const [internalPage, setInternalPage] = useState(1);
  const activePage = (activeArticle && typeof activeArticle === 'number') ? activeArticle : internalPage;
  const totalPages = PAGES_LIST.length;

  const zone2 = ZONES.find(z => z.id === 2) || ZONES[1];
  const currentZone = ZONES.find(z => z.id === currentZoneId) || zone2;

  const setPage = (page) => {
    setInternalPage(page);
    if (setActiveArticle) setActiveArticle(page);
  };

  const nextPage = () => setPage(Math.min(activePage + 1, totalPages));
  const prevPage = () => setPage(Math.max(activePage - 1, 1));

  return (
    <div className="space-y-6 animate-fade-in text-stone-900 font-sans">

      {/* MAGAZINE PAGE SHEET CONTAINER */}
      <main className="magazine-page p-6 sm:p-10 lg:p-12 space-y-8 relative">
        
        {/* Page Top Header Bar */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 text-xs text-stone-500 font-sans">
          <div className="flex items-center gap-2 font-bold text-emerald-800">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>OPTIMUS MAGAZINE • PAGE {activePage} OF {totalPages}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-stone-500 font-medium">
            <span>The Friendly Guide to Zone 2 Bioenergetics</span>
            <span>•</span>
            <span>Bioenergetics Press</span>
          </div>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-extrabold transition text-xs border border-emerald-300 shadow-xs"
            title="Export PDF / Print Magazine Page"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-700" />
            <span>Export PDF / Print</span>
          </button>
        </div>

        {/* ==================== PAGE 1: EASY INTRO TO ZONE 2 & FATMAX ==================== */}
        {activePage === 1 && (
          <article className="space-y-8 animate-fade-in font-sans">
            
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider border border-emerald-200 inline-flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-emerald-700" />
                Page 1 • Easy Intro for Everyone
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-stone-900 leading-tight tracking-tight">
                What is Zone 2? (The Friendly Guide for Everyone)
              </h2>
              <p className="text-stone-600 text-sm lg:text-base font-normal">
                Understanding your body's fat-burning sweet spot in simple, everyday language—no science background needed!
              </p>
            </div>

            {/* Simple Friendly Explanations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-stone-800 text-sm lg:text-base leading-relaxed">
              
              {/* Card 1: What is Zone 2 in simple terms? */}
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
                  <Lightbulb className="w-5 h-5 text-emerald-700" />
                  What is "Zone 2" in plain words?
                </div>
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-normal">
                  Imagine your body has 5 exercise gears. Gear 1 is resting on the couch. Gear 5 is an all-out sprint where your lungs are burning.
                </p>
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-normal">
                  <strong>Zone 2 is Gear 2</strong>—a comfortable, steady pace (like a light jog, brisk walk uphill, or easy bike ride). You can comfortably hold a full conversation without gasping for air!
                </p>
              </div>

              {/* Card 2: What is FATmax & Why is it needed? */}
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-950 font-bold text-base">
                  <Flame className="w-5 h-5 text-emerald-700" />
                  What is "FATmax" and why is it needed?
                </div>
                <p className="text-stone-800 text-xs sm:text-sm leading-relaxed font-normal">
                  <strong>FATmax means "Fat Maximum."</strong> It is the exact exercise speed where your body burns the highest amount of fat per minute.
                </p>
                <p className="text-stone-800 text-xs sm:text-sm leading-relaxed font-normal">
                  <strong>Why is it needed?</strong> Your body has two main fuel tanks: <em>Sugar (Carbs)</em> and <em>Fat</em>. Sugar runs out fast (making you tired and hungry). Fat is a huge, steady energy reservoir. In Zone 2, your body unlocks your fat tank for clean, lasting energy!
                </p>
              </div>

            </div>

            {/* Dedicated Explanation Card: What are Mitochondria? */}
            <div className="p-6 rounded-2xl bg-teal-50 border border-teal-200 space-y-3 font-sans">
              <div className="flex items-center gap-2 text-teal-950 font-extrabold text-base">
                <Cpu className="w-5 h-5 text-teal-700" />
                <span>What are "Mitochondria"? (Pronounced: my-toe-KON-dree-uh)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-stone-800 leading-relaxed font-normal">
                <div className="p-3.5 rounded-xl bg-white/80 border border-teal-200 space-y-1">
                  <div className="font-extrabold text-teal-950 text-xs uppercase">🔋 1. Tiny Battery Factories</div>
                  <p className="text-xs text-stone-700">
                    Mitochondria are tiny microscopic "power plants" inside almost every cell in your body (especially in your muscle cells).
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/80 border border-teal-200 space-y-1">
                  <div className="font-extrabold text-teal-950 text-xs uppercase">⚡ 2. Turn Fat & Oxygen into Energy</div>
                  <p className="text-xs text-stone-700">
                    They take the <strong>Oxygen</strong> you breathe and the <strong>Fat</strong> stored in your body, burning them cleanly into pure cellular energy called <strong>ATP</strong>.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/80 border border-teal-200 space-y-1">
                  <div className="font-extrabold text-teal-950 text-xs uppercase">🛠️ 3. Zone 2 Builds More of Them</div>
                  <p className="text-xs text-stone-700">
                    Zone 2 exercise forces your body to build <strong>more & bigger mitochondria</strong>, giving you higher daily stamina and protecting against fatigue as you age!
                  </p>
                </div>
              </div>
            </div>

            {/* Dedicated Explanation Card: What is Lactate? */}
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 space-y-3 font-sans">
              <div className="flex items-center gap-2 text-amber-950 font-extrabold text-base">
                <Activity className="w-5 h-5 text-amber-700" />
                <span>What is "Lactate"? (Pronounced: LAK-tate)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-stone-800 leading-relaxed font-normal">
                <div className="p-3.5 rounded-xl bg-white/80 border border-amber-200 space-y-1">
                  <div className="font-extrabold text-amber-950 text-xs uppercase">🪵 1. A High-Energy Fuel Log</div>
                  <p className="text-xs text-stone-700">
                    Lactate is a 3-carbon carbohydrate created when your muscles break down sugar (glucose). It is <strong>NOT waste</strong>—it contains 95% of the sugar's original energy!
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/80 border border-amber-200 space-y-1">
                  <div className="font-extrabold text-teal-950 text-xs uppercase">🫀 2. Superfuel for Heart & Brain</div>
                  <p className="text-xs text-stone-700">
                    Your heart and brain <strong>prefer lactate over sugar</strong> during exercise! It is shuttled through your blood to fuel your vital organs.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/80 border border-amber-200 space-y-1">
                  <div className="font-extrabold text-emerald-950 text-xs uppercase">⚖️ 3. Zone 2 Keeps it Balanced</div>
                  <p className="text-xs text-stone-700">
                    In Zone 2, your slow-twitch mitochondria clear lactate as fast as it is produced (~1.5 mmol/L), preventing muscle burning!
                  </p>
                </div>
              </div>
            </div>

            {/* Fuel Energy Comparison Card: Fat (9 kcal/g) vs Carbs (4 kcal/g) */}
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-3 font-sans">
              <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-base">
                <Zap className="w-5 h-5 text-emerald-700" />
                <span>Fuel Comparison: Why Burning Fat (9 kcal/g) beats Carbohydrates (4 kcal/g)</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-800 leading-relaxed font-normal">
                
                <div className="p-4 rounded-xl bg-white/90 border border-emerald-200 space-y-2">
                  <div className="flex items-center justify-between text-sm font-extrabold text-emerald-950 border-b border-emerald-100 pb-1.5">
                    <span>🔥 Fat Fuel (The Premium Tank)</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black">9 kcal / gram</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    <li>• <strong>More Than Double Energy Density:</strong> Fat yields <strong>9 calories per gram</strong> (vs. 4 cal/g for carbs)—giving your muscles 2.25x more energy per gram!</li>
                    <li>• <strong>Quick Oxygen-Powered Oxidation:</strong> For burning fat, your body needs a steady, abundant supply of <strong>Oxygen (O₂)</strong>. In Zone 2, your breathing is easy, supplying all the O₂ needed to break down fat cleanly!</li>
                    <li>• <strong>Endless Supply:</strong> Stores ~40,000+ calories of energy across your body (never runs out during exercise).</li>
                    <li>• <strong>Clean & Steady:</strong> Burns smoothly without blood sugar crashes, brain fog, or sudden hunger pangs.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/90 border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between text-sm font-extrabold text-amber-950 border-b border-amber-100 pb-1.5">
                    <span>⚡ Carbohydrate Fuel (The Quick Tank)</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black">4 kcal / gram</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    <li>• <strong>Lower Energy Density:</strong> Carbs yield only <strong>4 calories per gram</strong>.</li>
                    <li>• <strong>Longer Complex Process at High Intensity:</strong> Carbohydrate breakdown under high intensity (when oxygen supply can't keep up) involves a longer multi-step pathway (glycolysis) that accumulates excess lactate & acidity!</li>
                    <li>• <strong>Tiny Tank (~2,000 kcal):</strong> Stored as glycogen in liver & muscles; empties after just 60–90 minutes of hard exercise.</li>
                    <li>• <strong>Causes "Bonking":</strong> When carb stores run out in high-intensity exercise, your body experiences sudden exhaustion.</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Insulin Connection Card: How Insulin Controls Fat Burning */}
            <div className="p-6 rounded-2xl bg-teal-50 border border-teal-300 space-y-3 font-sans">
              <div className="flex items-center gap-2 text-teal-950 font-extrabold text-base">
                <ShieldCheck className="w-5 h-5 text-teal-700" />
                <span>The Insulin Connection: How Insulin & Zone 2 Unlock Fat Burning</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-800 leading-relaxed font-normal">
                
                <div className="p-4 rounded-xl bg-white/90 border border-rose-200 space-y-2">
                  <div className="font-extrabold text-rose-950 text-sm flex items-center gap-1.5">
                    🔒 High Insulin = "Fat Doors Locked"
                  </div>
                  <p className="text-xs text-stone-700">
                    Insulin is the body's primary energy storage hormone. When insulin levels are high (e.g. after a high-sugar meal), insulin <strong>shuts the gate enzyme (CPT-1)</strong> that moves fat into mitochondria. High insulin locks fat inside your fat cells and forces your body to burn carbs instead.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/90 border border-emerald-200 space-y-2">
                  <div className="font-extrabold text-emerald-950 text-sm flex items-center gap-1.5">
                    🔑 Zone 2 Lowers Insulin = "Fat Doors Unlocked!"
                  </div>
                  <p className="text-xs text-stone-700">
                    Zone 2 exercise dramatically improves <strong>Insulin Sensitivity</strong>. It lowers circulating insulin, unlocking CPT-1 so free fatty acids flood into your mitochondria to be burned at maximum speed (FATmax). Regular Zone 2 also protects against Type 2 Diabetes and insulin resistance!
                  </p>
                </div>

              </div>
            </div>

            {/* Keto Diet vs Zone 2 Card */}
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 space-y-3 font-sans">
              <div className="flex items-center gap-2 text-amber-950 font-extrabold text-base">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <span>Keto Diet vs. Zone 2 Exercise: Dietary Input vs. Cellular Engine Upgrade</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-800 leading-relaxed font-normal">
                
                <div className="p-4 rounded-xl bg-white/90 border border-amber-200 space-y-2">
                  <div className="font-extrabold text-amber-950 text-sm flex items-center gap-1.5">
                    🥑 Keto Diet (Dietary Fuel Supply)
                  </div>
                  <p className="text-xs text-stone-700">
                    Cutting carbs (&lt;50g/day) forces your liver to make ketone bodies. This shifts resting metabolism toward fat, <strong>BUT it doesn't build new cell machinery on its own</strong>. If your cells lack mitochondria, fat burning remains capped.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/90 border border-emerald-200 space-y-2">
                  <div className="font-extrabold text-emerald-950 text-sm flex items-center gap-1.5">
                    🏃 Zone 2 Exercise (Cellular Engine Upgrade)
                  </div>
                  <p className="text-xs text-stone-700">
                    Zone 2 forces your cells to build <strong>more & bigger mitochondria</strong> (PGC-1α biogenesis), doubling your capacity to burn fat. <em>Key Benefit:</em> You get 100% of Zone 2's fat-burning and longevity benefits on <strong>any balanced diet</strong>—no strict Keto required!
                  </p>
                </div>

              </div>
            </div>

            {/* Myth-Buster Card: You Can't Target Fat Location */}
            <div className="p-6 rounded-2xl bg-cyan-50 border border-cyan-200 space-y-3 font-sans">
              <div className="flex items-center gap-2 text-cyan-950 font-extrabold text-base">
                <Sparkles className="w-5 h-5 text-cyan-700" />
                <span>Important Myth-Buster: Can You Choose WHICH Body Fat Gets Burned?</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-800 leading-relaxed font-normal">
                <div className="p-4 rounded-xl bg-white/80 border border-cyan-200 space-y-1.5">
                  <div className="font-extrabold text-cyan-950 text-sm">❌ Myth: "Spot-Reducing" Fat</div>
                  <p className="text-xs text-stone-700">
                    You <strong>cannot choose or determine</strong> during exercise which specific body part (e.g. belly, legs, or arms) supplies the fat. "Spot reduction" is a myth!
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/80 border border-cyan-200 space-y-1.5">
                  <div className="font-extrabold text-emerald-950 text-sm">✅ Science: Whole-Body Fat Mobilization</div>
                  <p className="text-xs text-stone-700">
                    Zone 2 releases hormones that signal fat cells <strong>all over your entire body</strong> to release fat into your bloodstream. Your blood carries these fat molecules from everywhere into your mitochondria to burn energy!
                  </p>
                </div>
              </div>
            </div>

            {/* Fun FAQ Callout Card: Zone 1 Couch vs Zone 2 FATmax */}
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 space-y-3 font-sans">
              <div className="flex items-center gap-2 text-amber-950 font-extrabold text-base">
                <HelpCircle className="w-5 h-5 text-amber-700" />
                <span>Btw... Why should I be in Zone 2 if I can just sit in Zone 1 on the couch?</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-800 leading-relaxed font-normal">
                <div className="space-y-2 p-4 rounded-xl bg-white/70 border border-amber-200">
                  <div className="font-extrabold text-amber-950 text-sm flex items-center gap-1.5">
                    🛋️ Zone 1 (Resting on the Couch)
                  </div>
                  <p className="text-xs text-stone-700">
                    It's true that resting burns 85% fat, BUT because your engine is idling, total energy output is tiny. You burn only about <strong>0.1 grams of fat per minute</strong> (~6g/hour).
                  </p>
                  <p className="text-xs text-amber-900 font-medium">
                    ⚡ <em>Catch:</em> Resting sends <strong>zero signal</strong> to your cells to build new mitochondria. Your cellular engine stays at baseline.
                  </p>
                </div>

                <div className="space-y-2 p-4 rounded-xl bg-emerald-100/70 border border-emerald-300">
                  <div className="font-extrabold text-emerald-950 text-sm flex items-center gap-1.5">
                    🔥 Zone 2 (FATmax Exercise)
                  </div>
                  <p className="text-xs text-stone-800">
                    Your engine runs 6 times faster while remaining 100% aerobic! You burn up to <strong>0.65 grams of fat per minute</strong> (~39g/hour)—over <strong>6x more total fat per minute!</strong>
                  </p>
                  <p className="text-xs text-emerald-950 font-bold">
                    🚀 <em>The Big Prize:</em> Triggers PGC-1α to build <strong>more & bigger mitochondria</strong>, raising your baseline metabolism so you burn more fat even when sitting!
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: The 3 Easy Tests */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-700" />
                How to Know You're in Zone 2 (The 3 Simple Tests)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <span>🗣️ 1. The Talk Test</span>
                  </div>
                  <p className="text-stone-600 text-xs leading-relaxed font-normal">
                    You can easily talk in complete sentences (e.g. talking on the phone or to a friend). If you get out of breath after 2 words, slow down!
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <span>👃 2. Nose Breathing</span>
                  </div>
                  <p className="text-stone-600 text-xs leading-relaxed font-normal">
                    You can comfortably breathe through your nose without opening your mouth to gasp for air.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <span>⚡ 3. Zero Leg Burn</span>
                  </div>
                  <p className="text-stone-600 text-xs leading-relaxed font-normal">
                    Your legs feel light and fresh. There is no heavy, burning sensation because your cells clear waste as fast as it's produced.
                  </p>
                </div>

              </div>
            </div>

            {/* Section 4: Top 4 Benefits */}
            <div className="p-6 rounded-2xl bg-emerald-900 text-white space-y-4 shadow-sm">
              <h3 className="text-lg font-bold text-emerald-200 flex items-center gap-2">
                <BatteryCharging className="w-5 h-5 text-emerald-300" />
                Why Zone 2 is Great for Every Type of Individual
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="space-y-1">
                  <div className="font-bold text-white text-sm">🔋 All-Day Energy</div>
                  <p className="text-emerald-100 text-xs leading-relaxed font-normal">
                    Builds bigger, stronger cell powerhouses (mitochondria) so you feel less tired throughout the day.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white text-sm">🔥 Maximum Fat Oxidation</div>
                  <p className="text-emerald-100 text-xs leading-relaxed font-normal">
                    Teaches your body to burn fat efficiently, even while resting, sitting at work, or walking.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white text-sm">❤️ Strong Heart & Longevity</div>
                  <p className="text-emerald-100 text-xs leading-relaxed font-normal">
                    Keeps your blood vessels flexible, lowers resting heart rate, and supports lifelong health.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white text-sm">😊 Zero Burnout or Exhaustion</div>
                  <p className="text-emerald-100 text-xs leading-relaxed font-normal">
                    You finish your workout feeling energized and refreshed, not wiped out for the rest of the day!
                  </p>
                </div>
              </div>
            </div>

            {/* Page 1 Bottom CTA Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setPage(2)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-sm"
              >
                <span>Continue to Page 2: FATmax Science</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </article>
        )}

        {/* ==================== PAGE 2: COVER STORY ==================== */}
        {activePage === 2 && (
          <article className="space-y-8 animate-fade-in font-sans">
            
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider border border-emerald-200">
                Page 2 • Cover Story
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-stone-900 leading-tight tracking-tight">
                The Science of FATmax: Why Zone 2 is the Ultimate Metabolic Engine
              </h2>
              <p className="text-stone-600 text-sm font-normal">
                By Bioenergetics Science Group • 8 Min Read
              </p>
            </div>

            {/* Simple Clean Article Body */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-stone-800 text-sm lg:text-base leading-relaxed font-normal">
              <div className="space-y-4">
                <p>
                  When exercise intensity is maintained at roughly 60% to 70% of maximal heart rate, human skeletal muscle experiences a sweet spot in substrate utilization known as <strong>FATmax</strong>. At this exact metabolic state, fatty acid oxidation peaks in absolute rate (grams per minute).
                </p>
                <p>
                  Unlike carbohydrates, which are stored in limited quantities (~400-500g of glycogen in liver and muscle), fat stores are virtually infinite—even in lean endurance athletes. In Zone 2, Free Fatty Acids (FFAs) cross the mitochondrial double membrane through the <strong>CPT-1 (Carnitine Palmitoyltransferase I)</strong> gatekeeper.
                </p>
                <div className="p-4 rounded-2xl bg-emerald-50 border-l-4 border-emerald-600 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">Key Bioenergetic Insight</span>
                  <p className="text-xs text-emerald-950 font-medium">
                    High blood glucose and elevated insulin suppress CPT-1 activity. Zone 2 training under moderate insulin conditions optimizes fat oxidation pathways.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p>
                  Inside the mitochondrial matrix, fatty acids undergo <strong>Beta-Oxidation</strong>, a spiral pathway that continuously shears off 2-carbon units to produce <em>Acetyl-CoA</em>. This Acetyl-CoA directly feeds the <strong>Krebs (Citric Acid) Cycle</strong> without overloading pyruvate dehydrogenase or generating hydrogen ion accumulation.
                </p>
                <p>
                  Because Oxygen (O₂) is available in abundant supply during Zone 2, the Electron Transport Chain operates at peak efficiency. Every single palmitate molecule (16-carbon fatty acid) yields approximately <strong>106 to 120 ATP energy molecules</strong>, alongside clean metabolic water (H₂O) and carbon dioxide (CO₂).
                </p>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-900 border-b border-stone-200 pb-2">
                    <span>Substrate Energy Comparison</span>
                    <span className="text-emerald-700 font-semibold">Zone 2 Peak</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-stone-700">
                    <div className="flex justify-between"><span>Fat Oxidation Yield:</span><strong className="text-emerald-800">~106-120 ATP / molecule</strong></div>
                    <div className="flex justify-between"><span>Glucose Oxidation Yield:</span><strong className="text-amber-800">~32-34 ATP / molecule</strong></div>
                    <div className="flex justify-between"><span>Anaerobic Glycolysis:</span><strong className="text-rose-700">2 ATP / molecule + Lactate + H⁺</strong></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Light Fuel Chart */}
            <div className="pt-6 border-t border-stone-200 space-y-4">
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-emerald-700" />
                Interactive Fuel Dynamics Chart
              </h3>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <FuelCharts currentZoneId={currentZoneId} />
              </div>
            </div>

          </article>
        )}

        {/* ==================== PAGE 3: CELLULAR ENGINE ==================== */}
        {activePage === 3 && (
          <article className="space-y-8 animate-fade-in font-sans">
            
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-teal-100 text-teal-900 font-bold text-xs uppercase tracking-wider border border-teal-200">
                Page 3 • Cellular Powerhouse
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-stone-900 leading-tight tracking-tight">
                Building the Cellular Engine: PGC-1α & Angiogenesis
              </h2>
              <p className="text-stone-600 text-sm font-normal">
                How Zone 2 stimulates mitochondrial biogenesis and expands capillary networks.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 space-y-4 text-stone-800 text-sm lg:text-base leading-relaxed font-normal">
                <p>
                  Chronic adaptation to Zone 2 training is governed by the cellular master regulator <strong>PGC-1α (Peroxisome proliferator-activated receptor gamma coactivator 1-alpha)</strong>. When slow-twitch (Type I) muscle fibers sustain moderate contraction for extended durations, intracellular calcium fluxes and AMPK activation trigger PGC-1α transcription.
                </p>
                <p>
                  This signal instructs muscle cells to undergo <strong>Mitochondrial Biogenesis</strong>—building new mitochondria and expanding existing networks. Concurrently, Zone 2 stimulates <strong>Angiogenesis</strong>, increasing capillary density around muscle fibers to deliver oxygen and fatty acids directly to mitochondrial doorsteps.
                </p>

                {/* Character Cards Grid */}
                <div className="pt-4 space-y-3">
                  <h3 className="text-base font-bold text-stone-900">Key Metabolic Characters in Zone 2</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CHARACTERS.map((char) => (
                      <div key={char.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 hover:border-emerald-600 transition">
                        <div className="flex items-center gap-2.5">
                          <span className="text-3xl">{char.avatar}</span>
                          <div>
                            <div className="text-xs font-bold text-stone-900">{char.name}</div>
                            <div className="text-[10px] text-emerald-700 font-semibold">{char.role}</div>
                          </div>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed font-normal">{char.zone2Behavior}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Magazine Callout */}
              <div className="bg-emerald-900 text-white p-6 rounded-3xl space-y-5 shadow-sm">
                <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  Mitochondrial Adaptations
                </h3>

                <ul className="space-y-4 text-xs text-emerald-100 font-normal">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                    <span><strong>Mitochondrial Density:</strong> Increases functional surface area for Beta-Oxidation and Electron Transport enzymes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                    <span><strong>Enzymatic Upregulation:</strong> Enhances Citrate Synthase and CPT-1 enzyme concentrations by up to 40%.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                    <span><strong>Capillarity:</strong> Increases capillary-to-fiber ratio, shortening O₂ diffusion distances.</span>
                  </li>
                </ul>

                <div className="p-4 rounded-2xl bg-white/10 text-xs text-emerald-100 border border-white/20 font-medium">
                  ⚡ <strong>Long-Term Longevity:</strong> Preserves mitochondrial health, mitigating metabolic dysfunction, insulin resistance, and age-related fatigue.
                </div>
              </div>

            </div>

            {/* Embedded Adaptation Simulator */}
            <div className="pt-6 border-t border-stone-200">
              <AdaptationSimulator />
            </div>

          </article>
        )}

        {/* ==================== PAGE 4: LIVE CELL VISUALIZER ==================== */}
        {activePage === 4 && (
          <article className="space-y-8 animate-fade-in font-sans">
            <LiveCellVisualizer />
          </article>
        )}

        {/* ==================== PAGE 5: ZONE 2 VS OTHER SPORTS ==================== */}
        {activePage === 5 && (
          <article className="space-y-8 animate-fade-in font-sans">
            <Zone2VsOtherSports />
          </article>
        )}

        {/* ==================== PAGE 6: LACTATE MASTERCLASS ==================== */}
        {activePage === 6 && (
          <LactateMasterclass />
        )}

        {/* ==================== PAGE 7: 1-HOUR RUNNER FIELD STUDY ==================== */}
        {activePage === 7 && (
          <article className="space-y-8 animate-fade-in font-sans">
            
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-cyan-100 text-cyan-900 font-bold text-xs uppercase tracking-wider border border-cyan-200">
                Page 7 • Field Experiment
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-stone-900 leading-tight tracking-tight">
                The 1-Hour Zone 2 Runner: Real-Time Field Simulation
              </h2>
              <p className="text-stone-600 text-sm font-normal">
                Track how heart rate, fat burn, glycogen depletion, and lactate evolve over a 60-minute session.
              </p>
            </div>

            {/* Embedded Live Runner Simulator */}
            <div className="pt-2">
              <RunnerSimulation />
            </div>

          </article>
        )}

        {/* ==================== PAGE 8: LONGEVITY PROTOCOLS ==================== */}
        {activePage === 8 && (
          <article className="space-y-8 animate-fade-in font-sans">
            
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider border border-emerald-200">
                Page 8 • Longevity Masterclass
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-stone-900 leading-tight tracking-tight">
                Mastering the Conversational Pace: Practical Guidelines
              </h2>
              <p className="text-stone-600 text-sm font-normal">
                How to integrate Zone 2 training into your weekly routine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900">The Talk Test</h3>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  You should be able to speak in full, complete sentences without gasping for air. If you can only utter a few words at a time, you have drifted into Zone 3 or 4.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900">Weekly Volume</h3>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  Aim for 3 to 4 sessions of 45–90 minutes per week (totaling 3 to 5 hours). Consistency is key to driving PGC-1α mitochondrial biogenesis signals.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-800">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900">Heart Rate Formula</h3>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  Typically 60–70% of Maximum Heart Rate (HRmax) or calculated via Maffetone formula: <em>180 minus your age</em> (adjusted for fitness level).
                </p>
              </div>

            </div>

            {/* Protocol Summary Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white space-y-2 shadow-sm">
              <h3 className="text-lg font-bold">
                The 80/20 Endurance Paradigm
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
                Modern exercise physiology recommends structuring your total training volume into <strong>80% low-intensity Zone 2 aerobic base</strong> and <strong>20% high-intensity interval training (Zone 5)</strong>. This avoids chronic fatigue while building peak metabolic resilience.
              </p>
            </div>

            {/* HR Dogma vs. Biological Spectrum Masterclass Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/90 border border-amber-300 space-y-4 shadow-sm font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/80 pb-3">
                <div className="flex items-center gap-2.5 text-amber-950 font-extrabold text-lg">
                  <ShieldCheck className="w-6 h-6 text-amber-700 shrink-0" />
                  <span>HR Dogma vs. Biological Reality: Why 146 BPM Isn't a Cliff</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-200/80 text-amber-950 font-black text-xs border border-amber-300 shrink-0">
                  💡 Modern Coaching Perspective
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-800 leading-relaxed font-normal">
                <p className="italic text-stone-700 bg-white/80 p-3.5 rounded-2xl border border-amber-200 font-medium">
                  "Watch says 143 bpm? Perfect. Watch says 146? Apparently the workout is ruined. Runners spend the easy run panicking over a few beats instead of asking: <strong>Does this actually feel easy?</strong>"
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-amber-200 space-y-1.5">
                    <div className="font-extrabold text-amber-950 text-xs uppercase flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" /> 1. Bioenergetics is a Spectrum
                    </div>
                    <p className="text-xs text-stone-700">
                      Your mitochondria don't instantly stop burning fat or clearing lactate at 146 BPM. Substrate utilization shifts gradually along a continuum, not a digital cliff edge.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-amber-200 space-y-1.5">
                    <div className="font-extrabold text-amber-950 text-xs uppercase flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-600" /> 2. Confounding Variables
                    </div>
                    <p className="text-xs text-stone-700">
                      Heat, humidity, dehydration, caffeine, and slight hill inclines cause <strong>Cardiac Drift</strong> (+5–10 BPM) without changing your underlying muscular recruitment.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-amber-200 space-y-1.5">
                    <div className="font-extrabold text-emerald-950 text-xs uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 3. Dual-Anchor Protocol
                    </div>
                    <p className="text-xs text-stone-700">
                      Use <strong>RPE (2-3/10) & The Talk Test</strong> as your primary internal compass, and Heart Rate telemetry as a secondary trend guide. Don't let the watch override your body!
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </article>
        )}

        {/* ==================== PAGE 9: ATHLETE PROFILE (ISHAI) ==================== */}
        {activePage === 9 && (
          <AthleteProfile />
        )}

        {/* ==================== PAGE 10: APPLE WATCH & STRAVA RUNS ==================== */}
        {activePage === 10 && (
          <StravaRunVisualizer />
        )}

        {/* ==================== PAGE 11: MASTER ZONE 2 & RECOVERY ==================== */}
        {activePage === 11 && (
          <RecoveryMastery />
        )}

        {/* ==================== PAGE 12: AEROBIC EXPECTATIONS & EXPANSION ==================== */}
        {activePage === 12 && (
          <AerobicExpectations />
        )}

        {/* ==================== PAGE 13: ZONE 2 NUTRITION & BLOOD PRESSURE ==================== */}
        {activePage === 13 && (
          <Zone2NutritionBP />
        )}

        {/* ==================== PAGE 14: RUNNING IN HEAT & HUMIDITY ==================== */}
        {activePage === 14 && (
          <HeatHumidityGuide />
        )}

        {/* ==================== PAGE 15: WHOLE-BODY MITOCHONDRIAL DISTRIBUTION ==================== */}
        {activePage === 15 && (
          <BodyMitochondriaSimulator />
        )}

        {/* ==================== PAGE 16: RUN PROGRESS & IMPROVEMENTS TABLE ==================== */}
        {activePage === 16 && (
          <RunImprovementsTable />
        )}

        {/* ==================== PAGE 17: MITOCHONDRIAL BACTERIAL REPRODUCTION ==================== */}
        {activePage === 17 && (
          <MitochondrialReproduction />
        )}

        {/* ==================== PAGE 18: THE OFFICIAL RUNNER'S LICENSE ==================== */}
        {activePage === 18 && (
          <RunnerLicense />
        )}

        {/* ==================== PAGE 19: HOW THE HUMAN BODY CREATES FAT ==================== */}
        {activePage === 19 && (
          <HowFatIsCreated />
        )}

        {/* ==================== PAGE 20: MOLECULAR ASSEMBLY LINE ==================== */}
        {activePage === 20 && (
          <MolecularAssemblyLine />
        )}

        {/* ==================== PAGE 21: THE CELLULAR COSMOS ==================== */}
        {activePage === 21 && (
          <CellularCosmos />
        )}

        {/* ==================== PAGE 22: WISE 10K TRAINING & RUN TRACKER ==================== */}
        {activePage === 22 && (
          <TenKTracker />
        )}

        {/* ==================== PAGE 23: ANTI-AGING & CELLULAR LONGEVITY ==================== */}
        {activePage === 23 && (
          <AntiAgingMasterclass />
        )}

        {/* ==================== PAGE 24: APPLE WATCH BIOENERGETICS CALCULATOR ==================== */}
        {activePage === 24 && (
          <BioenergeticsCalculator />
        )}

        {/* ==================== PAGE 25: EDITOR'S FOREWORD & MISSION STATEMENT ==================== */}
        {activePage === 25 && (
          <ForewordMission setPage={setPage} />
        )}

        {/* ==================== PAGE 26: OPTIMUS BIOENERGETIC & LONGEVITY INDEX ==================== */}
        {activePage === 26 && (
          <LongevityIndexSystem />
        )}

        {/* ==================== PAGE 27: SCIENTIFIC ADVISORY & ACCREDITATION ==================== */}
        {activePage === 27 && (
          <ScientificAccreditation />
        )}

        {/* ==================== PAGE 28: WINGATE LAB TEST PREP & DATA ENTRY ==================== */}
        {activePage === 28 && (
          <WingateLabPrep />
        )}

        {/* Page Footer Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-stone-200 font-sans">
          <button
            onClick={prevPage}
            disabled={activePage === 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-800 text-xs font-bold transition border border-stone-300"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Page</span>
          </button>

          <div className="text-xs font-semibold text-stone-600">
            Page <strong className="text-emerald-800 text-sm">{activePage}</strong> of <strong>{totalPages}</strong>
          </div>

          <button
            onClick={nextPage}
            disabled={activePage === totalPages}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white text-xs font-bold transition shadow-sm"
          >
            <span>Next Page</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </main>

    </div>
  );
}
