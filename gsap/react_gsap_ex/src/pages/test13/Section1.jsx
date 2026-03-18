import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section1() {
    const sectionRef = useRef(null);
    const boxRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(boxRef.current, { opacity: 0, duration: 1 })
            .to(boxRef.current, { opacity: 1, duration: 1 });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test13 - Opacity </h2>
                <p className="desc">opacity로 페이드인/아웃</p>
                <div ref={boxRef} className="box">Fade</div>
            </div>
        </div>
    );
}

export default Section1;
