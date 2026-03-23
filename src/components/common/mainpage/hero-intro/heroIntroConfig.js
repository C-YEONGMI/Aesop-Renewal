export const HERO_INTRO_SESSION_KEY = 'aesop-hero-intro-complete-v1';

export const HERO_INTRO_DURATION_SECONDS = 8.1;
export const HERO_INTRO_RIFFLE_LAYER_COUNT = 6;

export const HERO_INTRO_ASSETS = {
    cover: '/hero-intro/book-cover.png',
    fallbackVideo: '/hero-intro/hero-book-intro.mp4',
    page1: '/hero-intro/page1.png',
    page2: '/hero-intro/page2.png',
    page3: '/hero-intro/page3.png',
    modelPath: '/hero-intro/model/classic-open/',
    modelObj: 'Classic_Book_01_Standing_Open.obj',
    modelMtl: 'Classic_Book_01_Standing_Open.mtl',
};

export const HERO_INTRO_PAGES = [
    HERO_INTRO_ASSETS.page1,
    HERO_INTRO_ASSETS.page2,
    HERO_INTRO_ASSETS.page3,
];

export const HERO_INTRO_SEGMENTS = {
    cover: [0, 0.18],
    hinge: [0.18, 0.36],
    pageRiffle: [0.36, 0.72],
    spreadSettle: [0.72, 0.88],
    portal: [0.88, 1],
};

export const HERO_INTRO_PORTAL = {
    left: 0.566,
    top: 0.168,
    width: 0.324,
    height: 0.548,
};

export const clamp01 = (value) => Math.min(Math.max(value, 0), 1);

export const mix = (start, end, amount) => start + (end - start) * amount;

export const easeOutCubic = (value) => {
    const progress = clamp01(value);

    return 1 - Math.pow(1 - progress, 3);
};

export const easeInOutCubic = (value) => {
    const progress = clamp01(value);

    if (progress < 0.5) {
        return 4 * progress * progress * progress;
    }

    return 1 - Math.pow(-2 * progress + 2, 3) / 2;
};

export const progressBetween = (value, start, end) => {
    if (end <= start) {
        return value >= end ? 1 : 0;
    }

    return clamp01((value - start) / (end - start));
};
