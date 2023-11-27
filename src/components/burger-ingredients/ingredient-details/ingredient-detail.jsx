import React from 'react';
import ingredientDetailStyles from './ingredient-detail.module.css';
import PropTypes from 'prop-types';

function IngredientDetail({title, text}) {

    return (
        <div className={ingredientDetailStyles.wrapper}>
            <p className="text text_type_main-default text_color_inactive">{title}</p>
            <p className="text text_type_main-default text_color_inactive">{text}</p>
        </div>
    );
}

IngredientDetail.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

export default IngredientDetail;