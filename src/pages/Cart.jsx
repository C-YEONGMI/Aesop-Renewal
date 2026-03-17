import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import './Cart.scss';

const SHIPPING_FEE = 3000;
const FREE_SHIPPING = 50000;

const Cart = () => {
    const navigate = useNavigate();
    const isLoggedIn = useAuthStore(s => s.isLoggedIn);
    const cartItems = useCartStore(s => s.cartItems);
    const updateQuantity = useCartStore(s => s.updateQuantity);
    const removeItem = useCartStore(s => s.removeItem);
    const toggleCheck = useCartStore(s => s.toggleCheck);
    const toggleAll = useCartStore(s => s.toggleAll);
    const removeChecked = useCartStore(s => s.removeChecked);

    const checkedItems = cartItems.filter(i => i.checked);
    // store 메서드 호출 대신 직접 계산
    const subtotal = checkedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= FREE_SHIPPING ? 0 : (subtotal > 0 ? SHIPPING_FEE : 0);
    const total = subtotal + shipping;

    const allChecked = cartItems.length > 0 && cartItems.every(i => i.checked);

    const handleOrder = () => {
        if (!isLoggedIn) { navigate('/login'); return; }
        if (checkedItems.length === 0) { alert('주문할 상품을 선택해주세요.'); return; }
        navigate('/checkout');
    };

    return (
        <div className="cart-page">
            <div className="cart-page__header-space" />
            <div className="cart-page__inner">
                <h1 className="cart-page__title optima-40">장바구니</h1>

                {cartItems.length === 0 ? (
                    <div className="cart-page__empty">
                        <p className="suit-18-r">장바구니가 비어 있습니다.</p>
                        <Link to="/products" className="cart-page__go-shopping optima-16">
                            쇼핑 계속하기
                        </Link>
                    </div>
                ) : (
                    <div className="cart-page__content">
                        {/* 상품 목록 */}
                        <div className="cart-page__list">
                            {/* 전체 선택 */}
                            <div className="cart-page__select-all suit-14-m">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={allChecked}
                                        onChange={e => toggleAll(e.target.checked)}
                                    />
                                    전체 선택 ({checkedItems.length}/{cartItems.length})
                                </label>
                                <button className="cart-page__delete-selected suit-14-m" onClick={removeChecked}>
                                    선택 삭제
                                </button>
                            </div>

                            {cartItems.map(item => (
                                <div key={item.cartId} className="cart-page__item">
                                    <label className="cart-page__item-check">
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            onChange={() => toggleCheck(item.cartId)}
                                        />
                                    </label>
                                    <div className="cart-page__item-img">
                                        <img src={item.image} alt={item.productName} />
                                    </div>
                                    <div className="cart-page__item-info">
                                        <p className="suit-12-r cart-page__item-cat">{item.category}</p>
                                        <p className="suit-18-m cart-page__item-name">{item.productName}</p>
                                        {item.variant && <p className="suit-14-m cart-page__item-variant">{item.variant}</p>}
                                        <p className="suit-16-r cart-page__item-price">{item.price?.toLocaleString()}원</p>
                                    </div>
                                    <div className="cart-page__item-qty">
                                        <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>−</button>
                                        <span className="suit-16-r">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>+</button>
                                    </div>
                                    <p className="cart-page__item-total suit-18-m">
                                        {(item.price * item.quantity)?.toLocaleString()}원
                                    </p>
                                    <button className="cart-page__item-delete" onClick={() => removeItem(item.cartId)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* 주문 요약 */}
                        <div className="cart-page__summary">
                            <h2 className="optima-20 cart-page__summary-title">주문 요약</h2>
                            <div className="cart-page__summary-row suit-16-r">
                                <span>상품 합계</span>
                                <span>{subtotal.toLocaleString()}원</span>
                            </div>
                            <div className="cart-page__summary-row suit-16-r">
                                <span>배송비</span>
                                <span>{shipping === 0 ? '무료' : `${shipping.toLocaleString()}원`}</span>
                            </div>
                            {subtotal > 0 && subtotal < FREE_SHIPPING && (
                                <p className="cart-page__free-msg suit-12-r">
                                    {(FREE_SHIPPING - subtotal).toLocaleString()}원 더 구매하면 무료배송!
                                </p>
                            )}
                            <div className="cart-page__summary-total suit-24-sb">
                                <span>총 결제금액</span>
                                <span>{total.toLocaleString()}원</span>
                            </div>
                            <button className="cart-page__order-btn suit-18-m" onClick={handleOrder}>
                                주문하기 ({checkedItems.length}개)
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
