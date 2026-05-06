export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  category: string;
  problem: string;
  approach: string;
  impact: string;
  stack: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'classtablet',
    title: 'ClassTablet',
    year: '2026',
    role: 'Founding Engineer · Co-founder',
    category: 'EdTech SaaS',
    problem:
      "Bangladeshi classrooms run on spreadsheets, WhatsApp, and paper registers — five disconnected tools per teacher.",
    approach:
      "Co-founded an all-in-one, multi-tenant white-label platform: 100+ Postgres tables, 48 service classes, AWS IVS live streaming, GPT-4o + Gemini Vision AI, SSLCommerz payments, Bangla-first UX.",
    impact:
      "Bangladesh-first edtech category-defining platform. 11-person team. Production codebase serving teachers, students, parents, and institutions.",
    stack: ['TypeScript', 'Next.js', 'PostgreSQL', 'Drizzle ORM', 'AWS ECS', 'AWS IVS', 'GPT-4o', 'SSLCommerz'],
    links: [
      { label: 'classtablet.com', href: 'https://classtablet.com' },
      { label: 'app.classtablet.com', href: 'https://app.classtablet.com' },
      { label: 'GitHub', href: 'https://github.com/PixL-Bangladesh/classtablet' },
    ],
    featured: true,
  },
  {
    slug: 'bgremover',
    title: 'BGRemover',
    year: '2025',
    role: 'Full-Stack · AI',
    category: 'AI Image Processing',
    problem:
      "Bangladesh had no fast, accurate AI background-removal tool with proper local format support (HEIC).",
    approach:
      "Built an end-to-end React + Node platform with state-of-the-art AI segmentation and post-removal editing controls. First in-country to handle every common image format including HEIC.",
    impact:
      "Bangladesh's first AI-powered background removal product, shipped at bgremover.pro.",
    stack: ['React', 'Node.js', 'AI Segmentation', 'HEIC', 'Image Processing'],
    links: [
      { label: 'Live', href: 'https://bgremover.pro' },
      { label: 'GitHub', href: 'https://github.com/ApurboSM/BGRemover' },
    ],
  },
  {
    slug: 'playerlagbe',
    title: 'PlayerLagbe (Greenosa Digital)',
    year: '2025',
    role: 'Software Developer',
    category: 'SaaS · Marketplace',
    problem:
      "No structured way for amateur players in Bangladesh to find teammates, opponents, and bookable playing grounds.",
    approach:
      "Built core features for the country's first digital player & playing-ground matchmaking platform, web + companion mobile experience.",
    impact:
      "Bangladesh's 1st digital sports matchmaking platform shipped to production.",
    stack: ['React', 'Node.js', 'MongoDB', 'REST API'],
    links: [
      { label: 'Greenosa Digital', href: 'https://www.linkedin.com/company/greenosa-digital' },
    ],
  },
  {
    slug: 'uiubooknest',
    title: 'UIUBookNest',
    year: '2025',
    role: 'Full-Stack',
    category: 'Campus E-commerce',
    problem:
      "UIU students juggled scattered Facebook posts and verbal handoffs to find textbooks and exam supplies on campus.",
    approach:
      "Designed a smart campus bookstore with curated SKU listings, campus pickup, and dorm delivery wired into Pathao and RedX.",
    impact:
      "A clean, single-tap path for UIU students to get exactly the books and supplies they need.",
    stack: ['React', 'Node.js', 'MongoDB', 'Pathao API', 'RedX API'],
    links: [{ label: 'GitHub', href: 'https://github.com/ApurboSM/UIUBookNest' }],
  },
  {
    slug: 'lipreader',
    title: 'LipReader',
    year: '2024',
    role: 'ML Engineer',
    category: 'Computer Vision',
    problem:
      "Visual speech recognition is hard — most demos rely on perfectly framed faces and pre-cropped video.",
    approach:
      "Trained a LipNet model on the GRID Corpus, then built a Tkinter desktop interface for users to upload a video and watch real-time predictions stream out.",
    impact:
      "Real-time lip-reading prototype with end-to-end UI — coursework graded for CSE439 Machine Vision and CSE442 NLP-driven UI/UX.",
    stack: ['Python', 'TensorFlow', 'LipNet', 'Tkinter'],
    links: [{ label: 'GitHub', href: 'https://github.com/ApurboSM/LipReader-CSE439' }],
  },
];
