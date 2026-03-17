import React from 'react';
import './StoreVisualSection.scss';

// Full-Bleed 매장 비주얼 섹션
// 오프라인 매장 경험과 온라인 공식몰 사이의 단절을 줄이는 브릿지 역할
const StoreVisualSection = () => {
    return (
        <section className="store-visual">
            <div className="store-visual__inner">
                {/* 매장 이미지 (임시 gradient 배경 - 실제 매장 사진으로 교체) */}
                <div className="store-visual__image-wrap">
                    <div className="store-visual__image" aria-label="Aesop 매장 전경" />
                </div>
                {/* 우측 브랜드 워드마크 */}
                <div className="store-visual__label">
                    <span className="montage-48">Æsop</span>
                </div>
            </div>
        </section>
    );
};

export default StoreVisualSection;
