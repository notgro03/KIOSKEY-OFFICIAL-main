// Interactive 3D-like key: scroll + pointer parallax
(() => {
  const hero = document.querySelector('.hero');
  const keyWrap = document.querySelector('.hero-3d-key');
  if (!hero || !keyWrap) return;

  let rafId = null;
  let pointerX = 0, pointerY = 0;
  let progress = 0; // scroll progress 0..1.2
  let active = true;

  const update = () => {
    rafId = null;
    if (!active) return;

    // Subtle ranges for elegance
    const rotZ = -6 + progress * 12; // -6..+6 deg
    const moveY = progress * 80;     // px
    const tiltX = (pointerY - 0.5) * 8; // deg
    const tiltY = (pointerX - 0.5) * 10; // deg
    const scale = 1 + Math.min(progress, 1) * 0.02;

    keyWrap.style.transform = `translate3d(0, ${moveY}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(${rotZ}deg) scale(${scale})`;
  };

  const schedule = () => { if (!rafId) rafId = requestAnimationFrame(update); };

  // Scroll mapping to progress
  const onScroll = () => {
    const viewport = window.innerHeight || 1;
    progress = Math.max(0, Math.min((window.scrollY || window.pageYOffset) / viewport, 1.2));
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
