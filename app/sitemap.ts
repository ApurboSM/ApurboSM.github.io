import { MetadataRoute } from 'next';
import { site } from '@/lib/data/site';
import { servicePages } from '@/lib/data/service-pages';

/**
 * Sitemap generated at build time (static export).
 *
 * Priorities reflect SEO intent:
 *   1.0  → homepage (root identity)
 *   0.9  → service pages (highest commercial-intent queries)
 *   0.8  → location pages (geo-targeted queries)
 *   0.7  → /about, /projects (supporting, indexable)
 *   0.6  → /card (virtual business card)
 */
const LAST_MODIFIED = new Date('2026-05-13');

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed: MetadataRoute.Sitemap = [
    {
      url: `${site.url}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${site.url}/about/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${site.url}/projects/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${site.url}/card/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];

  const dynamic: MetadataRoute.Sitemap = servicePages.map((p) => ({
    url: `${site.url}/${p.slug}/`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: p.kind === 'service' ? 0.9 : 0.8,
  }));

  return [...fixed, ...dynamic];
}
