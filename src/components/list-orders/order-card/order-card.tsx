import React from 'react';
import cardOrderStyles from './order-card.module.css';
import { useSelector } from '../../../services/store';
import { getOrderById } from '../../../services/list-selectors';
import { IOrder } from '../../../services/types/order-type';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredientsByIds, getOrderPrice } from '../../../services/ingredients';
import { renderStatus } from '../render-status';

interface IOrderCardProps {
    number: IOrder['number'];
    isFeed: boolean;
}

const OrderCard = ({ number, isFeed = false }: IOrderCardProps): JSX.Element | null => {
    const order = useSelector(getOrderById(number));

    const ingredients = useSelector(getIngredientsByIds(order?.ingredients));
    const price = useSelector(getOrderPrice(order?.ingredients));

    if (!order) {
        return null;
    }

    return (
        <section className={cardOrderStyles.wrapper}>
            <div className={cardOrderStyles.row}>
                <p className='text text_type_digits-default'>#{order.number}</p>
                <FormattedDate
                    date={new Date(order.updatedAt)}
                    className='text text_type_main-default text_color_inactive'
                />
            </div>
            <div>
                <p className='text text_type_main-medium'>{order.name}</p>
                {!isFeed && <p className='mt-3 text text_type_main-default'>{renderStatus(order.status)}</p>}
            </div>
            <div className={cardOrderStyles.row}>
                <div className={cardOrderStyles.imagesWrapper}>
                    {ingredients.map((ingredient, idx) => {
                        if (idx > 5) {
                            return null;
                        }
                        return (
                            <div
                                key={`${number}-${ingredient._id}`}
                                className={cardOrderStyles.roundImg}
                                style={{
                                    marginLeft: idx === 5 || idx === ingredients.length - 1 ? 0 : -20,
                                }}
                            >
                                <img
                                    src={ingredient.image_mobile}
                                    alt={ingredient.name}
                                    style={{ opacity: idx === 0 && ingredients.length > 6 ? 0.5 : 1 }}
                                />
                                {idx === 0 && ingredients.length > 6 && (
                                    <div className={`text text_type_digits-default ${cardOrderStyles.numberPlus}`}>
                                        +{ingredients.length - 6}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className={cardOrderStyles.price}>
                    <span className='text text_type_digits-default'>{price}</span>
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </section>
    );
};

export default OrderCard;
