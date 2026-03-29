import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import wishlistReducer from './slices/wishlistSlice';
import { createPreloadedState } from './preloadedState';
import { initializeCartBridge } from './bridges/cartBridge';
import { initializeWishlistBridge } from './bridges/wishlistBridge';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        product: productReducer,
        wishlist: wishlistReducer,
    },
    preloadedState: createPreloadedState(),
});

initializeCartBridge(store);
initializeWishlistBridge(store);

export default store;
