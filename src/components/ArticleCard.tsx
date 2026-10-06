import React from 'react';
import { BlogPost } from '../types/blog';
import { ArrowRight, Bookmark, ShieldCheck, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { EditorialArtwork } from './EditorialArtworks';

interface ArticleCardProps {
  post: BlogPost;
  onReadPost: (post: BlogPost) => void;
  isSaved: boolean;
  onToggleSave: (postId: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  post,
  onReadPost,
  isSaved,
  onToggleSave,
}) => {
  return (
    <motion.article 
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group bg-slate-900/60 light:bg-white hover:bg-slate-900/95 light:hover:bg-slate-50/95 border border-slate-800/80 light:border-slate-200 hover:border-sky-500/40 light:hover:border-sky-400/50 rounded-2xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl hover:shadow-sky-500/10"
    >
      {/* Top Accent Strip on hover */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
        style={{ backgroundColor: post.theme.accentHex }} 
      />

      {/* Artwork Header Window */}
      <div 
        onClick={() => onReadPost(post)}
        className="w-full h-44 relative overflow-hidden cursor-pointer border-b border-slate-800/80 light:border-slate-200"
      >
        <EditorialArtwork id={post.id} className="transition-transform duration-700 ease-out group-hover:scale-108" />
        
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-slate-950/85 light:bg-white/95 backdrop-blur text-[10px] font-mono text-slate-300 light:text-slate-700 border border-slate-800/80 light:border-slate-200 shadow-md">
          {post.theme.motif}
        </div>

        {/* Peer-Reviewed Badge on Card */}
        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono flex items-center gap-1 backdrop-blur">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>Peer-Reviewed</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-400 light:text-slate-500 mb-2">
            <span style={{ color: post.theme.accentHex }} className="font-bold uppercase tracking-wider">
              {post.kicker || post.category}
            </span>
            <span aria-hidden="true" className="text-slate-600 light:text-slate-300">·</span>
            <span>{post.publishedAt}</span>
            <span aria-hidden="true" className="text-slate-600 light:text-slate-300">·</span>
            <span>{post.readTimeMinutes} min</span>
          </div>

          <h3
            onClick={() => onReadPost(post)}
            className="text-base sm:text-lg font-display font-bold text-slate-100 light:text-slate-900 group-hover:text-sky-400 transition-colors cursor-pointer leading-snug line-clamp-2 mb-2"
          >
            {post.title}
          </h3>

          <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed line-clamp-3 mb-4 font-sans">
            {post.excerpt}
          </p>

          {/* Backlink summary badge */}
          {post.backlinks && post.backlinks.length > 0 && (
            <div className="mb-3 text-[10px] font-mono text-slate-400 light:text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">Ref: {post.backlinks[0].sourceName}</span>
            </div>
          )}
        </div>

        <div className="pt-3.5 border-t border-slate-800/70 light:border-slate-200 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-800 light:bg-slate-200 border border-slate-700 light:border-slate-300 flex items-center justify-center font-mono text-[9px] text-slate-300 light:text-slate-700 font-bold">
              {post.author.avatarInitials}
            </div>
            <span className="text-[11px] text-slate-300 light:text-slate-700 font-medium truncate max-w-[120px]">
              {post.author.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(post.id)}
              className={`p-1.5 rounded-md border transition-colors ${
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
              className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 transition-colors"
            >
              <span>Read</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
