import React from 'react';
import biCardStyles from './bi-card.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../../../utils/data-prop-type';

function BurgerIngredientsCard(props) {
    const { image, price, name } = props;
    return (
        <section className={biCardStyles.wrapper}>
            <img className='pl-4 pr-4' src={image} alt={name}/>
            <span className={biCardStyles.price}>
                <span className='text text_type_digits-default'>{price}</span>
                <CurrencyIcon type='primary' />
            </span>
            <span className={`${biCardStyles.name} text text_type_main-default`}>{name}</span>
            {props.counter > 0 && <Counter count={props.counter} size='default' extraClass='m-1' />}
        </section>
    );
}

BurgerIngredientsCard.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    counter: PropTypes.number,
    data: ingredientType.isRequired,
};

export default BurgerIngredientsCard;
