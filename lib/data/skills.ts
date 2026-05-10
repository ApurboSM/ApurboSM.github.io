export type SkillItem = {
  name: string;
  url?: string;
};

export type SkillGroup = {
  category: string;
  caption: string;
  items: SkillItem[];
};

export const skills: SkillGroup[] = [
  {
    category: 'Frontend',
    caption: 'Where users live',
    items: [
      { name: 'React', url: 'https://react.dev' },
      { name: 'Next.js', url: 'https://nextjs.org' },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org' },
      { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { name: 'Vue.js', url: 'https://vuejs.org' },
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com' },
      { name: 'Vite', url: 'https://vitejs.dev' },
      { name: 'HTML / CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    ],
  },
  {
    category: 'Backend',
    caption: 'Where logic runs',
    items: [
      { name: 'Node.js', url: 'https://nodejs.org' },
      { name: 'Express.js', url: 'https://expressjs.com' },
      { name: 'Django', url: 'https://www.djangoproject.com' },
      { name: 'Flask', url: 'https://flask.palletsprojects.com' },
      { name: 'PHP', url: 'https://www.php.net' },
      { name: 'REST' },
      { name: 'PostgreSQL', url: 'https://www.postgresql.org' },
      { name: 'MongoDB', url: 'https://www.mongodb.com' },
      { name: 'MySQL', url: 'https://www.mysql.com' },
      { name: 'Firebase', url: 'https://firebase.google.com' },
      { name: 'Drizzle ORM', url: 'https://orm.drizzle.team' },
    ],
  },
  {
    category: 'AI / ML',
    caption: 'Where intelligence lives',
    items: [
      { name: 'TensorFlow', url: 'https://www.tensorflow.org' },
      { name: 'PyTorch', url: 'https://pytorch.org' },
      { name: 'OpenCV', url: 'https://opencv.org' },
      { name: 'YOLO', url: 'https://ultralytics.com' },
      { name: 'CNN' },
      { name: 'GPT-4o', url: 'https://openai.com/gpt-4' },
      { name: 'Gemini Vision', url: 'https://deepmind.google/technologies/gemini' },
      { name: 'OpenGL', url: 'https://www.opengl.org' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    caption: 'Where it ships',
    items: [
      { name: 'AWS ECS', url: 'https://aws.amazon.com/ecs' },
      { name: 'AWS IVS', url: 'https://aws.amazon.com/ivs' },
      { name: 'AWS S3', url: 'https://aws.amazon.com/s3' },
      { name: 'Vercel', url: 'https://vercel.com' },
      { name: 'Oracle Cloud', url: 'https://www.oracle.com/cloud' },
      { name: 'DigitalOcean', url: 'https://www.digitalocean.com' },
      { name: 'Render', url: 'https://render.com' },
      { name: 'Railway', url: 'https://railway.app' },
      { name: 'Netlify', url: 'https://www.netlify.com' },
      { name: 'Heroku', url: 'https://www.heroku.com' },
      { name: 'GitHub Actions', url: 'https://github.com/features/actions' },
      { name: 'Sentry', url: 'https://sentry.io' },
    ],
  },
  {
    category: 'Languages',
    caption: 'What I speak to machines',
    items: [
      { name: 'Python', url: 'https://www.python.org' },
      { name: 'Java', url: 'https://www.java.com' },
      { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org' },
      { name: 'PHP', url: 'https://www.php.net' },
      { name: 'C / C++', url: 'https://isocpp.org' },
    ],
  },
  {
    category: 'Design & Tools',
    caption: 'Where ideas take shape',
    items: [
      { name: 'Figma', url: 'https://www.figma.com' },
      { name: 'Photoshop', url: 'https://www.adobe.com/products/photoshop.html' },
      { name: 'Illustrator', url: 'https://www.adobe.com/products/illustrator.html' },
      { name: '2D / 3D Animation' },
      { name: 'Git', url: 'https://git-scm.com' },
      { name: 'Postman', url: 'https://www.postman.com' },
    ],
  },
];
