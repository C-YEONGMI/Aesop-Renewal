import { createSlice } from '@reduxjs/toolkit';

export const cartInitialState = {
    status: 'idle',
    error: null,
    activeUserId: null,
    cartItems: [],
    cartItemsByUser: {},
    isCartDialogOpen: false,
    cartDialogItem: null,
    selectedSamples: [],
    selectedSamplesByUser: {},
};

const getUserCollection = (collection, userId, fallback = []) => {
    if (!userId) {
        return fallback;
    }

    const value = collection?.[userId];
    return Array.isArray(value) ? value : fallback;
};

const buildNextUserCollection = (collection, userId, value) => {
    if (!userId) {
        return collection || {};
    }

    return {
        ...(collection || {}),
        [userId]: value,
    };
};

const mergeCartState = (state, payload = {}) => ({
    ...state,
    ...payload,
    cartItemsByUser: {
        ...state.cartItemsByUser,
        ...(payload.cartItemsByUser || {}),
    },
    selectedSamplesByUser: {
        ...state.selectedSamplesByUser,
        ...(payload.selectedSamplesByUser || {}),
    },
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        hydrateCartState: (state, action) => mergeCartState(state, action.payload),
        setCartStatus: (state, action) => {
            state.status = action.payload;
        },
        setCartError: (state, action) => {
            state.error = action.payload;
        },
        setActiveCartUser: (state, action) => {
            const userId = action.payload || null;
            state.activeUserId = userId;
            state.cartItems = getUserCollection(state.cartItemsByUser, userId);
            state.selectedSamples = getUserCollection(state.selectedSamplesByUser, userId);
        },
        setCartItems: (state, action) => {
            const nextItems = Array.isArray(action.payload) ? action.payload : [];
            state.cartItems = nextItems;
            state.cartItemsByUser = buildNextUserCollection(
                state.cartItemsByUser,
                state.activeUserId,
                nextItems
            );
        },
        setSelectedSamples: (state, action) => {
            const nextSamples = Array.isArray(action.payload) ? action.payload : [];
            state.selectedSamples = nextSamples;
            state.selectedSamplesByUser = buildNextUserCollection(
                state.selectedSamplesByUser,
                state.activeUserId,
                nextSamples
            );
        },
        upsertCartForUser: (state, action) => {
            const { userId, cartItems = [] } = action.payload || {};

            if (!userId) {
                return;
            }

            state.cartItemsByUser = buildNextUserCollection(
                state.cartItemsByUser,
                userId,
                cartItems
            );

            if (state.activeUserId === userId) {
                state.cartItems = cartItems;
            }
        },
        upsertSamplesForUser: (state, action) => {
            const { userId, selectedSamples = [] } = action.payload || {};

            if (!userId) {
                return;
            }

            state.selectedSamplesByUser = buildNextUserCollection(
                state.selectedSamplesByUser,
                userId,
                selectedSamples
            );

            if (state.activeUserId === userId) {
                state.selectedSamples = selectedSamples;
            }
        },
        openCartDialog: (state, action) => {
            state.isCartDialogOpen = true;
            state.cartDialogItem = action.payload || null;
        },
        closeCartDialog: (state) => {
            state.isCartDialogOpen = false;
            state.cartDialogItem = null;
        },
        syncFromLegacyCart: (state, action) => mergeCartState(state, action.payload),
        resetCartState: () => cartInitialState,
    },
});

export const {
    closeCartDialog,
    hydrateCartState,
    openCartDialog,
    resetCartState,
    setActiveCartUser,
    setCartError,
    setCartItems,
    setCartStatus,
    setSelectedSamples,
    syncFromLegacyCart,
    upsertCartForUser,
    upsertSamplesForUser,
} = cartSlice.actions;

export const selectCartState = (state) => state.cart;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectSelectedSamples = (state) => state.cart.selectedSamples;
export const selectCartCount = (state) =>
    state.cart.cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

export default cartSlice.reducer;
