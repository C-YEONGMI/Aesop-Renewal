import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import useProductStore from '../store/useProductStore';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';
import './Products.scss';

// 카테고리 레이블 매핑
const CATEGORY_LABELS = {
    skincare: 'Skin Care',
    fragrance: 'Fragrance',
    home: 'Home & Living',
    hair: 'Hair & Shaving',
    body: 'Hand & Body',
    kits: 'Kits',
};

const SORT_OPTIONS = [
    { value: 'default', label: '추천순' },
    { value: 'best', label: '베스트순' },
    { value: 'new', label: '신제품순' },
    { value: 'price-asc', label: '낮은 가격순' },
    { value: 'price-desc', label: '높은 가격순' },
];

const Products = () => {
    const { category } = useParams();
    const products = useProductStore(s => s.products);
    const wishlist = useWishlistStore(s => s.wishlist);
    const toggleWishlist = useWishlistStore(s => s.toggleWishlist);
    const addToCart = useCartStore(s => s.addToCart);

    const [sort, setSort] = useState('default');
    const [activeBadge, setActiveBadge] = useState('');

    const categoryLabel = CATEGORY_LABELS[category] || '';

    const filtered = useMemo(() => {
        let list = category
            ? products.filter(p =>
                p.category.toLowerCase().replace(/\s/g, '') === categoryLabel.toLowerCase().replace(/\s/g, '')
            )
            : [...products];

        if (activeBadge) {
            list = list.filter(p => p.badge.includes(activeBadge));
        }

        switch (sort) {
            case 'best': return list.filter(p => p.badge.includes('Best'));
            case 'new': return list.filter(p => p.badge.includes('New'));
            case 'price-asc': return [...list].sort((a, b) => a.variants[0]?.price - b.variants[0]?.price);
            case 'price-desc': return [...list].sort((a, b) => b.variants[0]?.price - a.variants[0]?.price);
            default: return list;
        }
    }, [products, category, categoryLabel, sort, activeBadge]);

    return (
        <div className="products-page">
            {/* 헤더 공간 확보 */}
            <div className="products-page__header-space" />

            <div className="products-page__inner">
                {/* 페이지 타이틀 */}
                <div className="products-page__title-area">
                    <nav className="products-page__breadcrumb suit-14-m">
                        <Link to="/">홈</Link>
                        <span> / </span>
                        <span>{categoryLabel || '전체 상품'}</span>
                    </nav>
                    <h1 className="montage-80">{categoryLabel || 'Products'}</h1>
                    <p className="suit-16-r products-page__count">총 {filtered.length}개</p>
                </div>

                {/* 필터 + 정렬 */}
                <div className="products-page__controls">
                    <div className="products-page__badges">
                        {['', 'Best', 'New', 'Exclusive'].map(badge => (
                            <button
                                key={badge}
                                className={`products-page__badge-btn suit-14-m ${activeBadge === badge ? 'active' : ''}`}
                                onClick={() => setActiveBadge(badge)}
                            >
                                {badge || '전체'}
                            </button>
                        ))}
                    </div>
                    <select
                        className="products-page__sort suit-14-m"
                        value={sort}
                        onChange={e => setSort(e.target.value)}
                    >
                        {SORT_OPTIONS.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </div>

                {/* 상품 그리드 */}
                {filtered.length === 0 ? (
                    <div className="products-page__empty suit-18-r">
                        해당하는 상품이 없습니다.
                    </div>
                ) : (
                    <div className="products-page__grid">
                        {filtered.map((product, idx) => (
                            <div key={idx} className="products-page__card">
                                <Link to={`/product/${encodeURIComponent(product.name)}`} className="products-page__card-img-wrap">
                                    <img
                                        src={product.variants[0]?.image}
                                        alt={product.name}
                                        className="products-page__card-img"
                                    />
                                    <div className="products-page__card-hover">
                                        <span className="optima-16">자세히 보기</span>
                                    </div>
                                </Link>

                                <div className="products-page__card-info">
                                    {/* 배지 */}
                                    <div className="products-page__card-badges">
                                        {product.badge.map(b => (
                                            <span key={b} className={`badge badge-${b.toLowerCase()} suit-12-r`}>{b}</span>
                                        ))}
                                    </div>
                                    <p className="products-page__card-category suit-12-r">{product.category}</p>
                                    <p className="products-page__card-name suit-18-m">{product.name}</p>
                                    <p className="products-page__card-desc suit-14-m">{product.description}</p>
                                    <p className="products-page__card-price suit-16-r">
                                        {product.variants[0]?.price?.toLocaleString()}원
                                    </p>

                                    {/* 액션 */}
                                    <div className="products-page__card-actions">
                                        <button
                                            className="products-page__add-btn suit-14-m"
                                            onClick={() => addToCart(product, 0)}
                                        >
                                            장바구니 담기
                                        </button>
                                        <button
                                            className={`products-page__wish-btn ${wishlist.includes(product.name) ? 'active' : ''}`}
                                            onClick={() => toggleWishlist(product.name)}
                                            aria-label="위시리스트"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlist.includes(product.name) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
