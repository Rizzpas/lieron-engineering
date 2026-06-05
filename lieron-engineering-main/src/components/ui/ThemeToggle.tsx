"use client";

import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-gray-200 dark:bg-gray-700 p-0.5 transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 group"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      id="theme-toggle"
    >
      {/* Track icons */}
      <span className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        {/* Sun icon */}
        <svg
          className={`w-3.5 h-3.5 transition-all duration-500 ${
            theme === "light" ? "text-amber-500 scale-100 opacity-100" : "text-gray-500 scale-75 opacity-40"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
        {/* Moon icon */}
        <svg
          className={`w-3.5 h-3.5 transition-all duration-500 ${
            theme === "dark" ? "text-blue-300 scale-100 opacity-100" : "text-gray-400 scale-75 opacity-40"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </span>

      {/* Sliding knob */}
      <span
        className={`block w-6 h-6 bg-white rounded-full shadow-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          theme === "dark" ? "translate-x-7" : "translate-x-0"
        } group-hover:shadow-lg group-active:w-7`}
      />
    </button>
  );
}
