/* ==============================================
   shared.js — Creative Animation Engine v2
   Arthur Viaud Portfolio — Phase 5
   Lead Creative Developer Mode: ON
============================================== */

'use strict';

// ─── DEVICE DETECTION ──────────────────────────────────────────────────────
const IS_DESKTOP = window.matchMedia('(hover: hover) and (min-width: 961px)').matches;
if (IS_DESKTOP) document.body.classList.add('is-desktop');

// ─── PAGE TRANSITION ───────────────────────────────────────────────────────
(function initPageTransition() {
  let overlay = document.getElementById('page-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'page-overlay';
    document.body.insertBefore(overlay, document.body.firstChild);
  }

  // Reveal — slide overlay upward
  requestAnimationFrame(() => {
    requestAnimationFrame(() => overlay.classList.add('pt-out'));
  });

  // On internal link click → cover page then navigate
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (
      !href ||
      href.startsWith('http') ||
      href.startsWith('//') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#') ||
      link.hasAttribute('download') ||
      link.target === '_blank'
    ) return;

    e.preventDefault();
    overlay.classList.remove('pt-out');
    setTimeout(() => { window.location.href = href; }, 580);
  });
})();

// ─── CUSTOM CURSOR (DESKTOP ONLY) ──────────────────────────────────────────
(function initCursor() {
  if (!IS_DESKTOP) return;

  const cur  = document.getElementById('cur');
  const ring = document.getElementById('ring');
  if (!cur || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  // Lag loop for ring
  (function loop() {
    rx += (mx - rx) * 0.09;
    ry += (my - ry) * 0.09;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  // Standard interactive elements
  document.querySelectorAll('a:not(.proj-card), button, input, textarea, select').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.classList.add('cur-hover');
      ring.classList.add('ring-hover');
    });
    el.addEventListener('mouseleave', () => {
      cur.classList.remove('cur-hover');
      ring.classList.remove('ring-hover');
    });
  });

  // Project cards — label cursor "VOIR →"
  document.querySelectorAll('.proj-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.classList.add('cur-hidden');
      ring.classList.add('ring-label');
      ring.setAttribute('data-label', el.dataset.cursorLabel || 'VOIR →');
    });
    el.addEventListener('mouseleave', () => {
      cur.classList.remove('cur-hidden');
      ring.classList.remove('ring-label');
      ring.removeAttribute('data-label');
    });
  });

  // Glass cards — subtle ring expansion
  document.querySelectorAll('.glass-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('ring-card'));
    el.addEventListener('mouseleave', () => ring.classList.remove('ring-card'));
  });
})();

// ─── MAGNETIC BUTTONS (DESKTOP ONLY) ──────────────────────────────────────
(function initMagnetic() {
  if (!IS_DESKTOP) return;

  document.querySelectorAll('.btn-primary, .btn-cv, .btn-next, .btn-back, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.28;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.22;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

// ─── NAV SHRINK ────────────────────────────────────────────────────────────
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ─── SCROLL INDICATOR (morphing circle) ───────────────────────────────────
(function initScrollIndicator() {
  const siFill  = document.getElementById('siFill');
  const siLabel = document.getElementById('siLabel');
  const siEl    = document.getElementById('scrollInd');
  if (!siFill || !siLabel || !siEl) return;

  let ticking = false;

  function update() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p   = max > 0 ? Math.min(100, (scrollY / max) * 100) : 0;
    siFill.style.setProperty('--pct', p + '%');
    siFill.style.borderRadius =
      `${50}% ${50}% ${30 + p * .2}% ${70 - p * .2}% / ${40 + Math.sin(p / 8) * 12}% ${38 + Math.cos(p / 6) * 10}% ${60 - Math.sin(p / 8) * 10}% ${50}%`;
    siLabel.textContent = p < 5 ? '↑' : Math.round(p) + '%';
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });

  siEl.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ─── MOBILE MENU ───────────────────────────────────────────────────────────
function toggleMob() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}
function closeMob() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.remove('open');
}

// ─── ADVANCED SCROLL REVEAL ────────────────────────────────────────────────
(function initScrollReveal() {
  const selector = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur';
  const els = document.querySelectorAll(selector);
  if (!els.length) return;

  // Assign stagger delays to siblings sharing the same parent
  const seen = new WeakSet();
  els.forEach(el => {
    const parent = el.parentElement;
    if (seen.has(parent)) return;
    seen.add(parent);
    const siblings = [...parent.children].filter(c => c.matches(selector));
    siblings.forEach((child, i) => {
      child.dataset.revealDelay = i * 90;
    });
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.dataset.revealDelay || '0');
      setTimeout(() => el.classList.add('visible'), delay);
      obs.unobserve(el);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
})();

// ─── 3D CARD TILT (DESKTOP ONLY) ──────────────────────────────────────────
(function initCardTilt() {
  if (!IS_DESKTOP) return;

  document.querySelectorAll('.proj-card, .glass-card, .dispo-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform .2s ease, background .3s, border-color .3s';
    });

    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const cx = (e.clientX - r.left)  / r.width  - 0.5;
      const cy = (e.clientY - r.top)   / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${cy * -6}deg) rotateY(${cx * 6}deg) translateZ(8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .5s cubic-bezier(0.34,1.56,0.64,1), background .3s, border-color .3s';
      card.style.transform  = '';
      setTimeout(() => card.style.transition = '', 500);
    });
  });
})();

// ─── STATS COUNTER ANIMATION ───────────────────────────────────────────────
(function initCounters() {
  const stats = document.querySelectorAll('.stat-n');
  if (!stats.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const em  = el.querySelector('em');
      if (!em) return;
      const suffix = em.textContent;
      const target = parseInt(el.textContent.replace(suffix, '').trim());
      if (isNaN(target)) return;
      obs.unobserve(el);

      const duration  = 1400;
      const startTime = performance.now();

      (function tick(now) {
        const t       = Math.min((now - startTime) / duration, 1);
        const eased   = 1 - Math.pow(1 - t, 3);
        const current = Math.round(eased * target);
        el.innerHTML  = current + `<em>${suffix}</em>`;
        if (t < 1) requestAnimationFrame(tick);
      })(performance.now());
    });
  }, { threshold: 0.6 });

  stats.forEach(el => obs.observe(el));
})();

// ─── HERO LETTER SPLIT ─────────────────────────────────────────────────────
(function initHeroSplit() {
  const heroName = document.querySelector('.hero-name');
  if (!heroName) return;

  // Cancel the CSS block animation — letter split takes over
  heroName.style.animation = 'none';

  setTimeout(() => {
    heroName.style.opacity = '1';
    let globalDelay = 0;

    heroName.querySelectorAll('span').forEach(span => {
      const text = span.textContent;
      const len  = text.replace(/ /g, '').length;
      span.innerHTML = text.split('').map((char, i) => {
        if (char === ' ') return ' ';
        const delay = (globalDelay + i) * 0.048;
        return `<span class="letter" style="animation-delay:${delay}s">${char}</span>`;
      }).join('');
      globalDelay += len;
    });
  }, 320);
})();

// ─── LOGO TEXT SCRAMBLE ────────────────────────────────────────────────────
(function initLogoScramble() {
  const logo = document.querySelector('.logo-name');
  if (!logo) return;
  const logoLink = logo.closest('a');
  if (!logoLink) return;

  const original = logo.textContent;
  const chars    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#&';
  let   raf = null, frame = 0, running = false;

  function scramble() {
    if (frame >= original.length * 3) {
      logo.textContent = original;
      running = false;
      return;
    }
    logo.textContent = original.split('').map((c, i) =>
      frame > i * 2.5 ? c : chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    frame++;
    raf = requestAnimationFrame(scramble);
  }

  logoLink.addEventListener('mouseenter', () => {
    if (running) return;
    running = true; frame = 0;
    raf = requestAnimationFrame(scramble);
  });
})();

// ─── PARALLAX HERO (DESKTOP ONLY) ─────────────────────────────────────────
(function initParallax() {
  if (!IS_DESKTOP) return;

  const heroContent = document.querySelector('.hero-wrap > div:first-child');
  const heroPhoto   = document.querySelector('.photo-zone');
  if (!heroContent) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = scrollY;
        heroContent.style.transform = `translateY(${y * 0.12}px)`;
        if (heroPhoto) heroPhoto.style.transform = `translateY(${y * 0.06}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();
