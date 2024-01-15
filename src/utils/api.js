const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (result) => {
    if (result.ok) {
        return result.json();
    }
    return result.json().then((err) => Promise.reject(err));
};

const request = async (url, options = {}) => {
    return fetch(url, options).then(checkResponse);
};

const fetchIngridients = async () => {
    return request(`${BASE_URL}/ingredients`);
};

const fetchOrder = async (ingridients) => {
    return fetchWithRefresh(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(ingridients),
    });
};

const refreshToken = () => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    }).then(checkResponse);
};

const fetchWithRefresh = async (url, options) => {
    try {
        options.headers.authorization = localStorage.getItem('accessToken');
        const res = await request(url, options);
        return res;
    } catch (err) {
        if (err.message === 'jwt expired') {
            const refreshData = await refreshToken(); //обновляем токен
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            localStorage.setItem('accessToken', refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await request(url, options);
            return res;
        } else {
            return Promise.reject(err);
        }
    }
};

const userRegister = async (data) => {
    return request(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    }).catch((err) => {
        return Promise.reject(err);
    });
};

const userLogin = async (data) => {
    return request(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    }).catch((err) => {
        return Promise.reject(err);
    });
};

const userLogout = async () => {
    return request(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    }).catch((err) => {
        return Promise.reject(err);
    });
};

const getUser = async () => {
    return fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    }).catch((err) => {
        return Promise.reject(err);
    });
};

const patchUser = async (data) => {
    return fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    }).catch((err) => {
        return Promise.reject(err);
    });
};

const passwordReset = async (data) => {
    return request(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    }).catch((err) => {
        return Promise.reject(err);
    });
};

const passwordResetReset = async (data) => {
    return request(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    }).catch((err) => {
        return Promise.reject(err);
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
