const common = () => {
    // 메뉴등 공통
};

const mainPage = () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;
    let isAnimating = false;
    let currentTopValue = 0;

    const elements = [
        { selector: '.prefix', delay: 0 },
        { selector: '.names', delay: 0.15 },
        { selector: '.texts', delay: 0.3 },
    ];

    slides.forEach((slide, idx) => {
        if (idx !== 0) {
            const img = slide.querySelector('img');
            gsap.set(img, { scale: 2, top: '4em' });
        }
    });

    function showSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        const slide = slides[index];
        const img = slide.querySelector('img');

        currentTopValue -= 30;

        elements.forEach((elem) => {
            gsap.to(document.querySelector(elem.selector), {
                y: `${currentTopValue}px`,
                duration: 2,
                ease: 'power4.inOut',
                delay: elem.delay,
            });
        });

        gsap.to(img, {
            scale: 1,
            top: '0%',
            duration: 2,
            ease: 'power3.inOut',
        });
        gsap.to(
            slide,
            {
                clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
                duration: 2,
                ease: 'power4.inOut',
                onComplete: () => {
                    isAnimating = false;
                },
            },
            '<'
        );
    }

    function hideSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        const slide = slides[index];
        const img = slide.querySelector('img');

        currentTopValue += 30;
        elements.forEach((elem) => {
            gsap.to(document.querySelector(elem.selector), {
                y: `${currentTopValue}px`,
                duration: 2,
                ease: 'power4.inOut',
                delay: elem.delay,
            });
        });

        gsap.to(slide, {
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
            duration: 2,
            ease: 'power4.inOut',
        });

        gsap.to(img, {
            scale: 2,
            top: '4em',
            duration: 2,
            ease: 'power3.inOut',
        });

        gsap.to(
            slide,
            {
                clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
                duration: 2,
                ease: 'power4.inOut',
                onComplete: () => {
                    isAnimating = false;
                },
            },
            '<'
        );
    }

    window.addEventListener('wheel', (e) => {
        if (isAnimating) return;
        if (e.deltaY > 0 && currentSlideIndex < slides.length - 1) {
            showSlide(currentSlideIndex + 1);
            currentSlideIndex++;
        } else if (e.deltaY < 0 && currentSlideIndex > 0) {
            hideSlide(currentSlideIndex);
            currentSlideIndex--;
        }
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
