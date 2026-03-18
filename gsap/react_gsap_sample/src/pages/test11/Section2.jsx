import { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const scrollItems = [
    { label: "IDEAS", subHeader: "최고 수준의 웹 디자인 컴포넌트." },
    { label: "ABOUT", subHeader: "엘리트 웹 디자인으로 앞서 나가기." },
    { label: "PROJECTS", subHeader: "빠른 마스터리를 위한 지름길." },
    { label: "CONTACT", subHeader: "프로젝트를 그 어느 때보다 빠르게 실현." },
];

const DEFAULT_TEXT = "REACT";
const DEFAULT_SUB = "하나의 구독. 끝없는 웹 디자인.";
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function Section2() {
    const sectionRef = useRef(null);
    const stickyRef = useRef(null);
    const letterRefs = useRef([]);
    const subheaderRef = useRef(null);
    const shuffleTimers = useRef([]);
    const currentIndexRef = useRef(-1);

    // 모든 UI를 React State로 제어
    const [letters, setLetters] = useState(() =>
        DEFAULT_TEXT.split('').map(ch => ({ char: ch, blurred: false }))
    );
    const [subText, setSubText] = useState(DEFAULT_SUB);
    const [isDark, setIsDark] = useState(false);

    // 타이머 전부 정리하는 헬퍼
    const clearAllTimers = useCallback(() => {
        shuffleTimers.current.forEach(id => {
            clearInterval(id);
            clearTimeout(id);
        });
        shuffleTimers.current = [];
    }, []);

    // 셔플 로직: 100% React State 기반
    const shuffleLetters = useCallback((finalText) => {
        clearAllTimers();

        const chars = finalText.split('');

        // 1단계: 블러 상태 + 빈 글자로 초기화 (State 업데이트 → React 리렌더)
        setLetters(chars.map(() => ({ char: '\u00A0', blurred: true })));

        // 2단계: 80ms마다 랜덤 글자로 State 업데이트 (셔플링)
        const shuffleHandle = setInterval(() => {
            setLetters(prev => prev.map((item, i) => ({
                ...item,
                char: chars[i] === ' ' ? '\u00A0' : ALPHABET[Math.floor(Math.random() * 26)]
            })));
        }, 80);
        shuffleTimers.current.push(shuffleHandle);

        // 3단계: 1초 후 최종 글자 확정
        const finalHandle = setTimeout(() => {
            clearInterval(shuffleHandle);

            // 확정 글자 세팅 (아직 블러)
            setLetters(chars.map(ch => ({ char: ch === ' ' ? '\u00A0' : ch, blurred: true })));

            // 4단계: 순차적 블러 해제 (stagger 효과를 State 기반으로)
            chars.forEach((_, i) => {
                const staggerHandle = setTimeout(() => {
                    setLetters(prev => prev.map((item, j) =>
                        j === i ? { ...item, blurred: false } : item
                    ));
                }, i * 100); // 0.1초 간격
                shuffleTimers.current.push(staggerHandle);
            });
        }, 1000);
        shuffleTimers.current.push(finalHandle);
    }, [clearAllTimers]);

    // 서브헤더 변경 (GSAP Timeline)
    const updateSubheader = useCallback((text) => {
        const sub = subheaderRef.current;
        if (!sub) return;

        gsap.timeline()
            .to(sub, { opacity: 0, duration: 0.3 })
            .call(() => setSubText(text))
            .to(sub, { opacity: 1, duration: 0.5, delay: 0.3 });
    }, []);

    // 스케일 펄스
    const animateScale = useCallback((el) => {
        gsap.fromTo(el, { scale: 1 }, { scale: 1.25, duration: 2, ease: "power1.out" });
    }, []);

    // Unmount 정리
    useEffect(() => {
        return () => clearAllTimers();
    }, [clearAllTimers]);

    // 메인 ScrollTrigger
    useGSAP(() => {
        const totalItems = scrollItems.length;

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const newIndex = Math.floor(progress * (totalItems + 1)) - 1;
                const clampedIndex = Math.max(-1, Math.min(newIndex, totalItems - 1));

                if (clampedIndex !== currentIndexRef.current) {
                    currentIndexRef.current = clampedIndex;

                    if (clampedIndex >= 0) {
                        const item = scrollItems[clampedIndex];
                        shuffleLetters(item.label);
                        updateSubheader(item.subHeader);
                        animateScale(stickyRef.current);
                        setIsDark(true);
                    } else {
                        shuffleLetters(DEFAULT_TEXT);
                        updateSubheader(DEFAULT_SUB);
                        animateScale(stickyRef.current);
                        setIsDark(false);
                    }
                }
            }
        });
    }, { scope: sectionRef });

    // 배경색 전환
    useGSAP(() => {
        gsap.to(stickyRef.current, {
            backgroundColor: isDark ? '#000' : '#e3e3e3',
            duration: 0.5
        });
    }, { dependencies: [isDark] });

    return (
        <section className="shuffle-section" ref={sectionRef}>
            <div className="shuffle-sticky" ref={stickyRef}>
                <div className="header">
                    <div className="placeholder">
                        {letters.map((item, i) => (
                            <span
                                key={i}
                                ref={el => letterRefs.current[i] = el}
                                style={{
                                    color: isDark ? '#fff' : '#000',
                                    filter: item.blurred ? 'blur(8px)' : 'blur(0px)',
                                    transition: 'filter 0.5s ease'
                                }}
                            >
                                {item.char}
                            </span>
                        ))}
                    </div>
                    <p
                        className="subheader"
                        ref={subheaderRef}
                        style={{ color: isDark ? '#fff' : '#000' }}
                    >
                        {subText}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Section2;
