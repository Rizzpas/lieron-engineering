"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import StatsCounter from "@/components/ui/StatsCounter";
import Button from "@/components/ui/Button";
import ProjectModal from "@/components/ui/ProjectModal";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/projects";
import type { ProjectData } from "@/lib/projects";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function ProjectsPageClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [showAll, setShowAll] = useState(false);

  const isMobile = useIsMobile();
  const defaultLimit = isMobile ? 3 : 6;

  const filtered = activeCategory === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const displayedProjects = showAll ? filtered : filtered.slice(0, defaultLimit);

  return (
    <>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 md:pt-24 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <SectionLabel variant="dark">Portfolio Archive</SectionLabel>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight text-dark dark:text-white">
              Engineering
              <br />
              <span className="text-gray-400 dark:text-gray-600">Excellence.</span>
            </h1>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.2}
          >
            <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed max-w-md lg:ml-auto">
              From infrastructural frameworks to complex industrial assembly — our portfolio reflects a commitment to New Zealand&apos;s robust skyline.
            </p>
          </motion.div>
        </div>

        {/* Filter bar */}
        <motion.div
          className="flex flex-wrap items-center gap-2 mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.3}
        >
          {PROJECT_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.value}
              type="button"
              onClick={() => {
                setActiveCategory(cat.value);
                setShowAll(false);
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] rounded-full transition-all duration-300 cursor-pointer ${
                activeCategory === cat.value
                  ? "bg-primary text-white shadow-[0_2px_12px_rgba(234,88,12,0.3)]"
                  : "bg-gray-100 dark:bg-dark-card text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-surface border border-gray-200 dark:border-dark-border"
              }`}
              id={`filter-${cat.value}`}
            >
              {cat.label}
              {cat.value !== "all" && (
                <span className="ml-2 text-[10px] opacity-60">
                  {PROJECTS.filter((p) => p.category === cat.value).length}
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Project Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {displayedProjects.map((project, index) => {
              const isLastVisible = !showAll && index === defaultLimit - 1 && filtered.length > defaultLimit;
              const remainingCount = filtered.length - defaultLimit;

              return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (isLastVisible) {
                    setShowAll(true);
                  } else {
                    setSelectedProject(project);
                  }
                }}
                onKeyDown={(e) => { 
                  if (e.key === 'Enter' || e.key === ' ') { 
                    e.preventDefault(); 
                    if (isLastVisible) {
                      setShowAll(true);
                    } else {
                      setSelectedProject(project); 
                    }
                  } 
                }}
                className={`${!isLastVisible ? 'group' : ''} text-left relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-dark-border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50`}
                whileHover={isLastVisible ? {} : { y: -4 }}
                id={`project-${project.id}`}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Status badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full ${
                      project.status === "ongoing"
                        ? "bg-primary text-white"
                        : "bg-white/90 dark:bg-dark-card/90 text-gray-700 dark:text-gray-300 backdrop-blur-sm"
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* View button overlay */}
                  {!isLastVisible && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm text-gray-900 dark:text-white text-[10px] font-semibold uppercase tracking-[0.15em] px-5 py-2.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        View Details
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-primary font-semibold text-[10px] uppercase tracking-[0.15em]">
                      {project.categoryLabel}
                    </span>
                    <span className="text-gray-400 dark:text-gray-600 text-xs">
                      {project.details.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Bottom meta */}
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-dark-border flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {project.location}
                    </div>
                    <svg className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

                {/* View All Overlay for the last visible card */}
                {isLastVisible && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] transition-colors hover:bg-black/50">
                    <span className="text-white text-2xl font-bold tracking-tight">
                      View All
                    </span>
                    <span className="text-white/90 text-sm mt-2 font-medium">
                      +{remainingCount} more
                    </span>
                  </div>
                )}
              </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {showAll && filtered.length > defaultLimit && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 flex justify-center"
          >
            <Button
              onClick={() => setShowAll(false)}
              variant="outline"
              type="button"
            >
              See Less
            </Button>
          </motion.div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 dark:text-gray-500 text-lg">No projects found in this category.</p>
          </div>
        )}
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="divider-gradient mb-12" />
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <StatsCounter value="14,200" label="Tons Placed" />
          <StatsCounter value="24" label="Active Sites" />
          <StatsCounter value="09" label="Vehicles" />
          <StatsCounter value="100%" label="Safety Rating" />
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gray-900 dark:bg-dark-card p-12 md:p-16 flex flex-col md:flex-row justify-between items-center gap-8 border border-gray-800 dark:border-dark-border"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Ready to build the future
              <br />
              <span className="gradient-text">of New Zealand?</span>
            </h2>
          </div>
          <Button href="/contact" variant="primary" id="projects-cta" className="relative z-10 shrink-0">
            Start A Project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
        </motion.div>
      </section>

      {/* Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
