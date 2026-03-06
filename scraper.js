import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

(async () => {
    const browser = await puppeteer.launch({
        headless: false, // 진행 과정을 눈으로 확인하세요!
        args: ['--no-sandbox'],
    });

    // 1. 수집하고 싶은 모든 카테고리 주소 정의
    const categories = [
        { name: 'Skin Care', url: 'https://kr.aesop.com/c/skin-care/' },
        { name: 'Body & Hand', url: 'https://kr.aesop.com/c/body-hand/' },
        { name: 'Hair', url: 'https://kr.aesop.com/c/hair/' },
        { name: 'Fragrance', url: 'https://kr.aesop.com/c/fragrance/' },
        { name: 'Home', url: 'https://kr.aesop.com/c/home/' },
    ];

    let allProducts = [];

    try {
        const page = await browser.newPage();
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        );
        await page.setViewport({ width: 1400, height: 1000 });

        for (const category of categories) {
            console.log(`\n--- [${category.name}] 수집 시작 ---`);
            await page.goto(category.url, { waitUntil: 'load', timeout: 60000 });

            let hasMore = true;
            while (hasMore) {
                // 현재 로드된 상품 수 확인
                const currentCount = await page.$$eval(
                    '.c-product-tile__wrapper',
                    (el) => el.length
                );

                // 영미님이 찾으신 '더 보기' 버튼 찾기
                const loadMoreButton = await page.$('a.c-load-more__button');

                if (loadMoreButton) {
                    console.log(`${category.name}: ${currentCount}개 로드됨. 버튼 클릭 중...`);

                    // 버튼 위치로 스크롤 후 클릭
                    await page.evaluate(() => {
                        const btn = document.querySelector('a.c-load-more__button');
                        if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    });

                    await new Promise((r) => setTimeout(r, 1000));
                    await loadMoreButton.click();

                    // 새로운 상품이 나타날 때까지 대기
                    try {
                        await page.waitForFunction(
                            (prev) =>
                                document.querySelectorAll('.c-product-tile__wrapper').length > prev,
                            { timeout: 8000 },
                            currentCount
                        );
                        await new Promise((r) => setTimeout(r, 1500));
                    } catch (e) {
                        hasMore = false;
                    }
                } else {
                    console.log(`${category.name}: 모든 제품 로드 완료 (${currentCount}개)`);
                    hasMore = false;
                }
            }

            // 해당 카테고리 데이터 추출 (data-analytics 활용)
            const categoryProducts = await page.evaluate((catName) => {
                const items = Array.from(document.querySelectorAll('.c-product-tile__wrapper'));
                return items
                    .map((item) => {
                        const rawData = item.getAttribute('data-analytics');
                        if (!rawData) return null;
                        const parsedData = JSON.parse(rawData);
                        const p = parsedData.products[0];
                        return {
                            category: catName, // 리액트에서 필터링할 때 사용
                            name: p.name,
                            price: p.price,
                            image: p.imgUrl,
                            description: p.description,
                        };
                    })
                    .filter((p) => p !== null);
            }, category.name);

            allProducts = [...allProducts, ...categoryProducts];
        }

        // 2. 최종 결과 저장 (src/data/products.json)
        // scraper.js 위치에 따라 경로를 조정하세요. (현재 최상위 기준)
        const dir = './src/data';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'products.json'), JSON.stringify(allProducts, null, 2));

        console.log(
            `\n🎉 전 카테고리 수집 성공! 총 ${allProducts.length}개의 데이터를 저장했습니다.`
        );
    } catch (error) {
        console.error('수집 중 에러 발생:', error.message);
    } finally {
        await browser.close();
    }
})();
