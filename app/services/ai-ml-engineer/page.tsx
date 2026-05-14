import type { Metadata } from 'next';
import { ServicePage, ServiceJsonLd } from '@/components/seo/service-page';
import { getServicePage } from '@/lib/data/service-pages';
import { site } from '@/lib/data/site';

const data = getServicePage('services/ai-ml-engineer')!;

export const metadata: Metadata = {
  title: data.pageTitle,
  description: data.description,
  alternates: { canonical: `${site.url}/${data.slug}/` },
  openGraph: {
    title: data.pageTitle,
    description: data.description,
    url: `${site.url}/${data.slug}/`,
    siteName: `${site.name} — Portfolio`,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: data.h1 }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: data.pageTitle,
    description: data.description,
    images: [site.ogImage],
  },
};

export default function AiMlEngineerPage() {
  return (
    <>
      <ServiceJsonLd data={data} />
      <ServicePage data={data} />
    </>
  );
}
