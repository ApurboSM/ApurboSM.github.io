# S. M. Apurbo — Portfolio

A professional, modern portfolio website for S. M. Apurbo — Full-Stack Developer & AI/ML Engineer.

**Live:** [smapurbo.me](https://smapurbo.me)
**Repo:** [github.com/ApurboSM/ApurboSM.github.io](https://github.com/ApurboSM/ApurboSM.github.io)

---

## Stack

- **Framework** — Next.js 14 (App Router, **static export**)
- **Language** — TypeScript
- **Styling** — Tailwind CSS (RGB-triplet token system)
- **Theming** — Dark + Light, with persisted toggle
- **Animation** — Framer Motion
- **UI Primitives** — ShadCN UI patterns
- **Icons** — Lucide
- **Fonts** — Geist Sans + Geist Mono (`geist` package)
- **GitHub Calendar** — `react-github-calendar`
- **Deploy** — GitHub Pages (via GitHub Actions)

---

## Project Structure

```
Portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Build + publish to GitHub Pages
├── app/
│   ├── layout.tsx                  # Root layout, fonts, theme bootstrap, metadata
│   ├── page.tsx                    # Home (composes all sections)
│   ├── globals.css                 # Tailwind layers + design tokens
│   ├── sitemap.ts                  # Auto-generated sitemap.xml
│   ├── robots.ts                   # Auto-generated robots.txt
│   └── card/
│       ├── page.tsx                # Virtual business card route
│       └── card-client.tsx
│
├── components/
│   ├── ui/                         # ShadCN-style primitives
│   ├── nav/
│   │   ├── navbar.tsx              # Sticky nav + theme toggle
│   │   └── footer.tsx
│   ├── sections/
│   │   ├── hero.tsx                # Cursor-aware spotlight hero
│   │   ├── selected-work.tsx       # Project cards
│   │   ├── engineering-process.tsx # Signature 4-step section
│   │   ├── about.tsx
│   │   ├── skills.tsx
│   │   ├── tech-network.tsx        # Interactive SVG tech graph
│   │   ├── experience.tsx          # Compact, expandable career timeline
│   │   ├── github-activity.tsx     # Live GitHub contribution calendar
│   │   └── contact.tsx
│   ├── theme-provider.tsx          # localStorage-backed theme context
│   ├── theme-toggle.tsx            # Sun / moon toggle
│   ├── reveal.tsx
│   ├── max-width.tsx
│   ├── magnetic-link.tsx
│   ├── section-title.tsx
│   ├── project-card.tsx
│   ├── experience-item.tsx         # Compact accordion role card
│   └── process-step.tsx
│
├── lib/
│   ├── utils.ts
│   └── data/
│       ├── site.ts
│       ├── projects.ts
│       ├── experience.ts
│       ├── skills.ts
│       └── process.ts
│
├── public/
│   ├── .nojekyll                   # Disables Jekyll on GitHub Pages
│   ├── CNAME                       # smapurbo.me custom domain
│   ├── favicon.png
│   └── images/
│
├── tailwind.config.ts
├── next.config.mjs                 # output: 'export', images.unoptimized
├── tsconfig.json
├── components.json
└── package.json
```

---

## Design System

### Color tokens (RGB triplets, opacity-aware)

The token system uses CSS custom properties as RGB triplets so Tailwind opacity modifiers (`bg-bg/40`, `text-fg/65`, etc.) work cleanly across both themes.

| Token       | Dark                  | Light                |
| ----------- | --------------------- | -------------------- |
| `bg`        | `10 10 10`            | `250 250 250`        |
| `surface`   | `17 17 17`            | `255 255 255`        |
| `surface-2` | `22 22 22`            | `244 244 244`        |
| `fg`        | `237 237 237`         | `10 10 10`           |
| `accent`    | `99 102 241`          | `79 70 229`          |
| `accent-hi` | `129 140 248`         | `99 102 241`         |
| `success`   | `16 185 129`          | `5 150 105`          |

Derived: `line` = `fg / 0.08`, `line-2` = `fg / 0.14`, `fg-muted` = `fg / 0.65`, `fg-faint` = `fg / 0.4`.

### Typography

- **Sans** — Geist Sans
- **Mono** — Geist Mono
- **Hero** — `clamp(3.25rem, 9vw, 8rem)`
- **Section title** — `clamp(2rem, 4vw, 2.75rem)`
- **Body** — 16–18px, `leading-relaxed`, `text-pretty`

### Layout

- Max-width: `1200px` (Tailwind: `max-w-content`)
- Section padding: `py-32 sm:py-40`
- 12-column grid compatible

### Motion

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- Duration: 0.4–0.55s
- Pattern: fade-up + stagger via `<Reveal>` wrapper

---

## Sections

1. **Hero** — Massive split headline, available pill, dual CTAs, cursor-aware spotlight
2. **Selected Work** — 5 structured project cards with PROBLEM / APPROACH / IMPACT
3. **Engineering Process** — 4 numbered steps showing how I build
4. **About** — Mindset-first narrative, inline stats, contact pills
5. **Skills** — Categorized chip-tags
6. **Tech Stack Network** — Interactive SVG node graph (hover to highlight connections)
7. **Career** — Compact LinkedIn-style timeline, click to expand details
8. **GitHub Activity** — Live contribution calendar, theme-aware
9. **Contact** — Email-first CTA, schedule call, social links, virtual card link

---

## Development

```bash
# Install
npm install

# Dev server (http://localhost:3000)
npm run dev

# Production build (generates ./out/ static site)
npm run build

# Lint
npm run lint
```

`npm run build` writes a fully static site to `./out/`.

---

## Deployment — GitHub Pages

The site is hosted from `ApurboSM/ApurboSM.github.io` on GitHub Pages and reachable at the custom domain **smapurbo.me**.

### Automatic deploy (GitHub Actions)

`.github/workflows/deploy.yml` runs on every push to `main`:

1. Checks out the repo
2. Installs dependencies (`npm ci`)
3. Builds the static site (`npm run build` → `./out/`)
4. Adds `.nojekyll`
5. Uploads as a Pages artifact
6. Deploys to GitHub Pages

### One-time setup

In **Repo → Settings → Pages**, set **Source** to **GitHub Actions**.

### Custom domain

`public/CNAME` contains `smapurbo.me`. Make sure your DNS provider has:

```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
CNAME www apurbosm.github.io.
```

In **Settings → Pages**, set the custom domain to `smapurbo.me` and enable **Enforce HTTPS**.

### Manual local build + push

```bash
npm run build
# `out/` is the static site — GitHub Actions handles publishing on push
git add .
git commit -m "Update site"
git push origin main
```

---

## Content

All content is centralized in `lib/data/`:

| File          | Content                                   |
| ------------- | ----------------------------------------- |
| site.ts       | Site-wide metadata (name, email, socials) |
| projects.ts   | Selected Work entries                     |
| experience.ts | Career timeline                           |
| skills.ts     | Categorized skills                        |
| process.ts    | Engineering process steps                 |

Edit those files; the UI updates automatically.

---

_Built in Dhaka. Designed by S. M. Apurbo · 2026_
