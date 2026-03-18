let target = 0;
let current = 0;
let ease = 0.075;

const slider = document.querySelector('.slider');
const sliderWrapper = document.querySelector('.slider-wrapper');
const markerWrapper = document.querySelector('.marker-wrapper');
const activeSlide = document.querySelector('.active-slide');

let maxScroll = sliderWrapper.offsetWidth - window.innerWidth;

function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

function updateActiveSlideNumber(markerMove, markerMaxMove) {
    const partWidth = markerMaxMove / 10;
    let currentPart = Math.round((markerMove - 70) / partWidth) + 1;
    currentPart = Math.min(10, currentPart);
    activeSlide.textContent = `${currentPart}/10`;
}

function update() {
    current = lerp(current, target, ease);

    gsap.set('.slider-wrapper', {
        x: -current,
    });

    let moveRatio = current / maxScroll;

    let markerMaxMove = window.innerWidth - markerWrapper.offsetWidth - 170;
    let markerMove = 70 + moveRatio * markerMaxMove;
    gsap.set('.marker-wrapper', {
        x: markerMove,
    });

    updateActiveSlideNumber(markerMove, markerMaxMove);

    requestAnimationFrame(update);
}

window.addEventListener('resize', () => {
    maxScroll = sliderWrapper.offsetWidth - window.innerWidth;
});

window.addEventListener('wheel', (e) => {
    target += e.deltaY;

    target = Math.max(0, target);
    target = Math.min(maxScroll, target);
});

update();
