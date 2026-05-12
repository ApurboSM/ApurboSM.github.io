import { site } from '@/lib/data/site';

/**
 * Server-rendered JSON-LD structured data.
 *
 * This is the single highest-impact SEO improvement we can make:
 *
 *  • Person schema       → Google "Knowledge Graph" / rich results
 *  • WebSite schema      → site-link search box in SERPs
 *  • ProfessionalService → ranking signal for freelance / hire queries
 *
 * Multiple JSON-LD blocks on the same page are explicitly allowed by
 * schema.org and are interpreted independently.
 */
export function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/#person`,
    name: site.name,
    alternateName: site.alternateNames,
    url: site.url,
    image: `${site.url}${site.ogImage}`,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    jobTitle: site.jobTitle,
    description: site.description,
    sameAs: [
      site.socials.github,
      site.socials.linkedin,
      site.socials.facebook,
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.geo.locality,
      addressRegion: site.geo.region,
      addressCountry: site.geo.country,
    },
    /* Strong signal — Google reads this for the "knowsAbout" knowledge panel */
    knowsAbout: [
      'Software Engineering',
      'Full-Stack Development',
      'MERN Stack',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'PostgreSQL',
      'Python',
      'Machine Learning',
      'Artificial Intelligence',
      'AI Engineering',
      'Computer Vision',
      'Natural Language Processing',
      'Cloud Architecture',
      'AWS',
      'Docker',
      'Frontend Development',
      'Backend Development',
      'API Design',
      'System Design',
    ],
    hasOccupation: [
      {
        '@type': 'Occupation',
        name: 'Software Engineer',
        occupationLocation: { '@type': 'Country', name: 'Bangladesh' },
        skills: 'Full-Stack Development, AI/ML, MERN, React, Next.js, Python',
      },
      {
        '@type': 'Occupation',
        name: 'AI/ML Engineer',
        skills: 'Machine Learning, Deep Learning, Computer Vision, NLP',
      },
      {
        '@type': 'Occupation',
        name: 'Founding Software Engineer',
        skills: 'Product Engineering, Architecture, Team Leadership',
      },
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'ClassTablet',
      url: 'https://classtablet.com',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'BRAC University',
      url: 'https://www.bracu.ac.bd',
      sameAs: 'https://www.bracu.ac.bd',
    },
    nationality: { '@type': 'Country', name: 'Bangladesh' },
    workLocation: [
      { '@type': 'Place', name: 'Dhaka, Bangladesh' },
      { '@type': 'Place', name: 'Remote — Worldwide' },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: `${site.name} — Portfolio`,
    description: site.description,
    inLanguage: 'en-US',
    publisher: { '@id': `${site.url}/#person` },
  };

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#service`,
    name: `${site.name} — Software Engineering & AI Services`,
    description:
      'Freelance and contract software engineering: full-stack web development (MERN, Next.js, TypeScript), AI/ML engineering, founding-engineer leadership. Based in Dhaka, available worldwide including the United States, Canada, the United Kingdom, and the EU.',
    url: site.url,
    image: `${site.url}${site.ogImage}`,
    provider: { '@id': `${site.url}/#person` },
    areaServed: [
      { '@type': 'Country', name: 'Bangladesh' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Place', name: 'San Francisco' },
      { '@type': 'Place', name: 'New York' },
      { '@type': 'Place', name: 'London' },
      { '@type': 'Place', name: 'Dhaka' },
      { '@type': 'Place', name: 'Worldwide (Remote)' },
    ],
    serviceType: [
      'Full-Stack Web Development',
      'Frontend Development',
      'Backend Development',
      'MERN Stack Development',
      'AI / ML Engineering',
      'Founding Engineer',
      'Technical Consulting',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
    </>
  );
}
