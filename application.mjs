// The public case summaries contain original prose and aggregate observations only.
export const applicationCases = {
  ddubi: {
    title: '오차가 줄었다. 승객 수가 정말 쓰였을까?',
    focus: '머신러닝 실험 검증', date: '2026.09.06', team: '6인 팀',
    service: '약속 시각에 맞춰 대중교통 경로와 출발 시각을 추천하는 서비스입니다.',
    role: '데이터 연산·분산 백엔드 담당으로 인접 버스 정류장 사이의 평균 운행시간을 예측할 입력과 평가 조건을 점검했습니다.',
    problem: '승객 수를 추가한 모델의 예측 오차가 줄었다는 보고를 받았습니다. 오차만 보면 승객 수가 예측에 도움이 된 것처럼 보였습니다.',
    ai: 'AI와 함께 과거 운행시간을 이용한 입력을 구성하고, 시간순으로 나눈 자료에서 학습 방식을 비교했습니다. 승객 수를 추가한 실험에서는 성능 보고와 실제 학습에 들어간 표본을 다시 대조하도록 했습니다.',
    decision: '승객 수가 학습 행에 얼마나 연결됐는지 확인하니 결합률이 0%였습니다. 결합 오류를 고친 뒤 같은 내부 검증 조건에서 승객 수를 넣은 모델과 뺀 모델을 비교했습니다.',
    measures: [['승객 수 제외', '19.626초'], ['승객 수 포함', '19.642초']],
    measureLabel: '결합 수정 후, 인접 정류장 구간의 평균 절대 오차(MAE)',
    conclusion: '이 비교에서는 승객 수를 넣자 오차가 0.016초 커졌습니다. 승객 수를 개선 요인으로 보고하지 않았습니다. 이후에는 입력 결합률과 실제 학습 행 수를 오차와 함께 확인했습니다.',
    scope: '두 수치는 같은 내부 검증에서 측정한 구간 평균시간 오차입니다. 전체 경로의 도착시각이나 이용자 대상 성능은 별도로 측정해야 합니다.',
    diagram: ['승객 수 추가', '결합률 확인', '동일 조건 재비교'],
    stack: 'Python · Apache Spark · pandas'
  },
  tingle: {
    title: '키링의 기록이 사라졌을까, 출력만 빠졌을까?',
    focus: '임베디드 진단과 실물 검증', date: '2026.11.17', team: '6인 팀',
    service: 'BLE 키링으로 조건이 맞는 상대를 발견하고 앱에서 서로 수락하면 연결되는 소개팅 서비스입니다.',
    role: 'IoT 담당으로 보드를 교체하며 증상을 재현하고, 보존해야 할 기록과 진단에 필요한 항목을 정했습니다. 앱에서 양쪽이 수락해 채팅방이 열리는 과정은 팀원과 함께 시험했습니다.',
    problem: '키링이 다시 울리지 않았을 때 전체 기록 건수만으로는 상대를 발견하지 못했는지, 이미 만난 상대여서 알림을 건너뛰었는지 구별하기 어려웠습니다.',
    ai: '기존 등록·만남 기록을 그대로 둔 채 상대별 상태를 읽을 수 있어야 한다는 조건을 주었습니다. AI를 활용해 로그와 펌웨어를 대조하고 읽기 전용 진단 기능과 출력 순서를 보완했습니다.',
    decision: '실물에서 긴 목록을 조회하자 일부 줄이 빠졌습니다. 로그 대기열의 처리 속도를 확인하고 앞선 줄을 내보낸 뒤 다음 줄을 출력하도록 수정했습니다. 보드에서 예상 건수와 종료 표시를 함께 확인했습니다.',
    measures: [['기기 상태', '2/2회'], ['전체 기록', '3/3회'], ['상대별 기록', '3/3회']],
    measureLabel: '실물 보드 한 대에서 마지막 줄까지 응답한 USB 조회',
    conclusion: '세 종류의 조회가 총 8회 모두 끝까지 응답했습니다. 조회 전후 등록 영역과 만남 기록 영역의 해시도 각각 일치했습니다. 기록을 보존하면서 상대별 상태를 읽을 수 있게 됐습니다.',
    scope: '시험 범위는 한 보드의 진단 출력과 저장 내용 보존입니다. 무선 매칭 성공률은 이 시험에서 측정하지 않았습니다.',
    diagram: ['상대별 상태 조회', '출력 누락 재현', '건수와 저장값 대조'],
    stack: 'C · Zephyr RTOS · BLE'
  },
  flex: {
    title: '가입이 끝나도 첫 소비를 기록할 수 없던 이유',
    focus: '요구사항 대조와 가입 흐름 점검', date: '2026.06.14–15', team: '2인 팀',
    service: 'SSAFY 1학기에 배운 내용을 아우른 관통 프로젝트로, 사진과 금액으로 소비를 기록하는 소셜 가계부입니다.',
    role: '서비스를 공동 기획하고, 가입에서 첫 소비 입력까지 직접 따라가며 막힌 지점을 찾아 수정 조건을 정했습니다.',
    problem: '가입 오류가 있었고 첫 소비에 지정할 카테고리도 비어 있었습니다.',
    ai: 'Codex에 팀의 설계 조건과 가입 폼·API·데이터베이스를 대조하도록 요청했습니다. 첫 수정안에서 소비 기록에 필요한 모델이 빠져 다시 반영을 요청했습니다.',
    decision: '계정과 프로필이 함께 저장되거나 함께 취소되는지, 새 사용자에게 기본 카테고리가 제공되는지를 각각 확인 기준으로 삼았습니다.',
    measures: [['첫 소비 기록', '기본 카테고리 8개']],
    measureLabel: '가입 코드와 초기 데이터에서 확인한 결과',
    conclusion: '가입 코드에서 계정과 프로필이 같은 트랜잭션에 묶였고, 초기 데이터에는 첫 소비 기록용 카테고리 8개가 포함됐습니다.',
    scope: '모델·API 수정과 테스트 실행에는 Codex를 사용했습니다. 당시 테스트 통과 보고와 브라우저에서 전체 가입 동선을 검증하는 일은 구분했습니다.',
    diagram: ['가입 오류 확인', '모델·API 대조', '첫 기록 조건 확인'],
    stack: 'Django REST Framework · Vue 3 · SQLite'
  },
  melly: {
    title: '행사 상태 조회가 실패해도 영상 방을 열 수 있을까?',
    focus: '프런트엔드 오류 분리와 회귀 테스트', date: '2026.08.10 · 후속 작업', team: '팀 프로젝트',
    service: 'WebRTC를 이용한 일대일 영상 팬미팅 서비스입니다.',
    role: '로그인과 팬미팅 목록의 초기 화면을 직접 설계하고 담당 프런트엔드를 팀 API와 연결했습니다. 공식 개발 기간 이후에는 인플루언서 입장 오류를 점검했습니다.',
    problem: '유효한 입장 토큰을 받아도 타이머에 쓰는 행사 상태 조회가 실패하면 영상 방이 열리지 않았습니다.',
    ai: 'AI와 함께 두 요청의 오류 분기를 수정하고, 상태 조회만 실패시키는 회귀 테스트를 보완했습니다.',
    decision: '입장 토큰은 통화에 필수이고 행사 상태는 타이머·종료 안내에 쓰입니다. 토큰이 유효한 상황에서는 영상 방을 열고 보조 정보의 오류를 따로 안내하도록 조건을 나눴습니다.',
    measures: [['입장 토큰', '정상'], ['행사 상태', '실패 주입']],
    measureLabel: '인플루언서 화면 회귀 테스트의 입력',
    conclusion: '영상 방 컴포넌트와 오류 안내가 같은 화면에 표시됐습니다.',
    scope: '미디어 컴포넌트를 대체한 프런트엔드 테스트입니다. 실제 카메라·마이크 송수신 품질은 이 결과에 포함되지 않습니다.',
    diagram: ['입장 토큰 정상', '상태 조회 실패', '영상 방과 안내 표시'],
    stack: 'TypeScript · React · LiveKit'
  }
};

export const featuredCases = ['ddubi', 'tingle'];
export const applicationPdf = '/assets/kim-jongmu-portfolio.pdf';

export function aiPractice(summaries) {
  const entries = ['ddubi', 'tingle', 'flex', 'melly'].map(id => {
    const item = applicationCases[id];
    const project = summaries.find(project => project.id === id);
    return `<details class="ai-example" data-note-id="ai-${id}">
      <summary><span class="ai-project">${project.name}</span><strong>${item.focus}</strong></summary>
      <div class="ai-body"><h3>${item.title}</h3>
        <dl><dt>AI에 맡긴 작업</dt><dd>${item.ai}</dd>
        <dt>내 판단과 검증</dt><dd>${item.decision}</dd></dl>
        ${measurements(item)}<p>${item.conclusion}</p><p class="ai-scope">${item.scope}</p>
        <button class="ai-project-link" type="button" data-open-project="${id}">${project.name} 프로젝트 상세 <span aria-hidden="true">↗</span></button>
      </div></details>`;
  });
  return `<section id="ai" data-glass-pane="ai" class="home-section ledger" aria-labelledby="ai-title">
    <h2 id="ai-title" lang="en">AI in Practice</h2>
    <div class="ai-intro"><p>프로젝트에서 AI에 맡긴 일과 그 결과를 직접 확인한 과정을 담았습니다.</p>
      <a href="${applicationPdf}">대표 사례 PDF <span aria-hidden="true">↗</span></a></div>
    <div class="ai-examples">${entries.join('')}</div></section>`;
}

export function casePlate(id, name) {
  const item = applicationCases[id];
  const colors = {ddubi:['#153b39','#98dfbd'],tingle:['#342948','#dfc0ff'],flex:['#49331d','#ffd17d'],melly:['#4a2a40','#ffb9dc']};
  const [ink,accent] = colors[id];
  const metrics = item.measures.map(([label,value],index) => {
    const y=273+index*68;
    return `<path d="M50 ${y-36} H550" stroke="${accent}" opacity=".38"/><text x="53" y="${y+3}" font-size="23">${label}</text><text x="547" y="${y+3}" text-anchor="end" font-size="32" font-weight="700" fill="${accent}">${value}</text>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><title>${name} · ${item.measureLabel}</title><rect width="600" height="600" fill="${ink}"/>
    <g fill="#fffaf0" font-family="Arial,Malgun Gothic,Apple SD Gothic Neo,sans-serif"><text x="50" y="71" font-size="22" letter-spacing="2">DEVELOPMENT RECORD</text><text x="47" y="161" font-size="74" font-weight="700">${name}</text>
    <text x="52" y="209" font-size="22" fill="${accent}">${item.focus}</text>${metrics}
    <path d="M50 484 H550" stroke="${accent}"/><text x="52" y="524" font-size="19">${item.date}</text><text x="548" y="524" text-anchor="end" font-size="19">김종무</text></g></svg>`;
}

export function measurements(item) {
  return `<figure class="case-measures"><figcaption>${item.measureLabel}</figcaption><dl>${item.measures.map(([label,value]) =>
    `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl></figure>`;
}

export function printableCases(summaries) {
  return `<div class="submission-print">${featuredCases.map((id,i) => {
    const item=applicationCases[id], project=summaries.find(p=>p.id===id);
    return `<article class="submission-sheet"><header><strong>김종무 · AI 활용 개발 포트폴리오</strong><span>rlawhdan363@gmail.com</span></header>
      <div class="sheet-project">${project.name}<span>${item.focus}</span></div><h1>${item.title}</h1>
      <p class="sheet-description">${item.service}</p>
      <dl class="sheet-role"><div><dt>팀 · 기간</dt><dd>${item.team} · ${project.period}</dd></div><div><dt>내 기여</dt><dd>${item.role}</dd></div><div><dt>관련 기술</dt><dd>${item.stack}</dd></div></dl>
      <section><h2>문제</h2><p>${item.problem}</p></section><section><h2>AI를 활용한 작업</h2><p>${item.ai}</p></section>
      <section><h2>내 판단과 검증</h2><p>${item.decision}</p></section>
      ${measurements(item)}<section><h2>결과</h2><p>${item.conclusion}</p><p class="sheet-scope">${item.scope}</p></section>
      <footer><span>개발 기록 · ${item.date}</span><span>${i+1} / ${featuredCases.length}</span></footer></article>`;
  }).join('')}</div>`;
}
