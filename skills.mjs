// Each level records an absent (0), partial or assisted (0.5), or directly
// evidenced (1) contribution. Keep the order aligned with the criteria.
export const criteria = [
  ['기능 적용', 30], ['다른 구성 요소와 연동', 20], ['문제 진단', 30], ['결과 검증', 20]
];

export const skillGroups = [
  {
    id: 'languages', title: '사용 언어',
    skills: [
      {name: 'Python', icon: 'python.svg', levels: [1, .5, 1, 1], example: 'DDUBI · 참조 표 캐시 전후 비교', url: '/notes/ddubi-reader-cache/'},
      {name: 'Java', icon: 'java.svg', levels: [.5, 1, 1, .5], example: 'DDUBI · 버스 소요시간 출처 추적', url: '/projects/ddubi/#java-route-source'},
      {name: 'JavaScript', icon: 'javascript.svg', levels: [.5, .5, 1, .5], example: 'Flex_Log · 소비 기록 화면 연동', url: '/projects/flex/#vue-api'},
      {name: 'TypeScript', icon: 'typescript.svg', levels: [.5, 1, 1, .5], example: 'Melly · 응모 정원 요청 오류 추적', url: '/notes/melly-disabled-application/'},
      {name: 'C', icon: 'c.svg', levels: [.5, .5, 1, 1], example: 'Tingle · 보드 진단 출력 검증', url: '/notes/tingle-usb-diagnostics/'}
    ]
  },
  {
    id: 'frameworks', title: '프레임워크·라이브러리',
    skills: [
      {name: 'Spring Boot', icon: 'springboot.svg', levels: [.5, 1, .5, 1], example: 'DDUBI · 내부 API와 MySQL 연동 검증', url: '/projects/ddubi/#spring-baseline'},
      {name: 'Django REST Framework', icon: 'djangorest.svg', levels: [.5, 1, 1, .5], example: 'Flex_Log · 가입과 프로필 저장', url: '/notes/flex-signup/'},
      {name: 'Vue 3', icon: 'vuejs.svg', levels: [.5, 1, .5, .5], example: 'Flex_Log · 가입과 첫 소비 기록', url: '/projects/flex/#vue-api'},
      {name: 'React', icon: 'react.svg', levels: [1, 1, 1, .5], example: 'Melly · 영상 입장 오류 처리', url: '/notes/call-entry/'},
      {name: 'FastAPI', icon: 'fastapi.svg', levels: [.5, 1, .5, 1], example: 'DDUBI · 구간 예측 요청 검증', url: '/projects/ddubi/#fastapi-runtime'}
    ]
  },
  {
    id: 'databases', title: '데이터베이스',
    skills: [
      {name: 'MySQL', icon: 'mysql.svg', levels: [.5, 1, .5, 1], example: 'DDUBI · 기준시간과 표본 수 조회', url: '/projects/ddubi/#spring-baseline'},
      {name: 'PostgreSQL', icon: 'postgresql.svg', levels: [.5, .5, .5, 1], example: 'Tingle · 개발 DB 연결과 기기 상태 조회', url: '/projects/tingle/#postgres-qa'},
      {name: 'Redis', icon: 'redis.svg', levels: [.5, 1, 1, .5], example: 'DDUBI · 오래된 관측의 덮어쓰기 방지', url: '/projects/ddubi/#spark-redis'}
    ]
  },
  {
    id: 'data-libraries', title: '데이터 라이브러리',
    skills: [
      {name: 'pandas', icon: 'pandas.svg', levels: [.5, 1, .5, 1], example: 'DDUBI · 날짜별 교통 데이터 전처리', url: '/projects/ddubi/#daily-parquet'},
      {name: 'NumPy', icon: 'numpy.svg', levels: [.5, .5, .5, 1], example: 'DDUBI · 버스 구간 예측 오차 계산', url: '/projects/ddubi/#numpy-errors'}
    ]
  },
  {
    id: 'distributed-embedded', title: '분산 처리·임베디드',
    skills: [
      {name: 'Apache Spark', icon: 'apachespark.svg', levels: [.5, 1, .5, .5], example: 'DDUBI · 최신 관측 처리', url: '/projects/ddubi/#spark-redis'},
      {name: 'Zephyr RTOS', icon: 'zephyr.svg', levels: [.5, .5, 1, .5], example: 'Tingle · 키링 펌웨어 진단', url: '/notes/tingle-usb-diagnostics/'},
      {name: 'BLE', icon: 'bluetooth.svg', levels: [1, 1, .5, 1], example: 'Tingle · 두 키링의 근접 매칭', url: '/notes/tingle-demo/'}
    ]
  }
];
