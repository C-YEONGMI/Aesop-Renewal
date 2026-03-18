const tl = gsap.timeline({ paused: true });

let tl1 = gsap.timeline();

tl1.from('.sun', { duration: 1, opacity: 0, x: 50, y: 50 });
tl1.from('.gress', {
    duration: 1,
    opacity: 0,
    y: 100,
    stagger: {
        each: 0.2,
        from: 'center',
    },
});
tl1.from('.bird', { duration: 1, opacity: 0, y: 100 });
tl1.from('.music', { duration: 1, opacity: 0, x: 100, y: 100 });
tl1.from('.eye-left', { duration: 1, x: 30, repeat: -1, yoyo: true });
tl1.from('.eye-right', { duration: 1, x: 30, repeat: -1, yoyo: true });

let path = document.querySelector('path');

gsap.set('#hamburger', { '--burger-span-before-bgcolor': '#000' });
gsap.set('.menu', { visibility: 'hidden' });

// TOGGLE MENU
function revealMenu() {
    revealMenuItems();

    const toggleBtn = document.getElementById('toggle-btn');
    const hamburger = document.getElementById('hamburger');

    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();

        hamburger.classList.toggle('active');
        tl.reversed(!tl.reversed());
    });
}
revealMenu();

function revealMenuItems() {
    const start = 'M0 502S175 272 500 272s500 230 500 230V0H0Z';
    const end = 'M0,1005S175,995,500,995s500,5,500,5V0H0Z';
    const power2 = 'power2.inOut';
    const power4 = 'power4.inOut';

    tl.to('#hamburger', {
        marginTop: '-5px',
        x: -40,
        y: 40,
        duration: 1.25,
        ease: power4,
    });

    tl.to(
        '#hamburger span',
        {
            backgroundColor: '#e2e2dc',
            duration: 1,
            ease: power2,
        },
        '<'
    );
    tl.to(
        '#hamburger',
        {
            '--burger-span-before-bgcolor': '#e2e2dc',
            duration: 1,
            ease: power2,
        },
        '<'
    );

    tl.to(
        '.btn .btn__outline',
        {
            x: -40,
            y: 40,
            width: '140px',
            height: '140px',
            border: '1px solid #e2e2dc',
            duration: 1.25,
            ease: power4,
        },
        '<'
    );

    tl.to(
        path,
        {
            attr: {
                d: start,
            },
            duration: 0.8,
            ease: 'power2.in',
        },
        '<'
    ).to(
        path,
        {
            attr: {
                d: end,
            },
            duration: 0.8,
            ease: 'power2.out',
        },
        '-=0.5'
    );

    tl.to('.menu', { visibility: 'visible', duration: 1 }, '-=0.5');

    tl.to(
        '.menu__item > a',
        {
            top: 0,
            duration: 1,
            stagger: {
                amount: 0.5,
            },
            ease: 'power3.out',
        },
        '-=1'
    ).reverse();
}
