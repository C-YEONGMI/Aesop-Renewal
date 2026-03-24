import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useAuthStore from './useAuthStore';

const getActiveUserKey = () => useAuthStore.getState().user?.id || null;

const getUserScopedValue = (collection, userKey, fallback = []) => {
    if (!userKey) {
        return fallback;
    }

    const value = collection?.[userKey];
    return Array.isArray(value) ? value : fallback;
};

const buildNextUserCollection = (collection, userKey, value) => {
    if (!userKey) {
        return collection || {};
    }

    return {
        ...(collection || {}),
        [userKey]: value,
    };
};

const syncCartStateWithAuth = () => {
    const userKey = getActiveUserKey();
    const state = useCartStore.getState();

    useCartStore.setState({
        cartItems: getUserScopedValue(state.cartItemsByUser, userKey),
        selectedSamples: getUserScopedValue(state.selectedSamplesByUser, userKey),
        isCartDialogOpen: false,
        cartDialogItem: null,
    });
};

const useCartStore = create(
    persist(
        (set, get) => ({
            cartItems: [],
            cartItemsByUser: {},
            isCartDialogOpen: false,
            cartDialogItem: null,
            selectedSamples: [],
            selectedSamplesByUser: {},

            addToCart: (product, variantIndex = 0, options = {}) => {
                const { showDialog = true, preserveDialog = false } = options;
                const variant = product.variants[variantIndex];
                const cartId = `${product.name}-${variantIndex}`;
                const items = get().cartItems;
                const existing = items.find((item) => item.cartId === cartId);
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
                    ? items.map((item) =>
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
                const userKey = getActiveUserKey();

                set((state) => ({
                    cartItems: nextCartItems,
                    cartItemsByUser: buildNextUserCollection(
                        state.cartItemsByUser,
                        userKey,
                        nextCartItems
                    ),
                    isCartDialogOpen: preserveDialog
                        ? currentDialogState.isCartDialogOpen
                        : showDialog,
                    cartDialogItem: preserveDialog
                        ? currentDialogState.cartDialogItem
                        : showDialog
                          ? cartDialogItem
                          : null,
                }));
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

            updateQuantity: (cartId, quantity) => {
                if (quantity < 1) return;

                const nextCartItems = get().cartItems.map((item) =>
                    item.cartId === cartId ? { ...item, quantity } : item
                );
                const userKey = getActiveUserKey();

                set((state) => ({
                    cartItems: nextCartItems,
                    cartItemsByUser: buildNextUserCollection(
                        state.cartItemsByUser,
                        userKey,
                        nextCartItems
                    ),
                }));
            },

            removeItem: (cartId) => {
                const nextCartItems = get().cartItems.filter((item) => item.cartId !== cartId);
                const userKey = getActiveUserKey();

                set((state) => ({
                    cartItems: nextCartItems,
                    cartItemsByUser: buildNextUserCollection(
                        state.cartItemsByUser,
                        userKey,
                        nextCartItems
                    ),
                }));
            },

            toggleCheck: (cartId) => {
                const nextCartItems = get().cartItems.map((item) =>
                    item.cartId === cartId ? { ...item, checked: !item.checked } : item
                );
                const userKey = getActiveUserKey();

                set((state) => ({
                    cartItems: nextCartItems,
                    cartItemsByUser: buildNextUserCollection(
                        state.cartItemsByUser,
                        userKey,
                        nextCartItems
                    ),
                }));
            },

            toggleAll: (checked) => {
                const nextCartItems = get().cartItems.map((item) => ({ ...item, checked }));
                const userKey = getActiveUserKey();

                set((state) => ({
                    cartItems: nextCartItems,
                    cartItemsByUser: buildNextUserCollection(
                        state.cartItemsByUser,
                        userKey,
                        nextCartItems
                    ),
                }));
            },

            removeChecked: () => {
                const nextCartItems = get().cartItems.filter((item) => !item.checked);
                const userKey = getActiveUserKey();

                set((state) => ({
                    cartItems: nextCartItems,
                    cartItemsByUser: buildNextUserCollection(
                        state.cartItemsByUser,
                        userKey,
                        nextCartItems
                    ),
                }));
            },

            removeOrderedItems: (cartIds) => {
                const nextCartItems = get().cartItems.filter(
                    (item) => !cartIds.includes(item.cartId)
                );
                const userKey = getActiveUserKey();

                set((state) => ({
                    cartItems: nextCartItems,
                    cartItemsByUser: buildNextUserCollection(
                        state.cartItemsByUser,
                        userKey,
                        nextCartItems
                    ),
                }));
            },

            toggleSample: (sampleId) => {
                const current = get().selectedSamples;
                const nextSamples = current.includes(sampleId)
                    ? current.filter((id) => id !== sampleId)
                    : [...current, sampleId];
                const userKey = getActiveUserKey();

                set((state) => ({
                    selectedSamples: nextSamples,
                    selectedSamplesByUser: buildNextUserCollection(
                        state.selectedSamplesByUser,
                        userKey,
                        nextSamples
                    ),
                }));
            },

            clearSamples: () => {
                const userKey = getActiveUserKey();

                set((state) => ({
                    selectedSamples: [],
                    selectedSamplesByUser: buildNextUserCollection(
                        state.selectedSamplesByUser,
                        userKey,
                        []
                    ),
                }));
            },

            clearCart: () => {
                const userKey = getActiveUserKey();

                set((state) => ({
                    cartItems: [],
                    selectedSamples: [],
                    cartItemsByUser: buildNextUserCollection(
                        state.cartItemsByUser,
                        userKey,
                        []
                    ),
                    selectedSamplesByUser: buildNextUserCollection(
                        state.selectedSamplesByUser,
                        userKey,
                        []
                    ),
                }));
            },
        }),
        {
            name: 'aesop-cart',
            partialize: (state) => ({
                cartItems: state.cartItems,
                cartItemsByUser: state.cartItemsByUser,
                selectedSamples: state.selectedSamples,
                selectedSamplesByUser: state.selectedSamplesByUser,
            }),
        }
    )
);

useAuthStore.subscribe((state, previousState) => {
    const previousUserId = previousState.user?.id || null;
    const nextUserId = state.user?.id || null;

    if (previousUserId === nextUserId && previousState.isLoggedIn === state.isLoggedIn) {
        return;
    }

    syncCartStateWithAuth();
});

syncCartStateWithAuth();

export default useCartStore;
