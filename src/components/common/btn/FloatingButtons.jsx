import React, { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ExpandableChat from '../../ui/ExpandableChat';
import './FloatingButtons.scss';

const FloatingButtons = () => {
    const [isTopVisible, setIsTopVisible] = useState(false);
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const topThreshold = window.innerWidth >= 1920 ? 1080 : window.innerHeight;
            setIsTopVisible(window.scrollY > topThreshold);

            const chatThreshold = window.innerHeight;
            setIsChatVisible(window.scrollY > chatThreshold);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const toggleChat = () => {
        setIsChatOpen((prev) => !prev);
    };

    return (
        <div className="floating-buttons">
            <button
                className={`floating-btn btn-top ${isTopVisible ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="최상단으로 이동"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15" />
                </svg>
            </button>

            <div className={`floating-btn-group ${isChatVisible || isChatOpen ? 'visible' : ''} ${isChatOpen ? 'is-open' : ''}`}>
                <ExpandableChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

                <button
                    className={`floating-btn btn-chat ${isChatOpen ? 'is-active' : ''}`}
                    aria-label={isChatOpen ? '실시간 상담 닫기' : '실시간 상담 열기'}
                    onClick={toggleChat}
                >
                    {isChatOpen ? <X size={20} strokeWidth={1.8} /> : <MessageCircle size={20} strokeWidth={1.8} />}
                </button>
            </div>
        </div>
    );
};

export default FloatingButtons;
