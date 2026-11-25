// Public summaries are shared by the home deck and the case reader.
export const projectSummaries = [
  {
    id: 'flex', name: 'Flex_Log',
    service: '사진으로 소비를 기록하고 친구와 나누는 소셜 가계부',
    role: '공동 기획 · 가입과 첫 소비 기록 흐름 점검',
    period: '2026.05.08 기획 ~ 06.26 개발 기록',
    summary: '가입 코드에서 계정·프로필의 동시 롤백을 확인하고, 첫 소비에 쓸 기본 카테고리 8개를 채웠습니다.',
    languages: ['Python', 'JavaScript'], frameworks: ['Django REST Framework', 'Vue 3'], tools: ['Pinia', 'SQLite'],
  },
  {
    id: 'melly', name: 'Melly',
    service: 'WebRTC를 이용한 일대일 영상 팬미팅 서비스',
    role: '프런트엔드 · 화면 설계와 API 연동',
    period: '2026.07.13 ~ 08.07',
    summary: '상태 조회만 실패시킨 인플루언서 입장 테스트에서 영상 화면과 오류 안내가 함께 표시됐습니다.',
    languages: ['TypeScript', 'Java'], frameworks: ['React', 'Spring Boot'], tools: ['LiveKit', 'WebRTC'],
  },
  {
    id: 'ddubi', name: 'DDUBI',
    service: '머신러닝을 이용한 대중교통 사용자 일정 맞춤 경로 추천 서비스',
    role: '머신러닝·분산 백엔드 · 버스 구간 데이터 연산과 운행시간 예측 모델 검증',
    period: '2026.08.17 시작 · 9월 개발',
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

const meta = {
  flex: {
    team: '2인 팀',
    demo: null,
  },
  melly: {
    team: '6인 팀',
    demo: ['melly-demo.mp4', 'melly-demo.webp', 1120, 630, '팬미팅 당첨을 확인하고 통화 순번을 기다리는 팀 시연', '팀 시연 · 당첨 확인과 입장 대기 · 16초'],
  },
  ddubi: {
    team: '6인 팀',
    demo: ['ddubi-sequence.mp4', 'ddubi-home.webp', 480, 936, '일정 입력 전후를 순서대로 보여 주는 실기기 캡처 모음', '일정 등록 전후 · 실기기 캡처 6장 · 12초'],
  },
  tingle: {
    team: '6명 · 프런트엔드 2, 백엔드 2, AI 1, IoT 1',
    demo: ['tingle-demo.mp4', 'tingle-demo.webp', 800, 694, '조립된 키링과 옆 기판의 LED가 함께 켜지는 장면', '실물 시연 · 두 키링의 매칭과 LED 점등 · 14초'],
  },
};

export function projectInterview(id) {
  return meta[id];
}
