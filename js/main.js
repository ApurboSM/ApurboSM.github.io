/* ════════════════════════════════════════════════════════════
   S. M. Apurbo Portfolio — Main JavaScript
   ════════════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────
   Page Loader
────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1800);
});

/* ──────────────────────────────────────
   DOM Ready
────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initTyped();
  initNavbar();
  initScrollReveal();
  initBackToTop();
  initSmoothScroll();
  initCustomCursor();
  initContactForm();
  fetchVisitorCount();
});

/* ──────────────────────────────────────
   Typed.js
────────────────────────────────────── */
function initTyped() {
  const el = document.getElementById('typed-hero');
  if (!el || typeof Typed === 'undefined') return;

  new Typed('#typed-hero', {
    strings: [
      'full-stack apps.',
      'AI/ML solutions.',
      'React experiences.',
      'scalable backends.',
      'elegant interfaces.',
    ],
    typeSpeed: 55,
    backSpeed: 35,
    backDelay: 2200,
    startDelay: 600,
    loop: true,
    cursorChar: '|',
  });
}

/* ──────────────────────────────────────
   Navbar
────────────────────────────────────── */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const menu      = document.getElementById('nav-menu');
  if (!navbar) return;

  /* Scroll: add .scrolled class */
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveLink();
    updateBackToTop();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile hamburger */
  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Close on link tap */
    menu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    /* Close on outside click */
    document.addEventListener('click', e => {
      if (menu.classList.contains('open') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
        menu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ──────────────────────────────────────
   Active Nav Link Highlighting
────────────────────────────────────── */
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link[href^="#"]');
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* ──────────────────────────────────────
   Smooth Scroll
────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navH = document.getElementById('navbar')?.offsetHeight || 80;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ──────────────────────────────────────
   Scroll Reveal (IntersectionObserver)
────────────────────────────────────── */
function initScrollReveal() {
  const revealClasses = ['.reveal-up', '.reveal-left', '.reveal-right', '.reveal-fade'];
  const elements = document.querySelectorAll(revealClasses.join(','));

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  elements.forEach(el => observer.observe(el));
}

/* ──────────────────────────────────────
   Back To Top Button
────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function updateBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (btn) btn.classList.toggle('visible', window.scrollY > 400);
}

/* ──────────────────────────────────────
   Custom Cursor
────────────────────────────────────── */
function initCustomCursor() {
  const cursor  = document.getElementById('cursor');
  const trail   = document.getElementById('cursor-trail');

  /* Skip on touch devices */
  if (!cursor || !trail || window.matchMedia('(pointer: coarse)').matches) {
    if (cursor) cursor.style.display = 'none';
    if (trail)  trail.style.display  = 'none';
    return;
  }

  let mx = 0, my = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  /* Trailing effect via requestAnimationFrame */
  let tx = 0, ty = 0;
  const animateTrail = () => {
    tx += (mx - tx) * 0.18;
    ty += (my - ty) * 0.18;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    requestAnimationFrame(animateTrail);
  };
  animateTrail();

  /* Hover states */
  const interactives = 'a, button, .chip, .project-card, .cert-card, .client-card, .activity-card, .tl-card';
  document.querySelectorAll(interactives).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
      trail.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
      trail.classList.remove('hovered');
    });
  });

  /* Hide when leaving window */
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    trail.style.opacity  = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    trail.style.opacity  = '1';
  });
}

/* ──────────────────────────────────────
   Contact Form
────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    /* Formspree handles the actual POST; this just gives UI feedback */
    await new Promise(r => setTimeout(r, 800));

    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
}

/* ──────────────────────────────────────
   Visitor Counter
────────────────────────────────────── */
async function fetchVisitorCount() {
  const el = document.getElementById('visitor-count');
  if (!el) return;

  try {
    const res  = await fetch('https://api.countapi.xyz/hit/smapurbo-me/visits');
    const data = await res.json();
    if (data?.value != null) {
      el.textContent = Number(data.value).toLocaleString();
      return;
    }
    throw new Error('no value');
  } catch {
    /* Graceful fallback */
    try {
      const res  = await fetch('https://api.countapi.xyz/get/smapurbo-me/visits');
      const data = await res.json();
      if (data?.value != null) {
        el.textContent = Number(data.value).toLocaleString();
        return;
      }
    } catch {}

    /* Estimated count based on deployment date */
    const deployed = new Date('2025-12-14');
    const days     = Math.max(0, Math.floor((Date.now() - deployed) / 86400000));
    el.textContent = (days * 5 + 150).toLocaleString() + '+';
  }
}
