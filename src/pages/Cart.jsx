import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useCartStore from '../store/useCartStore';
import './Cart.scss';

const SHIPPING_FEE = 3000;
const FREE_SHIPPING = 50000;

const formatPrice = (value) => `${value.toLocaleString('ko-KR')}원`;

const getEstimatedArrivalLabel = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);

    return `지금 주문하면 ${date.getMonth() + 1}/${date.getDate()} 이내 도착 예정`;
};

const CartCheckbox = ({
    checked,
    onClick,
    children,
    className = '',
    ariaLabel,
}) => (
    <button
        type="button"
        className={`cart-page__checkbox ${checked ? 'is-checked' : ''} ${className}`.trim()}
        onClick={onClick}
        aria-pressed={checked}
        aria-label={ariaLabel}
    >
        <span className="cart-page__checkbox-box" aria-hidden="true">
            <svg viewBox="0 0 12 12">
                <path
                    d="M1.5 6L4.5 9L10.5 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
        {children ? <span className="cart-page__checkbox-label">{children}</span> : null}
    </button>
);

const Cart = () => {
    const navigate = useNavigate();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const cartItems = useCartStore((state) => state.cartItems);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeItem = useCartStore((state) => state.removeItem);
    const toggleCheck = useCartStore((state) => state.toggleCheck);
    const toggleAll = useCartStore((state) => state.toggleAll);
    const removeChecked = useCartStore((state) => state.removeChecked);

    const checkedItems = cartItems.filter((item) => item.checked);
    const subtotal = checkedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= FREE_SHIPPING ? 0 : (subtotal > 0 ? SHIPPING_FEE : 0);
    const total = subtotal + shipping;
    const allChecked = cartItems.length > 0 && cartItems.every((item) => item.checked);
    const estimatedArrivalLabel = getEstimatedArrivalLabel();

    const handleOrder = () => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        if (checkedItems.length === 0) {
            alert('주문할 상품을 선택해주세요.');
            return;
        }

        navigate('/checkout');
    };

    const handleDirectOrder = (cartId) => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        toggleAll(false);
        toggleCheck(cartId);
        navigate('/checkout');
    };

    return (
        <div className="cart-page">
            <div className="cart-page__header-space" />

            <div className="cart-page__inner">
                <h1 className="cart-page__title" id="cart-page-title">장바구니</h1>

                {cartItems.length === 0 ? (
                    <section className="cart-page__empty" aria-labelledby="cart-page-title">
                        <p className="cart-page__empty-copy">장바구니에 담긴 상품이 없습니다.</p>
                        <Link to="/products" className="cart-page__empty-link">
                            제품 보러가기
                        </Link>
                    </section>
                ) : (
                    <div className="cart-page__content">
                        <section className="cart-page__table" aria-labelledby="cart-page-title">
                            <div className="cart-page__toolbar">
                                <CartCheckbox
                                    checked={allChecked}
                                    onClick={() => toggleAll(!allChecked)}
                                    ariaLabel="전체 선택"
                                >
                                    전체 선택
                                </CartCheckbox>

                                <button
                                    type="button"
                                    className="cart-page__delete-selected"
                                    onClick={removeChecked}
                                    disabled={checkedItems.length === 0}
                                >
                                    선택 삭제
                                </button>
                            </div>

                            <div className="cart-page__columns" aria-hidden="true">
                                <span />
                                <span>상품 정보</span>
                                <span>수량</span>
                                <span>판매 금액</span>
                                <span />
                            </div>

                            <div className="cart-page__items">
                                {cartItems.map((item) => (
                                    <article className="cart-page__item" key={item.cartId}>
                                        <div className="cart-page__item-check-cell">
                                            <CartCheckbox
                                                checked={item.checked}
                                                onClick={() => toggleCheck(item.cartId)}
                                                className="cart-page__checkbox--row"
                                                ariaLabel={`${item.productName} 선택`}
                                            />
                                        </div>

                                        <div className="cart-page__item-main">
                                            <div className="cart-page__item-image">
                                                <img src={item.image} alt={item.productName} loading="lazy" />
                                            </div>

                                            <div className="cart-page__item-copy">
                                                <p className="cart-page__item-name">{item.productName}</p>
                                                {item.variant ? (
                                                    <p className="cart-page__item-meta">옵션 ({item.variant})</p>
                                                ) : null}
                                                {item.category ? (
                                                    <p className="cart-page__item-meta">{item.category}</p>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="cart-page__item-quantity-cell">
                                            <div className="cart-page__quantity-box">
                                                <button
                                                    type="button"
                                                    className="cart-page__quantity-btn"
                                                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                                    aria-label={`${item.productName} 수량 줄이기`}
                                                >
                                                    −
                                                </button>
                                                <span className="cart-page__quantity-value">{item.quantity}</span>
                                                <button
                                                    type="button"
                                                    className="cart-page__quantity-btn"
                                                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                                    aria-label={`${item.productName} 수량 늘리기`}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <p className="cart-page__item-total">
                                            {formatPrice(item.price * item.quantity)}
                                        </p>

                                        <div className="cart-page__item-actions">
                                            <button
                                                type="button"
                                                className="cart-page__buy-now"
                                                onClick={() => handleDirectOrder(item.cartId)}
                                            >
                                                바로 구매
                                            </button>
                                            <button
                                                type="button"
                                                className="cart-page__delete-item"
                                                onClick={() => removeItem(item.cartId)}
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <aside className="cart-page__aside">
                            <div className="cart-page__summary">
                                <h2 className="cart-page__summary-title">주문정보</h2>

                                <div className="cart-page__summary-body">
                                    <div className="cart-page__summary-row">
                                        <span className="cart-page__summary-label">주문 금액</span>
                                        <span className="cart-page__summary-value">{formatPrice(subtotal)}</span>
                                    </div>

                                    <div className="cart-page__summary-row">
                                        <span className="cart-page__summary-label">배송비</span>
                                        <span className="cart-page__summary-value">{formatPrice(shipping)}</span>
                                    </div>

                                    <div className="cart-page__summary-divider" />

                                    <div className="cart-page__summary-total">
                                        <span>총 결제 금액</span>
                                        <strong>{formatPrice(total)}</strong>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="cart-page__checkout"
                                    onClick={handleOrder}
                                >
                                    결제하기
                                </button>
                            </div>

                            <p className="cart-page__delivery-note">{estimatedArrivalLabel}</p>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
