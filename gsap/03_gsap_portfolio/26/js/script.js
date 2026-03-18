gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);

const common = () => {
    // 공통 초기화
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
};

const mainPage = () => {
    const stickySection = document.querySelector('.con1 .steps');
    if (!stickySection) return;

    const stickyHeight = window.innerHeight * 7;
    const cards = document.querySelectorAll('.con1 .card');
    const countContainer = document.querySelector('.con1 .count-container');
    const totalCards = cards.length;

    // === 함수와 변수들을 먼저 정의해야 함 ===
    const getRadius = () => {
        return window.innerWidth < 900 ? window.innerWidth * 7.5 : window.innerWidth * 2.5;
    };

    const arcAngle = Math.PI * 0.4;
    const startAngle = Math.PI / 2 - arcAngle / 2;

    function positionCards(progress = 0) {
        const radius = getRadius();
        const totalTravel = 1 + totalCards / 7.5;
        const adjustedProgress = (progress * totalTravel - 1) * 0.75;

        cards.forEach((card, i) => {
            const normalizedProgress = (totalCards - 1 - i) / totalCards;
            const cardProgress = normalizedProgress + adjustedProgress;
            const angle = startAngle + arcAngle * cardProgress;

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const rotation = (angle - Math.PI / 2) * (180 / Math.PI);

            gsap.set(card, {
                x,
                y: -y + radius,
                rotation: -rotation,
                transformOrigin: 'center center',
            });
        });
    }

    // === ScrollTrigger ===
    ScrollTrigger.create({
        id: 'stepsTrigger',
        trigger: stickySection,
        start: 'top top',
        end: `+=${stickyHeight}px`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
            positionCards(self.progress);
        },
    });

    // 초기 위치
    positionCards(0);

    // === 현재 카드 인덱스 관리 ===
    let currentCardIndex = 0;

    const options = {
        root: null,
        rootMargin: '0%',
        threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const cardIndex = Array.from(cards).indexOf(entry.target);
                currentCardIndex = cardIndex;

                const targetY = 150 - currentCardIndex * 150;
                gsap.to(countContainer, {
                    y: targetY,
                    duration: 0.3,
                    ease: 'power1.out',
                    overwrite: true,
                });
            }
        });
    }, options);

    cards.forEach((card) => observer.observe(card));

    // === 리사이즈 시 재계산 ===
    window.addEventListener('resize', () => {
        const st = ScrollTrigger.getById('stepsTrigger');
        if (st) positionCards(st.progress);
        else positionCards(0);
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
