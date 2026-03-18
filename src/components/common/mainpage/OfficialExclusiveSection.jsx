import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MoreBox from '../btn/MoreBox';
import GNB_Logo from '../../../assets/GNB_Logo.svg?react';
import './OfficialExclusiveSection.scss';

gsap.registerPlugin(ScrollTrigger);

const DECOR_FRAMES = [
    {
        key: 'exclusive-1',
        nodeId: '641:1660',
        frameStyle: { top: '325px', left: '137px', width: '200px', height: '260px' },
        layers: [
            {
                key: 'primary',
                nodeId: '641:1661',
                src: 'https://www.figma.com/api/mcp/asset/045f9080-997c-479d-9664-38a2f1717e1d',
                style: { top: '0', left: '-175px', width: '422px', height: '264px' },
            },
            {
                key: 'secondary',
                nodeId: '641:1662',
                src: 'https://www.figma.com/api/mcp/asset/b3069440-02d5-4c0c-ad3d-7672dcdd6959',
                style: { top: '0', left: '-51px', width: '264px', height: '264px' },
            },
        ],
    },
    {
        key: 'exclusive-2',
        nodeId: '641:1657',
        frameStyle: { top: '194px', left: '249px', width: '124px', height: '155px' },
        layers: [
            {
                key: 'primary',
                nodeId: '641:1658',
                src: 'https://www.figma.com/api/mcp/asset/79e64a3d-dd7f-4ecf-a2ea-df1e56d29511',
                style: { top: '-6px', left: '-134px', width: '286px', height: '161px' },
            },
            {
                key: 'secondary',
                nodeId: '641:1659',
                src: 'https://www.figma.com/api/mcp/asset/7686e6a4-232c-43f7-bfcb-770801dcda06',
                style: { top: '-108px', left: '-33px', width: '157px', height: '279px' },
            },
        ],
    },
    {
        key: 'exclusive-3',
        nodeId: '641:1654',
        frameStyle: { top: '740px', left: 'calc(16.67% + 225px)', width: '178px', height: '226px' },
        layers: [
            {
                key: 'primary',
                nodeId: '641:1655',
                src: 'https://www.figma.com/api/mcp/asset/e77ae5e1-4e53-4166-b0e5-36c2bc8b791e',
                style: { top: '0', left: '-64px', width: '259px', height: '259px' },
            },
            {
                key: 'secondary',
                nodeId: '641:1656',
                src: 'https://www.figma.com/api/mcp/asset/e27656fa-3963-42d8-8df0-85b0477c0bcb',
                style: { top: '-5px', left: '-50px', width: '245px', height: '245px' },
            },
        ],
    },
    {
        key: 'exclusive-4',
        nodeId: '641:1651',
        frameStyle: { top: '644px', left: 'calc(75% - 58px)', width: '124px', height: '155px' },
        layers: [
            {
                key: 'primary',
                nodeId: '641:1652',
                src: 'https://www.figma.com/api/mcp/asset/1c253ac3-fa6a-478b-8a69-1c00f9d8720b',
                style: { top: '-10px', left: '-25px', width: '175px', height: '175px' },
            },
            {
                key: 'secondary',
                nodeId: '641:1653',
                src: 'https://www.figma.com/api/mcp/asset/a74821bf-2d1e-449d-a45e-f2f6d0215b15',
                style: { top: '-12px', left: '-20px', width: '170px', height: '170px' },
            },
        ],
    },
    {
        key: 'exclusive-5',
        nodeId: '641:1645',
        frameStyle: { top: '111px', left: 'calc(75% + 13px)', width: '247px', height: '336px' },
        layers: [
            {
                key: 'primary',
                nodeId: '641:1646',
                src: 'https://www.figma.com/api/mcp/asset/30d50d28-40ba-45bf-a818-601a8438e4df',
                style: { top: '0', left: '-63px', width: '336px', height: '336px' },
            },
            {
                key: 'secondary',
                nodeId: '641:1647',
                src: 'https://www.figma.com/api/mcp/asset/331e9049-6550-4527-8ca2-e14a8da1f935',
                style: { top: '0', left: '-215px', width: '546px', height: '341px' },
            },
        ],
    },
    {
        key: 'exclusive-6',
        nodeId: '641:1648',
        frameStyle: { top: '407px', left: 'calc(83.33% + 4px)', width: '180px', height: '180px' },
        layers: [
            {
                key: 'primary',
                nodeId: '641:1649',
                src: 'https://www.figma.com/api/mcp/asset/1f522b29-4501-41c3-8800-3be080366134',
                style: { top: '0', left: '-180px', width: '333px', height: '155px' },
            },
            {
                key: 'secondary',
                nodeId: '641:1650',
                src: 'https://www.figma.com/api/mcp/asset/dc49570f-4eab-4f4a-9593-67b549c53f10',
                style: { top: '0', left: '-13px', width: '193px', height: '193px' },
            },
        ],
    },
];

const COPY = {
    title: 'Official Online Exclusive',
    headline: '공식 온라인 몰만의 특별한 서비스',
    meta: '무료 배송 및 반품  ·  시그니처 코튼백 포장  ·  맞춤형 샘플',
    body: '무료 배송과 반품, 샘플 증정, 기프트 포장 서비스까지\n공식몰에서만 경험할 수 있는 세심한 배려를 만나보세요.',
};

const PARALLAX_MOTION = [
    { x: -18, y: -82, rotate: -3.2 },
    { x: 14, y: -58, rotate: 2.4 },
    { x: -24, y: -96, rotate: -2.8 },
    { x: 16, y: -64, rotate: 2.2 },
    { x: 22, y: -88, rotate: 3 },
    { x: -12, y: -54, rotate: -2 },
];

const OfficialExclusiveSection = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imgRefs = useRef([]);

    imgRefs.current = [];

    const addToRefs = (element) => {
        if (element && !imgRefs.current.includes(element)) {
            imgRefs.current.push(element);
        }
    };

    useEffect(() => {
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current.querySelectorAll(
                    '.official-exclusive__title, .official-exclusive__subtitle, .official-exclusive__meta, .official-exclusive__desc, .official-exclusive__btn-wrapper'
                ),
                { opacity: 0, y: 36 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.95,
                    stagger: 0.09,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: 'top 72%',
                    },
                }
            );

            mm.add('(min-width: 1440px)', () => {
                imgRefs.current.forEach((element, index) => {
                    const motion = PARALLAX_MOTION[index];

                    if (!element || !motion) {
                        return;
                    }

                    const mediaNodes = element.querySelectorAll('.official-exclusive__media');

                    gsap.fromTo(
                        element,
                        { autoAlpha: 0 },
                        {
                            autoAlpha: 1,
                            duration: 0.8,
                            ease: 'power2.out',
                            delay: index * 0.04,
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: 'top 72%',
                            },
                        }
                    );

                    gsap.fromTo(
                        mediaNodes,
                        {
                            scale: 0.9,
                            yPercent: 8,
                        },
                        {
                            scale: 1,
                            yPercent: 0,
                            duration: 1.05,
                            stagger: 0.05,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: 'top 72%',
                            },
                        }
                    );

                    gsap.to(element, {
                        x: motion.x,
                        y: motion.y,
                        rotate: motion.rotate,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    });
                });
            });
        });

        return () => {
            mm.revert();
            ctx.revert();
        };
    }, []);

    return (
        <section className="official-exclusive" ref={sectionRef} data-name="online_exclusive" data-node-id="640:1654">
            <div className="official-exclusive__bg-logo" aria-hidden="true" data-node-id="640:1655">
                <GNB_Logo />
            </div>

            <div className="official-exclusive__inner">
                {DECOR_FRAMES.map((frame) => (
                    <div
                        className="official-exclusive__img"
                        key={frame.key}
                        ref={addToRefs}
                        aria-hidden="true"
                        data-node-id={frame.nodeId}
                        style={frame.frameStyle}
                    >
                        {frame.layers.map((layer) => (
                            <img
                                key={layer.key}
                                className="official-exclusive__media"
                                src={layer.src}
                                alt=""
                                data-node-id={layer.nodeId}
                                style={layer.style}
                            />
                        ))}
                    </div>
                ))}

                <div
                    className="official-exclusive__content"
                    ref={contentRef}
                    data-name="title"
                    data-node-id="640:1675"
                >
                    <div className="official-exclusive__copy" data-name="txt" data-node-id="640:1676">
                        <h2 className="official-exclusive__title montage-48" data-node-id="640:1677">
                            {COPY.title}
                        </h2>

                        <div className="official-exclusive__text-block" data-node-id="640:1678">
                            <div className="official-exclusive__headline-block" data-node-id="640:1679">
                                <p className="official-exclusive__subtitle suit-24-r" data-node-id="640:1680">
                                    {COPY.headline}
                                </p>
                                <p className="official-exclusive__meta suit-12-r" data-node-id="640:1681">
                                    {COPY.meta}
                                </p>
                            </div>

                            <p className="official-exclusive__desc suit-16-r" data-node-id="640:1682">
                                {COPY.body.split('\n').map((line, index, lines) => (
                                    <React.Fragment key={line}>
                                        {line}
                                        {index < lines.length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                    </div>

                    <div className="official-exclusive__btn-wrapper" data-node-id="640:1683">
                        <MoreBox to="/benefits/official" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OfficialExclusiveSection;
