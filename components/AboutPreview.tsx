'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, Compass, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

export function AboutPreview() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="about" className="relative py-20 sm:py-28 md:py-36 lg:py-44 px-4 sm:px-8 md:px-12 lg:px-24 bg-white text-neutral-900 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        {/* 01 — Section Label */}
        <RevealOnScroll delay={0} yOffset={18}>
          <div className="flex items-center space-x-3 mb-8 sm:mb-12 md:mb-14">
            <span className="text-[11px] sm:text-[12px] tracking-[0.18em] font-medium text-neutral-400">
              About The Company
            </span>
            <span className="w-10 h-[1px] bg-neutral-200" />
          </div>
        </RevealOnScroll>

        {/* Editorial Layout: Large Architectural Image & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Large Architectural Image */}
          <div className="lg:col-span-7">
            <RevealOnScroll delay={0.04} duration={0.7} yOffset={24}>
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-neutral-100 shadow-[0_16px_48px_rgba(0,0,0,0.06)] border border-neutral-200/60 group">
                <motion.div
                  initial={{ scale: 1.06 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
                    alt="Architectural Living Design"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Staggered Content: 02 Heading -> 03 Description -> 04 CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8 pr-0 lg:pr-4">
            {/* 02 — Heading */}
            <RevealOnScroll delay={0.05} yOffset={20}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-accent italic font-normal text-neutral-950 leading-[1.14] tracking-tight">
                We Create Residences That Endure Beyond Generations.
              </h2>
            </RevealOnScroll>

            {/* 03 — Description */}
            <RevealOnScroll delay={0.1} yOffset={18}>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                We create exceptional homes that blend timeless architecture, refined craftsmanship, and modern comfort. Every residence is thoughtfully designed to inspire everyday living, bringing together elegant spaces, quality materials, and lasting value in perfect harmony.
              </p>
            </RevealOnScroll>

            {/* 04 — CTA */}
            <RevealOnScroll delay={0.15} yOffset={16}>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center text-xs tracking-[0.15em] font-semibold text-neutral-900 py-2 group transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded-sm"
                >
                  <span className="border-b border-neutral-300 group-hover:border-neutral-900 transition-colors pb-1">
                    Discover More
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      {/* Discover More Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-neutral-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl z-10 text-neutral-900"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors focus-visible:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6 sm:space-y-8">
                <div>
                  <span className="text-[10px] sm:text-[11px] tracking-[0.18em] text-neutral-400 font-medium">
                    Our Philosophy
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl text-neutral-950 mt-1.5 sm:mt-2 font-bold tracking-tight">
                    The Art Of Architectural Permanence
                  </h3>
                </div>

                <div className="space-y-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                  <p>
                    Rather than building mere physical square footage, we curate sanctuaries.
                    Our development ethos rejects ephemeral trends in favor of structural clarity,
                    natural limestone, monolithic fair-faced concrete, and timber joinery that patinates with grace.
                  </p>
                  <p>
                    Each residence undergoes a meticulous 5-stage creation sequence: Concept definition,
                    spatial and environmental modeling, bespoke material curation, precision engineering,
                    and final artisan handcrafting.
                  </p>
                </div>

                {/* Core Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1.5">
                    <div className="flex items-center space-x-2 text-neutral-900">
                      <Compass className="w-4 h-4 text-neutral-500" />
                      <h4 className="text-xs tracking-[0.1em] font-semibold">Acoustic & Thermal Calm</h4>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed font-medium">
                      Multi-layer acoustic insulation and thermal break glazing guarantee complete auditory stillness.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1.5">
                    <div className="flex items-center space-x-2 text-neutral-900">
                      <Layers className="w-4 h-4 text-neutral-500" />
                      <h4 className="text-xs tracking-[0.1em] font-semibold">Enduring Materials</h4>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed font-medium">
                      Raw volcanic basalt, Italian travertine, architectural bronze, and sustainably harvested hardwood.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1.5">
                    <div className="flex items-center space-x-2 text-neutral-900">
                      <ShieldCheck className="w-4 h-4 text-neutral-500" />
                      <h4 className="text-xs tracking-[0.1em] font-semibold">Architectural Privacy</h4>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed font-medium">
                      Deliberate sightline planning, private arrival galleries, and discrete internal courtyards.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1.5">
                    <div className="flex items-center space-x-2 text-neutral-900">
                      <Sparkles className="w-4 h-4 text-neutral-500" />
                      <h4 className="text-xs tracking-[0.1em] font-semibold">Smart Infrastructure</h4>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed font-medium">
                      Invisible KNX building automation, filtered air circulation, and integrated solar storage.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-7 py-2.5 rounded-full text-xs tracking-[0.15em] font-semibold bg-neutral-950 text-white hover:bg-neutral-800 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
