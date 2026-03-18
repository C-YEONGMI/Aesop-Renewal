import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section1() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // gsap.from() - 시작 상태를 지정하고 원래 CSS 상태로 애니메이션
        gsap.from('.box', {
            y: 100,
            opacity: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: 'back.out(1.5)',
        });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test2 - gsap.from()</h2>
                <p className="desc">요소가 100px 아래에서 투명하게 시작하여 제자리로 올라옵니다.</p>
                <div className="box-container">
                    <div className="box box1">1</div>
                    <div className="box box2">2</div>
                    <div className="box box3">3</div>
                </div>
            </div>
        </div>
    );
}

export default Section1;
