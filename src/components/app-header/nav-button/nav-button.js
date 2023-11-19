import React from 'react';
import navButtonStyles from './nav-button.module.css';
import PropTypes from 'prop-types';

function NavButton(props) {
    return (
        <button className={`${navButtonStyles.navButton} pl-5 pr-5 pt-4 pb-5`}>
            {props.icon}
            <span className='text text_type_main-default'>{props.text}</span>
        </button>
    );
}

NavButton.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string.isRequired,
};

export default NavButton;
