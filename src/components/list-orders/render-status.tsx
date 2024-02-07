import React from 'react';
import { IOrder } from '../../services/types/order-type';

export const renderStatus = (status: IOrder['status']) => {
    switch (status) {
        case 'done':
            return <span style={{ color: '#00CCCC' }}>Выполнен</span>;

        case 'pending':
            return <span>Готовится</span>;

        case 'created':
            return <span style={{ color: '#E52B1A' }}>Создан</span>;

        default:
            return null;
    }
};
