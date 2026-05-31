"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

/**
 * Premium ambient background decorations.
 * On desktop: full gradient orbs + noise + dot grid.
 * On mobile: single lightweight radial gradient to preserve warmth without GPU cost.
 */
export default function AmbientBackground() {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Lightweight single gradient — preserves warm brand feel without GPU-heavy blur
    return (
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/[0.04] via-transparent to-orange-500/[0.03] dark:from-orange-500/[0.05] dark:to-primary/[0.04]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Large warm orb — top left */}
      <div className="absolute -top-[30%] -left-[15%] w-[80vw] h-[80vh] bg-gradient-to-br from-orange-400/[0.07] via-orange-300/[0.04] to-transparent rounded-full blur-[100px] dark:from-orange-500/[0.08] dark:via-orange-400/[0.03]" />
      {/* Accent orb — top right */}
      <div className="absolute -top-[10%] -right-[15%] w-[50vw] h-[50vh] bg-gradient-to-bl from-amber-200/[0.05] via-transparent to-transparent rounded-full blur-[80px] dark:from-primary/[0.06]" />
      {/* Deep orb — bottom right */}
      <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vh] bg-gradient-to-tl from-orange-500/[0.05] via-rose-300/[0.02] to-transparent rounded-full blur-[120px] dark:from-primary/[0.07] dark:via-orange-600/[0.03]" />
      {/* Mid-page glow */}
      <div className="absolute top-[50%] left-[20%] w-[50vw] h-[40vh] bg-gradient-to-r from-orange-200/[0.04] to-transparent rounded-full blur-[100px] dark:from-primary/[0.05]" />
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] bg-noise-texture" />
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, currentColor 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }} />
    </div>
  );
}
