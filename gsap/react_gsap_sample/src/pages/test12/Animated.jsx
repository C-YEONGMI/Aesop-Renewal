import { useRef, useState, useEffect, Children, cloneElement } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// 텍스트를 글자 단위로 분리하는 헬퍼
function splitTextToChars(text) {
    return text.split('').map((char, i) => (
        <span className="char" key={i} data-index={i}>
            {char === ' ' ? '\u00A0' : char}
        </span>
    ));
}

// React Element의 텍스트를 재귀적으로 글자 단위 span으로 변환
function splitChildren(children) {
    return Children.map(children, (child) => {
        if (typeof child === 'string') {
            return splitTextToChars(child);
        }
        if (child?.props?.children) {
            return cloneElement(child, {}, splitChildren(child.props.children));
        }
        return child;
    });
}

function Animated({
    children,
    colorInitial = '#dddddd',
    colorAccent = '#abff02',
    colorFinal = '#000000',
    triggerStart = 'top 90%',
    triggerEnd = 'top 10%',
    endTrigger = null,
}) {
    const containerRef = useRef(null);
    const lastProgressRef = useRef(0);
    const timersRef = useRef(new Map());
    const completedRef = useRef(new Set());

    // children을 글자 단위 span으로 분리 (React 렌더링)
    const [splitContent] = useState(() => splitChildren(children));

    // 타이머 정리 헬퍼
    const clearAllTimers = () => {
        timersRef.current.forEach(timer => clearTimeout(timer));
        timersRef.current.clear();
        completedRef.current.clear();
    };

    // Unmount 시 정리
    useEffect(() => {
        return () => clearAllTimers();
    }, []);

    // ScrollTrigger 기반 글자 색상 애니메이션
    useGSAP(() => {
        if (!containerRef.current) return;

        // 컨테이너 내 모든 .char span 수집
        const allChars = Array.from(containerRef.current.querySelectorAll('.char'));
        if (allChars.length === 0) return;

        // 초기 색상 설정
        allChars.forEach(char => {
            char.style.color = colorInitial;
            char.style.transition = 'none';
        });

        lastProgressRef.current = 0;
        clearAllTimers();

        // accent → final 전환 스케줄러
        const scheduleFinal = (char, index) => {
            if (timersRef.current.has(index)) {
                clearTimeout(timersRef.current.get(index));
            }
            const timer = setTimeout(() => {
                if (!completedRef.current.has(index)) {
                    gsap.to(char, {
                        color: colorFinal,
                        duration: 0.1,
                        ease: 'none',
                        onComplete: () => completedRef.current.add(index),
                    });
                }
                timersRef.current.delete(index);
            }, 100);
            timersRef.current.set(index, timer);
        };

        // ScrollTrigger 설정
        const config = {
            trigger: containerRef.current,
            start: triggerStart,
            end: triggerEnd,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const isDown = progress >= lastProgressRef.current;
                const currentIdx = Math.floor(progress * allChars.length);

                allChars.forEach((char, index) => {
                    // 역방향: 초기 색으로 되돌리기
                    if (!isDown && index >= currentIdx) {
                        if (timersRef.current.has(index)) {
                            clearTimeout(timersRef.current.get(index));
                            timersRef.current.delete(index);
                        }
                        completedRef.current.delete(index);
                        gsap.set(char, { color: colorInitial });
                        return;
                    }

                    if (completedRef.current.has(index)) return;

                    if (index <= currentIdx) {
                        gsap.set(char, { color: colorAccent });
                        if (!timersRef.current.has(index)) {
                            scheduleFinal(char, index);
                        }
                    } else {
                        gsap.set(char, { color: colorInitial });
                    }
                });

                lastProgressRef.current = progress;
            },
        };

        if (endTrigger) config.endTrigger = endTrigger;
        ScrollTrigger.create(config);

        return () => clearAllTimers();
    }, {
        scope: containerRef,
        dependencies: [colorInitial, colorAccent, colorFinal, triggerStart, triggerEnd, endTrigger],
    });

    return (
        <div ref={containerRef} className="animated-text">
            {splitContent}
        </div>
    );
}

export default Animated;
