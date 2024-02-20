import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { fetchOrder } from '../utils/api';
import { RootState } from './store';
import { IIngredient } from './types/ingredient-type';
import { IOrder } from './types/order-type';

type TOrderActionCreators = typeof orderSlice.actions;
export type TOrderActions = ReturnType<TOrderActionCreators[keyof TOrderActionCreators]>;

interface IOrderStore {
    loading: boolean;
    error: string | null;
    order: IOrder | null;
}
export const orderInitialState: IOrderStore = {
    loading: false,
    error: null,
    order: null,
};

export const getOderNumber = createSelector(
    (store: RootState) => store.order.order,
    (order) => order?.number
);

export const setOrder = createAsyncThunk('ingredients/setOrder', async (ingredients: IIngredient['_id'][]) => {
    const response = await fetchOrder(ingredients);
    return response.order;
});

export const orderSlice = createSlice({
    name: 'order',
    initialState: orderInitialState,
    reducers: {
        cleanOrder: (state) => {
            state.order = null;
        },
        cleanError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(setOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(setOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            });
    },
});

export const { cleanOrder, cleanError } = orderSlice.actions;
