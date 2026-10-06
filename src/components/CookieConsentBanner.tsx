import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings, Check, X } from 'lucide-react';

interface CookieConsentBannerProps {
  onOpenPrivacyPolicy: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onOpenPrivacyPolicy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('animify_cookie_consent');
      if (!consent) {
        // Small delay so it animates in smoothly after initial page render
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('animify_cookie_consent', 'accepted_all');
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    try {
      localStorage.setItem('animify_cookie_consent', 'essential_only');
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Cookie consent management"
      className="fixed bottom-3 sm:bottom-4 left-3 right-3 sm:left-auto sm:right-4 sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0b0f17]/95 light:bg-white/95 backdrop-blur-xl border border-slate-800 light:border-slate-300 shadow-2xl text-xs space-y-3 transition-colors">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-slate-100 light:text-slate-900 block text-xs">
                Privacy, GA4 & Ad Manager Consent
              </span>
              <span className="text-[10px] text-slate-400 light:text-slate-500 font-mono">
                animify.click · Google Compliance
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRejectNonEssential}
            className="p-1 text-slate-400 hover:text-slate-100 light:hover:text-slate-900 rounded-md transition-colors"
            title="Dismiss consent"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[11px] text-slate-300 light:text-slate-600 leading-relaxed font-sans">
          We use cookies and telemetry to analyze audience engagement via <strong>Google Analytics 4 (GA4)</strong> and deliver contextual ads through <strong>Google Ad Manager</strong> in strict accordance with the Google EU User Consent Policy and CCPA.
        </p>

        <div className="pt-1 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleAcceptAll}
            className="flex-1 px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors inline-flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Accept All</span>
          </button>

          <button
            type="button"
            onClick={handleRejectNonEssential}
            className="px-3 py-2 rounded-lg bg-slate-900 light:bg-slate-100 hover:bg-slate-800 text-slate-300 light:text-slate-700 font-medium text-xs border border-slate-800 light:border-slate-300 transition-colors"
          >
            Essential Only
          </button>

          <button
            type="button"
            onClick={onOpenPrivacyPolicy}
            className="px-2.5 py-2 text-[11px] text-slate-400 light:text-slate-500 hover:text-emerald-400 light:hover:text-emerald-600 font-mono transition-colors underline"
          >
            Policy Details
          </button>
        </div>
      </div>
    </aside>
  );
};
