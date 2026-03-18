import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddToCartButton from '../components/common/btn/AddToCartButton';
import Best from '../components/common/badge/Best';
import New from '../components/common/badge/New';
import Exclusive from '../components/common/badge/Exclusive';
import useProductStore from '../store/useProductStore';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';
import './Products.scss';

const CATEGORY_LABELS = {
    skincare: 'Skin Care',
    fragrance: 'Perfume',
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

const renderBadge = (badge) => {
    switch (badge) {
        case 'Best':
            return <Best key={badge} />;
        case 'New':
            return <New key={badge} />;
        case 'Exclusive':
            return <Exclusive key={badge} />;
        default:
            return (
                <span key={badge} className="badge">
                    {badge}
                </span>
            );
    }
};

const Products = () => {
    const { category } = useParams();
    const products = useProductStore((state) => state.products);
    const wishlist = useWishlistStore((state) => state.wishlist);
    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
    const addToCart = useCartStore((state) => state.addToCart);

    const [sort, setSort] = useState('default');
    const [activeBadge, setActiveBadge] = useState('');

    const categoryLabel = CATEGORY_LABELS[category] || '';

    const filtered = useMemo(() => {
        let list = category
            ? products.filter((product) => {
                const targetCategory = category === 'fragrance' ? 'fragrance' : categoryLabel;

                return (
                    product.category.toLowerCase().replace(/\s/g, '') ===
                    targetCategory.toLowerCase().replace(/\s/g, '')
                );
            })
            : [...products];

        if (activeBadge) {
            list = list.filter((product) => product.badge.includes(activeBadge));
        }

        switch (sort) {
            case 'best':
                return list.filter((product) => product.badge.includes('Best'));
            case 'new':
                return list.filter((product) => product.badge.includes('New'));
            case 'price-asc':
                return [...list].sort((a, b) => a.variants[0]?.price - b.variants[0]?.price);
            case 'price-desc':
                return [...list].sort((a, b) => b.variants[0]?.price - a.variants[0]?.price);
            default:
                return list;
        }
    }, [products, category, categoryLabel, sort, activeBadge]);

    return (
        <div className="products-page">
            <div className="products-page__header-space" />

            <div className="products-page__inner">
                <div className="products-page__title-area">
                    <nav className="products-page__breadcrumb suit-14-m">
                        <Link to="/">홈</Link>
                        <span> / </span>
                        <span>{categoryLabel || '전체 상품'}</span>
                    </nav>
                    <h1 className="montage-80">{categoryLabel || 'Products'}</h1>
                    <p className="suit-16-r products-page__count">총 {filtered.length}개</p>
                </div>

                <div className="products-page__controls">
                    <div className="products-page__badges">
                        {['', 'Best', 'New', 'Exclusive'].map((badge) => (
                            <button
                                key={badge}
                                className={`products-page__badge-btn suit-14-m ${activeBadge === badge ? 'active' : ''}`}
                                onClick={() => setActiveBadge(badge)}
                                type="button"
                            >
                                {badge || '전체'}
                            </button>
                        ))}
                    </div>
                    <select
                        className="products-page__sort suit-14-m"
                        value={sort}
                        onChange={(event) => setSort(event.target.value)}
                    >
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {filtered.length === 0 ? (
                    <div className="products-page__empty suit-18-r">
                        해당하는 상품이 없습니다.
                    </div>
                ) : (
                    <div className="products-page__grid">
                        {filtered.map((product) => {
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
                                                onClick={() => toggleWishlist(product.name)}
                                                aria-label="찜하기"
                                            >
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill={isWishlisted ? 'currentColor' : 'none'}
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                >
                                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                                </svg>
                                            </button>
                                        </div>

                                        <Link
                                            to={`/product/${encodeURIComponent(product.name)}`}
                                            className="products-page__card-img-link"
                                        >
                                            <img
                                                src={product.variants[0]?.image}
                                                alt={product.name}
                                                className="products-page__card-img"
                                            />
                                        </Link>
                                    </div>

                                    <div className="products-page__card-info">
                                        <p className="products-page__card-category suit-12-r">
                                            {product.category === 'Fragrance' ? 'Perfume' : product.category}
                                        </p>
                                        <p className="products-page__card-name suit-18-m">{product.name}</p>
                                        <p className="products-page__card-desc suit-14-m">{product.description}</p>
                                        <p className="products-page__card-price suit-16-r">
                                            {product.variants[0]?.price?.toLocaleString()}원
                                        </p>

                                        <div className="products-page__card-actions">
                                            <AddToCartButton
                                                className="products-page__add-btn"
                                                text="장바구니 담기"
                                                width="100%"
                                                onClick={() => addToCart(product, 0)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
