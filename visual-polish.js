/* visual-polish.js — shared light interaction, deliberately lightweight */
'use strict';
(() => {
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if(!fine || reduce) return;

  let tx=50,ty=20,cx=50,cy=20,raf=0;
  const root=document.documentElement;
  const nav=document.getElementById('nav');
  document.addEventListener('pointermove',e=>{
    tx=(e.clientX/innerWidth)*100;ty=(e.clientY/innerHeight)*100;
    if(nav){
      const r=nav.getBoundingClientRect();
      const pct=Math.max(0,Math.min(100,((e.clientX-r.left)/r.width)*100));
      nav.style.setProperty('--nav-glare-x',`${100-pct}%`);
    }
  },{passive:true});
  const tick=()=>{
    cx+=(tx-cx)*.055;cy+=(ty-cy)*.055;
    root.style.setProperty('--pointer-x',cx+'%');root.style.setProperty('--pointer-y',cy+'%');
    raf=requestAnimationFrame(tick);
  };
  raf=requestAnimationFrame(tick);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else raf=requestAnimationFrame(tick)});
})();
