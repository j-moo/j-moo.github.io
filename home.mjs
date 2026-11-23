import { skillGroups } from './skills.mjs';
import { projectSummaries } from './cases.mjs';
import { projectLibrary } from './case-reader.mjs';

export const portraitSources = '/assets/portrait-120.webp 120w, /assets/portrait-384.webp 384w, /assets/portrait.webp 467w';
export const portraitSizes = '(max-width: 650px) 38vw, (max-height: 740px) 28vh, 285px';

const destinations = [
  {id:'projects', label:'Projects', railLabel:'프로젝트', icon:'<rect x="3" y="4" width="7" height="7" rx="1.15"/><rect x="14" y="4" width="7" height="7" rx="1.15"/><rect x="3" y="15" width="7" height="6" rx="1.15"/><rect x="14" y="15" width="7" height="6" rx="1.15"/>'},
  {id:'artist', label:'Profile', railLabel:'프로필', icon:'<circle cx="12" cy="8" r="3.6"/><path d="M4.8 20c.4-4.1 3.1-6.1 7.2-6.1s6.8 2 7.2 6.1"/>'},
  {id:'stack', label:'Tech Stack', railLabel:'기술 스택', icon:'<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 4 9 5 9-5"/>'},
  {id:'education', label:'Education', railLabel:'교육', icon:'<path d="m2 9 10-5 10 5-10 5L2 9Zm4 2.2v5.2c3.5 3.2 8.5 3.2 12 0v-5.2M22 9v6"/>'}
];

const covers = {
  flex: {
    screen: 'flex-landing.webp', alt: 'Flex-Log 로고 아래 시작 버튼이 보이는 첫 화면'
  },
  melly: {
    screen: 'melly-home.webp', alt: '분홍색 배경에 폴라로이드 사진 두 장이 놓인 Melly 첫 화면'
  },
  ddubi: {
    screen: 'ddubi-home.webp', alt: '오늘의 일정과 교통 통제에 따른 출발 안내가 보이는 앱 홈'
  },
  tingle: {
    screen: 'tingle-landing.webp', alt: 'tingle 로고와 ‘스친 순간, 새로운 시작’이 보이는 랜딩'
  }
};

const tracks = {
  flex: {
    artAlt:'영수증과 지폐를 담은 Flex_Log 앨범 표지',
    medium: 'Vue 3', label: '첫 소비 기록', release: '1학기 관통 프로젝트',
    playLabel: 'Flex_Log 서비스 화면 보기', caption: '웹 랜딩 · 팀 소스로 정적 렌더'
  },
  melly: {
    artAlt:'무대에서 마이크를 든 가수를 담은 Melly 앨범 표지',
    medium: 'WebRTC', label: '당첨 확인과 입장 대기', release: '팀 시연',
    playLabel: 'Melly 팀 시연 재생', caption: '팬미팅 당첨 확인과 입장 대기', video: 'melly-demo.mp4', duration: 16
  },
  ddubi: {
    artAlt:'저녁 대중교통 풍경을 담은 DDUBI 앨범 표지',
    medium: 'ML', label: '일정 입력과 대중교통 경로 추천', release: '실기기 캡처 시퀀스',
    playLabel: 'DDUBI 실기기 캡처 시퀀스 재생', caption: '일정 등록 전후의 실기기 화면', video: 'ddubi-sequence.mp4', duration: 12
  },
  tingle: {
    artAlt:'서로 가까워지는 두 열쇠고리를 담은 Tingle 앨범 표지',
    medium: 'BLE', label: '두 키링의 매칭과 LED 점등', release: '실물 시연',
    playLabel: 'Tingle 키링 시연 재생', caption: '두 키링이 매칭되어 LED가 켜지는 과정', video: 'tingle-demo.mp4', duration: 14
  }
};

function albumImage(id, attributes = '') {
  return `<img src="/assets/${id}-cover-art.webp" srcset="/assets/${id}-cover-art-384.webp 384w, /assets/${id}-cover-art.webp 640w" sizes="${portraitSizes}" width="640" height="640" alt="${tracks[id].artAlt}" ${attributes}>`;
}

function trackSlide(project, depth) {
  const track = tracks[project.id];
  const initial = depth === 0;
  const cover = covers[project.id];
  const aliases = action => initial ? ' data-player-' + action : '';
  return `<article class="album-card track track-${project.id}" data-paper data-cut-stock data-player-slide data-depth="${depth}" data-key="${project.id}" data-name="${project.name}" data-release="${track.video ? track.release : '서비스 화면'}" data-caption="${track.caption}" data-screen="/assets/${cover.screen}" data-screen-alt="${cover.alt}"${track.video?' data-film="/assets/'+track.video+'"':''} data-duration="${track.duration || 0}"${initial ? '' : ' aria-hidden="true" inert'}>
    <button class="card-open" type="button" data-open-project="${project.id}" aria-label="${project.name} 프로젝트 열기"></button>
    <div class="album-art">
      ${albumImage(project.id, initial ? 'fetchpriority="high"' : 'loading="lazy"')}<span class="cover-imprint" lang="en" aria-hidden="true">${project.name}</span>
    </div>
    <div class="track-heading"><h2 lang="en">${project.name}</h2><span>${track.medium}</span></div>
    <p class="track-title">${track.label}</p>
    ${track.video ? `<div class="track-timeline" aria-hidden="true"><i></i></div><div class="track-times"><span data-elapsed>00:00</span><span>00:${track.duration}</span></div>` : '<p class="track-format">서비스 랜딩 · 팀 소스 렌더</p>'}
    <div class="album-controls">
      <button type="button" data-deck-action="prev"${aliases('prev')} aria-label="이전 프로젝트"><span class="deck-control-face"><span class="skip-icon backwards" aria-hidden="true"></span>이전</span></button>
      <button type="button" data-deck-action="play"${aliases('play')} aria-haspopup="dialog" aria-label="${track.playLabel}"><span class="deck-control-face"><span class="${track.video?'play-icon':'screen-icon'}" aria-hidden="true"></span>${track.video?'시연 재생':'화면 보기'}</span></button>
      <button type="button" data-deck-action="next"${aliases('next')} aria-label="다음 프로젝트"><span class="deck-control-face"><span class="skip-icon" aria-hidden="true"></span>다음</span></button>
    </div>
    <p class="album-credit"><span data-deck-credit${initial?' data-player-credit':''}>${track.release} · ${project.role.split(' · ')[0]}</span> / 김종무</p>
    <span class="card-cue" aria-hidden="true">프로젝트 열기 ↗</span>
  </article>`;
}

function album() {
  const run = [...projectSummaries.slice(1),projectSummaries[0]];
  return `<div class="album-area" data-desk-album>
    <div class="album-stack" role="group" data-player aria-label="프로젝트 시연 카드">
      ${run.map(trackSlide).join('')}
      <p class="home-sr" data-player-status role="status" aria-live="polite"></p>
    </div>
  </div>`;
}

function hero() {
  return `<section id="profile" class="hero music-desk" data-hero data-stage-scene="desk" data-stock-src="/assets/matte-fibres.webp" aria-labelledby="hero-title">
    <nav class="desk-shortcuts" aria-label="포트폴리오 바로가기">${destinations.map(d=>`<button type="button" lang="en" data-open-pane="${d.id}">${d.label}</button>`).join('')}</nav>
    <div class="desk-stage" data-desk-stage>
      <div class="desk-layout">
        <div class="namecard-place" data-desk-contact>
          <article class="contact-card" data-paper data-cut-stock>
            <button type="button" class="card-open" data-open-pane="artist" aria-label="김종무 프로필 열기"></button>
            <div class="portrait-link"><img src="/assets/portrait-384.webp" srcset="${portraitSources}" sizes="${portraitSizes}" width="467" height="600" alt="김종무의 증명사진"></div>
            <div class="identity-heading"><h1 id="hero-title" data-hero-title>김종무</h1><p data-hero-sub>신입 개발자</p></div>
            <div class="identity-contact" data-hero-action><a class="identity-mail" href="mailto:rlawhdan363@gmail.com">rlawhdan363@<wbr>gmail.com</a>
            <span class="card-cue" aria-hidden="true">프로필 보기 ↗</span></div>
          </article>
        </div>
        ${album()}
      </div>
      <div class="desk-guide" data-desk-guide>
        <button type="button" class="desk-next" data-desk-next data-open-pane="projects"><span class="scroll-arrow" aria-hidden="true">↓</span> 스크롤로 전체 보기</button>
      </div>
    </div>
    <section class="desk-tour" data-desk-tour hidden aria-label="포트폴리오 이용 안내">
          <div class="tour-status" role="status" aria-atomic="true">
            <span class="tour-count"><span class="home-sr">이용 안내 단계 </span><span data-tour-count>1 / 3</span></span>
            <p data-tour-message="play"><span data-tour-video>프로젝트 시연 영상을 확인하시려면 <strong>시연 재생</strong> 버튼을 눌러보세요.</span><span data-tour-image hidden>Flex_Log의 서비스 화면을 확인하시려면 <strong>화면 보기</strong> 버튼을 눌러보세요.</span></p>
            <p data-tour-message="browse" hidden><strong>다음</strong> 또는 <strong>이전</strong> 버튼을 눌러 어떤 프로젝트가 있는지 미리 확인해 보세요.</p>
            <p data-tour-message="details" hidden>아래로 <strong>스크롤</strong>하거나 <strong>카드</strong> 또는 <strong>상단 메뉴</strong>를 눌러 상세 정보를 보세요.</p>
          </div>
          <button type="button" class="tour-next" data-tour-next aria-label="안내 다음 단계"><span data-tour-label>다음</span><span data-tour-arrow aria-hidden="true">→</span></button>
    </section>
    <svg class="tour-shade" aria-hidden="true" focusable="false">
      <defs>
      <filter id="tour-soft-edge" x="-30%" y="-40%" width="160%" height="180%"><feGaussianBlur stdDeviation="2.5"/></filter>
      <mask id="tour-lights" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
        <rect width="100%" height="100%" fill="white"/>
        <g fill="black">
          <rect data-light-target="[data-desk-tour]" rx="20"/>
          <g data-light-step="play"><rect filter="url(#tour-soft-edge)" data-light-target="[data-player-play]" rx="12"/></g>
          <g data-light-step="browse"><rect filter="url(#tour-soft-edge)" data-light-target="[data-player-prev]" rx="12"/><rect filter="url(#tour-soft-edge)" data-light-target="[data-player-next]" rx="12"/></g>
          <g data-light-step="details">
            <rect filter="url(#tour-soft-edge)" data-light-target=".desk-shortcuts" rx="18"/>
            <rect filter="url(#tour-soft-edge)" data-light-target=".contact-card .card-cue" rx="8"/>
            <rect filter="url(#tour-soft-edge)" data-light-target=".album-card[data-depth='0'] .card-cue" rx="8"/>
            <rect filter="url(#tour-soft-edge)" data-light-target="[data-desk-next]" rx="16"/>
          </g>
        </g>
      </mask></defs>
      <rect class="tour-tint" width="100%" height="100%" mask="url(#tour-lights)"/>
    </svg>
    <div class="tour-scroll-marker" aria-hidden="true">
      <svg viewBox="0 0 20 32" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3v24m-6-6 6 6 6-6"/></svg>
    </div>
    <template data-viewer-template><dialog class="media-viewer" data-media-viewer aria-labelledby="viewer-title" aria-describedby="viewer-caption">
      <div class="viewer-toolbar"><div><h2 id="viewer-title"></h2><p id="viewer-caption"></p></div><button type="button" class="viewer-close" data-viewer-close autofocus><span aria-hidden="true">×</span> 닫기</button></div>
      <div class="viewer-content"><video controls playsinline preload="none" data-viewer-video hidden></video><img data-viewer-screen alt="" hidden></div>
      <p class="viewer-error" data-viewer-error role="status" hidden></p>
      <div class="viewer-poster" aria-hidden="true" data-viewer-poster hidden><img alt=""><span class="cover-imprint" lang="en"></span></div>
    </dialog></template>
  </section>`;
}

function artist() {
  return `<section id="artist" data-glass-pane="artist" class="home-section ledger" aria-labelledby="artist-title">
    <span class="section-rule" data-draw-rule aria-hidden="true"></span>
    <h2 id="artist-title" lang="en" data-reveal>Profile</h2>
    <div class="profile-liner"><img src="/assets/portrait-384.webp" width="467" height="600" alt="김종무의 증명사진" loading="lazy"><div><h3>김종무</h3><p>신입 개발자</p>
    <a href="mailto:rlawhdan363@gmail.com">rlawhdan363@gmail.com</a><nav aria-label="프로필 관련 링크"><a href="https://github.com/j-moo">GitHub ↗</a><button type="button" data-print>포트폴리오 인쇄</button></nav></div></div>
  </section>`;
}
export function skills() {
  return `<section id="stack" data-glass-pane="stack" class="home-section ledger" aria-labelledby="stack-title">
    <span class="section-rule" data-draw-rule aria-hidden="true"></span>
    <h2 id="stack-title" lang="en" data-reveal>Tech Stack</h2>
    <div class="ledger-content skill-groups">${skillGroups.map(group => `
      <section class="skill-group" id="skills-${group.id}" data-reveal>
        <h3>${group.title}</h3>
        <ul class="skill-icons">${group.skills.map(({name, icon}) => `
          <li><button type="button" class="skill-button" data-skill aria-label="${name}" aria-expanded="false">
            <img src="/assets/tech/${icon}" alt="" width="24" height="24" loading="lazy">
            <span class="skill-name" aria-hidden="true">${name}</span>
          </button></li>`).join('')}
        </ul>
      </section>`).join('')}
    </div>
  </section>`;
}

export function education(inGlass = false) {
  return `<section id="education" ${inGlass ? 'data-glass-pane="education" ' : ''}class="${inGlass ? '' : 'container '}home-section ledger" aria-labelledby="education-title">
    <span class="section-rule" data-draw-rule aria-hidden="true"></span>
    <h2 id="education-title" lang="en" data-reveal>Education</h2>
    <div class="ledger-content education-items">
      <article class="education-item" data-reveal>
        <h3>삼성청년SW·AI아카데미 <span>(SSAFY)</span></h3>
        <p class="education-meta">15기 수료 · <time datetime="2026-01">26.01</time> ~ <time datetime="2026-12">26.12</time></p>
        <div class="semesters">
          <section>
            <h4>1학기 · SW·AI 이론 및 실습 925시간</h4>
            <ul>
              <li>Python · 자료구조 · 알고리즘</li>
              <li>웹 개발(Django·Vue) · 데이터베이스(SQL)</li>
              <li>인공지능 · 머신러닝 기초</li>
              <li><button type="button" class="education-project" data-open-project="flex">Flex_Log</button> · 1학기에 배운 내용을 모두 아우르는 관통 프로젝트</li>
            </ul>
          </section>
          <section>
            <h4>2학기 · 팀 프로젝트</h4>
            <ul>
              <li><button type="button" class="education-project" data-open-project="melly">Melly</button> · WebRTC를 이용한 팬미팅 서비스</li>
              <li><button type="button" class="education-project" data-open-project="ddubi">DDUBI</button> · 머신러닝을 이용한 대중교통 사용자 일정 맞춤 경로 추천 서비스</li>
              <li><button type="button" class="education-project" data-open-project="tingle">Tingle</button> · BLE를 이용한 소개팅 앱 서비스</li>
            </ul>
          </section>
        </div>
      </article>
      <article class="education-item university" data-reveal>
        <h3>동아대학교 기계공학과</h3>
        <p class="education-meta">2017년 3월 입학 · 2024년 2월 졸업</p>
      </article>
    </div>
  </section>`;
}

export function home() {
  return `<div id="stage" tabindex="-1"><picture class="desk-light" aria-hidden="true"><source media="(max-width: 700px)" srcset="/assets/desk-reference-mobile.webp"><img src="/assets/desk-reference-clean.webp" width="640" height="640" alt="" fetchpriority="high"></picture>${hero()}
    <section id="collection" class="glass-field" data-stage-scene="glass" data-glass-host aria-label="포트폴리오 열람">
      <div class="glass-shell" data-glass-shell>
        <nav class="glass-rail" data-glass-nav aria-label="포트폴리오 항목">${destinations.map(d=>`<button type="button" id="tab-${d.id}" class="rail-link" data-open-pane="${d.id}" data-glass-tab="${d.id}" aria-label="${d.railLabel}"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round">${d.icon}</svg><span class="rail-tip" aria-hidden="true">${d.railLabel}</span></button>`).join('')}<button type="button" class="rail-back" data-open-desk aria-label="명함으로 돌아가기"><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m10 5-7 7 7 7M4 12h16"/></svg><span class="rail-tip" aria-hidden="true">명함으로 돌아가기</span></button></nav>
        <div class="glass-reader" data-stage-reader>
          <section id="pane-projects" data-glass-pane="projects" aria-labelledby="projects-title">${projectLibrary()}</section>
          ${artist()}${skills()}${education(true)}

        </div>
      </div>
    </section></div>`;
}
