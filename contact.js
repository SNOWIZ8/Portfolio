/* =========================================================
   contact.js — V1
========================================================= */
document.documentElement.classList.add('js-ready');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover:none)').matches;

// HERO
(function(){
  if(reduceMotion) return;
  const masks=[...document.querySelectorAll('.c-mask-in')];
  const enters=[...document.querySelectorAll('.c-enter')];

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

// HERO PARALLAX
(function(){
  if(reduceMotion) return;
  const wm=document.getElementById('cWatermark');
  const grid=document.getElementById('cGrid');
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
  const spot=document.getElementById('spotlight');
  if(!spot) return;

  let tx=innerWidth/2,ty=innerHeight/2,x=tx,y=ty,a=0,targetA=.05,size=390,targetSize=390;
  document.addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;targetA=.065});

  document.querySelectorAll('.direct-card,.message-card,.next-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{targetA=.105;targetSize=470});
    el.addEventListener('mouseleave',()=>{targetA=.065;targetSize=390});
  });

  (function loop(){
    x+=(tx-x)*.09;y+=(ty-y)*.09;a+=(targetA-a)*.08;size+=(targetSize-size)*.08;
    spot.style.background=`radial-gradient(circle ${size}px at ${x}px ${y}px,rgba(0,242,234,${a}),transparent 70%)`;
    requestAnimationFrame(loop);
  })();
})();

// COPY EMAIL
(function(){
  const btn=document.getElementById('copyEmail');
  if(!btn) return;

  btn.addEventListener('click',async()=>{
    const email='arthurviaudpro@gmail.com';
    const previous=btn.textContent;
    try{
      await navigator.clipboard.writeText(email);
      btn.textContent='Adresse copiée ✓';
    }catch(e){
      const input=document.createElement('input');
      input.value=email;document.body.appendChild(input);input.select();
      document.execCommand('copy');input.remove();
      btn.textContent='Adresse copiée ✓';
    }
    setTimeout(()=>btn.textContent=previous,1700);
  });
})();

// MAILTO FORM — no backend, no stored data
(function(){
  const form=document.getElementById('contactForm');
  if(!form) return;

  form.addEventListener('submit',e=>{
    e.preventDefault();

    const name=document.getElementById('name')?.value.trim() || '';
    const company=document.getElementById('company')?.value.trim() || '';
    const subject=document.getElementById('subject')?.value || 'Contact portfolio';
    const message=document.getElementById('message')?.value.trim() || '';

    const fullSubject = company ? `${subject} — ${company}` : subject;

    let body='';
    if(name) body += `Bonjour Arthur,\n\nJe suis ${name}${company ? ` de ${company}` : ''}.\n\n`;
    else body += 'Bonjour Arthur,\n\n';
    body += message || 'Je vous contacte au sujet de votre profil et de votre portfolio.';
    body += '\n\nBien cordialement,';
    if(name) body += `\n${name}`;

    const url=`mailto:arthurviaudpro@gmail.com?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(body)}`;
    window.location.href=url;
  });
})();
