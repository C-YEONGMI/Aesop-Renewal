// fix-images.js
// products.json의 제품 이미지 품질 개선 및 데이터 정리 스크립트
// - 저화질 쿼리 파라미터 제거 (고화질 원본 이미지로 전환)
// - base64 깨진 이미지를 실제 CDN URL로 교체
// - 가격 데이터 정리 (문자열 -> 숫자)
// - 중복 제품 제거
// - 추가: 잘못된 확장자(.jpg -> .png 등) 복구

import fs from 'fs';
import path from 'path';

const productsPath = './src/data/products.json';
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

// ============================================================
// 1단계: 이미지 URL 정리 함수
// ============================================================

/**
 * 이미지 URL에서 저화질 쿼리 파라미터를 제거합니다.
 * ?sw=195&sfrm=png&q=70&bgcolor=fffef2 같은 파라미터 제거
 */
function cleanImageUrl(url) {
    if (!url || url.startsWith('data:')) return url;

    try {
        const urlObj = new URL(url);
        // 쿼리 파라미터 전부 제거하여 원본 해상도 이미지 사용
        return urlObj.origin + urlObj.pathname;
    } catch {
        return url;
    }
}

// ============================================================
// 2단계: base64 깨진 이미지 교체 매핑
// ============================================================

const BASE = 'https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog';

const validUrlsByProductName = {};
for (const product of products) {
    for (const variant of product.variants) {
        if (variant.image && !variant.image.startsWith('data:')) {
            const cleanUrl = cleanImageUrl(variant.image);
            const key = product.name;
            if (!validUrlsByProductName[key]) {
                validUrlsByProductName[key] = {};
            }
            validUrlsByProductName[key][variant.capacity] = cleanUrl;
            if (!validUrlsByProductName[key]['_default']) {
                validUrlsByProductName[key]['_default'] = cleanUrl;
            }
        }
    }
}

const manualImageMap = {
    '엘레오스 아로마틱 핸드 밤': {
        '75 mL': `${BASE}/ko_KR/dw5f3af1b1/images/products/BM18/Aesop_Hand_Eleos_Aromatique_Hand_Balm_75mL_Web_Front_A_2000x2000px.png`,
        '500 mL': `${BASE}/ko_KR/dw46b3c2a0/images/products/BM18/Aesop_Hand_Eleos_Aromatique_Hand_Balm_500mL_Web_Front_2000x2000px.png`,
    },
    '레버런스 아로마틱 핸드 워시': {
        '500 mL (펌프 포함)': `${BASE}/ko_KR/dw9e1d4a73/images/products/BT17/Aesop_Hand_Reverence_Aromatique_Hand_Wash_500mL_Web_Front_2000x2000px.png`,
        '500 mL (펌프 미포함)': `${BASE}/ko_KR/dw9e1d4a73/images/products/BT17/Aesop_Hand_Reverence_Aromatique_Hand_Wash_500mL_Web_Front_2000x2000px.png`,
    },
};

// ============================================================
// 3단계: 가격 데이터 정리 함수
// ============================================================

function cleanPrice(price) {
    if (typeof price === 'number') return price;
    if (typeof price !== 'string') return 0;

    const matches = price.match(/[\d,]+/g);
    if (!matches) return 0;

    const lastMatch = matches[matches.length - 1];
    return parseInt(lastMatch.replace(/,/g, ''), 10) || 0;
}

// ============================================================
// 유효성 서버(HEAD) 체크 및 확장자 변경 로직 추가
// ============================================================
async function resolveAndCheckImage(imageUrl) {
    if (!imageUrl || imageUrl.startsWith('data:')) return imageUrl;

    try {
        let res = await fetch(imageUrl, { method: 'HEAD' });
        if (res.ok) return imageUrl;

        // .jpg -> .png 시도
        if (imageUrl.endsWith('.jpg')) {
            const pngUrl = imageUrl.replace('.jpg', '.png');
            res = await fetch(pngUrl, { method: 'HEAD' });
            if (res.ok) return pngUrl;
        }
        // .png -> .jpg 시도
        else if (imageUrl.endsWith('.png')) {
            const jpgUrl = imageUrl.replace('.png', '.jpg');
            res = await fetch(jpgUrl, { method: 'HEAD' });
            if (res.ok) return jpgUrl;
        }

        return imageUrl; // 둘 다 아니면 원본 반환
    } catch (e) {
        return imageUrl;
    }
}

// ============================================================
// 4단계: 모든 제품에 수정 적용 (비동기 수행)
// ============================================================

(async () => {
    let stats = {
        cleanedUrls: 0,
        replacedBase64: 0,
        unresolvedBase64: 0,
        cleanedPrices: 0,
        duplicatesRemoved: 0,
        extensionsFixed: 0,
    };

    console.log("🛠️ 이미지 상태 확인 및 수정 중입니다. 시간이 좀 걸릴 수 있습니다...");

    for (const product of products) {
        for (const variant of product.variants) {
            // --- 이미지 수정 ---
            let currentImage = variant.image;
            if (currentImage && currentImage.startsWith('data:')) {
                let resolved = false;

                if (manualImageMap[product.name]) {
                    const mapped = manualImageMap[product.name][variant.capacity];
                    if (mapped) {
                        currentImage = mapped;
                        resolved = true;
                        stats.replacedBase64++;
                    }
                }

                if (!resolved && validUrlsByProductName[product.name]) {
                    const lookup = validUrlsByProductName[product.name];
                    const url = lookup[variant.capacity] || lookup['_default'];
                    if (url) {
                        currentImage = url;
                        resolved = true;
                        stats.replacedBase64++;
                    }
                }

                if (!resolved) {
                    stats.unresolvedBase64++;
                }
            } else if (currentImage) {
                const cleaned = cleanImageUrl(currentImage);
                if (cleaned !== currentImage) {
                    currentImage = cleaned;
                    stats.cleanedUrls++;
                }
            }

            // 검증 및 확장자 수정
            if (currentImage && !currentImage.startsWith('data:')) {
                const finalUrl = await resolveAndCheckImage(currentImage);
                if (finalUrl !== variant.image) {
                    // 단, 파라미터가 정리된 것 외에 확장자가 변한 경우 카운트
                    if (cleanImageUrl(variant.image) !== finalUrl) {
                        stats.extensionsFixed++;
                    }
                    variant.image = finalUrl;
                }
            }


            // --- 가격 수정 ---
            if (typeof variant.price === 'string') {
                variant.price = cleanPrice(variant.price);
                stats.cleanedPrices++;
            }
        }
    }

    // ============================================================
    // 5단계: 중복 제품 제거
    // ============================================================

    const seen = new Set();
    const uniqueProducts = [];

    for (const product of products) {
        const key = `${product.category}|${product.name}`;
        if (seen.has(key)) {
            stats.duplicatesRemoved++;
            continue;
        }
        seen.add(key);
        uniqueProducts.push(product);
    }

    // ============================================================
    // 6단계: 결과 저장
    // ============================================================

    fs.writeFileSync(productsPath, JSON.stringify(uniqueProducts, null, 2), 'utf-8');

    console.log('\n🎉 수정 완료!');
    console.log(`  📸 저화질 URL 정리: ${stats.cleanedUrls}개`);
    console.log(`  🔗 잘못된 확장자 URL 복구(.jpg->.png 등): ${stats.extensionsFixed}개`);
    console.log(`  ✅ base64 이미지 교체: ${stats.replacedBase64}개`);
    console.log(`  ⚠️  base64 교체 실패: ${stats.unresolvedBase64}개`);
    console.log(`  💰 가격 데이터 정리: ${stats.cleanedPrices}개`);
    console.log(`  🗑️  중복 제품 제거: ${stats.duplicatesRemoved}개`);
    console.log(`  📦 총 제품 수: ${uniqueProducts.length}개`);
})();
