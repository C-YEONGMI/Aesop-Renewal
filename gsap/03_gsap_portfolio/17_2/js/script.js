import { setupMarqueeAnimation } from './marquee.js';

const common = () => {
    // 메뉴등 공통
};
const mainPage = () => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const cards = gsap.utils.toArray('.con1 .card');
    const introCard = cards[0];

    const titles = gsap.utils.toArray('.con1 .card-title h2');
    titles.forEach((title) => {
        const split = new SplitText(title, {
            type: 'chars',
            charsClass: 'char',
            tag: 'div',
        });
        split.chars.forEach((char) => {
            char.innerHTML = `<span>${char.textContent}</span>`;
        });
    });

    const cardImgWrapper = introCard.querySelector('.con1 .card-img');
    const cardImg = introCard.querySelector('.con1 .card-img img');
    gsap.set(cardImgWrapper, { scale: 0.5, borderRadius: '400px' });
    gsap.set(cardImg, { scale: 1.5 });

    function animateContentIn(titleChars, description) {
        gsap.to(titleChars, { x: '0%', duration: 0.75, ease: 'power4.out' });
        gsap.to(description, {
            x: 0,
            opacity: 1,
            duration: 0.75,
            delay: 0.1,
            ease: 'power4.out',
        });
    }

    function animateContentOut(titleChars, description) {
        gsap.to(titleChars, { x: '100%', duration: 0.5, ease: 'power4.out' });
        gsap.to(description, {
            x: '40px',
            opacity: 0,
            duration: 0.5,
            ease: 'power4.out',
        });
    }

    const marquee = introCard.querySelector('.con1 .card-marquee .marquee');
    const titleChars = introCard.querySelectorAll('.con1 .char span');
    const description = introCard.querySelector('.con1 .card-description');

    ScrollTrigger.create({
        trigger: introCard,
        start: 'top top',
        end: '+=300vh',
        onUpdate: (self) => {
            const progress = self.progress;
            const imgScale = 0.5 + progress * 0.5;
            const borderRadius = 400 - progress * 375;
            const innerImgScale = 1.5 - progress * 0.5;

            gsap.set(cardImgWrapper, {
                scale: imgScale,
                borderRadius: borderRadius + 'px',
            });
            gsap.set(cardImg, { scale: innerImgScale });

            if (imgScale >= 0.5 && imgScale <= 0.75) {
                const fadeProgress = (imgScale - 0.5) / (0.75 - 0.5);
                gsap.set(marquee, { opacity: 1 - fadeProgress });
            } else if (imgScale < 0.5) {
                gsap.set(marquee, { opacity: 1 });
            } else if (imgScale > 0.75) {
                gsap.set(marquee, { opacity: 0 });
            }

            if (progress >= 1 && !introCard.contentRevealed) {
                introCard.contentRevealed = true;
                animateContentIn(titleChars, description);
            }
            if (progress < 1 && introCard.contentRevealed) {
                introCard.contentRevealed = false;
                animateContentOut(titleChars, description);
            }
        },
    });

    cards.forEach((card, index) => {
        const isLastCard = index === cards.length - 1;
        ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            end: isLastCard ? '+=100vh' : 'top top',
            endTrigger: isLastCard ? null : cards[cards.length - 1],
            pin: true,
            pinSpacing: isLastCard,
        });
    });

    cards.forEach((card, index) => {
        if (index < cards.length - 1) {
            const cardWrapper = card.querySelector('.con1 .card-wrapper');
            ScrollTrigger.create({
                trigger: cards[index + 1],
                start: 'top bottom',
                end: 'top top',
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.set(cardWrapper, {
                        scale: 1 - progress * 0.25,
                        opacity: 1 - progress,
                    });
                },
            });
        }
    });

    cards.forEach((card, index) => {
        if (index > 0) {
            const cardImg = card.querySelector('.con1 .card-img img');
            const imgContainer = card.querySelector('.con1 .card-img');
            ScrollTrigger.create({
                trigger: card,
                start: 'top bottom',
                end: 'top top',
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.set(cardImg, { scale: 2 - progress });
                    gsap.set(imgContainer, { borderRadius: 150 - progress * 125 + 'px' });
                },
            });
        }
    });

    cards.forEach((card, index) => {
        if (index === 0) return;

        const cardDescription = card.querySelector('.con1 .card-description');
        const cardTitleChars = card.querySelectorAll('.con1 .char span');

        ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            onEnter: () => animateContentIn(cardTitleChars, cardDescription),
            onLeaveBack: () => animateContentOut(cardTitleChars, cardDescription),
        });
    });

    setupMarqueeAnimation();
};

const projectsPage = () => {};
const aboutPage = () => {};

const processPage = () => {};

(() => {
    common();
    const path = location.href;
    if (path.includes('index.html')) {
        mainPage();
    } else if (path.includes('process.html')) {
        processPage();
    } else if (path.includes('projects.html')) {
        projectsPage();
    } else if (path.includes('about.html')) {
        aboutPage();
    } else if (path.includes('process.html')) {
        processPage();
    }
})();
