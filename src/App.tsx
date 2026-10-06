/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BLOG_POSTS } from './data/posts';
import { BlogPost, Category } from './types/blog';
import { ThemeProvider } from './context/ThemeContext';
import { AdSenseProvider } from './context/AdSenseContext';
import { Header } from './components/Header';
import { LeadHero } from './components/LeadHero';
import { SecondaryFeatures } from './components/SecondaryFeatures';
import { ArticleCard } from './components/ArticleCard';
import { ArticleReader } from './components/ArticleReader';
import { AdSenseBanner } from './components/AdSenseBanner';
import { AdSenseConfigModal } from './components/AdSenseConfigModal';
import { LegalModal, LegalTab } from './components/LegalModal';
import { SeasonalRadar } from './components/SeasonalRadar';
import { SearchModal } from './components/SearchModal';
import { SavedArticlesModal } from './components/SavedArticlesModal';
import { NewsletterModal } from './components/NewsletterModal';
import { BacklinksDirectory } from './components/BacklinksDirectory';
import { AmbientAudioPlayer } from './components/AmbientAudioPlayer';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { Footer } from './components/Footer';
import { 
  Calendar, Mail, ShieldCheck, ArrowUpRight, Globe, 
  Sparkles, Award, CheckCircle2, TrendingUp 
} from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [currentRegion, setCurrentRegion] = useState<'US' | 'UK' | 'All'>('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [savedPostIds, setSavedPostIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('animify_saved_articles');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['intermittent-fasting-autophagy-protocol', 'gut-brain-axis-microbiome-mental-health'];
  });

  // Modal controls
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTab>('privacy');
  const [isRadarOpen, setIsRadarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isBacklinksOpen, setIsBacklinksOpen] = useState(false);

  // Toggle Bookmark
  const toggleSaveArticle = (postId: string) => {
    setSavedPostIds(prev => {
      const updated = prev.includes(postId) 
        ? prev.filter(id => id !== postId) 
        : [...prev, postId];
      try {
        localStorage.setItem('animify_saved_articles', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const clearAllSaved = () => {
    setSavedPostIds([]);
    try {
      localStorage.removeItem('animify_saved_articles');
    } catch {
      // ignore
    }
  };

  const openLegalTab = (tab: LegalTab) => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  // Filter posts by category and regional edition
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesRegion = 
      currentRegion === 'All' ||
      post.targetRegion === currentRegion ||
      post.targetRegion === 'US & UK' ||
      post.targetRegion === 'Global';

    return matchesCategory && matchesRegion;
  });

  const leadPost = filteredPosts.find(p => p.featuredTier === 'lead') || filteredPosts[0] || BLOG_POSTS[0];
  const secondaryPosts = filteredPosts.filter(p => p.featuredTier === 'secondary' && p.id !== leadPost.id);
  const regularPosts = filteredPosts.filter(p => p.id !== leadPost.id && !secondaryPosts.some(sp => sp.id === p.id));

  // Scroll to top on reading an article
  const handleReadPost = (post: BlogPost) => {
    setActivePost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <AdSenseProvider>
        <div className="min-h-screen bg-[#0b0f17] light:bg-[#f8fafc] text-slate-100 light:text-slate-900 flex flex-col selection:bg-sky-500 selection:text-slate-950 font-sans transition-colors">
          {/* Universal Top Bar (Shown on magazine feed; article reader uses focused sticky reading bar) */}
          {!activePost && (
            <Header
              currentCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat as Category);
                setActivePost(null);
              }}
              savedCount={savedPostIds.length}
              onOpenSaved={() => setIsSavedModalOpen(true)}
              onOpenSearch={() => setIsSearchOpen(true)}
              currentRegion={currentRegion}
              onChangeRegion={(reg) => setCurrentRegion(reg)}
              onOpenBacklinks={() => setIsBacklinksOpen(true)}
            />
          )}

          {/* Dynamic Route: Article Reader or Home Magazine Feed */}
          {activePost ? (
            <ArticleReader
              post={activePost}
              allPosts={BLOG_POSTS}
              onBack={() => setActivePost(null)}
              onSelectPost={handleReadPost}
              isSaved={savedPostIds.includes(activePost.id)}
              onToggleSave={toggleSaveArticle}
            />
          ) : (
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6 pb-20">
              {/* Regional Edition Announcement Strip */}
              {currentRegion !== 'All' && (
                <div className="mb-6 p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>
                      Filtered for <strong>{currentRegion === 'US' ? 'United States Edition (US Clinical Consensus)' : 'United Kingdom Edition (NHS & NICE Guidelines)'}</strong>. Showing region-specific preventative medicine and longevity protocols.
                    </span>
                  </div>
                  <button
                    onClick={() => setCurrentRegion('All')}
                    className="underline hover:text-sky-300"
                  >
                    Reset to Global
                  </button>
                </div>
              )}

              {/* Top Leaderboard AdSense Slot (Compliant 728x90) */}
              <AdSenseBanner slotType="header-leaderboard" />

              {/* Salience Tier 1: Lead Magazine Cover Story */}
              {selectedCategory === 'All' && leadPost && (
                <LeadHero
                  post={leadPost}
                  onReadPost={handleReadPost}
                  isSaved={savedPostIds.includes(leadPost.id)}
                  onToggleSave={toggleSaveArticle}
                />
              )}

              {/* Salience Tier 2: Secondary Curated Features */}
              {selectedCategory === 'All' && secondaryPosts.length > 0 && (
                <SecondaryFeatures
                  posts={secondaryPosts}
                  onReadPost={handleReadPost}
                  savedPostIds={savedPostIds}
                  onToggleSave={toggleSaveArticle}
                />
              )}

              {/* In-Feed Responsive AdSense Slot */}
              <AdSenseBanner slotType="in-article" className="my-8" />

              {/* Category Segmented Bar & Header */}
              <div className="my-8 pt-4 border-t border-slate-800/80 light:border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 block">
                    Curated Clinical Departments
                  </span>
                  <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-100 light:text-slate-900">
                    {selectedCategory === 'All' ? 'Latest Longevity Research & Clinical Protocols' : `${selectedCategory}`}
                  </h2>
                </div>

                {/* Functional Segmented Filter Buttons */}
                <div className="flex items-center gap-1 p-1 bg-slate-950/80 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-lg overflow-x-auto">
                  {(['All', 'Longevity & Biohacking', 'Nutrition & Gut Health', 'Mental Health & Neuroscience', 'Sleep Science & Recovery', 'Fitness & Metabolic Health', 'Preventative Medicine'] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                        selectedCategory === cat
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-900'
                      }`}
                    >
                      {cat === 'All' ? 'All Research' : cat.split('&')[0].trim()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Health & Longevity Lab Interactive Banner */}
              <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-sky-950/70 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg hover:border-emerald-500/50 transition-all">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold font-display text-slate-100">
                        Interactive Longevity & Biomarker Lab
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Live Calculators
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans mt-0.5">
                      Calculate your personalized Zone 2 heart rate range, 16/8 autophagy phases, 90-min sleep cycles, and daily electrolyte targets.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsRadarOpen(true)}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5"
                >
                  <span>Launch Health Lab</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Salience Tier 3: Department Article Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map(post => (
                  <ArticleCard
                    key={post.id}
                    post={post}
                    onReadPost={handleReadPost}
                    isSaved={savedPostIds.includes(post.id)}
                    onToggleSave={toggleSaveArticle}
                  />
                ))}
              </div>

              {/* On-Page SEO Authority Backlinks & Citations Showcase (Key for Google E-E-A-T Ranking) */}
              <section className="mt-16 p-6 sm:p-8 rounded-2xl bg-slate-950/80 light:bg-slate-100/80 border border-slate-800 light:border-slate-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800 light:border-slate-300">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Editorial Authority & Evidence Network</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-slate-100 light:text-slate-900">
                      Authoritative Citations & Research Backlinks
                    </h3>
                    <p className="text-xs text-slate-400 light:text-slate-600 font-sans mt-0.5">
                      Animify Lifestyle articles are cross-referenced with primary peer-reviewed medical journals, government standards, and cultural institutions across the United States and the United Kingdom.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsBacklinksOpen(true)}
                    className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 rounded-lg text-xs font-mono font-bold transition-colors inline-flex items-center gap-1.5 self-start md:self-auto shrink-0"
                  >
                    <span>Full Backlink Index</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Prominent Backlinks Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase">Nobel Prize · Autophagy</span>
                    <a
                      href="https://www.nobelprize.org/prizes/medicine/2016/ohsumi/facts/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-slate-200 light:text-slate-800 hover:text-emerald-400 flex items-center gap-1 block"
                    >
                      <span>Karolinska Institutet</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <p className="text-[11px] text-slate-400 light:text-slate-500">
                      Nobel Prize documentation on lysosomal cellular degradation and renewal.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-mono text-sky-400 uppercase">Cardiology · VO2 Max</span>
                    <a
                      href="https://www.mayoclinicproceedings.org/article/S0025-6196(18)30788-8/fulltext"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-slate-200 light:text-slate-800 hover:text-sky-400 flex items-center gap-1 block"
                    >
                      <span>Mayo Clinic Proceedings</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <p className="text-[11px] text-slate-400 light:text-slate-500">
                      Cohort analysis on cardiorespiratory fitness and long-term survival.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-mono text-teal-400 uppercase">Microbiome · Immunology</span>
                    <a
                      href="https://med.stanford.edu/news/all-news/2021/07/fermented-food-diet-increases-microbiome-diversity-lowers-inflammation.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-slate-200 light:text-slate-800 hover:text-teal-400 flex items-center gap-1 block"
                    >
                      <span>Stanford School of Medicine</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <p className="text-[11px] text-slate-400 light:text-slate-500">
                      Clinical trial proving fermented foods suppress inflammatory cytokines.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase">Sleep · Glymphatics</span>
                    <a
                      href="https://www.nih.gov/news-events/nih-research-matters/how-sleep-clears-brain"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-slate-200 light:text-slate-800 hover:text-indigo-400 flex items-center gap-1 block"
                    >
                      <span>National Institutes of Health (NIH)</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <p className="text-[11px] text-slate-400 light:text-slate-500">
                      Discovery of hydrodynamic cerebral cleansing during slow-wave deep sleep.
                    </p>
                  </div>
                </div>
              </section>

              {/* Newsletter & Dispatch Banner */}
              <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-[#0b0f17] light:from-white light:via-slate-50 light:to-slate-100 border border-slate-800 light:border-slate-300 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-emerald-400">
                    <Mail className="w-4 h-4" />
                    <span>The Animify Longevity & Health Dispatch</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-100 light:text-slate-900">
                    Evidence-Based Longevity Protocols Delivered Every Sunday
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 max-w-xl font-sans">
                    Join over 65,000 physicians, biohackers, and conscious individuals in Boston, London, and New York receiving our weekly breakdown of metabolic science, neurobiology, and clinical studies.
                  </p>
                </div>
                <button
                  onClick={() => setIsNewsletterOpen(true)}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shrink-0"
                >
                  Subscribe to Dispatch
                </button>
              </div>

              {/* Bottom Large Leaderboard AdSense Placement */}
              <AdSenseBanner slotType="footer-banner" className="mt-12" />
            </main>
          )}

          {/* Compliant AdSense & Institutional Footer */}
          <Footer
            onOpenLegal={openLegalTab}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat as Category);
              setActivePost(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenRadar={() => setIsRadarOpen(true)}
            onOpenNewsletter={() => setIsNewsletterOpen(true)}
          />

          {/* Global Modals */}
          <AdSenseConfigModal />
          <LegalModal
            initialTab={legalModalTab}
            isOpen={isLegalModalOpen}
            onClose={() => setIsLegalModalOpen(false)}
          />
          <SeasonalRadar
            isOpen={isRadarOpen}
            onClose={() => setIsRadarOpen(false)}
          />
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            posts={BLOG_POSTS}
            onSelectPost={handleReadPost}
          />
          <SavedArticlesModal
            isOpen={isSavedModalOpen}
            onClose={() => setIsSavedModalOpen(false)}
            savedPostIds={savedPostIds}
            posts={BLOG_POSTS}
            onSelectPost={handleReadPost}
            onRemoveSave={toggleSaveArticle}
            onClearAll={clearAllSaved}
          />
          <NewsletterModal
            isOpen={isNewsletterOpen}
            onClose={() => setIsNewsletterOpen(false)}
          />
          <BacklinksDirectory
            isOpen={isBacklinksOpen}
            onClose={() => setIsBacklinksOpen(false)}
          />
          <AmbientAudioPlayer />
          <CookieConsentBanner 
            onOpenPrivacyPolicy={() => {
              setLegalModalTab('analytics');
              setIsLegalModalOpen(true);
            }} 
          />
        </div>
      </AdSenseProvider>
    </ThemeProvider>
  );
}
