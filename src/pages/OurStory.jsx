import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './OurStory.scss';

import aboutBg from '../assets/about_background.mov';
import aboutFormulation from '../assets/about_formulation.png';
import aboutTexture from '../assets/about_texture.png';
import aboutSustain from '../assets/about_sustain.png';
import OriginsLineSvg from '../assets/about_origins_line.svg?react';
import NamingLineSvg from '../assets/about_naming_line.svg?react';
import shop01 from '../assets/about_shop01.png';
import shop02 from '../assets/about_shop02.png';
import shop03 from '../assets/about_shop03.png';
import shop04 from '../assets/about_shop04.png';
import shop05 from '../assets/about_shop05.png';
import shop06 from '../assets/about_shop06.png';

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
    {
        subtitle: 'thoughtful formulations',
        desc: '이솝은 멜버른 연구소에서 화학자들이 식물 유래 성분과 검증된 합성 성분을 결합해 포뮬러를 설계하는\n하이브리드 접근을 취합니다. 피부에 실제로 필요한 효능과 안전성을 기준으로 충분한 연구·테스트를 거친\n제품만을 출시하며, 항산화와 보호에 초점을 둔 치밀한 포뮬러로 장기적인 피부 균형을 추구합니다.',
        overlayColor: 'rgba(192, 182, 169, 0.20)', // $brown-200 @ 20%
    },
    {
        subtitle: 'quiet sensory rituals',
        desc: '이솝은 스킨·바디·헤어 케어를 단순한 관리가 아닌, 하루를 정돈하는 차분한 리추얼로 바라봅니다.\n허브·시트러스·우디 노트의 향과 질감, 사용 순서가 어우러져 과장되지 않은 감각 경험을 만들고,\n"즉각적인 기적"보다 꾸준한 루틴과 축적된 변화를 중시합니다.',
        overlayColor: 'rgba(230, 149, 121, 0.20)', // $point-pink @ 20%
    },
    {
        subtitle: 'local character spaces',
        desc: '이솝 매장은 어디서나 같은 인테리어를 반복하지 않습니다. 각 도시와 동네의 맥락과 기존 건축 요소를\n존중해 설계됩니다. 현지 건축가·디자이너와 협업해 지역적 이야기와 브랜드 세계관이 자연스럽게\n섞인 공간을 만들며, 갈색 보틀과 절제된 디테일로 이솝만의 경험을 구현합니다.',
        overlayColor: 'rgba(163, 177, 138, 0.20)', // $point-green @ 20%
    },
];

const ORIGINS_TABS = [
    {
        id: 'origins',
        label: 'Origins',
        en: 'Founded in a Melbourne hair salon in 1987, the brand began with formulations based on essential oils.',
        kr: '이솝은 1987년 멜버른의 한 살롱에서 시작되었습니다.\n에센셜 오일을 바탕으로 한 조합이 브랜드의 출발점이 되었습니다.',
    },
    {
        id: 'naming',
        label: 'Naming',
        en: 'The name Aesop is drawn from the ancient storyteller associated with fables, reflecting a restrained stance against exaggerated beauty claims.',
        kr: '브랜드명은 이솝 우화로 알려진 이야기꾼 \'Aesop\'에서 가져왔습니다.\n과장된 미용 광고에 대한 절제된 태도를 상징합니다.',
    },
    {
        id: 'formulation',
        label: 'Formulation',
        en: 'Formulations are developed in-house by chemists, informed by new technologies and established science.\nPlant-derived ingredients are balanced with scientifically developed components, with a focus on protecting and restoring the skin.',
        kr: '자체 실험실에서 화학자들이 새로운 기술과 검증된 과학을 바탕으로 만듭니다.\n식물 유래 성분과 과학적 성분을 균형 있게 조합해, 피부의 보호와 회복에 초점을 둡니다.',
        enSmall: true,
    },
    {
        id: 'architecture',
        label: 'Architecture',
        en: 'The first store in St Kilda was realised through the reinterpretation of an existing space.\nSince then, architecture and spatial design have become integral to the brand.',
        kr: '세인트 킬다의 첫 스토어는 기존 공간을 재해석하는 방식으로 만들어졌습니다.\n이후 건축과 공간 디자인은 브랜드를 구성하는 중요한 축이 되었습니다.',
    },
    {
        id: 'approach',
        label: 'Approach',
        en: 'Expanding beyond skin, hair, and body care into fragrance and space, the brand favours considered growth over rapid expansion, maintaining consistency and balance.',
        kr: '스킨, 헤어, 바디 케어를 넘어 향과 공간으로 확장하고 있습니다.\n빠른 확장보다 브랜드의 일관성과 균형을 유지하는 방식을 택합니다.',
    },
];

const ARCH_IMAGES = [shop01, shop02, shop03, shop04, shop05, shop06];


// ── 타이틀 텍스트를 글자별 span으로 분해 (char split 애니메이션용) ────────────
const splitTitle = (el) => {
    if (!el) return [];
    const text = el.textContent;
    el.textContent = '';
    return [...text].map((char) => {
        const wrap = document.createElement('span');
        wrap.className = 'char-wrap';
        const inner = document.createElement('span');
        inner.className = 'char';
        inner.textContent = char === ' ' ? '\u00A0' : char;
        wrap.appendChild(inner);
        el.appendChild(wrap);
        return inner;
    });
};

// ── desc 텍스트를 줄별 span 요소로 분해해 container에 주입 ──────────────────
const setDescLines = (container, text) => {
    container.innerHTML = '';
    return text.split('\n').map((line) => {
        const wrap = document.createElement('div');
        wrap.className = 'desc-line-wrap';
        const span = document.createElement('span');
        span.className = 'desc-line';
        span.textContent = line;
        wrap.appendChild(span);
        container.appendChild(wrap);
        return span;
    });
};

const OurStory = () => {
    // ── Hero refs ────────────────────────────────────────────────────────────
    const pageRef       = useRef(null);
    const heroRef       = useRef(null);
    const overlayRef    = useRef(null);
    const subtitleRef   = useRef(null);
    const descRef       = useRef(null);

    // ── Story Mid (Our Values → Origins 통합) refs ──────────────────────────────
    const storyMidRef       = useRef(null);   // 900vh 섹션 전체
    const valuesHeadingRef  = useRef(null);
    const valuesTextsRef    = useRef(null);
    const valuesEnRef       = useRef(null);
    const valuesKrRef       = useRef(null);
    const originsInnerRef   = useRef(null);   // Origins 탭+컨텐츠 영역
    const originsLineRef    = useRef(null);   // 장식 선 SVG 래퍼
    const namingLineRef     = useRef(null);   // Naming 탭 장식 선 SVG 래퍼

    // ── 하단 섹션 타이틀 refs (char split) ───────────────────────────────────
    const formTitleRef      = useRef(null);
    const archTitleRef      = useRef(null);
    const sustainTitleRef   = useRef(null);

    // ── Origins tab refs ─────────────────────────────────────────────────────
    const tabContentEnRef   = useRef(null);
    const tabContentKrRef   = useRef(null);
    const tabButtonRefs     = useRef([]);
    const activeTabRef      = useRef('origins');

    // ── Origins 탭 전환 (클릭 · 스크롤 공용) ─────────────────────────────────
    const changeTab = useCallback((id) => {
        const tab = ORIGINS_TABS.find((t) => t.id === id);
        if (!tab || activeTabRef.current === id) return;

        const prevId = activeTabRef.current;
        activeTabRef.current = id;

        const enEl  = tabContentEnRef.current;
        const krEl  = tabContentKrRef.current;
        const lineEl = originsLineRef.current;
        if (!enEl || !krEl) return;

        // origins 선: 떠날 때 사라지고, 돌아올 때 다시 그림
        const originsPath = lineEl?.querySelector('path');
        if (prevId === 'origins' && id !== 'origins' && lineEl) {
            gsap.to(lineEl, { autoAlpha: 0, duration: 0.8, ease: 'power2.in' });
        } else if (id === 'origins' && prevId !== 'origins' && lineEl) {
            if (originsPath) {
                const len = originsPath.getTotalLength();
                gsap.set(originsPath, { strokeDasharray: len, strokeDashoffset: len });
                gsap.set(lineEl, { autoAlpha: 1 });
                gsap.to(originsPath, { strokeDashoffset: 0, duration: 4, ease: 'power2.inOut' });
            } else {
                gsap.set(lineEl, { autoAlpha: 1 });
            }
        }

        // naming 선: Naming 탭 진입 시 붓으로 그리듯 stroke-dashoffset 드로우, 이탈 시 사라짐
        const namingEl = namingLineRef.current;
        const namingPath = namingEl?.querySelector('path');
        if (prevId === 'naming' && id !== 'naming' && namingEl) {
            gsap.to(namingEl, { autoAlpha: 0, duration: 0.8, ease: 'power2.in' });
        } else if (id === 'naming' && prevId !== 'naming' && namingEl) {
            if (namingPath) {
                const len = namingPath.getTotalLength();
                gsap.set(namingPath, { strokeDasharray: len, strokeDashoffset: len });
                gsap.set(namingEl, { autoAlpha: 1 });
                gsap.to(namingPath, { strokeDashoffset: 0, duration: 4, ease: 'power2.inOut' });
            } else {
                gsap.set(namingEl, { autoAlpha: 1 });
            }
        }

        gsap.to([enEl, krEl], {
            autoAlpha: 0,
            y: -14,
            duration: 0.28,
            ease: 'power2.in',
            onComplete: () => {
                enEl.textContent = tab.en;
                krEl.textContent = tab.kr;
                enEl.classList.toggle('about-origins__content-en--sm', !!tab.enSmall);
                tabButtonRefs.current.forEach((btn) => {
                    if (btn) btn.classList.toggle('is-active', btn.dataset.id === id);
                });
                gsap.fromTo(
                    [enEl, krEl],
                    { autoAlpha: 0, y: 14 },
                    { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.09, ease: 'power3.out' }
                );
            },
        });
    }, []);

    useEffect(() => {
        // 첫 슬라이드 desc 줄 분해 초기화
        const initLines = setDescLines(descRef.current, SLIDES[0].desc);

        const ctx = gsap.context(() => {
            // 하단 섹션 타이틀 char split (DOM 변환, 모든 motion 설정에 공통)
            const formChars    = splitTitle(formTitleRef.current);
            const archChars    = splitTitle(archTitleRef.current);
            const sustainChars = splitTitle(sustainTitleRef.current);
            gsap.set([...formChars, ...archChars, ...sustainChars], { y: '110%' });

            // 초기 상태: subtitle + lines invisible
            gsap.set(subtitleRef.current, { autoAlpha: 0, y: 28 });
            gsap.set(initLines, { autoAlpha: 0, y: 28 });

            const mm = gsap.matchMedia();

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                // 페이지 진입 시 초기 텍스트 fade-in
                gsap.to(subtitleRef.current, {
                    autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.3,
                });
                gsap.to(initLines, {
                    autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power3.out', delay: 0.55,
                });

                // ── Hero 슬라이드 전환 ────────────────────────────────────────
                const changeSlide = (index) => {
                    const slide = SLIDES[index];
                    // 현재 desc lines 수집 (call 시점 snapshot)
                    const existingLines = descRef.current
                        ? [...descRef.current.querySelectorAll('.desc-line')]
                        : [];

                    const tl = gsap.timeline();

                    // Phase 1: fade-out (subtitle + lines 동시에 위로)
                    tl.to(subtitleRef.current, {
                        autoAlpha: 0, y: -28, duration: 0.32, ease: 'power2.in',
                    });
                    if (existingLines.length) {
                        tl.to(existingLines, {
                            autoAlpha: 0, y: -20, duration: 0.22,
                            stagger: { each: 0.045, from: 'start' },
                            ease: 'power2.in',
                        }, '<');
                    }
                    // 오버레이 전환 (병렬)
                    tl.to(overlayRef.current, {
                        backgroundColor: slide.overlayColor, duration: 0.9, ease: 'power2.inOut',
                    }, 0);

                    // Phase 2: DOM 교체 + fade-in
                    tl.call(() => {
                        subtitleRef.current.textContent = slide.subtitle;
                        const newLines = setDescLines(descRef.current, slide.desc);
                        gsap.set(newLines, { autoAlpha: 0, y: 30 });

                        // subtitle fade-in
                        gsap.fromTo(subtitleRef.current,
                            { autoAlpha: 0, y: 30 },
                            { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out' }
                        );
                        // 한글 줄 순차 slide-up
                        gsap.to(newLines, {
                            autoAlpha: 1, y: 0, duration: 0.52,
                            stagger: { each: 0.12, from: 'start' },
                            ease: 'power3.out',
                            delay: 0.18,
                        });
                    });
                };

                // Hero 슬라이드 트리거 (700vh 기준)
                ScrollTrigger.create({
                    trigger: heroRef.current, start: '28.57% top',
                    onEnter: () => changeSlide(1), onLeaveBack: () => changeSlide(0),
                });
                ScrollTrigger.create({
                    trigger: heroRef.current, start: '57.14% top',
                    onEnter: () => changeSlide(2), onLeaveBack: () => changeSlide(1),
                });

                // ── Story Mid: Our Values → Origins (A안) ───────────────────
                // 헤딩 초기 위치: GSAP이 xPercent/yPercent 로 중앙 정렬
                gsap.set(valuesHeadingRef.current, { xPercent: -50, yPercent: -50 });

                // 섹션 진입 reveal (immediateRender:false — scrub from 상태 오염 방지)
                gsap.from(valuesHeadingRef.current, {
                    autoAlpha: 0, y: 30, duration: 0.9, ease: 'power3.out',
                    immediateRender: false,
                    scrollTrigger: { trigger: storyMidRef.current, start: 'top 65%' },
                });
                gsap.from(valuesTextsRef.current, {
                    autoAlpha: 0, y: 30, duration: 0.9, ease: 'power3.out',
                    immediateRender: false,
                    scrollTrigger: { trigger: storyMidRef.current, start: 'top 65%' },
                });

                // EN/KR 텍스트: 9.52%→19.05% scrub fade-out (100vh→200vh / 1050vh 기준)
                gsap.to(valuesTextsRef.current, {
                    autoAlpha: 0, y: -20, ease: 'none',
                    scrollTrigger: {
                        trigger: storyMidRef.current,
                        start: '9.52% top',
                        end: '19.05% top',
                        scrub: true,
                    },
                });

                // 헤딩: 19.05%→28.57% 구간 scrub — 중앙에서 top:70px 로 이동 + scale 0.6
                // (200vh→300vh / 1050vh 기준)
                gsap.to(valuesHeadingRef.current, {
                    y: () => 70 + valuesHeadingRef.current.offsetHeight * 0.3 - window.innerHeight / 2,
                    yPercent: 0,
                    scale: 0.6,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: storyMidRef.current,
                        start: '19.05% top',
                        end: '28.57% top',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                });

                // Origins inner: 28.57%→34.29% scrub slide-up (300vh→360vh / 1050vh 기준)
                gsap.fromTo(originsInnerRef.current,
                    { yPercent: 100 },
                    {
                        yPercent: 0, ease: 'none',
                        scrollTrigger: {
                            trigger: storyMidRef.current,
                            start: '28.57% top',
                            end: '34.29% top',
                            scrub: 1,
                        },
                    }
                );

                // Origins/Naming 장식선 초기 상태 (숨김) — 둘 다 stroke-dashoffset 방식
                gsap.set(originsLineRef.current, { autoAlpha: 0 });
                gsap.set(namingLineRef.current, { autoAlpha: 0 });
                ScrollTrigger.create({
                    trigger: storyMidRef.current,
                    start: '35% top',
                    once: true,
                    onEnter: () => {
                        const originsPath = originsLineRef.current?.querySelector('path');
                        if (originsPath) {
                            const len = originsPath.getTotalLength();
                            gsap.set(originsPath, { strokeDasharray: len, strokeDashoffset: len });
                            gsap.set(originsLineRef.current, { autoAlpha: 1 });
                            gsap.to(originsPath, { strokeDashoffset: 0, duration: 4, ease: 'power2.inOut' });
                        }
                    },
                });

                // Origins 탭 스크롤 전환
                // Origins 선이 35%에서 시작해 4초간 그려지므로 Naming은 50%로 충분히 이격
                // Naming:525vh=50%, Formulation:672vh=64%, Architecture:819vh=78%, Approach:966vh=92%
                const STORY_TAB_PCT = [0, 50, 64, 78, 92];
                ORIGINS_TABS.forEach((tab, i) => {
                    if (i === 0) return;
                    ScrollTrigger.create({
                        trigger: storyMidRef.current,
                        start: STORY_TAB_PCT[i] + '% top',
                        onEnter:     () => changeTab(tab.id),
                        onLeaveBack: () => changeTab(ORIGINS_TABS[i - 1].id),
                    });
                });

                // ── 하단 섹션 타이틀: 글자별 슬라이드업 (fromTo — set 후 from 충돌 방지) ─
                gsap.fromTo(formChars,
                    { y: '110%' },
                    { y: 0, duration: 1.1, stagger: 0.03, ease: 'power3.out',
                      scrollTrigger: { trigger: '.about-formulation', start: 'top 65%' } }
                );
                gsap.fromTo(archChars,
                    { y: '110%' },
                    { y: 0, duration: 1.1, stagger: 0.03, ease: 'power3.out',
                      scrollTrigger: { trigger: '.about-architecture', start: 'top 65%' } }
                );
                gsap.fromTo(sustainChars,
                    { y: '110%' },
                    { y: 0, duration: 1.1, stagger: 0.03, ease: 'power3.out',
                      scrollTrigger: { trigger: '.about-sustainability', start: 'top 65%' } }
                );

                // ── 하단 섹션 콘텐츠 reveals ──────────────────────────────────
                gsap.from('.about-formulation__texture, .about-formulation__content', {
                    autoAlpha: 0, y: 50, duration: 1, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: '.about-formulation__content', start: 'top 75%' },
                });
                gsap.from('.arch-img', {
                    autoAlpha: 0, y: 80, duration: 1, stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: { trigger: '.about-architecture__images', start: 'top 80%' },
                });
                gsap.from('.about-sustainability__image, .about-sustainability__desc', {
                    autoAlpha: 0, y: 50, duration: 1, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: '.about-sustainability__image', start: 'top 75%' },
                });
            });

            // ── reduced-motion fallback ───────────────────────────────────────
            mm.add('(prefers-reduced-motion: reduce)', () => {
                // 타이틀 chars 즉시 표시
                gsap.set([...formChars, ...archChars, ...sustainChars], { y: 0 });
                // 초기 텍스트 즉시 표시
                gsap.set(subtitleRef.current, { autoAlpha: 1, y: 0 });
                gsap.set(initLines, { autoAlpha: 1, y: 0 });

                const updateSlide = (index) => {
                    const slide = SLIDES[index];
                    subtitleRef.current.textContent = slide.subtitle;
                    const lines = setDescLines(descRef.current, slide.desc);
                    gsap.set(lines, { autoAlpha: 1, y: 0 });
                    gsap.set(overlayRef.current, { backgroundColor: slide.overlayColor });
                };

                ScrollTrigger.create({
                    trigger: heroRef.current, start: '28.57% top',
                    onEnter: () => updateSlide(1), onLeaveBack: () => updateSlide(0),
                });
                ScrollTrigger.create({
                    trigger: heroRef.current, start: '57.14% top',
                    onEnter: () => updateSlide(2), onLeaveBack: () => updateSlide(1),
                });

                // Origins inner 즉시 표시 (reduced-motion)
                gsap.set(originsInnerRef.current, { autoAlpha: 1 });

                // Origins 즉시 전환 (reduced-motion)
                const STORY_TAB_PCT_RM = [0, 50, 64, 78, 92];
                ORIGINS_TABS.forEach((tab, i) => {
                    if (i === 0) return;
                    ScrollTrigger.create({
                        trigger: storyMidRef.current,
                        start: STORY_TAB_PCT_RM[i] + '% top',
                        onEnter: () => {
                            activeTabRef.current = tab.id;
                            tabContentEnRef.current.textContent = tab.en;
                            tabContentKrRef.current.textContent = tab.kr;
                            tabButtonRefs.current.forEach((btn) => {
                                if (btn) btn.classList.toggle('is-active', btn.dataset.id === tab.id);
                            });
                        },
                        onLeaveBack: () => {
                            const prev = ORIGINS_TABS[i - 1];
                            activeTabRef.current = prev.id;
                            tabContentEnRef.current.textContent = prev.en;
                            tabContentKrRef.current.textContent = prev.kr;
                            tabButtonRefs.current.forEach((btn) => {
                                if (btn) btn.classList.toggle('is-active', btn.dataset.id === prev.id);
                            });
                        },
                    });
                });
            });
        }, pageRef);

        return () => ctx.revert();
    }, [changeTab]);

    return (
        <div className="our-story" ref={pageRef} data-node-id="763:1534">

            {/* ── HERO ── */}
            <section className="about-hero" ref={heroRef} data-node-id="763:1309">
                <div className="about-hero__panel">
                    <video className="about-hero__video" autoPlay muted loop playsInline>
                        <source src={aboutBg} type="video/mp4" />
                    </video>
                    <div
                        className="about-hero__overlay"
                        ref={overlayRef}
                        style={{ backgroundColor: SLIDES[0].overlayColor }}
                    />
                    <div className="about-hero__content">
                        <div className="about-hero__heading">
                            <span className="about-hero__pre montage-128">We cultivate</span>
                            <span className="about-hero__subtitle optima-70" ref={subtitleRef}>
                                {SLIDES[0].subtitle}
                            </span>
                        </div>
                        {/* desc: 비어있는 채로 마운트, useEffect에서 줄별 span 주입 */}
                        <div className="about-hero__desc suit-16-r" ref={descRef} />
                    </div>
                </div>
            </section>

            {/* ── STORY MID: Our Values → Origins (A안) ── */}
            {/* 900vh: CSS sticky 패널 안에서 헤딩이 중앙→top:140px 로 이동하며 유지 */}
            <section className="about-story-mid" ref={storyMidRef} data-node-id="763:1371">
                <div className="about-story-mid__panel">

                    {/* 헤딩: 초기 중앙 위치, GSAP scrub 으로 top:140px 이동 */}
                    <h2
                        className="about-values__heading montage-80"
                        ref={valuesHeadingRef}
                    >
                        Our Values
                    </h2>

                    {/* EN/KR 텍스트: 헤딩 아래 중앙, scrub fade-out */}
                    <div className="about-values__texts" ref={valuesTextsRef}>
                        <p className="about-values__en optima-18" ref={valuesEnRef}>
                            Through considered formulations, sensory rituals, and an approach to space,<br />
                            we connect everyday life and environment as a continuous experience.
                        </p>
                        <p className="about-values__kr suit-18-r" ref={valuesKrRef}>
                            신중한 조합과 감각적인 리추얼, 그리고 공간에 대한 태도를 통해,<br />
                            일상과 환경을 하나의 흐름으로 연결합니다.
                        </p>
                    </div>

                    {/* Origins 탭+컨텐츠: 헤딩 고정 후 fade-in */}
                    <div className="about-origins__inner" ref={originsInnerRef}>
                        <div className="about-origins__body">
                            {/* 장식 선 — Origins 탭에서 GSAP stroke-dashoffset 드로우 */}
                            <div className="about-origins__line-wrap" ref={originsLineRef} aria-hidden="true">
                                <OriginsLineSvg />
                            </div>

                            {/* 장식 선 — Naming 탭에서 GSAP stroke-dashoffset 드로우 */}
                            <div className="about-naming__line-wrap" ref={namingLineRef} aria-hidden="true">
                                <NamingLineSvg />
                            </div>

                            <nav className="about-origins__tabs">
                                {ORIGINS_TABS.map((tab, i) => (
                                    <button
                                        key={tab.id}
                                        data-id={tab.id}
                                        ref={(el) => { tabButtonRefs.current[i] = el; }}
                                        className={`about-origins__tab ${tab.id === 'origins' ? 'is-active' : ''}`}
                                        onClick={() => changeTab(tab.id)}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>

                            <div className="about-origins__content">
                                <p className="about-origins__content-en" ref={tabContentEnRef}>
                                    {ORIGINS_TABS[0].en}
                                </p>
                                <p className="about-origins__content-kr" ref={tabContentKrRef}>
                                    {ORIGINS_TABS[0].kr}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

                        {/* ── FORMULATION ── */}
            {/* 피그마 802:1331: 타이틀+사진+텍스트를 하나의 flex-col 컨테이너로 */}
            <section className="about-formulation" data-node-id="763:1336">

                {/* 메인 컬럼 (802:1331): left=calc(8.33%+247px), flex-col, items-center */}
                <div className="about-formulation__col">
                    <h2 className="about-formulation__title optima-220" ref={formTitleRef}>Formulation</h2>

                    {/* 이너 컨텐츠 (802:1326): 740px, gap:32px, mb:-70px */}
                    <div className="about-formulation__content">
                        {/* 사진: aspect-ratio 740/400 */}
                        <div className="about-formulation__main">
                            <img src={aboutFormulation} alt="Aesop formulation products" />
                        </div>
                        {/* 설명: SUIT Light 20px, 3줄 br 명시 */}
                        <p className="about-formulation__desc">
                            자체 실험실에서 화학자들이 직접 포뮬레이션을 설계합니다.<br />
                            새로운 기술과 검증된 과학을 병행하며, 식물 유래 성분과 과학 성분을 균형 있게 조합합니다.<br />
                            우리는 피부를 보호하고 회복하는 데 초점을 둔 스킨케어를 지향합니다.
                        </p>
                    </div>
                </div>

                {/* 텍스처: 독립 absolute 레이어 — left:calc(58.33%+24px), rotate(64.74deg) */}
                <div className="about-formulation__texture" aria-hidden="true">
                    <div className="about-formulation__texture-rotated">
                        <div className="about-formulation__texture-crop">
                            <img src={aboutTexture} alt="" />
                        </div>
                    </div>
                </div>

            </section>

            {/* ── ARCHITECTURE ── */}
            <section className="about-architecture" data-node-id="763:1348">
                <h2 className="about-architecture__title optima-220" ref={archTitleRef}>Architecture</h2>
                <div className="about-architecture__images">
                    {ARCH_IMAGES.map((img, i) => (
                        <img
                            key={i}
                            className={`arch-img arch-img--${i + 1}`}
                            src={img}
                            alt={`Aesop store ${i + 1}`}
                        />
                    ))}
                </div>
                <p className="about-architecture__desc">
                    잘 설계된 디자인은 삶의 질을 향상시킵니다. 우리는 절제된 톤과 실용성, 지속가능성을 바탕으로 공간을 설계합니다.
                    각 도시의 환경을 존중하며, 이미 존재하는 건축 요소와 함께 공간을 완성합니다.
                </p>
            </section>

            {/* ── SUSTAINABILITY ── */}
            <section className="about-sustainability" data-node-id="763:1341">
                <h2 className="about-sustainability__title optima-220" ref={sustainTitleRef}>Sustainability</h2>
                <div className="about-sustainability__image">
                    <img src={aboutSustain} alt="Aesop sustainable products" />
                </div>
                <p className="about-sustainability__desc">
                    불필요한 패키징을 줄이고, 재사용과 재활용이 가능한 소재를 우선합니다.
                    제품 전반에 걸쳐 지속 가능한 설계와 재료 선택을 고려합니다.
                    과도한 장식을 지양하며, 필요한 만큼만 사용하는 태도를 유지합니다.
                </p>
            </section>

        </div>
    );
};

export default OurStory;
