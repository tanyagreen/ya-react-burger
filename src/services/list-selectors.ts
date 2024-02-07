import { RootState } from './store';
import { createSelector } from '@reduxjs/toolkit';
import { filterIngedients } from './ingredients';
import { IOrder } from './types/order-type';

export const getOrdersList = (isFeed: boolean) =>
    createSelector(
        (store: RootState) => store,
        (store) => {
            const orders = isFeed ? store.feed.orders : store.orders.orders;
            return orders.filter((order) => {
                return (
                    order.number &&
                    order.updatedAt &&
                    order.ingredients?.length > 0 &&
                    filterIngedients(store.ingredients.ingredients, order.ingredients).length > 0
                );
            });
        }
    );

export const getOrderById = (id: IOrder['number']) =>
    createSelector(
        (store: RootState) => store,
        (store) => {
            return (
                store.feed.orders.find((order) => order.number === id) ||
                store.orders.orders.find((order) => order.number === id) ||
                (store.order.order?.number === id ? store.order.order : undefined)
            );
        }
    );

export const getOrdersDone = () =>
    createSelector(
        (store: RootState) => store.feed.orders,
        (orders) => orders.filter((order) => order.status === 'done')
    );

export const getOrdersInProcess = () =>
    createSelector(
        (store: RootState) => store.feed.orders,
        (orders) => orders.filter((order) => order.status !== 'done')
    );

export const getOrderByIdStore = (id: IOrder['number']) =>
    createSelector(
        (store: RootState) => store.feed.orders,
        (orders) => {
            return orders.find((order) => order.number === id);
        }
    );
