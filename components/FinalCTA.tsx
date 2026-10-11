'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

interface FinalCTAProps {
  onEnquireClick: () => void;
}

export function FinalCTA({ onEnquireClick }: FinalCTAProps) {
  return (
    <section className="relative py-32 sm:py-40 md:py-48 px-6 sm:px-12 md:px-16 lg:px-24 bg-white text-neutral-900 overflow-hidden border-t border-neutral-100">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Large, Confident Headline */}
        <RevealOnScroll delay={0} yOffset={24}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-accent italic font-normal text-neutral-950 tracking-tight leading-[1.08] mb-6 select-none">
            Ready To Find
            <br />
            <span className="font-accent italic font-normal text-neutral-800">Your Next Home?</span>
          </h2>
        </RevealOnScroll>

        {/* Supporting Copy */}
        <RevealOnScroll delay={0.08} yOffset={18}>
          <p className="text-neutral-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10 sm:mb-12 font-medium">
            Discover our collection of thoughtfully designed residences.
          </p>
        </RevealOnScroll>

        {/* Action Buttons: Explore Projects & Make An Enquiry */}
        <RevealOnScroll delay={0.14} yOffset={16}>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3.5 sm:space-y-0 sm:space-x-4">
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-inter tracking-[0.16em] font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Projects
            </a>

            <button
              onClick={onEnquireClick}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-inter tracking-[0.16em] font-semibold bg-neutral-950 text-white transition-all duration-300 hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98] shadow-md group"
            >
              <span>Make An Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
