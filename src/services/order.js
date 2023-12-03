import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { fetchOrder } from '../utils/api';

export const orderInitialState = {
    loading: false,
    error: null,
    orderNumber: null,
};

export const getOderNumber = createSelector(
    (store) => store.order,
    (order) => order.orderNumber
);

export const setOrder = createAsyncThunk('ingredients/setOrder', async (ingredients) => {
    const response = await fetchOrder({ ingredients: ingredients });
    return response.order;
});

export const orderSlice = createSlice({
    name: 'order',
    initialState: orderInitialState,
    reducers: {
        cleanOrder: (state) => {
            state.orderNumber = null;
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
                state.orderNumber = action.payload.number;
            })
            .addCase(setOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { cleanOrder, cleanError } = orderSlice.actions;
