import { IIngredient } from './ingredient-type';
import { IUser, IUserFull } from './user-type';

const BASE_URL: string = 'https://norma.nomoreparties.space/api';

interface IResponse {
    success: boolean;
    message?: string;
}

interface IOrder {
    [key: string]: unknown;
    number: number;
}

interface IToken extends IResponse {
    accessToken: string;
    refreshToken: string;
}

const checkResponse = <T>(result: Response): Promise<T> => {
    if (result.ok) {
        return result.json();
    }
    return result.json().then((err) => Promise.reject(err));
};

const request = async <T>(url: string, options = {}): Promise<T> => {
    return fetch(url, options).then(checkResponse<T>);
};

const fetchIngridients = async (): Promise<IIngredient[]> => {
    return request(`${BASE_URL}/ingredients`);
};

const fetchOrder = async (ingridients: IIngredient[]): Promise<IOrder> => {
    return fetchWithRefresh(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(ingridients),
    });
};

const refreshToken = (): Promise<IToken> => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    }).then(checkResponse<IToken>);
};

const fetchWithRefresh = async <T>(url: string, options: RequestInit): Promise<T> => {
    try {
        options.headers = {
            ...options.headers,
            authorization: localStorage.getItem('accessToken') || '',
        };

        const res = await request<T>(url, options);
        return res;
    } catch (err: unknown) {
        if (err && typeof err == 'object' && 'message' in err && err.message && err.message === 'jwt expired') {
            const refreshData = await refreshToken(); //обновляем токен
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            localStorage.setItem('accessToken', refreshData.accessToken);
            options.headers = {
                ...options.headers,
                authorization: refreshData.accessToken,
            };
            const res = await request<T>(url, options);
            return res;
        } else {
            return Promise.reject(err);
        }
    }
};

const userRegister = async (data: IUserFull): Promise<IToken & IUser> => {
    return request(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    });
};

const userLogin = async (data: Omit<IUserFull, 'name'>): Promise<IToken & IUser> => {
    return request(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    });
};

const userLogout = async (): Promise<IResponse> => {
    return request(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    });
};

const getUser = async (): Promise<IUser> => {
    return fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    });
};

const patchUser = async (data: IUserFull): Promise<IUser> => {
    return fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    });
};

const passwordReset = async (data: Omit<IUser, 'name'>): Promise<IResponse> => {
    return request(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    });
};

const passwordResetReset = async (data: Omit<IUser, 'name' | 'email'> & { token: string }): Promise<Response> => {
    return request(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    });
};

const user = {
    userRegister,
    userLogin,
    userLogout,
    getUser,
    patchUser,
};

const auth = {
    refreshToken,
    fetchWithRefresh,
};

export { fetchIngridients, fetchOrder, auth, user, passwordReset, passwordResetReset };
