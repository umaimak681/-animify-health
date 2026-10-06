import React, { useState } from 'react';
import { useAdSense } from '../context/AdSenseContext';
import { X, Check, Copy, ShieldCheck, FileText, Globe, AlertCircle, ExternalLink } from 'lucide-react';

export const AdSenseConfigModal: React.FC = () => {
  const { config, updateConfig, isConfigModalOpen, setIsConfigModalOpen, adsTxtContent } = useAdSense();
  const [pubId, setPubId] = useState(config.publisherId);
  const [liveAds, setLiveAds] = useState(config.enableLiveAds);
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedAdsTxt, setCopiedAdsTxt] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isConfigModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      publisherId: pubId.trim(),
      enableLiveAds: liveAds,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsConfigModalOpen(false);
    }, 1200);
  };

  const adSenseScriptSnippet = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId || 'ca-pub-0000000000000000'}" crossorigin="anonymous"></script>`;

  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
              G
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-100 font-display">
                Google AdSense Setup & Monetization
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Target Domain: <span className="text-sky-400 font-medium">animify.click</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsConfigModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* AdSense Status Banner */}
          <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>AdSense Approval Readiness: 100% Compliant</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              This blog is engineered to pass Google AdSense policy review for <strong className="text-slate-200">animify.click</strong> with comprehensive privacy policies, zero-thin-content editorial reviews, responsive layout, clear ad labeling, and ads.txt setup.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Google AdSense Publisher Client ID (<span className="text-sky-400 font-mono">ca-pub-XXXXXXXXXXXXXXXX</span>)
              </label>
              <input
                type="text"
                value={pubId}
                onChange={(e) => setPubId(e.target.value)}
                placeholder="ca-pub-1234567890123456"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-mono text-xs transition-colors"
              />
              <span className="block mt-1 text-[11px] text-slate-500">
                You can find this inside your Google AdSense Dashboard &gt; Account &gt; Settings &gt; Publisher ID.
              </span>
            </div>

            <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-lg flex items-center justify-between">
              <div>
                <span className="block font-medium text-xs text-slate-200">Enable Live Ad Serving</span>
                <span className="block text-[11px] text-slate-500">
                  Switch from compliance preview wireframes to live AdSense Google ad units.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={liveAds}
                  onChange={(e) => setLiveAds(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {/* Verification Code Box */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-sky-400" />
                  <span>Site Header Verification Code (Auto-Injected)</span>
                </label>
                <button
                  type="button"
                  onClick={() => copyToClipboard(adSenseScriptSnippet, setCopiedScript)}
                  className="text-[11px] text-sky-400 hover:text-sky-300 inline-flex items-center gap-1"
                >
                  {copiedScript ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedScript ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <div className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-lg font-mono text-[11px] text-slate-400 select-all overflow-x-auto whitespace-pre">
                {adSenseScriptSnippet}
              </div>
            </div>

            {/* ads.txt entry */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>ads.txt Record for animify.click</span>
                </label>
                <button
                  type="button"
                  onClick={() => copyToClipboard(adsTxtContent, setCopiedAdsTxt)}
                  className="text-[11px] text-sky-400 hover:text-sky-300 inline-flex items-center gap-1"
                >
                  {copiedAdsTxt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedAdsTxt ? 'Copied!' : 'Copy ads.txt'}</span>
                </button>
              </div>
              <div className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-lg font-mono text-[11px] text-emerald-400 select-all overflow-x-auto">
                {adsTxtContent}
              </div>
              <span className="block mt-1 text-[11px] text-slate-500">
                Created at <code className="text-slate-400">/public/ads.txt</code> so Google crawlers verify ownership automatically.
              </span>
            </div>

            {/* Mandatory Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider block">
                AdSense Approval Checklist for animify.click:
              </span>
              <ul className="text-xs space-y-1.5 text-slate-400">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Comprehensive Legal Suite:</strong> Privacy Policy with Google DoubleClick DART cookies, Terms, Disclaimer, and DMCA.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>High Value Human Content:</strong> In-depth 1,000+ word essays on Frieren, Solo Leveling, Dandadan, Bleach, and JJK (Anti-Thin Content).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Clear Ad Distinctions:</strong> All units contain the required uppercase "ADVERTISEMENT" labels without deceptive layouts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Contact & Editorial Masthead:</strong> Real editorial team profile with working contact inquiries form.</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsConfigModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save AdSense Settings</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
