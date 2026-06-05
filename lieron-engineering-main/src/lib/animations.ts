"use client";

import { Variants } from "framer-motion";

/* ===== REUSABLE ANIMATION VARIANTS ===== */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

/* ===== HERO-SPECIFIC VARIANTS ===== */

export const heroWord: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.12,
    },
  }),
};

export const heroBadge: Variants = {
  hidden: { opacity: 0, y: -16, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
  },
};

export const heroImage: Variants = {
  hidden: { opacity: 0, scale: 0.95, x: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};

/* ===== INTERACTIVE VARIANTS ===== */

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    y: -6,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

export const buttonHover = {
  hover: {
    y: -2,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tap: {
    scale: 0.97,
    transition: { duration: 0.1 },
  },
};

export const linkHover = {
  rest: { x: 0 },
  hover: {
    x: 4,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

/* ===== CONTINUOUS ANIMATIONS ===== */

export const floatingAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 4,
    ease: "easeInOut" as const,
    repeat: Infinity,
  },
};

export const pulseGlow = {
  scale: [1, 1.05, 1],
  opacity: [0.5, 0.8, 0.5],
  transition: {
    duration: 3,
    ease: "easeInOut" as const,
    repeat: Infinity,
  },
};

export const slowRotate = {
  rotate: [0, 360],
  transition: {
    duration: 60,
    ease: "linear" as const,
    repeat: Infinity,
  },
};

/* ===== VIEWPORT CONFIG ===== */

export const viewportOnce = { once: true, margin: "-60px 0px" as const };
export const viewportRepeat = { once: false, margin: "-60px 0px" as const };

/* ===== MODAL VARIANTS ===== */

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", damping: 25, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.97,
    transition: { duration: 0.2 },
  },
};

/* ===== FILTER / LAYOUT ANIMATION ===== */

export const filterCard: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};
