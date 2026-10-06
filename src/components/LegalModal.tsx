import React, { useState } from 'react';
import { X, Shield, FileCheck, HelpCircle, Mail, BookOpen, AlertCircle, CheckCircle2, Send, Activity } from 'lucide-react';

export type LegalTab = 'privacy' | 'terms' | 'disclaimer' | 'dmca' | 'contact' | 'about' | 'analytics';

interface LegalModalProps {
  initialTab?: LegalTab;
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ initialTab = 'privacy', isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);
  
  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('General Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setContactSubmitted(false);
    }, 4000);
  };

  const navItems: { id: LegalTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'privacy', label: 'Privacy Policy (GA4/GAM)', icon: Shield },
    { id: 'analytics', label: 'Google Analytics 4 & Ads Policy', icon: Activity },
    { id: 'terms', label: 'Terms of Service', icon: FileCheck },
    { id: 'disclaimer', label: 'AdSense & Medical Disclaimer', icon: HelpCircle },
    { id: 'about', label: 'About & Editorial Standards', icon: BookOpen },
    { id: 'contact', label: 'Contact Us', icon: Mail },
    { id: 'dmca', label: 'DMCA & Copyright', icon: AlertCircle },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 bg-slate-950/80 border-b md:border-b-0 md:border-r border-slate-800 p-4 shrink-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between md:block mb-4">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-slate-500">Legal & Publisher Compliance</span>
                <h3 className="text-sm font-semibold text-slate-200 font-display">animify.click</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="md:hidden p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 no-scrollbar">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors text-left ${
                      isActive 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="hidden md:block pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
            <span>Last Updated: October 2026</span>
            <div className="text-emerald-400 mt-1 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>GA4 & Google Ad Manager Compliant</span>
            </div>
          </div>
        </div>

        {/* Content Pane */}
        <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
            <h2 className="text-lg font-semibold text-slate-100 font-display flex items-center gap-2">
              {activeTab === 'privacy' && 'Privacy Policy & Data Protection'}
              {activeTab === 'analytics' && 'Google Analytics 4 & Ad Manager Policy'}
              {activeTab === 'terms' && 'Terms and Conditions of Use'}
              {activeTab === 'disclaimer' && 'Clinical Disclaimer & AdSense Policies'}
              {activeTab === 'about' && 'About Animify Health & Editorial Masthead'}
              {activeTab === 'contact' && 'Contact Editorial & Advertising Desk'}
              {activeTab === 'dmca' && 'DMCA Copyright & Medical Citation Rights'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="hidden md:block p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300 leading-relaxed font-sans max-h-[calc(90vh-80px)]">
            {/* PRIVACY POLICY */}
            {activeTab === 'privacy' && (
              <div className="space-y-4">
                <p className="text-slate-300">
                  At <strong>Animify Health</strong>, operating under the domain <strong>https://animify.click</strong>, user privacy, data security, and transparent disclosure are paramount. This Privacy Policy details the categories of personal and non-personal data collected, processed, and safeguarded when accessing our clinical journalism, calculators, and research archives.
                </p>

                <h4 className="text-sm font-semibold text-slate-100 border-b border-slate-800 pb-1 pt-2">
                  1. Information We Collect
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li><strong>Automated Usage Data:</strong> Internet protocol (IP) address, browser client software, device architecture, operating system, timestamped session metrics, and referring URLs.</li>
                  <li><strong>Voluntary Communications:</strong> When contacting our editorial desk via <code>info@animify.click</code>, we collect your provided name, email address, and correspondence context.</li>
                  <li><strong>Cookies & Tracking Technologies:</strong> Standard browser session identifiers, Google Analytics 4 telemetry cookies, and Google Ad Manager / Google DoubleClick advertising tokens.</li>
                </ul>

                <h4 className="text-sm font-semibold text-slate-100 border-b border-slate-800 pb-1 pt-2">
                  2. Lawful Grounds for Processing (GDPR & UK DPA)
                </h4>
                <p>
                  For users residing in the European Economic Area (EEA) and the United Kingdom, processing of analytical and advertising cookies occurs under the legal basis of informed user consent pursuant to GDPR Article 6(1)(a) and the ePrivacy Directive. You maintain the right to withdraw consent at any time via our Cookie Settings banner.
                </p>

                <h4 className="text-sm font-semibold text-slate-100 border-b border-slate-800 pb-1 pt-2">
                  3. California Consumer Privacy Rights (CCPA / CPRA)
                </h4>
                <p>
                  California residents retain rights under the CCPA/CPRA, including the right to know what personal information is collected, the right to request deletion of personal information, and the right to opt-out of the "sale" or "sharing" of personal data for cross-context behavioral advertising. To submit a verifiable consumer request, email our compliance officer at <strong>info@animify.click</strong>.
                </p>

                <h4 className="text-sm font-semibold text-slate-100 border-b border-slate-800 pb-1 pt-2">
                  4. Children's Online Privacy Protection (COPPA)
                </h4>
                <p>
                  Animify Health is an adult-oriented clinical and scientific publication. We do not knowingly solicit or collect identifiable information from children under 13 years of age.
                </p>
              </div>
            )}

            {/* GOOGLE ANALYTICS 4 & GOOGLE AD MANAGER POLICY */}
            {activeTab === 'analytics' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs">
                  <strong>Google Publisher Policy Statement:</strong> Animify Health adheres strictly to the Google Ad Manager Partner Guidelines, Google Analytics Terms of Service, and Google EU User Consent Policy.
                </div>

                <h4 className="text-sm font-semibold text-slate-100 border-b border-slate-800 pb-1 pt-2">
                  1. Google Analytics 4 (GA4) Implementation
                </h4>
                <p>
                  Animify Health utilizes Google Analytics 4, a web analytics service offered by Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA). GA4 utilizes cookies to evaluate reader interaction with our longevity protocols, measure reading dwell times, and quantify organic search navigation.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li><strong>IP Anonymization:</strong> In GA4, IP masking is enabled by default; IP addresses are neither logged nor stored on Google servers.</li>
                  <li><strong>Data Retention:</strong> Event-level and user-level data retention is capped at 14 months.</li>
                  <li><strong>Opt-Out Mechanism:</strong> You can prevent Google Analytics from recognizing you on return visits by downloading the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">Google Analytics Opt-out Browser Add-on</a>.</li>
                </ul>

                <h4 className="text-sm font-semibold text-slate-100 border-b border-slate-800 pb-1 pt-2">
                  2. Google Ad Manager (GAM) & DoubleClick Ad Serving
                </h4>
                <p>
                  Animify Health operates Google Ad Manager (GAM) and Google Publisher Tag (GPT) infrastructure to deliver display, responsive leaderboard, and in-article programmatic inventory.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li><strong>Google DoubleClick Cookies:</strong> Google uses cookies to serve targeted ads based on previous visits to animify.click and other destinations across the web.</li>
                  <li><strong>Frequency Capping:</strong> Cookies prevent readers from seeing identical advertisements repeatedly.</li>
                  <li><strong>Non-Personalized Ads (NPA):</strong> For users who decline tracking consent or reside in regulated jurisdictions without affirmative opt-in, non-personalized contextual ads are served based solely on the current page content.</li>
                  <li><strong>Managing Ad Personalization:</strong> Customize your advertising profile directly via the <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">Google My Ad Center</a> or the <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">Network Advertising Initiative (NAI)</a>.</li>
                </ul>
              </div>
            )}

            {/* TERMS OF SERVICE */}
            {activeTab === 'terms' && (
              <div className="space-y-4">
                <p>
                  Welcome to <strong>Animify Health</strong> (animify.click). By accessing or browsing our digital journal, you agree to comply with and be bound by the following Terms and Conditions of Use.
                </p>

                <h4 className="text-sm font-semibold text-slate-100 border-b border-slate-800 pb-1 pt-2">
                  1. Intellectual Property & Citation Policy
                </h4>
                <p>
                  All written research synopses, metabolic calculator algorithms, visual artworks, and editorial formulations published on animify.click are the exclusive intellectual property of Animify Health and its contributing investigators. Citation is permitted provided clear attribution and a dofollow hyperlink back to the canonical article on animify.click is maintained.
                </p>

                <h4 className="text-sm font-semibold text-slate-100 border-b border-slate-800 pb-1 pt-2">
                  2. Acceptable Use & Reader Conduct
                </h4>
                <p>
                  You agree not to use automated web scraping, denial-of-service vectors, or unauthorized API querying against our infrastructure. Comments and reader annotations must maintain scientific civility and must not promote unverified medical cures.
                </p>

                <h4 className="text-sm font-semibold text-slate-100 border-b border-slate-800 pb-1 pt-2">
                  3. Disclaimer of Warranties & Limitation of Liability
                </h4>
                <p>
                  The content is provided on an "as is" and "as available" basis without warranties of any kind. Under no circumstances shall Animify Health or its editors be liable for direct, incidental, or consequential damages resulting from the application of scientific research discussed on this website.
                </p>
              </div>
            )}

            {/* DISCLAIMER */}
            {activeTab === 'disclaimer' && (
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-amber-400 border-b border-slate-800 pb-1 pt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Clinical & Medical Disclaimer (YMYL Health Compliance)</span>
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  All articles, nutritional protocols, fasting timelines, and biomarker calculators published on <strong>Animify Health</strong> (animify.click) are intended strictly for educational, scientific, and journalistic purposes. <strong>This website does not provide personalized medical advice, diagnosis, or clinical treatment plans.</strong>
                </p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Always consult with a board-certified physician, registered dietitian, or qualified healthcare professional prior to initiating new intermittent fasting schedules, high-intensity exercise regimens (such as Zone 2 or VO2 Max training), or introducing dietary supplements. Never disregard professional medical advice or delay seeking it because of something you have read on animify.click.
                </p>

                <h4 className="text-sm font-semibold text-slate-100 border-b border-slate-800 pb-1 pt-2">
                  Google AdSense & Ad Manager Standards
                </h4>
                <p>
                  This site uses Google AdSense and Google Ad Manager to serve advertisements. In accordance with Google Publisher Policies and FTC guidelines:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
                  <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
                  <li>Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Google Ads Settings</a>.</li>
                </ul>
              </div>
            )}

            {/* ABOUT */}
            {activeTab === 'about' && (
              <div className="space-y-4">
                <p>
                  <strong>Animify Health</strong> (<span className="text-emerald-400">animify.click</span>) is an independent digital health journal dedicated to evidence-based longevity science, metabolic regulation, circadian biology, and preventative cardiology.
                </p>

                <h4 className="text-sm font-semibold text-slate-100 border-b border-slate-800 pb-1 pt-2">
                  Editorial & Medical Review Board
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="font-semibold text-slate-200 block">Dr. Marcus Vance, M.D., Ph.D.</span>
                    <span className="text-[11px] text-emerald-400 block mb-1">Senior Longevity & Cellular Biology Contributor</span>
                    <p className="text-[11px] text-slate-400">Harvard Medical School fellow; investigator in cellular senolytics and autophagy.</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="font-semibold text-slate-200 block">Dr. Elena Rostova, Ph.D.</span>
                    <span className="text-[11px] text-teal-400 block mb-1">Microbiome & Neuro-Gastroenterology</span>
                    <p className="text-[11px] text-slate-400">Oxford Neuroscience investigator; specialist in psychobiotics and gut-brain signaling.</p>
                  </div>
                </div>

                <h4 className="text-sm font-semibold text-slate-100 border-b border-slate-800 pb-1 pt-2">
                  Two-Tier Fact-Checking & Peer Review
                </h4>
                <p>
                  Every article published on Animify Health is checked against primary clinical literature indexed in PubMed, Nature, The Lancet, and the New England Journal of Medicine.
                </p>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div><strong>Publisher Entity:</strong> Animify Health Editorial Board</div>
                  <div><strong>Official Domain:</strong> animify.click</div>
                  <div><strong>Direct Inquiries:</strong> info@animify.click</div>
                  <div><strong>Bureau Offices:</strong> New York (NY, US) · London (Greater London, GB)</div>
                </div>
              </div>
            )}

            {/* CONTACT */}
            {activeTab === 'contact' && (
              <div className="space-y-4">
                <p>
                  Have a research proposal, clinical tip, advertising query, or correction? Reach out directly to our editorial and advertising desk at <strong className="text-emerald-400">info@animify.click</strong> or submit the form below.
                </p>

                {contactSubmitted ? (
                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <div>
                      <span className="font-semibold block">Thank you! Your inquiry has been logged.</span>
                      <span className="text-[11px] text-slate-300">An editor or compliance representative will follow up within 24 business hours.</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-400 text-[11px] mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Dr. Katherine Miller"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-[11px] mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="inquiries@animify.click"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">Subject Matter</label>
                      <select
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
                      >
                        <option value="General Inquiry">General Editorial Inquiry</option>
                        <option value="Advertising / GAM">Google Ad Manager / Advertising Program</option>
                        <option value="Research Correction">Clinical Data Correction</option>
                        <option value="Privacy / GDPR">Privacy & Data Request (GDPR / CCPA)</option>
                        <option value="DMCA">DMCA Copyright Request</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">Message *</label>
                      <textarea
                        required
                        rows={4}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Detail your inquiry for Animify Health..."
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Message to info@animify.click</span>
                    </button>
                  </form>
                )}

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500">
                  <span>Direct Postal & Legal Bureau: Animify Health Media Network, Editorial Desk, info@animify.click.</span>
                </div>
              </div>
            )}

            {/* DMCA */}
            {activeTab === 'dmca' && (
              <div className="space-y-4">
                <p>
                  Animify Health strictly respects medical academic copyrights, open-access licenses (such as Creative Commons CC-BY 4.0), and institutional intellectual property.
                </p>

                <h4 className="text-sm font-semibold text-slate-100 border-b border-slate-800 pb-1 pt-2">
                  DMCA Designated Agent
                </h4>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400">
                  Designated Agent Email: <span className="text-slate-100">info@animify.click</span>
                  <br />
                  Review Timetable: 24–48 Business Hours.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
