import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { fetchIngredients } from '../utils/api';
import { IIngredient, EIngredientKind, IIngredientCounter } from './types/ingredient-type';
import { RootState } from './store';

type TIngredientsActionCreators = typeof ingredientsSlice.actions;
export type TIngredientsActions = ReturnType<TIngredientsActionCreators[keyof TIngredientsActionCreators]>;

interface IIngredientsStore {
    ingredients: IIngredient[];
    loading: boolean;
    error: string | null;
}

export const ingridientsInitialState: IIngredientsStore = {
    ingredients: [],
    loading: false,
    error: null,
};

export const filterIngedients = (ingredients: IIngredient[], ids: string[]) => {
    return ingredients.filter((ingredient) => ids.includes(ingredient._id));
};

export const getIngredients = createAsyncThunk('ingredients/getIngredients', async () => {
    const response = await fetchIngredients();
    return response.data;
});

export const getIngredientsByType = (type: EIngredientKind) =>
    createSelector(
        (store: RootState) => store.ingredients.ingredients,
        (ingredients) => ingredients.filter((ingredient) => ingredient.type === type)
    );

export const getIngredientById = (id: string) =>
    createSelector(
        (store: RootState) => store.ingredients.ingredients,
        (ingredients) => ingredients.find((ingredient) => ingredient._id === id)
    );

export const getIngredientsByIds = (ids: string[] = []) =>
    createSelector(
        (store: RootState) => store.ingredients.ingredients,
        (ingredients) => filterIngedients(ingredients, ids)
    );

export const getOrderPrice = (ids: string[] = []) =>
    createSelector(
        (store: RootState) => store.ingredients.ingredients,
        (ingredients) => {
            const ings = filterIngedients(ingredients, ids);
            const totalPrice = ings.reduce<number>((sum, item) => {
                sum += item.price;
                return sum;
            }, 0);

            return totalPrice;
        }
    );

export const ingredientCounter = createSelector(
    (store: RootState) => store.ingredients.ingredients,
    (ingredients) => {
        const counterIngridients = ingredients.reduce<IIngredientCounter>((acc, item) => {
            acc[item._id] = (acc[item._id] || 0) + 1;
            return acc;
        }, {});
        return { ...counterIngridients };
    }
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
                state.error = action.error.message!;
            });
    },
});
