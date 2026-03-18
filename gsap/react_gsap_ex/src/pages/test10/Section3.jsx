import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section3() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // 스크롤하면서 배경 컬러가 서서히 다른 색으로 모핑됨
        gsap.to(sectionRef.current, {
            backgroundColor: '#e74c3c',
            color: '#fff',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom', // con3가 화면 가장 아래에 닿을 때
                end: 'center center', // con3 중앙이 화면 중앙에 닿았을 때 완성
                scrub: true, // 스크롤바와 연동
            }
        });
    }, { scope: sectionRef });

    return (
        <div id="section3" className="con con3" ref={sectionRef}>
            <div className="inner flex-center" style={{ flexDirection: 'column' }}>
                <h2>Test10 - 배경색 Scrub 변환</h2>
                <p className="desc">스크롤 진행도에 맞춰 컨테이너의 배경색과 글자색이 부드럽게 변합니다.</p>
            </div>
        </div>
    );
}

export default Section3;
