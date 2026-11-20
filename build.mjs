import fs from 'node:fs';
import path from 'node:path';
import {projects} from './content.mjs';
import {notes} from './portfolio-data.mjs';
import {criteria, skillGroups} from './skills.mjs';

const out = path.resolve('docs');
const domain = 'https://j-moo.github.io';
const updated = '2026-11-20';
const github = 'https://github.com/j-moo';
const html = value => String(value).replace(/[&<>"']/g, character =>
  ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[character]));
const projectUrl = project => '/projects/' + project.id + '/';
const noteUrl = note => '/notes/' + note.id + '/';
const urls = [];

function write(file, content) {
  const target = path.join(out, file);
  fs.mkdirSync(path.dirname(target), {recursive: true});
  fs.writeFileSync(target, content);
}

function link([label, url], className = '') {
  return `<a class="${className}" href="${html(url)}">${html(label)}</a>`;
}

function page(url, title, description, body, active = '') {
  const navigation = [
    ['프로젝트', '/#projects', 'projects'], ['작업 모음', '/archive/', 'archive'],
    ['개발 기록', '/notes/', 'notes'], ['소개', '/about/', 'about']
  ].map(([name, href, key]) => `<a href="${href}" ${active === key ? 'aria-current="page"' : ''}>${name}</a>`).join('');
  const document = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${html(title)} · 김종무</title><meta name="description" content="${html(description)}">
<meta name="theme-color" content="#f9fafb"><meta property="og:type" content="website">
<meta property="og:title" content="${html(title)} · 김종무"><meta property="og:description" content="${html(description)}">
<meta property="og:url" content="${domain + url}"><link rel="canonical" href="${domain + url}">
<link rel="icon" href="/assets/favicon.svg"><link rel="alternate" type="application/rss+xml" href="/feed.xml" title="김종무 개발 기록">
<link rel="preload" href="/assets/PretendardVariable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/styles.css"><script>try{document.documentElement.dataset.theme=localStorage.getItem('jm-theme')||'light'}catch{}</script>
<script defer src="/app.js"></script></head><body id="top">
<a class="skip" href="#main">본문 바로가기</a><header class="topbar"><div class="container nav-wrap">
<a href="/" class="brand" aria-label="김종무 포트폴리오 홈"><span aria-hidden="true">jm<span class="brand-dot">.</span></span>김종무</a>
<nav aria-label="주 메뉴">${navigation}</nav><div class="nav-tools"><button data-search type="button"><i class="glass" aria-hidden="true"></i>검색</button><button class="theme-toggle" type="button" aria-label="색상 테마 전환">◐</button></div>
</div></header><main id="main">${body}</main>
<footer id="about"><div class="container footer-inner"><div><strong>김종무</strong><small>소프트웨어 개발자 · 2026.11.20</small></div><div class="links">${link(['GitHub 프로필', github])} ${link(['RSS', '/feed.xml'])} ${link(['맨 위로', '#top'])}</div></div></footer>
<dialog id="search-dialog" aria-labelledby="search-title"><div class="dialog-heading"><h2 id="search-title">포트폴리오 검색</h2><button data-close-search>닫기</button></div>
<label for="search-input">프로젝트, 역할 또는 기술</label><input type="search" id="search-input" placeholder="예: BLE, 모델, 영상" autocomplete="off"><div id="search-results" aria-live="polite"></div></dialog>
</body></html>`;
  if (url !== '/404.html') urls.push(url);
  write(url === '/404.html' ? '404.html' : url.slice(1) + 'index.html', document);
}

function tags(values) {
  return `<ul class="tags">${values.map(value => `<li>${html(value)}</li>`).join('')}</ul>`;
}

function skillRow(skill) {
  const percent = criteria.reduce((total, [, weight], index) => total + weight * skill.levels[index], 0);
  return `<li class="skill-row">
<span class="skill-icon"><img src="/assets/tech/${skill.icon}" width="32" height="32" alt=""></span>
<div class="skill-body"><div class="skill-label"><strong>${html(skill.name)}</strong><span aria-hidden="true">${percent}%</span></div>
<div class="skill-meter" role="meter" aria-label="${html(skill.name)} 활용도" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}" aria-valuetext="${percent}%" style="--level:${percent}%"></div>
${link([skill.example, skill.url], 'skill-example')}</div></li>`;
}

function skillsSection() {
  const labels = {0: '미확인', 0.5: '부분 확인', 1: '직접 확인'};
  const auditRows = skillGroups.flatMap(group => group.skills).map(skill =>
    `<tr><th scope="row">${html(skill.name)}</th>${skill.levels.map(level=>`<td>${labels[level]}</td>`).join('')}</tr>`
  ).join('');
  return `<section class="portfolio-band" id="stack" aria-labelledby="stack-title"><div class="container skill-section">
<header class="skill-heading"><h2 id="stack-title">기술 스택</h2><p>프로젝트 기록 기준 활용도</p></header>
<nav class="skill-jumps" aria-label="기술 분류 바로가기">${skillGroups.map(group=>link([group.title,'#skills-'+group.id])).join('')}</nav>
<div class="personal-skills">${skillGroups.map(group=>`<section class="skill-group" id="skills-${group.id}"><h3>${html(group.title)}</h3><ul>${group.skills.map(skillRow).join('')}</ul></section>`).join('')}</div>
<details class="skill-criteria"><summary>활용도 산정 기준</summary><p>${criteria.map(([name, weight])=>name+' '+weight+'%').join(', ')}를 합산했습니다. 각 항목에서 직접 수행하거나 판단한 근거가 있으면 해당 비중 전체를, 팀·AI와 함께 작업한 범위만 확인되면 절반을 반영했습니다. 기록에서 확인되지 않는 항목은 0%로 계산했습니다.</p>
<div class="table-wrap"><table><caption>기술별 평가 근거</caption><thead><tr><th scope="col">기술</th>${criteria.map(([name])=>`<th scope="col">${name}</th>`).join('')}</tr></thead><tbody>${auditRows}</tbody></table></div></details></div></section>`;
}

const education = '삼성청년SW·AI아카데미(SSAFY) 15기 수료';

function serviceScreen(p) {
  const [file, alt, caption, width, height] = p.screen;
  return `<figure class="service-screen screen-${p.id}"><a class="screen-mat" href="/assets/${file}" aria-label="${html(p.name+' '+caption+' 크게 보기')}"><img src="/assets/${file}" width="${width}" height="${height}" alt="${html(alt)}" loading="lazy"></a><figcaption>${html(caption)}</figcaption></figure>`;
}

function projectStack(p) {
  const groups = [['사용 언어', p.languages], ['프레임워크', p.frameworks], ['도구·기술', p.tools]];
  return `<dl class="project-stack">${groups.map(([label, items])=>`<div><dt>${label}</dt><dd>${html(items.join(' · '))}</dd></div>`).join('')}</dl>`;
}

function projectNotes(p) {
  return notes.filter(n=>n.project === p.name).sort((a,b)=>a.date.localeCompare(b.date));
}

function showcase(p) {
  const related = projectNotes(p);
  return `<article class="showcase" id="project-${p.id}" aria-labelledby="name-${p.id}">
<div class="showcase-main">${serviceScreen(p)}<div class="showcase-copy">
<p class="project-period">${html(p.period)} <span>·</span> ${html(p.field)}</p>
<h3 id="name-${p.id}">${link([p.name,projectUrl(p)])}</h3>
<p class="service-title">${html(p.tagline)}</p><p class="service-desc">${html(p.service)}</p>
<dl class="personal-role"><dt>내 역할</dt><dd>${html(p.role)}</dd></dl>
${projectStack(p)}${link(['프로젝트 자세히 보기',projectUrl(p)],'case-link')}</div></div>
<section class="project-journal" aria-labelledby="journal-${p.id}"><h4 id="journal-${p.id}">${p.name} 개발 기록</h4>
<ul>${related.map(n=>`<li><a href="${noteUrl(n)}"><time>${n.date}</time><span>${html(n.title)}</span></a></li>`).join('')}</ul></section></article>`;
}

function noteRow(n) {
  return `<a class="note-row" href="${noteUrl(n)}" data-tag="${html(n.tag)}" data-filter-text="${html([n.title,n.summary,n.project,n.tag].join(' '))}"><div class="note-meta"><span>${n.project} · ${n.tag}</span><time>${n.date}</time></div><div><h3>${n.title}</h3><p>${n.summary}</p></div></a>`;
}

fs.mkdirSync(out, {recursive:true});
fs.cpSync('assets', path.join(out, 'assets'), {recursive:true});
for (const file of ['styles.css','app.js']) fs.copyFileSync(file, path.join(out, file));

write('.nojekyll','');
const home = `<section class="container profile-hero" aria-labelledby="slogan"><div class="profile-copy"><p class="kicker"><span class="rule"></span>김종무 · 소프트웨어 개발자</p>
<h1 id="slogan">직접 써 보고,<br><em>끝까지 확인합니다.</em></h1>
<p class="lead">안녕하세요, 개발자 김종무입니다. 기계공학을 전공하고 웹 서비스와 데이터, 임베디드 소프트웨어를 경험했습니다.</p>
<div class="actions">${link(['프로젝트 보기','#projects'],'button primary')}${link(['GitHub 프로필',github],'button')}</div></div>
<figure class="profile-photo"><img src="/assets/portrait.webp" width="467" height="600" fetchpriority="high" alt="개발자 김종무의 증명사진"><figcaption><b>김종무</b><span lang="en">Jongmu Kim</span></figcaption></figure></section>
${skillsSection()}
<section class="container band-content education-band" id="education"><h2>교육</h2><div><h3>${education}</h3><p>소비 기록 서비스부터 BLE 키링까지, 네 팀 프로젝트에서 기획·개발·기기 연동을 경험했습니다.</p></div></section>
<section class="container projects-block" id="projects"><div class="section-head"><h2>프로젝트</h2></div>
<nav class="project-jumps" aria-label="프로젝트 바로가기">${projects.map(p=>link([p.name,'#project-'+p.id])).join('')}</nav>
<div class="showcases">${projects.map(showcase).join('')}</div></section>`;
page('/', '소프트웨어 개발자 포트폴리오', '소프트웨어 개발자 김종무의 기술 스택과 SSAFY 15기 수료, 네 팀 프로젝트에서 맡은 일과 개발 기록을 소개합니다.', home);

for (const p of projects) {
  const related = projectNotes(p);
  const body = `<header class="container article-top"><a class="back" href="/#projects">대표 프로젝트</a>
<div class="kicker">${p.name} <span>/</span> ${p.field}</div><h1>${p.title}</h1><p class="lead"><strong>${p.tagline}</strong><br>${p.service}</p>
<dl class="facts">${[['담당',p.role],['구성',p.team],['작업 기간',p.period]].map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></header>
<div class="container article-grid"><aside class="contents"><nav aria-label="사례 목차">${[['서비스 화면','#service'],['맡은 일','#overview'],['판단과 변경','#process'],['검증 결과','#result'],['확인 자료','#evidence'],['개발 기록','#journal']].map(item=>link(item)).join('')}</nav><button data-print>인쇄 / PDF 저장</button></aside>
<article class="prose"><section id="service"><h2>서비스 화면과 기술 스택</h2>${serviceScreen(p)}${projectStack(p)}
${(p.stackExamples || []).map(([id,title,body])=>`<h3 id="${id}">${html(title)}</h3><p>${html(body)}</p>`).join('')}</section><section id="overview"><h2 id="problem">제가 맡은 일</h2><p>${p.contribution}</p>${tags(p.skills)}</section>
<section id="process"><h2>판단하고 바꾼 과정</h2>${p.steps.map(([title,body])=>`<h3>${title}</h3><p>${body}</p>`).join('')}</section>
<section id="result"><h2>${p.evidence}</h2><div class="table-wrap"><table><thead><tr>${p.columns.map(t=>`<th scope="col">${t}</th>`).join('')}</tr></thead><tbody>${p.rows.map(row=>`<tr>${row.map(cell=>`<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="scope" id="learning">${p.scope}</p></section>
<section id="evidence"><h2>확인 자료</h2>${p.photo && p.photo[0] !== p.screen[0] ? `<figure class="proof proof-${p.id}"><a href="/assets/${p.photo[0]}"><img src="/assets/${p.photo[0]}" alt="${p.photo[1]}" loading="lazy"></a><figcaption>${p.photo[1]}</figcaption></figure>` : ''}<div class="links">${p.links.map(item=>link(item,'document-link')).join('')}</div></section>
${related.length ? `<section id="journal"><h2>${p.name} 개발 기록</h2>${related.map(noteRow).join('')}</section>` : ''}
</article></div>`;
  page(projectUrl(p), p.name + ' · ' + p.role, p.brief, body, 'projects');
}

const projectList = projects.map(p => `<article class="archive-item">
  <div><p class="meta">${p.field}</p><h2>${link([p.name,projectUrl(p)])}</h2><span>${p.period}</span></div>
  <div><h3>${p.role}</h3><p>${p.brief}</p>${link([p.name+' 사례 읽기',projectUrl(p)],'text-link')}</div>
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

page('/about/', '소개와 경력 요약', '김종무의 교육, 프로젝트별 역할과 검증 결과', `<div class="container narrow"><header class="article-top"><p class="kicker">About · Jongmu Kim</p><h1>김종무</h1><p class="lead">기계공학에서 출발해 데이터 연산, 웹 서비스, 임베디드 소프트웨어를 경험했습니다. 팀에서는 사용자가 겪은 문제를 재현할 조건과 해결 여부를 판단할 기준을 구체화하는 일을 해 왔습니다.</p>
<div class="actions">${link(['GitHub 프로필',github],'button primary')}<button data-print>요약 인쇄 / PDF 저장</button></div></header>
<article class="prose reading"><section><h2>교육</h2><p><strong>${education}</strong><br><strong>동아대학교 기계공학과</strong> · 2024년 졸업</p></section>
<section><h2>프로젝트 경험</h2>${projects.map(p=>`<div class="cv-item"><h3>${link([p.name,projectUrl(p)])} <span>${p.period}</span></h3><strong>${p.role}</strong><p>${p.brief}</p></div>`).join('')}</section>
<section><h2>팀에서 일할 때</h2><p>DDUBI에서 저는 실시간 위치와 혼잡도까지 폭넓게 요청했습니다. 수집 담당자와 API 호출 한도와 시간대별 누락을 살펴본 뒤 학습에 쓸 수 있는 입력을 다시 정했습니다. 상대가 어떤 데이터를 왜 만들어야 하는지 설명하고, 실제로 전달할 수 있는 범위를 함께 확인하는 방법을 배웠습니다.</p>${link(['데이터 수집 담당자와 조율한 기록','/notes/collectable-data/'],'text-link')}</section>
<section><h2>야구와 운동</h2><p>초등학교 때 시작한 야구를 사회인 리그에서 이어가고 있습니다. 투구를 독학하며 구속 132km/h까지 도전했습니다.</p></section></article></div>`, 'about');

page('/404.html', '페이지를 찾을 수 없습니다', '포트폴리오 홈으로 이동할 수 있습니다.', `<div class="container index-top"><p class="kicker">404</p><h1>페이지를 찾을 수 없습니다.</h1>${link(['홈으로 돌아가기','/'],'button primary')}</div>`);

const index = [
  ...projects.map(p=>({title:p.name+' · '+p.title,summary:p.brief,tag:[p.field,p.role,...p.languages,...p.frameworks,...p.tools,...p.skills].join(' · '),url:projectUrl(p)})),
  ...notes.map(n=>({title:n.title,summary:n.summary,tag:n.project+' · '+n.tag,url:noteUrl(n)}))
];
write('search-index.json',JSON.stringify(index));
write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u=>`<url><loc>${domain+u}</loc><lastmod>${updated}</lastmod></url>`).join('')}</urlset>`);
write('robots.txt','User-agent: *\nAllow: /\nSitemap: '+domain+'/sitemap.xml\n');
write('feed.xml',`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>김종무 개발 기록</title><link>${domain}/notes/</link><description>개발 과정에서 내린 판단과 확인한 결과</description><language>ko</language>${notes.map(n=>`<item><title>${html(n.title)}</title><link>${domain+noteUrl(n)}</link><guid>${domain+noteUrl(n)}</guid><description>${html(n.summary)}</description></item>`).join('')}</channel></rss>`);
console.log('Built '+urls.length+' pages, 404, search index, RSS and sitemap.');
