import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
} from 'react';
import HTMLFlipBook from 'react-pageflip';
import { HERO_INTRO_ASSETS } from './heroIntroConfig';

const FlipPage = forwardRef(function FlipPage(
    { className = '', density = 'soft', children },
    ref
) {
    return (
        <div
            ref={ref}
            data-density={density}
            className={`hero__intro-book-page ${className}`.trim()}
        >
            <div className="hero__intro-book-page-inner">{children}</div>
        </div>
    );
});

const FolioPlatePage = ({
    side,
    src,
    meta,
    folio,
    pageNumber,
    imagePosition = 'center center',
    className = '',
}) => (
    <FlipPage
        className={`hero__intro-book-page--plate hero__intro-book-page--${side} ${className}`.trim()}
    >
        <span className="hero__intro-book-meta">{meta}</span>
        <div className="hero__intro-book-plate">
            <img
                src={src}
                alt=""
                draggable="false"
                className="hero__intro-book-plate-image"
                style={{ objectPosition: imagePosition }}
            />
        </div>
        <div className="hero__intro-book-folio-footer">
            <span>{folio}</span>
            <span>{pageNumber}</span>
        </div>
    </FlipPage>
);

const FolioLedgerPage = ({
    side,
    src,
    meta,
    heading,
    latin,
    paragraphs,
    register,
    pageNumber,
    imagePosition = 'center center',
}) => (
    <FlipPage className={`hero__intro-book-page--ledger hero__intro-book-page--${side}`}>
        <span className="hero__intro-book-meta">{meta}</span>
        <div className="hero__intro-book-watermark">
            <img
                src={src}
                alt=""
                draggable="false"
                className="hero__intro-book-watermark-image"
                style={{ objectPosition: imagePosition }}
            />
        </div>
        <h3 className="hero__intro-book-note-heading hero__intro-book-note-heading--folio">
            {heading}
            <span>{latin}</span>
        </h3>
        <div className="hero__intro-book-ledger-columns">
            {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
            ))}
        </div>
        <ul className="hero__intro-book-register">
            {register.map((entry) => (
                <li key={entry}>{entry}</li>
            ))}
        </ul>
        <div className="hero__intro-book-folio-footer hero__intro-book-folio-footer--ledger">
            <span>Compendium Botanicum</span>
            <span>{pageNumber}</span>
        </div>
    </FlipPage>
);

const FolioStudyPage = ({
    side,
    src,
    meta,
    heading,
    copy,
    pageNumber,
    imagePosition = 'center center',
}) => (
    <FlipPage className={`hero__intro-book-page--study hero__intro-book-page--${side}`}>
        <span className="hero__intro-book-meta">{meta}</span>
        <div className="hero__intro-book-study">
            <img
                src={src}
                alt=""
                draggable="false"
                className="hero__intro-book-study-image"
                style={{ objectPosition: imagePosition }}
            />
        </div>
        <h4 className="hero__intro-book-study-heading">{heading}</h4>
        <p className="hero__intro-book-study-copy">{copy}</p>
        <div className="hero__intro-book-folio-footer">
            <span>Archive Study</span>
            <span>{pageNumber}</span>
        </div>
    </FlipPage>
);

const getTargetPage = (progress) => {
    if (progress < 0.18) {
        return 0;
    }

    if (progress < 0.22) {
        return 2;
    }

    if (progress < 0.26) {
        return 4;
    }

    if (progress < 0.3) {
        return 6;
    }

    if (progress < 0.34) {
        return 8;
    }

    return 10;
};

const HeroIntroFlipBook = forwardRef(function HeroIntroFlipBook(
    { heroVideoSrc },
    ref
) {
    const bookRef = useRef(null);
    const pendingPageRef = useRef(0);
    const isFlippingRef = useRef(false);

    const flushPendingPage = useCallback(() => {
        const pageFlipApi = bookRef.current?.pageFlip?.();

        if (!pageFlipApi || isFlippingRef.current) {
            return;
        }

        const currentPage = pageFlipApi.getCurrentPageIndex();
        const targetPage = pendingPageRef.current;

        if (targetPage === currentPage) {
            return;
        }

        isFlippingRef.current = true;

        if (targetPage > currentPage) {
            pageFlipApi.flipNext('bottom');
            return;
        }

        pageFlipApi.flipPrev('top');
    }, []);

    useImperativeHandle(
        ref,
        () => ({
            syncToProgress(progress) {
                pendingPageRef.current = getTargetPage(progress);
                flushPendingPage();
            },
        }),
        [flushPendingPage]
    );

    const handleInit = useCallback(
        (event) => {
            const page = event?.data?.page ?? 0;

            isFlippingRef.current = false;

            if (pendingPageRef.current !== page) {
                flushPendingPage();
                return;
            }

            pendingPageRef.current = page;
        },
        [flushPendingPage]
    );

    const handleFlip = useCallback(
        (event) => {
            const page =
                event?.data ??
                bookRef.current?.pageFlip?.().getCurrentPageIndex() ??
                0;

            isFlippingRef.current = false;

            if (pendingPageRef.current !== page) {
                flushPendingPage();
                return;
            }

            pendingPageRef.current = page;
        },
        [flushPendingPage]
    );

    const handleChangeState = useCallback(
        (event) => {
            const nextState = event?.data;

            if (
                nextState === 'flipping' ||
                nextState === 'user_fold' ||
                nextState === 'fold_corner'
            ) {
                isFlippingRef.current = true;
                return;
            }

            isFlippingRef.current = false;
            flushPendingPage();
        },
        [flushPendingPage]
    );

    return (
        <div className="hero__intro-flipbook-shell" aria-hidden="true">
            <HTMLFlipBook
                ref={bookRef}
                className="hero__intro-flipbook"
                width={540}
                height={610}
                size="stretch"
                minWidth={260}
                maxWidth={620}
                minHeight={320}
                maxHeight={700}
                drawShadow
                flippingTime={140}
                usePortrait={false}
                startZIndex={8}
                autoSize
                maxShadowOpacity={0.36}
                showCover={false}
                mobileScrollSupport={false}
                clickEventForward={false}
                useMouseEvents={false}
                onInit={handleInit}
                onFlip={handleFlip}
                onChangeState={handleChangeState}
            >
                <FolioPlatePage
                    side="left"
                    src={HERO_INTRO_ASSETS.page1}
                    meta="Archive Plate I"
                    folio="Rosmarinus officinalis"
                    pageNumber="012"
                />

                <FolioLedgerPage
                    side="right"
                    src={HERO_INTRO_ASSETS.page1}
                    meta="Field Annotation"
                    heading="Rosemary Ledger"
                    latin="Rosmarinus officinalis"
                    paragraphs={[
                        'The book opens as a true folio: the specimen remains intact on one side while the facing page holds field notes, archive marks, and measured observations.',
                        'Keeping both pages on the same parchment and typographic system makes the spread read as one bound volume rather than separate inserts.',
                    ]}
                    register={[
                        'Root pressings and stem measurements logged before dawn.',
                        'Herbarium paper toned with amber residue and soft smoke.',
                        'Marginal notes reserved for ritual preparation references.',
                    ]}
                    pageNumber="013"
                    imagePosition="58% 18%"
                />

                <FolioPlatePage
                    side="left"
                    src={HERO_INTRO_ASSETS.page2}
                    meta="Archive Plate II"
                    folio="Citrus sinensis"
                    pageNumber="024"
                />

                <FolioLedgerPage
                    side="right"
                    src={HERO_INTRO_ASSETS.page2}
                    meta="Citrus Registry"
                    heading="Orange Register"
                    latin="Citrus sinensis"
                    paragraphs={[
                        'The citrus section keeps the same folio proportions and quiet margins, so the page riffle feels like one continuous encyclopedia instead of a visual collage.',
                        'At speed, these pages should read as researched leaves from the same binding, each with slightly different density but the same archival hand.',
                    ]}
                    register={[
                        'Rind oil studies noted beside blossom and branch forms.',
                        'Pigment drift preserved to match the warm Aesop palette.',
                        'Print density reduced to keep the page breathable in motion.',
                    ]}
                    pageNumber="025"
                    imagePosition="center 24%"
                />

                <FolioPlatePage
                    side="left"
                    src={HERO_INTRO_ASSETS.page3}
                    meta="Archive Plate III"
                    folio="Citrus bergamia"
                    pageNumber="036"
                />

                <FolioLedgerPage
                    side="right"
                    src={HERO_INTRO_ASSETS.page3}
                    meta="Archive Annotation"
                    heading="Bergamot Ledger"
                    latin="Citrus bergamia"
                    paragraphs={[
                        'Bergamot carries the richest paper tone in the set, which helps the flipbook warm naturally as it approaches the final illustrated entrance.',
                        'The botanical plate remains visible beneath the notes so even the text pages still feel printed, not layered like interface cards.',
                    ]}
                    register={[
                        'Pressed leaf veins kept visible under low-contrast note blocks.',
                        'Fruit studies balanced with paper foxing and edge wear.',
                        'Binding sequence prepared for the moving final plate.',
                    ]}
                    pageNumber="037"
                    imagePosition="52% 24%"
                />

                <FolioStudyPage
                    side="left"
                    src={HERO_INTRO_ASSETS.page1}
                    meta="Magnified Study"
                    heading="Rosmarinus Detail"
                    copy="A tighter crop gives the page-turn burst more rhythm while keeping the specimen grounded in the same printed encyclopedia language."
                    pageNumber="048"
                    imagePosition="38% center"
                />

                <FolioStudyPage
                    side="right"
                    src={HERO_INTRO_ASSETS.page2}
                    meta="Comparative Study"
                    heading="Orange Detail"
                    copy="Fruit, leaf, and blossom stay visible within the same paper field, so the right page still reads like an original plate instead of a pasted graphic."
                    pageNumber="049"
                    imagePosition="44% center"
                />

                <FolioStudyPage
                    side="left"
                    src={HERO_INTRO_ASSETS.page3}
                    meta="Closing Study"
                    heading="Bergamot Detail"
                    copy="The last study page deepens the golden tone and prepares the right-hand illustration to feel like the next chapter of the same bound object."
                    pageNumber="060"
                    imagePosition="42% center"
                />

                <FolioLedgerPage
                    side="right"
                    src={HERO_INTRO_ASSETS.page1}
                    meta="Frontispiece Note"
                    heading="Compendium Botanicum"
                    latin="Preparatio Folii"
                    paragraphs={[
                        'The final turn holds a quieter register so the next reveal can breathe. The spread should feel settled, weighted, and fully bound before the live illustration appears.',
                        'That pause is what makes the handoff feel like stepping into a page, not leaving the book behind.',
                    ]}
                    register={[
                        'Spine tension eased before the final right-hand reveal.',
                        'Paper grain kept visible through the full folio width.',
                        'Illustrated entrance aligned with the Hero beneath.',
                    ]}
                    pageNumber="061"
                    imagePosition="48% top"
                />

                <FolioPlatePage
                    side="left"
                    src={HERO_INTRO_ASSETS.page1}
                    meta="Final Left Leaf"
                    folio="Compendium Botanicum"
                    pageNumber="072"
                    className="hero__intro-book-page--final-left"
                />

                <FlipPage className="hero__intro-book-page--hero hero__intro-book-page--right">
                    <span className="hero__intro-book-meta">Illustrated Entrance</span>
                    <div className="hero__intro-book-hero-plate">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="hero__intro-book-hero-video"
                        >
                            <source src={heroVideoSrc} type="video/mp4" />
                        </video>
                        <div className="hero__intro-book-hero-overlay" />
                    </div>
                    <p className="hero__intro-book-hero-caption">
                        The right-hand plate behaves like a living illustration,
                        as though the next page of the site has already begun to
                        move inside the folio.
                    </p>
                    <div className="hero__intro-book-folio-footer hero__intro-book-folio-footer--hero">
                        <span>Illustrated Entry Plate</span>
                        <span>073</span>
                    </div>
                </FlipPage>
            </HTMLFlipBook>
        </div>
    );
});

export default HeroIntroFlipBook;
