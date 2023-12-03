import React from 'react';
import biCardStyles from './bi-card.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../../../utils/data-prop-type';
import { useDispatch } from 'react-redux';
import { select } from '../../../../services/details';
import { useDrag } from 'react-dnd';
import { IngredientKind } from '../../../../constants/ingredientKind';


const BurgerIngredientsCard = React.memo((props) =>{

    const dispatch = useDispatch();
    const { image, price, name } = props.data;

    const clickHandler = () => {
        dispatch(select(props.data));
    }

    const [, ref] = useDrag(() => ({
        type: props.data.type === IngredientKind.BUN ? IngredientKind.BUN : 'ingridient',
        item: props.data,
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
    data: ingredientType.isRequired,
};

export default BurgerIngredientsCard;
