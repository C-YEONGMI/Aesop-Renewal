import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
        // clipPath: 원형 마스크가 중앙에서 점점 커지며 요소가 나타나는 효과
        // from만 쓰면 도착 상태(clipPath)가 CSS에 없어서 효과가 안 보임 -> fromTo로 시작/끝 모두 명시
        gsap.fromTo(boxRefs.current,
            { clipPath: 'circle(0% at 50% 50%)' },
            { clipPath: 'circle(100% at 50% 50%)', duration: 2, ease: 'power3.out', stagger: 0.3 }
        );
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test21 - Clip-path 애니메이션</h2>
                <p className="desc">clipPath로 마스크 효과</p>
                <div ref={addToRefs} className="box">1</div>
                <div ref={addToRefs} className="box">2</div>
                <div ref={addToRefs} className="box">3</div>
            </div>
        </div>
    );
}

export default Section1;
