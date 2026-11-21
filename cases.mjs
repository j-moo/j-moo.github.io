// Public summaries are shared by the index, search and the case headers.
export const projectSummaries = [
  {
    id: 'flex', name: 'Flex_Log',
    service: '사진으로 소비를 기록하고 친구와 나누는 소셜 가계부',
    role: '공동 기획 · 가입과 첫 소비 기록 흐름 점검',
    period: '2026.05 기획 · 06 개발',
    summary: '가입 코드에서 계정·프로필의 동시 롤백을 확인하고, 첫 소비에 쓸 기본 카테고리 8개를 채웠습니다.',
    languages: ['Python', 'JavaScript'], frameworks: ['Django REST Framework', 'Vue 3'], tools: ['Pinia', 'SQLite'],
  },
  {
    id: 'melly', name: 'Melly',
    service: 'WebRTC를 이용한 일대일 영상 팬미팅 서비스',
    role: '프런트엔드 · 화면 설계와 API 연동',
    period: '2026.07.13–08.07 · 08.10 후속 수정',
    summary: '상태 조회만 실패시킨 인플루언서 입장 테스트에서 영상 화면과 오류 안내가 함께 표시됐습니다.',
    languages: ['TypeScript', 'Java'], frameworks: ['React', 'Spring Boot'], tools: ['LiveKit', 'WebRTC'],
  },
  {
    id: 'ddubi', name: 'DDUBI',
    service: '머신러닝을 이용한 대중교통 사용자 일정 맞춤 경로 추천 서비스',
    role: '머신러닝·분산 백엔드 · 버스 구간 데이터 연산과 운행시간 예측 모델 검증',
    period: '2026.08–09',
    summary: '개발 경로 네 개에서 공식 노선과 연결한 차량 대안이 169/170건에서 170/170건이 됐습니다.',
    languages: ['Python', 'Dart', 'Java'], frameworks: ['Flutter', 'Spring Boot', 'FastAPI'], tools: ['MySQL', 'Redis', 'Apache Spark', 'pandas', 'NumPy'],
  },
  {
    id: 'tingle', name: 'Tingle',
    service: 'BLE 키링으로 스친 만남을 연결하는 소개팅 앱 서비스',
    role: 'IoT · BLE 키링 펌웨어, 만남 기록 저장·복구, 실물 연동 검증',
    period: '2026.10.05–11.18',
    summary: '키링이 남긴 만남 기록으로 매칭이 멈춘 단계를 추적하고, 앱 동기화부터 양쪽 수락까지 실물 기기로 확인했습니다.',
    languages: ['C', 'Kotlin', 'Java'], frameworks: ['Compose Multiplatform', 'Spring Boot'], tools: ['Zephyr RTOS', 'BLE·GATT', 'Zephyr NVS', 'PostgreSQL'],
  },
];

const cases = {
  flex: {
    team: '2인 팀',
    titleLines: ['소셜', '가계부'],
    dates: ['05–06', '5월 기획 · 6월 개발'],
    cover: ['flex-landing.webp', 1200, 750, 'Flex-Log 로고 아래 시작 버튼이 보이는 첫 화면', '웹 랜딩 · 팀 소스로 정적 렌더'],
    intro: '소비 사진에 금액과 카테고리를 붙여 친구와 공유하고, 한 달의 지출을 돌아보는 서비스입니다.',
    problem: '첫 소비를 쓰기 전부터 가입에서 오류가 났고, 기록에 붙일 카테고리 목록도 비어 있었습니다.',
    featureTitle: '가입에서 첫 소비 기록까지',
    approach: '저는 계정 생성부터 프로필 저장, 카테고리 선택까지 순서대로 짚었습니다. 팀 설계도에 있는 제약과 실제 가입 폼·API·DB의 입력 조건을 대조하도록 요청했습니다.',
    contribution: '두 명이 서비스를 함께 기획했습니다. 저는 가입과 소비 기록에서 빠진 기능을 찾아 수정을 요청했습니다.',
    issue: '가입을 마친 사람이 첫 기록을 쓸 수 있도록',
    finding: '기본 카테고리 8개',
    scope: '첫 소비를 기록할 때 선택할 수 있도록 초기화한 항목',
    outcome: '계정과 프로필을 한 트랜잭션에 묶어 프로필 저장에 실패하면 계정도 함께 취소되도록 했습니다. 첫 기록을 쓸 때 선택할 기본 카테고리 8개도 초기화했습니다.',
    learning: '첫 소비를 쓰려면 빈 카테고리 테이블에 사용자가 고를 항목까지 미리 넣어 둬야 한다는 걸 배웠습니다.',
    evidence: ['가입 트랜잭션 코드', 'https://github.com/j-moo/Flex_Log/blob/00fc74510ab3a80185d14e71f79f5e55917dac20/Backend/accounts/views.py#L20-L22'],
    journal: ['가입 오류를 추적한 기록', '/notes/flex-signup/'],
    next: ['melly', '영상 통화 입장 문제'],
  },
  melly: {
    team: '팀 프로젝트',
    titleLines: ['영상', '팬미팅'],
    dates: ['07.13–08.07', '8월 10일 입장 오류 후속 수정'],
    cover: ['melly-home.webp', 1425, 891, '분홍색 배경에 폴라로이드 사진 두 장이 놓인 Melly 첫 화면', '웹 랜딩 · 개발 미리보기'],
    intro: '팬이 행사에 응모하고 자기 차례에 영상 방으로 들어가 인플루언서와 통화하는 서비스입니다.',
    problem: '영상 통화 입장 토큰을 정상적으로 받아도 행사 상태 조회가 실패하면 영상 방 전체가 열리지 않았습니다.',
    featureTitle: '팬미팅을 찾고 내 차례에 통화하기',
    approach: '행사 목록에서는 날짜와 진행 상태로 참여할 팬미팅을 찾도록 했습니다. 통화 화면에서는 두 요청의 쓰임을 나눴습니다. 토큰은 영상 방 접속에, 행사 상태는 타이머와 종료 안내에 쓰입니다.',
    contribution: '저는 로그인과 팬미팅 목록의 초기 화면을 직접 설계하고 담당 프런트엔드를 팀 API와 연결했습니다. 공식 개발 이후의 회귀 테스트에서는 입장 토큰이 유효할 때 행사 상태 조회가 실패해도 영상 방이 열렸습니다.',
    issue: '입장 토큰이 있는데 영상 방이 열리지 않았다',
    finding: '상태 조회가 실패해도 영상 방에 진입',
    scope: '8월 10일 인플루언서 입장 회귀 테스트',
    outcome: '두 요청의 성공 여부를 따로 판정했습니다. 인플루언서 입장 테스트에서 토큰은 정상으로 두고 상태 요청에만 오류를 주자, 영상 화면과 오류 안내가 함께 표시됐습니다.',
    learning: '같은 화면을 여는 요청도 실패했을 때 사용자가 할 수 있는 일은 달랐습니다. 이 사례에서는 영상 방에 들어갈 조건과 타이머를 보여 줄 조건을 따로 검사했습니다.',
    demo: ['melly-demo.mp4', 'melly-demo.webp', 1120, 630, '팬미팅 당첨을 확인하고 통화 순번을 기다리는 팀 시연', '팀 시연 · 당첨 확인과 입장 대기 · 16초'],
    evidence: ['상태 조회 실패 테스트', '/assets/melly-call-test.txt'],
    journal: ['입장 오류를 재현한 기록', '/notes/call-entry/'],
    next: ['flex', '가입과 첫 소비 기록'],
  },
  ddubi: {
    team: '6인 팀',
    titleLines: ['대중교통', '경로 추천'],
    dates: ['08–09', ''],
    cover: ['ddubi-home.webp', 717, 1440, '오늘의 일정과 교통 통제에 따른 출발 안내가 보이는 앱 홈', '모바일 홈 · 실기기 캡처'],
    intro: '약속 시각에 맞춰 대중교통 경로와 출발 시각을 안내하는 서비스입니다. 제가 맡은 계산에서는 인접한 두 정류장 사이의 버스 이동시간을 다뤘습니다.',
    problem: '경로 검색에는 ‘5002’ 하나만 보였지만 공식 자료에는 5002A, 5002B, 5002(예약)가 있었습니다. 노선을 잘못 고르면 다른 버스의 운행시간이 계산에 들어갑니다.',
    featureTitle: '인접한 두 정류장의 이동시간 계산',
    approach: '같은 경로 응답 네 개를 고정해 차량 대안별로 공식 노선을 비교했습니다. 시간 예측은 정류장 한 쌍을 단위로 삼아, 같은 검증 자료에서 과거 중앙값과 학습 모델의 오차를 비교했습니다.',
    contribution: '데이터 연산·분산 백엔드를 맡아 버스 구간의 운행시간을 예측하는 머신러닝 모델의 입력과 검증 결과를 점검했습니다. 수집 담당자와 실제로 받을 수 있는 입력을 정했고, 5002번은 상세 화면의 예약 표기와 정류장 순서를 직접 대조했습니다.',
    issue: '같은 5002번, 어느 버스의 시간을 써야 할까?',
    finding: '169/170건 → 170/170건',
    scope: '고정한 개발 경로 4개에서 공식 노선에 연결된 차량 대안',
    outcome: '확인한 경로와 마스터 조건에만 예약 노선 ID를 적용했습니다. 개발 경로 네 개에서 연결된 차량 대안이 169/170건에서 170/170건이 됐고, 기존 169건의 배정도 유지됐습니다.',
    learning: '5002번을 확인하며 노선 이름이 겹칠 때는 예약 표기와 정류장 순서까지 대조해야 어느 버스의 시간을 쓸지 정할 수 있다는 걸 배웠습니다.',
    demo: ['ddubi-sequence.mp4', 'ddubi-home.webp', 480, 936, '일정 입력 전후를 순서대로 보여 주는 실기기 캡처 모음', '일정 등록 전후 · 실기기 캡처 6장 · 12초'],
    evidence: ['구간 시간 비교표', '/assets/ddubi-model-comparison.csv'],
    journal: ['예측 입력을 고른 기록', '/notes/prediction-input/'],
    next: ['melly', '영상 통화 입장 문제'],
  },
  tingle: {
    team: '6인 팀',
    titleLines: ['BLE', '소개팅'],
    dates: ['10.05–11.18', ''],
    cover: ['tingle-landing.webp', 1200, 675, 'tingle 로고와 ‘스친 순간, 새로운 시작’이 보이는 랜딩', '웹 랜딩 · 인트로 마지막 장면'],
    intro: '가까이 있는 두 사람의 조건이 맞으면 키링이 빛과 진동으로 알립니다. 앱에서 양쪽이 만남 제안을 수락하면 채팅방이 열립니다.',
    problem: '두 키링이 다시 마주쳐도 알림이 없을 때 USB에서 볼 수 있는 값은 기록 건수뿐이었습니다. 무선 교환이 멈췄는지, 이미 만난 상대라 알림을 억제했는지 판단할 정보가 필요했습니다.',
    featureTitle: '기기에 남은 만남이 앱에서 하나의 제안이 되기까지',
    approach: 'Zephyr 펌웨어는 BLE로 조건이 맞는 상대를 만나면 비휘발성 저장소에 만남을 남깁니다. 완료 메시지가 재전송되면 메모리에서 응답해 같은 만남을 거듭 쓰지 않습니다. 앱을 통해 양쪽 기록이 접수되면 서버가 만남 제안을 만듭니다.',
    contribution: 'IoT를 맡아 보드와 휴대폰을 바꿔 가며 매칭·저장·재부팅을 시험했습니다. 기록을 보존하는 USB 진단 항목을 정하고 팀원과 양쪽 기록의 동기화, 제안 수락, 채팅방 생성을 확인했습니다.',
    issue: '기존 만남을 보존하면서 매칭이 멈춘 단계를 읽을 수 있을까?',
    finding: 'USB 조회 8/8회 완료',
    scope: '11월 17일 · 펌웨어 0.9.14-d31 · 실물 보드 한 대',
    outcome: '설정 상태와 상대별 매칭 단계를 조회하도록 했습니다. 첫 실물 시험에서는 긴 목록의 일부가 빠져, 앞선 로그가 출력될 시간을 주도록 수정했습니다. 같은 보드에서 전체 11건과 상대별 3건이 예상한 횟수만큼 끝까지 출력됐습니다.',
    learning: '기록이 조사 전과 같은지도 확인했습니다. 등록 영역과 만남 영역의 SHA-256을 조회 전후로 비교해 두 영역 모두 바뀌지 않았음을 확인했습니다.',
    demo: ['tingle-demo.mp4', 'tingle-demo.webp', 800, 694, '조립된 키링과 옆 기판의 LED가 함께 켜지는 장면', '실물 시연 · 두 키링의 매칭과 LED 점등 · 14초'],
    evidence: ['USB 진단 시험 기록', '/notes/tingle-usb-diagnostics/'],
    journal: ['기기·앱 연동 시험 읽기', '/notes/tingle-demo/'],
    next: ['ddubi', '버스 노선 검증'],
  },
};

const sectionLinks = [
  ['프로젝트 소개', '#overview'],
  ['주요 기능 개발', '#process'],
  ['트러블슈팅', '#result'],
];

// The interview uses the same first-person record as the standalone case study.
// These prompts address the decision that was different in each project.
const interviewPrompts = {
  flex: ['소비 기록은 어떻게 남기나요?', '두 사람이 함께 기획할 때 어떤 일을 맡았나요?', '첫 소비를 쓰기까지 어디에서 막혔고, 무엇을 살펴봤나요?', '가입과 첫 기록은 어떻게 달라졌나요?', '다음에 같은 흐름을 만든다면 무엇을 먼저 확인할 건가요?'],
  melly: ['팬이 영상 팬미팅에 참여하는 과정은 어떤가요?', '직접 설계하고 연동한 화면은 어디인가요?', '입장 토큰이 있는데도 통화가 열리지 않은 이유는 무엇이었나요?', '바뀐 입장 조건은 어떻게 시험했나요?', '이 경험 이후 화면을 여는 조건을 어떻게 보게 됐나요?'],
  ddubi: ['일정을 등록하면 어떤 경로를 추천하나요?', '경로 추천에서 직접 맡은 계산은 무엇인가요?', '5002번의 이동시간을 구할 때 왜 공식 노선까지 봤나요?', '같은 개발 경로로 다시 검증한 결과는 어땠나요?', '번호가 같은 노선을 만나면 무엇을 대조하나요?'],
  tingle: ['두 사람이 스치면 키링과 앱에서 어떤 일이 일어나나요?', 'IoT 담당으로 직접 맡은 부분은 어디까지인가요?', '키링이 다시 울리지 않을 때 무엇부터 확인했나요?', '실물에서 USB 조회가 끝까지 출력되는지 어떻게 확인했나요?', '진단 과정에서 기존 만남 기록이 유지됐는지 어떻게 판단했나요?']
};

export function projectInterview(id) {
  const item = cases[id];
  const answers = [[item.intro], [item.contribution], [item.problem, item.approach], [item.outcome], [item.learning]];
  return {
    turns: interviewPrompts[id].map((question, i) => ({question, paragraphs: answers[i]})),
    team: item.team, evidence: item.evidence, demo: item.demo
  };
}

function contents() {
  return `<nav class="case-toc" aria-label="프로젝트 목차">${sectionLinks.map(([text, url]) =>
    `<a href="${url}" data-current-section>${text}</a>`).join('')}</nav>`;
}

function photo([file, width, height, alt, caption], { cover = false, responsiveBoard = false } = {}) {
  const url = '/assets/' + file;
  let sizes = '';
  if (responsiveBoard) {
    sizes = ' srcset="/assets/tingle-hardware-480.webp 480w, /assets/tingle-hardware-768.webp 768w, /assets/tingle-hardware-1200.webp 1200w" sizes="(min-width: 900px) 185px, (min-width: 580px) 250px, 42vw"';
  } else if (file === 'tingle-landing.webp') {
    sizes = ' srcset="/assets/tingle-landing-480.webp 480w, /assets/tingle-landing-768.webp 768w, /assets/tingle-landing.webp 1200w" sizes="(max-width: 680px) calc(100vw - 48px), (max-width: 790px) 624px, (min-width: 1100px) 510px, 44vw"';
  }
  return `<figure class="case-photo${cover ? ' case-cover' : ''}"${cover ? ' id="service"' : ''}>
    <a href="${url}" class="case-image-frame" data-image-open data-caption="${caption}" aria-label="${caption} 크게 보기"${cover ? ' data-arrival' : ''}>
      <img src="${url}"${sizes} alt="${alt}" width="${width}" height="${height}" decoding="async" ${cover ? 'fetchpriority="high"' : 'loading="lazy"'}>
      <span class="case-zoom" aria-hidden="true">⤢</span>
    </a><figcaption>${caption}</figcaption>
  </figure>`;
}

function coverGallery(id, cover) {
  if (id !== 'ddubi') {
    return `<div class="case-gallery">${photo(cover, { cover: true })}</div>`;
  }
  const schedule = ['ddubi-schedule.webp', 643, 1250, '일정 정보를 입력하는 DDUBI 앱 등록 화면', '일정 등록 · 모바일 화면 발췌'];
  return `<div class="case-gallery case-phone-pair">${photo(cover, { cover: true })}${photo(schedule)}</div>`;
}

function video(demo, id) {
  const [file, poster, width, height, title, caption] = demo;
  return `<figure id="demo-${id}" class="case-video" tabindex="-1">
    <video controls playsinline preload="none" width="${width}" height="${height}" poster="/assets/${id === 'tingle' ? 'tingle-demo-480.webp' : poster}" aria-label="${title}">
      <source src="/assets/${file}" type="video/mp4">
    </video>
    <figcaption><span>${caption}</span><a class="text-link" href="/assets/${file}">영상 열기</a></figcaption>
  </figure>`;
}

function compareTable(caption, columns, rows) {
  return `<table class="case-table"><caption>${caption}</caption>
    <thead><tr>${columns.map(column => `<th scope="col">${column}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(([rowLabel, ...values]) => `<tr><th scope="row">${rowLabel}</th>${values.map(value =>
      `<td>${value}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

function featureMedia(id, item) {
  if (id === 'flex') {
    return photo(['flex-feed.webp', 949, 916, '소비 사진과 금액이 함께 보이는 피드', '소비 기록 피드 · 팀 미리보기']);
  }
  if (id === 'tingle') {
    const board = photo(['tingle-hardware-1200.webp', 1200, 1600, '흰 바닥에 키링 기판, 배터리, 선이 달린 모듈이 나란히 놓여 있다.', 'Tingle 키링의 기판과 배선'], { responsiveBoard: true });
    const app = photo(['tingle-accept.webp', 1200, 944, '‘이 제안을 수락할까요?’라는 안내 아래 ‘수락하기’와 ‘다시 생각하기’ 버튼이 보인다.', '11월 17일 앱 시험 · 만남 제안 수락 확인창']);
    return `<div class="case-photo-pair">${board}${app}</div>`;
  }
  return video(item.demo, id);
}

function resultMedia(id) {
  if (id === 'flex') {
    return compareTable('가입과 첫 기록을 확인한 조건', ['사용 흐름', '확인한 동작'],
      [['프로필 저장 실패', '같은 트랜잭션의 계정 생성도 취소'], ['첫 소비 기록', '기본 카테고리 8개 초기화']]);
  }
  if (id === 'melly') {
    return compareTable('8월 10일 · 인플루언서 입장 오류 주입 테스트', ['검사 항목', '설정과 관찰'],
      [['입장 토큰', '정상 응답'], ['행사 상태 조회', '요청 실패 주입'], ['테스트 화면', '영상 화면과 오류 안내가 함께 표시됨']]);
  }
  if (id === 'ddubi') {
    return compareTable('공식 노선 연결 · 개발 경로 응답 4개', ['검증 대상', 'v3', 'v4'],
      [['차량 대안', '169/170건', '170/170건']]) +
      compareTable('인접 정류장 구간 평균 운행시간 · 동일 검증 자료 999,894행', ['계산 기준', '평균 절대 오차'],
        [['과거 중앙값', '27.61초'], ['선정 모델', '26.04초']]);
  }
  if (id === 'tingle') {
    return compareTable('11월 17일 · 실물 보드 한 대의 USB 진단', ['조회 항목', '완료한 조회', '응답 확인'], [
      ['기기 상태', '2/2회', '상태와 종료 표시'],
      ['전체 기록', '3/3회', '회당 11건과 종료 표시'],
      ['상대별 기록', '3/3회', '회당 3건과 종료 표시'],
    ]);
  }
  return '';
}

function featureSection(id, item) {
  const demoNotes = id === 'tingle' ? `<div class="case-demo-notes">
    ${video(item.demo, id)}
    <dl class="case-test-dates">
      <div><dt>11월 17일 · 앱 연동 시험</dt><dd>기기 한 쌍의 만남 기록이 앱 제안으로 전달됐습니다. 두 사용자가 수락한 뒤 채팅방이 열리는 과정까지 확인했습니다.</dd></div>
      <div><dt>11월 18일 · 발표 시연</dt><dd>두 키링이 매칭돼 LED가 켜지고 진동하는 장면을 직접 보여 줬습니다.</dd></div>
    </dl></div>` : '';
  return `<section id="process" class="case-entry" tabindex="-1" aria-labelledby="case-process-title">
    <h2 id="case-process-title" data-reveal>주요 기능 개발</h2>
    <div class="case-process-spread">
      <div class="case-prose"><h3>${item.featureTitle}</h3><p>${item.approach}</p><p>${item.contribution}</p></div>
      <div class="case-exhibit">${featureMedia(id, item)}</div>
    </div>${demoNotes}
  </section>`;
}

export function projectPage(id) {
  const project = projectSummaries.find(entry => entry.id === id);
  if (!project) throw new RangeError('Unknown project: ' + id);
  const item = cases[id];
  const next = projectSummaries.find(entry => entry.id === item.next[0]);
  return `<article class="case-book case-${id}" aria-labelledby="case-title">
    <div class="case-mast"><a class="case-return" href="/#projects"><span aria-hidden="true">←</span> 프로젝트 목록</a>${contents()}</div>
    <header class="case-front">
      <div class="case-sleeve" data-paper-edge>
        ${coverGallery(id, item.cover)}
        <div class="case-caption"><span lang="en">Jongmu Kim</span><a href="#${item.demo ? 'demo-'+id : 'process'}">${item.demo ? '시연 영상 보기' : '개발 과정 보기'} ↗</a></div>
      </div>
      <div class="case-liner">
        <div class="case-poster-title"><h1 id="case-title" lang="en">${project.name}</h1>
          <p class="case-subtitle">${item.titleLines.join(' ')}</p></div>
        <p class="case-service">${project.service}</p>
        <div class="case-credits">
        <div class="case-date" role="group" aria-label="기간 ${project.period}">
          <span class="case-year">2026</span><span class="case-span"><span aria-hidden="true">→</span> ${item.dates[0]}</span>
          ${item.dates[1] ? `<small>${item.dates[1]}</small>` : ''}
        </div>
        <dl class="case-role"><dt>김종무 · 내 역할</dt><dd>${project.role}</dd></dl>
        </div>
      </div>
    </header>
    <section id="overview" class="case-overview" tabindex="-1" aria-labelledby="case-overview-title">
      <div class="case-summary-text">
        <h2 id="case-overview-title">프로젝트 소개</h2>
        <p>${item.intro}</p>
      </div>
      <dl class="case-details">
          <div><dt>팀 구성</dt><dd>${item.team}${id === 'flex' ? ' · SSAFY 1학기 관통 프로젝트' : ''}</dd></div>
          <div><dt>팀 사용 언어</dt><dd>${project.languages.join(', ')}</dd></div>
          <div><dt>팀 프레임워크</dt><dd>${project.frameworks.join(', ')}</dd></div>
          <div><dt>그 밖의 팀 기술</dt><dd>${project.tools.join(', ')}</dd></div>
      </dl>
    </section>
    <div class="case-finding">
      <div class="case-finding-title"><span>확인 결과</span><strong>${item.finding}</strong></div>
      <div class="case-finding-note"><p>${item.scope}</p><a class="case-link" href="#result">검증 과정 읽기 <span aria-hidden="true">↓</span></a>${item.demo ? `<a class="case-link" href="#demo-${id}">시연 보기 <span aria-hidden="true">↓</span></a>` : ''}</div>
    </div>
    ${featureSection(id, item)}
    <section id="result" class="case-entry" tabindex="-1" aria-labelledby="case-result-title">
      <h2 id="case-result-title" data-reveal>트러블슈팅</h2>
      <div class="case-result-story case-prose"><h3 id="problem">${item.issue}</h3><p>${item.problem}</p><p>${item.outcome}</p></div>
      <div class="case-results">${resultMedia(id)}</div>
      <p class="case-learning">${item.learning}</p>
      <section class="case-sources" aria-labelledby="case-sources-title"><h3 id="case-sources-title">관련 기록</h3>
        <a class="case-record" id="evidence" href="${item.evidence[1]}">${item.evidence[0]}<span aria-hidden="true">↗</span></a>
        <a class="case-record" id="journal" href="${item.journal[1]}">${item.journal[0]}<span aria-hidden="true">→</span></a>
      </section>
    </section>
    <nav class="case-next" aria-label="다음에 읽을 프로젝트">
      <div><span class="case-next-label">다음 사례</span><a href="/projects/${next.id}/"><strong lang="en">${next.name}</strong> <span>${item.next[1]}</span><span aria-hidden="true">→</span></a></div>
      <a class="case-link" href="/#projects">프로젝트 목록</a>
    </nav>
  </article>`;
}
