import { useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(SplitText);

function Section1() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        // 텍스트를 글자 단위(chars)로 나누어 각각 애니메이션 적용 (클래스명 대신 ref 사용)
        const split = new SplitText(textRef.current, { type: 'chars' });
        
        gsap.from(split.chars, {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.05,
            ease: 'back.out(2)',
            delay: 0.5,
        });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test8 - 글자 단위(Chars) 애니메이션</h2>
                <div style={{ marginTop: '50px', overflow: 'hidden' }}>
                    <h1 ref={textRef} className="split-chars" style={{ fontSize: '5rem', lineHeight: '1.2' }}>
                        Hello GSAP
                        <br />
                        SplitText Plugin!
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Section1;
