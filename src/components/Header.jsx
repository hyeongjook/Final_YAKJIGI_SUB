import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header>
            <Link to="/">홈</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/sub105">Sub105</Link>
            <Link to="/sub301">Sub301</Link>
            <Link to="/sub302">Sub302</Link>
            <Link to="/sub101">Sub101</Link>
        </header>
    );
}

export default Header;