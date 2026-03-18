const drawer = document.querySelector('.con2 .drawer');
const close = document.querySelector('.con2 .close');
const cardsContainer = document.querySelector('.con2 .cards');

const tl = gsap.timeline({
    paused: true,
    reversed: true,
    onStart: function () {
        cardsContainer.style.pointerEvents = 'all';
    },
    onReverseComplete: function () {
        cardsContainer.style.pointerEvents = 'none';
    },
});

tl.from('.con2 .cards .card', 1.5, {
    y: 1000,
    stagger: {
        amount: 0.3,
    },
    ease: 'power4.inOut',
})
    .from(
        '.con2 .close',
        0.5,
        {
            scale: 0,
            delay: 1,
        },
        '<'
    )
    .from('.con2 .last', 0.5, {
        opacity: 0,
    });

drawer.addEventListener('click', function () {
    if (tl.reversed()) {
        tl.play();
    } else {
        tl.reverse();
    }
});

close.addEventListener('click', function () {
    tl.reverse();
});
