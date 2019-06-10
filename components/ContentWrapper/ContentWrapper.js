import React from 'react';
import './ContentWrapper.scss';


const ContentWrapper = ({ children }) => {
    return (
        <div className="content-wrapper">
            {children}
        </div>
    )
}

export default ContentWrapper
