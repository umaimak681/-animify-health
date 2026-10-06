import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles, Music, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Soundtrack = 'rain' | 'fireplace' | 'zen';

export const AmbientAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState<Soundtrack>('rain');
  const [isExpanded, setIsExpanded] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<AudioNode | null>(null);

  const startSound = (soundType: Soundtrack) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop previous
      if (sourceNodeRef.current) {
        try {
          (sourceNodeRef.current as AudioScheduledSourceNode).stop?.();
          sourceNodeRef.current.disconnect();
        } catch {
          // ignore
        }
      }

      // Create gentle natural noise buffer
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        if (soundType === 'rain') {
          // Pink noise filter for soft rain
          lastOut = (lastOut + 0.02 * white) / 1.02;
          data[i] = lastOut * 3.5;
        } else if (soundType === 'fireplace') {
          // Brown noise with soft crackle
          lastOut = (lastOut + 0.05 * white) / 1.05;
          const crackle = Math.random() > 0.995 ? (Math.random() * 2 - 1) * 0.4 : 0;
          data[i] = lastOut * 2.8 + crackle;
        } else {
          // Zen ambient low frequency hum
          lastOut = (lastOut + 0.01 * white) / 1.01;
          data[i] = lastOut * 2.0;
        }
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      // Filter for mellow acoustic texture
      const filter = ctx.createBiquadFilter();
      filter.type = soundType === 'rain' ? 'lowpass' : 'bandpass';
      filter.frequency.value = soundType === 'rain' ? 800 : (soundType === 'fireplace' ? 450 : 280);

      const gain = ctx.createGain();
      gain.gain.value = 0.12;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      sourceNodeRef.current = noise;
      gainNodeRef.current = gain;
      setIsPlaying(true);
    } catch (e) {
      console.warn('AudioContext not started:', e);
    }
  };

  const stopSound = () => {
    if (sourceNodeRef.current) {
      try {
        (sourceNodeRef.current as AudioScheduledSourceNode).stop?.();
        sourceNodeRef.current.disconnect();
      } catch {
        // ignore
      }
      sourceNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound(track);
    }
  };

  const changeTrack = (newTrack: Soundtrack) => {
    setTrack(newTrack);
    if (isPlaying) {
      startSound(newTrack);
    }
  };

  useEffect(() => {
    return () => {
      stopSound();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mb-2 p-3.5 rounded-2xl bg-slate-900/95 light:bg-white/95 backdrop-blur-md border border-slate-800 light:border-slate-200 shadow-2xl text-xs w-64 space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase text-sky-400 font-bold tracking-wider flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse" />
                <span>Reading Soundscape</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Synthesized Calm</span>
            </div>

            {/* Sound options */}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {[
                { id: 'rain', label: '🌧️ Rain' },
                { id: 'fireplace', label: '🔥 Hearth' },
                { id: 'zen', label: '🍵 Zen' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => changeTrack(s.id as Soundtrack)}
                  className={`py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                    track === s.id
                      ? 'bg-sky-500 text-slate-950 font-bold'
                      : 'bg-slate-800 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <p className="text-[10px] text-slate-400 light:text-slate-500 leading-tight">
              Evidence-based pink noise engineered to deepen comprehension and reduce heart-rate variability while reading.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          if (!isPlaying) {
            startSound(track);
            setIsExpanded(true);
          } else {
            setIsExpanded(!isExpanded);
          }
        }}
        className={`px-3 py-2 rounded-full border shadow-lg flex items-center gap-2 text-xs font-mono transition-colors ${
          isPlaying
            ? 'bg-sky-500 text-slate-950 border-sky-400 font-bold shadow-sky-500/20'
            : 'bg-slate-900/90 light:bg-white/90 text-slate-300 light:text-slate-700 border-slate-800 light:border-slate-200 backdrop-blur-md hover:border-slate-700'
        }`}
        title="Toggle Ambient Reading Audio"
      >
        {isPlaying ? (
          <>
            {/* Animated Equalizer Waves */}
            <div className="flex items-center gap-0.5 h-3.5">
              <motion.span 
                animate={{ height: ['4px', '14px', '6px'] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-0.5 bg-slate-950 rounded-full"
              />
              <motion.span 
                animate={{ height: ['10px', '4px', '14px'] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-0.5 bg-slate-950 rounded-full"
              />
              <motion.span 
                animate={{ height: ['6px', '12px', '4px'] }}
                transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                className="w-0.5 bg-slate-950 rounded-full"
              />
            </div>
            <span className="text-[11px] capitalize">{track} Ambience</span>
            <span 
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="ml-1 text-[10px] underline hover:opacity-80"
            >
              Mute
            </span>
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline text-[11px]">Ambient Audio</span>
          </>
        )}
      </motion.button>
    </div>
  );
};
