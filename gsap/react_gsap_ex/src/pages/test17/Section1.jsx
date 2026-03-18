import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section1() {
    const sectionRef = useRef(null);
    const boxRef = useRef(null);

    useGSAP(() => {
        gsap.from(boxRef.current, {
            scrollTrigger: { trigger: boxRef.current, start: 'top 80%', end: 'top 20%', toggleActions: 'play pause resume reverse', markers: true },
            x: -300, opacity: 0, duration: 1.5,
        });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test17 - ScrollTrigger toggleActions</h2>
                <p className="desc">toggleActions로 재생 제어</p>
                <div style={{ height: '60vh' }}></div>
                <div ref={boxRef} className="box">toggleActions</div>
                <div style={{ height: '100vh' }}></div>
            </div>
        </div>
    );
}

export default Section1;
