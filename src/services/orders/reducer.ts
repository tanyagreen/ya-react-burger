import { createReducer } from '@reduxjs/toolkit';
import { WebsocketStatus } from '../types/ws-type';
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './actions';
import { IOrder } from '../types/order-type';

export interface IOrderStore {
    status: WebsocketStatus;
    orders: IOrder[];
    connectionError: string;
}

export const ordersInitialState: IOrderStore = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    connectionError: '',
};

export const ordersReducer = createReducer(ordersInitialState, (builder) => {
    builder
        .addCase(wsConnecting, (state) => {
            state.status = WebsocketStatus.CONNECTING;
        })
        .addCase(wsOpen, (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.connectionError = '';
        })
        .addCase(wsClose, (state) => {
            state.status = WebsocketStatus.OFFLINE;
            state.connectionError = '';
        })
        .addCase(wsError, (state, action) => {
            state.connectionError = action.payload;
        })
        .addCase(wsMessage, (state, action) => {
            state.orders = action.payload.orders.reverse();
        });
});
