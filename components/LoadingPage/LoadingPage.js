import React from 'react';
import './LoadingPage.scss';

const LoadingPage = () => {
    return (
        <div className="loading-page">
            <div className="loading">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
            {/* <span></span>
            <span></span>
            <span></span> */}
        </div>
    )
}

export default LoadingPage
