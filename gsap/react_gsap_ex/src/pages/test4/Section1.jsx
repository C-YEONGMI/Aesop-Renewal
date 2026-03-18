import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section1() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // 기본 ScrollTrigger 애니메이션 (스크롤하면 클래식하게 1회 동작)
        gsap.from('.box', {
            scrollTrigger: {
                trigger: '.box',        // 트리거될 요소
                start: 'top 80%',       // [트리거요소 위치] [뷰포트 위치]
                end: 'top 20%',
                toggleActions: 'play none none none', // 스크롤 시 1번만 플레이
                markers: true,          // 개발용 마커 표시
            },
            x: -300,
            opacity: 0,
            duration: 1.5,
            ease: 'power3.out',
        });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test4 - ScrollTrigger 기본</h2>
                <p className="desc">스크롤이 80% 지점에 닿으면 요소가 나타납니다.</p>
                <div style={{ height: '50vh' }}></div> {/* 스크롤 여백 역할 */}
                <div className="box">Trigger Element</div>
                <div style={{ height: '50vh' }}></div>
            </div>
        </div>
    );
}

export default Section1;
