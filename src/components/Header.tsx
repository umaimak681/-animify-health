import React, { useState, useEffect } from 'react';
import { 
  Search, Bookmark, DollarSign, Sun, Moon, Globe, 
  TrendingUp, Link2, Menu, X, Mail, ShieldCheck, ArrowRight
} from 'lucide-react';
import { useAdSense } from '../context/AdSenseContext';
import { useTheme } from '../context/ThemeContext';
import { Category } from '../types/blog';

interface HeaderProps {
  currentCategory: string;
  onSelectCategory: (cat: string) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenSearch: () => void;
  currentRegion: 'US' | 'UK' | 'All';
  onChangeRegion: (region: 'US' | 'UK' | 'All') => void;
  onOpenBacklinks: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  savedCount,
  onOpenSaved,
  onOpenSearch,
  currentRegion,
  onChangeRegion,
  onOpenBacklinks,
}) => {
  const { setIsConfigModalOpen, isAdSenseConfigured } = useAdSense();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories: { id: Category; label: string }[] = [
    { id: 'All', label: 'All Research' },
    { id: 'Longevity & Biohacking', label: 'Longevity & Fasting' },
    { id: 'Nutrition & Gut Health', label: 'Nutrition & Gut' },
    { id: 'Mental Health & Neuroscience', label: 'Neuro & Mind' },
    { id: 'Sleep Science & Recovery', label: 'Sleep & Recovery' },
    { id: 'Fitness & Metabolic Health', label: 'Fitness & VO2 Max' },
    { id: 'Preventative Medicine', label: 'Preventative Health' },
  ];

  return (
    <div className="w-full relative z-40">
      {/* 1. Top Editorial Utility Strip */}
      <aside 
        aria-label="Editorial announcement and region switcher"
        className="w-full bg-[#05080e] light:bg-slate-100 border-b border-slate-800/80 light:border-slate-200 text-[11px] font-mono text-slate-400 light:text-slate-600 px-2.5 sm:px-6 py-1 sm:py-1.5 transition-colors"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap min-w-0 flex-1">
            <span className="flex items-center gap-1.5 text-emerald-400 light:text-emerald-600 font-semibold tracking-wider uppercase shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <TrendingUp className="w-3 h-3" />
              <span>Trending:</span>
            </span>
            <span className="text-slate-300 light:text-slate-700 truncate text-[11px]">
              16/8 Autophagy Protocols · Vagus Nerve Downregulation · Zone 2 Cardio VO2 Max · Gut-Brain Microbiome
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center gap-1 text-[11px]">
              <Globe className="w-3 h-3 text-slate-500 shrink-0" />
              <button
                type="button"
                onClick={() => onChangeRegion('US')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  currentRegion === 'US'
                    ? 'text-emerald-400 light:text-emerald-700 font-bold bg-emerald-500/15'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                US
              </button>
              <span className="text-slate-700">/</span>
              <button
                type="button"
                onClick={() => onChangeRegion('UK')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  currentRegion === 'UK'
                    ? 'text-emerald-400 light:text-emerald-700 font-bold bg-emerald-500/15'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                UK
              </button>
              <span className="text-slate-700">/</span>
              <button
                type="button"
                onClick={() => onChangeRegion('All')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  currentRegion === 'All'
                    ? 'text-emerald-400 light:text-emerald-700 font-bold bg-emerald-500/15'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Global
              </button>
            </div>

            <a
              href="mailto:info@animify.click"
              className="inline-flex items-center gap-1 text-emerald-400 light:text-emerald-600 hover:text-emerald-300 text-[11px] font-medium"
            >
              <Mail className="w-3 h-3 shrink-0" />
              <span className="font-semibold">info@animify.click</span>
            </a>
          </div>
        </div>
      </aside>

      {/* 2. Main Sticky Navigation Header */}
      <header 
        className={`w-full sticky top-0 z-40 transition-shadow duration-200 ${
          isScrolled ? 'shadow-xl shadow-black/25' : ''
        }`}
      >
        <div className="w-full bg-[#0b0f17]/95 light:bg-white/95 backdrop-blur-md border-b border-slate-800/80 light:border-slate-200 py-2 sm:py-3 px-2.5 sm:px-6 transition-colors">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Logo */}
            <div className="flex items-center min-w-0 shrink-0">
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('All');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group text-left flex flex-col focus:outline-none"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-display font-extrabold tracking-tight text-slate-100 light:text-slate-900 group-hover:text-emerald-400 transition-colors uppercase text-base sm:text-xl md:text-2xl whitespace-nowrap">
                    Animify Health
                  </span>
                  <span className="hidden sm:inline-flex text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shrink-0">
                    animify.click
                  </span>
                </div>
              </button>
            </div>

            {/* Actions: No overlap */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800/80 border border-slate-800 transition-colors shrink-0"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>

              {/* Search */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800/80 border border-slate-800 transition-colors shrink-0"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Bookmarks */}
              <button
                type="button"
                onClick={onOpenSaved}
                className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800/80 border border-slate-800 transition-colors shrink-0"
                aria-label="Bookmarks"
              >
                <Bookmark className="w-4 h-4" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[15px] h-3.5 px-1 bg-emerald-500 text-slate-950 font-bold rounded-full text-[9px] flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </button>

              {/* Menu */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center lg:hidden text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 border border-slate-800 transition-colors shrink-0"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Category Bar */}
        <div className="w-full bg-[#070b12]/95 light:bg-slate-50/95 backdrop-blur-md border-b border-slate-800/70 light:border-slate-200 px-2.5 sm:px-6 transition-colors">
          <nav 
            className="max-w-7xl mx-auto flex items-center justify-start lg:justify-center gap-1 sm:gap-2 py-1.5 sm:py-2 text-xs font-medium overflow-x-auto no-scrollbar scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {categories.map((cat) => {
              const isActive = currentCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg whitespace-nowrap transition-all shrink-0 text-xs font-medium ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* 3. Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[90px] sm:top-[105px] z-50 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0b0f17] light:bg-white border-b border-slate-800 light:border-slate-200 px-4 py-5 shadow-2xl max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="max-w-md mx-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-display font-extrabold uppercase text-slate-100 text-sm">
                  Animify Health
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  animify.click
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-2 font-semibold">
                  Clinical Research Pillars
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`p-2.5 rounded-lg border text-left font-medium transition-colors ${
                        currentCategory === cat.id
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 font-bold'
                          : 'border-slate-800 text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2 text-xs">
                <a
                  href="mailto:info@animify.click"
                  className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between text-emerald-400"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>Contact Editorial: <strong>info@animify.click</strong></span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
