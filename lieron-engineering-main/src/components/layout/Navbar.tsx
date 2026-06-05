"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { NAV_LINKS, COMPANY } from "@/lib/constants";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <nav
      id="main-navigation"
      className={`fixed w-full z-50 top-0 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-dark/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_rgba(255,255,255,0.05)]"
          : "bg-white/50 dark:bg-dark/50 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl flex items-center justify-between mx-auto px-6 lg:px-8 h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0" id="logo-link">
          <Image
            src="/icons/lieron-logo.svg"
            alt={`${COMPANY.name} Logo`}
            width={28}
            height={32}
            className="h-7 w-auto transition-transform duration-300 group-hover:scale-110"
            priority
          />
          <div className="hidden sm:block">
            <span className="text-[13px] font-bold uppercase tracking-[0.12em] text-gray-900 dark:text-white transition-colors">
              Lieron
            </span>
            <span className="text-[13px] font-normal uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400 ml-1 transition-colors">
              Engineering
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 rounded-lg ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex bg-primary text-white hover:bg-primary-hover px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 shadow-[0_2px_8px_rgba(234,88,12,0.25)] hover:shadow-[0_4px_16px_rgba(234,88,12,0.35)] hover:-translate-y-0.5 rounded-sm"
            id="nav-cta"
          >
            Discuss Project
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            id="mobile-menu-toggle"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-[1.5px] bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-8 pt-2 bg-white/95 dark:bg-dark/95 backdrop-blur-xl border-t border-gray-100/50 dark:border-white/5">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 py-3.5 px-4 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? "text-primary bg-primary/5"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                >
                  {pathname === link.href && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
            <Link
              href="/contact"
              className="flex items-center justify-center w-full bg-primary text-white py-3.5 font-semibold uppercase text-xs tracking-[0.15em] hover:bg-primary-hover transition-all duration-300 rounded-lg shadow-[0_4px_16px_rgba(234,88,12,0.25)]"
            >
              Discuss Project
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
