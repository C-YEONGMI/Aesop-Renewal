import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useAuthStore from './useAuthStore';

const getActiveUserKey = () => useAuthStore.getState().user?.id || null;

const getUserWishlist = (wishlistByUser, userKey) => {
    if (!userKey) {
        return [];
    }

    const value = wishlistByUser?.[userKey];
    return Array.isArray(value) ? value : [];
};

const syncWishlistStateWithAuth = () => {
    const userKey = getActiveUserKey();
    const state = useWishlistStore.getState();

    useWishlistStore.setState({
        wishlist: getUserWishlist(state.wishlistByUser, userKey),
    });
};

const useWishlistStore = create(
    persist(
        (set, get) => ({
            wishlist: [],
            wishlistByUser: {},

            toggleWishlist: (productName) => {
                const list = get().wishlist;
                const nextWishlist = list.includes(productName)
                    ? list.filter((name) => name !== productName)
                    : [...list, productName];
                const userKey = getActiveUserKey();

                set((state) => ({
                    wishlist: nextWishlist,
                    wishlistByUser: userKey
                        ? {
                              ...(state.wishlistByUser || {}),
                              [userKey]: nextWishlist,
                          }
                        : state.wishlistByUser,
                }));
            },

            isWishlisted: (productName) => get().wishlist.includes(productName),

            clearWishlist: () => {
                const userKey = getActiveUserKey();

                set((state) => ({
                    wishlist: [],
                    wishlistByUser: userKey
                        ? {
                              ...(state.wishlistByUser || {}),
                              [userKey]: [],
                          }
                        : state.wishlistByUser,
                }));
            },
        }),
        {
            name: 'aesop-wishlist',
            partialize: (state) => ({
                wishlist: state.wishlist,
                wishlistByUser: state.wishlistByUser,
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

    syncWishlistStateWithAuth();
});

syncWishlistStateWithAuth();

export default useWishlistStore;
