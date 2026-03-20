import React, { useEffect, useRef, useCallback, useState } from 'react';
import { TextEffect } from '../components/ui/TextEffect';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './OurStory.scss';

import aboutBg from '../assets/about_background.mov';
import aboutFormulation from '../assets/about_formulation.png';
import aboutTexture from '../assets/about_texture.png';
import aboutSustain from '../assets/about_sustain.png';
import OriginsLineSvg      from '../assets/about_origins_line.svg?react';
import NamingLineSvg       from '../assets/about_naming_line.svg?react';
import FormulationLineSvg  from '../assets/about_formulation_line.svg?react';
import ArchitectureLineSvg from '../assets/about_architecture_line.svg?react';
import ApproachLineSvg     from '../assets/about_approach_line.svg?react';
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
        overlayColor: 'rgba(192, 182, 169, 0.20)',
    },
    {
        subtitle: 'quiet sensory rituals',
        desc: '이솝은 스킨·바디·헤어 케어를 단순한 관리가 아닌, 하루를 정돈하는 차분한 리추얼로 바라봅니다.\n허브·시트러스·우디 노트의 향과 질감, 사용 순서가 어우러져 과장되지 않은 감각 경험을 만들고,\n"즉각적인 기적"보다 꾸준한 루틴과 축적된 변화를 중시합니다.',
        overlayColor: 'rgba(230, 149, 121, 0.20)',
    },
    {
        subtitle: 'local character spaces',
        desc: '이솝 매장은 어디서나 같은 인테리어를 반복하지 않습니다. 각 도시와 동네의 맥락과 기존 건축 요소를\n존중해 설계됩니다. 현지 건축가·디자이너와 협업해 지역적 이야기와 브랜드 세계관이 자연스럽게\n섞인 공간을 만들며, 갈색 보틀과 절제된 디테일로 이솝만의 경험을 구현합니다.',
        overlayColor: 'rgba(163, 177, 138, 0.20)',
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

// ── 탭 ID → SVG ref 인덱스 매핑 (changeTab에서 공용 사용) ──────────────────
const TAB_IDS = ['origins', 'naming', 'formulation', 'architecture', 'approach'];

// ── 타이틀 텍스트를 글자별 span으로 분해 ──────────────────────────────────
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

// ── desc 텍스트를 줄별 span 요소로 분해 ──────────────────────────────────
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

// ── 라인 드로우 헬퍼 ──────────────────────────────────────────────────────
const drawLinePath = (el, duration = 3.3) => {
    if (!el) return;
    const path = el.querySelector('path');
    if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.set(el, { autoAlpha: 1 });
        gsap.to(path, { strokeDashoffset: 0, duration, ease: 'power2.inOut' });
    } else {
        gsap.set(el, { autoAlpha: 1 });
    }
};

const OurStory = () => {
    // ── Hero refs ──────────────────────────────────────────────────────────
    const pageRef       = useRef(null);
    const heroRef       = useRef(null);
    const overlayRef    = useRef(null);
    const subtitleRef   = useRef(null);
    const descRef       = useRef(null);

    // ── Story Mid refs ─────────────────────────────────────────────────────
    const storyMidRef       = useRef(null);
    const valuesHeadingRef  = useRef(null);
    const valuesTextsRef    = useRef(null);
    const valuesEnRef       = useRef(null);
    const valuesKrRef       = useRef(null);
    const originsInnerRef   = useRef(null);

    // ── 5개 탭 라인 refs ───────────────────────────────────────────────────
    const originsLineRef      = useRef(null);
    const namingLineRef       = useRef(null);
    const formulationLineRef  = useRef(null);
    const architectureLineRef = useRef(null);
    const approachLineRef     = useRef(null);

    // ── 하단 섹션 타이틀 refs ──────────────────────────────────────────────
    const formTitleRef      = useRef(null);
    const archTitleRef      = useRef(null);
    const sustainTitleRef   = useRef(null);

    // ── Origins tab text state ─────────────────────────────────────────────
    const [tabText, setTabText] = useState({ en: ORIGINS_TABS[0].en, kr: ORIGINS_TABS[0].kr, enSmall: false });
    const [enTrigger, setEnTrigger] = useState(true);
    const [krTrigger, setKrTrigger] = useState(true);
    const tabChangeTimerRef = useRef(null);

    const tabButtonRefs     = useRef([]);
    const activeTabRef      = useRef('origins');

    // ── 탭 전환 (클릭 · 스크롤 공용) ──────────────────────────────────────
    const changeTab = useCallback((id) => {
        const tab = ORIGINS_TABS.find((t) => t.id === id);
        if (!tab || activeTabRef.current === id) return;

        const prevId = activeTabRef.current;
        activeTabRef.current = id;

        // 탭 ID → ref 매핑
        const LINE_MAP = {
            origins:      originsLineRef,
            naming:       namingLineRef,
            formulation:  formulationLineRef,
            architecture: architectureLineRef,
            approach:     approachLineRef,
        };

        // 이전 라인 페이드 아웃
        const prevEl = LINE_MAP[prevId]?.current;
        if (prevEl) {
            gsap.to(prevEl, { autoAlpha: 0, duration: 0.8, ease: 'power2.in' });
        }

        // 버튼 상태 즉시 업데이트
        tabButtonRefs.current.forEach((btn) => {
            if (btn) btn.classList.toggle('is-active', btn.dataset.id === id);
        });

        // 텍스트 퇴장(EN→KR 순) → 텍스트 교체 → 둘 다 등장 → 라인 드로우 시작
        // EN: t=0 퇴장, KR: t=220ms 퇴장, 교체+등장: t=600ms, 라인: t=750ms
        if (tabChangeTimerRef.current) [].concat(tabChangeTimerRef.current).forEach(clearTimeout);
        // EN 퇴장(t=0) → KR 퇴장(t=250ms) → 새 텍스트 등장(t=750ms) → 라인 드로우(t=900ms)
        const timers = [];
        setEnTrigger(false);
        timers[0] = setTimeout(() => {
            setKrTrigger(false);
        }, 250);
        timers[1] = setTimeout(() => {
            setTabText({ en: tab.en, kr: tab.kr, enSmall: !!tab.enSmall });
            setEnTrigger(true);
            setKrTrigger(true);
        }, 750);
        timers[2] = setTimeout(() => {
            drawLinePath(LINE_MAP[id]?.current, 3.3);
        }, 900);
        tabChangeTimerRef.current = timers;
    }, []);

    useEffect(() => {
        const initLines = setDescLines(descRef.current, SLIDES[0].desc);

        const ctx = gsap.context(() => {
            const formChars    = splitTitle(formTitleRef.current);
            const archChars    = splitTitle(archTitleRef.current);
            const sustainChars = splitTitle(sustainTitleRef.current);
            gsap.set([...formChars, ...archChars, ...sustainChars], { y: '110%' });

            gsap.set(subtitleRef.current, { autoAlpha: 0, y: 28 });
            gsap.set(initLines, { autoAlpha: 0, y: 28 });

            // 5개 라인 모두 초기 숨김
            const allLineEls = [
                originsLineRef, namingLineRef, formulationLineRef,
                architectureLineRef, approachLineRef,
            ].map((r) => r.current).filter(Boolean);
            gsap.set(allLineEls, { autoAlpha: 0 });

            const mm = gsap.matchMedia();

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                // 페이지 진입 텍스트 fade-in
                gsap.to(subtitleRef.current, {
                    autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.3,
                });
                gsap.to(initLines, {
                    autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power3.out', delay: 0.55,
                });

                // ── Hero 슬라이드 전환 ──────────────────────────────────────
                const changeSlide = (index) => {
                    const slide = SLIDES[index];
                    const existingLines = descRef.current
                        ? [...descRef.current.querySelectorAll('.desc-line')]
                        : [];
                    const tl = gsap.timeline();
                    tl.to(subtitleRef.current, { autoAlpha: 0, y: -28, duration: 0.32, ease: 'power2.in' });
                    if (existingLines.length) {
                        tl.to(existingLines, {
                            autoAlpha: 0, y: -20, duration: 0.22,
                            stagger: { each: 0.045, from: 'start' }, ease: 'power2.in',
                        }, '<');
                    }
                    tl.to(overlayRef.current, {
                        backgroundColor: slide.overlayColor, duration: 0.9, ease: 'power2.inOut',
                    }, 0);
                    tl.call(() => {
                        subtitleRef.current.textContent = slide.subtitle;
                        const newLines = setDescLines(descRef.current, slide.desc);
                        gsap.set(newLines, { autoAlpha: 0, y: 30 });
                        gsap.fromTo(subtitleRef.current,
                            { autoAlpha: 0, y: 30 },
                            { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out' }
                        );
                        gsap.to(newLines, {
                            autoAlpha: 1, y: 0, duration: 0.52,
                            stagger: { each: 0.12, from: 'start' }, ease: 'power3.out', delay: 0.18,
                        });
                    });
                };

                ScrollTrigger.create({
                    trigger: heroRef.current, start: '28.57% top',
                    onEnter: () => changeSlide(1), onLeaveBack: () => changeSlide(0),
                });
                ScrollTrigger.create({
                    trigger: heroRef.current, start: '57.14% top',
                    onEnter: () => changeSlide(2), onLeaveBack: () => changeSlide(1),
                });

                // ── Story Mid ───────────────────────────────────────────────
                gsap.set(valuesHeadingRef.current, { xPercent: -50, yPercent: -50 });

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

                gsap.to(valuesTextsRef.current, {
                    autoAlpha: 0, y: -20, ease: 'none',
                    scrollTrigger: {
                        trigger: storyMidRef.current,
                        // 900vh 기준: 50vh(5.6%)→100vh(11.1%) 구간 scrub
                        start: '5.6% top', end: '11.1% top', scrub: true,
                    },
                });

                gsap.to(valuesHeadingRef.current, {
                    y: () => 70 + valuesHeadingRef.current.offsetHeight * 0.3 - window.innerHeight / 2,
                    yPercent: 0, scale: 0.6, ease: 'none',
                    scrollTrigger: {
                        trigger: storyMidRef.current,
                        // 900vh 기준: 100vh(11.1%)→175vh(19.4%) 구간 scrub
                        start: '11.1% top', end: '19.4% top',
                        scrub: true, invalidateOnRefresh: true,
                    },
                });

                gsap.fromTo(originsInnerRef.current,
                    { yPercent: 100 },
                    {
                        yPercent: 0, ease: 'none',
                        scrollTrigger: {
                            trigger: storyMidRef.current,
                            // 900vh 기준: 175vh(19.4%)→225vh(25%) 구간 scrub
                            start: '19.4% top', end: '25% top', scrub: 1,
                        },
                    }
                );

                // Origins 라인 초기 드로우 (26% ≈ 234vh 진입 시)
                ScrollTrigger.create({
                    trigger: storyMidRef.current,
                    start: '26% top',
                    once: true,
                    onEnter: () => drawLinePath(originsLineRef.current, 3.3),
                });

                // 탭 스크롤 전환 (900vh 기준)
                // Naming:39%(351vh), Formulation:52%(468vh), Architecture:65%(585vh), Approach:78%(702vh)
                // Approach 이후 198vh 여유 ✓
                const STORY_TAB_PCT = [0, 39, 52, 65, 78];
                ORIGINS_TABS.forEach((tab, i) => {
                    if (i === 0) return;
                    ScrollTrigger.create({
                        trigger: storyMidRef.current,
                        start: STORY_TAB_PCT[i] + '% top',
                        onEnter:     () => changeTab(tab.id),
                        onLeaveBack: () => changeTab(ORIGINS_TABS[i - 1].id),
                    });
                });

                // ── 하단 섹션 타이틀 char split ─────────────────────────────
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

                // ── 하단 섹션 콘텐츠 reveals ────────────────────────────────
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

            // ── reduced-motion fallback ────────────────────────────────────
            mm.add('(prefers-reduced-motion: reduce)', () => {
                gsap.set([...formChars, ...archChars, ...sustainChars], { y: 0 });
                gsap.set(subtitleRef.current, { autoAlpha: 1, y: 0 });
                gsap.set(initLines, { autoAlpha: 1, y: 0 });
                gsap.set(originsInnerRef.current, { autoAlpha: 1 });
                // Origins 라인 즉시 표시
                gsap.set(originsLineRef.current, { autoAlpha: 1 });

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

                const LINE_MAP_RM = {
                    origins:      originsLineRef,
                    naming:       namingLineRef,
                    formulation:  formulationLineRef,
                    architecture: architectureLineRef,
                    approach:     approachLineRef,
                };

                const STORY_TAB_PCT_RM = [0, 39, 52, 65, 78];
                ORIGINS_TABS.forEach((tab, i) => {
                    if (i === 0) return;
                    const prevTab = ORIGINS_TABS[i - 1];
                    ScrollTrigger.create({
                        trigger: storyMidRef.current,
                        start: STORY_TAB_PCT_RM[i] + '% top',
                        onEnter: () => {
                            activeTabRef.current = tab.id;
                            gsap.set(LINE_MAP_RM[prevTab.id].current, { autoAlpha: 0 });
                            gsap.set(LINE_MAP_RM[tab.id].current, { autoAlpha: 1 });
                            setTabText({ en: tab.en, kr: tab.kr, enSmall: !!tab.enSmall });
                            tabButtonRefs.current.forEach((btn) => {
                                if (btn) btn.classList.toggle('is-active', btn.dataset.id === tab.id);
                            });
                        },
                        onLeaveBack: () => {
                            activeTabRef.current = prevTab.id;
                            gsap.set(LINE_MAP_RM[tab.id].current, { autoAlpha: 0 });
                            gsap.set(LINE_MAP_RM[prevTab.id].current, { autoAlpha: 1 });
                            setTabText({ en: prevTab.en, kr: prevTab.kr, enSmall: !!prevTab.enSmall });
                            tabButtonRefs.current.forEach((btn) => {
                                if (btn) btn.classList.toggle('is-active', btn.dataset.id === prevTab.id);
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
                        <div className="about-hero__desc suit-16-r" ref={descRef} />
                    </div>
                </div>
            </section>

            {/* ── STORY MID ── */}
            <section className="about-story-mid" ref={storyMidRef} data-node-id="763:1371">
                <div className="about-story-mid__panel">

                    <h2
                        className="about-values__heading montage-80"
                        ref={valuesHeadingRef}
                    >
                        Our Values
                    </h2>

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

                    <div className="about-origins__inner" ref={originsInnerRef}>

                        {/* ── 5개 탭 장식선 — inner(=panel) 기준 absolute ── */}
                        {/* Figma 778:1642 Origins: left=153px, top=321px, w=1521px */}
                        <div className="about-line-wrap about-origins__line-wrap" ref={originsLineRef} aria-hidden="true">
                            <OriginsLineSvg />
                        </div>
                        {/* Figma 860:206 Naming: left=calc(16.67%+141.5px), top=314.5px, w=1127.5px */}
                        <div className="about-line-wrap about-naming__line-wrap" ref={namingLineRef} aria-hidden="true">
                            <NamingLineSvg />
                        </div>
                        {/* Figma 719:2465 Formulation: left=calc(25%+139px), top=231px, w=1003.5px */}
                        <div className="about-line-wrap about-formulation__line-wrap" ref={formulationLineRef} aria-hidden="true">
                            <FormulationLineSvg />
                        </div>
                        {/* Figma 719:2480 Architecture: left=calc(25%+145px), top=317px, w=1043.4px */}
                        <div className="about-line-wrap about-architecture__line-wrap" ref={architectureLineRef} aria-hidden="true">
                            <ArchitectureLineSvg />
                        </div>
                        {/* Figma 719:2510 Approach: left=calc(25%+73px), top=491px, w=442.8px */}
                        <div className="about-line-wrap about-approach__line-wrap" ref={approachLineRef} aria-hidden="true">
                            <ApproachLineSvg />
                        </div>

                        <div className="about-origins__body">
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
                                <TextEffect
                                    per="word"
                                    as="p"
                                    className={`about-origins__content-en${tabText.enSmall ? ' about-origins__content-en--sm' : ''}`}
                                    trigger={enTrigger}
                                    variants={{
                                        container: {
                                            hidden: { opacity: 0 },
                                            visible: { opacity: 1, transition: { staggerChildren: 0.025 } },
                                            exit: { transition: { staggerChildren: 0.015, staggerDirection: -1 } },
                                        },
                                        item: {
                                            hidden: { opacity: 0, filter: 'blur(6px)', y: 10 },
                                            visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.35 } },
                                            exit: { opacity: 0, y: -10, filter: 'blur(6px)', transition: { duration: 0.22 } },
                                        },
                                    }}
                                >
                                    {tabText.en}
                                </TextEffect>
                                <TextEffect
                                    per="word"
                                    as="p"
                                    className="about-origins__content-kr"
                                    trigger={krTrigger}
                                    variants={{
                                        container: {
                                            hidden: { opacity: 0 },
                                            visible: { opacity: 1, transition: { staggerChildren: 0.025 } },
                                            exit: { transition: { staggerChildren: 0.015, staggerDirection: -1 } },
                                        },
                                        item: {
                                            hidden: { opacity: 0, filter: 'blur(6px)', y: 10 },
                                            visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.35 } },
                                            exit: { opacity: 0, y: 10, filter: 'blur(6px)', transition: { duration: 0.22 } },
                                        },
                                    }}
                                >
                                    {tabText.kr}
                                </TextEffect>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ── FORMULATION ── */}
            <section className="about-formulation" data-node-id="763:1336">
                <div className="about-formulation__col">
                    <h2 className="about-formulation__title optima-220" ref={formTitleRef}>Formulation</h2>
                    <div className="about-formulation__content">
                        <div className="about-formulation__main">
                            <img src={aboutFormulation} alt="Aesop formulation products" />
                        </div>
                        <p className="about-formulation__desc">
                            자체 실험실에서 화학자들이 직접 포뮬레이션을 설계합니다.<br />
                            새로운 기술과 검증된 과학을 병행하며, 식물 유래 성분과 과학 성분을 균형 있게 조합합니다.<br />
                            우리는 피부를 보호하고 회복하는 데 초점을 둔 스킨케어를 지향합니다.
                        </p>
                    </div>
                </div>
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
