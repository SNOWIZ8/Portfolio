/* ==============================================
   parcours.js — Creative Animation Engine
   Arthur Viaud Portfolio — Phase 5-B Parcours
   Inclus UNIQUEMENT sur parcours.html
============================================== */

'use strict';

const isMobile  = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
const isTablet  = window.matchMedia('(max-width: 960px)').matches;
const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


// ─── 1. HERO ENTRANCE (§5B.1) ──────────────────────────────────────────────────
;(function initHeroEntrance() {
  const eyebrow  = document.getElementById('parcEyebrow');
  const title    = document.getElementById('parcTitle');
  const accroche = document.getElementById('parcAccroche');
  const flags    = document.querySelectorAll('.hero-flags .flag-item');
  const wmark    = document.getElementById('heroWatermark');

  // Fallback réduit pour prefers-reduced-motion
  if (isReduced) {
    [eyebrow, title, accroche].forEach(el => { if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }});
    flags.forEach(f => { f.style.opacity = '1'; f.style.transform = 'none'; });
    if (wmark) wmark.style.opacity = '0.022';
    return;
  }

  // t+0ms — Eyebrow : fade-in + translateX(-20px→0)
  if (eyebrow) {
    eyebrow.style.transform = 'translateX(-20px)';
    void eyebrow.offsetHeight;
    eyebrow.style.transition = 'opacity .5s ease, transform .5s ease';
    setTimeout(() => { eyebrow.style.opacity = '1'; eyebrow.style.transform = 'translateX(0)'; }, 0);
  }

  // t+200ms — Titre : révélation par masque glissant sur chaque ligne
  if (title) {
    title.style.opacity = '1'; // conteneur visible; .tl-mask-inner reste caché (translateY(110%))
    title.querySelectorAll('.tl-mask-inner').forEach((inner, i) => {
      void inner.offsetHeight;
      inner.style.transition = 'transform .7s cubic-bezier(.16,1,.3,1)';
      setTimeout(() => { inner.style.transform = 'translateY(0)'; }, 200 + i * 120);
    });
  }

  // t+550ms — Accroche
  if (accroche) {
    accroche.style.transform = 'translateY(16px)';
    void accroche.offsetHeight;
    accroche.style.transition = 'opacity .5s ease, transform .5s ease';
    setTimeout(() => { accroche.style.opacity = '1'; accroche.style.transform = 'translateY(0)'; }, 550);
  }

  // t+750ms — Flags : stagger 150ms, micro-bounce
  flags.forEach((flag, i) => {
    flag.style.transform = 'scale(.85) translateY(10px)';
    setTimeout(() => {
      flag.style.transition = 'opacity .45s ease, transform .45s cubic-bezier(.34,1.56,.64,1)';
      flag.style.opacity    = '1';
      flag.style.transform  = 'scale(1) translateY(0)';
    }, 750 + i * 150);
  });

  // t+600ms — Watermark : remonte depuis translateY(60px) + fade
  if (wmark) {
    wmark.style.transform = 'translateY(60px)';
    void wmark.offsetHeight;
    wmark.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
    setTimeout(() => { wmark.style.opacity = '0.022'; wmark.style.transform = 'translateY(0)'; }, 600);
  }
})();


// ─── 2. PARALLAX WATERMARK + TEXTE HERO AU SCROLL (§5B.1) ─────────────────────
;(function initHeroParallax() {
  if (isMobile) return;
  const wmark    = document.getElementById('heroWatermark');
  const eyebrow  = document.getElementById('parcEyebrow');
  const title    = document.getElementById('parcTitle');
  const accroche = document.getElementById('parcAccroche');

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const sy = window.scrollY;
      if (wmark)    wmark.style.transform    = `translateY(${sy * 0.18}px)`;
      [eyebrow, title, accroche].forEach(el => {
        if (el) el.style.transform = `translateY(${sy * 0.08}px)`;
      });
      ticking = false;
    });
  }, { passive: true });
})();


// ─── 3. TIMELINE — SVG DRAW + BEAM + ACTIVATION NŒUDS (§5B.2) ────────────────
;(function initTimeline() {
  const timeline = document.getElementById('tlTimeline');
  const svgEl    = document.getElementById('tlSvg');
  const lineEl   = document.getElementById('tlLine');
  const beam     = document.getElementById('tlBeam');
  const nodeFr   = document.getElementById('tlNodeFr');
  const nodeCa   = document.getElementById('tlNodeCa');
  if (!timeline || !svgEl || !lineEl) return;

  let lineLen = 1000;

  // ── Dimensions SVG (recalculé au resize) ──────────────────────────────────
  function initSvgDimensions() {
    const h = timeline.offsetHeight;
    const w = timeline.offsetWidth;
    if (h < 10) return;
    lineLen = h;
    const mobile = window.matchMedia('(max-width:960px)').matches;
    const xPos   = mobile ? 20 : Math.round(w / 2);

    svgEl.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svgEl.style.width  = '100%';
    svgEl.style.height = h + 'px';

    lineEl.setAttribute('x1', xPos);
    lineEl.setAttribute('x2', xPos);
    lineEl.setAttribute('y1', 0);
    lineEl.setAttribute('y2', h);
    lineEl.setAttribute('stroke-dasharray', h);
    if (!lineEl._drawn) lineEl.setAttribute('stroke-dashoffset', h);

    if (beam) {
      beam.style.left      = mobile ? '20px' : '50%';
      beam.style.transform = mobile ? 'translateX(-1px)' : 'translateX(-50%)';
    }
  }
  requestAnimationFrame(() => requestAnimationFrame(initSvgDimensions));
  window.addEventListener('resize', initSvgDimensions, { passive: true });

  // ── Activation nœud ───────────────────────────────────────────────────────
  function activateNode(node) {
    if (!node || node._activated) return;
    node._activated = true;
    node.classList.add('active');
    // Pic de glow passager
    const isCA = node.id === 'tlNodeCa';
    const rgb  = isCA ? '138,43,226' : '0,242,234';
    node.style.boxShadow =
      `0 0 0 6px rgba(${rgb},.22), 0 0 32px 8px rgba(${rgb},.4)`;
    setTimeout(() => { node.style.boxShadow = ''; }, 450);
  }

  // ── Mobile : IO simple à 30% ───────────────────────────────────────────────
  if (isTablet) {
    lineEl.style.transition = 'stroke-dashoffset 2s cubic-bezier(.4,0,.2,1)';
    const svgObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        svgObs.unobserve(e.target);
        lineEl._drawn = true;
        lineEl.setAttribute('stroke-dashoffset', '0');
      });
    }, { threshold: 0.3 });
    svgObs.observe(timeline);

    const nodeObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        nodeObs.unobserve(e.target);
        activateNode(e.target);
      });
    }, { threshold: 0.5 });
    if (nodeFr) nodeObs.observe(nodeFr);
    if (nodeCa) nodeObs.observe(nodeCa);
    return;
  }

  // ── Desktop : scroll drive en rAF ─────────────────────────────────────────
  (function loop() {
    const rect = timeline.getBoundingClientRect();
    const vh   = window.innerHeight;
    // Progress : 0 quand le timeline arrive en bas du viewport → 1 quand il est passé
    const raw  = (vh - rect.top) / (rect.height + vh * 0.6);
    const prog = Math.max(0, Math.min(1, raw));

    // Dessin SVG
    lineEl.setAttribute('stroke-dashoffset', lineLen * (1 - prog));

    // Beam
    if (beam) {
      const beamY = prog * Math.max(0, rect.height - 80);
      beam.style.top     = beamY + 'px';
      beam.style.opacity = prog > 0.04 ? '1' : '0';
      beam.style.background = prog > 0.5
        ? 'linear-gradient(to bottom,transparent,rgba(138,43,226,.8),transparent)'
        : 'linear-gradient(to bottom,transparent,rgba(0,242,234,.8),transparent)';

      // Activation nœuds par proximité beam
      if (nodeFr && !nodeFr._activated) {
        const ny = nodeFr.getBoundingClientRect().top - rect.top;
        if (beamY >= ny - 12) activateNode(nodeFr);
      }
      if (nodeCa && !nodeCa._activated) {
        const ny = nodeCa.getBoundingClientRect().top - rect.top;
        if (beamY >= ny - 12) activateNode(nodeCa);
      }
    }

    requestAnimationFrame(loop);
  })();
})();


// ─── 4. RÉVÉLATION DIRECTIONNELLE DES BLOCS (§5B.2.C) ────────────────────────
;(function initBlockReveal() {
  const leftBlock  = document.querySelector('.tl-block-left.tl-anim-left');
  const rightBlock = document.querySelector('.tl-block-right.tl-anim-right');
  if (!leftBlock && !rightBlock) return;

  // Pré-masquer canada-card pour son entrée propre (§5B.5)
  const canadaCard = document.getElementById('canadaCard');
  if (canadaCard) {
    canadaCard.style.opacity   = '0';
    canadaCard.style.transform = 'translateY(20px)';
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      const el = entry.target;
      const isRight = el.classList.contains('tl-anim-right');

      el.style.transition = 'opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)';
      el.style.opacity    = '1';
      el.style.transform  = 'none';

      // Stagger des éléments enfants textuels
      const staggerSel = isRight
        ? '.s5-label'
        : '.step-tag, .step-title, .step-sub, .acc-item';
      const children = [...el.querySelectorAll(staggerSel)];
      children.forEach((child, i) => {
        child.style.opacity   = '0';
        child.style.transform = 'translateY(10px)';
        setTimeout(() => {
          child.style.transition = 'opacity .45s ease, transform .45s ease';
          child.style.opacity    = '1';
          child.style.transform  = 'none';
        }, 200 + i * 60);
      });

      // Déclenchement scanner canada-card (§5B.5)
      if (isRight && canadaCard) triggerCardScanner(canadaCard);
    });
  }, { threshold: 0.12 });

  if (leftBlock)  obs.observe(leftBlock);
  if (rightBlock) obs.observe(rightBlock);
})();


// ─── 5. SCANNER CANADA CARD (§5B.5) ─────────────────────────────────────────
function triggerCardScanner(card) {
  const scanner = document.getElementById('cardScanner');

  // t+0 : entrée carte
  setTimeout(() => {
    card.style.transition = 'opacity .5s ease, transform .5s ease, border-color .3s ease';
    card.style.opacity    = '1';
    card.style.transform  = 'none';

    // t+100ms : scanner descend
    if (scanner) {
      setTimeout(() => {
        card.style.borderColor = 'rgba(0,242,234,.4)';
        scanner.style.top = '100%';

        // t+900ms : halo pulsant activé
        setTimeout(() => {
          card.style.borderColor = '';
          card.classList.add('scanning-done');
        }, 900);
      }, 100);
    }
  }, 300); // 300ms après que le bloc soit entré
}


// ─── 6. ACCORDÉON : STAGGER DE LIGNES (§5B.3) ────────────────────────────────
;(function initAccordion() {

  // Remplace toggleAcc utilisé par les onclick HTML
  window.toggleAcc = function(idx) {
    document.querySelectorAll('.acc-item').forEach((item, i) => {
      if (i === idx) {
        item.classList.contains('open') ? closeAcc(item) : openAcc(item);
      } else {
        closeAcc(item);
      }
    });
  };

  function openAcc(item) {
    item.classList.add('open');
    const content = item.querySelector('.acc-content');
    if (!content) return;

    // Segmenter le contenu si pas encore fait
    if (!content._segmented) segmentContent(content);

    // Bordure scaleX
    const border = content.querySelector('.acc-border');
    if (border) {
      border.style.transform  = 'scaleX(0)';
      void border.offsetHeight;
      border.style.transition = 'transform .3s ease';
      border.style.transform  = 'scaleX(1)';
    }

    // Stagger des segments
    content.querySelectorAll('.acc-seg').forEach((seg, i) => {
      seg.style.transition = 'none';
      seg.style.opacity    = '0';
      seg.style.transform  = 'translateY(12px)';
      void seg.offsetHeight;
      setTimeout(() => {
        seg.style.transition = 'opacity .4s ease-out, transform .4s ease-out';
        seg.style.opacity    = '1';
        seg.style.transform  = 'none';
      }, 80 * i);
    });
  }

  function closeAcc(item) {
    item.classList.remove('open');
    // Remettre les segs à zéro pour re-animation à la prochaine ouverture
    item.querySelectorAll('.acc-seg').forEach(seg => {
      seg.style.transition = 'none';
      seg.style.opacity    = '0';
      seg.style.transform  = 'translateY(12px)';
    });
  }

  function segmentContent(content) {
    content._segmented = true;
    const nodes = [...content.childNodes];
    const groups = [];
    let cur = [];

    for (let i = 0; i < nodes.length; i++) {
      const n    = nodes[i];
      const next = nodes[i + 1];
      if (n.nodeName === 'BR' && next && next.nodeName === 'BR') {
        // Double <br> = séparateur de segment
        if (cur.length) { groups.push(cur); cur = []; }
        i++; // saute le deuxième <br>
      } else if (n.nodeName !== 'BR' || cur.length) {
        cur.push(n);
      }
    }
    if (cur.length) groups.push(cur);

    // Reconstruit le contenu avec wrappers
    while (content.firstChild) content.removeChild(content.firstChild);

    const borderDiv = document.createElement('div');
    borderDiv.className = 'acc-border';
    content.appendChild(borderDiv);

    groups.forEach(group => {
      const seg = document.createElement('div');
      seg.className  = 'acc-seg';
      seg.style.cssText = 'opacity:0;transform:translateY(12px)';
      group.forEach(n => seg.appendChild(n));
      content.appendChild(seg);
    });
  }
})();


// ─── 7. PROGRESS BARS : COMPTEUR + GLOW (§5B.4) ──────────────────────────────
;(function initProgressBars() {
  const rows = document.querySelectorAll('.grade-row');
  if (!rows.length) return;

  // Réinitialise l'affichage avant animation
  rows.forEach(row => {
    const scoreEl = row.querySelector('.grade-score');
    if (scoreEl) {
      scoreEl._target   = parseFloat(scoreEl.dataset.score);
      scoreEl.textContent = '0.00';
    }
    const mention = row.querySelector('.grade-mention');
    if (mention) mention.style.opacity = '0';
    // Réinitialise la barre
    const bar = row.querySelector('.grade-bar');
    if (bar) bar.style.width = '0%';
  });

  let fired = false;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || fired) return;
      fired = true;
      obs.unobserve(entry.target);
      rows.forEach((row, i) => setTimeout(() => animateRow(row), i * 180));
    });
  }, { threshold: 0.3 });

  const gradesBlock = document.querySelector('.grades-block');
  if (gradesBlock) obs.observe(gradesBlock);

  function animateRow(row) {
    const bar     = row.querySelector('.grade-bar');
    const scoreEl = row.querySelector('.grade-score');
    const mention = row.querySelector('.grade-mention');
    if (!bar || !scoreEl) return;

    const target   = scoreEl._target || 0;
    const DURATION = 1400;
    const t0       = performance.now();

    bar.style.width     = target + '%';
    bar.style.boxShadow = '0 0 8px rgba(0,242,234,.4)';

    (function tick(now) {
      const elapsed = Math.min((now - t0) / DURATION, 1);
      const eased   = 1 - Math.pow(1 - elapsed, 3);
      scoreEl.textContent = (eased * target).toFixed(2);
      if (elapsed < 1) {
        requestAnimationFrame(tick);
      } else {
        scoreEl.textContent  = target.toFixed(2);
        bar.style.boxShadow  = '0 0 16px rgba(0,242,234,.6)';
        setTimeout(() => {
          bar.style.boxShadow = '0 0 8px rgba(0,242,234,.3)';
          if (mention) mention.style.opacity = '1';
        }, 200);
      }
    })(performance.now());
  }
})();


// ─── 8. CV BLOCK REVEAL (§5B.6) ───────────────────────────────────────────────
;(function initCvReveal() {
  const cvBlock = document.getElementById('cvBlock');
  const cvIcon  = document.getElementById('cvIcon');
  if (!cvBlock) return;

  if (cvIcon) cvIcon.style.transform = 'rotate(-5deg)';

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      cvBlock.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.34,1.56,.64,1), border-color .3s, box-shadow .3s';
      cvBlock.style.opacity    = '1';
      cvBlock.style.transform  = 'scale(1)';
      if (cvIcon) {
        cvIcon.style.transition = 'transform .6s cubic-bezier(.34,1.56,.64,1)';
        cvIcon.style.transform  = 'rotate(0deg)';
      }
    });
  }, { threshold: 0.3 });

  obs.observe(cvBlock);
})();


// ─── 9. SPOTLIGHT CURSEUR (§5B.7) ─────────────────────────────────────────────
;(function initSpotlight() {
  if (isMobile) return;
  const spotlight = document.getElementById('spotlight');
  if (!spotlight) return;

  let sx = innerWidth / 2, sy = innerHeight / 2;
  let mx = sx, my = sy;
  let curSize = 380, targetSize = 380;
  let curOpacity = 0, targetOpacity = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (targetOpacity < 0.07) targetOpacity = 0.07;
  });

  document.querySelectorAll('.glass-card, .acc-item, .canada-card, .cv-block').forEach(el => {
    el.addEventListener('mouseenter', () => { targetSize = 440; targetOpacity = 0.12; });
    el.addEventListener('mouseleave', () => { targetSize = 380; targetOpacity = 0.07; });
  });

  (function loop() {
    sx         += (mx          - sx)          * 0.10;
    sy         += (my          - sy)          * 0.10;
    curSize    += (targetSize  - curSize)     * 0.10;
    curOpacity += (targetOpacity - curOpacity) * 0.08;

    spotlight.style.background =
      `radial-gradient(circle ${Math.round(curSize)}px at ${Math.round(sx)}px ${Math.round(sy)}px, ` +
      `rgba(0,242,234,${curOpacity.toFixed(3)}), transparent 70%)`;

    requestAnimationFrame(loop);
  })();
})();


// ─── 10. CURSOR "OPEN / CLOSE" SUR ACC-TRIGGER (§5B.7) ───────────────────────
;(function initAccCursor() {
  if (isMobile) return;
  const cur  = document.getElementById('cur');
  const ring = document.getElementById('ring');
  if (!cur || !ring) return;

  document.querySelectorAll('.acc-trigger').forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
      const item  = trigger.closest('.acc-item');
      const label = item && item.classList.contains('open') ? 'CLOSE' : 'OPEN';
      cur.classList.add('cur-hidden');
      ring.classList.add('ring-label');
      ring.setAttribute('data-label', label);
      ring.style.width  = '48px';
      ring.style.height = '48px';
    });
    trigger.addEventListener('mouseleave', () => {
      cur.classList.remove('cur-hidden');
      ring.classList.remove('ring-label');
      ring.removeAttribute('data-label');
      ring.style.width  = '';
      ring.style.height = '';
    });
    // Mise à jour du label si l'accordéon change d'état pendant le hover
    trigger.addEventListener('click', () => {
      const item  = trigger.closest('.acc-item');
      const label = item && item.classList.contains('open') ? 'OPEN' : 'CLOSE';
      // après le toggle l'état a changé → inverser le label affiché
      ring.setAttribute('data-label', label);
    });
  });
})();
