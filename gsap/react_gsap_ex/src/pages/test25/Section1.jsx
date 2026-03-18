import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section1() {
    const sectionRef = useRef(null);
    const boxRefs = useRef([]);

    // 여러 요소를 하나의 배열 ref에 모아주는 콜백 ref 함수
    const addToRefs = (el) => {
        if (el && !boxRefs.current.includes(el)) {
            boxRefs.current.push(el);
        }
    };

    useGSAP(() => {
        // 처음에 요소들을 안 보이게 설정 (깜빡임 방지)
        gsap.set(boxRefs.current, { y: 60, opacity: 0 });

        // batch: 화면에 들어오는 요소들을 묶어서 한꺼번에 애니메이션 처리
        ScrollTrigger.batch(boxRefs.current, {
            onEnter: (elements) => gsap.to(elements, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }),
            start: 'top 85%',
        });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test25 - Batch ScrollTrigger</h2>
                <p className="desc">ScrollTrigger.batch() 활용</p>
                <div style={{ height: '40vh' }}></div>
                <div ref={addToRefs} className="box">1</div>
                <div ref={addToRefs} className="box">2</div>
                <div ref={addToRefs} className="box">3</div>
                <div ref={addToRefs} className="box">4</div>
                <div ref={addToRefs} className="box">5</div>
                <div style={{ height: '100vh' }}></div>
            </div>
        </div>
    );
}

export default Section1;
