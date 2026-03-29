import { persistWishlistState } from '../persistence/wishlistPersistence';
import { selectActiveWishlistUserId } from '../selectors/wishlistSelectors';
import { setActiveWishlistUser } from '../slices/wishlistSlice';
import useAuthStore from '../../../store/useAuthStore';

const getCurrentAuthUserId = () => useAuthStore.getState().user?.id || null;

export const initializeWishlistBridge = (store) => {
    let previousPersistedSnapshot = null;
    let previousAuthUserId = getCurrentAuthUserId();

    store.dispatch(setActiveWishlistUser(previousAuthUserId));

    useAuthStore.subscribe((state, previousState) => {
        const previousUserId = previousState.user?.id || null;
        const nextUserId = state.user?.id || null;

        if (previousUserId === nextUserId && previousState.isLoggedIn === state.isLoggedIn) {
            return;
        }

        previousAuthUserId = nextUserId;

        if (selectActiveWishlistUserId(store.getState()) !== nextUserId) {
            store.dispatch(setActiveWishlistUser(nextUserId));
        }
    });

    return store.subscribe(() => {
        const state = store.getState();
        const wishlistState = state.wishlist;
        const nextAuthUserId = getCurrentAuthUserId();

        if (selectActiveWishlistUserId(state) !== nextAuthUserId && previousAuthUserId !== nextAuthUserId) {
            previousAuthUserId = nextAuthUserId;
            store.dispatch(setActiveWishlistUser(nextAuthUserId));
            return;
        }

        const nextPersistedSnapshot = JSON.stringify({
            wishlist: wishlistState.wishlist,
            wishlistByUser: wishlistState.wishlistByUser,
        });

        if (nextPersistedSnapshot === previousPersistedSnapshot) {
            return;
        }

        previousPersistedSnapshot = nextPersistedSnapshot;
        persistWishlistState(wishlistState);
    });
};
