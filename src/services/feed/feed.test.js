import { feedReducer, feedInitialState } from './reducer';
import { wsConnecting, wsOpen, wsClose, wsError, wsMessage } from './actions';
import { WebsocketStatus } from '../types/ws-type';

const mockedWSMessage = {
    total: 1,
    totalToday: 1,
    orders: [
        {
            number: 1,
        },
    ],
};

describe('feed', () => {
    it('should return the feed initialstate', () => {
        expect(feedReducer(undefined, {})).toEqual(feedInitialState);
    });

    it('should handle feed wsConnecting action', () => {
        expect(feedReducer(feedInitialState, wsConnecting)).toEqual({
            ...feedInitialState,
            status: WebsocketStatus.CONNECTING,
        });
    });

    it('should handle feed wsOpen action', () => {
        expect(feedReducer(feedInitialState, wsOpen)).toEqual({
            ...feedInitialState,
            status: WebsocketStatus.ONLINE,
        });
    });

    it('should handle feed wsClose action', () => {
        expect(feedReducer(feedInitialState, wsClose)).toEqual({
            ...feedInitialState,
            status: WebsocketStatus.OFFLINE,
        });
    });

    it('should handle feed wsError action', () => {
        expect(feedReducer(feedInitialState, wsError('Error'))).toEqual({
            ...feedInitialState,
            connectionError: 'Error',
        });
    });

    it('should handle feed wsMessage action', () => {
        expect(feedReducer(feedInitialState, wsMessage(mockedWSMessage))).toEqual({
            ...feedInitialState,
            feed: { total: mockedWSMessage.total, totalToday: mockedWSMessage.totalToday },
            orders: mockedWSMessage.orders,
        });
    });
});
