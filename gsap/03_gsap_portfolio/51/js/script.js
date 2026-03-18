document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // ===== Lenis smooth scroll =====
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // ===== Keyword colors (RGB) =====
    const defaultBg = '60, 60, 60';
    const keywordBg = {
        clarity: '255, 214, 10', // amber
        motion: '173, 94, 255', // purple
        interfaces: '0, 200, 160', // teal
        react: '97, 218, 251', // React blue
    };

    // ===== Keywords (lower-case recommended) =====
    const keywords = ['clarity', 'motion', 'interfaces', 'react'];

    // ===== Build word spans & mark keywords =====
    const animeTextParagraphs = document.querySelectorAll('.anime-text p');

    animeTextParagraphs.forEach((paragraph) => {
        const text = paragraph.textContent;
        const words = text.split(/\s+/);
        paragraph.innerHTML = '';

        words.forEach((word) => {
            if (!word.trim()) return;

            const wordEl = document.createElement('div');
            wordEl.className = 'word';

            const span = document.createElement('span');
            span.textContent = word;

            // normalize & strip simple punctuation
            const normalized = word.toLowerCase().replace(/[.,!?;:"()]/g, '');

            // 데이터 속성(키워드/색)과 CSS 변수 초기화
            const rgb = keywords.includes(normalized)
                ? keywordBg[normalized] || defaultBg
                : defaultBg;

            wordEl.dataset.key = keywords.includes(normalized) ? normalized : '';
            wordEl.style.setProperty('--kw-bg', rgb);
            wordEl.style.setProperty('--kw-alpha', '0'); // 초기 알파 0
            // ✨ 배경은 CSS 변수로 한 번만 선언 → 이후에는 변수 값만 갱신
            wordEl.style.backgroundColor = 'rgba(var(--kw-bg), var(--kw-alpha))';

            if (wordEl.dataset.key) {
                wordEl.classList.add('keyword-wrapper');
                span.classList.add('keyword', normalized);
            }

            wordEl.appendChild(span);
            paragraph.appendChild(wordEl);
        });
    });

    // ===== Scroll-driven word reveal =====
    const animeTextContainers = document.querySelectorAll('.anime-text-container');

    animeTextContainers.forEach((container) => {
        ScrollTrigger.create({
            trigger: container,
            pin: container,
            start: 'top top',
            end: `+=${window.innerHeight * 4}`,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const words = Array.from(container.querySelectorAll('.anime-text .word'));
                const totalWords = words.length;

                words.forEach((word, index) => {
                    const span = word.querySelector('span');

                    if (progress <= 0.7) {
                        // forward reveal phase
                        const progressTarget = 0.7;
                        const revealProgress = Math.min(1, progress / progressTarget);

                        const overlapWords = 15;
                        const totalAnimationLength = 1 + overlapWords / totalWords;

                        const wordStart = index / totalWords;
                        const wordEnd = wordStart + overlapWords / totalWords;

                        const timelineScale =
                            1 /
                            Math.min(
                                totalAnimationLength,
                                1 + (totalWords - 1) / totalWords + overlapWords / totalWords
                            );

                        const adjustedStart = wordStart * timelineScale;
                        const adjustedEnd = wordEnd * timelineScale;
                        const duration = adjustedEnd - adjustedStart;

                        const wProg =
                            revealProgress <= adjustedStart
                                ? 0
                                : revealProgress >= adjustedEnd
                                ? 1
                                : (revealProgress - adjustedStart) / duration;

                        word.style.opacity = wProg;

                        // 배경 alpha는 변수로만 갱신 → 색상은 언제든 교체 가능
                        const backgroundFadeStart = wProg >= 0.9 ? (wProg - 0.9) / 0.1 : 0;
                        const alpha = Math.max(0, 1 - backgroundFadeStart);
                        word.style.setProperty('--kw-alpha', String(alpha));

                        const textRevealThreshold = 0.9;
                        const textRevealProgress =
                            wProg >= textRevealThreshold
                                ? (wProg - textRevealThreshold) / (1 - textRevealThreshold)
                                : 0;
                        span.style.opacity = Math.pow(textRevealProgress, 0.5);
                    } else {
                        // reverse fade phase
                        const reverseProgress = (progress - 0.7) / 0.3;
                        word.style.opacity = 1;
                        const targetTextOpacity = 1;

                        const reverseOverlapWords = 5;
                        const reverseWordStart = index / totalWords;
                        const reverseWordEnd = reverseWordStart + reverseOverlapWords / totalWords;

                        const reverseTimelineScale =
                            1 /
                            Math.max(
                                1,
                                (totalWords - 1) / totalWords + reverseOverlapWords / totalWords
                            );

                        const reverseAdjustedStart = reverseWordStart * reverseTimelineScale;
                        const reverseAdjustedEnd = reverseWordEnd * reverseTimelineScale;
                        const reverseDuration = reverseAdjustedEnd - reverseAdjustedStart;

                        const rProg =
                            reverseProgress <= reverseAdjustedStart
                                ? 0
                                : reverseProgress >= reverseAdjustedEnd
                                ? 1
                                : (reverseProgress - reverseAdjustedStart) / reverseDuration;

                        if (rProg > 0) {
                            span.style.opacity = targetTextOpacity * (1 - rProg);
                            word.style.setProperty('--kw-alpha', String(rProg));
                        } else {
                            span.style.opacity = targetTextOpacity;
                            word.style.setProperty('--kw-alpha', '0');
                        }
                    }
                });
            },
        });
    });

    // Resize → recompute ScrollTrigger end values
    window.addEventListener('resize', () => ScrollTrigger.refresh());

    /* =========================================================
     ✨ 런타임 색상 변경 API
     - 사용 예: setKeywordColors({ react: '0, 120, 255', motion: '255, 64, 129' })
     - 이미 하이라이트된 키워드도 즉시 반영됩니다.
     ========================================================= */
    window.setKeywordColors = function setKeywordColors(map = {}) {
        // 내부 매핑 갱신
        Object.keys(map).forEach((k) => {
            keywordBg[k.toLowerCase()] = map[k];
        });

        // 단어 요소들의 --kw-bg 갱신 (alpha는 유지)
        document.querySelectorAll('.anime-text .word').forEach((word) => {
            const key = (word.dataset.key || '').toLowerCase();
            const rgb = key ? keywordBg[key] || defaultBg : defaultBg;
            word.style.setProperty('--kw-bg', rgb);
            // 배경은 rgba(var(--kw-bg), var(--kw-alpha))로 지정되어 있으므로 즉시 색이 바뀜
        });

        // 필요 시 트리거 업데이트(선택)
        // ScrollTrigger.update(); // 즉시 onUpdate를 돌리고 싶다면 주석 해제
    };
});
