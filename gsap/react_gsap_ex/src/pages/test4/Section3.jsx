import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section3() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // pin: 스크롤 동안 화면을 고정시키고 애니메이션 수행
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.pin-container',
                start: 'top top',    // 컨테이너 최상단이 화면 최상단에 닿을 때
                end: '+=1500',       // 1500px 동안 고정
                scrub: true,
                pin: true,           // 고정
                markers: true,
            }
        });

        tl.to('.panel', { xPercent: -100, duration: 1 })
            .to('.panel', { xPercent: -200, duration: 1 });

    }, { scope: sectionRef });

    return (
        <div id="section3" className="con con3" ref={sectionRef}>
            <div className="pin-container" style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
                <div className="inner" style={{ position: 'absolute', zIndex: 10 }}>
                    <h2>Test4 - Pin 속성 (가로 스크롤)</h2>
                </div>
                <div className="panels" style={{ display: 'flex', width: '300vw', height: '100vh' }}>
                    <div className="panel" style={{ width: '100vw', background: '#34495e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>Panel 1</div>
                    <div className="panel" style={{ width: '100vw', background: '#e67e22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>Panel 2</div>
                    <div className="panel" style={{ width: '100vw', background: '#27ae60', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>Panel 3</div>
                </div>
            </div>
        </div>
    );
}

export default Section3;
