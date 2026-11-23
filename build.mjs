import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { home } from './home.mjs';
import { casePlate } from './application.mjs';
import { projectSummaries } from './cases.mjs';

const site = new URL('./docs/', import.meta.url);
const domain = 'https://j-moo.github.io';
const canonical = domain + '/#projects';
const intro = readFileSync(new URL('./intro-before-paint.js', import.meta.url), 'utf8');
function asset(path) {
  const hash = createHash('sha256').update(readFileSync(new URL(path, site))).digest('hex');
  return '/' + path + '?v=' + hash.slice(0, 10);
}
function write(path, content) {
  writeFileSync(new URL(path, site), content + '\n');
}
for (const project of projectSummaries) write('assets/case-'+project.id+'.svg',casePlate(project.id,project.name));
const styles = ['base', 'home', 'motion', 'glass', 'case-reader', 'application'].map(file =>
  '<link rel="stylesheet" href="' + asset('css/' + file + '.css') + '">').join('\n');
const scripts = ['libraries', 'app', 'player', 'glass', 'motion'].map(file =>
  '<script defer src="' + asset('js/' + file + '.js') + '"></script>').join('\n');

write('index.html', `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>김종무 · AI 활용 개발 포트폴리오</title><meta name="description" content="김종무의 개발 포트폴리오. DDUBI의 예측 모델과 Tingle의 실물 보드에서 AI를 어떻게 활용하고 결과를 검증했는지 소개합니다.">
<link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:title" content="김종무 · 개발 포트폴리오"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${domain}/assets/portrait.webp">
<link rel="icon" href="/assets/music-mark.svg"><link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="preload" href="/assets/fonts/exhibit-sans.woff2" as="font" type="font/woff2" crossorigin>
<script>if(location.pathname+location.search+location.hash!=='/#projects')history.replaceState(history.state,'','/#projects');</script>
${styles}
${scripts}</head>
<body id="projects" data-page="home"><a class="skip skip-link" href="/#projects" data-open-pane="projects">프로젝트 바로가기</a>
<div class="music-intro" data-loader hidden aria-hidden="true"><strong data-loader-name lang="en">Jongmu Kim</strong><span data-load-count>0%</span></div><script>${intro}</script>
<div data-progress aria-hidden="true"></div><main id="main" tabindex="-1">${home()}</main>
<dialog id="image-dialog" aria-labelledby="image-caption"><div class="still-view"><button type="button" data-close-image>닫기 ×</button><figure><img id="image-full" alt=""><figcaption id="image-caption"></figcaption></figure></div></dialog>
</body></html>`);
// GitHub Pages serves this file with HTTP 404 for retired deep links.
write('404.html', `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=/#projects"><title>김종무 포트폴리오로 이동</title></head><body><a href="/#projects">김종무 포트폴리오 열기</a></body></html>`);
write('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' + domain + '/</loc></url></urlset>');
write('robots.txt', 'User-agent: *\nAllow: /\nSitemap: ' + domain + '/sitemap.xml');
console.log('Portfolio ready at /#projects');
