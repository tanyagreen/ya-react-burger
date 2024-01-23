import React from 'react';
import ingredientDetailsStyles from './ingredient-details.module.css';
import IngredientDetail from './ingredient-detail';
import { useSelector } from 'react-redux';
import { getIngredientById } from '../../../services/ingredients';
import { useParams } from 'react-router-dom';
import { IIngredient } from '../../../utils/ingredient-type';

function IngredientDetails() {
    const { ingredientId } = useParams();

    const { name, image_large, calories, proteins, fat, carbohydrates }: IIngredient = useSelector(
        getIngredientById(ingredientId)
    );

    return (
        <div className={ingredientDetailsStyles.wrapper}>
            <p className={`text text_type_main-large ${ingredientDetailsStyles.title}`}>Детали ингридиента</p>
            <img className='pl-4 pr-4' src={image_large} alt={name} />
            <p className='text text_type_main-medium mt-4 mb-8'>{name}</p>
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
