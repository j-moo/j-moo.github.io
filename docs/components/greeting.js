(() => {
  const heading = document.getElementById("cover-title");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  if (!heading || !window.CSS?.registerProperty || !["", "#home"].includes(location.hash)) return;
  if (reduced.matches || document.hidden || window.scrollY > 8) return;
  if (performance.getEntriesByType("navigation")[0]?.type === "back_forward") return;

  const listeners = new AbortController();
  const events = { signal: listeners.signal, passive: true };
  function finish() {
    listeners.abort();
    heading.classList.remove("is-writing");
  }
  for (const type of ["wheel", "touchstart", "pointerdown", "keydown", "hashchange", "pagehide"]) {
    window.addEventListener(type, finish, events);
  }
  window.addEventListener("scroll", () => {
    if (window.scrollY > 8) finish();
  }, events);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) finish();
  }, events);
  reduced.addEventListener("change", finish, events);

  heading.addEventListener("animationend", event => {
    if (event.animationName === "write-across") finish();
  }, events);
  document.fonts.load('60px "Portfolio Pen"', heading.textContent).then(() => {
    if (!listeners.signal.aborted) heading.classList.add("is-writing");
  }).catch(finish);
})();
