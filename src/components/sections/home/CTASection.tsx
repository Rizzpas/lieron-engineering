"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { fadeUp, scaleIn, pulseGlow, viewportOnce } from "@/lib/animations";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function CTASection() {
  const isMobile = useIsMobile();

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-32">
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-gray-900 dark:bg-dark-card px-8 md:px-16 lg:px-24 py-16 md:py-24 text-center border border-gray-800 dark:border-dark-border"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={scaleIn}
      >
        {/* Decorative elements */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"
          animate={isMobile ? undefined : pulseGlow}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[80px]"
          animate={isMobile ? undefined : { ...pulseGlow, transition: { ...pulseGlow.transition, delay: 1.5 } }}
        />

        <div className="relative z-10">
          <motion.p
            className="text-primary font-semibold text-[11px] uppercase tracking-[0.2em] mb-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Get Started
          </motion.p>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Ready to Build
          </motion.h2>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Something Great?
          </motion.h2>
          <motion.p
            className="text-gray-400 text-base md:text-lg mb-12 max-w-lg mx-auto leading-relaxed"
            variants={fadeUp}
            custom={0.4}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            Consult with our engineering team for your next structural steel project.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button href="/contact" variant="primary" size="lg" id="cta-consultation">
              Initiate Consultation
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
            <Button href="/contact" variant="outline" size="lg" id="cta-direct" className="border-gray-700 text-white hover:border-gray-500 hover:bg-white/5">
              Direct Contact
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
