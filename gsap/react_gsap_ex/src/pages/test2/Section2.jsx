import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section2() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // gsap.fromTo() - 시작 상태와 끝 상태를 모두 지정
        gsap.fromTo('.circle',
            { x: -200, scale: 0, opacity: 0 }, // from (시작)
            { x: 300, scale: 1, opacity: 1, duration: 2, ease: 'elastic.out(1, 0.4)', repeat: -1, yoyo: true } // to (끝)
        );
    }, { scope: sectionRef });

    return (
        <div id="section2" className="con con2" ref={sectionRef}>
            <div className="inner">
                <h2>Test2 - gsap.fromTo()</h2>
                <p className="desc">시작점과 끝점을 명확히 지정하여 끊김 없이 왕복 애니메이션을 구현합니다.</p>
                <div className="box-container">
                    <div className="circle">A</div>
                </div>
            </div>
        </div>
    );
}

export default Section2;
