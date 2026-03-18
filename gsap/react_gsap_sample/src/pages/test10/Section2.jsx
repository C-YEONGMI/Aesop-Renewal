import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// 스크롤 구간별 데이터
const scrollItems = [
    { label: "IDEAS", subHeader: "최고 수준의 웹 디자인 컴포넌트." },
    { label: "ABOUT", subHeader: "엘리트 웹 디자인으로 앞서 나가기." },
    { label: "PROJECTS", subHeader: "빠른 마스터리를 위한 지름길." },
    { label: "CONTACT", subHeader: "프로젝트를 그 어느 때보다 빠르게 실현." },
];

const DEFAULT_TEXT = "REACT";
const DEFAULT_SUB = "하나의 구독. 끝없는 웹 디자인.";

function Section2() {
    const sectionRef = useRef(null);
    const stickyRef = useRef(null);
    const currentIndexRef = useRef(-1);

    const [displayText, setDisplayText] = useState(DEFAULT_TEXT);
    const [subText, setSubText] = useState(DEFAULT_SUB);
    const [isDark, setIsDark] = useState(false);

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
                        setDisplayText(item.label);
                        setSubText(item.subHeader);
                        setIsDark(true);
                    } else {
                        setDisplayText(DEFAULT_TEXT);
                        setSubText(DEFAULT_SUB);
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
                    <div
                        className="placeholder"
                        style={{ color: isDark ? '#fff' : '#000' }}
                    >
                        {displayText}
                    </div>
                    <p
                        className="subheader"
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
