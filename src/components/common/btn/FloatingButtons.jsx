import React, { useState, useEffect } from 'react';
import './FloatingButtons.scss';

const FloatingButtons = () => {
    const [isTopVisible, setIsTopVisible] = useState(false);
    const [isChatVisible, setIsChatVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Top 버튼은 1920 기준 1080px (또는 100vh) 이동 시 나타남
            const topThreshold = window.innerWidth >= 1920 ? 1080 : window.innerHeight;
            setIsTopVisible(window.scrollY > topThreshold);

            // 실시간 상담 버튼은 Hero(100vh)를 지나면 1920에서도 즉시 나타나게 함
            // 만약 Hero가 viewport 높이 기준이라면 window.innerHeight 활용
            const chatThreshold = window.innerHeight;
            setIsChatVisible(window.scrollY > chatThreshold);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // 초기 컴포넌트 마운트 시 검사 수행

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="floating-buttons">
            <button 
                className={`floating-btn btn-top ${isTopVisible ? 'visible' : ''}`} 
                onClick={scrollToTop} 
                aria-label="최상단으로 이동"
            >
                {/* 얇은 위쪽 화살표 */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
            </button>
            <div className={`floating-btn-group ${isChatVisible ? 'visible' : ''}`}>
                <button className="floating-btn btn-chat" aria-label="실시간 상담">
                    {/* 네모난 말풍선 아이콘 */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </button>
                <span className="chat-label">실시간 상담</span>
            </div>
        </div>
    );
};

export default FloatingButtons;
