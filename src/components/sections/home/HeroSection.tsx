"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import {
  fadeUp,
  heroBadge,
  heroImage,
  heroWord,
  staggerContainer,
  floatingAnimation,
  viewportOnce,
} from "@/lib/animations";
import { useIsMobile } from "@/hooks/useIsMobile";

const HERO_WORDS = ["Quality", "of", "Work"];
const HERO_LINE2 = ["Is", "Our"];

export default function HeroSection() {
  const isMobile = useIsMobile();

  return (
    <section className="relative w-full overflow-hidden">
      <div className={`${isMobile ? '' : 'grid-bg-animated'} max-w-7xl mx-auto px-6 lg:px-8 pt-16 md:pt-24 pb-20 md:pb-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-20`}>
        {/* Left Content */}
        <motion.div
          className="lg:w-[55%] text-center lg:text-left"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.div
            variants={heroBadge}
            className="inline-flex items-center gap-2.5 bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 rounded-full px-4 py-1.5 mb-8"
          >
            {/* Pulsing dot — disabled on mobile to save CPU */}
            {isMobile ? (
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            ) : (
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            <span className="text-primary font-semibold text-[11px] uppercase tracking-[0.15em]">
              {COMPANY.tagline}
            </span>
          </motion.div>

          {/* Headline with staggered word reveal */}
          <h1 className="text-[clamp(2.5rem,5.5vw,5rem)] font-extrabold leading-[0.95] tracking-tight text-gray-900 dark:text-white mb-8">
            <span className="block" style={{ perspective: "600px" }}>
              {HERO_WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  custom={i}
                  variants={heroWord}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block relative" style={{ perspective: "600px" }}>
              {HERO_LINE2.map((word, i) => (
                <motion.span
                  key={word}
                  custom={i + HERO_WORDS.length}
                  variants={heroWord}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                custom={HERO_WORDS.length + HERO_LINE2.length}
                variants={heroWord}
                className="inline-block gradient-text"
              >
                Assurance
              </motion.span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
              >
                <motion.path
                  d="M2 10C50 3 150 1 298 5"
                  stroke="#ea580c"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
                />
              </motion.svg>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            custom={0.5}
            className="text-gray-500 dark:text-gray-400 max-w-lg mb-10 leading-[1.8] text-[15px] mx-auto lg:mx-0"
          >
            {COMPANY.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={0.6}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
          >
            <Button href="/contact" variant="primary" size="lg" id="hero-cta-discuss">
              Discuss Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
            <Button href="/projects" variant="outline" size="lg" id="hero-cta-portfolio">
              View Portfolio
            </Button>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            variants={fadeUp}
            custom={0.8}
            className="mt-12 pt-8 border-t border-gray-100 dark:border-white/5 flex flex-wrap items-center justify-center lg:justify-start gap-8"
          >
            {[
              { value: "99.8%", label: "Accuracy" },
              { value: "NZS", label: "Certified" },
              { value: "24/7", label: "Support" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center lg:text-left"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="lg:w-[45%] relative hidden lg:block"
          variants={heroImage}
          initial="hidden"
          animate="visible"
        >
          <div className="relative">
            {/* Decorative elements — infinite animations disabled on mobile (already hidden via lg:block) */}
            {!isMobile && (
              <>
                <motion.div
                  className="absolute -top-6 -right-6 w-32 h-32 bg-primary/5 dark:bg-primary/10 rounded-3xl -z-10"
                  animate={{ scale: [1, 1.08, 1], rotate: [0, 2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-24 h-24 border-2 border-primary/10 dark:border-primary/20 rounded-2xl -z-10"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, -3, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
              </>
            )}

            <div className="bg-gray-200 dark:bg-dark-surface overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/hero-image.jpg"
                alt="Structural Steel Engineering by Lerion Engineering"
                width={800}
                height={600}
                className="w-full h-[500px] object-cover transition-transform duration-[1.5s] hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>

            {/* Floating card — disable floating animation on mobile */}
            <motion.div
              className="absolute -bottom-8 -left-8 glass rounded-xl p-5 shadow-xl"
              animate={isMobile ? undefined : floatingAnimation}
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                    EST. {COMPANY.established}
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {COMPANY.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
