import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section1() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.addLabel('start')
            .to('.box1', { x: 300, duration: 1 })
            .addLabel('middle')
            .to('.box2', { x: 300, duration: 1 })
            .addLabel('end')
            .to('.box3', { x: 300, duration: 1 });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test20 - Timeline Labels</h2>
                <p className="desc">timeline label로 구간 관리</p>
                <div className="box box1">start</div>
                <div className="box box2">middle</div>
                <div className="box box3">end</div>
            </div>
        </div>
    );
}

export default Section1;
