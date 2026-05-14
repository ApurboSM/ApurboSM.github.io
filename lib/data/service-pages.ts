/**
 * Service- and location-targeted landing pages for SEO.
 *
 * Each entry produces a full standalone page at the given route, with:
 *   • Unique <title> + <meta description>
 *   • JSON-LD Service schema
 *   • Substantive page content (overview, capabilities, stack, CTAs)
 *   • Canonical URL + internal links back to homepage anchors
 *
 * Why separate pages?  Google ranks individual URLs.  A homepage that
 * mentions "MERN" is far less likely to rank for "hire MERN developer"
 * than a dedicated /services/mern-stack-developer page where every
 * H1/H2, paragraph, and schema reinforces that exact intent.
 */

export type Capability = {
  heading: string;
  body: string;
};

export type ServicePageData = {
  /** URL path WITHOUT leading slash, e.g. "services/full-stack-developer" */
  slug: string;
  /** "service" → /services/*  |  "location" → /location/* */
  kind: 'service' | 'location';
  /** Visible H1 */
  h1: string;
  /** <title> tag (usually distinct from H1 for SERP CTR) */
  pageTitle: string;
  /** <meta description> */
  description: string;
  /** Short tagline immediately under H1 */
  hook: string;
  /** Long-form intro paragraphs (1–3 paragraphs) */
  overview: string[];
  /** Capabilities — render as H3 + body pairs */
  capabilities: Capability[];
  /** Tech stack tags */
  stack: string[];
  /** Schema.org Service.serviceType */
  serviceType: string;
  /** Schema.org Service.areaServed */
  areaServed: string[];
  /** Final CTA copy */
  cta: { headline: string; body: string };
};

export const servicePages: ServicePageData[] = [
  /* ─── Service: Full-Stack Developer ───────────────────────────────── */
  {
    slug: 'services/full-stack-developer',
    kind: 'service',
    h1: 'Full-Stack Developer',
    pageTitle:
      'Full-Stack Developer | React, Next.js, Node, MongoDB — S. M. Apurbo',
    description:
      'Hire a full-stack developer who ships. S. M. Apurbo builds production-grade web apps end-to-end — React/Next.js frontends, Node.js/Express backends, Postgres/MongoDB databases, auth, and cloud deploy.',
    hook: 'Production-grade web apps, built end-to-end.',
    overview: [
      "I'm a full-stack software engineer who designs, builds, and ships complete web products — frontend, backend, database, auth, infrastructure, and deploy. No hand-offs, no half-features.",
      'I currently lead engineering at ClassTablet (Bangladesh-first edtech) and serve as Technical Lead at PlayerLagbe. Beyond those, I take on focused freelance and contract engagements where shipping speed and engineering quality both matter.',
      'I work with founders, growth-stage startups, and established teams across Bangladesh, the United States (San Francisco, New York), the United Kingdom, and remote-first companies worldwide.',
    ],
    capabilities: [
      {
        heading: 'Modern React + Next.js Frontends',
        body: 'Type-safe React 18 + Next.js 14 App Router builds with Tailwind, Framer Motion, and ShadCN UI patterns. Server components, suspense, streaming, ISR — all production-tested.',
      },
      {
        heading: 'Node.js & Express Backends',
        body: 'REST and tRPC APIs, websockets, background jobs, queues, integrations with third-party services. Clean architecture, observable in production.',
      },
      {
        heading: 'Database Design — Postgres & MongoDB',
        body: 'Schema design, migrations, query optimization, indexing strategy. Comfortable with relational (Postgres, MySQL) and document stores (MongoDB).',
      },
      {
        heading: 'Authentication & Admin Dashboards',
        body: 'OAuth, JWT, session-based auth, role-based access control, full admin panels, audit logs, and analytics dashboards out of the box.',
      },
      {
        heading: 'Deployment, CI / CD & Monitoring',
        body: 'Vercel, AWS, GitHub Pages, Docker. Automated deploys on push, environment management, error tracking, log aggregation, and uptime monitoring.',
      },
    ],
    stack: [
      'TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Express',
      'MongoDB', 'PostgreSQL', 'Mongoose', 'Prisma', 'Tailwind CSS',
      'Framer Motion', 'Docker', 'AWS', 'Vercel', 'GitHub Actions',
    ],
    serviceType: 'Full-Stack Web Development',
    areaServed: [
      'Bangladesh', 'Dhaka', 'United States', 'San Francisco', 'New York',
      'United Kingdom', 'London', 'Canada', 'Worldwide (Remote)',
    ],
    cta: {
      headline: 'Have a product to ship?',
      body: "Send a quick brief — what you're building, your timeline, and where you're stuck. I usually reply within 24 hours.",
    },
  },

  /* ─── Service: MERN Stack Developer ───────────────────────────────── */
  {
    slug: 'services/mern-stack-developer',
    kind: 'service',
    h1: 'MERN Stack Developer',
    pageTitle:
      'MERN Stack Developer | MongoDB · Express · React · Node — S. M. Apurbo',
    description:
      'MERN stack developer specializing in MongoDB, Express, React, and Node.js. S. M. Apurbo builds scalable full-stack JavaScript applications, REST APIs, real-time features, and admin dashboards.',
    hook: 'JavaScript end-to-end, from query to UI.',
    overview: [
      "The MERN stack is what I reach for when a team wants to move fast without giving up scale: MongoDB, Express, React, Node.js. I've shipped MERN applications running real workloads — admin panels, dashboards, real-time features, payment integrations, complex search.",
      'I work as a long-running MERN developer at DevStudio (Nov 2023 – 2025) and apply the same stack across freelance engagements. I write production code, set up clean repository structures, and document everything so future engineers (including future-me) can keep shipping.',
      'Comfortable working as a solo developer, embedding into existing teams, or leading a small group of engineers.',
    ],
    capabilities: [
      {
        heading: 'MongoDB & Mongoose',
        body: 'Schema modelling, aggregation pipelines, indexing, replica-set ops. Comfortable migrating from prototype-stage flat docs to production-shaped, indexed schemas.',
      },
      {
        heading: 'Express & Node.js APIs',
        body: 'REST and JSON-RPC APIs, middleware, async error handling, request validation, rate limiting, session/JWT auth.',
      },
      {
        heading: 'React Frontends',
        body: 'React 18, hooks, Context, Redux Toolkit or Zustand, React Query, suspense, optimistic UI. Built with Vite or Next.js depending on requirements.',
      },
      {
        heading: 'Real-Time & Background Work',
        body: 'Socket.io for live features, BullMQ / agenda for queued jobs, websocket fan-out, cron schedules.',
      },
      {
        heading: 'DevOps & Deployment',
        body: 'Dockerized services, GitHub Actions CI, deployment to Vercel / Render / DigitalOcean / AWS EC2 + RDS, plus monitoring with PM2 or systemd.',
      },
    ],
    stack: [
      'MongoDB', 'Mongoose', 'Express', 'React', 'Node.js', 'JavaScript',
      'TypeScript', 'Socket.io', 'JWT', 'Redux Toolkit', 'React Query',
      'Vite', 'Tailwind CSS', 'Docker',
    ],
    serviceType: 'MERN Stack Development',
    areaServed: [
      'Bangladesh', 'Dhaka', 'United States', 'San Francisco', 'New York',
      'United Kingdom', 'London', 'Worldwide (Remote)',
    ],
    cta: {
      headline: 'Need a MERN engineer?',
      body: 'Tell me what you want to ship and your timeline — I can take it solo or join your existing team.',
    },
  },

  /* ─── Service: AI / ML Engineer ───────────────────────────────────── */
  {
    slug: 'services/ai-ml-engineer',
    kind: 'service',
    h1: 'AI / ML Engineer',
    pageTitle:
      'AI / ML Engineer | Computer Vision, NLP, Model Deployment — S. M. Apurbo',
    description:
      'AI/ML engineer building practical machine-learning products — computer vision, NLP, recommendation systems, and AI pipelines. S. M. Apurbo ships ML models into production web apps.',
    hook: 'Practical machine learning, shipped into real products.',
    overview: [
      "Most ML projects die in the gap between a Jupyter notebook and a working product. My job is closing that gap. I design, train, and deploy ML models that live inside real applications — handling real users, real data, and real latency budgets.",
      'I work as a Data Preparation Associate at Nyntax (AI/ML pipelines with strict data security and confidentiality), and I built AI-driven features for PlayerLagbe and a Plant Disease Detection system used in agriculture research.',
      'I bring engineering discipline to ML: versioned datasets, reproducible training, automated evaluation, instrumented inference, and graceful fallbacks when the model is uncertain.',
    ],
    capabilities: [
      {
        heading: 'Computer Vision',
        body: 'Image classification, object detection, segmentation. Used for plant-disease detection, gesture recognition, image quality scoring.',
      },
      {
        heading: 'Natural Language Processing',
        body: 'Embeddings, semantic search, classification, summarization, retrieval-augmented generation (RAG). Comfortable with both classical methods and LLM-driven pipelines.',
      },
      {
        heading: 'Data Pipelines',
        body: 'Cleaning, labelling, feature engineering, augmentation, and versioning. ETL from messy real-world sources into trainable datasets.',
      },
      {
        heading: 'Model Training & Evaluation',
        body: 'PyTorch and TensorFlow for training, scikit-learn for classical models, MLflow for experiment tracking, robust evaluation across edge-case cohorts.',
      },
      {
        heading: 'Production ML Deployment',
        body: 'Serving models behind FastAPI / Flask, batched inference, model versioning, A/B testing, monitoring for drift and degradation.',
      },
    ],
    stack: [
      'Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'NumPy', 'Pandas',
      'FastAPI', 'OpenCV', 'Hugging Face Transformers', 'LangChain',
      'Vector Embeddings', 'PostgreSQL', 'Docker', 'AWS',
    ],
    serviceType: 'AI / Machine Learning Engineering',
    areaServed: [
      'Bangladesh', 'Dhaka', 'United States', 'San Francisco', 'New York',
      'United Kingdom', 'Canada', 'Worldwide (Remote)',
    ],
    cta: {
      headline: 'Got an AI feature to ship?',
      body: 'Tell me what problem you want the model to solve — I can scope, prototype, and ship it into your product.',
    },
  },

  /* ─── Location: Dhaka Full-Stack Developer ────────────────────────── */
  {
    slug: 'location/dhaka-full-stack-developer',
    kind: 'location',
    h1: 'Full-Stack Developer in Dhaka',
    pageTitle:
      'Full-Stack Developer in Dhaka, Bangladesh — Hire S. M. Apurbo',
    description:
      'Dhaka-based full-stack developer S. M. Apurbo builds production web applications for startups and enterprises in Bangladesh. React, Next.js, Node.js, MongoDB, PostgreSQL — on-site or remote.',
    hook: 'A Dhaka-based full-stack engineer who ships globally.',
    overview: [
      "I'm based in Dhaka, Bangladesh — currently Founding Software Engineer at ClassTablet (a Bangladesh-first edtech) and Technical Lead at PlayerLagbe. I split time between on-site work in Dhaka and remote engagements with teams worldwide.",
      'For local Dhaka clients, on-site meetings and full project ownership are both options. For Bangladeshi startups and SMEs, I bring international engineering standards — version control, CI/CD, testing, accessibility, and security — without inflating your timeline.',
      'BRAC University CS graduate, BUCC (BRAC University Computer Club) alumnus, and frequent collaborator on AI/edtech products designed for the local Bangladeshi market.',
    ],
    capabilities: [
      {
        heading: 'Local Dhaka Engagements',
        body: 'On-site weekly meetings, in-person planning workshops, and same-time-zone communication for Bangladesh-based teams.',
      },
      {
        heading: 'Bangladesh-First Product Design',
        body: 'I understand the local stack — bKash / Nagad integrations, SSLCommerz / aamarPay, Bengali typography, low-bandwidth UX, Bangladesh phone-number formats, and NID flows.',
      },
      {
        heading: 'International-Grade Engineering',
        body: 'Git workflows, code reviews, typed languages, automated tests, observability — the same standards you would expect from a top-tier US/UK shop.',
      },
      {
        heading: 'Edtech, Sports-tech, AI Platforms',
        body: 'Direct experience building edtech (ClassTablet), AI-driven sports recruitment (PlayerLagbe), and data-prep / AI-pipeline work (Nyntax).',
      },
    ],
    stack: [
      'TypeScript', 'React', 'Next.js', 'Node.js', 'Express', 'MongoDB',
      'PostgreSQL', 'Python', 'Tailwind CSS', 'Docker', 'AWS', 'Vercel',
      'bKash API', 'SSLCommerz',
    ],
    serviceType: 'Full-Stack Web Development (Dhaka, Bangladesh)',
    areaServed: ['Dhaka', 'Bangladesh', 'Chattogram', 'Sylhet', 'Rajshahi'],
    cta: {
      headline: 'Building something in Dhaka?',
      body: "Local startups, enterprises, and agencies — let's grab a coffee in Banani or jump on a quick call.",
    },
  },

  /* ─── Location: Bangladesh Software Engineer ──────────────────────── */
  {
    slug: 'location/bangladesh-software-engineer',
    kind: 'location',
    h1: 'Software Engineer in Bangladesh',
    pageTitle:
      'Software Engineer in Bangladesh — Full-Stack & AI / ML | S. M. Apurbo',
    description:
      "Bangladesh-based software engineer S. M. Apurbo builds full-stack web applications and AI/ML systems. Available for projects across Bangladesh and remote engagements with companies worldwide.",
    hook: 'Full-stack engineering from Bangladesh — for clients anywhere.',
    overview: [
      "I'm a software engineer based in Bangladesh who works full-stack across web and AI/ML. From Dhaka I serve clients across Bangladesh — startups in Chattogram and Sylhet, SaaS companies in Dhaka — and remote engagements with teams in the United States, the United Kingdom, the EU, Australia, and beyond.",
      'My day-to-day work covers product-engineering at ClassTablet (founding engineer), technical leadership at PlayerLagbe, and AI/ML data preparation at Nyntax. I also take on focused freelance and contract work where I can deliver concretely measurable outcomes.',
      'For international clients, the math is straightforward: Bangladesh-based rates with engineering standards equivalent to anywhere else. For Bangladeshi clients, you get the same level of craft local teams pay 5–10× more for from foreign consultancies.',
    ],
    capabilities: [
      {
        heading: 'Full-Stack Web Development',
        body: 'React / Next.js frontends, Node / Express backends, MongoDB and PostgreSQL databases, fully production-ready.',
      },
      {
        heading: 'AI / ML Engineering',
        body: 'Computer vision, NLP, retrieval / RAG, data pipelines. Practical model deployment, not just notebook prototypes.',
      },
      {
        heading: 'Remote Collaboration',
        body: 'Async-friendly, well-documented work. Comfortable in any time zone with overlap windows for the US (Pacific / Eastern), Europe, and Asia.',
      },
      {
        heading: 'Local Bangladesh Expertise',
        body: 'bKash / Nagad / SSLCommerz integrations, Bengali UX, low-bandwidth optimizations, NID and OTP flows.',
      },
    ],
    stack: [
      'TypeScript', 'JavaScript', 'Python', 'React', 'Next.js', 'Node.js',
      'Express', 'MongoDB', 'PostgreSQL', 'FastAPI', 'PyTorch', 'TensorFlow',
      'Docker', 'AWS', 'Vercel',
    ],
    serviceType: 'Software Engineering (Bangladesh)',
    areaServed: ['Bangladesh', 'Dhaka', 'Worldwide (Remote)'],
    cta: {
      headline: 'Hiring from Bangladesh, or based here?',
      body: "Tell me about your project — remote, hybrid, or on-site in Dhaka. I'll respond within a day.",
    },
  },
];

export function getServicePage(slug: string): ServicePageData | undefined {
  return servicePages.find((p) => p.slug === slug);
}
