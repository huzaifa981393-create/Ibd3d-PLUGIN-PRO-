import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Category, UserProfile, ThemeMode, ChatMessage, CheatCode, RgsFile } from './types';
import { CHEATS_DATA, RGS_FILES_DATA, ICONS } from './constants';
import { chatWithGemini } from './services/geminiService';

// --- Sub-components ---

const AdBanner: React.FC<{ label?: string; className?: string }> = ({ label = "Advertisement", className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Clear the container to ensure a fresh injection on every mount/re-render
    container.innerHTML = ''; 
    
    // Create an internal wrapper to isolate the script execution
    const wrapper = document.createElement('div');
    wrapper.style.width = '320px';
    wrapper.style.height = '50px';

    const scriptConfig = document.createElement('script');
    scriptConfig.type = 'text/javascript';
    scriptConfig.text = `
      atOptions = {
        'key' : 'e31c11f3a7104a26bde5d1cad5724250',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;

    const scriptInvoke = document.createElement('script');
    scriptInvoke.type = 'text/javascript';
    scriptInvoke.src = 'https://www.highperformanceformat.com/e31c11f3a7104a26bde5d1cad5724250/invoke.js';

    // Appending both config and invoke script triggers the ad loader for this specific instance
    wrapper.appendChild(scriptConfig);
    wrapper.appendChild(scriptInvoke);
    container.appendChild(wrapper);
  }, []);

  return (
    <div className={`flex flex-col items-center mt-auto mb-4 ${className}`}>
      <div className="text-[7px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-2">{label}</div>
      <div 
        ref={containerRef} 
        className="w-[320px] min-h-[50px] bg-zinc-100/5 dark:bg-zinc-900/40 rounded-xl flex items-center justify-center overflow-hidden border border-zinc-200/10 dark:border-zinc-800/20"
      >
        <div className="text-[8px] text-zinc-500 font-bold uppercase tracking-tighter animate-pulse">Plugin Ad Unit</div>
      </div>
    </div>
  );
};

const BottomNav: React.FC<{ activeTab: string, setActiveTab: (t: string) => void }> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: ICONS.Home },
    { id: 'cheats', label: 'Cheats', icon: ICONS.Cheats },
    { id: 'favorites', label: 'Favorites', icon: ICONS.Favorites, isSpecial: true },
    { id: 'ai', label: 'AI', icon: ICONS.AI },
    { id: 'profile', label: 'Settings', icon: ICONS.Profile },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-zinc-950/90 glass border-t border-zinc-200 dark:border-zinc-800/50 flex justify-around items-center h-16 safe-bottom z-50 transition-all duration-300">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center justify-center w-full h-full transition-all active:scale-90 ${
            tab.isSpecial ? 'transform -translate-y-1' : ''
          } ${activeTab === tab.id ? 'text-blue-500' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300'}`}
        >
          <tab.icon className={`w-6 h-6 transition-all ${tab.isSpecial ? 'fill-current' : ''} ${activeTab === tab.id ? 'scale-110' : ''}`} />
          <span className={`text-[10px] mt-1 font-bold tracking-wide transition-opacity duration-200 ${activeTab === tab.id ? 'opacity-100' : 'opacity-70'}`}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

// --- Views ---

const HomeView: React.FC<{ 
  onCategorySelect: (c: Category | 'all') => void, 
  hasCustomData: boolean 
}> = ({ onCategorySelect, hasCustomData }) => {
  return (
    <div className="pb-24 min-h-screen flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="px-6 py-8 flex justify-between items-center sticky top-0 bg-white/80 dark:bg-[#050505]/80 glass z-40 border-b border-zinc-100 dark:border-zinc-800/30">
        <div>
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
            IBD3D <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] cursor-default select-none">Plugin Pro</span>
          </h1>
          <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mt-1">2026 Edition</p>
        </div>
        <div className="flex items-center gap-1.5 bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] px-3 py-1.5 rounded-full font-black border border-red-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500"></span>
          LIVE
        </div>
      </header>

      <div className="flex-1">
        <section className="mt-8 mb-10">
          <div className="flex justify-between items-end px-6 mb-5">
            <h2 className="text-[11px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">🔥 Trending Now</h2>
            <button onClick={() => onCategorySelect('all')} className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="flex overflow-x-auto gap-5 px-6 no-scrollbar pb-4">
            {CHEATS_DATA.slice(0, 5).map(cheat => (
              <div 
                key={cheat.id} 
                className="flex-shrink-0 w-[240px] p-6 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm transition-all active:scale-[0.98] hover:border-zinc-300 dark:hover:border-zinc-700"
                onClick={() => onCategorySelect(cheat.category)}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{cheat.category}</span>
                  <span className="bg-blue-600 dark:bg-blue-700 text-white text-[8px] font-black px-2 py-0.5 rounded-md">PRO</span>
                </div>
                <h3 className="text-lg font-black mb-1 tracking-tight truncate dark:text-zinc-100">{cheat.name}</h3>
                <p className="text-4xl font-black text-blue-600 dark:text-blue-500 tracking-tighter">{cheat.code}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 mb-10">
          <h2 className="text-[11px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-6">Plugin Categories</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: Category.BIKES, icon: '🏍️', color: 'bg-blue-600', glow: 'shadow-blue-500/20' },
              { name: Category.CARS, icon: '🚗', color: 'bg-red-600', glow: 'shadow-red-500/20' },
              { name: Category.HEAVY, icon: '🚛', color: 'bg-yellow-600', glow: 'shadow-yellow-600/20' },
              { name: Category.ANIMALS, icon: '🐘', color: 'bg-green-600', glow: 'shadow-green-500/20' },
              { name: Category.AIR_WATER, icon: '✈️', color: 'bg-cyan-600', glow: 'shadow-cyan-500/20' },
              { name: Category.EFFECTS, icon: '⚡', color: 'bg-purple-600', glow: 'shadow-purple-500/20' },
              { name: Category.CHARACTERS, icon: '🧍', color: 'bg-pink-600', glow: 'shadow-pink-500/20' },
              { name: Category.DANCE, icon: '💃', color: 'bg-orange-600', glow: 'shadow-orange-500/20' },
              { name: Category.RGS, icon: '📦', color: 'bg-emerald-600', glow: 'shadow-emerald-500/20' },
            ].map(cat => (
              <button
                key={cat.name}
                onClick={() => onCategorySelect(cat.name as any)}
                className="group flex flex-col items-center justify-center p-6 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/50 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800/60 active:scale-95 shadow-sm"
              >
                <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-xl ${cat.glow} group-hover:scale-110 transition-transform duration-300`}>
                  {cat.icon}
                </div>
                <span className="font-black text-[10px] text-center uppercase tracking-widest text-zinc-600 dark:text-zinc-300 group-hover:text-blue-500 transition-colors">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="px-6 pb-2">
        <AdBanner label="IBD3D Official Ad" />
      </div>
    </div>
  );
};

const CheatsView: React.FC<{ 
  initialCategory: Category | 'all', 
  favorites: string[], 
  toggleFavorite: (id: string) => void,
  allCheats: CheatCode[]
}> = ({ initialCategory, favorites, toggleFavorite, allCheats }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>(initialCategory);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const categories = ['all', Category.BIKES, Category.CARS, Category.HEAVY, Category.AIR_WATER, Category.ANIMALS, Category.CHARACTERS, Category.DANCE, Category.EFFECTS];

  const filteredCheats = useMemo(() => {
    return allCheats.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.code.includes(search);
      const matchesCategory = activeCategory === 'all' || c.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, allCheats]);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopyFeedback(code);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  return (
    <div className="pb-24 pt-4 flex flex-col min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-6 sticky top-0 bg-white/90 dark:bg-[#050505]/90 glass z-40 pb-6 pt-2">
        <div className="relative mb-4">
          <ICONS.Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 w-5 h-5" />
          <input
            type="text"
            placeholder="Search codes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-2 focus:ring-blue-500/40 outline-none shadow-inner dark:text-zinc-100 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
          />
        </div>

        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-500/20' 
                  : 'bg-zinc-100 dark:bg-zinc-900/60 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
              }`}
            >
              {cat === 'all' ? 'Everything' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 grid gap-4 mt-4 content-start">
        {filteredCheats.map((cheat) => (
          <div key={cheat.id} className="p-5 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/60 flex justify-between items-center transition-all hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm">
            <div className="flex-1 min-w-0 pr-4">
              <span className="text-[9px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-[0.15em] block mb-1">{cheat.category}</span>
              <h3 className="font-black text-sm mb-1 line-clamp-1 dark:text-zinc-100">{cheat.name}</h3>
              <p className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50">{cheat.code}</p>
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={() => toggleFavorite(cheat.id)}
                className={`p-3.5 rounded-2xl border transition-all active:scale-90 ${favorites.includes(cheat.id) ? 'bg-yellow-500 border-yellow-600 text-white shadow-lg shadow-yellow-500/20' : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600'}`}
              >
                <ICONS.Favorites className="w-5 h-5" fill={favorites.includes(cheat.id) ? "currentColor" : "none"} />
              </button>
              <button
                onClick={() => handleCopy(cheat.code)}
                className={`p-3.5 rounded-2xl transition-all active:scale-90 shadow-lg ${copyFeedback === cheat.code ? 'bg-green-600 text-white shadow-green-500/20' : 'bg-blue-600 text-white shadow-blue-500/20 border border-blue-700'}`}
              >
                {copyFeedback === cheat.code ? <ICONS.Check className="w-5 h-5" /> : <ICONS.Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        ))}
        {filteredCheats.length === 0 && (
          <div className="text-center py-24 opacity-30 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-5">
              <ICONS.Search className="w-8 h-8 text-zinc-400 dark:text-zinc-600" />
            </div>
            <p className="font-black uppercase tracking-widest text-[11px]">No Search Results</p>
          </div>
        )}
      </div>

      <div className="px-6 pb-2">
        <AdBanner label="Cheats Partner Ad" />
      </div>
    </div>
  );
};

const RgsView: React.FC<{ 
  favorites: string[], 
  toggleFavorite: (id: string) => void,
  allRgs: RgsFile[] 
}> = ({ favorites, toggleFavorite, allRgs }) => {
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const handleCopy = (url: string) => {
    const encodedUrl = url.replace(/ /g, '%20');
    navigator.clipboard.writeText(encodedUrl);
    setCopyFeedback(url);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  return (
    <div className="pb-24 pt-4 flex flex-col min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-6">
        <div className="bg-orange-500/10 border border-orange-500/20 p-5 rounded-[2rem] mb-8 flex items-start gap-4 shadow-inner">
          <div className="text-xl bg-orange-500/20 p-2.5 rounded-xl shadow-inner">⚡</div>
          <div>
            <h4 className="text-orange-600 dark:text-orange-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1">Expert Protocol</h4>
            <p className="text-[11px] text-zinc-600 dark:text-orange-400/80 font-bold leading-relaxed">
              Inject this URL directly into the in-game RGS Tool loader field.
            </p>
          </div>
        </div>

        <h2 className="text-[11px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-6">Premium Assets</h2>
        <div className="grid gap-6 flex-1 mb-8">
          {allRgs.map((file) => (
            <div key={file.id} className="p-6 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/60 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest block mb-1">{file.category}</span>
                  <h3 className="font-black text-lg tracking-tight leading-tight dark:text-zinc-100">{file.name}</h3>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest mt-1">GLB PROTOCOL FILE</p>
                </div>
                <button
                  onClick={() => toggleFavorite(file.id)}
                  className={`p-3 rounded-2xl transition-all active:scale-90 ${favorites.includes(file.id) ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/20' : 'bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600'}`}
                >
                  <ICONS.Favorites className="w-5 h-5" fill={favorites.includes(file.id) ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleCopy(file.url)}
                  className="flex-1 py-4 bg-zinc-200 dark:bg-zinc-800/60 rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 border border-zinc-300/40 dark:border-zinc-700/40 dark:text-zinc-300 shadow-sm"
                >
                  {copyFeedback === file.url ? <ICONS.Check className="w-4 h-4" /> : <ICONS.Copy className="w-4 h-4" />}
                  Copy URL
                </button>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-blue-600 text-white rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all active:scale-95 border border-blue-700"
                >
                  <ICONS.Download className="w-4 h-4" />
                  GET
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-2 mt-auto">
        <AdBanner label="RGS Master Sponsor" />
      </div>
    </div>
  );
};

const FavoritesView: React.FC<{ 
  favorites: string[], 
  toggleFavorite: (id: string) => void,
  allCheats: CheatCode[],
  allRgs: RgsFile[]
}> = ({ favorites, toggleFavorite, allCheats, allRgs }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');

  const filteredCheats = useMemo(() => {
    return allCheats.filter(c => favorites.includes(c.id) && (activeCategory === 'all' || c.category === activeCategory));
  }, [favorites, allCheats, activeCategory]);

  const filteredRgs = useMemo(() => {
    return allRgs.filter(r => favorites.includes(r.id) && (activeCategory === 'all' || r.category === activeCategory));
  }, [favorites, allRgs, activeCategory]);

  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    allCheats.filter(c => favorites.includes(c.id)).forEach(c => cats.add(c.category));
    allRgs.filter(r => favorites.includes(r.id)).forEach(r => cats.add(r.category));
    return ['all', ...Array.from(cats)];
  }, [favorites, allCheats, allRgs]);

  return (
    <div className="pb-24 pt-8 flex flex-col min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-6 text-center px-6">
        <h1 className="text-4xl font-black tracking-tighter mb-2 dark:text-white text-glow">The <span className="text-yellow-500">Vault</span></h1>
        <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em]">Archived Plugin Modules</p>
      </header>

      <div className="flex-1 px-6">
        {favorites.length > 0 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-6 mt-4">
            {availableCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105' 
                    : 'bg-zinc-100 dark:bg-zinc-900/60 text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-10">
            <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-[2.5rem] flex items-center justify-center text-4xl mb-6 shadow-inner text-zinc-300 dark:text-zinc-700">⭐</div>
            <h2 className="font-black text-lg mb-2 uppercase tracking-tight dark:text-zinc-200">Vault Empty</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-bold leading-relaxed">Save cheat codes and RGS assets for persistent instant access.</p>
          </div>
        ) : (
          <div className="space-y-10 pb-10">
            {filteredCheats.length > 0 && (
              <section>
                <h2 className="text-[11px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-6">Secured Codes</h2>
                <div className="grid gap-4">
                  {filteredCheats.map(cheat => (
                    <div key={cheat.id} className="p-5 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/60 flex justify-between items-center shadow-sm">
                      <div className="flex-1">
                        <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest block mb-1">{cheat.category}</span>
                        <h3 className="font-black text-sm mb-1 dark:text-zinc-100">{cheat.name}</h3>
                        <p className="text-xl font-black text-blue-600 dark:text-blue-500 tracking-tighter">{cheat.code}</p>
                      </div>
                      <button onClick={() => toggleFavorite(cheat.id)} className="text-red-500 bg-red-500/10 p-3 rounded-2xl border border-red-500/20 active:scale-90 transition-all hover:bg-red-500 hover:text-white">
                        <ICONS.Trash className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {filteredRgs.length > 0 && (
              <section>
                <h2 className="text-[11px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-6">Stored Assets</h2>
                <div className="grid gap-4">
                  {filteredRgs.map(file => (
                    <div key={file.id} className="p-5 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/60 flex justify-between items-center shadow-sm">
                      <div className="flex-1 mr-4">
                        <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest block mb-1">{file.category}</span>
                        <h3 className="font-black text-sm leading-tight dark:text-zinc-100">{file.name}</h3>
                        <p className="text-[9px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest mt-1">ENCRYPTED LINK</p>
                      </div>
                      <button onClick={() => toggleFavorite(file.id)} className="text-red-500 bg-red-500/10 p-3 rounded-2xl border border-red-500/20 active:scale-90 transition-all hover:bg-red-500 hover:text-white">
                        <ICONS.Trash className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      <div className="px-6 pb-2 mt-auto">
        <AdBanner label="The Vault Protected Ad" />
      </div>
    </div>
  );
};

const AiView: React.FC<{ 
  history: ChatMessage[], 
  onSend: (text: string) => void, 
  onClear: () => void,
  onAdminTrigger: () => void 
}> = ({ history, onSend, onClear, onAdminTrigger }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Hidden admin trigger state: 3 fast clicks on trash icon
  const [secretClicks, setSecretClicks] = useState(0);
  const clickTimer = useRef<number | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSecretClick = () => {
    onClear(); 
    setSecretClicks(prev => prev + 1);
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = window.setTimeout(() => {
      setSecretClicks(0);
    }, 400); 
  };

  useEffect(() => {
    if (secretClicks >= 3) {
      onAdminTrigger();
      setSecretClicks(0);
    }
  }, [secretClicks, onAdminTrigger]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    setIsTyping(true);
    onSend(input);
    setInput('');
    setTimeout(() => setIsTyping(false), 2000); 
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] pb-2 pt-6 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight dark:text-white">Neural Hub</h1>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-[0.2em] mt-1">v2 AI Engine Core</p>
        </div>
        <button onClick={handleSecretClick} className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-zinc-500 hover:text-red-500 transition-all shadow-sm">
          <ICONS.Trash className="w-5 h-5" />
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar space-y-6 mb-4 pr-1">
        {history.length === 0 && (
          <div className="text-center py-16 px-8 opacity-40 space-y-6">
            <div className="w-20 h-20 bg-blue-600/10 rounded-[2.5rem] mx-auto flex items-center justify-center border border-blue-500/20 shadow-inner">
              <ICONS.AI className="w-10 h-10 text-blue-600 dark:text-blue-500" />
            </div>
            <p className="text-[11px] font-black leading-relaxed tracking-widest uppercase">System ready. Ask me about codes, mechanics, or game integration.</p>
          </div>
        )}
        {history.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[88%] px-5 py-4 rounded-[1.75rem] text-[13px] font-bold leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-500/30' 
                : 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/60 rounded-tl-none text-zinc-800 dark:text-zinc-200'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-zinc-100 dark:bg-zinc-900 px-5 py-3.5 rounded-[1.75rem] rounded-tl-none text-[10px] font-black uppercase tracking-widest text-zinc-500 animate-pulse border border-zinc-200/50 dark:border-zinc-800/60 shadow-inner">
              Synchronizing...
            </div>
          </div>
        )}
      </div>

      <div className="pb-2">
        <AdBanner label="Neural Partner Ad" />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 pb-4 mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter query..."
          className="flex-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl px-6 py-5 text-sm font-bold focus:ring-2 focus:ring-blue-500/30 outline-none transition-all dark:text-zinc-100 shadow-inner placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
        />
        <button 
          type="submit" 
          disabled={!input.trim() || isTyping}
          className="bg-blue-600 text-white px-6 rounded-2xl disabled:opacity-50 transition-all active:scale-90 shadow-lg shadow-blue-500/30 border border-blue-700"
        >
          <ICONS.ArrowRight className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

const ProfileView: React.FC<{ 
  theme: ThemeMode, 
  onThemeToggle: () => void, 
}> = ({ theme, onThemeToggle }) => {
  const socialLinks = [
    { name: 'YouTube', icon: '▶️', color: 'bg-[#FF0000]', url: 'https://youtube.com/@hkgaminglife-n6d?si=_lUNJS_OhEJlQVl5' },
    { name: 'Instagram', icon: '📸', color: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600', url: 'https://www.instagram.com/hkgaminglife?igsh=MXFrbXdhb3QybG9ueQ==' },
    { name: 'WhatsApp', icon: '📢', color: 'bg-[#25D366]', url: 'https://whatsapp.com/channel/0029Vb6TVN75kg796ZxxLx18' },
    { name: 'TG Channel', icon: '💬', color: 'bg-[#0088cc]', url: 'https://t.me/HKGAMINGLIFE' },
    { name: 'TG Group', icon: '👥', color: 'bg-[#0088cc]', url: 'https://t.me/+_PEIXEftzjM4Y2Q1' },
    { name: 'Discord', icon: '🎮', color: 'bg-[#5865F2]', url: 'https://discord.gg/4vEwWzPbT' },
  ];

  return (
    <div className="pb-24 pt-12 flex flex-col min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-y-auto no-scrollbar max-h-[calc(100vh-64px)]">
      <div className="flex flex-col items-center mb-10 text-center px-8">
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-[3rem] p-1.5 bg-gradient-to-tr from-blue-600 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <div className="w-full h-full rounded-[2.6rem] bg-zinc-900 flex items-center justify-center text-4xl border-4 border-white dark:border-[#050505] shadow-inner">⚙️</div>
          </div>
        </div>
        <h2 className="text-3xl font-black tracking-tight mb-1 dark:text-white text-glow">System Settings</h2>
        <p className="text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-[0.25em]">Plugin Protocol v2.0.4</p>
      </div>

      <div className="flex-1 space-y-10 px-8 mb-8">
        <section>
          <h3 className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.25em] mb-5">Interface Engine</h3>
          <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/50 rounded-[2.5rem] overflow-hidden shadow-sm">
            <button 
              onClick={onThemeToggle}
              className="w-full px-8 py-6 flex items-center justify-between hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors group"
            >
              <div className="flex items-center gap-5 text-left">
                <div className={`w-12 h-12 rounded-[1.25rem] flex items-center justify-center text-xl transition-all shadow-inner ${theme === 'dark' ? 'bg-zinc-800 text-yellow-500 shadow-yellow-500/10' : 'bg-yellow-100 text-yellow-600'}`}>
                  {theme === 'dark' ? '🌙' : '☀️'}
                </div>
                <div>
                  <p className="font-black text-sm tracking-tight dark:text-zinc-100">Visual Engine</p>
                  <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mt-0.5">{theme} Mode</p>
                </div>
              </div>
              <div className={`w-14 h-7 rounded-full transition-all relative p-1 shadow-inner ${theme === 'dark' ? 'bg-blue-600' : 'bg-zinc-200'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all transform ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0'}`} />
              </div>
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.25em] mb-5">Connect with Developer</h3>
          <div className="grid grid-cols-3 gap-3">
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/50 rounded-[2rem] transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                <div className={`w-12 h-12 ${social.color} rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-black/10 transition-transform group-hover:rotate-12`}>
                  {social.icon}
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 text-center">{social.name}</span>
              </a>
            ))}
          </div>
        </section>
      </div>

      <div className="px-8 pb-2 mt-auto">
        <AdBanner label="Configuration Master Ad" />
      </div>
    </div>
  );
};

const AdminPanelView: React.FC<{ 
  onClose: () => void,
  allCheats: CheatCode[],
  allRgs: RgsFile[],
  onAddCheat: (cheat: Omit<CheatCode, 'id'>) => void,
  onAddRgs: (rgs: Omit<RgsFile, 'id'>) => void,
  onRemoveCheat: (id: string) => void,
  onRemoveRgs: (id: string) => void
}> = ({ onClose, allCheats, allRgs, onAddCheat, onAddRgs, onRemoveCheat, onRemoveRgs }) => {
  const [activeForm, setActiveForm] = useState<'add' | 'manage'>('add');
  const [addType, setAddType] = useState<'cheat' | 'rgs'>('cheat');
  const [name, setName] = useState('');
  const [val, setVal] = useState(''); 
  const [cat, setCat] = useState<Category>(Category.BIKES);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !val) return;
    if (addType === 'cheat') {
      onAddCheat({ name, code: val, category: cat });
    } else {
      onAddRgs({ name, url: val, category: cat });
    }
    setName(''); setVal('');
    alert('Entry Injected Successfully!');
  };

  return (
    <div className="pb-24 pt-8 flex flex-col min-h-screen px-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-64px)] overflow-y-auto no-scrollbar">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight dark:text-white">Admin Core</h1>
          <p className="text-[10px] font-bold text-zinc-500 dark:text-blue-400 uppercase tracking-widest mt-1">Direct Database Ingress</p>
        </div>
        <button onClick={onClose} className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-zinc-500 hover:text-red-500 transition-all shadow-sm">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </header>

      <div className="flex gap-2 mb-8">
        <button onClick={() => setActiveForm('add')} className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeForm === 'add' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500'}`}>Inject Data</button>
        <button onClick={() => setActiveForm('manage')} className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeForm === 'manage' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500'}`}>Manage DB</button>
      </div>

      <div className="flex-1">
        {activeForm === 'add' ? (
          <form onSubmit={handleAddSubmit} className="space-y-6">
            <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-2xl mb-4 shadow-inner">
              <button type="button" onClick={() => setAddType('cheat')} className={`flex-1 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${addType === 'cheat' ? 'bg-white dark:bg-zinc-800 dark:text-white shadow-sm' : 'text-zinc-500'}`}>Cheat Code</button>
              <button type="button" onClick={() => setAddType('rgs')} className={`flex-1 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${addType === 'rgs' ? 'bg-white dark:bg-zinc-800 dark:text-white shadow-sm' : 'text-zinc-500'}`}>RGS Asset</button>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-2">Label</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Ferrari F40" className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl px-6 py-5 text-sm font-bold focus:ring-2 focus:ring-blue-500 shadow-inner dark:text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-2">{addType === 'cheat' ? 'Code' : 'URL'}</label>
              <input value={val} onChange={(e) => setVal(e.target.value)} placeholder={addType === 'cheat' ? "9090" : "https://..."} className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl px-6 py-5 text-sm font-bold focus:ring-2 focus:ring-blue-500 shadow-inner dark:text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-2">Target Folder</label>
              <select value={cat} onChange={(e) => setCat(e.target.value as Category)} className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl px-6 py-5 text-sm font-bold focus:ring-2 focus:ring-blue-500 shadow-inner dark:text-white appearance-none">
                {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full py-5 bg-emerald-600 text-white rounded-[1.75rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">Execute Ingress</button>
          </form>
        ) : (
          <div className="space-y-8 pb-10">
            <section>
              <h2 className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Active Cheats ({allCheats.length})</h2>
              <div className="space-y-3">
                {allCheats.map(cheat => (
                  <div key={cheat.id} className="p-4 bg-zinc-100 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl flex justify-between items-center group shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
                    <div className="min-w-0 pr-4">
                      <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest">{cheat.category}</p>
                      <p className="font-black text-sm truncate dark:text-white">{cheat.name}</p>
                      <p className="text-[10px] font-bold text-zinc-500 tracking-tighter">Code: {cheat.code}</p>
                    </div>
                    <button onClick={() => onRemoveCheat(cheat.id)} className="p-3 bg-red-600/10 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all border border-red-600/20 shadow-sm"><ICONS.Trash className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Active RGS Assets ({allRgs.length})</h2>
              <div className="space-y-3">
                {allRgs.map(rgs => (
                  <div key={rgs.id} className="p-4 bg-zinc-100 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl flex justify-between items-center group shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
                    <div className="min-w-0 pr-4">
                      <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">{rgs.category}</p>
                      <p className="font-black text-sm truncate dark:text-white">{rgs.name}</p>
                    </div>
                    <button onClick={() => onRemoveRgs(rgs.id)} className="p-3 bg-red-600/10 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all border border-red-600/20 shadow-sm"><ICONS.Trash className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      <div className="pb-2 mt-auto">
        <AdBanner label="Admin Internal Ad" />
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState<ThemeMode>(() => (localStorage.getItem('ibd3d_theme') as ThemeMode) || 'dark');
  const [favorites, setFavorites] = useState<string[]>(() => JSON.parse(localStorage.getItem('ibd3d_favorites') || '[]'));
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => JSON.parse(localStorage.getItem('ibd3d_chat') || '[]'));

  // Database State
  const [allCheats, setAllCheats] = useState<CheatCode[]>(() => {
    const saved = localStorage.getItem('ibd3d_db_cheats');
    return saved ? JSON.parse(saved) : CHEATS_DATA;
  });
  const [allRgs, setAllRgs] = useState<RgsFile[]>(() => {
    const saved = localStorage.getItem('ibd3d_db_rgs');
    return saved ? JSON.parse(saved) : RGS_FILES_DATA;
  });

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('ibd3d_theme', theme);
  }, [theme]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('ibd3d_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const addCheat = (cheat: Omit<CheatCode, 'id'>) => {
    const newCheat = { ...cheat, id: 'c_' + Date.now() };
    setAllCheats(prev => {
      const next = [newCheat, ...prev];
      localStorage.setItem('ibd3d_db_cheats', JSON.stringify(next));
      return next;
    });
  };

  const removeCheat = (id: string) => {
    setAllCheats(prev => {
      const next = prev.filter(c => c.id !== id);
      localStorage.setItem('ibd3d_db_cheats', JSON.stringify(next));
      return next;
    });
    setFavorites(prev => prev.filter(f => f !== id));
  };

  const addRgs = (rgs: Omit<RgsFile, 'id'>) => {
    const newRgs = { ...rgs, id: 'r_' + Date.now() };
    setAllRgs(prev => {
      const next = [newRgs, ...prev];
      localStorage.setItem('ibd3d_db_rgs', JSON.stringify(next));
      return next;
    });
  };

  const removeRgs = (id: string) => {
    setAllRgs(prev => {
      const next = prev.filter(r => r.id !== id);
      localStorage.setItem('ibd3d_db_rgs', JSON.stringify(next));
      return next;
    });
    setFavorites(prev => prev.filter(f => f !== id));
  };

  const handleSendAiMessage = async (text: string) => {
    const userMsg: ChatMessage = { role: 'user', text, timestamp: Date.now() };
    setChatHistory(prev => {
      const updated = [...prev, userMsg];
      localStorage.setItem('ibd3d_chat', JSON.stringify(updated));
      return updated;
    });

    const geminiHistory = chatHistory.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await chatWithGemini(text, geminiHistory);
    const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
    
    setChatHistory(prev => {
      const updated = [...prev, aiMsg];
      localStorage.setItem('ibd3d_chat', JSON.stringify(updated));
      return updated;
    });
  };

  const renderView = () => {
    if (activeTab === 'admin') {
      return (
        <AdminPanelView 
          onClose={() => setActiveTab('home')} 
          allCheats={allCheats}
          allRgs={allRgs}
          onAddCheat={addCheat} 
          onAddRgs={addRgs} 
          onRemoveCheat={removeCheat}
          onRemoveRgs={removeRgs}
        />
      );
    }

    if (activeTab.startsWith('category_')) {
      const cat = activeTab.replace('category_', '') as Category;
      if (cat === Category.RGS) {
        return <RgsView favorites={favorites} toggleFavorite={toggleFavorite} allRgs={allRgs} />;
      }
      return (
        <CheatsView 
          initialCategory={cat} 
          favorites={favorites} 
          toggleFavorite={toggleFavorite} 
          allCheats={allCheats}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomeView 
            onCategorySelect={(c) => setActiveTab(c === 'all' ? 'cheats' : `category_${c}`)} 
            hasCustomData={allCheats.length > CHEATS_DATA.length || allRgs.length > RGS_FILES_DATA.length}
          />
        );
      case 'cheats':
        return <CheatsView initialCategory="all" favorites={favorites} toggleFavorite={toggleFavorite} allCheats={allCheats} />;
      case 'favorites':
        return <FavoritesView favorites={favorites} toggleFavorite={toggleFavorite} allCheats={allCheats} allRgs={allRgs} />;
      case 'ai':
        return <AiView history={chatHistory} onSend={handleSendAiMessage} onClear={() => { setChatHistory([]); localStorage.removeItem('ibd3d_chat'); }} onAdminTrigger={() => setActiveTab('admin')} />;
      case 'profile':
        return <ProfileView theme={theme} onThemeToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />;
      default:
        return <HomeView onCategorySelect={(c) => setActiveTab(c === 'all' ? 'cheats' : `category_${c}`)} hasCustomData={false} />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme === 'dark' ? 'dark bg-[#050505] text-zinc-100' : 'bg-white text-zinc-900'}`}>
      <main className="max-w-md mx-auto relative min-h-screen shadow-2xl overflow-hidden bg-inherit">
        {(activeTab.startsWith('category_') || activeTab === 'admin') && (
          <div className="px-6 pt-8 flex items-center gap-5 sticky top-0 bg-inherit glass z-50 pb-4 border-b border-zinc-200/40 dark:border-zinc-800/40 transition-all">
            <button 
              onClick={() => setActiveTab('home')}
              className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900/80 rounded-[1.25rem] flex items-center justify-center transition-transform active:scale-90 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm"
            >
              <svg className="w-6 h-6 dark:text-zinc-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div>
              <h2 className="text-xl font-black tracking-tight dark:text-white">
                {activeTab === 'admin' ? 'Database Core' : activeTab.replace('category_', '')}
              </h2>
              <p className="text-[9px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest">
                {activeTab === 'admin' ? 'Root Access' : 'Active Module'}
              </p>
            </div>
          </div>
        )}

        {renderView()}
        
        <BottomNav activeTab={(activeTab.startsWith('category_') || activeTab === 'admin') ? 'home' : activeTab} setActiveTab={setActiveTab} />
      </main>
    </div>
  );
}
