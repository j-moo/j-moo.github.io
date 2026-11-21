import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {projects} from './content.mjs';
import {notes} from './portfolio-data.mjs';
import {skillGroups} from './skills.mjs';

const out = path.resolve('docs');
const domain = 'https://j-moo.github.io';
const updated = '2026-11-21';
const github = 'https://github.com/j-moo';
const html = value => String(value).replace(/[&<>"']/g, character =>
  ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[character]));
const projectUrl = project => '/projects/' + project.id + '/';
const noteUrl = note => '/notes/' + note.id + '/';
const urls = [];
const uiFiles = ['styles.css', 'motion.css', 'app.js', 'motion.js'];
const assetUrls = Object.fromEntries(uiFiles.map(file => {
  const source = fs.readFileSync(file, 'utf8').replaceAll('\r\n', '\n');
  const version = createHash('sha256').update(source).digest('hex').slice(0, 12);
  return [file, '/' + file + '?v=' + version];
}));

function write(file, content) {
  const target = path.join(out, file);
  fs.mkdirSync(path.dirname(target), {recursive: true});
  fs.writeFileSync(target, content);
}

function link([label, url], className = '') {
  return `<a class="${className}" href="${html(url)}">${html(label)}</a>`;
}

function arrowLink(label, url, className, arrow = '→') {
  return `<a class="${className}" href="${html(url)}"><span>${html(label)}</span><span class="link-arrow" aria-hidden="true">${arrow}</span></a>`;
}

function sectionHead(title, id, detail = '') {
  return `<header class="section-head"><h2 id="${id}">${html(title)}</h2>${detail ? `<p>${html(detail)}</p>` : ''}</header>`;
}

function page(url, title, description, body, active = '') {
  const navigation = [
    ['프로젝트', '/#projects', 'projects'], ['작업 모음', '/archive/', 'archive'],
    ['개발 기록', '/notes/', 'notes'], ['소개', '/about/', 'about']
  ].map(([name, href, key]) => `<a href="${href}" ${active === key ? 'aria-current="page"' : ''}>${name}</a>`).join('');
  const document = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${html(title)} · 김종무</title><meta name="description" content="${html(description)}">
<meta name="theme-color" content="#f8f7f3"><meta property="og:type" content="website">
<meta property="og:title" content="${html(title)} · 김종무"><meta property="og:description" content="${html(description)}">
<meta property="og:url" content="${domain + url}"><link rel="canonical" href="${domain + url}">
<link rel="icon" href="/assets/favicon.svg"><link rel="alternate" type="application/rss+xml" href="/feed.xml" title="김종무 개발 기록">
<link rel="preload" href="/assets/PretendardVariable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${assetUrls['styles.css']}"><link rel="stylesheet" href="${assetUrls['motion.css']}"><script>try{document.documentElement.dataset.theme=localStorage.getItem('jm-theme')||'light'}catch{}</script>
<script defer src="${assetUrls['app.js']}"></script><script defer src="${assetUrls['motion.js']}"></script></head><body id="top">
<a class="skip" href="#main">본문 바로가기</a><header class="topbar"><div class="container nav-wrap">
<a href="/" class="brand" aria-label="김종무 포트폴리오 홈"><span class="brand-mark" aria-hidden="true">jm<span class="brand-dot">.</span></span><span class="brand-name">포트폴리오</span></a>
<nav aria-label="주 메뉴">${navigation}</nav><div class="nav-tools"><button data-search type="button"><i class="glass" aria-hidden="true"></i>검색</button><button class="theme-toggle" type="button" aria-label="색상 테마 전환">◐</button></div>
</div></header><main id="main">${body}</main>
<footer id="about"><div class="container footer-inner"><div><strong>김종무</strong><small>소프트웨어 개발자 · ${updated.replaceAll('-', '.')}</small></div><div class="links">${link(['GitHub 프로필', github])} ${link(['RSS', '/feed.xml'])} ${link(['맨 위로', '#top'])}</div></div></footer>
<dialog id="search-dialog" aria-labelledby="search-title"><div class="dialog-heading"><h2 id="search-title">포트폴리오 검색</h2><button data-close-search>닫기</button></div>
<label for="search-input">프로젝트, 역할 또는 기술</label><input type="search" id="search-input" placeholder="예: BLE, 모델, 영상" autocomplete="off"><div id="search-results" aria-live="polite"></div></dialog>
</body></html>`;
  if (url !== '/404.html') urls.push(url);
  write(url === '/404.html' ? '404.html' : url.slice(1) + 'index.html', document);
}

function skillsSection() {
  return `<section class="container tool-strip" id="stack" aria-labelledby="stack-title">
  ${sectionHead('기술 스택','stack-title')}
  <div class="tool-groups">${skillGroups.map(group => `<section id="skills-${group.id}" class="tool-group">
  <h3>${html(group.title)}</h3><ul>${group.skills.map(skill => `<li><button type="button" class="tool-icon" aria-label="${html(skill.name)}" aria-expanded="false"><img src="/assets/tech/${html(skill.icon)}" width="34" height="34" alt=""><span aria-hidden="true" class="tool-name">${html(skill.name)}</span></button></li>`).join('')}</ul></section>`).join('')}</div></section>`;
}

const education = '삼성청년SW·AI아카데미(SSAFY) 15기 수료';

function serviceScreen(p) {
  const [file, alt, caption, width, height] = p.screen;
  return `<figure class="service-screen screen-${p.id}"><a class="screen-mat" href="/assets/${file}" aria-label="${html(p.name+' '+caption+' 크게 보기')}"><img src="/assets/${file}" width="${width}" height="${height}" alt="${html(alt)}" loading="lazy"><span class="expand-screen" aria-hidden="true">↗</span></a><figcaption>${html(caption)}</figcaption></figure>`;
}

function projectStack(p) {
  const groups = [['사용 언어', p.languages], ['프레임워크', p.frameworks], ['도구·기술', p.tools]];
  return `<dl class="project-stack">${groups.map(([label, items])=>`<div><dt>${label}</dt><dd>${html(items.join(' · '))}</dd></div>`).join('')}</dl>`;
}

function demoMedia(p) {
  if (!p.demo) {
    const [file, alt, caption] = p.featureImage;
    return `<figure class="demo-media"><img src="/assets/${file}" alt="${html(alt)}" loading="lazy"><figcaption>${html(caption)}</figcaption></figure>`;
  }
  const [video, poster, caption, duration] = p.demo;
  return `<figure class="demo-media demo-${p.id}" id="demo-${p.id}"><video controls playsinline preload="none" poster="/assets/${poster}" aria-label="${html(caption)}"><source src="/assets/${video}" type="video/mp4">${link(['영상 열기','/assets/'+video])}</video>
  <figcaption>${html(caption)} · ${duration}</figcaption></figure>`;
}

function noteDate(date) {
  return `<time datetime="${date.replaceAll('.', '-')}">${date}</time>`;
}

function showcase(p) {
  return `<article class="work-card work-${p.id}" id="project-${p.id}" aria-labelledby="name-${p.id}">
  <a class="work-cover" href="${projectUrl(p)}" aria-label="${html(p.name)} 프로젝트 자세히 보기"><img src="/assets/${html(p.screen[0])}" width="${p.screen[3]}" height="${p.screen[4]}" alt="${html(p.screen[1])}" loading="lazy"></a>
  <div class="work-meta"><span>${html(p.field)}</span><span>${html(p.period)}</span></div>
  <h3 id="name-${p.id}">${link([p.name,projectUrl(p)])}</h3><p class="work-tagline">${html(p.tagline)}</p>
  <p class="work-role"><b>내 역할</b> ${html(p.role)}</p>
  <p class="work-stack">${html([...p.languages,...p.frameworks].join(' · '))}</p>
  ${arrowLink('프로젝트 자세히 보기',projectUrl(p),'case-link')}</article>`;
}

function noteRow(n) {
  return `<a class="note-row" href="${noteUrl(n)}" data-tag="${html(n.tag)}" data-filter-text="${html([n.title,n.summary,n.project,n.tag].join(' '))}"><div class="note-meta"><span>${n.project} · ${n.tag}</span>${noteDate(n.date)}</div><div><h3>${n.title}</h3><p>${n.summary}</p></div></a>`;
}

fs.mkdirSync(out, {recursive:true});
fs.cpSync('assets', path.join(out, 'assets'), {recursive:true});
for (const file of uiFiles) fs.copyFileSync(file, path.join(out, file));

write('.nojekyll','');
const home = `<section class="profile-hero" aria-labelledby="profile-name"><div class="container profile-grid">
<header class="profile-heading"><p class="profile-role">소프트웨어 개발자</p>
<h1 id="profile-name"><span>김종무</span></h1><p class="profile-roman" lang="en">Jongmu Kim</p></header>
<div class="profile-art"><div class="portrait-print"><img src="/assets/portrait.webp" width="467" height="600" alt="김종무의 프로필 사진" fetchpriority="high"></div></div>
<div class="profile-intro"><p class="profile-principle">기능을 만들고 나면 처음 쓰는 사람처럼 다시 써 봅니다.</p>
<p class="profile-experience">네 번의 팀 프로젝트에서 화면을 설계하고, 교통 데이터를 다루고, 키링을 앱에 연결했습니다.</p>
<div class="profile-actions">${arrowLink('프로젝트 보기','#projects','hero-link','↓')}${arrowLink('GitHub',github,'hero-secondary','↗')}</div></div>
</div></section>${skillsSection()}
<section class="container edu-line" id="education" aria-labelledby="education-title"><h2 id="education-title">교육</h2><p>${education}</p></section>
<section class="container projects-block" id="projects" aria-labelledby="projects-title">${sectionHead('프로젝트','projects-title')}
<div class="work-grid">${projects.map(showcase).join('')}</div></section>`;

page('/', '소프트웨어 개발자 포트폴리오', '소프트웨어 개발자 김종무의 기술 스택과 SSAFY 15기 수료, 네 팀 프로젝트에서 맡은 일과 개발 기록을 소개합니다.', home);

for (const p of projects) {
  const body = `<header class="container case-top"><a class="back" href="/#projects">프로젝트 목록</a><div class="case-title"><h1>${html(p.name)}</h1><p>${html(p.tagline)}</p></div></header>
  <div class="container article-grid"><aside class="contents"><nav aria-label="프로젝트 목차">${[['프로젝트 소개','#overview'],['주요 기능 개발','#process'],['트러블슈팅','#result']].map(item=>link(item)).join('')}</nav><button data-print>인쇄 / PDF 저장</button></aside>
  <article class="prose case-story"><section id="overview"><h2>프로젝트 소개</h2><p>${html(p.service)}</p>
  <div id="service">${serviceScreen(p)}</div><dl class="case-facts"><div><dt>내 역할</dt><dd>${html(p.role)}</dd></div><div><dt>팀 · 기간</dt><dd>${html(p.team)} · ${html(p.period)}</dd></div></dl>
  ${projectStack(p)}<p class="contribution">${html(p.contribution)}</p></section>
  <section id="process"><h2>주요 기능 개발</h2>${p.features.map(([title, description])=>`<h3>${html(title)}</h3><p>${html(description)}</p>`).join('')}${demoMedia(p)}</section>
  <section id="result"><h2>트러블슈팅</h2><h3 id="problem">${html(p.issue)}</h3><dl class="trouble"><div><dt>문제</dt><dd>${html(p.problem)}</dd></div><div><dt>원인과 해결</dt><dd>${html(p.fix)}</dd></div><div><dt>확인 결과</dt><dd>${html(p.outcome)}</dd></div></dl>
  <div class="case-links"><span id="evidence">${link(p.proof,'text-link')}</span><span id="journal">${link(p.note,'text-link')}</span></div></section></article></div>`;
  page(projectUrl(p),p.name+' · '+p.tagline,p.service,body,'projects');
}

const projectList = projects.map(p => `<article class="archive-item">
  <div><p class="meta">${p.field}</p><h2>${link([p.name,projectUrl(p)])}</h2><span>${p.period}</span></div>
  <div><h3>${p.role}</h3><p>${p.outcome}</p>${link([p.name+' 사례 읽기',projectUrl(p)],'text-link')}</div>
</article>`).join('');
page('/archive/', '작업 모음', 'Flex_Log, Melly, DDUBI, Tingle에서 맡은 역할과 검증 결과',
  `<div class="container"><header class="index-top"><p class="kicker">Project archive</p><h1>작업 모음</h1></header>
  ${projectList}</div>`, 'archive');

const filters = ['전체',...new Set(notes.map(n=>n.tag))];
page('/notes/','개발 기록','문제를 좁히고 다시 확인한 과정',`<div class="container narrow"><header class="index-top"><p class="kicker">Engineering notes</p><h1>개발 기록</h1><p class="lead">실험 조건과 설계 판단을 한 가지 질문씩 풀어 썼습니다.</p></header>
<div class="filter-bar">${filters.map((tag,i)=>`<button data-filter="${tag}" aria-pressed="${i===0}">${tag}</button>`).join('')}</div><label for="notes-filter">글 찾기</label><input type="search" id="notes-filter" placeholder="제목, 주제, 프로젝트">
<div id="filtered-notes">${[...notes].sort((a,b)=>b.date.localeCompare(a.date)).map(noteRow).join('')}</div><p id="no-notes" hidden>일치하는 글이 없습니다.</p></div>`,'notes');
for (const n of notes) {
  const p = projects.find(p=>p.name===n.project);
  page(noteUrl(n),n.title,n.summary,`<div class="container narrow"><header class="article-top"><a class="back" href="/notes/">개발 기록</a><p class="kicker">${n.project} · ${n.tag} · ${n.date}</p><h1>${n.title}</h1><p class="lead">${n.summary}</p></header><article class="prose reading">
${n.sections.map(([h,b],i)=>`<section id="part-${i}"><h2>${h}</h2><p>${b}</p></section>`).join('')}
<p class="scope">당시 작업을 ${n.published || '2026년 11월 15일'} 정리한 글입니다.</p>${link([p.name+' 프로젝트 상세',projectUrl(p)],'button')} <button data-print>인쇄 / PDF 저장</button></article></div>`,'notes');
}

page('/about/', '소개와 경력 요약', '김종무의 교육, 프로젝트별 역할과 검증 결과', `<div class="container narrow"><header class="article-top"><p class="kicker">소프트웨어 개발자</p><h1>김종무</h1><p class="lead">새로 가입한 사람이 첫 소비를 기록할 수 있는지, 팬이 대기실에서 자기 차례에 영상 방으로 들어갈 수 있는지 직접 확인해 왔습니다. 문제가 생기면 같은 상황을 다시 만들고, 팀원과 함께 화면과 데이터가 어디에서 어긋났는지 살핍니다.</p>
<div class="actions">${link(['GitHub 프로필',github],'button primary')}<button data-print>요약 인쇄 / PDF 저장</button></div></header>
<article class="prose reading"><section><h2>교육</h2><p><strong>${education}</strong></p></section>
<section><h2>프로젝트 경험</h2>${projects.map(p=>`<div class="cv-item"><h3>${link([p.name,projectUrl(p)])} <span>${p.period}</span></h3><strong>${p.role}</strong><p>${p.outcome}</p></div>`).join('')}</section>
<section><h2>팀에서 일할 때</h2><p>DDUBI에서 저는 실시간 위치와 혼잡도까지 폭넓게 요청했습니다. 수집 담당자와 API 호출 한도와 시간대별 누락을 살펴본 뒤 학습에 쓸 수 있는 입력을 다시 정했습니다. 상대가 어떤 데이터를 왜 만들어야 하는지 설명하고, 실제로 전달할 수 있는 범위를 함께 확인하는 방법을 배웠습니다.</p>${link(['데이터 수집 담당자와 조율한 기록','/notes/collectable-data/'],'text-link')}</section>
<section><h2>야구와 운동</h2><p>초등학교 때 시작한 야구를 사회인 리그에서 이어가고 있습니다. 투구를 독학하며 구속 132km/h까지 도전했습니다.</p></section></article></div>`, 'about');

page('/404.html', '페이지를 찾을 수 없습니다', '포트폴리오 홈으로 이동할 수 있습니다.', `<div class="container index-top"><p class="kicker">404</p><h1>페이지를 찾을 수 없습니다.</h1>${link(['홈으로 돌아가기','/'],'button primary')}</div>`);

const index = [
  ...projects.map(p=>({title:p.name+' · '+p.tagline,summary:p.service+' '+p.issue,tag:[p.field,p.role,...p.languages,...p.frameworks,...p.tools].join(' · '),url:projectUrl(p)})),
  ...notes.map(n=>({title:n.title,summary:n.summary,tag:n.project+' · '+n.tag,url:noteUrl(n)}))
];
write('search-index.json',JSON.stringify(index));
write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u=>`<url><loc>${domain+u}</loc><lastmod>${updated}</lastmod></url>`).join('')}</urlset>`);
write('robots.txt','User-agent: *\nAllow: /\nSitemap: '+domain+'/sitemap.xml\n');
write('feed.xml',`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>김종무 개발 기록</title><link>${domain}/notes/</link><description>개발 과정에서 내린 판단과 확인한 결과</description><language>ko</language>${notes.map(n=>`<item><title>${html(n.title)}</title><link>${domain+noteUrl(n)}</link><guid>${domain+noteUrl(n)}</guid><description>${html(n.summary)}</description></item>`).join('')}</channel></rss>`);
console.log('Built '+urls.length+' pages, 404, search index, RSS and sitemap.');
