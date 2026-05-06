export type SkillGroup = {
  category: string;
  caption: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: 'Frontend',
    caption: 'Where users live',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Vue.js', 'Tailwind CSS', 'Vite', 'HTML / CSS'],
  },
  {
    category: 'Backend',
    caption: 'Where logic runs',
    items: ['Node.js', 'Express.js', 'Django', 'Flask', 'PHP', 'REST', 'PostgreSQL', 'MongoDB', 'MySQL', 'Firebase', 'Drizzle ORM'],
  },
  {
    category: 'AI / ML',
    caption: 'Where intelligence lives',
    items: ['TensorFlow', 'PyTorch', 'OpenCV', 'YOLO', 'CNN', 'GPT-4o', 'Gemini Vision', 'OpenGL'],
  },
  {
    category: 'Cloud & DevOps',
    caption: 'Where it ships',
    items: ['AWS ECS', 'AWS IVS', 'AWS S3', 'Vercel', 'Oracle Cloud', 'DigitalOcean', 'Render', 'Railway', 'Netlify', 'Heroku', 'GitHub Actions', 'Sentry'],
  },
  {
    category: 'Languages',
    caption: 'What I speak to machines',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'PHP', 'C / C++'],
  },
  {
    category: 'Design & Tools',
    caption: 'Where ideas take shape',
    items: ['Figma', 'Photoshop', 'Illustrator', '2D / 3D Animation', 'Git', 'Postman'],
  },
];
