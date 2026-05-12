import { MetadataRoute } from 'next';
import { site } from '@/lib/data/site';

/**
 * Sitemap is generated at build time (static export).  We use a single
 * static `lastModified` value so successive deploys don't churn the file
 * unnecessarily — bump this when you ship significant new content.
 */
const LAST_MODIFIED = new Date('2026-05-13');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${site.url}/card`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];
}
