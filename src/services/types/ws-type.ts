import { IResponse } from '../../utils/api';
import { IOrder } from './order-type';

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
}

export interface IFeedData {
    orders: IOrder[];
    total: number;
    totalToday: number;
}

export interface IResponseFeed extends IResponse, IFeedData {}
