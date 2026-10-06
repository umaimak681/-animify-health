import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, X } from 'lucide-react';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Mail className="w-5 h-5" />
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
              The Animify Health Dispatch
            </span>
            <h3 className="text-lg font-bold font-display text-slate-100">
              Evidence-Based Longevity & Health
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Every Sunday morning, receive our clinical breakdowns on metabolic science, autophagy protocols, deep sleep optimization, and neurobiology directly to your inbox.
            </p>
          </div>

          {subscribed ? (
            <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>You're on the list! Welcome to Animify Dispatch.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors shadow-sm"
              >
                Subscribe for Free
              </button>
              <span className="block text-center text-[10px] text-slate-500">
                Zero spam. One-click unsubscribe anytime. Respects your privacy.
              </span>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
