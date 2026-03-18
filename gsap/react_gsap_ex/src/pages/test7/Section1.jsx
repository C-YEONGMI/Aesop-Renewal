import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section1() {
    const sectionRef = useRef(null);
    const pathRefs = useRef([]);

    const addToRefs = (el) => {
        if (el && !pathRefs.current.includes(el)) {
            pathRefs.current.push(el);
        }
    };

    useGSAP(() => {
        // SVG 선 그리기 효과 (stroke-dasharray & stroke-dashoffset 활용)
        pathRefs.current.forEach((path) => {
            const len = path.getTotalLength();
            // 라인 길이만큼 점선을 만들고, offset을 길이만큼 주어 안 보이게 시작
            gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

            // offset을 0으로 만들어 선이 그려지는 효과 연출
            gsap.to(path, {
                strokeDashoffset: 0,
                duration: 2.5,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true, // 다시 반대로 지워짐
                repeatDelay: 0.5,
            });
        });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test7 - SVG 라인 드로잉</h2>
                <p className="desc">TotalLength와 dashoffset을 사용하여 SVG 선이 지워지고 그려지는 효과를 구현합니다.</p>

                <div className="svg-container">
                    <svg viewBox="0 0 400 200" width="400" height="200" fill="none">
                        <circle ref={addToRefs} className="draw-path" cx="100" cy="100" r="80" stroke="#f1c40f" strokeWidth="4" />
                        <rect ref={addToRefs} className="draw-path" x="220" y="20" width="160" height="160" rx="20" stroke="#e74c3c" strokeWidth="4" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Section1;
