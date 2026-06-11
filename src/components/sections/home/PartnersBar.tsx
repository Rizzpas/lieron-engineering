"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function PartnersBar() {
  return (
    <motion.section
      className="py-12 md:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <motion.div className="flex items-center gap-4" variants={fadeUp}>
            <div className="h-px w-12 bg-gray-200 dark:bg-gray-800 hidden md:block" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
              Trusted Partners
            </p>
          </motion.div>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            <motion.span
              className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300"
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/images/enterprize-logo.svg"
                alt="Enterprize Steel"
                width={120}
                height={48}
                className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
              />
            </motion.span>
            <motion.span
              className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300"
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/images/weldlok-logo.png"
                alt="Weldlok"
                width={120}
                height={48}
                className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
              />
            </motion.span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
