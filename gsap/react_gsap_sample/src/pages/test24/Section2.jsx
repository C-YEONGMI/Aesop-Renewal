import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_ROWS = [
    ['/images/img1.jpeg', '/images/img2.jpeg', '/images/img3.jpeg', '/images/img4.jpeg'],
    ['/images/img5.jpeg', '/images/img6.jpeg', '/images/img7.jpeg', '/images/img8.jpeg'],
    ['/images/img9.jpeg', '/images/img10.jpeg', '/images/img1.jpeg', '/images/img2.jpeg', '/images/img3.jpeg'],
    ['/images/img4.jpeg', '/images/img5.jpeg', '/images/img6.jpeg'],
];

function Section2() {
    const conRef = useRef(null);
    const articleRefs = useRef([]);
    const awsomeRef = useRef(null);
    const awsomeTextRef = useRef(null);
    const tryRef = useRef(null);
    const tryTextRef = useRef(null);

    useGSAP(() => {
        const articles = articleRefs.current.filter(Boolean);
        if (!articles.length) return;

        // 각 갤러리/텍스트 가로 스크롤
        articles.forEach((article, i) => {
            const box = article.querySelector('.box');
            if (!box) return;

            const [x, xEnd] = i % 2
                ? ['100%', -(box.scrollWidth - window.innerWidth)]
                : [-box.scrollWidth, 0];

            gsap.fromTo(box, { x }, {
                x: xEnd,
                scrollTrigger: {
                    trigger: article,
                    scrub: 0.5,
                },
            });
        });

        // "By Ezen" 확대 애니메이션
        if (awsomeRef.current && awsomeTextRef.current) {
            const tl = gsap.timeline({ defaults: { ease: 'none' } })
                .from(awsomeTextRef.current, { x: window.innerWidth })
                .to(awsomeTextRef.current, { scale: 50, xPercent: -200, color: '#000' })
                .to(conRef.current, { duration: 0.3, backgroundColor: '#000' }, '-=0.5');

            ScrollTrigger.create({
                trigger: awsomeRef.current,
                start: 'top top',
                end: '+=3000',
                animation: tl,
                pin: true,
                scrub: 1,
            });
        }

        // "Try NOW" 핀 애니메이션
        if (tryRef.current && tryTextRef.current) {
            ScrollTrigger.create({
                trigger: tryRef.current,
                start: 'top top',
                end: '+=2000',
                animation: gsap.from(tryTextRef.current, { y: 50, opacity: 0 }),
                pin: true,
                scrub: true,
            });
        }
    }, { scope: conRef });

    return (
        <div className="con con3" ref={conRef}>
            <h2>Lorem ipsum</h2>
            <div className="con-box">
                {/* 텍스트 가로 스크롤 */}
                <article className="text-box" ref={el => articleRefs.current[0] = el}>
                    <p className="box text">
                        Lorem ipsum dolor sit amet, Consectetur adipiscing elit
                    </p>
                </article>

                {/* 갤러리 행들 */}
                {GALLERY_ROWS.map((row, ri) => (
                    <article className="gallery" key={ri} ref={el => articleRefs.current[ri + 1] = el}>
                        <ul className="box">
                            {row.map((src, ci) => (
                                <li key={ci}><img src={src} alt="" /></li>
                            ))}
                        </ul>
                    </article>
                ))}

                {/* 하단 텍스트 */}
                <article className="text-box" ref={el => articleRefs.current[GALLERY_ROWS.length + 1] = el}>
                    <p className="box text">
                        Lorem ipsum dolor sit amet, Consectetur adipiscing elit
                    </p>
                </article>

                {/* By Ezen */}
                <article className="awsome" ref={awsomeRef}>
                    <div className="text" ref={awsomeTextRef}>By Ezen</div>
                </article>

                {/* Try NOW */}
                <article className="try" ref={tryRef}>
                    <div className="text" ref={tryTextRef}>Try NOW.</div>
                </article>
            </div>
        </div>
    );
}

export default Section2;
