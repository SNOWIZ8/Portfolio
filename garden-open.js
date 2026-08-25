'use strict';

/* ============================================================
   NEED TO KNOW — carrousel robuste
   - boutons
   - trackpad / tactile via scroll natif
   - clavier
   - dots
============================================================ */
(function(){
  const stage = document.getElementById('needCarousel');
  const track = document.getElementById('needTrack');
  const slides = track ? [...track.querySelectorAll('img')] : [];
  const prev = document.getElementById('prevSlide');
  const next = document.getElementById('nextSlide');
  const count = document.getElementById('slideCount');
  const dots = [...document.querySelectorAll('#needDots button')];

  if(!stage || !track || !slides.length) return;

  let index = 0;
  let raf = null;

  const clampIndex = n => (n + slides.length) % slides.length;

  function updateUI(){
    if(count){
      count.textContent =
        String(index + 1).padStart(2,'0') + ' / ' +
        String(slides.length).padStart(2,'0');
    }
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
  }

  function goTo(n, behavior='smooth'){
    index = clampIndex(n);
    track.scrollTo({
      left: track.clientWidth * index,
      behavior
    });
    updateUI();
  }

  prev?.addEventListener('click', () => goTo(index - 1));
  next?.addEventListener('click', () => goTo(index + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  stage.addEventListener('keydown', e => {
    if(e.key === 'ArrowLeft'){
      e.preventDefault();
      goTo(index - 1);
    }
    if(e.key === 'ArrowRight'){
      e.preventDefault();
      goTo(index + 1);
    }
  });

  track.addEventListener('scroll', () => {
    if(raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const width = Math.max(track.clientWidth, 1);
      const nextIndex = Math.max(0, Math.min(
        slides.length - 1,
        Math.round(track.scrollLeft / width)
      ));
      if(nextIndex !== index){
        index = nextIndex;
        updateUI();
      }
    });
  }, {passive:true});

  window.addEventListener('resize', () => goTo(index, 'auto'));
  updateUI();
})();

/* ============================================================
   PREVIEWS VIDÉO
   Posters visibles immédiatement ; lecture seulement à proximité.
============================================================ */
(function(){
  const videos = [...document.querySelectorAll('.page-garden video')];
  if(!videos.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  videos.forEach(video => {
    video.muted = true;
    video.playsInline = true;
  });

  if(reduceMotion) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target;
      if(entry.isIntersecting){
        if(video.readyState < 2) video.load();
        const promise = video.play();
        if(promise && typeof promise.catch === 'function'){
          promise.catch(() => {});
        }
      }else{
        video.pause();
      }
    });
  }, {
    rootMargin:'120px 0px',
    threshold:.16
  });

  videos.forEach(video => observer.observe(video));
})();

/* ============================================================
   NAVIGATION CONTEXTUELLE
============================================================ */
(function(){
  const links = [...document.querySelectorAll('[data-case-nav]')];
  if(!links.length) return;

  const map = new Map(links.map(a => [a.dataset.caseNav, a]));
  const sections = [...map.keys()]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  let current = '';

  const update = () => {
    const line = innerHeight * .38;
    let next = sections[0]?.id || '';

    sections.forEach(section => {
      if(section.getBoundingClientRect().top <= line) next = section.id;
    });

    if(next === current) return;
    current = next;
    links.forEach(a => {
      a.classList.toggle('active', a.dataset.caseNav === current);
    });
  };

  addEventListener('scroll', update, {passive:true});
  addEventListener('resize', update);
  update();
})();
