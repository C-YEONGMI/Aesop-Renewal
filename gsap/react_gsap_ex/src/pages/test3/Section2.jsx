import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section2() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });

        // Position 파라미터를 사용한 세밀한 타이밍 제어
        tl.to('.box1', { x: 300, rotation: 360, duration: 1 }) // 기준
            .to('.box2', { x: 300, rotation: 360, duration: 1 }, "-=0.5") // 0.5초 당겨서 (겹침)
            .to('.box3', { x: 300, rotation: 360, duration: 1 }, "<")     // 이전 애니메이션과 동시 시작
            .to('.box4', { x: 300, rotation: 360, duration: 1 }, "+=0.5"); // 0.5초 미뤄서 (간격)

    }, { scope: sectionRef });

    return (
        <div id="section2" className="con con2" ref={sectionRef}>
            <div className="inner">
                <h2>Test3 - Timeline Position Parameter</h2>
                <p className="desc">
                    "-=0.5", "&lt;", "+=0.5" 등의 Position Parameter로 타이밍을 세밀하게 조절합니다.
                </p>
                <div className="box-container-vertical">
                    <div className="box box1">기준</div>
                    <div className="box box2">-=0.5</div>
                    <div className="box box3">&lt;</div>
                    <div className="box box4">+=0.5</div>
                </div>
            </div>
        </div>
    );
}

export default Section2;
