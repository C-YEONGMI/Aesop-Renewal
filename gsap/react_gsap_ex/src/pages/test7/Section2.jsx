import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section2() {
    const sectionRef = useRef(null);
    const gearRef = useRef(null);

    useGSAP(() => {
        // SVG 그룹 내 요소들을 개별 제어 (회전 및 크기 조절)
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        
        tl.to(gearRef.current, { rotation: 360, transformOrigin: 'center center', duration: 4, ease: 'none' })
          .to(gearRef.current, { scale: 1.5, duration: 2, ease: 'power2.inOut' }, 1)
          .to(gearRef.current, { stroke: '#3498db', duration: 2 }, 1);
          
    }, { scope: sectionRef });

    return (
        <div id="section2" className="con con2" ref={sectionRef}>
            <div className="inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>Test7 - SVG 변형 제어</h2>
                <p className="desc" style={{ textAlign: 'center' }}>SVG 도형의 크기, 회전, 색상 등을 Timeline으로 부드럽게 제어합니다.</p>
                
                <div className="svg-container" style={{ marginTop: '50px' }}>
                    <svg viewBox="0 0 200 200" width="200" height="200">
                        <g ref={gearRef} className="gear" fill="none" stroke="#2ecc71" strokeWidth="6">
                            <circle cx="100" cy="100" r="40" />
                            {/* 톱니바퀴 이빨 모양 */}
                            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
                                <line 
                                    key={angle}
                                    x1="100" y1="50" x2="100" y2="40" 
                                    transform={`rotate(${angle} 100 100)`}
                                    strokeWidth="10" strokeLinecap="round"
                                />
                            ))}
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Section2;
