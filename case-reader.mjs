import { projectSummaries } from './cases.mjs';
import { applicationCases } from './application.mjs';

const icons = {
  flex: '<path d="M15 9.5h23v34.2l-4-2.8-3.6 2.8-3.7-2.8-3.7 2.8-3.7-2.8-4.3 2.8z"/><path d="M20.5 18.2h12m-12 6.2h12m-12 6.3h6.3"/>',
  melly: '<rect x="8.8" y="16" width="25.5" height="20.2" rx="5.4"/><path d="m34.3 23.2 9.1-5.1v16l-9.1-5.1"/><path d="M15.2 22.3h6.4"/>',
  ddubi: '<circle cx="14" cy="35.5" r="4.6"/><circle cx="38" cy="16" r="4.6"/><path d="M14 31v-6.3a5 5 0 0 1 5-5h6.3a5 5 0 1 1 0 10h-1.1a4.5 4.5 0 0 0 0 9h7.6a6.2 6.2 0 0 0 6.2-6.2V20.6"/>',
  tingle: '<path d="M20 23.4a8.3 8.3 0 1 1 11.7-1.8"/><path d="m21.4 20.8 4.4-3.1a4 4 0 0 1 5.6 1l9.1 13.2a4 4 0 0 1-1 5.6l-9.2 6.4a4 4 0 0 1-5.6-1l-9.1-13.2a4 4 0 0 1 1-5.6l4.8-3.3Z"/><circle cx="31.9" cy="34.4" r="2.2"/>',
};

const development = {
  flex: {
    overview: '사진에 금액과 카테고리를 붙여 소비를 기록합니다. 친구의 소비는 피드에서, 내 지출은 월별 화면에서 확인합니다.',
    feature: '가입한 사용자가 첫 소비를 기록하기까지',
    work: '가입 폼에 입력한 값이 계정과 프로필에 어떻게 저장되는지 대조하고, 첫 소비를 입력할 때 선택할 카테고리가 준비돼 있는지 점검했습니다.',
    issue: '프로필 저장이 실패하면 계정만 남을 수 있었고, 새 계정의 소비 카테고리가 비어 있었습니다.',
    fix: '계정·프로필은 같은 트랜잭션에서 저장하거나 함께 취소되도록 수정 조건을 정했습니다. 수정된 코드와 초기 데이터에서 기본 카테고리 8개를 확인했습니다.'
  },
  melly: {
    overview: '팬은 행사에 응모하고 당첨 여부와 대기 순서를 확인합니다. 자기 차례가 되면 영상 방에서 인플루언서와 일대일로 만납니다.',
    feature: '팬미팅을 찾고 영상 방에 입장하는 흐름',
    work: '팬이 날짜와 진행 상태를 보고 참여할 행사를 찾도록 로그인과 목록 화면을 설계했습니다. 인플루언서 화면에서는 영상 입장 토큰과 타이머에 쓰는 행사 상태를 따로 처리했습니다.',
    issue: '입장 토큰이 정상이더라도 행사 상태 조회가 실패하면 영상 방까지 열리지 않았습니다.',
    fix: '토큰이 유효하면 방을 열고 행사 상태 오류는 따로 안내하도록 분기를 나눴습니다. 상태 조회만 실패시킨 회귀 테스트에서 영상 방과 안내가 함께 표시됐습니다. 카메라·마이크 송수신은 이 테스트의 범위 밖입니다.'
  },
  ddubi: {
    overview: '사용자가 약속 장소와 시각을 등록하면 서비스가 대중교통 경로와 출발 시각을 추천합니다. 제가 다룬 예측 단위는 경로 안의 인접한 두 버스 정류장 사이입니다.',
    feature: '경로의 버스 후보를 구간별 운행시간에 연결',
    work: '머신러닝·분산 백엔드를 맡아 경로 응답의 버스 후보를 공식 노선과 연결하고, 예측 시점에 확보할 수 있는 입력으로 인접 정류장 사이의 평균 운행시간을 평가했습니다.',
    issue: '경로에 표시된 5002번에 대응하는 공식 노선이 세 개여서 번호만으로는 운행시간을 연결할 수 없었습니다.',
    fix: '예약 표기와 정류장 순서를 직접 대조해 해당 후보를 5002(예약)로 연결했습니다. 고정한 개발 경로 응답 4개에서 공식 노선과 연결된 차량 대안은 169/170건에서 170/170건이 됐습니다.'
  },
  tingle: {
    overview: '근처의 두 키링이 BLE로 조건을 비교하고 만남을 알립니다. 이후 두 사용자가 앱에서 제안을 수락하면 채팅방이 열립니다.',
    feature: '두 키링에서 저장한 만남을 앱에서 확인',
    work: 'BLE 키링이 만남을 확정하고 비휘발성 메모리에 저장하는 조건을 점검했습니다. 보드와 휴대폰을 바꿔 시험하고, 양쪽 기록이 동기화된 뒤 상호 수락으로 채팅방이 열리는 과정은 팀원과 함께 확인했습니다.',
    issue: '키링이 다시 울리지 않을 때 누적 건수만으로는 상대를 발견하지 못했는지, 이미 만난 상대의 알림을 건너뛰었는지 알기 어려웠습니다.',
    fix: '기존 기록을 보존하면서 상대별 상태를 조회하는 조건을 정했습니다. 긴 목록에서 빠진 줄은 출력 순서를 조정한 뒤 실물 보드 한 대에서 확인했습니다. 상태·전체 기록·상대별 기록 조회 8회 모두 마지막 줄까지 출력됐습니다.'
  }
};

function detail(project, index) {
  const item=applicationCases[project.id];
  const dev=development[project.id];
  const adjacent=offset => projectSummaries[(index+offset+projectSummaries.length)%projectSummaries.length];
  return `<article class="cr-detail cr-${project.id}" data-project-detail="${project.id}" aria-labelledby="library-title-${project.id}">
    <button class="cr-return" data-open-pane="projects" type="button">← 프로젝트 목록</button>
    <header class="cr-intro"><p class="cr-period">${item.team} · ${project.period}</p><h2 id="library-title-${project.id}" data-project-title tabindex="-1" lang="en">${project.name}</h2>
      <p class="cr-service">${item.service}</p><dl class="cr-role"><div><dt>내 역할</dt><dd>${project.role}</dd></div></dl></header>
    <section class="cr-section"><h3>프로젝트 소개</h3><p>${dev.overview}</p><dl class="cr-stack"><div><dt>팀 기술 스택</dt><dd>${[...project.languages,...project.frameworks,...project.tools].map(name=>`<span>${name}</span>`).join('')}</dd></div></dl>
      <h4>내 기여</h4><p>${item.role}</p></section>
    <section class="cr-section"><h3>주요 기능 개발</h3><h4>${dev.feature}</h4><p>${dev.work}</p></section>
    <section class="cr-section"><h3>트러블슈팅</h3><dl class="cr-trouble"><div><dt>문제</dt><dd>${dev.issue}</dd></div><div><dt>해결과 검증</dt><dd>${dev.fix}</dd></div></dl></section>
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
    <noscript><p>아래에서 네 프로젝트의 개발 사례를 차례로 볼 수 있습니다.</p></noscript>
  </div>${projectSummaries.map(detail).join('')}</div>`;
}
