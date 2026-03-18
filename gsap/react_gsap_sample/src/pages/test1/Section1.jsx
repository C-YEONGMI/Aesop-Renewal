import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Section1() {
    // React 방식으로 DOM에 접근하기 위해 useRef 사용
    const sectionRef = useRef(null);
    const heroContentRef = useRef(null);
    const heroImgRef = useRef(null);

    useGSAP(() => {
        const viewportHeight = window.innerHeight;

        // 이동할 총 거리 계산
        const heroContentMoveDistance = heroContentRef.current.offsetHeight - viewportHeight;
        const heroImgMoveDistance = heroImgRef.current.offsetHeight - viewportHeight;

        // 부드러운 시작-끝 가속도(Easing) 수식
        const customEase = (x) => x * x * (3 - 2 * x);

        // onUpdate 수동 계산 대신, GSAP Timeline을 활용한 선언적 애니메이션 작성
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: `+=${viewportHeight * 4}px`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
            }
        });

        // 1. 텍스트 콘텐츠 이동 (처음부터 끝까지 일정하게 이동, 전체 duration을 1로 기준)
        tl.to(heroContentRef.current, {
            y: -heroContentMoveDistance,
            ease: 'none',
            duration: 1
        }, 0);

        // 2. 배경 이미지 Parallax (조건부 애니메이션을 타임라인 배치로 구현)
        // 0.00 ~ 0.45 구간: 전체 거리의 65% 지점까지 이동
        tl.to(heroImgRef.current, {
            y: heroImgMoveDistance * 0.65,
            ease: customEase,
            duration: 0.45
        }, 0);

        // 0.45 ~ 0.75 구간은 빈 공간(기다림)이므로 타임라인에 아무것도 배치하지 않음

        // 0.75 ~ 1.00 구간: 남은 35% 거리를 이동하여 총 100% 도달
        tl.to(heroImgRef.current, {
            y: heroImgMoveDistance,
            ease: customEase,
            duration: 0.25
        }, 0.75);

    }, { scope: sectionRef });

    return (
        <section className="hero" ref={sectionRef}>
            <div className="hero-img" ref={heroImgRef}>
                <img src="/images/bg1.jpg" alt="hero" />
            </div>

            <div className="hero-content" ref={heroContentRef}>
                <div className="hero-content-block">
                    <div className="hero-content-copy">
                        <h1>Title 1</h1>
                    </div>
                </div>
                <div className="hero-content-block">
                    <div className="hero-content-copy">
                        <h2>Title 2</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quo ducimus in
                        </p>
                    </div>
                </div>
                <div className="hero-content-block">
                    <div className="hero-content-copy">
                        <h2>Title 3</h2>
                        <p>
                            tempora ad natus illo fugiat. Sequi cum nihil excepturi animi, dolor quibusdam natus nemo provident dolore ipsum enim!
                        </p>
                    </div>
                </div>
                <div className="hero-content-block">
                    <div className="hero-content-copy">
                        <h2>Title 4</h2>
                        <p>
                            excepturi animi, dolor quibusdam natus nemo provident dolore ipsum enim!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Section1;
