"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Provider component that initializes scroll animations on each page navigation.
 * Uses MutationObserver to detect dynamically-added elements (e.g. from filtering).
 */
export default function ScrollAnimationProvider() {
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create a single IntersectionObserver for the page lifetime
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observerRef.current = io;

    // Observe all existing elements
    const observeAll = () => {
      document.querySelectorAll(".animate-on-scroll:not(.is-visible)").forEach((el) => {
        io.observe(el);
      });
    };

    // Initial scan (slight delay for DOM readiness)
    const timeout = setTimeout(observeAll, 100);

    // Watch for dynamically added elements (e.g. filter changes)
    const mo = new MutationObserver((mutations) => {
      let hasNewElements = false;
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.classList?.contains("animate-on-scroll") && !node.classList.contains("is-visible")) {
              io.observe(node);
              hasNewElements = true;
            }
            // Also check children of added nodes
            node.querySelectorAll?.(".animate-on-scroll:not(.is-visible)")?.forEach((child) => {
              io.observe(child);
              hasNewElements = true;
            });
          }
        }
      }
      // If new elements appeared, also re-scan (handles React batching)
      if (hasNewElements) {
        requestAnimationFrame(observeAll);
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timeout);
      io.disconnect();
      mo.disconnect();
      observerRef.current = null;
    };
  }, [pathname]);

  return null;
}
