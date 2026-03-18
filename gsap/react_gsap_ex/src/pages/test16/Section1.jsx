import { useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(SplitText);

function Section1() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const split = new SplitText('h2', { type: 'chars, words' });
        gsap.from(split.chars, { yPercent: 100, opacity: 0, duration: 0.8, stagger: 0.03, ease: 'back.out(1.7)' });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test16 - SplitText</h2>
                <p className="desc">SplitText로 텍스트 애니메이션</p>
                
            </div>
        </div>
    );
}

export default Section1;
