import React, { useState } from 'react';
import { 
  Activity, Moon, Droplets, Zap, ShieldCheck, 
  X, Check, Flame, Clock, Heart, Sparkles, AlertCircle 
} from 'lucide-react';
import { AdSenseBanner } from './AdSenseBanner';

interface SeasonalRadarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeasonalRadar: React.FC<SeasonalRadarProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'zone2' | 'fasting' | 'sleep' | 'hydration'>('zone2');

  // Zone 2 Calculator State
  const [age, setAge] = useState<number>(35);
  const [restingHr, setRestingHr] = useState<number>(62);

  // Fasting Timeline State
  const [fastHours, setFastHours] = useState<number>(16);

  // Sleep Calculator State
  const [wakeHour, setWakeHour] = useState<number>(7);
  const [wakeMinute, setWakeMinute] = useState<number>(0);

  // Hydration State
  const [bodyweightKg, setBodyweightKg] = useState<number>(72);
  const [activityHours, setActivityHours] = useState<number>(1);

  if (!isOpen) return null;

  // Zone 2 Karvonen Formula: Target HR = ((Max HR - Resting HR) * Intensity) + Resting HR
  // Max HR ~ 220 - Age (or Gellish formula 207 - 0.7 * Age)
  const maxHr = Math.round(207 - (0.7 * age));
  const hrReserve = maxHr - restingHr;
  const zone2Low = Math.round((hrReserve * 0.60) + restingHr);
  const zone2High = Math.round((hrReserve * 0.70) + restingHr);

  // Water need calculation: 35ml per kg baseline + 700ml per hour of sweat/exercise
  const dailyWaterLiters = ((bodyweightKg * 0.035) + (activityHours * 0.7)).toFixed(1);
  const dailySodiumMg = 3000 + (activityHours * 800);
  const dailyPotassiumMg = 3500;
  const dailyMagnesiumMg = Math.round(bodyweightKg * 6);

  // Sleep 90-minute cycles backwards from wake time
  // 5 cycles = 7.5 hours (+ 15 mins to fall asleep) = 7h 45m before wake time
  // 6 cycles = 9.0 hours (+ 15 mins) = 9h 15m
  const formatTime = (h: number, m: number) => {
    let period = 'AM';
    let displayH = h;
    if (displayH >= 12) {
      period = 'PM';
      if (displayH > 12) displayH -= 12;
    }
    if (displayH === 0) displayH = 12;
    const displayM = m < 10 ? `0${m}` : m;
    return `${displayH}:${displayM} ${period}`;
  };

  const getSleepOptions = () => {
    const totalWakeMins = (wakeHour * 60) + wakeMinute;
    // 5 cycles (7h30m + 15m latency = 465 mins before)
    let fiveCyclesMin = (totalWakeMins - 465 + 1440) % 1440;
    // 6 cycles (9h00m + 15m latency = 555 mins before)
    let sixCyclesMin = (totalWakeMins - 555 + 1440) % 1440;
    // 4 cycles (6h00m + 15m latency = 375 mins before)
    let fourCyclesMin = (totalWakeMins - 375 + 1440) % 1440;

    return [
      { cycles: 5, hours: '7.5 hrs', time: formatTime(Math.floor(fiveCyclesMin / 60), fiveCyclesMin % 60), tag: 'Recommended' },
      { cycles: 6, hours: '9.0 hrs', time: formatTime(Math.floor(sixCyclesMin / 60), sixCyclesMin % 60), tag: 'Deep Recovery' },
      { cycles: 4, hours: '6.0 hrs', time: formatTime(Math.floor(fourCyclesMin / 60), fourCyclesMin % 60), tag: 'Minimum' },
    ];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-display text-slate-100">
                  Interactive Longevity & Health Lab
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Clinical Protocols
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Evidence-based calculators for Zone 2 cardio, cellular autophagy, circadian sleep, and hydration.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 p-3 bg-slate-950/60 border-b border-slate-800 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab('zone2')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'zone2'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-sky-400" />
            <span>Zone 2 Cardio & VO2 Max</span>
          </button>

          <button
            onClick={() => setActiveTab('fasting')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'fasting'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-emerald-400" />
            <span>Autophagy Fasting Clock</span>
          </button>

          <button
            onClick={() => setActiveTab('sleep')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'sleep'
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-indigo-400" />
            <span>90-Min Sleep Cycles</span>
          </button>

          <button
            onClick={() => setActiveTab('hydration')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'hydration'
                ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-teal-400" />
            <span>Cellular Hydration & Salt</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {/* TAB 1: ZONE 2 CARDIO */}
          {activeTab === 'zone2' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">
                      Your Age (Years): <strong className="text-sky-400 font-mono-num">{age}</strong>
                    </label>
                    <input 
                      type="range" 
                      min="18" 
                      max="85" 
                      value={age} 
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">
                      Resting Heart Rate (BPM upon waking): <strong className="text-sky-400 font-mono-num">{restingHr}</strong>
                    </label>
                    <input 
                      type="range" 
                      min="40" 
                      max="90" 
                      value={restingHr} 
                      onChange={(e) => setRestingHr(Number(e.target.value))}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Calculated using the <em>Karvonen Heart Rate Reserve Formula</em> (endorsed by the American College of Sports Medicine). Zone 2 is the exact biological intensity where fat oxidation is highest and blood lactate remains under 2.0 mmol/L.
                  </p>
                </div>

                {/* Result Card */}
                <div className="p-6 rounded-2xl bg-slate-950 border border-sky-500/30 space-y-4 shadow-xl">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 block">
                    Your Personalized Longevity Aerobic Zone
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono-num">
                      {zone2Low} – {zone2High}
                    </span>
                    <span className="text-sm font-mono text-slate-400">BPM</span>
                  </div>

                  <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Estimated Max Heart Rate:</span>
                      <strong className="font-mono-num">{maxHr} BPM</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Weekly Minimum Dosage:</span>
                      <strong className="text-emerald-400">150–180 minutes</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Subjective Check:</span>
                      <span className="text-slate-400">Can speak full sentences (The Talk Test)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AUTOPHAGY FASTING CLOCK */}
          {activeTab === 'fasting' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-xs font-mono text-slate-400 block">
                  Select Fasting Duration: <strong className="text-emerald-400 font-mono-num">{fastHours} Hours</strong>
                </label>
                <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                  {[14, 16, 20, 24].map((hrs) => (
                    <button
                      key={hrs}
                      onClick={() => setFastHours(hrs)}
                      className={`p-2.5 rounded-lg border text-center transition-all ${
                        fastHours === hrs 
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {hrs}h Fast
                    </button>
                  ))}
                </div>
              </div>

              {/* Biological Timeline Milestones */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                    0-8h
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Digestion & Insulin Clearance</h4>
                    <p className="text-[11px] text-slate-400 font-sans mt-0.5">Blood sugar stabilizes; dietary glucose is cleared into cells; insulin drops toward baseline.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                    12h
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Lipolysis & Ketogenesis Kickoff</h4>
                    <p className="text-[11px] text-slate-400 font-sans mt-0.5">Liver glycogen depletes; beta-oxidation shifts mitochondrial fuel to free fatty acids and BHB ketones.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40 flex items-start gap-3 shadow-lg">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                    16h
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-emerald-400">Autophagy Initiation (mTOR Off / AMPK On)</h4>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400">Peak Benefit</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans mt-0.5">Lysosomes begin recycling misfolded proteins and damaged mitochondria across cardiac and cerebral cells.</p>
                  </div>
                </div>

                {fastHours >= 24 && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-500/40 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                      24h
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-purple-300">Deep Systemic Mitophagy & Stem Cell Trigger</h4>
                      <p className="text-[11px] text-slate-400 font-sans mt-0.5">Intestinal stem cell rejuvenation increases; high growth hormone surge protects lean skeletal muscle.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SLEEP CYCLES */}
          {activeTab === 'sleep' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-xs font-mono text-slate-400 block">Target Wake Up Time:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <select 
                      value={wakeHour} 
                      onChange={(e) => setWakeHour(Number(e.target.value))}
                      className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-sm font-mono text-slate-100"
                    >
                      {[5,6,7,8,9,10].map(h => (
                        <option key={h} value={h}>{h}:00 AM</option>
                      ))}
                    </select>
                  </div>
                </div>
                <p className="text-xs text-slate-400 max-w-sm font-sans">
                  Waking up in the middle of a 90-minute REM/NREM sleep cycle triggers severe <em>sleep inertia</em> (grogginess). Waking at cycle completion feels effortless and energized.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {getSleepOptions().map((opt, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-colors space-y-2 text-center"
                  >
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400">
                      {opt.tag}
                    </span>
                    <h3 className="text-2xl font-bold font-mono-num text-slate-100">{opt.time}</h3>
                    <p className="text-xs text-slate-400 font-mono">{opt.cycles} Complete Cycles ({opt.hours})</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: HYDRATION & SALTS */}
          {activeTab === 'hydration' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">
                    Bodyweight (KG): <strong className="text-teal-400 font-mono-num">{bodyweightKg} kg</strong>
                  </label>
                  <input 
                    type="range" 
                    min="45" 
                    max="120" 
                    value={bodyweightKg} 
                    onChange={(e) => setBodyweightKg(Number(e.target.value))}
                    className="w-full accent-teal-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">
                    Daily Exercise / Heat Exposure: <strong className="text-teal-400 font-mono-num">{activityHours} Hour(s)</strong>
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="3" 
                    step="0.5" 
                    value={activityHours} 
                    onChange={(e) => setActivityHours(Number(e.target.value))}
                    className="w-full accent-teal-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Daily Water</span>
                  <span className="text-xl font-bold text-teal-400 font-mono-num">{dailyWaterLiters} L</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Sodium Target</span>
                  <span className="text-xl font-bold text-slate-100 font-mono-num">{dailySodiumMg} mg</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Potassium</span>
                  <span className="text-xl font-bold text-slate-100 font-mono-num">{dailyPotassiumMg} mg</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Magnesium</span>
                  <span className="text-xl font-bold text-emerald-400 font-mono-num">{dailyMagnesiumMg} mg</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Drinking large quantities of plain demineralized water without electrolytes can dilute blood sodium (hyponatremia), inducing fatigue and headaches. Always pair hydration with a pinch of unrefined sea salt or bioavailable magnesium glycinate.
              </p>
            </div>
          )}

          {/* AdSense Compliant Banner inside Lab modal */}
          <AdSenseBanner slotType="in-article" className="mt-4" />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Based on ACSM & Harvard Health Guidelines</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors font-semibold"
          >
            Close Lab
          </button>
        </div>
      </div>
    </div>
  );
};
