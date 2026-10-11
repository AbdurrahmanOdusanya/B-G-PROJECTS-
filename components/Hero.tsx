'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onHeroLuminanceChange: (isLight: boolean) => void;
  onEnquireClick: () => void;
}

export function Hero({ onHeroLuminanceChange, onEnquireClick }: HeroProps) {
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Ensure both videos start playing reliably across devices
  useEffect(() => {
    const playSafe = (v: HTMLVideoElement | null) => {
      if (!v) return;
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };

    playSafe(desktopVideoRef.current);
    playSafe(mobileVideoRef.current);

    // Fallback: If autoplay was temporarily deferred by browser policy, resume on first interaction
    const handleFirstInteraction = () => {
      playSafe(desktopVideoRef.current);
      playSafe(mobileVideoRef.current);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };

    window.addEventListener('touchstart', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('click', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('scroll', handleFirstInteraction, { passive: true, once: true });

    return () => {
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, []);

  // Real-time canvas sampling of top video area to dynamically adapt navbar
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const sampleLuminance = () => {
      try {
        const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
        const video = isDesktop
          ? (desktopVideoRef.current || mobileVideoRef.current)
          : (mobileVideoRef.current || desktopVideoRef.current);
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
      className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col justify-center items-center pt-24 sm:pt-28 pb-16 sm:pb-20 px-6 sm:px-12 md:px-16 lg:px-24"
    >
      {/* Background Animated Video Asset - Covering the entire hero section */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden bg-neutral-950">
        {/* Desktop and Tablet mode video (1280x720) */}
        <video
          ref={desktopVideoRef}
          src="/assets/animated%20hero%20desktop%20-%20tablet.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        >
          <source src="/assets/animated%20hero%20desktop%20-%20tablet.mp4" type="video/mp4" />
        </video>

        {/* Mobile mode video (720x1280) */}
        <video
          ref={mobileVideoRef}
          src="/assets/animated%20hero%20mobile.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="block md:hidden absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        >
          <source src="/assets/animated%20hero%20mobile.mp4" type="video/mp4" />
        </video>

        {/* Architectural overlay for vibrant clarity while keeping typography legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/25 pointer-events-none" />
      </div>

      {/* Hidden canvas for real-time luminance */}
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="max-w-4xl">
          {/* Main Headline (Playfair Display) */}
          <div>

            <h1 className="text-3xl min-[400px]:text-4xl sm:text-5xl md:text-5xl lg:text-[4.25rem] xl:text-[4.75rem] text-white leading-[1.1] tracking-tight select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
              {/* Desktop layout (lg and up): Line 1 = "Crafting Spaces", Line 2 = "Worth Coming Home To." */}
              <div className="hidden lg:block">
                <motion.span
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-accent italic font-normal tracking-tight whitespace-nowrap"
                >
                  Crafting Spaces
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-accent italic font-normal text-neutral-100 tracking-tight whitespace-nowrap"
                >
                  Worth Coming Home To.
                </motion.span>
              </div>

              {/* Tablet & Mobile layout (< lg): Line 1 = "Crafting Spaces Worth", Line 2 = "Coming Home To." */}
              <div className="block lg:hidden">
                <motion.span
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-accent italic font-normal tracking-tight"
                >
                  Crafting Spaces Worth
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-accent italic font-normal text-neutral-100 tracking-tight"
                >
                  Coming Home To.
                </motion.span>
              </div>
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
        </div>
      </div>


    </section>
  );
}
