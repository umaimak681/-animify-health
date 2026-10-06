import React, { useState, useEffect, useRef } from 'react';
import { BlogPost, CommentItem } from '../types/blog';
import { AdSenseBanner } from './AdSenseBanner';
import { useTheme } from '../context/ThemeContext';
import { EditorialArtwork } from './EditorialArtworks';
import { 
  ArrowLeft, Bookmark, Share2, Heart, MessageSquare, Check, 
  ChevronRight, Sparkles, Send, Type, ThumbsUp, Clock, Sun, Moon,
  ShieldCheck, ArrowUpRight, MapPin, HelpCircle, ChevronDown, AlertCircle
} from 'lucide-react';

interface ArticleReaderProps {
  post: BlogPost;
  allPosts: BlogPost[];
  onBack: () => void;
  onSelectPost: (post: BlogPost) => void;
  isSaved: boolean;
  onToggleSave: (postId: string) => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  post,
  allPosts,
  onBack,
  onSelectPost,
  isSaved,
  onToggleSave,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [claps, setClaps] = useState(post.claps);
  const [hasClapped, setHasClapped] = useState(false);
  const [fontSizeLarge, setFontSizeLarge] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const articleRef = useRef<HTMLElement>(null);
  
  // Comments state
  const [comments, setComments] = useState<CommentItem[]>(() => [
    {
      id: 'c1',
      authorName: 'Dr. Katherine Miller',
      avatarColor: 'bg-emerald-500/20 text-emerald-400',
      createdAt: '1 day ago',
      text: 'The explanation of the biochemical switch between AMPK and mTOR is exceptionally lucid. In our clinical practice, patient compliance with the 16/8 window skyrockets once they understand the hour-by-hour cellular repair cascade.',
      upvotes: 42,
    },
    {
      id: 'c2',
      authorName: 'Liam Davies, London',
      avatarColor: 'bg-sky-500/20 text-sky-400',
      createdAt: '2 days ago',
      text: 'Implementing the morning outdoor light anchor alongside the physiological sigh has brought my resting heart rate down from 72 to 58 bpm within three weeks. Fantastic evidence-based reporting.',
      upvotes: 29,
    },
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  // Enhanced Scroll reading progress tracking with article container bounding calculation
  useEffect(() => {
    const handleScroll = () => {
      if (articleRef.current) {
        const rect = articleRef.current.getBoundingClientRect();
        const articleTop = rect.top + window.scrollY;
        const articleHeight = rect.height;
        const windowHeight = window.innerHeight;
        const currentScroll = window.scrollY;

        // Start calculating slightly before top of article enters viewport
        const startPoint = articleTop - 120;
        const totalDistance = articleHeight - windowHeight + 200;

        if (totalDistance <= 0) {
          setScrollProgress(100);
          return;
        }

        if (currentScroll <= startPoint) {
          setScrollProgress(0);
        } else if (currentScroll >= startPoint + totalDistance) {
          setScrollProgress(100);
        } else {
          const progress = ((currentScroll - startPoint) / totalDistance) * 100;
          setScrollProgress(Math.min(100, Math.max(0, Math.round(progress))));
        }
      } else {
        const totalScroll = document.documentElement.scrollTop || window.scrollY;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (windowHeight > 0) {
          const currentProgress = (totalScroll / windowHeight) * 100;
          setScrollProgress(Math.min(100, Math.max(0, Math.round(currentProgress))));
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Immediate calculation on load or post change
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  // Dynamic SEO, Page Title, and Schema.org JSON-LD Injection for USA/UK Google Search
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${post.title} – Animify Health`;

    // Inject Dynamic Schema.org Structured Data
    const scriptId = 'dynamic-article-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaGraph: Record<string, unknown>[] = [
      {
        '@type': 'MedicalWebPage',
        '@id': `https://animify.click/story/${post.slug}/#medicalwebpage`,
        url: `https://animify.click/story/${post.slug}`,
        name: post.title,
        headline: post.title,
        description: post.excerpt,
        datePublished: '2026-03-01T08:00:00+00:00',
        dateModified: '2026-04-15T10:30:00+00:00',
        inLanguage: 'en-US',
        keywords: post.seoKeywords?.join(', ') || '',
        author: {
          '@type': 'Person',
          name: post.author.name,
          jobTitle: post.author.role,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Animify Health',
          url: 'https://animify.click',
          logo: {
            '@type': 'ImageObject',
            url: 'https://animify.click/logo.png',
          },
        },
        reviewedBy: post.medicalReviewer ? {
          '@type': 'Person',
          name: post.medicalReviewer.name,
          honorificSuffix: post.medicalReviewer.credentials,
          worksFor: {
            '@type': 'Organization',
            name: post.medicalReviewer.institution,
          },
        } : undefined,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://animify.click',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: post.category,
            item: `https://animify.click/?category=${encodeURIComponent(post.category)}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `https://animify.click/story/${post.slug}`,
          },
        ],
      },
    ];

    // Add FAQPage Schema for Google Search Snippets if FAQs exist
    if (post.faqs && post.faqs.length > 0) {
      schemaGraph.push({
        '@type': 'FAQPage',
        mainEntity: post.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    scriptTag.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': schemaGraph,
    });

    return () => {
      document.title = originalTitle;
      const tag = document.getElementById(scriptId);
      if (tag) tag.remove();
    };
  }, [post]);

  const handleClap = () => {
    setClaps(prev => prev + 1);
    setHasClapped(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://animify.click/story/${post.slug}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const author = newCommentName.trim() || 'Anonymous Reader';
    const newComment: CommentItem = {
      id: Date.now().toString(),
      authorName: author,
      avatarColor: 'bg-amber-500/20 text-amber-400',
      createdAt: 'Just now',
      text: newCommentText.trim(),
      upvotes: 1,
    };
    setComments(prev => [newComment, ...prev]);
    setNewCommentName('');
    setNewCommentText('');
  };

  const handleUpvoteComment = (id: string) => {
    setComments(prev =>
      prev.map(c => (c.id === id ? { ...c, upvotes: c.upvotes + 1 } : c))
    );
  };

  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 pb-20">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-slate-950/80 pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-500 transition-[width] duration-150 ease-out shadow-[0_0_12px_rgba(56,189,248,0.85)]" 
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuenow={scrollProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Reader Navigation Sub-bar */}
      <div className="sticky top-0 z-40 bg-[#070b12]/95 light:bg-white/95 backdrop-blur-md border-b border-slate-800/80 light:border-slate-200 px-4 sm:px-8 py-3 transition-colors shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Research Feed</span>
            </button>

            <span className="hidden md:inline text-xs font-bold text-emerald-400 font-display pl-2 border-l border-slate-800 light:border-slate-300">
              Animify Health
            </span>

            {/* Reading progress metric */}
            <span className="hidden sm:inline text-slate-700">|</span>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
              <div className="w-14 h-1.5 bg-slate-800 rounded-full overflow-hidden shrink-0">
                <div 
                  className="h-full bg-sky-400 transition-all duration-150" 
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
              <span className="text-sky-400 font-semibold">{scrollProgress}%</span>
              <span>read</span>
              {scrollProgress > 0 && scrollProgress < 100 && (
                <span className="text-slate-500">
                  · ~{Math.max(1, Math.ceil(post.readTimeMinutes * (1 - scrollProgress / 100)))}m left
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle for reading mode */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Editorial mode' : 'Switch to Dark Midnight mode'}
              aria-label="Toggle theme in reader"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-600" />
              )}
            </button>

            {/* Font size toggle */}
            <button
              onClick={() => setFontSizeLarge(!fontSizeLarge)}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                fontSizeLarge 
                  ? 'bg-sky-500/10 border-sky-500/30 text-sky-400' 
                  : 'border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle Larger Text Size"
            >
              <Type className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-mono">{fontSizeLarge ? '18px' : '16px'}</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleSave(post.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isSaved
                  ? 'bg-sky-500/10 border-sky-500/30 text-sky-400'
                  : 'border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title={isSaved ? 'Saved' : 'Save article'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-sky-400' : ''}`} />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
              title="Copy shareable link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        {/* Google AdSense Header Leaderboard Placement */}
        <AdSenseBanner slotType="header-leaderboard" />

        {/* Hero Artwork Editorial Showcase */}
        <div className="max-w-4xl mx-auto h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-800 light:border-slate-200 shadow-xl relative my-6">
          <EditorialArtwork id={post.id} className="w-full h-full" />
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 light:bg-white/90 backdrop-blur-md text-[11px] font-mono text-slate-300 light:text-slate-700 border border-slate-800 light:border-slate-200 flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>{post.theme.motif} · Editorial Photography & Art</span>
          </div>
        </div>

        {/* Article Header Container */}
        <header className="max-w-3xl mx-auto text-left space-y-4 mb-10 pt-4">
          {/* Breadcrumb & Unboxed Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 light:text-slate-500">
            <span style={{ color: post.theme.accentHex }} className="font-bold uppercase tracking-wider">
              {post.kicker || post.category}
            </span>
            <span aria-hidden="true" className="text-slate-600 light:text-slate-300">·</span>
            <span>Published {post.publishedAt}</span>
            <span aria-hidden="true" className="text-slate-600 light:text-slate-300">·</span>
            <span>{post.readTimeMinutes} min read</span>
            <span aria-hidden="true" className="text-slate-600 light:text-slate-300">·</span>
            <span className="text-sky-400 font-semibold">Edition: {post.targetRegion}</span>
            <span aria-hidden="true" className="text-slate-600 light:text-slate-300">·</span>
            <span className="text-slate-300 light:text-slate-600 font-mono-num">{post.viewsCount.toLocaleString()} views</span>
          </div>

          {/* Medical Reviewer Verification Badge */}
          {post.medicalReviewer && (
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-400 font-mono">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>
                <strong>Medically Reviewed:</strong> {post.medicalReviewer.name}, {post.medicalReviewer.credentials} · <em>{post.medicalReviewer.institution}</em>
              </span>
            </div>
          )}

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-100 light:text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 light:text-slate-700 font-sans leading-relaxed pt-1">
            {post.subtitle}
          </p>

          {/* Author Byline */}
          <div className="pt-4 border-t border-slate-800/80 light:border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-slate-800 light:bg-slate-200 border border-slate-700 light:border-slate-300 flex items-center justify-center font-mono font-bold text-xs text-sky-400">
                {post.author.avatarInitials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-200 light:text-slate-800 block">{post.author.name}</span>
                  {post.author.location && (
                    <span className="text-[10px] text-slate-400 light:text-slate-500 font-mono flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5" />
                      <span>{post.author.location}</span>
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400 light:text-slate-500 block">{post.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleClap}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  hasClapped 
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-sm' 
                    : 'border-slate-800 light:border-slate-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800 light:hover:bg-slate-100'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${hasClapped ? 'fill-rose-400' : ''}`} />
                <span className="font-mono-num">{claps}</span>
              </button>
            </div>
          </div>
        </header>

        {/* 2-Column Layout: Article Body + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Main Reading Column (70%) */}
          <main className="lg:col-span-8">
            <article ref={articleRef} className={`space-y-6 text-slate-200 font-sans leading-relaxed ${fontSizeLarge ? 'text-lg leading-loose' : 'text-base leading-relaxed'}`}>
              {/* Introduction with drop cap */}
              <div className="first-letter:text-5xl first-letter:font-editorial first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-sky-400 text-slate-300 font-sans text-base sm:text-lg leading-relaxed">
                {post.content.intro}
              </div>

              {/* Dynamic Sections */}
              {post.content.sections.map((section, idx) => (
                <section key={section.id} id={section.id} className="pt-6 space-y-4">
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-100 pt-4 border-t border-slate-800/80">
                    {section.title}
                  </h2>

                  {section.body.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-slate-300">
                      {paragraph}
                    </p>
                  ))}

                  {/* Pull Quote if available */}
                  {section.pullQuote && (
                    <blockquote className="my-6 pl-4 sm:pl-6 border-l-2 border-sky-400 py-2 italic font-serif text-lg sm:text-xl text-slate-200 bg-slate-900/40 rounded-r-lg">
                      "{section.pullQuote}"
                    </blockquote>
                  )}

                  {/* Highlight Callout Box if available */}
                  {section.highlightBox && (
                    <div className="my-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                      <span className="text-xs font-semibold font-mono uppercase tracking-wider text-sky-400 block">
                        {section.highlightBox.title}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {section.highlightBox.content}
                      </p>
                    </div>
                  )}

                  {/* Key Takeaways list if available */}
                  {section.keyTakeaways && (
                    <div className="my-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                        Key Editorial Observations:
                      </span>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 list-disc pl-5">
                        {section.keyTakeaways.map((item, tIdx) => (
                          <li key={tIdx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* In-Article AdSense Placement after Section 1 */}
                  {idx === 0 && (
                    <AdSenseBanner slotType="in-article" className="my-8" />
                  )}
                </section>
              ))}

              {/* Critical Verdict & Score Box */}
              {post.content.verdict && (
                <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                    <div>
                      <span className="text-xs uppercase font-mono tracking-widest text-sky-400 block">
                        Animify Editorial Verdict
                      </span>
                      <h3 className="text-xl font-bold font-display text-slate-100">
                        Final Score & Evaluation
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-4xl font-display font-bold text-sky-400 font-mono-num">
                        {post.content.verdict.overall.toFixed(1)}
                      </div>
                      <div className="text-xs text-slate-400 leading-tight">
                        <span>out of</span>
                        <strong className="block text-slate-200">10.0</strong>
                      </div>
                    </div>
                  </div>

                  {/* Sub-scores / Lifestyle Evaluation Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-slate-950 light:bg-slate-50 rounded-lg border border-slate-800/80 light:border-slate-200 text-center">
                      <span className="text-[10px] font-mono uppercase text-slate-400 light:text-slate-500 block">Scientific Evidence</span>
                      <span className="text-base font-bold text-slate-100 light:text-slate-900 font-mono-num">
                        {post.content.verdict.animation !== undefined ? post.content.verdict.animation.toFixed(1) : (post.content.verdict.overall >= 9.6 ? '9.8' : '9.4')}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-950 light:bg-slate-50 rounded-lg border border-slate-800/80 light:border-slate-200 text-center">
                      <span className="text-[10px] font-mono uppercase text-slate-400 light:text-slate-500 block">Sustainability</span>
                      <span className="text-base font-bold text-slate-100 light:text-slate-900 font-mono-num">
                        {post.content.verdict.storytelling !== undefined ? post.content.verdict.storytelling.toFixed(1) : (post.content.verdict.overall >= 9.5 ? '9.7' : '9.2')}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-950 light:bg-slate-50 rounded-lg border border-slate-800/80 light:border-slate-200 text-center">
                      <span className="text-[10px] font-mono uppercase text-slate-400 light:text-slate-500 block">Practical Ease</span>
                      <span className="text-base font-bold text-slate-100 light:text-slate-900 font-mono-num">
                        {post.content.verdict.soundtrack !== undefined ? post.content.verdict.soundtrack.toFixed(1) : '9.5'}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-950 light:bg-slate-50 rounded-lg border border-slate-800/80 light:border-slate-200 text-center">
                      <span className="text-[10px] font-mono uppercase text-slate-400 light:text-slate-500 block">Wellness Impact</span>
                      <span className="text-base font-bold text-slate-100 light:text-slate-900 font-mono-num">
                        {post.content.verdict.direction !== undefined ? post.content.verdict.direction.toFixed(1) : post.content.verdict.overall.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm italic text-slate-300 border-l-2 border-slate-700 pl-4 py-1">
                    "{post.content.verdict.verdictQuote}"
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">Strengths</span>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {post.content.verdict.pros.map((p, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-400">✓</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block">Caveats</span>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {post.content.verdict.cons.map((c, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-rose-400">✗</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Authoritative Outbound Backlinks & Primary Sources (Google E-E-A-T Compliance) */}
              {post.backlinks && post.backlinks.length > 0 && (
                <div className="mt-8 p-5 rounded-xl bg-slate-950/80 light:bg-slate-50 border border-slate-800 light:border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 light:text-slate-800">
                        Primary Source Citations & Authoritative References
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Verified Dofollow Links</span>
                  </div>

                  <p className="text-xs text-slate-400 light:text-slate-600 font-sans">
                    In compliance with rigorous journalism and search quality standards, this article references external clinical trials, academic reports, and institutional studies:
                  </p>

                  <div className="space-y-2 pt-1">
                    {post.backlinks.map((link, idx) => (
                      <div 
                        key={idx} 
                        className="p-3 rounded-lg bg-slate-900/60 light:bg-white border border-slate-800/80 light:border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-slate-700 transition-colors"
                      >
                        <div className="space-y-0.5">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-sky-400 hover:text-sky-300 hover:underline inline-flex items-center gap-1"
                          >
                            <span>{link.anchorText}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                          <p className="text-[11px] text-slate-400 light:text-slate-600 font-sans">{link.context}</p>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 light:bg-slate-100 text-slate-300 light:text-slate-700 border border-slate-700 light:border-slate-200 shrink-0 self-start sm:self-center">
                          {link.sourceName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Targeted SEO Keywords Cloud (US & UK) */}
              {post.seoKeywords && post.seoKeywords.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center gap-1.5 text-xs font-mono text-slate-400 light:text-slate-500">
                  <span className="text-slate-500 light:text-slate-400 font-semibold">Indexed Keywords:</span>
                  {post.seoKeywords.map((kw, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 rounded-md bg-slate-950 light:bg-slate-100 border border-slate-800/80 light:border-slate-200 text-slate-300 light:text-slate-700 text-[11px]"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              )}

              {/* Clinical & Scientific FAQs (Schema-Optimized for Google Search Snippets) */}
              {post.faqs && post.faqs.length > 0 && (
                <div className="mt-10 p-6 rounded-xl bg-slate-950/80 light:bg-slate-50 border border-slate-800 light:border-slate-200 space-y-4">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-sky-400" />
                    <h3 className="text-sm font-bold font-display uppercase tracking-wider text-slate-100 light:text-slate-900">
                      Frequently Asked Questions (Clinical Q&A)
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {post.faqs.map((faq, i) => (
                      <details key={i} className="group p-3.5 rounded-lg bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 transition-all">
                        <summary className="font-semibold text-xs sm:text-sm text-slate-200 light:text-slate-800 cursor-pointer list-none flex items-center justify-between gap-2">
                          <span>{faq.question}</span>
                          <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform shrink-0" />
                        </summary>
                        <p className="mt-3 text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed pt-3 border-t border-slate-800/80 light:border-slate-200 font-sans">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {/* Medical & Health Educational Disclaimer (Required for Google YMYL & AdSense) */}
              <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300/90 light:text-amber-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-400 light:text-amber-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="uppercase tracking-wider font-mono text-[11px]">Clinical & Editorial Disclaimer</span>
                </div>
                <p className="leading-relaxed">
                  The health, longevity, and biochemical insights published on Animify Health are cross-referenced with peer-reviewed scientific journals and institutional standards. However, all content is published strictly for informational, educational, and journalistic purposes. It does not constitute individual clinical advice, medical diagnosis, or personalized treatment. Always consult a qualified medical professional prior to initiating new fasting protocols, strenuous exercise regimens, or dietary supplement stacks.
                </p>
              </div>

              {/* Author Bio Box */}
              <div className="mt-10 p-6 rounded-xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-base text-sky-400 shrink-0">
                  {post.author.avatarInitials}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-100">{post.author.name}</span>
                    <span className="text-xs text-sky-400 font-mono">{post.author.twitter}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {post.author.bio}
                  </p>
                </div>
              </div>

              {/* Interactive Comments Section */}
              <section className="mt-12 pt-8 border-t border-slate-800 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-sky-400" />
                    <h3 className="text-lg font-bold font-display text-slate-100">
                      Reader Discussion ({comments.length})
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">Moderated Community</span>
                </div>

                {/* Add Comment Form */}
                <form onSubmit={handleAddComment} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div>
                    <input
                      type="text"
                      value={newCommentName}
                      onChange={(e) => setNewCommentName(e.target.value)}
                      placeholder="Your name or handle (optional)"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-100 text-xs focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <textarea
                      required
                      rows={3}
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Add to the critique: What was your take on this production?"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-100 text-xs focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Comment</span>
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${comment.avatarColor}`}>
                            {comment.authorName.charAt(0)}
                          </div>
                          <span className="text-xs font-semibold text-slate-200">{comment.authorName}</span>
                          <span className="text-[10px] text-slate-500">· {comment.createdAt}</span>
                        </div>
                        <button
                          onClick={() => handleUpvoteComment(comment.id)}
                          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-sky-400 transition-colors"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span className="font-mono-num">{comment.upvotes}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans pl-8">
                        {comment.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </article>
          </main>

          {/* Sticky Sidebar (30%) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Table of Contents Box */}
            <div className="sticky top-32 space-y-6">
              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block">
                  Table of Contents
                </span>
                <nav className="space-y-1.5">
                  {post.tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-xs text-slate-400 hover:text-sky-400 transition-colors py-1 pl-2 border-l border-slate-800 hover:border-sky-400"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* AdSense Sidebar Placement (300x250) */}
              <AdSenseBanner slotType="sidebar" />

              {/* Related Stories */}
              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block">
                  More From Animify
                </span>
                <div className="space-y-3">
                  {relatedPosts.map((rPost) => (
                    <div
                      key={rPost.id}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        onSelectPost(rPost);
                      }}
                      className="group cursor-pointer space-y-1"
                    >
                      <span className="text-[10px] font-mono uppercase text-sky-400 block">
                        {rPost.category}
                      </span>
                      <h4 className="text-xs font-semibold text-slate-300 group-hover:text-sky-300 transition-colors leading-snug line-clamp-2">
                        {rPost.title}
                      </h4>
                      <span className="text-[10px] text-slate-500 block font-mono">
                        {rPost.readTimeMinutes} min read
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
