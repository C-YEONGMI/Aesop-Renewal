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

**진입점**: `src/main.jsx` → `src/App.jsx` → `src/router/index.jsx`

**라우팅**: `react-router-dom` v6 `createBrowserRouter`. 모든 라우트는 `Layout` 컴포넌트를 공통 쉘로 사용 (`<Outlet />`).

**페이지 컴포넌트 위치 (두 군데)**:
- `src/components/pages/` — 메인 페이지 (`Main.jsx`) 전용
- `src/pages/` — 나머지 모든 페이지 (Products, ProductDetail, Cart, Checkout, Login, Signup, FindAccount, MyPage, GiftGuide, Benefits, KrExclusiveBenefits, OurStory, Search, Support, StoreLocator)

**공통 컴포넌트** (`src/components/common/`):
- `Layout.jsx` — 헤더/푸터 래퍼. 홈(`/`)의 Hero 구간에서는 transparent 헤더, 스크롤 후 또는 내부 페이지에서는 solid 헤더로 자동 전환
- `Header/Header.jsx` — 단일 헤더 컴포넌트 (`transparent` prop으로 스타일 분기)
- `Footer/Footer.jsx`
- `btn/FloatingButtons.jsx` — 모든 페이지에 고정 표시
- `btn/AddToCartButton.jsx` — 장바구니 담기 버튼
- `benefits/BenefitsPageHeader.jsx` — Benefits 하위 페이지 공통 헤더/탭 네비게이션
- `badge/` — Best.jsx, New.jsx, Exclusive.jsx
- `mainpage/` — 메인 페이지 전용 섹션 컴포넌트들 (Hero, BestProductsSection, BestboxSm, BestpdLg, KoreaExclusiveSection, AboutTeaserSection, BestGiftSection, NewArrivalSection, OfficialExclusiveSection, StoreVisualSection, IntroCopy, ProductNavigatorSection)
- `ui/` — ExpandableSearchBar.jsx, ExpandableChat.jsx

**상태 관리** (`src/store/`, 모두 Zustand + `persist` 미들웨어로 localStorage 영속화):
- `useCartStore.js` — 장바구니 (key: `aesop-cart`). `cartId = productName-variantIndex`
- `useAuthStore.js` — 인증/회원. `users[]` 배열을 localStorage에 저장해 로컬 모의 백엔드로 사용
- `useWishlistStore.js` — 위시리스트
- `useOrderStore.js` — 주문 내역
- `useProductStore.js` — 상품 목록 상태
- `useSupportStore.js` — 고객지원 상태

**데이터** (`src/data/`):
- `products.json` — 제품 정적 데이터 (category, name, description, badge, variants[]{capacity, price, image})
- `stores.json` — 매장 정보
- `mainPageContent.js` — 메인 페이지 카피·큐레이션 데이터. `BEST_PRODUCT_NAMES`로 베스트 3개 상품 고정 지정 (랜덤 금지)
- `krExclusiveBenefitsContent.js` — KrExclusiveBenefits 페이지 전용 콘텐츠·이미지 데이터

## GSAP 애니메이션 패턴

페이지 단위 애니메이션은 "recipe 배열" 패턴으로 관리한다 (`KrExclusiveBenefits.jsx` 참고):
- `SECTION_REVEAL_RECIPES` — ScrollTrigger 기반 진입 애니메이션 목록
- `DESKTOP_SCRUB_RECIPES` — 데스크톱 전용 패럴랙스/스크럽 목록
- 반드시 `gsap.matchMedia()`로 `prefers-reduced-motion: no-preference` 조건 하에만 실행
- `gsap.context()`로 컴포넌트 언마운트 시 `ctx.revert()` 정리

## 스타일링

- `src/globals.scss` — 전역 CSS 리셋, 색상 토큰(SCSS 변수), 폰트 클래스 유틸리티. 각 컴포넌트 폴더에 동명 `.scss` 파일 위치
- 색상 시스템: `$brown-50` ~ `$brown-900`, `$bg-primary` (#eee5da), `$bg-product` (#decbbc), `$bg-overlay` (#12110f), `$oatmeal` (#fffbf3), `$point-pink`, `$point-green`
- 폰트 클래스 네이밍: `{폰트명}-{크기}` 또는 `{폰트명}-{크기}-{굵기}` (예: `.montage-48`, `.suit-24-sb`, `.optima-40`)
- 폰트: Montage (영문 장식, 로컬 woff/woff2), SUIT Variable (한/영 본문, CDN), Optima (영문 세리프, CDN)

## 기타 컨벤션

- `data-node-id` 속성 — Figma 디자인 노드 ID 추적용. 실제 동작에는 영향 없음
- SVG 임포트: `vite-plugin-svgr`로 React 컴포넌트로 사용 (`import Logo from './logo.svg?react'`)

## Key Dependencies

- `react-router-dom` — SPA 라우팅
- `gsap` + `gsap/ScrollTrigger` — 스크롤/진입/패럴랙스 애니메이션
- `zustand` — 전역 상태 관리
- `sass` — SCSS 컴파일
- `vite-plugin-svgr` — SVG → React 컴포넌트 변환
