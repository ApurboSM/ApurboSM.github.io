import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Navbar } from '@/components/nav/navbar';
import { Footer } from '@/components/nav/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { JsonLd } from '@/components/seo/json-ld';
import { site } from '@/lib/data/site';

/**
 * SEO STRATEGY
 * ─────────────────────────────────────────────────────────────────────
 * 1. Rich, role-driven <title> and <meta description>.
 * 2. Broad keyword set (Google deprecates but still uses signals from
 *    Bing, DuckDuckGo, Yandex, and AI crawlers like Perplexity/GPTBot).
 * 3. Open Graph + Twitter card with a real image for share previews.
 * 4. Canonical URL set explicitly to avoid duplicate-content dilution.
 * 5. JSON-LD Person/WebSite/ProfessionalService schemas (highest impact).
 * 6. Geo + city tags for local search.
 * 7. Verification placeholders for Google + Bing Webmaster Tools.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Full-Stack Software Engineer · AI/ML Engineer`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: 'technology',
  keywords: [
    // Identity
    'S. M. Apurbo',
    'SM Apurbo',
    'Apurbo',
    'Shahriyar Mahmud Apurbo',
    'smapurbo',

    // Core roles
    'software engineer',
    'software developer',
    'full-stack developer',
    'full stack engineer',
    'full-stack software engineer',
    'frontend developer',
    'front-end engineer',
    'backend developer',
    'back-end engineer',
    'MERN stack developer',
    'MERN developer',
    'web developer',
    'AI engineer',
    'AI/ML engineer',
    'machine learning engineer',
    'ML engineer',
    'artificial intelligence engineer',
    'deep learning engineer',
    'product engineer',
    'founding engineer',
    'founding software engineer',
    'startup engineer',
    'technical lead',
    'tech lead',

    // Freelance positioning
    'freelance software engineer',
    'freelance developer',
    'top freelancer',
    'top freelance developer',
    'top rated developer',
    'hire full stack developer',
    'hire AI engineer',
    'hire MERN developer',
    'available for hire',
    'remote developer',
    'remote software engineer',
    'contract software engineer',

    // Tech stack keywords
    'React developer',
    'Next.js developer',
    'TypeScript developer',
    'Node.js developer',
    'Python developer',
    'Tailwind CSS developer',
    'MongoDB developer',
    'PostgreSQL developer',
    'AWS developer',
    'cloud engineer',
    'AI/ML pipelines',
    'computer vision engineer',
    'NLP engineer',

    // Geography — global hiring markets
    'Bangladesh developer',
    'Dhaka developer',
    'Bangladesh top developer',
    'Dhaka top developer',
    'top developer Bangladesh',
    'top developer Dhaka',
    'best software engineer Bangladesh',
    'best full-stack developer Bangladesh',
    'best MERN developer Bangladesh',
    'San Francisco developer',
    'San Francisco top developer',
    'San Francisco full-stack developer',
    'SF software engineer',
    'New York developer',
    'New York top developer',
    'New York full-stack developer',
    'New York SWE',
    'NYC software engineer',
    'London developer',
    'United States remote developer',
    'remote SWE',

    // Company / education context (knowledge graph signals)
    'ClassTablet',
    'Founding Engineer at ClassTablet',
    'PlayerLagbe',
    'Technical Lead PlayerLagbe',
    'BRAC University',
    'BRAC University CSE',
    'BUCC',
  ],
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: `${site.name} — Portfolio`,
    title: `${site.name} — Full-Stack Software Engineer · AI/ML Engineer`,
    description: site.description,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name} — Full-Stack Software Engineer & AI/ML Engineer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Full-Stack Software Engineer · AI/ML Engineer`,
    description: site.description,
    images: [site.ogImage],
    creator: '@smapurbo',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/images/favicon.png', type: 'image/png' },
    ],
    apple: '/favicon.png',
  },
  other: {
    /* Geo tags — useful for local SERP results in Bangladesh + region */
    'geo.region': `${site.geo.country}-${site.geo.region}`,
    'geo.placename': site.geo.locality,
    'geo.position': `${site.geo.latitude};${site.geo.longitude}`,
    ICBM: `${site.geo.latitude}, ${site.geo.longitude}`,
    /* AI / LLM crawler hints */
    'ai-content-declaration': 'human-authored',
    /* Once you verify in Search Console / Bing Webmaster, drop the codes here */
    // 'google-site-verification': 'YOUR_GOOGLE_VERIFICATION_CODE',
    // 'msvalidate.01': 'YOUR_BING_VERIFICATION_CODE',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

/* Pre-paint theme script — prevents flash of incorrect theme on hydrate */
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('apurbo:theme');
    var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd />
      </head>
      <body className="bg-bg font-sans text-fg antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
