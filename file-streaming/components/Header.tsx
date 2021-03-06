import React from 'react';
import headerStyles from '../styles/Header.module.css';

const Header = () => {
    return (
        <div>
            <h1 className={headerStyles.title}>
                <span></span>
            </h1>
            <p className={headerStyles.description}>
                Make any night a movie night!
            </p>
        </div>
    );
};



export default Header;