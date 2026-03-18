import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 6;
// images 폴더에 있는 cat0.png ~ cat5.png 사용
const images = Array.from({ length: frameCount }, (_, i) => `/images/cat${i}.png`);

function Section2() {
    const conRef = useRef(null);
    const stageRef = useRef(null);

    useGSAP(() => {
        const stage = stageRef.current;
        if (!stage) return;

        // 이미지 프리로드
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });

        // 초기 프레임 설정
        gsap.set(stage, { backgroundImage: `url(${images[0]})` });
        let currentIndex = -1;

        ScrollTrigger.create({
            trigger: conRef.current,
            start: 'top top',
            end: '+=1500', // 스크롤 길이를 늘려 애니메이션 지속시간 확보
            scrub: true,
            pin: true,
            onUpdate: (self) => {
                const newIndex = Math.min(frameCount - 1, Math.floor(self.progress * frameCount));
                if (newIndex !== currentIndex) {
                    currentIndex = newIndex;
                    stage.style.backgroundImage = `url(${images[currentIndex]})`;
                }
            },
        });
    }, { scope: conRef });

    return (
        <div id="section2" className="con con2" ref={conRef}>
            <div className="inner">
                <h2>Consectetur Adipiscing</h2>
                <article className="character">
                    <div className="stage" ref={stageRef}></div>
                </article>
            </div>
        </div>
    );
}

export default Section2;
