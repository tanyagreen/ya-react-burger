import { ingredientsSlice, ingridientsInitialState } from './ingredients';
import { burgerConstructorSlice, burgerConstructorInitialState } from './burger-constructor';
import { detailsConstructorSlice, detailsInitialState } from './details';
import { orderSlice, orderInitialState } from './order';
import { userSlice, userInitialState } from './user';

export const rootReducer = {
    ingredients: ingredientsSlice.reducer,
    burgerConstructor: burgerConstructorSlice.reducer,
    details: detailsConstructorSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer,
};

export const rootInitialState = {
    ingredients: ingridientsInitialState,
    burgerConstructor: burgerConstructorInitialState,
    details: detailsInitialState,
    order: orderInitialState,
    user: userInitialState,
};
