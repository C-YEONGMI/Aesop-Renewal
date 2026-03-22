import React from 'react';
import { Link, useParams } from 'react-router-dom';
import BenefitsPageHeader from '../components/common/benefits/BenefitsPageHeader';
import mainStoreImage from '../assets/Main_store.png';
import packagingMainImage from '../assets/KoreaExclusive_PackagingMain.png';
import packagingUseImageOne from '../assets/KoreaExclusive_PackagingUse1.png';
import packagingUseImageTwo from '../assets/KoreaExclusive_PackagingUse2.png';
import giftGuideImage from '../assets/BestGift_M1.png';
import giftCardImage from '../assets/Configuration_GiftCard.png';
import handCreamImage from '../assets/Configuration_HandCream.png';
import perfumeImage from '../assets/Configuration_Perfume.png';
import './Benefits.scss';

const HIGHLIGHT_ITEMS = [
    {
        title: '무료 배송',
        description: '모든 주문은 영업일 기준 3~5일 이내에 무료로 배송됩니다.',
    },
    {
        title: '무료 반품',
        description: '미개봉 제품은 구매 후 30일 이내 무료 반품이 가능합니다.',
    },
    {
        title: '무료 샘플',
        description: '결제 단계에서 원하는 샘플을 선택해 미리 경험할 수 있습니다.',
    },
    {
        title: '무료 선물 포장',
        description: '정제된 감각의 포장으로 선물하는 순간까지 배려를 더합니다.',
    },
];

const HERO_FRAMES = [
    {
        title: 'Gifting',
        alt: '이솝 기프트 패키징 서비스 이미지',
        image: packagingUseImageOne,
    },
    {
        title: 'Consultation',
        alt: '이솝 매장 상담 공간 이미지',
        image: mainStoreImage,
    },
    {
        title: 'Complimentary wrapping',
        alt: '이솝 온라인 기프트 포장 이미지',
        image: packagingMainImage,
    },
    {
        title: 'Gift card',
        alt: '이솝 온라인 서비스 기프트 카드 이미지',
        image: giftCardImage,
    },
];

const SERVICE_STORIES = [
    {
        eyebrow: 'SIGNATURE GIFTING',
        title: '이솝의 시그니처 기프팅',
        body: '온라인 주문 제품은 재사용 가능한 코튼 백에 정갈하게 담겨 전달됩니다. 실용성과 절제를 바탕으로, 선물하는 순간의 감도를 오래 남길 수 있도록 준비했습니다.',
        image: packagingUseImageTwo,
        alt: '이솝 시그니처 기프팅 이미지',
        note: 'Reusable cotton bag',
        points: ['재사용 가능한 코튼 백', '정갈한 포장', '선물의 감도를 오래 남기는 구성'],
    },
    {
        eyebrow: 'DELIVERY & RETURNS',
        title: '무료 배송 및 반품',
        body: '주문하신 제품은 영업일 기준 3~5일 이내에 무료 배송되며, 보다 편안한 온라인 경험을 위해 미개봉 제품은 구매 후 30일 이내 무료 반품이 가능합니다.',
        image: packagingMainImage,
        alt: '이솝 배송 및 반품 서비스 이미지',
        note: '3-5 business days',
    },
    {
        eyebrow: 'SAMPLE EXPERIENCE',
        title: '놀라움과 즐거움이 함께하는 샘플 경험',
        body: '결제 단계에서 제공되는 샘플 중 원하는 구성을 직접 선택해보세요. 이솝의 다양한 제품을 부담 없이 경험할 수 있도록 세심하게 마련했습니다.',
        image: handCreamImage,
        alt: '이솝 샘플 경험을 상징하는 제품 이미지',
        note: 'Select at checkout',
    },
];

const CURATED_PRODUCTS = [
    { title: 'Gift card', image: giftCardImage, alt: '이솝 기프트 카드 이미지' },
    { title: 'Hand care', image: handCreamImage, alt: '이솝 핸드 케어 제품 이미지' },
    { title: 'Fragrance', image: perfumeImage, alt: '이솝 향수 제품 이미지' },
];

const ASSISTANCE_CARDS = [
    {
        title: '컨설턴트와 상담하기',
        description: '제품 선택부터 주문 관련 문의까지, 전문 지식을 갖춘 컨설턴트가 필요한 도움을 드립니다.',
        to: '/support/live-chat',
        cta: '상담 시작하기',
        image: mainStoreImage,
        alt: '이솝 컨설턴트 상담 이미지',
    },
    {
        title: '기프트 가이드 보기',
        description: '가벼운 선물부터 의미 있는 선물까지, 받는 이를 고려한 다양한 제안을 차분히 살펴볼 수 있습니다.',
        to: '/gift-guide',
        cta: '가이드 둘러보기',
        image: giftGuideImage,
        alt: '이솝 기프트 가이드 이미지',
    },
    {
        title: '제품 둘러보기',
        description: '스킨 케어, 바디, 홈, 향수까지 온라인 몰에서 천천히 탐색하며 자신에게 맞는 제품을 찾아보세요.',
        to: '/products',
        cta: '전체 제품 보기',
        image: perfumeImage,
        alt: '이솝 제품 둘러보기 이미지',
    },
];

const Benefits = ({ sub: propSub }) => {
    const { tab } = useParams();
    const sub = propSub || tab;
    const [featureStory, ...secondaryStories] = SERVICE_STORIES;

    return (
        <div className="benefits-page">
            <div className="benefits-page__header-space" />
            <BenefitsPageHeader activeKey={sub} />

            <div className="benefits-page__inner">
                <div className="benefits-page__content">
                    {sub === 'official' && (
                        <div className="benefits-page__official">
                            <section className="benefits-page__hero">
                                <p className="benefits-page__hero-word montage-100" aria-hidden="true">
                                    Rituals
                                </p>

                                <div className="benefits-page__hero-copy">
                                    <p className="benefits-page__eyebrow optima-16">
                                        Official online services
                                    </p>
                                    <h2 className="benefits-page__hero-title">
                                        <span className="optima-48">공식 온라인 몰의</span>
                                        <span className="optima-48">특별한 서비스</span>
                                    </h2>
                                    <p className="benefits-page__hero-script montage-48">
                                        Online Rituals
                                    </p>
                                    <p className="benefits-page__hero-desc suit-20-l">
                                        이솝의 오프라인 공간이 그러하듯, 온라인 몰 역시 고객을
                                        정성껏 맞이합니다. 다양한 제스처와 세심한 배려가 깃든 혜택으로
                                        더욱 풍요로운 경험을 선사합니다.
                                    </p>

                                    <div className="benefits-page__hero-actions">
                                        <Link
                                            className="benefits-page__hero-button benefits-page__hero-button--dark suit-14-m"
                                            to="/support/live-chat"
                                        >
                                            실시간 상담 보기
                                        </Link>
                                        <Link
                                            className="benefits-page__hero-button benefits-page__hero-button--light suit-14-m"
                                            to="/gift-guide"
                                        >
                                            기프트 가이드 보기
                                        </Link>
                                    </div>
                                </div>

                                <div className="benefits-page__hero-collage" aria-hidden="true">
                                    {HERO_FRAMES.map((frame, index) => (
                                        <figure
                                            className={`benefits-page__hero-frame benefits-page__hero-frame--${index + 1}`}
                                            key={frame.title}
                                        >
                                            <img src={frame.image} alt={frame.alt} />
                                            <figcaption className="optima-16">
                                                {frame.title}
                                            </figcaption>
                                        </figure>
                                    ))}

                                    <div className="benefits-page__hero-swatch">
                                        <span className="benefits-page__hero-swatch-line" />
                                        <p className="suit-14-m">
                                            Complimentary delivery, returns, samples and gifting.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section
                                className="benefits-page__benefit-strip"
                                aria-label="온라인 서비스 요약"
                            >
                                {HIGHLIGHT_ITEMS.map((item, index) => (
                                    <article className="benefits-page__benefit-card" key={item.title}>
                                        <span className="benefits-page__benefit-index optima-16">
                                            0{index + 1}
                                        </span>
                                        <h3 className="suit-20-m">{item.title}</h3>
                                        <p className="suit-14-m">{item.description}</p>
                                    </article>
                                ))}
                            </section>

                            <section className="benefits-page__storyline" aria-label="공식몰 서비스 소개">
                                <article className="benefits-page__story-feature">
                                    <div className="benefits-page__story-feature-media">
                                        <img src={featureStory.image} alt={featureStory.alt} />
                                        <span className="benefits-page__story-note suit-14-m">
                                            {featureStory.note}
                                        </span>
                                    </div>

                                    <div className="benefits-page__story-feature-copy">
                                        <p className="benefits-page__card-eyebrow optima-16">
                                            {featureStory.eyebrow}
                                        </p>
                                        <h3 className="benefits-page__story-title optima-40">
                                            {featureStory.title}
                                        </h3>
                                        <p className="benefits-page__story-body suit-18-r">
                                            {featureStory.body}
                                        </p>

                                        <ul className="benefits-page__story-points">
                                            {featureStory.points.map((point) => (
                                                <li className="suit-14-m" key={point}>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </article>

                                <div className="benefits-page__story-stack">
                                    {secondaryStories.map((story) => (
                                        <article className="benefits-page__story-card" key={story.title}>
                                            <div className="benefits-page__story-card-media">
                                                <img src={story.image} alt={story.alt} />
                                            </div>

                                            <div className="benefits-page__story-card-copy">
                                                <p className="benefits-page__card-eyebrow optima-16">
                                                    {story.eyebrow}
                                                </p>
                                                <h3 className="benefits-page__story-card-title suit-24-r">
                                                    {story.title}
                                                </h3>
                                                <p className="benefits-page__story-card-body suit-16-r">
                                                    {story.body}
                                                </p>
                                                <span className="benefits-page__story-card-note suit-12-r">
                                                    {story.note}
                                                </span>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>

                            <section className="benefits-page__assistance">
                                <div className="benefits-page__assistance-copy">
                                    <p className="benefits-page__eyebrow optima-16">
                                        At-home assistance
                                    </p>
                                    <h3 className="benefits-page__assistance-title optima-40">
                                        집에서 누리는 편안한 온라인 상담
                                    </h3>
                                    <p className="benefits-page__assistance-desc suit-18-r">
                                        제품과 주문에 관한 도움은 물론, 선물 선택에 필요한 제안까지
                                        집에서도 차분히 받아보실 수 있습니다. 공식 온라인 몰에서만
                                        이어지는 배려를 원하는 방식으로 경험해보세요.
                                    </p>

                                    <div className="benefits-page__curated-row" aria-hidden="true">
                                        {CURATED_PRODUCTS.map((item) => (
                                            <div className="benefits-page__curated-card" key={item.title}>
                                                <img src={item.image} alt={item.alt} />
                                                <span className="suit-12-r">{item.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="benefits-page__assistance-grid">
                                    {ASSISTANCE_CARDS.map((card) => (
                                        <Link
                                            className="benefits-page__assist-card"
                                            key={card.title}
                                            to={card.to}
                                        >
                                            <div className="benefits-page__assist-media">
                                                <img src={card.image} alt={card.alt} />
                                            </div>

                                            <div className="benefits-page__assist-copy">
                                                <h4 className="suit-20-m">{card.title}</h4>
                                                <p className="suit-16-r">{card.description}</p>
                                            </div>

                                            <span className="benefits-page__assist-link suit-14-m">
                                                {card.cta}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </section>

                            <section className="benefits-page__quote" aria-label="브랜드 인용문">
                                <p className="benefits-page__quote-text optima-20">
                                    It is by acts and not by ideas that people live.
                                </p>
                                <p className="benefits-page__quote-author suit-14-m">
                                    Anatole France
                                </p>
                            </section>
                        </div>
                    )}

                    {!sub && (
                        <div className="benefits-page__section">
                            <p className="suit-18-r">
                                상단 탭에서 보고 싶은 혜택 페이지를 선택해주세요.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Benefits;
