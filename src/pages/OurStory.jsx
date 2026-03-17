import React from 'react';
import './OurStory.scss';

const OurStory = () => {
    return (
        <div className="our-story-page">
            <div className="our-story-page__header-space" />

            <div className="our-story-page__hero">
                <div className="our-story-page__hero-bg" />
                <div className="our-story-page__hero-content">
                    <h1 className="montage-100">Our Story</h1>
                    <p className="suit-18-r">1987년 호주 멜버른에서 시작된 이솝의 이야기</p>
                </div>
            </div>

            <div className="our-story-page__inner">
                <div className="our-story-page__section">
                    <h2 className="optima-40">브랜드 철학</h2>
                    <p className="suit-18-r">
                        이솝은 식물성 성분의 가능성을 믿으며, 과학적으로 검증된 원료와 조화로운 향을 통해
                        일상의 리추얼에 깊이와 감각을 더합니다. 피부, 모발, 신체를 위한 제품 이상으로,
                        이솝은 삶의 방식을 제안합니다.
                    </p>
                </div>

                <div className="our-story-page__section">
                    <h2 className="optima-40">지속 가능성</h2>
                    <p className="suit-18-r">
                        이솝은 환경에 미치는 영향을 최소화하기 위해 지속적으로 노력합니다.
                        FSC 인증 종이, 재활용 가능한 패키징, 그리고 동물 실험 반대 원칙을 지킵니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OurStory;
