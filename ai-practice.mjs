const cases = [
  {
    id: 'ddubi', name: 'DDUBI', topic: '승객 수가 한 건도 연결되지 않았는데 오차가 줄었다면?',
    task: 'AI와 함께 버스 구간 운행시간 예측 모델의 입력을 늘렸습니다. 승객 수를 추가한 실험에서 오차가 줄었다는 보고를 받고, 학습 표본 중 실제 승객 수가 붙은 행의 비율부터 확인했습니다.',
    decision: '처음 결합률은 0%였습니다. 조인 키를 바로잡자 학습 행의 43.64%, 테스트 행의 46.52%에 승객 수가 연결됐습니다. 입력 복구가 예측에도 도움이 됐는지 보려고 같은 내부 검증에서 이 변수의 사용 여부만 바꿨습니다.',
    result: '인접 정류장 구간 운행시간의 평균 절대 오차는 승객 수 제외 시 19.626초, 포함 시 19.642초였습니다. 승객 수를 넣은 쪽이 0.016초 커서, 앞서 보고된 개선을 이 변수의 성과에서 제외했습니다.'
  },
  {
    id: 'tingle', name: 'Tingle', topic: '키링을 초기화하지 않고 끊긴 로그를 끝까지 읽다',
    task: '키링이 다시 울리지 않은 이유를 찾으려고 AI와 펌웨어·로그를 대조했습니다. 기존 등록 정보와 만남 기록을 보존하면서 상대별 상태를 읽어야 한다는 조건을 주었습니다.',
    decision: '보드에서 긴 목록을 조회하자 일부 줄이 빠졌습니다. 앞선 줄을 내보낸 뒤 다음 줄을 출력하도록 순서를 바꾸고, 실물 보드에서 예상 건수와 종료 표시를 확인했습니다.',
    result: '보드 한 대에서 기기 상태 2회, 전체 기록 3회, 상대별 기록 3회가 모두 마지막 줄까지 출력됐습니다. 조회 전후 등록 정보와 만남 기록의 해시도 각각 일치했습니다.'
  },
  {
    id: 'flex', name: 'Flex_Log', topic: '가입 수정안에서 빠진 첫 소비 입력 조건을 찾다',
    task: '가입 후 첫 소비를 입력할 수 없는 지점을 직접 찾아 Codex에 가입 폼, API, 데이터베이스를 설계 조건과 대조하도록 요청했습니다.',
    decision: '첫 수정안에 소비 기록용 모델이 빠져 다시 반영을 요청했습니다. 계정과 프로필의 동시 저장·취소, 가입 직후 선택할 기본 카테고리를 확인 기준으로 정했습니다.',
    result: '수정된 코드에서 두 저장 작업이 같은 트랜잭션에 묶였고, 초기 데이터에서 기본 카테고리 8개를 확인했습니다. 당시 확인 범위는 코드·초기 데이터와 Codex의 테스트 실행 보고입니다.'
  },
  {
    id: 'melly', name: 'Melly', topic: '타이머만 실패해도 영상 방은 열리는지 시험하다',
    task: '영상 방에 필요한 입장 토큰과 타이머에 쓰는 행사 상태를 따로 처리하도록 AI와 오류 분기를 수정하고 회귀 테스트를 보완했습니다.',
    decision: '토큰이 유효한 상태에서 행사 상태 조회만 실패시켰습니다. 이때 영상 방이 열리고 타이머 오류가 별도로 안내되는지를 판정 기준으로 삼았습니다.',
    result: '미디어 컴포넌트를 대체한 프런트엔드 테스트에서 영상 방과 안내가 함께 표시됐습니다. 실제 카메라·마이크 송수신은 이 시험 범위 밖입니다.'
  }
];

export function aiPractice() {
  return `<section id="ai" class="home-section ledger" data-glass-pane="ai" aria-labelledby="ai-title">
    <h2 id="ai-title" lang="en" data-reveal>AI in Practice</h2>
    <div class="cr-library"><p>AI가 제안한 변경을 프로젝트에 적용할 때, 어떤 근거로 채택하거나 다시 검토했는지 정리했습니다. <a class="pane-index" href="/assets/kim-jongmu-portfolio.pdf">대표 사례 PDF</a></p>
      ${cases.map(item => `<details class="cr-note" data-note-id="ai-${item.id}">
        <summary><span>${item.name} · ${item.topic}</span></summary>
        <div class="cr-note-body"><h4>AI와 함께 한 작업</h4><p>${item.task}</p>
          <h4>내 판단과 검증</h4><p>${item.decision}</p><h4>확인한 결과</h4><p>${item.result}</p>
          <button type="button" class="cr-return" data-open-project="${item.id}">${item.name} 프로젝트 상세 ↗</button></div>
      </details>`).join('')}</div></section>`;
}
