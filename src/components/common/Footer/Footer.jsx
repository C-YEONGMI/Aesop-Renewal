import React from 'react';
import './Footer.scss';
import Bt_Logo from '../../../assets/Bt_Logo.svg?react';
import Bt_instargram from '../../../assets/Bt_instargram.svg?react';
import Bt_linkedin from '../../../assets/Bt_linkedin.svg?react';
import Bt_twitter_x from '../../../assets/Bt_twitter-x.svg?react';
import Bt_kakaotalk from '../../../assets/Bt_kakaotalk.svg?react';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="inner">
                {/* 상단: 슬로건 및 링크 영역 */}
                <div className="footer-top">
                    <div className="slogan">
                        <span>
                            Scented,<br />
                            special in<br />
                            <span className="point-text">everyday</span> life
                        </span>
                    </div>

                    <div className="links-group">
                        <div className="bttext">
                            <span className="title">Orders & Support</span>
                            <span className="text"><a href="#">Contact Us</a></span>
                            <span className="text"><a href="#">FAQ</a></span>
                            <span className="text"><a href="#">Shipping</a></span>
                            <span className="text"><a href="#">Returns</a></span>
                            <span className="text"><a href="#">Terms & Conditions</a></span>
                        </div>
                        <div className="bttext">
                            <span className="title">Services</span>
                            <span className="text"><a href="#">Aesop Foundation</a></span>
                            <span className="text"><a href="#">Careers</a></span>
                            <span className="text"><a href="#">Privacy Policy</a></span>
                            <span className="text"><a href="#">Product Authenticity</a></span>
                            <span className="text"><a href="#">Cookie Policy</a></span>
                        </div>
                    </div>
                </div>

                {/* 중단: 대형 로고 */}
                <div className="btlogo">
                    <span>
                        <Bt_Logo width="100%" height="auto" fill="currentColor" aria-label="Aesop" />
                    </span>
                </div>

                {/* 하단: 비즈니스 정보 및 SNS 링링크 */}
                <div className="footer-bottom">
                    <div className="bttext info-text">
                        <span className="copy">© Aesop</span>
                        <span className="text">Business Registration No. 220-81-73483</span>
                        <span className="text">E-commerce Registration No. 2012-Seoul Gangnam-01663</span>
                        <span className="text">L'Oréal Korea LLC | Representative: REBELO PIZARRO RODRIGO ALVARO</span>
                    </div>

                    <div className="footer-bottom-right">
                        <div className="sns">
                            <a href="#" aria-label="Instagram">
                                <Bt_instargram width="30" height="30" />
                            </a>
                            <a href="#" aria-label="X (Twitter)">
                                <Bt_twitter_x width="30" height="30" />
                            </a>
                            <a href="#" aria-label="LinkedIn">
                                <Bt_linkedin width="30" height="30" />
                            </a>
                            <a href="#" aria-label="KakaoTalk">
                                <Bt_kakaotalk width="30" height="30" />
                            </a>
                        </div>
                        <div className="btservice">
                            <span className="text"><a href="#">Terms of Use</a></span>
                            <span className="text"><a href="#">Sitemap</a></span>
                            <span className="text"><a href="#">Privacy Policy</a></span>
                            <span className="text"><a href="#">Cookie Settings</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
