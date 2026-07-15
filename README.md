# Harin Vimal Bharathi J — Developer Portfolio

<div align="center">

![Portfolio Preview](public/images/og-preview.png)

**Senior Full Stack .NET Developer Portfolio**

Built with Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-FF0055?logo=framer)](https://www.framer.com/motion)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](https://harinvimal.dev) · [GitHub](https://github.com/HarinVimal) · [LinkedIn](https://linkedin.com/in/harinvimal)

</div>

---

## Overview

A production-ready, performance-optimised developer portfolio for a Senior Full Stack .NET Developer. Designed to impress recruiters at enterprise software companies with a premium, minimal aesthetic inspired by Apple, Vercel, Stripe, Linear, and Raycast.

The portfolio is entirely **data-driven** — all content lives in JSON files under `src/data/`. Adding a new project, experience entry, or certificate never requires touching a component.

---

## Features

### Design & UX
- **Premium dark theme** with light mode support via `next-themes`
- **Glassmorphism** cards with soft shadows and backdrop blur
- **Gradient headings** with indigo–violet color system
- **Noise texture** overlay for depth and tactility
- **Cursor glow** effect that follows the mouse on desktop
- **Animated background grid** on the hero section
- **Scroll progress bar** at the top of the viewport
- **Floating navbar** with active section indicator and spring animation
- **Responsive** — pixel-perfect on desktop, tablet, and mobile

### Animations (Framer Motion)
- **Hero parallax** — content scrolls at a reduced rate creating depth
- **Section reveal** — every section fades and slides in on scroll (once)
- **Stagger containers** — skill cards and project grids cascade in sequence
- **Typing text** — animated role cycling in the hero
- **Skill progress bars** — animated fill on scroll into view
- **Timeline animation** — experience dots spring-pop into view
- **Card hover** — subtle lift with shadow transition
- **Number counter** — hook-based count-up tied to IntersectionObserver
- **Magnetic button** — subtle follow-cursor movement on hover
- **Page transitions** — smooth opacity/transform on mount

### Sections
| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Name, animated role, bio, CTA buttons, social links, stats |
| 2 | **About** | Professional summary, meta cards, career timeline, values |
| 3 | **Skills** | Animated skill cards with progress bars grouped by category |
| 4 | **Experience** | Vertical timeline with responsibilities and tech badges |
| 5 | **Enterprise Projects** | Large feature-rich cards with architecture, impact, tech stack |
| 6 | **Freelance Projects** | Filterable grid driven entirely by `freelance-projects.json` |
| 7 | **Certifications** | Certificate cards with credential links |
| 8 | **Resume** | Preview + download PDF + print button |
| 9 | **Contact** | Validated form (Zod + react-hook-form), success animation, toast |
| 10 | **Footer** | Navigation, social links, back-to-top, copyright |

### Technical
- **Next.js App Router** with full static generation
- **TypeScript strict mode** — `noUnusedLocals`, `noUnusedParameters`
- **Absolute imports** via `@/*` path alias
- **Security headers** — CSP, HSTS, X-Frame-Options, Referrer-Policy
- **Image optimisation** — AVIF/WebP formats via `next/image`
- **Font optimisation** — Geist Sans & Mono via `next/font`
- **SEO** — dynamic metadata, OpenGraph, Twitter cards, JSON-LD structured data
- **Sitemap** and **robots.txt** auto-generated
- **PWA manifest** for installability
- **Prettier** + **ESLint** + **Husky** + **lint-staged** pre-commit hooks

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| Icons | Lucide React + custom SVG brand icons |
| Forms | react-hook-form + Zod |
| Notifications | Sonner |
| Theme | next-themes |
| Fonts | Geist (Vercel) |
| Linting | ESLint + eslint-config-next |
| Formatting | Prettier |
| Git Hooks | Husky + lint-staged |
| Deployment | Vercel |

---

## Folder Structure

```
portfolio/
├── public/
│   ├── icons/                  # Favicons, PWA icons
│   ├── images/
│   │   ├── projects/           # Project screenshots
│   │   └── resume/             # Resume PDF
│   └── resume/
│       └── resume.pdf          # ← Place your resume here
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (fonts, providers, navbar, footer)
│   │   ├── page.tsx            # Home page — assembles all sections
│   │   ├── globals.css         # Global styles, CSS variables, utilities
│   │   ├── sitemap.ts          # Auto-generated sitemap.xml
│   │   ├── robots.ts           # Auto-generated robots.txt
│   │   ├── manifest.ts         # PWA manifest
│   │   └── opengraph-image.tsx # Dynamic OG image (Edge runtime)
│   │
│   ├── components/
│   │   ├── animations/         # Reusable animation wrappers
│   │   │   ├── CursorGlow.tsx
│   │   │   ├── FadeIn.tsx
│   │   │   ├── NoiseOverlay.tsx
│   │   │   ├── ScrollProgress.tsx
│   │   │   ├── StaggerContainer.tsx
│   │   │   └── TypingText.tsx
│   │   ├── buttons/
│   │   │   ├── GlowButton.tsx  # Primary button with variants + loading state
│   │   │   └── MagneticButton.tsx
│   │   ├── cards/
│   │   │   ├── CertificateCard.tsx
│   │   │   ├── ExperienceCard.tsx
│   │   │   ├── FreelanceCard.tsx
│   │   │   └── ProjectCard.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Floating navbar with active section tracking
│   │   │   └── Footer.tsx
│   │   ├── sections/           # One file per page section
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── FreelanceSection.tsx
│   │   │   ├── CertificationsSection.tsx
│   │   │   ├── ResumeSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── shared/
│   │   │   └── SectionHeader.tsx
│   │   └── ui/
│   │       ├── BrandIcons.tsx  # GitHub + LinkedIn SVG icons
│   │       ├── GlassCard.tsx
│   │       ├── SectionDivider.tsx
│   │       ├── StatusBadge.tsx
│   │       └── TechBadge.tsx
│   │
│   ├── config/
│   │   └── site.ts             # Single source of truth for name, URL, links
│   │
│   ├── constants/
│   │   ├── animations.ts       # Framer Motion variant presets
│   │   ├── navigation.ts       # Nav items + social links
│   │   └── index.ts
│   │
│   ├── data/                   # ← ALL content lives here as JSON
│   │   ├── experience.json
│   │   ├── skills.json
│   │   ├── projects.json
│   │   ├── freelance-projects.json
│   │   └── certificates.json
│   │
│   ├── hooks/
│   │   ├── useActiveSection.ts
│   │   ├── useCountUp.ts
│   │   ├── useMousePosition.ts
│   │   └── useScrollProgress.ts
│   │
│   ├── interfaces/             # (reserved for future interface files)
│   ├── lib/
│   │   └── utils.ts            # cn(), formatDate(), calculateDuration(), slugify()
│   ├── services/
│   │   └── contact.service.ts  # Contact form submission (Formspree)
│   ├── styles/                 # (reserved for additional CSS modules)
│   ├── types/
│   │   ├── certificate.ts
│   │   ├── contact.ts
│   │   ├── experience.ts
│   │   ├── navigation.ts
│   │   ├── project.ts
│   │   ├── skill.ts
│   │   └── index.ts
│   └── utils/
│       └── structured-data.ts  # JSON-LD schema generator
│
├── .lintstagedrc.json
├── .prettierignore
├── next.config.ts
├── package.json
├── prettier.config.js
├── tsconfig.json
└── README.md
```

---

## Installation

### Prerequisites

- Node.js `>=18.17.0`
- npm `>=9`

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/HarinVimal/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local
# Edit .env.local and add your Formspree form ID (see Contact section below)

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Create optimised production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint on all TypeScript files |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Prettier format all source files |
| `npm run format:check` | Check formatting without writing |
| `npm run type-check` | Run TypeScript compiler without emitting |

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Or connect your GitHub repository to [vercel.com](https://vercel.com) for automatic deployments on every push.

**Required environment variables on Vercel:**

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FORMSPREE_ID` | Your Formspree form ID for contact form |

### Other Platforms

The project outputs a standard Next.js build. Any platform supporting Node.js 18+ works:

```bash
npm run build
npm run start
```

---

## Customisation

### Updating Personal Information

All personal details are in one file — **`src/config/site.ts`**:

```ts
export const siteConfig = {
  name: "Your Name",
  title: "Your Name — Your Role",
  description: "Your SEO description",
  url: "https://yourdomain.com",
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "you@email.com",
    phone: "+1234567890",
  },
  location: "Your City, Country",
  currentRole: "Your Role",
  currentCompany: "Your Company",
  yearsOfExperience: 5,
};
```

---

### How to Add a New Freelance Project

Open **`src/data/freelance-projects.json`** and append one object:

```json
{
  "id": "my-new-project",
  "title": "My New Project",
  "shortDescription": "Brief description of what the project does.",
  "client": "Client Name",
  "duration": "2 months",
  "technologies": ["ASP.NET Core", "SQL Server", "Bootstrap"],
  "status": "live",
  "category": "web-app",
  "tags": ["Tag1", "Tag2"],
  "featured": true,
  "year": "2025",
  "liveUrl": "https://example.com",
  "githubUrl": "https://github.com/you/repo"
}
```

**That's it.** The `FreelanceSection` renders it automatically. No component changes needed.

**Allowed `status` values:** `live` | `in-progress` | `completed` | `archived`

**Allowed `category` values:** `saas` | `hrms` | `finance` | `ecommerce` | `enterprise` | `healthcare` | `web-app` | `mobile-web`

---

### How to Add a New Enterprise Project

Open **`src/data/projects.json`** and add an object following this shape:

```json
{
  "id": "unique-id",
  "title": "Project Title",
  "slug": "project-slug",
  "company": "Company Name",
  "type": "enterprise",
  "status": "live",
  "category": "saas",
  "shortDescription": "One line description.",
  "description": "Full description.",
  "problem": "What problem this solved.",
  "responsibilities": ["Did X", "Built Y"],
  "architecture": "How the system is built.",
  "technologies": [
    { "name": "ASP.NET Core", "category": "backend" },
    { "name": "SQL Server", "category": "database" }
  ],
  "features": [
    { "title": "Feature Name", "description": "What it does." }
  ],
  "challenges": ["Challenge 1"],
  "businessImpact": "Measurable impact.",
  "bannerColor": "from-indigo-500 to-purple-600",
  "icon": "Building2",
  "tags": ["Tag1"],
  "featured": true,
  "year": "2025",
  "duration": "Jan 2025 – Present"
}
```

**Allowed `icon` values** (Lucide icons): `Building2` | `Users` | `TrendingUp` | `MessageSquare`

---

### How to Add a Work Experience Entry

Open **`src/data/experience.json`**:

```json
{
  "id": "company-year",
  "company": "Company Name",
  "companyUrl": "https://company.com",
  "role": "Your Role",
  "location": "City, Country",
  "startDate": "January 2025",
  "endDate": "Present",
  "current": true,
  "description": "Summary of your role.",
  "responsibilities": ["Responsibility 1", "Responsibility 2"],
  "achievements": ["Achievement 1"],
  "technologies": ["ASP.NET Core", "C#", "SQL Server"],
  "accentColor": "#6366f1"
}
```

---

### How to Add a Certification

Open **`src/data/certificates.json`**:

```json
{
  "id": "cert-unique-id",
  "title": "Certificate Title",
  "issuer": "Issuing Organisation",
  "date": "2025",
  "credentialId": "OPTIONAL-ID",
  "credentialUrl": "https://verify-link.com",
  "description": "What this certificate covers.",
  "skills": ["Skill1", "Skill2"]
}
```

---

### How to Update the Resume

1. Replace the file at **`public/resume/resume.pdf`** with your updated PDF.
2. The Download Resume button and Resume section preview will automatically use the new file.

No code changes required.

---

### How to Change the Theme / Colour Palette

The primary accent colour is **indigo (`#6366f1`)**. To change it, update these locations:

1. **`src/app/globals.css`** — update gradient-text classes and glow utilities
2. **`src/components/cards/SkillCard.tsx`** — skill level bar colours
3. **`src/data/skills.json`** — `accentColor` values per skill category
4. **`src/data/experience.json`** — `accentColor` per experience entry
5. **`next.config.ts`** — theme colour in headers (optional)
6. **`src/app/manifest.ts`** — `theme_color`

The simplest approach is a global search-and-replace of `indigo-500` → `your-color-500` (and corresponding shades) using your editor.

---

### Enabling the Contact Form

The contact form uses [Formspree](https://formspree.io) — free tier supports 50 submissions/month with no backend required.

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy the form ID (looks like `xabcdefg`)
3. Add it to your environment:

```env
# .env.local
NEXT_PUBLIC_FORMSPREE_ID=xabcdefg
```

To use a different email service (Resend, SendGrid, etc.), edit **`src/services/contact.service.ts`** — the `submitContactForm` function is the only thing that needs to change.

---

## Performance

The portfolio is built for Core Web Vitals excellence:

| Metric | Target |
|--------|--------|
| LCP | < 1.2s |
| FID/INP | < 100ms |
| CLS | < 0.1 |
| Performance (Lighthouse) | ≥ 95 |

**Optimisations applied:**
- Static generation for all routes — zero runtime server cost
- Geist font loaded via `next/font` — eliminates layout shift
- Images in AVIF/WebP format with explicit `width`/`height`
- All animations use CSS `transform` and `opacity` — GPU-composited
- `framer-motion` lazy-loads animation variants — no blocking JS
- Security headers set at the Next.js config level — no middleware overhead
- Turbopack for ~10× faster local builds vs Webpack

---

## SEO

- **Dynamic `<title>` and `<description>`** via Next.js `metadata` API
- **OpenGraph** tags for rich link previews on LinkedIn, Slack, Discord
- **Twitter card** metadata
- **Dynamic OG image** generated server-side via `opengraph-image.tsx`
- **`sitemap.xml`** auto-generated at `/sitemap.xml`
- **`robots.txt`** auto-generated at `/robots.txt`
- **JSON-LD structured data** (Schema.org `Person`) embedded in `<head>`
- **Canonical URL** set on the root page
- **`lang="en"`** on `<html>` for screen reader compatibility

---

## Accessibility

- Semantic HTML throughout — `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- All interactive elements have `:focus-visible` rings
- `aria-label` on every icon button and social link
- `aria-current="page"` on active nav items
- `role="progressbar"` with `aria-valuenow` on skill bars
- `aria-live="polite"` on the typing text animation
- `aria-required` and `aria-describedby` on form fields
- `role="alert"` on inline form validation errors
- `prefers-reduced-motion` respected — Framer Motion respects this by default
- Colour contrast ratios meet WCAG AA for all text

> **Note:** Full WCAG compliance requires manual testing with assistive technologies (VoiceOver, NVDA, JAWS). This codebase provides a strong baseline but expert review is recommended before claiming WCAG 2.1 AA compliance.

---

## Project Structure Rationale

| Decision | Reason |
|----------|--------|
| App Router (not Pages) | Enables server components, streaming, and co-located route files |
| Data in JSON, not CMS | Zero-latency reads, version-controlled content, no API key management |
| `src/` directory | Separates application code from root config files |
| Absolute imports `@/*` | Eliminates fragile relative paths like `../../../../components` |
| Separate `types/` and `interfaces/` | Types used for data shapes; interfaces reserved for contracts |
| `services/` layer | Isolates external API calls — swap Formspree for Resend without touching components |
| `constants/animations.ts` | Single source for all Framer Motion variants — consistent easing across the app |
| Brand icons as inline SVG | `lucide-react` v1 removed brand icons; inline SVG avoids a separate icon library |

---

## License

MIT License — see [LICENSE](LICENSE) for details.

You are free to use this as a template for your own portfolio. Attribution appreciated but not required.

---

<div align="center">

Built by **Harin Vimal Bharathi J**

[harinvimalbharathi@gmail.com](mailto:harinvimalbharathi@gmail.com) · [github.com/HarinVimal](https://github.com/HarinVimal) · [linkedin.com/in/harinvimal](https://linkedin.com/in/harinvimal)

</div>
