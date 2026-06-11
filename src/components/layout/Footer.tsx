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
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] bg-noise-texture pointer-events-none" />

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
                <address className="space-y-3 not-italic">
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
                </address>
              </div>

              {/* Link columns */}
              <nav aria-label="Footer navigation" className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
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
                      { label: "Facebook", href: "https://www.facebook.com/lieronengineeringlimited" },
                      { label: "WhatsApp", href: "https://wa.me/64212862885" },
                    ].map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
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
              </nav>
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
                  href: "https://www.facebook.com/lieronengineeringlimited",
                  path: "M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z",
                },
                {
                  label: "WhatsApp",
                  href: "https://wa.me/64212862885",
                  path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
