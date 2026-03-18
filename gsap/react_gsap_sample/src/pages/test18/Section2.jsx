import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_TEXTS = ['Design Beyond Boundaries', 'Built for Tomorrow', 'Real Impact', 'Digital Visions'];

function Section2() {
    const sectionRef = useRef(null);
    const imgWrapRef = useRef(null);
    const imgRef = useRef(null);
    const marqueeRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const revealedRef = useRef(false);

    useGSAP(() => {
        const imgWrap = imgWrapRef.current;
        const img = imgRef.current;
        const marquee = marqueeRef.current;
        const title = titleRef.current;
        const desc = descRef.current;
        if (!imgWrap || !img || !title || !desc) return;

        // 초기 상태
        gsap.set(imgWrap, { scale: 0.5, borderRadius: '400px' });
        gsap.set(img, { scale: 1.5 });
        gsap.set(title, { opacity: 0, y: 40 });
        gsap.set(desc, { opacity: 0, x: 40 });

        // 스크롤 애니메이션
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=300vh',
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const imgScale = 0.5 + progress * 0.5;
                const borderRadius = 400 - progress * 375;
                const innerImgScale = 1.5 - progress * 0.5;

                gsap.set(imgWrap, { scale: imgScale, borderRadius: `${borderRadius}px` });
                gsap.set(img, { scale: innerImgScale });

                // 마키 페이드아웃
                if (marquee) {
                    const fade = Math.min(Math.max((imgScale - 0.5) / 0.25, 0), 1);
                    gsap.set(marquee, { opacity: 1 - fade });
                }

                // 텍스트 등장/숨김
                if (progress >= 1 && !revealedRef.current) {
                    revealedRef.current = true;
                    gsap.to(title, { opacity: 1, y: 0, duration: 0.75, ease: 'power4.out' });
                    gsap.to(desc, { opacity: 1, x: 0, duration: 0.75, delay: 0.1, ease: 'power4.out' });
                }
                if (progress < 1 && revealedRef.current) {
                    revealedRef.current = false;
                    gsap.to(title, { opacity: 0, y: 40, duration: 0.5, ease: 'power4.out' });
                    gsap.to(desc, { opacity: 0, x: 40, duration: 0.5, ease: 'power4.out' });
                }
            },
        });

        // 마키 무한 스크롤
        if (marquee) {
            const items = marquee.querySelectorAll('h1');
            if (items.length) {
                gsap.to(items, {
                    xPercent: -100 * items.length,
                    duration: items.length * 5,
                    ease: 'none',
                    repeat: -1,
                    modifiers: {
                        xPercent: gsap.utils.wrap(-100, 0),
                    },
                });
            }
        }
    }, { scope: sectionRef });

    return (
        <section className="card" ref={sectionRef}>
            {/* 마키 */}
            <div className="card-marquee">
                <div className="marquee" ref={marqueeRef}>
                    {MARQUEE_TEXTS.map(text => (
                        <h1 key={text}>{text}</h1>
                    ))}
                </div>
            </div>

            <div className="card-wrapper">
                <div className="card-content">
                    <div className="card-title" ref={titleRef}>
                        <h1>Curved Horizon</h1>
                    </div>
                    <div className="card-description" ref={descRef}>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur rem reiciendis
                        </p>
                    </div>
                </div>
                <div className="card-img" ref={imgWrapRef}>
                    <img ref={imgRef} src="/images/img1.jpeg" alt="Curved Horizon" />
                </div>
            </div>
        </section>
    );
}

export default Section2;
