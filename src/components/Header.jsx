import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header>
            <Link to="/">홈</Link>
            <Link to="/FAQ">FAQ</Link>
            <Link to="/Sub105">Sub105</Link>
        </header>
    );
}

export default Header;