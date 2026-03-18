import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section1() {
    const sectionRef = useRef(null);
    const pathRefs = useRef([]);

    // 여러 SVG 요소를 하나의 배열 ref에 모아주는 콜백 ref 함수
    const addToRefs = (el) => {
        if (el && !pathRefs.current.includes(el)) {
            pathRefs.current.push(el);
        }
    };

    useGSAP(() => {
        // SVG 선 그리기: 점선 길이와 offset을 조절하여 선이 그려지는 효과
        pathRefs.current.forEach((p) => {
            const len = p.getTotalLength();
            gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
            gsap.to(p, { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut' });
        });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test23 - SVG 애니메이션</h2>
                <p className="desc">SVG 요소에 GSAP 적용</p>
                <svg width="300" height="200" viewBox="0 0 300 200">
                    <circle ref={addToRefs} className="svg-line" cx="150" cy="100" r="80" fill="none" stroke="#667eea" strokeWidth="4" />
                    <line ref={addToRefs} className="svg-line" x1="50" y1="100" x2="250" y2="100" stroke="#764ba2" strokeWidth="3" />
                </svg>
            </div>
        </div>
    );
}

export default Section1;
