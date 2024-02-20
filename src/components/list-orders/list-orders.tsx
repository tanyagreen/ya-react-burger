import React, { useEffect } from 'react';
import { Link, useLocation, useMatch } from 'react-router-dom';
import listOrdersStyles from './list-orders.module.css';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersList } from '../../services/list-selectors';
import { WS_URL_USER } from '../../utils/urls';
import { connect as WSConnect, disconnect as WSdisconnect } from '../../services/orders/actions';
import OrderCard from './order-card/order-card';

const OrdersList = (): JSX.Element => {
    const dispatch = useDispatch();

    const location = useLocation();
    const isFeed = !!useMatch('/feed');

    useEffect(() => {
        if (!isFeed) {
            dispatch(WSConnect(WS_URL_USER));
        }

        return () => {
            if (!isFeed) {
                dispatch(WSdisconnect());
            }
        };
    }, [dispatch, isFeed]);

    const orders = useSelector(getOrdersList(isFeed));

    return (
        <div className={`${listOrdersStyles.wrapper} сute-scroll`}>
            {orders.map((order) => {
                return (
                    <Link
                        to={`${isFeed ? '/feed/' : ''}${order.number}`}
                        state={{ background: location }}
                        className={listOrdersStyles.link}
                        key={`order-card-${order.number}`}
                    >
                        <OrderCard number={order.number} isFeed={isFeed} />
                    </Link>
                );
            })}
        </div>
    );
};

export default OrdersList;
