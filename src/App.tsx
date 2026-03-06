// src/App.tsx
import React from 'react';
import ProductList from './components/ProductList';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            {/* 이솝 리디자인 프로젝트의 메인 레이아웃 */}
            <main>
                <ProductList />
            </main>
        </div>
    );
};

export default App;
