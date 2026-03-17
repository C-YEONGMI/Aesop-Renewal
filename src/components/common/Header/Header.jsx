import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import GNB_Logo from "../../../assets/GNB_Logo.svg?react";
import useCartStore from '../../../store/useCartStore';
import useAuthStore from '../../../store/useAuthStore';

// transparent prop: 홈 Hero 구간에서만 true (흰색 텍스트 오버레이)
const Header = ({ transparent = false }) => {
    // selector 안에서 함수 호출 금지 - 직접 계산
    const totalCount = useCartStore(state =>
        state.cartItems.reduce((sum, item) => sum + item.quantity, 0)
    );
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);

    return (
        <header id="header" className={transparent ? 'transparent' : ''}>
            <div className="inner">
                {/* 좌측 글로벌 내비게이션 */}
                <nav className="nav">
                    <ul className="depth1">
                        <li><Link to="/gift-guide">GIFT GUIDE</Link></li>
                        <li>
                            <Link to="/products">PRODUCTS</Link>
                            <ul className="depth2">
                                <li><Link to="/products/skincare">SKIN CARE</Link></li>
                                <li><Link to="/products/fragrance">FRAGRANCE</Link></li>
                                <li><Link to="/products/home">HOME & LIVING</Link></li>
                                <li><Link to="/products/hair">HAIR & SHAVING</Link></li>
                                <li><Link to="/products/body">HAND & BODY</Link></li>
                                <li><Link to="/products/kits">KITS</Link></li>
                            </ul>
                        </li>
                        <li><Link to="/benefits">BENEFITS</Link></li>
                        <li><Link to="/our-story">OUR STORY</Link></li>
                    </ul>
                </nav>

                {/* 중앙 로고 */}
                <h1>
                    <Link to="/" aria-label="Aesop 홈">
                        <GNB_Logo className="logo-svg" aria-label="Aesop" />
                    </Link>
                </h1>

                {/* 우측 유틸리티 메뉴 */}
                <ul className="utl">
                    <li>
                        <Link to="/search" aria-label="검색">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </Link>
                    </li>
                    <li>
                        {/* 로그인 상태에 따라 마이페이지 or 로그인 페이지로 이동 */}
                        <Link to={isLoggedIn ? '/mypage' : '/login'} aria-label={isLoggedIn ? '마이페이지' : '로그인'}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" aria-label="장바구니">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="8" cy="21" r="1" />
                                <circle cx="19" cy="21" r="1" />
                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                            </svg>
                            {totalCount > 0 && <span className="cart-count">{totalCount}</span>}
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
