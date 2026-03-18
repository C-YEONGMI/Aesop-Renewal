import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section1() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // gsap.timeline() - 순차적인 애니메이션 작성 (체이닝)
        const tl = gsap.timeline();

        // 박스들이 하나가 끝나면 다음이 위에서 떨어지며 나타남
        tl.from('.box1', { y: -100, opacity: 0, duration: 0.5, ease: 'bounce.out' })
            .from('.box2', { y: -100, opacity: 0, duration: 0.5, ease: 'bounce.out' })
            .from('.box3', { y: -100, opacity: 0, duration: 0.5, ease: 'bounce.out' });

    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test3 - gsap.timeline()</h2>
                <p className="desc">타임라인을 사용하면 애니메이션이 체인처럼 하나씩 순서대로 실행됩니다.</p>
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
