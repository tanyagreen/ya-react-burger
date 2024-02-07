import { combineReducers } from 'redux';
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import type {} from 'redux-thunk/extend-redux';

import { ingredientsSlice, ingridientsInitialState, TIngredientsActions } from './ingredients';
import { burgerConstructorSlice, burgerConstructorInitialState, TConstructorActions } from './burger-constructor';
import { orderSlice, orderInitialState, TOrderActions } from './order';
import { userSlice, userInitialState, TUserActions } from './user';
import { socketMiddleware } from './middleware/socket-middleware';
import {
    connect as feedWsConnect,
    disconnect as feedWsDisconnect,
    wsOpen as feedWsOpen,
    wsClose as feedWsClose,
    wsMessage as feedWsMessage,
    wsError as feedWsError,
    wsConnecting as feedWsConnecting,
    TFeedActions,
} from './feed/actions';
import { feedInitialState, feedReducer } from './feed/reducer';
import {
    connect as ordersWsConnect,
    disconnect as ordersWsDisconnect,
    wsOpen as ordersWsOpen,
    wsClose as ordersWsClose,
    wsMessage as ordersWsMessage,
    wsError as ordersWsError,
    wsConnecting as ordersWsConnecting,
    TOrdersActions,
} from './orders/actions';
import { ordersInitialState, ordersReducer } from './orders/reducer';

export type RootState = ReturnType<typeof rootReducer>;

export type AppActions =
    | TIngredientsActions
    | TConstructorActions
    | TOrderActions
    | TUserActions
    | TFeedActions
    | TOrdersActions;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;

export type AppDispatch<TReturnType = void> = (action: AppActions | AppThunk<TReturnType>) => TReturnType;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const rootInitialState = {
    ingredients: ingridientsInitialState,
    burgerConstructor: burgerConstructorInitialState,
    order: orderInitialState,
    user: userInitialState,
    feed: feedInitialState,
    orders: ordersInitialState,
};

export const rootReducer = combineReducers({
    ingredients: ingredientsSlice.reducer,
    burgerConstructor: burgerConstructorSlice.reducer,

    order: orderSlice.reducer,
    user: userSlice.reducer,
    feed: feedReducer,
    orders: ordersReducer,
});

const feedMiddleware = socketMiddleware({
    wsConnect: feedWsConnect,
    wsDisconnect: feedWsDisconnect,
    wsConnecting: feedWsConnecting,
    onOpen: feedWsOpen,
    onError: feedWsError,
    onClose: feedWsClose,
    onMessage: feedWsMessage,
});

const ordersMiddleware = socketMiddleware(
    {
        wsConnect: ordersWsConnect,
        wsDisconnect: ordersWsDisconnect,
        wsConnecting: ordersWsConnecting,
        onOpen: ordersWsOpen,
        onError: ordersWsError,
        onClose: ordersWsClose,
        onMessage: ordersWsMessage,
    },
    true
);

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: rootInitialState,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(feedMiddleware, ordersMiddleware);
    },
});
