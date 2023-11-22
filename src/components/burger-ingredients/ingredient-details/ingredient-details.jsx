import React from 'react';
import ingredientDetailsStyles from './ingredient-details.module.css';
import IngredientDetail from './ingredient-detail'
import ingredientType from '../../../utils/data-prop-type';

function IngredientDetails(props) {
    const { name, image_large, calories, proteins, fat, carbohydrates } = props.ingredient;

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

IngredientDetails.propTypes = {
    ingredient: ingredientType.isRequired,
};

export default IngredientDetails;