import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { fetchIngridients } from '../utils/api';

export const ingridientsInitialState = {
    ingredients: [],
    loading: false,
    error: null,
};

export const getIngredients = createAsyncThunk('ingredients/getIngredients', async () => {
    const response = await fetchIngridients();
    return response.data;
});

export const getIngredientsByType = (type) =>
    createSelector(
        (store) => store.ingredients.ingredients,
        (ingredients) => ingredients.filter((ingredient) => ingredient.type === type)
    );

export const getIngredientById = (id) =>
    createSelector(
        (store) => store.ingredients.ingredients,
        (ingredients) => ingredients.find((ingredient) => ingredient._id === id)
    );

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: ingridientsInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getIngredients.fulfilled, (state, action) => {
                state.loading = false;
                state.ingredients = action.payload;
            })
            .addCase(getIngredients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
