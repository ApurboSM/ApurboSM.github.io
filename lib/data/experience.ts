export type ExperienceLink = { label: string; href: string };

export type ExperienceStat = { label: string; value: string };

export type Experience = {
  company: string;
  role: string;
  type: string;
  location: string;
  period: string;
  start: string;
  end: string;
  description: string;
  bullets: string[];
  stack: string[];
  links?: ExperienceLink[];
  stats?: ExperienceStat[];
  highlighted?: boolean;
  monogram: string;
  url?: string;
};

export const experience: Experience[] = [
  {
    company: 'ClassTablet',
    role: 'Founding Software Engineer',
    type: 'Co-founder · On-site',
    location: 'Dhaka, Bangladesh',
    period: 'Feb 2026 — Present',
    start: '2026-02',
    end: 'present',
    description:
      "Co-founded a Bangladesh-first edtech platform with a team of 11 (5 technical, 5 marketing, plus CEO and COO). Architecting and shipping production software as the company's founding software engineer.",
    bullets: [
      'Co-architected a multi-tenant white-label system serving six distinct user roles — students, teachers, parents, owners, tenant admins, platform admins — on a single Postgres schema (100+ tables, 53 Zod contracts).',
      'Engineered AWS IVS-powered live classroom streaming with synchronized chat, recordings, and viewer analytics as a first-class feature inside every classroom.',
      'Built a two-layer SSLCommerz payment system: institutions collect tuition via bKash / Nagad / Rocket / cards; ClassTablet bills institutions on tiered subscriptions and AI credit packs.',
      'Shipped AI features end-to-end with the Vercel AI SDK — quiz generation, lesson planning, spaced-repetition flashcards (SM-2), and Bangla handwriting recognition via Gemini Vision.',
      'Designed institution-scoped auth flows on better-auth (Google, email OTP, phone OTP, student-ID) with Redis-backed token rotation and a four-layer authorization model.',
    ],
    stack: [
      'TypeScript',
      'Next.js',
      'PostgreSQL',
      'Drizzle ORM',
      'AWS ECS Fargate',
      'AWS IVS',
      'SSLCommerz',
      'GPT-4o',
      'Gemini Vision',
      'Expo',
      'Redis',
      'Sentry',
    ],
    stats: [
      { label: 'DB tables', value: '100+' },
      { label: 'Service classes', value: '48' },
      { label: 'Zod schemas', value: '53' },
      { label: 'User roles', value: '6' },
      { label: 'Feature pillars', value: '10+' },
    ],
    links: [
      { label: 'classtablet.com', href: 'https://classtablet.com/en-US' },
      { label: 'app.classtablet.com', href: 'https://app.classtablet.com' },
      { label: 'GitHub', href: 'https://github.com/PixL-Bangladesh/classtablet' },
    ],
    url: 'https://classtablet.com/en-US',
    monogram: 'CT',
    highlighted: true,
  },
  {
    company: 'Nyntax',
    role: 'Data Preparation Associate',
    type: 'Hybrid',
    location: 'Dhaka, Bangladesh',
    period: 'Dec 2025 — Present',
    start: '2025-12',
    end: 'present',
    description:
      'Data preparation and processing for AI / ML pipelines, with strict adherence to data security and confidentiality standards.',
    bullets: [
      'Validate, clean, and structure datasets feeding directly into model training and evaluation.',
      'Operate inside data-science workflows with systematic consistency checks and audit trails.',
      'Maintain strict confidentiality and adhere to documented data-security protocols.',
    ],
    stack: ['Python', 'Data Validation', 'ML Workflows'],
    url: 'https://www.nyntax.com/',
    monogram: 'NY',
  },
  {
    company: 'Greenosa Digital',
    role: 'Founding Software Engineer & Technical Lead',
    type: 'Remote',
    location: 'Bangladesh',
    period: 'Jun 2025 — Present',
    start: '2025-06',
    end: 'present',
    description:
      "Leading technical development of PlayerLagbe — Bangladesh's first digital platform for finding players and booking turfs for sports matchmaking.",
    bullets: [
      "Founding engineer and technical lead for PlayerLagbe — Bangladesh's 1st digital player-finding & turf-booking sports matchmaking platform.",
      'Architecting scalable backend APIs, real-time matching logic, and ground-booking flows for the web and mobile companion app.',
      'Collaborating with cross-functional teams to deliver production-grade features on tight startup timelines.',
      'Operating with modern frameworks and best practices to keep the codebase maintainable as the platform grows.',
    ],
    stack: ['React', 'Node.js', 'MongoDB', 'REST API', 'Expo'],
    url: 'https://greenosadigital.com/',
    monogram: 'GD',
  },
  {
    company: 'DevStudio',
    role: 'MERN Stack Developer',
    type: 'Remote · Part-time',
    location: 'Remote',
    period: 'Nov 2023 — Present',
    start: '2023-11',
    end: 'present',
    description:
      'Long-running part-time engagement building and maintaining MERN-stack web applications.',
    bullets: [
      'Develop and maintain full-stack web apps across MongoDB, Express.js, React.js, and Node.js.',
      'Collaborate on feature design, implementation, and code review.',
      'Write clean, efficient, maintainable code following modern best practices.',
    ],
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    monogram: 'DS',
  },
];
