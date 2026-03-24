import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useProductStore from '../../store/useProductStore';
import { getCategoryLabelFromValue } from '../../data/productCategories';
import './Search.scss';

const Search = () => {
    const searchProducts = useProductStore(s => s.searchProducts);
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);

    // URL의 파라미터가 변경될 때마다 자동 검색
    useEffect(() => {
        const q = searchParams.get('q');
        if (q) {
            setQuery(q);
            setResults(searchProducts(q));
            setSearched(true);
        } else {
            setQuery('');
            setResults([]);
            setSearched(false);
        }
    }, [searchParams, searchProducts]);

    const handleSearch = e => {
        e.preventDefault();
        if (!query.trim()) return;
        // 검색 버튼 누르면 URL 업데이트만 수행 (실제 검색은 useEffect에서 처리)
        setSearchParams({ q: query });
    };

    return (
        <div className="search-page">
            <div className="search-page__header-space" />
            <div className="search-page__inner">
                <h1 className="optima-40 search-page__title">검색</h1>

                <form className="search-page__form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="제품명, 성분, 카테고리로 검색"
                        className="search-page__input suit-18-r"
                    />
                    <button type="submit" className="search-page__btn optima-16">검색</button>
                </form>

                {searched && (
                    <div className="search-page__results">
                        <p className="suit-14-m search-page__count">
                            "{query}" 검색 결과 {results.length}개
                        </p>
                        {results.length === 0 ? (
                            <p className="suit-16-r search-page__empty">검색 결과가 없습니다.</p>
                        ) : (
                            <div className="search-page__grid">
                                {results.map((p, i) => (
                                    <Link key={i} to={`/product/${encodeURIComponent(p.name)}`} className="search-page__card">
                                        <div className="search-page__card-img">
                                            <img src={p.variants[0]?.image} alt={p.name} />
                                        </div>
                                        <p className="suit-12-r">{getCategoryLabelFromValue(p.category)}</p>
                                        <p className="suit-16-m">{p.name}</p>
                                        <p className="suit-14-m">{p.variants[0]?.price?.toLocaleString()}원</p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
