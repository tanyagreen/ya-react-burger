import React from 'react';
import pageLinkStyles from './page-link.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const PageLink = (props) => {
    const {text, linkText, to} = props;

    return (
        <div className={pageLinkStyles.navWrapper}>
            <p className='text text_type_main-medium text_color_inactive'>{text}</p>
            <Link to={to} className={pageLinkStyles.navLink}>
                <span className='text text_type_main-medium'>{linkText}</span>
            </Link>
        </div>
    )
}

PageLink.propTypes = {
    text: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

export default PageLink;