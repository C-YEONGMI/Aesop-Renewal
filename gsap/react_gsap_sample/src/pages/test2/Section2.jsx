import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

function Section2() {
    const sectionRef = useRef(null);
    const progressBarRef = useRef(null);
    const leftTextRefs = useRef([]);
    const rightTextRefs = useRef([]);

    useGSAP(() => {
        const section = sectionRef.current;
        const totalItems = leftTextRefs.current.length; // 3

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: `+=${window.innerHeight * 3}px`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
            }
        });

        // 프로그레스 바는 0부터 1까지 한 번에 애니메이션 (scaleY로 대체하여 퍼포먼스 향상도 고려)
        tl.to(progressBarRef.current, {
            '--progress': 1,
            ease: 'none',
            duration: totalItems
        }, 0);

        // 텍스트는 각 구간별로 등장-대기-사라짐의 과정을 거침 (단, 마지막은 사라지지 않음)
        leftTextRefs.current.forEach((text, i) => {
            if (!text) return;
            const startTime = i;

            // 등장
            tl.fromTo(text,
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: 'power1.out' },
                startTime
            );

            // 마지막 텍스트가 아니라면 사라짐 애니메이션 추가
            if (i < totalItems - 1) {
                tl.to(text, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power1.in'
                }, startTime + 0.5);
            }
        });

        rightTextRefs.current.forEach((text, i) => {
            if (!text) return;
            const startTime = i;

            // 등장
            tl.fromTo(text,
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: 'power1.out' },
                startTime
            );

            // 마지막 텍스트가 아니라면 사라짐 애니메이션 추가
            if (i < totalItems - 1) {
                tl.to(text, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power1.in'
                }, startTime + 0.5);
            }
        });

    }, { scope: sectionRef });

    return (
        <section className="section2" ref={sectionRef}>
            <div className="section2-content">
                {/* 좌측 텍스트 영역 */}
                <div className="section2-side section2-left">
                    <div className="section2-text-stack">
                        <div className="section2-left-text" ref={el => leftTextRefs.current[0] = el}>
                            <h2>데이터 분석</h2>
                            <p>실시간 데이터 흐름을 분석하여 최적의 의사결정을 지원합니다.</p>
                        </div>
                        <div className="section2-left-text" ref={el => leftTextRefs.current[1] = el}>
                            <h2>시스템 설계</h2>
                            <p>효율적인 아키텍처로 확장 가능한 시스템을 구축합니다.</p>
                        </div>
                        <div className="section2-left-text" ref={el => leftTextRefs.current[2] = el}>
                            <h2>자동화 구현</h2>
                            <p>반복 작업을 자동화하여 생산성을 극대화합니다.</p>
                        </div>
                    </div>
                </div>

                {/* 가운데 프로그레스 바 */}
                <div className="section2-center">
                    <div className="hero-scroll-progress-bar" ref={progressBarRef}></div>
                </div>

                {/* 우측 텍스트 영역 */}
                <div className="section2-side section2-right">
                    <div className="section2-text-stack">
                        <div className="section2-right-text" ref={el => rightTextRefs.current[0] = el}>
                            <p>수집된 정보는 벡터 기반으로 정렬됩니다.</p>
                        </div>
                        <div className="section2-right-text" ref={el => rightTextRefs.current[1] = el}>
                            <p>구조화된 데이터가 모듈 단위로 분배됩니다.</p>
                        </div>
                        <div className="section2-right-text" ref={el => rightTextRefs.current[2] = el}>
                            <p>최종 결과물이 통합 파이프라인으로 출력됩니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Section2;
