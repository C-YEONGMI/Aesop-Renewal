import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';

// 전체 레이아웃 래퍼
// - 홈 Hero 구간: transparent 헤더 (흰색 텍스트)
// - 홈 Hero 이탈 이후: solid 헤더 (브라운 텍스트)
// - 내부 페이지: 항상 solid 헤더
const Layout = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (!isHome) {
            setScrolled(true);
            return;
        }
        // 홈에서만 스크롤 감지
        const handleScroll = () => {
            // Hero 높이 기준 (100vh) 넘으면 solid로 전환
            setScrolled(window.scrollY > window.innerHeight * 0.7);
        };
        setScrolled(false);
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
        </>
    );
};

export default Layout;
