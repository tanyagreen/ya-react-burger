import React from 'react';
import headerStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavButton from './nav-button/nav-button';

const buttons = [
    {
        text: 'Конструктор заказов',
        icon: <BurgerIcon type='primary' />,
    },
    {
        text: 'Лента заказов',
        icon: <ListIcon type='secondary' />,
    },
];

function Header() {
    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.wrapper}>
                <nav className={headerStyles.nav}>
                    {buttons.map((button, i) => {
                        return <NavButton text={button.text} icon={button.icon} key={i} />;
                    })}
                </nav>
                <Logo />
                <NavButton text='Личный кабинет' icon={<ProfileIcon type='primary' />} styles={{ marginRight: 0 }} />
            </div>
        </header>
    );
}

export default Header;
