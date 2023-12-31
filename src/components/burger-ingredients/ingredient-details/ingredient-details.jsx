import React from 'react';
import ingredientDetailsStyles from './ingredient-details.module.css';
import IngredientDetail from './ingredient-detail'
import { useSelector } from 'react-redux';
import { getSelectedIngredient } from '../../../services/details';

function IngredientDetails() {
    const { name, image_large, calories, proteins, fat, carbohydrates } = useSelector(getSelectedIngredient);

    return (
        <div className={ingredientDetailsStyles.wrapper}>
            <img className='pl-4 pr-4' src={image_large} alt={name}/>
            <p className='text text_type_main-medium mt-4 mb-8' >{name}</p>
            <div className={ingredientDetailsStyles.details}>
                <IngredientDetail title='Калории,ккал' text={calories} />
                <IngredientDetail title='Белки, г' text={proteins} />
                <IngredientDetail title='Жиры, г' text={fat} />
                <IngredientDetail title='Углеводы, г' text={carbohydrates} />
            </div>
        </div>
    );
}

export default IngredientDetails;