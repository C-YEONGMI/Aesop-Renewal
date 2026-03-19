import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import './ProductFilterRail.scss';

const FilterSection = ({ title, defaultOpen = false, children }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <section className="product-filter-rail__section">
            <button
                type="button"
                className="product-filter-rail__section-toggle"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span className="optima-16">{title}</span>
                {isOpen ? (
                    <ChevronUp size={16} strokeWidth={1.8} />
                ) : (
                    <ChevronDown size={16} strokeWidth={1.8} />
                )}
            </button>
            {isOpen ? <div className="product-filter-rail__section-body">{children}</div> : null}
        </section>
    );
};

const ProductFilterRail = ({
    categories,
    activeCategory,
    badgeOptions,
    activeBadge,
    onBadgeChange,
    priceRangeOptions,
    activePriceRange,
    onPriceRangeChange,
    onClearCategory,
}) => {
    const selectedItems = useMemo(() => {
        const items = [];
        const activeCategoryItem = categories.find((category) => category.slug === activeCategory);
        const activeBadgeItem = badgeOptions.find((badge) => badge.value === activeBadge);
        const activePriceRangeItem = priceRangeOptions.find((range) => range.value === activePriceRange);

        if (activeCategoryItem && activeCategoryItem.slug !== 'all') {
            items.push({
                key: `category-${activeCategoryItem.slug}`,
                label: activeCategoryItem.label,
                onRemove: onClearCategory,
            });
        }

        if (activeBadgeItem) {
            items.push({
                key: `badge-${activeBadgeItem.value}`,
                label: activeBadgeItem.label,
                onRemove: () => onBadgeChange(''),
            });
        }

        if (activePriceRangeItem) {
            items.push({
                key: `price-${activePriceRangeItem.value}`,
                label: activePriceRangeItem.label,
                onRemove: () => onPriceRangeChange(''),
            });
        }

        return items;
    }, [
        activeBadge,
        activeCategory,
        activePriceRange,
        badgeOptions,
        categories,
        onBadgeChange,
        onClearCategory,
        onPriceRangeChange,
        priceRangeOptions,
    ]);

    return (
        <aside className="product-filter-rail">
            <div className="product-filter-rail__sticky">
                <div className="product-filter-rail__panel">
                    <p className="product-filter-rail__eyebrow optima-16">Product Filter</p>

                    <div className="product-filter-rail__selected">
                        {selectedItems.length > 0 ? (
                            <div className="product-filter-rail__selected-list">
                                {selectedItems.map((item) => (
                                    <button
                                        key={item.key}
                                        type="button"
                                        className="product-filter-rail__selected-chip suit-14-m"
                                        onClick={item.onRemove}
                                    >
                                        <span>{item.label}</span>
                                        <X size={12} strokeWidth={1.8} />
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="product-filter-rail__selected-empty suit-14-m">선택없음</p>
                        )}
                    </div>

                    <FilterSection title="카테고리">
                        <ul className="product-filter-rail__category-list">
                            {categories.map((category) => (
                                <li key={category.slug}>
                                    <Link
                                        to={category.link}
                                        className={`product-filter-rail__category-chip suit-14-m ${
                                            activeCategory === category.slug ? 'active' : ''
                                        }`}
                                    >
                                        {category.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </FilterSection>

                    <FilterSection title="BADGE">
                        <div className="product-filter-rail__option-list">
                            {badgeOptions.map((badge) => (
                                <button
                                    key={badge.value}
                                    type="button"
                                    className={`product-filter-rail__option-chip suit-14-m ${
                                        activeBadge === badge.value ? 'active' : ''
                                    }`}
                                    onClick={() =>
                                        onBadgeChange(activeBadge === badge.value ? '' : badge.value)
                                    }
                                >
                                    {badge.label}
                                </button>
                            ))}
                        </div>
                    </FilterSection>

                    <FilterSection title="가격대">
                        <div className="product-filter-rail__option-list">
                            {priceRangeOptions.map((range) => (
                                <button
                                    key={range.value}
                                    type="button"
                                    className={`product-filter-rail__option-chip suit-14-m ${
                                        activePriceRange === range.value ? 'active' : ''
                                    }`}
                                    onClick={() =>
                                        onPriceRangeChange(
                                            activePriceRange === range.value ? '' : range.value
                                        )
                                    }
                                >
                                    {range.label}
                                </button>
                            ))}
                        </div>
                    </FilterSection>
                </div>
            </div>
        </aside>
    );
};

export default ProductFilterRail;
