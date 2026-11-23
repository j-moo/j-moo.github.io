# 김종무 개발 포트폴리오

[웹 포트폴리오](https://j-moo.github.io/#projects)에서 명함을 눌러 프로젝트별 서비스, 개인 기여, 주요 기능과 트러블슈팅을 읽을 수 있다. 왼쪽 사이드바의 AI 활용 사례에서 네 프로젝트의 활용 방법을 확인하거나 DDUBI와 Tingle을 정리한 [제출용 PDF](https://j-moo.github.io/assets/kim-jongmu-portfolio.pdf)를 열 수 있다.

## 로컬 실행

저장소 루트에서 Node.js로 실행한다.

```sh
npm run build
npm run dev
```

로컬 주소는 [포트폴리오 미리보기](http://127.0.0.1:4173/#projects)다. GitHub Pages는 `main` 브랜치의 `docs/`를 제공한다.

## 내용 수정

- 첫 화면과 교육은 `home.mjs`, 기술 목록은 `skills.mjs`에서 수정한다.
- 사례 본문과 검증 수치는 `application.mjs`, 프로젝트 이름과 기간은 `cases.mjs`, 상세 화면은 `case-reader.mjs`에서 수정한다.
- 화면 스타일과 동작은 `docs/css/`, `docs/js/`에 있다. 사례 요약 도표는 빌드할 때 생성한다. PDF는 같은 페이지를 A4, 배율 100%, 배경 그래픽 켬, 머리글·바닥글 끔으로 인쇄해 `docs/assets/kim-jongmu-portfolio.pdf`로 저장한다.
- 수정 후 `npm run check`와 `npm run build`를 실행하고 생성된 HTML과 변경한 파일을 함께 커밋한다.
