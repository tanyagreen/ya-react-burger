import React from 'react';
import biGroupStyles from './bi-group.module.css';
import PropTypes from 'prop-types';
import BurgerIngredientsCard from './bi-card/bi-card';
import { useSelector } from 'react-redux';
import { ingredientCounter } from '../../../services/burger-constructor';
import { getIngredientsByType } from '../../../services/ingredients';


const BurgerIngredientsGroup = React.forwardRef((props, ref)=> { 
    
    const counters = useSelector(ingredientCounter);
    const ingridients = useSelector(getIngredientsByType(props.id));
    
    return (
        <div ref={ref} className='bi-group' id={props.id}>
            <h2 className='text text_type_main-medium'>{props.title}</h2>
            <ul className={`${biGroupStyles.wrapper} mt-6 pl-4 pr-4`}>
                {ingridients.map((card) => {
                    return (
                        <li key={card._id}>
                        <BurgerIngredientsCard
                            counter={counters[card._id]}
                            ingridientId={card._id}
                        />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
});

BurgerIngredientsGroup.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default BurgerIngredientsGroup;
