import { ordersReducer, ordersInitialState } from './reducer';
import { wsConnecting, wsOpen, wsClose, wsError, wsMessage } from './actions';
import { WebsocketStatus } from '../types/ws-type';

const mockedWSMessage = {
    orders: [
        {
            number: 1,
        },
        {
            number: 2,
        },
    ],
};

describe('orders', () => {
    it('should return orders initialstate', () => {
        expect(ordersReducer(undefined, {})).toEqual(ordersInitialState);
    });

    it('should handle orders wsConnecting action', () => {
        expect(ordersReducer(ordersInitialState, wsConnecting)).toEqual({
            ...ordersInitialState,
            status: WebsocketStatus.CONNECTING,
        });
    });

    it('should handle orders wsOpen action', () => {
        expect(ordersReducer(ordersInitialState, wsOpen)).toEqual({
            ...ordersInitialState,
            status: WebsocketStatus.ONLINE,
        });
    });

    it('should handle orders wsClose action', () => {
        expect(ordersReducer(ordersInitialState, wsClose)).toEqual({
            ...ordersInitialState,
            status: WebsocketStatus.OFFLINE,
        });
    });

    it('should handle orders wsError action', () => {
        expect(ordersReducer(ordersInitialState, wsError('Error'))).toEqual({
            ...ordersInitialState,
            connectionError: 'Error',
        });
    });

    it('should handle orders wsMessage action', () => {
        expect(ordersReducer(ordersInitialState, wsMessage(mockedWSMessage))).toEqual({
            ...ordersInitialState,
            orders: mockedWSMessage.orders,
        });
    });
});
