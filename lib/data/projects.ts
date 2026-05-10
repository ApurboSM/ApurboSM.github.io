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
  // ── Featured ──────────────────────────────────────────────────────────────
  {
    slug: 'classtablet',
    title: 'ClassTablet',
    year: '2026',
    role: 'Founding Engineer · Co-founder',
    category: 'EdTech SaaS',
    problem:
      'Bangladeshi classrooms run on spreadsheets, WhatsApp, and paper registers — five disconnected tools per teacher.',
    approach:
      'Co-founded an all-in-one, multi-tenant white-label platform: 100+ Postgres tables, 48 service classes, AWS IVS live streaming, GPT-4o + Gemini Vision AI, SSLCommerz payments, Bangla-first UX.',
    impact:
      'Bangladesh-first edtech category-defining platform. 11-person team. Production codebase serving teachers, students, parents, and institutions.',
    stack: ['TypeScript', 'Next.js', 'PostgreSQL', 'Drizzle ORM', 'AWS ECS', 'AWS IVS', 'GPT-4o', 'SSLCommerz'],
    links: [
      { label: 'classtablet.com', href: 'https://classtablet.com/en-US' },
      { label: 'app.classtablet.com', href: 'https://app.classtablet.com' },
      { label: 'GitHub', href: 'https://github.com/PixL-Bangladesh/classtablet' },
    ],
    featured: true,
  },

  // ── Selected work ─────────────────────────────────────────────────────────
  {
    slug: 'playerlagbe',
    title: 'PlayerLagbe (Greenosa Digital)',
    year: '2025',
    role: 'Founding SE & Technical Lead',
    category: 'SaaS · Marketplace',
    problem:
      'No structured way for amateur players in Bangladesh to find teammates, opponents, and bookable playing grounds.',
    approach:
      "Led core platform development for the country's first digital player & playing-ground matchmaking SaaS — web and companion mobile experience.",
    impact:
      "Bangladesh's 1st digital sports matchmaking platform shipped to production.",
    stack: ['React', 'Node.js', 'MongoDB', 'REST API', 'Expo'],
    links: [
      { label: 'playerlagbe.com', href: 'https://playerlagbe.com/' },
      { label: 'Greenosa Digital', href: 'https://greenosadigital.com/' },
    ],
  },
  {
    slug: 'bgremover',
    title: 'BGRemover',
    year: '2024',
    role: 'Full-Stack · AI',
    category: 'AI Image Processing',
    problem:
      'Bangladesh had no fast, accurate AI background-removal tool with proper local format support (HEIC).',
    approach:
      'Built an end-to-end React + Node platform with state-of-the-art AI segmentation and post-removal editing controls. First in-country to handle every common image format including HEIC.',
    impact:
      "Bangladesh's first AI-powered background removal product, shipped at bgremover.pro.",
    stack: ['React', 'Node.js', 'AI Segmentation', 'HEIC', 'Image Processing'],
    links: [
      { label: 'bgremover.pro', href: 'https://bgremover.pro/' },
      { label: 'GitHub', href: 'https://github.com/ApurboSM/BGRemover' },
    ],
  },
  {
    slug: 'uiubooknest',
    title: 'UIUBookNest',
    year: '2025',
    role: 'Full-Stack',
    category: 'Campus E-commerce',
    problem:
      'UIU students juggled scattered Facebook posts and verbal handoffs to find textbooks and exam supplies on campus.',
    approach:
      'Designed a smart campus bookstore with curated SKU listings, campus pickup, and dorm delivery wired into Pathao and RedX.',
    impact:
      'A clean, single-tap path for UIU students to get exactly the books and supplies they need.',
    stack: ['React', 'Node.js', 'MongoDB', 'Pathao API', 'RedX API'],
    links: [
      { label: 'uiubooknest.netlify.app', href: 'https://uiubooknest.netlify.app/' },
      { label: 'GitHub', href: 'https://github.com/ApurboSM/UIUBookNest' },
    ],
  },
  {
    slug: 'rentwheels',
    title: 'RentWheels',
    year: '2024',
    role: 'Full-Stack',
    category: 'MERN · Marketplace',
    problem:
      'Renting vehicles in Bangladesh means calling unknown numbers from Facebook posts — no booking system, no receipts, no trust signals.',
    approach:
      'Built a full-stack vehicle rental platform on the MERN stack with user authentication, a booking system, and QR-coded receipt generation.',
    impact:
      'End-to-end rental flow from browsing to confirmed booking with verifiable digital receipts.',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'QR Codes', 'JWT'],
    links: [
      { label: 'rentwheels007.netlify.app', href: 'https://rentwheels007.netlify.app/' },
    ],
  },
  {
    slug: 'plant-disease',
    title: 'Plant Disease Detection',
    year: '2024',
    role: 'ML Engineer · Full-Stack',
    category: 'Computer Vision',
    problem:
      'Farmers lack fast, accessible tools to diagnose crop diseases early — traditional methods rely on agronomist visits that are slow and expensive.',
    approach:
      'Trained a Deep Learning CNN model on leaf images to classify plant diseases, then wrapped it in a Flask web app so anyone can upload a photo and get an AI-powered diagnosis instantly.',
    impact:
      'End-to-end ML pipeline from dataset to deployed web UI — practical tool for early-stage crop disease detection.',
    stack: ['Python', 'TensorFlow', 'CNN', 'Flask', 'OpenCV'],
    links: [{ label: 'GitHub', href: 'https://github.com/ApurboSM' }],
  },
  {
    slug: 'lipreader',
    title: 'LipReader',
    year: '2024',
    role: 'ML Engineer',
    category: 'Computer Vision · NLP',
    problem:
      'Visual speech recognition is hard — most demos rely on perfectly framed faces and pre-cropped video.',
    approach:
      'Trained a LipNet model on the GRID Corpus, then built a Tkinter desktop interface for users to upload a video and watch real-time predictions stream out.',
    impact:
      'Real-time lip-reading prototype with end-to-end UI — coursework graded for CSE439 Machine Vision and CSE442 NLP-driven UI/UX.',
    stack: ['Python', 'TensorFlow', 'LipNet', 'OpenCV', 'Tkinter'],
    links: [{ label: 'GitHub', href: 'https://github.com/ApurboSM/LipReader-CSE439' }],
  },
];
