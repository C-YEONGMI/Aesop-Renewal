import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import AddToCartButton from '../components/common/btn/AddToCartButton';
import Best from '../components/common/badge/Best';
import New from '../components/common/badge/New';
import Exclusive from '../components/common/badge/Exclusive';
import ProductFilterRail from '../components/ui/ProductFilterRail';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/Select';
import useProductStore from '../store/useProductStore';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';
import { PRODUCT_CATEGORY_CONFIG, getCategorySlugFromValue } from '../data/productCategories';
import { getClassification } from '../components/gnb/menuData';
import './Products.scss';

const SORT_OPTIONS = [
    { value: 'default', label: '추천순' },
    { value: 'best', label: '베스트순' },
    { value: 'new', label: '최신순' },
    { value: 'price-asc', label: '낮은 가격순' },
    { value: 'price-desc', label: '높은 가격순' },
];

const PRICE_RANGE_OPTIONS = [
    { value: 'under-50000', label: '5만원 이하', min: 0, max: 50000 },
    { value: '50000-100000', label: '5~10만원', min: 50000, max: 100000 },
    { value: '100000-200000', label: '10~20만원', min: 100000, max: 200000 },
    { value: '200000-plus', label: '20만원 이상', min: 200000, max: Number.POSITIVE_INFINITY },
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
    const { category, subcategory } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const products = useProductStore((state) => state.products);
    const wishlist = useWishlistStore((state) => state.wishlist);
    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
    const addToCart = useCartStore((state) => state.addToCart);

    const [sort, setSort] = useState('default');
    const [activeCategories, setActiveCategories] = useState(() => (category ? [category] : []));
    const [activePriceRanges, setActivePriceRanges] = useState([]);
    const skipRouteCategorySyncRef = useRef(false);

    const categoryConfig = category ? PRODUCT_CATEGORY_CONFIG[category] : null;
    const routeCategorySlug = categoryConfig?.slug || '';

    useEffect(() => {
        if (skipRouteCategorySyncRef.current) {
            skipRouteCategorySyncRef.current = false;
            return;
        }

        setActiveCategories(routeCategorySlug ? [routeCategorySlug] : []);
    }, [routeCategorySlug]);

    // subcategory(3depth) 필터링은 classifications 필드를 사용
    const classificationMatch = subcategory && category
        ? getClassification(category, subcategory)
        : null;

    const subcategoryFilteredProducts = useMemo(() => {
        if (!classificationMatch) return null;

        return products.filter((product) =>
            product.classifications?.some(
                (c) =>
                    c.category === classificationMatch.category &&
                    c.subcategory === classificationMatch.subcategory
            )
        );
    }, [classificationMatch, products]);

    const categoryFilteredProducts = useMemo(() => {
        // 3depth subcategory가 있으면 그 결과를 사용
        if (subcategoryFilteredProducts) return subcategoryFilteredProducts;

        if (activeCategories.length === 0) {
            return [...products];
        }

        return products.filter((product) =>
            activeCategories.includes(getCategorySlugFromValue(product.category))
        );
    }, [activeCategories, products, subcategoryFilteredProducts]);

    const categoryOptions = useMemo(
        () => [
            {
                slug: 'all',
                label: 'ALL PRODUCTS',
                count: products.length,
            },
            ...Object.values(PRODUCT_CATEGORY_CONFIG).map((item) => ({
                slug: item.slug,
                label: item.label,
                count: products.filter(
                    (product) => getCategorySlugFromValue(product.category) === item.slug
                ).length,
            })),
        ],
        [products]
    );

    const activeCategoryLabels = useMemo(
        () =>
            activeCategories
                .map((slug) => PRODUCT_CATEGORY_CONFIG[slug]?.label)
                .filter(Boolean),
        [activeCategories]
    );

    const pageTitle = classificationMatch
        ? classificationMatch.subcategory
        : activeCategoryLabels.length === 1
            ? activeCategoryLabels[0]
            : 'Products';

    const breadcrumbLabel = classificationMatch
        ? classificationMatch.subcategory
        : activeCategoryLabels.length === 1
            ? activeCategoryLabels[0]
            : '전체 제품';

    const filtered = useMemo(() => {
        let list = [...categoryFilteredProducts];

        if (activePriceRanges.length > 0) {
            list = list.filter((product) => {
                const price = product.variants[0]?.price || 0;

                return activePriceRanges.some((rangeValue) => {
                    const selectedRange = PRICE_RANGE_OPTIONS.find(
                        (range) => range.value === rangeValue
                    );

                    if (!selectedRange) {
                        return false;
                    }

                    const isAboveMin = price >= selectedRange.min;
                    const isBelowMax =
                        selectedRange.max === Number.POSITIVE_INFINITY
                            ? true
                            : price <= selectedRange.max;

                    return isAboveMin && isBelowMax;
                });
            });
        }

        switch (sort) {
            case 'best':
                return [...list].sort((a, b) => a.popularId - b.popularId);
            case 'new':
                return [...list].sort((a, b) => a.newestId - b.newestId);
            case 'price-asc':
                return [...list].sort((a, b) => a.variants[0]?.price - b.variants[0]?.price);
            case 'price-desc':
                return [...list].sort((a, b) => b.variants[0]?.price - a.variants[0]?.price);
            default:
                return list;
        }
    }, [activePriceRanges, categoryFilteredProducts, sort]);

    const syncRouteForCategories = (nextCategories) => {
        const nextPath =
            nextCategories.length === 1 ? `/products/${nextCategories[0]}` : '/products';

        if (location.pathname === nextPath) {
            return;
        }

        skipRouteCategorySyncRef.current = true;
        navigate(nextPath, {
            state: { preserveScroll: true },
        });
    };

    const handleCategoryToggle = (categorySlug) => {
        const nextCategories = activeCategories.includes(categorySlug)
            ? activeCategories.filter((slug) => slug !== categorySlug)
            : [...activeCategories, categorySlug];

        setActiveCategories(nextCategories);
        syncRouteForCategories(nextCategories);
    };

    const handlePriceRangeToggle = (rangeValue) => {
        setActivePriceRanges((current) =>
            current.includes(rangeValue)
                ? current.filter((value) => value !== rangeValue)
                : [...current, rangeValue]
        );
    };

    const handleClearAllFilters = () => {
        setActiveCategories([]);
        setActivePriceRanges([]);
        syncRouteForCategories([]);
    };

    return (
        <div className="products-page">
            <div className="products-page__header-space" />

            <div className="products-page__shell">
                <div className="products-page__inner">
                    <div className="products-page__title-area">
                        <nav className="products-page__breadcrumb suit-14-m">
                            <Link to="/">Home</Link>
                            <span> / </span>
                            {classificationMatch && category ? (
                                <>
                                    <Link to={`/products/${category}`}>
                                        {PRODUCT_CATEGORY_CONFIG[category]?.label || category}
                                    </Link>
                                    <span> / </span>
                                    <span>{breadcrumbLabel}</span>
                                </>
                            ) : (
                                <span>{breadcrumbLabel}</span>
                            )}
                        </nav>
                        <h1 className="montage-80">{pageTitle}</h1>
                    </div>

                    <div className="products-page__body">
                        <div className="products-page__rail">
                            <ProductFilterRail
                                categories={categoryOptions}
                                activeCategories={activeCategories}
                                onCategoryToggle={handleCategoryToggle}
                                priceRangeOptions={PRICE_RANGE_OPTIONS}
                                activePriceRanges={activePriceRanges}
                                onPriceRangeToggle={handlePriceRangeToggle}
                                onClearAllFilters={handleClearAllFilters}
                            />
                        </div>

                        <div className="products-page__content">
                            <div className="products-page__toolbar">
                                <div className="products-page__toolbar-copy">
                                    <p className="suit-16-r products-page__count">
                                        총 {filtered.length}개
                                    </p>
                                </div>

                                <Select
                                    value={sort}
                                    onValueChange={setSort}
                                >
                                    <SelectTrigger className="products-page__sort-trigger suit-14-m">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="products-page__sort-content">
                                        {SORT_OPTIONS.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {filtered.length === 0 ? (
                                <div className="products-page__empty suit-18-r">
                                    해당하는 상품이 없습니다.
                                </div>
                            ) : (
                                <div className="products-page__grid-stage">
                                    <div className="products-page__grid">
                                        {filtered.map((product) => {
                                            const isWishlisted = wishlist.includes(product.name);

                                            return (
                                                <div key={product.name} className="products-page__card">
                                                    <div className="products-page__card-img-wrap">
                                                        <div className="products-page__card-overlay">
                                                            <div className="products-page__card-badges">
                                                                {product.badge.map((badge) =>
                                                                    renderBadge(badge)
                                                                )}
                                                            </div>

                                                            <button
                                                                type="button"
                                                                className={`products-page__wish-btn ${
                                                                    isWishlisted ? 'active' : ''
                                                                }`}
                                                                onClick={() =>
                                                                    toggleWishlist(product.name)
                                                                }
                                                                aria-label="위시리스트 추가"
                                                            >
                                                                <svg
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill={
                                                                        isWishlisted
                                                                            ? 'currentColor'
                                                                            : 'none'
                                                                    }
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
                                                        <div className="products-page__card-copy">
                                                            <div className="products-page__card-copy-inner">
                                                                <p className="products-page__card-category suit-12-r">
                                                                    {categoryConfig?.label || product.category}
                                                                </p>
                                                                <p className="products-page__card-name suit-18-m">
                                                                    {product.name}
                                                                </p>
                                                                <p className="products-page__card-desc suit-14-m">
                                                                    {product.description}
                                                                </p>
                                                                <p className="products-page__card-price suit-16-r">
                                                                    {product.variants[0]?.price?.toLocaleString()}원
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="products-page__card-actions">
                                                            <div className="products-page__card-actions-inner">
                                                                <AddToCartButton
                                                                    className="products-page__add-btn"
                                                                    text="장바구니 담기"
                                                                    width="100%"
                                                                    onClick={() => addToCart(product, 0)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
