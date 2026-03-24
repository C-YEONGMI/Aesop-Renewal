import React from 'react';

// 메인페이지 섹션 컴포넌트
// 가이드 기준 섹션 순서 고정: Hero → Intro → Best → Store → Official → Gift → Korea → About → NewArrival → Navigator
import Hero from '../components/common/mainpage/Hero';
import IntroCopy from '../components/common/mainpage/IntroCopy';
import BestProductsSection from '../components/common/mainpage/BestProductsSection';
import StoreVisualSection from '../components/common/mainpage/StoreVisualSection';
import OfficialExclusiveSection from '../components/common/mainpage/OfficialExclusiveSection';
import BestGiftSection from '../components/common/mainpage/BestGiftSection';
import KoreaExclusiveSection from '../components/common/mainpage/KoreaExclusiveSection';
import AboutTeaserSection from '../components/common/mainpage/AboutTeaserSection';
import NewArrivalSection from '../components/common/mainpage/NewArrivalSection';
import ProductNavigatorSection from '../components/common/mainpage/ProductNavigatorSection';

import './Main.scss';

const Main = () => {
    return (
        <>
            {/* 1. Hero: 첫 화면 브랜드 무드 */}
            <Hero />

            {/* 2. Intro Copy: 브랜드 결을 설명하는 짧은 카피 */}
            <IntroCopy />

            {/* 3. Best Products: 고정 큐레이션 3개 상품 (랜덤 금지) */}
            <BestProductsSection />

            {/* 4. Full-Bleed Store Visual: 오프라인 매장 비주얼 */}
            <StoreVisualSection />

            {/* 5. Official Online Exclusive: 공식몰만의 이유 제시 */}
            <OfficialExclusiveSection />

            {/* 6. Best Gift: 선물 구매자 확신 구간 */}
            <BestGiftSection />

            {/* 7. Korea Exclusive: 한국 단독 구성 */}
            <KoreaExclusiveSection />

            {/* 8. About Teaser: 브랜드 서사 완충 구간 */}
            <AboutTeaserSection />

            {/* 9. New Arrival: 신제품 자연스러운 제안 */}
            <NewArrivalSection />

            {/* 10. Product Navigator: 카테고리 탐색 진입점 */}
            <ProductNavigatorSection />
        </>
    );
};

export default Main;
