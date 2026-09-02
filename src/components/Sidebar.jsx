import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, Search, X, Smile, Flame, Cpu, Zap, BarChart2, Activity, Clock, 
  ShieldCheck, User, Heart, BatteryCharging, TrendingUp, Droplet, Sun, Layers, Award, Dna, Trophy,
  ArrowDownAZ, FileText, LayoutGrid, Link, Check, ExternalLink, Sparkles, Calculator, Calendar
} from 'lucide-react';

export const PAGES_LIST = [
  // TIER 1: ESSENTIAL CORE & ATHLETE DATA (HIGHEST PRIORITY)
  { id: 1, title: "Editor's Foreword & Mission", label: 'Article 1: Foreword & Mission', category: 'Fundamentals', icon: BookOpen, badge: '📰 Mission' },
  { id: 2, title: 'Ishai Athlete Profile', label: 'Article 2: Ishai Profile', category: 'Personal Data', icon: User, badge: '👤 Profile' },
  { id: 3, title: 'Apple Watch Ultra Telemetry & Runs', label: 'Article 3: Watch Runs & Telemetry', category: 'Personal Data', icon: Heart, badge: '⌚ Telemetry' },
  { id: 4, title: 'What is Zone 2? (Easy Intro)', label: 'Article 4: What is Zone 2?', category: 'Fundamentals', icon: Smile, badge: 'Beginner' },
  { id: 5, title: 'FATmax Science & Bioenergetics', label: 'Article 5: FATmax Science', category: 'Fundamentals', icon: Flame, badge: 'Core' },
  { id: 6, title: 'Wingate Lab Test Prep & Entry', label: 'Article 6: Wingate Lab Prep', category: 'Protocols', icon: Calendar, badge: '🔬 Wingate Prep' },

  // TIER 2: INTERACTIVE CALCULATORS & ACCREDITATION
  { id: 7, title: 'Apple Watch Bioenergetics Calculator', label: 'Article 7: Substrate & ATP Calc', category: 'Personal Data', icon: Calculator, badge: '🧮 Calculator' },
  { id: 8, title: 'Wise 10K Training & Run Tracker', label: 'Article 8: 10K Training Tracker', category: 'Protocols', icon: Trophy, badge: '🏃 10K Tracker' },
  { id: 9, title: 'Optimus Bioenergetic & Longevity Index (OBLI)', label: 'Article 9: Longevity Index', category: 'Personal Data', icon: ShieldCheck, badge: '🏆 Longevity Index' },
  { id: 10, title: "Runner's License & Certification", label: "Article 10: Runner's License", category: 'Fundamentals', icon: Award, badge: '📜 License' },
  { id: 11, title: 'Scientific Advisory & Accreditation', label: 'Article 11: Scientific Accreditation', category: 'Fundamentals', icon: ShieldCheck, badge: '🛡️ Scientific Seal' },
  { id: 12, title: 'Live Cell Visualizer', label: 'Article 12: Live Cell Visualizer', category: 'Cell Biology', icon: Zap, badge: '⭐ Featured' },

  // TIER 3: KEY PROTOCOLS & PHYSIOLOGY
  { id: 13, title: 'Cell Engine & PGC-1α Biogenesis', label: 'Article 13: Cell Engine', category: 'Cell Biology', icon: Cpu, badge: 'Science' },
  { id: 14, title: 'Lactate Paradox & Shuttle', label: 'Article 14: Lactate Paradox', category: 'Cell Biology', icon: Activity, badge: 'Mythbusting' },
  { id: 15, title: 'Zone 2 & Recovery Mastery', label: 'Article 15: Zone 2 & Recovery', category: 'Protocols', icon: BatteryCharging, badge: '🔋 Fuel' },
  { id: 16, title: 'Aerobic Expectations & HR Drift', label: 'Article 16: Aerobic Expectations', category: 'Protocols', icon: TrendingUp, badge: 'HR Drift' },
  { id: 17, title: 'Nutrition & Blood Pressure', label: 'Article 17: Nutrition & BP', category: 'Protocols', icon: Droplet, badge: '🥗 Health' },
  { id: 18, title: 'Heat & Humidity Guide', label: 'Article 18: Heat & Humidity', category: 'Protocols', icon: Sun, badge: '☀️ Weather' },
  { id: 19, title: 'Longevity Masterclass & Protocols', label: 'Article 19: Longevity Masterclass', category: 'Field Studies', icon: ShieldCheck, badge: 'Health' },
  { id: 20, title: 'Anti-Aging & Longevity Science', label: 'Article 20: Anti-Aging Science', category: 'Deep Physiology', icon: Sparkles, badge: '✨ Anti-Aging' },

  // TIER 4: DEEP BIOLOGY & ADVANCED VISUALIZERS
  { id: 21, title: 'Whole-Body Organ Systems', label: 'Article 21: Whole-Body Organ Systems', category: 'Deep Physiology', icon: Layers, badge: '🫀 Organs' },
  { id: 22, title: 'How the Human Body Creates Fat', label: 'Article 22: How Body Creates Fat', category: 'Deep Physiology', icon: Layers, badge: '🧪 Lipogenesis' },
  { id: 23, title: 'Molecular Assembly Line (Citrate)', label: 'Article 23: Molecular Assembly Line', category: 'Cell Biology', icon: Cpu, badge: '⚡ Interactive' },
  { id: 24, title: 'The Cellular Cosmos (3D Cell Model)', label: 'Article 24: The Cellular Cosmos', category: 'Cell Biology', icon: Sparkles, badge: '🌌 3D Model' },
  { id: 25, title: 'Bacterial & Mitochondrial Evolution', label: 'Article 25: Bacterial Reproduction', category: 'Deep Physiology', icon: Dna, badge: '🦠 Evolution' },
  { id: 26, title: 'Zone 2 vs. Other Sports', label: 'Article 26: vs. Other Sports', category: 'Cell Biology', icon: BarChart2, badge: 'Comparison' },
  { id: 27, title: '1-Hour Field Experiment', label: 'Article 27: 1-Hr Field Study', category: 'Field Studies', icon: Clock, badge: 'Data' },
  { id: 28, title: 'Run Progress & Analytics Table', label: 'Article 28: Run Progress Table', category: 'Deep Physiology', icon: Award, badge: '📈 Analytics' },
  { id: 29, title: 'Muscle Hypertrophy Bioenergetics Calculator', label: 'Article 29: Muscle Hypertrophy Calc', category: 'Calculators & Bioenergetics', icon: Calculator, badge: '💪 Muscle Bioenergetics' },
  { id: 30, title: '12-Week Practical Lean Gains & Recomposition Blueprint', label: 'Article 30: 12-Week Blueprint', category: 'Protocols', icon: Calendar, badge: '📋 12-Wk Blueprint' },
];

export default function Sidebar({
  activeArticle,
  setActiveArticle,
  isOpen,
  setIsOpen,
  searchQuery,
  setSearchQuery
}) {
  const [sortMode, setSortMode] = useState('num'); // 'num' (By Page #) | 'atoz' (A-Z) | 'cat' (Categories)
  const [copiedId, setCopiedId] = useState(null);
  const activeItemRef = useRef(null);

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [activeArticle]);

  const copyChapterUrl = (e, pageId) => {
    e.stopPropagation();
    const url = `https://ishaypesok.github.io/optimus-magazine/#page=${pageId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(pageId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const shareOnX = (e, page) => {
    e.stopPropagation();
    const chapterUrl = `https://ishaypesok.github.io/optimus-magazine/#page=${page.id}`;
    const text = encodeURIComponent(`Reading "${page.title}" in Optimus Magazine 🏃‍♂️⚡`);
    const url = encodeURIComponent(chapterUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  // Filter pages by search query
  const filteredPages = PAGES_LIST.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `page ${p.id}`.includes(searchQuery.toLowerCase())
  );

  // Process sorting based on active mode
  const getSortedPages = () => {
    const list = [...filteredPages];
    if (sortMode === 'atoz') {
      return list.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortMode === 'num') {
      return list.sort((a, b) => a.id - b.id);
    }
    return list; // default order
  };

  const sortedPages = getSortedPages();
  const categories = Array.from(new Set(filteredPages.map(p => p.category)));

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Navigation Panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-80 bg-[#f4f1e8] border-r border-stone-200 shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out flex flex-col font-sans ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        
        {/* Top Brand Masthead with Large Magazine Cover Badge */}
        <div className="p-4 border-b border-stone-200 bg-white/90 backdrop-blur-xs flex items-center justify-between">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-20 h-26 rounded-2xl bg-black p-0.5 shadow-md border-2 border-emerald-500/50 overflow-hidden shrink-0 group">
              <img 
                src="./optimus-logo.jpg" 
                alt="Optimus Cover Logo" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-black text-stone-900 tracking-tight leading-tight">
                OPTIMUS <span className="text-emerald-700 block">MAGAZINE</span>
              </h1>
              <p className="text-xs font-bold text-emerald-800 tracking-tight mt-1">
                Zone 2 Bioenergetics Index
              </p>
              <span className="inline-block mt-1.5 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-950 text-[10px] font-extrabold border border-emerald-300">
                Official Issue Cover
              </span>
            </div>
          </div>

          {/* Close Button for Mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200 lg:hidden transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Controls: Search & Sort Toggle Bar */}
        <div className="p-4 border-b border-stone-200 bg-stone-100/70 space-y-3">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${PAGES_LIST.length} magazine articles...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-stone-300 text-xs font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-600 transition shadow-2xs"
            />
          </div>

          {/* Sort Selector Bar */}
          <div className="flex items-center justify-between gap-1 text-[11px] font-bold">
            <span className="text-stone-500 uppercase text-[10px] tracking-wider shrink-0">Sort:</span>
            
            <div className="flex items-center gap-1 bg-stone-200/80 p-0.5 rounded-xl text-stone-700 w-full justify-end">
              {/* Left: Articles */}
              <button
                onClick={() => setSortMode('num')}
                className={`flex-1 flex items-center justify-center gap-1 py-1 px-2 rounded-lg transition ${
                  sortMode === 'num'
                    ? 'bg-emerald-800 text-white shadow-2xs font-extrabold'
                    : 'hover:bg-stone-300/60 text-stone-700'
                }`}
                title={`Sort by Article Order 1-${PAGES_LIST.length}`}
              >
                <FileText className="w-3.5 h-3.5 text-emerald-300" />
                <span>Articles</span>
              </button>

              {/* Middle: A-Z */}
              <button
                onClick={() => setSortMode('atoz')}
                className={`flex-1 flex items-center justify-center gap-1 py-1 px-2 rounded-lg transition ${
                  sortMode === 'atoz'
                    ? 'bg-emerald-800 text-white shadow-2xs font-extrabold'
                    : 'hover:bg-stone-300/60 text-stone-700'
                }`}
                title="Sort Alphabetically A to Z"
              >
                <ArrowDownAZ className="w-3.5 h-3.5" />
                <span>A-Z</span>
              </button>

              {/* Right: Category */}
              <button
                onClick={() => setSortMode('cat')}
                className={`flex-1 flex items-center justify-center gap-1 py-1 px-2 rounded-lg transition ${
                  sortMode === 'cat'
                    ? 'bg-emerald-800 text-white shadow-2xs font-extrabold'
                    : 'hover:bg-stone-300/60 text-stone-700'
                }`}
                title="Group by Category"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Categories</span>
              </button>
            </div>
          </div>

        </div>

        {/* Scrollable Page List Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          
          {/* CATEGORY GROUPED VIEW */}
          {sortMode === 'cat' ? (
            categories.map((cat, catIdx) => {
              const pagesInCat = filteredPages.filter(p => p.category === cat);
              if (pagesInCat.length === 0) return null;

              return (
                <div key={catIdx} className="space-y-2">
                  <div className="text-[10px] uppercase font-black text-stone-600 tracking-wider px-2">
                    {cat}
                  </div>

                  <div className="space-y-1">
                    {pagesInCat.map(page => {
                      const Icon = page.icon;
                      const isActive = activeArticle === page.id;

                      return (
                        <div
                          key={page.id}
                          ref={isActive ? activeItemRef : null}
                          onClick={() => {
                            setActiveArticle(page.id);
                            setIsOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl font-bold text-xs transition cursor-pointer group ${
                            isActive
                              ? 'bg-emerald-800 text-white shadow-sm'
                              : 'text-stone-800 hover:bg-stone-200/90 hover:text-stone-950'
                          }`}
                        >
                          <div className="flex flex-col min-w-0 pr-2">
                            <div className="flex items-center gap-2">
                              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-300' : 'text-emerald-700'}`} />
                              <span className="truncate">{page.title}</span>
                            </div>
                            <span className={`text-[9px] font-mono pl-6 ${isActive ? 'text-emerald-200' : 'text-stone-400 group-hover:text-stone-600'}`}>
                              /#page={page.id}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {/* Copy Address Button */}
                            <button
                              onClick={(e) => copyChapterUrl(e, page.id)}
                              className={`p-1 rounded-md transition ${
                                isActive 
                                  ? 'hover:bg-emerald-700 text-emerald-200' 
                                  : 'hover:bg-stone-300 text-stone-500 hover:text-stone-900'
                              }`}
                              title="Copy Direct Online Link"
                            >
                              {copiedId === page.id ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Link className="w-3.5 h-3.5" />}
                            </button>

                            {/* Share on X Button */}
                            <button
                              onClick={(e) => shareOnX(e, page)}
                              className={`px-1.5 py-0.5 rounded-md font-mono text-[10px] transition font-bold ${
                                isActive
                                  ? 'bg-stone-900 text-white hover:bg-black'
                                  : 'bg-stone-300/80 text-stone-800 hover:bg-black hover:text-white'
                              }`}
                              title="Share on X"
                            >
                              𝕏
                            </button>

                            {/* Page # Badge */}
                            <span className={`text-[10px] px-2 py-0.5 rounded-md font-extrabold ${
                              isActive 
                                ? 'bg-emerald-700 text-emerald-100 border border-emerald-600' 
                                : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                            }`}>
                              Pg {page.id}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            /* FLAT ALPHABETICAL (A-Z) OR NUMERICAL LIST VIEW */
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-black text-stone-500 tracking-wider px-2 mb-2 flex items-center justify-between">
                <span>{sortMode === 'atoz' ? 'Articles (A – Z Alphabetical)' : `Articles (Page 1 – ${PAGES_LIST.length})`}</span>
                <span>{sortedPages.length} Pages</span>
              </div>

              {sortedPages.map(page => {
                const Icon = page.icon;
                const isActive = activeArticle === page.id;

                return (
                  <div
                    key={page.id}
                    ref={isActive ? activeItemRef : null}
                    onClick={() => {
                      setActiveArticle(page.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl font-bold text-xs transition cursor-pointer group ${
                      isActive
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'text-stone-800 hover:bg-stone-200/90 hover:text-stone-950'
                    }`}
                  >
                    {/* Left: Icon + Title + Direct URL anchor */}
                    <div className="flex flex-col min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 shrink-0 transition ${
                          isActive ? 'text-emerald-300' : 'text-emerald-700 group-hover:scale-110'
                        }`} />
                        <span className="truncate leading-snug">{page.title}</span>
                      </div>
                      <span className={`text-[9.5px] font-mono pl-6 transition ${
                        isActive ? 'text-emerald-200' : 'text-stone-400 group-hover:text-emerald-800'
                      }`}>
                        /#page={page.id}
                      </span>
                    </div>

                    {/* Right: Actions & Page Number Pill */}
                    <div className="flex items-center gap-1 shrink-0">
                      
                      {/* Copy Address Button */}
                      <button
                        onClick={(e) => copyChapterUrl(e, page.id)}
                        className={`p-1 rounded-md transition ${
                          isActive 
                            ? 'hover:bg-emerald-700 text-emerald-200' 
                            : 'hover:bg-stone-300 text-stone-500 hover:text-stone-900'
                        }`}
                        title="Copy Direct Online Address for X"
                      >
                        {copiedId === page.id ? (
                          <span className="text-[9px] font-bold text-emerald-300 px-1">Copied!</span>
                        ) : (
                          <Link className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Post on X Button */}
                      <button
                        onClick={(e) => shareOnX(e, page)}
                        className={`px-1.5 py-0.5 rounded-md font-mono text-[10px] transition font-black ${
                          isActive
                            ? 'bg-stone-950 text-white hover:bg-black'
                            : 'bg-stone-300/80 text-stone-800 hover:bg-black hover:text-white'
                        }`}
                        title="Post Chapter on X"
                      >
                        𝕏
                      </button>

                      {/* Page Number Pill */}
                      <span className={`text-[10px] px-2 py-0.5 rounded-lg font-mono font-black transition ${
                        isActive 
                          ? 'bg-emerald-700 text-emerald-100 border border-emerald-600' 
                          : 'bg-stone-200 text-emerald-950 group-hover:bg-emerald-100 group-hover:text-emerald-900 border border-stone-300'
                      }`}>
                        Pg {page.id}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Sidebar Footer Metadata & Root Address */}
        <div className="p-4 border-t border-stone-200 bg-white/60 text-[11px] text-stone-600 font-semibold text-center space-y-1">
          <div className="flex items-center justify-center gap-1 font-mono text-[10px] text-emerald-900 bg-emerald-50 py-1 px-2 rounded-lg border border-emerald-200 truncate">
            <ExternalLink className="w-3 h-3 text-emerald-700 shrink-0" />
            <a 
              href="https://ishaypesok.github.io/optimus-magazine/" 
              target="_blank" 
              rel="noreferrer"
              className="hover:underline font-bold truncate"
            >
              ishaypesok.github.io/optimus-magazine
            </a>
          </div>
          <div>Optimus Bioenergetics Press • {PAGES_LIST.length} Pages</div>
        </div>

      </aside>
    </>
  );
}
