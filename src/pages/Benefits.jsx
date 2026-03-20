import React from 'react';
import { Link, useParams } from 'react-router-dom';
import BenefitsPageHeader from '../components/common/benefits/BenefitsPageHeader';
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

const SERVICE_CARDS = [
    {
        eyebrow: 'SIGNATURE GIFTING',
        title: '이솝의 시그니처 기프팅',
        body: '온라인 주문 제품은 재사용 가능한 코튼 백에 정갈하게 담겨 전달됩니다. 실용성과 절제를 바탕으로, 선물하는 순간의 감도를 오래 남길 수 있도록 준비했습니다.',
    },
    {
        eyebrow: 'DELIVERY & RETURNS',
        title: '무료 배송 및 반품',
        body: '주문하신 제품은 영업일 기준 3~5일 이내에 무료 배송되며, 보다 편안한 온라인 경험을 위해 미개봉 제품은 구매 후 30일 이내 무료 반품이 가능합니다.',
    },
    {
        eyebrow: 'SAMPLE EXPERIENCE',
        title: '놀라움과 즐거움이 함께하는 샘플 경험',
        body: '결제 단계에서 제공되는 샘플 중 원하는 구성을 직접 선택해보세요. 이솝의 다양한 제품을 부담 없이 경험할 수 있도록 세심하게 마련했습니다.',
    },
];

const ASSISTANCE_CARDS = [
    {
        title: '컨설턴트와 상담하기',
        description: '제품 선택부터 주문 관련 문의까지, 전문 지식을 갖춘 컨설턴트가 필요한 도움을 드립니다.',
        to: '/support/live-chat',
        cta: '상담 시작하기',
    },
    {
        title: '기프트 가이드 보기',
        description: '가벼운 선물부터 의미 있는 선물까지, 받는 이를 고려한 다양한 제안을 차분히 살펴볼 수 있습니다.',
        to: '/gift-guide',
        cta: '가이드 둘러보기',
    },
    {
        title: '제품 둘러보기',
        description: '스킨 케어, 바디, 홈, 향수까지 온라인 몰에서 천천히 탐색하며 자신에게 맞는 제품을 찾아보세요.',
        to: '/products',
        cta: '전체 제품 보기',
    },
];

const Benefits = ({ sub: propSub }) => {
    const { tab } = useParams();
    const sub = propSub || tab;

    return (
        <div className="benefits-page">
            <div className="benefits-page__header-space" />
            <BenefitsPageHeader activeKey={sub} />

            <div className="benefits-page__inner">
                <div className="benefits-page__content">
                    {sub === 'official' && (
                        <div className="benefits-page__official">
                            <section className="benefits-page__hero">
                                <div className="benefits-page__hero-copy">
                                    <p className="benefits-page__eyebrow optima-16">
                                        Official online services
                                    </p>
                                    <h2 className="benefits-page__hero-title optima-48">
                                        공식 온라인 몰의 특별한 서비스
                                    </h2>
                                    <p className="benefits-page__hero-desc suit-20-l">
                                        이솝의 오프라인 공간이 그러하듯, 온라인 몰 역시 고객을
                                        정성껏 맞이합니다. 다양한 제스처와 세심한 배려가 깃든
                                        혜택으로 더욱 풍요로운 경험을 선사합니다.
                                    </p>
                                </div>

                                <div className="benefits-page__hero-tags" aria-label="온라인 서비스 요약">
                                    {HIGHLIGHT_ITEMS.map((item) => (
                                        <div className="benefits-page__hero-tag" key={item.title}>
                                            <span className="optima-16">{item.title}</span>
                                            <p className="suit-12-r">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="benefits-page__grid" aria-label="공식몰 서비스 소개">
                                {SERVICE_CARDS.map((card) => (
                                    <article className="benefits-page__card" key={card.title}>
                                        <p className="benefits-page__card-eyebrow optima-16">
                                            {card.eyebrow}
                                        </p>
                                        <h3 className="benefits-page__card-title suit-24-r">
                                            {card.title}
                                        </h3>
                                        <p className="benefits-page__card-body suit-16-r">
                                            {card.body}
                                        </p>
                                    </article>
                                ))}
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
                                </div>

                                <div className="benefits-page__assistance-grid">
                                    {ASSISTANCE_CARDS.map((card) => (
                                        <Link
                                            className="benefits-page__assist-card"
                                            key={card.title}
                                            to={card.to}
                                        >
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
