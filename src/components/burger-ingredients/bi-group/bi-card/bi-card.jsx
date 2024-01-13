import React from 'react';
import biCardStyles from './bi-card.module.css';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector} from 'react-redux';
import { useDrag } from 'react-dnd';
import { IngredientKind } from '../../../../constants/ingredientKind';
import { getIngredientById } from '../../../../services/ingredients';


const BurgerIngredientsCard = React.memo((props) =>{

    const ingridient = useSelector(getIngredientById(props.ingridientId));
    const { image, price, name } = ingridient;

    const [, ref] = useDrag(() => ({
        type: ingridient.type === IngredientKind.BUN ? IngredientKind.BUN : 'ingridient',
        item: ingridient,
    }));

    const location = useLocation();
    const ingredientId = ingridient['_id'];

    return (
        <Link 
            to={`/ingredients/${ingredientId}`}
            state={{ background: location }}
            className={biCardStyles.link}
        >
            <section className={biCardStyles.wrapper} ref={ref} >
                <img className='pl-4 pr-4' src={image} alt={name} />
                <span className={biCardStyles.price}>
                    <span className='text text_type_digits-default'>{price}</span>
                    <CurrencyIcon type='primary' />
                </span>
                <span className={`${biCardStyles.name} text text_type_main-default`}>{name}</span>
                {props.counter > 0 && <Counter count={props.counter} size='default' extraClass='m-1' />}
            </section>
        </Link>
    );
});

BurgerIngredientsCard.propTypes = {
    counter: PropTypes.number,
    ingridientId: PropTypes.string.isRequired,
};

export default BurgerIngredientsCard;
