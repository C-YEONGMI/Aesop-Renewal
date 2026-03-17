import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import useOrderStore from '../store/useOrderStore';
import './Checkout.scss';

const Checkout = () => {
    const navigate = useNavigate();
    const cartItems = useCartStore(s => s.cartItems);
    const removeOrderedItems = useCartStore(s => s.removeOrderedItems);
    const user = useAuthStore(s => s.user);
    const createOrder = useOrderStore(s => s.createOrder);

    const checkedItems = cartItems.filter(i => i.checked);
    // store 메서드 호출 대신 직접 계산
    const subtotal = checkedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 50000 ? 0 : 3000;
    const total = subtotal + shipping;

    const [form, setForm] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        address: '',
        addressDetail: '',
        memo: '',
        giftWrap: false,
        giftMessage: '',
        payment: 'card',
    });

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleOrder = e => {
        e.preventDefault();
        if (!form.address) { alert('배송지를 입력해주세요.'); return; }

        const order = createOrder({
            userId: user?.id,
            items: checkedItems,
            shipping: form,
            subtotal,
            shippingFee: shipping,
            total,
        });

        removeOrderedItems(checkedItems.map(i => i.cartId));
        alert(`주문이 완료되었습니다.\n주문번호: ${order.id}`);
        navigate('/mypage/orders');
    };

    return (
        <div className="checkout-page">
            <div className="checkout-page__header-space" />
            <div className="checkout-page__inner">
                <h1 className="optima-40 checkout-page__title">결제</h1>

                <form className="checkout-page__form" onSubmit={handleOrder}>
                    <div className="checkout-page__main">

                        {/* 배송 정보 */}
                        <div className="checkout-page__section">
                            <h2 className="optima-20 checkout-page__section-title">배송 정보</h2>
                            <div className="checkout-page__fields">
                                {[
                                    { label: '받는 분', name: 'name', type: 'text', placeholder: '이름' },
                                    { label: '연락처', name: 'phone', type: 'tel', placeholder: '연락처' },
                                    { label: '주소', name: 'address', type: 'text', placeholder: '주소를 입력하세요' },
                                    { label: '상세 주소', name: 'addressDetail', type: 'text', placeholder: '상세 주소' },
                                    { label: '배송 메모', name: 'memo', type: 'text', placeholder: '배송 시 요청사항' },
                                ].map(f => (
                                    <div key={f.name} className="checkout-page__field">
                                        <label className="suit-14-m">{f.label}</label>
                                        <input
                                            type={f.type}
                                            name={f.name}
                                            value={form[f.name]}
                                            onChange={handleChange}
                                            className="suit-16-r"
                                            placeholder={f.placeholder}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 선물 옵션 */}
                        <div className="checkout-page__section">
                            <h2 className="optima-20 checkout-page__section-title">선물 옵션</h2>
                            <label className="checkout-page__check-label suit-16-r">
                                <input type="checkbox" name="giftWrap" checked={form.giftWrap} onChange={handleChange} />
                                선물 포장 서비스 (무료)
                            </label>
                            {form.giftWrap && (
                                <div className="checkout-page__field">
                                    <label className="suit-14-m">선물 메시지</label>
                                    <textarea
                                        name="giftMessage"
                                        value={form.giftMessage}
                                        onChange={handleChange}
                                        className="suit-16-r"
                                        placeholder="메시지를 입력하세요 (선택)"
                                        rows={3}
                                    />
                                </div>
                            )}
                        </div>

                        {/* 결제 수단 */}
                        <div className="checkout-page__section">
                            <h2 className="optima-20 checkout-page__section-title">결제 수단</h2>
                            <div className="checkout-page__payment-list">
                                {[
                                    { value: 'card', label: '신용/체크카드' },
                                    { value: 'transfer', label: '무통장 입금' },
                                ].map(p => (
                                    <label key={p.value} className="checkout-page__check-label suit-16-r">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={p.value}
                                            checked={form.payment === p.value}
                                            onChange={handleChange}
                                        />
                                        {p.label}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 주문 요약 */}
                    <div className="checkout-page__summary">
                        <h2 className="optima-20">주문 상품</h2>
                        {checkedItems.map(item => (
                            <div key={item.cartId} className="checkout-page__summary-item">
                                <img src={item.image} alt={item.productName} />
                                <div>
                                    <p className="suit-14-m">{item.productName}</p>
                                    <p className="suit-12-r">{item.variant} · {item.quantity}개</p>
                                    <p className="suit-16-r">{(item.price * item.quantity).toLocaleString()}원</p>
                                </div>
                            </div>
                        ))}
                        <div className="checkout-page__summary-totals">
                            <div className="checkout-page__summary-row suit-16-r">
                                <span>상품 합계</span><span>{subtotal.toLocaleString()}원</span>
                            </div>
                            <div className="checkout-page__summary-row suit-16-r">
                                <span>배송비</span><span>{shipping === 0 ? '무료' : `${shipping.toLocaleString()}원`}</span>
                            </div>
                            <div className="checkout-page__summary-total suit-24-sb">
                                <span>최종 결제금액</span><span>{total.toLocaleString()}원</span>
                            </div>
                        </div>
                        <button type="submit" className="checkout-page__submit suit-18-m">
                            {total.toLocaleString()}원 결제하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
