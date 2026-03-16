import React from 'react';
import './Btn.scss';

const MoreBox = () => {
    return (
        <a href="#" className="btn-more-box">
            View more
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M4 14h15M19 14l-6-6" />
            </svg>
        </a>
    );
};

export default MoreBox;
