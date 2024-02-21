import { orderInitialState, orderSlice, setOrder, cleanOrder, cleanError } from './order';

const mockedOrder = [
    {
        name: 'Order',
    },
];

describe('order', () => {
    it('should return the order initialstate', () => {
        expect(orderSlice.reducer(undefined, {})).toEqual(orderInitialState);
    });
    it('should handle order pending action', () => {
        expect(orderSlice.reducer(orderInitialState, setOrder.pending)).toEqual({
            ...orderInitialState,
            loading: true,
        });
    });
    it('should handle order fulfilled action', () => {
        expect(orderSlice.reducer(orderInitialState, setOrder.fulfilled(mockedOrder))).toEqual({
            ...orderInitialState,
            order: mockedOrder,
        });
    });
    it('should handle order rejected action', () => {
        expect(orderSlice.reducer(orderInitialState, setOrder.rejected('Error'))).toEqual({
            ...orderInitialState,
            error: 'Error',
        });
    });
    it('should handle cleanOrder action', () => {
        expect(orderSlice.reducer({ ...orderInitialState, order: mockedOrder }, cleanOrder())).toEqual({
            ...orderInitialState,
            order: null,
        });
    });
    it('should handle order cleanError action', () => {
        expect(orderSlice.reducer(orderInitialState, cleanError())).toEqual({
            ...orderInitialState,
            error: null,
        });
    });
});
