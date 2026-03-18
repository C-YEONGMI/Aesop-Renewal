import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import lottie from 'lottie-web';

gsap.registerPlugin(ScrollTrigger);

function Section2() {
    const wrapperRef = useRef(null);
    const heroImgRef = useRef(null);
    const lottieContainerRef = useRef(null);
    const aboutRef = useRef(null);
    const lottieAnimationRef = useRef(null);

    useGSAP(() => {
        // 로티 애니메이션 로드
        lottieAnimationRef.current = lottie.loadAnimation({
            container: lottieContainerRef.current,
            path: "/images/duck.json", // public/images 에 위치 가정
            renderer: "svg",
            autoplay: false,
        });

        const heroImg = heroImgRef.current;
        const lottieContainer = lottieContainerRef.current;
        const about = aboutRef.current;

        // 초기 너비 세팅
        const heroImgInitialWidth = heroImg.offsetWidth;
        const heroImgTargetWidth = 300;

        let scrollDirection = "down";
        let isAnimationPaused = false;

        // ScrollTrigger 방향 감지 함수
        const updateDirection = (self) => {
            scrollDirection = self.direction === 1 ? "down" : "up";
        };

        // 1. About 섹션에서 이미지 크기 줄어들기
        ScrollTrigger.create({
            trigger: about,
            start: "top bottom",
            end: "top 30%",
            scrub: 1,
            onUpdate: (self) => {
                const currentWidth = heroImgInitialWidth - self.progress * (heroImgInitialWidth - heroImgTargetWidth);
                gsap.set(heroImg, { width: `${currentWidth}px` });
                updateDirection(self);
            }
        });

        // 2. About 섹션 상단 통과 후 로티 컨테이너 위로 이동
        ScrollTrigger.create({
            trigger: about,
            start: "top 30%",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
                const lottieOffset = self.progress * window.innerHeight * 1.1;
                isAnimationPaused = self.progress > 0;

                gsap.set(lottieContainer, {
                    y: -lottieOffset,
                    rotateY: scrollDirection === "up" ? -180 : 0,
                });

                updateDirection(self);
            }
        });

        // 3. Hero 영역 통과 시 로티 애니메이션 프레임 재생
        ScrollTrigger.create({
            trigger: ".hero", // Section1에 있는 영역 (전역 탐색)
            start: "top top",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
                if (!isAnimationPaused && lottieAnimationRef.current) {
                    const scrollDistance = self.scroll() - self.start;
                    const pixelsPerFrame = 3;
                    const totalFrames = lottieAnimationRef.current.totalFrames;

                    if (totalFrames > 0) {
                        const frame = Math.floor(scrollDistance / pixelsPerFrame) % totalFrames;
                        lottieAnimationRef.current.goToAndStop(frame, true);
                    }
                }

                gsap.set(lottieContainer, {
                    rotateY: scrollDirection === "up" ? -180 : 0,
                });
                updateDirection(self);
            }
        });

        return () => {
            // Unmount 시 메모리 누수 방지
            if (lottieAnimationRef.current) {
                lottieAnimationRef.current.destroy();
            }
        };
    }, { scope: document.body }); // .hero 를 찾기 위해 전역 탐색 필요

    return (
        <div ref={wrapperRef}>
            {/* Lottie Container (Fixed Position) */}
            <div className="lottie-container">
                <div className="lottie" ref={lottieContainerRef}></div>
                <div className="hero-img" ref={heroImgRef}>
                    <img src="/images/img8.jpeg" alt="Hero Background" />
                </div>
            </div>

            {/* About Section */}
            <section className="about" ref={aboutRef}>
                <h1>Lorem ipsum dolor sit    </h1>
            </section>
        </div>
    );
}

export default Section2;
