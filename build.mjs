import fs from 'node:fs';
import path from 'node:path';
import {projects, archive} from './content.mjs';
import {notes} from './portfolio-data.mjs';

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

function visual(p) {
  if (p.id === 'ddubi') return `<div class="art art-data" aria-hidden="true"><div class="art-caption">버스 구간 평균 절대 오차</div><div class="chart-line"><span>중앙값</span><i style="--value:92%"></i><b>27.61초</b></div><div class="chart-line best"><span>LightGBM</span><i style="--value:86.8%"></i><b>26.04초</b></div></div>`;
  if (p.id === 'flex') return `<div class="art art-flex" aria-hidden="true"><div class="model-box"><small>계정</small><b>User</b></div><i class="relation"></i><div class="model-box"><small>프로필</small><b>Profile</b></div><span class="relation-note">한 트랜잭션에서 저장</span></div>`;
  const image = p.id === 'tingle' ? ['tingle-cad.png','키링 내부 부품 배치 CAD 렌더'] : p.photo;
  return `<div class="art art-${p.id}"><img loading="lazy" src="/assets/${image[0]}" alt="${html(image[1])}"></div>`;
}

function card(p) {
  return `<article class="card"><a href="${projectUrl(p)}">${visual(p)}
<div class="card-copy"><div class="meta"><strong>${p.name}</strong><span>${p.field}</span></div>
<h3>${p.title}</h3><p>${p.brief}</p><span class="read">사례 읽기</span></div></a></article>`;
}

function noteRow(n) {
  return `<a class="note-row" href="${noteUrl(n)}" data-tag="${html(n.tag)}" data-filter-text="${html([n.title,n.summary,n.project,n.tag].join(' '))}"><div class="note-meta"><span>${n.project} · ${n.tag}</span><time>${n.date}</time></div><div><h3>${n.title}</h3><p>${n.summary}</p></div></a>`;
}

fs.mkdirSync(out, {recursive:true});
fs.cpSync('assets', path.join(out, 'assets'), {recursive:true});
for (const file of ['styles.css','app.js']) fs.copyFileSync(file, path.join(out, file));

write('.nojekyll','');
const home = `<section class="intro container"><div class="intro-copy"><p class="kicker"><span class="rule"></span>김종무 · 소프트웨어 개발자</p>
<h1>데이터와 화면,<br><em>실물을 연결합니다.</em></h1>
<p class="lead">버스 번호가 모호하면 실제 노선을 열어 보고, 키링이 조용하면 보드에 남은 기록을 읽습니다. 무엇이 잘못됐는지 좁혀 가고, 바꾼 뒤 같은 조건에서 다시 확인합니다.</p>
<div class="actions">${link(['프로젝트 보기','#projects'],'button primary')}${link(['소개와 경력 요약','/about/'],'button')}</div></div>
<figure class="cover"><div class="cover-images"><img class="cover-case" src="/assets/tingle-case.webp" alt="직접 조립한 흰 케이스의 키링"><div class="inset"><img src="/assets/tingle-cad.png" alt="앞서 검토한 R17 내부 배치 렌더"></div></div><figcaption><b>Tingle</b><span>11.13 배치 검토 · 11.18 실물 케이스</span></figcaption></figure></section>
<div class="route-band"><div class="container routes"><strong>직무별 사례</strong>${projects.map(p=>link([p.field,projectUrl(p)])).join('')}</div></div>
<section class="container block" id="projects"><div class="section-head"><div><p class="kicker">Selected projects</p><h2>대표 프로젝트</h2></div>${link(['작업 모음 전체 보기','/archive/'],'text-link')}</div>
<div class="cards">${projects.map(card).join('')}</div></section>
<section class="container block divided" id="notes"><div class="section-head"><div><p class="kicker">Engineering notes</p><h2>개발 기록</h2></div>${link(['전체 글 보기','/notes/'],'text-link')}</div>
${[...notes].sort((a,b)=>b.date.localeCompare(a.date)).map(noteRow).join('')}</section>`;
page('/', '소프트웨어 개발자 포트폴리오', '김종무의 데이터·웹·IoT 프로젝트. 실제 선택과 검증 결과를 소개합니다.', home);

for (const p of projects) {
  const related = notes.filter(n=>n.project === p.name);
  const body = `<header class="container article-top"><a class="back" href="/#projects">대표 프로젝트</a>
<div class="kicker">${p.name} <span>/</span> ${p.field}</div><h1>${p.title}</h1><p class="lead">${p.service}</p>
<dl class="facts">${[['담당',p.role],['구성',p.team],['작업 기간',p.period]].map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></header>
<div class="container article-grid"><aside class="contents"><nav aria-label="사례 목차">${[['맡은 일','#overview'],['판단과 변경','#process'],['검증 결과','#result'],['확인 자료','#evidence']].map(item=>link(item)).join('')}</nav><button data-print>인쇄 / PDF 저장</button></aside>
<article class="prose"><section id="overview"><h2 id="problem">제가 맡은 일</h2><p>${p.contribution}</p>${tags(p.skills)}</section>
<section id="process"><h2>판단하고 바꾼 과정</h2>${p.steps.map(([title,body])=>`<h3>${title}</h3><p>${body}</p>`).join('')}</section>
<section id="result"><h2>${p.evidence}</h2><div class="table-wrap"><table><thead><tr>${p.columns.map(t=>`<th scope="col">${t}</th>`).join('')}</tr></thead><tbody>${p.rows.map(row=>`<tr>${row.map(cell=>`<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="scope" id="learning">${p.scope}</p></section>
<section id="evidence"><h2>확인 자료</h2>${p.photo ? `<figure class="proof proof-${p.id}"><a href="/assets/${p.photo[0]}"><img src="/assets/${p.photo[0]}" alt="${p.photo[1]}" loading="lazy"></a><figcaption>${p.photo[1]}</figcaption></figure>` : ''}<div class="links">${p.links.map(item=>link(item,'document-link')).join('')}</div></section>
${related.length ? `<section><h2>관련 개발 기록</h2>${related.map(noteRow).join('')}</section>` : ''}
</article></div>`;
  page(projectUrl(p), p.name + ' · ' + p.role, p.brief, body, 'projects');
}

const archiveItem = item => `<article class="archive-item" id="${item.id}"><div><p class="meta">${item.field}</p><h3>${item.name}</h3><time>${item.date}</time></div><div><h4>${item.title}</h4><p>${item.text}</p>${item.link ? link(item.link,'text-link') : ''}</div></article>`;
page('/archive/', '작업 모음', '팀 프로젝트와 해커톤, 웹서비스 실습, 직접 사용한 개인 도구의 작업 범위.', `<div class="container"><header class="index-top"><p class="kicker">Project archive</p><h1>작업 모음</h1><p class="lead">팀에서 맡은 역할과 직접 사용하며 바꾼 도구를 모았습니다.</p></header>
<section><h2>팀 프로젝트</h2><div class="archive-team">${projects.map(p=>link([p.name+' · '+p.field,projectUrl(p)],'document-link')).join('')}</div></section><section class="block"><h2>해커톤 · 실습 · 개인 작업</h2>${archive.map(archiveItem).join('')}</section></div>`,'archive');

const filters = ['전체',...new Set(notes.map(n=>n.tag))];
page('/notes/','개발 기록','문제를 좁히고 다시 확인한 과정',`<div class="container narrow"><header class="index-top"><p class="kicker">Engineering notes</p><h1>개발 기록</h1><p class="lead">실험 조건과 설계 판단을 한 가지 질문씩 풀어 썼습니다.</p></header>
<div class="filter-bar">${filters.map((tag,i)=>`<button data-filter="${tag}" aria-pressed="${i===0}">${tag}</button>`).join('')}</div><label for="notes-filter">글 찾기</label><input type="search" id="notes-filter" placeholder="제목, 주제, 프로젝트">
<div id="filtered-notes">${[...notes].sort((a,b)=>b.date.localeCompare(a.date)).map(noteRow).join('')}</div><p id="no-notes" hidden>일치하는 글이 없습니다.</p></div>`,'notes');
for (const n of notes) {
  const p = projects.find(p=>p.name===n.project);
  page(noteUrl(n),n.title,n.summary,`<div class="container narrow"><header class="article-top"><a class="back" href="/notes/">개발 기록</a><p class="kicker">${n.project} · ${n.tag} · ${n.date}</p><h1>${n.title}</h1><p class="lead">${n.summary}</p></header><article class="prose reading">
${n.sections.map(([h,b],i)=>`<section id="part-${i}"><h2>${h}</h2><p>${b}</p></section>`).join('')}
<p class="scope">당시 작업을 2026년 11월 15일 정리한 글입니다.</p>${link([p.name+' 프로젝트 상세',projectUrl(p)],'button')} <button data-print>인쇄 / PDF 저장</button></article></div>`,'notes');
}

page('/about/', '소개와 경력 요약', '김종무의 교육, 프로젝트별 역할과 검증 결과', `<div class="container narrow"><header class="article-top"><p class="kicker">About · Jongmu Kim</p><h1>김종무</h1><p class="lead">기계공학에서 출발해 데이터 연산, 웹 서비스, 임베디드 소프트웨어를 경험했습니다. 팀에서는 사용자가 겪은 문제를 재현할 조건과 해결 여부를 판단할 기준을 구체화하는 일을 해 왔습니다.</p>
<div class="actions">${link(['GitHub 프로필',github],'button primary')}<button data-print>요약 인쇄 / PDF 저장</button></div></header>
<article class="prose reading"><section><h2>교육</h2><p><strong>삼성청년SW·AI아카데미</strong> · 2026년 소프트웨어·AI 교육 및 팀 프로젝트<br><strong>동아대학교 기계공학과</strong> · 2024년 졸업</p></section>
<section><h2>프로젝트 경험</h2>${projects.map(p=>`<div class="cv-item"><h3>${link([p.name,projectUrl(p)])} <span>${p.period}</span></h3><strong>${p.role}</strong><p>${p.brief}</p></div>`).join('')}</section>
<section><h2>팀에서 일할 때</h2><p>DDUBI에서 저는 실시간 위치와 혼잡도까지 폭넓게 요청했습니다. 수집 담당자와 API 호출 한도와 시간대별 누락을 살펴본 뒤 학습에 쓸 수 있는 입력을 다시 정했습니다. 상대가 어떤 데이터를 왜 만들어야 하는지 설명하고, 실제로 전달할 수 있는 범위를 함께 확인하는 방법을 배웠습니다.</p>${link(['데이터 수집 담당자와 조율한 기록','/notes/collectable-data/'],'text-link')}</section>
<section><h2>야구와 운동</h2><p>초등학교 때 시작한 야구를 사회인 리그에서 이어가고 있습니다. 투구를 독학하며 구속 132km/h까지 도전했습니다.</p></section></article></div>`, 'about');

page('/404.html', '페이지를 찾을 수 없습니다', '포트폴리오 홈으로 이동할 수 있습니다.', `<div class="container index-top"><p class="kicker">404</p><h1>페이지를 찾을 수 없습니다.</h1>${link(['홈으로 돌아가기','/'],'button primary')}</div>`);

const index = [
  ...projects.map(p=>({title:p.name+' · '+p.title,summary:p.brief,tag:[p.field,p.role,...p.skills].join(' · '),url:projectUrl(p)})),
  ...archive.map(p=>({title:p.name+' · '+p.title,summary:p.text,tag:p.field,url:'/archive/#'+p.id})),
  ...notes.map(n=>({title:n.title,summary:n.summary,tag:n.project+' · '+n.tag,url:noteUrl(n)}))
];
write('search-index.json',JSON.stringify(index));
write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u=>`<url><loc>${domain+u}</loc><lastmod>${updated}</lastmod></url>`).join('')}</urlset>`);
write('robots.txt','User-agent: *\nAllow: /\nSitemap: '+domain+'/sitemap.xml\n');
write('feed.xml',`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>김종무 개발 기록</title><link>${domain}/notes/</link><description>개발 과정에서 내린 판단과 확인한 결과</description><language>ko</language>${notes.map(n=>`<item><title>${html(n.title)}</title><link>${domain+noteUrl(n)}</link><guid>${domain+noteUrl(n)}</guid><description>${html(n.summary)}</description></item>`).join('')}</channel></rss>`);
console.log('Built '+urls.length+' pages, 404, search index, RSS and sitemap.');
