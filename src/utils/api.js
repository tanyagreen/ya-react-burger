const baseUrl = 'https://norma.nomoreparties.space/api';

const checkResponse = (result) => {
    if (result.ok) {
        return result.json();
    }

    return Promise.reject(`Error: ${result.status}`);
};

const request = async (url, options = {}) => {
    return fetch(url, options).then(checkResponse);
};

export const fetchIngridients = async () => {
    return request(`${baseUrl}/ingredients`);
};

export const fetchOrder = async (ingridients) => {
    return request(`${baseUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(ingridients),
    });
};
