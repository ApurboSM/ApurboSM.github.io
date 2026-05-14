'use client';

import Link from 'next/link';
import { Github, Linkedin, Facebook, ArrowUp } from 'lucide-react';
import { site } from '@/lib/data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto w-full max-w-content px-6 py-16 sm:px-8 lg:px-12">
        {/* ── Big sign-off ─────────────────────────────────────────── */}
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-16">
          <div>
            <h2 className="text-balance font-sans text-4xl font-medium leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
              Building the next thing.
              <br />
              <span className="text-fg-muted">Want in?</span>
            </h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-7 inline-flex items-center gap-2 border-b border-line-2 pb-1 font-mono text-sm text-fg-muted transition-colors hover:border-accent hover:text-accent-hi"
            >
              {site.email}
            </a>
            <p className="mt-6 max-w-md text-pretty text-[13.5px] leading-relaxed text-fg-faint">
              Software engineer · Full-stack developer · AI / ML engineer.
              Based in Dhaka, Bangladesh — working with teams worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterCol title="Sitemap">
              <Link href="/" className="footer-link">Home</Link>
              <Link href="/about/" className="footer-link">About</Link>
              <Link href="/projects/" className="footer-link">Projects</Link>
              <Link href="/card/" className="footer-link">Card</Link>
              <Link href="/#experience" className="footer-link">Career</Link>
              <Link href="/#contact" className="footer-link">Contact</Link>
            </FooterCol>

            <FooterCol title="Services">
              <Link href="/services/full-stack-developer/" className="footer-link">
                Full-Stack Dev
              </Link>
              <Link href="/services/mern-stack-developer/" className="footer-link">
                MERN Stack
              </Link>
              <Link href="/services/ai-ml-engineer/" className="footer-link">
                AI / ML Engineer
              </Link>
              <Link
                href="/location/dhaka-full-stack-developer/"
                className="footer-link"
              >
                Dhaka Developer
              </Link>
              <Link
                href="/location/bangladesh-software-engineer/"
                className="footer-link"
              >
                Bangladesh SWE
              </Link>
            </FooterCol>

            <FooterCol title="Connect">
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <Github className="mr-2 inline h-3.5 w-3.5" />
                GitHub
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <Linkedin className="mr-2 inline h-3.5 w-3.5" />
                LinkedIn
              </a>
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <Facebook className="mr-2 inline h-3.5 w-3.5" />
                Facebook
              </a>
              <a
                href={site.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Schedule a call
              </a>
            </FooterCol>
          </div>
        </div>

        {/* ── Bottom row ───────────────────────────────────────────── */}
        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-line pt-8 text-fg-faint sm:flex-row sm:items-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em]">
            © {year} {site.name} · Built in Dhaka
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#home"
              className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors hover:text-fg"
            >
              <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
              Back to top
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.footer-link) {
          display: block;
          font-size: 13.5px;
          color: rgb(var(--fg) / 0.65);
          padding: 4px 0;
          transition: color 200ms;
        }
        :global(.footer-link:hover) {
          color: rgb(var(--fg));
        }
      `}</style>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-fg-faint">
        {title}
      </div>
      <div className="space-y-0">{children}</div>
    </div>
  );
}
