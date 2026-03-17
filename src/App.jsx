// src/App.tsx
import React from 'react';

import './App.scss';
import Footer from './components/common/Footer/Footer';
import Header from './components/common/Header/Header';
import Main from './components/pages/Main';

const App = () => {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
};

export default App;
