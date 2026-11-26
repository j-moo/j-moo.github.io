(() => {
  "use strict";

  const viewer = document.createElement("dialog");
  if (typeof viewer.showModal !== "function") return;

  viewer.className = "media-viewer";
  viewer.setAttribute("aria-labelledby", "media-viewer-title");
  viewer.innerHTML = `
    <div class="media-sheet">
      <div class="media-tools">
        <h2 id="media-viewer-title">프로젝트 이미지</h2>
        <button class="media-close" type="button" autofocus>닫기 <span aria-hidden="true">×</span></button>
      </div>
      <div class="media-stage" tabindex="0" aria-label="이미지 보기">
        <img class="media-original" alt="">
      </div>
      <div class="media-footer">
        <div class="media-legend" aria-live="polite" aria-atomic="true">
          <span class="media-number"></span>
          <p class="media-caption"></p>
        </div>
        <div class="media-actions">
          <button class="media-prev" type="button" aria-label="이전 이미지">←</button>
          <button class="media-zoom" type="button" aria-pressed="false">원본 크기</button>
          <button class="media-next" type="button" aria-label="다음 이미지">→</button>
        </div>
      </div>
    </div>`;

  document.body.append(viewer);
  const image = viewer.querySelector(".media-original");
  const stage = viewer.querySelector(".media-stage");
  const zoom = viewer.querySelector(".media-zoom");
  const previous = viewer.querySelector(".media-prev");
  const next = viewer.querySelector(".media-next");
  const close = viewer.querySelector(".media-close");
  const number = viewer.querySelector(".media-number");
  const caption = viewer.querySelector(".media-caption");
  let photos = [];
  let position = 0;
  let opener;
  let swipeStart;

  function setZoom(expanded) {
    stage.classList.toggle("original-size", expanded);
    zoom.setAttribute("aria-pressed", String(expanded));
    stage.scrollTo(0, 0);
  }

  function show(index) {
    position = (index + photos.length) % photos.length;
    const photo = photos[position];
    const thumbnail = photo.querySelector("img");
    const legend = photo.closest("figure")?.querySelector("figcaption");
    setZoom(false);
    image.alt = thumbnail?.alt || "";
    image.src = photo.href;
    number.textContent = (position + 1) + " / " + photos.length;
    caption.textContent = legend?.textContent.trim() || image.alt;
    previous.hidden = next.hidden = photos.length === 1;
  }

  document.addEventListener("click", event => {
    const photo = event.target.closest("a.gallery-photo, a.case-photo");
    if (!photo || event.defaultPrevented || event.button !== 0 ||
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const grid = photo.closest(".evidence-grid");
    event.preventDefault();
    opener = photo;
    photos = grid ? Array.from(grid.querySelectorAll("a.gallery-photo")) : [photo];
    show(photos.indexOf(photo));
    viewer.showModal();
    close.focus({preventScroll: true});
  });

  stage.addEventListener("touchstart", event => {
    const touch = event.touches[0];
    swipeStart = event.touches.length === 1 && photos.length > 1 && !stage.classList.contains("original-size")
      ? {id: touch.identifier, x: touch.clientX, y: touch.clientY} : null;
  }, {passive: true});
  stage.addEventListener("touchcancel", () => { swipeStart = null; }, {passive: true});
  stage.addEventListener("touchend", event => {
    const start = swipeStart;
    swipeStart = null;
    if (!start || event.touches.length || stage.classList.contains("original-size")) return;
    const touch = Array.from(event.changedTouches).find(item => item.identifier === start.id);
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      show(position + (dx < 0 ? 1 : -1));
    }
  }, {passive: true});

  previous.addEventListener("click", () => show(position - 1));
  next.addEventListener("click", () => show(position + 1));
  zoom.addEventListener("click", () => setZoom(!stage.classList.contains("original-size")));
  close.addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", event => {
    if (event.target === viewer) viewer.close();
  });
  viewer.addEventListener("keydown", event => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const panning = stage.classList.contains("original-size") && event.target === stage;
    if (!panning && ["ArrowLeft", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
      show(position + (event.key === "ArrowLeft" ? -1 : 1));
    } else if (event.key === "Tab") {
      const last = next.hidden ? zoom : next;
      if (event.shiftKey && document.activeElement === close) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        close.focus();
      }
    }
  });
  viewer.addEventListener("close", () => {
    if (viewer.open) return;
    swipeStart = null;
    if (opener?.isConnected) opener.focus({preventScroll: true});
    photos = [];
    opener = null;
  });
  window.addEventListener("hashchange", () => {
    if (viewer.open) viewer.close();
  });
})();
