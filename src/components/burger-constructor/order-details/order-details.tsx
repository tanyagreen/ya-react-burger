import React from 'react';
import orderDetailsStyles from './order-details.module.css';

interface IOrderDetails {
    orderNumber: string;
}

function OrderDetails({ orderNumber }: IOrderDetails) {
    return (
        <section className={orderDetailsStyles.wrapper}>
            <p className='text text_type_digits-large mt-10'>{orderNumber}</p>
            <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
            <img className='mt-15 mb-15' src='./images/graphics.svg' alt='doneIcon' />
            <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive mt-2 mb-30'>
                Дождитесь готовности на орбитальной станции
            </p>
        </section>
    );
}

export default OrderDetails;
