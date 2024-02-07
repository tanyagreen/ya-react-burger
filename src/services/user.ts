import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { user as userAPI } from '../utils/api';
import { IUser } from './types/user-type';
import { AppThunk } from './store';

type TUserActionCreators = typeof userSlice.actions;
export type TUserActions = ReturnType<TUserActionCreators[keyof TUserActionCreators]>;

interface IUserStore {
    user: IUser | null;
    isAuthChecked: boolean;
    error: string | null;
    loading: boolean;
}

export const userInitialState: IUserStore = {
    user: null,
    isAuthChecked: false,
    error: null,
    loading: false,
};

export const userLogin = createAsyncThunk('user/login', async (userData: IUser) => {
    const response = await userAPI.userLogin(userData);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
});

export const userRegister = createAsyncThunk('user/register', async (userData: IUser) => {
    const response = await userAPI.userRegister(userData);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
});

export const userPatch = createAsyncThunk('user/patch', async (userData: IUser) => {
    const response = await userAPI.patchUser(userData);
    return response.user;
});

export const getUserFromAPI = createAsyncThunk('user/get', async () => {
    const response = await userAPI.getUser();
    return response.user;
});

export const userLogout = createAsyncThunk('user/logout', async () => {
    await userAPI.userLogout();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return;
});

export const checkUserAuth = () => {
    return async (dispatch: (action: AppThunk | TUserActions) => Promise<void>) => {
        if (localStorage.getItem('accessToken')) {
            dispatch(getUserFromAPI())
                .catch(() => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    dispatch(userSlice.actions.setUser(null));
                })
                .finally(() => dispatch(userSlice.actions.setAuthChecked(true)));
        } else {
            dispatch(userSlice.actions.setAuthChecked(true));
        }
    };
};

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload;
        },
        cleanError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
                state.loading = false;
                state.error = null;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message!;
                state.isAuthChecked = false;
            })

            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
                state.loading = false;
                state.error = null;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message!;
            })

            .addCase(userPatch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userPatch.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(userPatch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message!;
            })

            .addCase(getUserFromAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserFromAPI.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(getUserFromAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message!;
            })

            .addCase(userLogout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.user = null;
                state.loading = false;
            })
            .addCase(userLogout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message!;
            });
    },
});

export const { cleanError } = userSlice.actions;
