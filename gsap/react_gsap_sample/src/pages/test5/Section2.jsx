import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const projectImages = [
    ["/assets/img1.png", "/assets/img2.png", "/assets/img3.png", "/assets/img4.png"]
];

function Section2() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const cubeContainers = gsap.utils.toArray('.cube-container', sectionRef.current);

        ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                const scrollY = self.scroll();
                // rotateY(좌우)로 회전축 변경
                const rotateVal = (scrollY / 2) % 360;
                const scrollOffset = scrollY * 0.25;

                cubeContainers.forEach((container) => {
                    const cubes = container.querySelectorAll('.cube');

                    cubes.forEach((cube, cubeIndex) => {
                        let rotationDirection = cubeIndex % 2 === 0 ? -1 : 1; // 회전 방향 반대로 변경

                        // GSAP set을 이용해 Vanilla JS 역할을 대체 (React 호환) - rotateY 사용
                        gsap.set(cube, {
                            rotateY: rotateVal * rotationDirection,
                            z: 100 // translateZ(100px) 고정
                        });
                    });
                });
            }
        });
    }, { scope: sectionRef });

    return (
        <section className="section2" ref={sectionRef}>
            {projectImages.map((images, idx) => {
                const [img1, img2, img3, img4] = images;

                return (
                    <div className={`item project-${idx + 1}`} key={idx}>
                        <div className="cube-container">
                            {/* 이미지 큐브 단일 렌더링 */}
                            <div className="cube" style={{ left: 'calc(50% - 100px)' }}>
                                <div className="side front"><img src={img1} alt="" /></div>
                                <div className="side back"><img src={img2} alt="" /></div>
                                <div className="side left-side"><img src={img3} alt="" /></div>
                                <div className="side right-side"><img src={img4} alt="" /></div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}

export default Section2;
