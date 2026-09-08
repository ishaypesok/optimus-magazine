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
import AsAboveSoBelowVisualizer from './AsAboveSoBelowVisualizer';
import HubermanMitochondriaMasterclass from './HubermanMitochondriaMasterclass';
import MagazineFrontCover from './MagazineFrontCover';
import MagazineTableOfContents from './MagazineTableOfContents';
import { PAGES_LIST } from './Sidebar';

export default function MagazineView({ currentZoneId, setCurrentZoneId, activeArticle, setActiveArticle, isPrintAllMode }) {
  const [internalPage, setInternalPage] = useState(1);
  const activePage = (activeArticle && typeof activeArticle === 'number') ? activeArticle : internalPage;
  const totalPages = PAGES_LIST.length;

  const setPage = (page) => {
    setInternalPage(page);
    if (setActiveArticle) setActiveArticle(page);
  };

  const nextPage = () => setPage(Math.min(activePage + 1, totalPages));
  const prevPage = () => setPage(Math.max(activePage - 1, 1));

  const renderPageContent = (pageNum) => {
    switch (pageNum) {
      case 1:
        return <ForewordMission setPage={setPage} />;
      case 2:
        return <AthleteProfile />;
      case 3:
        return <StravaRunVisualizer />;
      case 4:
        return (
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
          </article>
        );
      case 5:
        return (
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
              </div>
            </div>

            <div className="pt-4">
              <FuelCharts currentZoneId={currentZoneId} setCurrentZoneId={setCurrentZoneId} />
            </div>
          </article>
        );
      case 6: return <WingateLabPrep />;
      case 7: return <BioenergeticsCalculator />;
      case 8: return <TenKTracker />;
      case 9: return <LongevityIndexSystem />;
      case 10: return <RunnerLicense />;
      case 11: return <ScientificAccreditation />;
      case 12: return <LiveCellVisualizer />;
      case 13: return <AdaptationSimulator />;
      case 14: return <LactateMasterclass />;
      case 15: return <RecoveryMastery />;
      case 16: return <AerobicExpectations />;
      case 17: return <Zone2NutritionBP />;
      case 18: return <HeatHumidityGuide />;
      case 19:
        return (
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
          </article>
        );
      case 20: return <AntiAgingMasterclass />;
      case 21: return <BodyMitochondriaSimulator />;
      case 22: return <HowFatIsCreated />;
      case 23: return <MolecularAssemblyLine />;
      case 24: return <CellularCosmos />;
      case 25: return <MitochondrialReproduction />;
      case 26: return <Zone2VsOtherSports />;
      case 27: return <RunnerSimulation />;
      case 28: return <RunImprovementsTable />;
      case 29: return <MuscleBioenergeticsCalculator />;
      case 30: return <HypertrophyBlueprint12W />;
      case 31: return <AsAboveSoBelowVisualizer />;
      case 32: return <HubermanMitochondriaMasterclass />;
      default: return <ForewordMission setPage={setPage} />;
    }
  };

  // FULL 32-PAGE BOOKLET PRINT MODE
  if (isPrintAllMode) {
    return (
      <div className="space-y-10 font-sans print:p-0">
        <MagazineFrontCover />
        <div className="print-page-break" />
        <MagazineTableOfContents setPage={setPage} />
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <div key={pageNum} className="print-page-break space-y-6 pt-6">
            <div className="flex items-center justify-between border-b border-stone-300 pb-2 text-xs font-mono text-stone-500">
              <span>OPTIMUS MAGAZINE • Issue 01</span>
              <span className="font-bold text-emerald-800">PAGE {pageNum} OF {totalPages}</span>
            </div>
            {renderPageContent(pageNum)}
          </div>
        ))}
      </div>
    );
  }

  // STANDARD SINGLE-PAGE INTERACTIVE VIEW
  return (
    <div className="space-y-6 animate-fade-in text-stone-900 font-sans">
      <main className="magazine-page p-6 sm:p-10 lg:p-12 space-y-8 relative">
        
        {/* Page Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-stone-200 pb-5 gap-4 font-sans no-print">
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
              <span>Export Single Page PDF</span>
            </button>
          </div>
        </div>

        {/* ACTIVE PAGE CONTENT */}
        {renderPageContent(activePage)}

        {/* Page Footer Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-stone-200 font-sans no-print">
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
