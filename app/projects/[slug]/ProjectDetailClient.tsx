'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Home,
  Car,
  Maximize2,
  MapPin,
  Calendar,
  Images,
  Expand,
  Share2,
  Check,
} from 'lucide-react';
import { Project } from '@/data/projects';
import { ProjectGalleryLightbox } from '@/components/ProjectGalleryLightbox';
import { EnquiryModal } from '@/components/EnquiryModal';
import { Footer } from '@/components/Footer';

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const galleryImages =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.heroImage, project.secondaryImage];

  const openLightboxAt = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-neutral-900 selection:bg-neutral-900 selection:text-white flex flex-col justify-between">
      {/* Top Floating Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200/80 px-4 sm:px-8 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center text-xs font-inter tracking-[0.16em] uppercase font-semibold text-neutral-700 hover:text-neutral-950 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Projects</span>
          </Link>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center text-xs font-inter px-3 py-1.5 rounded-full border border-neutral-200 hover:border-neutral-400 bg-white text-neutral-700 hover:text-black transition-all"
              title="Copy link to project"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 mr-1.5 text-neutral-400" />
                  <span>Share</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="inline-flex items-center text-xs font-inter tracking-[0.14em] font-semibold px-4 sm:px-5 py-2 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 transition-colors shadow-sm"
            >
              <span>Enquire</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-10">
          {/* Breadcrumb & Title Header */}
          <div className="mb-6 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-inter text-neutral-400 uppercase tracking-[0.16em] mb-2 sm:mb-3">
              <span>{project.propertyType}</span>
              <span>·</span>
              <span>{project.location}</span>
              <span>·</span>
              <span className="text-neutral-700 font-medium">{project.status}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-accent italic font-normal text-neutral-950 tracking-tight leading-tight">
              {project.name}
            </h1>
            <p className="mt-3 text-base sm:text-lg font-light text-neutral-600 max-w-3xl leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Primary Hero Photograph (main.webp) */}
          <div
            onClick={() => openLightboxAt(0)}
            className="group relative aspect-[16/10] sm:aspect-[21/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-200 shadow-md cursor-pointer border border-neutral-200"
          >
            <Image
              src={project.heroImage}
              alt={project.name}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center space-x-2 text-white">
              <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono tracking-wider flex items-center space-x-1.5 border border-white/20">
                <Images className="w-3.5 h-3.5" />
                <span>Main Project View • Click to Expand</span>
              </span>
            </div>

            <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
              <div className="p-2 sm:p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 hover:scale-110 transition-transform">
                <Expand className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-sm">
            <div className="flex items-center space-x-3 p-2">
              <Maximize2 className="w-5 h-5 text-neutral-400 shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-inter tracking-wider text-neutral-400">Total Area</div>
                <div className="text-sm font-semibold text-neutral-900">{project.size}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-2">
              <Home className="w-5 h-5 text-neutral-400 shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-inter tracking-wider text-neutral-400">Typology</div>
                <div className="text-sm font-semibold text-neutral-900">{project.typology}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-2">
              <Car className="w-5 h-5 text-neutral-400 shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-inter tracking-wider text-neutral-400">Parking</div>
                <div className="text-sm font-semibold text-neutral-900">{project.parking || '2 Cars'}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-2">
              <BedDouble className="w-5 h-5 text-neutral-400 shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-inter tracking-wider text-neutral-400">Bedroom</div>
                <div className="text-sm font-semibold text-neutral-900">{project.bedrooms}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-2">
              <MapPin className="w-5 h-5 text-neutral-400 shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-inter tracking-wider text-neutral-400">Location</div>
                <div className="text-sm font-semibold text-neutral-900 truncate max-w-[130px] sm:max-w-none">
                  {project.location}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-2">
              <Calendar className="w-5 h-5 text-neutral-400 shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-inter tracking-wider text-neutral-400">Status</div>
                <div className="text-sm font-semibold text-neutral-900">{project.status}</div>
              </div>
            </div>
          </div>

          {/* Architectural Description & Profile */}
          <div className="mt-10 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-xs font-inter font-semibold tracking-[0.2em] text-neutral-400 uppercase">
                Architectural Statement
              </h2>
              <p className="mt-3 text-2xl sm:text-3xl font-accent italic text-neutral-900 leading-snug">
                Where timeless craftsmanship meets elevated modern functionality.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-4 text-neutral-700 text-base sm:text-lg font-light leading-relaxed">
              <p className="whitespace-pre-line">{project.description}</p>
              <p>
                Every detail in {project.name} has been engineered to maximize natural illumination, airflow,
                and functional elegance. From the refined spatial layout across {project.floors} to the
                meticulously fitted finishes, each element reflects our standard of residential distinction.
              </p>
            </div>
          </div>

          {/* Complete Image Gallery (1.webp through 10.webp) */}
          <section className="mt-16 sm:mt-24 pt-10 border-t border-neutral-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="flex items-center space-x-2 text-neutral-400 text-xs font-mono uppercase tracking-widest mb-1">
                  <Images className="w-4 h-4 text-neutral-600" />
                  <span>Curated Visuals</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-accent italic text-neutral-950">
                  Residence Gallery ({galleryImages.length} Photographs)
                </h2>
                <p className="mt-1 text-sm text-neutral-500 font-light">
                  Click any photograph to view full screen and swipe left/right like a gallery.
                </p>
              </div>

              <button
                onClick={() => openLightboxAt(0)}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-inter tracking-[0.14em] font-medium bg-neutral-900 hover:bg-black text-white transition-all shadow-sm w-fit"
              >
                <Expand className="w-3.5 h-3.5 mr-2" />
                <span>Launch Fullscreen Slideshow</span>
              </button>
            </div>

            {/* Gallery Grid (In sequence: 1, 2, 3... 10.webp) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {galleryImages.map((imgSrc, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openLightboxAt(idx)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-200 border border-neutral-200/80 shadow-sm cursor-pointer"
                >
                  <Image
                    src={imgSrc}
                    alt={`${project.name} photograph ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Dark hover overlay with expand prompt */}
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                    <div className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-2">
                      <Expand className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-inter tracking-wider font-medium">View Full Screen</span>
                  </div>

                  {/* Photo Index Tag */}
                  <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-[11px] font-mono text-white/90">
                    Photo {idx + 1} of {galleryImages.length}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Schedule Viewing / Contact CTA */}
          <div className="mt-16 sm:mt-24 p-8 sm:p-12 md:p-16 rounded-3xl bg-neutral-950 text-white relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-inter tracking-[0.2em] uppercase text-neutral-400">
                Private Viewing
              </span>
              <h2 className="mt-2 text-3xl sm:text-5xl font-editorial font-normal leading-tight">
                Experience {project.name} in Person
              </h2>
              <p className="mt-4 text-neutral-400 font-light text-base sm:text-lg leading-relaxed">
                Connect directly with our architectural advisory team to arrange a confidential walk-in tour
                and receive the full specification portfolio.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => setIsEnquiryOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-xs font-inter tracking-[0.16em] font-semibold bg-white text-neutral-950 hover:bg-neutral-200 transition-all duration-300 shadow-md"
                >
                  <span>Enquire For This Residence</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>

                <Link
                  href="/#projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-full text-xs font-inter tracking-[0.16em] font-medium border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
                >
                  <span>Browse Other Projects</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer onEnquireClick={() => setIsEnquiryOpen(true)} />

      {/* Fullscreen Swipeable Gallery Lightbox */}
      <ProjectGalleryLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={galleryImages}
        initialIndex={lightboxIndex}
        projectName={project.name}
      />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        preselectedProject={project.name}
      />
    </div>
  );
}
