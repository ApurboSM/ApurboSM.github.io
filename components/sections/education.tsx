'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { MaxWidth } from '@/components/max-width';
import { SectionTitle } from '@/components/section-title';

const ease = [0.16, 1, 0.3, 1] as const;

const education = {
  degree: 'Bachelor of Science',
  field: 'Computer Science & Engineering',
  institution: 'BRAC University',
  location: 'Dhaka, Bangladesh',
  period: '2022 – 2026',
  coursework: [
    'Digital Logic Design',
    'Object-Oriented Programming',
    'Data Structures & Algorithms',
    'Database Management Systems',
    'Machine Learning',
    'Computer Networks',
    'Software Engineering',
    'Operating Systems',
  ],
};

const certifications = [
  {
    issuer: 'Udemy',
    issuerShort: 'udemy',
    category: 'Programming',
    categoryColor: 'bg-blue-500/10 text-blue-400',
    title: 'Mastering C & C++ Programming',
    description:
      'From Fundamentals to Advanced — a transformative journey through C and C++ concepts.',
  },
  {
    issuer: 'Udemy',
    issuerShort: 'udemy',
    category: 'AI / ML',
    categoryColor: 'bg-purple-500/10 text-purple-400',
    title: 'Artificial Intelligence: Master Advanced Concepts',
    description:
      'Understanding AI, ML, DL, and Generative AI — key concepts and real-world use cases.',
  },
  {
    issuer: 'BRAC University TARC',
    issuerShort: 'TARC',
    category: 'Mobile Dev',
    categoryColor: 'bg-emerald-500/10 text-emerald-400',
    title: 'App Development',
    description:
      'Intensive training in Figma design, Dart programming, and Flutter app development with Android Studio.',
  },
];

export function Education() {
  return (
    <section
      id="education"
      className="relative scroll-mt-24 border-t border-line py-32 sm:py-40"
    >
      <MaxWidth>
        <SectionTitle
          index="09"
          label="Academic Background"
          title="Education"
        />

        {/* Degree card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-16 flex flex-col gap-6 rounded-3xl border border-line bg-surface p-8 sm:flex-row sm:items-start sm:gap-8 sm:p-10"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-bg/60 text-accent-hi">
            <GraduationCap className="h-6 w-6" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint">
                  {education.degree}
                </p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                  {education.field}
                </h3>
                <p className="mt-1 text-base text-fg-muted">{education.institution}</p>
              </div>
              <div className="text-right">
                <span className="rounded-full border border-line bg-bg/60 px-3 py-1 font-mono text-xs text-fg-muted">
                  {education.period}
                </span>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">
                  {education.location}
                </p>
              </div>
            </div>

            <div className="mt-5 border-t border-line pt-5">
              <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-faint">
                Relevant Coursework
              </p>
              <div className="flex flex-wrap gap-1.5">
                {education.coursework.map((c) => (
                  <span
                    key={c}
                    className="rounded-md border border-line bg-bg/60 px-2.5 py-1 font-mono text-[11px] text-fg-muted"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <div className="mb-8">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-faint">
            <span className="h-px flex-1 bg-line-2" />
            <span>Credentials</span>
            <span className="h-px flex-1 bg-line-2" />
          </div>
          <h3 className="mt-4 text-center text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            Certifications & Courses
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease, delay: i * 0.1 }}
              className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:border-line-2 hover:bg-surface-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">
                  {cert.issuerShort}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium ${cert.categoryColor}`}>
                  {cert.category}
                </span>
              </div>
              <div>
                <p className="font-sans text-sm font-semibold leading-snug text-fg">
                  {cert.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-fg-muted">
                  {cert.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </MaxWidth>
    </section>
  );
}
