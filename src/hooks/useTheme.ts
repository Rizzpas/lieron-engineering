"use client";

import { useEffect, useSyncExternalStore, useCallback } from "react";

type Theme = "light" | "dark";

function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    () => (localStorage.getItem("lieron-theme") as Theme) || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
    getServerSnapshot
  );

  // Apply theme class on mount and changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = theme === "light" ? "dark" : "light";
    localStorage.setItem("lieron-theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
    // Trigger storage event for useSyncExternalStore
    window.dispatchEvent(new Event("storage"));
  }, [theme]);

  return { theme, toggleTheme, mounted: true };
}
