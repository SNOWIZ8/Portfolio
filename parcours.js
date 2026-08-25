/* =========================================================
   parcours.js — V3
   Nouveau moteur d'animation construit à partir des principes
   techniques de l'ancienne page : masques, ligne dessinée,
   beam, reveals directionnels, scanner et spotlight.
========================================================= */

document.documentElement.classList.add('js-ready');

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none)').matches;

// ---------- HERO ENTRANCE ----------
(function heroEntrance(){
  if (prefersReduced) return;

  const masks = [...document.querySelectorAll('.p-mask-in')];
  const enters = [...document.querySelectorAll('.p-hero-enter')];

  requestAnimationFrame(() => {
    masks.forEach((el, i) => {
      setTimeout(() => {
        el.style.transition = 'transform .78s cubic-bezier(.16,1,.3,1)';
        el.style.transform = 'translateY(0)';
      }, 120 + i * 115);
    });

    enters.forEach((el, i) => {
      setTimeout(() => {
        el.style.transition = 'opacity .58s ease, transform .7s cubic-bezier(.16,1,.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 80 + i * 170);
    });
  });
})();

// ---------- HERO PARALLAX ----------
(function heroParallax(){
  if (prefersReduced) return;

  const wm = document.getElementById('pWatermark');
  const grid = document.getElementById('pHeroGrid');
  if (!wm) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      wm.style.transform = `translateY(${y * .12}px)`;
      if (grid) grid.style.transform = `translateY(${y * .045}px)`;
      ticking = false;
    });
  }, { passive:true });
})();

// ---------- TRAJECTORY LINE + BEAM ----------
(function trajectoryEngine(){
  const wrap = document.getElementById('trajectory');
  const progress = document.getElementById('trProgress');
  const beam = document.getElementById('trBeam');
  const nodes = [...document.querySelectorAll('[data-node]')];
  if (!wrap || !progress || !beam) return;

  // pathLength=1-like behavior using actual length
  function prepLine(){
    const len = progress.getTotalLength ? progress.getTotalLength() : 1000;
    progress.style.strokeDasharray = len;
    progress.style.strokeDashoffset = len;
    progress.dataset.len = len;
  }
  prepLine();

  function update(){
    const rect = wrap.getBoundingClientRect();
    const vh = innerHeight;

    // progress begins when top reaches ~70% viewport, ends when bottom reaches ~30%
    const total = rect.height + vh * .4;
    const passed = vh * .7 - rect.top;
    const p = Math.max(0, Math.min(1, passed / total));
    const len = parseFloat(progress.dataset.len || 1000);

    progress.style.strokeDashoffset = len * (1 - p);

    const beamTop = Math.max(0, Math.min(rect.height - 110, rect.height * p - 55));
    beam.style.top = beamTop + 'px';
    beam.style.opacity = p > .015 && p < .985 ? '1' : '0';

    nodes.forEach(node => {
      const nr = node.getBoundingClientRect();
      if (nr.top < vh * .58) node.classList.add('active');
      else node.classList.remove('active');
    });
  }

  window.addEventListener('scroll', update, { passive:true });
  window.addEventListener('resize', () => { prepLine(); update(); });
  update();
})();

// ---------- DIRECTIONAL REVEALS ----------
(function cardReveals(){
  const cards = [...document.querySelectorAll('.tr-card')];
  if (!cards.length) return;
  if (prefersReduced) {
    cards.forEach(c => { c.style.opacity='1'; c.style.transform='none'; });
    return;
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      const el = entry.target;
      el.style.transition = 'opacity .62s ease, transform .72s cubic-bezier(.16,1,.3,1), border-color .32s, background .32s, box-shadow .32s';
      el.style.opacity = '1';
      el.style.transform = 'translateX(0)';
    });
  }, { threshold:.16 });

  cards.forEach(c => obs.observe(c));
})();

// ---------- DIPLOMA SCANNERS ----------
(function diplomaScans(){
  const cards = [...document.querySelectorAll('[data-scan]')];
  if (!cards.length || prefersReduced) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);

      const card = entry.target;
      const scan = card.querySelector('.scanline');
      if (!scan) return;

      scan.style.opacity = '1';
      scan.style.top = '-4px';
      scan.style.transition = 'top 1.05s cubic-bezier(.4,0,.2,1), opacity .25s';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scan.style.top = 'calc(100% + 4px)');
      });

      setTimeout(() => {
        scan.style.opacity = '0';
        card.style.transition = 'box-shadow .5s ease, border-color .4s ease';
        card.style.boxShadow = card.classList.contains('ca')
          ? '0 0 34px rgba(138,43,226,.08)'
          : '0 0 34px rgba(0,242,234,.07)';
      }, 1100);
    });
  }, { threshold:.28 });

  cards.forEach(c => obs.observe(c));
})();

// ---------- SIMPLE REVEALS FOR LOWER SECTIONS ----------
(function lowerReveals(){
  const els = [...document.querySelectorAll('.transfer-card, #pCta')];
  if (!els.length || prefersReduced) return;

  els.forEach(el => {
    el.style.opacity='0';
    el.style.transform='translateY(28px)';
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      entry.target.style.transition='opacity .6s ease, transform .7s cubic-bezier(.16,1,.3,1)';
      entry.target.style.opacity='1';
      entry.target.style.transform='translateY(0)';
    });
  }, {threshold:.15});

  els.forEach(el => obs.observe(el));
})();

// ---------- SPOTLIGHT ----------
(function spotlight(){
  if (isTouch || prefersReduced) return;
  const spot = document.getElementById('spotlight');
  if (!spot) return;

  let tx=innerWidth/2, ty=innerHeight/2, x=tx, y=ty;
  let targetA=.055, a=0, targetSize=380, size=380;

  document.addEventListener('mousemove', e => {
    tx=e.clientX; ty=e.clientY; targetA=.065;
  });

  document.querySelectorAll('.tr-card,.diploma-card,.transfer-card,.p-cta').forEach(el => {
    el.addEventListener('mouseenter',()=>{targetSize=470;targetA=.105});
    el.addEventListener('mouseleave',()=>{targetSize=380;targetA=.065});
  });

  (function loop(){
    x += (tx-x)*.09;
    y += (ty-y)*.09;
    a += (targetA-a)*.08;
    size += (targetSize-size)*.08;
    spot.style.background=`radial-gradient(circle ${size}px at ${x}px ${y}px, rgba(0,242,234,${a}), transparent 70%)`;
    requestAnimationFrame(loop);
  })();
})();

// ---------- CURSOR LABEL ON PROJECT LINKS ----------
(function projectCursor(){
  if (isTouch) return;
  const cur=document.getElementById('cur');
  const ring=document.getElementById('ring');
  if (!cur || !ring) return;

  document.querySelectorAll('a.tr-card').forEach(link=>{
    link.addEventListener('mouseenter',()=>{
      cur.style.opacity='0';
      ring.style.width='52px';
      ring.style.height='52px';
      ring.setAttribute('data-label','OPEN');
      ring.style.display='flex';
      ring.style.alignItems='center';
      ring.style.justifyContent='center';
      ring.style.fontSize='8px';
      ring.style.letterSpacing='1px';
      ring.style.color='var(--teal)';
    });
    link.addEventListener('mouseleave',()=>{
      cur.style.opacity='';
      ring.style.width='';
      ring.style.height='';
      ring.removeAttribute('data-label');
      ring.style.display='';
      ring.style.alignItems='';
      ring.style.justifyContent='';
      ring.style.fontSize='';
      ring.style.letterSpacing='';
      ring.style.color='';
    });
  });

  // data-label via pseudo-element isn't guaranteed in shared.css, inject actual text with CSS var-like attr support
  const style=document.createElement('style');
  style.textContent='.cursor-ring[data-label]::after{content:attr(data-label);font-family:"DM Sans",sans-serif;font-size:8px;letter-spacing:1px;color:var(--teal)}';
  document.head.appendChild(style);
})();
