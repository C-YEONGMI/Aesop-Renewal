import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section2() {
    const sectionRef = useRef(null);

    // GSAP React에서 권장하는 이벤트 헨들러 래퍼(Wrapper) contextSafe 사용
    const { contextSafe } = useGSAP({ scope: sectionRef });

    const handleMouseMove = contextSafe((e) => {
        const mag = e.currentTarget;
        const rect = mag.getBoundingClientRect();

        // 요소의 정중앙 기준 마우스의 위치 변화값 계산
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(mag, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
    });

    const handleMouseLeave = contextSafe((e) => {
        const mag = e.currentTarget;
        // 원래 모양(0, 0)으로 짱짱하게 튕겨서 돌아감
        gsap.to(mag, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    });

    return (
        <div id="section2" className="con con2" ref={sectionRef}>
            <div className="inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>Test6 - 마그네틱(Magnetic) 버튼</h2>
                <p className="desc" style={{ textAlign: 'center' }}>가까이 가면 자석처럼 달라붙는 버튼 효과입니다.</p>
                <div className="magnetic-container">
                    <button
                        className="magnetic mag-btn"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >자석 버튼 1</button>

                    <button
                        className="magnetic mag-btn secondary"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >자석 버튼 2</button>
                </div>
            </div>
        </div>
    );
}

export default Section2;
