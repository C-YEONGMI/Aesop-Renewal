// script.js

gsap.registerPlugin(ScrollTrigger);

/* -----------------------------
 * State
 * --------------------------- */
let target = 0;
let current = 0;
const ease = 0.075;

const con2 = document.querySelector('.con2');
const slider = document.querySelector('.con2 .slider');
const sliderWrapper = document.querySelector('.con2 .slider-wrapper');
const markerWrapper = document.querySelector('.con2 .marker-wrapper');
const activeSlideEl = document.querySelector('.con2 .active-slide');
const slides = Array.from(document.querySelectorAll('.con2 .slide'));

let totalSlides = slides.length;
let maxScroll = 0;
let st; // ScrollTrigger instance

/* -----------------------------
 * Utils
 * --------------------------- */
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const lerp = (start, end, t) => start + (end - start) * t;

const getMaxScroll = () => {
    // 수평 슬라이더가 움직일 수 있는 총 거리
    const width = sliderWrapper?.scrollWidth ?? 0;
    return Math.max(0, width - window.innerWidth);
};

function updateActiveSlideNumber(progress) {
    // progress(0~1) → 1 ~ totalSlides
    const idx = clamp(Math.round(progress * (totalSlides - 1)) + 1, 1, totalSlides);
    activeSlideEl.textContent = `${idx}/${totalSlides}`;
}

function updateMarker(progress) {
    // markerWrapper(세로 라인 + 원형)이 화면 내에서 좌→우로 이동
    const start = 70; // 시작 오프셋
    const end = window.innerWidth - (markerWrapper?.offsetWidth ?? 0) - 100; // 우측 여백
    const x = lerp(start, Math.max(start, end), progress);
    gsap.set(markerWrapper, { x });
}

/* -----------------------------
 * Render Loop
 * --------------------------- */
function render() {
    current = lerp(current, target, ease);

    // 슬라이더 이동
    gsap.set(sliderWrapper, { x: -current });

    const progress = maxScroll > 0 ? current / maxScroll : 0;
    updateMarker(progress);
    updateActiveSlideNumber(progress);

    requestAnimationFrame(render);
}

/* -----------------------------
 * ScrollTrigger (pin + progress→target)
 * --------------------------- */
function setupScrollTrigger() {
    // 기존 인스턴스 있으면 제거
    if (st) st.kill();

    maxScroll = getMaxScroll();

    st = ScrollTrigger.create({
        trigger: con2,
        start: 'top top',
        end: () => `+=${maxScroll}`, // 슬라이더가 끝까지 갈 때까지 pin 유지
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
            // 스크롤 비율을 target으로 매핑
            target = clamp(maxScroll * self.progress, 0, maxScroll);
        },
    });
}

/* -----------------------------
 * Init / Resize
 * --------------------------- */
function init() {
    totalSlides = slides.length;
    activeSlideEl.textContent = `1/${totalSlides}`;

    maxScroll = getMaxScroll();
    setupScrollTrigger();
    render();
}

window.addEventListener('resize', () => {
    maxScroll = getMaxScroll();
    if (st) {
        // end 길이 재설정 & refresh
        st.vars.end = `+=${maxScroll}`;
        st.refresh();
    }
});

// wheel 수동 제어는 ScrollTrigger와 충돌하니 제거합니다.
// window.addEventListener('wheel', ... ) ❌

// kick-off
init();
