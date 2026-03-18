import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section1() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // 배경 이미지 패럴랙스 (배경 이미지 위치를 y값으로 조절)
        gsap.to('.parallax-bg', {
            yPercent: 30, // 화면이 내려갈 때 배경은 천천히 내려가 패럴랙스 생성
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="parallax-bg"></div>
            <div className="inner">
                <h2>Test5 - 배경 (Parallax)</h2>
                <p className="desc">스크롤 시 텍스트와 배경 이미지의 속도를 다르게 주어 입체감을 줍니다.</p>
            </div>
        </div>
    );
}

export default Section1;
