# Aesop Renewal Implementation Guide

## 1. 문서 목적

이 문서는 **현재 프로젝트의 기존 파일과 경로를 유지하면서**, 첨부된 메인페이지 시안과 페르소나 방향에 맞게 Aesop 리뉴얼을 구현하기 위한 **실행 기준서**다.

이번 문서의 핵심은 두 가지를 동시에 만족시키는 것이다.

1. **메인페이지는 시안과 같은 섹션 흐름과 무드로 구현한다.**
2. **홈만 예쁘게 만드는 수준이 아니라, 홈 → 상품목록 → 상세 → 장바구니 → 결제 → 마이페이지까지 이어지는 큰 틀과 기능 뼈대도 함께 만든다.**

즉, 이 문서는 단순한 랜딩페이지 가이드가 아니라,  
**에디토리얼 무드의 공식몰 프론트엔드를 먼저 완성해두고 그 안에서 세부 수정을 이어갈 수 있게 만드는 구현 문서**다.

---

## 2. 이번 문서의 작업 방식

이번 리뉴얼은 아래 방식으로 진행한다.

- **기존 파일은 삭제하지 않는다.**
- **기존 경로와 import 흐름은 최대한 유지한다.**
- 다만, 전체적인 페이지 흐름과 기능 구현을 위해 필요한 폴더/파일/라이브러리는 **추가하는 방식으로 확장**한다.
- 메인페이지는 시안과 동일한 흐름으로 맞추고, 동시에 **전체 몰 구조를 움직일 수 있는 라우팅/상태관리/페이지 뼈대**도 먼저 만든다.
- 이후 세부 스타일, 카피, 이미지, 상품 구성은 사용자가 직접 추가 수정하기 쉬운 구조로 쪼개서 만든다.

한 줄로 정리하면 아래와 같다.

> **기존 구조는 보존하고, 필요한 스택은 추가 도입해서, 전체 페이지 흐름과 핵심 기능을 먼저 완성한 뒤 세부 수정을 이어갈 수 있게 만든다.**

---

## 3. 절대 지켜야 할 원칙

### 3-1. 기존 파일 삭제 금지

- 현재 저장소에 있는 파일은 **삭제하지 않는다.**
- 현재 파일명은 가능하면 유지한다.
- 경로 충돌 방지를 위해, 신규 구현이 필요하면 **기존 폴더 하위에 추가**하거나 **새 폴더를 병행 추가**하는 방식으로 확장한다.
- 기존 import를 깨는 파일 이동, 파일명 변경, 대소문자 변경은 지양한다.

### 3-2. `globals.scss`는 단일 소스 오브 트루스다

색상과 폰트 스타일은 이미 `globals.scss`에 정의되어 있다.  
따라서 아래 항목은 이 문서에서 새로 재정의하지 않는다.

- 컬러 토큰
- 폰트 패밀리
- 타이포 클래스
- 배경 유틸리티 클래스
- 전역 spacing이 이미 있다면 그 토큰 체계

구현 원칙은 아래와 같다.

- 각 섹션 SCSS는 `globals.scss`를 import해서 사용한다.
- 타이포는 가능하면 기존 `.montage-*`, `.optima-*`, `.suit-*` 계열을 그대로 사용한다.
- 메인페이지 리뉴얼을 이유로 별도의 브랜드 컬러 파일이나 폰트 시스템을 다시 만들지 않는다.
- 필요한 경우에도 **globals.scss 기반 확장**으로 처리한다.

### 3-3. 큰 틀 구현에 필요한 기술과 스택은 이번 단계에서 포함한다

이번 프로젝트의 목적은 **전체적인 페이지 흐름과 기능을 먼저 구현하고, 그 안에서 사용자가 추가 수정을 할 수 있게 만드는 것**이기 때문이다.

따라서 아래 스택은 **이번 구현 단계에서 기본 전제로 사용 가능하며, 필요한 경우 선제적으로 포함한다.**

- React 19
- Vite 7
- React Router DOM 7
- Zustand 5
- Sass / SCSS
- Swiper 11
- GSAP 3
- Lucide React
- SweetAlert2
- react-quill-new
- react-daum-postcode
- vite-plugin-svgr
- 정적 상품 데이터(`src/data/products.json` 또는 data 폴더 JSON)
- 정적 에셋(`src/assets`, `public/images`)

원칙은 아래와 같다.

- 기존 파일은 유지한다.
- 전체 흐름 구현에 필요한 라이브러리는 추가 설치할 수 있다.
- 라우터, 스토어, 모달, 슬라이더, 애니메이션은 **메인 구조를 완성하기 위한 도구**로 사용한다.
- 단, 기술이 목적이 되면 안 되고 **시안의 무드와 UX 흐름을 구현하는 데 필요한 수준**으로만 사용한다.

### 3-4. 우선순위는 “세부 완성”보다 “작동하는 큰 틀”이다

이번 가이드의 구현 우선순위는 아래와 같다.

1. 홈 메인 무드와 시안 흐름 구현
2. 전체 라우팅과 레이아웃 뼈대 연결
3. 상품 목록 / 상세 / 장바구니 / 결제 / 마이페이지 / 고객지원의 기능 골격 구현
4. LocalStorage 기반 상태 영속성 연결
5. 세부 카피, 이미지, 인터랙션, 큐레이션 정교화

즉, 처음부터 100% 디테일에 집착하기보다  
**전체가 연결된 상태에서 점진적으로 고도화할 수 있는 구조**가 더 중요하다.

### 3-5. 홈은 상품 나열이 아니라 브랜드 경험의 흐름이다

메인페이지는 일반적인 뷰티몰처럼 카드가 길게 이어지는 구조가 아니다.  
반드시 아래 인상을 유지해야 한다.

- 고요한 리추얼 감도
- 오프라인 매장의 공간감
- 공식몰만의 정당성
- 선물 구매의 확신
- 브랜드 스토리와 탐색의 자연스러운 연결

---

## 4. 구현 범위

## 4-1. 1차 필수 구현 범위

이번 단계에서 최소한 아래 범위까지는 큰 틀을 잡는다.

- 공통 Layout
- Header / Footer
- Home
- Products List
- Product Detail
- Cart
- Checkout
- Login / Signup / Find Account
- MyPage
- Support
- Search
- Gift Guide
- Benefits
- Our Story
- About
- Official mall benefits

## 4-2. 1차에서 중요한 기준

1차 구현의 목표는 **디테일 100% 완성**이 아니라 아래다.

- 전체 경로가 실제로 이동된다.
- 핵심 기능이 최소 1회 이상 동작한다.
- 홈 메인 시안 흐름이 살아 있다.
- 이후 섹션/카피/상품/인터랙션을 쉽게 교체할 수 있다.

## 4-3. 이번 문서에서 특히 우선시하는 범위

시안과 직접 연결된 핵심 우선순위는 아래다.

1. Home 메인페이지
2. Header 상태 전환
3. Best Products 고정 큐레이션
4. 공식몰 가치 / 선물 가치 / 카테고리 탐색 구조
5. 전체 라우팅 및 스토어 뼈대

---

## 5. 현재 저장소 기준 핵심 파일 맵

아래 파일들은 현재 저장소에서 이미 존재한다고 가정하고, 리뉴얼 시 우선 활용해야 하는 기준 파일이다.

### 5-1. 앱 셸

- `src/App.jsx`
- `src/App.scss`
- `src/main.jsx`

### 5-2. 전역 스타일

- `src/globals.scss`

### 5-3. 헤더 / 푸터

- `src/components/common/Header/Header.jsx`
- `src/components/common/Header/Header.scss`
- `src/components/common/Header/Header_wh.jsx`
- `src/components/common/Header/Header_wh.scss`
- `src/components/common/Footer/Footer.jsx`
- `src/components/common/Footer/Footer.scss`

### 5-4. 메인페이지 관련 기존 컴포넌트

- `src/components/pages/Main.jsx`
- `src/components/pages/Main.scss`
- `src/components/common/mainpage/Hero.jsx`
- `src/components/common/mainpage/BestboxSm.jsx`
- `src/components/common/mainpage/BestboxSm.scss`
- `src/components/common/mainpage/BestpdLg.jsx`
- `src/components/common/mainpage/BestpdLg.scss`

### 5-5. 공통 배지 / 버튼

- `src/components/common/badge/Best.jsx`
- `src/components/common/badge/New.jsx`
- `src/components/common/badge/Exclusive.jsx`
- `src/components/common/badge/Badge.scss`
- `src/components/common/btn/more.jsx`
- `src/components/common/btn/MoreBox.jsx`
- `src/components/common/btn/MoreWhBox.jsx`
- `src/components/common/btn/Btn.scss`

### 5-6. 데이터 / 에셋

- `src/data/products.json`
- `src/assets/Hero_Aesop.svg`
- `src/assets/Hero_Ritual.svg`
- `src/assets/Hero_MP4.mp4`
- `public/images/*`

---

## 6. 권장 기술 스택

## 6-1. 기본 스택

- **React 19**
- **Vite 7**
- **React Router DOM 7**
- **Zustand 5**
- **Sass / SCSS**

## 6-2. 구현 보조 스택

- **vite-plugin-svgr**  
  SVG 워드마크, 로고, 아이콘 컴포넌트화
- **Swiper 11**  
  모바일 카드, 추천 상품, 일부 에디토리얼 슬라이드
- **GSAP 3**  
  hero 진입, 섹션 reveal, 헤더 상태 전환 보조
- **Lucide React**  
  검색, 계정, 장바구니, 화살표 등 UI 아이콘
- **SweetAlert2**  
  로그인 가드, 장바구니 알림, 주문 확인
- **react-quill-new**  
  문의 / Q&A 입력
- **react-daum-postcode**  
  결제 / 배송지 주소 검색

## 6-3. 제품 데이터 및 이미지 사용 기준

이번 단계에서는 `products.json`을 **제품의 기본 정보 소스**로 사용한다.  
즉, 아래 항목은 우선적으로 `products.json` 기준으로 연결한다.

- 제품명
- 가격
- 옵션(variant)
- 제품 대표 이미지가 정리되어 있는 경우 해당 이미지 경로

다만 현재 모든 제품 이미지와 상세용 비주얼이 완전히 정리된 상태는 아니므로,  
초기 구현 단계에서는 아래 원칙을 함께 적용한다.

- 상품 카드, 상세 진입, 가격, 옵션 선택 등 **제품 기능과 직접 연결되는 핵심 정보**는 `products.json`을 기준으로 사용한다.
- `products.json`에 이미지가 충분히 정리되지 않은 경우, 부족한 비주얼은 `src/assets` 또는 `public/images`의 에셋을 임시로 활용한다.
- 홈 메인페이지의 에디토리얼 섹션(Hero, Store Visual, Official Online Exclusive, Best Gift, Korea Exclusive, About, New Arrival 등)은 전반적인 무드와 레이아웃 확인이 가능하도록 임의의 에셋 이미지를 우선 배치할 수 있다.
- 단, 임의로 넣는 이미지는 **이솝 무드와 제품 결을 해치지 않는 범위**에서 사용하고, 이후 실제 확정 이미지로 교체하기 쉬운 구조로 관리한다.
- 즉, 이번 단계는 **기능 구현용 제품 데이터**와 **무드 확인용 비주얼 에셋**을 병행 사용한다.

정리하면 아래와 같다.

> **제품의 기본 정보는 `products.json`을 기준으로 연결하고, 아직 정리되지 않은 비주얼 영역은 `assets`의 임시 이미지를 활용해 전체적인 페이지 느낌과 흐름이 먼저 보이도록 구현한다.**


---

## 7. 페르소나 기반 UX 목표

## 7-1. 주 타겟: 리추얼 중심의 브랜드 가치 수용자

이 사용자는 아래를 원한다.

- 오프라인 매장에서 느낀 무드가 온라인에서도 이어지는 것
- 공식몰이 단순 구매 채널이 아니라 브랜드의 본진처럼 느껴지는 것
- 비싼 가격에도 감정적으로 납득 가능한 이유가 있는 것
- 제품이 품목이 아니라 리추얼로 읽히는 것
- 이미 사용해본 제품을 다시 찾기 쉬운 것

메인페이지에서 해결해야 할 과제는 아래와 같다.

- 매장 경험과 온라인 경험의 단절 해소
- 브랜드 가치와 감성의 일관성 유지
- 재구매 사용자에게 빠른 재탐색 동선 제공
- “나를 위한 작은 사치”라는 정서적 합리화 강화

## 7-2. 서브 타겟: 센스 있는 선물을 고르고 싶은 합리적 구매자

이 사용자는 아래를 빠르게 알고 싶어 한다.

- 무엇이 베스트인지
- 무엇이 선물로 실패 확률이 낮은지
- 공식몰에서 사면 무엇이 더 좋은지
- 패키지와 구성의 완성도가 어떤지
- 도착/포장/쇼핑백 여부가 빠르게 확인되는지

메인페이지에서 해결해야 할 과제는 아래와 같다.

- 베스트 / 스테디셀러에 대한 빠른 노출
- 선물 추천 이유를 한눈에 이해하게 만들기
- 공식몰 단독 가치와 패키징 매력 노출
- 제품 정보보다 먼저 “선물 성공 확률”을 설득하기

## 7-3. UX 한 줄 정의

**브랜드 무드로 진입시키고, 공식몰 가치로 설득하며, 선물과 탐색으로 자연스럽게 전환시키는 흐름**이어야 한다.

---

## 8. 전체 라우팅 맵

전체 페이지 흐름을 먼저 세우기 위해 아래 라우트를 기본으로 잡는다.

```txt
/
/gift-guide
/gift-guide/general
/gift-guide/fragrance
/products
/products/:category
/products/:category/:subcategory
/product/:id
/benefits
/benefits/official
/benefits/kr-exclusive
/our-story
/search
/login
/signup
/find-account
/mypage
/cart
/checkout
/support/notices
/support/faq
/support/contact
/support/live-chat
/support/store-locator
/support/store-locator
/store-locator
/store-locator/:storeId
```

### 라우팅 원칙

- `Home`은 메인 시안 구현의 중심이다.
- `Products`, `ProductDetail`, `Cart`, `Checkout`, `MyPage`, `Support`는 기능적 골격을 먼저 연결한다.
- 헤더, 푸터, 검색, 혜택, 브랜드 소개, 고객지원은 홈과 내부 페이지에서 모두 재진입 가능해야 한다.
- `/support/store-locator` 는 고객지원 맥락에서 진입하는 경로
`/store-locator` 는 헤더/푸터/상품상세 등에서 직접 진입하는 독립 경로
`/store-locator/:storeId` 는 개별 매장 상세 확인용 경로
둘 중 하나만 사용해도 되지만,
초기 구현 단계에서는 `/store-locator` 중심으로 잡고 `/support/store-locator`는 리다이렉트 또는 동일 페이지 연결로 처리해도 된다.

---

## 9. 전역 레이아웃 기준

## 9-1. Layout 구조

기본 구조는 아래처럼 유지한다.

```tsx
<HeaderOrHeaderWh />
<main className="main">
  <Outlet />
</main>
<Footer />
```

단, 홈 Hero 위에서는 `Header_wh`를 사용하거나, 단일 Header의 transparent variant로 통합한다.

## 9-2. Header 상태 기준

### 홈 Hero 구간
- transparent
- white 계열 텍스트/아이콘
- 비주얼 위에 겹쳐짐

### 홈 Hero 이탈 이후
- solid
- globals.scss 기준 밝은 배경 / 브라운 계열 텍스트
- 얇은 하단 보더 허용

### 내부 페이지
- 기본 solid

## 9-3. Footer 기준

현재 Footer 구조는 살리고 아래 역할을 강화한다.

- 브랜드 여운
- 주요 링크 재진입
- 고객지원 접근
- 정책/SNS 정리
- 대형 워드마크를 활용한 마감감

---

## 10. 상태관리 / 영속성 기준

## 10-1. 상태관리 방향

이번 프로젝트는 **Zustand + LocalStorage persist**를 기준으로 한다.  
백엔드는 붙이지 않고, 클라이언트에서 실제 탐색과 구매 흐름이 살아 있게 만든다.

## 10-2. Root Store 구성

권장 Slice는 아래와 같다.

- `authSlice`
- `productSlice`
- `cartSlice`
- `orderSlice`
- `wishlistSlice`
- `supportSlice`

필요하면 `uiSlice`, `searchSlice`를 추가한다.

## 10-3. 영속 저장 대상

- `users`
- `user`
- `isLoggedIn`
- `products`
- `cartItems`
- `orders`
- `wishlist`
- `inquiries`
- `qnas`
- `recentlyViewed`

## 10-4. 최근 검색 / 최근 본 상품

- 최근 검색어는 `recentSearches` 로컬 키로 저장
- 중복 제거
- 최신순 정렬
- 최대 5개 유지
- 최근 본 상품은 로그인/비로그인 모두 저장 가능

---

## 11. 페이지별 핵심 기능 뼈대

## 11-1. Home

역할:
- 브랜드 진입
- 공식몰 가치 설득
- 선물 확신 제공
- 카테고리 탐색 유도

필수:
- Hero
- Intro
- Best Products
- Store Visual
- Official Online Exclusive
- Best Gift
- Korea Exclusive
- About
- New Arrival
- Product Navigator
- Footer 연결

## 11-2. Products List

역할:
- 전체 상품 탐색
- 카테고리/서브카테고리/향/고민/선물 태그 필터
- 정렬 / 검색 결과 반영

필수:
- 결과 리스트
- 정렬
- 필터
- 빈 결과 상태
- 상품 상세 이동

## 11-3. Product Detail

역할:
- 구매 확신 제공
- variant 선택
- 관련 제품 연결
- 리뷰 확인 및 작성

필수:
- 갤러리
- 상품명 / 가격
- variant 선택
- 혜택 / 패키징 / 리사이클
- 장바구니 담기
- 위시리스트
- 리뷰 CRUD

## 11-4. Cart

역할:
- 담은 상품 확인
- variant 기준 수량 조정
- 선택 주문 / 전체 주문

필수:
- 장바구니 아이템 리스트
- 체크 상태
- 수량 조절
- 삭제
- 요약 금액
- 주문 버튼

## 11-5. Checkout

역할:
- 배송지 입력
- 선물 옵션 선택
- 결제수단 선택
- 주문 저장

필수:
- 로그인 가드
- 주소 검색
- 선물 포장 / 쇼핑백 / 메시지
- 결제 완료 후 주문 저장 및 장바구니 반영

## 11-6. Login / Signup / Find Account

역할:
- 인증 진입점
- 테스트 회원 플로우
- 기본 회원 데이터 생성

## 11-7. MyPage

역할:
- 주문내역
- 저장한 상품
- 리뷰 / 문의 관리
- 배송지 관리

## 11-8. Support

역할:
- Notice
- FAQ
- Contact
- Live Chat 진입
- Store Locator 진입

## 11-9. Store Locator (매장 찾기)

역할:
- 오프라인 매장 경험과 온라인 공식몰의 연결 지점을 만든다.
- 사용자가 가까운 매장을 찾고, 방문 전 필요한 정보를 빠르게 확인할 수 있게 한다.
- 브랜드의 공간 경험을 온라인에서도 이어지게 하는 보조 진입점 역할을 한다.

필수:
- 매장 리스트
- 지역별 필터
- 매장 상세 정보
- 운영시간 / 주소 / 연락처
- 지도 또는 위치 안내 정보
- 상세 페이지 또는 외부 지도앱 연결
- 상품 상세 / 고객지원 / 헤더 등에서 재진입 가능해야 함

---

## 12. 메인페이지 정보 구조

시안 기준 메인페이지는 아래 순서로 구현한다.

1. Hero
2. Intro Copy
3. Best Products
4. Full-Bleed Store Visual
5. Official Online Exclusive
6. Best Gift
7. Korea Exclusive
8. About Teaser
9. New Arrival
10. Product Navigator
11. Footer

이 순서는 바꾸지 않는 것을 기본 원칙으로 한다.

설득 흐름은 아래와 같다.

- 1차: 브랜드 무드와 세계관
- 2차: 시그니처 제품 소개
- 3차: 오프라인 경험의 연속성
- 4차: 공식몰만의 이유 제시
- 5차: 선물/한정 구성 설득
- 6차: 브랜드 서사와 카테고리 탐색
- 7차: 여운 있는 마감

---

## 13. 홈 섹션별 구현 기준

## 13-1. Hero

### 목표
첫 화면에서 사용자가 즉시 아래 세 가지를 느껴야 한다.

- 이솝다운 절제된 무드
- 리추얼 중심의 세계관
- 프리미엄이지만 과장되지 않은 분위기

### 레이아웃 기준
- full-bleed hero
- 상단에는 `Header_wh`를 겹쳐 사용하거나 동일한 역할의 transparent Header를 사용
- 하단에는 `Aesop Ritual` 대형 워드마크형 타이틀 배치
- 타이틀은 일반 제목이 아니라 화면 일부처럼 보여야 한다

### 구현 포인트
- `src/components/common/mainpage/Hero.jsx`를 구현 시작점으로 사용
- `Hero_Aesop.svg`, `Hero_Ritual.svg`, `Hero_MP4.mp4` 활용 가능
- 영상이든 정지 이미지든 **최종 인상은 정적인 고급 무드**가 우선
- CTA 남발 금지

## 13-2. Intro Copy

### 목표
Hero 직후 호흡을 정리하고 페이지 전체의 결을 이해시킨다.

### 레이아웃 기준
- 밝은 배경
- 좁은 폭의 중앙 정렬 카피
- 텍스트는 짧고 조용해야 한다

### 주의사항
- 장문 설명 금지
- 혜택 리스트처럼 보이게 하지 않는다

## 13-3. Best Products

### 목표
Hero 이후 첫 제품 노출 구간에서 **큐레이션된 3개 제품**을 보여준다.

### 레이아웃 기준
- `BEST PRODUCTS` 타이틀
- 우측 More 액션 가능
- 카드 구성은 **소형 1 - 대형 1 - 소형 1**
- `BestboxSm`, `BestpdLg` 최대한 재사용

### 매우 중요한 구현 기준
- **랜덤 노출 금지**
- 현재 `Main.jsx`에 랜덤 선택이 있다면 제거
- 반드시 의도된 3개 상품을 고정 또는 데이터 기반 큐레이션으로 노출

### 큐레이션 기준 예시
- 브랜드 시그니처
- 재구매율 높은 품목
- 선물/자가사용 모두 무난한 품목

## 13-4. Full-Bleed Store Visual

### 목표
오프라인 매장 경험과 온라인 공식몰 사이의 단절을 줄인다.

### 레이아웃 기준
- 매장 이미지 중심의 full-bleed 섹션
- 텍스트는 최소화
- 페이지 리듬을 바꾸는 브릿지 역할

## 13-5. Official Online Exclusive

### 목표
“왜 공식몰에서 사야 하는가”를 가장 우아하게 전달한다.

### 레이아웃 기준
- 밝은 배경
- 중앙 텍스트 블록
- 주변 작은 이미지가 흩뿌려진 에디토리얼 콜라주 레이아웃

### 담아야 하는 메시지
- 공식몰 단독 구성
- 샘플 또는 패키지 차별성
- 온라인 단독 큐레이션
- 선물 포장 정당성

## 13-6. Best Gift

### 목표
선물 구매자에게 가장 빠른 확신을 주는 핵심 구간이다.

### 레이아웃 기준
- 짙은 브라운 배경
- 중앙 메인 기프트 이미지
- 좌우 보조 이미지와 텍스트

### 담아야 하는 정보
- 왜 선물로 좋은지 한 줄 설명
- 어떤 상황에 무난한지
- 패키지 완성도
- 공식몰에서 사는 편이 더 낫다는 인식

## 13-7. Korea Exclusive

### 목표
지역성, 한정성, 차별성을 조용하게 보여준다.

### 레이아웃 기준
- 밝은 배경 전환
- 좌측 텍스트, 중앙 대표 이미지, 우측 보조 이미지의 3분 구조
- 패키지/세트 비주얼 활용

## 13-8. About Teaser

### 목표
제품 중심 흐름에서 브랜드 서사로 넘어가는 완충 구간이다.

### 레이아웃 기준
- 어두운 배경
- 하나의 이미지/영상 블록
- 크게 잘린 `About` 워드마크
- 정보량 최소화

## 13-9. New Arrival

### 목표
익숙한 브랜드 경험 속에 새로운 제품 제안을 자연스럽게 넣는다.

### 레이아웃 기준
- 밝은 배경
- 좌측 텍스트/서브 이미지
- 우측 대형 제품 비주얼

## 13-10. Product Navigator

### 목표
홈 하단에서 실제 탐색 진입점을 제공한다.

### 레이아웃 기준
- 짙은 배경
- `Product` 대형 타이틀
- 중앙 강조 카테고리
- 좌우 카테고리 리스트
- 배경 오브제 비주얼 허용

### 카테고리 예시
- Skincare
- Hand & Body
- Perfume
- Home
- Hair & Shaving
- Gift
- Kits

## 13-11. Footer

### 목표
홈 전체 무드를 유지한 채 페이지를 마감한다.

### 원칙
- 현재 Footer 구조는 최대한 살린다.
- 구조를 갈아엎기보다 정렬, 여백, 톤을 조정한다.
- 좌측 슬로건 / 우측 링크 컬럼 / 대형 워드마크 / 하단 정책 정보를 조화롭게 유지한다.

---

## 14. 홈 데이터 구성 가이드

## 14-1. 상품 데이터

- 기본 상품 소스는 `src/data/products.json`
- 제품명, 배지, 설명, 이미지, variant 데이터 활용
- 홈에서는 전체 상품을 무작위로 뿌리지 않는다

## 14-2. 홈 전용 콘텐츠 데이터

홈은 상품 데이터만으로 완성되지 않으므로 아래는 별도 데이터로 분리한다.

- Hero 문구
- Intro 문구
- Official Online Exclusive 문구
- Best Gift 소개 문구
- Korea Exclusive 설명
- About teaser 문구
- New Arrival 소개 문구
- Product Navigator 카테고리 목록

권장 방식:
- `src/data/mainPageContent.js` 추가
- 또는 섹션 컴포넌트 내부 상수 관리

## 14-3. 베스트 상품 선정 방식

아래 방식 중 하나로 고정한다.

- 상품명을 기준으로 3개 직접 지정
- 배지 기준 필터 후 수동 정렬
- category + merchandising 태그 조합으로 큐레이션

다시 강조한다.

- `Math.random()` 기반 랜덤 진열은 사용하지 않는다.
- 시안은 기획형 홈이다.

## 14-4. 매장 데이터 가이드

매장 찾기 기능을 위해 별도 데이터 파일을 둘 수 있다.

권장 방식:
- `src/data/stores.json`

예시 구조:

```ts
interface StoreItem {
  id: string;
  name: string;
  region: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  description?: string;
  image?: string;
  services?: string[];
  lat?: number;
  lng?: number;
}
```

초기 구현 원칙은 아래와 같다.
- 실제 지도 좌표가 없으면 address 기반 텍스트 정보만 먼저 노출한다.
- 대표 이미지는 src/assets 또는 public/images의 임시 에셋으로 먼저 구성 가능하다.
- 이후 실제 매장 데이터가 정리되면 JSON만 교체해도 화면이 유지되게 만든다.

---

## 15. 상품 구조 가이드

상품 데이터는 패션몰식 구조보다 **variant 중심 구조**가 맞다.

```ts
interface ProductVariant {
  id: string;
  label: string;
  price: number;
  compareAtPrice?: number | null;
  stock: number;
  isDefault?: boolean;
  isRefill?: boolean;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categorySlug: string;
  categoryLabel: string;
  subcategorySlug: string;
  subcategoryLabel: string;
  type: 'single' | 'kit';
  image: string;
  hoverImage?: string;
  gallery?: string[];
  description: string;
  shortDescription?: string;
  texture?: string;
  aromaNotes?: string[];
  scentFamily?: string;
  keyIngredients?: string[];
  suitableFor?: string[];
  concerns?: string[];
  benefits?: string[];
  usage?: string;
  routineStep?: string;
  variants: ProductVariant[];
  merchandising?: {
    isNew?: boolean;
    isBest?: boolean;
    isSignature?: boolean;
    isGiftable?: boolean;
    isOnlineExclusive?: boolean;
  };
  giftMeta?: {
    giftTags?: string[];
    giftReason?: string;
    canAddGiftWrap?: boolean;
    canAddShoppingBag?: boolean;
  };
}
```

원칙은 아래와 같다.

- `colors`, `sizes`, `gender` 중심 구조는 버린다.
- `variant`, `향`, `사용감`, `성분`, `패키징`, `선물 정보` 중심으로 읽히게 한다.
- 카드와 상세 페이지 모두 이 구조를 기준으로 만든다.

---

## 16. 상품 목록 페이지 구현 기준

## 16-1. 경로별 자동 필터

- `/products`
- `/products/:category`
- `/products/:category/:subcategory`
- `/gift-guide/general`
- `/gift-guide/fragrance`
- `/search`

## 16-2. 상단 정보 구조

- Breadcrumb
- 타이틀
- 한 줄 설명
- 결과 개수
- 정렬 드롭다운
- 모바일 필터 버튼

## 16-3. 필터 그룹

- 카테고리
- 서브카테고리
- 고민 / 사용 목적
- 향 / 무드
- 선물 태그
- 가격대

## 16-4. 정렬 기준

- 추천순
- 베스트순
- 신제품순
- 낮은 가격순
- 높은 가격순
- 선물 추천순

## 16-5. 리스트 상태

- 결과 존재 시 Grid 렌더링
- 결과 없음 Empty State
- 모바일에서는 Fullscreen Filter 또는 Bottom Sheet 허용

## 16-6. Store Locator 페이지 구현 기준

### 목표
사용자가 단순히 주소를 찾는 것이 아니라,  
이솝의 오프라인 공간을 탐색하고 방문 결정을 내릴 수 있게 돕는다.

### 페이지 구성
- 상단 타이틀
- 한 줄 소개 문구
- 지역 선택 필터
- 매장 검색 입력창
- 매장 리스트
- 선택된 매장 상세 정보 영역
- 지도 또는 위치 안내 영역

### 상단 정보 구조
- Breadcrumb 또는 페이지 타이틀
- 소개 문구
- 지역 드롭다운 또는 탭
- 검색창

### 리스트 카드 기준
각 매장 카드는 아래 정보를 포함할 수 있다.

- 매장명
- 지역명
- 주소
- 운영시간
- 대표 연락처
- 간단한 소개 문구
- 상세 보기 버튼
- 길찾기 버튼

### 상세 정보 기준
상세 페이지 또는 우측 상세 패널에는 아래 정보를 포함한다.

- 매장명
- 주소
- 운영시간
- 연락처
- 매장 소개
- 제공 서비스 여부
- 대표 이미지
- 지도 보기 / 길찾기 링크
- 가까운 추천 매장

### UX 원칙
- 정보는 빠르게 읽혀야 한다.
- “내 주변에서 어디를 방문할지” 판단이 쉬워야 한다.
- 지나치게 기능형 지도 서비스처럼 보이기보다, 이솝다운 절제된 공간 탐색 경험으로 보여야 한다.

---

## 17. Product Card 기준

## 17-1. 카드 정보

- 제품 이미지
- 제품명
- 짧은 설명 또는 사용감
- 향 노트 또는 대표 효능
- 가격
- 배지

## 17-2. 배지

- `NEW`
- `BEST`
- `SIGNATURE`
- `GIFTABLE`
- `ONLINE EXCLUSIVE`

## 17-3. 액션

- `DETAILS`
- `QUICK ADD`
- `HEART`

## 17-4. 중요 규칙

- variant가 1개면 Quick Add 허용
- variant가 2개 이상이면 상세 페이지 또는 선택 레이어로 유도
- 카드가 구매 버튼 위주로 시끄러워지지 않게 한다

---

## 18. 상품 상세 페이지 구현 기준

## 18-1. 상단 구조

- Breadcrumb 또는 Back
- 좌측 큰 이미지 / 갤러리
- 우측 sticky 정보 박스

## 18-2. 정보 영역

- 카테고리
- 상품명
- 가격
- 한 줄 설명
- 사용감
- 향
- 주요 성분
- variant 선택
- 수량
- 장바구니 담기
- 위시리스트
- 혜택 / 선물 정보

## 18-3. 탭 구조

- DETAILS
- INGREDIENTS
- PACKAGING & RECYCLE
- ESSENTIAL INFO
- DELIVERY & RETURNS
- REVIEWS

## 18-4. 하단 보조 섹션

- 함께 쓰기 좋은 제품
- 같은 리추얼
- 같은 향 계열
- 함께 선물하기 좋은 조합

---

## 19. 장바구니 / 결제 기준

## 19-1. 장바구니

필수:
- variant 기준 cartId
- 수량 변경
- 개별 삭제
- 선택 삭제
- 전체 비우기
- 선택 주문 / 전체 주문
- 우측 sticky 주문 요약

## 19-2. 금액 계산 규칙

- 선택된 상품만 합산
- 가격은 선택 variant 기준
- 무료배송 기준과 기본 배송비를 명확히 반영

## 19-3. 결제

필수:
- 로그인 가드
- 배송지 입력
- `react-daum-postcode` 주소 검색
- giftInfo 입력
- 카드 / 무통장 결제수단
- 결제 완료 후 주문 저장
- 주문한 상품만 장바구니에서 제거

---

## 20. 인증 / 마이페이지 / 고객지원 기준

## 20-1. 인증

- 로그인
- 회원가입
- 계정 찾기
- 테스트 회원 버튼 제공 가능

## 20-2. 마이페이지

구성 예시:
- 주문내역
- 저장한 제품
- 리뷰 관리
- 문의 / Q&A
- 회원 정보
- 배송지 관리
- 로그아웃

## 20-3. 고객지원

구성:
- Notice
- FAQ
- Contact
- Live Chat
- Store Locator

문의 작성/수정에는 `react-quill-new` 사용 가능

## 20-4. 고객지원 내 Store Locator 연결

고객지원 페이지에서는 아래 항목을 함께 제공한다.

- 공지사항
- FAQ
- 문의하기
- 실시간 상담
- 매장 찾기

`매장 찾기`는 고객지원 하위 메뉴이면서도,  
헤더와 상품 상세, 푸터 등 여러 지점에서 재진입할 수 있어야 한다.


---

## 21. 컴포넌트 / 폴더 확장 전략

기본 원칙은 아래와 같다.

- `Main.jsx`는 **홈 섹션 조립자 역할**만 하게 만든다.
- 홈 섹션은 `src/components/common/mainpage/` 아래로 분리한다.
- 공통 UI는 `badge`, `btn`, `common` 구조를 최대한 재사용한다.
- 전체 페이지 흐름 구현을 위해 `router`, `store`, `pages` 폴더는 **추가 생성 가능**하다.
- 단, 기존 파일 삭제 없이 **병행 확장**한다.

권장 예시는 아래와 같다.

```text
src/
  components/
    common/
      Header/
      Footer/
      mainpage/
        Hero.jsx
        IntroCopy.jsx
        BestProductsSection.jsx
        StoreVisualSection.jsx
        OfficialExclusiveSection.jsx
        BestGiftSection.jsx
        KoreaExclusiveSection.jsx
        AboutTeaserSection.jsx
        NewArrivalSection.jsx
        ProductNavigatorSection.jsx
        BestboxSm.jsx
        BestpdLg.jsx
    pages/
      Main.jsx
  data/
    products.json
    mainPageContent.js
  router/
    index.jsx
  store/
    slices/
      authSlice.js
      productSlice.js
      cartSlice.js
      orderSlice.js
      supportSlice.js
      wishlistSlice.js
    useStore.js
  pages/
    Products.jsx
    ProductDetail.jsx
    Cart.jsx
    Checkout.jsx
    Login.jsx
    Signup.jsx
    FindAccount.jsx
    MyPage.jsx
    Notice.jsx
    FAQ.jsx
    Contact.jsx
```

이 구조는 예시이며, 핵심은 아래다.

- 현재 구조를 깨지 않는다.
- 홈 섹션은 분리한다.
- 전체 라우트용 페이지는 추가한다.
- 스토어와 라우터는 독립 폴더로 관리한다.


## 21-1. Store Locator 관련 폴더 확장 예시

```text
src/
  pages/
    StoreLocator.jsx
    StoreDetail.jsx
  data/
    stores.json
  components/
    common/
      store/
        StoreFilter.jsx
        StoreSearchBar.jsx
        StoreList.jsx
        StoreCard.jsx
        StoreDetailPanel.jsx
        StoreMapBox.jsx
```

이 구조는 확장 예시이며, 핵심은 아래다.

- 매장 데이터는 stores.json으로 분리 가능
- 리스트 / 상세 / 필터 / 지도 영역은 컴포넌트로 분리
- 초기에는 실제 지도 API 없이도 레이아웃과 정보 구조를 먼저 구현할 수 있다

---

## 22. 인터랙션 가이드

허용되는 인터랙션:

- 이미지/텍스트의 미세한 fade-up
- hover 시 2~4px 정도의 부드러운 이동
- 카드 이미지의 약한 확대
- More 링크의 opacity 또는 underline 변화
- 헤더의 배경 전환
- GSAP 기반의 가벼운 섹션 reveal

금지되는 인터랙션:

- 큰 스케일 점프
- 과한 패럴럭스
- 강한 회전/블러 모션
- 자동 슬라이더 중심 홈 구성
- 산만한 hover 남발

이 페이지의 인터랙션은 **보여주기용 효과**가 아니라,  
정적인 인상을 해치지 않는 보조 장치여야 한다.

---

## 23. 반응형 가이드

### Desktop
- 시안과 가장 유사한 비대칭 레이아웃 유지
- 여백과 워드마크를 충분히 사용
- 이미지의 독립적인 존재감 유지

### Tablet
- 2열 구조 중심으로 단순화
- 콜라주형 작은 이미지는 수를 줄인다
- Hero 타이틀은 줄바꿈 또는 크기 조정

### Mobile
- 섹션을 수직 흐름으로 재정렬
- Best Products는 1열 또는 가로 스크롤 단순화 가능
- Official / Gift / New Arrival은 텍스트 우선 구조 허용
- Product Navigator는 중앙 타이틀 + 리스트 스택 구조

모바일에서도 아래는 반드시 유지한다.

- 무드
- 타이포 위계
- 이미지 인지성
- 클릭 가능한 충분한 터치 영역

---

## 24. 구현 순서 추천

### 1단계
- Router + Layout + Header + Footer 뼈대 연결
- globals.scss 재확인
- Header / Header_wh 상태 기준 확정

## 1단계-1. Store Locator 구현 순서 추가

### Store Locator 구현 단계
- `stores.json` 생성
- `/store-locator` 페이지 생성
- 지역 필터 / 검색 기능 연결
- 매장 리스트와 상세 정보 패널 구현
- 상품 상세 / 고객지원 / 헤더 / 푸터에서 진입 링크 연결
- 필요 시 외부 지도 링크 또는 지도 API 확장

### 2단계
- Zustand store 및 persist 연결
- product loader 연결
- auth/cart/order/wishlist/support slice 생성

### 3단계
- Home Hero / Intro / Best / Store / Official / Gift / Korea / About / New Arrival / Product Navigator 구현
- `Main.jsx`를 홈 조립자로 정리

### 4단계
- Products List / Search / Gift Guide / Benefits / Our Story 뼈대 구현

### 5단계
- Product Detail
- variant 선택
- related products
- review CRUD

### 6단계
- Cart / Checkout
- 주문 저장
- 배송지 / giftInfo 처리

### 7단계
- Login / Signup / Find Account
- 테스트 계정 플로우
- MyPage 연결

### 8단계
- Support 완성
- Notice / FAQ / Contact / Store Locator 연결

### 9단계
- 반응형 정리
- 인터랙션 미세 조정
- 카피/상품 큐레이션/이미지 교체가 쉬운 상태로 정리

---

## 25. 완료 기준 (Definition of Done)

### 홈 / 무드
- [ ] Hero 위에 오버레이 헤더가 자연스럽게 올라간다.
- [ ] `Aesop Ritual` 대형 워드마크가 첫 화면 인상을 잡아준다.
- [ ] 메인페이지 섹션 순서가 시안과 동일하다.
- [ ] Best Products가 랜덤이 아니라 의도된 3개 큐레이션이다.
- [ ] 공식몰 가치, 선물 가치, 카테고리 탐색이 각각 독립 섹션으로 설득된다.

### 구조 / 기능
- [ ] Router 기준 전체 페이지 이동이 된다.
- [ ] Home / Products / Detail / Cart / Checkout / MyPage / Support 기본 흐름이 연결된다.
- [ ] Zustand + LocalStorage 기반 상태 유지가 동작한다.
- [ ] variant 기준 장바구니 담기와 주문 저장이 가능하다.
- [ ] 로그인 / 장바구니 / 주문 / 위시리스트 / 문의 흐름이 최소 1회 이상 작동한다.
- [ ] Variant 기반 상품 장바구니 추가, 선택 상품 결제, 마이페이지 주문 내역 조회가 에러 없이 이어진다.

### 유지보수성
- [ ] 기존 파일과 경로를 삭제하지 않았다.
- [ ] globals.scss 외부에서 브랜드 토큰을 다시 만들지 않았다.
- [ ] 홈 섹션이 개별 컴포넌트로 분리되어 있다.
- [ ] 사용자가 카피 / 이미지 / 상품 큐레이션 / 섹션 순서를 쉽게 수정할 수 있다.

### 매장 찾기
- [ ] `/store-locator` 페이지 진입이 가능하다.
- [ ] 지역별 필터와 검색이 동작한다.
- [ ] 매장 리스트와 상세 정보가 연결된다.
- [ ] 주소 / 운영시간 / 연락처 확인이 가능하다.
- [ ] 헤더, 고객지원, 푸터 등에서 재진입 가능하다.
- [ ] 이후 실제 매장 데이터로 교체하기 쉬운 구조로 분리되어 있다.

---

## 26. AI에 바로 넣기 좋은 구현 프롬프트

### 26-1. 전체 구조 프롬프트

```txt
현재 Aesop 리뉴얼 프로젝트의 기존 파일과 경로는 삭제하지 말고 유지해줘.
globals.scss에 정의된 색상과 폰트 체계를 그대로 사용하고, 필요한 페이지와 기능은 추가 파일로 확장해줘.
React 19 + Vite 7 + react-router-dom + Zustand + SCSS를 기준으로 홈, 상품목록, 상세, 장바구니, 결제, 마이페이지, 고객지원까지 전체 흐름이 작동하는 프론트엔드 뼈대를 먼저 만들어줘.
메인페이지는 Hero → Intro Copy → Best Products → Store Visual → Official Online Exclusive → Best Gift → Korea Exclusive → About → New Arrival → Product Navigator → Footer 순서로 구현해줘.
홈은 브랜드 경험 중심의 에디토리얼 커머스 무드여야 하고, 이후 사용자가 세부 카피와 구성, 이미지, 상품을 쉽게 수정할 수 있도록 컴포넌트를 분리해줘.
```

### 26-2. 홈 프롬프트

```txt
src/components/pages/Main.jsx를 홈 조립자로 사용해서 메인페이지를 구현해줘.
기존 파일은 삭제하지 말고, src/components/common/mainpage 아래에 Hero, IntroCopy, BestProductsSection, StoreVisualSection, OfficialExclusiveSection, BestGiftSection, KoreaExclusiveSection, AboutTeaserSection, NewArrivalSection, ProductNavigatorSection 컴포넌트를 추가해줘.
Hero 위에는 Header_wh를 겹쳐 사용하고, Best Products는 랜덤이 아니라 고정된 3개 상품으로 구성해줘.
시안처럼 소형 1 - 대형 1 - 소형 1 구조의 베스트 카드 레이아웃을 유지하고, 브랜드 무드가 깨지지 않도록 과한 슬라이더나 모션은 쓰지 말아줘.
```

### 26-3. 전체 기능 프롬프트

```txt
Router와 Zustand를 포함해서 전체 기능 뼈대를 만들어줘.
products.json을 기준으로 product store를 만들고, auth/cart/order/wishlist/support slice를 구성해줘.
상품목록, 상품상세, 장바구니, 결제, 로그인, 마이페이지, 고객지원 페이지를 라우트로 연결하고, LocalStorage persist로 로그인 상태, 장바구니, 위시리스트, 주문내역이 유지되게 해줘.
상세 페이지는 variant 중심 구조로 만들고, 장바구니는 productId-variantId 조합으로 담기게 해줘.
```

---

## 27. 최종 요약

이 프로젝트는 **메인페이지 한 장을 멋지게 보이게 만드는 작업**으로 끝나면 안 된다.

반드시 아래 순서로 이해해야 한다.

1. **시안과 같은 홈 흐름을 맞춘다.**
2. **기존 파일과 경로를 유지한다.**
3. **globals.scss를 기준으로 무드를 유지한다.**
4. **Router / Zustand 등 큰 틀 구현에 필요한 스택은 이번 단계에서 포함한다.**
5. **전체 페이지 흐름과 기능이 먼저 작동하게 만든다.**
6. **그 위에서 사용자가 세부 섹션과 카피, 구성, 제품을 쉽게 수정할 수 있게 만든다.**

실무적으로 가장 중요한 한 줄은 아래다.

> **기존 구조는 보존하고, 시안의 홈 흐름은 그대로 살리며, Router와 Zustand를 포함한 전체 페이지 골격을 먼저 구현한 뒤 사용자가 추가 수정할 수 있는 상태로 정리한다.**
