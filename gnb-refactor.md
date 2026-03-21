# GNB(Global Navigation Bar) 반응형 메뉴 구현 프롬프트

## 작업 개요

기존 프로젝트의 GNB를 아래 메뉴 구조와 반응형 패턴으로 리팩토링해야 합니다.
**기존 코드를 먼저 파악한 후** 최소한의 변경으로 적용해주세요.

---

## Phase 1: 기존 코드베이스 파악

작업 전에 반드시 다음을 확인하고, 파악한 내용을 요약해주세요:

1. **프로젝트 기술 스택**: aesop_guide.md 파일을 확인해주세요.
2. **기존 GNB 파일 위치**: 헤더/네비게이션 관련 컴포넌트 파일들의 경로
3. **기존 메뉴 데이터 구조**: 메뉴 데이터가 하드코딩인지, JSON/CMS에서 오는지, 어떤 형태인지
4. **기존 반응형 처리 방식**: breakpoint 기준, 모바일 메뉴 토글 방식
5. **기존 드롭다운/서브메뉴 구현**: hover/click 이벤트 처리, 애니메이션 방식
6. **라우팅 구조**: URL 패턴 (예: `/products/skin-care/cleansers`)

파악이 끝나면 "기존 구조를 파악했습니다. [요약]" 형태로 알려주세요.
**파악 전에 코드를 수정하지 마세요.**

---

## Phase 2: 메뉴 데이터 구조

아래 메뉴 트리를 단일 데이터 소스(single source of truth)로 구성합니다.
각 1depth 메뉴에는 `type` 필드를 두어 Desktop에서의 드롭다운 유형을 결정합니다.

```
type: "mega"    → MegaMenu 컴포넌트 (전체 너비 패널, 컬럼 그리드)
type: "simple"  → SimpleDropdown 컴포넌트 (좁은 드롭다운)
type: "link"    → 드롭다운 없이 바로 페이지 이동
```

### 전체 메뉴 트리

```
DISCOVER [type: "simple"]
├── Gift finder          → /discover/gift-finder
└── Fragrance finder     → /discover/fragrance-finder

PRODUCTS [type: "mega"]
├── SKIN CARE
│   ├── Cleansers        → /products/skin-care/cleansers
│   ├── Toners           → /products/skin-care/toners
│   ├── Serums & masks   → /products/skin-care/serums-masks
│   ├── Creams & lotions → /products/skin-care/creams-lotions
│   ├── Lip & eye care   → /products/skin-care/lip-eye-care
│   └── Sun care         → /products/skin-care/sun-care
│
├── HAND & BODY
│   ├── Hand wash & balms → /products/hand-body/hand-wash-balms
│   ├── Body cleansers    → /products/hand-body/body-cleansers
│   ├── Body balms & oils → /products/hand-body/body-balms-oils
│   ├── Bar soaps         → /products/hand-body/bar-soaps
│   └── Deodorants        → /products/hand-body/deodorants
│
├── FRAGRANCE
│   ├── Floral    → /products/fragrance/floral
│   ├── Fresh     → /products/fragrance/fresh
│   ├── Woody     → /products/fragrance/woody
│   └── Opulent   → /products/fragrance/opulent
│
├── HOME & LIVING
│   ├── Room sprays       → /products/home-living/room-sprays
│   ├── Incense & holders → /products/home-living/incense-holders
│   ├── Oils & burners    → /products/home-living/oils-burners
│   ├── Candles           → /products/home-living/candles
│   └── Bathroom          → /products/home-living/bathroom
│
├── HAIR & SHAVING
│   ├── Shampoos & conditioners → /products/hair-shaving/shampoos-conditioners
│   ├── Hair treatments         → /products/hair-shaving/hair-treatments
│   ├── Hair styling            → /products/hair-shaving/hair-styling
│   └── Shaving                 → /products/hair-shaving/shaving
│
└── KITS
    ├── Skin care kits    → /products/kits/skin-care-kits
    ├── Hand & body kits  → /products/kits/hand-body-kits
    └── Travel kits       → /products/kits/travel-kits

BENEFITS [type: "simple"]
├── Online exclusive → /benefits/online-exclusive
└── Korea exclusive  → /benefits/korea-exclusive

OUR STORY [type: "link"]
→ /our-story
```

---

## Phase 3: 반응형 GNB 구현

### Breakpoint 기준 (기존 프로젝트의 breakpoint를 우선 따르되, 없으면 아래 기준 사용)

- Desktop: 1024px 이상
- Mobile/Tablet: 1023px 이하 (동일한 컴포넌트 사용)

### Desktop (1024px 이상) — 가로형 GNB

**1depth**: 가로 바에 나열 (Discover, Products, Benefits, Our story)

**type별 hover 동작**:

- **"mega" (Products)**: 전체 너비 mega menu 패널이 열림
    - 2depth(Skin care, Hand & body 등)를 컬럼 헤더로 표시
    - 3depth를 각 컬럼 아래 리스트로 표시
    - 컬럼 배치: 상단 4개(Skin care, Hand & body, Fragrance, Home & living) + 하단 2개(Hair & shaving, Kits)
    - 상단/하단은 구분선으로 분리

- **"simple" (Discover, Benefits)**: 좁은 드롭다운
    - 1depth 메뉴 바로 아래에 해당 메뉴 너비 정도의 작은 드롭다운
    - 하위 항목만 세로로 나열

- **"link" (Our story)**: hover 시 드롭다운 없음, 클릭 시 바로 페이지 이동

**접근성/UX 참고사항**:

- hover로 열리되, 클릭으로도 열릴 수 있어야 함 (터치스크린 대응)
- 메뉴 영역 밖으로 마우스가 나가면 닫힘
- ESC 키로 닫힘
- 열린 메뉴가 있을 때 다른 1depth에 hover하면 즉시 전환

### Mobile / Tablet (1023px 이하) — 드릴다운 방식

햄버거 메뉴 → 전체 화면 또는 사이드 패널로 메뉴 열림

**드릴다운 패턴**:

- 1depth 화면: Discover, Products, Benefits, Our story 표시
- children이 있는 항목 탭 → 화면이 전환되며 해당 children 표시 (슬라이드 애니메이션)
- 상단에 "← Back" 버튼으로 이전 depth로 복귀
- children이 없는 항목(Our story, 3depth 최종 항목) 탭 → 페이지 이동

**Mobile에서는 type 구분 불필요**: children 유무로만 분기

- children 있음 → 다음 화면으로 드릴다운
- children 없음 → 페이지 이동

---

## Phase 4: 파일 구조 권장안

기존 프로젝트 구조에 맞춰 조정하되, 아래 관심사 분리를 유지해주세요:

```
components/gnb/
├── GNB.tsx                 # 메인 컨트롤러 (breakpoint 감지, Desktop/Mobile 분기)
├── DesktopNav.tsx          # Desktop 가로형 GNB (type별 드롭다운 분기 로직)
├── MobileNav.tsx           # Mobile/Tablet 드릴다운 wrapper
├── dropdowns/
│   ├── MegaMenu.tsx        # Products용 전체 너비 컬럼 그리드
│   └── SimpleDropdown.tsx  # Discover, Benefits용 좁은 드롭다운
├── mobile/
│   ├── DrillPanel.tsx      # 1depth 리스트 화면
│   └── DrillSubPanel.tsx   # 2depth/3depth 화면 (재귀 가능)
├── menuData.ts             # 메뉴 JSON 데이터 (single source of truth)
├── useGNB.ts               # 상태 관리 훅 (open/close, active depth 등)
└── types.ts                # MenuItem, MenuType 타입 정의
```

**핵심 원칙**:

- menuData.ts 하나가 Desktop과 Mobile 모두에서 사용됨
- Desktop은 `type` 필드로 드롭다운 컴포넌트를 분기
- Mobile은 `children` 유무로만 드릴다운 여부를 결정
- 메뉴 항목 추가/삭제 시 menuData.ts만 수정하면 양쪽 모두 반영됨

---

## 주의사항

- 기존 프로젝트의 스타일링 방식(Tailwind, SCSS 등)을 그대로 따라주세요
- 기존 프로젝트에 이미 있는 유틸리티(breakpoint hook, transition 컴포넌트 등)가 있으면 활용해주세요
- 새 패키지 설치는 최소화해주세요
- URL 경로는 기존 프로젝트의 라우팅 패턴에 맞춰 조정해주세요 (위 경로는 예시입니다)
- 접근성: 키보드 네비게이션, aria-expanded, aria-haspopup, role="menu" 등 적용
