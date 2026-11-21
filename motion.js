/* Observe the covers themselves so long project articles can animate on small screens. */
(() => {
  if (!window.IntersectionObserver || !window.matchMedia) return;
  const covers = document.querySelectorAll('.work-cover, .screen-mat');
  if (!covers.length) return;

  const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
  const observer = new IntersectionObserver(entries => {
    for (const {target, isIntersecting} of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      if (motion.matches) target.classList.add('is-entering');
    }
  }, {threshold: .08});

  function finish(event) {
    if (event.animationName === 'cover-in') event.target.classList.remove('is-entering');
  }
  document.addEventListener('animationend', finish);
  document.addEventListener('animationcancel', finish);
  for (const cover of covers) observer.observe(cover);
})();
