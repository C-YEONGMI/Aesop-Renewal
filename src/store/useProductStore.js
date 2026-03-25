import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import productsData from '../data/products.json';
import protectiveLipBalmSpf30Image from '../assets/Protective Lip Balm SPF30.png';
import { inferProductCategoryLabel, normalizeCategoryValue } from '../data/productCategories';

const BROKEN_IMAGE_URLS = new Map([
    [
        'https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog/ko_KR/dw76bc2cc6/images/products/SK52/Aesop-Skin-Protective-Lip-Balm-SPF30-5-5g-large.png',
        'https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog/ko_KR/dw76bc2cc6/images/products/SK52/Aesop-Skin-Protective-Lip-Balm-SPF30-5-5g-large.jpg?bgcolor=fffef2&q=70&sfrm=jpg&sh=430&sm=cut&sw=430',
    ],
    ['/src/assets/Protective Lip Balm SPF30.png', protectiveLipBalmSpf30Image],
]);
const normalizeImageUrl = (url = '') => BROKEN_IMAGE_URLS.get(url) || url;

const normalizeProductData = (products) =>
    products.map((product) => ({
        ...product,
        category: inferProductCategoryLabel(product),
        badge: Array.isArray(product.badge) ? product.badge : [],
        variants: Array.isArray(product.variants)
            ? product.variants.map((variant) => ({
                ...variant,
                image: normalizeImageUrl(variant.image),
            }))
            : [],
    }));

const useProductStore = create(
    persist(
        (set, get) => ({
            products: normalizeProductData(productsData.products || []),
            giftFilters: Array.isArray(productsData.giftFilters) ? productsData.giftFilters : [],
            recentlyViewed: [],

            getByCategory: (category) =>
                get().products.filter(
                    (product) =>
                        normalizeCategoryValue(product.category) ===
                        normalizeCategoryValue(category)
                ),

            getByBadge: (badge) => get().products.filter((product) => product.badge.includes(badge)),

            searchProducts: (query) => {
                const normalizedQuery = query.toLowerCase();

                return get().products.filter(
                    (product) =>
                        product.name.toLowerCase().includes(normalizedQuery) ||
                        product.description.toLowerCase().includes(normalizedQuery) ||
                        product.category.toLowerCase().includes(normalizedQuery)
                );
            },

            addRecentlyViewed: (productName) => {
                const recent = get().recentlyViewed;
                const filtered = recent.filter((name) => name !== productName);

                set({ recentlyViewed: [productName, ...filtered].slice(0, 10) });
            },
        }),
        {
            name: 'aesop-products',
            partialize: (state) => ({ recentlyViewed: state.recentlyViewed }),
        }
    )
);

export default useProductStore;
