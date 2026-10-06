import React from 'react';
import { ExternalLink, ShieldCheck, Globe, CheckCircle2, BookOpen, ArrowUpRight, X } from 'lucide-react';
import { BLOG_POSTS } from '../data/posts';

interface BacklinksDirectoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BacklinksDirectory: React.FC<BacklinksDirectoryProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Extract all authoritative citations across our articles
  const allBacklinks = BLOG_POSTS.flatMap(post => 
    post.backlinks.map(link => ({
      ...link,
      articleTitle: post.title,
      articleSlug: post.slug,
      category: post.category,
    }))
  );

  const targetKeywordsUS = [
    { keyword: 'intermittent fasting autophagy protocol 2026', volume: 'High Intent', cpc: '$5.40' },
    { keyword: 'how to lower high cortisol naturally USA', volume: 'High Intent', cpc: '$6.20' },
    { keyword: 'zone 2 cardio workout plan for longevity', volume: 'High Intent', cpc: '$4.90' },
    { keyword: 'best sleep supplements magnesium glycinate usa', volume: 'High Intent', cpc: '$6.50' },
    { keyword: 'apob vs ldl test heart disease risk', volume: 'High Intent', cpc: '$5.80' },
  ];

  const targetKeywordsUK = [
    { keyword: 'how to trigger autophagy fast UK', volume: 'High Intent', cpc: '£4.50' },
    { keyword: 'gut brain axis mental health NHS UK', volume: 'High Intent', cpc: '£4.80' },
    { keyword: 'vagus nerve stimulation exercises UK', volume: 'High Intent', cpc: '£4.10' },
    { keyword: 'VO2 max chart longevity Peter Attia', volume: 'High Intent', cpc: '£4.30' },
    { keyword: 'anti-inflammatory diet meal plan UK', volume: 'High Intent', cpc: '£3.90' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 light:border-slate-200 flex items-center justify-between bg-slate-950/60 light:bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display text-slate-100 light:text-slate-900 flex items-center gap-2">
                <span>Authority Citations & SEO Backlinks</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 light:bg-slate-200 text-sky-400 font-mono">
                  animify.click
                </span>
              </h2>
              <p className="text-xs text-slate-400 light:text-slate-500 font-sans">
                Evidence-based outbound backlinks & target keyword architecture engineered for Google US & UK ranking.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 light:text-slate-600 light:hover:text-slate-900 rounded-lg hover:bg-slate-800 light:hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 light:text-slate-700">
          {/* E-E-A-T Explanation */}
          <div className="p-4 rounded-xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-200 space-y-2">
            <span className="font-semibold text-xs text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Google Search Quality Evaluator Guidelines (E-E-A-T)</span>
            </span>
            <p className="text-slate-400 light:text-slate-600 leading-relaxed font-sans">
              To rank on Google US and UK for lifestyle, health, and wellness queries, publications must cite recognized peer-reviewed institutions and medical research. Every article on <strong>Animify Lifestyle</strong> is cross-linked with authoritative external primary sources and internal semantic clusters.
            </p>
          </div>

          {/* Peer-Reviewed External Backlinks */}
          <div>
            <h3 className="text-sm font-bold font-display text-slate-100 light:text-slate-900 mb-3 flex items-center justify-between">
              <span>Authoritative Outbound Backlink Registry ({allBacklinks.length} Active Citations)</span>
              <span className="text-[11px] font-mono text-emerald-400 font-normal">Dofollow Editorial References</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {allBacklinks.map((link, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-lg bg-slate-950/60 light:bg-slate-50 border border-slate-800 light:border-slate-200 flex flex-col justify-between space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-[10px] text-sky-400 uppercase tracking-wider">
                        {link.sourceName}
                      </span>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-sky-400 transition-colors inline-flex items-center gap-0.5"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-slate-200 light:text-slate-800 hover:text-sky-400 transition-colors line-clamp-1 block text-xs"
                    >
                      {link.anchorText}
                    </a>
                    <p className="text-[11px] text-slate-400 light:text-slate-500 mt-1 line-clamp-2">
                      {link.context}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-900 light:border-slate-200 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                    <span>Cited in: {link.category}</span>
                    <span className="text-emerald-400">Verified Anchor</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Keyword Matrices */}
          <div className="pt-4 border-t border-slate-800 light:border-slate-200">
            <h3 className="text-sm font-bold font-display text-slate-100 light:text-slate-900 mb-3">
              US & UK High-Volume Keyword Clusters
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* US */}
              <div className="p-4 rounded-xl bg-slate-950/80 light:bg-slate-50 border border-slate-800 light:border-slate-200 space-y-2.5">
                <span className="font-semibold text-xs text-sky-400 flex items-center gap-1.5">
                  <span>🇺🇸 United States (High-Search Intent)</span>
                </span>
                <ul className="space-y-1.5 text-[11px]">
                  {targetKeywordsUS.map((item, i) => (
                    <li key={i} className="flex items-center justify-between border-b border-slate-900 light:border-slate-200 pb-1">
                      <span className="text-slate-300 light:text-slate-700 font-mono">{item.keyword}</span>
                      <span className="text-slate-500 font-mono text-[10px]">{item.cpc} est.</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* UK */}
              <div className="p-4 rounded-xl bg-slate-950/80 light:bg-slate-50 border border-slate-800 light:border-slate-200 space-y-2.5">
                <span className="font-semibold text-xs text-amber-400 flex items-center gap-1.5">
                  <span>🇬🇧 United Kingdom (High-Search Intent)</span>
                </span>
                <ul className="space-y-1.5 text-[11px]">
                  {targetKeywordsUK.map((item, i) => (
                    <li key={i} className="flex items-center justify-between border-b border-slate-900 light:border-slate-200 pb-1">
                      <span className="text-slate-300 light:text-slate-700 font-mono">{item.keyword}</span>
                      <span className="text-slate-500 font-mono text-[10px]">{item.cpc} est.</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Syndication & Backlink Request Instructions */}
          <div className="p-4 rounded-xl bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-200 space-y-2">
            <span className="font-bold text-xs text-slate-200 light:text-slate-800 block">
              Editorial Syndication & Guest Backlink Requests
            </span>
            <p className="text-[11px] text-slate-400 light:text-slate-600 leading-relaxed">
              Are you a journalist, wellness researcher, or lifestyle publication looking to reference <strong>animify.click</strong>? We welcome co-citation and attribution. Please address syndication inquiries to <strong className="text-emerald-400">info@animify.click</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
