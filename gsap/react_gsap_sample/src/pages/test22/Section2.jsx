import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const slidesData = [
    { title: "Lorem Ipsum\nDolor Sit", src: "/images/img1.jpeg" },
    { title: "Amet Consectetur\nAdipiscing Elit", src: "/images/img2.jpeg" },
    { title: "Sed Do Eiusmod\nTempor Incididunt", src: "/images/img3.jpeg" },
    { title: "Ut Labore\nEt Dolore", src: "/images/img4.jpeg" },
    { title: "Magna Aliqua\nQuis Nostrud", src: "/images/img5.jpeg" },
];

function Section2() {
    const sectionRef = useRef(null);
    const sliderRef = useRef(null);
    const slidesContainerRef = useRef(null);
    const titleRefs = useRef([]);
    const imgRefs = useRef([]);

    useGSAP(() => {
        const slidesContainer = slidesContainerRef.current;
        const stickyHeight = window.innerHeight * 6;
        const totalMove = slidesContainer.offsetWidth - window.innerWidth;

        // 1. 초기 타이틀 안 보이게 세팅 (CSS에선 clip-path 영역 밖)
        titleRefs.current.forEach((title) => {
            if (title) gsap.set(title, { y: -200 });
        });

        // 2. 가로 스크롤 메인 타임라인 (containerAnimation 기준점)
        // 수동으로 onUpdate에서 계산하지 않고 GSAP Timeline으로 깔끔하게 처리
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${stickyHeight}px`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
            }
        });

        tl.to(slidesContainer, {
            x: -totalMove,
            ease: "none"
        });

        // 3. 개별 슬라이드 연동 (IntersectionObserver와 연산 로직을 GSAP 기능으로 완벽히 치환)
        const slides = gsap.utils.toArray('.slide', slidesContainer);

        slides.forEach((slide, index) => {
            const title = titleRefs.current[index];
            const img = imgRefs.current[index];

            // A. 타이틀 등장/퇴장 모션 (Vanilla JS의 IntersectionObserver 대체)
            ScrollTrigger.create({
                trigger: slide,
                containerAnimation: tl, // 가로 스크롤 타임라인에 좌표 종속
                start: "left 75%", // 슬라이드 좌측이 화면 기준 75%에 도달했을 때
                end: "right 25%",  // 슬라이드 우측이 화면 기준 25%를 빠져나갈 때
                onEnter: () => gsap.to(title, { y: 0, duration: 0.5, ease: "power2.out", overwrite: true }),
                onLeave: () => gsap.to(title, { y: -200, duration: 0.5, ease: "power2.out", overwrite: true }),
                onEnterBack: () => gsap.to(title, { y: 0, duration: 0.5, ease: "power2.out", overwrite: true }),
                onLeaveBack: () => gsap.to(title, { y: -200, duration: 0.5, ease: "power2.out", overwrite: true })
            });

            // B. 이미지 패럴랙스 (수동 비율 계산 -> GSAP Scrub 타임라인 기반으로 자동화)
            // x 속성이 아닌 xPercent 로 최적화
            if (img) {
                gsap.fromTo(img,
                    { xPercent: -25 }, // 나타날 때 좌측 쏠림
                    {
                        xPercent: 25,  // 사라질 때 우측 쏠림 (패럴랙스 효과 최대치 지정)
                        ease: "none",
                        scrollTrigger: {
                            trigger: slide,
                            containerAnimation: tl,
                            start: "left right", // 화면 가장자리에 닿기 시작할 때
                            end: "right left",   // 화면을 완전히 벗어날 때
                            scrub: true
                        }
                    }
                );
            }
        });

    }, { scope: sectionRef });

    return (
        <section className="sticky" ref={sectionRef}>
            <div className="slider" ref={sliderRef}>
                <div className="slides" ref={slidesContainerRef}>
                    {slidesData.map((data, idx) => (
                        <div className="slide" key={idx}>
                            <div className="img">
                                <img src={data.src} alt="" ref={el => imgRefs.current[idx] = el} />
                            </div>
                            <div className="title">
                                <h1 ref={el => titleRefs.current[idx] = el}>
                                    {data.title.split('\n').map((line, i) => (
                                        <span key={i}>{line}<br /></span>
                                    ))}
                                </h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Section2;
