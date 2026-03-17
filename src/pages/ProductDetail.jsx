import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useProductStore from '../store/useProductStore';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';
import useAuthStore from '../store/useAuthStore';
import './ProductDetail.scss';

const TABS = ['상품 설명', '성분', '패키징 & 환경', '배송 & 반품', '리뷰'];

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const products = useProductStore(s => s.products);
    const addRecentlyViewed = useProductStore(s => s.addRecentlyViewed);
    const addToCart = useCartStore(s => s.addToCart);
    const wishlist = useWishlistStore(s => s.wishlist);
    const toggleWishlist = useWishlistStore(s => s.toggleWishlist);
    const isLoggedIn = useAuthStore(s => s.isLoggedIn);

    const product = products.find(p => p.name === decodeURIComponent(id));
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        if (product) addRecentlyViewed(product.name);
    }, [product?.name]);

    if (!product) {
        return (
            <div className="product-detail__not-found">
                <div className="product-detail__header-space" />
                <p className="suit-18-r">상품을 찾을 수 없습니다.</p>
                <Link to="/products" className="optima-16">상품 목록으로</Link>
            </div>
        );
    }

    const variant = product.variants[selectedVariant];

    const handleAddToCart = () => {
        addToCart(product, selectedVariant);
        alert('장바구니에 담겼습니다.');
    };

    const handleBuyNow = () => {
        if (!isLoggedIn) { navigate('/login'); return; }
        addToCart(product, selectedVariant);
        navigate('/cart');
    };

    return (
        <div className="product-detail">
            <div className="product-detail__header-space" />
            <div className="product-detail__inner">

                {/* 브레드크럼 */}
                <nav className="product-detail__breadcrumb suit-14-m">
                    <Link to="/">홈</Link>
                    <span> / </span>
                    <Link to="/products">{product.category}</Link>
                    <span> / </span>
                    <span>{product.name}</span>
                </nav>

                {/* 메인 레이아웃: 이미지 + 정보 */}
                <div className="product-detail__main">

                    {/* 좌측 이미지 */}
                    <div className="product-detail__gallery">
                        <div className="product-detail__img-wrap">
                            <img src={variant.image} alt={product.name} />
                        </div>
                    </div>

                    {/* 우측 정보 */}
                    <div className="product-detail__info">
                        {/* 배지 */}
                        <div className="product-detail__badges">
                            {product.badge.map(b => (
                                <span key={b} className={`badge badge-${b.toLowerCase()} suit-12-r`}>{b}</span>
                            ))}
                        </div>

                        <p className="product-detail__category suit-14-m">{product.category}</p>
                        <h1 className="product-detail__name optima-40">{product.name}</h1>
                        <p className="product-detail__desc suit-18-r">{product.description}</p>

                        {/* 가격 */}
                        <p className="product-detail__price suit-26-sb">
                            {variant.price?.toLocaleString()}원
                        </p>

                        {/* Variant 선택 */}
                        {product.variants.length > 1 && (
                            <div className="product-detail__variants">
                                <p className="suit-14-m">용량 선택</p>
                                <div className="product-detail__variant-list">
                                    {product.variants.map((v, i) => (
                                        <button
                                            key={i}
                                            className={`product-detail__variant-btn suit-14-m ${selectedVariant === i ? 'active' : ''}`}
                                            onClick={() => setSelectedVariant(i)}
                                        >
                                            {v.capacity} · {v.price?.toLocaleString()}원
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 액션 버튼 */}
                        <div className="product-detail__actions">
                            <button className="product-detail__add-btn suit-18-m" onClick={handleAddToCart}>
                                장바구니 담기
                            </button>
                            <button className="product-detail__buy-btn suit-18-m" onClick={handleBuyNow}>
                                바로 구매
                            </button>
                            <button
                                className={`product-detail__wish-btn ${wishlist.includes(product.name) ? 'active' : ''}`}
                                onClick={() => toggleWishlist(product.name)}
                                aria-label="위시리스트"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.includes(product.name) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </button>
                        </div>

                        {/* 혜택 안내 */}
                        <div className="product-detail__benefits suit-14-m">
                            <p>· 공식몰 단독 샘플 증정</p>
                            <p>· 선물 포장 서비스 가능</p>
                            <p>· 5만원 이상 무료배송</p>
                        </div>
                    </div>
                </div>

                {/* 탭 영역 */}
                <div className="product-detail__tabs">
                    <div className="product-detail__tab-list">
                        {TABS.map((tab, i) => (
                            <button
                                key={i}
                                className={`product-detail__tab-btn optima-16 ${activeTab === i ? 'active' : ''}`}
                                onClick={() => setActiveTab(i)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="product-detail__tab-content suit-16-r">
                        {activeTab === 0 && <p>{product.description}</p>}
                        {activeTab === 1 && <p>성분 정보는 제품 패키지를 참고해 주세요.</p>}
                        {activeTab === 2 && <p>이솝은 FSC 인증 종이와 재활용 가능한 소재를 사용합니다.</p>}
                        {activeTab === 3 && <p>5만원 이상 무료배송 · 수령 후 7일 이내 반품 가능</p>}
                        {activeTab === 4 && <p className="product-detail__no-review">아직 리뷰가 없습니다. 첫 번째 리뷰를 작성해보세요.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
