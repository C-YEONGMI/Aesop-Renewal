# GNB 리팩토링 — 추가 프롬프트 (메뉴 변경사항 + 3depth 제품 필터링)

> 이 프롬프트는 이전에 전달한 `gnb-refactor.md`의 **보충 자료**입니다.
> 메뉴 구조 변경사항, 제품 데이터 구조 변경, 3depth 클릭 시 제품 필터링 로직을 다룹니다.

---

## 1. 메뉴 구조 변경사항

이전 프롬프트에서 전달한 메뉴 트리에서 아래 항목이 변경되었습니다.

### 이름 변경

| 위치                          | 변경 전          | 변경 후            |
| ----------------------------- | ---------------- | ------------------ |
| Products > Skin care > 3depth | Toners           | **Toners & mists** |
| Products > Skin care > 3depth | Creams & lotions | **Moisturisers**   |
| Products > Skin care > 3depth | Serums & masques | **Serums & masks** |

### 메뉴 추가

| 위치                     | 추가 항목                                                                |
| ------------------------ | ------------------------------------------------------------------------ |
| Products > Kits > 3depth | **Fragrance kits** (기존: Skin care kits, Hand & body kits, Travel kits) |

### 최종 확정 메뉴 트리

```
DISCOVER [type: "simple"]
├── Gift finder
└── Fragrance finder

PRODUCTS [type: "mega"]
├── SKIN CARE
│   ├── Cleansers           (9개 제품)
│   ├── Toners & mists      (6개 제품)  ← 이름 변경
│   ├── Serums & masks      (12개 제품) ← 이름 변경
│   ├── Moisturisers        (11개 제품) ← 이름 변경
│   ├── Lip & eye care      (5개 제품)
│   └── Sun care            (6개 제품)
│
├── HAND & BODY
│   ├── Hand wash & balms   (5개 제품)
│   ├── Body cleansers      (1개 제품)
│   ├── Body balms & oils   (3개 제품)
│   └── Deodorants          (2개 제품)
│
├── FRAGRANCE
│   ├── Floral              (4개 제품)
│   ├── Fresh               (5개 제품)
│   ├── Woody               (7개 제품)
│   └── Opulent             (4개 제품)
│
├── HOME & LIVING
│   ├── Room sprays         (3개 제품)
│   ├── Incense & holders   (4개 제품)
│   ├── Oils & burners      (4개 제품)
│   ├── Candles             (3개 제품)
│   └── Bathroom            (1개 제품)
│
├── HAIR & SHAVING
│   ├── Shampoos & conditioners (3개 제품)
│   ├── Hair treatments     (5개 제품)
│   ├── Hair styling        (5개 제품)
│   └── Shaving             (6개 제품)
│
└── KITS
    ├── Skin care kits      (6개 제품)
    ├── Hand & body kits    (12개 제품)
    ├── Fragrance Kits         (6개 제품) ← 새로 추가
    └── Travel kits       (2개 제품)
BENEFITS [type: "simple"]
├── Online exclusive
└── Korea exclusive

OUR STORY [type: "link"]
```

---

## 2. 제품 데이터 구조 변경

### 기존 구조

```json
{
    "category": "SKIN CARE",
    "name": "프로텍티브 립 밤 SPF30",
    ...
}
```

### 변경된 구조 — `classifications` 필드 추가

```json
{
    "category": "SKIN CARE",
    "name": "프로텍티브 립 밤 SPF30",
    "classifications": [
        { "category": "Skin care", "subcategory": "Lip & eye care" },
        { "category": "Skin care", "subcategory": "Sun care" }
    ],
    ...
}
```

### classifications 필드 규칙

- 모든 제품에 `classifications` 배열이 존재함
- 배열의 각 요소는 `{ category, subcategory }` 쌍으로, 해당 제품이 노출될 메뉴 위치를 의미
- 대부분의 제품은 요소 1개 (메뉴 1곳에만 노출)
- 일부 제품은 요소 2개 이상 (여러 메뉴에 동시 노출). 케이스는 2가지:
    - 같은 category, 다른 subcategory (예: Skin care 안에서 Lip & eye care + Sun care)
    - 다른 category, 다른 subcategory (예: Skin care > Serums & masks + Hair & shaving > Shaving)
- **기존 `category` 필드는 제거하지 말 것** — 기존 코드에서 참조하는 곳이 있을 수 있음
- `classifications` 내의 category 값은 Sentence case (예: "Skin care"), 기존 `category` 필드는 대문자 (예: "SKIN CARE")

### 제품 데이터 파일

`products.json`을 수정했습니다.

---

## 3. 3depth 메뉴 클릭 시 제품 필터링

### 동작 정의

사용자가 GNB에서 3depth 메뉴를 클릭하면 해당 category + subcategory에 매칭되는 제품 목록 페이지로 이동합니다.

### 필터링 로직

```typescript
// 타입 정의
interface Classification {
    category: string; // "Skin care", "Hand & body", etc.
    subcategory: string; // "Cleansers", "Toners & mists", etc.
}

interface Product {
    category: string; // 기존 필드 (하위호환용, 대문자)
    classifications: Classification[]; // 신규 필드
    name: string;
    description: string;
    variants: Variant[];
    badge: string[];
    status: boolean;
    newestId: number;
    popularId: number;
}

// 필터링 함수
const getProductsByMenu = (
    products: Product[],
    category: string,
    subcategory: string
): Product[] => {
    return products.filter((product) =>
        product.classifications.some(
            (c) => c.category === category && c.subcategory === subcategory
        )
    );
};

// 사용 예시: "Skin care > Moisturisers" 메뉴 클릭 시
const results = getProductsByMenu(products, 'Skin care', 'Moisturisers');
// → 11개 제품 반환
```

### 라우팅 연결

3depth 메뉴 클릭 시의 URL 패턴과 필터링 파라미터 매핑:

```
/products/skincare/cleansers        → getProductsByMenu(products, "Skin care", "Cleansers")
/products/skincare/toners-mists     → getProductsByMenu(products, "Skin care", "Toners & mists")
/products/skincare/serums-masks     → getProductsByMenu(products, "Skin care", "Serums & masks")
/products/skincare/moisturisers     → getProductsByMenu(products, "Skin care", "Moisturisers")
/products/skincare/lip-eye-care     → getProductsByMenu(products, "Skin care", "Lip & eye care")
/products/skincare/sun-care         → getProductsByMenu(products, "Skin care", "Sun care")

/products/body/hand-wash-balms      → getProductsByMenu(products, "Hand & body", "Hand wash & balms")
/products/body/body-cleansers       → getProductsByMenu(products, "Hand & body", "Body cleansers")
/products/body/body-balms-oils      → getProductsByMenu(products, "Hand & body", "Body balms & oils")
/products/body/deodorants           → getProductsByMenu(products, "Hand & body", "Deodorants")

/products/fragrance/floral          → getProductsByMenu(products, "Fragrance", "Floral")
/products/fragrance/fresh           → getProductsByMenu(products, "Fragrance", "Fresh")
/products/fragrance/woody           → getProductsByMenu(products, "Fragrance", "Woody")
/products/fragrance/opulent         → getProductsByMenu(products, "Fragrance", "Opulent")

/products/home/room-sprays          → getProductsByMenu(products, "Home & living", "Room sprays")
/products/home/incense-holders      → getProductsByMenu(products, "Home & living", "Incense & holders")
/products/home/oils-burners         → getProductsByMenu(products, "Home & living", "Oils & burners")
/products/home/candles              → getProductsByMenu(products, "Home & living", "Candles")
/products/home/bathroom             → getProductsByMenu(products, "Home & living", "Bathroom")

/products/hair/shampoos-conditioners → getProductsByMenu(products, "Hair & shaving", "Shampoos & conditioners")
/products/hair/hair-treatments      → getProductsByMenu(products, "Hair & shaving", "Hair treatments")
/products/hair/hair-styling         → getProductsByMenu(products, "Hair & shaving", "Hair styling")
/products/hair/shaving              → getProductsByMenu(products, "Hair & shaving", "Shaving")

/products/kits/skin-care-kits       → getProductsByMenu(products, "Kits", "Skin care kits")
/products/kits/hand-body-kits       → getProductsByMenu(products, "Kits", "Hand & body kits")
/products/kits/travel-kits          → getProductsByMenu(products, "Kits", "Travel kits")
/products/kits/fragrance-kits       → getProductsByMenu(products, "Kits", "Fragrance kits")
```

### 기존 코드와의 호환

- 기존 `productCategories.js`의 `PRODUCT_CATEGORY_GROUPS`는 2depth 분류용으로 그대로 유지
- `PRODUCT_CATEGORY_GROUPS`의 slug 값(skincare, body, fragrance, home, hair, kits)은 URL의 2depth 부분과 일치시킬 것
- 기존 `inferProductCategoryLabel` 함수는 하위호환을 위해 유지하되, 3depth 필터링에는 `classifications` 필드를 사용
- 2depth 카테고리 페이지(예: `/products/skincare`)에서는 기존 방식대로 해당 카테고리 전체 제품을 표시하고, 3depth 페이지에서만 subcategory 필터링을 적용

### menuData와 classifications 값 일치 확인

menuData.ts의 메뉴 항목에 사용되는 category/subcategory 문자열과 products.json의 classifications 내 값이 정확히 일치해야 합니다. 오타가 하나라도 있으면 필터링이 안 됩니다.

menuData.ts에서 사용할 정확한 값 목록:

```typescript
// category 허용값 (classifications.category와 일치해야 함)
type Category =
    | 'Skin care'
    | 'Hand & body'
    | 'Fragrance'
    | 'Home & living'
    | 'Hair & shaving'
    | 'Kits';

// subcategory 허용값 (classifications.subcategory와 일치해야 함)
type Subcategory =
    | 'Cleansers'
    | 'Toners & mists'
    | 'Serums & masks'
    | 'Moisturisers'
    | 'Lip & eye care'
    | 'Sun care'
    | 'Hand wash & balms'
    | 'Body cleansers'
    | 'Body balms & oils'
    | 'Deodorants'
    | 'Floral'
    | 'Fresh'
    | 'Woody'
    | 'Opulent'
    | 'Room sprays'
    | 'Incense & holders'
    | 'Oils & burners'
    | 'Candles'
    | 'Bathroom'
    | 'Shampoos & conditioners'
    | 'Hair treatments'
    | 'Hair styling'
    | 'Shaving'
    | 'Skin care kits'
    | 'Hand & body kits'
    | 'Travel kits'
    | 'Fragrance kits';
```

---

## 4. 주의사항

- 기존 `category` 필드(대문자)를 삭제하거나 수정하지 말 것
- `classifications`의 category 값(Sentence case)과 기존 `category` 필드(대문자)는 다른 값이므로 혼용하지 말 것
- `productCategories.js`의 기존 함수들은 하위호환을 위해 유지
- 3depth가 없는 메뉴(Discover, Benefits, Our story)는 이 필터링 로직과 무관
- Bar soaps 메뉴는 메뉴 트리에서 제거되었음 (해당 제품 없음). 기존 코드에 참조가 있다면 함께 정리할 것
