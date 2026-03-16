import React from 'react';
import './Header.scss';
import GNB_Logo from "../../../assets/GNB_Logo.svg?react";

const Header = () => {
    return (
        <header id="header">
            <div className="inner">
                {/* Global Navigation Bar */}
                <nav className="nav">
                    <ul className="depth1">
                        <li><a href="/gift-guide">GIFT GUIDE</a></li>
                        <li>
                            <a href="/products">PRODUCTS</a>
                            <ul className="depth2">
                                <li><a href="/products/skincare">SKIN CARE</a></li>
                                <li><a href="/products/fragrance">FRAGRANCE</a></li>
                                <li><a href="/products/home">HOME & LIVING</a></li>
                                <li><a href="/products/hair">HAIR & SHAVING</a></li>
                                <li><a href="/products/body">HAND & BODY</a></li>
                                <li><a href="/products/kits">KITS</a></li>
                            </ul>
                        </li>


                        <li><a href="/benefits">BENEFITS</a></li>
                        <li><a href="/our-story">OUR STORY</a></li>
                    </ul>
                </nav>

                {/* Logo */}
                <h1>
                    <a href="/" aria-label="Aesop Home">
                        <GNB_Logo className="logo-svg" aria-label="Aesop" />
                    </a>
                </h1>

                {/* Utility Menu */}
                <ul className="utl">
                    <li>
                        <a href="/search" aria-label="Search">
                            {/* Search Icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </a>
                    </li>
                    <li>
                        <a href="/login" aria-label="Login">
                            {/* User Icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        </a>
                    </li>
                    <li>
                        <a href="/cart" aria-label="Cart">
                            {/* Cart Icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                            <span className="cart-count">0</span>
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
