// Interactive 3D-like key: scroll + pointer parallax
(() => {
  const hero = document.querySelector('.hero');
  const keyWrap = document.querySelector('.hero-3d-key');
  if (!hero || !keyWrap) return;

  let rafId = null;
  let pointerX = 0, pointerY = 0;
  let progress = 0; // scroll progress 0..1.5
  let active = true;

  const update = () => {
    rafId = null;
    if (!active) return;

    // Calculate transforms
    const rotZ = 10 + progress * 40; // degrees
    const moveY = progress * 140;    // px
    const tiltX = (pointerY - 0.5) * 14; // degrees
    const tiltY = (pointerX - 0.5) * 18; // degrees
    const scale = 1 + Math.min(progress, 1) * 0.04;

    keyWrap.style.transform = `translate3d(0, ${moveY}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(${rotZ}deg) scale(${scale})`;
  };

  const schedule = () => { if (!rafId) rafId = requestAnimationFrame(update); };

  // Scroll mapping to progress
  const onScroll = () => {
    const viewport = window.innerHeight || 1;
    const rect = hero.getBoundingClientRect();
    const visibleTop = Math.min(Math.max(-rect.top, 0), rect.height + viewport);
    progress = Math.max(0, Math.min((window.scrollY || window.pageYOffset) / viewport, 1.6));
    schedule();
  };

  // Pointer parallax
  const onPointer = (e) => {
    const rect = hero.getBoundingClientRect();
    pointerX = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    pointerY = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
    schedule();
  };

  // Pause when out of view
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { active = entry.isIntersecting; if (active) schedule(); });
  }, { threshold: 0 });
  io.observe(hero);

  // Listeners
  document.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  document.addEventListener('pointermove', onPointer, { passive: true });

  // Initial
  onScroll();
})();
