# 김종무 포트폴리오 · 개발 기록

공개 사이트: https://j-moo.github.io/

DDUBI, Tingle, Melly, Flex_log 프로젝트의 본인 역할과 문제 해결 과정을 담은 정적 GitHub Pages 사이트입니다.

## 실행

Node.js에서 외부 패키지 설치 없이 실행합니다.

```sh
node build.mjs
node serve.mjs
```

로컬 주소는 http://127.0.0.1:4173 입니다.

## 수정과 배포

- 프로젝트와 개발 기록: `portfolio-data.mjs`
- 공통 프로젝트 데이터: `content.mjs`
- 페이지 생성: `build.mjs`
- 디자인: `styles.css`
- 검색·필터·테마: `app.js`
- 빌드 결과: `docs/`

내용을 수정한 뒤 `node build.mjs`를 실행하고 변경 파일과 `docs/`를 함께 커밋합니다. GitHub Pages 설정은 `main` 브랜치의 `/docs` 폴더를 사용합니다.

프로젝트의 확인 범위와 본인 기여를 유지하고, 실제 사용자 성과나 단독 구현으로 확대하지 않습니다. 개발 미리보기와 CAD 렌더는 해당 이미지 캡션으로 구분합니다. 비공개 기록 원문, 연락처, 인증정보는 포함하지 않습니다.

## 화면과 기능

반응형 레이아웃, 키보드 검색(Ctrl/Cmd+K), 개발 기록 분류·검색, 밝은/어두운 테마, 인쇄 스타일, RSS, sitemap을 제공합니다. 검색은 공개된 사이트 콘텐츠만 브라우저에서 조회합니다.

Pretendard 글꼴 라이선스는 `assets/Pretendard-LICENSE.txt`에 있습니다. 프로젝트 화면·사진·도식은 본인 프로젝트 보관 자료에서 필요한 부분을 선별했습니다.
