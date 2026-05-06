# S. M. Apurbo — Portfolio

A professional, modern portfolio website for S. M. Apurbo — Full-Stack Developer & AI/ML Engineer.

**Live:** [smapurbo.me](https://smapurbo.me)

---

## Project Structure

```
Portfolio/
├── index.html              # Main portfolio page
├── card.html               # Interactive 3D business card
├── CNAME                   # Custom domain (smapurbo.me)
│
├── assets/
│   ├── images/             # All image assets
│   │   ├── hero.jpg        # Profile photo
│   │   ├── favicon.png     # Site favicon
│   │   ├── greenosa.jpg    # Greenosa Digital logo
│   │   ├── nyntax.png      # Nyntax logo
│   │   ├── udemy.png       # Udemy logo
│   │   ├── bracu.png       # BRAC University logo
│   │   └── bucc.png        # BUCC logo
│   └── fonts/              # Custom font files (optional)
│
├── css/
│   ├── style.css           # Main portfolio styles
│   └── card.css            # Business card page styles
│
└── js/
    ├── main.js             # Main portfolio scripts
    └── card.js             # Business card 3D interactions
```

---

## Features

- **Modern Dark Design** — Deep navy background with electric blue/cyan accents
- **LinkedIn-style Experience Timeline** — With company logos, employment type badges, skill tags
- **3D Interactive Business Card** — Mouse-follow rotation, flip, zoom
- **Scroll Reveal Animations** — Smooth IntersectionObserver-based entrance effects
- **Custom Cursor** — Dot + trailing ring effect (desktop only)
- **Typed.js Hero Text** — Animated role typewriter effect
- **Responsive** — Mobile-first, works on all devices
- **Visitor Counter** — Via CountAPI
- **Contact Form** — Formspree integration (replace ID in index.html)

---

## Setup

1. Add your images to `assets/images/` (see list above)
2. Replace Formspree ID in `index.html`:
   ```
   action="https://formspree.io/f/YOUR_ACTUAL_ID"
   ```
3. Deploy to GitHub Pages (CNAME already set to `smapurbo.me`)

---

## Tech Stack

- Pure HTML5, CSS3, Vanilla JavaScript (no frameworks)
- [Google Fonts](https://fonts.google.com) — Space Grotesk, Inter, Fira Code
- [Font Awesome 6](https://fontawesome.com) — Icons
- [Typed.js](https://mattboldt.com/demos/typed-js/) — Typewriter effect
- [CountAPI](https://countapi.xyz) — Visitor counter
- [Formspree](https://formspree.io) — Contact form backend

---

## Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | Hero | Full-screen intro with typed roles, profile photo, CTAs |
| 2 | About | Bio, contact info, stats grid |
| 3 | Skills | Categorized tech chips |
| 4 | Experience | LinkedIn-style career timeline |
| 5 | Projects | Featured + grid layout |
| 6 | Client Projects | Image cards with hover overlays |
| 7 | Education | Timeline cards |
| 8 | Certifications | Credential cards |
| 9 | Activities | Club/leadership cards |
| 10 | Contact | Form + info panel |

---

*Designed & built by S. M. Apurbo — 2026*
