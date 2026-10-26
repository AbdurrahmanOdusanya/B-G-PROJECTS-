'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Grid } from 'lucide-react';

interface ProjectGalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  projectName: string;
}

export function ProjectGalleryLightbox({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  projectName,
}: ProjectGalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [prevInitialIndex, setPrevInitialIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state if caller opens at different initialIndex
  if (initialIndex !== prevInitialIndex) {
    setPrevInitialIndex(initialIndex);
    setCurrentIndex(Math.max(0, Math.min(initialIndex, images.length - 1)));
  }

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Toggle native browser fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose, toggleFullscreen]);

  // Touch Swipe Gesture detection
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only handle horizontal swipes
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        handleNext(); // swipe left -> next
      } else {
        handlePrev(); // swipe right -> prev
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const slideVariants: {
    enter: (direction: number) => { x: number; opacity: number; scale: number };
    center: { x: number; opacity: number; scale: number; transition: { x: { type: 'spring'; stiffness: number; damping: number }; opacity: { duration: number } } };
    exit: (direction: number) => { x: number; opacity: number; scale: number; transition: { x: { type: 'spring'; stiffness: number; damping: number }; opacity: { duration: number } } };
  } = {
    enter: (direction: number) => ({
      x: direction > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-black/95 text-white flex flex-col justify-between select-none touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Control Bar */}
        <div className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
              {projectName} Residence Gallery
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-200">
              Image {currentIndex + 1} of {images.length}
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Toggle Thumbnails */}
            <button
              onClick={() => setShowThumbnails((prev) => !prev)}
              aria-label="Toggle thumbnails"
              className={`p-2 sm:p-2.5 rounded-full border transition-all duration-200 ${
                showThumbnails
                  ? 'bg-white/20 border-white/30 text-white'
                  : 'bg-black/50 border-white/10 text-neutral-400 hover:text-white'
              }`}
              title="Toggle thumbnail strip"
            >
              <Grid className="w-4 h-4" />
            </button>

            {/* Toggle Fullscreen */}
            <button
              onClick={toggleFullscreen}
              aria-label="Toggle fullscreen"
              className="p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-white/20 border border-white/10 text-neutral-300 hover:text-white transition-all duration-200"
              title="Fullscreen (F)"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close fullscreen gallery"
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white transition-all duration-200"
              title="Close (Esc)"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Center Main Image Canvas */}
        <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 md:p-8 overflow-hidden">
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous image"
                className="absolute left-3 sm:left-6 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all duration-200 focus:outline-none hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next image"
                className="absolute right-3 sm:right-6 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all duration-200 focus:outline-none hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          {/* Slideable Image */}
          <div className="relative w-full h-full max-w-6xl max-h-[75vh] flex items-center justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative w-full h-full"
              >
                <Image
                  src={currentImage}
                  alt={`${projectName} photo ${currentIndex + 1}`}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain object-center select-none"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Thumbnail Rail */}
        {showThumbnails && images.length > 1 && (
          <div className="relative z-20 px-4 py-3 sm:py-4 bg-gradient-to-t from-black/90 to-transparent">
            <div className="max-w-4xl mx-auto flex items-center justify-center space-x-2 sm:space-x-3 overflow-x-auto py-1 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Jump to image ${idx + 1}`}
                  className={`relative shrink-0 w-12 sm:w-16 h-9 sm:h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    currentIndex === idx
                      ? 'border-white scale-105 shadow-[0_0_12px_rgba(255,255,255,0.4)] opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-85'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  <span className="absolute bottom-0.5 right-1 text-[8px] font-mono text-white/90 drop-shadow">
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>
            <div className="text-center text-[10px] font-mono tracking-wider text-neutral-400 mt-2 sm:hidden">
              Swipe left / right or tap arrows to navigate
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
