import React from 'react';
import './Pagination.scss';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i=1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    console.log('This is the current page', currentPage);
    return (
        <nav className="pagination-nav">
            <ui className="pagination">
                {pageNumbers.map(number => {
                    return (
                        <li key={number} onClick={() => paginate(number)} className={currentPage === number ? 'page-item-active' : 'page-item'} >  
                            {number}
                        </li>
                    )
                })}
            </ui>
        </nav>
    
    )
}

export default Pagination
