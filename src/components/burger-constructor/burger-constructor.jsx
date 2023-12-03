import React from 'react';
import burgerContructorStyles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import BurgerConstructorElement from './bc-element/bc-element';
import { IngredientKind } from '../../constants/ingredientKind';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { getBun, getConstructorIngredients, addItem, addBun, getTotalPrice } from '../../services/burger-constructor';
import { v4 as uuidv4 } from 'uuid';
import { setOrder, getOderNumber, cleanOrder } from '../../services/order';
import { cleanError } from '../../services/order';
import Loader from '../loader/loader';

function BurgerConstructor() {

    const dispatch = useDispatch();

    const bun = useSelector(getBun);
    const ingredients = useSelector(getConstructorIngredients);
    const totalPrice = useSelector(getTotalPrice);
    const orderNumber = useSelector(getOderNumber);
    const { loading, error } = useSelector((store) => store.order);
    

    const [{ itemType, isOver }, ref] = useDrop(() => ({
        accept: [IngredientKind.BUN, 'ingridient'],
        drop: (item) => {
            const itemWithKey = {
                key: uuidv4(),
                ...item
            }
            item.type === IngredientKind.BUN ? dispatch(addBun(itemWithKey)) : dispatch(addItem(itemWithKey));
            dispatch(cleanError());    
        },
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          itemType: monitor.getItemType()
        }),
      }));

    const bunRender = (position) => {
        return (
            bun 
            ? 
            <ConstructorElement
                type={position}
                isLocked={true}
                text={`${bun.name} ${position === 'top' ? '(верх)' : '(низ)' }`}
                price={bun.price}
                thumbnail={bun.image}
                extraClass={`
                    ${burgerContructorStyles.staticCard} 
                    ${isOver && itemType === IngredientKind.BUN && burgerContructorStyles.cardOnOver}`
                }
            /> 
            : 
            <div className={
                `constructor-element constructor-element_pos_${position}
                ${burgerContructorStyles.staticCardIdle} 
                ${isOver && itemType === IngredientKind.BUN && burgerContructorStyles.cardOnOver}`
            }>
                <p className="text text_type_main-default">Выберите булки</p>
            </div>
        )
    }

    const onSubmit = React.useCallback(() => {
        dispatch(setOrder([bun?._id, ...ingredients.map(i => i._id), bun?._id]));
    }, [dispatch, bun, ingredients]);

    const onClose = React.useCallback(() => {
        dispatch(cleanOrder())
    }, [dispatch]);    

    return (
        <div className={`${burgerContructorStyles.wrapper} mt-25`} ref={ref}>

            { bunRender('top') }

            <ul className={`${burgerContructorStyles.outerCardsWrapper} сute-scroll`}>
                {
                    ingredients.length > 0 ?
                        ingredients?.map((item, index) => {
                            return (
                                <li className={burgerContructorStyles.innerCardWrapper} key={item.key}>
                                    <BurgerConstructorElement ingredient={item} index={index}/>
                                </li>
                            );
                        })
                    :   <div className={`constructor-element 
                            ${burgerContructorStyles.cardIdle} 
                            ${isOver && itemType !== IngredientKind.BUN && burgerContructorStyles.cardOnOver}`
                        }>
                            <p className="text text_type_main-default">Выберите начинку</p>
                        </div>
                }
            </ul>

            { bunRender('bottom') }
 
            <div className={`${burgerContructorStyles.submitWrapper} mt-10`}>
                <div className={burgerContructorStyles.price}>
                    <p className='text text_type_digits-medium'>{totalPrice}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <Button 
                    htmlType='button' 
                    type='primary' 
                    size='large' 
                    onClick={onSubmit} extraClass={burgerContructorStyles.submitButton}
                    
                >
                    {loading && <Loader />} Оформить заказ 
                </Button>
            </div>
            {error && <h4 className={burgerContructorStyles.errorMessage}>{`Ошибка ${error}`}</h4>}
            { orderNumber && !error && !loading &&
                <Modal header={'hello'} onClose={onClose}><OrderDetails orderNumber={orderNumber}/></Modal>
            }
        </div>
    );
}


export default BurgerConstructor;
