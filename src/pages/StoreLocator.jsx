import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import storesData from '../data/stores.json';
import './StoreLocator.scss';

const REGIONS = ['전체', ...Array.from(new Set(storesData.map(s => s.region)))];

const StoreLocator = () => {
    const { storeId } = useParams();
    const [region, setRegion] = useState('전체');
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(storeId ? storesData.find(s => s.id === storeId) : null);

    const filtered = useMemo(() => {
        return storesData.filter(s => {
            const matchRegion = region === '전체' || s.region === region;
            const matchSearch = !search || s.name.includes(search) || s.address.includes(search);
            return matchRegion && matchSearch;
        });
    }, [region, search]);

    return (
        <div className="store-locator">
            <div className="store-locator__header-space" />
            <div className="store-locator__inner">
                <div className="store-locator__title-area">
                    <h1 className="optima-40 store-locator__title">매장 찾기</h1>
                    <p className="suit-16-r store-locator__desc">
                        이솝의 오프라인 공간을 방문하세요. 전문 컨설턴트가 안내해 드립니다.
                    </p>
                </div>

                {/* 필터 */}
                <div className="store-locator__filters">
                    <div className="store-locator__region-tabs">
                        {REGIONS.map(r => (
                            <button
                                key={r}
                                className={`store-locator__region-btn suit-14-m ${region === r ? 'active' : ''}`}
                                onClick={() => setRegion(r)}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                    <div className="store-locator__search">
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="매장명 또는 주소로 검색"
                            className="suit-16-r"
                        />
                    </div>
                </div>

                <div className="store-locator__layout">
                    {/* 매장 목록 */}
                    <div className="store-locator__list">
                        {filtered.length === 0 ? (
                            <p className="suit-16-r store-locator__empty">해당하는 매장이 없습니다.</p>
                        ) : (
                            filtered.map(store => (
                                <div
                                    key={store.id}
                                    className={`store-locator__card ${selected?.id === store.id ? 'active' : ''}`}
                                    onClick={() => setSelected(store)}
                                >
                                    <div className="store-locator__card-top">
                                        <p className="store-locator__card-name suit-18-m">{store.name}</p>
                                        <span className="store-locator__card-region suit-12-r">{store.region}</span>
                                    </div>
                                    <p className="store-locator__card-addr suit-14-m">{store.address}</p>
                                    <p className="store-locator__card-hours suit-12-r">{store.hours}</p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* 선택된 매장 상세 */}
                    <div className="store-locator__detail">
                        {selected ? (
                            <>
                                <h2 className="optima-40 store-locator__detail-name">{selected.name}</h2>
                                <div className="store-locator__detail-info suit-16-r">
                                    <div className="store-locator__detail-row">
                                        <span className="suit-14-m store-locator__detail-label">주소</span>
                                        <span>{selected.address}</span>
                                    </div>
                                    <div className="store-locator__detail-row">
                                        <span className="suit-14-m store-locator__detail-label">운영시간</span>
                                        <span>{selected.hours}</span>
                                    </div>
                                    <div className="store-locator__detail-row">
                                        <span className="suit-14-m store-locator__detail-label">연락처</span>
                                        <a href={`tel:${selected.phone}`}>{selected.phone}</a>
                                    </div>
                                </div>
                                <p className="store-locator__detail-desc suit-16-r">{selected.description}</p>
                                {selected.services?.length > 0 && (
                                    <div className="store-locator__services">
                                        <p className="suit-14-m">제공 서비스</p>
                                        <div className="store-locator__service-tags">
                                            {selected.services.map((s, i) => (
                                                <span key={i} className="store-locator__service-tag suit-12-r">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <a
                                    href={`https://map.kakao.com/?q=${encodeURIComponent(selected.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="store-locator__map-link optima-16"
                                >
                                    지도에서 보기
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </a>
                            </>
                        ) : (
                            <div className="store-locator__detail-empty suit-18-r">
                                <p>매장을 선택하면 상세 정보가 표시됩니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreLocator;
