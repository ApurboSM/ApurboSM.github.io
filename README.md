<div align="center">

# S. M. Apurbo — Portfolio

**Full-Stack Software Engineer · AI / ML Engineer · MERN Developer**

[**smapurbo.com**](https://smapurbo.com) &nbsp;·&nbsp; Dhaka, Bangladesh &nbsp;·&nbsp; Available worldwide

[![Live site](https://img.shields.io/badge/live-smapurbo.com-6366f1?style=flat-square)](https://smapurbo.com)
[![Stack](https://img.shields.io/badge/Next.js-14-000?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![TS](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Deploy](https://img.shields.io/badge/GitHub_Pages-Actions-181717?style=flat-square&logo=github)](https://pages.github.com)

</div>

---

## About

This is my personal portfolio — a minimalist, performance-first showcase of the products I've shipped, the stack I work in, and the engineering process I bring to every project. Hand-built with Next.js, fully static, and tuned for both fast page loads and rich search-engine discoverability.

**I'm a Full-Stack Software Engineer and AI/ML Engineer** based in Dhaka, currently:

- **Founding Software Engineer** at [ClassTablet](https://classtablet.com) — co-building Bangladesh's first comprehensive edtech platform
- **Technical Lead** at [PlayerLagbe](https://playerlagbe.com) — Bangladesh's first AI-powered sports recruitment platform
- **CS Senior** at BRAC University

I work the full stack from React/Next.js frontends down to Node/Python services, Postgres/MongoDB, AI/ML pipelines, and cloud deployment. Open to **freelance, contract, remote, and on-site** opportunities — Dhaka, San Francisco, New York, London, or fully remote.

> Get in touch: **smapurbo1497@gmail.com** · [LinkedIn](https://www.linkedin.com/in/s-m-apurbo-673581339/) · [GitHub](https://github.com/ApurboSM)

---

## What's on the site

| Section | What you'll find |
|---|---|
| **Hero** | One-line value prop, role, location, current availability |
| **Career** | Scroll-driven LinkedIn-style timeline — expand any role for full details |
| **Selected Work** | Real shipped products with Problem / Approach / Impact framing |
| **Engineering Process** | The 4-step approach I bring to every project |
| **About** | Numbers, focus areas, and what I optimize for |
| **Skills** | Stack inventory across frontend, backend, AI/ML, cloud, languages, data |
| **Activities & Leadership** | BRAC University Computer Club roles |
| **GitHub Activity** | Live contribution calendar (theme-aware) |
| **Education & Certifications** | Degree + courses + credentials |
| **Contact** | Email, scheduling, social, and a tap-to-save virtual business card |

---

## Tech stack

| Layer | Tools |
|---|---|
| Framework | Next.js 14 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS · CSS custom properties (RGB-triplet token system) |
| Animation | Framer Motion · custom GPU-accelerated theme transition |
| UI primitives | ShadCN UI patterns |
| Icons | Lucide |
| Fonts | Geist Sans + Geist Mono |
| Data viz | `react-github-calendar` |
| Hosting | GitHub Pages via GitHub Actions |
| Domain | [smapurbo.com](https://smapurbo.com) |

---

## Highlights

- **Fully static export** — zero server runtime, deploys as plain HTML/CSS/JS
- **Dark + light themes** with a cinematic circular reveal transition (GPU-accelerated overlay, no flash)
- **Scroll-locked career timeline** with predictive viewport snapping — each role gets a 3-scroll cycle (expand → read → advance)
- **Cursor-aware hero spotlight** that follows the mouse
- **JSON-LD structured data** (`Person`, `WebSite`, `ProfessionalService`) for Google Knowledge Graph
- **WCAG-friendly motion** — respects `prefers-reduced-motion`
- **Lighthouse 100 / 100 / 100 / 100** in production builds

---

## Running locally

```bash
# Clone
git clone https://github.com/ApurboSM/ApurboSM.github.io.git
cd ApurboSM.github.io

# Install
npm install

# Dev server (http://localhost:3000)
npm run dev

# Production build (static site → ./out/)
npm run build
```

Content is centralized in `lib/data/` — edit `site.ts`, `projects.ts`, `experience.ts`, `skills.ts`, or `process.ts` and the UI updates automatically.

---

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which:

1. Installs dependencies
2. Builds the static site to `./out/`
3. Adds `.nojekyll` (so GitHub Pages skips Jekyll processing)
4. Publishes to GitHub Pages

The custom domain `smapurbo.com` is configured via `public/CNAME` and standard A/CNAME records pointed at GitHub Pages.

---

## License

The code is open source under the **MIT License** — feel free to fork the structure for your own portfolio. **Content, images, branding, and personal data are © S. M. Apurbo, all rights reserved.**

---

<div align="center">

Built in Dhaka. Designed and engineered by **S. M. Apurbo** · 2026

[smapurbo.com](https://smapurbo.com)

</div>
