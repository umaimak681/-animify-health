import React from 'react';
import { motion } from 'motion/react';

interface ArtworkProps {
  id: string;
  className?: string;
}

export const EditorialArtwork: React.FC<ArtworkProps> = ({ id, className = '' }) => {
  switch (id) {
    case 'intermittent-fasting-autophagy-protocol':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-emerald-950 via-[#06241a] to-[#04130d] flex items-center justify-center ${className}`}>
          {/* Animated Atmospheric Bio-Glow */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-56 h-56 rounded-full bg-gradient-to-t from-emerald-500/25 via-teal-400/20 to-transparent blur-3xl pointer-events-none"
          />

          <svg className="w-full h-full object-cover" viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="dnaGrad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="dnaGrad2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <radialGradient id="vesicleGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Microscopic Grid Background */}
            <pattern id="bioGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.08" />
            </pattern>
            <rect width="600" height="360" fill="url(#bioGrid)" />

            {/* Central Autophagosome Recycling Vesicle */}
            <motion.circle 
              cx="300" cy="180" r="85" 
              fill="url(#vesicleGlow)"
              animate={{ r: [82, 88, 82], opacity: [0.6, 0.85, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <circle cx="300" cy="180" r="85" stroke="#34d399" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity="0.4" />
            <circle cx="300" cy="180" r="105" stroke="#10b981" strokeWidth="1" strokeDasharray="3 6" strokeOpacity="0.25" />

            {/* DNA Double Helix Representation */}
            {/* Strand A */}
            <path 
              d="M 120 180 Q 180 100 240 180 T 360 180 T 480 180" 
              stroke="url(#dnaGrad1)" strokeWidth="3" fill="none" strokeLinecap="round" 
            />
            {/* Strand B */}
            <path 
              d="M 120 180 Q 180 260 240 180 T 360 180 T 480 180" 
              stroke="url(#dnaGrad2)" strokeWidth="3" fill="none" strokeLinecap="round" 
            />

            {/* Base Pair Rungs */}
            <line x1="150" y1="135" x2="150" y2="225" stroke="#6ee7b7" strokeWidth="1.5" strokeOpacity="0.5" />
            <line x1="210" y1="140" x2="210" y2="220" stroke="#6ee7b7" strokeWidth="1.5" strokeOpacity="0.5" />
            <line x1="270" y1="140" x2="270" y2="220" stroke="#6ee7b7" strokeWidth="1.5" strokeOpacity="0.5" />
            <line x1="330" y1="140" x2="330" y2="220" stroke="#6ee7b7" strokeWidth="1.5" strokeOpacity="0.5" />
            <line x1="390" y1="135" x2="390" y2="225" stroke="#6ee7b7" strokeWidth="1.5" strokeOpacity="0.5" />
            <line x1="450" y1="140" x2="450" y2="220" stroke="#6ee7b7" strokeWidth="1.5" strokeOpacity="0.5" />

            {/* Glowing Molecular Autophagy Nodes */}
            <circle cx="300" cy="180" r="14" fill="#a7f3d0" />
            <circle cx="300" cy="180" r="6" fill="#064e3b" />
            <circle cx="240" cy="180" r="6" fill="#34d399" />
            <circle cx="360" cy="180" r="6" fill="#38bdf8" />
            <circle cx="180" cy="100" r="5" fill="#6ee7b7" />
            <circle cx="420" cy="100" r="5" fill="#6ee7b7" />

            {/* Floating Energy / Autophagy Particles */}
            <motion.circle 
              cx="260" cy="150" r="3" fill="#a7f3d0"
              animate={{ y: [-15, 15, -15], opacity: [0.2, 0.9, 0.2] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle 
              cx="340" cy="210" r="2.5" fill="#38bdf8"
              animate={{ y: [15, -15, 15], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle 
              cx="380" cy="140" r="3" fill="#6ee7b7"
              animate={{ x: [-10, 10, -10], opacity: [0.4, 0.95, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </div>
      );

    case 'gut-brain-axis-microbiome-mental-health':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-teal-950 via-[#062c2b] to-[#041a1a] flex items-center justify-center ${className}`}>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 w-48 h-48 rounded-full bg-teal-400/20 blur-3xl pointer-events-none"
          />

          <svg className="w-full h-full object-cover" viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="vagusGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
            </defs>

            {/* Neural Brain Wave Horizon at Top */}
            <path d="M 100 80 Q 150 50 200 80 T 300 80 T 400 80 T 500 80" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.4" fill="none" />
            <path d="M 120 70 Q 180 40 240 70 T 360 70 T 480 70" stroke="#2dd4bf" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />

            {/* The Vagus Superhighway Line */}
            <motion.path 
              d="M 300 70 C 300 120 330 160 300 200 C 270 240 300 280 300 310" 
              stroke="url(#vagusGrad)" strokeWidth="3" fill="none" strokeDasharray="6 4"
              animate={{ strokeDashoffset: [0, -40] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Microbiome Colony Clusters at Bottom */}
            {/* Friendly Lactobacilli & Bifidobacteria Capsule Shapes */}
            <rect x="180" y="270" width="36" height="14" rx="7" fill="#2dd4bf" opacity="0.8" transform="rotate(-15 180 270)" />
            <rect x="230" y="285" width="40" height="15" rx="7.5" fill="#38bdf8" opacity="0.75" transform="rotate(25 230 285)" />
            <rect x="330" y="275" width="42" height="14" rx="7" fill="#14b8a6" opacity="0.85" transform="rotate(-20 330 275)" />
            <rect x="390" y="280" width="38" height="15" rx="7.5" fill="#5eead4" opacity="0.8" transform="rotate(10 390 280)" />

            {/* Microscopic Intestinal Villi Silhouette Waves */}
            <path d="M 80 340 Q 95 290 110 340 Q 125 290 140 340 Q 155 290 170 340 Q 185 290 200 340 Q 215 290 230 340 Q 245 290 260 340 Q 275 290 290 340 Q 305 290 320 340 Q 335 290 350 340 Q 365 290 380 340 Q 395 290 410 340 Q 425 290 440 340 Q 455 290 470 340 Q 485 290 500 340 Q 515 290 530 340 L 530 360 L 80 360 Z" fill="#042f2e" opacity="0.8" />

            {/* Neurotransmitter (Serotonin) Pulses Floating Upward */}
            <motion.circle 
              cx="300" cy="230" r="4.5" fill="#5eead4"
              animate={{ cy: [260, 90], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.circle 
              cx="295" cy="200" r="3.5" fill="#38bdf8"
              animate={{ cy: [280, 80], opacity: [0, 0.9, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1, ease: 'easeOut' }}
            />
          </svg>
        </div>
      );

    case 'deep-sleep-circadian-optimization':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-indigo-950 via-[#0e1738] to-[#070b1e] flex items-center justify-center ${className}`}>
          {/* Nocturnal Lunar Glow */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 right-1/4 w-44 h-44 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"
          />

          <svg className="w-full h-full object-cover" viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="moonGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e0e7ff" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>

            {/* Distant Stars */}
            <circle cx="120" cy="80" r="1.5" fill="#c7d2fe" opacity="0.6" />
            <circle cx="210" cy="110" r="1.2" fill="#c7d2fe" opacity="0.4" />
            <circle cx="340" cy="65" r="1.8" fill="#e0e7ff" opacity="0.7" />
            <circle cx="480" cy="95" r="1.5" fill="#c7d2fe" opacity="0.5" />
            <circle cx="430" cy="140" r="1.2" fill="#c7d2fe" opacity="0.4" />

            {/* Glowing Luminous Crescent Moon */}
            <circle cx="400" cy="140" r="50" fill="url(#moonGrad)" opacity="0.9" />
            <circle cx="420" cy="130" r="45" fill="#0e1738" />

            {/* Stage 3 NREM Delta Brain Waveform (0.5–4 Hz) */}
            <path 
              d="M 60 240 Q 120 180 180 240 T 300 240 T 420 240 T 540 240" 
              stroke="#818cf8" strokeWidth="2.5" fill="none" strokeOpacity="0.5" 
            />
            {/* High-Amplitude Slow-Wave Sleep Spindle */}
            <path 
              d="M 210 240 Q 225 150 240 240 Q 255 310 270 240" 
              stroke="#a5b4fc" strokeWidth="3" fill="none" strokeLinecap="round" 
            />

            {/* Glymphatic Fluid Cleansing Wave (Curving Ocean of CSF) */}
            <motion.path 
              d="M 0 290 Q 150 260 300 290 T 600 290 L 600 360 L 0 360 Z" 
              fill="#1e1b4b" opacity="0.85"
              animate={{ d: [
                "M 0 290 Q 150 260 300 290 T 600 290 L 600 360 L 0 360 Z",
                "M 0 280 Q 150 310 300 280 T 600 280 L 600 360 L 0 360 Z",
                "M 0 290 Q 150 260 300 290 T 600 290 L 600 360 L 0 360 Z"
              ]}}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Temperature Thermoregulation Drop Indicator */}
            <circle cx="160" cy="170" r="24" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
            <text x="160" y="174" fill="#a5b4fc" fontSize="11" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">-1.2°C</text>
          </svg>
        </div>
      );

    case 'cortisol-vagus-nerve-nervous-system':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-rose-950 via-[#260e18] to-[#12070c] flex items-center justify-center ${className}`}>
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-52 h-52 rounded-full bg-rose-500/20 blur-3xl pointer-events-none"
          />

          <svg className="w-full h-full object-cover" viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="vagusBranch" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="50%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#fda4af" />
              </linearGradient>
            </defs>

            {/* Brain Stem & Cranial Core at Top */}
            <circle cx="300" cy="60" r="32" stroke="#f43f5e" strokeWidth="2" fill="#200a12" opacity="0.9" />
            <circle cx="300" cy="60" r="16" fill="#fb7185" opacity="0.4" />

            {/* Main Descending Vagal Trunk */}
            <line x1="300" y1="92" x2="300" y2="280" stroke="url(#vagusBranch)" strokeWidth="3" strokeLinecap="round" />

            {/* Parasympathetic Branches */}
            <path d="M 300 120 C 250 140 220 180 200 230" stroke="#fb7185" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.75" />
            <path d="M 300 120 C 350 140 380 180 400 230" stroke="#fb7185" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.75" />
            <path d="M 300 190 C 260 210 230 250 220 290" stroke="#fda4af" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 300 190 C 340 210 370 250 380 290" stroke="#fda4af" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />

            {/* Calming Heart Rate Variability (HRV) Sinusoidal Wave */}
            <motion.path 
              d="M 80 180 Q 140 130 200 180 T 320 180 T 440 180 T 520 180" 
              stroke="#fb7185" strokeWidth="2" fill="none" strokeOpacity="0.4"
              animate={{ strokeDashoffset: [0, -60] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />

            {/* Sympathetic to Parasympathetic Shift Indicator */}
            <rect x="235" y="270" width="130" height="28" rx="14" fill="#380916" stroke="#f43f5e" strokeWidth="1" />
            <text x="300" y="288" fill="#fda4af" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">PARASYMPATHETIC DOMINANCE</text>
          </svg>
        </div>
      );

    case 'zone-2-cardio-mitochondrial-biogenesis':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-sky-950 via-[#07253d] to-[#031320] flex items-center justify-center ${className}`}>
          <motion.div 
            animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-56 h-56 rounded-full bg-sky-500/20 blur-3xl pointer-events-none"
          />

          <svg className="w-full h-full object-cover" viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="mitoGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
            </defs>

            {/* Aerobic EKG / Heart Rate Trace */}
            <path 
              d="M 50 180 L 160 180 L 175 140 L 190 220 L 205 110 L 220 230 L 235 180 L 360 180 L 375 140 L 390 220 L 405 110 L 420 230 L 435 180 L 550 180" 
              stroke="#38bdf8" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeOpacity="0.8" 
            />

            {/* Mitochondrial Inner Membrane Illustration (The Cellular Engine) */}
            <rect x="230" y="70" width="140" height="70" rx="35" stroke="url(#mitoGrad)" strokeWidth="2.5" fill="#082f49" fillOpacity="0.7" />
            {/* Cristae Folds */}
            <path d="M 260 85 C 280 85 280 125 300 125 C 320 125 320 85 340 85" stroke="#7dd3fc" strokeWidth="2" fill="none" />
            <path d="M 255 105 C 275 105 275 115 300 115 C 325 115 325 105 345 105" stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.6" />

            {/* Lactate Threshold Curve Boundary */}
            <path d="M 80 310 C 220 305 380 295 520 220" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.6" />
            <circle cx="360" cy="298" r="6" fill="#38bdf8" />
            <text x="360" y="324" fill="#7dd3fc" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">ZONE 2: &lt; 2.0 mmol/L LACTATE</text>
          </svg>
        </div>
      );

    case 'anti-inflammatory-mediterranean-longevity':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-amber-950 via-[#2d1b06] to-[#140b02] flex items-center justify-center ${className}`}>
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-52 h-52 rounded-full bg-amber-500/25 blur-3xl pointer-events-none"
          />

          <svg className="w-full h-full object-cover" viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="oilDropGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Minimalist Olive Branch Twig */}
            <path d="M 120 280 Q 240 220 380 240 T 500 200" stroke="#84cc16" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.65" />
            {/* Olive Leaves */}
            <ellipse cx="200" cy="245" rx="18" ry="8" fill="#4d7c0f" transform="rotate(-25 200 245)" opacity="0.8" />
            <ellipse cx="270" cy="225" rx="18" ry="8" fill="#65a30d" transform="rotate(20 270 225)" opacity="0.85" />
            <ellipse cx="340" cy="235" rx="18" ry="8" fill="#4d7c0f" transform="rotate(-30 340 235)" opacity="0.8" />
            <ellipse cx="420" cy="215" rx="18" ry="8" fill="#65a30d" transform="rotate(25 420 215)" opacity="0.85" />

            {/* High-Polyphenol Extra Virgin Olive Oil Teardrop */}
            <motion.path 
              d="M 300 80 C 270 140 250 180 250 210 C 250 238 272 260 300 260 C 328 260 350 238 350 210 C 350 180 330 140 300 80 Z" 
              fill="url(#oilDropGrad)" opacity="0.9"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Luminous Specular Reflection */}
            <ellipse cx="285" cy="180" rx="10" ry="24" fill="#fef9c3" opacity="0.6" transform="rotate(-15 285 180)" />

            {/* Oleocanthal Bioactive Molecule Hexagonal Rings */}
            <polygon points="420,100 440,90 460,100 460,120 440,130 420,120" stroke="#f59e0b" strokeWidth="1.5" fill="none" opacity="0.6" />
            <polygon points="460,100 480,90 500,100 500,120 480,130 460,120" stroke="#f59e0b" strokeWidth="1.5" fill="none" opacity="0.5" />
            <line x1="440" y1="130" x2="440" y2="150" stroke="#f59e0b" strokeWidth="1.5" opacity="0.6" />
          </svg>
        </div>
      );

    case 'apob-preventative-cardiovascular-health':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-rose-950 via-[#330814] to-[#170409] flex items-center justify-center ${className}`}>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-52 h-52 rounded-full bg-rose-600/20 blur-3xl pointer-events-none"
          />

          <svg className="w-full h-full object-cover" viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Smooth Healthy Arterial Lumen Wall */}
            <path d="M 60 100 C 200 80 400 80 540 100" stroke="#f43f5e" strokeWidth="4" fill="none" strokeOpacity="0.8" />
            <path d="M 60 260 C 200 280 400 280 540 260" stroke="#f43f5e" strokeWidth="4" fill="none" strokeOpacity="0.8" />

            {/* Endothelial Cell Monolayer */}
            <line x1="80" y1="108" x2="520" y2="108" stroke="#fb7185" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.6" />
            <line x1="80" y1="252" x2="520" y2="252" stroke="#fb7185" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.6" />

            {/* Circulating Atherogenic ApoB Particles */}
            <motion.circle 
              cx="180" cy="180" r="14" fill="#e11d48"
              animate={{ cx: [120, 480] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
            <motion.circle 
              cx="260" cy="160" r="10" fill="#f43f5e"
              animate={{ cx: [200, 520] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />
            <motion.circle 
              cx="340" cy="200" r="12" fill="#be123c"
              animate={{ cx: [280, 560] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            />

            {/* Protective Cardiac Shield */}
            <circle cx="300" cy="180" r="48" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.5" />
            <text x="300" y="184" fill="#fda4af" fontSize="11" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">CAC SCORE: 0</text>
          </svg>
        </div>
      );

    case 'nootropics-brain-plasticity-cognitive-longevity':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-emerald-950 via-[#06241a] to-[#04130d] flex items-center justify-center ${className}`}>
          <motion.div 
            animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-52 h-52 rounded-full bg-emerald-500/25 blur-3xl pointer-events-none"
          />

          <svg className="w-full h-full object-cover" viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Neural Synaptic Network */}
            <line x1="160" y1="180" x2="260" y2="130" stroke="#34d399" strokeWidth="2" strokeOpacity="0.6" />
            <line x1="260" y1="130" x2="340" y2="190" stroke="#34d399" strokeWidth="2.5" strokeOpacity="0.75" />
            <line x1="340" y1="190" x2="440" y2="140" stroke="#34d399" strokeWidth="2" strokeOpacity="0.6" />
            <line x1="260" y1="130" x2="300" y2="70" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.5" />
            <line x1="340" y1="190" x2="380" y2="280" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.5" />

            {/* Synaptic Junction Fire Sparks */}
            <circle cx="160" cy="180" r="7" fill="#6ee7b7" />
            <circle cx="260" cy="130" r="10" fill="#a7f3d0" />
            <circle cx="340" cy="190" r="12" fill="#34d399" />
            <circle cx="440" cy="140" r="7" fill="#6ee7b7" />

            {/* BDNF Spores & Neurogenesis Particle Burst */}
            <motion.circle 
              cx="340" cy="190" r="28" stroke="#34d399" strokeWidth="1" strokeDasharray="3 4" fill="none"
              animate={{ r: [20, 42, 20], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
            />
            <text x="340" y="235" fill="#a7f3d0" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">BDNF NEUROGENESIS</text>
          </svg>
        </div>
      );

    default:
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center ${className}`}>
          <div className="text-center p-6">
            <span className="text-3xl mb-2 block">🌿</span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Animify Health Editorial</span>
          </div>
        </div>
      );
  }
};
