# 김종무 포트폴리오와 개발 기록

[공개 블로그](https://j-moo.github.io/) · [작업 모음](https://j-moo.github.io/archive/) · [소개와 인쇄용 요약](https://j-moo.github.io/about/)

특정 직무를 우선하지 않고, 네 팀 프로젝트를 맡은 일과 검증 결과로 소개한다. 작업 모음에는 Flex_Log, Melly, DDUBI, Tingle을 작업 시기 순으로 싣는다. 홈에는 이름과 프로필 사진, 두 문장의 자기소개와 연락용 이메일, 기술 스택, SSAFY 수료와 대학 학력을 싣는다. 홈에서 기술 아이콘과 프로젝트별 화면·역할을 확인하고, 상세에서 프로젝트 소개, 주요 기능 개발, 트러블슈팅 순으로 읽는다. 개발 기록은 별도 목록에서 찾을 수 있다.

## 실행

저장소 루트에서 Node.js로 빌드하고 로컬 서버를 시작한다. 외부 패키지 설치는 필요하지 않다.

```sh
node build.mjs
node serve.mjs
```

로컬 주소는 [포트폴리오 미리보기](http://127.0.0.1:4173)다. GitHub Pages는 main 브랜치의 docs 폴더를 제공한다.

## 내용 수정

- `content.mjs`에 서비스 소개, 특징, 역할, 시연 자료와 트러블슈팅를 둔다.
- `skills.mjs`에는 분류별 기술 이름과 아이콘을 둔다. 아이콘 출처는 [아이콘 안내](assets/tech/README.md)에 있다.
- `portfolio-data.mjs`에는 프로젝트별 개발 기록 본문이 있다.
- `build.mjs`가 정적 HTML, 사이트맵, RSS와 검색 색인을 만든다. `styles.css`와 `app.js`에서 화면과 검색·테마·인쇄 동작을 수정한다. 이름과 사진의 등장, 스크롤 시 프로젝트 화면의 등장, 링크의 움직임은 `motion.js`와 `motion.css`에서 조정한다.
- `assets/sources.json`에 공개 자료의 출처와 측정 범위를 남긴다. 이미지나 발췌를 교체하면 캡션과 출처도 함께 갱신한다. 글꼴 라이선스는 `assets/Pretendard-LICENSE.txt`에 있다.
- 변경 후 빌드해 `docs/`와 소스를 함께 반영한다. 공개용 자료만 수록한다.
