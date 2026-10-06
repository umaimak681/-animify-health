import React from 'react';
import { BlogPost } from '../types/blog';
import { ArrowRight, Bookmark, ShieldCheck, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { EditorialArtwork } from './EditorialArtworks';

interface SecondaryFeaturesProps {
  posts: BlogPost[];
  onReadPost: (post: BlogPost) => void;
  savedPostIds: string[];
  onToggleSave: (postId: string) => void;
}

export const SecondaryFeatures: React.FC<SecondaryFeaturesProps> = ({
  posts,
  onReadPost,
  savedPostIds,
  onToggleSave,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      {posts.map((post, idx) => {
        const isSaved = savedPostIds.includes(post.id);
        return (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative rounded-xl border border-slate-800 light:border-slate-200 bg-slate-900/60 light:bg-white flex flex-col justify-between hover:border-slate-700 light:hover:border-slate-300 hover:bg-slate-900/90 light:hover:bg-slate-50/80 transition-all duration-200 overflow-hidden shadow-sm"
          >
            {/* Top Accent Strip */}
            <div 
              className="absolute top-0 left-0 right-0 h-1 z-10" 
              style={{ backgroundColor: post.theme.accentHex }} 
            />

            {/* Artwork Banner Window */}
            <div 
              onClick={() => onReadPost(post)}
              className="w-full h-48 sm:h-52 relative overflow-hidden cursor-pointer border-b border-slate-800/80 light:border-slate-200"
            >
              <EditorialArtwork id={post.id} className="transition-transform duration-500 ease-out group-hover:scale-105" />
              
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-slate-950/80 light:bg-white/90 backdrop-blur text-[10px] font-mono text-slate-300 light:text-slate-700 border border-slate-800/80 light:border-slate-200">
                {post.theme.motif}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Kicker & Unboxed Metadata */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 light:text-slate-500 mb-2.5">
                  <span style={{ color: post.theme.accentHex }} className="font-bold uppercase tracking-wider">
                    {post.kicker || post.category}
                  </span>
                  <span aria-hidden="true" className="text-slate-600 light:text-slate-300">·</span>
                  <span>{post.publishedAt}</span>
                  <span aria-hidden="true" className="text-slate-600 light:text-slate-300">·</span>
                  <span>{post.readTimeMinutes} min</span>
                  <span aria-hidden="true" className="text-slate-600 light:text-slate-300">·</span>
                  <span className="text-sky-400 font-semibold">{post.targetRegion}</span>
                </div>

                {/* Title & Excerpt */}
                <h2
                  onClick={() => onReadPost(post)}
                  className="text-lg sm:text-xl font-display font-bold text-slate-100 light:text-slate-900 group-hover:text-sky-400 transition-colors cursor-pointer leading-snug mb-2.5 line-clamp-2"
                >
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 leading-relaxed line-clamp-3 mb-4 font-sans">
                  {post.subtitle}
                </p>

                {/* Citation Highlight */}
                {post.backlinks && post.backlinks.length > 0 && (
                  <div className="mb-4 text-[11px] font-mono text-slate-400 light:text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">Ref: <strong className="text-slate-300 light:text-slate-700">{post.backlinks[0].sourceName}</strong></span>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-800/80 light:border-slate-200 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-slate-800 light:bg-slate-200 border border-slate-700 light:border-slate-300 flex items-center justify-center font-mono text-[10px] text-slate-300 light:text-slate-700 font-bold">
                    {post.author.avatarInitials}
                  </div>
                  <div>
                    <span className="text-xs text-slate-200 light:text-slate-800 font-semibold block">{post.author.name}</span>
                    {post.author.location && (
                      <span className="text-[10px] text-slate-500 font-mono block">{post.author.location}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleSave(post.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isSaved
                        ? 'bg-sky-500/10 border-sky-500/30 text-sky-400'
                        : 'border-slate-800 light:border-slate-200 text-slate-400 hover:text-slate-200 light:hover:text-slate-800 hover:bg-slate-800 light:hover:bg-slate-100'
                    }`}
                    title={isSaved ? 'Saved' : 'Save article'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-sky-400' : ''}`} />
                  </button>

                  <button
                    onClick={() => onReadPost(post)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};
