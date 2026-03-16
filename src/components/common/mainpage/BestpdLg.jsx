import React from 'react';
import Best from '../badge/Best';
import New from '../badge/New';
import Exclusive from '../badge/Exclusive';
import './BestpdLg.scss';

const BestpdLg = ({ product }) => {
    // 상품 객체가 넘어오지 않았을 때 임시 값 (디자인 테스트용)
    const productData = product || {
        name: "제품명 들어가는 공간입니다.",
        badge: ["Best", "New", "Exclusive"], // 기본으로 모두 보여줌
        variants: [{ image: "https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog/default/dwd34d3c3d/images/products/SK67/4936968889721/4936968889721_1.png" }]
    };

    const imageUrl = productData.variants && productData.variants[0] ? productData.variants[0].image : "https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog/default/dwd34d3c3d/images/products/SK67/4936968889721/4936968889721_1.png";

    return (
        <div className="bestpdLg">
            <div className="badges">
                {productData.badge.includes('Best') && <Best />}
                {productData.badge.includes('New') && <New />}
                {productData.badge.includes('Exclusive') && <Exclusive />}
            </div>
            <div className="imgs">
                <img src={imageUrl} alt={productData.name} />
            </div>
            <p>{productData.name}</p>
        </div>
    );
};

export default BestpdLg;
