import React from 'react';
import ingredientDetailsStyles from './ingredient-details.module.css';
import IngredientDetail from './ingredient-detail';
import { useSelector } from '../../../services/store';
import { getIngredientById } from '../../../services/ingredients';
import { useParams } from 'react-router-dom';

function IngredientDetails() {
    const { ingredientId } = useParams();

    const ingredient = useSelector(getIngredientById(ingredientId!));

    if (!ingredient) {
        return null;
    }

    return (
        <div className={ingredientDetailsStyles.wrapper}>
            <p className={`text text_type_main-large ${ingredientDetailsStyles.title}`}>Детали ингридиента</p>
            <img className='pl-4 pr-4' src={ingredient.image_large} alt={ingredient.name} />
            <p className='text text_type_main-medium mt-4 mb-8'>{ingredient.name}</p>
            <div className={ingredientDetailsStyles.details}>
                <IngredientDetail title='Калории,ккал' text={ingredient.calories} />
                <IngredientDetail title='Белки, г' text={ingredient.proteins} />
                <IngredientDetail title='Жиры, г' text={ingredient.fat} />
                <IngredientDetail title='Углеводы, г' text={ingredient.carbohydrates} />
            </div>
        </div>
    );
}

export default IngredientDetails;
