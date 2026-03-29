import { persistCartState } from '../persistence/cartPersistence';
import { selectActiveCartUserId } from '../selectors/cartSelectors';
import { setActiveCartUser } from '../slices/cartSlice';
import useAuthStore from '../../../store/useAuthStore';

const getCurrentAuthUserId = () => useAuthStore.getState().user?.id || null;

export const initializeCartBridge = (store) => {
    let previousPersistedSnapshot = null;
    let previousAuthUserId = getCurrentAuthUserId();

    store.dispatch(setActiveCartUser(previousAuthUserId));

    useAuthStore.subscribe((state, previousState) => {
        const previousUserId = previousState.user?.id || null;
        const nextUserId = state.user?.id || null;

        if (previousUserId === nextUserId && previousState.isLoggedIn === state.isLoggedIn) {
            return;
        }

        previousAuthUserId = nextUserId;

        if (selectActiveCartUserId(store.getState()) !== nextUserId) {
            store.dispatch(setActiveCartUser(nextUserId));
        }
    });

    return store.subscribe(() => {
        const state = store.getState();
        const cartState = state.cart;
        const nextAuthUserId = getCurrentAuthUserId();

        if (selectActiveCartUserId(state) !== nextAuthUserId && previousAuthUserId !== nextAuthUserId) {
            previousAuthUserId = nextAuthUserId;
            store.dispatch(setActiveCartUser(nextAuthUserId));
            return;
        }

        const nextPersistedSnapshot = JSON.stringify({
            cartItems: cartState.cartItems,
            cartItemsByUser: cartState.cartItemsByUser,
            selectedSamples: cartState.selectedSamples,
            selectedSamplesByUser: cartState.selectedSamplesByUser,
        });

        if (nextPersistedSnapshot === previousPersistedSnapshot) {
            return;
        }

        previousPersistedSnapshot = nextPersistedSnapshot;
        persistCartState(cartState);
    });
};
