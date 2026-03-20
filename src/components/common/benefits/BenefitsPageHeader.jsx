import React from 'react';
import { Link } from 'react-router-dom';
import './BenefitsPageHeader.scss';

const BENEFITS_TABS = [
    { key: 'official', label: '공식몰 혜택', to: '/benefits/official' },
    { key: 'kr-exclusive', label: '한국 한정 구성', to: '/benefits/kr-exclusive' },
];

const BenefitsPageHeader = ({ activeKey }) => {
    return (
        <div className="benefits-page-header">
            <div className="benefits-page-header__inner">
                <h1 className="montage-80 benefits-page-header__title">Online Services</h1>
                <p className="suit-18-r benefits-page-header__desc">
                    이솝 공식 온라인 몰에서 만날 수 있는 정성스러운 서비스와 배려를
                    살펴보세요.
                </p>

                <nav className="benefits-page-header__nav" aria-label="Benefits navigation">
                    {BENEFITS_TABS.map((tab) => (
                        <Link
                            key={tab.key}
                            to={tab.to}
                            className={`optima-16 ${activeKey === tab.key ? 'active' : ''}`}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default BenefitsPageHeader;
