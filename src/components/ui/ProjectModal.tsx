"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectData } from "@/lib/projects";
import { modalBackdrop, modalContent } from "@/lib/animations";

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  // Close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const modalHtml = (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal content */}
          <motion.div
            className="relative w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark-card sm:rounded-2xl shadow-2xl border border-gray-200/20 dark:border-white/5"
            onClick={(e) => e.stopPropagation()}
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close modal"
              id="modal-close"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Hero image */}
            <div className="relative h-64 sm:h-80 w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Status badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className={`text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full ${
                  project.status === "ongoing"
                    ? "bg-primary text-white"
                    : "bg-white/90 text-gray-900"
                }`}>
                  {project.status}
                </span>
              </div>

              {/* Title overlay */}
              <motion.div
                className="absolute bottom-6 left-6 right-16 z-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <p className="text-primary font-semibold text-[11px] uppercase tracking-[0.15em] mb-2">
                  {project.categoryLabel}
                </p>
                <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {project.title}
                </h2>
              </motion.div>
            </div>

            {/* Content */}
            <motion.div
              className="p-6 sm:p-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              {/* Meta row — Contractors */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-dark-border">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {project.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {project.details.duration}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Project specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 dark:bg-dark-surface rounded-xl p-4 border border-gray-100 dark:border-dark-border">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mb-1">Duration</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{project.details.duration}</p>
                </div>
                <div className="bg-gray-50 dark:bg-dark-surface rounded-xl p-4 border border-gray-100 dark:border-dark-border">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mb-1">Main Contractor</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{project.mainContractor}</p>
                </div>
                <div className="bg-gray-50 dark:bg-dark-surface rounded-xl p-4 border border-gray-100 dark:border-dark-border">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mb-1">Category</p>
                  <p className="text-lg font-bold text-primary">{project.categoryLabel}</p>
                </div>
              </div>

              {/* Scope */}
              <div className="bg-gray-50 dark:bg-dark-surface rounded-xl p-5 border border-gray-100 dark:border-dark-border mb-8">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mb-2">Project Scope</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{project.details.scope}</p>
              </div>

              {/* Key Highlights */}
              {project.keyHighlights.length > 0 && (
                <div className="mb-8">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mb-4">Key Highlights</p>
                  <ul className="space-y-3">
                    {project.keyHighlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gallery */}
              {project.gallery.length > 0 && (
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mb-4">Gallery</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {project.gallery.map((img, i) => (
                      <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 dark:border-dark-border">
                        <Image
                          src={img}
                          alt={`${project.title} - Photo ${i + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 50vw, 200px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(modalHtml, document.body);
}
