import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Main from '../pages/Main';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import FindAccount from '../pages/FindAccount';
import MyPage from '../pages/MyPage';
import GiftGuide from '../pages/GiftGuide';
import Benefits from '../pages/Benefits';
import KrExclusiveBenefits from '../pages/KrExclusiveBenefits';
import OurStory from '../pages/OurStory';
import Search from '../pages/Search';
import Support from '../pages/Support';
import StoreLocator from '../pages/StoreLocator';

// 전체 라우팅 맵
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            // 홈
            { index: true, element: <Main /> },

            // 선물 가이드
            { path: 'gift-guide', element: <GiftGuide /> },

            // 상품 목록
            { path: 'products', element: <Products /> },
            { path: 'products/:category', element: <Products /> },
            { path: 'products/:category/:subcategory', element: <Products /> },

            // 상품 상세
            { path: 'product/:id', element: <ProductDetail /> },

            // 혜택
            { path: 'benefits', element: <Benefits /> },
            { path: 'benefits/official', element: <Benefits sub="official" /> },
            { path: 'benefits/kr-exclusive', element: <KrExclusiveBenefits /> },

            // 브랜드 스토리
            { path: 'our-story', element: <OurStory /> },

            // 검색
            { path: 'search', element: <Search /> },

            // 인증
            { path: 'login', element: <Login /> },
            { path: 'signup', element: <Signup /> },
            { path: 'find-account', element: <FindAccount /> },

            // 마이페이지
            { path: 'mypage', element: <MyPage /> },
            { path: 'mypage/:tab', element: <MyPage /> },

            // 장바구니 / 결제
            { path: 'cart', element: <Cart /> },
            { path: 'checkout', element: <Checkout /> },

            // 고객지원
            { path: 'support', element: <Support /> },
            { path: 'support/notices', element: <Support tab="notices" /> },
            { path: 'support/faq', element: <Support tab="faq" /> },
            { path: 'support/contact', element: <Support tab="contact" /> },
            { path: 'support/live-chat', element: <Support tab="live-chat" /> },
            { path: 'support/store-locator', element: <StoreLocator /> },

            // 매장 찾기 (독립 경로)
            { path: 'store-locator', element: <StoreLocator /> },
            { path: 'store-locator/:storeId', element: <StoreLocator /> },
        ],
    },
]);

export default router;
