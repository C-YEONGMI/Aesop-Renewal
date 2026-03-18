import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section1() {
    const sectionRef = useRef(null);
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    const box3Ref = useRef(null);

    useGSAP(() => {
        // addLabel: 타임라인의 특정 시점에 이름표를 붙여 구간을 나누어 관리
        const tl = gsap.timeline();
        tl.addLabel('start')
            .to(box1Ref.current, { x: 300, duration: 1 })
            .addLabel('middle')
            .to(box2Ref.current, { x: 300, duration: 1 })
            .addLabel('end')
            .to(box3Ref.current, { x: 300, duration: 1 });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test20 - Timeline Labels</h2>
                <p className="desc">timeline label로 구간 관리</p>
                <div ref={box1Ref} className="box box1">start</div>
                <div ref={box2Ref} className="box box2">middle</div>
                <div ref={box3Ref} className="box box3">end</div>
            </div>
        </div>
    );
}

export default Section1;
