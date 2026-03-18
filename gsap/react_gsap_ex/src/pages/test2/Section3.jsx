import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section3() {
    const sectionRef = useRef(null);
    const [color, setColor] = useState('#fff');

    useGSAP(() => {
        // gsap.set() - 애니메이션 없이 즉시 상태 변경 (초기화에 유용)
        gsap.set('.hidden-box', { opacity: 0, y: 50 });

        // gsap.delayedCall() - 특정 시간 후 함수 실행 (setTimeout 대체)
        gsap.delayedCall(3, () => {
            gsap.to('.hidden-box', { opacity: 1, y: 0, duration: 1, stagger: 0.3 });
            setColor('#2ecc71');
        });

    }, { scope: sectionRef });

    return (
        <div id="section3" className="con con3" ref={sectionRef}>
            <div className="inner">
                <h2>Test2 - gsap.set() & delayedCall()</h2>
                <p className="desc" style={{ color }}>
                    gsap.set()으로 숨겨둔 후, delayedCall로 1.5초 뒤에 등장합니다.
                </p>
                <div className="box-container">
                    <div className="box hidden-box">Set 1</div>
                    <div className="box hidden-box">Set 2</div>
                </div>
            </div>
        </div>
    );
}

export default Section3;
