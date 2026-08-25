/* project-secondary.js — médias secondaires légers */
(() => {
  const videos = [...document.querySelectorAll('.project-video')];
  if (!videos.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  videos.forEach(video => {
    video.muted = true;
    video.playsInline = true;
  });

  if (reduce) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        const p = video.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.28, rootMargin: '120px 0px 120px 0px' });

  videos.forEach(video => observer.observe(video));
})();
