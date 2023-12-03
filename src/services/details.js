import { createSlice, createSelector } from '@reduxjs/toolkit';

export const detailsInitialState = {
    detailedIngredient: null,
};

export const getSelectedIngredient = createSelector(
    (store) => store.details,
    (details) => {
        return details.detailedIngredient;
    }
);

export const detailsConstructorSlice = createSlice({
    name: 'details',
    initialState: detailsInitialState,
    reducers: {
        select: (state, action) => ({
            detailedIngredient: action.payload,
        }),
        clear: () => ({
            detailedIngredient: null,
        }),
    },
});

export const { select, clear } = detailsConstructorSlice.actions;
