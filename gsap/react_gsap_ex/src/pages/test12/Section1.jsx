import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section1() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        gsap.to('.box', { rotation: 360, duration: 2, transformOrigin: 'center center', repeat: -1, ease: 'none' });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test12 - Rotation</h2>
                <p className="desc">rotation, transformOrigin 회전</p>
                <div className="box">Rotate</div>
            </div>
        </div>
    );
}

export default Section1;
