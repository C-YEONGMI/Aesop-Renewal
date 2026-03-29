import { authInitialState } from './slices/authSlice';
import { cartInitialState } from './slices/cartSlice';
import { productInitialState } from './slices/productSlice';
import { wishlistInitialState } from './slices/wishlistSlice';
import { WISHLIST_STORAGE_KEY } from './persistence/wishlistPersistence';

const readPersistedState = (storageKey) => {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const rawValue = window.localStorage.getItem(storageKey);

        if (!rawValue) {
            return null;
        }

        const parsedValue = JSON.parse(rawValue);
        return parsedValue?.state ?? null;
    } catch {
        return null;
    }
};

export const createPreloadedState = () => {
    const legacyAuth = readPersistedState('aesop-auth');
    const legacyCart = readPersistedState('aesop-cart');
    const legacyProducts = readPersistedState('aesop-products');
    const legacyWishlist = readPersistedState(WISHLIST_STORAGE_KEY);
    const activeWishlistUserId = legacyAuth?.user?.id || null;
    const wishlistByUser = legacyWishlist?.wishlistByUser || {};
    const activeUserWishlist = activeWishlistUserId
        ? wishlistByUser[activeWishlistUserId]
        : [];

    return {
        auth: {
            ...authInitialState,
            ...(legacyAuth || {}),
            session: {
                ...authInitialState.session,
                userId: legacyAuth?.user?.id || null,
            },
        },
        product: {
            ...productInitialState,
            recentlyViewed: Array.isArray(legacyProducts?.recentlyViewed)
                ? legacyProducts.recentlyViewed
                : productInitialState.recentlyViewed,
        },
        cart: {
            ...cartInitialState,
            ...(legacyCart || {}),
            activeUserId: legacyAuth?.user?.id || null,
            cartItems: Array.isArray(legacyCart?.cartItems) ? legacyCart.cartItems : [],
            selectedSamples: Array.isArray(legacyCart?.selectedSamples)
                ? legacyCart.selectedSamples
                : [],
        },
        wishlist: {
            ...wishlistInitialState,
            ...(legacyWishlist || {}),
            activeUserId: activeWishlistUserId,
            wishlist: Array.isArray(activeUserWishlist)
                ? activeUserWishlist
                : Array.isArray(legacyWishlist?.wishlist)
                    ? legacyWishlist.wishlist
                    : [],
            wishlistByUser,
        },
    };
};
