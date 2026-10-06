import React from 'react';
import { BlogPost } from '../types/blog';
import { Bookmark, X, ArrowRight, Trash2 } from 'lucide-react';

interface SavedArticlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedPostIds: string[];
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onRemoveSave: (postId: string) => void;
  onClearAll: () => void;
}

export const SavedArticlesModal: React.FC<SavedArticlesModalProps> = ({
  isOpen,
  onClose,
  savedPostIds,
  posts,
  onSelectPost,
  onRemoveSave,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const savedPosts = posts.filter(p => savedPostIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-sky-400 fill-sky-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-display">
              Saved Reading List ({savedPosts.length})
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {savedPosts.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors mr-2"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto space-y-3">
          {savedPosts.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs space-y-2">
              <Bookmark className="w-8 h-8 text-slate-700 mx-auto" />
              <p>You haven't bookmarked any essays yet.</p>
              <p className="text-[11px] text-slate-600">Click the bookmark icon on any article to save it for offline or later reading.</p>
            </div>
          ) : (
            savedPosts.map(post => (
              <div
                key={post.id}
                className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3 group hover:border-slate-700 transition-colors"
              >
                <div 
                  onClick={() => {
                    onSelectPost(post);
                    onClose();
                  }}
                  className="space-y-1 cursor-pointer flex-1"
                >
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                    <span style={{ color: post.theme.accentHex }} className="font-semibold uppercase">
                      {post.category}
                    </span>
                    <span>·</span>
                    <span>{post.readTimeMinutes} min</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-sky-300 transition-colors line-clamp-1">
                    {post.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onRemoveSave(post.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectPost(post);
                      onClose();
                    }}
                    className="p-1.5 text-slate-400 hover:text-sky-400 transition-colors"
                    title="Open article"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
