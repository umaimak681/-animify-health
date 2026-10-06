import React, { useState, useEffect } from 'react';
import { 
  Search, Bookmark, DollarSign, Sun, Moon, Globe, 
  TrendingUp, Link2, Menu, X, Mail, ShieldCheck, ArrowRight,
  Sparkles
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

  // Smooth scroll listener without causing layout jumps or oscillation
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
      {/* 1. Top Editorial Utility Strip (Flows naturally on top, clean info across US & UK) */}
      <aside 
        aria-label="Editorial announcement and region switcher"
        className="w-full bg-[#05080e] light:bg-slate-100 border-b border-slate-800/80 light:border-slate-200 text-[11px] font-mono text-slate-400 light:text-slate-600 px-3 sm:px-6 py-1.5 transition-colors"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Trending Topics Ticker (Desktop / Tablet) */}
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
              16/8 Autophagy Protocols · Vagus Nerve Downregulation · Zone 2 Cardio VO2 Max · Gut-Brain Microbiome · ApoB vs LDL-C
            </span>
          </div>

          {/* Regional Edition Switcher + Contact Email + Citations */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 shrink-0">
            {/* Edition Switcher */}
            <div className="flex items-center gap-1 text-[11px]">
              <Globe className="w-3 h-3 text-slate-500 shrink-0" />
              <span className="text-slate-500">Edition:</span>
              <button
                type="button"
                onClick={() => onChangeRegion('US')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  currentRegion === 'US'
                    ? 'text-emerald-400 light:text-emerald-700 font-bold bg-emerald-500/15 light:bg-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900'
                }`}
                title="Filter for United States medical consensus"
              >
                US
              </button>
              <span className="text-slate-700 light:text-slate-300">/</span>
              <button
                type="button"
                onClick={() => onChangeRegion('UK')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  currentRegion === 'UK'
                    ? 'text-emerald-400 light:text-emerald-700 font-bold bg-emerald-500/15 light:bg-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900'
                }`}
                title="Filter for UK NHS & NICE guidelines"
              >
                UK
              </button>
              <span className="text-slate-700 light:text-slate-300">/</span>
              <button
                type="button"
                onClick={() => onChangeRegion('All')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  currentRegion === 'All'
                    ? 'text-emerald-400 light:text-emerald-700 font-bold bg-emerald-500/15 light:bg-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900'
                }`}
                title="View global international research"
              >
                Global
              </button>
            </div>

            {/* Official Contact Email */}
            <a
              href="mailto:info@animify.click"
              className="inline-flex items-center gap-1.5 text-emerald-400 light:text-emerald-600 hover:text-emerald-300 light:hover:text-emerald-700 transition-colors text-[11px] font-medium"
              title="Direct contact with editorial desk: info@animify.click"
            >
              <Mail className="w-3 h-3 text-emerald-400 light:text-emerald-600 shrink-0" />
              <span className="font-semibold">info@animify.click</span>
            </a>

            {/* Peer-Reviewed Backlinks Link */}
            <button
              type="button"
              onClick={onOpenBacklinks}
              className="hidden lg:inline-flex items-center gap-1 text-slate-400 light:text-slate-600 hover:text-emerald-400 light:hover:text-emerald-600 font-medium transition-colors"
              title="Verified Medical Authority Backlinks & Citations"
            >
              <Link2 className="w-3 h-3 text-emerald-400 light:text-emerald-600" />
              <span>Citations</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Main Sticky Navigation Header (Smooth, fixed, zero layout shifts) */}
      <header 
        className={`w-full sticky top-0 z-40 transition-shadow duration-200 ${
          isScrolled 
            ? 'shadow-xl shadow-black/25 light:shadow-slate-300/40' 
            : ''
        }`}
      >
        {/* Main Brand & Action Bar */}
        <div className="w-full bg-[#0b0f17]/95 light:bg-white/95 backdrop-blur-md border-b border-slate-800/80 light:border-slate-200 py-2.5 sm:py-3 px-3 sm:px-6 transition-colors">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            {/* Masthead Brand Logo (Never cuts off, fully responsive across 320px - 1920px) */}
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('All');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group text-left flex flex-col focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold tracking-tight text-slate-100 light:text-slate-900 group-hover:text-emerald-400 light:group-hover:text-emerald-600 transition-colors uppercase text-lg sm:text-2xl whitespace-nowrap">
                    Animify Health
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 light:bg-emerald-500/15 text-emerald-400 light:text-emerald-700 border border-emerald-500/25 shrink-0">
                    animify.click
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-400 light:text-slate-500 font-sans tracking-wide hidden md:block">
                  Evidence-Based Longevity Science, Neuroscience & Preventative Medicine
                </p>
              </button>
            </div>

            {/* Quick Header Tools & Navigation Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Direct email quick badge (Visible on md+ screens) */}
              <a
                href="mailto:info@animify.click"
                className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 light:bg-emerald-50 text-emerald-400 light:text-emerald-700 border border-emerald-500/20 light:border-emerald-200 text-xs font-mono hover:bg-emerald-500/20 transition-colors"
                title="Contact Editorial Desk"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>info@animify.click</span>
              </a>

              {/* Theme Toggle (Dark / Light) */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 text-slate-400 hover:text-slate-100 light:text-slate-600 light:hover:text-slate-900 rounded-lg hover:bg-slate-800/80 light:hover:bg-slate-100 border border-slate-800 light:border-slate-200 transition-colors"
                title={theme === 'dark' ? 'Switch to Light Editorial mode' : 'Switch to Dark Midnight mode'}
                aria-label="Toggle dark/light theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>

              {/* Search Modal Trigger */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="p-2 text-slate-400 hover:text-slate-100 light:text-slate-600 light:hover:text-slate-900 rounded-lg hover:bg-slate-800/80 light:hover:bg-slate-100 border border-slate-800 light:border-slate-200 transition-colors"
                title="Search health & longevity articles"
                aria-label="Search articles"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Saved Articles / Bookmarks */}
              <button
                type="button"
                onClick={onOpenSaved}
                className="relative p-2 text-slate-400 hover:text-slate-100 light:text-slate-600 light:hover:text-slate-900 rounded-lg hover:bg-slate-800/80 light:hover:bg-slate-100 border border-slate-800 light:border-slate-200 transition-colors"
                title="Saved reading list"
                aria-label="Saved reading list"
              >
                <Bookmark className="w-4 h-4" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-emerald-500 text-slate-950 font-bold rounded-full text-[10px] flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </button>

              {/* Google AdSense Configuration (Desktop) */}
              <button
                type="button"
                onClick={() => setIsConfigModalOpen(true)}
                className="hidden sm:inline-flex px-2.5 py-1.5 text-xs font-medium text-slate-200 light:text-slate-800 bg-slate-900/90 light:bg-slate-100 hover:bg-slate-800 light:hover:bg-slate-200 border border-slate-700/70 light:border-slate-300 rounded-lg transition-colors items-center gap-1.5 whitespace-nowrap"
                title="Google AdSense Configuration"
              >
                <DollarSign className="w-3.5 h-3.5 text-emerald-400 light:text-emerald-600" />
                <span>AdSense</span>
                {isAdSenseConfigured ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 light:bg-emerald-600 animate-pulse" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 light:bg-amber-600" />
                )}
              </button>

              {/* Mobile / Tablet Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-300 light:text-slate-700 hover:text-white rounded-lg hover:bg-slate-800 light:hover:bg-slate-100 border border-slate-800 light:border-slate-200 transition-colors relative"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 text-emerald-400 light:text-emerald-600" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated Persistent Category Bar (Always accessible, smooth horizontal scroll) */}
        <div className="w-full bg-[#070b12]/95 light:bg-slate-50/95 backdrop-blur-md border-b border-slate-800/70 light:border-slate-200 px-3 sm:px-6 transition-colors">
          <nav 
            aria-label="Health and longevity research categories"
            className="max-w-7xl mx-auto flex items-center justify-start lg:justify-center gap-1.5 sm:gap-2 py-2 text-xs font-medium overflow-x-auto no-scrollbar"
          >
            {categories.map((cat) => {
              const isActive = currentCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all shrink-0 text-xs font-medium ${
                    isActive
                      ? 'bg-emerald-500/20 light:bg-emerald-500/25 text-emerald-400 light:text-emerald-800 font-bold border border-emerald-500/40 light:border-emerald-500/60 shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 light:text-slate-600 light:hover:text-slate-900 light:hover:bg-slate-200/70 border border-transparent'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* 3. Mobile Navigation Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[110px] sm:top-[120px] bottom-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0b0f17] light:bg-white border-b border-slate-800 light:border-slate-200 px-4 py-5 shadow-2xl max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="max-w-md mx-auto space-y-4">
              {/* Category Pillars */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 light:text-slate-400 block mb-2 font-semibold">
                  Clinical Research Pillars
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {categories.map((cat) => {
                    const isActive = currentCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          onSelectCategory(cat.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`p-2.5 rounded-lg border text-left font-medium transition-colors ${
                          isActive
                            ? 'bg-emerald-500/20 light:bg-emerald-50 border-emerald-500/40 light:border-emerald-500 text-emerald-400 light:text-emerald-700 font-bold'
                            : 'border-slate-800 light:border-slate-200 text-slate-300 light:text-slate-700 hover:bg-slate-900 light:hover:bg-slate-50'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions (Saved Articles & AdSense) */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 light:border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    onOpenSaved();
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-lg bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-200 flex items-center justify-between text-xs text-slate-300 light:text-slate-700 hover:text-emerald-400"
                >
                  <span className="flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5 text-emerald-400 light:text-emerald-600" />
                    <span>Bookmarks</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold text-[10px]">
                    {savedCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsConfigModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-lg bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-200 flex items-center justify-between text-xs text-slate-300 light:text-slate-700 hover:text-emerald-400"
                >
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400 light:text-emerald-600" />
                    <span>AdSense</span>
                  </span>
                  <span className={`w-2 h-2 rounded-full ${isAdSenseConfigured ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                </button>
              </div>

              {/* Regional Edition Selection */}
              <div className="pt-3 border-t border-slate-800/80 light:border-slate-200 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 light:text-slate-600">Edition:</span>
                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      onChangeRegion('US');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-medium ${
                      currentRegion === 'US' 
                        ? 'bg-emerald-500 text-slate-950 font-bold' 
                        : 'text-slate-400 light:text-slate-600 hover:text-slate-100'
                    }`}
                  >
                    US Edition
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onChangeRegion('UK');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-medium ${
                      currentRegion === 'UK' 
                        ? 'bg-emerald-500 text-slate-950 font-bold' 
                        : 'text-slate-400 light:text-slate-600 hover:text-slate-100'
                    }`}
                  >
                    UK Edition
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onChangeRegion('All');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-medium ${
                      currentRegion === 'All' 
                        ? 'bg-emerald-500 text-slate-950 font-bold' 
                        : 'text-slate-400 light:text-slate-600 hover:text-slate-100'
                    }`}
                  >
                    Global
                  </button>
                </div>
              </div>

              {/* Direct Inquiries & Citations */}
              <div className="pt-3 border-t border-slate-800/80 light:border-slate-200 flex flex-col gap-2 text-xs">
                <a
                  href="mailto:info@animify.click"
                  className="p-3 rounded-lg bg-emerald-500/10 light:bg-emerald-50 border border-emerald-500/25 light:border-emerald-200 flex items-center justify-between text-emerald-400 light:text-emerald-700"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-400 light:text-emerald-600" />
                    <span>Contact Editorial: <strong>info@animify.click</strong></span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    onOpenBacklinks();
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-lg bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-200 flex items-center justify-between text-slate-300 light:text-slate-700 hover:text-emerald-400 text-left"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 light:text-emerald-600" />
                    <span>Peer-Reviewed Citations & Backlinks</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
