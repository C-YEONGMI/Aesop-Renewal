import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    { img: '/images/img1.jpeg', name: 'Lorem ipsum', info: 'Dolor sit amet', year: '2026' },
    { img: '/images/img2.jpeg', name: 'Consectetur', info: 'Adipiscing elit', year: '2026' },
    { img: '/images/img3.jpeg', name: 'Sed eiusmod', info: 'Tempor incididunt', year: '2026' },
    { img: '/images/img4.jpeg', name: 'Ut labore', info: 'Et dolore magna', year: '2025' },
    { img: '/images/img5.jpeg', name: 'Aliqua enim', info: 'Ad minim veniam', year: '2025' },
    { img: '/images/img6.jpeg', name: 'Quis nostrud', info: 'Exerc ullamco', year: '2025' },
];

function Section2() {
    const conRef = useRef(null);
    const wrapperRef = useRef(null);
    const titleRef = useRef(null);
    const span1Ref = useRef(null);
    const span2Ref = useRef(null);
    const listRef = useRef(null);

    useGSAP(() => {
        const con = conRef.current;
        const wrapper = wrapperRef.current;
        const title = titleRef.current;
        const span1 = span1Ref.current;
        const span2 = span2Ref.current;
        const list = listRef.current;
        if (!con || !wrapper || !title || !span1 || !span2 || !list) return;

        // 1. h2 span 슬라이드 인
        gsap.timeline({
            scrollTrigger: {
                trigger: con,
                start: '0% 100%',
                end: '0% 20%',
                scrub: 1,
            },
        })
            .fromTo(span1, { x: '-100%' }, { x: '0%', ease: 'none', duration: 5 }, 0)
            .fromTo(span2, { x: '100%' }, { x: '0%', ease: 'none', duration: 5 }, 0);

        // 2. list 등장 → 배경 검정 + list margin
        gsap.timeline({
            scrollTrigger: {
                trigger: list,
                start: '0% 100%',
                end: '0% 100%',
                scrub: 1,
            },
        })
            .to(wrapper, { backgroundColor: '#000', color: '#fff', ease: 'none', duration: 5 }, 0)
            .fromTo(list,
                { margin: '0 auto' },
                { margin: '100vh auto 0', position: 'relative', zIndex: 10, duration: 1 },
                0
            );

        // 3. list 끝 → h2 span 슬라이드 아웃
        gsap.timeline({
            scrollTrigger: {
                trigger: list,
                start: '100% 50%',
                end: '100% 0%',
                scrub: 1,
            },
        })
            .to(span1, { x: '-100%', ease: 'none', duration: 5 }, 0)
            .to(span2, { x: '100%', ease: 'none', duration: 5 }, 0);

    }, { scope: conRef });

    return (
        <div className="con con2" ref={conRef}>
            <div className="inner">
                <h2 ref={titleRef}>
                    <span ref={span1Ref}>My</span>
                    <span ref={span2Ref}>Project</span>
                </h2>
                <ul className="list" ref={listRef}>
                    {PROJECTS.map((p, i) => (
                        <li key={i}>
                            <a href="#">
                                <div className="pic">
                                    <img src={p.img} alt={p.name} />
                                </div>
                                <div className="text">
                                    <h3>{p.name}</h3>
                                    <div className="info">
                                        <p>{p.info}</p>
                                        <p>{p.year}</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Section2;
