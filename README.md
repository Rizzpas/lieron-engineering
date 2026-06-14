# 🏗️ Lieron Engineering Digital Experience

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-ff0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Upstash](https://img.shields.io/badge/Upstash-Redis-00E599?style=for-the-badge&logo=upstash)](https://upstash.com/)

**Lieron Engineering Limited** is a premier structural steel engineering firm based in Auckland, NZ, specializing in structural steel detailing, rigging, site fabrication, welding, and manpower supply. 

This repository contains the high-performance, responsive corporate web experience built using Next.js 16 (App Router), styled with Tailwind CSS v4 and Vanilla CSS custom layout layers, animated using Framer Motion, and secured with modern rate limiting and anti-spam verification mechanisms.

---

## 🚀 Key Features

### ⚡ Client Performance & GPU Offloading
- **Ambient GPU Offloading**: A custom-designed background engine ([AmbientBackground.tsx](file:///c:/Users/jonat/OneDrive/Desktop/Projects/Lerion/lieron-engineering/src/components/layout/AmbientBackground.tsx)) detects screen width and input coarse pointers via [useIsMobile.ts](file:///c:/Users/jonat/OneDrive/Desktop/Projects/Lerion/lieron-engineering/src/hooks/useIsMobile.ts). On desktop, it renders beautiful multi-layered gradients and dot grids. On mobile, it switches to lightweight CSS gradients to prevent GPU performance bottlenecks.
- **Smart Animation Culling**: Non-essential continuous animation loops and heavy background grids are paused or disabled on mobile (see [globals.css](file:///c:/Users/jonat/OneDrive/Desktop/Projects/Lerion/lieron-engineering/src/app/globals.css)) to conserve device battery and processor resources.
- **AVIF & WebP Image Pipelines**: Configured at the framework level in [next.config.ts](file:///c:/Users/jonat/OneDrive/Desktop/Projects/Lerion/lieron-engineering/next.config.ts) to serve modern compressed image formats dynamically based on client browser compatibility.
- **Accessibility & Motion Controls**: Supports user OS-level settings through `prefers-reduced-motion` media queries, immediately bypassing all scroll transitions and background scroll animations.

### 🎭 intersectionObserver Scroll Animations
- Managed dynamically via [ScrollAnimationProvider.tsx](file:///c:/Users/jonat/OneDrive/Desktop/Projects/Lerion/lieron-engineering/src/components/layout/ScrollAnimationProvider.tsx), which hooks into Next.js routing changes and watches for new DOM nodes using a `MutationObserver` (to support filtered list rendering).
- Automatically manages GPU memory layer allocation by clearing standard `will-change` CSS properties once elements finish their entrance animations.

### 🔒 Secure Contact Submission Pipeline
The `/api/contact` route ([route.ts](file:///c:/Users/jonat/OneDrive/Desktop/Projects/Lerion/lieron-engineering/src/app/api/contact/route.ts)) implements a multi-step verification sequence to block spam submissions and ensure data integrity:
1. **Zod Schema Validation**: Form inputs are checked against a strict schema in [contactSchema.ts](file:///c:/Users/jonat/OneDrive/Desktop/Projects/Lerion/lieron-engineering/src/lib/contactSchema.ts).
2. **IP-Based Multi-Tiered Rate Limiting**: Backed by Upstash Redis in [ratelimit.ts](file:///c:/Users/jonat/OneDrive/Desktop/Projects/Lerion/lieron-engineering/src/lib/ratelimit.ts), utilizing sliding-window thresholds to block abuse across three timescales:
   - **3 requests per minute** (blocks rapid-fire spam)
   - **10 requests per hour** (prevents continuous client abuse)
   - **20 requests per day** (protects monthly Resend email quotas)
   - *Graceful Degradation*: If Redis credentials are missing or unreachable, rate limiting fails open to ensure client requests are not blocked.
3. **Honeypot Trap field**: Invisible decoy fields are validated. If filled (typically by bot scrapers), a mock success response is returned without initiating any mail deliveries.
4. **Server-Side Turnstile Verification**: Evaluates tokens using Cloudflare's verify site API in [turnstile.ts](file:///c:/Users/jonat/OneDrive/Desktop/Projects/Lerion/lieron-engineering/src/lib/turnstile.ts).
5. **Resend Email Delivery**: Form submissions compile a rich React email template ([ContactEmail.tsx](file:///c:/Users/jonat/OneDrive/Desktop/Projects/Lerion/lieron-engineering/src/emails/ContactEmail.tsx)) sent directly to target administration boxes via Resend.

### 🔍 Advanced Local SEO & Metadata Optimization
- **JSON-LD Schema Integration**: Structuring machine-readable schemas for `LocalBusiness`, `BreadcrumbList`, and `Service` catalogs inside [JsonLd.tsx](file:///c:/Users/jonat/OneDrive/Desktop/Projects/Lerion/lieron-engineering/src/components/seo/JsonLd.tsx).
- **Geographic & Indexing tags**: Page layout setups generate canonical links, robot commands, geographic region position parameters (`geo.position`, `geo.region`, `ICBM`), and targeting metadata headers defined in [metadata.ts](file:///c:/Users/jonat/OneDrive/Desktop/Projects/Lerion/lieron-engineering/src/lib/metadata.ts).

---

## 📁 Project Architecture

```
lieron-engineering/
├── public/                 # Static images, assets, and icons
├── src/
│   ├── app/                # Next.js Page Router layouts, pages, and API endpoints
│   │   ├── about/          # History, values, safety guidelines & team rosters
│   │   ├── api/            # Server endpoints (e.g., /contact)
│   │   ├── contact/        # Contact submission page client
│   │   ├── projects/       # Projects archive filter lists
│   │   ├── services/       # Detailing, rigging, fabrication & manpower portfolios
│   │   ├── globals.css     # Tailwind imports, custom keyframe animations & utilities
│   │   ├── layout.tsx      # Root container wrapper injecting navbar and footer links
│   │   └── page.tsx        # Homepage importing capability sections
│   ├── components/         # Reusable React components
│   │   ├── layout/         # Layout modules (Navbar, Footer, AmbientBackground, ScrollAnimationProvider)
│   │   ├── sections/       # Page-specific sections (Hero, capabilities, contact page clients)
│   │   ├── seo/            # Structured data wrappers (JSON-LD)
│   │   └── ui/             # Reusable UI controls (Buttons, theme toggle, project modals)
│   ├── emails/             # Transact mail styling template (ContactEmail.tsx)
│   ├── hooks/              # Custom utilities (useIsMobile, useTheme)
│   ├── lib/                # Config constants, validation schemas, and client wrappers
│   │   ├── constants.ts    # Main business details, addresses, and navigation links
│   │   ├── projects.ts     # Static projects listing data
│   │   ├── ratelimit.ts    # Upstash Redis rate-limit client
│   │   ├── turnstile.ts    # Cloudflare Turnstile verifications
│   │   └── metadata.ts     # Meta tag builders for SEO
│   └── types/              # Type structures & type definitions
├── resend_domain_setup.md  # Detailed setup guide for custom Resend email domains
├── package.json            # Scripts, dependency manifests, and tooling versions
└── tsconfig.json           # TypeScript build targets and configurations
```

---

## 🛠️ Developer Setup & Installation

### 1. Prerequisites
Ensure you have **Node.js (v18.x or later)** and **npm** installed on your system.

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# Resend Email Integration
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL=noriel@lieron.co.nz

# Cloudflare Turnstile Integration
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key

# Upstash Redis Rate Limiting (Required for API contact route)
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

### 3. Run the Development Server
Install dependencies and spin up the hot-reloading development server:

```bash
# Install packages
npm install

# Run locally on http://localhost:3000
npm run dev
```

### 4. Code Quality & Compilation
Run the validation scripts to lint code files and build a production release optimization bundle:

```bash
# Check code style with ESLint
npm run lint

# Generate production NextJS static export/bundle
npm run build
```

---

## 📧 Custom Domain setup (Resend)
By default, Resend routes sandbox mail to the account developer. To broadcast submissions directly to custom corporate mailboxes (such as `noriel@lieron.co.nz`), you must configure and verify domain DNS records. 

Please refer to the step-by-step SPF, DKIM, and MX guidelines inside the [resend_domain_setup.md](file:///c:/Users/jonat/OneDrive/Desktop/Projects/Lerion/lieron-engineering/resend_domain_setup.md) documentation file for domain activation details.

---
<p align="center">
  Developed by <strong>Lieron Engineering Limited</strong> — The Standard of Precision
</p>
