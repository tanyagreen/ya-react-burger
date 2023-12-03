import React from 'react';
import biGroupStyles from './bi-group.module.css';
import PropTypes from 'prop-types';
import BurgerIngredientsCard from './bi-card/bi-card';
import ingredientType from '../../../utils/data-prop-type';
import { useSelector } from 'react-redux';
import { ingredientCounter } from '../../../services/burger-constructor';


const BurgerIngredientsGroup = React.forwardRef((props, ref)=> { 
    
    const counters = useSelector(ingredientCounter);
    
    return (
        <div ref={ref} className='bi-group' id={props.id}>
            <h2 className='text text_type_main-medium'>{props.title}</h2>
            <ul className={`${biGroupStyles.wrapper} mt-6 pl-4 pr-4`}>
                {props.data.map((card) => {
                    return (
                        <li key={card._id}>
                        <BurgerIngredientsCard
                            data={card}
                            counter={counters[card._id]}
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
    data: PropTypes.arrayOf(ingredientType).isRequired,
    id: PropTypes.string.isRequired,
};

export default BurgerIngredientsGroup;
