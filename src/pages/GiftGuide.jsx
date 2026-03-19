import React from 'react';
import { Link } from 'react-router-dom';
import useProductStore from '../store/useProductStore';
import useCartStore from '../store/useCartStore';
import { getCategorySlugFromValue } from '../data/productCategories';
import './GiftGuide.scss';

const GiftGuide = ({ sub }) => {
    const products = useProductStore(s => s.products);
    const addToCart = useCartStore(s => s.addToCart);

    const giftProducts = sub === 'fragrance'
        ? products.filter((product) => getCategorySlugFromValue(product.category) === 'fragrance')
        : products.filter(p => p.badge.includes('Best') || p.badge.includes('New'));

    return (
        <div className="gift-guide-page">
            <div className="gift-guide-page__header-space" />
            <div className="gift-guide-page__inner">
                <div className="gift-guide-page__hero">
                    <span className="gift-guide-page__label suit-14-m">선물 가이드</span>
                    <h1 className="montage-100">Gift Guide</h1>
                    <p className="suit-18-r">소중한 사람을 위한 이솝의 선물 큐레이션</p>
                </div>

                <div className="gift-guide-page__sub-nav">
                    <Link to="/gift-guide" className={`suit-16-r ${!sub ? 'active' : ''}`}>전체</Link>
                    <Link to="/gift-guide/fragrance" className={`suit-16-r ${sub === 'fragrance' ? 'active' : ''}`}>향수 선물</Link>
                    <Link to="/gift-guide/general" className={`suit-16-r ${sub === 'general' ? 'active' : ''}`}>일반 선물</Link>
                </div>

                <div className="gift-guide-page__grid">
                    {giftProducts.map((p, i) => (
                        <div key={i} className="gift-guide-page__card">
                            <Link to={`/product/${encodeURIComponent(p.name)}`} className="gift-guide-page__card-img">
                                <img src={p.variants[0]?.image} alt={p.name} />
                            </Link>
                            <p className="suit-12-r">{p.category}</p>
                            <p className="suit-18-m">{p.name}</p>
                            <p className="suit-14-m">{p.variants[0]?.price?.toLocaleString()}원</p>
                            <button className="gift-guide-page__add suit-14-m" onClick={() => addToCart(p, 0)}>
                                장바구니 담기
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GiftGuide;
