import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Section3() {
    const sectionRef = useRef(null);
    const maskCircleRef = useRef(null);

    useGSAP(() => {
        // SVG 클리핑 패스 (마스크) 애니메이션
        gsap.to(maskCircleRef.current, {
            attr: { r: 300 }, // 요소의 속성(Attribute) 직접 변형
            duration: 2,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true,
            repeatDelay: 0.5,
        });
    }, { scope: sectionRef });

    return (
        <div id="section3" className="con con3" ref={sectionRef}>
            <div className="inner">
                <h2>Test7 - SVG Masking (Clip Path)</h2>
                <p className="desc">SVG 속성 값(attr)을 조작하여 클리핑 반경을 넓혔다 좁힙니다.</p>

                <div className="svg-container" style={{ position: 'relative', width: '100%', height: '400px', background: '#333', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 900, color: '#fff' }}>
                        HIDDEN TEXT
                    </div>

                    {/* SVG 마스크 영역: circle의 반지름(r)을 GSAP으로 조작하여 밝은 부분이 나타남 */}
                    <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} width="100%" height="100%">
                        <defs>
                            <clipPath id="myMask">
                                <circle ref={maskCircleRef} className="mask-circle" cx="50%" cy="50%" r="50" />
                            </clipPath>
                        </defs>
                        <rect width="100%" height="100%" fill="#3498db" clipPath="url(#myMask)" />
                    </svg>

                    <div style={{ position: 'absolute', inset: 0, border: '4px dashed #3498db', pointerEvents: 'none', mixBlendMode: 'overlay' }}></div>
                </div>
            </div>
        </div>
    );
}

export default Section3;
