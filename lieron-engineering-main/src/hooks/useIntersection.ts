"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for scroll-based intersection animations.
 * Attaches an IntersectionObserver to a ref and adds 'is-visible' class when element enters viewport.
 */
export function useIntersection(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          element.classList.add("is-visible");
          observer.unobserve(element); // Only animate once
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px", ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}

/**
 * Bulk scroll animation initializer.
 * Call once in layout to auto-animate all `.animate-on-scroll` elements.
 */
export function useScrollAnimations() {
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
