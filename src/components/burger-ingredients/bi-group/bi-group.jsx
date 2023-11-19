import React from 'react';
import biGroupStyles from './bi-group.module.css';
import PropTypes from 'prop-types';
import BurgerIngredientsCard from './bi-card/bi-card';
import ingredientType from '../../../utils/data-prop-type';

function BurgerIngredientsGroup(props) {
    return (
        <>
            <h2 className='text text_type_main-medium'>{props.title}</h2>
            <ul className={`${biGroupStyles.wrapper} mt-6 pl-4 pr-4`}>
                {props.data.map((card) => {
                    return (
                        <li key={card._id}>
                        <BurgerIngredientsCard
                            image={card.image}
                            price={card.price}
                            name={card.name}
                            data={card}
                            counter={0}
                        />
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

BurgerIngredientsGroup.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerIngredientsGroup;
