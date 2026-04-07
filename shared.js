/* ==============================================
   shared.js — Composants JS communs Arthur Viaud Portfolio
   Chargé via <script src="shared.js" defer></script>
   sur toutes les pages du site.
============================================== */

/* =============================================
   CURSOR CUSTOM
   - .cursor (dot teal 10px)
   - .cursor-ring (anneau lag fluide lerp 0.11)
   - Grossit à 18px sur éléments interactifs
============================================= */
(function initCursor() {
  const cur = document.getElementById('cur');
  const ring = document.getElementById('ring');
  if (!cur || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  (function loop() {
    rx += (mx - rx) * .11;
    ry += (my - ry) * .11;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, .glass-card, input, textarea, select').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.style.width = '18px'; cur.style.height = '18px'; });
    el.addEventListener('mouseleave', () => { cur.style.width = '10px'; cur.style.height = '10px'; });
  });
})();

/* =============================================
   NAV SHRINK
   - toggle classe .scrolled sur #nav quand scrollY > 60
============================================= */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', scrollY > 60);
});

/* =============================================
   SCROLL INDICATOR (morphing circle)
   - Cercle conic-gradient teal→mauve qui se remplit selon % scroll
   - Border-radius animé (organique via sin/cos)
   - Clic → scrollTo top
============================================= */
(function initScrollIndicator() {
  const siFill = document.getElementById('siFill');
  const siLabel = document.getElementById('siLabel');
  const siEl   = document.getElementById('scrollInd');
  if (!siFill || !siLabel || !siEl) return;

  function upd() {
    const p = Math.min(100, (scrollY / (document.documentElement.scrollHeight - innerHeight)) * 100);
    siFill.style.setProperty('--pct', p + '%');
    siFill.style.borderRadius =
      `${50}% ${50}% ${30 + p * .2}% ${70 - p * .2}% / ${40 + Math.sin(p / 8) * 12}% ${38 + Math.cos(p / 6) * 10}% ${60 - Math.sin(p / 8) * 10}% ${50}%`;
    siLabel.textContent = p < 5 ? '↓' : Math.round(p) + '%';
  }

  window.addEventListener('scroll', upd);
  siEl.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* =============================================
   MOBILE MENU
   - toggleMob() / closeMob() exposées globalement
     (appelées depuis les attributs onclick HTML)
============================================= */
function toggleMob() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

function closeMob() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.remove('open');
}

/* =============================================
   SCROLL REVEAL
   - Classe .reveal → opacity:0 translateY(32px)
   - IntersectionObserver → .reveal.visible
   - Stagger 80ms sur les listes de .reveal
============================================= */
(function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: .08 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();
