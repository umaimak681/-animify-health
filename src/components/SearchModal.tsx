import React, { useState } from 'react';
import { BlogPost } from '../types/blog';
import { Search, X, ArrowRight, Tag } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  posts,
  onSelectPost,
}) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  if (!isOpen) return null;

  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)));

  const filteredPosts = posts.filter(post => {
    const matchesQuery =
      query === '' ||
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      post.author.name.toLowerCase().includes(query.toLowerCase()) ||
      post.category.toLowerCase().includes(query.toLowerCase());

    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);

    return matchesQuery && matchesTag;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search health research, autophagy, microbiome, sleep, VO2 max on animify.click..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-500 hover:text-slate-300 font-mono"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags Filter */}
        <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <Tag className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="text-slate-500 font-mono text-[11px] shrink-0">Tags:</span>
          {allTags.map(tag => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(isSelected ? null : tag)}
                className={`px-2.5 py-0.5 rounded text-xs transition-colors shrink-0 font-medium ${
                  isSelected
                    ? 'bg-sky-500 text-slate-950 font-semibold'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-3">
          {filteredPosts.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No matching stories found for "{query}". Try searching for "Madhouse", "Frieren", or "Sakuga".
            </div>
          ) : (
            filteredPosts.map(post => (
              <div
                key={post.id}
                onClick={() => {
                  onSelectPost(post);
                  onClose();
                }}
                className="group p-3.5 rounded-lg bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                    <span style={{ color: post.theme.accentHex }} className="font-semibold uppercase">
                      {post.category}
                    </span>
                    <span>·</span>
                    <span>{post.readTimeMinutes} min read</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-sky-300 transition-colors line-clamp-1">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1 font-sans">
                    {post.subtitle}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 shrink-0 transition-transform group-hover:translate-x-1" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
