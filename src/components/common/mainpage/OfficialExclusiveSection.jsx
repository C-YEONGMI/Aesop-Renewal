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
        nodeId: '762:2527',
        frameStyle: { top: '325px', left: '137px', width: '200px', height: '260px' },
        layers: [
            {
                key: 'primary',
                nodeId: '762:2528',
                src: 'https://www.figma.com/api/mcp/asset/c609f8ee-4774-49e3-9787-76e26d6788ef',
                style: { top: '0', left: '-175px', width: '422px', height: '264px' },
            },
            {
                key: 'secondary',
                nodeId: '762:2529',
                src: 'https://www.figma.com/api/mcp/asset/5307c08b-5d40-4c9f-9240-b04ce93ae9bc',
                style: { top: '0', left: '-51px', width: '264px', height: '264px' },
            },
        ],
    },
    {
        key: 'exclusive-2',
        nodeId: '762:2524',
        frameStyle: { top: '194px', left: '249px', width: '124px', height: '155px' },
        layers: [
            {
                key: 'primary',
                nodeId: '762:2525',
                src: 'https://www.figma.com/api/mcp/asset/01c475d9-4d99-4b85-b0d4-55a5f32dcf87',
                style: { top: '-6px', left: '-134px', width: '286px', height: '161px' },
            },
            {
                key: 'secondary',
                nodeId: '762:2526',
                src: 'https://www.figma.com/api/mcp/asset/159702ee-7fbb-411a-89cf-7c276709935b',
                style: { top: '-108px', left: '-33px', width: '157px', height: '279px' },
            },
        ],
    },
    {
        key: 'exclusive-3',
        nodeId: '762:2521',
        frameStyle: { top: '740px', left: 'calc(16.67% + 225px)', width: '178px', height: '226px' },
        layers: [
            {
                key: 'primary',
                nodeId: '762:2522',
                src: 'https://www.figma.com/api/mcp/asset/6131e203-06b3-41d2-b659-266a67ccf840',
                style: { top: '0', left: '-64px', width: '259px', height: '259px' },
            },
            {
                key: 'secondary',
                nodeId: '762:2523',
                src: 'https://www.figma.com/api/mcp/asset/74889688-0077-457d-89dc-03ea9fe1097c',
                style: { top: '-5px', left: '-50px', width: '245px', height: '245px' },
            },
        ],
    },
    {
        key: 'exclusive-4',
        nodeId: '762:2518',
        frameStyle: { top: '644px', left: 'calc(75% - 58px)', width: '124px', height: '155px' },
        layers: [
            {
                key: 'primary',
                nodeId: '762:2519',
                src: 'https://www.figma.com/api/mcp/asset/740dc5bf-7bb7-4f7c-ad62-bc74f46b770a',
                style: { top: '-10px', left: '-25px', width: '175px', height: '175px' },
            },
            {
                key: 'secondary',
                nodeId: '762:2520',
                src: 'https://www.figma.com/api/mcp/asset/8a61c17d-db81-42ce-a7c3-8fd23979b3b2',
                style: { top: '-12px', left: '-20px', width: '170px', height: '170px' },
            },
        ],
    },
    {
        key: 'exclusive-5',
        nodeId: '762:2512',
        frameStyle: { top: '111px', left: 'calc(75% + 13px)', width: '247px', height: '336px' },
        layers: [
            {
                key: 'primary',
                nodeId: '762:2513',
                src: 'https://www.figma.com/api/mcp/asset/1709bb5f-a3eb-4f34-8af2-0cf39466d769',
                style: { top: '0', left: '-63px', width: '336px', height: '336px' },
            },
            {
                key: 'secondary',
                nodeId: '762:2514',
                src: 'https://www.figma.com/api/mcp/asset/0fb3be4b-9eab-4f8d-9f67-c7cf3a768273',
                style: { top: '0', left: '-215px', width: '546px', height: '341px' },
            },
        ],
    },
    {
        key: 'exclusive-6',
        nodeId: '762:2515',
        frameStyle: { top: '407px', left: 'calc(83.33% + 4px)', width: '180px', height: '180px' },
        layers: [
            {
                key: 'primary',
                nodeId: '762:2516',
                src: 'https://www.figma.com/api/mcp/asset/3b76fb12-c98b-4955-9028-35c9689d6c89',
                style: { top: '0', left: '-180px', width: '333px', height: '155px' },
            },
            {
                key: 'secondary',
                nodeId: '762:2517',
                src: 'https://www.figma.com/api/mcp/asset/582e4a01-30c7-4295-bacb-6a27ad682467',
                style: { top: '0', left: '-13px', width: '193px', height: '193px' },
            },
        ],
    },
];

const COPY = {
    title: 'Official Online Exclusive',
    headline: '공식 온라인 몰만의 특별한 서비스',
    meta: '무료 배송 및 반품 · 시그니처 코튼백 포장 · 맞춤형 샘플',
    body: '무료 배송과 반품, 샘플 증정, 기프트 포장 서비스까지\n공식몰에서만 경험할 수 있는 세심한 배려를 만나보세요.',
};

const OfficialExclusiveSection = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            mm.add('(min-width: 1440px)', () => {
                const imageNodes = gsap.utils.toArray('.official-exclusive__img');
                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 72%',
                        once: true,
                    },
                });

                gsap.set([contentRef.current, ...imageNodes], {
                    willChange: 'transform, opacity',
                });

                timeline
                    .fromTo(
                        contentRef.current,
                        { autoAlpha: 0, y: 32 },
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.85,
                            ease: 'power2.out',
                            clearProps: 'willChange',
                        }
                    )
                    .fromTo(
                        imageNodes,
                        { autoAlpha: 0, y: 120 },
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 1.05,
                            stagger: 0.08,
                            ease: 'power3.out',
                            clearProps: 'willChange',
                        },
                        0.18
                    );
            });

            mm.add('(max-width: 1439px)', () => {
                gsap.fromTo(
                    contentRef.current,
                    { autoAlpha: 0, y: 24 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.85,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 78%',
                            once: true,
                        },
                    }
                );
            });
        }, sectionRef);

        return () => {
            ctx.revert();
            mm.revert();
        };
    }, []);

    return (
        <section
            className="official-exclusive"
            ref={sectionRef}
            data-name="online_exclusive"
            data-node-id="762:2491"
        >
            <div className="official-exclusive__bg-logo" aria-hidden="true" data-node-id="762:2492">
                <GNB_Logo />
            </div>

            <div className="official-exclusive__inner">
                {DECOR_FRAMES.map((frame) => (
                    <div
                        className="official-exclusive__img"
                        key={frame.key}
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
                    data-node-id="762:2500"
                >
                    <div className="official-exclusive__copy" data-name="txt" data-node-id="762:2501">
                        <h2 className="official-exclusive__title montage-48" data-node-id="762:2502">
                            {COPY.title}
                        </h2>

                        <div className="official-exclusive__text-block" data-node-id="762:2503">
                            <div className="official-exclusive__headline-block" data-node-id="762:2504">
                                <p className="official-exclusive__subtitle suit-24-r" data-node-id="762:2505">
                                    {COPY.headline}
                                </p>
                                <p className="official-exclusive__meta suit-12-r" data-node-id="762:2506">
                                    {COPY.meta}
                                </p>
                            </div>

                            <p className="official-exclusive__desc suit-16-r" data-node-id="762:2507">
                                {COPY.body.split('\n').map((line, index, lines) => (
                                    <React.Fragment key={line}>
                                        {line}
                                        {index < lines.length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                    </div>

                    <div className="official-exclusive__btn-wrapper" data-node-id="762:2508">
                        <MoreBox to="/benefits/official" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OfficialExclusiveSection;
