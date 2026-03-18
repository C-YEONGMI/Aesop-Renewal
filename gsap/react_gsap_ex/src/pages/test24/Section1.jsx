import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section1() {
    const sectionRef = useRef(null);
    const progressRef = useRef(null);

    useGSAP(() => {
        // 스크롤 진행도에 따라 상단 프로그레스 바가 왼쪽에서 오른쪽으로 채워짐
        gsap.to(progressRef.current, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: true } });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test24 - Scroll Progress</h2>
                <p className="desc">ScrollTrigger progress 활용</p>
                <div ref={progressRef} className="progress-bar" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '4px', background: '#667eea', transformOrigin: 'left', transform: 'scaleX(0)', zIndex: 100 }}></div>
                <div style={{ height: '300vh', paddingTop: '40vh' }}>
                    <div className="box">Scroll Progress</div>
                </div>
            </div>
        </div>
    );
}

export default Section1;
