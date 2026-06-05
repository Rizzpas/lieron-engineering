"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { fadeUp, slideLeft, slideRight, floatingAnimation, viewportOnce } from "@/lib/animations";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function ExcellenceSection() {
  const isMobile = useIsMobile();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-dark-card dark:via-dark dark:to-dark-card" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Image side */}
        <motion.div
          className="lg:w-1/2 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideLeft}
        >
          <div className="relative">
            <Image
              src="/images/wow.jpg"
              alt="Rigging"
              width={800}
              height={500}
              loading="lazy"
              style={{ width: "auto", height: "auto" }}
              className="w-full h-[400px] lg:h-[500px] object-cover object-top rounded-2xl shadow-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Floating stat card */}
            <motion.div
              className="absolute -bottom-6 -right-4 lg:-right-8 glass rounded-xl p-5 shadow-xl"
              animate={isMobile ? undefined : floatingAnimation}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-[0_4px_16px_rgba(234,88,12,0.3)]">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">99.9%</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Accuracy Rate</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content side */}
        <motion.div
          className="lg:w-1/2 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideRight}
        >
          <p className="text-primary font-semibold text-[11px] uppercase tracking-[0.2em] mb-4">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 text-gray-900 dark:text-white leading-[1.1]">
            Machined For
            <br />
            Excellence.
          </h2>

          <div className="space-y-8 mb-10">
            {[
              {
                stat: "100+",
                title: "Projects Done",
                desc: "Successfully delivered structural steel detailing and fabrication across NZ.",
              },
              {
                stat: "99.9%",
                title: "Success Rate",
                desc: "Rigorous detailing verification processes ensure zero rework on site.",
              },
              {
                stat: "NZS",
                title: "Certified Standards",
                desc: "Full compliance with AS/NZS 1554 structural welding standards.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="flex items-start gap-5 group"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="shrink-0 w-14 h-14 rounded-xl bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-dark-border flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-lg font-black text-primary">{item.stat}</span>
                </motion.div>
                <div>
                  <h4 className="font-bold text-sm mb-1 text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <Button href="/about" variant="outline">
            Learn About Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
