import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section1() {
    const sectionRef = useRef(null);
    const boxRef = useRef(null);

    useGSAP(() => {
        gsap.to(boxRef.current, { backgroundColor: '#e74c3c', color: '#fff', duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test14 - Color 애니메이션</h2>
                <p className="desc">backgroundColor, color 변환</p>
                <div ref={boxRef} className="box">Color</div>
            </div>
        </div>
    );
}

export default Section1;
