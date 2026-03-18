import { useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(SplitText, ScrollTrigger);

function Section2() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        // 텍스트를 줄 단위(lines)로 나누어 마스킹 효과 (overflow: hidden 컨테이너 내에서 올라오기)
        // SplitText는 type: "lines"를 사용할 때 .line이라는 wrapper를 추가하여 마스킹하기 좋습니다.
        const split = new SplitText(textRef.current, { type: 'lines' });
        const splitParent = new SplitText(textRef.current, { type: 'lines', linesClass: 'line-wrapper' });
        
        // CSS에서 .line-wrapper에 overflow: hidden을 줍니다.
        
        gsap.from(split.lines, {
            yPercent: 100,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current, // 스크롤 트리거 대상을 ref로 명시
                start: 'top 60%',
            }
        });
    }, { scope: sectionRef });

    return (
        <div id="section2" className="con con2" ref={sectionRef}>
            <div className="inner">
                <h2>Test8 - 줄 단위(Lines) 마스킹 애니메이션</h2>
                <p className="desc">컨테이너에서 텍스트가 위로 부드럽게 솟아오르는 전형적인 타이포 액션입니다.</p>
                <div style={{ marginTop: '50px' }}>
                    <p ref={textRef} className="split-lines" style={{ fontSize: '2.5rem', lineHeight: '1.4', fontWeight: 'bold' }}>
                        This is a multi-line paragraph.
                        GSAP SplitText makes it incredibly easy
                        to animate text line by line.
                        It automatically wraps each line
                        so you can apply clipping or masking.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Section2;
