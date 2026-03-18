import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section1() {
    const sectionRef = useRef(null);
    const horizontalRef = useRef(null);
    const panelsRef = useRef(null);

    useGSAP(() => {
        // 가로 스크롤: 패널 컨테이너를 왼쪽으로 밀어 가로 페이징 구현
        gsap.to(panelsRef.current, {
            xPercent: -75, // 패널 4개 중 3개만큼 이동 (100% - 25% = 75%)
            ease: 'none',
            scrollTrigger: {
                trigger: horizontalRef.current,
                pin: true,
                scrub: 1,
                end: () => '+=' + panelsRef.current.offsetWidth
            },
        });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test26 - Horizontal Scroll</h2>
                <p className="desc">가로 스크롤 애니메이션</p>
                <div ref={horizontalRef} className="horizontal-section" style={{ overflow: 'hidden' }}>
                    <div ref={panelsRef} className="panels-container" style={{ display: 'flex', width: '400vw' }}>
                        <div className="panel" style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e74c3c', color: '#fff', fontSize: '3rem' }}>Panel 1</div>
                        <div className="panel" style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#3498db', color: '#fff', fontSize: '3rem' }}>Panel 2</div>
                        <div className="panel" style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#2ecc71', color: '#fff', fontSize: '3rem' }}>Panel 3</div>
                        <div className="panel" style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#9b59b6', color: '#fff', fontSize: '3rem' }}>Panel 4</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Section1;
