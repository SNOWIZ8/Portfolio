/* ==============================================
   home.js — Homepage V1 · 2026
   Motion deliberately restrained: no scroll hijacking.
============================================== */
'use strict';

const HOME_DESKTOP = window.matchMedia('(hover:hover) and (min-width:961px)').matches;
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1) Entrée immédiate : pas de faux loader.
requestAnimationFrame(() => triggerHeroEntrance());

// 2) Entrée hero séquencée au premier rendu.
function triggerHeroEntrance(){
  const sequence = [
    ['heroKicker', 0, 'translateY(14px)'],
    ['heroName', 90, 'translateX(-24px)'],
    ['heroRole', 190, 'translateY(12px)'],
    ['heroLead', 280, 'translateY(12px)'],
    ['heroActions', 380, 'translateY(10px)'],
    ['heroMeta', 450, 'translateY(8px)'],
    ['heroPhotoZone', 240, 'translateY(14px) scale(.975)']
  ];
  sequence.forEach(([id,delay,from]) => {
    const el = document.getElementById(id);
    if(!el) return;
    el.style.transform = from;
    el.style.transition = 'none';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = 'opacity .62s cubic-bezier(.2,.8,.2,1), transform .72s cubic-bezier(.2,.8,.2,1)';
      setTimeout(() => { el.style.opacity='1'; el.style.transform='none'; }, delay);
    }));
  });
}

// 3) Parallax très léger : identité créative sans nuire à la lecture.
(function initHeroParallax(){
  if(!HOME_DESKTOP || REDUCED_MOTION) return;
  const grid = document.getElementById('heroGridLayer');
  const halos = document.getElementById('heroHalos');
  const copy = document.getElementById('heroTextCol');
  const visual = document.getElementById('heroPhotoZone');
  let mx=0,my=0,cx=0,cy=0,scroll=0;

  document.addEventListener('mousemove',e=>{
    mx=(e.clientX/window.innerWidth-.5);
    my=(e.clientY/window.innerHeight-.5);
  },{passive:true});
  window.addEventListener('scroll',()=>{scroll=window.scrollY;},{passive:true});

  function frame(){
    cx += (mx-cx)*.06; cy += (my-cy)*.06;
    const limited = Math.min(scroll, window.innerHeight * .9);
    if(grid) grid.style.transform=`translate(${cx*8}px, ${cy*7+limited*.06}px)`;
    if(halos) halos.style.transform=`translate(${cx*18}px, ${cy*15+limited*.08}px)`;
    if(copy) copy.style.transform=`translate(${cx*3}px, ${cy*3+limited*.035}px)`;
    if(visual) visual.style.transform=`translate(${-cx*8}px, ${-cy*7+limited*.018}px)`;
    requestAnimationFrame(frame);
  }
  setTimeout(() => requestAnimationFrame(frame), 1450);
})();

// 4) Spotlight discret uniquement desktop.
(function initHomeSpotlight(){
  if(!HOME_DESKTOP || REDUCED_MOTION) return;
  const spot=document.getElementById('spotlight');
  if(!spot) return;
  let mx=innerWidth/2,my=innerHeight/2,x=mx,y=my;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;},{passive:true});
  function loop(){
    x+=(mx-x)*.085;y+=(my-y)*.085;
    spot.style.background=`radial-gradient(circle 360px at ${x}px ${y}px, rgba(0,242,234,.055), transparent 72%)`;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

// 5) Compteurs simples : les chiffres existent déjà dans le DOM, donc aucune perte sans JS.
(function initProofCounters(){
  if(REDUCED_MOTION) return;
  const els=[...document.querySelectorAll('[data-count]')];
  if(!els.length) return;
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      const el=entry.target;
      const target=Number(el.dataset.count);
      if(!Number.isFinite(target)) return;
      const start=performance.now();
      const duration=target>100 ? 900 : 700;
      function tick(now){
        const t=Math.min(1,(now-start)/duration);
        const eased=1-Math.pow(1-t,3);
        el.textContent=Math.round(target*eased).toLocaleString('fr-FR');
        if(t<1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  },{threshold:.65});
  els.forEach(el=>obs.observe(el));
})();

// 6) Gestion vidéo : pause hors écran pour éviter des décodages inutiles.
(function initVideoLifecycle(){
  const videos=[...document.querySelectorAll('.page-home video')];
  if(!videos.length) return;
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      const v=entry.target;
      if(entry.isIntersecting){
        const p=v.play(); if(p && p.catch) p.catch(()=>{});
      } else {
        v.pause();
      }
    });
  },{rootMargin:'180px 0px',threshold:.05});
  videos.forEach(v=>obs.observe(v));
})();

// 7) Accessibilité clavier : jouer les previews d'interviews au focus.
document.querySelectorAll('.interview-card').forEach(card=>{
  const video=card.querySelector('video');
  if(!video) return;
  card.addEventListener('focus',()=>video.play().catch(()=>{}));
});
