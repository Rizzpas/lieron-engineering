"use client";

import { useEffect, useState } from "react";

/**
 * Detects mobile devices via media query.
 * Returns `true` on screens ≤768px OR coarse-pointer devices.
 * Defaults to `false` during SSR to avoid hydration mismatch.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile;
}
