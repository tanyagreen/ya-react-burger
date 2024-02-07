import { createReducer } from '@reduxjs/toolkit';
import { IFeedData, WebsocketStatus } from '../types/ws-type';
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './actions';
import { IOrder } from '../types/order-type';

export interface IFeedStore {
    status: WebsocketStatus;
    feed: Omit<IFeedData, 'orders'> | null;
    orders: IOrder[];
    connectionError: string;
}

export const feedInitialState: IFeedStore = {
    status: WebsocketStatus.OFFLINE,
    feed: null,
    orders: [],
    connectionError: '',
};

export const feedReducer = createReducer(feedInitialState, (builder) => {
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
            const { total, totalToday } = action.payload;
            state.feed = { total: total, totalToday: totalToday };
            state.orders = action.payload.orders;
        });
});
