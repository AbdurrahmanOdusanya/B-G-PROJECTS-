'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  themeMode: 'dark' | 'light';
  onEnquireClick: (projectPreference?: string) => void;
}

export function Navbar({ themeMode, onEnquireClick }: NavbarProps) {
  const headerRef = useRef<HTMLElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDarkFooter, setIsOverDarkFooter] = useState(false);

  useEffect(() => {
    const handleScrollAndOverlap = () => {
      setIsScrolled(window.scrollY > 30);

      const header = headerRef.current;
      if (!header) return;

      const navbarRect = header.getBoundingClientRect();
      const navbarTop = navbarRect.top;
      const navbarBottom = navbarRect.bottom;

      const footer = document.getElementById('contact');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        // True ONLY when footer physically overlaps the fixed navbar bounds
        // (will not trigger merely because footer entered the viewport below)
        const overlaps = footerRect.top <= navbarBottom && footerRect.bottom >= navbarTop;
        setIsOverDarkFooter(overlaps);
      } else {
        setIsOverDarkFooter(false);
      }
    };

    window.addEventListener('scroll', handleScrollAndOverlap, { passive: true });
    window.addEventListener('resize', handleScrollAndOverlap, { passive: true });
    handleScrollAndOverlap();

    return () => {
      window.removeEventListener('scroll', handleScrollAndOverlap);
      window.removeEventListener('resize', handleScrollAndOverlap);
    };
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  // Dynamic contrast mode:
  // When overlapping the dark footer, activate dark footer glass mode.
  // Otherwise, respect themeMode (light for white content sections, dark for hero).
  const isFooterMode = isOverDarkFooter;
  const isLightMode = !isFooterMode && themeMode === 'light';

  return (
    <>
      {/* Fixed Header Root without transforms to guarantee zero culling/disappearing on mobile scroll */}
      <header
        ref={headerRef}
        className={`fixed top-3 sm:top-4 md:top-6 left-0 right-0 mx-auto w-[94%] sm:w-[92%] max-w-5xl z-50 pointer-events-none transition-colors duration-500 ${
          isFooterMode ? 'footer-dark' : isLightMode ? 'light' : ''
        }`}
        style={{ zIndex: 50 }}
      >
        <div
          className={`pointer-events-auto transition-all duration-500 rounded-full px-4 sm:px-6 md:px-7 lg:px-8 py-2 sm:py-2.5 md:py-3 flex items-center justify-between glass-navbar ${
            isFooterMode
              ? 'glass-navbar-footer'
              : isLightMode
              ? ''
              : 'navbar-glass-hero'
          } ${isScrolled ? 'shadow-lg' : ''}`}
        >
          {/* Responsive Logo Area (Balanced sizing across Mobile, Tablet, and Desktop) */}
          <a
            href="#hero"
            aria-label="Luxury Home Developer Home"
            className="nav-logo relative flex items-center h-7 sm:h-8 md:h-9 w-28 sm:w-36 md:w-44 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-sm shrink-0"
          >
            {/* Light Logo (used when hero is dark or navbar overlaps dark footer) */}
            <div
              className={`absolute inset-0 flex items-center transition-opacity duration-500 ease-in-out ${
                isLightMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <Image
                src="/assets/logo-light.png"
                alt="Luxury Developer Logo"
                width={200}
                height={70}
                priority
                className="h-6 sm:h-7 md:h-8 w-auto max-w-full object-contain object-left"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Dark/Black Logo (used when over light background sections) */}
            <div
              className={`absolute inset-0 flex items-center transition-opacity duration-500 ease-in-out ${
                isLightMode ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <Image
                src="/assets/logo-dark.png"
                alt="Luxury Developer Logo"
                width={200}
                height={70}
                priority
                className="h-6 sm:h-7 md:h-8 w-auto max-w-full object-contain object-left"
                referrerPolicy="no-referrer"
              />
            </div>
          </a>

          {/* Desktop & Tablet Navigation Links */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link text-[11px] lg:text-[12px] tracking-[0.18em] font-inter font-medium transition-colors duration-300 relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 group ${
                  isLightMode
                    ? 'text-[#202124] hover:text-black'
                    : 'text-neutral-200 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                    isLightMode ? 'bg-[#202124]' : 'bg-neutral-100'
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* Right Action Controls: CTA & Mobile Hamburger */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => onEnquireClick()}
              className={`hidden sm:inline-flex items-center justify-center text-[10px] sm:text-[11px] tracking-[0.12em] font-medium px-4 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all duration-300 active:scale-95 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isLightMode
                  ? 'bg-neutral-900 text-neutral-100 hover:bg-black focus-visible:ring-neutral-900'
                  : 'bg-white/12 text-white hover:bg-white/22 border border-white/20 focus-visible:ring-white'
              }`}
            >
              Enquire
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
              className={`md:hidden p-1.5 sm:p-2 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 ${
                isLightMode
                  ? 'text-neutral-900 hover:bg-black/5'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Mobile / Tablet Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, y: 0, backdropFilter: 'blur(28px)' }}
            exit={{ opacity: 0, y: -15, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-x-3 sm:inset-x-6 top-16 sm:top-20 z-50 md:hidden rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border ${
              isLightMode
                ? 'bg-white/95 border-black/10 text-neutral-900'
                : 'bg-neutral-950/95 border-white/15 text-neutral-100'
            }`}
          >
            <div className="flex flex-col space-y-5 pt-1 pb-2">


              <div className="flex flex-col space-y-1">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm sm:text-base tracking-[0.1em] font-medium flex items-center justify-between py-3 px-2 rounded-lg transition-colors ${
                      isLightMode
                        ? 'text-neutral-800 hover:bg-black/5 hover:text-black'
                        : 'text-neutral-200 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                  </motion.a>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onEnquireClick();
                  }}
                  className={`w-full text-center text-xs tracking-[0.12em] font-medium py-3 sm:py-3.5 rounded-full transition-colors ${
                    isLightMode
                      ? 'bg-neutral-950 text-white hover:bg-neutral-800'
                      : 'bg-white text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  Start Enquiry
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
