import { createSlice } from '@reduxjs/toolkit';

export const authInitialState = {
    status: 'idle',
    error: null,
    isLoggedIn: false,
    user: null,
    users: [],
    session: {
        provider: null,
        userId: null,
        returnTo: '/',
    },
    oauth: {
        activeProvider: null,
        returnTo: '/mypage',
        error: null,
    },
};

const mergeAuthState = (state, payload = {}) => ({
    ...state,
    ...payload,
    session: {
        ...state.session,
        ...(payload.session || {}),
    },
    oauth: {
        ...state.oauth,
        ...(payload.oauth || {}),
    },
});

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        hydrateAuthState: (state, action) => mergeAuthState(state, action.payload),
        setAuthStatus: (state, action) => {
            state.status = action.payload;
        },
        setAuthError: (state, action) => {
            state.error = action.payload;
        },
        setLoginState: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = Boolean(action.payload);
            state.session.userId = action.payload?.id || null;
        },
        replaceUserDirectory: (state, action) => {
            state.users = Array.isArray(action.payload) ? action.payload : [];
        },
        upsertUserRecord: (state, action) => {
            const nextUser = action.payload;

            if (!nextUser?.id) {
                return;
            }

            const existingIndex = state.users.findIndex((user) => user.id === nextUser.id);

            if (existingIndex === -1) {
                state.users.push(nextUser);
                return;
            }

            state.users[existingIndex] = {
                ...state.users[existingIndex],
                ...nextUser,
            };
        },
        setSessionContext: (state, action) => {
            state.session = {
                ...state.session,
                ...(action.payload || {}),
            };
        },
        clearSessionContext: (state) => {
            state.session = {
                ...authInitialState.session,
            };
        },
        setOAuthContext: (state, action) => {
            state.oauth = {
                ...state.oauth,
                ...(action.payload || {}),
            };
        },
        clearOAuthContext: (state) => {
            state.oauth = {
                ...authInitialState.oauth,
            };
        },
        syncFromLegacyAuth: (state, action) => mergeAuthState(state, action.payload),
        resetAuthState: () => authInitialState,
    },
});

export const {
    clearOAuthContext,
    clearSessionContext,
    hydrateAuthState,
    replaceUserDirectory,
    resetAuthState,
    setAuthError,
    setAuthStatus,
    setCurrentUser,
    setLoginState,
    setOAuthContext,
    setSessionContext,
    syncFromLegacyAuth,
    upsertUserRecord,
} = authSlice.actions;

export const selectAuthState = (state) => state.auth;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthUsers = (state) => state.auth.users;

export default authSlice.reducer;
