import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section1() {
    const sectionRef = useRef(null);
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    const box3Ref = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.to(box1Ref.current, { x: 300, duration: 1 })
            .to(box2Ref.current, { x: 300, duration: 1 }, '-=0.5')
            .to(box3Ref.current, { x: 300, duration: 1 }, '<');
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test15 - Timeline Position</h2>
                <p className="desc">timeline에서 position 파라미터</p>
                <div ref={box1Ref} className="box box1">Box 1</div>
                <div ref={box2Ref} className="box box2">Box 2 (-=0.5)</div>
                <div ref={box3Ref} className="box box3">Box 3 (&lt;)</div>
            </div>
        </div>
    );
}

export default Section1;
