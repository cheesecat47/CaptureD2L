import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const MyNav = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to={`/`}>Home</NavLink></li>
                <li><NavLink to={`/about`}>About</NavLink></li>
            </ul>
        </nav>
    );
};

export default MyNav;