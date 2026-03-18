import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section1() {
    const sectionRef = useRef(null);
    const parallaxRef = useRef(null);
    const bgRef = useRef(null);
    const fgRef = useRef(null);

    useGSAP(() => {
        // 배경(bg)은 위로 천천히 올라가고, 전경 텍스트(fg)는 아래로 내려가며 깊이감(패럴랙스) 생성
        gsap.to(bgRef.current, { yPercent: -30, ease: 'none', scrollTrigger: { trigger: parallaxRef.current, start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.to(fgRef.current, { yPercent: 50, ease: 'none', scrollTrigger: { trigger: parallaxRef.current, start: 'top bottom', end: 'bottom top', scrub: true } });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test19 - Parallax 효과</h2>
                <p className="desc">ScrollTrigger로 패럴랙스</p>
                <div style={{ height: '50vh' }}></div>
                <div ref={parallaxRef} className="parallax-section" style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
                    <div ref={bgRef} className="bg-layer" style={{ position: 'absolute', inset: '-30% 0', background: 'url(/images/img3.jpeg) no-repeat center center / cover' }}></div>
                    <div ref={fgRef} className="fg-text" style={{ position: 'relative', zIndex: 1, paddingTop: '40vh', textAlign: 'center', fontSize: '3rem', fontWeight: 900 }}>Parallax</div>
                </div>
                <div style={{ height: '100vh' }}></div>
            </div>
        </div>
    );
}

export default Section1;
