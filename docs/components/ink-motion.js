(() => {
  if (typeof IntersectionObserver !== "function") return;
  const motion = matchMedia("(prefers-reduced-motion: no-preference)");
  function onIntersection(entries, observer) {
    for (const {target, isIntersecting} of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      if (motion.matches) {
        target.classList.add("ink-visible");
        setTimeout(() => target.classList.remove("ink-visible"), 850);
      }
    }
  }
  const landingObserver = new IntersectionObserver(onIntersection);
  const landing = document.getElementById("landing");
  for (const selector of [".skill-group", ".education-rows article"]) {
    landing.querySelectorAll(selector).forEach((element, index) => {
      element.style.setProperty("--ink-delay", (index % 4) * 60 + "ms");
    });
  }
  landing.querySelectorAll(".pen-line, .skill-group, .education-rows, .education-rows article, .project-row")
    .forEach(element => landingObserver.observe(element));

  const detail = document.getElementById("project-detail");
  const detailObserver = new IntersectionObserver(onIntersection);
  function observeDetail() {
    detailObserver.disconnect();
    detail.querySelectorAll(".pen-line, .detail-head, .detail-overview, .technical-section, .case, .evidence, .reflection")
      .forEach(element => detailObserver.observe(element));
  }
  detail.addEventListener("detail-rendered", observeDetail);
  observeDetail();
})();