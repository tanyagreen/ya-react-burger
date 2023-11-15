import React from 'react';
import burgerContructorStyles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../utils/data-prop-type';

function BurgerConstructor(props) {

  
    const staticBun = props.data?.find(i => i._id == '60666c42cc7b410027a1a9b1')

    return (
        <div className={burgerContructorStyles.wrapper}>
            {
                staticBun && 
                <ConstructorElement
                    type='top'
                    isLocked={true}
                    text={staticBun.name}
                    price={staticBun.price}
                    thumbnail={staticBun.image}
                    extraClass={burgerContructorStyles.staticCard}
                />
            }


            <ul className={`${burgerContructorStyles.outerCardsWrapper} сute-scroll`}>
                {props.data.filter((item) => item.type !== 'bun').map((card) => {
                    return (
                        <li className={burgerContructorStyles.innerCardWrapper} key={card._id}>
                            <DragIcon type='primary' />
                            <ConstructorElement
                                text={card.name}
                                price={card.price}
                                thumbnail={card.image}
                                extraClass={burgerContructorStyles.card}
                            />
                        </li>
                    );
                })}
            </ul>
                {
                    staticBun && 
                    <ConstructorElement
                        type='bottom'
                        isLocked={true}
                        text='Краторная булка N-200i'
                        price={1255}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                        extraClass={burgerContructorStyles.staticCard}
                    />
                }

            <div className={burgerContructorStyles.submitWrapper}>
                <div className={burgerContructorStyles.price}>
                    <p className='text text_type_digits-medium'>610</p>
                    <CurrencyIcon type='primary' />
                </div>
                <Button htmlType='button' type='primary' size='large'>
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientType).isRequired,
    staticBun: ingredientType,
};

export default BurgerConstructor;
