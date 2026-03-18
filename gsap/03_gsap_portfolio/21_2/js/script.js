const common = () => {
    // 메뉴 등 공통
};

const mainPage = () => {
    const con2 = document.querySelector('.con2');
    const sliderContainer = document.querySelector('.con2 .slider');
    const indicators = document.querySelectorAll('.con2 .index');
    const path = document.querySelector('.con2 #link-svg');
    const line1 = document.querySelector('.con2 .line-1');
    const line2 = document.querySelector('.con2 .line-2');
    const link = document.querySelector('.con2 .link');
    const linkWrapper = document.querySelector('.con2 .link-wrapper');

    if (!con2 || !sliderContainer || !path || !line1 || !line2 || !link || !linkWrapper) return;

    // GSAP 플러그인 등록
    if (window.gsap && window.ScrollTrigger && window.ScrollToPlugin) {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    }

    /* ---------------------------
     * con2 Sticky 제어
     * ------------------------- */
    let wheelHandlerBound = null;
    let con2Spacer = null; // 고정 시 레이아웃 보존용 스페이서
    let finished = false; // 슬라이더 종료 상태
    let isReleasing = false; // 소프트 릴리즈 중복 방지

    function makeSpacer() {
        if (con2Spacer) return;
        con2Spacer = document.createElement('div');
        con2Spacer.className = 'con2-spacer';
        con2Spacer.style.height = `${con2.offsetHeight}px`;
        con2.insertAdjacentElement('afterend', con2Spacer);
    }

    function removeSpacer() {
        if (con2Spacer) {
            con2Spacer.remove();
            con2Spacer = null;
        }
    }

    function lockCon2() {
        if (finished) return;
        con2.classList.add('is-sticky');
        document.body.classList.add('is-locked'); // 문서 스크롤 잠금
        makeSpacer();

        // 인디케이터/링크가 이전 릴리즈에서 opacity:0이 남아 있을 수 있으니 정리
        gsap.set(
            [
                document.querySelector('.con2 .slider-indicator'),
                document.querySelector('.con2 .link'),
            ],
            {
                clearProps: 'opacity',
            }
        );

        if (!wheelHandlerBound) {
            wheelHandlerBound = onWheel.bind(null);
            window.addEventListener('wheel', wheelHandlerBound, { passive: false });
        }
    }

    function unlockCon2() {
        con2.classList.remove('is-sticky');
        document.body.classList.remove('is-locked');
        removeSpacer();

        if (wheelHandlerBound) {
            window.removeEventListener('wheel', wheelHandlerBound, { passive: false });
            wheelHandlerBound = null;
        }
    }

    // ScrollTrigger: con2 진입/복귀 시 sticky, 위로 나갈 땐 해제
    ScrollTrigger.create({
        trigger: con2,
        start: 'top top',
        end: 'bottom top',
        onEnter: () => {
            finished = false;
            lockCon2();
        },
        onEnterBack: () => {
            finished = false;
            lockCon2();
        },
        onLeaveBack: () => {
            unlockCon2();
        }, // con1로 돌아갈 때
    });

    /* ---------------------------
     * Slider 로직
     * ------------------------- */
    const totalSlides = 5;
    const linkUrls = [
        'https://login-gamma-henna.vercel.app/',
        'https://login-gamma-henna.vercel.app/',
        'https://login-gamma-henna.vercel.app/',
        'https://login-gamma-henna.vercel.app/',
        'https://login-gamma-henna.vercel.app/',
    ];

    let currentSlideIndex = 1; // 1~5
    let isAnimating = false;
    let currentTopValue = 0;

    // 초기 슬라이드 상태
    const slides = document.querySelectorAll('.con2 .slide');
    slides.forEach((slide, idx) => {
        const img = slide.querySelector('img');
        if (idx === 0) {
            gsap.set(slide, { zIndex: 1 });
            gsap.set(img, { scale: 1, top: '0' });
        } else {
            gsap.set(slide, {
                clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
                zIndex: 0,
            });
            gsap.set(img, { scale: 2, top: '4em' });
        }
    });

    // 휠로 슬라이드 조작 (고정 상태에서만)
    function onWheel(e) {
        if (!con2.classList.contains('is-sticky')) return; // 안전 가드
        e.preventDefault();
        if (isAnimating || isReleasing) return;

        if (e.deltaY > 0) {
            // 마지막 슬라이드 → con3 이동
            if (currentSlideIndex >= totalSlides) {
                softReleaseTo('.con3');
                return;
            }
            showNextSlide();
        } else if (e.deltaY < 0) {
            // 첫 슬라이드에서 위로 → con1 이동
            if (currentSlideIndex <= 1) {
                softReleaseTo('.con1');
                return;
            }
            showPrevSlide();
        }
    }

    function showNextSlide() {
        const currentSlide = document.querySelector(`.con2 #slide-${currentSlideIndex}`);
        currentSlideIndex++;

        let nextSlide = document.querySelector(`.con2 #slide-${currentSlideIndex}`);
        if (!nextSlide) {
            nextSlide = createSlide(currentSlideIndex);
            sliderContainer.appendChild(nextSlide);
        }
        animateSlideTransition(currentSlide, nextSlide, 'down');
    }

    function showPrevSlide() {
        const currentSlide = document.querySelector(`.con2 #slide-${currentSlideIndex}`);
        const prevSlideIndex = currentSlideIndex - 1;

        let prevSlide = document.querySelector(`.con2 #slide-${prevSlideIndex}`);
        if (!prevSlide) {
            prevSlide = createSlide(prevSlideIndex);
            sliderContainer.insertBefore(prevSlide, currentSlide);
        }
        animateSlideTransition(currentSlide, prevSlide, 'up');
        currentSlideIndex--;
    }

    function createSlide(slideNumber) {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.id = `slide-${slideNumber}`;

        const img = document.createElement('img');
        img.src = getImageSource(slideNumber);
        img.alt = '';

        slide.appendChild(img);

        gsap.set(slide, {
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
            zIndex: 0,
        });
        gsap.set(img, { scale: 2, top: '4em' });

        return slide;
    }

    function animateSlideTransition(currentSlide, nextSlide, direction) {
        if (isAnimating) return;
        isAnimating = true;

        const currentImg = currentSlide.querySelector('img');
        const nextImg = nextSlide.querySelector('img');

        gsap.set(nextSlide, {
            clipPath:
                direction === 'up'
                    ? 'polygon(0 0, 100% 0, 100% 0, 0 0)'
                    : 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
        });
        gsap.set(nextImg, { scale: 2, top: '4em' });
        gsap.set(currentSlide, { zIndex: 1 });
        gsap.set(nextSlide, { zIndex: 2 });

        updateSlideTitle(direction === 'up' ? currentSlideIndex - 1 : currentSlideIndex);
        updateIndicators(direction === 'up' ? currentSlideIndex - 1 : currentSlideIndex);
        updateLink(direction === 'up' ? currentSlideIndex - 1 : currentSlideIndex);

        const timeline = gsap.timeline({
            onComplete: () => {
                gsap.set(currentSlide, { zIndex: 0 });
                gsap.set(nextSlide, { zIndex: 1 });
                cleanupSlides();
                isAnimating = false;
            },
        });

        timeline.add(animateCircle(), 0);
        timeline.add(animateText(), 0);

        timeline
            .to(currentImg, { scale: 2, top: '4em', duration: 1.6, ease: 'power3.inOut' }, 0)
            .to(
                nextSlide,
                {
                    clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
                    duration: 1.6,
                    ease: 'power4.inOut',
                },
                0
            )
            .to(nextImg, { scale: 1, top: '0', duration: 1.6, ease: 'power3.inOut' }, 0);
    }

    function updateSlideTitle(index) {
        const displayNumber = normalizeSlideTitle(index);
        const multiplier = window.innerWidth < 900 ? 42 : 150;
        currentTopValue = -(displayNumber - 1) * multiplier;

        gsap.to(document.querySelector('.con2 .postfix'), {
            y: `${currentTopValue}px`,
            duration: 1.6,
            ease: 'power4.inOut',
        });
    }

    function cleanupSlides() {
        const slides = document.querySelectorAll('.con2 .slide');
        slides.forEach((slide) => {
            const slideNumber = parseInt(slide.id.split('-')[1]);
            if (Math.abs(slideNumber - currentSlideIndex) > 2) {
                slide.remove();
            }
        });
    }

    function normalizeSlideTitle(number) {
        let normalized = number;
        while (normalized <= 0) normalized += totalSlides;
        return ((normalized - 1) % totalSlides) + 1;
    }

    function getImageSource(slideNumber) {
        return `../assets/images/img${normalizeSlideTitle(slideNumber)}.jpg`;
    }

    function updateIndicators(index) {
        const normalizedIndex = normalizeSlideTitle(index);
        indicators.forEach((indicator) => {
            gsap.to(indicator, { scaleX: 0.5, duration: 1.6, ease: 'power4.inOut' });
        });
        gsap.to(indicators[normalizedIndex - 1], {
            scaleX: 1,
            duration: 1.6,
            ease: 'power4.inOut',
        });
    }

    function animateText() {
        const tl = gsap.timeline();
        const currentLine1 = line1.querySelector('p');
        const currentLine2 = line2.querySelector('p');

        const line1Text = document.createElement('p');
        const line2Text = document.createElement('p');
        line1Text.textContent = 'View';
        line2Text.textContent = 'Project';

        gsap.set([line1Text, line2Text], { y: 30 });

        tl.to([currentLine1, currentLine2], {
            y: -30,
            stagger: 0.1,
            delay: 0.15,
            duration: 0.8,
            ease: 'power3.inOut',
            onComplete: () => {
                currentLine1 && currentLine1.remove();
                currentLine2 && currentLine2.remove();
            },
        });

        line1.appendChild(line1Text);
        line2.appendChild(line2Text);

        tl.to(
            [line1Text, line2Text],
            {
                y: 0,
                stagger: 0.1,
                delay: 0.35,
                duration: 0.8,
                ease: 'power3.inOut',
            },
            '<'
        );

        return tl;
    }

    function updateLink(index) {
        const normalizedIndex = normalizeSlideTitle(index) - 1;
        const linkElement = document.querySelector('.con2 .link-wrapper a');
        if (linkElement) linkElement.href = linkUrls[normalizedIndex];
    }

    // 원형 경로 애니메이션
    const length = path.getTotalLength();
    gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: 0,
        rotation: -90,
        transformOrigin: 'center center',
    });
    function animateCircle() {
        const tl = gsap.timeline();
        tl.set(path, { strokeDashoffset: 0, strokeDasharray: length, scale: 1 })
            .to(path, { strokeDashoffset: -length, duration: 0.8, ease: 'power2.inOut' })
            .set(path, { strokeDashoffset: length })
            .to(path, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' });
        return tl;
    }

    // 링크 마우스 팔로우
    let xTo = gsap.quickTo(linkWrapper, 'x', { duration: 0.4, ease: 'power3' });
    let yTo = gsap.quickTo(linkWrapper, 'y', { duration: 0.4, ease: 'power3' });
    link.addEventListener('mousemove', (e) => {
        const rect = link.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        xTo(relX * 0.5);
        yTo(relY * 0.5);
    });
    link.addEventListener('mouseleave', () => {
        xTo(0);
        yTo(0);
    });
    gsap.set(linkWrapper, { x: 0, y: 0, xPercent: -50, yPercent: -50 });

    // 초기 링크
    updateLink(1);

    /* ---------------------------
     * 소프트 릴리즈(자연스러운 고정 해제)
     * ------------------------- */
    function softReleaseTo(selector) {
        if (isReleasing) return;
        isReleasing = true;
        finished = true; // 이후 재-락 방지

        const target = document.querySelector(selector);
        const currentSlide = document.querySelector(`.con2 #slide-${currentSlideIndex}`);
        const currentImg = currentSlide ? currentSlide.querySelector('img') : null;

        // 스크롤은 아래에서 미리 진행(고정 레이어가 덮고 있으므로 화면은 그대로)
        // 일부 브라우저에서 overflow hidden일 때 programmatic scroll이 제한될 수 있어 먼저 풀어줌
        document.body.classList.remove('is-locked');

        const tl = gsap.timeline({
            onComplete: () => {
                // 완전히 사라진 뒤 실제 고정 해제 + 스페이서 제거
                unlockCon2();
                // 시각 상태 복구
                gsap.set(con2, { clearProps: 'opacity,scale,filter' });
                isReleasing = false;
            },
        });

        tl.addLabel('start')
            // 아래 문서 스크롤은 동시에 진행
            .to(
                window,
                {
                    scrollTo: target || 0,
                    duration: 0.9,
                    ease: 'power2.out',
                },
                'start'
            )
            // 상단 UI 서서히 사라짐
            .to(
                '.con2 .slider-indicator',
                { opacity: 0, duration: 0.35, ease: 'power2.out' },
                'start'
            )
            .to('.con2 .link', { opacity: 0, duration: 0.35, ease: 'power2.out' }, 'start')
            // 슬라이드 이미지 살짝 확대로 여운
            .to(currentImg, { scale: '+=0.05', duration: 0.6, ease: 'power2.out' }, 'start')
            // con2 레이어 전체 페이드아웃(조금 뒤에 겹쳐서)
            .to(con2, { opacity: 0, duration: 0.6, ease: 'power2.out' }, 'start+=0.1');
    }

    /* ---------------------------
     * 리사이즈 시 스페이서 갱신
     * ------------------------- */
    window.addEventListener('resize', () => {
        if (con2Spacer) con2Spacer.style.height = `${con2.offsetHeight}px`;
    });
};

const projectsPage = () => {};
const aboutPage = () => {};
const processPage = () => {};

(() => {
    common();
    const currentPath = location.href;

    if (currentPath.includes('index.html') || /\/(index\.html)?$/.test(currentPath)) {
        mainPage();
    } else if (currentPath.includes('process.html')) {
        processPage();
    } else if (currentPath.includes('projects.html')) {
        projectsPage();
    } else if (currentPath.includes('about.html')) {
        aboutPage();
    }
})();
