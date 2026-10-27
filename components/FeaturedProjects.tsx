'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, BedDouble, Home, Car, Maximize2, Images, ExternalLink, Expand } from 'lucide-react';
import { FEATURED_PROJECTS, Project } from '@/data/projects';
import { RevealOnScroll } from './RevealOnScroll';
import { ProjectGalleryLightbox } from './ProjectGalleryLightbox';

interface FeaturedProjectsProps {
  onEnquireForProject: (projectName: string) => void;
}

export function FeaturedProjects({ onEnquireForProject }: FeaturedProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightboxAt = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="projects" className="py-20 sm:py-28 md:py-36 lg:py-44 px-4 sm:px-8 md:px-12 lg:px-24 bg-[#fbfbfa] text-neutral-900 border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 md:mb-20 gap-4 sm:gap-6">
          <div>
            <RevealOnScroll delay={0.08} yOffset={24}>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-accent italic font-normal text-neutral-950 leading-tight tracking-tight">
                Featured Projects
              </h2>
            </RevealOnScroll>
          </div>
        </div>

        {/* Project Cards Grid with Large Image-Led Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {FEATURED_PROJECTS.slice(0, 3).map((project, idx) => (
            <RevealOnScroll
              key={project.id}
              delay={idx * 0.08}
              yOffset={24}
              duration={0.6}
            >
              <div
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer flex flex-col h-full select-none"
              >
                {/* Project Image Container with Subtle Hover: scale 1 -> 1.025 (0.6s) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-200 mb-4 sm:mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-shadow duration-500 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)]">
                  <motion.div
                    whileHover={{ scale: 1.025 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={project.heroImage}
                      alt={project.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                  {project.gallery && project.gallery.length > 0 && (
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono tracking-wider flex items-center space-x-1.5 border border-white/10 pointer-events-none">
                      <Images className="w-3.5 h-3.5" />
                      <span>{project.gallery.length} Photos</span>
                    </div>
                  )}
                </div>

                {/* PROJECT NAME */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-950 transition-transform duration-300 group-hover:-translate-y-0.5 mb-1 sm:mb-1.5 tracking-tight">
                  {project.name}
                </h3>

                {/* Location & Status (Zero-Pill Typographic Hierarchy) */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-inter text-neutral-400 font-light mb-1.5">
                  <span>{project.location}</span>
                  <span aria-hidden="true" className="text-neutral-300">·</span>
                  <span className="font-medium text-neutral-600">{project.status}</span>
                </div>

                {/* Architectural Specs Summary */}
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-inter text-neutral-600 mb-4 sm:mb-5">
                  <span className="font-semibold text-neutral-900">{project.size}</span>
                  <span aria-hidden="true" className="text-neutral-300">·</span>
                  <span>{project.typology}</span>
                  <span aria-hidden="true" className="text-neutral-300">·</span>
                  <span>
                    {typeof project.bedrooms === 'number' ? `${project.bedrooms} suites` : project.bedrooms}
                  </span>
                </div>

                {/* View Project → Action */}
                <div className="mt-auto pt-3 border-t border-neutral-200/80 flex items-center justify-between">
                  <span className="text-xs font-inter tracking-[0.16em] font-semibold text-neutral-900 group-hover:text-black transition-colors">
                    View Project
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-neutral-900" />
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Interactive Project Details Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white border border-neutral-200 rounded-2xl sm:rounded-3xl shadow-2xl z-10 text-neutral-900"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close project modal"
                className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all duration-300 focus-visible:outline-none"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Large Image Header */}
              <div className="relative w-full h-56 sm:h-80 md:h-[420px] overflow-hidden rounded-t-2xl sm:rounded-t-3xl bg-neutral-100">
                <Image
                  src={selectedProject.heroImage}
                  alt={selectedProject.name}
                  fill
                  priority
                  className="object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-10 sm:right-10 text-white">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] sm:text-xs font-inter uppercase tracking-[0.16em] sm:tracking-[0.2em] text-neutral-300 mb-1.5 sm:mb-2">
                    <span>{selectedProject.propertyType}</span>
                    <span>·</span>
                    <span>{selectedProject.location}</span>
                    <span>·</span>
                    <span>{selectedProject.status}</span>
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-4xl md:text-5xl font-normal leading-tight">
                    {selectedProject.name}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
                {/* Specifications Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200/80">
                  <div className="flex items-center space-x-2.5 sm:space-x-3">
                    <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 shrink-0" />
                    <div>
                      <div className="text-[9px] sm:text-[10px] uppercase tracking-wider font-inter text-neutral-400">Total Area</div>
                      <div className="text-xs sm:text-sm font-semibold text-neutral-900">{selectedProject.size}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5 sm:space-x-3">
                    <Car className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 shrink-0" />
                    <div>
                      <div className="text-[9px] sm:text-[10px] uppercase tracking-wider font-inter text-neutral-400">Parking</div>
                      <div className="text-xs sm:text-sm font-semibold text-neutral-900">
                        {selectedProject.parking || '2 Cars'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5 sm:space-x-3">
                    <BedDouble className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 shrink-0" />
                    <div>
                      <div className="text-[9px] sm:text-[10px] uppercase tracking-wider font-inter text-neutral-400">Bedroom</div>
                      <div className="text-xs sm:text-sm font-semibold text-neutral-900">
                        {typeof selectedProject.bedrooms === 'number' ? `${selectedProject.bedrooms} suites` : selectedProject.bedrooms}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5 sm:space-x-3">
                    <Home className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 shrink-0" />
                    <div>
                      <div className="text-[9px] sm:text-[10px] uppercase tracking-wider font-inter text-neutral-400">Typology</div>
                      <div className="text-xs sm:text-sm font-semibold text-neutral-900">{selectedProject.typology || 'Semi detached'}</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-inter font-semibold tracking-[0.16em] text-neutral-400 mb-3">
                    Architectural Profile
                  </h4>
                  <p className="text-neutral-700 font-inter text-base sm:text-lg leading-relaxed font-light whitespace-pre-line">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Residence Gallery (1, 2, 3... 10.webp) */}
                {selectedProject.gallery && selectedProject.gallery.length > 0 ? (
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200/80 pb-3">
                      <div>
                        <h4 className="text-sm font-semibold tracking-wide text-neutral-900 flex items-center gap-2">
                          <Images className="w-4 h-4 text-neutral-600" />
                          <span>Residence Gallery</span>
                          <span className="text-xs font-mono text-neutral-400 font-normal">
                            ({selectedProject.gallery.length} Photographs)
                          </span>
                        </h4>
                        <p className="text-xs text-neutral-500 font-light mt-0.5">
                          Tap or click any photograph to view full screen & swipe left/right
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => openLightboxAt(0)}
                        className="inline-flex items-center text-xs font-mono tracking-wider font-medium text-neutral-800 hover:text-black py-1.5 px-3.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors w-fit"
                      >
                        <Expand className="w-3.5 h-3.5 mr-1.5" />
                        <span>Open Full Screen Gallery</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                      {selectedProject.gallery.map((imgSrc, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.025 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => openLightboxAt(idx)}
                          className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200/90 shadow-sm cursor-pointer"
                        >
                          <Image
                            src={imgSrc}
                            alt={`${selectedProject.name} photograph ${idx + 1}`}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          {/* Dark overlay on hover with Expand icon */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                              <Expand className="w-4 h-4" />
                            </div>
                          </div>
                          {/* Image number badge */}
                          <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] font-mono text-white/90">
                            {idx + 1}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Fallback Secondary Image */
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
                    <Image
                      src={selectedProject.secondaryImage}
                      alt={`${selectedProject.name} Detail`}
                      fill
                      className="object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* CTA Bar */}
                <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs font-inter text-neutral-500">
                    Private viewing reservations and bespoke documentation available upon request.
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <Link
                      href={`/projects/${selectedProject.slug}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full text-xs font-inter tracking-[0.16em] font-semibold border border-neutral-300 text-neutral-800 hover:border-neutral-900 hover:text-black transition-all duration-300"
                    >
                      <span>Full Project Page</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-2" />
                    </Link>

                    <button
                      onClick={() => {
                        const name = selectedProject.name;
                        setSelectedProject(null);
                        onEnquireForProject(name);
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-inter tracking-[0.16em] font-semibold bg-neutral-950 text-white hover:bg-neutral-800 transition-all duration-300"
                    >
                      <span>Enquire About This Project</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Swipeable Lightbox */}
      {selectedProject && (
        <ProjectGalleryLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={
            selectedProject.gallery && selectedProject.gallery.length > 0
              ? selectedProject.gallery
              : [selectedProject.heroImage, selectedProject.secondaryImage]
          }
          initialIndex={lightboxIndex}
          projectName={selectedProject.name}
        />
      )}
    </section>
  );
}
