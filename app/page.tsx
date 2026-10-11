'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { AboutPreview } from '@/components/AboutPreview';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { EnquiryModal } from '@/components/EnquiryModal';

export default function HomePage() {
  const [heroIsBright, setHeroIsBright] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  // Enquiry modal state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedProjectForEnquiry, setSelectedProjectForEnquiry] = useState<string | undefined>(undefined);

  // Monitor scroll position relative to Hero section
  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        const heroBottom = heroElement.getBoundingClientRect().bottom;
        // When hero scrolls up past navbar (~80px), navbar enters the clean white section
        setIsPastHero(heroBottom <= 80);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When past the hero (over clean white/off-white sections), navbar switches to 'light'
  // (displaying dark logo logo-dark.png, dark navigation links, and dark CTA)
  // When over hero, it follows video frame luminance
  const themeMode: 'dark' | 'light' = isPastHero ? 'light' : (heroIsBright ? 'light' : 'dark');

  const handleOpenEnquiry = (projectName?: string) => {
    setSelectedProjectForEnquiry(projectName);
    setIsEnquiryOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsEnquiryOpen(false);
    setSelectedProjectForEnquiry(undefined);
  };

  return (
    <main className="relative min-h-screen bg-[#fbfbfa] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* 1. Floating Glassmorphism Navbar */}
      <Navbar
        themeMode={themeMode}
        onEnquireClick={handleOpenEnquiry}
      />

      {/* 2. Hero Section */}
      <Hero
        onHeroLuminanceChange={(isLight) => setHeroIsBright(isLight)}
        onEnquireClick={() => handleOpenEnquiry()}
      />

      {/* 3. About Preview Section (Immediately after hero, generous whitespace, 4-step stagger) */}
      <AboutPreview />

      {/* 4. Featured Projects Section (Visually dominant, image-led cards, hover scale 1.025) */}
      <FeaturedProjects
        onEnquireForProject={(projectName) => handleOpenEnquiry(projectName)}
      />

      {/* 5. Final CTA */}
      <FinalCTA
        onEnquireClick={() => handleOpenEnquiry()}
      />

      {/* Footer */}
      <Footer
        onEnquireClick={() => handleOpenEnquiry()}
      />

      {/* Interactive Consultation / Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={handleCloseEnquiry}
        preselectedProject={selectedProjectForEnquiry}
      />
    </main>
  );
}
