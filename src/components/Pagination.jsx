
import React from 'react';
import '../App.css'


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const buttonStyle = {
        'width' : '100px',
        'height' : '30px'
    }
    return (
        <nav>
            <ul className="pagination" style={{
                'display' : 'flex', 'gap': '10px', 'float': 'right', 'marginRight': '10%'
            }}>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} style={buttonStyle}>
                        Previous
                    </button>
                </li>
                <li className="page-item">
                    <span className="page-link">Page {currentPage} of {totalPages}</span>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} style={buttonStyle}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
