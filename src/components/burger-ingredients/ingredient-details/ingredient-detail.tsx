import React from 'react';
import ingredientDetailStyles from './ingredient-detail.module.css';

interface IIngredientDetailProps {
    title: string;
    text: string | number;
}

function IngredientDetail({ title, text }: IIngredientDetailProps) {
    return (
        <div className={ingredientDetailStyles.wrapper}>
            <p className='text text_type_main-default text_color_inactive'>{title}</p>
            <p className='text text_type_main-default text_color_inactive'>{text}</p>
        </div>
    );
}

export default IngredientDetail;
