import { projectSummaries, projectInterview } from './cases.mjs';
import { notes } from './portfolio-data.mjs';

const projects = {
  flex: {
    icon: '<path d="M15 9.5h23v34.2l-4-2.8-3.6 2.8-3.7-2.8-3.7 2.8-3.7-2.8-4.3 2.8z"/><path d="M20.5 18.2h12m-12 6.2h12m-12 6.3h6.3"/>',
    intro: 'SSAFY 1학기에 배운 내용을 아우른 관통 프로젝트입니다. 사진에 금액과 카테고리를 붙여 소비를 기록하고, 친구의 피드와 한 달의 지출을 확인합니다.',
    contribution: '두 명이 함께 서비스를 기획했습니다. 저는 가입과 첫 소비 기록을 직접 따라가며 빠진 기능을 찾아 수정을 요청했습니다.',
    screens: [['flex-landing', 1200, 750, '시작 버튼이 보이는 Flex_Log 랜딩', '팀 소스에서 렌더한 랜딩 화면', [480, 768]], ['flex-feed', 949, 916, '사진과 지출 금액이 함께 나오는 소비 기록 피드', '첫 소비가 올라간 팀 개발 미리보기']],
    feature: '가입에서 첫 소비 기록까지',
    flow: ['가입 폼', '계정·프로필 저장', '카테고리 선택', '사진과 금액 기록'],
    work: '팀이 만든 ERD의 제약을 가입 폼, API, DB의 입력 조건과 대조했습니다. 월별 분석에서도 기록이 비어 있는 달과 소비 내역이 있는데 분석 호출이 실패한 달을 나눠 처리하는 흐름을 점검했습니다.',
    issue: '계정은 남았는데 가입을 끝낼 수 없었습니다.',
    diagnosis: '계정과 프로필 저장이 분리돼 있었습니다. 프로필 생성이 실패하면 계정만 남을 수 있었고, 가입 후 첫 기록에 필요한 카테고리 목록도 비어 있었습니다.',
    change: '수정된 가입 API는 사용자와 프로필을 같은 트랜잭션에 저장합니다. 한쪽에서 실패하면 두 작업이 함께 취소됩니다. 기본 카테고리는 초기 데이터로 제공해 첫 소비를 기록할 때 바로 선택할 수 있습니다.',
    results: [
      {title:'가입과 첫 기록의 판정 조건', columns:['확인한 조건','코드·초기 데이터에서 확인한 결과'], rows:[['프로필 저장 실패','같은 트랜잭션의 계정 생성도 취소'],['첫 소비 기록','기본 카테고리 8개를 선택지로 제공']]},
    ],
    evidence: '6월 15일 가입 모델·API 점검 및 공개 가입 코드의 트랜잭션 범위',
  },
  melly: {
    icon: '<rect x="8.8" y="16" width="25.5" height="20.2" rx="5.4"/><path d="m34.3 23.2 9.1-5.1v16l-9.1-5.1"/><path d="M15.2 22.3h6.4"/>',
    intro: '팬이 행사에 응모해 당첨을 확인하고 순번을 기다립니다. 차례가 오면 WebRTC 영상 방에서 인플루언서와 일대일로 만납니다.',
    contribution: '로그인과 팬미팅 목록의 초기 화면을 직접 설계하고 담당 프런트엔드를 팀 API와 연결했습니다. 후속 회귀 테스트에서는 입장 토큰이 유효할 때 행사 상태 조회가 실패해도 영상 방이 열렸습니다.',
    screens: [['melly-home', 1425, 891, '폴라로이드 사진이 놓인 Melly 웹 랜딩', '개발 미리보기의 서비스 랜딩', [480, 768]]],
    feature: '팬이 자기 차례에 통화하도록',
    flow: ['행사 목록', '응모·당첨 확인', '순번 대기', '영상 방 입장'],
    work: '로그인 다음에 팬이 행사 날짜와 진행 상태를 보고 참여할 수 있는 팬미팅을 찾도록 목록을 구성했습니다. 영상 방에서는 접속에 필요한 토큰과 타이머·종료 안내에 쓰는 행사 상태를 따로 다뤘습니다.',
    issue: '입장 토큰이 정상인데 영상 방이 열리지 않았습니다.',
    diagnosis: '토큰 발급과 행사 상태 조회가 모두 성공해야 입장하는 구조였습니다. 타이머에 쓸 보조 정보의 오류도 통화 전체를 중단시켰습니다.',
    change: '두 요청을 함께 시작하고 결과를 각각 판정했습니다. 유효한 토큰이 있으면 영상 방을 표시하고, 상태 조회 실패는 안내와 재시도로 처리했습니다.',
    results: [
      {title:'8월 10일 인플루언서 입장 회귀 테스트', columns:['입력·검사','관찰'], rows:[['입장 토큰','정상 응답'],['행사 상태 조회','실패 응답 주입'],['렌더된 화면','영상 방 컴포넌트와 오류 안내가 함께 표시됨']]},
    ],
    evidence:'LiveKit 컴포넌트를 대체하고 폴링을 끈 회귀 테스트 환경. 아래 영상은 팬의 당첨 확인·입장 대기 팀 시연입니다.',
  },
  ddubi: {
    icon: '<circle cx="14" cy="35.5" r="4.6"/><circle cx="38" cy="16" r="4.6"/><path d="M14 31v-6.3a5 5 0 0 1 5-5h6.3a5 5 0 1 1 0 10h-1.1a4.5 4.5 0 0 0 0 9h7.6a6.2 6.2 0 0 0 6.2-6.2V20.6"/>',
    intro: '사용자가 등록한 약속에 맞춰 대중교통 경로와 출발 시각을 추천합니다. 제가 맡은 모델이 계산하는 값은 인접한 두 정류장 사이 버스 구간의 평균 이동시간입니다.',
    contribution: '데이터 연산·분산 백엔드를 맡아, 머신러닝 모델이 버스 구간 운행시간을 예측할 때 쓸 입력과 평가 기준을 점검했습니다. 수집 담당자와 실제 확보할 수 있는 값을 정하고, 5002번은 예약 표기와 정류장 순서를 직접 대조했습니다.',
    screens: [['ddubi-home', 717, 1440, '오늘 일정과 출발 안내가 보이는 DDUBI 앱 홈', '실기기에 표시된 오늘의 일정', [240, 384]], ['ddubi-schedule', 643, 1250, '약속 날짜와 시간을 입력하는 일정 등록 화면', '일정 등록 화면', [240, 384]]],
    feature: '일정을 버스 구간 이동시간과 연결하기',
    flow: ['경로의 버스 후보', '공식 노선 식별', '인접 정류장 연결', '구간 평균시간 계산'],
    work: '경로 응답 네 개를 고정하고 차량 대안별로 공식 노선을 대조했습니다. 시간 예측은 실제 예측 시점에 구할 수 있는 입력을 골라 같은 검증집합에서 과거 중앙값과 학습 모델을 비교했습니다.',
    issue: '경로에는 5002번 하나, 공식 자료에는 세 노선이 있었습니다.',
    diagnosis: '5002A·5002B·5002(예약)가 비슷한 구간을 지나갔습니다. 화면의 번호만 같다고 묶으면 다른 차량의 운행시간을 가져올 수 있었습니다.',
    change: '경로 상세의 예약 표기와 정류장 순서를 공식 자료와 대조했습니다. 검증한 경로와 마스터 조건에서만 해당 대안을 5002(예약)에 연결했습니다.',
    results: [
      {title:'공식 노선에 연결한 차량 대안', columns:['판본','개발 경로 응답 4개 · 차량 대안 170건'], rows:[['v3','169/170건'],['v4','170/170건 · 기존 169건의 배정 유지']]},
      {title:'인접 정류장 구간 평균 운행시간 예측', columns:['계산 기준','평균 절대 오차'], rows:[['과거 중앙값','27.61초'],['선정 모델','26.04초']]},
    ],
    evidence:'이동시간 오차는 학습 4,999,590행과 검증 999,894행을 고정한 오프라인 구간 평가에서 측정했습니다.',
  },
  tingle: {
    icon: '<path d="M20 23.4a8.3 8.3 0 1 1 11.7-1.8"/><path d="m21.4 20.8 4.4-3.1a4 4 0 0 1 5.6 1l9.1 13.2a4 4 0 0 1-1 5.6l-9.2 6.4a4 4 0 0 1-5.6-1l-9.1-13.2a4 4 0 0 1 1-5.6l4.8-3.3Z"/><circle cx="31.9" cy="34.4" r="2.2"/>',
    intro: '두 사람이 스쳐 갈 때 BLE 키링끼리 프로필 조건을 비교합니다. 조건이 맞으면 키링이 빛과 진동으로 알리고, 앱에서 두 사람 모두 만남 제안을 수락하면 채팅방이 열립니다.',
    contribution: 'IoT를 맡아 키링이 만남을 확정하고 저장하는 조건을 점검했습니다. 보드와 휴대폰을 바꿔 가며 시험했고, 매칭이 멈췄을 때 기존 기록을 지우지 않고 원인을 읽을 수 있도록 진단 항목을 정했습니다.',
    screens: [['tingle-landing', 1200, 675, 'Tingle 로고가 보이는 웹 랜딩', '서비스 인트로 마지막 장면', [480, 768]]],
    feature:'두 키링이 각각 저장한 만남을 하나의 제안으로 연결하기',
    flow:['BLE로 조건 비교', '각 키링에 만남 저장', '앱에서 양쪽 기록 동기화', '상호 수락 후 채팅'],
    work:'Zephyr 펌웨어는 처음 확정한 만남을 비휘발성 저장소(NVS)에 남기고, 같은 무선 메시지가 다시 오면 메모리에서 응답합니다. 11월 17일에는 팀원과 개발 기기 한 쌍의 양쪽 기록이 서버에 접수되고, 두 사람이 제안을 수락해 채팅방이 열리는 과정까지 확인했습니다.',
    issue:'키링이 다시 울리지 않을 때, 어느 단계에서 멈췄는지 어떻게 알 수 있을까?',
    diagnosis:'기존 USB 출력에는 기록 건수만 있어 상대를 찾지 못한 경우와 이미 만난 상대의 알림을 억제한 경우를 구별하기 어려웠습니다. 상대별 기록을 읽는 기능을 추가한 뒤에도 실물에서는 긴 목록을 보낼 때 로그 출력이 밀려 몇 줄이 빠졌습니다.',
    change:'상태 조회(MATCH STATUS)로 설정 적용 여부를, 기록 조회(MATCH RECORDS)로 상대별 매칭 단계와 억제 사유를 읽도록 했습니다. 앞선 로그를 내보낸 뒤 다음 줄을 출력하도록 바꾸고, 실물 보드에서 예상 건수와 종료 표시를 함께 확인했습니다.',
    results:[
      {title:'11월 17일 · 펌웨어 0.9.14-d31 · 실물 보드 1대', columns:['USB 조회','완료한 조회','확인한 응답'], rows:[['기기 상태','2/2회','상태와 종료 표시'],['전체 기록','3/3회','회당 11건과 종료 표시'],['상대별 기록','3/3회','회당 3건과 종료 표시']]},
    ],
    evidence:'한 보드에서 USB 조회 8/8회가 끝까지 응답했습니다. 조회 전후 등록 영역과 만남 영역의 SHA-256도 각각 같아 저장된 데이터를 그대로 읽었음을 확인했습니다.',
    assembly:[['tingle-hardware-1200',1200,1600,'키링용 기판, 배터리, LED와 연결선','BLE 키링의 기판과 주변 모듈'],['tingle-accept',1200,944,'Tingle 앱의 만남 제안 수락 확인 창','11월 17일 · 앱에서 만남 제안 수락']],
  },
};

function escapeText(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function screenGallery(screens, layout='') {
  return `<div class="cr-gallery ${layout}">${screens.map(([name, width, height, alt, caption, variants]) => {
    const url = '/assets/' + name + '.webp';
    let responsive = '';
    if (variants) {
      const candidates = variants.map(size => `/assets/${name}-${size}.webp ${size}w`);
      candidates.push(`${url} ${width}w`);
      responsive = ` srcset="${candidates.join(', ')}" sizes="(max-width: 600px) 72vw, 520px"`;
    }
    if (name === 'tingle-hardware-1200') {
      responsive = ' srcset="/assets/tingle-hardware-480.webp 480w, /assets/tingle-hardware-768.webp 768w, /assets/tingle-hardware-1200.webp 1200w" sizes="(max-width: 600px) 72vw, 360px"';
    }
    return `<figure><button type="button" class="cr-image" data-image-open data-image-src="${url}" data-caption="${escapeText(caption)}" aria-label="${escapeText(caption)} 크게 보기">
      <img src="${url}"${responsive} alt="${escapeText(alt)}" width="${width}" height="${height}" loading="lazy" decoding="async">
      <span aria-hidden="true">⤢</span></button><figcaption>${escapeText(caption)}</figcaption></figure>`;
  }).join('')}</div>`;
}

function resultTable({title, columns, rows}) {
  return `<table class="cr-result-table"><caption>${title}</caption><thead><tr>${columns.map(col => `<th scope="col">${col}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(([label, ...values]) => `<tr><th scope="row">${label}</th>${values.map(value => `<td>${value}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

function measurementChart(title, limit, unit, rows) {
  const description = rows.map(([label, value]) => label + ' ' + value + unit).join(', ');
  return `<figure class="cr-measure"><figcaption>${title}</figcaption>
    <div role="img" aria-label="${escapeText(description + '. 눈금은 0부터 ' + limit + unit + '까지입니다.')}">
      ${rows.map(([label, value]) => `<div class="cr-bar-row">
        <span>${label}</span><div class="cr-bar-track"><i style="--bar-length:${Number(value) / limit * 100}%"></i></div><b>${value}${unit}</b>
      </div>`).join('')}
      <div class="cr-bar-axis" aria-hidden="true"><span>0</span><span>${limit}${unit}</span></div>
    </div></figure>`;
}

function resultFigures(id) {
  if (id === 'ddubi') {
    return measurementChart('인접 정류장 구간 평균 운행시간의 평균 절대 오차', 30, '초', [
      ['과거 중앙값', '27.61'], ['선정 모델', '26.04'],
    ]);
  }
  if (id === 'tingle') {
    return measurementChart('실물 보드 한 대에서 끝까지 응답한 USB 조회 횟수', 3, '회', [
      ['기기 상태', '2'], ['전체 기록', '3'], ['상대별 기록', '3'],
    ]);
  }
  if (id === 'flex') {
    return `<figure class="cr-initial-data"><figcaption>첫 소비 기록에 준비한 기본 카테고리</figcaption>
      <div><strong>8개</strong><span class="cr-category-marks" aria-hidden="true">${'<i></i>'.repeat(8)}</span></div></figure>`;
  }
  return `<figure class="cr-recovery"><figcaption>8월 10일 인플루언서 입장 회귀 테스트</figcaption>
    <div class="cr-path"><div><span>입장 토큰 <b>정상</b></span><span>행사 상태 <b>조회 실패</b></span></div>
    <i aria-hidden="true">→</i><strong>영상 방 표시<br>오류 안내 표시</strong></div></figure>`;
}

function demoPlayer(demo, id) {
  if (!demo) return '';
  const [file, poster, width, height, description, caption] = demo;
  const preview = id === 'tingle' ? 'tingle-demo-480.webp' : poster;
  return `<figure class="cr-demo"><video controls playsinline preload="none" width="${width}" height="${height}" poster="/assets/${preview}" aria-label="${escapeText(description)}">
    <source src="/assets/${file}" type="video/mp4"></video><figcaption>${escapeText(caption)}</figcaption></figure>`;
}

function fullNotes(project) {
  const records = notes.filter(note => note.project === project.name).sort((a, b) => a.date.localeCompare(b.date));
  return records.map(note => `<details class="cr-note" data-note-id="${note.id}"><summary>
    <time datetime="${note.date.replaceAll('.', '-')}">${note.date}</time><span>${escapeText(note.title)}</span></summary>
    <div class="cr-note-body"><p class="cr-note-lead">${escapeText(note.summary)}</p>${note.sections.map(([heading, paragraph]) =>
      `<h4>${escapeText(heading)}</h4><p>${escapeText(paragraph)}</p>`).join('')}</div></details>`).join('');
}

function technique(label, values) {
  return `<div><dt>${label}</dt><dd>${values.map(value => `<span>${escapeText(value)}</span>`).join('')}</dd></div>`;
}

function detail(project, i) {
  const item = projects[project.id];
  const {team, demo} = projectInterview(project.id);
  const count = projectSummaries.length;
  const previous = projectSummaries[(i + count - 1) % count];
  const next = projectSummaries[(i + 1) % count];
  const title = 'library-title-' + project.id;
  const galleryLayout = project.id === 'ddubi' ? 'cr-phones' : project.id === 'flex' ? 'cr-flex-gallery' : '';
  return `<article class="cr-detail cr-${project.id}" data-project-detail="${project.id}" aria-labelledby="${title}">
    <button class="cr-return" data-open-pane="projects" type="button"><span aria-hidden="true">←</span> 프로젝트 목록</button>
    <header class="cr-intro"><p class="cr-period">${project.period} <span aria-hidden="true">/</span> ${team}</p>
      <h2 id="${title}" data-project-title tabindex="-1" lang="en">${project.name}</h2><p class="cr-service">${project.service}</p>
      <dl class="cr-role"><div><dt>내 역할</dt><dd>${project.role}</dd></div></dl>
    </header>
    <section class="cr-section"><h3>프로젝트 소개</h3><p>${item.intro}</p>${screenGallery(item.screens, galleryLayout)}
      <h4 class="cr-stack-title">기술 스택</h4><dl class="cr-stack">${technique('사용 언어',project.languages)}${technique('프레임워크·라이브러리',project.frameworks)}${technique('기타 기술',project.tools)}</dl>
    </section>
    <section class="cr-section"><h3>주요 기능 개발</h3><h4>${item.feature}</h4>
      <ol class="cr-flow" aria-label="주요 기능의 흐름">${item.flow.map(step => `<li>${step}</li>`).join('')}</ol>
      <p>${item.contribution}</p><p>${item.work}</p>${item.assembly ? screenGallery(item.assembly, 'cr-assembly') : ''}${demoPlayer(demo, project.id)}
    </section>
    <section class="cr-section"><h3>트러블슈팅</h3><h4>${item.issue}</h4>
      <dl class="cr-trouble"><div><dt>원인</dt><dd>${item.diagnosis}</dd></div><div><dt>해결</dt><dd>${item.change}</dd></div></dl>
      ${resultFigures(project.id)}${item.results.map(resultTable).join('')}<p class="cr-source">${item.evidence}</p>
    </section>
    <section class="cr-section cr-journal" aria-labelledby="cr-journal-${project.id}"><h3 id="cr-journal-${project.id}">개발 기록</h3>${fullNotes(project)}</section>
    <nav class="cr-adjacent" aria-label="${project.name}에서 다른 프로젝트로 이동">
      <button type="button" data-open-project="${previous.id}"><small>← 이전 프로젝트</small><span>${previous.name}</span></button>
      <button type="button" data-open-project="${next.id}"><small>다음 프로젝트 →</small><span>${next.name}</span></button></nav>
  </article>`;
}

export function projectLibrary() {
  return `<div class="cr-library"><div class="cr-picker" data-project-picker>
    <h2 id="projects-title" data-picker-title tabindex="-1" lang="en">Projects</h2>
    <div class="cr-apps">${projectSummaries.map(project => `<button class="cr-app cr-tile-${project.id}" type="button" data-open-project="${project.id}" aria-label="${project.name} 프로젝트 열기">
      <span class="cr-icon"><svg viewBox="0 0 52 52" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">${projects[project.id].icon}</svg></span>
      <span class="cr-app-name" lang="en">${project.name}</span></button>`).join('')}</div>
    <noscript><p>아래에서 네 프로젝트의 상세와 개발 기록을 차례로 읽을 수 있습니다.</p></noscript>
  </div>${projectSummaries.map(detail).join('')}</div>`;
}
