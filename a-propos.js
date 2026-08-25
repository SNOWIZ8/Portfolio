/* =========================================================
   a-propos.js — V1
========================================================= */
document.documentElement.classList.add('js-ready');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover:none)').matches;

// HERO ENTRANCE
(function(){
  if(reduceMotion) return;
  const masks=[...document.querySelectorAll('.about-mask-in')];
  const enters=[...document.querySelectorAll('.about-enter')];

  requestAnimationFrame(()=>{
    masks.forEach((el,i)=>{
      setTimeout(()=>{
        el.style.transition='transform .78s cubic-bezier(.16,1,.3,1)';
        el.style.transform='translateY(0)';
      },130+i*120);
    });
    enters.forEach((el,i)=>{
      setTimeout(()=>{
        el.style.transition='opacity .58s ease, transform .72s cubic-bezier(.16,1,.3,1)';
        el.style.opacity='1';
        el.style.transform='translateY(0)';
      },90+i*170);
    });
  });
})();

// WATERMARK PARALLAX
(function(){
  if(reduceMotion) return;
  const wm=document.getElementById('aboutWatermark');
  const grid=document.getElementById('aboutHeroGrid');
  if(!wm) return;
  let ticking=false;
  addEventListener('scroll',()=>{
    if(ticking) return;
    ticking=true;
    requestAnimationFrame(()=>{
      const y=scrollY;
      wm.style.transform=`translateY(${y*.12}px)`;
      if(grid) grid.style.transform=`translateY(${y*.04}px)`;
      ticking=false;
    });
  },{passive:true});
})();

// SPOTLIGHT
(function(){
  if(isTouch || reduceMotion) return;
  const s=document.getElementById('spotlight');
  if(!s) return;
  let tx=innerWidth/2,ty=innerHeight/2,x=tx,y=ty,a=0,targetA=.055,size=390,targetSize=390;

  document.addEventListener('mousemove',e=>{
    tx=e.clientX;ty=e.clientY;targetA=.065;
  });

  document.querySelectorAll('.manifesto-card,.portrait-card,.signal-card,.mode-card,.detail-card,.focus-card,.about-cta')
    .forEach(el=>{
      el.addEventListener('mouseenter',()=>{targetA=.105;targetSize=480});
      el.addEventListener('mouseleave',()=>{targetA=.065;targetSize=390});
    });

  (function loop(){
    x+=(tx-x)*.09;y+=(ty-y)*.09;a+=(targetA-a)*.08;size+=(targetSize-size)*.08;
    s.style.background=`radial-gradient(circle ${size}px at ${x}px ${y}px,rgba(138,43,226,${a}),transparent 70%)`;
    requestAnimationFrame(loop);
  })();
})();

// SUBTLE PORTRAIT PARALLAX
(function(){
  if(isTouch || reduceMotion) return;
  const card=document.querySelector('.portrait-card');
  const img=card?.querySelector('img');
  if(!card || !img) return;

  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    img.style.transition='transform .15s ease-out';
    img.style.transform=`scale(1.035) translate(${x*-7}px,${y*-7}px)`;
  });
  card.addEventListener('mouseleave',()=>{
    img.style.transition='transform .45s cubic-bezier(.16,1,.3,1)';
    img.style.transform='scale(1) translate(0,0)';
  });
})();

// TILT SIGNAL CARDS — deliberately subtle
(function(){
  if(isTouch || reduceMotion) return;
  document.querySelectorAll('.signal-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const rx=((e.clientY-r.top)/r.height-.5)*-2.2;
      const ry=((e.clientX-r.left)/r.width-.5)*2.2;
      card.style.transform=`translateY(-6px) perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave',()=>card.style.transform='');
  });
})();
