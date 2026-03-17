import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Benefits.scss';

const Benefits = ({ sub: propSub }) => {
    const { tab } = useParams();
    const sub = propSub || tab;

    return (
        <div className="benefits-page">
            <div className="benefits-page__header-space" />
            <div className="benefits-page__inner">
                <h1 className="montage-80 benefits-page__title">Benefits</h1>
                <p className="suit-18-r benefits-page__desc">이솝 공식몰만의 특별한 혜택을 만나보세요.</p>

                <div className="benefits-page__nav">
                    <Link to="/benefits/official" className={`optima-16 ${sub === 'official' ? 'active' : ''}`}>
                        공식몰 혜택
                    </Link>
                    <Link to="/benefits/kr-exclusive" className={`optima-16 ${sub === 'kr-exclusive' ? 'active' : ''}`}>
                        한국 단독 구성
                    </Link>
                </div>

                <div className="benefits-page__content">
                    {sub === 'official' && (
                        <div className="benefits-page__section">
                            <h2 className="optima-40">공식몰 단독 혜택</h2>
                            <ul className="suit-18-r benefits-page__list">
                                <li>· 공식몰 전용 샘플 증정</li>
                                <li>· 선물 포장 및 쇼핑백 서비스</li>
                                <li>· 5만원 이상 무료배송</li>
                                <li>· 온라인 전용 세트 구성</li>
                                <li>· 신제품 사전 알림</li>
                            </ul>
                        </div>
                    )}
                    {sub === 'kr-exclusive' && (
                        <div className="benefits-page__section">
                            <h2 className="optima-40">한국 단독 구성</h2>
                            <p className="suit-18-r">
                                한국 시장을 위해 특별히 기획된 이솝의 한정 에디션입니다.<br />
                                지역성과 브랜드 철학이 어우러진 특별한 구성을 만나보세요.
                            </p>
                        </div>
                    )}
                    {!sub && (
                        <div className="benefits-page__section">
                            <p className="suit-18-r">좌측 메뉴에서 혜택 항목을 선택해주세요.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Benefits;
