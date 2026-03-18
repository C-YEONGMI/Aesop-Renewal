import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ITEMS = [
    { img: '/images/img1.jpeg', top: '-5%', left: '10%', speed: 0.065 },
    { img: '/images/img2.jpeg', top: '35%', left: '5%', speed: 0.05 },
    { img: '/images/img3.jpeg', top: '20%', left: '45%', speed: 0.08 },
    { img: '/images/img4.jpeg', top: '60%', left: '30%', speed: 0.1 },
    { img: '/images/img5.jpeg', top: '10%', left: '75%', speed: 0.07 },
];

function Section2() {
    const sectionRef = useRef(null);
    const itemRefs = useRef([]);

    // 초기 위치 설정 (useGSAP 컨텍스트)
    useGSAP(() => {
        itemRefs.current.forEach((item, i) => {
            if (item && ITEMS[i]) {
                gsap.set(item, {
                    top: ITEMS[i].top,
                    left: ITEMS[i].left,
                });
            }
        });
    }, { scope: sectionRef });

    // 마우스 패럴랙스 (useEffect → cleanup)
    useEffect(() => {
        const handleMouseMove = (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            itemRefs.current.forEach((item, i) => {
                if (!item || !ITEMS[i]) return;
                const deltaX = (e.clientX - centerX) * ITEMS[i].speed;
                const deltaY = (e.clientY - centerY) * ITEMS[i].speed;
                gsap.to(item, { x: deltaX, y: deltaY, duration: 0.75 });
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="gallery-section" ref={sectionRef}>
            {/* Header */}
            <div className="header">
                <h1>
                    Lorem ipsum dolor<br />
                    sit amet consectetur
                </h1>
                <button>more </button>
            </div>

            {/* Gallery */}
            <div className="gallery">
                {ITEMS.map((item, i) => (
                    <div
                        key={i}
                        className="item"
                        ref={el => itemRefs.current[i] = el}
                    >
                        <img src={item.img} alt="" />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Section2;
