/* ==============================================
   home.js — Creative Animation Engine
   Arthur Viaud Portfolio — Phase 5 Homepage
   Inclus UNIQUEMENT sur index.html
============================================== */

'use strict';

// ─── DEVICE DETECTION ──────────────────────────────────────────────────────────
const HOME_IS_MOBILE = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
const HOME_IS_SMALL  = window.matchMedia('(max-width: 768px)').matches;
const HOME_REDUCED   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── STATE PARTAGÉ PARALLAX ────────────────────────────────────────────────────
// Évite plusieurs rAF loops pour les couches hero
const heroState = {
  scrollY: 0,
  // mouse (normalisé -0.5..0.5)
  mx: 0, my: 0,
  // lerped (pixels) par couche
  gx: 0, gy: 0,  // grid layer
  hx: 0, hy: 0,  // halos
  tx: 0, ty: 0,  // text
  px: 0, py: 0,  // photo
};

// ─── 1. LOADING SCREEN ─────────────────────────────────────────────────────────
;(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Bloquer le scroll pendant le chargement
  document.body.style.overflow = 'hidden';

  const fill = document.getElementById('loader-fill');
  const LETTER_DELAY_EACH = 30; // ms entre chaque lettre
  const LETTERS_COUNT     = 7;
  const LETTERS_DONE_AT   = LETTERS_COUNT * LETTER_DELAY_EACH + 350; // ~560ms
  const BAR_DURATION      = HOME_IS_MOBILE ? 0 : 1100; // ms

  function dismissLoader() {
    loader.classList.add('dismissing');
    setTimeout(() => {
      loader.style.display = 'none';
      document.body.style.overflow = '';
      // Déclencher la séquence d'entrée du hero (§5.3)
      triggerHeroEntrance();
    }, 680);
  }

  if (HOME_IS_MOBILE || HOME_REDUCED) {
    // Mobile : juste logo + fade simple
    setTimeout(dismissLoader, LETTERS_DONE_AT + 500);
    return;
  }

  // Desktop : animer la barre de progression
  let barStart = null;
  function animateBar(ts) {
    if (!barStart) barStart = ts;
    const progress = Math.min((ts - barStart) / BAR_DURATION, 1);
    if (fill) fill.style.width = (progress * 100) + '%';
    if (progress < 1) {
      requestAnimationFrame(animateBar);
    } else {
      dismissLoader();
    }
  }

  // Démarrer la barre après que les lettres soient apparues
  setTimeout(() => requestAnimationFrame(animateBar), LETTERS_DONE_AT);
})();


// ─── 2. HERO ENTRANCE SEQUENCE (§5.3) ─────────────────────────────────────────
function triggerHeroEntrance() {
  const eyebrow  = document.getElementById('heroEyebrow');
  const nameEl   = document.getElementById('heroName');
  const tagline  = document.getElementById('heroTagline');
  const btns     = document.getElementById('heroBtns');
  const photo    = document.getElementById('heroPhotoZone');
  const statsBar = document.getElementById('statsBar');

  // Helper : transition fade + transform sur un élément
  function reveal(el, delay, fromTransform, dur = '0.5s', easing = 'ease') {
    if (!el) return;
    el.style.transition = 'none';
    el.style.transform  = fromTransform;
    // forcer reflow
    void el.offsetHeight;
    el.style.transition = `opacity ${dur} ${easing}, transform ${dur} ${easing}`;
    setTimeout(() => {
      el.style.opacity   = '1';
      el.style.transform = 'none';
    }, delay);
  }

  // t+0ms — Eyebrow
  reveal(eyebrow, 0, 'translateY(20px)', '0.5s');

  // t+150ms — "Arthur" : slide depuis la gauche + skewX
  // t+300ms — "Viaud"  : slide depuis la droite
  if (nameEl) {
    const lines = nameEl.querySelectorAll('.hn-line, .hn-solid, .hn-stroke, .hn-teal');
    // On anime les deux grands blocs de ligne
    const arthur = nameEl.querySelector('.hn-solid');
    const viaud  = nameEl.querySelector('.hn-line:last-child');

    if (arthur) {
      arthur.style.opacity   = '0';
      arthur.style.transition = 'none';
      arthur.style.transform  = 'translateX(-40px) skewX(-3deg)';
      void arthur.offsetHeight;
      arthur.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
      setTimeout(() => {
        arthur.style.opacity   = '1';
        arthur.style.transform = 'translateX(0) skewX(0deg)';
      }, 150);
    }
    if (viaud) {
      viaud.style.opacity   = '0';
      viaud.style.transition = 'none';
      viaud.style.transform  = 'translateX(40px) skewX(3deg)';
      void viaud.offsetHeight;
      viaud.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
      setTimeout(() => {
        viaud.style.opacity   = '1';
        viaud.style.transform = 'translateX(0) skewX(0deg)';
      }, 300);
    }
    nameEl.style.opacity = '1'; // révéler le container
  }

  // t+500ms — Tagline
  reveal(tagline, 500, 'translateY(15px)', '0.5s');

  // t+700ms — Boutons CTA
  reveal(btns, 700, 'scale(0.94)', '0.4s', 'cubic-bezier(0.34,1.56,0.64,1)');

  // t+900ms — Photo : fade + scale + pulse halo
  if (photo) {
    photo.style.transition = 'none';
    photo.style.transform  = 'scale(0.96)';
    void photo.offsetHeight;
    photo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      photo.style.opacity   = '1';
      photo.style.transform = 'none';
      // Pulse halo mauve sur le cadre
      const frame = document.getElementById('photoFrame');
      if (frame) {
        frame.style.transition = 'box-shadow 0.4s ease';
        frame.style.boxShadow  = '0 0 40px 8px rgba(138,43,226,0.22)';
        setTimeout(() => { frame.style.boxShadow = ''; }, 1000);
      }
    }, 900);
  }

  // t+1100ms — Stats bar : stagger colonnes
  if (statsBar) {
    // Préparer les items à opacity:0 avant que le parent devienne visible → pas de flash
    const items = statsBar.querySelectorAll('.stat-item');
    items.forEach(item => {
      item.style.opacity   = '0';
      item.style.transform = 'translateY(20px)';
    });
    statsBar.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      statsBar.style.opacity = '1'; // parent visible, items déjà masqués individuellement
      items.forEach((item, i) => {
        item.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
        setTimeout(() => {
          item.style.opacity   = '1';
          item.style.transform = 'translateY(0)';
        }, i * 80);
      });
    }, 1100);
  }
}


// ─── 3. HERO PARALLAX — MOUSE + SCROLL (§5.2) ──────────────────────────────────
;(function initHeroParallax() {
  const gridLayer = document.getElementById('heroGridLayer');
  const halosEl   = document.getElementById('heroHalos');
  const textCol   = document.getElementById('heroTextCol');
  const photoZone = document.getElementById('heroPhotoZone');
  const gridOvl   = document.getElementById('gridOverlay');

  if (!textCol) return;

  const AMP = HOME_IS_SMALL ? 0.5 : 1;

  // Mise à jour scroll
  window.addEventListener('scroll', () => {
    heroState.scrollY = window.scrollY;
  }, { passive: true });

  // Mise à jour souris (desktop uniquement)
  if (!HOME_IS_MOBILE) {
    document.addEventListener('mousemove', e => {
      heroState.mx = (e.clientX / innerWidth)  - 0.5;
      heroState.my = (e.clientY / innerHeight) - 0.5;
    });
  }

  ;(function loop() {
    const s = heroState;
    const sy = s.scrollY * AMP;

    if (!HOME_IS_MOBILE) {
      // Lerp mouse offsets (fluidité)
      s.gx += (s.mx * 8  - s.gx) * 0.08;
      s.gy += (s.my * 8  - s.gy) * 0.08;
      s.hx += (s.mx * 20 - s.hx) * 0.08;
      s.hy += (s.my * 20 - s.hy) * 0.08;
      s.tx += (s.mx * 5  - s.tx) * 0.08;
      s.ty += (s.my * 5  - s.ty) * 0.08;
      s.px += (-s.mx * 12 - s.px) * 0.08; // direction opposée
      s.py += (-s.my * 12 - s.py) * 0.08;
    }

    // Couche 1 — grille : vitesse scroll 0.15
    if (gridLayer) {
      gridLayer.style.transform = `translate(${s.gx}px, ${s.gy + sy * 0.15}px)`;
    }
    // Couche 2 — halos : vitesse scroll 0.3
    if (halosEl) {
      halosEl.style.transform = `translate(${s.hx}px, ${s.hy + sy * 0.3}px)`;
    }
    // Couche 3 — texte : vitesse scroll 0.25
    if (textCol) {
      textCol.style.transform = `translate(${s.tx}px, ${s.ty + sy * 0.25}px)`;
    }
    // Couche 4 — photo : vitesse scroll 0.12 (plus lente → effet recul)
    if (photoZone) {
      photoZone.style.transform = `translate(${s.px}px, ${s.py + sy * 0.12}px)`;
    }
    // Grid overlay
    if (gridOvl) {
      gridOvl.style.transform = `translateY(${sy * 0.05}px)`;
    }

    requestAnimationFrame(loop);
  })();
})();


// ─── 4. SPOTLIGHT CURSEUR (§5.4) ───────────────────────────────────────────────
;(function initSpotlight() {
  if (HOME_IS_MOBILE) return;

  const spotlight = document.getElementById('spotlight');
  if (!spotlight) return;

  let sx = innerWidth / 2, sy = innerHeight / 2;
  let mx = sx, my = sy;
  let curSize = 380, targetSize = 380;
  let curOpacity = 0, targetOpacity = 0.07; // fade-in progressif

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  // Sur éléments magnétiques / cartes → spotlight plus large
  function addSpotlightListeners() {
    document.querySelectorAll('.magnetic, .proj-card, .glass-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        targetSize    = 440;
        targetOpacity = 0.12;
      });
      el.addEventListener('mouseleave', () => {
        targetSize    = 380;
        targetOpacity = 0.07;
      });
    });
  }
  addSpotlightListeners();

  ;(function loop() {
    sx         += (mx          - sx)         * 0.10;
    sy         += (my          - sy)         * 0.10;
    curSize    += (targetSize  - curSize)    * 0.10;
    curOpacity += (targetOpacity - curOpacity) * 0.08;

    spotlight.style.background =
      `radial-gradient(circle ${Math.round(curSize)}px at ${Math.round(sx)}px ${Math.round(sy)}px, ` +
      `rgba(0,242,234,${curOpacity.toFixed(3)}), transparent 70%)`;

    requestAnimationFrame(loop);
  })();
})();


// ─── 5. CURSEUR I-BEAM SUR LIENS TEXTE ─────────────────────────────────────────
;(function initCursorIBeam() {
  if (HOME_IS_MOBILE) return;

  const cur  = document.getElementById('cur');
  const ring = document.getElementById('ring');
  if (!cur || !ring) return;

  // Liens texte (pas des cartes ni boutons) → curseur I-beam fin
  document.querySelectorAll('p a, .hero-tagline a, .f-links a, .nav-links a').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.width        = '2px';
      cur.style.height       = '22px';
      cur.style.borderRadius = '2px';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.width        = '';
      cur.style.height       = '';
      cur.style.borderRadius = '';
    });
  });
})();


// ─── 6. MAGNÉTISME BOUTONS ÉTENDU (§5.5) ───────────────────────────────────────
;(function initMagneticButtons() {
  if (HOME_IS_MOBILE) return;

  const ring = document.getElementById('ring');

  document.querySelectorAll('.magnetic').forEach(btn => {
    const ZONE   = 80;   // px de zone d'attraction autour du bouton
    const FACTOR = 0.35;

    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * FACTOR;
      const dy = (e.clientY - (r.top  + r.height / 2)) * FACTOR;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;

      if (ring) {
        ring.classList.add('ring-hover');
      }
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      if (ring) ring.classList.remove('ring-hover');
    });
  });
})();


// ─── 7. STATS — SLOT MACHINE (§5.6) ────────────────────────────────────────────
;(function initSlotMachine() {
  const statEls = document.querySelectorAll('.stat-n[data-slot-target]');
  if (!statEls.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      const el     = entry.target;
      const target = parseInt(el.dataset.slotTarget, 10);
      const suffix = el.dataset.slotSuffix || '';
      const delay  = parseInt(el.dataset.slotDelay  || '0', 10);
      setTimeout(() => animateSlot(el, target, suffix), delay);
    });
  }, { threshold: 0.3 });

  statEls.forEach((el, i) => {
    el.dataset.slotDelay = (i * 120).toString();
    obs.observe(el);
  });

  function animateSlot(el, target, suffix) {
    const displayEl = el.querySelector('.slot-display');
    if (!displayEl) return;

    // Construire le rouleau : chiffres aléatoires + chiffre cible à la fin
    const digits = [];
    const EXTRA  = HOME_IS_MOBILE ? 6 : 14; // tours de rouleau
    for (let i = 0; i < EXTRA; i++) {
      digits.push(Math.floor(Math.random() * 10));
    }
    digits.push(target);

    // Créer la structure DOM
    const slotWindow = document.createElement('span');
    slotWindow.className = 'slot-window';

    const reel = document.createElement('span');
    reel.className = 'slot-reel';

    digits.forEach(d => {
      const span = document.createElement('span');
      span.className  = 'slot-digit';
      span.textContent = d;
      reel.appendChild(span);
    });

    slotWindow.appendChild(reel);
    displayEl.replaceWith(slotWindow);

    // Hauteur d'un digit (force reflow)
    const DIGIT_H = reel.firstElementChild
      ? reel.firstElementChild.getBoundingClientRect().height || 56
      : 56;
    const totalTravel = (digits.length - 1) * DIGIT_H;

    // Animation ease-out quartic
    const DURATION = HOME_IS_MOBILE ? 900 : 1200;
    const startTs  = performance.now();

    ;(function tick(now) {
      const t      = Math.min((now - startTs) / DURATION, 1);
      const eased  = 1 - Math.pow(1 - t, 4); // ease-out quartic
      reel.style.transform = `translateY(${-eased * totalTravel}px)`;
      if (t < 1) {
        requestAnimationFrame(tick);
      }
    })(performance.now());

    // Suffixe apparaît après stabilisation
    const em = el.querySelector('em');
    if (em) {
      setTimeout(() => em.classList.add('visible'), DURATION + 150);
    }
  }
})();


// ─── 8. HORIZONTAL SCROLL — PROJETS (§5.8 + Fix 1) ────────────────────────────
;(function initHorizontalScroll() {
  if (HOME_IS_SMALL) return; // mobile → scroll snap CSS natif

  const section    = document.getElementById('projets');
  const inner      = document.getElementById('projInner');
  const scrollFill = document.getElementById('projScrollFill');
  const badge      = document.getElementById('scrollContinueBadge');
  const counter    = document.getElementById('projCounter');
  if (!section || !inner) return;

  let currentX   = 0;
  let badgeShown = false;

  // ── Fix 1 : hauteur dynamique calculée sur l'overflow réel ──────────────────
  function setDynamicHeight() {
    const scrollable = Math.max(0, inner.scrollWidth - window.innerWidth);
    // Réserve exactement l'overflow + une viewport height (zéro dead zone)
    section.style.height = (scrollable + window.innerHeight) + 'px';
  }
  // Attendre que le layout soit stabilisé (fonts + images)
  requestAnimationFrame(() => requestAnimationFrame(setDynamicHeight));
  window.addEventListener('resize', setDynamicHeight, { passive: true });

  // ── rAF loop ─────────────────────────────────────────────────────────────────
  ;(function loop() {
    const totalInnerW    = inner.scrollWidth;
    const vw             = window.innerWidth;
    const scrollable     = Math.max(0, totalInnerW - vw);

    const sectionTop     = section.getBoundingClientRect().top + window.scrollY;
    const sectionH       = section.offsetHeight;
    const scrollDistance = sectionH - window.innerHeight;

    const scrolled   = Math.max(0, window.scrollY - sectionTop);
    const progress   = scrollDistance > 0
      ? Math.min(1, scrolled / scrollDistance)
      : 0;

    const targetX = -progress * scrollable;
    currentX     += (targetX - currentX) * 0.12;

    inner.style.transform = `translateX(${currentX}px)`;

    // Barre de progression
    if (scrollFill) scrollFill.style.width = (progress * 100) + '%';

    // Compteur "X / 3"
    if (counter) {
      const cardCount = inner.querySelectorAll('.proj-card').length;
      const visible   = Math.min(cardCount, Math.floor(progress * cardCount + 0.15) + 1);
      counter.textContent = `${visible} / ${cardCount}`;
      counter.style.color = progress >= 0.95 ? 'var(--teal)' : '';
    }

    // Badge "↓ Continuer"
    if (badge) {
      if (progress >= 0.85 && !badgeShown) {
        badgeShown = true;
        badge.classList.add('visible');
      } else if (progress < 0.82 && badgeShown) {
        badgeShown = false;
        badge.classList.remove('visible');
      }
    }

    requestAnimationFrame(loop);
  })();
})();


// ─── 9. PROJ CARDS — 3D TILT + GLARE (§5.8) ────────────────────────────────────
;(function initProjCardTilt() {
  if (HOME_IS_MOBILE) return;

  document.querySelectorAll('.proj-card').forEach(card => {
    const glare = card.querySelector('.proj-glare');

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'border-color 0.3s, box-shadow 0.3s';
    });

    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const cx  = (e.clientX - r.left) / r.width  - 0.5; // -0.5..0.5
      const cy  = (e.clientY - r.top)  / r.height - 0.5;

      // Rotation 3D
      card.style.transform =
        `perspective(1000px) rotateX(${cy * -8}deg) rotateY(${cx * 12}deg) translateZ(10px)`;

      // Glare : position en % dans la carte
      if (glare) {
        const gx = ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%';
        const gy = ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%';
        glare.style.setProperty('--gx', gx);
        glare.style.setProperty('--gy', gy);
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition =
        'transform 0.6s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, box-shadow 0.3s';
      card.style.transform = '';
      setTimeout(() => { card.style.transition = ''; }, 600);
    });
  });
})();


// ─── 10. PHOTO ZONE — PARTICULES FLOTTANTES (§5.9) ─────────────────────────────
;(function initPhotoParticles() {
  const container = document.getElementById('phParticles');
  if (!container) return;

  const COUNT  = 10;
  const COLORS = ['var(--teal)', 'rgba(138,43,226,0.8)', 'rgba(0,242,234,0.5)'];

  for (let i = 0; i < COUNT; i++) {
    const dot = document.createElement('div');
    dot.className = 'ph-particle';

    const size  = (Math.random() * 3 + 2).toFixed(1);   // 2–5px
    const x     = (Math.random() * 80 + 10).toFixed(1); // 10–90%
    const y     = (Math.random() * 80 + 10).toFixed(1);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const dur   = (Math.random() * 4 + 4).toFixed(1);   // 4–8s
    const del   = (Math.random() * 5).toFixed(2);        // 0–5s

    dot.style.cssText =
      `width:${size}px;height:${size}px;` +
      `left:${x}%;top:${y}%;` +
      `background:${color};` +
      `--dur:${dur}s;--del:-${del}s;` +
      `opacity:${(Math.random() * 0.4 + 0.3).toFixed(2)};` +
      `filter:blur(0.5px);`;

    container.appendChild(dot);
  }
})();


// ─── 11. DISPO CARDS — STAGGER REVEAL DEPUIS LES CÔTÉS ─────────────────────────
// (Géré par shared.js reveal-left / reveal-right, mais on renforce la DA)
;(function initDispoCards() {
  const prime = document.querySelector('.dispo-card.prime');
  if (!prime) return;

  // Pulse halo au hover pour la carte prime
  prime.addEventListener('mouseenter', () => {
    prime.style.boxShadow = '0 0 40px 12px rgba(0,242,234,0.14)';
  });
  prime.addEventListener('mouseleave', () => {
    prime.style.boxShadow = '';
  });
})();


// ─── 12. CURSOR RING "VIEW" SUR PROJ CARDS ─────────────────────────────────────
// Complément à shared.js — s'assure que le texte VIEW est en anglais sur la home
;(function initProjCardCursor() {
  if (HOME_IS_MOBILE) return;
  const ring = document.getElementById('ring');
  if (!ring) return;

  document.querySelectorAll('.proj-card').forEach(card => {
    card.dataset.cursorLabel = 'VIEW';
  });
})();
