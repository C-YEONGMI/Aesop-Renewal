import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section2() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // scrub: 스크롤을 내리거나 올릴 때 애니메이션이 실시간으로 동기화됨
        gsap.to('.scrub-box', {
            scrollTrigger: {
                trigger: '.con2',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1, // 1초 지연을 주어 부드럽게 스크롤 따라가기
                markers: true,
            },
            x: '80vw',
            rotation: 720,
            backgroundColor: '#e74c3c',
            borderRadius: '50%',
        });
    }, { scope: sectionRef });

    return (
        <div id="section2" className="con con2" ref={sectionRef}>
            <div className="inner">
                <h2>Test4 - Scrub 속성</h2>
                <p className="desc">Scrub을 사용하면 사용자의 스크롤바 위치에 애니메이션 진행 상태가 묶입니다.</p>
                <div className="scrub-container" style={{ margin: '150px 0' }}>
                    <div className="scrub-box box">Scrub</div>
                </div>
            </div>
        </div>
    );
}

export default Section2;
