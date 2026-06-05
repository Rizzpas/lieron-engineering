"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface StatsCounterProps {
  value: string;
  label: string;
  className?: string;
}

export default function StatsCounter({
  value,
  label,
  className = "",
}: StatsCounterProps) {
  const [displayed, setDisplayed] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  const animateValue = useCallback(() => {
    // Extract numeric part
    const numMatch = value.match(/[\d,.]+/);
    if (!numMatch) {
      setDisplayed(value);
      return;
    }

    const numStr = numMatch[0];
    const target = parseFloat(numStr.replace(/,/g, ""));
    const hasComma = numStr.includes(",");
    const hasDecimal = numStr.includes(".");
    const prefix = value.slice(0, value.indexOf(numStr));
    const suffix = value.slice(value.indexOf(numStr) + numStr.length);
    const duration = 1500;
    const steps = 40;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(eased * target);

      if (current >= steps) {
        clearInterval(timer);
        setDisplayed(value);
        return;
      }

      let formatted = val.toString();
      if (hasComma) {
        formatted = val.toLocaleString();
      }
      if (hasDecimal) {
        formatted = (eased * target).toFixed(1);
      }

      setDisplayed(`${prefix}${formatted}${suffix}`);
    }, stepDuration);
  }, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          animateValue();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animateValue]);

  return (
    <div ref={ref} className={className}>
      <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-1">
        {label}
      </p>
      <p className="text-4xl md:text-5xl font-black text-dark dark:text-white">
        {displayed}
      </p>
    </div>
  );
}
