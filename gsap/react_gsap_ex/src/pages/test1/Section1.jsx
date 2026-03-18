import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section1() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // gsap.to() - 요소를 현재 상태에서 지정한 상태(목표)로 이동
        gsap.to('.box', {
            x: 300,
            duration: 2,
            ease: 'power2.out',
            repeat: -1, // 무한 반복  
            yoyo: true  // 왕복 이동
        });
    }, { scope: sectionRef });
    // scope: sectionRef
    // - useGSAP 내부에서 만든 모든 GSAP 애니메이션의 탐색 범위를 sectionRef 안으로 제한
    // - 컴포넌트가 언마운트(화면에서 사라질 때)되면 내부 애니메이션을 자동으로 정리(cleanup)
    // - 다른 컴포넌트에 같은 클래스명이 있어도 이 섹션 안의 요소만 대상으로 동작

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test1 - gsap.to() 기본 이동</h2>
                <p className="desc">가장 기본적인 <code>gsap.to()</code> 메서드입니다. X축으로 300px 이동합니다.</p>
                <div className="box">gsap.to()</div>
            </div>
        </div>
    );
}

export default Section1;
