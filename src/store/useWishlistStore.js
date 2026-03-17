import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 위시리스트 스토어
const useWishlistStore = create(
    persist(
        (set, get) => ({
            wishlist: [], // 상품명 배열

            // 위시리스트 토글
            toggleWishlist: (productName) => {
                const list = get().wishlist;
                if (list.includes(productName)) {
                    set({ wishlist: list.filter(n => n !== productName) });
                } else {
                    set({ wishlist: [...list, productName] });
                }
            },

            // 위시리스트 여부 확인
            isWishlisted: (productName) => get().wishlist.includes(productName),

            // 전체 제거
            clearWishlist: () => set({ wishlist: [] }),
        }),
        {
            name: 'aesop-wishlist',
            partialize: (state) => ({ wishlist: state.wishlist }),
        }
    )
);

export default useWishlistStore;
