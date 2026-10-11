'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowRight } from 'lucide-react';

interface HeroProps {
  onHeroLuminanceChange: (isLight: boolean) => void;
  onEnquireClick: () => void;
}

export function Hero({ onHeroLuminanceChange, onEnquireClick }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Real-time canvas sampling of top video area to dynamically adapt navbar
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let intervalId: NodeJS.Timeout;

    const sampleLuminance = () => {
      try {
        if (!video || video.readyState < 2) return;
        const canvas = canvasRef.current || document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 32;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        ctx.drawImage(video, 0, 0, video.videoWidth || 640, (video.videoHeight || 360) * 0.25, 0, 0, 64, 32);
        const imageData = ctx.getImageData(0, 0, 64, 32);
        const data = imageData.data;
        let totalBrightness = 0;
        const sampleCount = data.length / 4;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          totalBrightness += lum;
        }

        const avgBrightness = totalBrightness / sampleCount;
        const isBright = avgBrightness > 140;
        onHeroLuminanceChange(isBright);
      } catch {
        onHeroLuminanceChange(false);
      }
    };

    intervalId = setInterval(sampleLuminance, 600);
    return () => clearInterval(intervalId);
  }, [onHeroLuminanceChange]);

  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] min-h-[700px] overflow-hidden flex flex-col justify-end pb-14 sm:pb-20 md:pb-24 px-6 sm:px-12 md:px-16 lg:px-24"
    >
      {/* Background Animated Video Asset with subtle cinematic scale */}
      <motion.div
        initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      >
        <video
          ref={videoRef}
          src="/assets/hero-animated.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />

        {/* Architectural Vignette & Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </motion.div>

      {/* Hidden canvas for real-time luminance */}
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Main Headline (Playfair Display) */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center space-x-3 mb-5"
            >
              <span className="w-8 h-[1px] bg-white/70" />
              <span className="text-[11px] tracking-[0.18em] font-medium text-neutral-300">
                Architectural Residential Showcase
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-white leading-[1.06] tracking-tight select-none">
              <motion.span
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block font-bold tracking-tight"
              >
                Crafting Spaces
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="block italic font-normal text-neutral-200"
              >
                Worth Coming Home To.
              </motion.span>
            </h1>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs tracking-[0.15em] font-semibold bg-white text-neutral-950 transition-all duration-300 hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_24px_rgba(255,255,255,0.25)] group"
              >
                <span>Explore Our Projects</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <button
                onClick={onEnquireClick}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs tracking-[0.15em] font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Enquire
              </button>
            </motion.div>
          </div>

          {/* Right Supporting Statement */}
          <div className="lg:col-span-4 lg:pb-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-neutral-300 text-sm sm:text-base font-medium leading-relaxed border-l border-white/20 pl-5"
            >
              Thoughtfully designed residences created for exceptional living.
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 right-6 sm:right-12 hidden md:flex items-center space-x-2 text-neutral-400 text-[11px] tracking-[0.15em] font-medium pointer-events-none"
      >
        <span>Scroll Down</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </motion.div>
    </section>
  );
}
