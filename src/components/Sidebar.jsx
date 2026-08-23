import React, { useRef, useEffect } from 'react';
import { 
  BookOpen, Search, X, Smile, Flame, Cpu, Zap, BarChart2, Activity, Clock, 
  ShieldCheck, User, Heart, BatteryCharging, TrendingUp, Droplet, Sun, Layers, Award, Dna, ChevronRight
} from 'lucide-react';

export const PAGES_LIST = [
  { id: 1, label: 'Page 1: Easy Intro', category: 'Fundamentals', icon: Smile, badge: 'Beginner' },
  { id: 2, label: 'Page 2: FATmax Science', category: 'Fundamentals', icon: Flame, badge: 'Core' },
  { id: 18, label: "Page 18: Runner's License", category: 'Fundamentals', icon: Award, badge: '📜 License' },
  { id: 3, label: 'Page 3: Cell Engine', category: 'Cell Biology', icon: Cpu, badge: 'Science' },
  { id: 4, label: 'Page 4: Live Cell Visualizer', category: 'Cell Biology', icon: Zap, badge: '⭐ Featured' },
  { id: 5, label: 'Page 5: vs. Other Sports', category: 'Cell Biology', icon: BarChart2, badge: 'Comparison' },
  { id: 6, label: 'Page 6: Lactate Paradox', category: 'Cell Biology', icon: Activity, badge: 'Mythbusting' },
  { id: 7, label: 'Page 7: 1-Hr Field Study', category: 'Field Studies', icon: Clock, badge: 'Data' },
  { id: 8, label: 'Page 8: Longevity Masterclass', category: 'Field Studies', icon: ShieldCheck, badge: 'Health' },
  { id: 9, label: 'Page 9: Ishai Profile', category: 'Personal Data', icon: User, badge: '👤 Profile' },
  { id: 10, label: 'Page 10: Watch Runs', category: 'Personal Data', icon: Heart, badge: '🏃‍♂️ Strava' },
  { id: 11, label: 'Page 11: Zone 2 & Recovery', category: 'Protocols', icon: BatteryCharging, badge: '🔋 Fuel' },
  { id: 12, label: 'Page 12: Aerobic Expectations', category: 'Protocols', icon: TrendingUp, badge: 'HR Drift' },
  { id: 13, label: 'Page 13: Nutrition & BP', category: 'Protocols', icon: Droplet, badge: '🥗 Health' },
  { id: 14, label: 'Page 14: Heat & Humidity', category: 'Protocols', icon: Sun, badge: '☀️ Weather' },
  { id: 15, label: 'Page 15: Whole-Body Organ Systems', category: 'Deep Physiology', icon: Layers, badge: '🫀 Organs' },
  { id: 16, label: 'Page 16: Run Progress Table', category: 'Deep Physiology', icon: Award, badge: '📈 Analytics' },
  { id: 17, label: 'Page 17: Bacterial Reproduction', category: 'Deep Physiology', icon: Dna, badge: '🦠 Evolution' },
  { id: 19, label: 'Page 19: How Body Creates Fat', category: 'Deep Physiology', icon: Layers, badge: '🧪 Lipogenesis' },
];

export default function Sidebar({
  activeArticle,
  setActiveArticle,
  isOpen,
  setIsOpen,
  searchQuery,
  setSearchQuery
}) {
  const activeItemRef = useRef(null);

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [activeArticle]);

  const filteredPages = PAGES_LIST.filter(p => 
    p.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group pages by category
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
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 sm:w-80 bg-[#f4f1e8] border-r border-stone-200 shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out flex flex-col font-sans ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        
        {/* Top Brand Masthead */}
        <div className="p-5 border-b border-stone-200 bg-white/70 backdrop-blur-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 p-0.5 shadow-sm overflow-hidden shrink-0">
              <img 
                src="./optimus-logo.jpg" 
                alt="Optimus Logo" 
                className="w-full h-full object-cover rounded-[10px]" 
              />
            </div>
            <div>
              <h1 className="text-lg font-black text-stone-900 tracking-tight leading-tight">
                OPTIMUS <span className="text-emerald-700">MAGAZINE</span>
              </h1>
              <p className="text-[11px] font-bold text-emerald-800 tracking-tight">
                Zone 2 Bioenergetics Guide
              </p>
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

        {/* Sidebar Search Bar */}
        <div className="p-4 border-b border-stone-200 bg-stone-100/60">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 19 magazine pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-stone-300 text-xs font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-600 transition shadow-2xs"
            />
          </div>
        </div>

        {/* Scrollable Page List Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
          
          {categories.map((cat, catIdx) => {
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
                      <button
                        key={page.id}
                        ref={isActive ? activeItemRef : null}
                        onClick={() => {
                          setActiveArticle(page.id);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl font-bold text-xs transition text-left ${
                          isActive
                            ? 'bg-emerald-800 text-white shadow-sm'
                            : 'text-stone-700 hover:bg-stone-200/80 hover:text-stone-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-300' : 'text-emerald-700'}`} />
                          <span className="truncate">{page.label}</span>
                        </div>

                        <span className={`text-[10px] px-2 py-0.5 rounded-md shrink-0 font-medium ${
                          isActive 
                            ? 'bg-emerald-700 text-emerald-100' 
                            : 'bg-stone-200/90 text-stone-600'
                        }`}>
                          {page.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

        </div>

        {/* Sidebar Footer Metadata */}
        <div className="p-4 border-t border-stone-200 bg-white/50 text-[11px] text-stone-500 font-semibold text-center space-y-1">
          <div>Optimus Bioenergetics Press • 19 Pages</div>
          <div className="text-[10px] text-emerald-800 font-bold">Published on GitHub Pages</div>
        </div>

      </aside>
    </>
  );
}
