import React, { useEffect } from 'react';
import feedStyles from './feed.module.css';
import OrdersList from '../../components/list-orders/list-orders';
import { WS_URL } from '../../utils/urls';
import { connect as WSConnect, disconnect as WSdisconnect } from '../../services/feed/actions';
import { getOrdersDone, getOrdersInProcess } from '../../services/list-selectors';
import { useDispatch, useSelector } from '../../services/store';
import { IOrder } from '../../services/types/order-type';

const Feed = (): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(WSConnect(WS_URL));

        return () => dispatch(WSdisconnect());
    }, [dispatch]);

    const feed = useSelector((store) => store.feed.feed);
    const ordersDone = useSelector(getOrdersDone());
    const ordersInProcess = useSelector(getOrdersInProcess());

    const renderOrderNumbers = (orders: IOrder[], color?: string) => {
        return (
            <div className={feedStyles.statuses}>
                {orders.map((order, idx) => {
                    if (idx > 9) {
                        return null;
                    }
                    return (
                        <div
                            key={order.number}
                            className='text text_type_digits-default'
                            style={color ? { color: color } : {}}
                        >
                            {order.number}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={`${feedStyles.wrapper} mt-10`}>
            <h1 className='text text_type_main-large mt-10'>Лента заказов</h1>
            <main className={feedStyles.main}>
                <OrdersList />
                <div className={feedStyles.boardWrapper}>
                    <div className={feedStyles.statusesWrapper}>
                        <div className={feedStyles.columnWrapper}>
                            <p className='text text_type_main-medium'>Готовы:</p>
                            {renderOrderNumbers(ordersDone, '#00CCCC')}
                        </div>
                        <div className={feedStyles.columnWrapper}>
                            <p className='text text_type_main-medium'>В работе:</p>
                            {renderOrderNumbers(ordersInProcess)}
                        </div>
                    </div>
                    <div className={feedStyles.total}>
                        <p className='text text_type_main-medium'>Выполенно за все время:</p>
                        <p className='text text_type_digits-large'>{feed?.total}</p>
                    </div>
                    <div className={feedStyles.total}>
                        <p className='text text_type_main-medium'>Выполенно за сегодня:</p>
                        <p className='text text_type_digits-large'>{feed?.totalToday}</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Feed;
