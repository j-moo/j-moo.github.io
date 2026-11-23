# 김종무 개발 포트폴리오

명함에서 시연을 재생하거나 프로젝트를 선택하면 Flex_Log, Melly, DDUBI, Tingle의 서비스 화면과 맡은 일, 주요 개발 작업, 트러블슈팅을 볼 수 있다. 같은 화면에서 프로필, 기술 스택과 학력을 열람할 수 있다. [공개 포트폴리오](https://j-moo.github.io/#projects)

## 로컬 실행

저장소 루트에서 Node.js로 실행한다.

```sh
npm run build
npm run dev
```

로컬 주소는 [포트폴리오 미리보기](http://127.0.0.1:4173/#projects)다. GitHub Pages는 `main` 브랜치의 `docs/`를 제공한다.

## 내용 수정

- 첫 화면과 교육은 `home.mjs`, 기술 목록은 `skills.mjs`에서 수정한다.
- 프로젝트 설명은 `cases.mjs`, 상세 화면은 `case-reader.mjs`, 개발 기록은 `portfolio-data.mjs`에서 수정한다.
- 화면 스타일과 동작은 `docs/css/`, `docs/js/`에 있다. 사진, 시연 영상, 글꼴과 아이콘은 `docs/assets/`에서 관리한다.
- 수정 후 `npm run check`와 `npm run build`를 실행하고 생성된 HTML과 변경한 파일을 함께 커밋한다.
