import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section1() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        gsap.to('.box', { borderRadius: '50%', rotation: 180, duration: 2, repeat: -1, yoyo: true, ease: 'power2.inOut' });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test22 - Border Radius</h2>
                <p className="desc">borderRadius 변형 애니메이션</p>
                <div className="box">Morph</div>
            </div>
        </div>
    );
}

export default Section1;
