# S. M. Apurbo — Portfolio

A professional, modern portfolio website for S. M. Apurbo — Full-Stack Developer & AI/ML Engineer.

**Live:** [smapurbo.me](https://smapurbo.me)

---

## Stack

- **Framework** — [Next.js 14](https://nextjs.org) (App Router)
- **Language** — TypeScript
- **Styling** — [Tailwind CSS](https://tailwindcss.com)
- **Animation** — [Framer Motion](https://www.framer.com/motion/)
- **UI Primitives** — [ShadCN UI](https://ui.shadcn.com) patterns
- **Icons** — [Lucide](https://lucide.dev)
- **Fonts** — [Geist Sans + Geist Mono](https://vercel.com/font) via `geist` package
- **Deploy** — [Vercel](https://vercel.com)

---

## Project Structure

```
Portfolio/
├── app/
│   ├── layout.tsx                  # Root layout, fonts, metadata
│   ├── page.tsx                    # Home (composes all sections)
│   ├── globals.css                 # Tailwind layers + design tokens
│   ├── opengraph-image.tsx         # Dynamic OG image
│   ├── sitemap.ts                  # Auto-generated sitemap.xml
│   ├── robots.ts                   # Auto-generated robots.txt
│   └── card/
│       ├── page.tsx                # Virtual business card route
│       └── card-client.tsx
│
├── components/
│   ├── ui/                         # ShadCN-style primitives
│   │   ├── button.tsx
│   │   └── badge.tsx
│   ├── nav/
│   │   ├── navbar.tsx              # Sticky nav with scroll-blur
│   │   └── footer.tsx              # Minimal footer
│   ├── sections/
│   │   ├── hero.tsx                # Cursor-aware spotlight hero
│   │   ├── selected-work.tsx       # 5 structured project cards
│   │   ├── engineering-process.tsx # Signature 4-step section
│   │   ├── about.tsx
│   │   ├── skills.tsx
│   │   ├── experience.tsx          # LinkedIn-style timeline
│   │   └── contact.tsx
│   ├── reveal.tsx                  # Framer Motion scroll-reveal
│   ├── max-width.tsx               # 1200px container
│   ├── magnetic-link.tsx           # Cursor-follow CTA
│   ├── section-title.tsx
│   ├── project-card.tsx
│   ├── experience-item.tsx
│   └── process-step.tsx
│
├── lib/
│   ├── utils.ts                    # cn() helper
│   └── data/                       # Centralized content
│       ├── site.ts
│       ├── projects.ts
│       ├── experience.ts
│       ├── skills.ts
│       └── process.ts
│
├── public/
│   ├── favicon.png
│   └── images/                     # All photos and logos
│
├── tailwind.config.ts              # Design tokens (colors, fonts, scale)
├── next.config.mjs
├── tsconfig.json
├── components.json                 # ShadCN config
├── package.json
└── CNAME                           # smapurbo.me (kept for reference)
```

---

## Design System

### Color tokens (Tailwind classes)

| Token            | Value                          | Use                                    |
|------------------|--------------------------------|----------------------------------------|
| `bg`             | `#0A0A0A`                      | Page background                        |
| `surface`        | `#111111`                      | Card surface                           |
| `surface-2`      | `#161616`                      | Elevated surface                       |
| `line`           | `rgba(255,255,255,0.08)`       | Subtle borders                         |
| `line-2`         | `rgba(255,255,255,0.14)`       | Hover borders                          |
| `fg`             | `#EDEDED`                      | Primary text                           |
| `fg-muted`       | `rgba(237,237,237,0.65)`       | Body text                              |
| `fg-faint`       | `rgba(237,237,237,0.4)`        | Captions / metadata                    |
| `accent`         | `#6366F1`                      | Single indigo accent                   |
| `success`        | `#10B981`                      | Available status                       |

### Typography

- **Sans** — Geist Sans (body, headlines)
- **Mono** — Geist Mono (metadata, captions, indices)
- **Hero** — `clamp(3.25rem, 9vw, 8rem)` — massive split typography
- **Section title** — `clamp(2rem, 4vw, 2.75rem)`
- **Body** — 16–18px, `leading-relaxed`, `text-pretty`

### Layout

- Max-width: `1200px` (Tailwind: `max-w-content`)
- Section padding: `py-32 sm:py-40` (~128px / 160px)
- Grid: 12-column compatible

### Motion

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (quintic ease-out)
- Duration: 0.4–0.55s
- Pattern: fade-up + stagger via `<Reveal>` wrapper
- No bouncing, parallax, or scroll-jacking

---

## Development

```bash
# Install
npm install

# Dev server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Production server
npm start

# Lint
npm run lint
```

---

## Deployment (Vercel)

```bash
# 1. Push to GitHub
git add .
git commit -m "Premium portfolio rewrite"
git push origin main

# 2. Import to Vercel
#    https://vercel.com/new — connect the GitHub repo

# 3. Configure custom domain
#    Project → Settings → Domains → add `smapurbo.me`
#    Update DNS at registrar:
#      A     @       76.76.21.21
#      CNAME www     cname.vercel-dns.com
```

The `CNAME` file (`smapurbo.me`) is kept for reference — Vercel handles the custom domain via its dashboard, not via `CNAME`.

---

## Content

All content is centralized in `lib/data/`:

| File              | Content                                              |
|-------------------|------------------------------------------------------|
| `site.ts`         | Site-wide metadata (name, email, socials)            |
| `projects.ts`     | Selected Work entries                                |
| `experience.ts`   | Career timeline                                      |
| `skills.ts`       | Categorized skills                                   |
| `process.ts`      | Engineering process steps                            |

Edit those files; the UI updates automatically.

---

## Sections

1. **Hero** — Massive split headline, available pill, dual CTAs, cursor-aware spotlight
2. **Selected Work** *(top priority)* — 5 structured project cards with PROBLEM / APPROACH / IMPACT
3. **Engineering Process** *(signature)* — 4 numbered steps showing how I build
4. **About** — Mindset-first narrative, inline stats, contact pills
5. **Skills** — Categorized chip-tags (Frontend, Backend, AI/ML, Cloud, Languages, Tools)
6. **Career** — LinkedIn-style timeline (ClassTablet highlighted)
7. **Contact** — Email-first CTA, schedule call, social links

---

*Built in Dhaka. Designed by S. M. Apurbo · 2026*
