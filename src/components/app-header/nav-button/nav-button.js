import React from 'react';
import navButtonStyles from './nav-button.module.css';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavButton({ to = '/', ...props }) {
    return (
        <NavLink
            className={({ isActive }) =>
                `link pl-5 pr-5 pt-4 pb-5 ${navButtonStyles.navButton} ${isActive && 'activeLink'}`
            }
            to={to}
        >
            {props.icon}
            <span className='text text_type_main-default'>{props.text}</span>
        </NavLink>
    );
}

NavButton.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string.isRequired,
    to: PropTypes.string,
};

export default NavButton;
