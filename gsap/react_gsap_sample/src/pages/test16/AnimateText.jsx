import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// clip-path 텍스트 색상 전환 애니메이션 (공통 컴포넌트)
function AnimateText({ children }) {
    const containerRef = useRef(null);
    const overlayRef = useRef(null);

    useGSAP(() => {
        if (!containerRef.current || !overlayRef.current) return;

        // 초기 clip-path 설정
        gsap.set(overlayRef.current, { clipPath: 'inset(0 0 100% 0)' });

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 50%',
            end: 'bottom 50%',
            scrub: 1,
            onUpdate: (self) => {
                const clipValue = Math.max(0, 100 - self.progress * 100);
                gsap.set(overlayRef.current, {
                    clipPath: `inset(0 0 ${clipValue}% 0)`,
                });
            },
        });
    }, { scope: containerRef });

    return (
        <div className="animate-text" ref={containerRef}>
            <h1>{children}</h1>
            <h1 className="animate-text-overlay" ref={overlayRef}>{children}</h1>
        </div>
    );
}

export default AnimateText;
