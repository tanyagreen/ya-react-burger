import React from 'react';
import burgerContructorStyles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import ingredientType from '../../utils/data-prop-type';
import useOpenClose from '../../hooks/use-open-close';

function BurgerConstructor(props) {

    const {isOpen, open, close } = useOpenClose();

    const staticBun = React.useMemo(() => props.data?.find(i => i._id === '643d69a5c3f7b9001cfa093c'), [props.data]);
    const notBun = React.useMemo(() => props.data?.filter((item) => item.type !== 'bun'), [props.data]);

    return (
        <div className={`${burgerContructorStyles.wrapper} mt-25`}>
            {
                staticBun && 
                <ConstructorElement
                    type='top'
                    isLocked={true}
                    text={`${staticBun.name} (верх)`}
                    price={staticBun.price}
                    thumbnail={staticBun.image}
                    extraClass={burgerContructorStyles.staticCard}
                />
            }

            <ul className={`${burgerContructorStyles.outerCardsWrapper} сute-scroll`}>
                {notBun?.map((card) => {
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
                        text={`${staticBun.name} (низ)`}
                        price={staticBun.price}
                        thumbnail={staticBun.image}
                        extraClass={burgerContructorStyles.staticCard}
                    />
                }

            <div className={`${burgerContructorStyles.submitWrapper} mt-10`}>
                <div className={burgerContructorStyles.price}>
                    <p className='text text_type_digits-medium'>610</p>
                    <CurrencyIcon type='primary' />
                </div>
                <Button htmlType='button' type='primary' size='large' onClick={open}>
                    Оформить заказ
                </Button>
            </div>
            { isOpen && 
                <Modal header={'hello'} onClose={close}><OrderDetails/></Modal>
            }
        </div>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientType).isRequired,
    staticBun: ingredientType,
};

export default BurgerConstructor;
