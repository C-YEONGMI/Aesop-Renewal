import { authInitialState } from './slices/authSlice';
import { cartInitialState } from './slices/cartSlice';
import { productInitialState } from './slices/productSlice';
import { CART_STORAGE_KEY } from './persistence/cartPersistence';
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
    const legacyCart = readPersistedState(CART_STORAGE_KEY);
    const legacyProducts = readPersistedState('aesop-products');
    const legacyWishlist = readPersistedState(WISHLIST_STORAGE_KEY);
    const activeCartUserId = legacyAuth?.user?.id || null;
    const cartItemsByUser = legacyCart?.cartItemsByUser || {};
    const selectedSamplesByUser = legacyCart?.selectedSamplesByUser || {};
    const activeUserCartItems = activeCartUserId ? cartItemsByUser[activeCartUserId] : [];
    const activeUserSelectedSamples = activeCartUserId
        ? selectedSamplesByUser[activeCartUserId]
        : [];
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
            activeUserId: activeCartUserId,
            cartItems: Array.isArray(activeUserCartItems)
                ? activeUserCartItems
                : Array.isArray(legacyCart?.cartItems)
                    ? legacyCart.cartItems
                    : [],
            cartItemsByUser,
            selectedSamples: Array.isArray(activeUserSelectedSamples)
                ? activeUserSelectedSamples
                : Array.isArray(legacyCart?.selectedSamples)
                    ? legacyCart.selectedSamples
                    : [],
            selectedSamplesByUser,
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
