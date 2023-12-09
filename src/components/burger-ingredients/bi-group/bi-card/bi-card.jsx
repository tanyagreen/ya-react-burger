import React from 'react';
import biCardStyles from './bi-card.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { select } from '../../../../services/details';
import { useDrag } from 'react-dnd';
import { IngredientKind } from '../../../../constants/ingredientKind';
import { getIngredientById } from '../../../../services/ingredients';


const BurgerIngredientsCard = React.memo((props) =>{

    const ingridient = useSelector(getIngredientById(props.ingridientId));
    const { image, price, name } = ingridient;

    const dispatch = useDispatch(); 

    const clickHandler = () => {
        dispatch(select(ingridient));
    }

    const [, ref] = useDrag(() => ({
        type: ingridient.type === IngredientKind.BUN ? IngredientKind.BUN : 'ingridient',
        item: ingridient,
    }))

    return (
        <section className={biCardStyles.wrapper} onClick={clickHandler} ref={ref} >
            <img className='pl-4 pr-4' src={image} alt={name} />
            <span className={biCardStyles.price}>
                <span className='text text_type_digits-default'>{price}</span>
                <CurrencyIcon type='primary' />
            </span>
            <span className={`${biCardStyles.name} text text_type_main-default`}>{name}</span>
            {props.counter > 0 && <Counter count={props.counter} size='default' extraClass='m-1' />}
        </section>
    );
});

BurgerIngredientsCard.propTypes = {
    counter: PropTypes.number,
    ingridientId: PropTypes.string.isRequired,
};

export default BurgerIngredientsCard;
