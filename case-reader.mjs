import { projectSummaries, projectInterview } from './cases.mjs';

const projects = {
  flex: {
    scopeItems: ['소비 기록 방식·ERD 공동 설계', '가입 트랜잭션 및 기본 카테고리 8종 누락 점검', 'SQLite 경로 유실 진단 및 DB 이미지 저장 검토', '월별 소비 분석 무입력·외부 호출 실패 분기 정리'],
    links: [
      ['GitHub 저장소', 'https://github.com/j-moo/Flex_Log'],
      ['가입 트랜잭션 코드', 'https://github.com/j-moo/Flex_Log/blob/00fc74510ab3a80185d14e71f79f5e55917dac20/Backend/accounts/views.py#L20-L22'],
    ],
    reflection: '가입 화면의 성공 여부만 확인하면 첫 소비 기록에 필요한 데이터가 비어 있는 문제를 놓칩니다. 가입 직후 사용자가 실제로 고를 수 있는 카테고리까지 이어서 점검했습니다.',
    icon: '<path d="M15 9.5h23v34.2l-4-2.8-3.6 2.8-3.7-2.8-3.7 2.8-3.7-2.8-4.3 2.8z"/><path d="M20.5 18.2h12m-12 6.2h12m-12 6.3h6.3"/>',
    overview: [["배경", "금액과 카테고리만으로는 무엇을 사고 누구와 보낸 순간인지 남기기 어렵습니다. SSAFY 1학기 관통 프로젝트에서 소비 사진과 지출 기록을 연결했습니다."], ["목표", "소비한 순간을 기록하고 친구와 공유한 뒤, 한 달 단위로 지출을 돌아볼 수 있게 하는 것이 목표였습니다."], ["주요 기능", "사진·금액·카테고리 기록, 친구 피드, 월별 지출 집계와 분석"]],
    techUses: [["Django · 트랜잭션", "가입 한 번에 사용자와 프로필 두 레코드를 만듭니다. 프로필 생성만 실패해도 같은 이메일로 다시 가입할 수 있도록 두 쓰기를 하나의 트랜잭션으로 묶었습니다."], ["Django REST Framework", "소비 기록 수정 권한은 요청을 보낸 사람이 그 기록의 작성자인지에 달려 있습니다. API에서 인증한 사용자와 기록의 소유자를 대조해 수정 권한을 검사했습니다."]],
    resultSummary: "월별 분석은 소비 내역이 쌓인 뒤에도 지난달 결과를 다시 열어볼 수 있게 됐습니다.",
    nextCheck: "같은 사진 묶음으로 목록 응답 크기와 로딩 시간을 비교하면, DB에 이미지를 담는 편의에 얼마의 비용이 드는지 판단할 수 있습니다.",
    screens: [['flex-landing', 1200, 750, '시작 버튼이 보이는 Flex_Log 랜딩', '팀 소스에서 렌더한 랜딩 화면', [480, 768]], ['flex-feed', 949, 916, '사진과 지출 금액이 함께 나오는 소비 기록 피드', '첫 소비가 올라간 팀 개발 미리보기']],
    features: [["소비 기록 작성", "사용자가 사진·금액·카테고리를 입력하면 로그인한 계정의 소비 기록으로 저장합니다."], ["월별 분석 조회", "서버에서 월별 총액과 카테고리별 집계를 분석에 전달하고 결과를 저장해 최신 분석과 이전 내역을 조회할 수 있게 했습니다."]],
    cases: [
      {topic:'가입에서 첫 소비 기록까지', title:'계정이 생겨도 첫 소비를 기록할 수 없었습니다.',
       problem:'가입 화면에서는 이메일이 선택 항목처럼 보였고, 프로필 저장에 실패하면 계정만 남을 수 있었습니다. 가입을 마쳐도 카테고리 목록이 비면 첫 기록을 작성할 수 없었습니다.',
       action:'가입 오류와 빈 목록을 확인하고 팀원과 만든 ERD를 실제 모델과 대조하도록 요청했습니다. 가입 폼과 서버의 필수값을 맞추고, 계정·프로필을 함께 저장하거나 함께 되돌리도록 수정 조건을 정했습니다.',
       outcome:'가입 저장을 하나의 트랜잭션으로 묶고 기본 카테고리 8종을 준비했습니다.', scope:'당시 소비 기록 생성·조회·수정·삭제를 포함한 개발 단계에서 테스트 25개와 빌드 통과가 보고됐습니다. 브라우저에서 가입부터 첫 게시까지 전 과정을 확인한 수치는 아닙니다.'},
      {topic:'소비 사진 보관', table: {comparison:true, title:'저장 방식에 따른 사진 이동 범위', columns:['대상','다른 PC에 필요한 자료'], rows:[['기존 경로형 이미지','SQLite와 해당 경로의 업로드 파일'],['변경 후 새 업로드','이미지 바이트가 담긴 SQLite']]}, steps: ["새 PC에서 피드 확인", "SQLite의 경로와 실제 업로드 파일 대조", "새 업로드를 DB에 저장", "API의 이미지 응답 확인"], title:'다른 PC에서 피드를 열자 금액과 글은 남고 사진만 사라졌습니다.',
       problem:'SQLite에는 업로드 파일의 경로만 남아 있었습니다. DB를 복사해도 새 PC에는 그 경로가 가리키는 사진이 없었습니다.',
       action:'사진도 소비 기록과 함께 옮길 수 있도록 변경을 요청했습니다. 새 업로드의 바이트를 Django BinaryField에 저장하고, API가 화면에서 표시할 수 있는 data URL로 반환하는 방식을 확인했습니다.',
       outcome:'새로 올린 사진은 SQLite 파일에 소비 기록과 함께 저장됩니다.', scope:'6월 23일 코드에서 저장과 응답 경로를 확인했습니다. 기존 경로형 사진은 원본 파일이 따로 필요하며, 이미지가 포함된 목록 응답의 크기와 속도는 비교 측정하지 않았습니다.'},
      {topic:'월별 소비 분석', title:'기록이 비어 있는 달과 분석 서버가 응답하지 않는 달은 어떻게 보여줄까?',
       problem:'두 경우 모두 AI 분석 문장이 나오지 않습니다. 하지만 소비 내역이 있는 달에는 외부 호출이 실패해도 이미 계산한 총액과 카테고리별 집계를 쓸 수 있었습니다.',
       action:'월별 분석에 전달할 입력과 실패 시 보여줄 결과를 구분해 검토했습니다. 기록이 없는 달에는 데이터 부족을 표시하고, 집계가 있는 달에는 외부 호출 실패 시 금액 기준으로 대체 결과를 만들도록 했습니다.',
       outcome:'입력이 없는 경우와 외부 호출 실패를 서로 다른 응답으로 처리했습니다.', scope:'6월 16일 기록에서 두 분기와 대체 규칙을 확인했습니다. 금액 기준이 개인의 소득이나 소비 성향에 얼마나 잘 맞는지는 평가하지 않았습니다.'},
    ],
    results: [],
  },
  melly: {
    scopeItems: ['로그인·팬미팅 목록 초기 화면 직접 설계', 'LiveKit 장비 점검 화면 및 sessionStorage 장치 유지 연동', '호스트 솔로 운영 콘솔·다음 팬 호출 API 연결', '입장 토큰과 행사 상태 오류 분리 및 회귀 테스트'],
    links: [
      ['통화 입장 회귀 테스트 발췌 (VideoCallRoom.test.tsx)', '/assets/melly-call-test.txt'],
    ],
    reflection: '입장 권한과 타이머 정보는 실패했을 때의 영향이 다릅니다. 입장에 꼭 필요한 응답과 화면을 연 뒤 다시 받을 수 있는 응답을 구분하는 기준을 세웠습니다.',
    icon: '<rect x="8.8" y="16" width="25.5" height="20.2" rx="5.4"/><path d="m34.3 23.2 9.1-5.1v16l-9.1-5.1"/><path d="M15.2 22.3h6.4"/>',
    overview: [["배경", "영상 팬미팅에서는 팬을 순서대로 호출하고 제한된 시간에 일대일 통화를 이어가야 합니다. 운영 안내와 영상 방이 분리되면 누구를 어느 방으로 안내할지 다시 확인해야 합니다."], ["목표", "팬은 자신의 차례를 기다리고, 호스트는 다음 팬을 호출해 해당 통화에 바로 입장할 수 있게 하는 것이 목표였습니다."], ["주요 기능", "행사 응모·당첨 확인, 대기실, 다음 팬 호출, 일대일 영상 통화"]],
    techUses: [["LiveKit", "입장 전 고른 카메라와 마이크를 실제 통화에도 써야 했습니다. 장비 점검에 LiveKit의 장치 조회와 로컬 트랙 생성을 사용해, 통화에 사용할 미디어로 미리 확인하도록 했습니다."], ["sessionStorage", "장비 점검과 통화는 서로 다른 화면입니다. 선택한 장치 ID를 탭 안에서 유지하기 위해 sessionStorage에 저장하고 입장 시 다시 읽었습니다."]],
    resultSummary: "호스트가 다음 팬을 부른 뒤 매니저 화면과 인플루언서 화면을 오가던 절차를 한 운영 콘솔에 모았습니다.",
    nextCheck: "상태 요청이 거절되는 경우만 시험했습니다. 다음 검증에서는 응답이 계속 지연되는 조건에서 입장까지의 시간과 실제 두 기기의 미디어 연결을 따로 측정할 수 있습니다.",
    screens: [
      ['melly-fan-desktop', 1487, 1058, '예약한 팬미팅과 알림을 확인하는 팬 대시보드', '팬 대시보드 · 포트폴리오용 사진 재배치, 로컬 예시 데이터'],

    ],
    features: [["호스트 운영", "다음 팬을 호출하면 해당 팬의 메모와 장비를 확인하고, 호출 응답이 가리키는 통화방으로 이동합니다."], ["팬 대기실", "운영자가 대기실을 먼저 열면 당첨자는 행사 시작 전에도 입장해 순번을 기다릴 수 있습니다."]],
    cases: [
      {topic:'팬미팅 생성 API 연동', title:'응모를 껐는데도 행사 생성 요청이 계속 400 오류로 돌아왔습니다.',
       problem:'문서대로 정원을 생략하면 서버의 필수값 검사에서 막혔고, 기본값 1을 보내면 비활성 응모의 정원은 0이어야 한다는 규칙에 걸렸습니다.',
       action:'실패한 요청 본문을 직접 제시하고 팀 브랜치의 서버 코드를 대조하도록 요청했습니다. 서버의 입력 검사 순서를 확인한 뒤 프런트에서 정원 0과 빈 응모 날짜를 명시해 보내도록 보완했습니다.',
       outcome:'수정한 프런트엔드의 린트·타입 검사·빌드가 통과했습니다.', scope:'어떤 입력이 두 검사를 만족하는지 코드로 확인했습니다. 권한 있는 계정으로 행사 생성까지 성공했는지는 당시 확인하지 못했습니다.'},
      {topic:'호스트의 다음 팬 호출', title:'혼자 진행하는 호스트가 팬 한 명을 만날 때마다 화면을 옮겨야 했습니다.',
       problem:'다음 팬 호출은 매니저 화면에, 영상 방 입장은 인플루언서 화면에 있었습니다. 호출 응답에 들어 있는 개별 통화 ID도 입장에 쓰이지 않았습니다.',
       action:'호스트에게 허용된 호출·메모·장비 점검·입장을 한 콘솔에 모으고, 호출 API가 반환한 통화 ID를 입장 대상에 연결했습니다.',
       outcome:'호출한 팬의 방으로 같은 운영 화면에서 입장하는 흐름을 연결했습니다.', scope:'담당 프런트엔드의 호출 응답 처리와 입장 경로에서 확인한 결과입니다. 실제 행사에서 팬 전환에 걸리는 시간은 측정하지 않았습니다.'},
      {topic:'영상 통화 입장 복구', table: {title:'8월 10일 인플루언서 입장 회귀 테스트', columns:['입력·검사','관찰'], rows:[['입장 토큰','정상 응답'],['행사 상태 조회','실패 응답 주입'],['렌더된 화면','영상 방 컴포넌트와 오류 안내가 함께 표시됨']]}, steps: ["정상 토큰으로 실패 재현", "권한과 타이머 정보 구분", "요청별 실패 처리", "모의 영상 방과 안내 동시 표시 확인"], title:'입장 권한이 있는데도 행사 상태 조회 한 번이 통화를 막았습니다.',
       problem:'입장 토큰과 타이머용 상태 정보가 모두 정상이어야 영상 방이 열렸습니다. 상태 요청만 실패해도 유효한 토큰을 사용할 수 없었습니다.',
       action:'두 요청을 함께 보내되 결과는 각각 판정하도록 보완했습니다. 토큰 발급이 실패하면 입장을 중단하고, 상태 조회만 실패하면 영상 방과 오류 안내를 함께 표시한 뒤 상태를 다시 조회하도록 했습니다.',
       outcome:'상태 오류를 주입한 회귀 테스트에서 영상 방과 오류 안내가 함께 표시됐습니다.', scope:'8월 10일 인플루언서 입장 테스트는 LiveKit 화면을 모의 컴포넌트로 대체했습니다. 실제 카메라·마이크 송수신이나 상태 요청이 계속 대기하는 상황은 이 시험의 확인 범위 밖입니다.'},
    ],
    results: [],
  },
  ddubi: {
    scopeItems: ['카카오 경로·공공데이터 버스 노선/정류장 매핑 검증', '인접 정류장 운행시간 예측 모델 입력 구성 및 오차 비교', 'FastAPI 참조 표 LRU 캐시 적용 및 응답시간·메모리 측정', 'TOPIS 돌발정보 도로 링크-버스 구간 방향 후보 판정'],
    links: [
      ['GitHub 저장소 (공개 스냅샷)', 'https://github.com/j-moo/DDUBI'],
      ['모델 비교 결과 CSV (999,894행 검증)', '/assets/ddubi-model-comparison.csv'],
      ['모델별 MAE 비교 그래프', '/assets/ddubi-model.png'],
    ],
    reflection: '노선이 연결된 비율, 버스 구간의 예측 오차, 사용자가 실제로 도착한 시각은 평가 대상이 다릅니다. 모델을 비교할 때는 예측 시점에 확보할 수 있는 입력과 같은 검증 표본을 먼저 확인했습니다.',
    icon: '<circle cx="14" cy="35.5" r="4.6"/><circle cx="38" cy="16" r="4.6"/><path d="M14 31v-6.3a5 5 0 0 1 5-5h6.3a5 5 0 1 1 0 10h-1.1a4.5 4.5 0 0 0 0 9h7.6a6.2 6.2 0 0 0 6.2-6.2V20.6"/>',
    overview: [["배경", "지도에 표시된 경로를 일정에 쓰려면 탑승시간뿐 아니라 정류장까지 걷는 시간과 다음 차를 기다리는 시간도 계산해야 합니다."], ["목표", "약속 장소에 도착해야 하는 시각을 기준으로 대중교통 경로와 출발 시각을 추천하는 것이 목표였습니다."], ["주요 기능", "일정 등록, 버스·지하철·도보 경로 계산, 출발 시각 추천"]],
    techUses: [["Apache Spark", "교통 관측값이 여러 배치로 들어와 한 배치에도 같은 대상의 값이 여럿 있었습니다. Spark에서 관측 시각을 기준으로 배치 안의 최신값을 골라 저장 단계로 넘겼습니다."], ["Redis · Lua", "늦게 도착한 과거 관측값이 최신값을 덮을 수 있었습니다. Redis에서 기존 시각과 새 시각의 비교, 조건부 쓰기를 Lua 한 번으로 실행해 두 연산 사이에 다른 쓰기가 끼어들지 않게 했습니다."]],
    resultSummary: "같은 검증 자료 999,894행에서 인접 정류장 사이 평균 운행시간의 예측 오차를 비교했습니다.",
    nextCheck: "돌발정보는 도로 링크와 버스 구간 사이의 후보까지 확보했습니다. 실제 사고에 적용하려면 링크 ID·방향·통제 기간을 대조하고 버스의 예상 통과 시각과 겹치는지 검증해야 합니다.",
    screens: [['ddubi-home', 717, 1440, '오늘 일정과 출발 안내가 보이는 DDUBI 앱 홈', '실기기에 표시된 오늘의 일정', [240, 384]], ['ddubi-schedule', 643, 1250, '약속 날짜와 시간을 입력하는 일정 등록 화면', '일정 등록 화면', [240, 384]]],
    features: [["버스 구간 예측", "승차·하차 정류장 사이를 인접 구간으로 나누고 각 구간의 예상 운행시간을 합산합니다."], ["환승 시각 계산", "앞 구간의 도착 예정 시각을 다음 구간에 전달합니다. 승강장까지 걷는 동안 이미 출발한 열차는 다음 탑승 후보에서 제외합니다."]],
    cases: [
      { topic: '이동시간 계산', steps: ["구간별 도착 시각 계산", "도보·대기 누락 확인", "미분해 시간 보존", "고정 경로 2건 재검사"], title: '구간을 모두 더해도 경로 총시간이 짧아졌습니다.',
        problem: '출발·도착 지점의 도보 시간이 빠진 경로가 있었습니다. 제공자 총시간에 이미 포함된 대기를 다시 더하면 반대로 시간이 길어졌습니다.',
        action: '버스는 인접 정류장 간 예측값, 지하철은 도착정보·시간표, 대기는 환승 지점에 도착한 시각을 기준으로 계산했습니다. 도보를 분리할 근거가 없으면 제공자 총시간을 보존하고 대기를 중복 가산하지 않도록 했습니다.',
        outcome: '6분 27초 · 10분 37초 누락 방지', scope: '고정 경로 두 건에서 보완 후 총시간이 각각 제공자 응답의 26분 21초, 29분 41초와 일치했습니다.' },
      { topic: '데이터 매핑', table: {comparison:true, title:'같은 개발 경로 응답 4개에서 비교한 노선 연결 결과', columns:['확인 대상','수정 전','수정 후'], rows:[['공식 노선과 연결된 차량 대안','169/170건','170/170건'],['모든 대안이 연결된 버스 탑승 단계','48/49개','49/49개']]}, title: '같은 정류장 이름과 버스 번호가 서로 다른 노선을 가리켰습니다.',
        problem: '카카오 경로의 이름과 번호만으로 공공데이터 ID를 고르면 반대 방향이나 다른 운행 계통의 시간표가 연결될 수 있었습니다.',
        action: '승하차 정류장 사이의 순서와 진행 방향을 대조했습니다. 값이 빠지거나 후보가 여럿이면 확정을 보류했고, 마지막 5002번은 카카오 상세 화면에서 예약 노선 표기를 직접 확인해 해당 경로에만 공식 ID를 연결했습니다.',
        outcome: '공식 노선 연결 169/170건 → 170/170건', scope: '같은 개발 경로 응답 4개의 차량 대안을 비교했습니다. 먼저 연결한 169건의 배정도 유지됐습니다.' },
      { topic: '머신러닝 예측 대기시간', chart: {title:'참조 표 캐시 적용 전후 · 로컬 요청 평균', unit:'초', max:2, rows:[['적용 전',1.868],['적용 후',1.631]]}, title: '여러 버스 구간을 예측할 때 같은 운행자료를 반복해서 읽었습니다.',
        problem: '사용자는 마지막 구간의 계산이 끝나야 전체 예상시간을 볼 수 있었습니다. 버스 구간이 늘면 예측 서버에서 같은 참조 표를 읽는 작업도 반복됐습니다.',
        action: '반복 읽기를 줄이는 효과만 볼 수 있도록 모델과 입력을 고정하고, 참조 표 캐시 적용 전후의 응답시간·예측값·메모리를 함께 비교하도록 했습니다.',
        outcome: '예측값을 유지하면서 반복 요청 시간이 줄었습니다.', scope: '같은 10개 구간의 로컬 반복 호출 3회 평균이 12.7% 줄었습니다. 예측값은 같았고 최대 메모리는 172.8MiB 늘었습니다. 앱 전체 응답시간은 별도 측정이 필요합니다.' },
      { topic: '돌발정보 경로 판정', chart: {title:'도로 링크 연결 검토 · 9월 13일',unit:'개',max:40441,rows:[['검토 구간',40441],['방향 후보',24052],['운영 승인',0]]}, title: '경로 근처의 사고가 실제 탑승 구간에도 영향을 줄까?',
        problem: 'TOPIS는 사고 위치를 도로 링크로 제공합니다. 가까운 사고여도 반대 차로에 있거나 버스가 도착하기 전에 통제가 끝날 수 있었습니다.',
        action: '도로 링크를 버스의 정류장 간 구간에 연결할 후보를 만들고, 사용자가 탈 구간의 진행 방향과 예상 통과 시각이 통제 조건에 맞는지를 판정 기준으로 정했습니다.',
        outcome: '진행 방향이 맞는 후보를 추렸고, 운영 적용은 보류했습니다.', scope: '실제 사고 피드의 링크 ID·방향·통제 기간까지 검증되지 않아 시연에는 모의 통제를 사용했습니다.' },
    ],
    results: [
      {title:'인접 정류장 구간 운행시간 · 평균 절대 오차',unit:'초',max:30,rows:[['과거 중앙값',27.61],['선정 모델',26.04]]},
    ],
  },
  tingle: {
    scopeItems: ['BLE 확장 광고·Zephyr NVS 저장·복구 펌웨어 흐름 설계', 'EasyEDA 전용 PCB(D3.1) 설계·배선 압착 및 모듈 조립', '비파괴 USB 진단(MATCH STATUS/RECORDS)·SHA-256 검증', '키링-앱-서버 종단 연동 QA 및 발표 현장 시연'],
    links: [
      ['GitHub 저장소 (develop)', 'https://github.com/j-moo/Tingle'],
    ],
    reflection: '두 키링이 반응한 위치만으로 통신이 시작된 거리나 지연 원인을 알 수 없었습니다. 보행 중 매칭을 평가하려면 양쪽 기기의 수신·계산·알림 시각을 함께 기록해야 합니다.',
    icon: '<path d="M20 23.4a8.3 8.3 0 1 1 11.7-1.8"/><path d="m21.4 20.8 4.4-3.1a4 4 0 0 1 5.6 1l9.1 13.2a4 4 0 0 1-1 5.6l-9.2 6.4a4 4 0 0 1-5.6-1l-9.1-13.2a4 4 0 0 1 1-5.6l4.8-3.3Z"/><circle cx="31.9" cy="34.4" r="2.2"/>',
    overview: [["배경", "두 사람이 잠시 스쳐 지나간 뒤에도 서로 원한다면 앱에서 대화를 시작할 수 있는 소개팅 서비스를 기획했습니다."], ["목표", "짧은 만남에서 프로필을 교환하고, 두 사람이 원할 때 앱에서 대화를 시작할 수 있게 하는 것이 목표였습니다."], ["주요 기능", "BLE 프로필 교환, 매칭 시 LED·진동 알림, 만남 기록 동기화, 상호 수락 후 채팅"]],
    techUses: [["BLE 확장 광고", "키링끼리 스치는 짧은 시간에 상대 프로필을 교환해야 했습니다. 기기마다 연결을 맺고 유지하는 절차를 줄이려고 광고에 교환 데이터를 싣고 주변 키링은 이를 스캔하도록 설계했습니다."], ["Zephyr NVS", "휴대폰이 곁에 없어도 키링에 등록된 설정과 만남 기록은 재부팅 후 남아야 했습니다. 전원이 꺼져도 유지되는 플래시 저장소에 이 데이터를 보관했습니다."]],
    resultSummary: "실물 키링 두 대에서 시작한 별도 연동 시험에서 양쪽 사용자가 제안을 수락한 뒤 채팅방이 열렸고, 서로 보낸 메시지를 확인했습니다.",
    nextCheck: "다음 거리 시험에서는 두 기기의 시계를 맞추고 수신·계산·알림 시각을 각각 남겨야 합니다. 걸음 속도와 반복 횟수까지 정하면 스쳐 갈 때의 성공률을 측정할 수 있습니다.",
    screens: [['tingle-landing', 1200, 675, 'Tingle 로고가 보이는 웹 랜딩', '서비스 인트로 마지막 장면', [480, 768]]],
    features: [["앱에서 키링으로", "만남 전 앱이 성향과 매칭 설정을 키링에 보냅니다. 키링은 저장된 설정을 기준으로 상대와의 매칭을 판정합니다."], ["키링에서 앱으로", "매칭이 확정되면 만남을 저장합니다. 업로드 도중 연결이 끊겨도 재전송할 수 있도록 서버의 접수 확인을 받은 뒤 원본을 정리합니다."]],
    cases: [
      {topic:'키링 내부 로직 설계', steps: ["가상 키링의 동시 교환 재현", "제어 메시지만 반복되는 구간 확인", "재전송 시 프로필도 전달", "양방향 계산 확인"], title:'여러 사람이 스쳐 갈 때, 무엇을 통신 거리 안에서 끝내야 할까?',
       problem:'한 상대의 매칭을 계산하는 동안 다른 키링이 통신 범위를 벗어날 수 있었습니다. 동시 교환 시험에서는 한쪽이 제어 메시지만 반복해 계산에 필요한 상대 프로필을 받지 못하는 경우도 나왔습니다.',
       action:'짧은 만남 동안에는 프로필 수신을 우선하도록 설계했습니다. 수신을 마친 입력은 상대별 매칭 대기 큐에, 확정된 만남은 앱 전달 큐에, 판정을 끝내지 못한 건은 오류·검증 큐에 넣었습니다. 제어 메시지를 재전송할 때에도 프로필을 함께 보내도록 송신 흐름을 보완했습니다.',
       outcome:'PC에서 가상 키링 10개의 동시 교환을 시험했습니다.', scope:'수정 후 상대 프로필 교환에서 양방향 계산까지 이어졌고, 기준 입력 37건에서 펌웨어의 C 계산값이 참조값과 일치했습니다. 여러 사람이 실제로 스쳐 갈 때의 수신 성공률은 측정하지 못했습니다.'},
      {topic:'납땜에서 PCB 설계로', title:'배선을 납땜으로 고정하면 고장 난 부품을 어떻게 찾고 바꿀까?',
       problem:'메이커스페이스에서 팀원들과 만능기판에 납땜하던 중, LED가 켜지지 않으면 회로·코드·납땜 중 어디부터 고쳐야 할지 구분하기 어렵다는 피드백을 받았습니다.',
       action:'추가 납땜 전에 브레드보드에서 LED·모터·버튼을 따로 점검하는 시험안을 마련했습니다. EasyEDA로 보드는 소켓에 꽂고 외부 모듈은 커넥터로 교체하는 PCB를 설계했습니다. 수령한 D3.1 기판과 모듈의 핀 간격이 달라 연결선을 직접 압착하고 핀 순서를 대조했습니다.',
       outcome:'제작한 D3.1 기판에서 LED 점등과 모터 진동을 확인했습니다.', scope:'설계 파일에서는 배선 규칙 검사 오류 0건과 50개 핀의 연결 일치를 확인했습니다. 실물에서는 빛과 진동을 관찰했고, 밝기와 전류는 계측하지 않았습니다.'},
      {topic:'키링 매칭 테스트', distanceTest:true, title:'두 키링이 반응했다면, 스쳐 가는 동안에도 매칭된다고 할 수 있을까?',
       problem:'LED와 진동만으로는 프로필을 어느 거리에서 받기 시작했는지, 알림까지 어느 단계에서 시간이 걸렸는지 알 수 없었습니다.',
       action:'실물 키링 두 대를 7m에서 시작해 50cm씩 가까이 가져가며 지점마다 15초 기다렸습니다. 각 지점에서 두 기기의 빛과 진동이 함께 나타나는지 관찰했습니다.',
       outcome:'거리 시험에서는 6m 지점에서 양쪽 LED와 진동을 확인했습니다.', scope:'앞선 지점에서 통신이 시작됐을 수 있어 6m를 최대 거리로 확정할 수 없습니다. 보행 중 매칭 성공률도 미측정입니다.'},
    ],
    results: [],
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
      <span aria-hidden="true">⤢</span></button><figcaption>${escapeText(caption)}${name === 'melly-fan-desktop' ? ' · <a href="/assets/melly-fan-mobile.webp">모바일 화면 보기</a>' : ''}</figcaption></figure>`;
  }).join('')}</div>`;
}

function resultTable({title, columns, rows, comparison}) {
  return `<table class="cr-result-table"><caption>${comparison ? '<span lang="en">Before &amp; After</span> 비교 · ' : ''}${title}</caption><thead><tr>${columns.map(col => `<th scope="col">${col}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(([label, ...values]) => `<tr><th scope="row">${label}</th>${values.map(value => `<td>${value}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

function demoPlayer(demo, id) {
  if (!demo) return '';
  const [file, poster, width, height, description, caption] = demo;
  const preview = id === 'tingle' ? 'tingle-demo-480.webp' : poster;
  return `<figure class="cr-demo"><video controls playsinline preload="none" width="${width}" height="${height}" poster="/assets/${preview}" aria-label="${escapeText(description)}">
    <source src="/assets/${file}" type="video/mp4"></video><figcaption>${escapeText(caption)}</figcaption></figure>`;
}

function technique(label, values) {
  return `<div><dt>${label}</dt><dd>${values.map(value => `<span>${escapeText(value)}</span>`).join('')}</dd></div>`;
}

function labeledRows(rows) {
  return `<dl class="cr-context">${rows.map(([label, text]) => `<div><dt>${escapeText(label)}</dt><dd>${escapeText(text)}</dd></div>`).join('')}</dl>`;
}

function barChart({title, unit, max, rows}) {
  const format = value => value.toLocaleString('ko-KR') + unit;
  return `<figure class="cr-measure"><figcaption>${title}</figcaption>
    ${rows.map(([label, value]) => `<div class="cr-bar-row"><span>${label}</span><span class="cr-bar-track" aria-hidden="true"><i style="--bar-length:${100 * value / max}%"></i></span><b>${format(value)}</b></div>`).join('')}
    <div class="cr-bar-axis" aria-hidden="true"><span>0</span><span>${format(max)}</span></div></figure>`;
}

function scopeList(items) {
  return `<ul class="cr-scope-list">${items.map(item => `<li>${escapeText(item)}</li>`).join('')}</ul>`;
}

function resourceLinks(links) {
  if (!links?.length) return '';
  const items = links.map(([label, href]) => {
    return `<li><a class="cr-resource-link" href="${escapeText(href)}" target="_blank" rel="noopener noreferrer">${escapeText(label)} <span aria-hidden="true">↗</span></a></li>`;
  }).join('');
  return `<div class="cr-resources"><ul class="cr-resource-list">${items}</ul></div>`;
}

function distanceDiagram() {
  return `<figure class="cr-measure"><figcaption>11월 16일 · 매 지점에서 15초 대기 후 50cm씩 접근</figcaption>
    <ol class="cr-distance"><li><b>7m</b>시험 시작</li><li><b>6.5m</b>중간 지점</li><li><b>6m</b>양쪽 빛·진동 관찰</li></ol></figure>`;
}

function decisionCases(cases) {
  return cases.map(({topic, title, problem, action, outcome, scope, steps, table, chart, distanceTest}) => `<article class="cr-decision">
    <h4>${topic}</h4><p><strong>${title}</strong></p>
    ${steps ? `<ol class="cr-flow" aria-label="대표 사례의 진단부터 검증까지">${steps.map(step => `<li>${escapeText(step)}</li>`).join('')}</ol>` : ''}
    <dl class="cr-trouble"><div><dt>문제</dt><dd>${problem}</dd></div><div><dt>개선 과정</dt><dd>${action}</dd></div>
    <div><dt>결과</dt><dd><strong>${outcome}</strong><br>${scope}</dd></div></dl>${table ? resultTable(table) : ''}${chart ? barChart(chart) : ''}${distanceTest ? distanceDiagram() : ''}</article>`).join('');
}

function journalEntry(id, title, body) {
  return `<details class="cr-note" data-note-id="${id}"><summary><span>${escapeText(title)}</span></summary><div class="cr-note-body">${body}</div></details>`;
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
    <header class="cr-intro">
      <h2 id="${title}" data-project-title tabindex="-1" lang="en">${project.name}</h2>
      <dl class="cr-facts"><div><dt>진행 기간</dt><dd>${project.period}</dd></div><div><dt>팀 구성</dt><dd>${team}</dd></div></dl>
      <h3 class="cr-overview-title">프로젝트 개요</h3>${labeledRows(item.overview)}
      ${project.id === 'tingle' ? demoPlayer(demo, project.id) : screenGallery(item.screens, galleryLayout)}
    </header>
    <section class="cr-section"><h3>사용 기술</h3><dl class="cr-stack">${technique('사용 언어',project.languages)}${technique('프레임워크·라이브러리',project.frameworks)}${technique('기타 기술',project.tools)}</dl><h4 class="cr-subtitle">적용 맥락과 선택 이유</h4>${labeledRows(item.techUses)}</section>
    <section class="cr-section"><h3>담당 역할</h3><p class="cr-role-name">${project.role}</p><h4 class="cr-subtitle">직접 맡은 범위</h4>${scopeList(item.scopeItems)}</section>
    <section class="cr-section"><h3>구현 사항</h3>
      ${labeledRows(item.features)}
      ${item.assembly ? journalEntry(project.id + '-pcb', '실물 기판과 앱 수락 화면 보기', screenGallery(item.assembly, 'cr-assembly')) : ''}
    </section>
    <section class="cr-section"><h3>문제 해결 사례</h3>${decisionCases(item.cases)}
    </section>
    <section class="cr-section"><h3>프로젝트 성과 및 결과</h3>
      <p>${item.resultSummary}</p>${item.results.map(barChart).join('')}
      ${resourceLinks(item.links)}
      </section>
    <section class="cr-section"><h3>회고</h3>${labeledRows([['배운 점',item.reflection],['남은 과제',item.nextCheck]])}
    </section>
    <nav class="cr-adjacent" aria-label="${project.name}에서 다른 프로젝트로 이동">
      <button type="button" data-open-project="${previous.id}"><small>← 이전 프로젝트</small><span>${previous.name}</span></button>
      <button type="button" data-open-project="${next.id}"><small>다음 프로젝트 →</small><span>${next.name}</span></button></nav>
  </article>`;
}

export function projectLibrary() {
  return `<div class="cr-library"><div class="cr-picker" data-project-picker>
    <h2 id="projects-title" data-picker-title tabindex="-1" lang="en">Projects</h2>
    <div class="cr-apps">${projectSummaries.map(project => `<button class="cr-app cr-tile-${project.id}" type="button" data-open-project="${project.id}" aria-label="${project.name} 프로젝트 열기">
      <span class="cr-icon"><svg viewBox="0 0 52 52" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
        <defs><g id="picker-mark-${project.id}">${projects[project.id].icon}</g></defs>
        <use class="cr-icon-edge" href="#picker-mark-${project.id}"/><use href="#picker-mark-${project.id}"/>
      </svg></span>
      <span class="cr-app-name" lang="en">${project.name}</span><small class="cr-project-desc">${escapeText(project.service)}</small></button>`).join('')}</div>
    <noscript><p>아래에서 네 프로젝트의 상세와 개발 기록을 차례로 읽을 수 있습니다.</p></noscript>
  </div>${projectSummaries.map(detail).join('')}</div>`;
}
