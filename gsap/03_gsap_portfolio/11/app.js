(function () {
    function freezeNoTransition(el) {
        // 전환 중 레이아웃 튐 방지
        el.classList.add('fashion-slider-no-transition');
        let raf;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
            el.classList.remove('fashion-slider-no-transition');
        });
    }

    function setupFashionSlider(root) {
        const container = root.querySelector('.swiper');
        let isAnimating = false; // 사용자 입력 잠금
        let loopGuard = false; // loop 시 중복 transitionStart 방지(현재 loop:false이지만 남겨둠)

        const onNext = () => {
            if (!isAnimating) swiper.slideNext();
        };
        const onPrev = () => {
            if (!isAnimating) swiper.slidePrev();
        };

        const addNavListeners = (swiper) => {
            swiper.el
                .querySelector('.fashion-slider-button-next')
                ?.addEventListener('click', onNext);
            swiper.el
                .querySelector('.fashion-slider-button-prev')
                ?.addEventListener('click', onPrev);
        };
        const removeNavListeners = (swiper) => {
            swiper.el
                .querySelector('.fashion-slider-button-next')
                ?.removeEventListener('click', onNext);
            swiper.el
                .querySelector('.fashion-slider-button-prev')
                ?.removeEventListener('click', onPrev);
        };

        // Swiper CDN 전역 사용
        const swiper = new Swiper(container, {
            // modules: [Swiper.Parallax], // CDN 번들은 기본 모듈 포함. 굳이 지정 안 해도 됨.
            speed: 1300,
            allowTouchMove: false,
            parallax: true,
            loop: false, // 필요 시 true로 변경 가능
            on: {
                loopFix() {
                    loopGuard = false;
                },

                transitionStart(s) {
                    if (s.params.loop) {
                        if (loopGuard) return;
                        loopGuard = true;
                    }
                    const { slides, previousIndex, activeIndex, el } = s;
                    if (!slides.length) return;

                    isAnimating = true;

                    const active = slides[activeIndex];
                    const prev = slides[previousIndex];

                    if (!active || !prev) return;

                    // 배경색 전환
                    const bg = active.getAttribute('data-slide-bg-color') || '#000';
                    el.style['background-color'] = bg;

                    // 이전 슬라이드 축소 + 이미지 이동
                    const prevScaleWrap = prev.querySelector('.fashion-slider-scale');
                    const prevImg = prev.querySelector('img');
                    const nextImg = active.querySelector('img');

                    if (prevScaleWrap) prevScaleWrap.style.transform = 'scale(0.6)';

                    if (prevImg) {
                        prevImg.style.transitionDuration = '1000ms';
                        prevImg.style.transform = 'scale(1.2)';
                    }

                    // 이전 타이틀 텍스트 투명화
                    const prevTitle = prev.querySelector('.fashion-slider-title-text');
                    if (prevTitle) {
                        prevTitle.style.transition = '1000ms';
                        prevTitle.style.color = 'rgba(255,255,255,0)';
                    }

                    // 이전 이미지 전환 완료 후, 다음/이전 이미지 이동 모션
                    const delta = activeIndex - previousIndex;
                    const onPrevImgEnd = (ev) => {
                        if (ev.target !== prevImg) return;
                        prevImg.removeEventListener('transitionend', onPrevImgEnd);

                        if (nextImg) {
                            nextImg.style.transitionDuration = '1300ms';
                            nextImg.style.transform = 'translate3d(0, 0, 0) scale(1.2)';
                        }
                        if (prevImg) {
                            prevImg.style.transitionDuration = '1300ms';
                            prevImg.style.transform = `translate3d(${
                                60 * delta
                            }%, 0, 0) scale(1.2)`;
                        }
                    };
                    if (prevImg) prevImg.addEventListener('transitionend', onPrevImgEnd);
                },

                transitionEnd(s) {
                    const { slides, activeIndex, el } = s;
                    const active = slides[activeIndex];
                    if (!active) return;

                    // 활성 슬라이드 스케일 원복
                    const scaleWrap = active.querySelector('.fashion-slider-scale');
                    const img = active.querySelector('img');
                    if (scaleWrap) scaleWrap.style.transform = 'scale(1)';
                    if (img) {
                        img.style.transitionDuration = '1000ms';
                        img.style.transform = 'scale(1)';
                    }

                    // 활성 타이틀 컬러 원복
                    const title = active.querySelector('.fashion-slider-title-text');
                    if (title) {
                        title.style.transition = '1000ms';
                        title.style.color = 'rgba(255,255,255,1)';
                    }

                    // 애니 끝나면 입력 잠금 해제
                    if (img) {
                        const onEnd = (ev) => {
                            if (ev.target !== img) return;
                            img.removeEventListener('transitionend', onEnd);
                            isAnimating = false;
                        };
                        img.addEventListener('transitionend', onEnd);
                    } else {
                        isAnimating = false;
                    }

                    // loop=false인 경우 버튼 disabled 처리
                    if (!s.params.loop) {
                        const prevBtn = el.querySelector('.fashion-slider-button-prev');
                        const nextBtn = el.querySelector('.fashion-slider-button-next');
                        if (activeIndex === 0)
                            prevBtn?.classList.add('fashion-slider-button-disabled');
                        else prevBtn?.classList.remove('fashion-slider-button-disabled');

                        if (activeIndex === slides.length - 1)
                            nextBtn?.classList.add('fashion-slider-button-disabled');
                        else nextBtn?.classList.remove('fashion-slider-button-disabled');
                    }
                },

                beforeInit(s) {
                    freezeNoTransition(s.el);
                },

                init(s) {
                    const { slides, activeIndex, el } = s;
                    const bg = slides[activeIndex]?.getAttribute('data-slide-bg-color') || '#000';
                    el.style['background-color'] = bg;

                    // 초기 상태를 transitionEnd와 동일하게 세팅
                    s.emit('transitionEnd');

                    // 버튼 리스너 등록
                    addNavListeners(s);
                },

                resize(s) {
                    freezeNoTransition(s.el);
                },

                destroy(s) {
                    removeNavListeners(s);
                },
            },
        });

        return swiper;
    }

    // 실행
    const root = document.querySelector('.fashion-slider');
    if (root) setupFashionSlider(root);
})();
