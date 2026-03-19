import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import GNB_Logo from '../../../assets/GNB_Logo.svg?react';
import useCartStore from '../../../store/useCartStore';
import useAuthStore from '../../../store/useAuthStore';
import ExpandableSearchBar from '../../ui/ExpandableSearchBar';

const Header = ({ transparent = false }) => {
    const navigate = useNavigate();
    const totalCount = useCartStore((state) =>
        state.cartItems.reduce((sum, item) => sum + item.quantity, 0)
    );
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    const handleLogoClick = (event) => {
        event.preventDefault();
        navigate('/');
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        requestAnimationFrame(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        });
    };

    return (
        <header id="header" className={transparent ? 'transparent' : ''}>
            <div className="inner">
                <nav className="nav">
                    <ul className="depth1">
                        <li>
                            <Link to="/gift-guide">GIFT GUIDE</Link>
                        </li>
                        <li>
                            <Link to="/products">PRODUCTS</Link>
                            <ul className="depth2">
                                <li>
                                    <Link to="/products/skincare">SKIN CARE</Link>
                                </li>
                                <li>
                                    <Link to="/products/fragrance">Perfume</Link>
                                </li>
                                <li>
                                    <Link to="/products/home">HOME · LIVING</Link>
                                </li>
                                <li>
                                    <Link to="/products/hair">HAIR · SHAVING</Link>
                                </li>
                                <li>
                                    <Link to="/products/body">HAND · BODY</Link>
                                </li>
                                <li>
                                    <Link to="/products/kits">KITS</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/benefits">BENEFITS</Link>
                            <ul className="depth2">
                                <li>
                                    <Link to="/benefits/official">Online</Link>
                                </li>
                                <li>
                                    <Link to="/benefits/kr-exclusive">Korea Exclusive</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/our-story">OUR STORY</Link>
                        </li>
                    </ul>
                </nav>

                <h1>
                    <Link to="/" aria-label="Aesop Home" onClick={handleLogoClick}>
                        <GNB_Logo className="logo-svg" data-header-logo aria-label="Aesop" />
                    </Link>
                </h1>

                <ul className="utl">
                    <li className="search-li">
                        <ExpandableSearchBar
                            expandDirection="left"
                            width={300}
                            onSearch={(query) => {
                                if (query.trim()) {
                                    navigate(`/search?q=${encodeURIComponent(query)}`);
                                }
                            }}
                        />
                    </li>
                    <li>
                        <Link
                            to={isLoggedIn ? '/mypage' : '/login'}
                            aria-label={isLoggedIn ? '마이페이지' : '로그인'}
                        >
                            {isLoggedIn ? (
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            ) : (
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                    <polyline points="10 17 15 12 10 7" />
                                    <line x1="15" y1="12" x2="3" y2="12" />
                                </svg>
                            )}
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" aria-label="장바구니">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="8" cy="21" r="1" />
                                <circle cx="19" cy="21" r="1" />
                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                            </svg>
                            <span className="cart-count">{totalCount}</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
