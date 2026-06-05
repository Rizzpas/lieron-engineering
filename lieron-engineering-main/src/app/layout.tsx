import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { COMPANY } from "@/lib/constants";
import ScrollAnimationProvider from "@/components/layout/ScrollAnimationProvider";
import PageTransition from "@/components/layout/PageTransition";
import ScrollToTop from "@/components/ui/ScrollToTop";
import AmbientBackground from "@/components/layout/AmbientBackground";


const inter = localFont({
  src: "../../public/fonts/Inter-Variable.ttf",
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: `${COMPANY.name} — ${COMPANY.tagline}`,
    template: `%s | ${COMPANY.name}`,
  },
  description: COMPANY.description,
  metadataBase: new URL(COMPANY.domain),
  openGraph: {
    title: COMPANY.name,
    description: COMPANY.description,
    url: COMPANY.domain,
    siteName: COMPANY.name,
    locale: "en_NZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: COMPANY.name,
    description: COMPANY.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icons/lieron-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent FOUC for dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('lieron-theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased relative`}>
        <AmbientBackground />

        <Navbar />
        <main className="pt-[72px] relative z-[1]">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <ScrollAnimationProvider />
        <ScrollToTop />

      </body>
    </html>
  );
}
