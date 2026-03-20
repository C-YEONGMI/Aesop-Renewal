import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import FloatingButtons from './btn/FloatingButtons';

// 전체 레이아웃 래퍼
// - 홈 Hero 구간: transparent 헤더 (흰색 텍스트)
// - 홈 Hero 이탈 이후: solid 헤더 (브라운 텍스트)
// - 내부 페이지: 항상 solid 헤더
const Layout = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [scrolled, setScrolled] = useState(false);
    const shouldPreserveScroll = Boolean(location.state?.preserveScroll);

    useEffect(() => {
        if (!('scrollRestoration' in window.history)) {
            return undefined;
        }

        const previousValue = window.history.scrollRestoration;
        window.history.scrollRestoration = 'manual';

        return () => {
            window.history.scrollRestoration = previousValue;
        };
    }, []);

    useLayoutEffect(() => {
        if (shouldPreserveScroll) {
            return;
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [location.key, shouldPreserveScroll]);

    useEffect(() => {
        if (!isHome) {
            setScrolled(true);
            return;
        }
        // 홈에서만 스크롤 감지
        const handleScroll = () => {
            const heroHeight = document.querySelector('.hero')?.offsetHeight ?? window.innerHeight;
            setScrolled(window.scrollY > heroHeight * 0.9);
        };
        setScrolled(false);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);

    return (
        <>
            {/* transparent 여부를 헤더에 전달 */}
            <Header transparent={isHome && !scrolled} />
            <main className="main">
                <Outlet />
            </main>
            <Footer />
            <FloatingButtons />
        </>
    );
};

export default Layout;
