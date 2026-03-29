import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectWishlistItems } from '../../app/store/selectors/wishlistSelectors';
import { toggleWishlistItem } from '../../app/store/slices/wishlistSlice';
import useProductStore from '../../store/useProductStore';
import useCartStore from '../../store/useCartStore';
import useRequireLoginAction from '../../hooks/useRequireLoginAction';
import { getCategoryLabelFromValue, getCategoryRouteFromValue } from '../../data/productCategories';
import './ProductDetail.scss';

const TABS = [
    { key: 'detail', label: '제품 상세' },
    { key: 'review', label: '리뷰' },
    { key: 'qna', label: 'Q&A' },
];

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const products = useProductStore((state) => state.products);
    const addRecentlyViewed = useProductStore((state) => state.addRecentlyViewed);
    const addToCart = useCartStore((state) => state.addToCart);
    const wishlist = useAppSelector(selectWishlistItems);
    const requireLoginAction = useRequireLoginAction();

    const product = products.find((item) => item.name === decodeURIComponent(id));
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [activeTab, setActiveTab] = useState('detail');

    useEffect(() => {
        if (product) addRecentlyViewed(product.name);
    }, [addRecentlyViewed, product]);

    if (!product) {
        return (
            <div className="product-detail__not-found">
                <div className="product-detail__header-space" />
                <p className="suit-18-r">상품을 찾을 수 없습니다.</p>
                <Link to="/products" className="optima-16">상품 목록으로</Link>
            </div>
        );
    }

    const variant = product.variants[selectedVariant] || product.variants[0];
    const categoryPath = getCategoryRouteFromValue(product.category);
    const categoryLabel = getCategoryLabelFromValue(product.category);
    const isWished = wishlist.includes(product.name);

    const handleAddToCart = () => {
        requireLoginAction(() => addToCart(product, selectedVariant));
    };

    const handleBuyNow = () => {
        requireLoginAction(() => {
            addToCart(product, selectedVariant, { showDialog: false });
            navigate('/cart');
        });
    };

    const handleWishlistToggle = () => {
        requireLoginAction(() => dispatch(toggleWishlistItem(product.name)));
    };

    return (
        <div className="product-detail">
            <div className="product-detail__header-space" />
            <div className="product-detail__inner">
                <nav className="product-detail__breadcrumb suit-14-m">
                    <Link to="/">홈</Link>
                    <span> / </span>
                    <Link to={categoryPath}>{categoryLabel}</Link>
                    <span> / </span>
                    <span>{product.name}</span>
                </nav>

                <div className="product-detail__main">
                    <div className="product-detail__gallery">
                        <div className="product-detail__img-wrap">
                            <img src={variant.image} alt={product.name} />
                        </div>
                    </div>

                    <div className="product-detail__info">
                        {product.badge?.length > 0 ? (
                            <div className="product-detail__badges">
                                {product.badge.map((badge) => (
                                    <span key={badge} className={`badge badge-${badge.toLowerCase()} suit-12-r`}>
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        ) : null}

                        <p className="product-detail__category suit-14-m">{categoryLabel}</p>
                        <h1 className="product-detail__name optima-40">{product.name}</h1>
                        <p className="product-detail__desc suit-18-r">{product.description}</p>

                        <p className="product-detail__price suit-26-sb">
                            {variant.price?.toLocaleString()}원
                        </p>

                        {product.variants.length > 1 ? (
                            <div className="product-detail__variants">
                                <p className="suit-14-m">용량 선택</p>
                                <div className="product-detail__variant-list">
                                    {product.variants.map((item, index) => (
                                        <button
                                            key={`${item.capacity}-${index}`}
                                            type="button"
                                            className={`product-detail__variant-btn suit-14-m ${selectedVariant === index ? 'active' : ''}`}
                                            onClick={() => setSelectedVariant(index)}
                                        >
                                            {item.capacity} · {item.price?.toLocaleString()}원
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        <div className="product-detail__actions">
                            <button type="button" className="product-detail__add-btn suit-18-m" onClick={handleAddToCart} disabled={product.status === false}>
                                {product.status === false ? '품절' : '장바구니 담기'}
                            </button>
                            <button type="button" className="product-detail__buy-btn suit-18-m" onClick={handleBuyNow} disabled={product.status === false}>
                                {product.status === false ? '품절' : '바로 구매'}
                            </button>
                            <button
                                type="button"
                                className={`product-detail__wish-btn ${isWished ? 'active' : ''}`}
                                onClick={handleWishlistToggle}
                                aria-label="위시리스트"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill={isWished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </button>
                        </div>

                        <div className="product-detail__benefits suit-14-m">
                            <p>· 공식몰 단독 샘플 증정</p>
                            <p>· 선물 포장 서비스 가능</p>
                            <p>· 회원 무료배송</p>
                        </div>
                    </div>
                </div>

                <div className="product-detail__tabs">
                    <div className="product-detail__tab-list">
                        {TABS.map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                className={`product-detail__tab-btn optima-16 ${activeTab === tab.key ? 'is-active' : ''}`}
                                onClick={() => setActiveTab(tab.key)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="product-detail__tab-content suit-16-r">
                        {activeTab === 'detail' ? (
                            <div className="product-detail__tab-detail">
                                <section className="product-detail__detail-block">
                                    <h2 className="product-detail__detail-title optima-20">상품 설명</h2>
                                    <p>{product.description}</p>
                                </section>

                                <section className="product-detail__detail-block">
                                    <h2 className="product-detail__detail-title optima-20">성분</h2>
                                    <p>성분 정보는 제품 패키지를 참고해 주세요.</p>
                                </section>

                                <section className="product-detail__detail-block">
                                    <h2 className="product-detail__detail-title optima-20">패키징 & 환경</h2>
                                    <p>이솝은 FSC 인증 종이와 재활용 가능한 소재 사용을 지향합니다.</p>
                                </section>

                                <section className="product-detail__detail-block">
                                    <h2 className="product-detail__detail-title optima-20">배송 & 반품</h2>
                                    <p>회원 무료배송 · 수령 후 7일 이내 반품 가능</p>
                                </section>
                            </div>
                        ) : null}

                        {activeTab === 'review' ? (
                            <p className="product-detail__no-review">아직 리뷰가 없습니다. 첫 번째 리뷰를 작성해보세요.</p>
                        ) : null}

                        {activeTab === 'qna' ? (
                            <div className="product-detail__qna-empty">
                                <h2 className="product-detail__detail-title optima-20">Q&A</h2>
                                <p>아직 등록된 Q&A가 없습니다. 궁금한 점은 고객센터로 문의해 주세요.</p>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
