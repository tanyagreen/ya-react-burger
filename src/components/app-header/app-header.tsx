import React from 'react';
import headerStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavButton, { INavButtonProps } from './nav-button/nav-button';
import { NavLink } from 'react-router-dom';

const buttons: INavButtonProps[] = [
    {
        text: 'Конструктор заказов',
        icon: <BurgerIcon type='secondary' />,
        to: '/',
    },
    {
        text: 'Лента заказов',
        icon: <ListIcon type='secondary' />,
        to: '/feed',
    },
];

function Header(): JSX.Element {
    return (
        <header className={headerStyles.header}>
            <div className={`${headerStyles.wrapper} pt-4 pb-4`}>
                <nav className={headerStyles.nav}>
                    {buttons.map((button, i) => {
                        return <NavButton text={button.text} icon={button.icon} to={button.to} key={i} />;
                    })}
                </nav>
                <NavLink to='/'>
                    <Logo />
                </NavLink>
                <NavButton text='Личный кабинет' icon={<ProfileIcon type='secondary' />} to='/profile' />
            </div>
        </header>
    );
}

export default Header;
