'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

interface ExclusiveCollectionProps {
  onEnquireClick: () => void;
}

export function ExclusiveCollection({ onEnquireClick }: ExclusiveCollectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-24 sm:py-32 md:py-40 px-6 sm:px-12 md:px-16 lg:px-24 bg-white text-neutral-900 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Generous whitespace, Strong typography */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8 pr-0 lg:pr-6">
            <RevealOnScroll delay={0}>
              <span className="text-[11px] font-inter tracking-[0.2em] font-medium text-neutral-400">
                Private Portfolio
              </span>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-950 leading-[1.15] tracking-tight">
                Exclusive
                <br />
                Collection
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="font-inter text-neutral-500 text-sm sm:text-base leading-relaxed max-w-sm">
                Consultants curate custom lists of vetted homes. Featuring media, VR walk-ins, and private physical tours arranged around your schedule.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onEnquireClick}
                  className="inline-flex items-center text-xs font-inter tracking-[0.18em] font-medium text-neutral-900 py-3 px-6 rounded-full border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                >
                  <span>Free consult</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Large High-Quality Property Photography */}
          <div className="lg:col-span-7">
            <RevealOnScroll duration={1.1} delay={0.15}>
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-neutral-100 shadow-[0_16px_48px_rgba(0,0,0,0.06)] border border-neutral-200/60 group">
                <motion.div
                  initial={{ scale: 1.06 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.025 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop"
                    alt="Exclusive Modern White Architecture Residence"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
