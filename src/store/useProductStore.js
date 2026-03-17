import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import productsData from '../data/products.json';

// 상품 스토어
const useProductStore = create(
    persist(
        (set, get) => ({
            products: productsData,
            recentlyViewed: [], // 최근 본 상품

            // 카테고리별 필터
            getByCategory: (category) => {
                return get().products.filter(p =>
                    p.category.toLowerCase().replace(/\s/g, '') === category.toLowerCase().replace(/\s/g, '')
                );
            },

            // 배지별 필터
            getByBadge: (badge) => {
                return get().products.filter(p => p.badge.includes(badge));
            },

            // 상품명으로 검색
            searchProducts: (query) => {
                const q = query.toLowerCase();
                return get().products.filter(p =>
                    p.name.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q)
                );
            },

            // 최근 본 상품 추가
            addRecentlyViewed: (productName) => {
                const recent = get().recentlyViewed;
                const filtered = recent.filter(n => n !== productName);
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
