import { MetadataRoute } from 'next';
import { site } from '@/lib/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${site.url}/card`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];
}
