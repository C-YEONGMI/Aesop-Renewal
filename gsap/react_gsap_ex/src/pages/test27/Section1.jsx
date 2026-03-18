import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section1() {
    const sectionRef = useRef(null);
    const stageRef = useRef(null);

    useGSAP(() => {
        // 스크롤 진행도에 따라 배경 이미지를 순차적으로 교체하여 프레임 애니메이션 구현
        const frameCount = 6;
        const imgs = Array.from({ length: frameCount }, (_, i) => '/images/cat' + i + '.png');
        // 이미지 프리로드 (스크롤 시 깜빡임 방지)
        imgs.forEach((src) => { const img = new Image(); img.src = src; });

        gsap.set(stageRef.current, { backgroundImage: 'url(' + imgs[0] + ')' });
        let currentIndex = -1;

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=1500',
            scrub: true,
            pin: true,
            onUpdate: (self) => {
                // 스크롤 진행률(0~1)을 프레임 인덱스로 변환
                const idx = Math.min(frameCount - 1, Math.floor(self.progress * frameCount));
                if (idx !== currentIndex) {
                    currentIndex = idx;
                    stageRef.current.style.backgroundImage = 'url(' + imgs[idx] + ')';
                }
            },
        });
    }, { scope: sectionRef });

    return (
        <div id="section1" className="con con1" ref={sectionRef}>
            <div className="inner">
                <h2>Test27 - Frame Animation</h2>
                <p className="desc">스크롤 연동 프레임 애니메이션</p>
                <div ref={stageRef} className="stage" style={{ width: '450px', height: '500px', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '20px', margin: '0 auto', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}></div>
            </div>
        </div>
    );
}

export default Section1;
