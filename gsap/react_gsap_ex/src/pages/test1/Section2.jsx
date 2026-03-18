import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section2() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // gsap.to() - 회전(rotation) 및 크기(scale) 애니메이션
        gsap.to('.box-rotate', {
            rotation: 360,
            scale: 1.5,
            duration: 2,
            ease: 'linear',
            repeat: -1
        });
    }, { scope: sectionRef });

    return (
        <div id="section2" className="con con2" ref={sectionRef}>
            <div className="inner">
                <h2>Test1 - gsap.to() 회전 및 크기 조절</h2>
                <p className="desc"><code>rotation</code> 속성과 <code>scale</code> 속성을 애니메이션합니다.</p>
                <div style={{ padding: '50px 0' }}>
                    <div className="box-rotate box" style={{ margin: '0 50px' }}>Rotate</div>
                </div>
            </div>
        </div>
    );
}

export default Section2;
