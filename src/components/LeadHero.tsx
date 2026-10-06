import React from 'react';
import { BlogPost } from '../types/blog';
import { ArrowRight, Bookmark, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { EditorialArtwork } from './EditorialArtworks';

interface LeadHeroProps {
  post: BlogPost;
  onReadPost: (post: BlogPost) => void;
  isSaved: boolean;
  onToggleSave: (postId: string) => void;
}

export const LeadHero: React.FC<LeadHeroProps> = ({
  post,
  onReadPost,
  isSaved,
  onToggleSave,
}) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative w-full rounded-2xl overflow-hidden border border-slate-800/80 light:border-slate-200 bg-gradient-to-br from-slate-900 via-slate-950 to-[#0b0f17] light:from-white light:via-slate-50 light:to-slate-100 shadow-2xl transition-all duration-300 group"
    >
      {/* Decorative ambient paper grid */}
      <div className="absolute inset-0 anime-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        {/* Left Editorial Content (7 Columns) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            {/* Kicker & Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 light:text-slate-500 mb-3">
              <span className="text-emerald-400 font-bold tracking-widest uppercase">
                {post.kicker || post.category}
              </span>
              <span aria-hidden="true" className="text-slate-600 light:text-slate-300">·</span>
              <span>Cover Story</span>
              <span aria-hidden="true" className="text-slate-600 light:text-slate-300">·</span>
              <span>{post.publishedAt}</span>
              <span aria-hidden="true" className="text-slate-600 light:text-slate-300">·</span>
              <span>{post.readTimeMinutes} min read</span>
              <span aria-hidden="true" className="text-slate-600 light:text-slate-300">·</span>
              <span className="text-sky-400 font-semibold">{post.targetRegion}</span>
            </div>

            {/* Headline & Subtitle */}
            <div className="space-y-4">
              <h1 
                onClick={() => onReadPost(post)}
                className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-100 light:text-slate-900 tracking-tight leading-tight hover:text-sky-400 transition-colors cursor-pointer"
              >
                {post.title}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 light:text-slate-700 leading-relaxed font-sans line-clamp-3">
                {post.subtitle}
              </p>
            </div>

            {/* SEO Keywords Pills */}
            <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-400 light:text-slate-500">
              <span className="text-slate-500 light:text-slate-400">SEO Focus:</span>
              {post.seoKeywords.slice(0, 3).map((kw, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-slate-800/60 light:bg-slate-200/60 text-slate-300 light:text-slate-700">
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Bar: Author + Citations + Actions */}
          <div className="pt-6 mt-6 border-t border-slate-800/80 light:border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-slate-800 light:bg-slate-200 border border-slate-700 light:border-slate-300 flex items-center justify-center font-mono text-xs font-bold text-emerald-400">
                {post.author.avatarInitials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-200 light:text-slate-800 block">
                    {post.author.name}
                  </span>
                  {post.author.location && (
                    <span className="text-[10px] text-slate-400 light:text-slate-500 font-mono flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5" />
                      <span>{post.author.location}</span>
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400 light:text-slate-500 block">
                  {post.author.role}
                </span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleSave(post.id)}
                className={`p-2.5 rounded-lg border transition-colors ${
                  isSaved 
                    ? 'bg-sky-500/10 border-sky-500/40 text-sky-400' 
                    : 'bg-slate-900 light:bg-white border-slate-800 light:border-slate-200 text-slate-400 hover:text-slate-200 light:hover:text-slate-900'
                }`}
                title={isSaved ? 'Remove from Saved' : 'Save article'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-sky-400' : ''}`} />
              </button>

              <button
                onClick={() => onReadPost(post)}
                className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all shadow-md hover:shadow-sky-500/20 inline-flex items-center gap-2 group/btn"
              >
                <span>Read Full Cover Story</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Artwork Illustration Canvas (5 Columns) */}
        <div 
          onClick={() => onReadPost(post)}
          className="lg:col-span-5 relative min-h-[260px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-slate-800/80 light:border-slate-200 cursor-pointer overflow-hidden group/art"
        >
          <EditorialArtwork id={post.id} className="transition-transform duration-700 ease-out group-hover/art:scale-105" />
          
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-slate-950/80 light:bg-white/80 backdrop-blur-md text-[10px] font-mono text-slate-300 light:text-slate-700 border border-slate-800/80 light:border-slate-200 flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Interactive Artwork Canvas</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
