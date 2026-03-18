import React from 'react';
import Best from '../badge/Best';
import New from '../badge/New';
import Exclusive from '../badge/Exclusive';
import AddToCartButton from '../btn/AddToCartButton';
import useCartStore from '../../../store/useCartStore';
import './BestpdLg.scss';

const FALLBACK_IMAGE = 'https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog/default/dwd34d3c3d/images/products/SK67/4936968889721/4936968889721_1.png';
const DEFAULT_NAME = '\uC81C\uD488\uBA85 \uB4E4\uC5B4\uAC00\uB294 \uACF5\uAC04\uC785\uB2C8\uB2E4';
const ADD_TO_CART_LABEL = '\uC7A5\uBC14\uAD6C\uB2C8 \uB2F4\uAE30';

const BestpdLg = ({ product }) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const productData = product || {
        name: DEFAULT_NAME,
        badge: ['Best', 'New', 'Exclusive'],
        variants: [{ image: FALLBACK_IMAGE }],
    };

    const primaryVariant = productData.variants && productData.variants[0] ? productData.variants[0] : null;
    const imageUrl = primaryVariant ? primaryVariant.image : FALLBACK_IMAGE;
    const formattedPrice =
        primaryVariant && typeof primaryVariant.price === 'number'
            ? `${primaryVariant.price.toLocaleString('ko-KR')}\uC6D0`
            : '';

    const handleAddToCart = (event) => {
        event.stopPropagation();

        if (!product) {
            return;
        }

        addToCart(product, 0);
    };

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
            <div className="info">
                <p className="product-name">{productData.name}</p>
                <p className="product-price">{formattedPrice}</p>
            </div>
            <AddToCartButton
                className="cart-cta"
                text={ADD_TO_CART_LABEL}
                width="100%"
                disabled={!product}
                onClick={handleAddToCart}
            />
        </div>
    );
};

export default BestpdLg;
