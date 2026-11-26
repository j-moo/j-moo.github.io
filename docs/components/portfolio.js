"use strict";

const records = window.PROJECTS || [];
const blog = window.BLOG_DATA || {};
const profiles = blog.projects || {};
const landing = document.getElementById("landing");
const projectDetail = document.getElementById("project-detail");
const header = document.querySelector("header");
const sections = Array.from(landing.querySelectorAll(":scope > section"));
const menu = Array.from(header.querySelectorAll("nav a"));
const projectsLink = id => "#projects/" + encodeURIComponent(id);
const inkArrow = '<span class="arrow" aria-hidden="true">→</span>';
const escapes = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"};
const escapeText = value => String(value ?? "").replace(/[&<>"']/g, ch => escapes[ch]);

function imageSize(item) {
  return Number.isInteger(item.width) && Number.isInteger(item.height)
    ? ' width="' + item.width + '" height="' + item.height + '"' : "";
}

function photo(project, decorative = false) {
  return project.image ? '<img src="' + escapeText(project.image) + '" alt="' +
    (decorative ? "" : escapeText(project.alt)) + '"' + imageSize(project) + '>' : "";
}

const listCovers = {
  tingle: {frame: "phones", screens: ["assets/blog/tingle-phone-offer.webp", "assets/blog/tingle-phone-conversation.webp"]},
  ddubi: {frame: "phones", screens: ["assets/blog/ddubi-home.webp", "assets/blog/ddubi-route-detail.webp"]},
  melly: {frame: "monitor", image: "assets/blog/melly-queue.webp"},
  flex: {frame: "monitor", image: "assets/blog/flex-original-feed.webp"}
};

function listCover(project, media) {
  const cover = listCovers[project.id];
  if (!cover) return '<span class="project-stage">' + photo(media, true) + '</span>';
  const frames = (cover.screens || [cover.image]).map(src =>
    '<span class="device-frame">' + (cover.screens ? '<span class="phone-rail"></span><span class="phone-camera"></span>' : '') +
    '<img loading="lazy" decoding="async" src="' + escapeText(src) + '" alt=""></span>'
  ).join("");
  return '<span class="project-stage list-cover cover-' + cover.frame + '" aria-hidden="true">' + frames + '</span>';
}

function projectList() {
  return records.map(p => {
    const media = profiles[p.id] || p;
    const technology = p.tech.slice(0, 4).map(escapeText).join(" · ");
    return '<a class="project-row" href="' + projectsLink(p.id) + '">' + listCover(p, media) +
      '<span class="work-copy"><span class="work-period">' + escapeText(p.period) + '</span>' +
      '<span class="slab row-name">' + escapeText(p.name) + '</span>' +
      '<span class="work-description">' + escapeText(media.summary || p.intro) + '</span>' +
      '<span class="row-meta"><span>담당</span> ' + escapeText(p.role) + '</span>' +
      '<span class="work-tech">' + technology + '</span><span class="work-open">프로젝트 보기 ' +
      inkArrow + '</span></span></a>';
  }).join("");
}

const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");

function enableEmailCopy(address) {
  const button = document.querySelector(".copy-email");
  const link = document.querySelector(".email-link");
  const status = document.querySelector(".copy-status");
  let timer;
  button.addEventListener("click", async () => {
    clearTimeout(timer);
    let copied = false;
    try {
      await navigator.clipboard.writeText(address);
      copied = true;
    } catch {
      const range = document.createRange();
      range.selectNodeContents(link);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      try { copied = document.execCommand("copy"); } catch { /* Keep address selected. */ }
      if (copied) selection.removeAllRanges();
    }
    if (!copied) {
      status.textContent = "선택한 이메일 주소를 복사해 주세요.";
      return;
    }
    status.textContent = "복사됨 ✓";
    timer = setTimeout(() => { status.textContent = ""; }, 1500);
  });
}

function renderProfile() {
  const profile = blog.profile;
  if (profile) {
    const portrait = profile.image ? '<img class="portrait" src="' + escapeText(profile.image) +
      '" alt="' + escapeText(profile.alt) + '" width="467" height="600">' : "";
    const paragraphs = (profile.paragraphs || []).map(text => '<p>' + escapeText(text) + '</p>').join("");
    const contacts = [];
    if (profile.email) contacts.push('<span class="email-contact"><a class="email-link" href="mailto:' +
      escapeText(profile.email) + '">' + escapeText(profile.email) + '</a>' +
      '<button type="button" class="copy-email" aria-label="이메일 주소 복사">복사</button>' +
      '<span class="copy-status" role="status"></span></span>');
    if (profile.github) contacts.push('<a href="' + escapeText(profile.github) + '" target="_blank" rel="noopener">GitHub ↗</a>');
    document.querySelector(".profile").innerHTML = '<div class="portrait-layer"><div class="photo-print">' +
      portrait + '</div><img class="portrait-sketch" src="assets/drawing-pcb.png" alt=""></div>' +
      '<div class="profile-copy"><div class="identity"><h3>' + escapeText(profile.name) +
      '</h3><p class="profile-role">' + escapeText(profile.headline) + '</p></div>' +
      '<div class="profile-bio">' + paragraphs + '</div><div class="contacts">' + contacts.join("") + '</div></div>';
    if (profile.email) enableEmailCopy(profile.email);
  }
  document.querySelector(".skill-rows").innerHTML = (blog.skills || []).map(group =>
    '<div class="skill-group"><dt>' + escapeText(group.name) + '</dt><dd><ul>' + group.items.map(name => {
      const icon = blog.skillIcons?.[name];
      return '<li>' + (icon ? '<img src="assets/tech/' + escapeText(icon) + '" alt="" width="22" height="22">' : "") +
        '<span>' + escapeText(name) + '</span></li>';
    }).join("") + '</ul></dd></div>').join("");
  document.querySelector(".education-rows").innerHTML = (blog.education || []).map(entry =>
    '<article><p class="education-period">' + escapeText(entry.period) + '</p><div><h3>' + escapeText(entry.name) +
    '</h3><p>' + escapeText(entry.detail) + '</p></div></article>').join("");
}

function highlightPhrase(text, emphasis) {
  if (!emphasis) return escapeText(text);
  let cursor = 0;
  let html = "";
  for (const phrase of [].concat(emphasis)) {
    const start = text.indexOf(phrase, cursor);
    if (start < 0) continue;
    html += escapeText(text.slice(cursor, start)) + '<mark>' + escapeText(phrase) + '</mark>';
    cursor = start + phrase.length;
  }
  return html + escapeText(text.slice(cursor));
}

function factList(items) {
  return items.filter(([, value]) => value).map(([label, value, emphasis]) =>
    '<div><dt>' + escapeText(label) + '</dt><dd>' + highlightPhrase(value, emphasis) + '</dd></div>').join("");
}

function projectFooter(p) {
  const index = records.indexOf(p);
  const adjacent = (offset, label) => {
    const project = records[(index + offset + records.length) % records.length];
    return '<a href="' + projectsLink(project.id) + '"><small>' + label + '</small>' +
      '<span class="slab">' + escapeText(project.name) + '</span></a>';
  };
  return '<nav class="project-footer" aria-label="프로젝트 이동">' +
    (records.length > 1 ? adjacent(-1, "← 이전 프로젝트") : "") +
    '<a class="back text-link" href="#projects">프로젝트 목록</a>' +
    (records.length > 1 ? adjacent(1, "다음 프로젝트 →") : "") + '</nav>';
}

const drawings = {
  tingle: "assets/drawing-keyrings.png",
  ddubi: "assets/drawing-ddubi.webp",
  melly: "assets/drawing-melly.webp",
  flex: "assets/drawing-flex.webp"
};

function caseEvidence(item) {
  if (!item) return "";
  if (Array.isArray(item)) return item.map(caseEvidence).join("");
  const src = escapeText(item.src);
  const caption = escapeText(item.caption);
  const visual = item.src.endsWith(".mp4")
    ? '<video controls playsinline preload="none" aria-label="' + caption + '"' +
      (item.poster ? ' poster="' + escapeText(item.poster) + '"' : "") + ' src="' + src + '"></video>'
    : '<a class="case-photo" aria-haspopup="dialog" href="' + src + '" target="_blank" rel="noopener" aria-label="' + escapeText(item.alt) +
      ' 확대 보기"><img loading="lazy"' + imageSize(item) + ' src="' + src + '" alt="' + escapeText(item.alt) + '"></a>';
  return '<figure class="case-evidence">' + visual + '<figcaption>' + caption + (item.record ? ' · <a class="text-link" href="' + escapeText(item.record) + '" target="_blank" rel="noopener">개발 기록과 검사 로그 발췌 보기</a>' : '') + '</figcaption></figure>';
}

function detail(p) {
  const media = profiles[p.id];
  const cover = media?.image ? media : p;
  const outcome = media?.outcome ? '<div class="project-outcome"><h3>' +
    "핵심 성과" + '</h3><p>' +
    highlightPhrase(media.outcome, media.outcomeFocus || media.outcome) + '</p></div>' : "";
  const resources = [...(p.links || []), ...(media?.videos || []).map(video => ({
    href: video.src, label: video.linkLabel || "시연 영상"
  }))];
  const resourceLinks = resources.map(link => '<a href="' + escapeText(link.href) +
    '" target="_blank" rel="noopener noreferrer">' + escapeText(link.label) +
    ' <span aria-hidden="true">↗</span></a>').join("");
  const links = p.cases.map((entry, i) => '<a href="' + projectsLink(p.id) + '/' + (i + 1) + '">' +
    escapeText(entry.title) + '</a>').join("");
  const cases = p.cases.map((entry, i) => {
    const comparison = '<dl class="case-comparison">' + factList([
      [entry.observation ? "시험 전" : "개선 전", entry.before],
      [entry.observation ? "실물 확인" : "개선 후", entry.after]
    ]) + '</dl>';
    const result = entry.comparisonTitle
      ? '<div class="case-result exchange-check"><h4>' + escapeText(entry.comparisonTitle) + '</h4><p>' +
        highlightPhrase(entry.result, entry.emphasis) + '</p>' + comparison + '</div>'
      : '<div class="case-result"><h4>' + (entry.observation ? "관찰 결과" : "개선 결과") + '</h4><p>' +
        highlightPhrase(entry.result, entry.emphasis) + '</p>' + comparison + '</div>';
    const analysis = '<dl class="case-facts">' + factList([
      ["분석", entry.problem, entry.problemFocus], ["가설", entry.hypothesis]
    ]) + '<div><dt>실험</dt><dd>' + highlightPhrase(entry.action, entry.actionFocus) + '</dd></div></dl>';
    const evidence = caseEvidence(media?.caseEvidence?.[i + 1]);
    const content = analysis + evidence + result;
    return '<section class="case" id="case-' + (i + 1) + '" tabindex="-1"><h3><mark>' +
      escapeText(entry.title) + '</mark></h3>' + content + '</section>';
  }).join("");
  const image = cover?.image ? '<figure><a class="project-photo" href="' + escapeText(cover.image) +
    '" target="_blank" rel="noopener" aria-label="프로젝트 이미지 원본 열기">' + photo(cover) +
    '</a><figcaption class="caption">' + escapeText(cover.alt) + '</figcaption></figure>' : "";
  const choices = (media?.technicalChoices || []).map(choice => '<div><dt>' + escapeText(choice.tech) +
    '</dt><dd>' + escapeText(choice.reason) + '</dd></div>').join("");
  return '<div class="breadcrumb"><a href="#projects">프로젝트 목록</a><span aria-hidden="true"> / </span>' + escapeText(p.name) + '</div>' +
    '<div class="detail-head"><h1 class="slab title"><span class="pen-line">' + escapeText(p.name) +
    '</span></h1><p class="lead">' + escapeText(p.tagline) + '</p>' +
    (drawings[p.id] ? '<img class="project-drawing" src="' + drawings[p.id] + '" alt="">' : '') + '</div>' +
    '<div class="detail-overview"><div><h2>프로젝트 개요</h2><p>' + highlightPhrase(p.intro, p.introFocus) +
    '</p>' +
    '<dl class="metadata">' + factList([["목표",media?.goal],["대상",media?.audience],["주요 기능",media?.features?.join(" · ")],
      ["기간",p.period],["팀 구성",p.team],["개인 역할",p.role,p.roleFocus]]) +
    (resourceLinks ? '<div><dt>관련 자료</dt><dd class="resource-links">' + resourceLinks + '</dd></div>' : '') +
    '</dl></div>' + image + '</div>' +
    '<section class="technical-section"><h2>기술 스택</h2><div><ul class="detail-stack">' +
    p.tech.map(tech => '<li>' + escapeText(tech) + '</li>').join("") + '</ul>' +
    (choices ? '<dl class="tech-choices">' + choices + '</dl>' : '') + '</div></section>' +
    '<section class="technical-section feature-development"><h2>주요 기능 개발</h2><div><dl class="feature-list">' +
    factList(media?.development || [["구현 내용", p.contribution]]) + '</dl>' +
    outcome + '</div></section>' +
    '<section class="case-area"><div class="case-nav"><h2>트러블슈팅</h2>' +
    '<details><summary class="menu-summary"><span class="menu-bars" aria-hidden="true"></span>사례 목차</summary><nav aria-label="사례 목차">' + links +
    '</nav></details></div><div class="case-body">' + cases + '</div></section>' +
    '<section class="reflection"><h2>회고</h2><p>' + escapeText(p.reflection) + '</p></section>' + projectFooter(p);
}

function highlight(sectionId) {
  for (const link of menu) {
    if (link.hash === "#" + sectionId) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
}

function currentSection(elements, extraOffset = 0) {
  const top = header.getBoundingClientRect().bottom + Math.max(extraOffset + 12, Math.min(100, window.innerHeight * 0.12));
  let visible;
  for (const el of elements) {
    if (el.getBoundingClientRect().top > top) break;
    visible = el;
  }
  return visible;
}

function syncNavigation() {
  const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (!landing.hidden) {
    const visible = atEnd ? sections[sections.length - 1] : currentSection(sections);
    highlight(visible?.id || "home");
    return;
  }
  const cases = projectDetail.querySelectorAll(".case");
  const tabBar = projectDetail.querySelector(".case-nav");
  const activeCase = atEnd ? cases[cases.length - 1] :
    currentSection(cases, tabBar.offsetHeight);
  const number = activeCase?.id.replace("case-", "");
  for (const link of projectDetail.querySelectorAll(".case-nav a")) {
    if (number && link.hash.endsWith("/" + number)) {
      if (link.hasAttribute("aria-current")) continue;
      link.setAttribute("aria-current", "location");
    } else link.removeAttribute("aria-current");
  }
}

let framePending = false;
function onScroll() {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(() => {
    framePending = false;
    syncNavigation();
  });
}

let currentProject;
function restoreListPosition(position) {
  if (!position || !Number.isFinite(position.top)) return false;
  const row = Array.from(landing.querySelectorAll(".project-row")).find(link => link.hash === position.hash);
  if (!row) return false;
  const offset = position.width === window.innerWidth && position.height === window.innerHeight
    ? position.top : header.offsetHeight + 16;
  window.scrollBy(0, row.getBoundingClientRect().top - offset);
  row.focus({preventScroll:true});
  return true;
}

let activeTransition;
let generation = 0;
let listPosition;
let returnFromDetail = false;

function renderRoute(moveFocus = false, smooth = false) {
  const version = ++generation;
  activeTransition?.skipTransition();
  const [route = "home", id, rawNumber] = location.hash.slice(1).split("/");
  const p = route === "projects" && id ? records.find(item => item.id === id) : undefined;
  const previous = currentProject;
  const canAnimate = moveFocus && p !== previous && document.startViewTransition &&
    !motionPreference.matches && !document.hidden;
  const update = () => {
    if (version !== generation) return;
    displayRoute(route, rawNumber, p, previous, moveFocus, smooth);
  };
  if (!canAnimate) { update(); return; }

  const rowStage = project => Array.from(landing.querySelectorAll(".project-row"))
    .find(row => row.hash === projectsLink(project.id))?.querySelector(".project-stage");
  const sharedImage = (from, to) => {
    if (from && !to && route === "projects") return projectDetail.querySelector(".project-photo");
    if (!from && to) return rowStage(to);
    return null;
  };
  const inView = element => {
    const rect = element?.getBoundingClientRect();
    return rect && rect.bottom > header.offsetHeight && rect.top < innerHeight;
  };
  const oldImage = sharedImage(previous, p);
  let newImage;
  const name = "project-image-" + version;
  if (inView(oldImage)) oldImage.style.viewTransitionName = name;
  const transition = document.startViewTransition(() => {
    update();
    if (oldImage?.style.viewTransitionName !== name) return;
    oldImage.style.removeProperty("view-transition-name");
    if (version !== generation) return;
    newImage = p ? projectDetail.querySelector(".project-photo") : rowStage(previous);
    if (inView(newImage)) newImage.style.viewTransitionName = name;
  });
  activeTransition = transition;
  transition.finished.finally(() => {
    for (const image of [oldImage, newImage]) {
      if (image?.style.viewTransitionName === name) image.style.removeProperty("view-transition-name");
    }
    if (activeTransition === transition) activeTransition = null;
  });
}

function displayRoute(route, rawNumber, p, previous, moveFocus, smooth) {
  currentProject = p;
  let target;
  if (p) {
    if (previous !== p) {
      projectDetail.innerHTML = detail(p);
      projectDetail.dispatchEvent(new Event("detail-rendered"));
    }
    landing.hidden = true;
    projectDetail.hidden = false;
    highlight("projects");
    const number = Number(rawNumber);
    target = Number.isInteger(number) && number > 0 && number <= p.cases.length
      ? document.getElementById("case-" + number) : projectDetail;
    document.title = p.name + " | 개발자 포트폴리오";
  } else {
    for (const video of projectDetail.querySelectorAll("video")) video.pause();
    projectDetail.hidden = true;
    landing.hidden = false;
    target = sections.find(el => el.id === route) || sections[0];
    document.title = "김종무 | 개발자 포트폴리오";
  }
  const savedPosition = history.state?.projectListPosition || (returnFromDetail && listPosition);
  returnFromDetail = false;
  if (target.id === "projects" && restoreListPosition(savedPosition)) {
    syncNavigation();
    return;
  }
  if (moveFocus) {
    target.tabIndex = -1;
    target.focus({preventScroll:true});
  }
  const behavior = smooth && !motionPreference.matches ? "smooth" : "instant";
  if (target.id === "home" || target === projectDetail) window.scrollTo({top: 0, behavior});
  else target.scrollIntoView({block: "start", behavior});
  syncNavigation();
}

renderProfile();
landing.querySelector(".project-list").innerHTML = projectList();
landing.querySelector(".project-list").addEventListener("click", event => {
  const link = event.target.closest("a");
  if (link && event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
    listPosition = {hash: link.hash, top: link.getBoundingClientRect().top,
      width: window.innerWidth, height: window.innerHeight};
    history.replaceState({...history.state, projectListPosition: listPosition}, "", "#projects");
  }
});
projectDetail.addEventListener("click", event => {
  const link = event.target.closest('a[href="#projects"]');
  returnFromDetail = Boolean(link && event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey);
});
// Handle interactive section jumps before the browser applies its native fragment jump.
// Back/Forward, initial deep links and list-position restoration stay instantaneous.
document.addEventListener("click", event => {
  const link = event.target.closest("header a, .next-section, .case-nav a");
  if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey ||
      event.metaKey || event.shiftKey || event.altKey) return;
  if (!link.hash || (landing.hidden && !link.closest(".case-nav"))) return;
  event.preventDefault();
  const contents = link.closest(".case-nav details");
  if (contents) contents.open = false;
  if (link.hash !== location.hash) history.pushState(null, "", link.hash);
  renderRoute(true, true);
});
if (window.ResizeObserver) {
  new ResizeObserver(() => document.documentElement.style.setProperty(
    "--sticky-header-height", header.offsetHeight + "px"
  )).observe(header);
}
document.querySelector(".skip").addEventListener("click", event => {
  event.preventDefault();
  const content = document.querySelector("main");
  content.focus({preventScroll:true});
  content.scrollIntoView({block:"start"});
});
document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  const contents = projectDetail.querySelector(".case-nav details[open]");
  if (contents && contents.contains(document.activeElement)) {
    contents.open = false;
    contents.querySelector("summary").focus({preventScroll: true});
  }
});
document.addEventListener("pointerdown", event => {
  const contents = projectDetail.querySelector(".case-nav details[open]");
  if (contents && !contents.contains(event.target)) contents.open = false;
});
window.addEventListener("hashchange", () => renderRoute(true));
window.addEventListener("scroll", onScroll, {passive:true});
window.addEventListener("resize", onScroll, {passive:true});
renderRoute();
