import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section3() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // gsap.to() - 여러 대상(stagger) 및 투명도(opacity)/배경색 애니메이션
        gsap.to('.box-multi', {
            y: -100,
            opacity: 0.5,
            backgroundColor: '#e74c3c',
            borderRadius: '50%',
            duration: 1.5,
            stagger: 0.3, // 0.3초 간격으로 순차 실행
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true
        });
    }, { scope: sectionRef });

    return (
        <div id="section3" className="con con3" ref={sectionRef}>
            <div className="inner">
                <h2>Test1 - gsap.to() 다중 요소 제어 (stagger)</h2>
                <p className="desc">동일한 클래스를 가진 여러 요소를 <code>stagger</code> 속성을 이용해 순차적으로 애니메이션합니다.</p>
                <div style={{ display: 'flex', gap: '20px', padding: '50px 0' }}>
                    <div className="box-multi box">1</div>
                    <div className="box-multi box">2</div>
                    <div className="box-multi box">3</div>
                    <div className="box-multi box">4</div>
                </div>
            </div>
        </div>
    );
}

export default Section3;
