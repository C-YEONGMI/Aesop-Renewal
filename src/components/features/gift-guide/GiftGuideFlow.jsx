import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './GiftGuideFlow.scss';
import '../../../pages/products/Products.scss';
import { giftGuideTree } from '../../../data/giftGuideData';
import useProductStore from '../../../store/useProductStore';
import useCartStore from '../../../store/useCartStore';
import useWishlistStore from '../../../store/useWishlistStore';
import useRequireLoginAction from '../../../hooks/useRequireLoginAction';
import { getCategoryLabelFromValue } from '../../../data/productCategories';
import AddToCartButton from '../../common/button/AddToCartButton';
import Best from '../../common/badge/Best';
import New from '../../common/badge/New';
import Exclusive from '../../common/badge/Exclusive';

const renderBadge = (badge) => {
    switch (badge) {
        case 'Best': return <Best key={badge} />;
        case 'New': return <New key={badge} />;
        case 'Exclusive': return <Exclusive key={badge} />;
        default: return <span key={badge} className="badge">{badge}</span>;
    }
};

const GiftGuideFlow = () => {
    const products = useProductStore((s) => s.products);
    const addToCart = useCartStore((s) => s.addToCart);
    const wishlist = useWishlistStore((s) => s.wishlist);
    const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
    const requireLoginAction = useRequireLoginAction();
    const [step1, setStep1] = useState(null);
    const [step2, setStep2] = useState(null);
    const [step3, setStep3] = useState(null);

    const currentStep1 = useMemo(() => giftGuideTree.find((item) => item.id === step1), [step1]);

    const currentStep2 = useMemo(
        () => currentStep1?.options?.find((item) => item.id === step2),
        [currentStep1, step2]
    );

    const recommendation = useMemo(() => {
        if (!currentStep1) return null;

        // step2 없이 바로 products가 있는 경우는 없음
        if (!step2) return null;

        // step2 선택만으로 바로 추천이 끝나는 경우
        if (currentStep2?.products) {
            return currentStep2.products;
        }

        // step3까지 있는 경우
        if (currentStep2?.options && step3) {
            const finalOption = currentStep2.options.find((item) => item.id === step3);
            return finalOption?.products || null;
        }

        return null;
    }, [currentStep1, currentStep2, step2, step3]);

    const recommendedProducts = useMemo(() => {
        if (!recommendation) return [];
        return recommendation
            .map((name) => products.find((p) => p.name === name))
            .filter(Boolean);
    }, [recommendation, products]);

    const handleSelectStep1 = (id) => {
        setStep1(id);
        setStep2(null);
        setStep3(null);
    };

    const handleSelectStep2 = (id) => {
        setStep2(id);
        setStep3(null);
    };

    const handleSelectStep3 = (id) => {
        setStep3(id);
    };

    const handleReset = () => {
        setStep1(null);
        setStep2(null);
        setStep3(null);
    };

    return (
        <section className="gift-guide-flow bg-primary">
            <div className="gift-guide-flow__inner">
                <div className="gift-guide-flow__heading">
                    <p className="montage-18 text-brown-500">Gift Guide</p>
                    <h2 className="montage-48 text-brown-900">Find a thoughtful gift</h2>
                    <p className="suit-20-l text-brown-700">
                        세 단계의 질문을 따라, 상황과 취향에 맞는 선물을 찾아보세요.
                    </p>
                </div>

                <div className="gift-guide-flow__progress">
                    <div className={`gift-guide-flow__progress-item ${step1 ? 'is-active' : ''}`}>
                        <span>01</span>
                        <p>상황 선택</p>
                    </div>
                    <div className={`gift-guide-flow__progress-item ${step2 ? 'is-active' : ''}`}>
                        <span>02</span>
                        <p>방향 선택</p>
                    </div>
                    <div
                        className={`gift-guide-flow__progress-item ${
                            recommendation || step3 ? 'is-active' : ''
                        }`}
                    >
                        <span>03</span>
                        <p>취향 선택</p>
                    </div>
                </div>

                <div className="gift-guide-flow__panel-wrap">
                    <div className="gift-guide-flow__panel">
                        <div className="gift-guide-flow__question-box">
                            <p className="montage-16 text-brown-500">Step 1</p>
                            <h3 className="suit-24-r text-brown-900">
                                어떤 상황을 위한 선물인가요?
                            </h3>
                        </div>

                        <div className="gift-guide-flow__options">
                            {giftGuideTree.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    className={`gift-guide-flow__option ${
                                        step1 === item.id ? 'is-selected' : ''
                                    }`}
                                    onClick={() => handleSelectStep1(item.id)}
                                >
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {currentStep1 && (
                        <div className="gift-guide-flow__panel">
                            <div className="gift-guide-flow__question-box">
                                <p className="montage-16 text-brown-500">Step 2</p>
                                <h3 className="suit-24-r text-brown-900">
                                    {currentStep1.question2}
                                </h3>
                            </div>

                            <div className="gift-guide-flow__options">
                                {currentStep1.options.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className={`gift-guide-flow__option ${
                                            step2 === item.id ? 'is-selected' : ''
                                        }`}
                                        onClick={() => handleSelectStep2(item.id)}
                                    >
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentStep2 && currentStep2.options && (
                        <div className="gift-guide-flow__panel">
                            <div className="gift-guide-flow__question-box">
                                <p className="montage-16 text-brown-500">Step 3</p>
                                <h3 className="suit-24-r text-brown-900">
                                    {currentStep2.question3}
                                </h3>
                            </div>

                            <div className="gift-guide-flow__options">
                                {currentStep2.options.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className={`gift-guide-flow__option ${
                                            step3 === item.id ? 'is-selected' : ''
                                        }`}
                                        onClick={() => handleSelectStep3(item.id)}
                                    >
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {recommendedProducts.length > 0 && (
                    <div className="gift-guide-flow__result">
                        <div className="gift-guide-flow__result-header">
                            <p className="montage-16 text-brown-500">Recommended</p>
                            <h3 className="montage-30 text-brown-900">추천 제품</h3>
                        </div>

                        <div className="gift-guide-flow__result-list products-page__grid">
                            {recommendedProducts.map((product) => {
                                const isWishlisted = wishlist.includes(product.name);
                                return (
                                    <div key={product.name} className="products-page__card">
                                        <div className="products-page__card-img-wrap">
                                            <div className="products-page__card-overlay">
                                                <div className="products-page__card-badges">
                                                    {product.badge.map((badge) => renderBadge(badge))}
                                                </div>
                                                <button
                                                    type="button"
                                                    className={`products-page__wish-btn ${isWishlisted ? 'active' : ''}`}
                                                    onClick={() =>
                                                        requireLoginAction(() => toggleWishlist(product.name))
                                                    }
                                                    aria-label="위시리스트 추가"
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <Link to={`/product/${encodeURIComponent(product.name)}`} className="products-page__card-img-link">
                                                <img src={product.variants[0]?.image} alt={product.name} className="products-page__card-img" />
                                            </Link>
                                        </div>
                                        <div className="products-page__card-info">
                                            <div className="products-page__card-copy">
                                                <div className="products-page__card-copy-inner">
                                                    <p className="products-page__card-category suit-12-r">{getCategoryLabelFromValue(product.category)}</p>
                                                    <p className="products-page__card-name suit-18-m">{product.name}</p>
                                                    <p className="products-page__card-desc suit-14-m">{product.description}</p>
                                                    <p className="products-page__card-price suit-16-r">{product.variants[0]?.price?.toLocaleString()}원</p>
                                                </div>
                                            </div>
                                            <div className="products-page__card-actions">
                                                <div className="products-page__card-actions-inner">
                                                    <AddToCartButton className="products-page__add-btn" text="장바구니 담기" width="100%" onClick={() => requireLoginAction(() => addToCart(product, 0))} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="gift-guide-flow__actions">
                    <button type="button" className="gift-guide-flow__reset" onClick={handleReset}>
                        처음부터 다시 보기
                    </button>
                </div>
            </div>
        </section>
    );
};

export default GiftGuideFlow;
