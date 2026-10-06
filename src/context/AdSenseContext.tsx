import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdSenseConfig {
  publisherId: string;
  enableLiveAds: boolean;
  headerSlot: string;
  inArticleSlot: string;
  sidebarSlot: string;
  footerSlot: string;
}

interface AdSenseContextType {
  config: AdSenseConfig;
  updateConfig: (newConfig: Partial<AdSenseConfig>) => void;
  isAdSenseConfigured: boolean;
  adsTxtContent: string;
  isConfigModalOpen: boolean;
  setIsConfigModalOpen: (open: boolean) => void;
}

const DEFAULT_CONFIG: AdSenseConfig = {
  publisherId: 'ca-pub-3141399498660167',
  enableLiveAds: true,
  headerSlot: '1234567890',
  inArticleSlot: '2345678901',
  sidebarSlot: '3456789012',
  footerSlot: '4567890123',
};

const AdSenseContext = createContext<AdSenseContextType | undefined>(undefined);

export const AdSenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AdSenseConfig>(() => {
    try {
      const saved = localStorage.getItem('animify_adsense_config');
      if (saved) return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    } catch {
      // ignore
    }
    return DEFAULT_CONFIG;
  });

  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  // Sync script tag if live ads enabled and publisherId provided
  useEffect(() => {
    if (config.enableLiveAds && config.publisherId && config.publisherId.startsWith('ca-pub-')) {
      const scriptId = 'google-adsense-script';
      let existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!existingScript) {
        existingScript = document.createElement('script');
        existingScript.id = scriptId;
        existingScript.async = true;
        existingScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.publisherId}`;
        existingScript.crossOrigin = 'anonymous';
        document.head.appendChild(existingScript);
      }
    }
  }, [config.enableLiveAds, config.publisherId]);

  const updateConfig = (newConfig: Partial<AdSenseConfig>) => {
    setConfig(prev => {
      let finalNewConfig = { ...newConfig };
      if (finalNewConfig.publisherId !== undefined) {
        let pid = finalNewConfig.publisherId.trim();
        if (pid.startsWith('pub-')) {
          pid = 'ca-' + pid;
        }
        finalNewConfig.publisherId = pid;
      }
      const updated = { ...prev, ...finalNewConfig };
      try {
        localStorage.setItem('animify_adsense_config', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const isAdSenseConfigured = Boolean(config.publisherId && config.publisherId.trim().length > 0);

  const cleanPubId = config.publisherId.startsWith('ca-') 
    ? config.publisherId.replace('ca-', '') 
    : (config.publisherId || 'pub-3141399498660167');
  const adsTxtContent = `google.com, ${cleanPubId}, DIRECT, f08c47fec0942fa0`;

  return (
    <AdSenseContext.Provider
      value={{
        config,
        updateConfig,
        isAdSenseConfigured,
        adsTxtContent,
        isConfigModalOpen,
        setIsConfigModalOpen,
      }}
    >
      {children}
    </AdSenseContext.Provider>
  );
};

export const useAdSense = () => {
  const context = useContext(AdSenseContext);
  if (!context) {
    throw new Error('useAdSense must be used within an AdSenseProvider');
  }
  return context;
};
