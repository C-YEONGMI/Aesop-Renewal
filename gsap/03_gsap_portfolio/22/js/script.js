gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Lenis (선택)
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

const common = () => {
    // === 메뉴 공통 ===
    const menu = document.querySelector('.menu');
    const toggleButton = document.querySelector('.toggle');
    const closeButton = document.querySelector('.close-btn');
    if (!menu || !toggleButton || !closeButton) return;

    let isOpen = false;

    const timeline = gsap.timeline({ paused: true });

    timeline.to(menu, {
        duration: 0.3,
        opacity: 1,
    });

    timeline.to(
        menu,
        {
            duration: 1,
            ease: 'power3.inOut',
            clipPath: 'polygon(49.75% 0%, 50.25% 0%, 50.25% 100%, 49.75% 100%)',
        },
        '-=0.3'
    );

    timeline.to(menu, {
        duration: 1,
        ease: 'power3.inOut',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        pointerEvents: 'all',
    });

    timeline.to(
        '.divider',
        {
            duration: 1,
            ease: 'power4.inOut',
            height: '100%',
        },
        '-=0.75'
    );

    toggleButton.addEventListener('click', () => {
        if (isOpen) {
            timeline.reverse();
        } else {
            timeline.play();
        }
        isOpen = !isOpen;
    });

    closeButton.addEventListener('click', () => {
        if (isOpen) {
            timeline.reverse();
        } else {
            timeline.play();
        }
        isOpen = !isOpen;
    });
};

// === 페이지별 함수 ===
const mainPage = () => {};
const projectsPage = () => {};
const aboutPage = () => {};
const processPage = () => {};

// === 페이지 라우팅 ===
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
