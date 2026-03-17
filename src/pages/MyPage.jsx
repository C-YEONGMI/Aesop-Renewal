import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useOrderStore from '../store/useOrderStore';
import useWishlistStore from '../store/useWishlistStore';
import useProductStore from '../store/useProductStore';
import './MyPage.scss';

const TABS = [
    { key: 'orders', label: '주문 내역' },
    { key: 'wishlist', label: '저장한 상품' },
    { key: 'info', label: '회원 정보' },
];

const MyPage = () => {
    const navigate = useNavigate();
    const { tab } = useParams();
    const activeTab = tab || 'orders';

    const user = useAuthStore(s => s.user);
    const isLoggedIn = useAuthStore(s => s.isLoggedIn);
    const logout = useAuthStore(s => s.logout);
    // selector 안에서 filter() 호출 금지 → 매번 새 배열 반환으로 무한루프 발생
    const allOrders = useOrderStore(s => s.orders);
    const orders = allOrders.filter(o => o.userId === user?.id);
    const wishlist = useWishlistStore(s => s.wishlist);
    const products = useProductStore(s => s.products);

    // 렌더 중 navigate 호출 금지 - useEffect로 처리
    useEffect(() => {
        if (!isLoggedIn) navigate('/login');
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) return null;

    const wishlistProducts = products.filter(p => wishlist.includes(p.name));

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="mypage">
            <div className="mypage__header-space" />
            <div className="mypage__inner">
                <div className="mypage__head">
                    <h1 className="optima-40 mypage__title">마이페이지</h1>
                    <p className="suit-16-r mypage__welcome">안녕하세요, {user?.name}님</p>
                </div>

                <div className="mypage__layout">
                    {/* 사이드 탭 */}
                    <nav className="mypage__nav">
                        {TABS.map(t => (
                            <Link
                                key={t.key}
                                to={`/mypage/${t.key}`}
                                className={`mypage__nav-item optima-16 ${activeTab === t.key ? 'active' : ''}`}
                            >
                                {t.label}
                            </Link>
                        ))}
                        <button className="mypage__logout suit-14-m" onClick={handleLogout}>
                            로그아웃
                        </button>
                    </nav>

                    {/* 콘텐츠 */}
                    <div className="mypage__content">
                        {/* 주문 내역 */}
                        {activeTab === 'orders' && (
                            <div className="mypage__section">
                                <h2 className="optima-20 mypage__section-title">주문 내역</h2>
                                {orders.length === 0 ? (
                                    <p className="suit-16-r mypage__empty">주문 내역이 없습니다.</p>
                                ) : (
                                    <div className="mypage__order-list">
                                        {orders.map(order => (
                                            <div key={order.id} className="mypage__order-card">
                                                <div className="mypage__order-header">
                                                    <span className="suit-14-m mypage__order-id">{order.id}</span>
                                                    <span className="suit-12-r mypage__order-date">
                                                        {new Date(order.createdAt).toLocaleDateString('ko-KR')}
                                                    </span>
                                                    <span className="mypage__order-status suit-14-m">{order.status}</span>
                                                </div>
                                                <div className="mypage__order-items">
                                                    {order.items?.map((item, i) => (
                                                        <div key={i} className="mypage__order-item">
                                                            <img src={item.image} alt={item.productName} />
                                                            <div>
                                                                <p className="suit-16-m">{item.productName}</p>
                                                                <p className="suit-14-m">{item.variant} · {item.quantity}개</p>
                                                                <p className="suit-14-m">{(item.price * item.quantity).toLocaleString()}원</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mypage__order-total suit-16-r">
                                                    총 {order.total?.toLocaleString()}원
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 저장한 상품 */}
                        {activeTab === 'wishlist' && (
                            <div className="mypage__section">
                                <h2 className="optima-20 mypage__section-title">저장한 상품</h2>
                                {wishlistProducts.length === 0 ? (
                                    <p className="suit-16-r mypage__empty">저장한 상품이 없습니다.</p>
                                ) : (
                                    <div className="mypage__wish-grid">
                                        {wishlistProducts.map((p, i) => (
                                            <Link key={i} to={`/product/${encodeURIComponent(p.name)}`} className="mypage__wish-card">
                                                <div className="mypage__wish-img">
                                                    <img src={p.variants[0]?.image} alt={p.name} />
                                                </div>
                                                <p className="suit-16-m">{p.name}</p>
                                                <p className="suit-14-m">{p.variants[0]?.price?.toLocaleString()}원</p>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 회원 정보 */}
                        {activeTab === 'info' && (
                            <div className="mypage__section">
                                <h2 className="optima-20 mypage__section-title">회원 정보</h2>
                                <div className="mypage__info-list suit-16-r">
                                    <div className="mypage__info-row">
                                        <span className="mypage__info-label suit-14-m">이름</span>
                                        <span>{user?.name}</span>
                                    </div>
                                    <div className="mypage__info-row">
                                        <span className="mypage__info-label suit-14-m">이메일</span>
                                        <span>{user?.email}</span>
                                    </div>
                                    <div className="mypage__info-row">
                                        <span className="mypage__info-label suit-14-m">연락처</span>
                                        <span>{user?.phone || '미등록'}</span>
                                    </div>
                                    <div className="mypage__info-row">
                                        <span className="mypage__info-label suit-14-m">가입일</span>
                                        <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('ko-KR') : '-'}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
