/* Images are visible before JavaScript runs, even when observation is unavailable. */
(() => {
  const images = document.querySelectorAll('.service-screen .screen-mat img');
  if (!images.length || !window.IntersectionObserver || !window.matchMedia) return;

  const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
  if (!motion.matches) return;

  const observer = new IntersectionObserver(entries => {
    for (const {target, isIntersecting} of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      if (motion.matches) target.classList.add('is-entering');
    }
  }, {threshold: .08});

  function finish(event) {
    if (event.animationName === 'screen-enter') {
      event.target.classList.remove('is-entering');
    }
  }
  document.addEventListener('animationend', finish);
  document.addEventListener('animationcancel', finish);
  for (const image of images) observer.observe(image);
})();
