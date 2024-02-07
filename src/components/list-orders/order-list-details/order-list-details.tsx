import React, { useEffect, useMemo, useState } from 'react';
import detailsStyle from './order-list-details.module.css';
import cardOrderStyles from '../order-card/order-card.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../../services/store';
import { getOrderByIdStore } from '../../../services/list-selectors';
import { getIngredientsByIds, getOrderPrice } from '../../../services/ingredients';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrder } from '../../../utils/api';
import { EIngredientKind, IIngredientCounter } from '../../../services/types/ingredient-type';
import { renderStatus } from '../render-status';

const OrderListDetails = (): JSX.Element | null => {
    const { orderId } = useParams();

    const [order, setOrder] = useState(useSelector(getOrderByIdStore(Number(orderId))));
    const ingredients = useSelector(getIngredientsByIds(order?.ingredients));
    const price = useSelector(getOrderPrice(order?.ingredients));

    const counterIngridients = useMemo(
        () =>
            ingredients.reduce<IIngredientCounter>((acc, item) => {
                if (item.type === EIngredientKind.BUN) {
                    acc[item._id] = (acc[item._id] || 0) + 2;
                } else {
                    acc[item._id] = (acc[item._id] || 0) + 1;
                }
                return acc;
            }, {}),
        [ingredients]
    );

    useEffect(() => {
        if (!order) {
            getOrder(Number(orderId)).then((data) => {
                setOrder(data.orders[0]);
            });
        }
    }, [orderId, order]);

    if (!order) {
        return null;
    }

    return (
        <div className={detailsStyle.wrapper}>
            <div className={detailsStyle.innerWrapper}>
                <div className={`${detailsStyle.orderNumber} text text_type_digits-default`}>#{order.number}</div>
                <p className={`mt-10 text text_type_main-medium`}>{order.name}</p>
                <p className={`mt-3 text text_type_main-default`}>{renderStatus(order.status)}</p>

                <p className={`mt-15 text text_type_main-medium`}>Состав:</p>
                <div className={`${detailsStyle.listWrapper} сute-scroll`}>
                    {ingredients.map((ingredient) => {
                        return (
                            <div className={detailsStyle.listInfo} key={`details-${ingredient._id}`}>
                                <div className={cardOrderStyles.roundImg}>
                                    <img src={ingredient.image_mobile} alt={ingredient.name} />
                                </div>
                                <p className='text text_type_main-default'>{ingredient.name}</p>
                                <div className={detailsStyle.count}>
                                    <span className='text text_type_digits-default'>
                                        {counterIngridients[ingredient._id]}
                                        &#215;
                                        {ingredient.price}
                                    </span>
                                    <CurrencyIcon type='primary' />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={detailsStyle.summary}>
                    <FormattedDate
                        date={new Date(order.updatedAt)}
                        className='text text_type_main-default text_color_inactive'
                    />
                    <div className={detailsStyle.count}>
                        <span className='text text_type_digits-default'>{price}</span>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderListDetails;
