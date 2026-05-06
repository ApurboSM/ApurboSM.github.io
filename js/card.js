/* ════════════════════════════════════════
   S. M. Apurbo — Business Card JavaScript
════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initVersionToggle();
  initCard3D();
});

/* ──────────────────────────────────────
   Version Toggle (3D / Simple)
────────────────────────────────────── */
function initVersionToggle() {
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const versions   = document.querySelectorAll('.card-version');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.version;

      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      versions.forEach(v => {
        v.classList.toggle('active', v.id === `card-${target}`);
      });
    });
  });
}

/* ──────────────────────────────────────
   3D Business Card Interactions
────────────────────────────────────── */
function initCard3D() {
  const card  = document.getElementById('business-card');
  const scene = document.getElementById('card-scene');
  if (!card || !scene) return;

  let isFlipped    = false;
  let currentScale = 1;
  let mouseX       = 0;
  let mouseY       = 0;

  const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768;

  /* ── Desktop: Mouse-follow rotation ── */
  if (!isMobile) {
    scene.addEventListener('mousemove', e => {
      const rect = scene.getBoundingClientRect();
      const cx   = rect.left + rect.width / 2;
      const cy   = rect.top  + rect.height / 2;
      mouseX = e.clientX;
      mouseY = e.clientY;

      const rotY = ((e.clientX - cx) / rect.width)  * 50;
      const rotX = -((e.clientY - cy) / rect.height) * 25;
      const flip = isFlipped ? 180 : 0;

      card.style.transition = 'transform 0.1s ease-out';
      card.style.transform  = `scale(${currentScale}) rotateY(${flip + rotY}deg) rotateX(${rotX}deg)`;
    });

    scene.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      const flip = isFlipped ? 180 : 0;
      card.style.transform  = `scale(${currentScale}) rotateY(${flip}deg) rotateX(0deg)`;
    });

    /* Scroll to zoom (only when hovering card) */
    let hovering = false;
    card.addEventListener('mouseenter', () => { hovering = true;  });
    card.addEventListener('mouseleave', () => { hovering = false; });

    document.addEventListener('wheel', e => {
      if (!hovering) return;
      e.preventDefault();
      const delta     = e.deltaY < 0 ? 0.08 : -0.08;
      currentScale    = Math.min(1.8, Math.max(0.4, currentScale + delta));
      applyTransform(card, isFlipped, currentScale, mouseX, mouseY, scene);
    }, { passive: false });
  }

  /* ── Click: Flip ── */
  card.addEventListener('click', () => {
    isFlipped = !isFlipped;
    applyTransform(card, isFlipped, currentScale, mouseX, mouseY, scene, true);
  });

  /* ── Keyboard controls ── */
  card.addEventListener('keydown', e => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      isFlipped = !isFlipped;
      applyTransform(card, isFlipped, currentScale, mouseX, mouseY, scene, true);
    }
    if (e.key === '+' || e.key === '=') {
      e.preventDefault();
      currentScale = Math.min(1.8, currentScale + 0.1);
      applyTransform(card, isFlipped, currentScale, mouseX, mouseY, scene);
    }
    if (e.key === '-' || e.key === '_') {
      e.preventDefault();
      currentScale = Math.max(0.4, currentScale - 0.1);
      applyTransform(card, isFlipped, currentScale, mouseX, mouseY, scene);
    }
    if (e.key === 'Escape') {
      isFlipped    = false;
      currentScale = 1;
      card.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      card.style.transform  = 'scale(1) rotateY(0deg) rotateX(0deg)';
    }
  });

  /* Double-click: Reset */
  card.addEventListener('dblclick', () => {
    isFlipped    = false;
    currentScale = 1;
    card.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    card.style.transform  = 'scale(1) rotateY(0deg) rotateX(0deg)';
  });

  /* ── Mobile: Touch swipe / tap ── */
  if (isMobile) {
    let touchStartX = 0;
    let touchStartY = 0;

    card.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    card.addEventListener('touchend', e => {
      const dx = touchStartX - e.changedTouches[0].clientX;
      const dy = touchStartY - e.changedTouches[0].clientY;
      const absDx = Math.abs(dx), absDy = Math.abs(dy);

      if (absDx < 10 && absDy < 10) {
        /* Tap — flip */
        isFlipped = !isFlipped;
        card.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        card.style.transform  = `scale(${currentScale}) rotateY(${isFlipped ? 180 : 0}deg)`;
        return;
      }

      if (absDx > absDy) {
        /* Horizontal swipe — flip */
        isFlipped = !isFlipped;
      } else {
        /* Vertical swipe — zoom */
        currentScale = dy > 0
          ? Math.min(1.6, currentScale + 0.15)
          : Math.max(0.6, currentScale - 0.15);
      }

      card.style.transition = 'transform 0.4s ease-out';
      card.style.transform  = `scale(${currentScale}) rotateY(${isFlipped ? 180 : 0}deg)`;
    }, { passive: true });
  }
}

/* ──────────────────────────────────────
   Helper: Apply 3D transform
────────────────────────────────────── */
function applyTransform(card, flipped, scale, mouseX, mouseY, scene, smooth = false) {
  const rect = scene.getBoundingClientRect();
  const cx   = rect.left + rect.width / 2;
  const cy   = rect.top  + rect.height / 2;
  const rotY = ((mouseX - cx) / rect.width)  * 50;
  const rotX = -((mouseY - cy) / rect.height) * 25;
  const flip = flipped ? 180 : 0;

  card.style.transition = smooth
    ? 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    : 'transform 0.1s ease-out';
  card.style.transform  = `scale(${scale}) rotateY(${flip + rotY}deg) rotateX(${rotX}deg)`;
}
