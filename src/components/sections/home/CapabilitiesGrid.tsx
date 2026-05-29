"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const CARDS = [
  {
    num: "01",
    title: "Structural Steel Detailing",
    desc: "We provide precise 3D modelling and shop drawings that seamlessly connect architectural concepts with fabrication needs.",
    span: "md:col-span-7",
    image: "/images/Steel-detailing.jpg",
    isHorizontal: true,
  },
  {
    num: "02",
    title: "Rigging",
    desc: "Expert lifting operations for complex steel structures across demanding NZ sites.",
    span: "md:col-span-5",
    image: "/images/riggings.jpeg",
    isHorizontal: false,
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Site Fabrication",
    desc: "On-site modifications and precision fabrication for real-world structural challenges.",
    span: "md:col-span-5",
    image: "/images/sf.jpeg",
    isHorizontal: false,
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Certified Welding",
    desc: "Exceeding NZ industrial standards with high-pressure site welding services for seismic-critical infrastructure.",
    span: "md:col-span-7",
    image: "/images/sw.jpeg",
    isHorizontal: true,
  },
];

export default function CapabilitiesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-32">
      <motion.div
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp}>
          <SectionLabel>Core Capabilities</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.05]">
            Engineered
            <br />
            <span className="text-gray-400 dark:text-gray-600">Reliability.</span>
          </h2>
        </motion.div>
        <motion.p
          variants={fadeUp}
          className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed max-w-sm"
        >
          Four integrated capabilities that form the backbone of New Zealand&apos;s structural steel infrastructure.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {CARDS.map((card) => (
          <motion.div
            key={card.num}
            variants={fadeUp}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className={`${card.span} bg-gray-100 shadow-md dark:bg-dark-surface rounded-2xl text-gray-900 dark:text-white flex flex-col ${card.isHorizontal ? "md:flex-row" : ""} overflow-hidden group border border-gray-100 dark:border-dark-border transition-shadow duration-500 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.3)] min-h-[380px]`}
          >
            {/* Text container */}
            <div className={`p-10 ${card.isHorizontal ? "lg:p-14 md:w-[55%] flex flex-col justify-center" : "flex-grow flex flex-col justify-between"}`}>
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-primary font-bold text-xs tracking-[0.2em] uppercase">{card.num}</span>
                  {card.icon && (
                    <div className="w-10 h-10 rounded-xl bg-primary/5 dark:bg-primary/10 flex items-center justify-center group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors">
                      {card.icon}
                    </div>
                  )}
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>

            {/* Image container */}
            <div className={`${card.isHorizontal ? "md:w-[45%] h-64 md:h-auto" : "h-48 w-full mt-auto"} relative`}>
              <Image
                src={card.image}
                alt={card.title}
                fill
                loading="lazy"
                className="object-cover opacity-100 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                sizes={card.isHorizontal ? "(max-width: 768px) 100vw, 320px" : "(max-width: 768px) 100vw, 400px"}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
