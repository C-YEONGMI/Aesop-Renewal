import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section1() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    const box3Ref = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, yoyo: true });

        tl.from(box1Ref.current, { x: -200, opacity: 0, scale: 0.5, duration: 1, ease: 'back.out(2)' })
            .from(box2Ref.current, { y: -200, opacity: 0, scale: 0.5, duration: 1, ease: 'bounce.out' }, '-=0.5')
            .from(box3Ref.current, { x: 200, opacity: 0, scale: 0.5, duration: 1, ease: 'power4.out' }, '-=0.5')
            .to(containerRef.current, { rotation: 180, duration: 1.5, ease: 'power2.inOut' })
            .to([box1Ref.current, box2Ref.current, box3Ref.current], { borderRadius: '50%', backgroundColor: '#f1c40f', duration: 1 }, '<');

    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test9 - 복합 타임라인</h2>
                <p className="desc">여러 요소가 순차적으로 나타난 후 전체 그룹을 회전시키고 다시 형태를 바꿉니다.</p>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
                    <div ref={containerRef} className="tl-container" style={{ display: 'flex', gap: '20px' }}>
                        <div ref={box1Ref} className="tl-box tl-box-1 box">A</div>
                        <div ref={box2Ref} className="tl-box tl-box-2 box">B</div>
                        <div ref={box3Ref} className="tl-box tl-box-3 box">C</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Section1;
