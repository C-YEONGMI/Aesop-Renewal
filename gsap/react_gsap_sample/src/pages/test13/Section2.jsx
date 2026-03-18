import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const FEATURE_LABELS = ['React', 'HTML · CSS', 'JavaScript', 'Component', 'State', 'GSAP', 'Hooks'];

const FEATURE_POSITIONS = [
    { top: 25, left: 15 },
    { top: 12.5, left: 50 },
    { top: 22.5, left: 75 },
    { top: 30, left: 82.5 },
    { top: 50, left: 20 },
    { top: 80, left: 20 },
    { top: 75, left: 75 },
];

function Section2() {
    const sectionRef = useRef(null);
    const featureRefs = useRef([]);
    const featureBgRefs = useRef([]);
    const featureContentRefs = useRef([]);
    const spotlightContentRef = useRef(null);
    const featuresWrapRef = useRef(null);
    const searchBarRef = useRef(null);
    const searchBarTextRef = useRef(null);
    const headerContentRef = useRef(null);

    // searchBarFinalWidth를 useRef로 관리 (리렌더 방지)
    const searchBarFinalWidthRef = useRef(
        (typeof window !== 'undefined' && window.innerWidth < 1000) ? 20 : 25
    );

    // 리사이즈 감지 (useRef 업데이트 → 리렌더 없음)
    useEffect(() => {
        const handleResize = () => {
            searchBarFinalWidthRef.current = window.innerWidth < 1000 ? 20 : 25;
            ScrollTrigger.refresh();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 모든 GSAP 로직을 하나의 useGSAP에 통합
    useGSAP(() => {
        if (!sectionRef.current) return;

        // 1. 초기 feature 위치 세팅 (useGSAP 컨텍스트 내부)
        featureRefs.current.forEach((feature, i) => {
            if (feature && FEATURE_POSITIONS[i]) {
                gsap.set(feature, {
                    top: `${FEATURE_POSITIONS[i].top}%`,
                    left: `${FEATURE_POSITIONS[i].left}%`,
                });
            }
        });

        // 2. feature-bg 초기 사이즈 저장
        const featureStartDimensions = featureBgRefs.current.map(bg => {
            if (!bg) return { width: 0, height: 0 };
            const rect = bg.getBoundingClientRect();
            return { width: rect.width, height: rect.height };
        });

        const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const targetSize = 3 * remInPx;

        // 3. 메인 ScrollTrigger
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'start',
            end: `+=${window.innerHeight * 3}px`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const finalWidth = searchBarFinalWidthRef.current;

                // 0~33%: Spotlight 헤더 올라가기
                if (progress <= 0.3333) {
                    const p = progress / 0.3333;
                    gsap.set(spotlightContentRef.current, { y: `${-100 * p}%` });
                } else {
                    gsap.set(spotlightContentRef.current, { y: '-100%' });
                }

                // 0~50%: Feature 카드 중앙으로 모이기 + 축소
                if (progress <= 0.5) {
                    const p = progress / 0.5;

                    featureRefs.current.forEach((feature, i) => {
                        if (!feature || !FEATURE_POSITIONS[i]) return;
                        const orig = FEATURE_POSITIONS[i];
                        gsap.set(feature, {
                            top: `${orig.top + (50 - orig.top) * p}%`,
                            left: `${orig.left + (50 - orig.left) * p}%`,
                        });
                    });

                    featureBgRefs.current.forEach((bg, i) => {
                        if (!bg || !featureStartDimensions[i]) return;
                        const dim = featureStartDimensions[i];
                        gsap.set(bg, {
                            width: `${dim.width + (targetSize - dim.width) * p}px`,
                            height: `${dim.height + (targetSize - dim.height) * p}px`,
                            borderRadius: `${0.5 + (25 - 0.5) * p}rem`,
                            borderWidth: `${0.125 + (0.35 - 0.125) * p}rem`,
                        });
                    });

                    // Feature 텍스트 fade out (0~10%)
                    const textOpacity = progress <= 0.1 ? 1 - (progress / 0.1) : 0;
                    featureContentRefs.current.forEach(el => {
                        if (el) gsap.set(el, { opacity: textOpacity });
                    });
                }

                // Features 래퍼 표시/숨김
                if (featuresWrapRef.current) {
                    gsap.set(featuresWrapRef.current, { opacity: progress >= 0.5 ? 0 : 1 });
                }

                // Search bar 표시/숨김
                if (searchBarRef.current) {
                    gsap.set(searchBarRef.current, { opacity: progress >= 0.5 ? 1 : 0 });
                }

                // 50~75%: Search bar 확장
                if (progress >= 0.5 && progress <= 0.75) {
                    const sp = (progress - 0.5) / 0.25;
                    gsap.set(searchBarRef.current, {
                        width: `${3 + (finalWidth - 3) * sp}rem`,
                        height: `${3 + 2 * sp}rem`,
                        transform: `translate(-50%, ${-50 + 250 * sp}%)`,
                    });
                    gsap.set(searchBarTextRef.current, { opacity: 0 });
                } else if (progress > 0.75) {
                    gsap.set(searchBarRef.current, {
                        width: `${finalWidth}rem`,
                        height: '5rem',
                        transform: 'translate(-50%, 200%)',
                    });
                }

                // 75~100%: 최종 헤더 + search bar 텍스트 등장
                if (progress >= 0.75) {
                    const fp = (progress - 0.75) / 0.25;
                    gsap.set(searchBarTextRef.current, { opacity: fp });
                    gsap.set(headerContentRef.current, {
                        y: -50 + 50 * fp,
                        opacity: fp,
                    });
                } else {
                    gsap.set(searchBarTextRef.current, { opacity: 0 });
                    gsap.set(headerContentRef.current, { y: -50, opacity: 0 });
                }
            },
        });
    }, { scope: sectionRef });

    return (
        <section className="spotlight" ref={sectionRef}>
            {/* Spotlight Header */}
            <div className="spotlight-content" ref={spotlightContentRef}>
                <div className="spotlight-bg">
                    <img src="/images/bg1.jpg" alt="" />
                </div>
                <h1>의도된 설계로 최고의 사용자 경험을 만들다</h1>
            </div>

            {/* Header (final) */}
            <div className="header">
                <div className="header-content" ref={headerContentRef}>
                    <h1>Lorem ipsum dolor sit amet consectetur</h1>
                    <p>
                        adipisicing elit. Molestias, atque reprehenderit! Fugiat commodi
                    </p>
                </div>
            </div>

            {/* Feature cards - React map 렌더링 + ref 콜백 배열 */}
            <div className="features" ref={featuresWrapRef}>
                {FEATURE_LABELS.map((label, i) => (
                    <div
                        key={label}
                        className="feature"
                        ref={el => featureRefs.current[i] = el}
                    >
                        <div
                            className="feature-bg"
                            ref={el => featureBgRefs.current[i] = el}
                        />
                        <div
                            className="feature-content"
                            ref={el => featureContentRefs.current[i] = el}
                        >
                            <p>{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search bar */}
            <div className="search-bar" ref={searchBarRef}>
                <p ref={searchBarTextRef}>Location  Test Section</p>
            </div>
        </section>
    );
}

export default Section2;
