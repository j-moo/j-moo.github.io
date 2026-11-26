window.BLOG_DATA = {
  profile: {
    name: "김종무",
    headline: "신입 개발자 · 웹 · 데이터 · 임베디드",
    paragraphs: [
      "설계 조건과 실제 동작이 어긋나는 지점을 코드·데이터·실물 장비에서 끝까지 확인하는 개발자입니다.",
      "웹 화면 연동(Flex_log·Melly), 버스 구간 데이터와 예측 모델 검증(DDUBI), BLE 키링 펌웨어·실물 진단(Tingle)을 거치며 직접 확인한 근거로 문제를 좁혀 왔습니다."
    ],
    image: "assets/blog/portrait.webp", width: 467, height: 600,
    alt: "김종무의 증명사진",
    email: "rlawhdan363@gmail.com",
    github: "https://github.com/j-moo"
  },
  skills: [
    {name: "프로그래밍 언어", items: ["Python", "Java", "JavaScript", "TypeScript", "C"]},
    {name: "웹 프레임워크", items: ["Spring Boot", "Django REST Framework", "Vue 3", "FastAPI"]},
    {name: "UI 라이브러리", items: ["React"]},
    {name: "데이터베이스", items: ["MySQL", "PostgreSQL", "Redis"]},
    {name: "데이터 분석·수치 계산", items: ["pandas", "NumPy"]},
    {name: "분산 처리", items: ["Apache Spark"]},
    {name: "임베디드 시스템·IoT", items: ["Zephyr RTOS", "BLE"]}
  ],
  skillIcons: {
    Python: "python.svg", Java: "java.svg", JavaScript: "javascript.svg", TypeScript: "typescript.svg", C: "c.svg",
    "Spring Boot": "springboot.svg", "Django REST Framework": "djangorest.svg", "Vue 3": "vuejs.svg", FastAPI: "fastapi.svg",
    React: "react.svg", MySQL: "mysql.svg", PostgreSQL: "postgresql.svg", Redis: "redis.svg",
    pandas: "pandas.svg", NumPy: "numpy.svg", "Apache Spark": "apachespark.svg", "Zephyr RTOS": "zephyr.svg", BLE: "bluetooth.svg"
  },
  education: [
    {
      name: "삼성청년SW·AI아카데미 (SSAFY)",
      period: "2026.01–2026.12 · 15기 교육 일정",
      detail: "1학기 SW·AI 이론 및 실습 925시간. Python·자료구조·알고리즘, Django·Vue, SQL, 인공지능·머신러닝 기초를 배우고 Flex_log를 진행했습니다. 2학기에는 Melly, DDUBI, Tingle 팀 프로젝트를 진행했습니다."
    },
    {
      name: "동아대학교 기계공학과",
      period: "2017.03–2024.02",
      detail: "2017년 3월 입학 · 2024년 2월 졸업"
    }
  ],
  projects: {
    tingle: {
      development: [
        ["키링 간 프로필 교환", "BLE 확장 광고에 성향 프로필을 실었습니다. 서로 연결을 맺는 절차 없이 스쳐 가는 상대의 프로필을 받고, 키링에서 매칭 여부를 계산합니다.", "BLE 확장 광고에 성향 프로필을 실었습니다"],
        ["만남 기록 저장과 동기화", "펌웨어가 설정과 아직 전송하지 않은 만남 기록을 NVS에 보관하도록 구현했습니다. 앱이 키링에서 기록을 받아 서버로 전달하는 흐름까지 점검했습니다.", "만남 기록을 NVS에 보관"],
        ["교체형 키링 기판", "기판을 설계하고 모듈을 소켓과 커넥터로 조립했습니다. 실물에서 LED와 진동 모터가 매칭 알림을 전달하는지 확인했습니다.", "모듈을 소켓과 커넥터로 조립"]
      ],
      goal: "짧게 스친 만남을 기록하고 서로 동의하면 대화로 연결하기",
      audience: "일상에서 스쳐 간 상대와 서로 동의한 뒤 연결되고 싶은 사용자",
      features: ["키링 간 성향 프로필 교환", "앱에 만남 기록 동기화", "상호 수락 후 채팅"],
      technicalChoices: [
        {tech: "BLE 확장 광고", reason: "짧게 스치는 동안 별도 연결 절차를 줄이고 키링끼리 성향 프로필을 주고받도록 했습니다."},
        {tech: "Zephyr NVS", reason: "전원을 껐다 켠 뒤에도 설정과 아직 앱에 전달하지 않은 만남 기록을 복구할 수 있게 저장했습니다."}
      ],
      outcome: "별도 실물 연동 시험에서 두 사용자가 앱의 만남 제안을 각각 수락하자 채팅방이 열렸고 메시지를 주고받을 수 있었습니다.",
      image: "assets/blog/tingle-web-landing.webp", width: 1440, height: 810, alt: "Tingle 웹 랜딩의 로고와 스친 순간, 새로운 시작 문구 및 상단 메뉴",
      summary: "두 사람이 스쳐 지나갈 때 키링이 만남을 기록하고, 앱에서 수락 의사를 확인하는 BLE 서비스입니다.",
      gallery: [
        {src: "assets/blog/tingle-pcb-wiring.webp", width: 894, height: 1250, alt: "키링 PCB에 연결한 배터리와 배선", caption: "11월 18일 실물 촬영 · 배터리와 모듈을 연결한 기판"},
        {src: "assets/blog/tingle-case.webp", width: 975, height: 1300, alt: "조립한 키링 케이스의 외관", caption: "11월 18일 완성한 케이스 외관"},
        {src: "assets/blog/tingle-accept.webp", width: 1200, height: 944, alt: "앱에서 만남 제안을 수락하는 화면", caption: "상호 수락을 위한 앱 확인 창"}
      ],
      videos: [
        {src: "assets/blog/tingle-led-pair.mp4", poster: "assets/blog/tingle-led-pair-poster.webp", caption: "실물 키링 두 대의 LED 점등 · 원본 10–26초 · 무음", linkLabel: "실물 키링 시연 · 16초"}
      ],
      caseEvidence: {
        2: [
          {src: "assets/projects/tingle.webp", alt: "자로 크기를 확인한 Tingle 실물 PCB의 소켓과 커넥터", caption: "11월 16일 실물 사진 · 모듈을 연결하는 소켓과 커넥터가 보이는 기판"},
          {src: "assets/blog/tingle-led-pair.mp4", poster: "assets/blog/tingle-led-pair-poster.webp", caption: "조립한 두 키링에서 매칭 LED가 켜지는 모습 · 16초 · 무음"}
        ]
      }
    },
    ddubi: {
      development: [
        ["노선·정류장 매핑", "머신러닝 모델로 카카오 경로의 버스 구간을 예측하려면, 그 구간이 공공데이터의 어느 노선과 정류장에 해당하는지 알아야 했습니다. 같은 번호의 버스도 구분할 수 있도록 승하차 순서와 운행 방향을 대조해 공식 노선과 정류장을 연결했습니다.", "승하차 순서와 운행 방향을 대조"],
        ["버스 구간 운행시간 예측", "정류장 사이의 운행 기록으로 LightGBM 모델을 학습했습니다. 같은 두 정류장 사이라도 시간대에 따라 버스가 이동하는 데 걸리는 시간을 다르게 예측합니다.", "LightGBM 모델을 학습"],
        ["경로별 이동시간 계산", "버스·지하철·도보 구간의 시간을 합산했습니다. 원본 경로에 포함된 대기 시간을 두 번 더하지 않도록 계산했습니다."],
        ["반복 예측 요청 처리", "버스 구간을 예측할 때 쓰는 과거 운행 데이터를 처음 읽으면 서버 메모리에 보관했습니다. 다음 요청에서 같은 데이터가 필요하면 파일을 다시 열지 않고 메모리에서 읽습니다.", "과거 운행 데이터를 처음 읽으면 서버 메모리에 보관"]
      ],
      goal: "약속 시간에서 거꾸로 계산해 출발 시각을 결정할 수 있게 하기",
      audience: "약속 시간에 맞춰 대중교통으로 이동하는 사용자",
      features: ["일정 등록", "버스 구간 소요시간 예측", "환승과 출발 시각 계산"],
      technicalChoices: [
        {tech: "LightGBM", reason: "같은 검증 데이터로 CatBoost와 ExtraTrees도 비교했습니다. 정류장 간 운행시간의 평균 절대 오차가 가장 작은 LightGBM을 최종 모델로 선택했습니다."},
        {tech: "Apache Spark", reason: "배치로 수집한 동일 구간 관측값에서 시각을 비교해 최신 값을 골랐습니다."},
        {tech: "Redis · Lua", reason: "관측 시각 비교와 저장을 한 번에 처리해 늦게 도착한 과거 값이 최신 값을 덮는 상황을 막았습니다."}
      ],
      outcome: "카카오의 대중교통 경로를 공공데이터의 노선·정류장과 연결해 후보별 이동·대기·환승 시간을 계산했습니다. 사용자는 약속 시간에 맞는 추천 경로와 출발 시각을 확인할 수 있습니다.",
      image: "assets/blog/ddubi-initial.webp", width: 831, height: 1800, alt: "DDUBI 앱 시연 시작 화면",
      summary: "일정과 도착 시각을 입력하면 대중교통 경로별 소요시간과 출발 시각을 안내합니다.",
      gallery: [
        {src: "assets/blog/ddubi-route-detail.webp", width: 693, height: 1400, alt: "지도 경로와 시간·환승·이동 단계가 함께 보이는 경로 상세", caption: "팀 시연 캡처 · 상단 경로 지도와 구간별 이동 단계"},
        {src: "assets/blog/ddubi-traffic.webp", width: 1080, height: 998, alt: "일정의 이동 변수 중 날씨와 도로 통제를 함께 표시하는 화면", caption: "팀 시연 캡처 · 일정별 교통 상황"},
        {src: "assets/blog/ddubi-model.png", width: 1400, height: 795, alt: "기준선과 네 모델의 구간 소요시간 MAE", caption: "검증집합 999,894행의 모델별 평균 절대 오차"}
      ],
      videos: [
        {src: "assets/blog/ddubi-team-route.mp4", poster: "assets/blog/ddubi-team-route-poster.webp", caption: "팀 발표 영상의 앱 시연 장면 · 원본 38–47초 · 무음", linkLabel: "팀 영상의 일정·경로 안내 · 9초"}
      ],
      caseEvidence: {
        1: {src: "assets/blog/ddubi-route-detail.webp", width: 693, height: 1400, alt: "지도 경로와 시간·환승·이동 단계가 함께 보이는 경로 상세", caption: "경로 화면에서 확인하는 구간 구성. 비교한 두 경로의 합계는 별도 고정 입력 시험 결과입니다."},
        2: {src: "assets/blog/ddubi-route-mapping.webp", width: 960, height: 600, alt: "노선 연결 건수 169/170에서 170/170, 탑승 단계 48/49에서 49/49", caption: "고정 개발 경로 네 개에서 공식 노선 연결 여부를 비교한 결과"},
        3: {src: "assets/blog/ddubi-cache-cost.webp", width: 960, height: 600, alt: "캐시 적용 전후 평균 응답시간과 최대 메모리 비교", caption: "같은 10개 구간의 예측값을 대조하고 웜 호출 시간과 최대 메모리 사용량을 함께 측정"},
        4: {src: "assets/blog/ddubi-traffic.webp", width: 1080, height: 998, alt: "일정의 이동 변수 중 날씨와 도로 통제를 함께 표시하는 화면", caption: "도로 통제 변수를 표시하는 화면. 운영 승인과 실제 사고 판정은 별도 검증 대상입니다."}
      }
    },
    melly: {
      development: [
        ["호스트 운영 콘솔", "팬미팅 목록과 운영 화면을 연결했습니다. 호스트가 다음 팬을 호출하면 API에서 받은 통화 ID로 해당 팬의 방에 입장합니다.", "팬미팅 목록과 운영 화면을 연결"],
        ["통화 전 장비 점검", "LiveKit으로 카메라와 마이크를 미리 확인하는 화면을 연결했습니다. 선택한 장치를 같은 탭에 저장해 통화방에서 다시 쓸 수 있도록 했습니다.", "선택한 장치를 같은 탭에 저장"]
      ],
      outcomeFocus: "하나의 콘솔에서 다음 팬을 호출",
      goal: "팬이 순서를 기다렸다가 호스트의 호출로 영상 통화에 입장하도록 하기",
      audience: "영상 팬미팅에 참여하는 팬과 행사를 진행하는 호스트",
      features: ["팬 대기실", "호스트의 다음 팬 호출", "일대일 영상 통화"],
      technicalChoices: [
        {tech: "LiveKit", reason: "팬이 입장 전에 실제 통화에 쓸 카메라와 마이크를 확인하도록 장비 점검 화면을 연결했습니다."},
        {tech: "sessionStorage", reason: "입장 전에 고른 카메라와 마이크의 선택 정보를 같은 탭의 통화 화면으로 전달했습니다."}
      ],
      outcome: "호스트가 하나의 콘솔에서 다음 팬을 호출하고 응답으로 받은 통화 ID를 사용해 해당 팬의 방에 입장하는 흐름을 연결했습니다.",
      image: "assets/blog/melly-queue.webp", width: 1440, height: 1025, alt: "호출·대기·완료 인원과 현재 통화 세션을 표시하는 운영 화면",
      summary: "팬은 당첨된 행사의 대기실에 입장하고, 호스트는 다음 팬을 호출해 영상 통화를 시작합니다.",
      gallery: [
        {src: "assets/blog/melly-event-create.webp", width: 1440, height: 1025, alt: "팬미팅 이름·일시·담당 인플루언서를 받는 생성 폼", caption: "0171ff7 화면 미리보기 · 팬미팅 생성 첫 단계"},
        {src: "assets/blog/melly-queue.webp", width: 1440, height: 1025, alt: "호출·대기·완료 인원과 현재 통화 세션을 표시하는 운영 화면", caption: "0171ff7 화면 미리보기 · 실시간 대기열과 현재 통화"},
        {src: "assets/blog/melly-device.webp", width: 1440, height: 1025, alt: "입장 전 카메라·마이크·스피커 점검 화면", caption: "0171ff7 화면 미리보기 · 팬의 입장 전 장치 점검"}
      ],
      videos: [
        {src: "assets/blog/melly-manager-demo.mp4", poster: "assets/blog/melly-manager-demo-poster.webp", caption: "팀 발표 영상의 행사 관리·운영 화면 · 원본 73–95초 · 무음", linkLabel: "팀 발표의 행사 운영 화면 · 22초"}
      ],
      caseEvidence: {
        1: {src: "assets/blog/melly-event-create.webp", width: 1440, height: 1025, alt: "팬미팅 이름·일시·담당 인플루언서를 받는 생성 폼", caption: "생성 폼 첫 단계와 응모 설정 단계의 위치. 요청 검증 결과는 린트·타입 검사·빌드 기록 기준입니다."},
        2: {src: "assets/blog/melly-queue.webp", width: 1440, height: 1025, alt: "호출·대기·완료 인원과 현재 통화 세션을 표시하는 운영 화면", caption: "운영 화면에서 호출 상태와 현재 통화 세션을 확인하는 예시 화면"},
        3: {src: "assets/blog/melly-room-assertions.webp", width: 1080, height: 300, alt: "모의 LiveKit 방과 상태 오류 문구가 함께 나타나는지 검사하는 두 단언문", caption: "8월 12일 보관한 회귀 테스트의 실제 단언문. LiveKit은 대체하고 폴링을 끈 조건입니다."}
      }
    },
    flex: {
      development: [
        ["가입부터 첫 소비 기록까지", "팀원과 소비 기록 흐름과 ERD를 설계했습니다. AI의 도움을 받아 구현하면서 계정·프로필 생성부터 기본 카테고리로 첫 소비를 입력하는 과정까지 점검했습니다.", "팀원과 소비 기록 흐름과 ERD를 설계"],
        ["사진 보관과 월별 분석", "소비 사진을 기록과 함께 보관하는 방식을 검토했습니다. 월별 조회에서는 기록이 없는 경우와 외부 분석이 실패한 경우에 사용자가 받는 결과를 구분했습니다.", "사용자가 받는 결과를 구분"]
      ],
      outcomeFocus: "외부 분석 호출이 실패해도 총액과 카테고리 집계",
      goal: "소비 순간을 사진으로 기록하고 지난달 지출을 다시 살펴볼 수 있게 하기",
      audience: "소비 순간을 사진으로 남기고 친구와 일상을 공유하는 사용자",
      features: ["사진·금액·카테고리 기록", "친구 피드", "월별 소비 분석 조회"],
      technicalChoices: [
        {tech: "Django 트랜잭션", reason: "가입 과정에서 계정과 프로필 저장을 함께 완료하거나 되돌리도록 처리했습니다."},
        {tech: "Django REST Framework", reason: "소비 기록을 수정할 때 로그인 사용자와 기록 작성자를 대조해 권한을 확인했습니다."}
      ],
      outcome: "이전 달의 소비 분석을 다시 조회할 수 있게 했습니다. 기록이 있는 달에는 외부 분석 호출이 실패해도 총액과 카테고리 집계를 볼 수 있습니다.",
      image: "assets/blog/flex-original-feed.webp", width: 1287, height: 916, alt: "소비 사진과 지출 금액을 함께 표시한 피드",
      summary: "소비한 순간을 금액·카테고리·사진과 함께 기록하고, 친구 피드와 월별 분석으로 이어가는 소셜 가계부입니다.",
      gallery: [
        {src: "assets/blog/flex-original-feed.webp", width: 1287, height: 916, alt: "소비 사진과 지출 금액을 함께 표시한 피드", caption: "공개 팀 저장소의 원본 서비스 미리보기"},
        {src: "assets/blog/flex-record-schema.webp", width: 1440, height: 828, alt: "계정·프로필·소비 기록 사이의 관계를 표시한 설계도", caption: "공개 팀 저장소의 최종 ERD"}
      ],
      videos: [],
      caseEvidence: {
        1: {src: "assets/blog/flex-record-schema.webp", width: 1440, height: 828, alt: "계정·프로필·소비 기록 사이의 관계를 표시한 설계도", caption: "계정·프로필·소비 기록의 데이터 관계. 테스트 통과 수는 당시 완료 보고 기준입니다."},
        2: {src: "assets/blog/flex-media-model.webp", width: 1120, height: 345, alt: "소비 사진 바이트를 저장하는 BinaryField 모델 선언", caption: "공개 저장소 최종 커밋의 모델 정의 · 새로 올린 사진을 DB에 포함하는 필드"},
        3: {src: "assets/blog/flex-analysis-empty.webp", width: 725, height: 191, alt: "소비 기록이 0건이면 데이터 부족 안내를 반환하는 코드", caption: "공개 저장소에 남은 fallback_analysis의 빈 달 분기. 외부 호출 실패 분기는 별도 구현입니다."}
      }
    }
  }
};
