import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section1() {
    const sectionRef = useRef(null);
    const boxRefs = useRef([]);

    // 여러 요소를 하나의 배열 ref에 모아주는 콜백 ref 함수
    // JSX에서 ref={addToRefs}로 달면 해당 DOM 요소가 boxRefs 배열에 자동 수집됨
    const addToRefs = (el) => {
        if (el && !boxRefs.current.includes(el)) {
            boxRefs.current.push(el);
        }
    };

    useGSAP(() => {
        gsap.from(boxRefs.current, { scale: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)', stagger: 0.15 });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test11 - Scale 애니메이션</h2>
                <p className="desc">scale, scaleX, scaleY 변환</p>
                <div ref={addToRefs} className="box">1</div>
                <div ref={addToRefs} className="box">2</div>
                <div ref={addToRefs} className="box">3</div>
            </div>
        </div>
    );
}

export default Section1;
