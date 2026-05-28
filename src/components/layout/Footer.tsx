import Link from "next/link";
import Image from "next/image";
import { COMPANY, FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Main footer */}
      <div className="bg-gray-50 dark:bg-dark-card relative">
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20512%20512%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.7%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Top section — large branding */}
          <div className="pt-16 lg:pt-20 pb-12 lg:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Brand column */}
              <div className="lg:col-span-5">
                <Link href="/" className="inline-flex items-center gap-3 group mb-6">
                  <Image
                    src="/icons/lieron-logo.svg"
                    alt={`${COMPANY.name} Logo`}
                    width={32}
                    height={36}
                    className="h-8 w-auto transition-transform duration-300 group-hover:scale-110"
                  />
                  <div>
                    <span className="text-base font-bold uppercase tracking-[0.1em] text-gray-900 dark:text-white">
                      Lieron
                    </span>
                    <span className="text-base font-normal uppercase tracking-[0.1em] text-gray-400 ml-1.5">
                      Engineering
                    </span>
                  </div>
                </Link>
                <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm mb-8">
                  Specializing in Structural Steel Detailing, Rigging, and Site Fabrication Welding across New Zealand.
                </p>

                {/* Contact quick info */}
                <div className="space-y-3">
                  <a
                    href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-surface flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    {COMPANY.phone}
                  </a>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-surface flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    {COMPANY.email}
                  </a>
                </div>
              </div>

              {/* Link columns */}
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-5">
                    Services
                  </h3>
                  <ul className="space-y-3.5">
                    {FOOTER_LINKS.services.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-5">
                    Company
                  </h3>
                  <ul className="space-y-3.5">
                    {FOOTER_LINKS.company.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-5">
                    Connect
                  </h3>
                  <ul className="space-y-3.5">
                    {[
                      { label: "Facebook", href: "#" },
                      { label: "Instagram", href: "#" },
                      { label: "LinkedIn", href: "#" },
                    ].map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200 inline-flex items-center gap-2"
                        >
                          {link.label}
                          <svg className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-200/60 dark:border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400 dark:text-gray-600 tracking-wide">
              © {currentYear} {COMPANY.name}. All rights reserved.
            </p>

            <div className="flex items-center gap-5">
              {/* Social icons */}
              {[
                {
                  label: "Facebook",
                  path: "M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z",
                },
                {
                  label: "Instagram",
                  path: "M12 2c-2.716 0-3.056.012-4.123.06-1.064.049-1.791.218-2.427.465a4.902 4.902 0 0 0-1.772 1.153A4.902 4.902 0 0 0 2.525 5.45c-.247.636-.416 1.363-.465 2.427C2.012 8.944 2 9.284 2 12s.012 3.056.06 4.123c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 0 0 1.153 1.772 4.902 4.902 0 0 0 1.772 1.153c.636.247 1.363.416 2.427.465 1.067.048 1.407.06 4.123.06s3.056-.012 4.123-.06c1.064-.049 1.791-.218 2.427-.465a4.902 4.902 0 0 0 1.772-1.153 4.902 4.902 0 0 0 1.153-1.772c.247-.636.416-1.363.465-2.427.048-1.067.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.049-1.064-.218-1.791-.465-2.427a4.902 4.902 0 0 0-1.153-1.772 4.902 4.902 0 0 0-1.772-1.153c-.636-.247-1.363-.416-2.427-.465C15.056 2.012 14.716 2 12 2Zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5.25-9a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z",
                },
                {
                  label: "LinkedIn",
                  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-600 hover:text-primary dark:hover:text-primary hover:bg-primary/5 transition-all duration-200"
                  aria-label={social.label}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
