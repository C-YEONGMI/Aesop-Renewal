# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Aesop 웹사이트 리디자인 퍼블리싱 프로젝트. React + Vite 기반의 SPA.

## Commands

```bash
npm run dev       # 개발 서버 시작 (http://localhost:5173)
npm run build     # 프로덕션 빌드 (tsc -b && vite build)
npm run lint      # ESLint 검사
npm run preview   # 빌드 결과물 미리보기
```

## Architecture

**진입점**: `src/main.jsx` → `src/App.jsx`

**컴포넌트 구조**:
- `src/components/pages/` — 페이지 단위 컴포넌트 (Main 등)
- `src/components/common/` — 재사용 공통 컴포넌트
  - `Header/` — 다크(Header.jsx)와 화이트(Header_wh.jsx) 두 가지 버전
  - `Footer/`
  - `mainpage/` — 메인 페이지 전용 섹션 컴포넌트 (BestboxSm, BestpdLg, Hero)
  - `badge/` — Best, New, Exclusive 뱃지 컴포넌트
  - `btn/` — More, MoreBox, MoreWhBox 버튼 컴포넌트

**데이터**: `src/data/products.json` — 제품 목록 정적 데이터 (category, name, description, badge, variants)

**스타일링**:
- `src/globals.scss` — 전역 CSS 리셋, 색상 토큰(SCSS 변수), 폰트 클래스 유틸리티
- 각 컴포넌트와 같은 폴더에 `.scss` 파일 위치
- 색상 시스템: `$brown-50` ~ `$brown-900` 브라운 팔레트, `$bg-primary/product/overlay`, `$oatmeal`
- 폰트 클래스 네이밍: `{폰트명}-{크기}` 또는 `{폰트명}-{크기}-{굵기}` (예: `.montage-48`, `.suit-24-sb`, `.optima-40`)

**폰트**: Montage (영문 장식), SUIT Variable (한/영 본문), Optima (영문 세리프)

**SVG 임포트**: `vite-plugin-svgr` 설정으로 SVG를 React 컴포넌트로 임포트 가능
```js
import Logo from './assets/logo.svg?react'  // React 컴포넌트로 사용
```

## Key Dependencies

- `gsap` — 스크롤/진입 애니메이션
- `zustand` — 전역 상태 관리 (장바구니 등)
- `sass` — SCSS 컴파일
- `vite-plugin-svgr` — SVG → React 컴포넌트 변환
