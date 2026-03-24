import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 장바구니 스토어
// cartId = productId + '-' + variantIndex (variant 기준 구분)
const useCartStore = create(
    persist(
        (set, get) => ({
            cartItems: [], // { cartId, productId, name, image, category, variant, quantity, price }
            isCartDialogOpen: false,
            cartDialogItem: null,
            selectedSamples: [],

            // 장바구니 담기
            addToCart: (product, variantIndex = 0, options = {}) => {
                const { showDialog = true, preserveDialog = false } = options;
                const variant = product.variants[variantIndex];
                const cartId = `${product.name}-${variantIndex}`;
                const items = get().cartItems;
                const existing = items.find(item => item.cartId === cartId);
                const currentDialogState = {
                    isCartDialogOpen: get().isCartDialogOpen,
                    cartDialogItem: get().cartDialogItem,
                };
                const cartDialogItem = {
                    cartId,
                    productName: product.name,
                    category: product.category,
                    image: variant.image,
                    variant: variant.capacity || '',
                    price: variant.price,
                };
                const nextCartItems = existing
                    ? items.map(item =>
                        item.cartId === cartId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                    : [
                        ...items,
                        {
                            cartId,
                            productName: product.name,
                            category: product.category,
                            image: variant.image,
                            variant: variant.capacity || '',
                            quantity: 1,
                            price: variant.price,
                            checked: true,
                        },
                    ];

                set({
                    cartItems: nextCartItems,
                    isCartDialogOpen: preserveDialog
                        ? currentDialogState.isCartDialogOpen
                        : showDialog,
                    cartDialogItem: preserveDialog
                        ? currentDialogState.cartDialogItem
                        : showDialog
                            ? cartDialogItem
                            : null,
                });
            },

            openCartDialog: (cartDialogItem) => {
                set({
                    isCartDialogOpen: true,
                    cartDialogItem,
                });
            },

            closeCartDialog: () => {
                set({
                    isCartDialogOpen: false,
                    cartDialogItem: null,
                });
            },

            // 수량 변경
            updateQuantity: (cartId, quantity) => {
                if (quantity < 1) return;
                set({
                    cartItems: get().cartItems.map(item =>
                        item.cartId === cartId ? { ...item, quantity } : item
                    ),
                });
            },

            // 개별 삭제
            removeItem: (cartId) => {
                set({ cartItems: get().cartItems.filter(item => item.cartId !== cartId) });
            },

            // 선택 상태 토글
            toggleCheck: (cartId) => {
                set({
                    cartItems: get().cartItems.map(item =>
                        item.cartId === cartId ? { ...item, checked: !item.checked } : item
                    ),
                });
            },

            // 전체 선택/해제
            toggleAll: (checked) => {
                set({ cartItems: get().cartItems.map(item => ({ ...item, checked })) });
            },

            // 선택 삭제
            removeChecked: () => {
                set({ cartItems: get().cartItems.filter(item => !item.checked) });
            },

            // 주문 완료 후 선택 항목 제거
            removeOrderedItems: (cartIds) => {
                set({ cartItems: get().cartItems.filter(item => !cartIds.includes(item.cartId)) });
            },

            // 샘플 선택 토글
            toggleSample: (sampleId) => {
                const current = get().selectedSamples;
                set({
                    selectedSamples: current.includes(sampleId)
                        ? current.filter((id) => id !== sampleId)
                        : [...current, sampleId],
                });
            },

            // 샘플 초기화
            clearSamples: () => set({ selectedSamples: [] }),

            // 전체 비우기
            clearCart: () => set({ cartItems: [], selectedSamples: [] }),
        }),
        {
            name: 'aesop-cart',
            partialize: (state) => ({ cartItems: state.cartItems }),
        }
    )
);

export default useCartStore;
