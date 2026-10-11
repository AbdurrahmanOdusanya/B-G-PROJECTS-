'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelectProject: (project: Project) => void;
}

export function ProjectCard({ project, index, onSelectProject }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();

  // Subtle stagger delay based on card position
  const delay = (index % 2) * 0.12;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer flex flex-col"
      onClick={() => onSelectProject(project)}
    >
      {/* Image Container with Restrained Zoom */}
      <div className={`relative w-full ${project.aspectRatio || 'aspect-[16/10]'} overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 mb-5 sm:mb-6`}>
        <motion.div
          whileHover={shouldReduceMotion ? {} : { scale: 1.025 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src={project.heroImage}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Subtle architectural atmosphere overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
        </motion.div>

        {/* Quiet Clean Unboxed Status & Type Label (Zero-Pill Discipline) */}
        <div className="absolute top-4 left-5 right-5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center space-x-2 text-[11px] font-mono tracking-[0.2em] text-neutral-200 uppercase drop-shadow-md">
            <span>{project.propertyType}</span>
          </div>

          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.2em] text-neutral-300 uppercase px-2.5 py-1 rounded bg-black/40 backdrop-blur-md border border-white/10">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                project.status === 'Completed'
                  ? 'bg-emerald-400'
                  : project.status === 'Ongoing'
                  ? 'bg-amber-400'
                  : 'bg-blue-400'
              }`}
            />
            <span>{project.status}</span>
          </div>
        </div>
      </div>

      {/* Project Meta & Hover Transition */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-start justify-between">
          <motion.h3
            className="font-editorial text-2xl sm:text-3xl text-neutral-100 font-normal transition-transform duration-300 group-hover:-translate-y-1"
          >
            {project.name}
          </motion.h3>

          <motion.div
            className="flex items-center text-xs tracking-[0.2em] font-medium text-neutral-400 group-hover:text-white transition-colors duration-300 pt-1"
          >
            <span className="hidden sm:inline-block mr-2 border-b border-transparent group-hover:border-white transition-colors">
              VIEW RESIDENCE
            </span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 text-neutral-300 group-hover:text-white" />
          </motion.div>
        </div>

        {/* Clean Typographic Metadata (No static pills) */}
        <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400 group-hover:text-neutral-300 transition-colors">
          <MapPin className="w-3.5 h-3.5 text-neutral-500" />
          <span>{project.location}</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>{project.bedrooms} Beds</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>{project.bathrooms} Baths</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>{project.size}</span>
        </div>

        <p className="text-sm text-neutral-400 font-light line-clamp-2 pt-1 leading-relaxed">
          {project.tagline}
        </p>
      </div>
    </motion.div>
  );
}
