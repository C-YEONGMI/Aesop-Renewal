// src/App.tsx
import React from 'react';

import './App.scss';
import Footer from './components/common/Footer/Footer';
import Header from './components/common/Header/Header';
import More from './components/common/btn/more';
import MoreBox from './components/common/btn/MoreBox';
import MoreWhBox from './components/common/btn/MoreWhBox';

const App = () => {
    return (
        <div>
            <Header />
            <Footer />
        </div>
    );
};

export default App;
