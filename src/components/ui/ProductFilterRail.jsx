import React, { useMemo, useState } from 'react';
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
    activeCategories,
    onCategoryToggle,
    badgeOptions,
    activeBadge,
    onBadgeChange,
    priceRangeOptions,
    activePriceRanges,
    onPriceRangeToggle,
    onClearAllFilters,
}) => {
    const selectedItems = useMemo(() => {
        const items = [];

        activeCategories.forEach((slug) => {
            const activeCategoryItem = categories.find((category) => category.slug === slug);

            if (!activeCategoryItem || activeCategoryItem.slug === 'all') {
                return;
            }

            items.push({
                key: `category-${slug}`,
                label: activeCategoryItem.label,
                onRemove: () => onCategoryToggle(slug),
            });
        });

        if (activeBadge) {
            const activeBadgeItem = badgeOptions.find((badge) => badge.value === activeBadge);

            if (activeBadgeItem) {
                items.push({
                    key: `badge-${activeBadgeItem.value}`,
                    label: activeBadgeItem.label,
                    onRemove: () => onBadgeChange(''),
                });
            }
        }

        activePriceRanges.forEach((rangeValue) => {
            const activePriceRangeItem = priceRangeOptions.find((range) => range.value === rangeValue);

            if (!activePriceRangeItem) {
                return;
            }

            items.push({
                key: `price-${rangeValue}`,
                label: activePriceRangeItem.label,
                onRemove: () => onPriceRangeToggle(rangeValue),
            });
        });

        return items;
    }, [
        activeBadge,
        activeCategories,
        activePriceRanges,
        badgeOptions,
        categories,
        onBadgeChange,
        onCategoryToggle,
        onPriceRangeToggle,
        priceRangeOptions,
    ]);

    return (
        <aside className="product-filter-rail">
            <div className="product-filter-rail__sticky">
                <div className="product-filter-rail__panel">
                    <p className="product-filter-rail__eyebrow optima-16">Product Filter</p>

                    <div className="product-filter-rail__selected">
                        {selectedItems.length > 0 ? (
                            <>
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

                                <button
                                    type="button"
                                    className="product-filter-rail__clear-button suit-12-r"
                                    onClick={onClearAllFilters}
                                >
                                    모두 제거
                                </button>
                            </>
                        ) : (
                            <p className="product-filter-rail__selected-empty suit-14-m">선택없음</p>
                        )}
                    </div>

                    <FilterSection title="카테고리">
                        <ul className="product-filter-rail__category-list">
                            {categories
                                .filter((category) => category.slug !== 'all')
                                .map((category) => (
                                    <li key={category.slug}>
                                        <button
                                            type="button"
                                            className={`product-filter-rail__category-chip suit-14-m ${
                                                activeCategories.includes(category.slug) ? 'active' : ''
                                            }`}
                                            onClick={() => onCategoryToggle(category.slug)}
                                            aria-pressed={activeCategories.includes(category.slug)}
                                        >
                                            {category.label}
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    </FilterSection>

                    <FilterSection title="Badge">
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
                                    aria-pressed={activeBadge === badge.value}
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
                                        activePriceRanges.includes(range.value) ? 'active' : ''
                                    }`}
                                    onClick={() => onPriceRangeToggle(range.value)}
                                    aria-pressed={activePriceRanges.includes(range.value)}
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
