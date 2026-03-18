import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
    { title: 'Lorem Ipsum' },
    { title: 'Dolor Sit Amet' },
    { title: 'Consectetur Adipiscing' },
    { title: 'Sed Do Eiusmod' },
    { title: 'Tempor Incididunt' },
];

function Section2() {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // 스크롤에 따라 슬라이드 인덱스 변경 (pin 고정)
    useGSAP(() => {
        if (!sectionRef.current) return;

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${window.innerHeight * SLIDES.length}px`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const newIndex = Math.min(
                    Math.floor(progress * SLIDES.length),
                    SLIDES.length - 1
                );
                setActiveIndex(newIndex);
            },
        });
    }, { scope: sectionRef });

    return (
        <section className="carousel-section" ref={sectionRef}>
            {/* 배경 이미지 (한 장 고정) */}
            <div className="carousel-bg">
                <div className="slide-image active">
                    <img src="/images/img1.jpeg" alt="" />
                </div>
            </div>

            {/* 가운데 고정 텍스트 (블러 전환) */}
            <div className="carousel-text">
                {SLIDES.map((slide, i) => (
                    <h1
                        key={slide.title}
                        className={`slide-title ${i === activeIndex ? 'active' : ''}`}
                    >
                        {slide.title}
                    </h1>
                ))}
            </div>

        </section>
    );
}

export default Section2;
