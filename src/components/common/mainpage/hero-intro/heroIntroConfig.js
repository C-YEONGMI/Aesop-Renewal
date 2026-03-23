export const HERO_INTRO_SESSION_KEY = 'aesop-hero-intro-complete-v1';

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

export const HERO_INTRO_SEGMENTS = {
    cover: [0, 0.15],
    opening: [0.15, 0.35],
    botanical: [0.35, 0.75],
    hold: [0.75, 0.9],
    exit: [0.9, 1],
};

export const HERO_INTRO_PORTAL = {
    left: 0.532,
    top: 0.158,
    width: 0.384,
    height: 0.604,
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
