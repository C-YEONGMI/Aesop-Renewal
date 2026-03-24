import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { getCategoryLabelFromValue, inferProductCategoryLabel } from './src/data/productCategories.js';

const categories = [
    { name: getCategoryLabelFromValue('Skin Care'), url: 'https://kr.aesop.com/c/skin-care/' },
    { name: getCategoryLabelFromValue('Body & Hand'), url: 'https://kr.aesop.com/c/body-hand/' },
    { name: getCategoryLabelFromValue('Hair'), url: 'https://kr.aesop.com/c/hair/' },
    { name: getCategoryLabelFromValue('Fragrance'), url: 'https://kr.aesop.com/c/fragrance/' },
    { name: getCategoryLabelFromValue('Home'), url: 'https://kr.aesop.com/c/home/' },
    { name: getCategoryLabelFromValue('Gifts'), url: 'https://kr.aesop.com/kr/gifts/' },
    { name: getCategoryLabelFromValue('Travel'), url: 'https://kr.aesop.com/kr/travel/' },
];

const outputDir = path.join('.', 'src', 'data');
const outputPath = path.join(outputDir, 'products.json');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const BROKEN_IMAGE_URLS = new Map([
    [
        'https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog/ko_KR/dw76bc2cc6/images/products/SK52/Aesop-Skin-Protective-Lip-Balm-SPF30-5-5g-large.png',
        'https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog/ko_KR/dw76bc2cc6/images/products/SK52/Aesop-Skin-Protective-Lip-Balm-SPF30-5-5g-large.jpg?bgcolor=fffef2&q=70&sfrm=jpg&sh=430&sm=cut&sw=430',
    ],
]);
const normalizeImageUrl = (url = '') => {
    const nextUrl = BROKEN_IMAGE_URLS.get(url) || url;
    return nextUrl.includes('kr.aesop.com') && nextUrl.endsWith('.jpg') ? `${nextUrl.slice(0, -4)}.png` : nextUrl;
};

const dedupeProducts = (products) => {
    const groupedProducts = new Map();

    for (const product of products) {
        const key = product.name;
        const normalizedVariants = (product.variants || []).map((variant) => ({
            ...variant,
            image: normalizeImageUrl(variant.image),
        }));

        if (!groupedProducts.has(key)) {
            groupedProducts.set(key, {
                ...product,
                variants: [],
            });
        }

        const targetProduct = groupedProducts.get(key);
        const seenVariants = new Set(
            targetProduct.variants.map((variant) => `${variant.capacity}|${variant.price}|${variant.image}`)
        );

        for (const variant of normalizedVariants) {
            const variantKey = `${variant.capacity}|${variant.price}|${variant.image}`;
            if (!seenVariants.has(variantKey)) {
                seenVariants.add(variantKey);
                targetProduct.variants.push(variant);
            }
        }
    }

    return [...groupedProducts.values()];
};

const getExistingBadgeMap = () => {
    if (!fs.existsSync(outputPath)) {
        return new Map();
    }

    const existingProducts = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    const badgeMap = new Map();

    for (const product of existingProducts) {
        const key = product.name;
        if (!badgeMap.has(key)) {
            badgeMap.set(key, new Set());
        }

        for (const badge of Array.isArray(product.badge) ? product.badge : []) {
            badgeMap.get(key).add(badge);
        }
    }

    return new Map([...badgeMap.entries()].map(([key, badges]) => [key, [...badges]]));
};

const mergeBadges = (products, badgeMap) =>
    products.map((product) => ({
        ...product,
        category: inferProductCategoryLabel(product),
        variants: product.variants.map((variant) => ({
            ...variant,
            image: normalizeImageUrl(variant.image),
        })),
        badge: badgeMap.get(product.name) ?? [],
    }));

const scrapeCategoryProducts = async (page, category) => {
    console.log(`\n--- scraping ${category.name} ---`);
    await page.goto(category.url, { waitUntil: 'networkidle2', timeout: 60000 });

    let hasMore = true;
    while (hasMore) {
        const loadMoreButton = await page.$('a.c-load-more__button');

        if (!loadMoreButton) {
            hasMore = false;
            continue;
        }

        await page.evaluate(() => {
            const button = document.querySelector('a.c-load-more__button');
            if (button) {
                button.scrollIntoView({ behavior: 'auto', block: 'center' });
            }
        });

        const previousCount = await page.$$eval('.c-product-tile__wrapper', (items) => items.length);
        await delay(1000);
        await loadMoreButton.click();

        try {
            await page.waitForFunction(
                (prevCount) => document.querySelectorAll('.c-product-tile__wrapper').length > prevCount,
                { timeout: 8000 },
                previousCount
            );
            await delay(1500);
        } catch {
            hasMore = false;
        }
    }

    const products = await page.evaluate(async (categoryName) => {
        const tileSelector = '.c-product-tile__wrapper';
        const variantButtonSelector = '.c-variant-selector__item, .c-tag-list__item button';
        const selectSelector = 'select.c-select__field';
        const priceSelector = '.c-product-tile__price';
        const descriptionSelector = '.c-product-tile__description';

        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        const cleanImageUrl = (url) => {
            if (!url || url.startsWith('data:')) {
                return url;
            }
            return url;
        };

        const getLoadedImageUrl = (item) => {
            const image = item.querySelector('img');
            if (!image) {
                return '';
            }

            if (image.srcset) {
                const srcsetParts = image.srcset.split(',');
                const lastPart = srcsetParts[srcsetParts.length - 1]?.trim().split(' ')[0];
                if (lastPart && !lastPart.startsWith('data:')) {
                    return cleanImageUrl(lastPart);
                }
            }

            const dataSrc = image.getAttribute('data-src');
            if (dataSrc && !dataSrc.startsWith('data:')) {
                return cleanImageUrl(dataSrc);
            }

            if (image.src && !image.src.startsWith('data:')) {
                return cleanImageUrl(image.src);
            }

            return '';
        };

        const parsePrice = (priceText) => {
            if (typeof priceText === 'number') {
                return priceText;
            }

            if (!priceText) {
                return 0;
            }

            const matches = priceText.match(/[\d,]+/g);
            if (!matches) {
                return 0;
            }

            const lastMatch = matches[matches.length - 1];
            return Number.parseInt(lastMatch.replace(/,/g, ''), 10) || 0;
        };

        const items = Array.from(document.querySelectorAll(tileSelector));
        const results = [];

        for (const item of items) {
            const rawData = item.getAttribute('data-analytics');
            if (!rawData) {
                continue;
            }

            const parsedData = JSON.parse(rawData).products?.[0];
            if (!parsedData?.name) {
                continue;
            }

            const uiDescription = item.querySelector(descriptionSelector)?.innerText || '';
            const cleanDescription = uiDescription.includes('<table') ? '' : uiDescription.trim();

            const variantButtons = Array.from(item.querySelectorAll(variantButtonSelector));
            const selectField = item.querySelector(selectSelector);
            const variants = [];

            if (selectField) {
                for (const option of Array.from(selectField.options)) {
                    selectField.value = option.value;
                    selectField.dispatchEvent(new Event('change', { bubbles: true }));
                    await wait(2000);

                    const imageUrl = getLoadedImageUrl(item);
                    const priceText = item.querySelector(priceSelector)?.innerText || String(parsedData.price);

                    variants.push({
                        capacity: option.text.trim(),
                        price: parsePrice(priceText),
                        image: imageUrl || cleanImageUrl(parsedData.imgUrl) || '',
                    });
                }
            } else if (variantButtons.length > 1) {
                for (const button of variantButtons) {
                    button.click();
                    await wait(2000);

                    const imageUrl = getLoadedImageUrl(item);
                    const priceText = item.querySelector(priceSelector)?.innerText || String(parsedData.price);

                    variants.push({
                        capacity: button.innerText.trim(),
                        price: parsePrice(priceText),
                        image: imageUrl || cleanImageUrl(parsedData.imgUrl) || '',
                    });
                }
            } else {
                const imageUrl = getLoadedImageUrl(item);
                variants.push({
                    capacity: parsedData.variant || 'Single Size',
                    price: parsePrice(String(parsedData.price)),
                    image: imageUrl || cleanImageUrl(parsedData.imgUrl) || '',
                });
            }

            results.push({
                category: categoryName,
                name: parsedData.name,
                description: cleanDescription,
                variants,
            });
        }

        return results;
    }, category.name);

    console.log(`${category.name}: scraped ${products.length} products`);
    return products;
};

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        );
        await page.setViewport({ width: 1400, height: 1000 });

        let allProducts = [];
        for (const category of categories) {
            const categoryProducts = await scrapeCategoryProducts(page, category);
            allProducts = [...allProducts, ...categoryProducts];
        }

        const badgeMap = getExistingBadgeMap();
        const uniqueProducts = dedupeProducts(allProducts);
        const mergedProducts = mergeBadges(uniqueProducts, badgeMap);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputPath, JSON.stringify(mergedProducts, null, 2));
        console.log(`\nDone. Saved ${mergedProducts.length} products to ${outputPath}`);
    } catch (error) {
        console.error('Scrape failed:', error);
        process.exitCode = 1;
    } finally {
        await browser.close();
    }
})();
