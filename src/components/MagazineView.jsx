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
import MuscleBioenergeticsCalculator from './MuscleBioenergeticsCalculator';
import HypertrophyBlueprint12W from './HypertrophyBlueprint12W';
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
        
        {/* Page Top Header Bar with Large Cover Feature Card */}
        <div className="flex flex-wrap items-center justify-between border-b border-stone-200 pb-5 gap-4 font-sans">
          <div className="flex items-center gap-4">
            <div className="w-20 h-26 sm:w-24 sm:h-32 rounded-2xl overflow-hidden border-2 border-emerald-600/60 shadow-lg shrink-0 bg-black group transition hover:scale-105">
              <img src="./optimus-logo.jpg" alt="Optimus Magazine Logo" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-[10px] uppercase tracking-wider border border-emerald-300">
                <span>📰 Official Issue Cover</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">OPTIMUS MAGAZINE</h1>
              <div className="text-xs text-emerald-800 font-bold font-mono">PAGE {activePage} OF {totalPages} • Zone 2 Bioenergetics Index</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col text-right text-xs text-stone-500 font-medium">
              <span>The Friendly Guide to Zone 2 Bioenergetics</span>
              <span className="text-[10px] text-emerald-800 font-bold">Bioenergetics Science Press</span>
            </div>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-extrabold transition text-xs border border-emerald-300 shadow-xs"
              title="Export PDF / Print Magazine Page"
            >
              <Printer className="w-4 h-4 text-emerald-700" />
              <span>Export PDF / Print</span>
            </button>
          </div>
        </div>

        {/* ==================== PAGE 1: EDITOR'S FOREWORD & MISSION ==================== */}
        {activePage === 1 && (
          <ForewordMission setPage={setPage} />
        )}

        {/* ==================== PAGE 2: ISHAI ATHLETE PROFILE ==================== */}
        {activePage === 2 && (
          <AthleteProfile />
        )}

        {/* ==================== PAGE 3: APPLE WATCH ULTRA TELEMETRY & RUNS ==================== */}
        {activePage === 3 && (
          <StravaRunVisualizer />
        )}

        {/* ==================== PAGE 4: WHAT IS ZONE 2? (EASY INTRO) ==================== */}
        {activePage === 4 && (
          <article className="space-y-8 animate-fade-in font-sans">
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider border border-emerald-200 inline-flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-emerald-700" />
                Page 4 • Easy Intro for Everyone
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

            {/* Ishai Personal Zone 2 Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md border border-slate-800">
              <div className="space-y-1">
                <div className="text-amber-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" /> Ishai's Wingate Lab Tested Range
                </div>
                <div className="text-lg font-black text-white">
                  Your Personal Zone 2 Target: <span className="text-emerald-400 font-mono">101 – 120 BPM</span>
                </div>
                <p className="text-xs text-slate-300">
                  Confirmed by the Wingate Institute Ribstein Sports Medicine Center (Sep 2026). Keep your Apple Watch between 101 and 120 BPM during base runs!
                </p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-black shrink-0">
                Ceiling: 120 BPM Max
              </div>
            </div>

            {/* Section: The 3 Easy Tests */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-700" />
                How to Know You're in Zone 2 (The 3 Simple Tests)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="font-bold text-stone-900 text-sm">🗣️ 1. The Talk Test</div>
                  <p className="text-stone-600 text-xs leading-relaxed font-normal">
                    You can easily talk in complete sentences (e.g. talking on the phone). If you get out of breath after 2 words, slow down!
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="font-bold text-stone-900 text-sm">👃 2. Nose Breathing</div>
                  <p className="text-stone-600 text-xs leading-relaxed font-normal">
                    You can comfortably breathe through your nose without opening your mouth to gasp for air.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="font-bold text-stone-900 text-sm">⚡ 3. Zero Leg Burn</div>
                  <p className="text-stone-600 text-xs leading-relaxed font-normal">
                    Your legs feel light and fresh with no heavy burning sensation.
                  </p>
                </div>
              </div>
            </div>

            {/* Page 4 Bottom CTA */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setPage(5)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-sm"
              >
                <span>Continue to Page 5: FATmax Science</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        )}

        {/* ==================== PAGE 5: FATMAX SCIENCE ==================== */}
        {activePage === 5 && (
          <article className="space-y-8 animate-fade-in font-sans">
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider border border-emerald-200">
                Page 5 • Cover Story
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-stone-900 leading-tight tracking-tight">
                The Science of FATmax: Why Zone 2 is the Ultimate Metabolic Engine
              </h2>
              <p className="text-stone-600 text-sm font-normal">
                By Bioenergetics Science Group • 8 Min Read
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-stone-800 text-sm lg:text-base leading-relaxed font-normal">
              <div className="space-y-4">
                <p>
                  When exercise intensity is maintained at roughly 60% to 70% of maximal heart rate, human skeletal muscle experiences a sweet spot in substrate utilization known as <strong>FATmax</strong>. At this exact metabolic state, fatty acid oxidation peaks in absolute rate (grams per minute).
                </p>
                <p>
                  Unlike carbohydrates, which are stored in limited quantities (~400-500g of glycogen), fat stores are virtually infinite. In Zone 2, Free Fatty Acids cross the mitochondrial membrane through the <strong>CPT-1</strong> gatekeeper.
                </p>
              </div>

              <div className="space-y-4">
                <p>
                  Inside the mitochondrial matrix, fatty acids undergo <strong>Beta-Oxidation</strong>, producing Acetyl-CoA to feed the Krebs Cycle. Every palmitate molecule yields approximately <strong>106 to 120 ATP energy molecules</strong>.
                </p>
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-900 border-b border-stone-200 pb-2">
                    <span>Substrate Energy Comparison</span>
                    <span className="text-emerald-700 font-semibold">Zone 2 Peak</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-stone-700">
                    <div className="flex justify-between"><span>Fat Oxidation Yield:</span><strong className="text-emerald-800">~106-120 ATP / molecule</strong></div>
                    <div className="flex justify-between"><span>Glucose Oxidation Yield:</span><strong className="text-amber-800">~32-34 ATP / molecule</strong></div>
                  </div>
                </div>
              </div>
            </div>

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

        {/* ==================== PAGE 6: WINGATE LAB TEST PREP ==================== */}
        {activePage === 6 && (
          <WingateLabPrep />
        )}

        {/* ==================== PAGE 7: BIOENERGETICS CALCULATOR ==================== */}
        {activePage === 7 && (
          <BioenergeticsCalculator />
        )}

        {/* ==================== PAGE 8: WISE 10K TRACKER ==================== */}
        {activePage === 8 && (
          <TenKTracker />
        )}

        {/* ==================== PAGE 9: OPTIMUS BIOENERGETIC & LONGEVITY INDEX ==================== */}
        {activePage === 9 && (
          <LongevityIndexSystem />
        )}

        {/* ==================== PAGE 10: RUNNER'S LICENSE & CERTIFICATION ==================== */}
        {activePage === 10 && (
          <RunnerLicense />
        )}

        {/* ==================== PAGE 11: SCIENTIFIC ADVISORY & ACCREDITATION ==================== */}
        {activePage === 11 && (
          <ScientificAccreditation />
        )}

        {/* ==================== PAGE 12: LIVE CELL VISUALIZER ==================== */}
        {activePage === 12 && (
          <article className="space-y-8 animate-fade-in font-sans">
            <LiveCellVisualizer />
          </article>
        )}

        {/* ==================== PAGE 13: CELL ENGINE & PGC-1α BIOGENESIS ==================== */}
        {activePage === 13 && (
          <article className="space-y-8 animate-fade-in font-sans">
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-teal-100 text-teal-900 font-bold text-xs uppercase tracking-wider border border-teal-200">
                Page 13 • Cellular Powerhouse
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
                  Chronic adaptation to Zone 2 training is governed by the cellular master regulator <strong>PGC-1α</strong>. When slow-twitch muscle fibers sustain moderate contraction, AMPK activation triggers PGC-1α transcription to build new mitochondria and increase capillary density.
                </p>
                <div className="pt-4 space-y-3">
                  <h3 className="text-base font-bold text-stone-900">Key Metabolic Characters</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CHARACTERS.map((char) => (
                      <div key={char.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
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

              <div className="bg-emerald-900 text-white p-6 rounded-3xl space-y-5 shadow-sm">
                <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Mitochondrial Adaptations</h3>
                <ul className="space-y-4 text-xs text-emerald-100 font-normal">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                    <span><strong>Mitochondrial Density:</strong> Increases functional surface area for Beta-Oxidation.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                    <span><strong>Enzymatic Upregulation:</strong> Enhances Citrate Synthase and CPT-1 concentrations by up to 40%.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200">
              <AdaptationSimulator />
            </div>
          </article>
        )}

        {/* ==================== PAGE 14: LACTATE PARADOX & SHUTTLE ==================== */}
        {activePage === 14 && (
          <LactateMasterclass />
        )}

        {/* ==================== PAGE 15: ZONE 2 & RECOVERY MASTERY ==================== */}
        {activePage === 15 && (
          <RecoveryMastery />
        )}

        {/* ==================== PAGE 16: AEROBIC EXPECTATIONS & HR DRIFT ==================== */}
        {activePage === 16 && (
          <AerobicExpectations />
        )}

        {/* ==================== PAGE 17: NUTRITION & BLOOD PRESSURE ==================== */}
        {activePage === 17 && (
          <Zone2NutritionBP />
        )}

        {/* ==================== PAGE 18: HEAT & HUMIDITY GUIDE ==================== */}
        {activePage === 18 && (
          <HeatHumidityGuide />
        )}

        {/* ==================== PAGE 19: LONGEVITY MASTERCLASS ==================== */}
        {activePage === 19 && (
          <article className="space-y-8 animate-fade-in font-sans">
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider border border-emerald-200">
                Page 19 • Longevity Masterclass
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
                  Speak in full sentences without gasping for air.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900">Weekly Volume</h3>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  Aim for 3 to 4 sessions of 45–90 minutes per week (3 to 5 hours total).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-800">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900">Heart Rate Corridor</h3>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  Target 105 - 117 BPM based on Wingate Institute lab thresholds.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white space-y-2 shadow-sm">
              <h3 className="text-lg font-bold">The 80/20 Endurance Paradigm</h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
                80% low-intensity Zone 2 aerobic base + 20% high-intensity interval training (Zone 5).
              </p>
            </div>
          </article>
        )}

        {/* ==================== PAGE 20: ANTI-AGING & CELLULAR LONGEVITY ==================== */}
        {activePage === 20 && (
          <AntiAgingMasterclass />
        )}

        {/* ==================== PAGE 21: WHOLE-BODY MITOCHONDRIAL DISTRIBUTION ==================== */}
        {activePage === 21 && (
          <BodyMitochondriaSimulator />
        )}

        {/* ==================== PAGE 22: HOW THE HUMAN BODY CREATES FAT ==================== */}
        {activePage === 22 && (
          <HowFatIsCreated />
        )}

        {/* ==================== PAGE 23: MOLECULAR ASSEMBLY LINE ==================== */}
        {activePage === 23 && (
          <MolecularAssemblyLine />
        )}

        {/* ==================== PAGE 24: THE CELLULAR COSMOS (3D CELL MODEL) ==================== */}
        {activePage === 24 && (
          <CellularCosmos />
        )}

        {/* ==================== PAGE 25: MITOCHONDRIA EVOLUTION & BACTERIA ==================== */}
        {activePage === 25 && (
          <MitochondrialReproduction />
        )}

        {/* ==================== PAGE 26: ZONE 2 VS OTHER SPORTS ==================== */}
        {activePage === 26 && (
          <article className="space-y-8 animate-fade-in font-sans">
            <Zone2VsOtherSports />
          </article>
        )}

        {/* ==================== PAGE 27: 1-HOUR FIELD EXPERIMENT ==================== */}
        {activePage === 27 && (
          <article className="space-y-8 animate-fade-in font-sans">
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-cyan-100 text-cyan-900 font-bold text-xs uppercase tracking-wider border border-cyan-200">
                Page 27 • Field Experiment
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-stone-900 leading-tight tracking-tight">
                The 1-Hour Zone 2 Runner: Real-Time Field Simulation
              </h2>
              <p className="text-stone-600 text-sm font-normal">
                Track how heart rate, fat burn, glycogen depletion, and lactate evolve over a 60-minute session.
              </p>
            </div>
            <div className="pt-2">
              <RunnerSimulation />
            </div>
          </article>
        )}

        {/* ==================== PAGE 28: RUN PROGRESS & ANALYTICS TABLE ==================== */}
        {activePage === 28 && (
          <RunImprovementsTable />
        )}

        {/* ==================== PAGE 29: MUSCLE HYPERTROPHY BIOENERGETICS CALCULATOR ==================== */}
        {activePage === 29 && (
          <MuscleBioenergeticsCalculator />
        )}

        {/* ==================== PAGE 30: 12-WEEK PRACTICAL BLUEPRINT ==================== */}
        {activePage === 30 && (
          <HypertrophyBlueprint12W />
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
