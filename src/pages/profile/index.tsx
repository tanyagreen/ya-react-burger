import React from 'react';
import profileStyles from './profile.module.css';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../services/user';

function Profile() {
    const location = useLocation();
    const dispatch = useDispatch();

    const renderPrompt = () => {
        switch (location.pathname) {
            case '/profile':
                return 'В этом разделе вы можете изменить свои персональные данные';
            case '/profile/orders':
                return 'В этом разделе вы можете посмотреть свою историю заказов';

            default:
                break;
        }
    };

    const userLogoutHandler = () => {
        //@ts-ignore
        dispatch(userLogout());
    };

    return (
        <div className={profileStyles.main}>
            <nav className={profileStyles.navWrapper}>
                <NavLink
                    className={({ isActive }) => `link ${profileStyles.profileLink} ${isActive && 'activeLink'}`}
                    to='/profile'
                    end
                >
                    <span className='text text_type_main-medium'>Профиль</span>
                </NavLink>
                <NavLink
                    className={({ isActive }) => `link ${profileStyles.profileLink} ${isActive && 'activeLink'}`}
                    to='orders'
                >
                    <span className='text text_type_main-medium'>История заказов</span>
                </NavLink>
                <button
                    className={`link ${profileStyles.buttonAsLink} ${profileStyles.profileLink}`}
                    onClick={userLogoutHandler}
                >
                    <span className='text text_type_main-medium'>Выход</span>
                </button>

                <p className={`text text_type_main-default text_color_inactive mt-20 ${profileStyles.profileLink}`}>
                    {renderPrompt()}
                </p>
            </nav>
            <Outlet />
        </div>
    );
}

export default Profile;
