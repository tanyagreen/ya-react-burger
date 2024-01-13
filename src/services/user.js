import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { user as userAPI } from '../utils/api';

export const userInitialState = {
    user: null,
    isAuthChecked: false,
    error: null,
    loading: false,
};

export const userLogin = createAsyncThunk('user/login', async (userData) => {
    const response = await userAPI.userLogin(userData);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
});

export const userRegister = createAsyncThunk('user/register', async (userData) => {
    const response = await userAPI.userRegister(userData);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
});

export const userPatch = createAsyncThunk('user/patch', async (userData) => {
    const response = await userAPI.patchUser(userData);
    return response.user;
});

export const getUserFromAPI = () => {
    return (dispatch) => {
        return userAPI.getUser().then((res) => {
            dispatch(userSlice.actions.setUser(res.user));
        });
    };
};

export const checkUserAuth = () => {
    return async (dispatch) => {
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

export const userLogout = () => {
    return (dispatch) => {
        return userAPI.userLogout().then((res) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch(userSlice.actions.setUser(null));
        });
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
                state.error = action.error.message;
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
                state.error = action.error.message;
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
                state.error = action.error.message;
            });
    },
});

export const { cleanError } = userSlice.actions;
