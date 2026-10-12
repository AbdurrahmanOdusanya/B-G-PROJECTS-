'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUp, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

interface FooterProps {
  onEnquireClick: () => void;
}

export function Footer({ onEnquireClick }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-neutral-950 text-neutral-400 pt-16 sm:pt-20 pb-10 sm:pb-12 px-4 sm:px-8 md:px-16 lg:px-24 border-t border-neutral-900">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12 sm:pb-16 border-b border-neutral-900">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-5 sm:space-y-6">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg -mt-2 sm:-mt-4 -mb-2 sm:-mb-3">
              <Image
                src="/assets/Luxury%20B&G%20Projects%20Wordmark-Photoroom.png"
                alt="B & G Projects Logo"
                width={800}
                height={400}
                className="h-20 sm:h-28 md:h-36 lg:h-40 w-auto max-w-full object-contain object-left brightness-0 invert opacity-95 transition-opacity hover:opacity-100"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs sm:text-sm font-light text-neutral-400 max-w-sm leading-relaxed font-inter">
              Design-led residential developer crafting private sanctuaries, architectural compounds, and bespoke urban estates.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[11px] font-inter tracking-[0.2em] text-neutral-200 font-semibold">
              Portfolio
            </h4>
            <ul className="space-y-2.5 text-xs tracking-[0.12em] font-inter text-neutral-400">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[11px] font-inter tracking-[0.2em] text-neutral-200 font-semibold">
              Executive Atelier
            </h4>
            <div className="space-y-3 text-xs font-inter text-neutral-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <span>Ojodu Berger, Lagos</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>+234 (1) 234 5678 / +234 (0) 809 000 1122</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>advisory@bgprojects.com</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Private Client Desk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 pb-24 sm:pb-28 md:pb-32 lg:pb-36 flex flex-col sm:flex-row items-center justify-between text-[11px] font-inter text-neutral-500 gap-4">
          <div suppressHydrationWarning>
            © 2026 B & G Projects. All architectural rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 hover:text-white transition-colors font-inter"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Oversized Watermark Wordmark */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[28%] sm:translate-y-[24%] w-[96%] sm:w-[92%] max-w-[1550px] pointer-events-none select-none z-0 flex justify-center opacity-[0.06]"
      >
        <Image
          src="/assets/B&G%20FULL%20WORDMARK.png"
          alt=""
          width={1399}
          height={170}
          className="w-full h-auto object-contain pointer-events-none select-none"
          referrerPolicy="no-referrer"
        />
      </div>
    </footer>
  );
}
