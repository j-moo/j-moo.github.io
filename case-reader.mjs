import { projectSummaries } from './cases.mjs';
import { applicationCases, measurements } from './application.mjs';

const icons = {
  flex: '<path d="M15 9.5h23v34.2l-4-2.8-3.6 2.8-3.7-2.8-3.7 2.8-3.7-2.8-4.3 2.8z"/><path d="M20.5 18.2h12m-12 6.2h12m-12 6.3h6.3"/>',
  melly: '<rect x="8.8" y="16" width="25.5" height="20.2" rx="5.4"/><path d="m34.3 23.2 9.1-5.1v16l-9.1-5.1"/><path d="M15.2 22.3h6.4"/>',
  ddubi: '<circle cx="14" cy="35.5" r="4.6"/><circle cx="38" cy="16" r="4.6"/><path d="M14 31v-6.3a5 5 0 0 1 5-5h6.3a5 5 0 1 1 0 10h-1.1a4.5 4.5 0 0 0 0 9h7.6a6.2 6.2 0 0 0 6.2-6.2V20.6"/>',
  tingle: '<path d="M20 23.4a8.3 8.3 0 1 1 11.7-1.8"/><path d="m21.4 20.8 4.4-3.1a4 4 0 0 1 5.6 1l9.1 13.2a4 4 0 0 1-1 5.6l-9.2 6.4a4 4 0 0 1-5.6-1l-9.1-13.2a4 4 0 0 1 1-5.6l4.8-3.3Z"/><circle cx="31.9" cy="34.4" r="2.2"/>',
};

function detail(project, index) {
  const item=applicationCases[project.id];
  const adjacent=offset => projectSummaries[(index+offset+projectSummaries.length)%projectSummaries.length];
  return `<article class="cr-detail cr-${project.id}" data-project-detail="${project.id}" aria-labelledby="library-title-${project.id}">
    <button class="cr-return" data-open-pane="projects" type="button">← 프로젝트 목록</button>
    <header class="cr-intro"><p class="cr-period">${item.team} · ${project.period}</p><h2 id="library-title-${project.id}" data-project-title tabindex="-1" lang="en">${project.name}</h2>
      <p class="cr-service">${item.service}</p><dl class="cr-role"><div><dt>내 기여</dt><dd>${item.role}</dd></div><div><dt>관련 기술</dt><dd>${item.stack}</dd></div></dl></header>
    <section class="cr-section"><h3>${item.title}</h3><p>${item.problem}</p>
    <h4>AI를 활용한 작업</h4><p>${item.ai}</p><h4>내 판단과 검증</h4><p>${item.decision}</p></section>
    <section class="cr-section"><h3>검증 결과</h3>${measurements(item)}<p>${item.conclusion}</p>
    <p class="cr-source">${item.scope}</p><p class="cr-period">개발 기록 · ${item.date}</p></section>
    <nav class="cr-adjacent" aria-label="다른 프로젝트">${[[-1,'← 이전'],[1,'다음 →']].map(([offset,label])=>`<button type="button" data-open-project="${adjacent(offset).id}"><small>${label}</small><span>${adjacent(offset).name}</span></button>`).join('')}</nav>
  </article>`;
}

export function projectLibrary() {
  return `<div class="cr-library"><div class="cr-picker" data-project-picker>
    <h2 id="projects-title" data-picker-title tabindex="-1" lang="en">Projects</h2>
    <div class="cr-apps">${projectSummaries.map(project => `<button class="cr-app cr-tile-${project.id}" type="button" data-open-project="${project.id}" aria-label="${project.name} 프로젝트 열기">
      <span class="cr-icon"><svg viewBox="0 0 52 52" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
        <defs><g id="picker-mark-${project.id}">${icons[project.id]}</g></defs>
        <use class="cr-icon-edge" href="#picker-mark-${project.id}"/><use href="#picker-mark-${project.id}"/>
      </svg></span>
      <span class="cr-app-name" lang="en">${project.name}</span></button>`).join('')}</div>
    <noscript><p>아래에서 네 프로젝트의 기여 범위와 AI 활용 사례를 차례로 읽을 수 있습니다.</p></noscript>
  </div>${projectSummaries.map(detail).join('')}</div>`;
}
