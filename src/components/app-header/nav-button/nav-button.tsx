import React from 'react';
import navButtonStyles from './nav-button.module.css';
import { NavLink } from 'react-router-dom';

export interface INavButtonProps {
    icon?: React.ReactNode;
    text: string;
    to: string;
}

function NavButton({ to = '/', ...props }: INavButtonProps): JSX.Element {
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

export default NavButton;
