import React from 'react';
import products from '../data/products.json';
import './ProductList.css';

// src/types/product.ts (또는 ProductList.tsx 상단)
export interface Product {
    category: string;
    name: string;
    price: string | number;
    image: string;
    description: string;
}

const ProductList: React.FC = () => {
    return (
        <div className="aesop-container">
            <header className="aesop-header">
                <h1>Aesop Collection</h1>
                <p>총 {products.length}개의 제품이 수집되었습니다.</p>
            </header>

            <div className="product-grid">
                {products.map((item, index) => (
                    <div key={index} className="product-card">
                        <div className="image-box">
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className="info-box">
                            <span className="category-tag">{item.category}</span>
                            <h3 className="name">{item.name}</h3>
                            <p className="desc">{item.description}</p>
                            <p className="price">₩{item.price.toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
