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
    <footer id="contact" className="bg-neutral-950 text-neutral-400 pt-20 pb-12 px-6 sm:px-12 md:px-16 lg:px-24 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-900">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-6">
            <div className="relative h-8 sm:h-9 md:h-10 w-36 sm:w-44 md:w-52">
              <Image
                src="/assets/logo-light.png"
                alt="Luxury Developer Logo"
                width={220}
                height={70}
                className="h-7 sm:h-8 md:h-9 w-auto max-w-full object-contain object-left"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-sm font-light text-neutral-400 max-w-sm leading-relaxed font-inter">
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
                <span>Bourdillon Road, Ikoyi, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>+234 (1) 234 5678 / +234 (0) 809 000 1122</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>advisory@luxurydev.com</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Private Client Desk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-inter text-neutral-500 gap-4">
          <div>
            © {new Date().getFullYear()} Luxury Home Developer. All architectural rights reserved.
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
    </footer>
  );
}
