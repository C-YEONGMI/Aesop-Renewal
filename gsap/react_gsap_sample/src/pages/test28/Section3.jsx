import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const galleryData = [
    { img: '/images/img6.jpeg', title: 'Lorem Ipsum', desc: 'Dolor sit amet consectetur' },
    { img: '/images/img7.jpeg', title: 'Adipiscing Elit', desc: 'Sed do eiusmod tempor' },
    { img: '/images/img8.jpeg', title: 'Incididunt Ut', desc: 'Labore et dolore magna' },
    { img: '/images/img9.jpeg', title: 'Aliqua Enim', desc: 'Ad minim veniam quis' },
    { img: '/images/img10.jpeg', title: 'Nostrud Exerc', desc: 'Ullamco laboris nisi' },
    { img: '/images/img11.jpeg', title: 'Duis Aute', desc: 'Irure dolor in reprehenderit' },
];

function Section3() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // 타이틀 등장 애니메이션
        gsap.from('h2', {
            scrollTrigger: {
                trigger: 'h2',
                start: 'top 85%',
                end: 'top 50%',
                toggleActions: 'play none none none',
            },
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });

        // 설명 텍스트 등장
        gsap.from('.section3-desc', {
            scrollTrigger: {
                trigger: '.section3-desc',
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2,
        });

        // 갤러리 아이템 등장 애니메이션
        gsap.from('.gallery-item', {
            scrollTrigger: {
                trigger: '.gallery',
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
            y: 80,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.12,
        });

        // 푸터 텍스트 등장
        gsap.from('.footer-text', {
            scrollTrigger: {
                trigger: '.footer-text',
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power2.out',
        });
    }, { scope: sectionRef });

    return (
        <div id="section3" className="con con3" ref={sectionRef}>
            <div className="inner">
                <h2>Lorem Ipsum Dolor</h2>
                <p className="section3-desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis exercitationem ullam vitae iste.
                </p>

                <div className="gallery">
                    {galleryData.map((item, index) => (
                        <div className="gallery-item" key={index}>
                            <img src={item.img} alt={item.title} />
                            <div className="gallery-caption">
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="footer-text">
                    © 2026 Lorem Ipsum — Dolor sit amet
                </p>
            </div>
        </div>
    );
}

export default Section3;
