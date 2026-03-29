import { createSlice } from '@reduxjs/toolkit';
import productsData from '../../../data/products.json';
import protectiveLipBalmSpf30Image from '../../../assets/Protective Lip Balm SPF30.png';
import { inferProductCategoryLabel, normalizeCategoryValue } from '../../../data/productCategories';

const BROKEN_IMAGE_URLS = new Map([
    [
        'https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog/ko_KR/dw76bc2cc6/images/products/SK52/Aesop-Skin-Protective-Lip-Balm-SPF30-5-5g-large.png',
        'https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog/ko_KR/dw76bc2cc6/images/products/SK52/Aesop-Skin-Protective-Lip-Balm-SPF30-5-5g-large.jpg?bgcolor=fffef2&q=70&sfrm=jpg&sh=430&sm=cut&sw=430',
    ],
    ['/src/assets/Protective Lip Balm SPF30.png', protectiveLipBalmSpf30Image],
]);

const normalizeImageUrl = (url = '') => BROKEN_IMAGE_URLS.get(url) || url;

const normalizeProductData = (products = []) =>
    products.map((product) => ({
        ...product,
        category: inferProductCategoryLabel(product),
        badge: Array.isArray(product.badge) ? product.badge : [],
        variants: Array.isArray(product.variants)
            ? product.variants.map((variant) => ({
                  ...variant,
                  image: normalizeImageUrl(variant.image),
              }))
            : [],
    }));

export const productInitialState = {
    status: 'idle',
    error: null,
    items: normalizeProductData(productsData.products || []),
    giftFilters: Array.isArray(productsData.giftFilters) ? productsData.giftFilters : [],
    recentlyViewed: [],
    pagination: {
        page: 1,
        pageSize: null,
        total: null,
        hasNextPage: true,
    },
};

const mergeProductState = (state, payload = {}) => ({
    ...state,
    ...payload,
    pagination: {
        ...state.pagination,
        ...(payload.pagination || {}),
    },
});

const productSlice = createSlice({
    name: 'product',
    initialState: productInitialState,
    reducers: {
        hydrateProductState: (state, action) => mergeProductState(state, action.payload),
        setProductStatus: (state, action) => {
            state.status = action.payload;
        },
        setProductError: (state, action) => {
            state.error = action.payload;
        },
        setProducts: (state, action) => {
            state.items = normalizeProductData(action.payload || []);
        },
        setGiftFilters: (state, action) => {
            state.giftFilters = Array.isArray(action.payload) ? action.payload : [];
        },
        setRecentlyViewed: (state, action) => {
            state.recentlyViewed = Array.isArray(action.payload) ? action.payload : [];
        },
        addRecentlyViewed: (state, action) => {
            const productName = action.payload;

            if (!productName) {
                return;
            }

            const filtered = state.recentlyViewed.filter((name) => name !== productName);
            state.recentlyViewed = [productName, ...filtered].slice(0, 10);
        },
        setCatalogPagination: (state, action) => {
            state.pagination = {
                ...state.pagination,
                ...(action.payload || {}),
            };
        },
        syncFromLegacyProducts: (state, action) => mergeProductState(state, action.payload),
        resetProductState: () => productInitialState,
    },
});

export const {
    addRecentlyViewed,
    hydrateProductState,
    resetProductState,
    setCatalogPagination,
    setGiftFilters,
    setProductError,
    setProductStatus,
    setProducts,
    setRecentlyViewed,
    syncFromLegacyProducts,
} = productSlice.actions;

export const selectProductState = (state) => state.product;
export const selectProducts = (state) => state.product.items;
export const selectGiftFilters = (state) => state.product.giftFilters;
export const selectRecentlyViewed = (state) => state.product.recentlyViewed;
export const selectProductsByCategory = (category) => (state) =>
    state.product.items.filter(
        (product) => normalizeCategoryValue(product.category) === normalizeCategoryValue(category)
    );

export default productSlice.reducer;
