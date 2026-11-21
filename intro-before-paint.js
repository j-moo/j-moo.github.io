(() => {
  const layer = document.querySelector('[data-loader]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const deadline = 1880;
  if (history.state?.portfolio?.scene === 'glass' || document.hidden || reduce.matches || matchMedia('print, (forced-colors: active)').matches ||
      performance.now() > deadline - 700 || performance.getEntriesByType('navigation')[0]?.type === 'back_forward') return;
  try { if (sessionStorage.getItem('jongmu-music-card-intro-v1') === '1') return; } catch {}
  const controller = new AbortController();
  function release() {
    if (layer.dataset.boot === '1') {
      layer.dataset.boot = 'cancelled';
      layer.hidden = true;
      layer.classList.remove('is-loading');
      document.documentElement.classList.remove('is-loading');
    }
    controller.abort();
  }
  layer.dataset.boot = '1';
  layer.hidden = false;
  layer.classList.add('is-loading');
  document.documentElement.classList.add('is-loading');
  for (const type of ['wheel','pointerdown','touchstart','keydown','beforeprint']) {
    addEventListener(type, release, {once:true, passive:true, signal:controller.signal});
  }
  reduce.addEventListener('change', release, {once:true, signal:controller.signal});
  setTimeout(release, Math.max(0, deadline - performance.now()));
})();
