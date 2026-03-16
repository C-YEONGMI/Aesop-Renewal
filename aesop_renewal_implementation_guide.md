# 구현 기준서

## 1. 이 문서의 목표

이 프로젝트의 핵심은 아래 5가지를 동시에 맞추는 것입니다.

1. **메인 페이지(index) 기준의 고요하고 영화적인 분위기, 공간감 있는 에디토리얼 레이아웃, 절제된 프리미엄 무드**
2. **Nightworks 계열의 풀블리드 비주얼 + 큰 타이포 + 긴 호흡의 섹션 구성**을 참고하되, 제품 판매 흐름이 살아 있는 라이프스타일 이커머스로 번역하는 것
3. **React + Zustand + LocalStorage 기반의 클라이언트 전용 구조**로 홈 → 상품목록 → 상세 → 장바구니 → 결제 → 마이페이지까지 실제 동작하게 구현하는 것
4. **브랜드 스토리, 제품 탐색, 선물 경험, 공식몰 혜택**이 한 화면 안에서 자연스럽게 이어지는 정보 구조를 만드는 것
5. **모바일, 태블릿, 데스크탑에서 모두 무드가 유지되는 반응형 에디토리얼 커머스**를 완성하는 것

즉, 이 프로젝트는 “예쁜 메인 페이지 한 장”이 아니라,  
**영상 Hero와 에디토리얼 섹션 구성을 중심으로 한 프리미엄 공식몰 프론트엔드 포트폴리오**로 구현해야 합니다.

---

## 2. 한 줄 정의

**영상 Hero, 에디토리얼 레이아웃, 웜 브라운 팔레트, variant 중심 상품 구조를 결합한 서버리스 프리미엄 라이프스타일 이커머스 포트폴리오**

- 백엔드는 붙이지 않는다.
- 상품, 회원, 장바구니, 주문, 문의, 리뷰는 모두 **클라이언트 상태 + LocalStorage 영속성**으로 처리한다.
- 결과물은 단순 목업이 아니라 **실제 탐색과 구매 흐름이 살아 있는 UI**여야 한다.

---

## 3. 이 프로젝트에서 절대 놓치면 안 되는 기준

### 3-1. 구조 기준

- 탐색 구조는 **카테고리 + 리추얼 + 선물 + 브랜드 스토리** 중심으로 설계한다.
- 홈은 단순 상품 진열보다 **스토리텔링형 섹션 구성**이 우선이다.
- Hero 이후 섹션은 제품 판매만 이어지지 않고 아래 성격이 교차해야 한다.
  - featured product
  - editorial story
  - benefits
  - gift curation
  - store continuity
- 오프라인 매장 경험을 온라인에서 이어주는 장치가 반드시 있어야 한다.
  - 매장 찾기
  - 추천 루틴
  - 공식몰 혜택
  - 선물 큐레이션

### 3-2. 화면 기준

- 전체 톤은 **웜 브라운 팔레트 + 크리미한 배경 + 깊은 오버레이** 중심이다.
- 화면은 일반적인 화장품몰보다 **정적이고 느린 호흡**을 가져야 한다.
- 섹션은 카드 나열보다 **풀블리드 이미지, 오프셋 텍스트 블록, 비대칭 정렬, 큰 헤드라인, 밝고 어두운 밴드의 교차**로 분위기를 만든다.
- 타이포는 과장된 데코레이션보다 **Montage / Optima / SUIT Variable 조합으로 명확한 위계**를 만든다.
- 버튼, 카드, 폼은 과한 둥근 모서리를 쓰지 않고 **정제된 반경과 얇은 보더**를 유지한다.

### 3-3. UX 기준

- 첫 화면 1스크롤 안에서 사용자는 최소 3가지를 이해해야 한다.
  1. 브랜드의 무드와 세계관
  2. 제품을 어떻게 탐색하는지
  3. 공식몰에서 왜 구매해야 하는지
- 자기 사용 고객에게는 **빠른 재탐색과 리추얼 이해**, 선물 고객에게는 **빠른 선물 확신**을 줘야 한다.
- 브랜드 가치와 혜택 정보는 보조 문구가 아니라 **구매 결정을 돕는 정보**여야 한다.
- 반응형은 단순 축소가 아니라 **에디토리얼 레이아웃이 모바일용 구조로 다시 짜여야 한다.**

---

## 4. 실제 구현 전에 바로잡아야 하는 방향

### 4-1. 삭제 또는 교체

- 패션몰식 `WOMAN / MAN / KIDS` 분기
- `SALE` 중심의 할인몰 톤
- `색상 + 사이즈` 전제의 상품 옵션 구조
- 세로로 과도하게 긴 룩북형 상품 카드
- 카드에서 무조건 `ADD`를 먼저 노출하는 구조
- 메인에서 상품 grid만 길게 이어지는 단조로운 커머스 구도

### 4-2. 대체 방향

- 홈은 **영상 Hero + featured module + editorial module + product module** 흐름으로 구성한다.
- 상품 탐색은 **카테고리 / 서브카테고리 / 향 / 고민 / 선물 상황** 중심으로 전환한다.
- 상품 상세는 **variant / 사용감 / 향 / 주요 성분 / 패키징 / 혜택** 중심 구조로 설계한다.
- 카드 액션은 `DETAILS`가 기본이고, `QUICK ADD`는 single variant에서만 허용한다.
- 검색, 혜택, 브랜드 소개, 고객지원은 모두 헤더/홈/푸터에서 자연스럽게 재진입할 수 있어야 한다.

### 4-3. 구현 시 권장 판단

- LocalStorage 기반 구조는 유지한다.
- Wishlist / Cart / Review / Inquiry / Order 흐름은 유지한다.
- 데이터 모델은 패션형이 아니라 **variant 중심 제품 구조**로 교체한다.
- 비회원 체크아웃보다 **로그인 기반 체크아웃**이 더 자연스럽다.

---

## 5. 실제 기술 스택

## 5-1. 필수 스택

- **React 19**
- **Vite 7**
- **React Router DOM 7**
- **Zustand 5**
- **Sass / SCSS**
- **Swiper 11**
- **GSAP 3**
- **Lucide React**
- **SweetAlert2**
- **react-quill-new**
- **react-daum-postcode**

## 5-2. 데이터 소스 기준

- 상품 텍스트 및 메타 데이터는 **`data/` 폴더의 JSON 파일**을 사용한다.
- **제품 이미지는 `scraper.js`를 실행하여 수집된 `data` 폴더 속 JSON 파일의 image 필드 기준으로 사용**한다.
- 제품 외 이미지, 영상, 배경, 보조 비주얼은 **`assets/` 폴더 파일명을 직접 지정**해 사용한다.
- 즉, 제품 이미지는 scraper 기반 데이터 소스, 그 외 디자인 비주얼은 assets 기반 정적 소스라는 원칙을 따른다.

---

## 6. 전역 디자인 시스템

## 6-1. 컬러 토큰

```scss
// ============================================
// Color Tokens (SCSS Variables)
// ============================================


// --------------------------------------------
// Brown Palette
// --------------------------------------------

$brown-50:  #f1efec;  // rgb(241, 239, 236)
$brown-100: #d5cec5;  // rgb(213, 206, 197)
$brown-200: #c0b6a9;  // rgb(192, 182, 169)
$brown-300: #a49582;  // rgb(164, 149, 130)
$brown-400: #928169;  // rgb(146, 129, 105)
$brown-500: #776144;  // rgb(119, 97, 68)
$brown-600: #6c583e;  // rgb(108, 88, 62)
$brown-700: #544530;  // rgb(84, 69, 48)
$brown-800: #413525;  // rgb(65, 53, 37)
$brown-900: #32291d;  // rgb(50, 41, 29)


// --------------------------------------------
// Base Colors
// --------------------------------------------

$oatmeal:     #fffbf3;  // rgb(255, 251, 243)


// --------------------------------------------
// Background Colors
// --------------------------------------------

$bg-primary:  #eee5da;  // rgb(238, 229, 218)
$bg-product:  #decbbc;  // rgb(222, 203, 188)
$bg-overlay:  #12110f;  // rgb(18, 17, 15)

// --------------------------------------------
// Point Colors
// --------------------------------------------
$point-pink: #EFAE97; //rgb(239,174,151)
$point-green: #A3B18A; //rgb(163,177,138)

// ============================================
// Color Map (for programmatic access)
// ============================================

$brown-colors: (
  '50':  $brown-50,
  '100': $brown-100,
  '200': $brown-200,
  '300': $brown-300,
  '400': $brown-400,
  '500': $brown-500,
  '600': $brown-600,
  '700': $brown-700,
  '800': $brown-800,
  '900': $brown-900,
);

$bg-colors: (
  'primary': $bg-primary,
  'product': $bg-product,
  'overlay': $bg-overlay,
);


// ============================================
// Utility Classes (optional)
// ============================================

// Brown text colors
@each $key, $value in $brown-colors {
  .text-brown-#{$key} {
    color: $value;
  }
}

// Brown background colors
@each $key, $value in $brown-colors {
  .bg-brown-#{$key} {
    background-color: $value;
  }
}

// Background utility classes
.bg-primary  { background-color: $bg-primary; }
.bg-product  { background-color: $bg-product; }
.bg-overlay  { background-color: $bg-overlay; }
.bg-white    { background-color: $white; }
```

### 컬러 사용 원칙

- 기본 배경은 `$oatmel`, `$bg-primary`를 우선 사용한다.
- 제품/콘텐츠 구역감이 필요한 섹션은 `$bg-product`를 제한적으로 사용한다.
- Hero 영상 위 오버레이, 검색 레이어, 메뉴 오버레이는 `$bg-overlay`를 사용한다.
- 텍스트 기본색은 `$brown-900`, 보조 텍스트는 `$brown-700`, 서브 정보는 `$brown-500` 중심으로 사용한다.
- 밝은 배경에서는 브라운 텍스트, 어두운 Hero/Overlay에서는 `$oatmeal` 텍스트를 사용한다.

## 6-2. 폰트 패밀리 및 텍스트 스타일

```scss
// ============================================
// Font Family Variables
// ============================================

$font-montage: 'Montage', sans-serif;
$font-suit: 'SUIT Variable', sans-serif;
$font-optima: 'Optima', 'Segoe UI', 'Candara', Geneva, sans-serif;


// ============================================
// Text Styles
// ============================================

// --------------------------------------------
// Montage Styles
// --------------------------------------------

.montage-220 {
  font-family: $font-montage;
  font-style: normal;
  font-weight: 400;
  font-size: 220px;
  line-height: normal;
  letter-spacing: -4.4px;
}

.montage-100 {
  font-family: $font-montage;
  font-style: normal;
  font-weight: 400;
  font-size: 100px;
  line-height: normal;
  letter-spacing: -2px;
}

.montage-80 {
  font-family: $font-montage;
  font-style: normal;
  font-weight: 400;
  font-size: 80px;
  line-height: 1;
}

.montage-48 {
  font-family: $font-montage;
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: normal;
}

.montage-32 {
  font-family: $font-montage;
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: normal;
  text-transform: uppercase;
}

.montage-30 {
  font-family: $font-montage;
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: normal;
}

.montage-24 {
  font-family: $font-montage;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: normal;
}

.montage-18 {
  font-family: $font-montage;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.5;
  letter-spacing: 2.34px;
  text-transform: uppercase;
}

.montage-16 {
  font-family: $font-montage;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
}

// --------------------------------------------
// SUIT Variable Styles
// --------------------------------------------

.suit-80-el {
  font-family: $font-suit;
  font-weight: 200;
  font-size: 80px;
  line-height: 1;
}

.suit-26-sb {
  font-family: $font-suit;
  font-weight: 600;
  font-size: 26px;
  line-height: 1.5;
}

.suit-24-r {
  font-family: $font-suit;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.5;
}

.suit-24-sb {
  font-family: $font-suit;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.5;
}

.suit-20-r {
  font-family: $font-suit;
  font-weight: 400;
  font-size: 20px;
  line-height: 1.5;
}

.suit-20-m {
  font-family: $font-suit;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.5;
}

.suit-18-r {
  font-family: $font-suit;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.5;
}

.suit-18-m {
  font-family: $font-suit;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.5;
}

.suit-16-r {
  font-family: $font-suit;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
}

.suit-14-m {
  font-family: $font-suit;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
}

.suit-12-r {
  font-family: $font-suit;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5;
}

// --------------------------------------------
// Optima Styles
// --------------------------------------------

.optima-70 {
  font-family: $font-optima;
  font-style: normal;
  font-weight: 400;
  font-size: 70px;
  line-height: 1.5;
}

.optima-40 {
  font-family: $font-optima;
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: normal;
  letter-spacing: -0.8px;
}

.optima-20 {
  font-family: $font-optima;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: normal;
}

.optima-18 {
  font-family: $font-optima;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.5;
}

.optima-16 {
  font-family: $font-optima;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: normal;
  text-transform: uppercase;
}
```

### 텍스트 스타일 적용 원칙

- Hero의 대형 영문 타이틀은 `montage-100`, `montage-80`, `montage-48` 위계로 사용한다.
- 섹션 타이틀과 에디토리얼 라벨은 `montage-32`, `montage-18`, `optima-16`을 사용한다.
- 한글 본문과 설명은 `suit-20-r`, `suit-18-r`, `suit-16-r`, `suit-14-m` 중심으로 사용한다.
- 가격, 제품명, CTA처럼 정돈된 영문 정보는 `optima-20`, `optima-18`, `optima-16`을 사용한다.
- 한 화면 안에서 폰트가 많아 보여도, 실제 용도는 **Display(Montage) / UI(Optima) / Body(SUIT)**로 분리한다.

## 6-3. 레이아웃 기준

- 전체 레이아웃은 **Nightworks 계열의 풀블리드 비주얼 + 큰 제목 + 넓은 여백 + 스토리형 모듈 흐름**을 참고한다.
- 공통 컨테이너 `.inner`
  - `width: 92%`
  - `max-width: 1600px`
- 12-column grid를 기본으로 하되, 섹션에 따라 **텍스트와 이미지가 offset 배치**되는 구조를 허용한다.
- Hero, store visual, editorial image block은 `.inner` 밖 full-bleed 사용 가능
- Header 높이
  - Desktop: `72px`
  - Tablet: `68px`
  - Mobile: `60px`
- Product Grid
  - Desktop: `4열`
  - Tablet: `3열`
  - Mobile: `2열`
- Product Card 이미지 비율
  - `4:5` 또는 `1:1.15`

## 6-4. 반응형 브레이크포인트

```scss
$mobile: 767px;
$tablet: 1023px;
$desktop: 1920px;
```

- 모바일: `max-width: 767px`
- 태블릿: `max-width: 1023px`
- 데스크탑 유틸: `max-width: 1920px`

## 6-5. Spacing 시스템

아래 spacing은 **px 기준 고정 토큰**으로 사용한다.

- `96px` : 페이지 Hero, 섹션 콘텐츠 간격
- `64px` : 섹션 간의 구분, 레이아웃 주 간격
- `32px` : 카드, 섹션 내부 요소 간격
- `16px` : 기본 콘텐츠 텍스트 블록, 버튼 주변
- `8px` : 요소 최소 여백 (텍스트, 아이콘 등)

권장 토큰 예시:

```scss
$space-96: 96px;
$space-64: 64px;
$space-32: 32px;
$space-16: 16px;
$space-8: 8px;
```

### spacing 사용 원칙

- Hero와 첫 섹션 사이, 큰 에디토리얼 블록 사이에는 `96px`
- 일반 섹션 간 간격은 `64px`
- 카드 내부, 이미지-텍스트 블록 내부는 `32px`
- 버튼과 본문, 메타 정보 정렬은 `16px`
- 아이콘, 미세 조정, badge와 텍스트 사이에는 `8px`

## 6-6. 무드 키워드

- cinematic
- editorial
- warm brown
- restrained luxury
- premium calm
- full-bleed visual
- generous spacing
- story-driven commerce

---

## 7. 전체 라우팅 맵

라우트는 아래 기준으로 구성한다.

```txt
/
/gift-guide
/gift-guide/general
/gift-guide/fragrance
/products
/products/:category
/products/:category/:subcategory
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
/product/:id
/support/notices
/support/faq
/support/contact
/support/live-chat
/support/store-locator
```

### 7-1. 라우트 의미

- `/` : 홈
- `/gift-guide` : 기프트 가이드 메인
- `/gift-guide/general` : 일반 기프트 추천
- `/gift-guide/fragrance` : 프래그런스 가이드
- `/products` : 전체 상품
- `/products/:category` : 1차 카테고리 상품 목록
- `/products/:category/:subcategory` : 세부 카테고리 또는 향 계열 페이지
- `/benefits` : 혜택 안내 메인
- `/benefits/official` : 공식몰 혜택
- `/benefits/kr-exclusive` : 한국 한정 혜택 / 콘텐츠
- `/our-story` : 브랜드 소개
- `/search` : 검색 결과 페이지
- `/login`, `/signup`, `/find-account` : 인증 흐름
- `/mypage` : 회원 전용 포털
- `/cart`, `/checkout` : 구매 흐름
- `/product/:id` : 상품 상세
- `/support/*` : 고객지원 관련 흐름

---

## 8. 데이터 모델 명세

## 8-1. 상품(Product)

```ts
interface ProductVariant {
    id: string;
    label: string;
    price: number;
    compareAtPrice: number | null;
    stock: number;
    isDefault?: boolean;
    isRefill?: boolean;
}

interface ProductReview {
    id: number;
    userId: string;
    userName: string;
    date: string;
    rating: number;
    content: string;
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
    gallery: string[];

    description: string;
    shortDescription?: string;
    texture: string;
    aromaNotes: string[];
    scentFamily?: 'floral' | 'fresh' | 'woody' | 'opulent' | string;

    keyIngredients: string[];
    suitableFor: string[];
    concerns: string[];
    benefits: string[];
    usage: string;
    routineStep?: string;

    variants: ProductVariant[];

    packagingInfo: {
        summary: string;
        recycleGuide: string[];
        sustainabilityNotes: string[];
    };

    merchandising: {
        isNew: boolean;
        isBest: boolean;
        isSignature: boolean;
        isGiftable: boolean;
        isOnlineExclusive: boolean;
    };

    giftMeta: {
        giftTags: string[];
        giftReason: string;
        canAddGiftWrap: boolean;
        canAddShoppingBag: boolean;
    };

    reviews: ProductReview[];
}
```

### 데이터 모델 원칙

- 단일 `price`, `discountPrice` 대신 **`variants[]` 기준 가격 구조**를 사용한다.
- 상품 이미지는 `scraper.js` 결과 JSON의 이미지 필드를 사용한다.
- `colors`, `sizes`, `gender`는 제거한다.
- 상품 탐색과 선물 추천을 위해 `concerns`, `giftMeta`, `merchandising` 필드를 둔다.

## 8-2. 사용자(User)

```ts
interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    phone?: string;
    address?: string;
    defaultShipping?: {
        receiver?: string;
        phone?: string;
        zipcode?: string;
        address?: string;
        detailAddress?: string;
    };
    createdAt: string;
}
```

## 8-3. 장바구니 아이템(CartItem)

```ts
interface CartItem {
    cartId: string; // `${productId}-${variantId}`
    productId: string;
    name: string;
    image: string;
    categoryLabel: string;
    subcategoryLabel: string;
    selectedVariant: {
        id: string;
        label: string;
        price: number;
        isRefill?: boolean;
    };
    quantity: number;
    unitPrice: number;
}
```

## 8-4. 주문(Order)

```ts
interface Order {
    id: string; // ORD_${Date.now()}
    userId: string;
    items: CartItem[];
    shippingInfo: {
        receiver: string;
        phone: string;
        zipcode: string;
        address: string;
        detailAddress: string;
        memo: string;
    };
    giftInfo: {
        isGiftOrder: boolean;
        giftWrap: boolean;
        shoppingBag: boolean;
        message: string;
    };
    paymentMethod: 'card' | 'bank';
    selectedCard: string;
    subtotal: number;
    shippingFee: number;
    totalAmount: number;
    createdAt: string;
    status: '결제완료';
}
```

## 8-5. 문의 / Q&A / 공지 / FAQ

```ts
interface Notice {
    id: string;
    title: string;
    content: string;
    date: string;
    author: string;
    category: string;
}

interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
}

interface Inquiry {
    id: number;
    userId: string;
    type: string;
    title: string;
    content: string;
    date: string;
}

interface Qna {
    id: number;
    userId: string;
    title: string;
    content: string;
    date: string;
}
```

## 8-6. 위시리스트

```ts
interface WishlistItem {
    userId: string;
    productId: string;
    addedAt: string;
}
```

---

## 9. Zustand 아키텍처

## 9-1. Root Store

`useStore.js` 에서 여러 Slice를 합친다.

- `createAuthSlice`
- `createProductSlice`
- `createCartSlice`
- `createSupportSlice`
- `createOrderSlice`
- `createWishlistSlice`

## 9-2. Persist 설정

```ts
name: 'ff-storage';
storage: createJSONStorage(() => localStorage);
```

## 9-3. 실제 partialize 대상

다음만 영속 저장한다.

- `users`
- `user`
- `isLoggedIn`
- `products`
- `cartItems`
- `inquiries`
- `qnas`
- `orders`
- `wishlist`

## 9-4. 최근 검색어 저장 방식

- 검색 최근어는 Store가 아니라 **`recentSearches`** 키로 직접 LocalStorage에 저장한다.
- 중복 제거 + 최신순 + 최대 5개 유지
- 개별 삭제 가능

---

## 10. Slice별 실제 역할

## 10-1. authSlice

역할:

- 로그인
- 회원가입
- 테스트 회원 생성/로그인
- 로그아웃
- 기본 배송지 / 연락처 수정
- 아이디 찾기
- 비밀번호 찾기 / 재설정

핵심 액션:

- `login(credentials)`
- `loginAsTestUser(onlyRegister?)`
- `signup(userData)`
- `logout()`
- `updateUserAddress(userId, shippingInfo)`
- `findEmail(name, phone)`
- `findPassword(email, name)`
- `resetPassword(email, newPassword)`

## 10-2. productSlice

역할:

- Seed Data 로드
- 상품 상세 조회
- 목록 필터링
- 검색어/정렬 상태 관리
- 리뷰 CRUD
- 내가 쓴 리뷰 조회
- 연관 상품 조회

핵심 액션:

- `fetchProducts()`
- `fetchProductById(id)`
- `fetchProductBySlug(slug)`
- `setFilters(newFilters)`
- `clearFilters()`
- `setSearchQuery(query)`
- `setSort(sortKey)`
- `addReview(productId, review)`
- `updateReview(productId, reviewId, content, rating)`
- `deleteReview(productId, reviewId)`
- `getUserReviews(userId)`
- `getRelatedProducts(productId)`

## 10-3. cartSlice

역할:

- 장바구니 담기
- variant 기준 unique cartId 생성
- 수량 수정
- 개별 삭제 / 선택 삭제 / 전체 비우기
- 예전 데이터 보정
- 총 수량 계산

핵심 액션:

- `getSanitizedCart()`
- `addToCart(product, selectedVariant, quantity?)`
- `updateCartQuantity(cartId, quantity)`
- `removeFromCart(cartId)`
- `removeMultipleFromCart(cartIds)`
- `clearCart()`
- `getTotalItems()`

## 10-4. orderSlice

역할:

- 결제 완료 주문 저장
- 주문번호 기반 조회
- 로그인 유저 주문 조회

핵심 액션:

- `addOrder(orderData)`
- `getOrderById(orderId)`
- `getUserOrders(userId)`

## 10-5. supportSlice

역할:

- 공지사항 로드
- FAQ 카테고리 필터 로드
- 1:1 문의 CRUD
- Q&A CRUD
- 사용자별 문의 조회

핵심 액션:

- `fetchNotices()`
- `fetchFAQs(category?)`
- `submitInquiry(data)`
- `updateInquiry(id, updateData)`
- `deleteInquiry(id)`
- `getUserInquiries(userId)`
- `submitQna(data)`
- `updateQna(id, updateData)`
- `deleteQna(id)`
- `getUserQnas(userId)`

## 10-6. wishlistSlice

역할:

- 관심상품 토글
- 유저별 리스트 조회
- 특정 상품 저장 여부 확인

핵심 액션:

- `toggleWishlist(userId, productId)`
- `getUserWishlist(userId)`
- `isProductWishlisted(userId, productId)`

---

## 11. 공통 레이아웃 구현 기준

## 11-1. App

- 앱 시작 시 `fetchProducts()` 1회 실행
- 상품 데이터는 `data/*.json` 기반으로 초기화한다.
- 글로벌 스타일 `styles/index.scss` 로드
- Home에서는 Hero와 Header 상태가 연동되어야 한다.

## 11-2. Layout

```tsx
<Header />
<main className="main">
  <Outlet />
</main>
<Footer />
```

- Header는 페이지/스크롤 위치에 따라 상태가 바뀌는 `fixed` 구조다.
- Home Hero 구간: `transparent`
- Home Hero 이탈 이후: `solid`
- 내부 페이지: 기본 `solid`

## 11-3. Header

### 기본 구조

- 좌측 1차 GNB
  - `GIFT GUIDE`
  - `PRODUCTS`
  - `BENEFITS`
  - `OUR STORY`
- 중앙 로고
  - `Aēsop.`
- 우측 유틸
  - Search
  - Account / MyPage
  - Cart + 수량 배지

Desktop 구조:

```scss
grid-template-columns: 1fr auto 1fr;
```

### 상태 정의

#### Transparent Header
- 배경: `transparent`
- 텍스트/아이콘: `$white`
- 하단 보더: 없음
- 위치: `fixed`

#### Solid Header
- 배경: `$bg-primary`
- 텍스트/아이콘: `$brown-500` 또는 `$brown-700`
- 하단 보더: `1px solid $brown-100`
- 위치: `fixed`

## 11-4. 모바일 메뉴

- 태블릿 이하에서 햄버거 메뉴 노출
- 전체 화면 고정 오버레이 메뉴
- 메뉴 클릭 시 닫힘
- body scroll lock 적용
- Desktop 정보 구조를 세로 아코디언으로 변환

## 11-5. Search Modal

- Search 아이콘 클릭 시 전체 화면 검색 레이어 오픈
- submit 시 `/search` 이동
- `setSearchQuery(query)` 및 `setFilters({ query })` 반영
- 최근 검색어는 `recentSearches`에 저장
- 레이어 배경은 `$bg-overlay` + blur 또는 dark overlay

## 11-6. Footer

구성:

- 브랜드 설명
- Help / Company / Policies 3컬럼 링크
- 고객지원 / 매장 찾기 / 혜택 안내 보조 링크
- SNS 아이콘
- 하단 카피라이트

---

## 12. 홈 화면 구현 기준

메인(index) 페이지는 일반적인 상품 진열형 홈이 아니라,  
**영상 Hero → 짧은 인트로 카피 → Best Products → 공간 이미지 → 공식몰 한정 섹션 → 선물 큐레이션 → 브랜드/신제품/카테고리 네비게이션 → 큰 타이포의 Footer Outro** 흐름으로 구성한다.

즉, 홈은 “상품 목록의 시작점”이라기보다  
**브랜드 무드를 가장 먼저 설득하는 에디토리얼 메인 페이지**여야 한다.

## 12-1. Hero Visual

구성:

- full width 영상 Hero
- Header는 Hero 위에 겹쳐지는 transparent 상태
- 영상 위에는 필요한 최소 수준의 overlay만 허용
- Hero 텍스트는 `montage-100` 또는 `montage-80` 기준의 **대형 영문 타이틀**로 노출
- 타이틀은 화면을 꽉 채우거나 일부가 잘려 보이는 수준까지 크게 사용 가능
- CTA는 많지 않게 유지하고, 시선은 영상과 타이틀에 집중되게 한다

동작:

- 첫 진입 시 Header는 transparent
- Hero 구간을 지나면 Header가 solid 상태로 전환
- Hero와 Header는 하나의 비주얼 경험처럼 연결되어야 한다

### Hero 무드 원칙

- 영상은 따뜻한 브라운/앰버 계열 톤을 우선한다
- 텍스트는 중앙 정렬보다, **화면을 가로지르는 대형 타이포**에 가깝게 사용한다
- 첫 화면에서는 제품 판매보다 **세계관 제시**가 우선이다

## 12-2. Intro Copy Block

- Hero 직후에는 매우 짧은 인트로 카피 블록을 둔다
- 텍스트는 좁은 폭으로 중앙 정렬하고, 큰 여백 속에 작게 놓는다
- 이 블록은 정보를 많이 전달하기보다 **영상 Hero의 여운을 정리하는 역할**을 한다

권장 구성:

- 상단 여백: `96px`
- 본문 폭: `320px ~ 480px`
- 타이포: `suit-12-r`, `suit-14-m`, `optima-16` 조합 가능

## 12-3. Best Products Section

- 첫 번째 상품 섹션은 대규모 grid보다 **3개 내외의 시그니처 제품 카드**로 구성한다
- 섹션 타이틀은 `BEST PRODUCTS`
- 중앙 정렬 또는 느슨한 카드 배치가 어울린다
- 제품 카드는 단순 e-commerce 카드보다 **작은 전시 카드**처럼 보여야 한다

포함 요소:

- 제품 썸네일
- 제품명
- 대표 variant
- 가격
- BEST / GIFTABLE 배지
- CTA 1개

무드 원칙:

- 카드 수는 적게
- 배경은 밝은 뉴트럴 톤
- 카드 아래 정보 영역은 지나치게 복잡하지 않게

## 12-4. Full-Bleed Store Visual Section

- Best Products 이후에는 **매장 또는 공간 이미지를 full-bleed로 크게 노출**한다
- 텍스트가 거의 없거나 아주 적어도 된다
- 이 섹션은 브랜드가 제품만이 아니라 **공간과 경험**을 가진다는 인상을 만든다

구성 원칙:

- 높이감 있는 단일 이미지
- 브레이크 역할을 하는 큰 시각적 장면
- 섹션 사이 spacing보다 이미지 자체의 존재감이 우선

## 12-5. Official Online Exclusive Section

- 공식몰 한정 혜택/구성을 보여주는 섹션
- 밝은 배경 위에 **중앙 텍스트 + 주변의 작은 부유 이미지** 조합이 적합하다
- 구성은 너무 설명적이지 않게, 에디토리얼한 레이아웃으로 풀어낸다

포함 요소:

- 타이틀: `Official Online Exclusive`
- 한 줄 설명
- 짧은 본문
- CTA
- 보조 이미지 3~5개

레이아웃 원칙:

- 가운데 텍스트 블록
- 좌우/상하에 작은 이미지 오프셋 배치
- 이미지가 설명을 직접 하지 않아도 분위기를 만드는 역할이면 충분하다

## 12-6. Best Gift Editorial Section

- 어두운 브라운 배경 위에 **선물 큐레이션 에디토리얼 섹션**을 둔다
- 좌우에 작은 정물 이미지, 중앙에 메인 선물 이미지, 한쪽에는 텍스트/CTA를 둔다
- 일반 상품 섹션보다 잡지 레이아웃처럼 구성한다

포함 요소:

- 섹션 키워드 예시: `Best Gift`
- 추천 대상 / 시즌성 카피
- 선물 추천 문장
- CTA

무드 원칙:

- 어두운 배경 + 따뜻한 하이라이트
- 제품 나열보다 **선물 장면** 중심
- 텍스트는 적지만 설득력 있게

## 12-7. Korea Exclusive Section

- 밝은 배경으로 다시 전환되는 한정/큐레이션 섹션
- 좌측에는 짧은 설명과 CTA
- 우측에는 1개의 메인 이미지 + 1개의 보조 이미지 조합이 적합하다

구성 예시:

- 타이틀: `Korea Exclusive`
- 짧은 소개 문장
- CTA
- 패키지/세트 이미지를 중심으로 한 비주얼

이 섹션은 공식몰 한정성과 선물 적합성을 동시에 보여준다.

## 12-8. About Teaser Section

- 어두운 배경 위에 `About` 같은 **거대한 배경 타이포**를 낮은 명도로 깔고,
  중앙 또는 우상단에 단일 이미지/영상 블록을 둔다
- 이 섹션은 브랜드 철학 전체를 설명하지 않고, **브랜드 소개 페이지로 넘어가기 위한 티저** 역할을 한다

구성 원칙:

- 낮은 대비의 giant typography
- 이미지 1개 또는 짧은 영상 1개
- 짧은 CTA
- 텍스트는 최소화

## 12-9. New Arrival Section

- 밝은 배경 위에 신제품 또는 시즌 추천 섹션을 둔다
- 좌측은 텍스트와 소형 이미지 조합
- 우측은 큰 제품 이미지 한 장으로 시선을 끈다

포함 요소:

- 타이틀: `New Arrival`
- 대표 상품 1~2개
- 간결한 설명
- CTA

무드 원칙:

- 정보보다 **신제품의 조형감과 존재감**
- 좌우 비대칭 레이아웃
- 한 장의 큰 이미지가 핵심

## 12-10. Product Navigator Section

- 홈 후반부에는 카테고리 탐색을 위한 **대형 Product 섹션**을 둔다
- 어두운 오버레이 배경 위에 `Product`라는 대형 타이틀을 배치하고,
  좌우에 카테고리 리스트를 배치한다
- 이 구간은 일반 필터 UI가 아니라 **브랜드형 카테고리 네비게이션**이다

구성:

- 대형 타이틀: `Product`
- 짧은 보조 문장
- 좌측/우측 카테고리 리스트
- 배경 이미지 또는 오브제 이미지

카테고리 예시:

- Skincare
- Hand · Body
- Perfume
- Home · Living
- Hair · Shaving
- Gift
- Set

## 12-11. Footer Outro Section

- Footer 직전 또는 Footer 내부에는 큰 카피와 거대한 브랜드 워드마크를 활용한 Outro를 둔다
- 예시:
  - 짧은 메시지 카피
  - 대형 `Aesop` 또는 브랜드형 워드마크 배경 타이포
  - 하단 사이트맵 / 정책 / SNS

무드 원칙:

- 정보 밀도는 낮고 여운이 길어야 한다
- Footer 역시 하나의 에디토리얼 섹션처럼 느껴져야 한다
- 마지막까지 브라운/아이보리 톤과 큰 여백을 유지한다

---

## 13. 상품 목록 페이지 구현 기준

## 13-1. 경로별 자동 필터

- `/products` : 전체 상품
- `/products/:category` : 1차 카테고리 필터
- `/products/:category/:subcategory` : 세부 카테고리 또는 향 계열 필터
- `/gift-guide/general` : 선물 중심 필터
- `/gift-guide/fragrance` : 향수/프래그런스 선물 필터
- `/search` : 검색 결과 페이지

## 13-2. 상단 정보 구조

- Breadcrumb
- 페이지 타이틀
- 한 줄 설명
- 결과 개수
- 정렬 드롭다운
- 모바일 필터 버튼

## 13-3. 필터 그룹

- 카테고리 탭
- 서브카테고리 필터
- 고민 / 사용 목적 필터
- 향 / 무드 필터
- 선물 필터
- 가격대 필터

## 13-4. 정렬 기준

```txt
추천순 / 베스트순 / 신제품순 / 낮은 가격순 / 높은 가격순 / 선물 추천순
```

## 13-5. 리스트 상태

- 결과가 있으면 Grid 렌더링
- 결과가 없으면 Empty State
- 모바일에서는 필터 패널을 Fullscreen Filter 또는 Bottom Sheet로 연다.

Grid 기준:

- Desktop: 4열
- Tablet: 3열
- Mobile: 2열

## 13-6. 보조 탐색 영역

- 관련 루틴 추천
- 같이 쓰기 좋은 제품
- 시그니처 제품
- 선물 가이드 바로가기

---

## 14. ProductItem 카드 기준

- 정제된 제품 중심 이미지
- 차분한 제품 중심 비율
- 절제된 hover
- 상품명 아래에 향 / 사용감 / 추천 이유 중 하나 노출
- 가격은 variant 최소가 기준으로 표시

## 14-1. 카드 기본 정보

1. 제품 이미지
2. 제품명
3. 짧은 설명 또는 사용감
4. 향 노트 또는 대표 효능
5. 가격
6. 태그 / 배지

## 14-2. 배지 시스템

- `NEW`
- `BEST`
- `SIGNATURE`
- `GIFTABLE`
- `ONLINE EXCLUSIVE`

## 14-3. 가격 표시 기준

- variant 여러 개면 `39,000원부터`
- variant 하나면 일반 가격만 표시

## 14-4. 메타 텍스트 기준

- 향 노트
- 사용감
- 추천 이유
- 대표 효능
- 기프트 태그

## 14-5. 액션 버튼

- `DETAILS`
- `QUICK ADD`
- `HEART`

## 14-6. 현재 기준 주의점

- **variant 1개만 존재** → Quick Add 허용
- **variant 2개 이상 존재** → Quick Add 금지, 상세 또는 선택 레이어로 유도

---

## 15. 상품 상세 페이지 구현 기준

## 15-1. 상단 구조

- Breadcrumb 또는 `BACK`
- 좌측 큰 이미지 / 갤러리
- 우측 sticky 정보 박스

## 15-2. 상품 정보 영역

포함 요소:

- 카테고리
- 상품명
- 가격 또는 최저가
- 제품 한 줄 설명
- 사용감
- 향
- 주요 성분
- variant 선택
- 수량 증감
- `ADD TO BASKET`
- 위시리스트
- SHARE
- 혜택 / 선물 정보

## 15-3. 옵션 선택 규칙

- 제품 옵션은 `variant`
- variant가 2개 이상이면 선택 전 장바구니 추가 불가
- variant가 1개면 기본값 자동 선택 가능
- cartId는 `id-variantId` 조합

## 15-4. 혜택 / 선물 정보 블록

- 공식몰 혜택
- 선물 포장 가능 여부
- 쇼핑백 제공 여부
- 배송 정보
- 온라인몰 한정 기프트 여부

## 15-5. Detail Tabs

- `DETAILS`
- `INGREDIENTS`
- `PACKAGING & RECYCLE`
- `ESSENTIAL INFO`
- `DELIVERY & RETURNS`
- `REVIEWS (n)`

## 15-6. DETAILS 탭

- 제품 설명
- 사용감
- 향
- 주요 성분
- 추천 대상
- 기대 효능
- 사용 방법
- 루틴 단계

## 15-7. INGREDIENTS 탭

- 전성분 표시
- 성분 안내 문구

## 15-8. PACKAGING & RECYCLE 탭

- 패키징 요약
- 재활용 가능한 구성품
- 분리 배출 가이드
- 리필 옵션 의미
- 지속가능성 메모

## 15-9. ESSENTIAL INFO / DELIVERY 탭

- 제조국
- 용량
- 사용기한
- 보관 시 주의사항
- 상품 필수 표기 정보
- 배송 기준
- 반품 정책 요약

## 15-10. REVIEWS 탭

- 평균 평점
- 별점 시각화
- 리뷰 작성 폼
- 리뷰 목록
- 본인 리뷰만 수정/삭제 가능

## 15-11. 함께 쓰기 좋은 제품 섹션

우선순위:

1. 같은 리추얼
2. 같은 향 계열
3. 같은 고민 해결
4. 함께 선물하기 좋은 조합

---

## 16. 장바구니 페이지 구현 기준

## 16-1. 핵심 동작

- 최초 진입 시 `getSanitizedCart()` 실행
- 기존 cartId 없는 데이터가 있으면 보정
- 진입 즉시 전체 상품 선택 상태로 시작

## 16-2. UI 구성

- 좌측: 장바구니 리스트
- 우측: 주문 요약 사이드바 (sticky)

리스트 요소:

- 체크박스
- 상품 이미지
- 상품명
- category / subcategory
- 선택 variant
- 가격
- 수량 증감
- 개별 삭제

## 16-3. 금액 계산 규칙

- 선택된 상품만 금액 계산
- 가격은 `selectedVariant.price`
- 10만원 이상 무료배송
- 미만이면 3,000원

## 16-4. 주문 버튼

- `선택 상품 주문하기`
- `전체 상품 주문하기`

## 16-5. 빈 장바구니 상태

- `장바구니가 비어 있습니다.`
- `제품 둘러보기`
- `선물 가이드 보기`

## 16-6. 현재 기준 주의점

옵션 표기는 아래처럼 사용한다.

- `Variant: 75mL`
- `Variant: 500mL`
- `Variant: 500mL 리필`
- `Variant: 키트`

---

## 17. 결제 페이지 구현 기준

## 17-1. 진입 규칙

- 결제 페이지는 로그인 사용자만 진입 가능
- 비로그인 상태에서 진입 시 `/login` 이동
- `location.state?.selectedIds` 를 받는다.
- 선택 상품이 없으면 `/cart`로 돌려보낸다.

## 17-2. 배송지 정보 폼

필드:

- 수령인
- 연락처
- 우편번호
- 기본 주소
- 상세 주소
- 배송 메모

추가 옵션:

- 주문자 정보와 동일
- 기본 배송지로 저장

주소 검색:

- `react-daum-postcode` 사용

## 17-3. 선물 옵션

```ts
giftInfo: {
  isGiftOrder: boolean;
  giftWrap: boolean;
  shoppingBag: boolean;
  message: string;
}
```

필드:

- 선물 포장 여부
- 쇼핑백 포함 여부
- 메시지 카드 입력
- 선물 주문 여부

## 17-4. 결제 수단

- `신용카드`
- `무통장 입금`

## 17-5. 주문 요약

- 주문 상품 썸네일 / 이름 / variant / 수량 / 가격
- 상품 금액
- 배송비
- 총 결제 금액
- 선물 옵션 요약
- 혜택 요약
- `결제하기` 버튼

## 17-6. 결제 완료 처리

1. `newOrder` 생성
2. `addOrder(newOrder)`
3. 주문한 상품만 장바구니에서 삭제
4. 기본 배송지 저장 체크 시 반영
5. `/mypage?tab=orders` 또는 `/mypage` 이동

---

## 18. 인증 페이지 구현 기준

## 18-1. 로그인

구성:

- E-MAIL
- PASSWORD
- LOG IN 버튼
- `임시 회원 (테스트용)` 버튼
- `Find Account`
- `JOIN NOW`

테스트 회원 버튼:

- `test@aesoprenewal.com`
- `testpassword123`

## 18-2. 회원가입

구성:

- NAME
- E-MAIL
- PASSWORD
- CONFIRM PASSWORD
- CREATE ACCOUNT

## 18-3. 계정 찾기

탭 구조:

- FIND ID
- FIND PASSWORD

---

## 19. 마이페이지 구현 기준

## 19-1. 접근 가드

- 비로그인 시 SweetAlert 경고 후 `/login` 이동
- 로그인 전에는 빈 화면 반환

## 19-2. 기본 레이아웃

- 좌측 사이드바 메뉴
- 우측 콘텐츠 패널
- 상단 환영 배너

사이드바 메뉴 그룹:

- 쇼핑 관리
  - 주문내역
  - 저장한 제품
- 나의 활동
  - 리뷰 관리
  - 문의 / Q&A
- 계정 관리
  - 회원 정보
  - 배송지 관리
  - 로그아웃
- 고객지원 바로가기
  - FAQ
  - 공지사항

## 19-3. 주문내역 탭

- 최신 주문이 위로 오도록 reverse
- 주문번호, 대표 상품, 총 결제 금액, 상태, variant, 선물 여부 표시
- `재구매` CTA 제공 가능

## 19-4. 저장한 제품 탭

- 위시리스트 결과를 제품 카드 grid로 렌더링
- 없으면 empty state

## 19-5. 회원 정보 수정 탭

- 이름 / 이메일 readOnly
- 연락처 수정 가능

## 19-6. 배송지 관리 탭

- 기본 배송지 카드 표시
- 수정 버튼 클릭 시 폼 전환
- 우편번호 찾기 가능
- 저장 시 `updateUserAddress()` 호출

## 19-7. 리뷰 관리 탭

- 내가 쓴 리뷰 목록 조회
- 수정 / 삭제 가능

## 19-8. 문의 / Q&A 탭

- 리스트 / 작성 폼 2상태
- `react-quill-new` 사용
- 작성 / 수정 / 삭제 가능

## 19-9. FAQ / 공지사항 탭

- 요약형 리스트로 제공
- 자세히 보기 클릭 시 고객지원 페이지 이동 가능

---

## 20. 고객센터(Support) 페이지 구현 기준

## 20-1. Notice 페이지

- `fetchNotices()` 로 Seed Data 로드
- 테이블 형태
- 컬럼: No / Title / Date

## 20-2. FAQ 페이지

- `fetchFAQs(currentCat)` 사용
- 카테고리 버튼
  - All
  - 주문
  - 배송
  - 제품
  - 선물
  - 회원정보
- 아코디언 구조

## 20-3. Contact 페이지

- 고객지원용 문의 폼
- 필드:
  - TYPE select
  - TITLE input
  - CONTENT textarea 또는 ReactQuill

## 20-4. Live Chat / Store Locator 보조 진입

- 별도 지원 페이지 또는 placeholder 페이지로 구현 가능
- Support 상단에 빠른 진입 버튼으로 노출 가능

---

## 21. 폴더 구조 기준

```bash
src/
  assets/
    images/
      home/
      common/
      benefits/
      editorial/
    videos/
      home/
  data/
    products/
      all-products.json      # scraper.js 결과물
      skin-care.json
      hand-body.json
      fragrance.json
    support/
      notices.json
      faqs.json
    gift-guide/
      scenarios.json
  common/
    footer/
      index.jsx
    header/
      index.jsx
      NavBar.jsx
      MegaMenu.jsx
      MobileMenu.jsx
      SearchModal.jsx
      SearchModal.scss
    Layout.jsx
  components/
    product/
      ProductItem.jsx
      ProductList.jsx
      ProductFilters.jsx
      VariantSelector.jsx
      ProductBadges.jsx
    ui/
      Button.jsx
      Badge.jsx
      EmptyState.jsx
      SectionHeader.jsx
      PriceDisplay.jsx
  pages/
    home/
      components/
        HeroVideo.jsx
        IntroCopyBlock.jsx
        BestProductsSection.jsx
        StoreVisualSection.jsx
        OfficialExclusiveSection.jsx
        BestGiftSection.jsx
        KoreaExclusiveSection.jsx
        AboutTeaserSection.jsx
        NewArrivalSection.jsx
        ProductNavigatorSection.jsx
        FooterOutroSection.jsx
      index.jsx
      style.scss
    gift-guide/
      index.jsx
      GeneralGiftGuide.jsx
      FragranceGuide.jsx
      style.scss
    products/
      index.jsx
      ProductDetail.jsx
      style.scss
      detail.scss
    benefits/
      index.jsx
      OfficialBenefits.jsx
      KRExclusiveBenefits.jsx
      style.scss
    our-story/
      index.jsx
      style.scss
    support/
      Notice.jsx
      FAQ.jsx
      Contact.jsx
      LiveChat.jsx
      StoreLocator.jsx
      style.scss
    cart/
      index.jsx
      style.scss
    checkout/
      index.jsx
      style.scss
    login/
      index.jsx
      Signup.jsx
      FindAccount.jsx
      style.scss
    mypage/
      index.jsx
      style.scss
  store/
    slices/
      authSlice.js
      productSlice.js
      cartSlice.js
      orderSlice.js
      supportSlice.js
      wishlistSlice.js
    useStore.js
  styles/
    base/
      _reset.scss
      _default.scss
      _fonts.scss
    components/
      _product.scss
      _badge.scss
      _button.scss
      _form.scss
    layout/
      _header.scss
      _footer.scss
      _main.scss
    pages/
      _home.scss
      _products.scss
      _detail.scss
      _cart.scss
      _checkout.scss
      _support.scss
      _mypage.scss
    utils/
      _media.scss
      _palette.scss
      _typography.scss
      _spacing.scss
    _swal.scss
    index.scss
  scripts/
    scraper.js
  main.jsx
```

### 폴더 구조 원칙

- 제품 이미지는 `scripts/scraper.js` 실행 결과인 `data/products/*.json`을 통해 참조한다.
- 비제품 이미지와 비디오, 배경은 `assets/`에서 파일명 기준으로 관리한다.
- 홈은 Hero, Intro Copy, Best Products, Store Visual, Official Exclusive, Gift Editorial, About Teaser, New Arrival, Product Navigator, Footer Outro 단위로 분리한다.
- 공통 스타일은 palette / typography / spacing을 분리해 관리한다.

---

## 22. 바이브 코딩 구현 순서 추천

### 1단계

- Vite + React + Router + Zustand + SCSS 세팅
- palette / typography / spacing 토큰 먼저 작성
- Header / Footer / Layout 구현

### 2단계

- `scraper.js` 결과 JSON 구조에 맞는 product loader 작성
- support / gift guide seed data 정리
- store 및 persist 연동

### 3단계

- Home Hero / Header 상태 전환 / Search Modal / MegaMenu 구현
- Intro Copy / Best Products / Store Visual / Official Exclusive / Gift Editorial 등 홈 핵심 섹션 구성

### 4단계

- 상품 목록 / 필터 / 정렬 / 검색 결과 구현

### 5단계

- ProductDetail 구현
- variant 선택, 리뷰 CRUD, related products, wishlist 연동

### 6단계

- Cart / Checkout 구현
- giftInfo / 주문 저장 / 기본 배송지 저장 연결

### 7단계

- Login / Signup / FindAccount 구현
- 테스트 회원 플로우 연결

### 8단계

- MyPage 구현
- 주문 / 저장한 제품 / 배송지 / 리뷰 / 문의 연결

### 9단계

- Support 마무리
- SweetAlert 커스텀 / 모바일 UI / 퍼포먼스 정리

---

## 23. AI에 바로 넣기 좋은 바이브 코딩 프롬프트

## 23-1. 전체 프로젝트 시작 프롬프트

```txt
React 19 + Vite + react-router-dom + Zustand + SCSS로 프리미엄 라이프스타일 이커머스 프론트엔드 프로젝트를 만들어줘.
제품 데이터는 scraper.js 실행 결과인 data/products/*.json 파일을 사용하고, 제품 외 비주얼은 assets 폴더 파일명을 직접 지정해서 써줘.
백엔드는 붙이지 말고 seed data + Zustand + localStorage persist로 처리해.
header는 hero 구간에서 transparent, 그 외 구간에서는 solid 상태로 전환되게 해줘.
레이아웃은 Nightworks 계열의 full-bleed visual, editorial spacing, oversized typography를 참고해서 구성해줘.
먼저 전역 스타일 토큰, typography, spacing, layout, header, footer, router, store 뼈대부터 만들어줘.
```

## 23-2. Home / Header 프롬프트

```txt
Home과 Header를 만들어줘.
Home 첫 화면은 영상 Hero이고 Header는 transparent로 겹쳐졌다가 Hero를 지나면 solid로 전환돼야 해.
Header는 좌측 GNB(GIFT GUIDE / PRODUCTS / BENEFITS / OUR STORY), 중앙 로고, 우측 Search / Account / Cart 구조야.
Home은 Intro Copy Block, Best Products Section, Full-Bleed Store Visual, Official Online Exclusive Section, Best Gift Editorial Section, Korea Exclusive Section, About Teaser Section, New Arrival Section, Product Navigator Section, Footer Outro Section 흐름으로 구성해줘.
레이아웃은 큰 여백, 풀블리드 이미지, 비대칭 editorial block, giant typography를 사용해줘.
```

## 23-3. 상품 목록 / 상세 프롬프트

```txt
상품 목록과 상품 상세를 만들어줘.
상품은 variant, 향, 사용감, 주요 성분, 패키징 정보 중심 구조야.
목록 페이지는 /products, /products/:category, /products/:category/:subcategory 경로에 따라 필터가 자동 적용되게 하고,
필터는 카테고리, 서브카테고리, 고민, 향 계열, 선물 태그, 가격대 기준으로 구성해줘.
상품 카드는 BEST / SIGNATURE / GIFTABLE / ONLINE EXCLUSIVE 배지, variant 최저가, 향/사용감/추천 이유가 보여야 해.
상세 페이지는 좌측 갤러리, 우측 sticky 정보 영역, variant 선택, 혜택, 패키징/리사이클, 리뷰 CRUD, related products까지 구현해줘.
```

## 23-4. 장바구니 / 결제 프롬프트

```txt
장바구니와 결제 페이지를 만들어줘.
장바구니는 product id + selectedVariant.id 조합으로 cartId를 만들고,
전체 선택, 개별 선택, 선택 삭제, 전체 비우기, 수량 변경, 선택 상품 주문하기, 전체 상품 주문하기가 가능해야 해.
결제 페이지는 로그인 사용자만 진입 가능하게 하고,
배송지 입력, react-daum-postcode 주소 검색, giftInfo(선물 포장 / 쇼핑백 / 메시지), 카드/무통장 결제 선택, 주문 요약 사이드바, 결제 완료 후 order 저장과 장바구니 삭제까지 연결해줘.
```

## 23-5. 인증 / 마이페이지 / 고객지원 프롬프트

```txt
로그인, 회원가입, 계정찾기, 마이페이지, 고객지원 페이지를 만들어줘.
authSlice로 users, user, isLoggedIn, error를 관리하고,
테스트 회원 버튼은 test@aesoprenewal.com / testpassword123 을 자동 입력해줘.
마이페이지는 주문내역, 저장한 제품, 리뷰 관리, 문의/Q&A, 회원 정보, 배송지 관리 탭이 있어야 해.
고객지원 페이지는 Notice / FAQ / Contact / LiveChat / StoreLocator 구조로 구현해줘.
```

---

## 24. 정의된 완료 기준 (Definition of Done)

### 24-1. 화면

- [ ] Home 첫 화면에서 Header가 투명하게 Hero 위에 겹친다.
- [ ] Hero를 지나면 Header가 배경 있는 상태로 전환된다.
- [ ] 메인 페이지가 영상 Hero → 인트로 카피 → 베스트 제품 → 공간 비주얼 → 공식몰 한정 → 기프트 에디토리얼 → About → New Arrival → Product Navigator 흐름을 가진다.
- [ ] 섹션 간 간격이 spacing 토큰 기준으로 일관된다.
- [ ] 제품 카드가 제품 중심 비율의 정제된 카드다.
- [ ] 상세 페이지가 좌우 2컬럼 + sticky info 구조다.
- [ ] 장바구니/결제 요약이 우측 sticky 사이드바다.
- [ ] 마이페이지가 좌측 메뉴 + 우측 패널 구조다.

### 24-2. 기능

- [ ] 앱 시작 시 상품 JSON이 스토어에 들어간다.
- [ ] 제품 이미지를 scraper 기반 JSON에서 읽는다.
- [ ] 검색어로 상품 검색이 된다.
- [ ] 최근 검색어가 최대 5개 저장된다.
- [ ] 찜하기 토글이 된다.
- [ ] 리뷰 작성/수정/삭제가 된다.
- [ ] 문의/Q&A 작성/수정/삭제가 된다.
- [ ] 장바구니에 variant 조합 기준으로 담긴다.
- [ ] 선택 주문 / 전체 주문이 된다.
- [ ] 결제 시 giftInfo를 저장할 수 있다.

### 24-3. 영속성

- [ ] 새로고침 후 로그인 상태가 유지된다.
- [ ] 새로고침 후 장바구니가 유지된다.
- [ ] 새로고침 후 위시리스트가 유지된다.
- [ ] 새로고침 후 주문 내역이 유지된다.
- [ ] 새로고침 후 내가 쓴 리뷰/Q&A/문의가 유지된다.

### 24-4. 반응형

- [ ] 모바일에서 Header 높이와 메뉴 구조가 달라진다.
- [ ] Product Grid가 2열로 줄어든다.
- [ ] 상세 페이지가 1열로 떨어진다.
- [ ] Footer가 세로 스택으로 바뀐다.
- [ ] 모바일 메뉴가 전체 화면 오버레이로 동작한다.
- [ ] 모바일에서도 Home의 무드가 유지된다.

---

## 25. 약점과 보완 포인트

### 25-1. scraper 데이터 정합성

- scraper.js 결과 JSON의 필드명이 일정하지 않으면 제품 로더 단계에서 정규화가 필요하다.
- 이미지 누락, 중복, 썸네일/상세 이미지 분리가 필요한 경우 보정 로직이 필요하다.

### 25-2. 영상 Hero 퍼포먼스

- Home 영상 배경은 분위기를 크게 좌우하지만, 모바일에서 과한 용량은 UX를 해칠 수 있다.
- 대응:
  - poster 이미지 제공
  - 모바일 자동재생 최적화
  - lazy load 또는 source 분기

### 25-3. 메가메뉴 복잡도

- `PRODUCTS`는 정보 구조가 깊다.
- 모바일에서는 단계형 아코디언으로 단순화해야 한다.

### 25-4. Quick Add의 variant 문제

- variant 여러 개인 제품을 카드에서 바로 담기하면 잘못된 cart item이 생길 수 있다.
- 대응:
  - single variant만 Quick Add 허용
  - 나머지는 상세 또는 선택 레이어 유도

### 25-5. 검색 UX의 품질

- 제품명만 검색되면 부족할 수 있다.
- 추후 보완:
  - 향 노트 검색
  - 고민/효능 검색
  - 인기 검색어
  - 최근 본 제품

### 25-6. Share 버튼

- UI만 있고 실제 공유 액션이 없을 수 있다.
- `navigator.share` 또는 URL copy로 보완 가능

---

## 26. 최종 정리

이 프로젝트를 잘 재현하려면 아래 순서를 기억하면 된다.

1. **무드와 레이아웃을 먼저 맞춘다.**  
   영상 Hero, transparent header, 큰 타이포, 넓은 여백, full-bleed 비주얼이 먼저다.

2. **토큰 시스템을 먼저 고정한다.**  
   palette / typography / spacing이 먼저 잡혀야 전체 화면이 흔들리지 않는다.

3. **상품 구조를 variant 중심으로 바꾼다.**  
   이 프로젝트는 패션몰 구조가 아니라 variant, 향, 사용감, 패키징 중심이다.

4. **홈은 스토리형, 목록은 탐색형, 상세는 확신형 구조로 나눈다.**  
   각 페이지의 역할이 달라야 전체 UX가 매끄럽다.

5. **상태와 영속성으로 완성도를 만든다.**  
   예쁜 UI보다도 새로고침 후에도 유지되는 실제 상호작용이 결과물의 설득력을 높인다.
