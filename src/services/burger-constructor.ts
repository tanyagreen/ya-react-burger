import { createSlice, createSelector } from '@reduxjs/toolkit';
import { IIngredientCounter, IIngredientWithKey } from './types/ingredient-type';
import { RootState } from './store';

type TConstructorActionCreators = typeof burgerConstructorSlice.actions;
export type TConstructorActions = ReturnType<TConstructorActionCreators[keyof TConstructorActionCreators]>;

interface IConstructorStore {
    ingredients: IIngredientWithKey[];
    bun: IIngredientWithKey | null;
}
export const burgerConstructorInitialState: IConstructorStore = {
    ingredients: [],
    bun: null,
};

export const getBun = createSelector(
    (store: RootState) => store.burgerConstructor,
    (burgerConstructor) => burgerConstructor.bun
);

export const getConstructorIngredients = createSelector(
    (store: RootState) => store.burgerConstructor,
    (burgerConstructor) => burgerConstructor.ingredients
);

export const ingredientCounter = createSelector(
    (store: RootState) => store.burgerConstructor,
    (burgerConstructor) => {
        const counterIngridients = burgerConstructor.ingredients.reduce<IIngredientCounter>((acc, item) => {
            acc[item._id] = (acc[item._id] || 0) + 1;
            return acc;
        }, {});
        const counterBun = burgerConstructor.bun && { [burgerConstructor.bun._id]: 2 };

        return { ...counterIngridients, ...counterBun };
    }
);

export const getTotalPrice = createSelector(
    (store: RootState) => store.burgerConstructor,
    (burgerConstructor) => {
        let totalPrice = burgerConstructor.ingredients.reduce<number>((sum, item) => {
            sum += item.price;
            return sum;
        }, 0);

        if (burgerConstructor.bun) {
            totalPrice += burgerConstructor.bun?.price * 2;
        }
        return totalPrice || 0;
    }
);

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: burgerConstructorInitialState,
    reducers: {
        addItem: (state, action) => {
            state.ingredients = [...state.ingredients, action.payload];
        },

        addBun: (state, action) => {
            state.bun = action.payload;
        },
        deleteItem: (state, action) => {
            state.ingredients = state.ingredients.filter((i) => i.key !== action.payload);
        },
        sorting: (state, action) => {
            state.ingredients.splice(
                action.payload.hoverIndex,
                0,
                state.ingredients.splice(action.payload.dragIndex, 1)[0]
            );
        },
        clean: (state) => {
            state.ingredients = [];
            state.bun = null;
        },
    },
});

export const { addItem, addBun, deleteItem, sorting, clean } = burgerConstructorSlice.actions;
