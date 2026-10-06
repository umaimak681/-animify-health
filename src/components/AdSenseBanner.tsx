import React, { useEffect } from 'react';
import { useAdSense } from '../context/AdSenseContext';
import { Settings, ExternalLink } from 'lucide-react';

interface AdSenseBannerProps {
  slotType: 'header-leaderboard' | 'in-article' | 'sidebar' | 'footer-banner';
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ slotType, className = '' }) => {
  const { config, setIsConfigModalOpen } = useAdSense();

  const getSlotDetails = () => {
    switch (slotType) {
      case 'header-leaderboard':
        return {
          slotId: config.headerSlot,
          dimensions: '728 × 90 px (Leaderboard)',
          format: 'horizontal',
          minHeight: 'min-h-[90px]',
          maxWidth: 'max-w-[728px]',
        };
      case 'in-article':
        return {
          slotId: config.inArticleSlot,
          dimensions: 'Responsive In-Article Flow',
          format: 'fluid',
          minHeight: 'min-h-[140px]',
          maxWidth: 'max-w-[740px]',
        };
      case 'sidebar':
        return {
          slotId: config.sidebarSlot,
          dimensions: '300 × 250 px (Medium Rectangle)',
          format: 'rectangle',
          minHeight: 'min-h-[250px]',
          maxWidth: 'max-w-[300px]',
        };
      case 'footer-banner':
        return {
          slotId: config.footerSlot,
          dimensions: '970 × 90 px (Large Leaderboard)',
          format: 'horizontal',
          minHeight: 'min-h-[90px]',
          maxWidth: 'max-w-[970px]',
        };
    }
  };

  const details = getSlotDetails();

  useEffect(() => {
    if (config.enableLiveAds && config.publisherId && window.adsbygoogle) {
      try {
        window.adsbygoogle.push({});
      } catch (err) {
        console.warn('AdSense ad push warning:', err);
      }
    }
  }, [config.enableLiveAds, config.publisherId, slotType]);

  return (
    <div className={`w-full my-6 flex flex-col items-center justify-center ${className}`}>
      {/* AdSense Policy Mandatory Label */}
      <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-1 select-none">
        Advertisement
      </span>

      <div
        className={`w-full ${details.maxWidth} ${details.minHeight} bg-slate-900/60 border border-dashed border-slate-700/60 rounded-lg p-3 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-slate-600 relative overflow-hidden`}
      >
        {config.enableLiveAds && config.publisherId ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', minHeight: '90px' }}
            data-ad-client={config.publisherId}
            data-ad-slot={details.slotId}
            data-ad-format={details.format === 'fluid' ? 'fluid' : 'auto'}
            data-full-width-responsive="true"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1.5 py-3 px-4">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Google AdSense Placement · {details.dimensions}</span>
            </div>
            <p className="text-[11px] text-slate-500 max-w-sm">
              IAB standard compliant placement for <strong className="text-slate-400">animify.click</strong>.
            </p>
            <button
              onClick={() => setIsConfigModalOpen(true)}
              className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-sky-400 hover:text-sky-300 font-medium hover:underline transition-colors"
            >
              <Settings className="w-3 h-3" />
              <span>Setup / Connect Publisher ID</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
