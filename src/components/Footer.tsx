import React from 'react';
import { LegalTab } from './LegalModal';
import { useAdSense } from '../context/AdSenseContext';
import { ShieldCheck, Mail, FileText, Globe, MapPin, Award } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (tab: LegalTab) => void;
  onSelectCategory: (cat: string) => void;
  onOpenRadar: () => void;
  onOpenNewsletter: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegal,
  onSelectCategory,
  onOpenRadar,
  onOpenNewsletter,
}) => {
  const { setIsConfigModalOpen, isAdSenseConfigured } = useAdSense();

  return (
    <footer className="w-full bg-[#070a10] light:bg-slate-100 border-t border-slate-800/80 light:border-slate-200 pt-12 pb-16 text-slate-400 light:text-slate-600 font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand & Domain Masthead */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-1.5 text-lg font-bold font-display text-slate-100 light:text-slate-900">
              <span className="text-emerald-400">Animify Health</span>
              <span className="text-sky-400 font-mono text-sm">.click</span>
            </div>
            <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed font-sans">
              Inspired by world-class health & lifestyle publications: An evidence-based clinical magazine covering cellular longevity, metabolic health, microbiome science, circadian biology, and preventative medicine across the US, UK, and worldwide.
            </p>
            <div className="pt-1 space-y-1 text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Editorial Bureaus: Boston (US) & London (UK)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Domain: <strong className="text-slate-300 light:text-slate-700">animify.click</strong></span>
              </div>
            </div>
          </div>

          {/* Column 2: Health & Longevity Departments */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 light:text-slate-800">
              Clinical Departments
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('Longevity & Biohacking')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Longevity & Autophagy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Nutrition & Gut Health')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Microbiome & Gut-Brain
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Mental Health & Neuroscience')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Neuroscience & Vagus Nerve
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Sleep Science & Recovery')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Sleep Architecture & Glymphatics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Fitness & Metabolic Health')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Zone 2 Cardio & VO2 Max
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Preventative Medicine')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Preventative ApoB & CAC Testing
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRadar}
                  className="hover:text-emerald-400 transition-colors text-emerald-400 font-medium"
                >
                  Interactive Health Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Google AdSense Mandatory Legal Suite & SEO */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 light:text-slate-800">
              AdSense & Transparency
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  Privacy Policy & DART Cookies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('disclaimer')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  AdSense & Affiliate Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('dmca')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  DMCA Copyright & Fair Use
                </button>
              </li>
              <li>
                <a
                  href="/ads.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1"
                >
                  <FileText className="w-3 h-3 text-emerald-400" />
                  <span>ads.txt Verification File</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Masthead & Contact Inquiries */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 light:text-slate-800">
              Editorial Desk
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onOpenLegal('about')}
                  className="hover:text-sky-400 transition-colors"
                >
                  About Animify & Editorial Board
                </button>
              </li>
              <li>
                <a
                  href="mailto:info@animify.click"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-emerald-400 font-semibold"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>info@animify.click</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('contact')}
                  className="hover:text-emerald-400 transition-colors text-slate-400"
                >
                  Contact Form (US & UK)
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => setIsConfigModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 light:bg-white border border-slate-800 light:border-slate-300 rounded text-[11px] text-slate-300 light:text-slate-700 hover:border-slate-700 transition-colors"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Google AdSense: {isAdSenseConfigured ? 'Connected' : 'Ready'}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Disclaimers */}
        <div className="pt-8 border-t border-slate-800/80 light:border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 light:text-slate-500">
          <p>
            © 2026 Animify Lifestyle (<strong>animify.click</strong>). All rights reserved. Registered and formatted for US & UK search quality standards.
          </p>

          <p className="text-right text-[10px] text-slate-500 max-w-md">
            All editorial photography, clinical citations, and trademarks belong to their respective institutions. Primary citations provided for academic research and consumer wellness education.
          </p>
        </div>
      </div>
    </footer>
  );
};
